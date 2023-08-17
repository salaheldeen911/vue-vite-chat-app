<template>
  <div
    @focusout="handleFocusOut"
    tabindex="0"
    :class="{ show: status }"
    class="requests"
    ref="receivedRequests"
  >
    <h5 class="text-center">Received Requests</h5>
    <hr />

    <div
      v-for="request in receivedRequests"
      :key="request.id"
      class="alert alert-primary"
      role="alert"
    >
      <p>
        {{ request.name }} has sent you a friend request and his phone number is
        <strong> 01273542801</strong>. You can
        <strong role="button" @click="accept(request)" class="alert-link"
          >Accept It</strong
        >
        or you can
        <strong role="button" @click="ignore(request)" class="alert-link"
          >Ignore It</strong
        >.
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { AuthStore } from "../../stores/AuthStore";
import echo from "../../echo";
// import Echo from "laravel-echo";

export default {
  setup() {
    const auth = AuthStore();

    return { auth };
  },
  data() {
    return {
      receivedRequests: [],
      status: false,
    };
  },
  async mounted() {
    axios.defaults.headers.common["Authorization"] = this.auth.token(); // `Bearer ${this.auth.token()}`;
    if (!window.Echo) echo.initLaravelEcho();

    window.Echo.private(`cancel-friend-request-channel.${this.auth.user.id}`)
      .listen("CancelFriendRquestEvent", (e) => {
        this.getReceivedRequests();
        this.$emit("requestHasBeenCanceled");

        console.log("event", e);
      })
      .error((error) => {
        console.log(error);
      });
    await this.getReceivedRequests();
  },
  methods: {
    async getReceivedRequests() {
      try {
        let res = await axios.get("receivedRequests");
        this.receivedRequests = res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async accept(user) {
      try {
        let l = await axios.post("acceptRequest", user);
        await this.getReceivedRequests();
        this.$emit("requestHasBeenAccepted");
      } catch (error) {
        console.log(error);
      }
    },
    async ignore(user) {
      try {
        let z = await axios.put("ignoreRequest", user);
        await this.getReceivedRequests();
        console.log(z);
        // this.$emit("requestHasBeenAccepted");
      } catch (error) {
        console.log(error);
      }
    },
    toggle() {
      // this.$refs.email.$el.focus()
      if (!this.status) {
        this.$refs.receivedRequests.focus();
      }
      this.status = !this.status;
    },
    handleFocusOut() {
      this.status = false;
    },
  },
};
</script>

<style scoped>
.requests {
  height: calc(100vh - 115px);
  background: #eee;
  width: 35%;
  z-index: 100;
  position: fixed;
  right: 0;
  opacity: 0.9;
  border-radius: 5px;
  padding: 10px;
  transition: all 1s linear;
  transform: translateX(110%);
  overflow: auto;
}

.show {
  transform: translateX(0);
}
@media screen and (max-width: 400px) {
  .requests {
    width: 45%;
  }
}
</style>