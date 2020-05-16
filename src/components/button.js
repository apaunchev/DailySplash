import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0;
  background: transparent;
  border: none;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.1s ease-in-out;
  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    opacity: 1;
  }

  > svg {
    margin-right: 0.5rem;
  }

  & + & {
    margin-left: 1.5rem;
  }
`;

const Button = (props) => (
  <StyledButton {...props}>{props.children}</StyledButton>
);

export const ButtonLink = (props) => (
  <StyledButton as="a" {...props}>
    {props.children}
  </StyledButton>
);

export default Button;
