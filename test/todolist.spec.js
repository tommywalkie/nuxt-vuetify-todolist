import { mutations } from '@/store/todos'
import axios from 'axios'

describe('Todolist', () => {
  test('retrieving data from API and updating store', () => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(function (response) {
        const state = {
          todolist: []
        }
        mutations.setTodolist(state, response.data)
        expect(state.todolist.length).toEqual(200)
      })
  })
  test('deleting 1 store item should leave a store with 199 items', () => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(function (response) {
        const state = {
          todolist: []
        }
        mutations.setTodolist(state, response.data)
        mutations.remove(state, 1)
        expect(state.todolist.length).toEqual(199)
      })
  })
  test('toggling "completed" attribute for 1 todo', () => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(function (response) {
        const state = {
          todolist: []
        }
        mutations.setTodolist(state, response.data)
        const itemMocked = state.todolist.find(function (element) {
          return element.id === 1
        })
        expect(itemMocked.completed).toBeFalsy()
        mutations.toggle(state, 1)
        expect(itemMocked.completed).toBeTruthy()
      })
  })
  test('adding 1 todo to store', () => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(function (response) {
        const state = {
          todolist: []
        }
        mutations.setTodolist(state, response.data)
        expect(state.todolist.length).toEqual(200)
        expect(state.todolist[0].id).toEqual(1)
        mutations.add(state, { id: 1800, userid: 5, title: 'sample text', completed: false, tags: [] })
        expect(state.todolist.length).toEqual(201)
        const itemMocked = state.todolist.find(function (element) {
          return element.id === 1800
        })
        expect(itemMocked.title).toEqual('sample text')
      })
  })
  test('adding 1 tag to 1 todo', () => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(function (response) {
        const state = {
          todolist: []
        }
        mutations.setTodolist(state, response.data)
        mutations.addTag(state, { id: 1, tag: 'vue' })
        const itemMocked = state.todolist.find(function (element) {
          return element.id === 1
        })
        expect(itemMocked.tags.length).toEqual(1)
        expect(itemMocked.tags[0]).toEqual('vue')
      })
  })
  test('deleting 1 tag from 1 todo', () => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(function (response) {
        const state = {
          todolist: []
        }
        mutations.setTodolist(state, response.data)
        mutations.addTag(state, { id: 1, tag: 'vue' })
        mutations.addTag(state, { id: 1, tag: 'vuex' })
        const itemMocked = state.todolist.find(function (element) {
          return element.id === 1
        })
        expect(itemMocked.tags.length).toEqual(2)
        mutations.removeTag(state, { id: 1, tag: 'vue' })
        expect(itemMocked.tags.length).toEqual(1)
        expect(itemMocked.tags[0]).toEqual('vuex')
      })
  })
  test('editing 1 todo should update itself', () => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(function (response) {
        const state = {
          todolist: []
        }
        mutations.setTodolist(state, response.data)
        expect(state.todolist.length).toEqual(200)
        mutations.add(state, { id: 740, userid: 5, title: 'sample text', completed: false, tags: [] })
        expect(state.todolist.length).toEqual(201)
        mutations.editTodo(state, { id: 740, userid: 5, title: 'editted sample text', completed: false, tags: ['vuex'] })
        const itemMocked = state.todolist.find(function (element) {
          return element.id === 740
        })
        expect(itemMocked.title).toEqual('editted sample text')
        expect(itemMocked.tags).toEqual(['vuex'])
      })
  })
})
