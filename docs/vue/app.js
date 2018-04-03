new Vue({
  el: '#ranking',

  data() {
    return {
      rankings: {},

      rankingCategories: {
        weekly: {
          title: '週間',
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
      },

      category: 'weekly',

      rows: 5,

      rankColor: {
        rank1: 'gold',
        rank2: 'silver',
        rank3: 'bronze',
      },

      loading: true
    };
  },

  computed: {
    /**
     * 選択中のカテゴリ情報
     */
    currentCategory() {
      return this.rankingCategories[this.category];
    },

    /**
     * 選択中のランキング
     */
    currentRankings() {
      return this.rankings[this.category];
    },

    /**
     * 表示するランキング数
     */
    countToShow() {
      return (this.currentCategory.index + 1) * this.rows;
    },

    /**
     * 描画するランキングのユーザー
     */
    users() {
      if (!this.currentRankings) return;

      return this.currentRankings.slice(0, this.countToShow);
    },

    /**
     * 選択中のランキングを全て表示したかどうか
     */
    isNext() {
      if (!this.users) return;

      return this.currentRankings.length > this.countToShow;
    }
  },

  methods: {
    /**
     * 選択中のカテゴリのインデックスを加算する
     */
    incrementIndex() {
      this.currentCategory.index += 1;
    },

    /**
     * トップ3かどうか
     */
    isTop3(rank) {
      return rank < 4;
    },

    /**
     * ランキングに応じたクラス名
     */
    rankColorClass(rank) {
      const color = this.rankColor[`rank${rank}`];

      return (color)
        ? `is-${color}`
        : '';
    },

    /**
     * 選択中のランキングのカテゴリを更新する
     */
    setCatgory(category) {
      this.category = category;
    }
  },

  created() {
    axios.get('../db.json')
      .then((response) => {
        // ローディングを表示させるために敢えてsetTimeout
        setTimeout(() => {
          this.loading = false;
          this.rankings = response.data.rankings;
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  mounted() {
    this.$el.style.display = "block";
  }
});