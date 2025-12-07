import { TaskItem } from "@/types/kanban-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface TaskState {
  tasks: TaskItem[];

  createTask: (task: Omit<TaskItem, "id">) => void;
  updateTask: (id: string, updates: Partial<TaskItem>) => void;
  deleteTask: (id: string) => void;
  clearTasks: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    immer((set) => ({
      tasks: [],

      createTask: (task) =>
        set((state) => {
          state.tasks.push({
            ...task,
            id: crypto.randomUUID(),
          });
        }),

      updateTask: (id, updates) =>
        set((state) => {
        const index: number = state.tasks.findIndex((t: TaskItem) => t.id === id);
          if (index !== -1) {
            state.tasks[index] = { ...state.tasks[index], ...updates };
          }
        }),

      deleteTask: (id) =>
        set((state) => {
          state.tasks = state.tasks.filter((t: TaskItem) => t.id !== id);
        }),

      clearTasks: () =>
        set((state) => {
          state.tasks = [];
        }),
    })),
    {
      name: "task-storage",
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);
