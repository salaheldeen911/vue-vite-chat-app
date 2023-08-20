import axios from "../axios";
import { defineStore } from "pinia";
// import { AuthStore } from "./AuthStore";

export const SentRequestsStore = defineStore("sentRequests", {
  state: () => ({
    sentRequests: [],
    status: false,
  }),
  actions: {
    async setSentRequests() {
      try {
        let res = await axios.get("sentRequests");
        this.sentRequests = res.data.data;
      } catch (error) {
        console.log(error);
      }
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
