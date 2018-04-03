<template lang="pug">
  .rankings-tab
    slot
</template>

<script>
export default {
  name: 'RankingsTab',
};
</script>

<style lang="scss">
.rankings-tab {
  display: flex;
  margin-top: 10px;
}
</style>
