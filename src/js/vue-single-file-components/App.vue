<template lang="pug">
  #app
    rankings(
    :label="rankings.label",
    :rankings="rankings.data",
    :rows="rankings.rows",
    :handleIndex="handleRankingsDataIndex")
      loading(
      v-show="loadingRankings"
      slot="loading")
      Button(
      slot="button",
      v-show="isNextRankings && !loadingRankings",
      @click.native="incrementCurrentRankingsIndex") もっと見る
</template>

<script>
import jsonp from 'jsonp';
import qs from 'qs';
import Rankings from '../components/Rankings.vue';
import Loading from '../components/Loading.vue';
import Button from '../components/Button.vue';

export default {
  name: 'App',

  components: {
    Rankings,
    Loading,
    Button,
  },

  data() {
    return {
      rankings: {
        label: 'ユーザーランキング',
        data: [
          {
            category: 'weekly',
            label: '週間',
            index: 0,
            items: [],
            isNext: true,
            loading: false,
          },
          {
            category: 'monthly',
            label: '月間',
            index: 0,
            items: [],
            isNext: true,
            loading: false,
          },
          {
            category: 'all',
            label: '全て',
            index: 0,
            items: [],
            isNext: true,
            loading: false,
          },
        ],
        dataIndex: 0,
        rows: 5,
      },
    };
  },

  computed: {
    currentRankings() {
      return this.rankings.data[this.rankings.dataIndex];
    },

    loadingRankings() {
      return this.currentRankings.loading;
    },

    isNextRankings() {
      return this.currentRankings.isNext;
    },

    rankingsItemLengthShouldRender() {
      return (this.currentRankings.index + 1) * this.rankings.rows;
    },

    shouldUpdateRankingsData() {
      return (
        this.currentRankings.isNext &&
        this.currentRankings.items.length < this.rankingsItemLengthShouldRender
      );
    },

    endPoint() {
      const param = qs.stringify({
        date: this.currentRankings.category,
        index: this.currentRankings.index,
        rows: this.rankings.rows,
      });
      return `https://script.google.com/macros/s/AKfycbzFQxdGgTZwZsdo7zoXoE0jp37PBsefRUS7_MPgJOo1WDs4UTk/exec?${param}`;
    },
  },

  watch: {
    endPoint() {
      if (this.shouldUpdateRankingsData) {
        this.updateRankings();
      }
    },
  },

  created() {
    this.updateRankings();
  },

  methods: {
    handleRankingsDataIndex(index) {
      this.rankings.dataIndex = index;
    },

    incrementCurrentRankingsIndex() {
      this.currentRankings.index += 1;
    },

    updateRankings() {
      this.currentRankings.loading = true;
      const indexWhenFetch = this.rankings.dataIndex;

      jsonp(this.endPoint, {}, (err, data) => {
        if (err) {
          console.log(err);
        }

        this.rankings.data[indexWhenFetch].loading = false;
        this.rankings.data[indexWhenFetch].isNext = data.isNext;
        this.rankings.data[indexWhenFetch].items =
          this.rankings.data[indexWhenFetch].items.length < 1
            ? data.rankings
            : [...this.rankings.data[indexWhenFetch].items, ...data.rankings];
      });
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background: #f6f6f6;
}
</style>
