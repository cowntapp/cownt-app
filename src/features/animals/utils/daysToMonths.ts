export const daysToMonths = (days: number | null | undefined): string => {
  if (!days) return '';
  const months = Math.floor(days / 30.44); // 365.25/12 = 30.44 días por mes promedio
  return `(${months}m)`;
};
