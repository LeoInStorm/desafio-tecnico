import { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Column } from '../../components/Column';
import { AddTaskModal } from '../../components/AddTaskModal';
import useBoardStore from '../../store/BoardStore';
import { Task, TaskStatus, Column as ColumnType } from '../../typings';
import { TaskModal } from '../../components/TaskModal';

const COLUMNS: ColumnType[] = [
  { id: 'BACKLOG', title: 'Backlog' },
  { id: 'A_FAZER', title: 'A fazer' },
  { id: 'EM_ANDAMENTO', title: 'Em andamento' },
  { id: 'FASE_DE_TESTES', title: 'Fase de testes' },
  { id: 'CONCLUIDO', title: 'Concluído' },
];

export default function Board() {
  const tasks = useBoardStore((state) => state.tasks);
  const updateTask = useBoardStore((state) => state.updateTask);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<TaskStatus>('BACKLOG');

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;
    updateTask(taskId, { status: newStatus });
  }

  const handleOpenAddModal = (columnId: TaskStatus) => {
    setSelectedColumn(columnId);
    setIsAddModalOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  return (
    <div className="p-4 items-center">
      <h1 className="text-2xl font-bold mb-4">Desafio Tecnico</h1>
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        defaultStatus={selectedColumn}
      />
      {selectedTask && (
        <TaskModal
          task={selectedTask}
          isOpen={isTaskModalOpen}
          onClose={() => {
            setIsTaskModalOpen(false);
            setSelectedTask(null);
          }}
        />
      )}
      <div className="flex justify-center gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              onAddCard={handleOpenAddModal}
              onTaskClick={handleTaskClick}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}