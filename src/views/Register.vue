<template>
  <div class="container">
    <h1>Register</h1>

    <form @submit.prevent="register">
      <div class="imgcontainer">
        <img src="/male.png" alt="Avatar" class="avatar" />
      </div>
      <div v-if="errorMessage" class="alert alert-danger">
        <strong>{{ errorMessage }}!</strong>
      </div>

      <div class="container">
        <label for="username"><b>Username</b></label>
        <input
          v-model="data.name"
          type="text"
          placeholder="Enter Username"
          name="username"
          required
        />

        <label for="email"><b>Email</b></label>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          required
          v-model="data.email"
        />

        <label for="psw"><b>Password</b></label>
        <input
          v-model="data.password"
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
        />

        <button
          :disabled="submiting"
          :class="{ disabled: submiting }"
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { AuthStore } from "../stores/AuthStore";
import echo from "../echo";

export default {
  setup() {
    const auth = AuthStore();
    return { auth };
  },
  data() {
    return {
      data: {
        name: "",
        email: "",
        password: "",
      },
      errorMessage: "",
      submiting: false,
    };
  },
  methods: {
    async register() {
      this.submiting = true;

      try {
        let response = await axios.post("register", this.data);
        if (response.data.user && response.data.token) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          this.auth.setData(response.data.user, response.data.token);
          echo.initLaravelEcho();
          this.$router.push({ path: "/", replace: true });
          this.submiting = false;
          return true;
        }
        console.error("Somthing went wrong !!");

        return false;
      } catch (errors) {
        console.log(errors);
        this.errorMessage = errors.response.data.message;
        this.submiting = false;
      }
    },
  },
};
</script>

<style scoped>
form {
  border: 3px solid #f1f1f1;
  font-family: Arial, Helvetica, sans-serif;
}

input[type="email"],
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

.disabled {
  background-color: #747474;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

img.avatar {
  width: 20%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}
</style>



