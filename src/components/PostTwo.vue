<template>
  <div class="">
    <div class="form">
      <form class="new-task-form" @submit.prevent="onSubmit" @keydown="form.errors.clear()">
        <textarea rows="2" cols="5" placeholder="Title" v-model="form.title"></textarea>
        <textarea rows="2" cols="5" placeholder="Description" v-model="form.description"></textarea>
          <span class="help is-danger"
          v-if="form.errors.has('title')"
          v-text="form.errors.get('title')"></span>
        <button class="btn btn-primary" :disabled="form.errors.any()">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import Form from '@/utilities/Form'
import api from '@/services/sources'

export default {
  data () {
    return {
      form: new Form({
        title: '',
        description: ''
      })
    }
  },
  methods: {
    onSubmit () {
      this.form
        .post(api.to('/posts'))
        .then(() => {
          this.$router.go()
        })
    }
  }
}
</script>

<style type="text/css">

.help {
  display: block;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}
.help.is-danger {
  color: #ff3860;
}
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
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
