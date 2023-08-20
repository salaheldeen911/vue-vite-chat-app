// import { defineStore } from "pinia";
// import { AuthStore } from "./AuthStore";
// // import axiox from "../axios";
// import axiox from "axios";

// import { ref } from "vue";

// export const SentRequestsStore = defineStore("sentRequests", {
//   state() {
//     return {
//       sentRequests: [],
//       status: false,
//     };
//   },
//   actions: {
//     async setSentRequests(sentRequests) {
//       const auth = AuthStore();
//       try {
//         let res = await axios.get("sentRequests");
//         this.sentRequests = res.data.data;
//         console.log(res.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//       this.sentRequests = sentRequests;
//     },
//     toggleStatus() {
//       this.status = !this.status;
//     },
//   },
//   persist: {
//     strategies: [
//       {
//         key: "sentRequests",
//         storage: localStorage,
//         paths: ["sentRequests", "status"],
//       },
//     ],
//     enabled: true,
//   },
// });

// // export const SentRequestsStore = defineStore("sentRequests", () => {
// //   const sentRequests = ref([]);
// //   const status = ref(false);
// //   // const doubleCount = computed(() => count.value * 2);

// //   function setSentRequests(sentRequests) {
// //     sentRequests.value = sentRequests;
// //   }

// //   function toggleStatus() {
// //     status.value = !this.status;
// //   }

// //   return { sentRequests, status, toggleStatus, setSentRequests };
// // });

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
      // const auth = AuthStore();
      try {
        let res = await axios.get("sentRequests");
        this.sentRequests = res.data.data;
        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
      // this.sentRequests = sentRequests;
    },
    toggleStatus() {
      this.status = !this.status;
    },
    //   addTodo(value) {
    //     axios.get("http://jsonplaceholder.typicode.com/todos?_start=0&_limit=20");
    //     this.todos.push(value);
    //   },
    //   deleteTodo(value) {
    //     this.todos.splice(value, 1);
    //   },
    // },
    // getters: {
    //   filterTodos: (state) => {
    //     return (value) =>
    //       state.todos.filter((todo) => todo.title.includes(value));
    //   },
    //   async getTodos() {
    //     this.loading = true;
    //     const response = await axios.get(
    //       "http://jsonplaceholder.typicode.com/todos?_start=0&_limit=20"
    //     );
    //     try {
    //       this.todos = await response.data;
    //       this.loading = false;
    //     } catch (err) {
    //       this.todos = [];
    //       console.error("Error loading new Todos:", err);
    //       return err;
    //     }
    //   },
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
