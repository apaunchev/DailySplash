import React from "react";
import styled from "styled-components";
import { Menu as MenuIcon } from "react-feather";

const MenuButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  padding: 0;
  line-height: 1;
  opacity: 0.8;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

export default () => (
  <div className="Menu">
    <MenuButton>
      <MenuIcon />
    </MenuButton>
  </div>
);
