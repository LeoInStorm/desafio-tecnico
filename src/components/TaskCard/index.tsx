import { useDraggable } from '@dnd-kit/core';
import { Task } from '../../typings';

type TaskCardProps = {
  task: Task;
  onClick?: (task: Task) => void;
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      <div
        onDoubleClick={(e) => {
          e.stopPropagation();
          onClick && onClick(task);
        }}
        className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
      >
        <h3 className="font-medium text-neutral-100">{task.title}</h3>
        <p className="mt-2 text-sm text-neutral-400">{task.description}</p>
      </div>
    </div>
  );
}