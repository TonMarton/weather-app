import React from 'react';
import { useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { Weather as WeatherData } from '../types';
import Clock from '../components/Clock';

const WeatherContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (min-width: 768px) {
    margin-top: 100px;
  }
`;

const Capital = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primaryUltraLight};

  @media (min-width: 768px) {
    font-size: 48px;
  }
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.primaryUltraLight};
`;

const Temperature = styled.div`
  font-size: 28px;
  color: ${(props) => props.theme.colors.primaryLight};
`;

const Sunrise = styled.div`
  font-size: 24px;
  color: ${(props) => props.theme.colors.primaryLight};
`;

const Sunset = styled.div`
  font-size: 24px;
  color: ${(props) => props.theme.colors.primaryLight};
`;

export default function Weather() {
  const { weather, capitalName } = useLoaderData() as {
    weather: WeatherData;
    capitalName: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { description, icon, temperature, timezone, sunriseTime, sunsetTime } =
    weather;

  return (
    <WeatherContainer>
      <Clock epochDiffInSeconds={timezone} />
      <Capital>{capitalName}</Capital>
      <i className="wi wi-rain" />
      <Description>{description}</Description>
      <Temperature>
        <p>{temperature}</p>
      </Temperature>
      <Sunrise>
        <p>{sunriseTime}</p>
      </Sunrise>
      <Sunset>
        <p>{sunsetTime}</p>
      </Sunset>
    </WeatherContainer>
  );
}
