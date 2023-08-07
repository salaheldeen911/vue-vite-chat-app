<template>
  <div id="mainContainer">
    <div id="todoContainer">
      <Header />
      <TodoMain ref="todoMain" />
      <Add @addTodo="onAddTodo" />
    </div>
  </div>
</template>

<script setup>
import Header from "../components/todo/Header.vue";
import TodoMain from "../components/todo/TodoMain.vue";
import Add from "../components/todo/Add.vue";
import { ref } from "vue";

const todoMain = ref(null);

const onAddTodo = (body) => {
  todoMain.value.addTodo(body);
};
</script>

<style>
#mainContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}

#todoContainer {
  position: relative;
  width: 500px;
  height: 550px;
  margin-bottom: 20px;
  border-radius: 30px;
  opacity: 0.8;
  display: grid;
  grid-template-rows: auto 1fr auto;
  box-shadow: 0px 6px 107px 1px rgba(0, 0, 0, 0.63);
  -webkit-box-shadow: 0px 6px 107px 1px rgba(0, 0, 0, 0.63);
  -moz-box-shadow: 0px 6px 107px 1px rgba(0, 0, 0, 0.63);
  font-family: none;
  /* font-family: 'Hurricane', cursive; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>