<!--Containerコンポーネント-->

<template lang="pug">
  .rankings
    rankings-label(v-if="label !== ''") {{label}}
    selected
      rankings-tab(
      slot="selected",
      slot-scope="{selectedIndex, select}")
        rankings-tab-item(
        v-if="tabItems.length > 0"
        v-for="(item, index) in tabItems",
        :isActive="index === selectedIndex",
        @click.native="select(index), setCurrentIndex(index), handleIndex(index)") {{item}}
    rankingsUser(
    v-for="(rankingsUser, index) in currentRankingsItems",
    :rank="index + 1",
    :rankingsUser="rankingsUser")
    slot(name="loading")
    slot(name="button")
</template>

<script>
// MEMO
// 現在ユーザーランキングを表示させているがタグランキングを表示させたいとなってこのコンポーネントを
// 再利用しようとしたらすべてが破綻する、
// 改善策
// ・Rankings.vue => UserRankings.vueにして、tagRankingsを作成すれば解決
// ・rankingsUserをslotにして外からぶちこむ
import flatMap from 'lodash/flatMap';
import Selected from './Selected.vue';
import RankingsLabel from './RankingsLabel.vue';
import RankingsTab from './RankingsTab.vue';
import RankingsTabItem from './RankingsTabItem.vue';
import RankingsUser from './RankingsUser.vue';

export default {
  name: 'Rankings',

  components: {
    Selected,
    RankingsLabel,
    RankingsTab,
    RankingsTabItem,
    RankingsUser,
  },

  props: {
    handleIndex: {
      type: Function,
      default() {
        return () => {};
      },
    },
    label: {
      type: String,
      default: '',
    },
    rankings: {
      type: Array,
      required: true,
      default() {
        return [];
      },
      // TODO
      // オブジェクトの中身をチェック
      // validator(value) {
      //   console.log(value);
      // },
    },
  },

  data() {
    return {
      currentIndex: 0,
    };
  },

  computed: {
    tabItems() {
      return flatMap(this.rankings, rankings => [rankings.label]);
    },

    currentRankings() {
      return this.rankings[this.currentIndex];
    },

    currentRankingsItems() {
      return this.currentRankings.items;
    },
  },

  methods: {
    setCurrentIndex(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style lang="scss">
.rankings {
  margin: 20px;
  padding: 20px;
  background: #fff;
}
</style>
