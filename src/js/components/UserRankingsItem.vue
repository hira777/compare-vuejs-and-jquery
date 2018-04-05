<!--Presentationalコンポーネント-->

<template lang="pug">
  rankings-item(:rank="rank")
    .rankings-user(
      slot="rankingsItem",
      slot-scope="{isTop3, rankColorClass}")
      .rankings-user-left
        i.rankings-user-rank.fas.fa-trophy(
        v-if="isTop3",
        :class="rankColorClass")
        span.rankings-user-rank(v-if="!isTop3") {{ rank }}
        div
          .rankings-user-name(v-if="user.userName !== ''") {{ user.userName }}
          .rankings-user-screen_name @{{ user.screenName }}
      .rankings-user-contribution
        .rankings-user-contribution-count {{ user.contributionCount }}
        | Contributions
</template>

<script>
import RankingsItem from './RankingsItem.vue';

export default {
  name: 'UserRankingsItem',

  components: {
    RankingsItem,
  },

  props: {
    rank: {
      type: Number,
      default: 0,
    },
    user: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="scss">
.rankings-user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  &:not(:last-child) {
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid #e8e8e8;
  }

  .rankings-user-left {
    display: flex;
    align-items: center;
  }

  .rankings-user-rank {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-right: 10px;
    width: 32px;
    font-size: 1.6rem;
    color: #999;

    &.is-gold {
      color: #ffc400;
    }

    &.is-silver {
      color: #c9c9c9;
    }

    &.is-bronze {
      color: #ac6d4d;
    }
  }

  .rankings-user-image {
    display: flex;
    margin-right: 5px;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }

  .rankings-user-name {
    font-size: 1rem;

    & ~ .rankings-user-screen_name {
      font-size: 0.8rem;
      color: #999;
    }
  }

  .rankings-user-screen_name {
    font-size: 1rem;
  }

  .rankings-user-contribution {
    color: #999;
    font-size: 0.8rem;

    .rankings-user-contribution-count {
      color: #333;
      font-weight: 700;
      font-size: 1rem;
      text-align: center;
    }
  }
}
</style>
