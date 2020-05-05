import React, { Component } from "react";
import backgroundLoader from "./backgroundLoader.svg";

export default class Background extends Component {
  state = {
    loaded: false,
    src: null,
  };

  componentDidMount() {
    this.setPreloader(this.props.photo, this.props.onImageLoaded);
  }

  componentDidUpdate(prevProps) {
    if (this.props.photo !== prevProps.photo) {
      this.setPreloader(this.props.photo, this.props.onImageLoaded);
    }
  }

  componentWillUnmount() {
    this.preloader.onload = null;
  }

  setPreloader(photo, onImageLoaded) {
    this.setState({ loaded: false });
    this.preloader = new Image();

    this.preloader.onload = () => {
      this.setState({
        src: `url(${photo.src})`,
        loaded: true,
      });

      onImageLoaded();
    };

    this.preloader.src = photo.src;
  }

  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: this.props.photo.color,
        }}
      >
        {!this.state.loaded && (
          <img src={backgroundLoader} width="32" height="32" alt="" />
        )}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage: this.state.src,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transition: "opacity 300ms cubic-bezier(0.215, 0.61, 0.355, 1)",
            opacity: this.state.loaded ? 1 : 0,
          }}
        />
      </div>
    );
  }
}
