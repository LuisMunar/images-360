import Vue from 'vue'
import { storage, corsFirebase } from '../../../firebase'

export default Vue.extend({
  name: 'Image360',

  props: {
    idCotent: {
      type: String
    },
    imageSelected: {
      type: Object
    }
  },

  beforeMount () {
    setTimeout(async () => {
      await this.showImage()
    }, 500)
  },

  methods: {
    async showImage () {
      var refImage = storage.ref().child(`images/${this.imageSelected.name}`)
      await refImage.getDownloadURL()
      .then(async (response) => {
        this.setDataPennellum(response)
      })
    },

    setDataPennellum (url) {
      pannellum.viewer(this.idCotent, {
        type: 'equirectangular',
        panorama: `${corsFirebase}${url}`,
        autoLoad: true,
        title: this.imageSelected.name,
      })
    }
  }
})

// async getImagesNames (querySnapshot) {
//   let arr = []

//   querySnapshot.forEach((doc) => {
//     if (doc.id === 'NameImages') {
//       const collection = JSON.parse(JSON.stringify(doc.data()))
//       arr = collection.name
//     }
//   })
  
//   return arr
// },

// getImages () {
//   return db.collection('users').get()
//   .then((querySnapshot) => {
//     console.log('ONE: ', querySnapshot)
//     return querySnapshot.docs
//   })
// },

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
