import { Calendar, Delete, Flag, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "../ui/card";
import { ReactNode } from "react";
import { getPriorityColor, TaskItem } from "@/types/kanban-types";
import { Box } from "../ui/box";
import DottedCircle from "../dotted-circle";
import { format } from "date-fns";
import { EditableText } from "../editable-text";
import { EditableDate } from "../editable-date";

interface KanbanCardProps {
  task: TaskItem;
  onDeleteTask?: (id: string) => void;
  onUpdateTask?: (id: string, updates: Partial<TaskItem>) => void;
  children?: ReactNode;
}

const KanbanCard = ({
  task,
  onDeleteTask,
  onUpdateTask,
  children,
}: KanbanCardProps) => {
  const { title, taskLayout, dueDate, priority } = task;

  return (
    <Card className="w-full rounded-lg">
      <CardHeader>
        <CardTitle>
          <EditableText
            value={title}
            onSave={(newTitle) => onUpdateTask?.(task.id, { title: newTitle })}
          />
        </CardTitle>

        <CardAction>
          <Button
            size={"sm"}
            prefix={<Trash />}
            disabled={!onDeleteTask}
            variant={"destructive"}
            onClick={() => onDeleteTask?.(task.id)}
          />
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <Box direction={"horizontal"} gap={4} align={"center"}>
          <DottedCircle
            className="rounded-full w-5 h-5"
            color={taskLayout?.color}
            size={16}
            dotSize={2}
            gap={3}
          />
          <p className="font-medium">{taskLayout?.title}</p>
        </Box>

        <Box direction={"horizontal"} gap={4} align={"center"}>
          <Calendar />

          <EditableDate
            value={dueDate ? format(dueDate, "yyyy-MM-dd") : undefined}
            onSave={(newDate) => onUpdateTask?.(task.id, { dueDate: newDate })}
          />
        </Box>

        <Box direction={"horizontal"} gap={4} align={"center"}>
          <Flag
            fill={getPriorityColor(priority)}
            color={getPriorityColor(priority)}
          />
          <p className="font-medium">{priority}</p>
        </Box>

        {children}
      </CardContent>
    </Card>
  );
};

export default KanbanCard;
