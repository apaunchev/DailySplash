import React, { useState, useEffect } from "react";
import NProgress from "nprogress";
import Octicon, { Sync, DesktopDownload } from "@githubprimer/octicons-react";

import { ENDPOINTS, LOCAL_STORAGE_KEYS, COLLECTIONS } from "./consts";
import { fetchJSONData, fetchImageData } from "./utils";

import "../node_modules/primer/build/build.css";
import "../node_modules/nprogress/nprogress.css";
import "./App.css";

const App = () => {
  const initialPhoto = () =>
    JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEYS.NEXT_PHOTO)) ||
    {};
  const [photo, setPhoto] = useState(initialPhoto);
  const [loading, setLoading] = useState(false);
  const getPhoto = async () => {
    try {
      setLoading(true);
      NProgress.start();
      const requestParams = {
        collections:
          window.localStorage.getItem(LOCAL_STORAGE_KEYS.COLLECTIONS) ||
          COLLECTIONS,
        orientation: "landscape",
        w: window.innerWidth * window.devicePixelRatio,
        h: window.innerHeight * window.devicePixelRatio,
        client_id: process.env.REACT_APP_UNSPLASH_CLIENT_ID
      };
      const queryString = Object.keys(requestParams)
        .map(key => `${key}=${requestParams[key]}`)
        .join("&");
      const photo = await fetchJSONData(`${ENDPOINTS.RANDOM}${queryString}`);
      const data = await fetchImageData(photo.urls.custom || photo.urls.full);
      setPhoto({
        id: photo.id,
        links: photo.links,
        location: photo.location,
        user: photo.user,
        data
      });
    } catch (e) {
      console.error(`Error fetching photo: ${e}`);
      setPhoto({
        user: {
          name: "Unable to load photo."
        },
        location: {
          title: "Please try again or contact the developer."
        }
      });
    } finally {
      setLoading(false);
      NProgress.done();
    }
  };

  useEffect(() => {
    (async () => {
      if (!initialPhoto().id) await getPhoto();
    })();
  }, []);

  useEffect(
    () =>
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.NEXT_PHOTO,
        JSON.stringify(photo)
      ),
    [photo]
  );

  if (!photo) {
    return <div className="App" />;
  }

  return (
    <div
      className="App d-flex flex-items-end"
      style={{
        backgroundImage: `linear-gradient(180deg, transparent 80%, rgba(0, 0, 0, 0.3)), url(${
          photo.data
        })`
      }}
    >
      <div className="d-flex flex-auto flex-justify-between flex-items-center p-3">
        <div className="d-flex flex-column">
          {photo.user && (
            <div>
              {photo.user.links ? (
                <a className="text-white" href={photo.user.links.html}>
                  {photo.user.name}
                </a>
              ) : (
                <span className="text-white">{photo.user.name}</span>
              )}
            </div>
          )}
          {photo.location && (
            <div>
              {photo.location.name ? (
                <a
                  className="text-white f6"
                  href={`${ENDPOINTS.SEARCH}/${photo.location.name}`}
                >
                  {photo.location.title}
                </a>
              ) : (
                <span className="text-white f6">{photo.location.title}</span>
              )}
            </div>
          )}
        </div>
        <div>
          <div className="BtnGroup">
            <button
              className="btn btn-sm BtnGroup-item"
              onClick={async () => await getPhoto()}
              disabled={loading}
            >
              <Octicon icon={Sync} width={14} height={14} /> Refresh
            </button>
            {photo.links && (
              <a
                className="btn btn-sm BtnGroup-item"
                href={photo.links.download}
              >
                <Octicon icon={DesktopDownload} width={14} height={14} />{" "}
                Download
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
