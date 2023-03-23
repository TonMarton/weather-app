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

  i {
    color: ${(props) => props.theme.colors.primaryDark};
  }
`;

const Capital = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primaryUltraLight};
  margin-bottom: 24px;

  @media (min-width: 768px) {
    font-size: 48px;
  }
`;

const Icon = styled.i`
  font-size: 72px;
  margin-bottom: 24px;
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.primaryUltraLight};
`;

const Temperature = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 28px;
  color: ${(props) => props.theme.colors.primaryLight};
`;

const Sunrise = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 24px;
  color: ${(props) => props.theme.colors.primaryLight};
`;

export default function Weather() {
  const { weather, capitalName } = useLoaderData() as {
    weather: WeatherData;
    capitalName: string;
  };
  const { description, icon, temperature, timezone, sunriseTime, sunsetTime } =
    weather;

  return (
    <WeatherContainer>
      <Clock epochDiffInSeconds={timezone} />
      <Capital>{capitalName}</Capital>
      <Icon className={icon} />
      <Description>{description}</Description>
      <Temperature>
        <i className="wi wi-thermometer" />
        <p>{temperature}</p>
      </Temperature>
      <Sunrise>
        <i className="wi wi-sunrise" />
        <p>{sunriseTime}</p>
      </Sunrise>
      <Sunrise>
        <i className="wi wi-sunset" />
        <p>{sunsetTime}</p>
      </Sunrise>
    </WeatherContainer>
  );
}
