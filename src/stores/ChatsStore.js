import { defineStore } from "pinia";

export const ChatsStore = defineStore("chats", {
  state() {
    return {
      chats: [],
    };
  },
  actions: {
    setChats(chats) {
      this.chats = chats;
    },
  },
  persist: {
    strategies: [
      {
        key: "chats",
        storage: localStorage,
        paths: ["chats"],
      },
    ],
    enabled: true,
  },
});
