export const formatPostalCode = (postalCode: string) => {
  if (postalCode.length !== 7) return postalCode;
  
  return `${postalCode.slice(0, 3)}-${postalCode.slice(3)}`;
};