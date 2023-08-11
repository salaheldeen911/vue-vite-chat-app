import { defineStore } from "pinia";

export const OnlineUsersStore = defineStore("onlineUsers", {
  state() {
    return {
      onlineUsers: [],
    };
  },
  actions: {
    base(users) {
      this.onlineUsers = users;
    },
    joined(user) {
      this.onlineUsers.push(user);
    },
    left(user) {
      let targetUser = this.onlineUsers.findIndex(
        (onlineUser) => onlineUser.id === user.id
      );

      this.onlineUsers.splice(targetUser, 1);
    },
  },
  persist: {
    strategies: [
      {
        key: "onlineUsers",
        storage: localStorage,
        paths: ["onlineUsers"],
      },
    ],
    enabled: true,
  },
});
