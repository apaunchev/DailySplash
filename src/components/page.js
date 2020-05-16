import React, { useCallback, useEffect, useState } from "react";
import fetch from "unfetch";
import { useStickyState } from "../hooks/useStickyState";
import { getQueryString } from "../utils";
import Background from "./background";
import Widgets from "./widgets";

const LOCAL_STORAGE_KEY = `ds_photo`;
const Page = () => {
  const [photo, setPhoto] = useStickyState("", LOCAL_STORAGE_KEY);
  const [loading, setLoading] = useState(true);

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
        download: json.links.download,
        author: {
          name: json.user.name,
          photo: json.user.profile_image.small,
        },
      });
    } catch (error) {
      console.error(`Error fetching photo: ${error}`);
    }
  }, [setPhoto]);

  const handleRefresh = useCallback(() => {
    setLoading(true);
    loadPhoto();
  }, [loadPhoto]);

  const handleImageLoaded = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    if (!photo.id) {
      handleRefresh();
    }
  }, [photo.id, handleRefresh]);

  return (
    <>
      <Background photo={photo} onImageLoaded={handleImageLoaded} />
      {!loading && <Widgets photo={photo} onRefresh={handleRefresh} />}
    </>
  );
};

export default Page;
