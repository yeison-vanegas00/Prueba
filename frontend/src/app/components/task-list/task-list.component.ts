import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TASK_STATUSES, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  editingTask: Task | null = null;
  showForm = false;
  isLoading = false;
  errorMessage = '';

  readonly statuses = TASK_STATUSES;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar las tareas. Verifique que el servidor esté en línea.';
        this.isLoading = false;
      },
    });
  }

  openCreateForm(): void {
    this.editingTask = null;
    this.showForm = true;
  }

  openEditForm(task: Task): void {
    this.editingTask = task;
    this.showForm = true;
  }

  onFormSaved(): void {
    this.showForm = false;
    this.editingTask = null;
    this.loadTasks();
  }

  onFormCancelled(): void {
    this.showForm = false;
    this.editingTask = null;
  }

  onStatusChange(task: Task, event: Event): void {
    const newStatus = (event.target as HTMLSelectElement).value as TaskStatus;
    this.taskService.updateTask(task.id, { estado: newStatus }).subscribe({
      next: () => this.loadTasks(),
      error: () => alert('Error al actualizar el estado'),
    });
  }

  onDelete(task: Task): void {
    if (!confirm(`¿Deseas eliminar la tarea "${task.titulo}"?`)) return;

    this.taskService.deleteTask(task.id).subscribe({
      next: () => this.loadTasks(),
      error: () => alert('Error al eliminar la tarea'),
    });
  }

  /**
   * Retorna una clase CSS según el estado de la tarea
   */
  getStatusClass(estado: TaskStatus): string {
    const map: Record<TaskStatus, string> = {
      'Pendiente': 'status-pendiente',
      'En Progreso': 'status-en-progreso',
      'Completada': 'status-completada',
    };
    return map[estado] ?? '';
  }

  trackById(_index: number, task: Task): string {
    return task.id;
  }
}
