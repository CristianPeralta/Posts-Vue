<template >
  <div class="container">
    <h1>Posts</h1>
    <div>
      <button type="button" class="btn btn-dark" name="button"><router-link v-bind:to="{ name: 'NewPost' }">New</router-link></button>
     </div>
    <new-post></new-post>
    <ul class="list-group tasks">
        <li v-for="post in posts" :key="post._id" class="list-group-item">
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
            <input v-model="titleDraft" type="text"> : <input v-model="descriptionDraft" type="text">
            <div>

              <a>
                  <span @click="updatePost(post)" class="glyphicon glyphicon-ok"
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

export default {
  name: 'Posts',
  data () {
    return {
      posts: [],
      titleDraft: '',
      descriptionDraft: ''
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      PostsServices.fetchPosts().then(response => {
        this.posts = response.data
        this.posts.map(function (post) {
          post['editing'] = false
        })
      }).catch(err => {
        console.log(err)
      })
    },
    checkEdit (post) {
      return post.editing
    },
    editPost (post) {
      this.posts.forEach(function (post) {
        post.editing = false
      })
      this.titleDraft = post.title
      this.descriptionDraft = post.description
      post.editing = true
      console.log(post)
    },
    updatePost (post) {
      post.title = this.titleDraft
      post.description = this.descriptionDraft
      PostsServices.updatePost(post).then(() => {
        post.editing = false
      }).catch(err => {
        console.log(err)
      })
    },
    deletePost (id) {
      PostsServices.deletePost(id).then(response => {
        this.$router.go()
      }).catch(err => {
        console.log(err)
      })
    },
    cancelPost (post) {
      post.editing = false
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
