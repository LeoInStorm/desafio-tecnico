import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskStatus } from '../typings';

interface BoardState {
    tasks: Task[];
    addTask: (title: string, description: string, status: TaskStatus) => void;
    updateTask: (id: string, newTask: Partial<Task>) => void;
    deleteTask: (id: string) => void;
  }
  
  const generateId = () => Math.random().toString(36).substr(2, 9);
  
  const useBoardStore = create<BoardState, [['zustand/persist', BoardState]]>(
    persist(
      (set) => ({
        tasks: [],
        addTask: (title: string, description: string, status: TaskStatus) => {
          const newTask: Task = {
            id: generateId(),
            title,
            description,
            status,
          };
          set((state) => ({ tasks: [...state.tasks, newTask] }));
        },
        updateTask: (id: string, newTask: Partial<Task>) => {
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === id ? { ...task, ...newTask } : task
            ),
          }));
        },
        deleteTask: (id: string) => {
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
          }));
        },
      }),
      {
        name: 'kanban-board',
      }
    )
  );
  
  export default useBoardStore;