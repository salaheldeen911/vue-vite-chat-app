<template>
  <div id="center" class="center">
    <h1>Login</h1>
    <div class="imgcontainer">
      <img src="/login.png" alt="Avatar" class="avatar" />
    </div>
    <form id="form" method="post" @submit.prevent="login">
      <div v-if="errorMessage" class="alert alert-danger">
        <strong>{{ errorMessage }}!</strong>
      </div>
      <div class="txt_field">
        <input
          id="email"
          type="email"
          name="email"
          required
          v-model="data.email"
        />
        <span></span>
        <label class="mb-2">Email</label>
      </div>
      <div class="txt_field">
        <input
          id="password"
          v-model="data.password"
          type="password"
          name="psw"
          required
        />
        <span></span>
        <label class="mb-2">Password</label>
      </div>
      <input
        type="submit"
        value="Login"
        :disabled="submiting"
        :class="{ disabled: submiting }"
      />

      <div class="signup_link">
        Not a member? <a href="/register">Signup</a>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import { AuthStore } from "../stores/AuthStore";
import { OnlineUsersStore } from "../stores/OnlineUsersStore";
import echo from "../echo";

export default {
  setup() {
    const auth = AuthStore();
    const OnlineUsers = OnlineUsersStore();
    return { auth, OnlineUsers };
  },
  mounted() {
    document.getElementById("email").focus();
  },
  data() {
    return {
      data: {
        email: "",
        password: "",
      },
      errorMessage: "",
      submiting: false,
    };
  },
  methods: {
    async login() {
      this.submiting = true;
      try {
        let response = await axios.post("login", this.data);
        if (response.data.data.user && response.data.data.token) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.data.token}`;
          this.auth.setData(response.data.data.user, response.data.data.token);
          echo.initLaravelEcho();
          this.$router.push({ path: "/", replace: true });
          this.submiting = false;
        }
        this.submiting = false;
      } catch (errors) {
        this.errorMessage = errors.response.data.message;
        this.submiting = false;
      }
    },
  },
};
</script>

<style scoped>
.center {
  width: 420px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  padding: 0 0 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
}

.imgcontainer {
  width: 170px;
  height: 110px;
  border-radius: 50%;
  margin: 0 auto;
}
.imgcontainer img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.center h1 {
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid silver;
}
.center form {
  padding: 0 40px;
  box-sizing: border-box;
}
form .txt_field {
  position: relative;
  border-bottom: 2px solid #adadad;
  margin: 30px 0;
}
.txt_field input {
  width: 100%;
  padding: 0 5px;
  height: 40px;
  font-size: 16px;
  border: none;
  background: none;
  outline: none;
}
.txt_field label {
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  font-size: 16px;
  pointer-events: none;
  transition: 0.5s;
}
.txt_field span::before {
  content: "";
  position: absolute;
  top: 40px;
  left: 0;
  width: 0%;
  height: 2px;
  background: #2691d9;
  transition: 0.5s;
}
.txt_field input:focus ~ label,
.txt_field input:valid ~ label {
  top: -5px;
  color: #2691d9;
}
.txt_field input:focus ~ span::before,
.txt_field input:valid ~ span::before {
  width: 100%;
}
.pass {
  margin: -5px 0 20px 5px;
  color: #a6a6a6;
  cursor: pointer;
}
.pass:hover {
  text-decoration: underline;
}
input[type="submit"] {
  width: 100%;
  height: 50px;
  background: #2691d9;
  border-radius: 25px;
  font-size: 18px;
  color: #e9f4fb;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  transition: 0.5s;
  border: none;
}
input[type="submit"]:hover {
  border-color: #2691d9;
}
.signup_link {
  margin: 30px 0;
  text-align: center;
  font-size: 16px;
  color: #666666;
}
.signup_link a {
  color: #2691d9;
  text-decoration: none;
}
.signup_link a:hover {
  text-decoration: underline;
}
</style>

<!-- <style scoped>
form {
  border: 3px solid #f1f1f1;
  font-family: Arial, Helvetica, sans-serif;
}

input[type="email"],
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


 -->
