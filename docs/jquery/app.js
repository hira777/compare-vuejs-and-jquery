const tabs = {
  weekly: '週間',
  monthly: '月間',
  all: '全て'
};
let rankings = {};
const rankColor = {
  rank1: 'gold',
  rank2: 'silver',
  rank3: 'bronze',
};

/**
 * ユーザー情報を描画する
 */
function renderRankings(userRankings) {
  const $users = $('.js-ranking-users');
  let htmlStrings = '';

  userRankings.forEach((user, i) => {
    htmlStrings += `
      <div class="ranking-user">
        <div class="ranking-user-left">
          ${getUserRankHtmlStrings(i + 1)}
          <div>
            ${getUserNameHtmlStrings(user.userName)}
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
function getUserRankHtmlStrings(rank) {
  const color = rankColor[`rank${rank}`];
  const className = (color)
    ? `is-${color}`
    : '';

  return isTop3(rank)
    ? `<i class="ranking-user-rank fas fa-trophy ${className}"></i>`
    : `<span class="ranking-user-rank">${rank}</span>`;
}

/**
 * トップ3かどうか
 */
function isTop3(rank) {
  return rank < 4;
}

/**
 * ユーザー名を描画するHTML文字列を取得する
 */
function getUserNameHtmlStrings(userName) {
  return (userName !== '')
    ? `<div class="ranking-user-name">${userName}</div>`
    : '';
}

/**
 * タブを描画する
 */
function renderTab(tabs) {
  const $tab = $('.js-ranking-tab');
  let htmlStrings = '';

  for (let key in tabs) {
    if (tabs.hasOwnProperty(key)) {
      htmlStrings += `<div class="ranking-tab-item" data-date="${key}">${tabs[key]}</div>`;
    }
  }

  $tab.html(htmlStrings);
  // ついでに最初のタブをアクティブにする
  $tab.find('.ranking-tab-item').eq(0).addClass('is-active');
}

/**
 * タブをクリック時のイベントハンドラを追加する
 */
function addClickTabItemEvent() {
  const $tabItem = $('.js-ranking-tab').find('.ranking-tab-item');

  $tabItem.on('click', (e) => {
    const $this = $(e.currentTarget);

    $tabItem.removeClass('is-active');
    $this.addClass('is-active');
    renderRankings(rankings[$this.attr('data-date')]);
  });
}

/**
 * ローディングを止める
 */
function stopLoading() {
  const $loading = $('.js-ranking-loading');
  $loading
    .hide()
    .removeClass('is-active');
}

/**
 * 初期化
 */
function init() {
  axios.get('../db.json')
    .then((response) => {
      // ローディングを表示させるために敢えてsetTimeout
      setTimeout(() => {
        rankings = response.data.rankings;
        stopLoading();
        renderRankings(rankings.weekly);
        renderTab(tabs);
        addClickTabItemEvent();
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
    });

}

init();