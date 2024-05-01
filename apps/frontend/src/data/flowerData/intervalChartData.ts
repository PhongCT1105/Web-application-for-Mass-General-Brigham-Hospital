const randomDateInRange = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

// Function to generate test data
const generateTestData = (
  numIntervals: number,
): { start: Date; end: Date }[] => {
  const startDate: Date = new Date(); // Set your start date here
  const endDate: Date = new Date(); // Set your end date here
  const data: { start: Date; end: Date }[] = [];

  for (let i: number = 0; i < numIntervals; i++) {
    const start: Date = randomDateInRange(startDate, endDate);
    const end: Date = randomDateInRange(start, endDate);
    data.push({ start, end });
  }

  return data;
};

// Example usage to generate test data for 10 intervals
export const intervalChartData: { start: Date; end: Date }[] =
  generateTestData(10);
