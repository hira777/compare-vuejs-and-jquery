import qs from 'qs';
import flatMap from 'lodash/flatMap';

export default {
  label: state => state.label,

  rows: state => state.rows,

  categories: state => flatMap(state.data, data => [data.label]),

  currentRankings: state => {
    return state.data[state.dataIndex];
  },

  items: (state, getters) => {
    return getters.currentRankings.items;
  },

  isNext: (state, getters) => {
    return getters.currentRankings.isNext;
  },

  isLoading: (state, getters) => {
    return getters.currentRankings.loading;
  },

  shouldUpdate: (state, getters) => {
    return (
      getters.currentRankings.isNext &&
      getters.currentRankings.items.length < getters.itemLengthShouldRender
    );
  },

  itemLengthShouldRender: (state, getters) => {
    return (getters.currentRankings.index + 1) * state.rows;
  },

  endPoint: (state, getters) => {
    const param = qs.stringify({
      date: getters.currentRankings.category,
      index: getters.currentRankings.index,
      rows: state.rows,
    });
    return `${state.apiEndPoint}?${param}`;
  },
};
