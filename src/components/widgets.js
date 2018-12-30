import React from "react";
import styled from "styled-components";
import Clock from "./widgets/clock";
import PhotoInfo from "./widgets/photo-info";
import Button, { ButtonLink } from "./button";
import { RefreshCw, Download } from "react-feather";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  box-shadow: 0 0 200px rgba(0, 0, 0, 0.3) inset;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Middle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Widgets = ({ photo, onRefresh }) => (
  <Container>
    <Top />
    <Middle>
      <div />
      <Clock />
      <div />
    </Middle>
    <Bottom>
      <PhotoInfo author={photo.author} location={photo.location} />
      <div>
        <Button onClick={onRefresh}>
          <RefreshCw size={14} /> Refresh
        </Button>
        <ButtonLink href={photo.download}>
          <Download size={14} /> Download
        </ButtonLink>
      </div>
    </Bottom>
  </Container>
);

export default Widgets;
