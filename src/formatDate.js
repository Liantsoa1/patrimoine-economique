function formatDate(dateToChange) {
  const date = new Date(dateToChange);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  const formattedDate = date.toLocaleDateString("fr-FR", options);
  return formattedDate;
}

export default formatDate;
