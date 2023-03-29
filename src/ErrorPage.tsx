import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import styled from 'styled-components';

const ErrorContainer = styled.main`
  text-align: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.colors.primaryLight};

  .status {
    font-weight: 700;
    font-size: 32px;
  }
`;

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <ErrorContainer>
      <p>Oops, you have encountered an error! </p>
      {isRouteErrorResponse(error) && (
        <div>
          <p className="status">{error.status}</p>
          <p>{error.statusText}</p>
        </div>
      )}
    </ErrorContainer>
  );
}
