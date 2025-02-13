import useBoardStore from '../../store/BoardStore';
import { Task } from '../../typings';

interface TaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskModal({ task, isOpen, onClose }: TaskModalProps) {
  const deleteTask = useBoardStore((state) => state.deleteTask);

  if (!isOpen) return null;

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-neutral-700  p-6 rounded-md w-96">
        <h2 className="text-lg font-bold mb-4">{task.title}</h2>
        <p className="mb-4">{task.description}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Fechar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}