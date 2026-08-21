export function formatTime(date, timezone) {
  return new Intl.DateTimeFormat(
    "es-ES",
    {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }
  ).format(date);
}

export function isDaytime(date, timezone) {
  const hour = Number(
    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone: timezone,
        hour: "2-digit",
        hour12: false,
      }
    ).format(date)
  );

  return hour >= 6 && hour < 18;
}
