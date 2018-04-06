export default {
  addItems(state, { index, items }) {
    state.data[index].items =
      state.data[index].items.length < 1
        ? items
        : [...state.data[index].items, ...items];
  },

  setLoading(state, { index, loading }) {
    state.data[index].loading = loading;
  },

  setIsNext(state, { index, isNext }) {
    state.data[index].isNext = isNext;
  },

  incrementIndex(state) {
    state.data[state.dataIndex].index += 1;
  },

  setDataIndex(state, { index }) {
    state.dataIndex = index;
  },
};
