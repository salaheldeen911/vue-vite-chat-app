<template>
  <form @submit.prevent.enter="addTodo" id="todoSend">
    <input
      v-model="main"
      ref="mainInput"
      id="sendInput"
      type="text"
      placeholder="Add Todo..."
    />
    <button type="submit" id="send" ref="send">ADD</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      main: "",
    };
  },
  mounted() {
    this.$refs.mainInput.focus();
  },
  methods: {
    addTodo() {
      this.$emit("addTodo", this.main);
      this.main = "";
      this.$refs.mainInput.focus();
    },
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
#todoSend {
  display: flex;
  align-items: center;
  padding: 20px 0 20px 10px;
  background: #515c4f;
  border-radius: 0 0 30px 30px;
}

#sendInput {
  width: 85%;
  border: none;
  border-radius: 30px;
  height: 47px;
  padding: 0 10px;
}

#send {
  width: 15%;
  cursor: pointer;
  font-weight: 900;
  font-size: 20px;
  border: none;
  color: #080889;
  background: #515c4f;
}
</style>