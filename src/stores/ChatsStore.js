import { defineStore } from "pinia";

export const ChatsStore = defineStore("chats", {
  state() {
    return {
      chats: [],
      activeChat: null,
    };
  },
  actions: {
    setChats(chats) {
      this.chats = chats;
    },
    setActiveChat(id) {
      this.activeChat = id;
    },
    resetActiveChat() {
      this.activeChat = null;
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
