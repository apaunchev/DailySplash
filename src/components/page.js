import React, { useCallback, useEffect } from "react";
import fetch from "unfetch";
import { useStickyState } from "../hooks/useStickyState";
import { getQueryString } from "../utils";
import Background from "./background";
import Widgets from "./widgets";

const LOCAL_STORAGE_KEY = `ds_photo`;
const Page = () => {
  const [photo, setPhoto] = useStickyState("", LOCAL_STORAGE_KEY);

  const loadPhoto = useCallback(async () => {
    try {
      const requestParams = {
        collections: ["317099"], // (https://unsplash.com/collections/317099)
        orientation: "landscape",
        client_id: process.env.REACT_APP_UNSPLASH_CLIENT_ID,
      };
      const photoParams = {
        w: 1920,
        dpr: window.devicePixelRatio,
        fit: "max",
      };
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
        src: `${json.urls.raw}&${getQueryString(photoParams)}`,
        download: json.urls.full,
        location: (json.location || {}).title,
        author: {
          name: json.user.name,
          link: json.user.links.html,
        },
      });
    } catch (err) {
      console.error(`Error fetching photo: ${err.message}`);
    }
  }, [setPhoto]);

  useEffect(() => {
    if (!photo.id) {
      loadPhoto();
    }
  }, [photo, loadPhoto]);

  return (
    <>
      <Background photo={photo} />
      <Widgets photo={photo} onRefresh={() => loadPhoto()} />
    </>
  );
};

export default Page;
