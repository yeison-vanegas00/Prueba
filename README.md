# Task Manager

Aplicación de gestión de tareas construida con Angular 20, NestJS, PostgreSQL y Docker Compose.

## Stack

- **Frontend**: Angular 20 (Standalone Components)
- **Backend**: NestJS + TypeORM
- **Base de datos**: PostgreSQL 16
- **Contenedores**: Docker Compose

## Requisitos

- Docker Desktop instalado y en ejecución
- Docker Compose v2+

## Ejecución

```bash
# Clonar el repositorio y entrar al directorio
cd task-manager

# Levantar todos los servicios (primera vez puede tardar unos minutos)
docker compose up --build

# En segundo plano
docker compose up --build -d
```

## URLs

| Servicio | URL |
|---|---|
| Frontend (Angular) | http://localhost:80 |
| Backend (API REST) | http://localhost:3000/tasks |
| PostgreSQL | localhost:5432 |

## API Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | /tasks | Listar todas las tareas |
| POST | /tasks | Crear nueva tarea |
| PATCH | /tasks/:id | Actualizar tarea |
| DELETE | /tasks/:id | Eliminar tarea |

### Ejemplo de cuerpo POST /tasks

```json
{
  "titulo": "Mi primera tarea",
  "descripcion": "Descripción opcional"
}
```

### Ejemplo de cuerpo PATCH /tasks/:id

```json
{
  "estado": "En Progreso"
}
```

## Modelo de datos

```
Task {
  id: UUID (auto-generado)
  titulo: string (max 100 caracteres, obligatorio)
  descripcion: string (opcional)
  estado: "Pendiente" | "En Progreso" | "Completada" (default: "Pendiente")
  fechaCreacion: timestamp (auto-generado)
}
```

## Detener servicios

```bash
docker compose down

# También eliminar la base de datos
docker compose down -v
```
