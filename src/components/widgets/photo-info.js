import React from "react";
import styled from "styled-components";
import { darken } from "polished";

const StyledPhotoInfo = styled.div`
  color: #fff;
  line-height: 1.5;

  a {
    color: ${darken(0.2, "#fff")};
    text-decoration: none;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: #fff;
    }
  }
`;

const Author = styled.div`
  font-size: 16px;
`;

const Location = styled.div`
  font-size: 14px;
`;

const PhotoInfo = ({ author, location }) => (
  <StyledPhotoInfo>
    {author && (
      <Author>
        <a href={author.link}>{author.name}</a>
      </Author>
    )}
    {location && (
      <Location>
        <a href={`https://unsplash.com/search/photos/${location}`}>
          {location}
        </a>
      </Location>
    )}
  </StyledPhotoInfo>
);

export default PhotoInfo;
