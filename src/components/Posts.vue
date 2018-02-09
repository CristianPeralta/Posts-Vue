<template lang="html">
  <div class="container">
    <h1>Posts</h1>
    <div>
      <button type="button" class="btn btn-dark" name="button"><router-link v-bind:to="{ name: 'NewPost' }">New</router-link></button>
     </div>
    <new-post></new-post>
    <ul class="list-group tasks" v-for="post in posts" :key="post._id">
        <li class="list-group-item">

          <span><b>{{ post.title }}</b></span> : <span class="description">{{ post.description }}</span>
          <div>
            <a>
                <span class="glyphicon glyphicon-edit"
                      aria-hidden="true"></span>
            </a>
            <a>
                <span @click="deletePost(post._id)" class="glyphicon glyphicon-trash"
                      aria-hidden="true"></span>
            </a>
          </div>
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
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      PostsServices.fetchPosts().then(response => {
        this.posts = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    deletePost (id) {
      console.log('remove this :' + id)
      PostsServices.deletePost(id).then(response => {
        this.$router.go()
      }).catch(err => {
        console.log(err)
      })
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
