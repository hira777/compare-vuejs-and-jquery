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
        @click.native="select(index), handleIndex(index)") {{item}}
    slot(
    name="items",
    :items="items"
    )
    loading(:isLoading="isLoading")
    Button(v-show="isNext && !isLoading", @click.native="handleClick") もっと見る
</template>

<script>
import RankingsLabel from './RankingsLabel.vue';
import RankingsTab from './RankingsTab.vue';
import RankingsTabItem from './RankingsTabItem.vue';
import Selected from './Selected.vue';
import Loading from './Loading.vue';
import Button from './Button.vue';

export default {
  name: 'RankingsWithVuex',

  components: {
    RankingsLabel,
    RankingsTab,
    RankingsTabItem,
    Selected,
    Loading,
    Button,
  },

  props: {
    rankingsType: {
      type: String,
      required: true,
    },
  },

  computed: {
    label() {
      return this.$store.getters[`rankings/${this.rankingsType}/label`];
    },
    tabItems() {
      return this.$store.getters[`rankings/${this.rankingsType}/categories`];
    },
    items() {
      return this.$store.getters[`rankings/${this.rankingsType}/items`];
    },
    isNext() {
      return this.$store.getters[`rankings/${this.rankingsType}/isNext`];
    },
    isLoading() {
      return this.$store.getters[`rankings/${this.rankingsType}/isLoading`];
    },
  },

  created() {
    this.$store.dispatch(`rankings/${this.rankingsType}/UPDATE_RANKINGS`, {
      root: true,
    });
  },

  methods: {
    handleClick() {
      this.$store.commit(`rankings/${this.rankingsType}/incrementIndex`);
      this.$store.dispatch(`rankings/${this.rankingsType}/UPDATE_RANKINGS`, {
        root: true,
      });
    },
    handleIndex(index) {
      this.$store.commit(`rankings/${this.rankingsType}/setDataIndex`, {
        index,
      });
      this.$store.dispatch(`rankings/${this.rankingsType}/UPDATE_RANKINGS`, {
        root: true,
      });
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
