<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center" />
      <v-card>
        <v-card-title class="headline">
          Nuxt based todolist app project
        </v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod assumenda et ratione obcaecati ex! Sequi commodi porro sapiente, debitis cum eius consequatur veritatis esse neque fuga exercitationem quam voluptatibus dignissimos!
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" flat nuxt to="/todolist">
            Try it
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  components: {}
}
</script>
