import { $, fetchJson, fetchImageData } from './utils'
import { RANDOM_PHOTO_ENDPOINT } from './config'

const localStorage = window.localStorage

const el = {
  body: $('body'),
  main: $('main'),
  btnMore: $('.btn-more'),
  linkDownload: $('.link-download'),
  linkView: $('.link-view')
}

const init = () => {
  bindEvents()

  if (localStorage.getItem('nextPhoto')) {
    fillWithData(JSON.parse(localStorage.getItem('nextPhoto')))
    fetchNextPhoto()
  } else {
    fetchNextPhoto(true)
  }
}

const bindEvents = () => {
  el.btnMore.addEventListener('click', showMoreMenu)
}

const showMoreMenu = () => $('.popover').classList.toggle('is-visible')

const fetchNextPhoto = (fill = false) => {
  fetchJson(RANDOM_PHOTO_ENDPOINT)
    .then(photo => {
      fetchImageData(photo.urls.regular)
        .then(imageData => {
          const nextPhoto = {
            photoId: photo.id,
            color: photo.color,
            htmlPath: photo.links.html,
            downloadPath: photo.links.download,
            imageData
          }

          localStorage.setItem('nextPhoto', JSON.stringify(nextPhoto))

          if (fill) {
            fillWithData(nextPhoto)
          }
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
}

const fillWithData = (photo) => {
  el.main.style.backgroundColor = `${photo.color}`
  el.main.style.backgroundImage = `url(${photo.imageData})`
  el.linkDownload.href = `${photo.downloadPath}`
  el.linkView.href = `${photo.htmlPath}`
}

init()
