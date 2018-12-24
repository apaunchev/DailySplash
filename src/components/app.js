import fetch from "unfetch";
import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";
import Background from "./background";
import Widgets from "./widgets";

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  html, body, #root {
    height: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    color: white;
  }
`;

const getQueryString = params =>
  Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join("&");

export default () => {
  const isoDate = new Date().toISOString().slice(0, 10);
  const LOCAL_STORAGE_KEY = `ds_photo-${isoDate}`;
  const initialPhoto = () =>
    JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
  const [photo, setPhoto] = useState(initialPhoto);
  const [isLoading, setIsLoading] = useState(false);

  const getPhoto = async () => {
    try {
      const requestParams = {
        // default to Unsplash Editorial collection (https://unsplash.com/collections/317099)
        collections: ["317099"],
        orientation: "landscape",
        client_id: process.env.REACT_APP_UNSPLASH_CLIENT_ID
      };
      const photoParams = { w: 1440, dpr: window.devicePixelRatio, fit: "max" };

      setIsLoading(true);
      const res = await fetch(
        `https://api.unsplash.com/photos/random?${getQueryString(
          requestParams
        )}`
      );
      const json = await res.json();
      setPhoto({
        id: json.id,
        color: json.color,
        link: json.links.html,
        src: `${json.urls.raw}?${getQueryString(photoParams)}`,
        download: json.urls.full,
        location: (json.location || {}).title,
        author: {
          name: json.user.name,
          link: json.user.links.html
        }
      });
    } catch (err) {
      console.error(`Error fetching photo: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (!initialPhoto().id) await getPhoto();
    })();
  }, []);

  useEffect(
    () => {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(photo));
    },
    [photo]
  );

  if (!photo.id || isLoading) {
    return null;
  }

  return (
    <>
      <GlobalStyle />
      <>
        <Background color={photo.color} src={photo.src} />
        <Widgets photo={photo} onRefresh={async () => await getPhoto()} />
      </>
    </>
  );
};
