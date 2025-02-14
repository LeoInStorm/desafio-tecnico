import { useState, useEffect } from 'react';
import { Task } from '../../typings';
import useBoardStore from '../../store/BoardStore';
import { FaEdit } from 'react-icons/fa';

interface TaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskModal({ task, isOpen, onClose }: TaskModalProps) {
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const updateTask = useBoardStore((state) => state.updateTask);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description);

  useEffect(() => {
    setDescription(task.description);
    setIsEditing(false);
  }, [task]);

  if (!isOpen) return null;

  const handleDelete = () => {
    deleteTask(task.id);
    onClose();
  };

  const handleSave = () => {
    updateTask(task.id, { description });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg z-50">
      <div className="bg-neutral-700 p-6 rounded-md w-96">
        <h2 className="text-lg font-bold mb-4 text-white">Detalhes da Tarefa</h2>
        <div className="mb-4">
          <label className="block mb-1 text-white">Título</label>
          <p className="text-lg font-bold text-white border p-2 w-full rounded">{task.title}</p>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-white">Descrição</label>
          {isEditing ? (
            <div className="flex items-center">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-full rounded"
              />
              <button
                onClick={handleSave}
                className="ml-2 bg-green-500 text-white px-3 py-1 rounded"
              >
                Salvar
              </button>
            </div>
          ) : (
            <div className="flex items-center border p-2 w-full rounded">
              <p className="flex-1 text-white ">{description}</p>
              <FaEdit
                onClick={() => setIsEditing(true)}
                className="ml-2 text-blue-500 cursor-pointer"
              />
            </div>
          )}
        </div>
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