import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from '../TaskCard';
import { Column as ColumnType, TaskStatus, Task } from '../../typings';

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  onAddCard: (columnId: TaskStatus) => void;
  onTaskClick: (task: Task) => void;
};

export function Column({ column, tasks, onAddCard, onTaskClick }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className={"flex w-80 flex-col rounded-lg bg-neutral-800 p-4"}>
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={onTaskClick} />
        ))}
      </div>
      <button
        onClick={() => onAddCard(column.id)}
        className="mt-4 bg-neutral-800 text-white px-2 py-1 rounded hover:bg-neutral-600 cursor-pointer"
      >
      + Criar novo card
      </button>
    </div>
  );
}