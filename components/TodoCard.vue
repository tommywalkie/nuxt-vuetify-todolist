<template>
  <v-card v-show="visible" class="custom_vcard" :color="editing ? 'orange accent-2' : ((todo.completed) ? 'green darken-1' : 'blue-grey darken-2')">
    <v-container>
      <v-layout row wrap>
        <v-flex xs2 class="todo_check" @click="toggle(todo)">
          <v-icon v-show="!todo.completed">
            check_box_outline_blank
          </v-icon>
          <v-icon v-show="todo.completed">
            check_box
          </v-icon>
        </v-flex>
        <v-flex v-show="!editing" xs10 class="todo_infos" @click="opened = !opened">
          <div class="todo_infos_container">
            <h5 v-show="!editing">
              {{ todo.title }}
            </h5>
            <div class="todo_tags">
              <v-chip
                v-for="tag in todo.tags"
                :key="tag"
                color="primary"
                text-color="white"
              >
                {{ tag }}
              </v-chip>
            </div>
          </div>
        </v-flex>
        <v-flex v-show="editing" xs10 class="todo_infos">
          <div class="todo_infos_container">
            <v-text-field
              v-model="titleEdit"
              label="Title"
              color="white"
              required
            />
            <div class="todo_tags">
              <v-combobox
                v-model="todo.tags"
                :items="items"
                :search-input.sync="search"
                hide-selected
                label="Add some tags"
                multiple
                persistent-hint
                small-chips
              >
                <template v-slot:no-data>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-combobox>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-actions v-show="opened" class="todo_actions" :style="editing ? 'background: #FF9100' : ((todo.completed) ? 'background: #388E3C' : 'background: #37474F')">
      <v-layout justify-end>
        <v-btn v-show="!editing" flat :color="(todo.completed || editing) ? 'white' : 'orange accent-2'" @click="startEditing(todo)">
          Edit
        </v-btn>
        <v-btn v-show="editing" flat color="white" @click="editing = false">
          Cancel
        </v-btn>
        <v-btn v-show="editing" flat color="white" @click="saveTodo(todo)">
          Confirm
        </v-btn>
        <v-btn v-show="!editing" flat :color="(todo.completed || editing) ? 'white' : 'red'" @click="opened = false; remove(todo.id)">
          Delete
        </v-btn>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    todo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      opened: false,
      visible: true,
      editing: false,
      titleEdit: null,
      tagsEdit: null,
      titleRules: [
        v => !!v || 'Title is required',
        v => v.length > 1 || 'Title must be greater than 1 character'
      ],
      items: ['Gaming', 'Programming', 'Vue', 'Vuetify'],
      search: null
    }
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
    }),
    remove(id) {
      const context = this
      context.visible = false
      fetch('https://jsonplaceholder.typicode.com/todos/' + id, {
        method: 'delete'
      }).then(response =>
        response.json().then(function () {
          context.removeTodo(id)
        })
      )
    },
    toggle(todo) {
      const context = this
      const form = {
        id: todo.id,
        title: todo.title,
        userId: todo.userId,
        completed: !todo.completed
      }
      fetch('https://jsonplaceholder.typicode.com/todos/' + todo.id, {
        method: 'PUT',
        body: JSON.stringify(form),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(response =>
        response.json().then(function () {
          context.toggleTodo(todo.id)
        })
      )
    },
    startEditing(todo) {
      this.editing = true
      this.titleEdit = todo.title
      this.tagsEdit = todo.tags
    },
    saveTodo(todo) {
      const context = this
      if (context.titleEdit.length > 0) {
        const form = {
          id: Number(todo.id),
          title: context.titleEdit,
          userId: todo.userId,
          tags: todo.tags,
          completed: todo.completed
        }
        console.log(form)
        fetch('https://jsonplaceholder.typicode.com/todos/' + todo.id, {
          method: 'PUT',
          body: JSON.stringify(form),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        }).then(response =>
          response.json().then(function () {
            context.editing = false
            context.opened = false
            context.editTodo(form)
          })
        )
      } else {
        // TODO
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.custom_vcard
    margin-bottom 12px
    .container
        padding 0px 0px
        .todo_check
            cursor pointer
            position relative
            i.v-icon
                position absolute
                top 50%
                left 50%
                transform translate(-50%, -50%)
        .todo_infos
            padding 0px 0px
            text-align left
            cursor pointer
            .todo_infos_container
                padding 20px
                h5
                    font-size 15px
                .todo_tags
                    margin-top 4px
                    .v-chip
                        font-size 11px
                        height 25px
                        margin-left 0px
    .todo_actions
        transition 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
</style>
