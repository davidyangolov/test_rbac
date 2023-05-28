import httpClient from "../../services/http.service";

const coursesdata = {
  state: () => ({
    courses: [],
  }),
  actions: {
    async GET_COURSES({ commit }) {
      const { status, data } = await httpClient.get('api/get-courses');
      if (status === 200) {
        commit('SET_COURSES', data);
      }
    },
  },
  mutations: {
    SET_COURSES(state, backendData) {
      state.courses = backendData;
    },
  },
};

export default coursesdata;