/* eslint-disable react/prop-types */
import React from "react";
import { Toaster, toast } from "react-hot-toast";

export const showToastMessage = (msg) => {
  toast.success(msg, {
    position: 'top-center', // You can also use 'bottom-center', 'top-left', etc.
    duration: 2000, // Duration in milliseconds
  });
};

export const showToastError = (msg) => {
  toast.error(msg, {
    position: 'top-center',
    duration: 2000,
  });
};

const ReactToast = () => {
  return (
    <div>
      <Toaster />
    </div>
  );
};

export default ReactToast;
