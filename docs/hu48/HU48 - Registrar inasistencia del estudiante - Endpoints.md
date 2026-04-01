# Documentación de Endpoints - HU48 - Registrar inasistencia del estudiante

---

### Resumen de la Historia de Usuario

**HU:** HU48 - Registrar inasistencia del estudiante
**Descripción:** Como tutor, quiero registrar la inasistencia de un estudiante para proteger mi tiempo y evitar pérdidas económicas.
**Criterios de Aceptación:**
*   Mostrar un modal de confirmación al hacer clic en 'Inasistencia' desde la tarjeta de tutoría o desde el modal de detalle.
*   Permitir cancelar la acción de reportar inasistencia, cerrando el modal sin aplicar cambios.
*   Al reportar inasistencia exitosamente, cerrar todos los modales, actualizar visualmente la tarjeta de tutoría a estado 'Inasistencia' y mostrar una notificación de éxito.
*   Visualizar los detalles de una tutoría con estado 'Inasistencia' en modo solo lectura, mostrando el estado estáticamente.
*   Cerrar el modal de detalle de una tutoría con inasistencia regresando a la pantalla principal.

---

### Tabla de Endpoints

| # | Método | Ruta Completa                          | Descripción                                               | Autenticación | Controller                                    | Service                                     | DTO Request          | DTO Response           |
| - | ------ | -------------------------------------- | --------------------------------------------------------- | ------------- | --------------------------------------------- | ------------------------------------------- | -------------------- | ---------------------- |
| 1 | POST   | `/api/tutorias/:id/inasistencia`       | Registra la inasistencia de un estudiante en una tutoría. | JWT (Asumida) | TutoriasController.reportInasistencia()       | TutoriasService.reportInasistencia()        | ReportInasistenciaDto | TutoriaResponseDto     |

---

### Detalle de Cada Endpoint

#### 1. POST `/api/tutorias/:id/inasistencia`

**Descripción:**
Este endpoint permite a un tutor registrar que un estudiante no asistió a una tutoría programada. Al invocarlo, el estado de la tutoría especificada por `id` se actualizará a 'inasistencia'. Este proceso implica una confirmación previa por parte del tutor en la interfaz de usuario.

**Autenticación:**
🔒 **JWT (Asumida)**
Se asume que esta ruta estará protegida por un token JWT, verificando que el usuario que realiza la petición es un tutor autenticado y, idealmente, que es el tutor asociado a la tutoría que se intenta modificar (autorización).

**Parámetros de Ruta:**

| Parámetro | Tipo   | Requerido | Descripción                            |
| :-------- | :----- | :-------- | :------------------------------------- |
| `id`      | `string` | Sí        | ID único (UUID) de la tutoría a reportar inasistencia. |

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**
Puede ser vacío o incluir el ID de la tutoría para consistencia, aunque el ID principal se toma del parámetro de la URL.

```json
// Opcional: Puede ser enviado para consistencia, pero el ID principal es el de la URL.
{
  "id": "uuid-de-la-tutoria-ejemplo"
}
```

**DTO Request:** `ReportInasistenciaDto`

```typescript
// src/tutorias/dto/report-inasistencia.dto.ts
import { IsUUID, IsOptional } from 'class-validator';

export class ReportInasistenciaDto {
  @IsUUID('4', { message: 'El ID de la tutoría debe ser un UUID válido.' })
  @IsOptional() // Opcional porque el ID principal se obtiene del parámetro de la URL
  id?: string;
}
```

**Respuesta Exitosa (200 OK):**
Indica que la inasistencia se registró correctamente y retorna los datos actualizados de la tutoría.

```json
{
  "success": true,
  "message": "Inasistencia del estudiante registrada con éxito.",
  "data": {
    "id": "uuid-de-la-tutoria-ejemplo",
    "fecha": "2023-11-15T10:00:00.000Z",
    "horaInicio": "10:00",
    "horaFin": "11:00",
    "estado": "inasistencia", // El campo clave que se actualiza
    "tutorId": "uuid-del-tutor",
    "estudianteId": "uuid-del-estudiante",
    "materia": "Cálculo I",
    "modalidad": "Virtual",
    "lugar": "Google Meet",
    "createdAt": "2023-11-01T08:00:00.000Z",
    "updatedAt": "2023-11-15T10:05:00.000Z"
  }
}
```

**DTO Response:** `TutoriaResponseDto` (Inferido de la respuesta del controlador y servicio)

```typescript
// Este DTO representa la estructura de la tutoría actualizada que se devuelve.
// Podría estar definido en src/tutorias/dto/tutoria.dto.ts o similar.
interface TutoriaResponseDto {
  id: string;
  fecha: string; // ISO 8601 string
  horaInicio: string;
  horaFin: string;
  estado: 'sin confirmar' | 'pendiente' | 'inasistencia' | 'completada' | 'cancelada';
  tutorId: string;
  estudianteId: string;
  materia: string;
  modalidad: string;
  lugar?: string; // Opcional según modalidad
  createdAt: string; // ISO 8601 string
  updatedAt: string; // ISO 8601 string
  // Podría incluir otros campos como referencias a tutor/estudiante si fuera necesario
  // tutor?: { id: string; nombre: string; ... };
  // estudiante?: { id: string; nombre: string; ... };
}

// Estructura general de la respuesta de la API
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// La respuesta exitosa de este endpoint sería:
// ApiResponse<TutoriaResponseDto>
```

**Respuesta de Error:**

| Código | Descripción                                        | Ejemplo                                                                    |
| :----- | :------------------------------------------------- | :------------------------------------------------------------------------- |
| `400`  | **BadRequestException**: Tutoría en estado inválido. | `{ "statusCode": 400, "message": "No se puede reportar inasistencia para una tutoría en este estado.", "error": "Bad Request" }` |
| `401`  | **UnauthorizedException**: Credenciales inválidas. | `{ "statusCode": 401, "message": "No autorizado", "error": "Unauthorized" }` |
| `403`  | **ForbiddenException**: Sin permisos para la acción. | `{ "statusCode": 403, "message": "No tienes permiso para realizar esta acción.", "error": "Forbidden" }` |
| `404`  | **NotFoundException**: Tutoría no encontrada.      | `{ "statusCode": 404, "message": "Tutoría con ID {id} no encontrada.", "error": "Not Found" }` |
| `500`  | **InternalServerErrorException**: Error interno.   | `{ "statusCode": 500, "message": "Error interno del servidor.", "error": "Internal Server Error" }` |

**Controller:** `TutoriasController.reportInasistencia(@Param('id') id: string)`
*   Maneja la solicitud HTTP POST para la ruta `/api/tutorias/:id/inasistencia`.
*   Extrae el `id` de la tutoría de los parámetros de la URL.
*   Delega la lógica de negocio al `TutoriasService`.
*   Retorna una `ApiResponse` con el mensaje de éxito y la tutoría actualizada, o maneja las excepciones lanzadas por el servicio.

**Service:** `TutoriasService.reportInasistencia(tutoriaId: string)`
*   Recibe el `tutoriaId` y busca la tutoría en la base de datos.
*   Realiza validaciones de negocio, como verificar que la tutoría exista y que su estado actual permita ser marcada como 'inasistencia'.
*   Actualiza el campo `estado` de la tutoría a 'inasistencia' en la base de datos.
*   Retorna la entidad de tutoría actualizada.
*   Lanza `NotFoundException` si la tutoría no existe.
*   Lanza `BadRequestException` si la tutoría ya está en un estado final (ej. 'completada', 'cancelada', o ya 'inasistencia').