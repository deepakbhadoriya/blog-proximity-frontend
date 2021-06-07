import React from "react";

const fallback = () => (
  <div className="container">
    <h1>This is offline fallback page</h1>
    <h2>When offline, any route will fallback to this page</h2>
  </div>
);

export default fallback;
