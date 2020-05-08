import { normalize } from "polished";
import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import Page from "./components/page";

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  html, body, #root {
    height: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    color: white;
  }
`;

const App = () => (
  <>
    <GlobalStyle />
    <Page />
  </>
);

ReactDOM.render(<App />, document.getElementById("root"));
