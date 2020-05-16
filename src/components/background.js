import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { preloadImage } from "../utils";
import backgroundLoader from "./backgroundLoader.svg";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
`;

const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: ${(props) => props.src};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: opacity 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
  opacity: ${(props) => (props.loaded ? 1 : 0)};
`;

const Loader = () => (
  <img src={backgroundLoader} width={32} height={32} alt="Loading..." />
);

function Background({ photo, onImageLoaded }) {
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async (photo = {}) => {
      try {
        if (!photo.src) return;
        setLoaded(false);
        await preloadImage(photo.src);
        setSrc(`url(${photo.src})`);
        setLoaded(true);
        onImageLoaded();
      } catch (error) {
        console.error(`Error fetching image: ${error}`);
      }
    };

    fetchImage(photo);
  }, [photo, onImageLoaded]);

  return (
    <Container color={photo.color}>
      {!loaded && <Loader />}
      <StyledBackground src={src} loaded={loaded} />
    </Container>
  );
}

export default Background;
