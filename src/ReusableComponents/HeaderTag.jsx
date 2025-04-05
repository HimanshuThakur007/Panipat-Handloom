/* eslint-disable react/prop-types */
import React from 'react'

const HeaderTag = ({headTitle}) => {
  return (
    <>
      <h2
        className="mb-3"
        style={{
          background: "linear-gradient(45deg, #e6317b, #bd529c, #6b94ce)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
          display: "inline-block",
          fontStyle: "italic",
          fontFamily: "serif"
        }}
      >
        {headTitle}
      </h2>
    </>
  );
}

export default HeaderTag