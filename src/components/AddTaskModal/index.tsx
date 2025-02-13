import { useState } from 'react';
import useBoardStore from '../../store/BoardStore';
import { TaskStatus } from '../../typings';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStatus: TaskStatus;
}

export function AddTaskModal({ isOpen, onClose, defaultStatus }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const addTask = useBoardStore((state) => state.addTask);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (title.trim() === '') return;
    addTask(title, description, defaultStatus);
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className="bg-neutral-700  p-6 rounded-md w-96">
        <h2 className="text-lg font-bold mb-4">Adicionar Tarefa</h2>
        <div className="mb-4">
          <label className="block mb-1">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="Digite o título..."
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="Digite a descrição..."
          ></textarea>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Adicionar Cartão
          </button>
        </div>
      </div>
    </div>
  );
}