# Documentación de Endpoints - HU39 - Ver historial de tutorías impartidas

---

### Resumen de la Historia de Usuario

**HU:** HU39 - Ver historial de tutorías impartidas.md

**Descripción:** Como tutor, quiero ver mi historial de tutorías impartidas para tener un registro de mi experiencia profesional.

**Criterios de Aceptación:** El tutor debe poder visualizar las métricas generales de su desempeño (tutorías completadas, materias impartidas, estudiantes calificados) y un listado paginado de sus tutorías finalizadas. El listado muestra un resumen de cada tutoría (iniciales del estudiante, título de la oferta, nombre del estudiante, fecha y hora). Si el número de tutorías excede 5, se muestran controles de paginación. Al hacer clic en una tarjeta, se abre un modal con el detalle completo de la tutoría (información del estudiante, título, fecha, hora, modalidad, precio, lugar/enlace y mensaje del estudiante), con un botón para cerrar el modal. Las funcionalidades de ordenar, filtrar y los botones de acción (completar/inasistencia) quedan excluidas para esta HU.

---

### Tabla de Endpoints

| # | Método | Ruta Completa          | Descripción                                                    | Autenticación      | Controller                            | Service                                  | DTO Request        | DTO Response       |
| - | ------ | ---------------------- | -------------------------------------------------------------- | ------------------ | ------------------------------------- | ---------------------------------------- | ------------------ | ------------------ |
| 1 | GET    | /api/tutorias/historial | Obtiene el historial paginado de tutorías y métricas de resumen | JWT (JwtAuthGuard) | TutorialsController.getHistory()      | TutorialsService.getTutorHistory()       | TutorHistoryQueryParams | HistoryResponseDto |
| 2 | GET    | /api/tutorias/:id      | Obtiene los detalles completos de una tutoría impartida específica | JWT (JwtAuthGuard) | TutorialsController.getById()         | TutorialsService.getTutorTutorialDetail() | -                  | TutorialDetailDto  |

---

### Detalle de Endpoints

#### 1. GET /api/tutorias/historial

**Descripción:**
Este endpoint permite a un tutor autenticado obtener su historial de tutorías impartidas, incluyendo un resumen de métricas clave (tutorías completadas, materias impartidas, estudiantes calificados) y una lista paginada de las tutorías. El historial solo incluye tutorías con estado 'Completada' o 'Inasistencia'.

**Autenticación:**
✅ Requerida (JWT - `JwtAuthGuard`)

**Parámetros de Ruta:**
Ninguno

**Parámetros de Consulta:**

| Parámetro | Tipo   | Requerido | Descripción                                                                | Ejemplo |
| :-------- | :----- | :-------- | :------------------------------------------------------------------------- | :------ |
| `page`    | `number` | No        | Número de página actual para el listado de tutorías. Valor predeterminado: `1`. | `1`     |
| `limit`   | `number` | No        | Cantidad máxima de tutorías por página. Valor predeterminado: `5`. Máximo: `20`. | `5`     |

**Cuerpo de la Petición:**
No aplica (método GET)

**Respuesta Exitosa (200 OK):**

```json
{
  "summary": {
    "completedCount": 15,
    "subjectsCount": 3,
    "ratedStudentsCount": 10
  },
  "paginatedData": {
    "items": [
      {
        "id": "tutoria-001-abc",
        "studentInitials": "JR",
        "studentName": "Juan Rodríguez",
        "subjectTitle": "Cálculo Diferencial",
        "date": "25 de febrero de 2026",
        "time": "11:00",
        "status": "Completada"
      },
      {
        "id": "tutoria-002-def",
        "studentInitials": "AM",
        "studentName": "Ana Morales",
        "subjectTitle": "Programación Orientada a Objetos",
        "date": "22 de febrero de 2026",
        "time": "14:30",
        "status": "Inasistencia"
      },
      {
        "id": "tutoria-003-ghi",
        "studentInitials": "CR",
        "studentName": "Carlos Rivera",
        "subjectTitle": "Física I",
        "date": "18 de febrero de 2026",
        "time": "09:00",
        "status": "Completada"
      },
      {
        "id": "tutoria-004-jkl",
        "studentInitials": "LP",
        "studentName": "Laura Paz",
        "subjectTitle": "Cálculo Diferencial",
        "date": "15 de febrero de 2026",
        "time": "16:00",
        "status": "Completada"
      },
      {
        "id": "tutoria-005-mno",
        "studentInitials": "MG",
        "studentName": "Mario Gómez",
        "subjectTitle": "Programación Orientada a Objetos",
        "date": "10 de febrero de 2026",
        "time": "10:00",
        "status": "Completada"
      }
    ],
    "total": 25,
    "page": 1,
    "limit": 5
  }
}
```

**Respuesta de Error:**

| Código | Descripción                 | Ejemplo                                                                                                   |
| :----- | :-------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `400`  | Parámetros de consulta inválidos | `{ "statusCode": 400, "message": ["La página mínima es 1."], "error": "Bad Request" }`                  |
| `401`  | No autorizado               | `{ "statusCode": 401, "message": "Unauthorized", "error": "Unauthorized" }`                               |
| `500`  | Error interno del servidor  | `{ "statusCode": 500, "message": "Error interno del servidor al obtener historial.", "error": "Internal Server Error" }` |

**Controller:** `TutorialsController.getHistory(@Query() query: TutorHistoryQueryParams, @Req() req)`

**Service:** `TutorialsService.getTutorHistory(query: TutorHistoryQueryParams, tutorId: string)`

**DTO Request:** `TutorHistoryQueryParams`

**DTO Response:** `HistoryResponseDto`

---

#### 2. GET /api/tutorias/:id

**Descripción:**
Este endpoint permite a un tutor autenticado obtener los detalles completos de una tutoría impartida específica, siempre y cuando la tutoría le pertenezca y se encuentre en estado finalizado ('Completada' o 'Inasistencia').

**Autenticación:**
✅ Requerida (JWT - `JwtAuthGuard`)

**Parámetros de Ruta:**

| Parámetro | Tipo   | Requerido | Descripción                        | Ejemplo        |
| :-------- | :----- | :-------- | :--------------------------------- | :------------- |
| `id`      | `string` | Sí        | ID único de la tutoría impartida. | `tutoria-001-abc` |

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**
No aplica (método GET)

**Respuesta Exitosa (200 OK):**

```json
{
  "id": "tutoria-001-abc",
  "studentName": "Juan Rodríguez",
  "studentInitials": "JR",
  "subjectTitle": "Cálculo Diferencial",
  "date": "25 de febrero de 2026",
  "time": "11:00",
  "modality": "Presencial",
  "pricePerHour": "$12/h",
  "locationOrLink": "Biblioteca EPN, Sala 3",
  "studentMessage": "Necesito ayuda con los límites y derivadas, específicamente con la regla de la cadena.",
  "status": "Completada"
}
```

**Respuesta de Error:**

| Código | Descripción                                                               | Ejemplo                                                                                                   |
| :----- | :------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------- |
| `400`  | ID de tutoría inválido (ej. formato incorrecto)                           | `{ "statusCode": 400, "message": "Validation failed (uuid is expected)", "error": "Bad Request" }`         |
| `401`  | No autorizado                                                           | `{ "statusCode": 401, "message": "Unauthorized", "error": "Unauthorized" }`                               |
| `404`  | Tutoría no encontrada o no pertenece al tutor autenticado.               | `{ "statusCode": 404, "message": "Tutoría con ID tutoria-001-abc no encontrada o no pertenece al tutor.", "error": "Not Found" }` |
| `500`  | Error interno del servidor                                              | `{ "statusCode": 500, "message": "Error interno del servidor al obtener detalle de tutoría.", "error": "Internal Server Error" }` |

**Controller:** `TutorialsController.getById(@Param('id') tutorialId: string, @Req() req)`

**Service:** `TutorialsService.getTutorTutorialDetail(tutorialId: string, tutorId: string)`

**DTO Request:** Ninguno

**DTO Response:** `TutorialDetailDto`