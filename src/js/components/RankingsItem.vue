<!--振る舞いを提供するコンポーネント-->

<template lang="pug">
  div
    slot(
    name="rankingsItem",
    :isTop3="isTop3",
    :rankColorClass="rankColorClass")
</template>

<script>
export default {
  name: 'RankingsItem',

  props: {
    rank: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      rankColor: {
        rank1: 'gold',
        rank2: 'silver',
        rank3: 'bronze',
      },
    };
  },

  computed: {
    isTop3() {
      return this.rank < 4;
    },

    rankColorClass() {
      const color = this.rankColor[`rank${this.rank}`];
      return `is-${color}`;
    },
  },
};
</script>
