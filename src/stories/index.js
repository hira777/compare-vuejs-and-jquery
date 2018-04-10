import Vuex from 'vuex';
import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean, text, array } from '@storybook/addon-knobs/vue';
import { action } from '@storybook/addon-actions';
import VueInfoAddon from 'storybook-addon-vue-info';

import MyButton from '../js/components/Button.vue';
import Loading from '../js/components/Loading.vue';
import Rankings from '../js/components/Rankings.vue';
import RankingsLabel from '../js/components/RankingsLabel.vue';
import TagRankings from '../js/components/TagRankings.vue';
import rankingsStore from '../js/vue-vuex/store/rankings/';

storiesOf('Buttons', module)
  .addDecorator(VueInfoAddon)
  .add('default', () => ({
    components: { MyButton },
    template: '<my-button @click.native="log">default</my-button>',
    methods: {
      log() {
        action('log1');
      },
    },
  }));

storiesOf('Loadings', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('default', () => {
    const isLoading = boolean('isLoading', true);

    return {
      components: { Loading },
      template: `<loading :isLoading="${isLoading}"></loading>`,
    };
  });

storiesOf('Rankings', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('rankings', () => {
    const label = text('label', 'ユーザーランキング');
    const tabItems = array('tabItems', ['週間', '月刊', '全て']);
    const items = array('items', [
      {
        userName: 'sam',
        screenName: 'samsam',
        contributionCount: 2297,
      },
      {
        userName: 'same',
        screenName: 'samsam',
        contributionCount: 1789,
      },
    ]);

    return {
      components: { Rankings },
      template: `
        <rankings
          :label="label"
          :tabItems="tabItems"
          :currentRankingsItems="items"
          :handleIndex="handleIndex"></rankings>`,
      data() {
        return {
          label,
          tabItems,
          items,
        };
      },
      methods: {
        handleIndex() {
          action('handleIndex');
        },
      },
    };
  })
  .add('rankings label', () => {
    return {
      components: { RankingsLabel },
      template: `<rankings-label>ランキング</rankings-label>`,
    };
  })
  .add('tag rankings with Vuex', () => {
    return {
      components: { TagRankings },
      template: `<tag-rankings></tag-rankings>`,
      store: new Vuex.Store({
        modules: {
          rankings: rankingsStore,
        },
      }),
    };
  });
