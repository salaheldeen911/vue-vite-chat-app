import { defineStore } from "pinia";
import axios from "../axios";

export const ReceivedRequestsStore = defineStore("receivedRequests", {
  state() {
    return {
      receivedRequests: [],
      status: false,
      unreadedReceivedRequestsCount: 0,
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
      console.log("D:set");
      try {
        let count = await axios.get("unreadedReceivedRequestsCount");
        this.unreadedReceivedRequestsCount = count.data.data.count;
        console.log(this.unreadedReceivedRequestsCount);
      } catch (errors) {
        console.log(errors);
      }
    },
    async ignoreRequest(user) {
      try {
        await axios.put("ignoreRequest", user);
        await this.setReceivedRequests();
        // this.$emit("requestHasBeenAccepted");
      } catch (error) {
        console.log(error);
      }
    },
    async acceptRequest(user) {
      try {
        await axios.post("acceptRequest", user);
        await this.setReceivedRequests();

        // this.$emit("requestHasBeenAccepted");
      } catch (error) {
        console.log(error);
      }
    },
    async readAllReceivedRequests() {
      axios.put("readAllReceivedRequests");
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
