import { useState } from 'react';
import type { Task, Column as ColumnType } from '../../model/types';
import { Column } from '../../components/Column';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

const COLUMNS: ColumnType[] = [
  { id: 'BACKLOG', title: 'Backlog' },
  { id: 'A_FAZER', title: 'A fazer' },
  { id: 'EM_ANDAMENTO', title: 'Em andamento' },
  { id: 'FASE_DE_TESTES', title: 'Fase de testes' },
  { id: 'CONCLUIDO', title: 'Concluido' },
];

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Research Project',
    description: 'Gather requirements and create initial documentation',
    status: 'BACKLOG',
  },
  {
    id: '2',
    title: 'Design System',
    description: 'Create component library and design tokens',
    status: 'BACKLOG',
  },
  {
    id: '3',
    title: 'API Integration',
    description: 'Implement REST API endpoints',
    status: 'A_FAZER',
  },
  {
    id: '4',
    title: 'Testing',
    description: 'Write unit tests for core functionality',
    status: 'EM_ANDAMENTO',
  },
];

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
            ...task,
            status: newStatus,
          }
          : task,
      ),
    );
  }

  return (
    <div className="p-4 align-center">
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => {
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
              />
            );
          })}
        </DndContext>
      </div>
    </div>
  );
}