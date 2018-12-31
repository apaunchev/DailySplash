import fetch from "unfetch";
import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";
import Background from "./background";
import Widgets from "./widgets";

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

const getQueryString = params =>
  Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join("&");

const isoDate = new Date().toISOString().slice(0, 10);
const LOCAL_STORAGE_KEY = `ds_photo-${isoDate}`;

export default class App extends Component {
  state = {
    photo: JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)) || {},
    loading: true
  };

  async componentDidMount() {
    if (!this.state.photo.id) await this.getPhoto();
  }

  getPhoto = async () => {
    try {
      const requestParams = {
        collections: ["317099"], // (https://unsplash.com/collections/317099)
        orientation: "landscape",
        client_id: process.env.REACT_APP_UNSPLASH_CLIENT_ID
      };
      const photoParams = {
        w: 1920,
        dpr: window.devicePixelRatio,
        fit: "max"
      };
      const res = await fetch(
        `https://api.unsplash.com/photos/random?${getQueryString(
          requestParams
        )}`
      );
      const json = await res.json();
      const photo = {
        id: json.id,
        color: json.color,
        link: json.links.html,
        src: `${json.urls.raw}&${getQueryString(photoParams)}`,
        download: json.urls.full,
        location: (json.location || {}).title,
        author: {
          name: json.user.name,
          link: json.user.links.html
        }
      };

      this.setState({ photo }, () =>
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(photo))
      );
    } catch (err) {
      console.error(`Error fetching photo: ${err.message}`);
    }
  };

  handleRefresh = async () => {
    this.setState({ loading: true });
    await this.getPhoto();
  };

  handleImageLoaded = () => {
    this.setState({ loading: false });
  };

  render() {
    const { photo, loading } = this.state;

    return (
      <>
        <GlobalStyle />
        <>
          <Background photo={photo} onImageLoaded={this.handleImageLoaded} />
          {!loading && <Widgets photo={photo} onRefresh={this.handleRefresh} />}
        </>
      </>
    );
  }
}
