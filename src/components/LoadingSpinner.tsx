import React from 'react';
import { RevolvingDot } from 'react-loader-spinner';
import styled, { useTheme } from 'styled-components';

const SpinnerContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.theme.colors.primaryUltraLightTransparent};

  & > div {
    border-radius: 16px;
    background-color: white;
    padding: 24px;
  }
`;

export default function LoadingSpinner() {
  const theme = useTheme();

  return (
    <SpinnerContainer>
      <div>
        <RevolvingDot
          height="400"
          width="400"
          radius={100}
          color={theme.colors.primary}
          ariaLabel="revolving-dot-loading"
          visible
        />
      </div>
    </SpinnerContainer>
  );
}
