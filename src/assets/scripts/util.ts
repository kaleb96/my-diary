export function formatDate(date: Date | string) {
  const convertData = new Date(date);
  const year = convertData.getFullYear();
  const month = String(convertData.getMonth() + 1).padStart(2, '0');
  const day = String(convertData.getDate()).padStart(2, '0');
  const result = `${year}-${month}-${day}`;
  console.log('result = ',result);
  return result
}