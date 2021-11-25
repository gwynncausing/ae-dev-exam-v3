import axios from "axios";
import { BASE_URL, USERS } from "@/utils/constants";

export const actions = {
  async fetchUsers({ commit }) {
    const response = await axios.get(BASE_URL + USERS);
    commit("setUsers", response.data);
  },
};
