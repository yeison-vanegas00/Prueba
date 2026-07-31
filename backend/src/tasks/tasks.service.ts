import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  /**
   * Retorna todas las tareas ordenadas por fecha de creación descendente
   */
  findAll(): Promise<Task[]> {
    return this.taskRepository.find({
      order: { fechaCreacion: 'DESC' },
    });
  }

  /**
   * Crea una nueva tarea con estado inicial "Pendiente"
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  /**
   * Actualiza parcialmente una tarea existente
   * Lanza NotFoundException si el id no existe
   */
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOneOrFail(id);
    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  /**
   * Elimina una tarea por su id
   * Lanza NotFoundException si el id no existe
   */
  async remove(id: string): Promise<{ message: string }> {
    const task = await this.findOneOrFail(id);
    await this.taskRepository.remove(task);
    return { message: `Tarea "${task.titulo}" eliminada correctamente` };
  }

  /**
   * Busca una tarea por id o lanza NotFoundException
   */
  private async findOneOrFail(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Tarea con id "${id}" no encontrada`);
    }
    return task;
  }
}
