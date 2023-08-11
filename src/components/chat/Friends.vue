<template>
  <div class="users-list">
    <div class="titel text-center fw-bold fst-italic">Friends</div>
    <div class="users-list-body">
      <ul class="list-unstyled chat-list mt-2 mb-0">
        <li
          :id="'user-' + chat.user.id"
          @click="openChat(chat.id)"
          class="user mb-2"
          v-for="chat in chats"
          :key="chat.id"
        >
          <img
            src="https://bootdey.com/img/Content/avatar/avatar2.png"
            alt="avatar"
          />
          <div class="about">
            <p class="name m-0 p-1">{{ chat.user.name }}</p>
            <p class="phone m-0 p-1">01273542801</p>

            <div v-if="chat.status" class="status">
              <i class="mdi mdi-check-circle online none"></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<!-- <script>
import { AuthStore } from "../../stores/AuthStore";
import { OnlineUsersStore } from "../../stores/OnlineUsersStore";
import axios from "axios";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const auth = AuthStore();
    const OnlineUsers = OnlineUsersStore();
    const { onlineUsers } = storeToRefs(OnlineUsers);

    return { auth, onlineUsers };
  },
  data() {
    return {
      //   onlineUsers: [],
      onlineIds: [],
      chats: [],
    };
  },
  watch: {
    onlineUsers() {
      //   this.onlineUsers = this.onlineUsersStore;

      for (const chat of this.chats) {
        //   console.log(chat.user.id);
        for (const onlineUser of this.onlineUsers) {
          console.log("onlineUser.id", onlineUser.id);
          console.log("chat.user.id", chat.user.id);

          if (onlineUser.id == chat.user.id) {
            console.log("ok");
            chat.user.status = true;
            console.log(chat);
          } else {
            console.log("notOk");
            chat.user.status = false;
          }
          // console.log(chat.user.id);
        }
      }
      console.log("online updated", this.onlineUsers[0].id);
    },
  },
  async mounted() {
    try {
      let chats = await axios.get("chats");
      this.chats = chats.data.chats;
      //   console.log("chats", chats);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    // setUsers(users) {
    //   this.onlineUsers = users.filter((u) => u.id != this.auth.user.id);
    // },
    // removeUser(user) {
    //   this.onlineUsers = this.onlineUsers.filter((u) => u.id != user.id);
    // },
    // addUser(user) {
    //   this.onlineUsers.push(user);
    //   console.log(this.onlineUsers);
    // },
    // isOnline(user) {
    //   this.onlineUsers.includes(user);
    // },
    openChat(id) {
      this.$emit("openChat", id);
    },
  },
};
</script> -->

<script setup>
// import { AuthStore } from "../../stores/AuthStore";
import { OnlineUsersStore } from "../../stores/OnlineUsersStore";
import axios from "axios";
import { storeToRefs } from "pinia";
import { onMounted, watch, ref, onBeforeMount } from "vue";

// const auth = AuthStore();
const OnlineStore = OnlineUsersStore();
const { onlineUsers } = storeToRefs(OnlineUsersStore);
const chats = ref([]);

function openChat(id) {
  this.$emit("openChat", id);
}

// onBeforeMount(async () => {
//   try {
//     chats.value = await get();
//   } catch (error) {
//     console.log(error);
//   }
// });

async function get() {
  let r = await axios.get("chats");
  return r.data.chats;
}

onMounted(async () => {
  console.log("hi here");
  try {
    chats.value = await get();
    if (chats.value.length > 0) {
      setTimeout(() => {
        hi();
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
  //   try {
  //     let availableChats = await axios.get("chats");
  //     chats = availableChats.data.chats;
  //   setTimeout(() => {
  //   }, 200);
  //   } catch (error) {
  //     console.log(error);
  //   }
});

// watch(OnlineStore.onlineUsers, () => {
//   console.log("watch ref changed, do something!");
// });

function getOnlineUsersIds(onlineUsers) {
  let ids = [];
  for (let onlineUser of onlineUsers) {
    ids.push(onlineUser.id);
  }
  return ids;
}

function hi() {
  const onlineUsersIds = getOnlineUsersIds(OnlineStore.onlineUsers);
  console.log("from hi", OnlineStore.onlineUsers);
  console.log("chats", chats.value);

  for (const chat of chats.value) {
    let chatElement = document.getElementById("user-" + chat.user.id);
    if (onlineUsersIds.includes(chat.user.id)) {
      chatElement.getElementsByTagName("i")[0].classList.remove("none");
    } else {
      chatElement.getElementsByTagName("i")[0].classList.add("none");
    }
  }
}

watch(
  () => OnlineStore.onlineUsers,
  () => {
    console.log("isLoggedIn state changed, do something!", this);
    hi();

    // for (const chat of this.chats) {
    //   for (const onlineUser of this.onlineUsers) {
    //     console.log("onlineUser.id", onlineUser.id);
    //     console.log("chat.user.id", chat.user.id);

    //     if (onlineUser.id == chat.user.id) {
    //       console.log("ok");
    //       chat.user.status = true;
    //       console.log(chat);
    //     } else {
    //       console.log("notOk");
    //       chat.user.status = false;
    //     }
    //   }
    // }
  },
  { deep: true }
);
</script>

<style>
</style>