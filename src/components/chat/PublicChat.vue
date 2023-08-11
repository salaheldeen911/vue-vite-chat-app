<template>
  <div class="main-chat">
    <preLoader v-if="loading" ref="preLoader" />

    <div class="titel text-center fw-bold fst-italic">Public Chat</div>
    <div class="main-chat-header">
      <div class="userInfo">
        <a
          href="javascript:void(0);"
          data-toggle="modal"
          data-target="#view_info"
        >
          <img
            src="https://bootdey.com/img/Content/avatar/avatar2.png"
            alt="avatar"
          />
        </a>
        <div class="chat-about">
          <h6 class="m-b-0">{{ auth.user ? auth.user.name : "" }}</h6>
          <small>Last seen: 2 hours ago</small>
        </div>
      </div>

      <div class="chat-icons">
        <a href="javascript:void(0);" class="btn btn-outline-primary"
          ><i class="mdi mdi-image h5"></i
        ></a>
      </div>
    </div>

    <div class="chat-history" ref="chatHistory">
      <ul class="m-b-0" v-if="data.length">
        <li class="clearfix" v-for="message in data" :key="message.id">
          <div
            v-if="auth.user"
            class="message-data"
            :class="{ textRight: message.user.id == auth.user.id }"
          >
            <span class="message-data-time fw-bold fst-italic">
              {{ message.created_at }}
            </span>
          </div>
          <div
            v-if="auth.user"
            class="relative message"
            :class="[
              message.user.id == auth.user.id
                ? 'otherMessage floatRight'
                : 'my-message',
            ]"
          >
            <span
              v-if="auth.user && message.user.id !== auth.user.id"
              class="fw-bold fst-italic"
              >{{ message.user.name }}</span
            >
            <p>
              {{ message.message }}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="chat-message clearfix">
      <form class="input-group mb-0" @submit.prevent.enter="send">
        <div class="input-group-prepend">
          <button :disabled="sending" type="submit" class="input-group-text">
            <i class="mdi mdi-send"></i>
          </button>
        </div>
        <input
          v-model="message"
          ref="mainInput"
          type="text"
          class="form-control"
          placeholder="Enter text here..."
        />
      </form>
    </div>
  </div>
</template>

<script>
import preLoader from "../preLoader.vue";
import { AuthStore } from "../../stores/AuthStore";
import axios from "axios";
import Echo from "laravel-echo";

export default {
  data() {
    return {
      noData: true,
      scroll: true,
      loading: true,
      data: [],
      message: "",
      sending: false,
      publicChat: true,
    };
  },
  setup() {
    const auth = AuthStore();
    return { auth };
  },

  async mounted() {
    await this.getData();
    this.$refs.mainInput.focus();
    const auth = AuthStore();

    window.Echo.join("public-chat").listen("MessageEvent", (message) => {
      this.data.push(message.message);
    });
  },

  beforeUnmount() {
    // console.log("beforeUnmount", "left");
    // window.Echo.leave("public-chat"); // ??
  },

  components: { preLoader },

  updated() {
    if (this.scroll) {
      this.$refs.chatHistory.scrollTop = this.$refs.chatHistory.scrollHeight;
      this.loading = false;
    }
  },

  watch: {
    data(newVal) {
      newVal.length ? (this.noData = false) : (this.noData = true);
      this.loading = false;
    },
  },

  methods: {
    async getData() {
      try {
        let res = await axios.get("getPublicMessages");
        this.data = res.data.data;
        this.loading = false;
      } catch (error) {
        console.log("ho", error);
      }
    },

    async send() {
      if (!this.validate(this.message)) {
        return false;
      }
      this.sending = true;
      try {
        // await axios.post("messages", { message: this.message });
        console.log(await axios.post("messages", { message: this.message }));
        this.scroll = true;
        this.$refs.mainInput.focus();
      } catch (error) {
        console.log(error);
      }
      this.message = "";
      this.$refs.mainInput.focus();
      this.sending = false;
    },

    validate(body) {
      // to prevent html tags
      const htmlPreventer = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
      if (htmlPreventer.test(body)) return false;

      // to accept all chars, nums, spaces, new lines and prevent less than 3 chars, over 255 chars.
      const pattern = /^([a-zA-Z0-9_ \s\S-]){1,5000}$/;
      return pattern.test(body);
    },
  },
};
</script>

<style scoped lang="scss">
// .preloader {
//   height: unset;
//   position: absolute;
//   top: 82px;
//   bottom: 0;
//   z-index: 1;
// }
// #main-chat {
//   position: relative;
//   display: grid;
//   grid-template-rows: 30px 47px 1fr;
//   overflow: auto;
//   gap: 5px;
//   border: 1px solid #eee;
//   border-radius: 10px;

//   img {
//     height: 40px;
//     width: 40px;
//     border-radius: 50%;
//     margin-right: 5px;
//   }
//   .main-chat-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 0 5px;
//     border-bottom: 1px solid #eee;

//     .userInfo {
//       display: flex;
//     }
//   }

//   .chat-history {
//     padding: 20px;
//     border-bottom: 2px solid #fff;
//     height: 100%;
//     overflow: auto;
//     &::-webkit-scrollbar-thumb {
//       background-color: #747d72;
//       border: 2px solid #747d72;
//       border-radius: 20px;
//     }

//     &::-webkit-scrollbar {
//       width: 10px;
//     }
//   }

//   .chat-history ul {
//     padding: 0;
//   }

//   .chat-history ul li {
//     list-style: none;
//     margin-bottom: 30px;
//   }

//   .chat-history ul li:last-child {
//     margin-bottom: 0px;
//   }

//   .chat-history .message-data {
//     margin-bottom: 15px;
//   }

//   .chat-history .message-data img {
//     border-radius: 40px;
//     width: 40px;
//   }

//   .chat-history .message-data-time {
//     color: #434651;
//     padding-left: 6px;
//     font-size: 12px;
//   }

//   .chat-history .message {
//     color: #444;
//     padding: 8px 10px;
//     line-height: 26px;
//     font-size: 16px;
//     border-radius: 7px;
//     display: inline-block;
//     position: relative;
//     p {
//       margin: 3px;
//     }
//   }

//   .chat-history .message:after {
//     bottom: 100%;
//     right: 12px;
//     border: solid transparent;
//     content: " ";
//     height: 0;
//     width: 0;
//     position: absolute;
//     pointer-events: none;
//     border-bottom-color: #fff;
//     border-width: 10px;
//     margin-left: -10px;
//   }

//   .chat-history .my-message {
//     background: #efefef;
//   }

//   .chat-history .my-message:after {
//     bottom: 100%;
//     left: 30px;
//     border: solid transparent;
//     content: " ";
//     height: 0;
//     width: 0;
//     position: absolute;
//     pointer-events: none;
//     border-bottom-color: #efefef;
//     border-width: 10px;
//     margin-left: -10px;
//   }

//   .chat-history .otherMessage {
//     background: #e8f1f3;
//     text-align: right;
//   }

//   .chat-history .otherMessage:after {
//     border-bottom-color: #e8f1f3;
//     right: 12px;
//   }

//   .chat-message {
//     padding: 20px;

//     form {
//       height: 40px;
//       button {
//         width: 40px;
//         height: 100%;
//         justify-content: center;
//         text-align: center;
//       }
//     }
//   }
// }

// .titel {
//   padding: 5px;
//   border-bottom: 1px solid #eee;
// }

// .clearfix:after {
//   visibility: hidden;
//   display: block;
//   font-size: 0;
//   content: " ";
//   clear: both;
//   height: 0;
// }
// .relative {
//   position: relative;
// }

// .floatRight {
//   float: right;
// }

// .textRight {
//   text-align: right;
// }

// .none {
//   display: none;
// }

// .flex {
//   display: flex;
// }
</style>