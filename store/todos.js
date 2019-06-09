export const state = () => ({
  todolist: []
})

export const mutations = {
  /**
   * Add an item to todolist
   * @param {Object} state - Vuex state
   * @param {Object} payload - Information about the todo
   * @param {Number} payload.id - Todo's id
   * @param {Number} payload.userId - Todo's user id
   * @param {String} payload.title - Todo's title
   * @param {Boolean} payload.completed - Todo's completed state
   * @param {Array.<String>} payload.tags - Todo's tags
   */
  add(state, payload) {
    state.todolist.push({
      id: payload.id,
      userId: payload.userId,
      title: payload.title,
      completed: payload.completed || false,
      tags: payload.tags || []
    })
  },
  /**
   * Set todolist state item
   * @param {Object} state - Vuex state
   * @param {Array.<Object>} todolist - The todolist to replace current todolist state item
   */
  setTodolist(state, todolist) {
    state.todolist = todolist
    state.todolist.forEach(function (todo) {
      if (!todo.tags) {
        todo.tags = []
      }
    })
  },
  /**
   * Remove an item with specific id from todolist
   * @param {Object} state - Vuex state
   * @param {Number} id - Todo's id
   */
  remove(state, id) {
    state.todolist = state.todolist.filter(todo => (todo.id !== id))
  },
  /**
   * Toggle "completed" attribute in a item with specific id from todolist
   * @param {Object} state - Vuex state
   * @param {Number} id - Todo's id
   */
  toggle(state, id) {
    state.todolist.forEach(function (todo) {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
    })
  },
  /**
   * Edit an item from todolist
   * @param {Object} state - Vuex state
   * @param {Object} payload - Information about the todo
   * @param {Number} payload.id - Todo's id
   * @param {Number} payload.userId - Todo's user id
   * @param {String} payload.title - Todo's title
   * @param {Boolean} payload.completed - Todo's completed state
   * @param {Array.<String>} payload.tags - Todo's tags
   */
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
  /**
   * Add pne tag for one item from todolist
   * @param {Object} state - Vuex state
   * @param {Object} payload - Information about the todo
   * @param {String} payload.tag - Tag to be added
   * @param {Number} payload.id - Todo's id
   */
  addTag(state, payload) {
    const tag = payload.tag
    const id = payload.id
    state.todolist.forEach(function (todo) {
      if (todo.id === id) {
        todo.tags.push(tag)
      }
    })
  },
  /**
   * Remove pne tag in one item from todolist
   * @param {Object} state - Vuex state
   * @param {Object} payload - Information about the todo
   * @param {String} payload.tag - Tag to be removed
   * @param {Number} payload.id - Todo's id
   */
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
