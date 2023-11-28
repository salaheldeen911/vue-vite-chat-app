<template>
  <div
    @focusout="handleFocusOut"
    tabindex="0"
    :class="{ show: status }"
    class="requests"
    ref="sentRequestsContainer"
  >
    <h5 class="text-center">Sent Requests</h5>
    <hr />
    <div v-if="sentRequests.length > 0">
      <div
        v-for="request in sentRequests"
        :key="request.id"
        class="alert alert-primary"
        role="alert"
      >
        <p>
          You have sent a friend request to <strong>{{ request.email }}</strong
          >. You can
          <strong
            ><span
              role="button"
              @click="!proccessing ? cancelRequest(request) : null"
              class="alert-link"
              >Cancel It</span
            ></strong
          >
          any time.
        </p>
      </div>
    </div>
  </div>
</template>

<!-- <script>
import axios from "axios";
import { AuthStore } from "../../stores/AuthStore";

export default {
  setup() {
    const auth = AuthStore();

    return { auth };
  },
  data() {
    return {
      sentRequests: [],
      status: false,
    };
  },
  async mounted() {
    axios.defaults.headers.common["Authorization"] = this.auth.token(); // `Bearer ${this.auth.token()}`;

    await this.getSentRequests();
  },

  methods: {
    async getSentRequests() {
      try {
        let res = await axios.get("sentRequests");
        this.sentRequests = res.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async cancelRequest(user) {
      try {
        await axios.delete("cancelRequest", { data: { user: user } });
        this.getSentRequests();
      } catch (error) {
        console.log(error);
      }
    },
    toggle() {
      if (!this.status) {
        this.$refs.sentRequests.focus();
      }
      this.status = !this.status;
    },

    handleFocusOut() {
      this.status = false;
    },
  },
};
</script> -->

<script setup>
import { AuthStore } from "../../stores/AuthStore";
import { SentRequestsStore } from "../../stores/SentRequestsStore";
import { storeToRefs } from "pinia";
import echo from "../../echo";
import axios from "axios";
import { onMounted, watch, ref } from "vue";

const SentRequestStore = SentRequestsStore();
const { sentRequests, status } = storeToRefs(SentRequestStore);
const auth = AuthStore();
const sentRequestsContainer = ref(null);
const proccessing = ref(false);

async function getSentRequests() {
  SentRequestStore.setSentRequests();
}

async function cancelRequest(user) {
  SentRequestStore.status = false;
  proccessing.value = true;
  await SentRequestStore.cancelRequest(user);
  proccessing.value = false;
}

function handleFocusOut() {
  if (SentRequestStore.status) SentRequestStore.status = false;
}

onMounted(async () => {
  axios.defaults.headers.common["Authorization"] = auth.token(); // `Bearer ${this.auth.token()}`;

  await getSentRequests();
});
</script>

<style scoped>
.requests {
  height: calc(100vh - 115px);
  background: #eee;
  width: 35%;
  z-index: 100;
  position: fixed;
  opacity: 0.9;
  border-radius: 5px;
  padding: 10px;
  transition: all 1s linear;
  transform: translateX(-110%);
  overflow: auto;
}

.show {
  transform: translateX(0);
}
@media screen and (max-width: 400px) {
  .requests {
    width: 45%;
  }
}
</style>