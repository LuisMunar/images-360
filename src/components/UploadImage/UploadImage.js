import Vue from 'vue'
import { db, storage } from '../../../firebase'
import { mapState, mapMutations } from 'vuex'

export default Vue.extend({
  name: 'UploadImage',

  data: () => ({
    imageDescription: null,
    uploadImageManager: true
  }),

  computed: {
    ...mapState(['arrayImagesNames'])
  },

  methods: {
    ...mapMutations(['popupManager', 'addImageName']),

    async uploadImage (file) {
      this.popupManager({title: 'Uploading image...', text: 'Validating...', status: true})

      var refUpload = storage.ref('images').child(file.target.files[0].name)
      refUpload.put(file.target.files[0])
      .then(async (response) => {
        await this.setImages(response.metadata.name)
      })
      .catch((error) => {
        console.info('ERROR: ', error)
        this.popupManager({title: 'ERROR', text: error, status: true})
        this.closePopupManager()
      })
    },

    async setImages (imageName) {
      this.addImageName({name: imageName, description: this.imageDescription})
      db.collection('users').doc('NameImages').set({
        data: this.arrayImagesNames,
      })
      .then(async (response) => {
        this.popupManager({title: 'Success', text: 'Image uploaded successfully', status: true})
        this.imageDescription = ''
        this.uploadImageManager = true
        this.closePopupManager()
      })
      .catch((error) => {
        console.info('ERROR: ', error)
        this.popupManager({title: 'ERROR', text: error, status: true})
        this.closePopupManager()
      })
    },

    handlerInputText (e) {
      this.uploadImageManager = e.target.value !== '' ? false : true
    },

    closePopupManager () {
      setTimeout(() => {
        this.popupManager({title: '', text: '', status: false})
      }, 3000)
    }
  },
})
