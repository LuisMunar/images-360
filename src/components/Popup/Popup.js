import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'Popup',

  computed: {
    ...mapState(['loader'])
  }
})
