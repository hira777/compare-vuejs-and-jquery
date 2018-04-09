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
    slot(name="items")
    slot(name="loading")
    slot(name="button")
</template>

<script>
import Selected from './Selected.vue';
import RankingsLabel from './RankingsLabel.vue';
import RankingsTab from './RankingsTab.vue';
import RankingsTabItem from './RankingsTabItem.vue';

export default {
  name: 'Rankings',

  components: {
    Selected,
    RankingsLabel,
    RankingsTab,
    RankingsTabItem,
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
    tabItems: {
      type: Array,
      default() {
        return () => [];
      },
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
