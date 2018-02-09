<template lang="html">
  <div class="posts">
    <h1>Posts</h1>
    <div>
      <button type="button" class="blue-btn" name="button"><router-link v-bind:to="{ name: 'NewPost' }" class="blue-btn">New</router-link></button>

     </div>
    <div v-for="(post,index) in posts" :key="index">
        <p>
          <span><b>{{ post.title }}</b></span> :
          <span>{{ post.description }}</span>
        </p>
    </div>
    <new-post></new-post>
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
    }
  },
  components: {
    'new-post': postTwo
  }
}
</script>

<style lang="css">
.blue-btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
