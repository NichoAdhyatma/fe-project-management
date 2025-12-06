import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "../ui/card";
import { ReactNode } from "react";

interface KanbanCardProps {
    title: string;
    description: string;
    children?: ReactNode;
}

const KanbanCard = ({ title, description, children }: KanbanCardProps) => {
  return (
    <Card className="w-96 rounded-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Button prefix={<Plus />}>Add Task</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default KanbanCard;
