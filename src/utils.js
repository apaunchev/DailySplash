export const fetchJSONData = url =>
  fetch(url)
    .then(response => response.json())
    .then(json => json)
    .catch(error => console.error(error));

export const fetchImageData = url =>
  fetch(url)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise((resolve, reject) => {
          const reader = new window.FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    )
    .catch(error => console.error(error));
