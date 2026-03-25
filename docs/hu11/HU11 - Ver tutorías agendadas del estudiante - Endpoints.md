# Documentación de Endpoints - HU11 - Ver tutorías agendadas del estudiante

---

### Resumen de la Historia de Usuario

**HU:** HU11 - Ver tutorías agendadas del estudiante
**Descripción:** Como estudiante, quiero ver mis tutorías agendadas para recordar cuando tengo que asistir las tutorías.
**Criterios de Aceptación:**
*   El estudiante autenticado navega a la sección "Agenda" para ver sus tutorías.
*   La pantalla de "Tutorías Agendadas" muestra una lista cronológica, dividida en "PRÓXIMAS" (futuras) y "ANTERIORES" (pasadas y completadas).
*   Las tutorías pasadas se muestran en un tono gris y con una etiqueta "COMPLETADA".
*   Al hacer clic en una tarjeta de tutoría próxima, se abre un modal "Detalles de la Sesión".
*   El modal adapta su contenido: muestra un enlace si la tutoría es 'Virtual' o una dirección si es 'Presencial'.
*   El modal incluye un botón "Cancelar Tutoría" (aunque su implementación final puede variar según observaciones).
*   Se permite cerrar el modal sin realizar acciones.

---

### Tabla de Endpoints

| # | Método | Ruta Completa                 | Descripción                                       | Autenticación      | Controller                                 | Service                                | DTO Request         | DTO Response                |
| - | ------ | ----------------------------- | ------------------------------------------------- | ------------------ | ------------------------------------------ | -------------------------------------- | ------------------- | --------------------------- |
| 1 | GET    | /api/tutorias/agendadas       | Obtiene la lista de tutorías agendadas del estudiante | JWT (JwtAuthGuard) | TutoriasController.findAllByStudentId()    | TutoriasService.findAllByStudentId()   | TutoriasQueryParams | TutoriasAgendadasDTO[]      |
| 2 | PATCH  | /api/tutorias/:id/cancelar    | Cancela una tutoría agendada específica           | JWT (JwtAuthGuard) | TutoriasController.cancel()                | TutoriasService.cancel()               | CancelacionReasonDTO | CancellationResponseDTO     |

---

### Detalle de Endpoints

#### 1. GET /api/tutorias/agendadas

**Descripción:**
Obtiene la lista completa de tutorías que el estudiante actual ha agendado, incluyendo las próximas y las anteriores. La lista se ordena cronológicamente.

**Autenticación:**
✅ Requerida (JWT - `JwtAuthGuard`). El token JWT debe ser provisto en el encabezado `Authorization` como `Bearer <token>`.

**Parámetros de Ruta:**
Ninguno

**Parámetros de Consulta:**
| Parámetro        | Tipo   | Requerido | Descripción                                                                                   |
| ---------------- | ------ | --------- | --------------------------------------------------------------------------------------------- |
| `studentId`      | string | Sí        | ID único del estudiante. Es extraído del token JWT y usado internamente por el servicio.      |
| `queryParams`    | Object | No        | Objeto que podría contener parámetros de filtrado o paginación, si el frontend los especifica. |

**Cuerpo de la Petición:**
No aplica (método GET)

**Respuesta Exitosa (200 OK):**
Array de objetos `TutoriasAgendadasDTO`, donde cada objeto representa una tutoría agendada. Se incluye información del tutor asociado. Para las tutorías virtuales se incluye `enlaceReunion` y para las presenciales `direccion`.

```typescript
// Ejemplo de respuesta exitosa
[
  {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "materia": "Cálculo Diferencial",
    "fecha": "2024-03-15",
    "hora": "10:00",
    "modalidad": "Virtual",
    "tarifa": 15.00,
    "tutor": {
      "id": "f5e4d3c2-b1a0-9876-5432-10fedcba9876",
      "nombre": "Ana",
      "apellido": "García",
      "fotoUrl": "https://example.com/fotos/ana.jpg"
    },
    "estado": "AGENDADA",
    "enlaceReunion": "https://meet.google.com/abc-defg-hij",
    "mensajeEstudiante": "Hola, me gustaría revisar los límites."
  },
  {
    "id": "b2c3d4e5-f6a7-8901-2345-67890abcdef1",
    "materia": "Física I",
    "fecha": "2024-03-10",
    "hora": "14:30",
    "modalidad": "Presencial",
    "tarifa": 20.00,
    "tutor": {
      "id": "0fedcba9-8765-4321-fedc-ba9876543210",
      "nombre": "Juan",
      "apellido": "Pérez",
      "fotoUrl": "https://example.com/fotos/juan.jpg"
    },
    "estado": "COMPLETADA",
    "direccion": "Calle Falsa 123, Ciudad, País",
    "mensajeEstudiante": "Necesito ayuda con el movimiento parabólico."
  }
]
```

**Respuesta de Error:**
| Código | Descripción                                     | Ejemplo                                                                      |
| ------ | ----------------------------------------------- | ---------------------------------------------------------------------------- |
| 401    | No autorizado (token JWT ausente o inválido)    | `{"message": "Unauthorized"}`                                                |
| 403    | Prohibido (ID de estudiante no encontrado)      | `{"message": "ID de estudiante no encontrado en el token."}`                 |
| 500    | Error interno del servidor                      | `{"message": "Error de red o servidor al intentar obtener las tutorías."}` |

**Controller:** `TutoriasController.findAllByStudentId(@Req() req: Request)`

**Service:** `TutoriasService.findAllByStudentId(studentId: string)`

**DTO Response:** `TutoriasAgendadasDTO[]` (con la implicación de que para el frontend, la estructura es compatible con `TutoriaDetailsDTO` para incluir `enlaceReunion` o `direccion` condicionalmente).

---

#### 2. PATCH /api/tutorias/:id/cancelar

**Descripción:**
Permite al estudiante cancelar una tutoría agendada específica proporcionando el ID de la tutoría y un motivo de cancelación. Solo se pueden cancelar tutorías en estado 'AGENDADA'.

**Autenticación:**
✅ Requerida (JWT - `JwtAuthGuard`). El token JWT debe ser provisto en el encabezado `Authorization` como `Bearer <token>`.

**Parámetros de Ruta:**
| Parámetro | Tipo   | Requerido | Descripción                          |
| --------- | ------ | --------- | ------------------------------------ |
| `id`      | string | Sí        | ID único de la tutoría a cancelar.   |

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**
Objeto `CancelacionReasonDTO` que contiene el motivo de la cancelación.

```typescript
// Ejemplo de Request Body
{
  "reason": "Problema de horario"
}

// Ejemplo de Request Body (si el motivo es 'Otro')
{
  "reason": "Otro",
  "detalleOtro": "Surgió una emergencia familiar inesperada."
}
```

**Respuesta Exitosa (200 OK):**
Objeto `CancellationResponseDTO` que indica el éxito de la operación y el nuevo estado de la tutoría.

```typescript
// Ejemplo de Response Exitosa
{
  "success": true,
  "message": "Tutoría cancelada exitosamente.",
  "tutoriaId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "newStatus": "CANCELADA"
}
```

**Respuesta de Error:**
| Código | Descripción                                             | Ejemplo                                                                    |
| ------ | ------------------------------------------------------- | -------------------------------------------------------------------------- |
| 400    | Solicitud inválida (ej. motivo no válido, estado actual) | `{"message": "El motivo de cancelación no es válido."}`<br>`{"message": "Solo se pueden cancelar tutorías en estado AGENDADA."}` |
| 401    | No autorizado (token JWT ausente o inválido)            | `{"message": "Unauthorized"}`                                              |
| 403    | Prohibido (no es el dueño de la tutoría)                | `{"message": "No tiene permiso para cancelar esta tutoría."}`              |
| 404    | Tutoría no encontrada                                   | `{"message": "Tutoría con ID {id} no encontrada."}`                        |
| 500    | Error interno del servidor                              | `{"message": "Error interno al cancelar la tutoría."}`                     |

**Controller:** `TutoriasController.cancel(@Param('id') tutoriaId: string, @Body() cancelReasonDto: CancelacionReasonDTO, @Req() req: Request)`

**Service:** `TutoriasService.cancel(tutoriaId: string, studentId: string, reason: CancelReason, detalleOtro?: string)`

**DTO Request:** `CancelacionReasonDTO`

**DTO Response:** `CancellationResponseDTO`