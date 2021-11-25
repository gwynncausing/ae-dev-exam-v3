import axios from "axios";
import { BASE_URL, USERS } from "@/utils/constants";

export const actions = {
  async FETCH_USERS({ commit }) {
    const response = await axios.get(BASE_URL + USERS);
    commit("SET_USERS", response.data);
  },
  async UPDATE_USER({ commit }, customer) {
    const response = await axios.put(`${BASE_URL}${USERS}/${customer.id}`);
    // passing the customer instead of response.data since the update above is faked
    commit("UPDATE_USER", customer);
  },
  async ADD_USER({ commit }, customer) {
    const response = await axios.post(`${BASE_URL}${USERS}`);
    // passing the customer instead of response.data since the update above is faked
    commit("ADD_USER", customer);
  },
  async REMOVE_USER({ commit }, id) {
    const response = await axios.delete(`${BASE_URL}${USERS}${id}`);
    // passing the id instead of response.data since the update above is faked
    commit("REMOVE_USER", id);
  },
};
