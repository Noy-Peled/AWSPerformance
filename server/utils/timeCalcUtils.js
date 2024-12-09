const getTimeToStart = (timePeriod) => {
  // Create Date instance, check timePeriod cases and return the appropriate time.
  const date = new Date();

  switch (timePeriod) {
    case "24h":
      return date.setDate(date.getDate() - 1);

    case "12h":
      return date.setHours(date.getHours() - 12);

    case "6h":
      return date.setHours(date.getHours() - 6);

    case "60m":
      return date.setHours(date.getHours() - 1);

    case "30m":
      return date.setMinutes(date.getMinutes() - 30);

    case "10m":
      return date.setMinutes(date.getMinutes() - 10);

    default:
      break;
  }
};

module.exports = { getTimeToStart };
