export default function getFormattedDate(stringifiedDate: string) {
  const date = new Date(stringifiedDate);
  const delimiter = '.';

  return [date.getDate(), date.getMonth() + 1, String(date.getFullYear()).substring(2)].join(
    delimiter,
  );
}
