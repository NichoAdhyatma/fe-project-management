export interface TaskLayout {
  title: string;
  color?: string;
}

export enum Priority {
  normal = "Normal",
  urgent = "Urgent",
}

export interface TaskItem {
  id: string;
  title: string;
  taskLayout?: TaskLayout;
  dueDate?: Date;
  priority?: Priority;
}

export function getPriorityColor(priority?: Priority) {
  switch (priority) {
    case Priority.normal:
      return "#0046FF";
    case Priority.urgent:
      return "#DC0000";
    default:
      return "#000000";
  }
}
