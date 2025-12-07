import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { EditableText } from "../editable-text";

interface KanbanLayoutProps {
  children: React.ReactNode;
  title?: string;
  titleColor?: string;
  onAddNewTask?: () => void;
}

const KanbanLayout = ({
  children,
  title,
  titleColor: color,
  onAddNewTask,
}: KanbanLayoutProps) => {
  return (
    <Card className="p-4 gap-4 w-96">
      <div className="flex items-center justify-between mb-2">
        <Badge className="text-md" style={{ backgroundColor: color }}>
          <EditableText
            value={title}
            className="hover:bg-transparent"
            showPencilIcon={false}
          />
        </Badge>
        <Button
          className="w-fit"
          variant={"ghost"}
          prefix={<Plus />}
          onClick={onAddNewTask}
        >
          Add New Task
        </Button>
      </div>
      {children}
    </Card>
  );
};

export default KanbanLayout;
