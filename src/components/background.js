import React, { useEffect, useState } from "react";

function Background({ photo }) {
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    setLoaded(false);
    const preloader = new Image();
    preloader.src = photo.src;
    preloader.onload = () => {
      setSrc(`url(${photo.src})`);
      setLoaded(true);
    };
  }, [photo.src]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: photo.color,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage: src,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "opacity 300ms cubic-bezier(0.215, 0.61, 0.355, 1)",
          opacity: loaded ? 1 : 0,
        }}
      />
    </div>
  );
}

export default Background;
