import React, { useEffect } from "react";

const Alert = ({ show, alert, msg, showAlert }) => {
  useEffect(() => {
    const time = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => clearTimeout(time);
  }, [showAlert]);
  return (
    <div className={`alert alert-${alert}`}>
      <p>{msg}</p>
    </div>
  );
};

export default Alert;
