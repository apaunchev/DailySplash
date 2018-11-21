import React, { useState, useEffect } from "react";
import NProgress from "nprogress";

import { fetchJSONData, fetchImageData } from "./utils";
import { LOCAL_STORAGE_KEY, API_URL } from "./consts";

import "../node_modules/primer/build/build.css";
import "../node_modules/nprogress/nprogress.css";
import "./App.css";

const App = () => {
  const [photo, setPhoto] = useState({});
  const cachedPhoto = localStorage.getItem(LOCAL_STORAGE_KEY);

  const fetchPhoto = async () => {
    NProgress.start();

    try {
      const photo = await fetchJSONData(API_URL);
      try {
        let image = await fetchImageData(photo.urls.custom);
        image = { ...photo, image };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(image));
        NProgress.done();
        return image;
      } catch (e) {
        return console.error(e);
      }
    } catch (e) {
      return console.error(e);
    }
  };

  useEffect(
    () => {
      (async () => {
        try {
          if (cachedPhoto) {
            setPhoto(JSON.parse(cachedPhoto));
          } else {
            setPhoto(await fetchPhoto());
          }
        } catch (e) {
          return console.error(e);
        }
      })();
    },
    [setPhoto]
  );

  if (!photo || !photo.id) {
    return <div className="App" />;
  }

  return (
    <div
      className="App d-flex flex-items-end"
      style={{
        backgroundImage: `linear-gradient(180deg, transparent 80%, rgba(0, 0, 0, 0.3)), url(${
          photo.image
        })`
      }}
    >
      <div className="d-flex flex-auto flex-justify-between flex-items-center p-3">
        <div className="d-flex flex-column">
          <div>
            <a className="text-white" href={photo.user.links.html}>
              {photo.user.name}
            </a>
          </div>
          {photo.location && (
            <div>
              <a
                className="text-white f6"
                href={`https://unsplash.com/search/${photo.location.name}`}
              >
                {photo.location.title}
              </a>
            </div>
          )}
        </div>
        <div>
          <div className="BtnGroup">
            <button
              className="btn BtnGroup-item"
              onClick={async () => setPhoto(await fetchPhoto())}
            >
              Shuffle
            </button>
            <a className="btn BtnGroup-item" href={photo.links.download}>
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
