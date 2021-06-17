import React from "react";

const Alert = ({ alerts }: any) => {
  return (
    <div className="alertContainer">
      {alerts.map((error: any) => (
        <div
          key={error.key}
          className={`alertBox alert alert-${error.className} text-center`}
          role="alert"
        >
          {error.message}
        </div>
      ))}
    </div>
  );
};

export default Alert;
