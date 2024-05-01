export interface EventStatus {
  value: number;
  label: string;
}
export const statuses: EventStatus[] = [
  {
    value: 1,
    label: "Canceled",
  },
  {
    value: 2,
    label: "Backlog",
  },
  {
    value: 3,
    label: "Todo",
  },
  {
    value: 4,
    label: "In Progress",
  },
  {
    value: 5,
    label: "Done",
  },
];
