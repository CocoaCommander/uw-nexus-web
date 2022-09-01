import { useState } from "react";
import "./LoadingButton.css";
import { TailSpin } from "react-loader-spinner";

const LoadingButton = ({
  title, className, isLoading, onClick, active
}) => {

  const getClassName = () => {
    if (className) {
      if (isLoading) {
        return [active, "center-flex"].join(' '); // class when button is loading
      }
      return [className, "center-flex"].join(' ')
    }
    return (isLoading ? "loading-button-active" : "loading-button")
  }

  return (
    <div className={getClassName()} onClick={onClick}>
      {!isLoading && `${title}`}
      <TailSpin
        height="30"
        width="30"
        color="white"
        ariaLabel="tail-spin-loading"
        radius="1"
        visible={isLoading}
        />
    </div>
  );
}

export default LoadingButton;