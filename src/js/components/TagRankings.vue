<!--Containerコンポーネント-->

<template lang="pug">
  rankings-with-vuex(:rankingsType="rankingsType")
    div(
    slot="items",
    slot-scope="{items}")
      tag-rankings-item(
      v-for="(user, index) in items",
      :rank="index + 1",
      :user="user")
</template>

<script>
import RankingsWithVuex from './RankingsWithVuex.vue';
import TagRankingsItem from './TagRankingsItem.vue';

export default {
  name: 'TagRankings',

  components: {
    RankingsWithVuex,
    TagRankingsItem,
  },

  data() {
    return {
      rankingsType: 'tagRankings',
    };
  },
};
</script>
