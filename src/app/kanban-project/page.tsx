import KanbanCard from "@/components/kanban/kanban-card";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const data = [
  {
    title: "To Do",
    description: "Tasks to be done",
  },
  {
    title: "In Progress",
    description: "Tasks in progress",
  },
];

export default function KanbanProjectPage() {
  return (
    <Box m={16} gap={16} className="w-fit">
      <Button className="w-fit" prefix={<Plus />}>
        Add New Group
      </Button>

      {data.map((group, index) => (
        <KanbanCard
          key={index}
          title={group.title}
          description={group.description}
        />
      ))}
    </Box>
  );
}
