import { useDroppable } from "@dnd-kit/core";
// import { EmployeeCardProps } from "@/routes/employee-scheduling/employeeCard.tsx";
import React from "react";
import { EmployeeCard } from "@/routes/employee-scheduling/unused/employeeCard.tsx";
// import { EmployeeCard } from "@/routes/employee-scheduling/SchedulingPage.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

interface ECard {
  title: string;
}
interface EmployeeLaneProps {
  title: string;
  items: ECard[];
}

export const EmployeeLane = ({ title, items }: EmployeeLaneProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
  });

  return (
    <Card
      className={`flex flex-col  min-w-[200px] min-h-[500px] bg-secondary  ${
        isOver ? "border-dashed border-2 border-primary" : ""
      }`}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent
        ref={setNodeRef}
        className={" rounded-lg flex-1 space-y-2 flex flex-col "}
        onDragOver={(e) => e.preventDefault()}
      >
        {items.map(({ title: cardTitle }, key) => (
          <EmployeeCard
            title={cardTitle}
            key={key}
            parent={title}
            index={key}
          />
        ))}
      </CardContent>
    </Card>
  );
};
