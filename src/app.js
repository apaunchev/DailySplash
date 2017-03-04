import { $, fetchJson, fetchImageData } from './utils'
import { API_ENDPOINT, APP_ID, EXPIRE_INTERVAL } from './config'

const localStorage = window.localStorage
const nextPhoto = localStorage.getItem('ds_nextPhoto')
const expireDate = localStorage.getItem('ds_expireDate')
const now = new Date()

const el = {
  body: $('body'),
  container: $('.container'),
  btnMore: $('.btn-more'),
  btnDownload: $('.btn-download'),
  linkView: $('.link-view'),
  userImage: $('.js-user-image'),
  userImageLink: $('.js-user-image-link'),
  userLink: $('.js-user-link'),
  locationLink: $('.js-location-link')
}

const init = () => {
  bindEvents()

  if (nextPhoto) {
    fillWithData(JSON.parse(nextPhoto))

    if (expireDate && expireDate <= now.getTime()) {
      fetchNextPhoto()
    }
  } else {
    fetchNextPhoto(true)
  }
}

const bindEvents = () => {
  el.btnMore.addEventListener('click', toggleMoreMenu)
  el.body.addEventListener('click', hideMoreMenu)
}

const toggleMoreMenu = (ev) => {
  ev.stopPropagation()
  $('.popover').classList.toggle('is-visible')
}

const hideMoreMenu = () => $('.popover').classList.remove('is-visible')

const fetchNextPhoto = (fill = false) => {
  fetchJson(`${API_ENDPOINT}/photos/random?collections=317099&orientation=landscape&w=${window.innerWidth}&h=${window.innerHeight}&client_id=${APP_ID}`)
    .then(photo => {
      if (!photo) {
        return
      }

      fetchImageData(photo.urls.custom)
        .then(imageData => {
          if (!imageData) {
            return
          }

          const nextPhoto = {
            color: photo.color,
            htmlPath: photo.links.html,
            downloadPath: photo.links.download,
            location: photo.location ? photo.location.name : null,
            user: {
              name: photo.user.name,
              image: photo.user.profile_image.small,
              link: photo.user.links.html
            },
            imageData
          }

          localStorage.setItem('ds_nextPhoto', JSON.stringify(nextPhoto))
          localStorage.setItem('ds_expireDate', now.getTime() + EXPIRE_INTERVAL)

          if (fill) {
            fillWithData(nextPhoto)
          }
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
}

const fillWithData = (photo) => {
  el.body.style.backgroundColor = `${photo.color}`
  el.container.style.backgroundImage = `url(${photo.imageData})`

  el.btnDownload.href = `${photo.downloadPath}`
  el.linkView.href = `${photo.htmlPath}`

  el.userImage.src = `${photo.user.image}`
  el.userImageLink.href = `${photo.user.link}`

  el.userLink.href = `${photo.user.link}`
  el.userLink.textContent = `${photo.user.name}`

  if (photo.location) {
    el.locationLink.textContent = `${photo.location}`
    el.locationLink.href = `https://unsplash.com/search/${photo.location}`
  } else {
    el.locationLink.remove()
  }
}

init()
