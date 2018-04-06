<!--Containerコンポーネント-->

<template lang="pug">
  rankings-with-slot(
  :label="label",
  :tabItems="categories",
  :handleIndex="index => {this.$store.commit('rankings/userRankings/setDataIndex', {index})}")
    component(
    :is="rankings",
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
import RankingsWithSlot from './RankingsWithSlot.vue';
import UserRankingsItem from './UserRankingsItem.vue';
import TagRankingsItem from './TagRankingsItem.vue';
import Loading from './Loading.vue';
import Button from './Button.vue';

export default {
  name: 'DynamicRankings',

  components: {
    RankingsWithSlot,
    userRankings: UserRankingsItem,
    tagRankingsItem: TagRankingsItem,
    Loading,
    Button,
  },

  props: {
    rankings: {
      type: String,
      require: true,
      default: '',
    },
  },

  computed: {
    label() {
      return this.$store.getters[`rankings/${this.rankings}/label`];
    },
    categories() {
      return this.$store.getters[`rankings/${this.rankings}/categories`];
    },
    items() {
      return this.$store.getters[`rankings/${this.rankings}/items`];
    },
    isNext() {
      return this.$store.getters[`rankings/${this.rankings}/isNext`];
    },
    isLoading() {
      return this.$store.getters[`rankings/${this.rankings}/isLoading`];
    },
    shouldUpdate() {
      return this.$store.getters[`rankings/${this.rankings}/shouldUpdate`];
    },
    endPoint() {
      return this.$store.getters[`rankings/${this.rankings}/endPoint`];
    },
  },

  watch: {
    endPoint() {
      if (this.shouldUpdate) {
        this.$store.dispatch(`rankings/${this.rankings}/UPDATE_RANKINGS`, {
          root: true,
        });
      }
    },
  },

  created() {
    this.$store.dispatch(`rankings/${this.rankings}/UPDATE_RANKINGS`, {
      root: true,
    });
  },

  methods: {
    handleClick() {
      this.$store.commit(`rankings/${this.rankings}/incrementIndex`);
    },
  },
};
</script>
