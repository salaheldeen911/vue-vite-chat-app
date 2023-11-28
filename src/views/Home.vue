<template>
  <div class="home">
    <div class="label-img">
      <img alt="Vue logo" src="/vite.svg" />
    </div>

    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
  <div class="card" style="font-family: cursive">
    <div class="card-body d-flex flex-column">
      <h2 class="card-title text-center mb-4">
        Welcome To The To-do & Chat App
      </h2>
      <div class="main-text flex-grow-1">
        <p class="card-text overflow-auto">
          Welcome to our innovative and feature-rich website that offers a
          seamless user experience with an array of functionalities. Our
          platform provides an authentication system, a comprehensive (Create,
          Read, Update, Delete, Change status) to-do list, a real-time chat app,
          friend request management, public chat rooms, and private chat rooms
          with typing indicator notifications. With our robust authentication
          system, users can securely register, log in, and manage their
          accounts. Once authenticated, users gain access to a variety of
          engaging features that enhance their productivity and connectivity.
          Our full CRUD todo list functionality allows users to create, edit,
          update, change status, and delete tasks effortlessly.
          <br />
          Experience real-time communication with our advanced chat app. Engage
          in conversations with friends, family, or colleagues via public chat
          rooms where all users can send messages and read ongoing discussions.
          Additionally, our private chat rooms enable one-to-one conversations
          between friends.
          <br />
          Not only can you exchange messages, but we have also included a unique
          feature - a typing indicator. This indicator notifies the receiver
          when their friend is typing a message, adding an element of
          anticipation and ensuring smooth and interactive conversations.
        </p>
      </div>

      <div class="links">
        <router-link v-if="auth.status" class="card-link" to="/chat"
          >Go To Public Chat Room</router-link
        >
        <router-link v-if="auth.status" class="card-link" to="/game"
          >Play A Game</router-link
        >

        <router-link v-if="auth.status" class="card-link" to="/todo"
          >Go To Your To-do list</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { AuthStore } from "../stores/AuthStore";

const auth = AuthStore();
</script>

<style scoped lang="scss">
.home {
  height: calc(100vh - 115px);
}
.links {
  justify-self: end;
  display: flex;
  justify-content: space-between;
  padding: 30px;
}
.label-img {
  height: calc(100vh - 115px);
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 50%;
    height: 50%;
  }
}

.card {
  position: absolute;
  top: 15px;
  bottom: 20px;
  right: 50px;
  left: 50px;
  opacity: 0.8;
  overflow: auto;
}

.card-text {
  height: 100%;
  line-height: 2;
}
</style>
