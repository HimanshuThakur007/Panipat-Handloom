/* eslint-disable no-unused-vars */
import React  from 'react';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <a><LeftOutlined /></a>;
    }
    if (type === "next") {
      return <a><RightOutlined /></a>;
    }
    return originalElement;
  }

  export function onShowSizeChange(current, pageSize) {
    // console.log(current, pageSize);
  }