export const LOCAL_STORAGE_KEY = "ds_nextPhoto";
export const API_URL = `https://api.unsplash.com/photos/random?featured=true&orientation=landscape&w=${
  window.innerWidth
}&h=${window.innerHeight}&client_id=${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`;
