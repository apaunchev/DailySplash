import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "polished";
import fetch from "unfetch";

const LOCAL_STORAGE_KEY = "ds_photo";

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif,"Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-size: cover;
  opacity: 0;
  animation: fadeIn 1s both;
`;

const Controls = styled.div`
  align-self: flex-end;
  padding: 20px;
`;

const Location = styled.div`
  color: white;
  opacity: 0.8;
  font-size: 14px;

  &:hover {
    opacity: 1;
  }

  > a {
    color: white;
    text-decoration: none;
  }
`;

export default () => {
  const initialPhoto = () =>
    JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)) || {};
  const [photo, setPhoto] = useState(initialPhoto);
  const [isLoading, setIsLoading] = useState(true);
  const getPhoto = async () => {
    try {
      const requestParams = {
        collections: ["317099"], // default to Unsplash Editorial collection (https://unsplash.com/collections/317099)
        orientation: "landscape",
        w: window.innerWidth * window.devicePixelRatio,
        h: window.innerHeight * window.devicePixelRatio,
        client_id: process.env.REACT_APP_UNSPLASH_CLIENT_ID
      };
      const queryString = Object.keys(requestParams)
        .map(key => `${key}=${requestParams[key]}`)
        .join("&");
      const url = `https://api.unsplash.com/photos/random?${queryString}`;
      setIsLoading(true);
      const res = await fetch(url);
      const json = await res.json();
      setPhoto({
        id: json.id,
        location: (json.location || {}).title,
        link: json.links.html,
        url: json.urls.custom
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
      setIsLoading(false);
    },
    [photo]
  );

  if (!photo.id || isLoading) {
    return null;
  }

  return (
    <>
      <GlobalStyle />
      <Container
        style={{
          backgroundImage: `linear-gradient(180deg, transparent 80%, rgba(0, 0, 0, 0.3)), url(${
            photo.url
          })`
        }}
      >
        <Controls>
          {photo.location && (
            <Location>
              <a href={photo.link}>{photo.location}</a>
            </Location>
          )}
        </Controls>
      </Container>
    </>
  );
};
