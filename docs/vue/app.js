new Vue({
  el: '#ranking',

  data() {
    return {
      date: 'weekly',

      tabs: {
        weekly: '週間',
        monthly: '月間',
        all: '全て'
      },

      rankings: {},

      rankColor: {
        rank1: 'gold',
        rank2: 'silver',
        rank3: 'bronze',
      },

      loading: true
    };
  },

  computed: {
    users() {
      return this.rankings[this.date];
    },
  },

  methods: {
    isTop3(rank) {
      return rank < 4;
    },

    rankColorClass(rank) {
      const color = this.rankColor[`rank${rank}`];

      return (color)
        ? `is-${color}`
        : '';
    },

    setDate(date) {
      this.date = date;
    }
  },

  created() {
    axios.get('../db.json')
      .then((response) => {
        // ローディングを表示させるために敢えてsetTimeout
        setTimeout(() => {
          this.loading = false;
          this.rankings = response.data.rankings;
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  mounted() {
    this.$el.style.display = "block";
  }
});