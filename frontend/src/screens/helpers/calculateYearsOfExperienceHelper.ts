const CalculateYearsOfExperience = (start_date: Date) => {
  const today = new Date();
  start_date = new Date(start_date);
  const [currentMonth, currentYear] = [today.getMonth() + 1, today.getFullYear()];
  const [start_month, start_year] = [start_date.getMonth() + 1, start_date.getFullYear()];

  const [month_diff, year_diff] = [currentMonth - start_month, currentYear - start_year];
  if (year_diff < 1) {
    //less than 1 year
    return `${month_diff} Month/s`;
  }

  if (month_diff == 0) {
    return `${year_diff + 1} Year/s`;
  } else if (month_diff > 0) {
    return `${year_diff + 1} Year/s and ${month_diff} Month/s`;
  } else {
    return `${year_diff} Year/s and ${Math.abs(month_diff)} Month/s`;
  }
};

export default CalculateYearsOfExperience;