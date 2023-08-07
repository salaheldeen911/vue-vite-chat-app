<template>
  <div>
    <!-- <div class="chat">
      <div class="chat-header clearfix">
        <div class="row">
          <div class="col-lg-6">
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
              <h6 class="m-b-0">{{ auth.user.name }}</h6>
              <small>Last seen: 2 hours ago</small>
            </div>
          </div>
          <div class="col-lg-6 hidden-sm text-right">
            <a href="javascript:void(0);" class="btn btn-outline-secondary"
              ><i class="mdi mdi-camera h5"></i
            ></a>
            <a href="javascript:void(0);" class="btn btn-outline-primary"
              ><i class="mdi mdi-image h5"></i
            ></a>
            <a href="javascript:void(0);" class="btn btn-outline-info"
              ><i class="mdi mdi-settings h5"></i
            ></a>
            <a href="javascript:void(0);" class="btn btn-outline-warning"
              ><i class="mdi mdi-comment-question-outline h5"></i
            ></a>
          </div>
        </div>
      </div>
      <preLoader v-if="loading" ref="preLoader" />

      <div v-if="!loading" class="chat-history" ref="chatHistory">
        <ul class="m-b-0" v-if="data.length">
          <li class="clearfix" v-for="message in data" :key="message.id">
            <div
              class="message-data"
              :class="{ textRight: message.user.id == auth.user.id }"
            >
              <span class="message-data-time fw-bold fst-italic">
                {{ message.created_at }}
              </span>
            </div>
            <div
              class="relative message"
              :class="[
                message.user.id == auth.user.id
                  ? 'otherMessage floatRight'
                  : 'my-message',
              ]"
            >
              <span
                v-if="message.user.id !== auth.user.id"
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
      <div v-if="!loading" class="chat-message clearfix">
        <form class="input-group mb-0" @submit.prevent.enter="send">
          <div class="input-group-prepend">
            <button type="submit" class="input-group-text">
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
    </div> -->
  </div>
</template>
<!-- 
<script>
import preLoader from "../preLoader.vue";
import { AuthStore } from "../../stores/AuthStore";
import axios from "axios";

export default {
  components: { preLoader },
  setup() {
    const auth = AuthStore();
    return { auth };
  },
  async mounted() {
    await this.getData();
    this.$refs.mainInput.focus();
    Echo.join("public-chat")
      .here((users) => {
        //returnning all users but the current
        this.$emit("setUsers", users);
      })
      .joining((user) => {
        //adding the juiond user th users
        this.$emit("userJoined", user);
      })
      .leaving((user) => {
        // removing the left user from users
        this.$emit("leftUser", user);
      })
      .error((error) => {
        console.log(error);
      })
      .listen("MessageEvent", (message) => {
        this.data.push(message.message);
      });
  },
  beforeUnmount() {
    window.Echo.leave("public-chat"); // ??
  },

  data() {
    return {
      noData: true,
      scroll: true,
      loading: true,
      data: [],
      message: "",
    };
  },
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
        let res = await axios.get("messages");
        this.data = res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async send() {
      console.log("D:");
      if (!this.validate(this.message)) {
        return false;
      }
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
</script> -->

<!-- <style scoped lang="scss">
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.relative {
  position: relative;
}

.floatRight {
  float: right;
}
.preloader {
  height: 500px;
}
.textRight {
  text-align: right;
}
.chat-app .chat {
  margin-left: 280px;
  border-left: 1px solid #eaeaea;
}

.chat .chat-header {
  padding: 15px 20px;
  border-bottom: 2px solid #f4f7f6;
}

.chat .chat-header img {
  float: left;
  border-radius: 40px;
  width: 40px;
}

.chat .chat-header .chat-about {
  float: left;
  padding-left: 10px;
}

.chat .chat-history {
  padding: 20px;
  border-bottom: 2px solid #fff;
  height: 420px;
  overflow: auto;
  &::-webkit-scrollbar-thumb {
    background-color: #747d72;
    border: 2px solid #747d72;
    border-radius: 20px;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }
}

.chat .chat-history ul {
  padding: 0;
}

.chat .chat-history ul li {
  list-style: none;
  margin-bottom: 30px;
}

.chat .chat-history ul li:last-child {
  margin-bottom: 0px;
}

.chat .chat-history .message-data {
  margin-bottom: 15px;
}

.chat .chat-history .message-data img {
  border-radius: 40px;
  width: 40px;
}

.chat .chat-history .message-data-time {
  color: #434651;
  padding-left: 6px;
  font-size: 12px;
}

.chat .chat-history .message {
  color: #444;
  padding: 8px 10px;
  line-height: 26px;
  font-size: 16px;
  border-radius: 7px;
  display: inline-block;
  position: relative;
  p {
    margin: 3px;
  }
}

.chat .chat-history .message:after {
  bottom: 100%;
  right: 12px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #fff;
  border-width: 10px;
  margin-left: -10px;
}

.chat .chat-history .my-message {
  background: #efefef;
}

.chat .chat-history .my-message:after {
  bottom: 100%;
  left: 30px;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #efefef;
  border-width: 10px;
  margin-left: -10px;
}

.chat .chat-history .otherMessage {
  background: #e8f1f3;
  text-align: right;
}

.chat .chat-history .otherMessage:after {
  border-bottom-color: #e8f1f3;
  right: 12px;
}

.chat .chat-message {
  padding: 20px;
}

@media only screen and (max-width: 767px) {
  .chat .chat-header {
    padding: 15px 35px;
  }

  .chat-app .chat {
    margin: 0;
  }
  .chat-app .chat .chat-header {
    border-radius: 0.55rem 0.55rem 0 0;
  }
  .chat-app .chat-history {
    height: 300px;
    overflow-x: auto;
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .chat-app .chat-history {
    height: 600px;
    overflow-x: auto;
  }
}
</style> -->
