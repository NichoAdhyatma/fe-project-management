"use client";

import KanbanCard from "@/components/kanban/kanban-card";
import KanbanLayout from "@/components/kanban/kanban-layout";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { useKanbanStorage } from "@/hooks/use-kanban-storage";
import { Plus } from "lucide-react";

export default function KanbanProjectPage() {
  const { tasks, addTask, deleteTask, updateTask } = useKanbanStorage();

  return (
    <Box m={16} gap={16} className="w-fit">
      <Button className="w-fit" prefix={<Plus />}>
        Add New Group
      </Button>

      <KanbanLayout
        title="Design"
        titleColor="#360185"
        onAddNewTask={() =>
          addTask({
            title: "New Task",
          })
        }
      >
        {tasks.map((task, index) => (
          <KanbanCard
            key={index}
            task={task}
            onDeleteTask={deleteTask}
            onUpdateTask={updateTask}
          />
        ))}
      </KanbanLayout>
    </Box>
  );
}
