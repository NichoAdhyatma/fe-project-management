import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function KanbanProjectPage() {
  return (
    <Box m={16} gap={16} className="w-fit">
      <Button className="w-fit" prefix={<Plus />}>Add New Group</Button>

      <Card className="p-5">
        <Card className="w-96 rounded-md">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>
              <Button prefix={<Plus />}>Add Task</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>

        <Card className="w-96 rounded-md">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>
              <Button prefix={<Plus />}>Add Task</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
        </Card>
      </Card>

      
    </Box>
  );
}
