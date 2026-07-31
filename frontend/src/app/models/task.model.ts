export type TaskStatus = 'Pendiente' | 'En Progreso' | 'Completada';

export const TASK_STATUSES: TaskStatus[] = [
  'Pendiente',
  'En Progreso',
  'Completada',
];

export interface Task {
  id: string;
  titulo: string;
  descripcion?: string;
  estado: TaskStatus;
  fechaCreacion: string;
}
