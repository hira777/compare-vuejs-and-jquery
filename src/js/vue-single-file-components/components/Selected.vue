<template lang="pug">
  div
    slot(
    name="selected",
    :selectedIndex="selectedIndex",
    :select="select")
</template>

<script>
export default {
  name: 'Selected',

  data() {
    return { selectedIndex: 0 };
  },

  methods: {
    select(index) {
      this.selectedIndex = index;
    },
  },
};
</script>
