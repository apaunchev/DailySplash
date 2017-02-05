const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const toDataUrl = url => window.fetch(url)
  .then(res => res.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new window.FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))

export { $, $$, toDataUrl }
