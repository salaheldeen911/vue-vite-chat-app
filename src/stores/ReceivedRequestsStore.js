import { defineStore } from "pinia";

export const ReceivedRequestsStore = defineStore("receivedRequests", {
  state() {
    return {
      receivedRequests: [],
      status: false,
    };
  },
  actions: {
    setReceivedRequests(receivedRequests) {
      this.receivedRequests = receivedRequests;
    },
    toggleStatus() {
      this.status = !this.status;
    },
  },
  persist: {
    strategies: [
      {
        key: "receivedRequests",
        storage: localStorage,
        paths: ["receivedRequests", "status"],
      },
    ],
    enabled: true,
  },
});
