<template>
  <div id="main">
    <div class="users-lists" ref="usersLists">
      <div @click="showUsers()" class="showBtn none" ref="arrowShow">
        <span
          id="arrowShow"
          role="button"
          class="mdi mdi-chevron-double-right"
        ></span>
      </div>
      <not-friends />
      <friends ref="friendsComponent" />
      <div @click="hideUsers()" class="hideBtn none" ref="arrowHide">
        <span
          id="arrowHide"
          role="button"
          class="mdi mdi-chevron-double-left"
        ></span>
      </div>
    </div>
    <mainChat ref="mainChatComponent" />
  </div>
</template>

<script setup>
import mainChat from "../components/chat/main/mainChat.vue";
import NotFriends from "../components/chat/NotFriends.vue";
import Friends from "../components/chat/Friends.vue";
import { ref } from "vue";

const props = defineProps(["openChat"]);
const friendsComponent = ref(null);
const arrowShow = ref(null);
const arrowHide = ref(null);
const mainChatComponent = ref(null);

// function openChat(id) {
//   mainChatComponent.value.openPrivateChat(id);
// }
function showUsers() {
  friendsComponent.value.classList.add("show-users-lists");
  arrowShow.value.classList.add("hide", "disabled");
  arrowHide.value.classList.add("flex");
}
function hideUsers() {
  friendsComponent.value.classList.remove("show-users-lists");
  arrowShow.value.classList.remove("hide", "disabled");
  arrowHide.value.classList.remove("flex");
}
</script>
