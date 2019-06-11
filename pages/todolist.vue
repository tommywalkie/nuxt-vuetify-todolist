<template>
  <v-layout>
    <v-flex text-xs-center>
      <TodoCardAdd v-show="isAdding" :isAdding="isAdding" />
      <TodoCard v-show="!isAdding" v-for="todo in todolist" :key="todo.id" :todo="todo"/>
    </v-flex>
    <v-fab-transition>
      <v-btn
        color="indigo accent-2"
        dark
        fixed
        bottom
        right
        fab
        @click="isAdding = !isAdding"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-layout>
</template>

<script>
import TodoCardAdd from '@/components/TodoCardAdd'
import TodoCard from '@/components/TodoCard'
import { mapMutations } from 'vuex'
export default {
  components: {
    TodoCard,
    TodoCardAdd
  },
  data() {
    return {
      isAdding: false
    }
  },
  computed: {
    todolist() {
      const sortBy = (key) => {
        return (a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0)
      }
      return this.$store.state.todos.todolist.concat().sort(sortBy('id'))
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
