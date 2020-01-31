import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    arrayImagesNames: [],
    loader: {
      title: 'Title',
      text: 'Text',
      state: false
    }
  },
  mutations: {
    setArrayImagesNames (state, payload) {
      state.arrayImagesNames = payload.arrayImageName
    },

    addImageName (state, payload) {
      state.arrayImagesNames.push(payload.imageName)
    },

    popupManager(state, payload) {
      state.loader.title = payload.title
      state.loader.text = payload.text
      state.loader.state = payload.status
    }
  },
  actions: {},
  modules: {}
})
