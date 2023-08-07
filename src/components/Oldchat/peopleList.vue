<template>
  <div ref="plist" id="plist" class="users-list">
    <!-- <span
      @click="showUsers(this)"
      id="arrowShow"
      ref="arrowShow"
      role="button"
      class="mdi mdi-chevron-double-right none block"
    ></span>
    <span
      @click="hideUsers(this)"
      id="arrowHide"
      ref="arrowHide"
      role="button"
      class="mdi mdi-chevron-double-left none"
    ></span>
    <div class="input-group">
      <div class="input-group-prepend">
        <span role="button" class="input-group-text"
          ><i class="mdi mdi-account-search h5"></i
        ></span>
      </div>
      <input type="text" class="form-control" placeholder="Search..." />
    </div>
    <ul class="list-unstyled chat-list mt-2 mb-0">
      <li v-for="user in users" :key="user.id" class="clearfix active">
        <img
          src="https://bootdey.com/img/Content/avatar/avatar2.png"
          alt="avatar"
        />
        <div class="about">
          <div class="name">{{ user.name }}</div>
          <div class="status"><i class="fa fa-circle online"></i> online</div>
        </div>
      </li>
    </ul> -->
  </div>
</template>

<!-- <script>
import { AuthStore } from "../../stores/AuthStore";

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
  methods: {
    setUsers(users) {
      this.users = users.filter((u) => u.id != this.auth.user.id);
    },
    removeUser(user) {
      this.users = this.users.filter((u) => u.id != user.id);
    },
    addUser(user) {
      this.users.push(user);
    },
    showUsers() {
      this.$refs.plist.classList.add("show");
      this.$refs.arrowShow.classList.remove("block");
      this.$refs.arrowHide.classList.add("block");
    },
    hideUsers() {
      this.$refs.plist.classList.remove("show");
      this.$refs.arrowShow.classList.add("block");
      this.$refs.arrowHide.classList.remove("block");
    },
  },
};
</script> -->
<!-- 
<style scoped lang="scss">
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.users-list {
  width: 280px;
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
  z-index: 7;
}

.users-list {
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

.users-list .chat-list li {
  padding: 10px 15px;
  list-style: none;
  border-radius: 3px;
}

.users-list .chat-list li:hover {
  background: #efefef;
  cursor: pointer;
}

.users-list .chat-list li.active {
  background: #efefef;
}

.users-list .chat-list li .name {
  font-size: 15px;
}

.users-list .chat-list img {
  width: 45px;
  border-radius: 50%;
}

.users-list img {
  float: left;
  border-radius: 50%;
}

.users-list .about {
  float: left;
  padding-left: 8px;
}

.users-list .status {
  color: #999;
  font-size: 13px;
}

.online,
.offline,
.me {
  margin-right: 2px;
  font-size: 8px;
  vertical-align: middle;
}

.online {
  color: #86c541;
}

.offline {
  color: #e47297;
}

.block {
  font-display: normal;
}
.mdi-chevron-double-left {
  display: none;
}

.mdi-chevron-double-right {
  display: none;
}
@media only screen and (max-width: 767px) {
  .chat-app .users-list {
    height: 100%;
    width: 50%;
    left: -375px;
    background: whitesmoke;

    &.show {
      left: 0;
    }
  }

  .block {
    display: block !important;
  }

  %arrow {
    font-size: 30px;
    position: absolute;
    top: 90px;
    color: green;

    &:hover {
      font-size: 32px;
    }
  }

  #arrowShow {
    @extend %arrow;
    right: -57%;
  }

  #arrowHide {
    @extend %arrow;
    left: 100%;
  }

  .chat-app .users-list.open {
    left: 0;
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .chat-app .chat-list {
    height: 650px;
    overflow-x: auto;
  }
}
</style> -->
