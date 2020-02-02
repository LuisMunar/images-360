import Vue from 'vue'
import Popup from './components/Popup'
import { mapMutations } from 'vuex'
import { db } from '../firebase'

export default Vue.extend({
  name: 'App',

  components: {
    Popup
  },

  created () {
    this.getImages()
  },

  methods: {
    ...mapMutations(['setArrayImagesNames']),

    getImages () {
      db.collection('users').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === 'NameImages') {
            const collection = JSON.parse(JSON.stringify(doc.data()))
            collection.data === undefined ? this.setArrayImagesNames([]) : this.setArrayImagesNames(collection.data)
          }
        })
      })
    }
  }
})
