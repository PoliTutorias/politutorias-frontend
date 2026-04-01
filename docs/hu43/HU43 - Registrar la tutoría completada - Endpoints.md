# Documentación de Endpoints - HU43 - Registrar la tutoría completada

---

### 2. Resumen de la Historia de Usuario

**HU:** HU43 - Registrar la tutoría completada

**Descripción:** Como tutor, quiero registrar que la tutoría ha sido completada para mantener mi historial actualizado y recibir el pago.

**Criterios de Aceptación:**
*   El tutor puede marcar una tutoría "sin confirmar" como 'Completada' directamente desde la tarjeta en el listado, actualizando la UI en tiempo real y la métrica de tutorías completadas.
*   Al abrir el detalle de una tutoría "sin confirmar", el modal muestra el botón 'Completada'.
*   Marcar una tutoría como 'Completada' desde el modal cierra este y actualiza la tarjeta y la métrica en el listado principal.
*   El detalle de una tutoría 'Completada' (aún sin calificar) se muestra en modo lectura, con solo la etiqueta de estado y el botón 'Cerrar'.
*   Cerrar el modal de detalle regresa a la pantalla principal.
*   El detalle de una tutoría 'Completada' y calificada por el estudiante muestra la puntuación y el comentario del estudiante en modo lectura.

---

### 3. Tabla de Endpoints

| # | Método | Ruta Completa                 | Descripción                                   | Autenticación      | Controller                                 | Service                                | DTO Request | DTO Response       |
| - | ------ | ----------------------------- | --------------------------------------------- | ------------------ | ------------------------------------------ | -------------------------------------- | ----------- | ------------------ |
| 1 | PATCH  | /api/tutorias/:id/completar   | Marca una tutoría específica como completada. | JWT (JwtAuthGuard) | TutoriasController.marcarCompletada()      | TutoriasService.marcarCompletada()     | -           | TutoriaEntity      |
| 2 | GET    | /api/tutorias/:id             | Obtiene los detalles de una tutoría por su ID. | JWT (JwtAuthGuard) | TutoriasController.getById()               | TutoriasService.findById()             | -           | TutoriaDetalleDto  |

---

### 4. Detalle de Cada Endpoint

### 1. PATCH /api/tutorias/:id/completar

**Descripción:**
Este endpoint permite al tutor registrar que una tutoría ha sido completada exitosamente. Actualiza el estado de la tutoría en la base de datos a 'COMPLETADA' y desencadena la actualización de las métricas de tutorías completadas.

**Autenticación:**
🔒 Requerida (JWT - JwtAuthGuard)

**Parámetros de Ruta:**

| Parámetro | Tipo   | Requerido | Descripción                   |
| --------- | ------ | --------- | ----------------------------- |
| id        | string | Sí        | ID único de la tutoría a marcar como completada |

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**
No aplica. El estado 'COMPLETADA' se infiere de la ruta del endpoint.

**Respuesta Exitosa (200 OK):**
```json
{
  "id": "e3a4b5c6-d7e8-f9a0-b1c2-d3e4f5a6b7c8",
  "estudianteId": "some-student-uuid-123",
  "materiaId": "some-subject-uuid-456",
  "fecha": "2023-10-26T10:00:00.000Z",
  "hora": "10:00",
  "tipo": "Virtual",
  "precioPorHora": 25.00,
  "lugar": null,
  "mensajeEstudiante": "Necesito ayuda con cálculo integral.",
  "estado": "COMPLETADA",
  "calificacionEstudiante": null,
  "comentarioEstudiante": null,
  "createdAt": "2023-10-20T09:00:00.000Z",
  "updatedAt": "2023-10-26T11:00:00.000Z"
}
```
**DTO Response:** `TutoriaEntity`
*   `id`: Identificador único de la tutoría (UUID).
*   `estudianteId`: ID del estudiante.
*   `materiaId`: ID de la materia.
*   `fecha`: Fecha de la tutoría.
*   `hora`: Hora de la tutoría.
*   `tipo`: Modalidad de la tutoría ('Presencial' | 'Virtual').
*   `precioPorHora`: Costo por hora de la tutoría.
*   `lugar`: Ubicación si es presencial.
*   `mensajeEstudiante`: Mensaje inicial del estudiante.
*   `estado`: Nuevo estado de la tutoría, siempre 'COMPLETADA'.
*   `calificacionEstudiante`: Calificación otorgada por el estudiante (puede ser `null`).
*   `comentarioEstudiante`: Comentario del estudiante (puede ser `null`).
*   `createdAt`: Fecha de creación de la tutoría.
*   `updatedAt`: Fecha de la última actualización (se actualiza al marcar como completada).

**Respuesta de Error:**

| Código | Descripción                                      | Ejemplo                                                |
| ------ | ------------------------------------------------ | ------------------------------------------------------ |
| 400    | La tutoría ya está completada o es inválida      | `{ "message": "La tutoría ya está completada." }` o `{ "message": "No se puede marcar como completada una tutoría cancelada o con inasistencia." }` |
| 404    | Tutoría no encontrada                            | `{ "message": "Tutoría con ID {id} no encontrada." }` |
| 401    | No autorizado (si la autenticación falla)        | `{ "message": "Unauthorized" }`                        |
| 500    | Error interno del servidor                       | `{ "message": "Internal server error" }`               |

**Controller:** `TutoriasController.marcarCompletada(@Param('id') id: string)`

**Service:** `TutoriasService.marcarCompletada(id: string)`

---

### 2. GET /api/tutorias/:id

**Descripción:**
Obtiene los detalles completos de una tutoría específica, incluyendo su estado actual, y si aplica, la calificación y el comentario del estudiante. Este endpoint es utilizado para popular el `DetalleTutoriaModal`.

**Autenticación:**
🔒 Requerida (JWT - JwtAuthGuard)

**Parámetros de Ruta:**

| Parámetro | Tipo   | Requerido | Descripción                   |
| --------- | ------ | --------- | ----------------------------- |
| id        | string | Sí        | ID único de la tutoría a recuperar |

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**
No aplica (método GET).

**Respuesta Exitosa (200 OK):**
```json
{
  "id": "e3a4b5c6-d7e8-f9a0-b1c2-d3e4f5a6b7c8",
  "estudiante": {
    "id": "some-student-uuid-123",
    "nombre": "Ana García"
  },
  "materia": "Cálculo Integral",
  "fecha": "2023-10-26",
  "hora": "10:00",
  "tipo": "Virtual",
  "precioPorHora": 25.00,
  "lugar": null,
  "mensajeEstudiante": "Necesito ayuda con series y sucesiones.",
  "estado": "COMPLETADA",
  "calificacionEstudiante": 5,
  "comentarioEstudiante": "El tutor explicó muy bien y resolvió todas mis dudas."
}
```
**DTO Response:** `TutoriaDetalleDto`
*   `id`: Identificador único de la tutoría (UUID).
*   `estudiante`: Objeto con `id` y `nombre` del estudiante.
*   `materia`: Nombre de la materia.
*   `fecha`: Fecha de la tutoría en formato 'YYYY-MM-DD'.
*   `hora`: Hora de la tutoría en formato 'HH:MM'.
*   `tipo`: Modalidad de la tutoría ('Presencial' | 'Virtual').
*   `precioPorHora`: Costo por hora de la tutoría.
*   `lugar`: Ubicación si es presencial (puede ser `null`).
*   `mensajeEstudiante`: Mensaje original del estudiante (puede ser `null`).
*   `estado`: Estado actual de la tutoría ('SIN_CONFIRMAR' | 'COMPLETADA' | 'CANCELADA' | 'INASISTENCIA').
*   `calificacionEstudiante`: Puntuación de 1 a 5 otorgada por el estudiante (puede ser `null` si no ha calificado).
*   `comentarioEstudiante`: Comentario redactado por el estudiante (puede ser `null` si no ha calificado).

**Respuesta de Error:**

| Código | Descripción                                      | Ejemplo                                                |
| ------ | ------------------------------------------------ | ------------------------------------------------------ |
| 404    | Tutoría no encontrada                            | `{ "message": "Tutoría con ID {id} no encontrada." }` |
| 401    | No autorizado (si la autenticación falla)        | `{ "message": "Unauthorized" }`                        |
| 500    | Error interno del servidor                       | `{ "message": "Internal server error" }`               |

**Controller:** `TutoriasController.getById(@Param('id') id: string)`

**Service:** `TutoriasService.findById(id: string)`