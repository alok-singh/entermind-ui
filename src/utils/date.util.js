
export const parseAWSDateRange = (rangeStr) => {
  // Example input: "Jan 1 - Jan 31, 2025"
  const regex = /^([A-Za-z]+)\s+(\d+)\s*-\s*([A-Za-z]+)\s+(\d+),\s*(\d{4})$/;
  const match = rangeStr.match(regex);

  if (!match) {
    throw new Error("Invalid date range format");
  }

  const [, startMonth, startDay, endMonth, endDay, year] = match;

  const startDate = new Date(`${startMonth} ${startDay}, ${year}`);
  const endDate = new Date(`${endMonth} ${endDay}, ${year}`);

  return { start: startDate, end: endDate };
}



export const formatDateToYYYYMMDD = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid Date object");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
