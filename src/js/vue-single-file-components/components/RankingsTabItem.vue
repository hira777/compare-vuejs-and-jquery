<template lang="pug">
  .rankings-tab-item(:class="isActive ? 'is-active' : ''")
    slot
</template>

<script>
export default {
  name: 'RankingTabItem',

  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.rankings-tab-item {
  font-size: 0.8rem;
  color: #999;
  cursor: pointer;

  &.is-active {
    font-weight: 700;
    color: #333;
  }

  &:not(:last-child) {
    margin-right: 8px;
  }
}
</style>
