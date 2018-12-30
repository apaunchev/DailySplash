import React from "react";
import styled from "styled-components";

const Container = styled.div`
  color: white;
  line-height: 1.5;

  a {
    color: white;
    opacity: 0.8;
    text-decoration: none;

    &:hover {
      opacity: 1;
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
  <Container>
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
  </Container>
);

export default PhotoInfo;
