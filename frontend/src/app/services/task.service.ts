import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las tareas desde el backend
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  /**
   * Crea una nueva tarea
   */
  createTask(data: { titulo: string; descripcion?: string }): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, data);
  }

  /**
   * Actualiza parcialmente una tarea (título, descripción o estado)
   */
  updateTask(id: string, data: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Elimina una tarea por su id
   */
  deleteTask(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
