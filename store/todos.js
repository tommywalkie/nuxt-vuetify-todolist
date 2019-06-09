export const state = () => ({
  todolist: []
})

export const mutations = {
  add(state, payload) {
    state.todolist.push({
      id: payload.id,
      userId: payload.userId,
      title: payload.title,
      completed: payload.completed,
      tags: payload.tags
    })
  },
  setTodolist(state, todolist) {
    state.todolist = todolist
    state.todolist.forEach(function (todo) {
      if (!todo.tags) {
        todo.tags = []
      }
    })
  },
  remove(state, id) {
    state.todolist = state.todolist.filter(todo => (todo.id !== id))
  },
  toggle(state, id) {
    state.todolist.forEach(function (todo) {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
    })
  },
  editTodo(state, payload) {
    state.todolist.forEach(function (todo) {
      if (todo.id === payload.id) {
        todo.userId = payload.userId
        todo.title = payload.title
        todo.completed = payload.completed
        todo.tags = payload.tags
      }
    })
  },
  addTag(state, payload) {
    const tag = payload.tag
    const id = payload.id
    state.todolist.forEach(function (todo) {
      if (todo.id === id) {
        todo.tags.push(tag)
      }
    })
  },
  removeTag(state, payload) {
    const tag = payload.tag
    const id = payload.id
    state.todolist.forEach(function (todo) {
      if (todo.id === id) {
        todo.tags = todo.tags.filter(todoTag => (todoTag !== tag))
      }
    })
  }

}
