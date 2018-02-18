<template>
  <div class="container">
    <h1>Posts</h1>
    <button class="btn btn-primary" @click="haiServer()" type="button" name="button">Hello Server</button>
    <button class="btn btn-primary" @click="vueServer()" type="button" name="button">Vue Server</button>
    <br>
    <new-post></new-post>
    <ul class="list-group tasks">
        <li v-for="(post,index) in posts" :key="post._id" class="list-group-item">
          <template v-if="!post.editing">
              <span><b>{{ post.title }}</b></span> : <span class="description">{{ post.description }}</span>
            <div>
              <a>
                  <span @click="editPost(post)" class="glyphicon glyphicon-edit"
                        aria-hidden="true"></span>
              </a>
              <a>
                  <span @click="deletePost(post._id)" class="glyphicon glyphicon-trash"
                        aria-hidden="true"></span>
              </a>
            </div>
          </template>
          <template v-if="post.editing">
            <div>
              <input v-model="titleDraft" type="text"> : <input v-model="descriptionDraft" type="text">
            </div>
            <div>
              <a>
                  <span v-if="isEmpty(titleDraft)" @click="updatePost(post,index)" class="glyphicon glyphicon-ok"
                        aria-hidden="true"></span>
              </a>
              <a>
                  <span @click="cancelPost(post)" class="glyphicon glyphicon-remove"
                        aria-hidden="true"></span>
              </a>
            </div>
          </template>

        </li>
    </ul>
  </div>
</template>

<script>
import PostsServices from '@/services/PostsServices'
import postTwo from '@/components/PostTwo.vue'
import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'ws://localhost:3000')

export default {
  name: 'PostsSocket',
  data () {
    return {
      posts: [],
      titleDraft: '',
      descriptionDraft: ''
    }
  },
  sockets: {
    connect () {
      console.log('socket connected')
    },
    customEmit (val) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
    postEdit (data) {
      let post = this.posts[data.index]
      if (data.status) {
        post.title = this.titleDraft
        post.description = this.descriptionDraft
      }
      post.editing = false
    }
  },
  created () {
    this.getPosts()
  },
  methods: {
    haiServer () {
      this.$socket.emit('editing', {great: 'Wow'})
    },
    vueServer () {
      this.$socket.emit('vueServer', {great: 'Wow'})
    },
    getPosts () {
      PostsServices.fetchPosts().then(response => {
        this.$socket.emit('getting', {great: 'Wow'})
        response.data.map(function (post) {
          post.editing = false
        })
        this.posts = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    editPost (post) {
      this.posts.forEach(function (post) {
        post.editing = false
      })
      this.titleDraft = post.title
      this.descriptionDraft = post.description
      post.editing = true
    },
    updatePost (post, index) {
      let postCopy = JSON.parse(JSON.stringify(post))
      postCopy.title = this.titleDraft
      postCopy.description = this.descriptionDraft
      this.$socket.emit('editing', postCopy, index)
    },
    deletePost (id) {
      PostsServices.deletePost(id).then(response => {
        this.$socket.emit('deleting', id)
        this.$router.go()
      }).catch(err => {
        console.log(err)
      })
    },
    cancelPost (post) {
      post.editing = !post.editing
      this.titleDraft = ''
      this.descriptionDraft = ''
    },
    isEmpty (str) {
      return str.replace(/^\s+/g, '').length
    }
  },
  components: {
    'new-post': postTwo
  }
}
</script>

<style lang="css">
@import '../assets/css/task.css';
</style>
