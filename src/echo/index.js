import Echo from "laravel-echo";
import { OnlineUsersStore } from "../stores/OnlineUsersStore";
import { AuthStore } from "../stores/AuthStore";
import axios from "../axios";

function initLaravelEcho() {
  const auth = AuthStore();

  if (auth.status) {
    init(auth);
    joinPublicChat();
  }
}

function init(auth) {
  window.Echo = new Echo({
    broadcaster: "pusher",
    key: "pusher_key",
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    authEndpoint: "http://localhost:8000/api/broadcasting/auth",
    auth: {
      headers: {
        Authorization: auth.token(),
      },
    },
  });
}

function joinPublicChat() {
  const OnlineUsers = OnlineUsersStore();

  window.Echo.join("public-chat")
    .here((users) => {
      //returnning all users but the current
      OnlineUsers.base(users);
    })
    .joining((user) => {
      //adding the juiond user th users
      OnlineUsers.joined(user);
    })
    .leaving(async (user) => {
      // removing the left user from users
      // let l = await axios.post("left-user", user);

      OnlineUsers.left(user);

      // console.log("D:", l);
    })
    .error((error) => {
      console.log(error);
    });
}

export default { initLaravelEcho, init };
