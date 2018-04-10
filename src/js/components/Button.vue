<!--Presentationalコンポーネント-->

<template lang="pug">
  button.button(:class="[`button-${type}`]")
    slot
</template>

<script>
export default {
  name: 'MyButton',

  props: {
    type: {
      type: String,
      default: 'default',
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  display: inline-block;
  width: calc(100% - 16px * 2);
  padding: 8px 16px;
  margin: 16px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 4px;
}
.button-default {
  color: #777;
  border: 1px solid #999;
  background-color: #fff;
}
</style>
