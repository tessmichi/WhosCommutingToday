import { AttendanceType } from "./azure-cosmosdb-mongodb";

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const month = date.getMonth() + 1;
  return new Date(`${date.getFullYear()}-${
    month < 10 ? "0" : ""
  }${month}-${date.getDate()}`);
}

export function formatResult(item: { name: string, range: {startDate: Date, endDate: Date}[]}) {
  return {
    name: item.name,
    range: item.range.map(el => ({
      startDate: el.startDate,
      endDate: el.endDate
    }))
  }
}
