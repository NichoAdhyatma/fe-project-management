import { useTaskStore } from "@/store/kanban-store";

export const useKanbanStorage = () => {
  return {
    addTask: useTaskStore((s) => s.createTask),
    updateTask: useTaskStore((s) => s.updateTask),
    deleteTask: useTaskStore((s) => s.deleteTask),
    clearTasks: useTaskStore((s) => s.clearTasks),
    tasks: useTaskStore((s) => s.tasks),
  };
};
