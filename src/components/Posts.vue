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
import PostsService from '@/services/PostsServices'

export default {
  name: 'posts',
  data () {
    return {
      posts: [],
      postlength: 0
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    async getPosts () {
      PostsService.fetchPosts().then(response => {
        this.posts = response.data
      })
    }
  }
}
</script>

<style lang="css">
</style>
