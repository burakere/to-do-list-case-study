import { create } from "zustand";
import { Task } from "../types/Task";

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  updateTask: (updatedTask) =>
    set((state) => {
      const updatedTasks = state.tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      );

      // ✅ localStorage güncelle
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        localStorage.setItem(`tasks_${storedUsername}`, JSON.stringify(updatedTasks));
      }

      return { tasks: updatedTasks };
    }),

  toggleTaskCompletion: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );

      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        localStorage.setItem(`tasks_${storedUsername}`, JSON.stringify(updatedTasks));
      }

      return { tasks: updatedTasks };
    }),

  deleteTask: (id) =>
    set((state) => {
      const updatedTasks = state.tasks.filter((t) => t.id !== id);

      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        localStorage.setItem(`tasks_${storedUsername}`, JSON.stringify(updatedTasks));
      }

      return { tasks: updatedTasks };
    }),

  setTasks: (tasks) => set({ tasks }),
}));
