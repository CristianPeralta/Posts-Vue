import Errors from './Errors'
import axios from 'axios'

class Form {
  constructor (data) {
    this.originalData = data
    for (let field in data) {
      this[field] = data[field]
    }
    this.errors = new Errors()
  }

  reset () {
    for (let field in this.originalData) {
      this[field] = ''
    }
    this.errors.clear()
  }

  data () {
    let data = Object.create(null)
    for (let field in this.originalData) {
      data[field] = this[field]
    }
    return data
  }

  post (url) {
    return this.submit('post', url)
  }

  submit (requestType, url) {
    return new Promise((resolve, reject) => {
      axios[requestType](url, this.data()).then(response => {
        this.onSuccess(response.data)
        resolve(response.data)
      }).catch(error => {
        this.onFail(error.response.data.errors)
        reject(error.response.data.errors)
      })
    })
  }

  onSuccess (data) {
    this.reset()
  }

  onFail (error) {
    console.log(error)
    this.errors.record(error)
  }
}
export default Form
