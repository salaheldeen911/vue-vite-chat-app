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
          @click.exact="sendRequest(user)"
          v-for="user in users"
          :key="user.id"
          class="user mb-2"
        >
          <img src="/male.png" alt="avatar" />
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

<script setup>
import { UsersStore } from "../../stores/UsersStore";
import axios from "axios";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { SentRequestsStore } from "../../stores/SentRequestsStore";

const SentRequestStore = SentRequestsStore();
const UserStore = UsersStore();
const { users } = storeToRefs(UserStore);

async function sendRequest(user) {
  if (confirm("DO you want to send a friend request to " + user.name)) {
    let r = await axios.post("friendRequest", user);
    setSentRequests();
  }
}

async function setSentRequests() {
  try {
    let res = await axios.get("sentRequests");
    SentRequestStore.setSentRequests(res.data.data);
  } catch (error) {
    console.log(error);
  }
}

// async function getUsers() {
//   try {
//     return await axios.get(`users/10`);
//   } catch (error) {
//     console.log("error", error);
//   }
// }

onMounted(async () => {
  // let users = await getUsers();
  UserStore.setUsers();
});

watch(
  () => users.value,
  () => {
    // getUsers();
  },
  { deep: true }
);
</script>

<style scoped>
#site-container main .users-lists .users-list {
  grid-template-rows: 30px 60px 1fr;
}
</style>