export const actions = {
  async getMessengerToken({ commit }) {
    const data = await this.$axios.$post("/messengerToken");
    commit("getMessengerToken", data);
    return data;
  },
};

export const getters = {

};

export const mutations = {
  getMessengerToken(state, payload) {
    state.session = payload;
  },
};

export const state = () => {
  return {
    session: null,
  };
};
