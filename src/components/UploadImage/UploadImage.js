import Vue from 'vue'
import { db, storage } from '../../../firebase'
import { mapState, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'UploadImage',

  data: () => ({
    forlderImage: 'images',
  }),

  computed: {
    ...mapState(['arrayImagesNames'])
  },

  methods: {
    ...mapMutations(['popupManager', 'addImageName']),

    async uploadImage (file) {
      this.popupManager({title: 'Uploading image...', text: 'Validating...', status: true})

      var refUpload = storage.ref(this.forlderImage).child(file.target.files[0].name)
      refUpload.put(file.target.files[0])
      .then(async (response) => {
        this.popupManager({title: 'Success', text: 'Image uploaded successfully', status: true})
        await this.setImages(response.metadata.name)
        this.closePopupManager()
      })
      .catch((error) => {
        console.info('ERROR: ', error)
        this.popupManager({title: 'ERROR', text: error, status: true})
        this.closePopupManager()
      })
    },

    async setImages (imageName) {
      this.addImageName({imageName})
      console.log('=====> ', this.arrayImagesNames);
      db.collection('users').doc('NameImages').set({
        name: this.arrayImagesNames,
      })
      .then(async (response) => {
        console.log('Document successfully written! ', await response)
      })
      .catch((error) => {
        console.info('ERROR SET IMAGE DATABASE: ', error)
      })
    },

    closePopupManager () {
      setTimeout(() => {
        this.popupManager({title: '', text: '', status: false})
      }, 2000)
    }
  },
})
