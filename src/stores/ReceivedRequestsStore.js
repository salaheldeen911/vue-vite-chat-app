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
    async setUnreadedReceivedRequestsCount(token = null) {
      try {
        if (token) axios.defaults.headers.common["Authorization"] = token;

        let count = await axios.get("unreadedReceivedRequestsCount");
        this.unreadedReceivedRequestsCount = count.data.data.count;
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
    hi(user) {
      return "hi";
    },
    async acceptRequest(user) {
      console.log("D:", user);
      try {
        console.log("d");
        let m = await axios.post("acceptRequest", user);
        console.log(m);

        // await this.setReceivedRequests();

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
