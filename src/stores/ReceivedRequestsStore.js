import { defineStore } from "pinia";
import axios from "../axios";

export const ReceivedRequestsStore = defineStore("receivedRequests", {
  state() {
    return {
      receivedRequests: [],
      status: false,
      UnreadedReceivedRequestsCount: 0,
    };
  },
  actions: {
    async setReceivedRequests() {
      try {
        let res = await axios.get("receivedRequests");

        this.receivedRequests = res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async setUnreadedReceivedRequestsCount() {
      try {
        let count = await axios.get("unreadedReceivedRequestsCount");
        this.unreadedReceivedRequestsCount = count.data.data.count;
      } catch (errors) {
        console.log(errors);
      }
      // this.UnreadedReceivedRequestsCount = count;
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
