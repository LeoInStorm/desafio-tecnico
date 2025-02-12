export type TaskStatus = 'BACKLOG' | 'A_FAZER' | 'EM_ANDAMENTO'| 'FASE_DE_TESTES'| 'CONCLUIDO';

export type Task = {
  id: string;
  status: TaskStatus;
  title: string;
  description: string;
};

export type Column = {
  id: TaskStatus;
  title: string;
};