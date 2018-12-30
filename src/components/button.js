import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  margin: 0 0.25em;
  padding: 0 1em;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  color: #777;
  font-size: 13px;
  line-height: 2.5;
  text-decoration: none;

  &:hover {
    color: #777;
    background-color: rgba(255, 255, 255, 1);
  }

  &:active {
    outline: none;
  }

  > svg {
    margin-right: 5px;
  }
`;

const Button = ({ onClick, children }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);

export const ButtonLink = ({ href, children }) => (
  <StyledButton as="a" href={href}>
    {children}
  </StyledButton>
);

export default Button;
