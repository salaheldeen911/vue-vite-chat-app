<template>
  <div class="container">
    <div class="row clearfix">
      <div class="col-lg-12">
        <div class="card chat-app">
          <users-list ref="peopleList" />
          <mainChat
            @userJoined="userJoined"
            @setUsers="setUsers"
            @leftUser="leftUser"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
// import mainChat from "../components/chat/main.vue";
// import peopleList from "../components/chat/peopleList.vue";

// import preLoader from "../components/preLoader.vue";
// import preLoader from "../components/preLoader.vue";

export default {
  name: "mainNav",
  components: { mainChat, peopleList },
  // setup() {
  //   const auth = AuthStore();
  //   return { auth };
  // },
  // async mounted() {
  //   await this.getData();
  //   this.$refs.mainInput.focus();
  //   Echo.join("public-chat")
  //     .here((users) => {
  //       //returnning all users but the current
  //       this.users = users.filter((u) => u.id != this.auth.user.id);
  //     })
  //     .joining((user) => {
  //       //adding the juiond user th users
  //       this.users.push(user);
  //     })
  //     .leaving((user) => {
  //       // removing the left user from users
  //       this.users = this.users.filter((u) => u.id != user.id);
  //     })
  //     .error((error) => {
  //       console.log(error);
  //     })
  //     .listen("MessageEvent", (message) => {
  //       this.data.push(message.message);
  //     });
  // },
  // beforeUnmount() {
  //   window.Echo.leave("public-chat"); // ??
  // },

  // data() {
  //   return {
  //     message: "",
  //     noData: true,
  //     scroll: true,
  //     loading: true,
  //     users: [],
  //     data: [],
  //     messages: [],
  //     dates: [],
  //   };
  // },
  // updated() {
  //   if (this.scroll) {
  //     this.$refs.chatHistory.scrollTop = this.$refs.chatHistory.scrollHeight;
  //     this.loading = false;
  //   }
  // },
  // watch: {
  //   data(newVal) {
  //     newVal.length ? (this.noData = false) : (this.noData = true);
  //     this.loading = false;
  //   },
  // },
  methods: {
    // async getData() {
    //   try {
    //     let res = await axios.get("messages");
    //     this.data = res.data.data;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // async send() {
    //   if (!this.validate(this.message)) {
    //     return false;
    //   }
    //   try {
    //     await axios.post("messages", { message: this.message });
    //     this.scroll = true;
    //     this.$refs.mainInput.focus();
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   this.message = "";
    //   this.$refs.mainInput.focus();
    // },
    // validate(body) {
    //   // to prevent html tags
    //   const htmlPreventer = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
    //   if (htmlPreventer.test(body)) return false;

    //   // to accept all chars, nums, spaces, new lines and prevent less than 3 chars, over 255 chars.
    //   const pattern = /^([a-zA-Z0-9_ \s\S-]){1,5000}$/;
    //   return pattern.test(body);
    // },
    // showUsers() {
    //   this.$refs.plist.classList.add("show");
    //   this.$refs.arrowShow.classList.remove("block");
    //   this.$refs.arrowHide.classList.add("block");
    // },
    // hideUsers() {
    //   this.$refs.plist.classList.remove("show");
    //   this.$refs.arrowShow.classList.add("block");
    //   this.$refs.arrowHide.classList.remove("block");
    // },
    setUsers(users) {
      console.log(users);
      this.$refs.peopleList.setUsers(users);
    },
    userJoined(user) {
      this.$refs.peopleList.addUser(user);
    },
    leftUser(user) {
      this.$refs.peopleList.removeUser(user);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  background: #fff;
  transition: 0.5s;
  border: 0;
  margin-bottom: 30px;
  border-radius: 0.55rem;
  position: relative;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
}
.chat-app {
  margin-bottom: 15px !important;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

// @media only screen and (max-width: 767px) {
//   .chat-app .users-list {
//     height: 100%;
//     width: 50%;
//     left: -410px;
//     background: whitesmoke;

//     &.show {
//       left: 0;
//     }
//   }
//   .chat .chat-header {
//     padding: 15px 35px;
//   }

//   .block {
//     display: block !important;
//   }

//   #arrowShow {
//     font-size: 40px;
//     position: fixed;
//     top: 20px;
//     left: 0;
//     color: green;

//     &:hover {
//       font-size: 45px;
//     }
//   }

//   #arrowHide {
//     font-size: 30px;
//     position: absolute;
//     z-index: 9;
//     top: 90px;
//     left: 100%;

//     &:hover {
//       font-size: 35px;
//     }
//   }

//   .chat-app .users-list.open {
//     left: 0;
//   }
//   .chat-app .chat {
//     margin: 0;
//   }
//   .chat-app .chat .chat-header {
//     border-radius: 0.55rem 0.55rem 0 0;
//   }
//   .chat-app .chat-history {
//     height: 300px;
//     overflow-x: auto;
//   }
// }
</style>
