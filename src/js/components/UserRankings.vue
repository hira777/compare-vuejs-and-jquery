<!--Containerコンポーネント-->

<template lang="pug">
  rankings-with-slot(
  :label="label",
  :tabItems="categories",
  :handleIndex="handleIndex")
    user-rankings-item(
    slot="items",
    v-for="(user, index) in items",
    :rank="index + 1",
    :user="user")
    loading(
    slot="loading",
    :isLoading="isLoading")
    Button(
    slot="button",
    v-show="isNext && !isLoading",
    @click.native="handleClick") もっと見る
</template>

<script>
import { mapGetters } from 'vuex';
import RankingsWithSlot from './RankingsWithSlot.vue';
import UserRankingsItem from './UserRankingsItem.vue';
import Loading from './Loading.vue';
import Button from './Button.vue';

export default {
  name: 'UserRankings',

  components: {
    RankingsWithSlot,
    UserRankingsItem,
    Loading,
    Button,
  },

  computed: {
    ...mapGetters('rankings/userRankings', [
      'label',
      'categories',
      'items',
      'isNext',
      'isLoading',
    ]),
  },

  created() {
    this.$store.dispatch('rankings/userRankings/UPDATE_RANKINGS');
  },

  methods: {
    handleClick() {
      this.$store.commit('rankings/userRankings/incrementIndex');
      this.$store.dispatch('rankings/userRankings/UPDATE_RANKINGS');
    },
    handleIndex(index) {
      this.$store.commit('rankings/userRankings/setDataIndex', { index });
      this.$store.dispatch('rankings/userRankings/UPDATE_RANKINGS');
    },
  },
};
</script>
