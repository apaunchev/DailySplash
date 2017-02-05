import { $, $$ } from './utils'
import { APP_ID, APP_SECRET, CALLBACK_URL } from './config'
import Unsplash, { toJson } from 'unsplash-js'

const el = {
  body: $('body'),
  header: $('header'),
  btnMore: $('.btn-more'),
  linkDownload: $('.link-download'),
  linkView: $('.link-view'),
  main: $('main')
}

el.btnMore.addEventListener('click', showMoreMenu)

const unsplash = new Unsplash({
  applicationId: APP_ID,
  secret: APP_SECRET,
  callbackUrl: CALLBACK_URL
})

unsplash.photos.getRandomPhoto({
  featured: true
})
  .then(toJson)
  .then(json => {
    const { color, links, urls } = json

    el.main.style.backgroundColor = color
    el.main.style.backgroundImage = `url(${urls.full})`
    el.linkDownload.href = links.download
    el.linkView.href = links.html
  })
  .catch(err => {
    console.error(err)
    fillWithDummyData()
  })

function fillWithDummyData () {
  el.main.style.backgroundImage = `url(placeholder.png)`
  el.linkDownload.href = `placeholder.png`
  el.linkView.href = `https://unsplash.com`
}

function showMoreMenu () {
  $('.popover').classList.toggle('is-visible')
}
