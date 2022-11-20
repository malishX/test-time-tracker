import create from "zustand";

export const useTasks = create((set, get) => ({
  tasks: [],
  addTask: (task: any) => {
    //@ts-ignore
    const tasks = get().tasks as any;
    tasks.push(task);
    set({ tasks });
  },
  addTasks: (tasks: any) => {
    //@ts-ignore
    set({ tasks });
  },
}));
