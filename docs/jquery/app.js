class Rankings {
  constructor() {
    this.rankings = {};
    this.rankingCategories = {
      weekly: {
        title: '週間',
        // どの範囲のランキングを描画するのか決めるために利用する
        index: 0
      },
      monthly: {
        title: '月間',
        index: 0
      },
      all: {
        title: '全て',
        index: 0
      }
    };
    this.category = 'weekly';
    this.rows = 5;
    this.rankColor = {
      rank1: 'gold',
      rank2: 'silver',
      rank3: 'bronze',
    };
  }

  /**
   * 初期化
   */
  init() {
    axios.get('../db.json')
      .then((response) => {
        // ローディングを表示させるために敢えてsetTimeout
        setTimeout(() => {
          this.rankings = response.data.rankings;
          this.stopLoading();
          this.renderRankings();
          this.renderTab();
          this.updateMoreLoadButton();
          this.addClickTabItemEvent();
          this.addClickLoadMoreButtonEvent();
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * 現在選択中のカテゴリ情報
   */
  currentCategory() {
    return this.rankingCategories[this.category];
  }

  /**
   * 現在選択中のランキング
   */
  currentRankings() {
    return this.rankings[this.category];
  }

  /**
   * 描画するランキング
   */
  rankingsForRender() {
    return this.currentRankings().slice(0, this.countToShow());
  }

  /**
   * 表示するランキング数
   */
  countToShow() {
    return (this.currentCategory().index + 1) * this.rows;
  }

  /**
   * ユーザー情報を描画する
   */
  renderRankings() {
    const $users = $('.js-ranking-users');
    let htmlStrings = '';

    this.rankingsForRender().forEach((user, i) => {
      htmlStrings += `
      <div class="ranking-user">
        <div class="ranking-user-left">
          ${this.getUserRankHtmlStrings(i + 1)}
          <div>
            ${Rankings.getUserNameHtmlStrings(user.userName)}
            <div class="ranking-user-screen_name">@${user.screenName}</div>
          </div>
        </div>
        <div class="ranking-user-contribution">
          <div class="ranking-user-contribution-count">${user.contributionCount}</div>
          Contributions
        </div>
      </div>`;
    });

    $users.html(htmlStrings);
  }

  /**
   * ランキングを描画するHTML文字列を取得する
   */
  getUserRankHtmlStrings(rank) {
    const color = this.rankColor[`rank${rank}`];
    const className = (color)
      ? `is-${color}`
      : '';

    return Rankings.isTop3(rank)
      ? `<i class="ranking-user-rank fas fa-trophy ${className}"></i>`
      : `<span class="ranking-user-rank">${rank}</span>`;
  }

  /**
   * トップ3かどうか
   */
  static isTop3(rank) {
    return rank < 4;
  }

  /**
   * ユーザー名を描画するHTML文字列を取得する
   */
  static getUserNameHtmlStrings(userName) {
    return (userName !== '')
      ? `<div class="ranking-user-name">${userName}</div>`
      : '';
  }

  /**
   * タブを描画する
   */
  renderTab() {
    const $tab = $('.js-ranking-tab');
    let htmlStrings = '';

    for (let key in this.rankingCategories) {
      if (this.rankingCategories.hasOwnProperty(key)) {
        htmlStrings += `
        <div class="ranking-tab-item" data-category="${key}">
          ${this.rankingCategories[key].title}
        </div>`;
      }
    }

    $tab.html(htmlStrings);
    // ついでに最初のタブをアクティブにする
    $tab.find('.ranking-tab-item').eq(0).addClass('is-active');
  }

  /**
   * タブをクリック時のイベントハンドラを追加する
   */
  addClickTabItemEvent() {
    const $tabItem = $('.js-ranking-tab').find('.ranking-tab-item');

    $tabItem.on('click', (e) => {
      const $this = $(e.currentTarget);

      $tabItem.removeClass('is-active');
      $this.addClass('is-active');
      this.category = $this.attr('data-category');
      this.renderRankings();
      this.updateMoreLoadButton();
    });
  }

  /**
   * 「もっと見る」ボタンをクリック時のイベントハンドラを追加する
   */
  addClickLoadMoreButtonEvent() {
    const $moreLoadButton = $('.js-ranking-more_button');

    $moreLoadButton.on('click', () => {
      this.incrementIndex();
      this.renderRankings();
      this.updateMoreLoadButton();
    });
  }

  /**
   * 選択中のカテゴリのインデックスを加算する
   */
  incrementIndex() {
    this.currentCategory().index += 1;
  }

  /**
   * 「もっと見る」 ボタンの状態を更新する
   * 現在選択中のカテゴリを全て表示済みであればボタンを非表示にする
   */
  updateMoreLoadButton() {
    const $moreLoadButton = $('.js-ranking-more_button');
    const isNext = this.currentRankings().length > this.countToShow();

    if (isNext) {
      $moreLoadButton.show();
    } else {
      $moreLoadButton.hide();
    }
  }

  /**
   * ローディングを止める
   */
  stopLoading() {
    const $loading = $('.js-ranking-loading');
    $loading
      .hide()
      .removeClass('is-active');
  }
}

const rankings = new Rankings();
rankings.init();
