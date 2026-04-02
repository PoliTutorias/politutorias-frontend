# Documentación de Endpoints - HU10 - Dejar reseña a tutor

---

### Resumen de la Historia de Usuario

**HU:** HU10 - Dejar reseña a tutor.md
**Descripción:** Como estudiante, quiero dejar una reseña a un tutor para compartir mi experiencia con otros estudiantes.
**Criterios de Aceptación:**
*   El estudiante puede abrir el modal de calificación desde la tarjeta de tutoría o desde el detalle de una tutoría "Completada" que no ha sido calificada.
*   El modal de calificación muestra 5 estrellas vacías, un campo de comentario opcional (0/300 caracteres) y un botón "Enviar Reseña" deshabilitado inicialmente.
*   El botón "Enviar Reseña" se habilita cuando se selecciona al menos una estrella.
*   El campo de comentario valida un límite de 300 caracteres.
*   Al enviar la reseña (con o sin comentario), se cierra el modal, se muestra un mensaje de éxito temporal y la tarjeta de tutoría en el historial se actualiza para mostrar la calificación, desapareciendo el botón "Calificar".
*   Si el estudiante cancela el proceso, el modal se cierra sin guardar información y regresa a la vista anterior.
*   Al visualizar los detalles de una tutoría ya calificada, se muestra la reseña existente de forma estática y solo el botón "Cerrar" está habilitado.

---

### Tabla de Endpoints

| # | Método | Ruta Completa          | Descripción                                             | Autenticación      | Controller                                 | Service                                     | DTO Request        | DTO Response              |
|---|--------|------------------------|---------------------------------------------------------|--------------------|--------------------------------------------|---------------------------------------------|--------------------|---------------------------|
| 1 | POST   | `/api/reviews`         | Permite a un estudiante enviar una reseña para una tutoría completada. | JWT (JwtAuthGuard) | ReviewsController.create()                 | ReviewsService.create()                     | CreateReviewDto    | ReviewEntity              |
| 2 | GET    | `/api/tutorias/:id`    | Obtiene los detalles de una tutoría específica, incluyendo su reseña si existe. | JWT (Auth guard)   | TutoriasController.findOne() (implied)     | TutoriasService.findOne()                   | -                  | TutoriaDetailWithReviewDto|

---

### Detalle de Endpoints

### 1. POST `/api/reviews`

**Descripción:**
Permite a un estudiante autenticado enviar una nueva reseña para una sesión de tutoría que ha sido completada y aún no ha sido calificada. La reseña incluye una calificación de estrellas y un comentario opcional.

**Autenticación:**
✅ Requerida (JWT - `JwtAuthGuard`). El `studentId` se extrae del token de autenticación.

**Parámetros de Ruta:**
Ninguno

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**
Se espera un objeto JSON siguiendo la estructura de `CreateReviewDto`.

| Campo     | Tipo    | Requerido | Descripción                                                 |
| :-------- | :------ | :-------- | :---------------------------------------------------------- |
| `tutoriaId` | `string`  | Sí        | ID único de la tutoría a la que se asocia la reseña (UUID). |
| `rating`    | `number`  | Sí        | Calificación en estrellas (entero entre 1 y 5).            |
| `comment`   | `string`  | No        | Comentario opcional sobre la tutoría (máximo 300 caracteres). |

**Ejemplo de Cuerpo de Petición:**
```json
// Reseña con comentario
{
  "tutoriaId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "rating": 5,
  "comment": "El tutor fue muy claro y resolvió todas mis dudas. ¡Excelente experiencia!"
}

// Reseña sin comentario
{
  "tutoriaId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "rating": 4
}
```

**Respuesta Exitosa (201 Created):**
Retorna un objeto con un mensaje de éxito y la entidad `ReviewEntity` creada.

```json
{
  "statusCode": 201,
  "message": "Reseña creada exitosamente.",
  "data": {
    "id": "review-uuid-001",
    "tutoria": { "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef" },
    "student": { "id": "student-uuid-007" },
    "tutor": { "id": "tutor-uuid-009" },
    "rating": 5,
    "comment": "El tutor fue muy claro y resolvió todas mis dudas. ¡Excelente experiencia!",
    "createdAt": "2023-10-27T10:30:00.000Z",
    "updatedAt": "2023-10-27T10:30:00.000Z"
  }
}
```

**Respuestas de Error:**

| Código | Descripción                 | Ejemplo de Respuesta                                                                     |
| :----- | :-------------------------- | :--------------------------------------------------------------------------------------- |
| `400`  | Bad Request                 | `{ "statusCode": 400, "message": "El ID de la tutoría debe ser un UUID válido." }`         |
|        |                             | `{ "statusCode": 400, "message": "La calificación mínima es 1 estrella." }`             |
|        |                             | `{ "statusCode": 400, "message": "El comentario no debe exceder los 300 caracteres." }` |
|        |                             | `{ "statusCode": 400, "message": "No tienes permiso para calificar esta tutoría." }`    |
|        |                             | `{ "statusCode": 400, "message": "Solo se pueden calificar tutorías completadas." }`   |
|        |                             | `{ "statusCode": 400, "message": "Esta tutoría ya ha sido calificada." }`               |
| `401`  | Unauthorized                | `{ "statusCode": 401, "message": "Unauthorized" }`                                     |
| `404`  | Not Found                   | `{ "statusCode": 404, "message": "Tutoría con ID {id} no encontrada." }`                |
| `500`  | Internal Server Error       | `{ "statusCode": 500, "message": "Internal server error" }`                            |

**Controller:** `ReviewsController.create(@Body() createReviewDto: CreateReviewDto, @Req() req: Request)`

**Service:** `ReviewsService.create(createReviewDto: CreateReviewDto, studentId: string)`

**DTO Request:** `CreateReviewDto`

**DTO Response:** `ReviewEntity` (incluido en el campo `data` de la respuesta JSON)

---

### 2. GET `/api/tutorias/:id`

**Descripción:**
Obtiene los detalles completos de una sesión de tutoría específica, identificada por su ID. Si la tutoría ha sido calificada, la reseña asociada también se incluirá en la respuesta. Este endpoint es utilizado por el frontend para mostrar tanto el detalle de la tutoría como la reseña si ya existe.

**Autenticación:**
✅ Requerida (JWT). Se asume que el backend validará que el usuario autenticado tiene permiso para ver los detalles de esta tutoría (ej. es el estudiante que la tomó o el tutor que la impartió).

**Parámetros de Ruta:**

| Parámetro | Tipo   | Requerido | Descripción                            |
| :-------- | :----- | :-------- | :------------------------------------- |
| `id`      | `string` | Sí        | ID único de la tutoría (UUID).         |

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**
No aplica (método GET)

**Respuesta Exitosa (200 OK):**
Retorna un objeto JSON con los detalles de la tutoría y, opcionalmente, la reseña asociada.

```json
// Ejemplo de tutoría completada y calificada
{
  "id": "tutoria-uuid-001",
  "materia": "Cálculo Diferencial",
  "fecha": "2023-10-20T15:00:00.000Z",
  "duracionHoras": 1.5,
  "status": "Completada",
  "precioTotal": 25.50,
  "modalidad": "Presencial",
  "lugarReunion": "Cafetería Central",
  "enlaceReunion": null,
  "student": {
    "id": "student-uuid-007",
    "nombre": "Ana Pérez",
    "email": "ana.perez@example.com"
  },
  "tutor": {
    "id": "tutor-uuid-009",
    "nombre": "Juan García",
    "email": "juan.garcia@example.com",
    "fotoUrl": "https://example.com/juan_foto.jpg"
  },
  "review": { // Este campo solo aparece si la tutoría ha sido calificada
    "id": "review-uuid-001",
    "rating": 5,
    "comment": "Juan es un excelente tutor, me ayudó a entender temas complejos de manera sencilla.",
    "createdAt": "2023-10-27T10:30:00.000Z",
    "updatedAt": "2023-10-27T10:30:00.000Z"
  }
}

// Ejemplo de tutoría completada y NO calificada
{
  "id": "tutoria-uuid-002",
  "materia": "Física I",
  "fecha": "2023-10-22T11:00:00.000Z",
  "duracionHoras": 2,
  "status": "Completada",
  "precioTotal": 30.00,
  "modalidad": "Online",
  "enlaceReunion": "https://meet.google.com/abc-xyz",
  "student": {
    "id": "student-uuid-007",
    "nombre": "Ana Pérez",
    "email": "ana.perez@example.com"
  },
  "tutor": {
    "id": "tutor-uuid-010",
    "nombre": "María López",
    "email": "maria.lopez@example.com",
    "fotoUrl": "https://example.com/maria_foto.jpg"
  },
  "review": null // El campo 'review' es nulo o ausente si no ha sido calificada
}
```

**Respuestas de Error:**

| Código | Descripción                 | Ejemplo de Respuesta                                                  |
| :----- | :-------------------------- | :-------------------------------------------------------------------- |
| `401`  | Unauthorized                | `{ "statusCode": 401, "message": "Unauthorized" }`                   |
| `403`  | Forbidden                   | `{ "statusCode": 403, "message": "No tienes permiso para ver esta tutoría." }` |
| `404`  | Not Found                   | `{ "statusCode": 404, "message": "Tutoría con ID {id} no encontrada." }` |
| `500`  | Internal Server Error       | `{ "statusCode": 500, "message": "Internal server error" }`          |

**Controller:** `TutoriasController.findOne(@Param('id') id: string)` (implied, as `TutoriasService.findOne` is called by the API)

**Service:** `TutoriasService.findOne(tutoriaId: string)`

**DTO Response:** `TutoriaDetailWithReviewDto` (asumido, representaría la estructura JSON de la `Tutoria` con la relación `Review` cargada).