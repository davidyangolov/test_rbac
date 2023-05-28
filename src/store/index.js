import { createStore } from 'vuex';
import coursesdata from './modules/coursesdata';

const store = createStore({
  modules: {
    coursesdata,
  },
});

export default store;