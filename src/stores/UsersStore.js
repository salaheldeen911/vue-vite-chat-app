import { defineStore } from "pinia";

export const UsersStore = defineStore("users", {
  state() {
    return {
      users: [],
    };
  },
  actions: {
    setUsers(users) {
      this.users = users;
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
