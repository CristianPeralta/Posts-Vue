class Errors {
  constructor () {
    this.errors = {}
  }
  get (field) {
    if (this.errors[field]) {
      return this.errors[field]['message']
    }
  }
  has (field) {
    return this.errors.hasOwnProperty(field)
  }
  any () {
    return Object.keys(this.errors).length > 0
  }
  record (errors) {
    this.errors = errors
  }
  clear (field) {
    delete this.errors[field]
    if (field) {
      delete this.errors[field]
      return
    }
    this.errors = {}
  }
}

export default Errors
