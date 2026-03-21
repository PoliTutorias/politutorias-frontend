# Documentación de Endpoints - HU15 - Ver tutorías agendadas del tutor

## Resumen de la Historia de Usuario
**HU:** HU15 - Ver tutorías agendadas del tutor
**Descripción:** Como tutor, quiero ver mis tutorías agendadas para recordar cuando tengo que impartir las tutorías.
**Criterios de Aceptación:**
*   Navegación a 'Mi Agenda' muestra un calendario mensual con indicadores y un panel lateral con un resumen del mes y tarjetas de sesiones.
*   Al seleccionar un día en el calendario, el panel lateral se actualiza para mostrar el conteo y las sesiones de ese día específico.
*   Al hacer clic en una tarjeta de sesión, se abre un modal de detalles que varía según la modalidad (Virtual/Presencial) y el estado (Pendiente/Completada).
*   Las sesiones completadas en el modal de detalles solo permiten ver la información y cerrar, sin opciones de modificación o cancelación.
*   Las sesiones pendientes en el modal de detalles muestran opciones para cerrar o iniciar el flujo de cancelación.

## Tabla de Endpoints

| # | Método | Ruta Completa                                   | Descripción                                                                       | Autenticación      | Controller                            | Service                               | DTO Request | DTO Response     |
| - | ------ | ----------------------------------------------- | --------------------------------------------------------------------------------- | ------------------ | ------------------------------------- | ------------------------------------- | ----------- | ---------------- |
| 1 | GET    | /tutor/agenda/:tutorId                          | Obtiene los datos iniciales de la agenda del tutor (calendario y resumen mensual) | JWT (JwtAuthGuard) | AgendaController.getAgenda()          | AgendaService.getAgendaData()         | -           | InitialAgendaData |
| 2 | GET    | /tutor/agenda/sessions?tutorId=:tutorId&date=:date | Obtiene las sesiones agendadas de un tutor para una fecha específica              | JWT (JwtAuthGuard) | AgendaController.getSessionsByDay()   | AgendaService.getSessionsForDay()     | -           | SelectedDayInfo  |
| 3 | GET    | /tutor/sessions/:id?tutorId=:tutorId            | Obtiene los detalles completos de una tutoría agendada específica                 | JWT (JwtAuthGuard) | SessionsController.getById()          | SessionsService.getDetails()          | -           | SessionDetailDTO |

## Detalle de Cada Endpoint

### 1. GET /tutor/agenda/:tutorId
**Descripción:**
Obtiene todos los datos necesarios para la vista inicial de la agenda del tutor, incluyendo la información del calendario mensual y el resumen de tutorías agendadas para el mes actual.

**Autenticación:**
✅ JWT (JwtAuthGuard) - Se requiere que el usuario esté autenticado como tutor. El `tutorId` se verifica para asegurar el acceso a la agenda del tutor correcto.

**Parámetros de Ruta:**
| Parámetro | Tipo   | Requerido | Descripción                                   |
| --------- | ------ | --------- | --------------------------------------------- |
| tutorId   | string | Sí        | ID único del tutor cuya agenda se desea ver. |

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**
No aplica (método GET)

**Respuesta Exitosa (200 OK):**
```typescript
interface CalendarDayData {
  date: string; // Formato YYYY-MM-DD
  sessionCount: number;
  sessionLabels?: { time: string; subject: string }[]; // Para las etiquetas en el día
}

interface MonthlySummarySessionCard {
  id: string;
  time: string; // Formato HH:MM
  courseName: string;
  studentName: string;
  date: string; // Formato YYYY-MM-DD
}

interface InitialAgendaData {
  currentMonthName: string; // Ejemplo: "Marzo"
  currentYear: number; // Ejemplo: 2026
  calendarDays: CalendarDayData[]; // Datos para todos los días del mes
  monthlySummary: {
    totalConfirmed: number;
    sessions: MonthlySummarySessionCard[];
  };
}

// Ejemplo de respuesta:
{
  "currentMonthName": "Marzo",
  "currentYear": 2026,
  "calendarDays": [
    {
      "date": "2026-03-01",
      "sessionCount": 0
    },
    {
      "date": "2026-03-15",
      "sessionCount": 2,
      "sessionLabels": [
        { "time": "10:00", "subject": "Matemáticas I" },
        { "time": "14:30", "subject": "Física II" }
      ]
    }
  ],
  "monthlySummary": {
    "totalConfirmed": 5,
    "sessions": [
      {
        "id": "uuid-session-1",
        "time": "10:00",
        "courseName": "Matemáticas I",
        "studentName": "Juan Pérez",
        "date": "2026-03-15"
      },
      {
        "id": "uuid-session-2",
        "time": "14:30",
        "courseName": "Física II",
        "studentName": "Ana Gómez",
        "date": "2026-03-15"
      }
    ]
  }
}
```

**Respuesta de Error:**
| Código | Descripción                                   | Ejemplo                                         |
| ------ | --------------------------------------------- | ----------------------------------------------- |
| 401    | No autenticado o token inválido               | `{ "statusCode": 401, "message": "Unauthorized" }` |
| 403    | Acceso denegado (si el tutorId no coincide)   | `{ "statusCode": 403, "message": "Forbidden" }` |
| 500    | Error interno del servidor al consultar datos | `{ "statusCode": 500, "message": "Internal server error" }` |

**Controller:** `AgendaController.getAgenda(@Param('tutorId') tutorId: string)`

**Service:** `AgendaService.getAgendaData(tutorId: string)`

**DTO Response:** `InitialAgendaData`

---

### 2. GET /tutor/agenda/sessions?tutorId=:tutorId&date=:date
**Descripción:**
Obtiene la lista de tutorías agendadas para un día específico de un tutor. Esta información se utiliza para actualizar el panel lateral derecho de la agenda cuando el tutor selecciona un día en el calendario.

**Autenticación:**
✅ JWT (JwtAuthGuard) - Se requiere que el usuario esté autenticado como tutor. El `tutorId` se verifica para asegurar el acceso a las sesiones del tutor correcto.

**Parámetros de Ruta:**
Ninguno

**Parámetros de Consulta:**
| Parámetro | Tipo   | Requerido | Descripción                                                                        |
| --------- | ------ | --------- | ---------------------------------------------------------------------------------- |
| tutorId   | string | Sí        | ID único del tutor.                                                                |
| date      | string | Sí        | Fecha del día para el cual se desean obtener las sesiones, en formato `YYYY-MM-DD`. |

**Cuerpo de la Petición:**
No aplica (método GET)

**Respuesta Exitosa (200 OK):**
```typescript
interface MonthlySummarySessionCard {
  id: string;
  time: string; // Formato HH:MM
  courseName: string;
  studentName: string;
  date: string; // Formato YYYY-MM-DD
}

interface SelectedDayInfo {
  date: string; // Fecha del día seleccionado YYYY-MM-DD
  totalSessions: number;
  sessions: MonthlySummarySessionCard[];
}

// Ejemplo de respuesta:
{
  "date": "2026-03-15",
  "totalSessions": 2,
  "sessions": [
    {
      "id": "uuid-session-1",
      "time": "10:00",
      "courseName": "Matemáticas I",
      "studentName": "Juan Pérez",
      "date": "2026-03-15"
    },
    {
      "id": "uuid-session-2",
      "time": "14:30",
      "courseName": "Física II",
      "studentName": "Ana Gómez",
      "date": "2026-03-15"
    }
  ]
}
```

**Respuesta de Error:**
| Código | Descripción                                   | Ejemplo                                         |
| ------ | --------------------------------------------- | ----------------------------------------------- |
| 400    | Formato de fecha inválido o parámetros faltantes | `{ "statusCode": 400, "message": "Invalid date format or missing tutorId/date query parameters." }` |
| 401    | No autenticado o token inválido               | `{ "statusCode": 401, "message": "Unauthorized" }` |
| 403    | Acceso denegado (si el tutorId no coincide)   | `{ "statusCode": 403, "message": "Forbidden" }` |
| 500    | Error interno del servidor al consultar datos | `{ "statusCode": 500, "message": "Internal server error" }` |

**Controller:** `AgendaController.getSessionsByDay(@Query('tutorId') tutorId: string, @Query('date') date: string)`

**Service:** `AgendaService.getSessionsForDay(tutorId: string, dateString: string)`

**DTO Response:** `SelectedDayInfo`

---

### 3. GET /tutor/sessions/:id?tutorId=:tutorId
**Descripción:**
Obtiene los detalles completos de una tutoría agendada específica. Esta información se utiliza para mostrar el modal 'Detalles de la Sesión' al hacer clic en una tarjeta de sesión. Incluye datos del estudiante, la materia, la modalidad (virtual con enlace o presencial con lugar) y el estado de la sesión.

**Autenticación:**
✅ JWT (JwtAuthGuard) - Se requiere que el usuario esté autenticado como tutor. Se verifica que el `tutorId` proporcionado corresponda al tutor logeado y sea el propietario de la sesión solicitada.

**Parámetros de Ruta:**
| Parámetro | Tipo   | Requerido | Descripción                              |
| --------- | ------ | --------- | ---------------------------------------- |
| id        | string | Sí        | ID único de la sesión de tutoría a detallar. |

**Parámetros de Consulta:**
| Parámetro | Tipo   | Requerido | Descripción                       |
| --------- | ------ | --------- | --------------------------------- |
| tutorId   | string | Sí        | ID único del tutor propietario de la sesión. |

**Cuerpo de la Petición:**
No aplica (método GET)

**Respuesta Exitosa (200 OK):**
```typescript
interface SessionDetailDTO {
  id: string;
  student: {
    id: string;
    name: string;
  };
  link?: string; // Presente si modality es 'VIRTUAL'
  location?: string; // Presente si modality es 'PRESENCIAL'
  course: {
    name: string;
    date: string; // Formato YYYY-MM-DD
    time: string; // Formato HH:MM
    modality: 'VIRTUAL' | 'PRESENCIAL';
    price: number; // Precio por hora
  };
  studentMessage?: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
}

// Ejemplo de respuesta para sesión VIRTUAL PENDIENTE:
{
  "id": "uuid-session-1",
  "student": {
    "id": "uuid-student-101",
    "name": "Juan Pérez"
  },
  "link": "https://meet.google.com/xyz-abc-def",
  "course": {
    "name": "Matemáticas I",
    "date": "2026-03-20",
    "time": "10:00",
    "modality": "VIRTUAL",
    "price": 15.50
  },
  "studentMessage": "Necesito ayuda con el capítulo 5.",
  "status": "PENDING"
}

// Ejemplo de respuesta para sesión PRESENCIAL COMPLETADA:
{
  "id": "uuid-session-2",
  "student": {
    "id": "uuid-student-102",
    "name": "Ana Gómez"
  },
  "location": "Biblioteca Central, Sala 3",
  "course": {
    "name": "Física II",
    "date": "2026-03-05",
    "time": "14:30",
    "modality": "PRESENCIAL",
    "price": 20.00
  },
  "studentMessage": null,
  "status": "COMPLETED"
}
```

**Respuesta de Error:**
| Código | Descripción                                     | Ejemplo                                                                    |
| ------ | ----------------------------------------------- | -------------------------------------------------------------------------- |
| 401    | No autenticado o token inválido                 | `{ "statusCode": 401, "message": "Unauthorized" }`                         |
| 403    | Acceso denegado (si el tutorId no coincide)     | `{ "statusCode": 403, "message": "Forbidden" }`                            |
| 404    | Sesión no encontrada o no pertenece al tutor    | `{ "statusCode": 404, "message": "Session with ID 'uuid-invalid' not found or not owned by tutor." }` |
| 500    | Error interno del servidor al consultar detalles | `{ "statusCode": 500, "message": "Internal server error" }`                |

**Controller:** `SessionsController.getById(@Param('id') sessionId: string, @Query('tutorId') tutorId: string)`

**Service:** `SessionsService.getDetails(sessionId: string, tutorId: string)`

**DTO Response:** `SessionDetailDTO`