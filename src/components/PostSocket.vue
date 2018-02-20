<template>
  <div class="container">
    <h1>Posts</h1>
    <button class="btn btn-primary" @click="haiServer()" type="button" name="button">Hello Server</button>
    <br>
    <ul class="list-group tasks">
      <li class="list-group-item">
            <input type="text" placeholder="Title" v-model="title" >
            <input type="text" placeholder="Description" v-model="description">
            <div class="">
              <a>
                  <span @click="addPost()"
                        aria-hidden="true">Add</span>
              </a>
            </div>
      </li>
        <li v-for="(post,index) in posts" :key="post._id" class="list-group-item">
          <template v-if="!post.editing">
              <span><b>{{ post.title }}</b></span> : <span class="description">{{ post.description }}</span>
            <div>
              <a>
                  <span @click="editPost(post)" class="glyphicon glyphicon-edit"
                        aria-hidden="true"></span>
              </a>
              <a>
                  <span @click="deletePost(post._id, index)" class="glyphicon glyphicon-trash"
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
import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, 'ws://localhost:3000')

export default {
  name: 'PostsSocket',
  data () {
    return {
      title: '',
      description: '',
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
    message (data) {
      console.log(data)
    },
    postAdded (response) {
      if (response.ok) {
        response.data.editing = false
        this.posts.unshift(response.data)
        this.title = ''
        this.description = ''
      } else {
        console.log(response.err)
      }
    },
    postUpdated (response) {
      let post = this.posts[response.index]
      if (response.ok) {
        post.title = response.post.title
        post.description = response.post.description
      }
      post.editing = false
    },
    postGet (response) {
      if (response.ok) {
        response.data.map(function (post) {
          post.editing = false
        })
        this.posts = response.data
      } else {
        console.log(response.err)
      }
    },
    postDeleted (response) {
      if (response.ok) {
        this.posts.splice(response.index, 1)
      } else {
        console.log(response.err)
      }
    }
  },
  created () {
    this.getPosts()
  },
  methods: {
    haiServer () {
      this.$socket.emit('hai', {great: 'Wow'})
    },
    addPost () {
      let data = {
        title: this.title,
        description: this.description
      }
      this.$socket.emit('addPost', data)
    },
    getPosts () {
      this.$socket.emit('getPosts')
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
      this.$socket.emit('updatePost', postCopy, index)
    },
    deletePost (id, index) {
      this.$socket.emit('deletePost', id, index)
    },
    cancelPost (post) {
      post.editing = !post.editing
      this.titleDraft = ''
      this.descriptionDraft = ''
    },
    isEmpty (str) {
      return str.replace(/^\s+/g, '').length
    }
  }
}
</script>

<style lang="css">
@import '../assets/css/task.css';
.form input, .form textarea{
  width: 200px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.post_btn {
  color: #fff;
  padding: 10px;
  font-size: 12px;
  font-weight: bold;
  width: 50px;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
