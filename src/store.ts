import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task, User } from "./types";
import { INITIAL_TASKS, CURRENT_USER } from "./data/mock";

interface AppState {
  // State
  tasks: Task[];
  user: User;
  selectedDate: Date;

  // Actions
  addTask: (
    task: Omit<Task, "id" | "progress" | "completed" | "assignees">,
  ) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskComplete: (taskId: string) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  setSelectedDate: (date: Date) => void;
  setUser: (user: User) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      tasks: INITIAL_TASKS,
      user: CURRENT_USER,
      selectedDate: new Date(),

      // Actions
      addTask: (newTask) =>
        set((state) => {
          const task: Task = {
            ...newTask,
            id: Math.random().toString(36).substr(2, 9),
            progress: 0,
            completed: false,
            assignees: [state.user],
          };
          return { tasks: [...state.tasks, task] };
        }),

      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
        })),

      toggleTaskComplete: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId
              ? {
                  ...t,
                  completed: !t.completed,
                  progress: !t.completed ? 100 : 0,
                }
              : t,
          ),
        })),

      updateTask: (taskId, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, ...updates } : t,
          ),
        })),

      setSelectedDate: (date) => set({ selectedDate: date }),

      setUser: (user) => set({ user }),
    }),
    {
      name: "taskflow-storage",
      // Custom serialization for Date objects
      partialize: (state) => ({
        tasks: state.tasks.map((task) => ({
          ...task,
          date: task.date.toISOString(),
        })),
        user: state.user,
      }),
      // Custom deserialization for Date objects
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.tasks = state.tasks.map((task) => ({
            ...task,
            date: new Date(task.date),
          }));
          state.selectedDate = new Date();
        }
      },
    },
  ),
);
