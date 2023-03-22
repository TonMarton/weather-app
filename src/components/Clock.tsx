import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { formatToTwoDigit } from '../utils';

const ClockContainer = styled.div`
  color: ${(props) => props.theme.colors.primary};
  font-size: 64px;
  font-weight: 300;
  line-height: 64px;

  span {
    display: block;
  }
`;

function getAdjustedTime(epochDiff: number) {
  const date = new Date();
  date.setTime(date.getTime() + epochDiff * 1000);
  return date;
}

export default function Clock(props: { epochDiffInSeconds: number }) {
  const { epochDiffInSeconds } = props;
  const [date, setDate] = useState(getAdjustedTime(epochDiffInSeconds));

  function refreshClock() {
    setDate(getAdjustedTime(epochDiffInSeconds));
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  });
  return (
    <ClockContainer>
      <span>{formatToTwoDigit(date.getUTCHours().toString())}</span>
      <span>{formatToTwoDigit(date.getUTCMinutes().toString())}</span>
    </ClockContainer>
  );
}
