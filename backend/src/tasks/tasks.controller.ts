import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * GET /tasks
   * Retorna el listado completo de tareas
   */
  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  /**
   * POST /tasks
   * Crea una nueva tarea y retorna la entidad creada con status 201
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  /**
   * PATCH /tasks/:id
   * Actualiza parcialmente una tarea (título, descripción y/o estado)
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  /**
   * DELETE /tasks/:id
   * Elimina una tarea y retorna un mensaje de confirmación
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.tasksService.remove(id);
  }
}
