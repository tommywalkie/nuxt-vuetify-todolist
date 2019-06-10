<template>
  <v-card class="custom_vcard" color="indigo accent-2">
    <v-container>
      <v-layout row wrap>
        <v-flex xs2 class="todo_check" />
        <v-flex xs10 class="todo_infos">
          <div class="todo_infos_container">
            <v-text-field
              v-model="title"
              label="Title"
              color="white"
              required
            />
            <div class="todo_tags">
              <v-combobox
                v-model="tags"
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
    <v-card-actions class="todo_actions" style="background: #3D5AFE">
      <v-layout justify-end>
        <v-btn flat color="white" @click="close">
          Cancel
        </v-btn>
        <v-btn flat color="white" @click="add">
          Confirm
        </v-btn>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    isAdding: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: null,
      userId: 1,
      completed: false,
      tags: [],
      items: ['Gaming', 'Programming', 'Vue', 'Vuetify'],
      search: null
    }
  },
  created: function () {},
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
    add() {
      const context = this
      const form = {
        title: context.title,
        userId: context.userId,
        tags: context.tags,
        completed: context.completed
      }
      fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }).then(response =>
        response.json().then(function (json) {
          context.$parent.isAdding = false
          context.addTodo(json)
        })
      )
    },
    close() {
      this.$parent.isAdding = false
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
            input
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
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)
</style>
