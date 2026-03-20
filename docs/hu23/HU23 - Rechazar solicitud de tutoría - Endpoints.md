# Documentación de Endpoints - HU23 - Rechazar solicitud de tutoría

---

### Resumen de la Historia de Usuario

**HU:** HU23 - Rechazar solicitud de tutoría
**Descripción:** Como tutor, quiero rechazar una solicitud para descartar las tutorías que no me convienen impartir.
**Criterios de Aceptación:** La historia de usuario describe el proceso de un tutor seleccionando un motivo de rechazo (predefinido o 'Otro' con comentario opcional) en un modal, confirmando el rechazo y esperando que la solicitud se mueva de la bandeja de 'Pendientes' a 'Respondidas', actualizando los contadores. Se especifica un límite de 300 caracteres para el comentario y la funcionalidad de cancelar la acción sin efectos.

---

### Tabla de Endpoints

| # | Método | Ruta Completa                 | Descripción                                   | Autenticación      | Controller              | Service                     | DTO Request        | DTO Response           |
| - | ------ | ----------------------------- | --------------------------------------------- | ------------------ | ----------------------- | --------------------------- | ------------------ | ---------------------- |
| 1 | POST   | /api/solicitudes/:id/rechazar | Rechaza una solicitud de tutoría por su ID. | JWT (JwtAuthGuard) | SolicitudesController.reject | SolicitudesService.reject | RejectSolicitudDto | SolicitudDto (actualizada) |

---

### Detalle de Cada Endpoint

### 1. POST /api/solicitudes/:id/rechazar

**Descripción:**
Permite a un tutor rechazar una solicitud de tutoría pendiente, especificando un motivo de rechazo y, opcionalmente, un comentario adicional. Esta acción actualiza el estado de la solicitud en la base de datos a 'Rechazada' y registra la razón.

**Autenticación:**
🔒 Requerida (Se asume `JwtAuthGuard` o similar para proteger la ruta, aunque no explícitamente detallado en los diagramas de código, es una buena práctica para operaciones sensibles).

**Parámetros de Ruta:**

| Parámetro | Tipo   | Requerido | Descripción                         |
| :-------- | :----- | :-------- | :---------------------------------- |
| id        | string | Sí        | ID único de la solicitud de tutoría |

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**

```json
{
  "reason": "Conflicto de horarios con otra tutoría",
  "comment": "No podré atender esta semana debido a un cruce de horarios."
}
```

**DTO Request:** `RejectSolicitudDto`

```typescript
// src/solicitudes/dto/reject-solicitud.dto.ts
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

enum RejectionReason {
  PERSONAL_IMPREVISTO = 'Imprevisto personal',
  HORARIOS_CONFLICTO = 'Conflicto de horarios con otra tutoría',
  ENFERMEDAD = 'Enfermedad',
  OTRO = 'Otro',
}

export class RejectSolicitudDto {
  @IsEnum(RejectionReason, { message: 'Motivo de rechazo inválido.' })
  reason: RejectionReason;

  @IsOptional()
  @IsString({ message: 'El comentario debe ser una cadena de texto.' })
  @MaxLength(300, { message: 'El comentario no puede exceder los 300 caracteres.' })
  comment?: string;
}
```

**Validaciones de Cuerpo de Petición:**
*   `reason`: **Requerido**. Debe ser uno de los valores del enum `RejectionReason` (e.g., "Imprevisto personal", "Conflicto de horarios con otra tutoría", "Enfermedad", "Otro").
*   `comment`: **Opcional**. Si se proporciona, debe ser una cadena de texto y no puede exceder los 300 caracteres de longitud. Es relevante solo si `reason` es "Otro".

**Respuesta Exitosa (200 OK):**
Indica que la solicitud fue rechazada y actualizada exitosamente. El cuerpo de la respuesta incluye un mensaje y los datos actualizados de la solicitud.

```json
{
  "message": "Solicitud rechazada exitosamente.",
  "solicitud": {
    "id": "60d0fe4f-a9b0-4b2e-8d2a-9e1f5b0c7a8d",
    "studentId": "some-student-id",
    "tutorId": "some-tutor-id",
    "course": "Matemáticas I",
    "status": "Rechazada",
    "rejectionReason": "Conflicto de horarios con otra tutoría",
    "rejectionComment": null,
    "createdAt": "2023-10-26T10:00:00.000Z",
    "respondedAt": "2023-10-26T10:30:00.000Z"
    // ... otros campos de la solicitud
  }
}
```
**Nota sobre `solicitud` en la respuesta:** Los detalles exactos pueden variar, pero incluirían el `id`, el nuevo `status`, `rejectionReason`, y `rejectionComment` (si aplica), junto con `respondedAt`.

**Respuesta de Error:**

| Código | Descripción                                 | Ejemplo                                                               |
| :----- | :------------------------------------------ | :-------------------------------------------------------------------- |
| 400    | Validación de la petición fallida           | `{ "statusCode": 400, "message": ["Motivo de rechazo inválido."], "error": "Bad Request" }` <br> `{ "statusCode": 400, "message": ["El comentario no puede exceder los 300 caracteres."], "error": "Bad Request" }` |
| 404    | Solicitud no encontrada                     | `{ "statusCode": 404, "message": "Solicitud con ID {id} no encontrada.", "error": "Not Found" }` |
| 500    | Error interno del servidor (o de la base de datos) | `{ "statusCode": 500, "message": "Error interno del servidor.", "error": "Internal Server Error" }` |

**Controller:** `SolicitudesController.reject(@Param('id') id: string, @Body() rejectSolicitudDto: RejectSolicitudDto)`

**Service:** `SolicitudesService.reject(id: string, rejectDto: RejectSolicitudDto)`

**DTO Response:** Se retorna la entidad `Solicitud` actualizada, que podría ser representada por un `SolicitudDto` en la capa de API.