class Rankings {
  constructor() {
    this.rankings = {
      weekly: {
        title: '週間',
        index: 0,
        items: [],
        isNext: true,
        loading: false,
      },
      monthly: {
        title: '月間',
        index: 0,
        items: [],
        isNext: true,
        loading: false,
      },
      all: {
        title: '全て',
        index: 0,
        items: [],
        isNext: true,
        loading: false,
      }
    };
    this.date = 'weekly';
    this.rows = 5;
    this.rankColor = {
      rank1: 'gold',
      rank2: 'silver',
      rank3: 'bronze',
    };
    this.initialLoad = true;
  }

  /**
   * 初期化
   */
  init() {
    this.update();
  }

  /**
   *  選択中のランキングの描画すべきアイテム数
   */
  itemLengthShouldRender() {
    return (this.currentRankings().index + 1) * this.rows;
  }

  /**
   * 更新できる状態かどうか
   */
  canUpdate() {
    return !this.loading() &&
      this.currentRankings().isNext &&
      this.currentRankings().items.length < this.itemLengthShouldRender();
  }

  /**
   * 選択中のランキングを読み込み中かどうか
   */
  loading() {
    return this.currentRankings().loading;
  }

  /**
   * 更新（新たなデータを取得する）
   */
  update() {
    if (!this.canUpdate()) return;

    this.startLoading();
    this.hideMoreLoadButton();
    this.currentRankings().loading = true;
    const rankingDateWhenFetch = this.date;

    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbzFQxdGgTZwZsdo7zoXoE0jp37PBsefRUS7_MPgJOo1WDs4UTk/exec',
      dataType: 'jsonp',
      data: {
        date: this.date,
        index: this.currentRankings().index,
        rows: this.rows
      }
    })
      .done(data => {
        this.rankings[rankingDateWhenFetch].loading = false;
        this.rankings[rankingDateWhenFetch].isNext = data.isNext;
        this.rankings[rankingDateWhenFetch].items =
          (this.rankings[rankingDateWhenFetch].items.length < 1)
            ? data.rankings
            : [...this.rankings[rankingDateWhenFetch].items, ...data.rankings];

        this.stopLoading();
        this.renderRankings();
        this.updateMoreLoadButton();

        if (this.initialLoad) {
          this.initialLoad = false;
          this.renderTab();
          this.addClickTabItemEvent();
          this.addClickLoadMoreButtonEvent();
        }
      })
      .fail(err => {
        console.log(err);
      });
  }

  /**
   * 現在選択中のランキング
   */
  currentRankings() {
    return this.rankings[this.date];
  }

  /**
   * 描画するランキング
   */
  rankingsForRender() {
    return this.currentRankings().items;
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

    for (let key in this.rankings) {
      if (this.rankings.hasOwnProperty(key)) {
        htmlStrings += `
        <div class="ranking-tab-item" data-date="${key}">
          ${this.rankings[key].title}
        </div>`;
      }
    }

    $tab.html(htmlStrings);
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
      this.date = $this.attr('data-date');
      this.renderRankings();
      this.updateMoreLoadButton();
      this.updateLoading();
      this.update();
    });

    // ついでに最初のタブをアクティブにする
    $('.js-ranking-tab').find('.ranking-tab-item').eq(0).addClass('is-active');
  }

  /**
   * 「もっと見る」ボタンをクリック時のイベントハンドラを追加する
   */
  addClickLoadMoreButtonEvent() {
    const $moreLoadButton = $('.js-ranking-more_button');

    $moreLoadButton.on('click', () => {
      this.incrementIndex();
      this.update();
      $moreLoadButton.hide();
    });
  }

  /**
   * 選択中のカテゴリのインデックスを加算する
   */
  incrementIndex() {
    this.currentRankings().index += 1;
  }

  /**
   * 「もっと見る」 ボタンを非表示にする
   */
  hideMoreLoadButton() {
    const $moreLoadButton = $('.js-ranking-more_button');
    $moreLoadButton.hide();
  }

  /**
   * 「もっと見る」 ボタンの状態を更新する
   * 現在選択中のカテゴリを全て表示済みであればボタンを非表示にする
   */
  updateMoreLoadButton() {
    const $moreLoadButton = $('.js-ranking-more_button');
    const isNext = this.currentRankings().isNext;

    if (isNext) {
      $moreLoadButton.show();
    } else {
      $moreLoadButton.hide();
    }
  }

  /**
   * ローディングを開始する
   */
  startLoading() {
    const $loading = $('.js-ranking-loading');
    $loading
      .show()
      .addClass('is-active');
  }

  /**
   * ローディングを停止する
   */
  stopLoading() {
    const $loading = $('.js-ranking-loading');
    $loading
      .hide()
      .removeClass('is-active');
  }

  /**
   * ローディング状態を更新する
   */
  updateLoading() {
    if (this.loading()) {
      this.startLoading();
    } else {
      this.stopLoading();
    }
  }
}

const rankings = new Rankings();
rankings.init();
