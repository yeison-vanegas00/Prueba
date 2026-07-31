import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit {
  /** Si se recibe una tarea, el formulario entra en modo edición */
  @Input() task: Task | null = null;

  /** Emite cuando la tarea fue guardada exitosamente */
  @Output() saved = new EventEmitter<void>();

  /** Emite cuando el usuario cancela */
  @Output() cancelled = new EventEmitter<void>();

  form!: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      titulo: [
        this.task?.titulo ?? '',
        [Validators.required, Validators.maxLength(100)],
      ],
      descripcion: [this.task?.descripcion ?? ''],
    });
  }

  get tituloControl() {
    return this.form.get('titulo');
  }

  get isEditMode(): boolean {
    return !!this.task;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    const data = this.form.value;

    const request$ = this.isEditMode
      ? this.taskService.updateTask(this.task!.id, data)
      : this.taskService.createTask(data);

    request$.subscribe({
      next: () => {
        this.isSubmitting = false;
        this.saved.emit();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage =
          err?.error?.message ?? 'Ocurrió un error al guardar la tarea';
      },
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
