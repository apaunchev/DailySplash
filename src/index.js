import "normalize.css/normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import Page from "./components/page";

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  body {
    font: 14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: #fff;

    @media (min-width: 768px) {
      font-size: 16px;
    }
  }

  a {
    text-decoration: none;
    color: #fff;
    opacity: 0.8;
    transition: opacity 0.1s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }
`;

const App = () => (
  <>
    <GlobalStyle />
    <Page />
  </>
);

ReactDOM.render(<App />, document.getElementById("root"));
