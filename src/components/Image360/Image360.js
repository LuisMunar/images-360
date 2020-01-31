import Vue from 'vue'
import { db, storage } from '../../../firebase'

export default Vue.extend({
  name: 'Image360',

  props: {
    imageSelected: {
      type: String
    }
  },

  data: () => ({
    forlderImage: 'images',
    corsFirebase: 'https://cors-anywhere.herokuapp.com/',
    imagesNames: []
  }),

  async created () {
    const querySnapshot = await this.getImages()
    this.imagesNames = await this.getImagesNames(querySnapshot)
  },

  async mounted () {
    setTimeout(async () => {
      await this.showImage()
    }, 500)
  },

  methods: {
    // updateImages () {
    //   db.collection('users').doc('LA').update({
    //     people: 3000000
    //   })
    //   .then((response) => {
    //     console.log('Document successfully written! ', response)
    //   })
    //   .catch((error) => {
    //     console.error('Error writing document: ', error)
    //   })
    // },

    // deleteImages () {
    //   db.collection('users').doc('6VdZ4ohqOdyY1prMg8Ro').delete()
    //   .then((response) => {
    //     console.log('Document successfully written! ', response)
    //   })
    //   .catch((error) => {
    //     console.error('Error writing document: ', error)
    //   })
    // },

    getImages () {
      return db.collection('users').get()
      .then((querySnapshot) => {
        return querySnapshot.docs
      })
    },

    async getImagesNames (querySnapshot) {
      let arr = []

      querySnapshot.forEach((doc) => {
        if (doc.id === 'NameImages') {
          const collection = JSON.parse(JSON.stringify(doc.data()))
          arr = collection.name
        }
      })

      return arr
    },

    async showImage () {
      this.imagesNames.forEach(async (name, index) => {
        var refImage = storage.ref().child(`${this.forlderImage}/${name}`)
        await refImage.getDownloadURL()
        .then(async (response) => {
        this.setDataPennellum(response, name, index)
      })
      })
    },

    setDataPennellum (url, name, index) {
      pannellum.viewer(`${name}${index}`, {
        type: 'equirectangular',
        panorama: `${this.corsFirebase}${url}`,
        autoLoad: true,
        title: name,
      })
    }
  }
})
