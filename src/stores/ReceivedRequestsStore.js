import { defineStore } from "pinia";

export const ReceivedRequestsStore = defineStore("receivedRequests", {
  state() {
    return {
      receivedRequests: [],
      status: false,
      UnreadedReceivedRequestsCount: 0,
    };
  },
  actions: {
    setReceivedRequests(receivedRequests) {
      this.receivedRequests = receivedRequests;
    },
    setUnreadedReceivedRequestsCount(count) {
      this.UnreadedReceivedRequestsCount = count;
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
        paths: ["receivedRequests", "status", "UnreadedReceivedRequestsCount"],
      },
    ],
    enabled: true,
  },
});
