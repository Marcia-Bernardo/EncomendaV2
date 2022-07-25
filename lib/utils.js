const compareDates = (deliverTime, product, exist) => {
  if (exist == 0 || product.confetionTime == 0) {
    return "white";
  }

  const preparationTime = 15;
  const date = new Date();
  const time = new Date(deliverTime);
  time.setHours(time.getHours() - 1);
  const diff = Math.ceil((time - date) / 60000);

  if (diff < product.confetionTime) {
    return "red";
  }
  if (product.confetionTime + preparationTime >= diff) {
    return "yellow";
  }

  return false;
};

const getHour = (date) => {
  const regex = /([0-1]?[0-9]|2[0-3]):[0-5][0-9]/g;

  return date.match(regex, " ");
};

export { compareDates, getHour };
