import { defineStore } from "pinia";

export const ChatsStore = defineStore("chats", {
  state() {
    return {
      chats: [],
      activeChat: null,
      isPublic: true,
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
      this.isPublic = true;
    },
    setIsPublic(status) {
      this.isPublic = status;
    },
    resetIsPublic(status) {
      this.isPublic = true;
    },
    reset() {
      this.isPublic = true;
      this.activeChat = null;
    },
  },
  persist: {
    strategies: [
      {
        key: "chats",
        storage: localStorage,
        paths: ["chats"],
        // paths: ["chats", "activeChat", "isPublic"],
      },
    ],
    enabled: true,
  },
});
