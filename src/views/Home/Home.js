import Vue from 'vue'
import Image360 from '../../components/Image360'
import UploadImage from '../../components/UploadImage'
import Miniature from '../../components/Miniature'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'Home',

  data: () => ({
    cantImages: [true, false, false, false],
    imageSelected: ''
  }),

  components: {
    Image360,
    UploadImage,
    Miniature
  },

  computed: {
    ...mapState(['arrayImagesNames'])
  },

  created () {
    this.setImageSelected(0)
  },

  methods: {
    setImageSelected (index) {
      this.imageSelected = this.arrayImagesNames[index]
    }
  }
})
