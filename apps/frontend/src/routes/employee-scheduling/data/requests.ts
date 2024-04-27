export interface DraggableReqData {
  requestType: string;
  color: string;
}

export const Requests: DraggableReqData[] = [
  {
    requestType: "Maintenance",
    color: "#4bc6b9",
  },
  {
    requestType: "Medication",
    color: "#73c1c6",
  },
  {
    requestType: "Room Scheduling",
    color: "#96c3ce",
  },
  {
    requestType: "Sanitation",
    color: "#a79ab2",
  },
  {
    requestType: "Security",
    color: "#b57ba6",
  },
];
