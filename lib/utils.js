const compareDates = (time, confetionTime) => {
  const date = new Date();
  const hours = parseInt(time.split(":")[0]);
  const minutes = parseInt(time.split(":")[1]) || 0;
  // console.log(confetionTime);
  if (date.getHours() > hours) {
  } else if (date.getHours() === hours) {
    if (date.getMinutes() > minutes) {
      return true;
    }
  }
  return false;
};

export { compareDates };
