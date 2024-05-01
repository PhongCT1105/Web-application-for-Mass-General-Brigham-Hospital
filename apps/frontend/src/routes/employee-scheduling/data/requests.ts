export interface EventRequests {
  title: string;
  color: string;
  value: number;
}
export const requests: EventRequests[] = [
  {
    title: "Maintenance",
    color: "#4bc6b9",
    value: 5,
  },
  {
    title: "Medication",
    color: "#73c1c6",
    value: 1,
  },
  {
    title: "Transport",
    color: "#96c3ce",
    value: 2,
  },
  {
    title: "Sanitation",
    color: "#a79ab2",
    value: 3,
  },
  {
    title: "Security",
    color: "#b57ba6",
    value: 4,
  },
];
