<template>
  <v-layout>
    <v-flex text-xs-center>
      <p>Here will be located the todolist</p>
      <v-card v-for="(todo, index) in todolist" :key="index">
        <input v-model="todo.completed" type="checkbox" @click="toggleTodo(todo.id)">
        {{ todo.title }}
        </input>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  computed: {
    todolist() {
      return this.$store.state.todos.todolist
    }
  },
  created: function () {
    const context = this
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => context.setTodolist(json))
  },
  methods: {
    ...mapMutations({
      addTodo: 'todos/add',
      setTodolist: 'todos/setTodolist',
      removeTodo: 'todos/remove',
      toggleTodo: 'todos/toggle',
      editTodo: 'todos/editTodo',
      addTodoTag: 'todos/addTag',
      removeTodoTag: 'todos/removeTag'
    })
  }
}
</script>
