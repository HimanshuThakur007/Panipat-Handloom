import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { base_path } from "../../environment";
const ImageWithBasePath = (props) => {
  const isAbsoluteURL = (url) => /^https?:\/\//i.test(url);

  // const fullSrcc = `${process.env.PUBLIC_URL}${base_path}${props.src}`;
  // const fullSrc = isAbsoluteURL(props.src) ? props.src :`${process.env.PUBLIC_URL}${base_path}${props.src}`;
  const fullSrc = isAbsoluteURL(props.src) ? props.src :`${base_path}${props.src}`;
  // const fullSrc = isAbsoluteURL(props.src) ? props.src :`/public/assets/${props.src}`;
  // console.log(fullSrc,'fullsrc--')
  return (

    <img
      className={props.className}
      src={fullSrc}
      height={props.height}
      alt={props.alt}
      width={props.width}
      id={props.id}
    />
  );
};

// Add PropTypes validation
ImageWithBasePath.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired, // Make 'src' required
  alt: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  id: PropTypes.string,
};

export default ImageWithBasePath;
