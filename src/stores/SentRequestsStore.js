import axios from "../axios";
import { defineStore } from "pinia";

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
    async cancelRequest(user) {
      try {
        await axios.delete("cancelRequest", { data: { user: user } });
        this.setSentRequests();
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
