export interface EventPriority {
  value: number;
  label: string;
}

export const priorities: EventPriority[] = [
  {
    label: "Low",
    value: 1,
  },
  {
    label: "Medium",
    value: 2,
  },
  {
    label: "High",
    value: 3,
  },
  {
    label: "Urgent",
    value: 4,
  },
];
