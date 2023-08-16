<template>
  <div class="users-list">
    <div class="titel text-center fw-bold fst-italic">Users</div>
    <div class="users-list-header">
      <div class="input-group">
        <div class="input-group-prepend w-25 h-100">
          <span role="button" class="input-group-text h-100"
            ><i style="margin: 0 auto" class="mdi mdi-account-search h4"></i
          ></span>
        </div>
        <input type="text" class="form-control p-1" placeholder="Search..." />
      </div>
    </div>
    <div class="users-list-body">
      <ul class="list-unstyled chat-list mt-2 mb-0">
        <li
          @click.exact="this.sendRequest(user)"
          v-for="user in users"
          :key="user.id"
          class="user mb-2"
        >
          <img
            src="https://bootdey.com/img/Content/avatar/avatar2.png"
            alt="avatar"
          />
          <div class="about">
            <div class="name">{{ user.name }}</div>
            <div v-if="user.status" class="status">
              <i class="fa fa-circle online"></i> online
            </div>
          </div>
          <button
            @click="this.sendRequest(user)"
            class="btn btn-primary request-btn"
            style="z-index: 9999"
          >
            Send request
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { AuthStore } from "../../stores/AuthStore";
import axios from "axios";
export default {
  setup() {
    const auth = AuthStore();
    return { auth };
  },
  data() {
    return {
      users: [],
    };
  },
  async mounted() {
    try {
      let users = await axios.get("users/10");
      this.users = users.data.users;
    } catch (error) {
      console.log("error", error);
    }
  },
  methods: {
    async sendRequest(user) {
      if (confirm("DO you want to send a friend request to " + user.name)) {
        let r = await axios.post("friendRequest", user);
        console.log(r);
        this.$emit("sentRequest");
      }
    },
  },
};
</script>

<style>
</style>