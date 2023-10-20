import { defineStore } from "pinia";
import { ChatsStore } from "./ChatsStore";
import { ReceivedRequestsStore } from "./ReceivedRequestsStore";
import { SentRequestsStore } from "./SentRequestsStore";
import { UsersStore } from "./UsersStore";

export const GeneralStore = defineStore("general", {
  actions: {
    refreshStores() {
      const ChatStore = ChatsStore();
      const ReceivedRequestStore = ReceivedRequestsStore();
      const SentRequestStore = SentRequestsStore();
      const UserStore = UsersStore();

      ReceivedRequestStore.setReceivedRequests();
      ChatStore.setChats();
      SentRequestStore.setSentRequests();
      UserStore.setUsers();
    },
  },
});
