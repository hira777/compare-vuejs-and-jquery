Vue.config.devtools = true;

const vm = new Vue({
  el: '#ranking',

  // 状態
  data() {
    return {
      rankings: {
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
      },

      date: 'weekly',

      rows: 5,

      rankColor: {
        rank1: 'gold',
        rank2: 'silver',
        rank3: 'bronze',
      }
    };
  },

  // computed内にgetter関数を指定できる
  // methodsに同じような定義をすることで同様の結果になる
  // 算出プロパティ（computed）は依存関係にもとづきキャッシュされる
  // 今回の場合、this.rankingsかthis.dateが更新されない限り、以前計算された結果を即時に返す
  // 計算に無茶苦茶コストがかかる場合、キャッシングを利用するために算出プロパティを利用する
  // 逆にキャッシュを利用しない（再描画が起こる度に関数を実行したい）場合methodsを利用する
  computed: {
    /**
     * 選択中のランキング
     */
    currentRankings() {
      return this.rankings[this.date];
    },

    /**
     * エンドポイント
     */
    endPoint() {
      const param = Qs.stringify({
        date: this.date,
        index: this.currentRankings.index,
        rows: this.rows
      });
      return `https://script.google.com/macros/s/AKfycbzFQxdGgTZwZsdo7zoXoE0jp37PBsefRUS7_MPgJOo1WDs4UTk/exec?${param}`
    },

    /**
     * 描画するランキング情報
     */
    items() {
      return this.currentRankings.items;
    },

    /**
     * 選択中のランキングを全て表示したかどうか
     */
    isNext() {
      return this.currentRankings.isNext;
    },

    /**
     *  選択中のランキングの描画すべきアイテム数
     */
    itemLengthShouldRender() {
      return (this.currentRankings.index + 1) * this.rows;
    },

    /**
     * 更新できる状態かどうか
     */
    canUpdate() {
      return !this.loading &&
        this.currentRankings.isNext &&
        // 選択中のランキングのアイテム数が描画すべきアイテム数より少ないかどうか
        this.items.length < this.itemLengthShouldRender;
    },

    /**
     * 選択中のランキングを読み込み中かどうか
     */
    loading() {
      return this.currentRankings.loading;
    }
  },

  methods: {
    /**
     * 選択中のカテゴリのインデックスを加算する
     */
    incrementIndex() {
      this.currentRankings.index += 1;
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
    setDate(date) {
      this.date = date;
    },

    /**
     * 更新（新たなデータを取得する）
     */
    update() {
      this.currentRankings.loading = true;
      const rankingDateWhenFetch = this.date;
      
      fetchJsonp(this.endPoint)
        .then(response => {
          response.json().then(data => {
            this.rankings[rankingDateWhenFetch].loading = false;
            this.rankings[rankingDateWhenFetch].isNext = data.isNext;
            this.rankings[rankingDateWhenFetch].items =
              (this.rankings[rankingDateWhenFetch].items.length < 1)
                ? data.rankings
                : [...this.rankings[rankingDateWhenFetch].items, ...data.rankings];
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },

  // 今回の場合endPointの変更を監視する
  watch: {
    endPoint() {
      if (this.canUpdate) {
        this.update();
      }
    }
  },

  // インスタンスが作成された後に同期的に呼ばれる
  // この段階では、インスタンスは、データ監視、算出プロパティ、メソッド、
  // watch/event コールバックらのオプションのセットアップ処理が完了したことを意味する
  // まだDOMにはアクセスできない
  created() {
    this.update();
  },

  // インスタンスがマウントされた後に呼ばれる
  // DOM（this.$el）にアクセスできるようになる
  mounted() {
    this.$el.style.display = "block";
  }
});
