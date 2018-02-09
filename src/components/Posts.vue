<template lang="html">
  <div class="posts">
    <h1>Posts</h1>
    <div v-for="(post,index) in posts" :key="index">
        <p>
          <span><b>{{ post.title }}</b></span><br />
          <span>{{ post.description }}</span>
        </p>
    </div>
  </div>
</template>

<script>
import PostsServices from '@/services/PostsServices'

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
  }
}
</script>

<style lang="css">
</style>
