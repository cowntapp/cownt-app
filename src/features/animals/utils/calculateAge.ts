export const calculateAge = (birthDate: string | null) => {
  if (!birthDate) return null;
  const birth = Number(birthDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - birth);
  const totalMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30.44)); // 365.25/12 = 30.44 días por mes promedio
  const years = Math.floor(totalMonths / 12);

  return {
    month: totalMonths,
    years,
  };
};
