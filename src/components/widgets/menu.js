import React, { useState } from "react";
import styled from "styled-components";
import {
  Menu as MenuIcon,
  RefreshCw,
  Download,
  ExternalLink
} from "react-feather";

const MenuButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  line-height: 1;
  opacity: 0.8;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: 0;
  }
`;

const Popover = styled.div`
  position: absolute;
  bottom: 52px;
  right: 2px;
  padding: 8px 0;
  background-color: white;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  opacity: 0;
  transform: scale(0.85) translateY(10%);
  transition: all 0.25s cubic-bezier(0.24, 0.22, 0.015, 1.56),
    opacity 0.1s ease-in-out;
  pointer-events: none;

  &.isVisible {
    opacity: 1;
    transform: scale(1) translate(0);
    pointer-events: auto;
  }

  &:after {
    position: absolute;
    top: 100%;
    bottom: 0;
    right: 9px;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid white;
    content: "";
  }
`;

const PopoverSection = styled.div`
  min-width: 220px;
  display: flex;
  flex-direction: column;
`;

const PopoverButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  background: none;
  border: none;
  color: #111;

  &:hover {
    cursor: pointer;
    background-color: #e6e6e6;
  }
`;

const PopoverButtonLink = styled.a`
  display: flex;
  align-items: center;
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  color: #111;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const PopoverButtonIcon = styled.span`
  display: inline-block;
  margin-right: 8px;
`;

const Menu = ({ download, link, onRefresh }) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  return (
    <>
      <MenuButton onClick={() => setIsPopoverVisible(!isPopoverVisible)}>
        <MenuIcon />
      </MenuButton>
      <Popover className={isPopoverVisible ? "isVisible" : null}>
        <PopoverSection>
          <PopoverButton onClick={onRefresh}>
            <PopoverButtonIcon>
              <RefreshCw size="16" />
            </PopoverButtonIcon>{" "}
            Refresh
          </PopoverButton>
          <PopoverButtonLink href={download} download>
            <PopoverButtonIcon>
              <Download size="16" />
            </PopoverButtonIcon>{" "}
            Download
          </PopoverButtonLink>
          <PopoverButtonLink href={link}>
            <PopoverButtonIcon>
              <ExternalLink size="16" />
            </PopoverButtonIcon>{" "}
            View on Unsplash
          </PopoverButtonLink>
        </PopoverSection>
      </Popover>
    </>
  );
};

export default Menu;
