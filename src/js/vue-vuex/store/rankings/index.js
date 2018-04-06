import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const rankings = {
  namespaced: true,

  modules: {
    userRankings: {
      namespaced: true,
      state: {
        label: 'ユーザーランキング',
        apiEndPoint:
          'https://script.google.com/macros/s/AKfycbzFQxdGgTZwZsdo7zoXoE0jp37PBsefRUS7_MPgJOo1WDs4UTk/exec',
        data: [
          {
            category: 'weekly',
            label: '週間',
            index: 0,
            items: [],
            isNext: true,
            loading: false,
          },
          {
            category: 'monthly',
            label: '月間',
            index: 0,
            items: [],
            isNext: true,
            loading: false,
          },
          {
            category: 'all',
            label: '全て',
            index: 0,
            items: [],
            isNext: true,
            loading: false,
          },
        ],
        dataIndex: 0,
        rows: 5,
      },
      getters,
      actions,
      mutations,
    },
    tagRankings: {
      namespaced: true,
      state: {
        label: 'タグランキング',
        apiEndPoint:
          'https://script.google.com/macros/s/AKfycbwtyoLF7ZodElzlG92i5BeYtMYi15qq83vNbXqTPZ1dQf5y2Cs/exec',
        data: [
          {
            category: 'weekly',
            label: '週間',
            index: 0,
            items: [],
            isNext: true,
            loading: false,
          },
          {
            category: 'monthly',
            label: '月間',
            index: 0,
            items: [],
            isNext: true,
            loading: false,
          },
          {
            category: 'all',
            label: '全て',
            index: 0,
            items: [],
            isNext: true,
            loading: false,
          },
        ],
        dataIndex: 0,
        rows: 5,
      },
      getters,
      actions,
      mutations,
    },
  },
};

export default rankings;
