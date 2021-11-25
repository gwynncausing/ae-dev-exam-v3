import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
import { state } from "./state";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";

export default new Vuex.Store({
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  plugins: [createPersistedState()],
});
