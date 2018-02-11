<template>
  <div id="app">
  <section class="hero is-primary is-medium">
    <!-- Hero head: will stick at the top -->
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item">
              M.E.V.N.
            </a>
            <span class="navbar-burger burger" data-target="navbarMenuHeroA">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroA" class="navbar-menu">
            <div class="navbar-end">
              <router-link  class="navbar-item" to="/posts" exact>
                <a>Home</a>
              </router-link>
              <router-link class="navbar-item" v-bind:to="{ name: 'NewPost' }">New</router-link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </section>
  <div class="container">
    <router-view></router-view>
  </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
