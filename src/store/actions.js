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
};
