import { defineStore } from "pinia";
import axios from "../axios";

export const UsersStore = defineStore("users", {
  state() {
    return {
      users: [],
    };
  },
  actions: {
    async setUsers(users) {
      try {
        let res = await axios.get(`users/10`);
        this.users = res.data.users;
      } catch (error) {
        console.log("error", error);
      }
    },
  },
  persist: {
    strategies: [
      {
        key: "users",
        storage: localStorage,
        paths: ["users"],
      },
    ],
    enabled: true,
  },
});
