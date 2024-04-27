import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
export interface EmployeeCardProps {
  title: string;
  index: number;
  parent: string;
}
export const EmployeeCard = ({ parent, title, index }: EmployeeCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: title,
    data: {
      title,
      index,
      parent,
    },
  });

  return (
    <div>
      <Card
        // className={"shadow"}
        className={"shadow"}
        style={{ transform: CSS.Translate.toString(transform), zIndex: 1000 }}
        {...listeners}
        {...attributes}
        ref={setNodeRef}
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>

        <CardContent></CardContent>
      </Card>
    </div>
  );
};
