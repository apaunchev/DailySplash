import React from "react";
import styled from "styled-components";

const Author = styled.div`
  a {
    display: flex;
    align-items: center;
  }

  img {
    margin-right: 0.5rem;
    border-radius: 100%;
  }
`;

const PhotoInfo = ({ photo: { author, link } }) => {
  if (!author) {
    return null;
  }

  return (
    <Author>
      <a href={link}>
        <img src={author.photo} alt={author.name} />
        {author.name}
      </a>
    </Author>
  );
};

export default PhotoInfo;
