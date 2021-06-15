import React from "react";
import styled from "styled-components";

const Alert = ({ alerts }: any) => {
  return (
    <AlertContainer>
      {alerts.map((error: any) => (
        <AlertBox
          key={error.key}
          className={`alert alert-${error.className} text-center`}
          role="alert"
        >
          {error.message}
        </AlertBox>
      ))}
    </AlertContainer>
  );
};

export default Alert;

const AlertContainer = styled.div`
  position: fixed;
  z-index: 110;
  top: 100px;
  right: 40px;
`;

const AlertBox = styled.div`
  padding: 10px 30px;
`;
