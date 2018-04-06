<!--Presentationalコンポーネント-->

<template lang="pug">
  .loading.is-active(v-show="isLoading")
</template>

<script>
export default {
  name: 'Loading',

  props: {
    isLoading: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  margin: 20px auto 8px auto;
  width: 52px;
  height: 52px;

  &.is-active {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
