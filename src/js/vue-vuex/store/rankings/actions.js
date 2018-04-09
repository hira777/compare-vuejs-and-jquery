import jsonp from 'jsonp';

export default {
  UPDATE_RANKINGS({ commit, state, getters }) {
    if (!getters.shouldUpdate) return;

    const indexWhenFetch = state.dataIndex;
    commit('setLoading', { index: indexWhenFetch, loading: true });

    jsonp(getters.endPoint, {}, (err, data) => {
      if (err) {
        console.log(err);
      }

      commit('setLoading', { index: indexWhenFetch, loading: false });
      commit('setIsNext', { index: indexWhenFetch, isNext: data.isNext });
      commit('addItems', { index: indexWhenFetch, items: data.rankings });
    });
  },
};
