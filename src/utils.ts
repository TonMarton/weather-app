export function formatToTwoDigit(timeString: string): string {
  return timeString.length === 2 ? timeString : `0${timeString}`;
}

export function convertEpochToTimeString(
  epochTimeInSeconds: number,
  timeZoneDiffInSeconds: number,
): string {
  const epochTimeInMiliSeconds =
    (epochTimeInSeconds + timeZoneDiffInSeconds) * 1000;
  const date = new Date(epochTimeInMiliSeconds);
  return `${formatToTwoDigit(date.getUTCHours().toString())}:${formatToTwoDigit(
    date.getUTCMinutes().toString(),
  )}`;
}
