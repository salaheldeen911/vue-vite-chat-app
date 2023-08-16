import Echo from "laravel-echo";
import { OnlineUsersStore } from "../stores/OnlineUsersStore";
import { AuthStore } from "../stores/AuthStore";

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
    .leaving((user) => {
      // removing the left user from users
      OnlineUsers.left(user);
    })
    .error((error) => {
      console.log(error);
    });
}

export default { initLaravelEcho };
