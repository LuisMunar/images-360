import Vue from 'vue'

export default Vue.extend({
  name: 'Miniature',

  props: {
    text: {
      type: String,
      required: true
    }
  }
})
