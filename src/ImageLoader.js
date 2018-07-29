export default class ImageLoader {
  constructor () {
    this.base = './api/images'
    this.context = require.context('./api/images', true, /\.(png|jpe?g|svg|)$/)
    this.images = {}
  }

  loadImages () {
    return this.context.keys().map((item, index) => {
      let key = item.replace('./', '')
      if (!(key in this.images)) {
        this.images[key] = this.context(item)
      }
      return this.images
    })
  }

  getImages () {
    return this.images
  }
}
