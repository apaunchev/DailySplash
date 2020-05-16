import React from "react";
import { Download, RefreshCw } from "react-feather";
import styled from "styled-components";
import Button, { ButtonLink } from "./button";
import Clock from "./widgets/clock";
import PhotoInfo from "./widgets/photo-info";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  box-shadow: 0 0 200px rgba(0, 0, 0, 0.5) inset;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Middle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
      <PhotoInfo photo={photo} />
      <div>
        <Button onClick={onRefresh}>
          <RefreshCw size={16} /> Refresh
        </Button>
        <ButtonLink href={photo.download}>
          <Download size={16} /> Download
        </ButtonLink>
      </div>
    </Bottom>
  </Container>
);

export default Widgets;
