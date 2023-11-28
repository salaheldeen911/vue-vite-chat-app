import { defineStore } from "pinia";
import axios from "../axios";

export const ChatsStore = defineStore("chats", {
  state() {
    return {
      chats: [],
      activeChat: null,
      isPublic: true,
    };
  },
  actions: {
    async setChats() {
      let updatedChats = await axios.get("chats");

      this.chats = updatedChats.data.chats;
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
      },
    ],
    enabled: true,
  },
});
