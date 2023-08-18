import { defineStore } from "pinia";

export const SentRequestsStore = defineStore("sentRequests", {
  state() {
    return {
      sentRequests: [],
      status: false,
    };
  },
  actions: {
    setSentRequests(sentRequests) {
      this.sentRequests = sentRequests;
    },
    toggleStatus() {
      this.status = !this.status;
    },
  },
  persist: {
    strategies: [
      {
        key: "sentRequests",
        storage: localStorage,
        paths: ["sentRequests", "status"],
      },
    ],
    enabled: true,
  },
});
