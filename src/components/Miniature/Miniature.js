import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import { db } from '../../../firebase'

export default Vue.extend({
  name: 'Miniature',

  props: {
    idButton: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapState(['arrayImagesNames'])
  },

  methods: {
    ...mapMutations(['popupManager', 'setArrayImagesNames']),

    imagesManager () {
      const tempArray = this.arrayImagesNames
      tempArray.splice(this.idButton, 1)
      this.setArrayImagesNames(tempArray)

      this.popupManager({title: 'Deleting image...', text: 'Validating...', status: true})
      db.collection('users').doc('NameImages').set({
        data: tempArray,
      })
      .then(async (response) => {
        this.popupManager({title: 'Success', text: 'Image deleted successfully', status: true})
        this.closePopupManager()
      })
      .catch((error) => {
        console.info('ERROR: ', error)
        this.popupManager({title: 'ERROR', text: error, status: true})
        this.closePopupManager()
      })
    },

    deleteImage () {

    },

    a () {
      db.collection('users').doc('6VdZ4ohqOdyY1prMg8Ro').delete()
      .then((response) => {
        console.log('Document successfully written! ', response)
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
    },

    closePopupManager () {
      setTimeout(() => {
        this.popupManager({title: '', text: '', status: false})
      }, 3000)
    }
  }
})
