import React from "react";
import styled from "styled-components";
import Clock from "./widgets/clock";
import PhotoInfo from "./widgets/photo-info";
import Menu from "./widgets/menu";

const Widgets = styled.div`
  z-index: 2;
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
  text-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
`;

const Top = styled.div``;

const Middle = styled.div``;

const Bottom = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default ({ photo, onRefresh }) => (
  <Widgets>
    <Top />
    <Middle>
      <Clock />
    </Middle>
    <Bottom>
      <PhotoInfo author={photo.author} location={photo.location} />
      <Menu photo={photo} onRefresh={onRefresh} />
    </Bottom>
  </Widgets>
);
