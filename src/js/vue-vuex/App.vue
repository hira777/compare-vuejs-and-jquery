<template lang="pug">
  #app
    user-rankings
    tag-rankings
    // dynamic-rankings(:rankings="'userRankings'")
    // dynamic-rankings(:rankings="'tagRankings'")
</template>

<script>
import UserRankings from '../components/UserRankings.vue';
import TagRankings from '../components/TagRankings.vue';
import DynamicRankings from '../components/DynamicRankings.vue';

export default {
  name: 'App',

  components: {
    UserRankings,
    TagRankings,
    DynamicRankings,
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
