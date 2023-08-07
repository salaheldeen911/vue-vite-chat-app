<template>
  <div id="todoMain">
    <preLoader v-if="loading" ref="preLoader" />

    <div
      ref="todoContainer"
      class="todo-container text-center"
      v-if="data.length"
    >
      <span v-if="!noData" @click="deleteAll" ref="deleteAll" id="deleteAll"
        >Delete All</span
      >

      <div v-for="(todo, index) in data" :key="todo.id">
        <div :class="oddOrEven(index)" class="todo">
          <p
            @click="done(todo.id, $event)"
            :class="[{ done: todo.done }, oddOrEven(index)]"
            class="todoBody"
            :ref="
              (el) => {
                todos[todo.id] = el;
              }
            "
          >
            {{ todo.body }}
          </p>

          <div class="todoIcons" :class="oddOrEven(index)">
            <span
              @click="deleteTodo(todo.id)"
              class="mdi mdi-delete delete"
              :ref="
                (el) => {
                  deleteBtns[todo.id] = el;
                }
              "
            ></span>
            <span @click="edit(todo.id)" class="mdi mdi-table-edit edit"></span>
          </div>
        </div>
        <div class="todoEdit none" :class="oddOrEven(index)">
          <textarea
            class="todoInput"
            :class="oddOrEven(index)"
            :value="todo.body"
            :ref="
              (el) => {
                inputs[todo.id] = el;
              }
            "
            @keypress.enter="enterUpdate(todo.id)"
          >
          </textarea>
          <div class="todoIcons" :class="oddOrEven(index)">
            <span
              @click="updateTodo(todo.id)"
              :ref="
                (el) => {
                  updateBtns[todo.id] = el;
                }
              "
              class="mdi mdi-arrow-up-bold save"
            ></span>
            <span
              @click="cancel(todo.id)"
              class="mdi mdi-close-box close"
            ></span>
          </div>
        </div>
        <p
          :ref="
            (el) => {
              dates[todo.id] = el;
            }
          "
          class="date"
          :class="oddOrEven(index)"
        >
          {{
            todo.updated_at
              ? "Updated " + todo.updated_at
              : "Created " + todo.created_at
          }}
        </p>
      </div>
      <span @click="scrollToTop()" v-if="scrollable" id="GoTop">Go To Top</span>
    </div>
    <div v-if="noData" id="noDataContainer">
      <h2>ADD SOME TODOS!!</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import preLoader from "../preLoader.vue";

export default {
  components: { preLoader },
  data() {
    return {
      inputs: [],
      todos: [],
      dates: [],
      data: [],
      updateBtns: [],
      deleteBtns: [],
      scrollable: false,
      noData: false,
      scroll: true,
      loading: true,
    };
  },

  async mounted() {
    await this.getData();
    this.loading = false;
  },

  updated() {
    if (this.$refs.todoContainer) {
      if (
        this.$refs.todoContainer.scrollHeight >
        this.$refs.todoContainer.clientHeight
      ) {
        this.scrollable = true;
        if (this.scroll) {
          this.$refs.todoContainer.scrollTop =
            this.$refs.todoContainer.scrollHeight;
        }
      } else {
        this.scrollable = false;
      }
    }
  },

  watch: {
    data(newVal) {
      newVal.length ? (this.noData = false) : (this.noData = true);
      this.loading = false;
    },
  },

  methods: {
    oddOrEven(index) {
      if (index % 2 == 0) {
        return "even";
      }

      return "ood";
    },

    disable(btn) {
      btn.classList.add("disabled");
    },

    enable(btn) {
      btn.classList.remove("disabled");
    },

    enterUpdate(todo) {
      this.updateBtns[todo].click();
    },

    edit(todo) {
      let pHeight = this.todos[todo].offsetHeight + "px";
      this.toggles(todo);
      this.inputs[todo].style.height = pHeight;
      this.inputs[todo].focus();
    },

    toggles(todo) {
      this.inputs[todo].parentElement.classList.toggle("none");
      this.inputs[todo].parentElement.previousElementSibling.classList.toggle(
        "none"
      );
    },

    cancel(todo) {
      this.toggles(todo);
      this.inputs[todo].value = this.todos[todo].textContent;
    },

    update(todo, data) {
      this.inputs[todo].value = data.body;
      this.todos[todo].textContent = data.body;
      this.todos[todo].classList.remove("done");
      this.dates[todo].textContent = "Updated " + data.updated_at;
    },

    scrollToTop() {
      this.$refs.todoContainer.scrollTop = 0;
    },

    validate(body) {
      // to prevent html tags
      const htmlPreventer = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
      if (htmlPreventer.test(body)) return false;

      // to accept all chars, nums, spaces, new lines and prevent less than 3 chars, over 255 chars.
      const pattern = /^([a-zA-Z0-9_ \s\S-]){3,255}$/;
      return pattern.test(body);
    },

    async getData() {
      try {
        let res = await axios.get("todos");
        this.data = res.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async addTodo(body) {
      if (!this.validate(body)) {
        return false;
      }
      try {
        await axios.post("todos", { body: body });
        this.getData();
        this.scroll = true;
        if (this.$refs.deleteAll) this.enable(this.$refs.deleteAll);
      } catch (error) {
        console.log(error);
      }
    },

    async done(todo, event) {
      try {
        axios.post(`todos/done/${todo}`).then((res) => {
          if (res.status) {
            event.target.classList.toggle("done");
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    async updateTodo(todo) {
      this.disable(this.updateBtns[todo]);
      this.inputs[todo].blur();

      if (!this.validate(this.inputs[todo].value)) {
        this.cancel(todo);
        this.enable(this.updateBtns[todo]);

        return false;
      }
      try {
        let res = await axios.put(`todos/${todo}`, {
          body: this.inputs[todo].value,
        });
        this.update(todo, res.data.data);
        this.cancel(todo);
        this.enable(this.updateBtns[todo]);
      } catch (error) {
        this.enable(this.updateBtns[todo]);

        console.log(error);
      }
    },

    async deleteTodo(todo) {
      this.disable(this.deleteBtns[todo]);
      try {
        await axios.delete(`todos/${todo}`);
        this.getData();
        this.scroll = false;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteAll() {
      this.loading = true;
      this.disable(this.$refs.deleteAll);
      await axios.post("todos/delete-all");
      this.getData();
      this.scrollable = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/sass/todo/main";
</style>