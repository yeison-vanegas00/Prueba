import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { TaskStatus } from './enums/task-status.enum';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  titulo: string;

  @Column({ nullable: true, type: 'text' })
  descripcion: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDIENTE,
  })
  estado: TaskStatus;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;
}
