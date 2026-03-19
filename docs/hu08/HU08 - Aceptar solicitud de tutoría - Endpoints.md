# Documentación de Endpoints - HU08 - Aceptar solicitud de tutoría

---

### Resumen de la Historia de Usuario

**HU:** HU08 - Aceptar solicitud de tutoría
**Descripción:** Como tutor, quiero aceptar una solicitud para confirmar el agendamiento de la tutoría.
**Criterios de Aceptación:** Esta historia de usuario cubre los escenarios donde un tutor acepta una solicitud de tutoría, ya sea virtual o presencial. Implica la validación del enlace de reunión (para tutorías virtuales) o el lugar de encuentro (para tutorías presenciales), la confirmación de la tutoría en el sistema, el cierre del modal de confirmación, la actualización del estado de la solicitud a "Aceptada" y la revalidación de la interfaz de usuario para reflejar estos cambios (eliminación de la solicitud de "Pendientes" y actualización de contadores). También se detallan los bloqueos por validación de campos obligatorios, formato incorrecto (URL), y límites de caracteres.

---

### Tabla de Endpoints

| # | Método | Ruta Completa                 | Descripción                                                                    | Autenticación      | Controller                   | Service                      | DTO Request        | DTO Response            |
| - | ------ | ----------------------------- | ------------------------------------------------------------------------------ | ------------------ | ---------------------------- | ---------------------------- | ------------------ | ----------------------- |
| 1 | PUT    | `/api/tutorias/:id/confirmar` | Acepta y confirma una solicitud de tutoría pendiente, estableciendo los detalles de la reunión (enlace o lugar). | `JWT (JwtAuthGuard)` | `TutoriasController.confirmar()` | `TutoriasService.confirmar()` | `ConfirmarTutoriaDto` | `ApiResponse<TutoriaEntity>` |

---

### Detalle de Endpoints

### 1. `PUT /api/tutorias/:id/confirmar`

**Descripción:**
Este endpoint permite al tutor aceptar una solicitud de tutoría que se encuentra en estado "pendiente". Dependiendo de la modalidad de la tutoría (Virtual o Presencial), el sistema registrará un enlace de reunión o un lugar de encuentro. Al confirmar, el estado de la tutoría cambiará a "aceptada" en el sistema.

**Autenticación:**
`JWT (JwtAuthGuard)` - Se requiere un token de autenticación JWT válido en el encabezado `Authorization`.

**Parámetros de Ruta:**

| Parámetro | Tipo   | Requerido | Descripción                      |
| :-------- | :----- | :-------- | :------------------------------- |
| `id`      | `string` (UUID) | Sí        | ID único de la tutoría a confirmar. |

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición (`ConfirmarTutoriaDto`):**

```typescript
// src/tutorias/dto/confirmar-tutoria.dto.ts
interface ConfirmarTutoriaDto {
  tutoriaId: string; // UUID, debe coincidir con el 'id' del parámetro de ruta
  modalidad: 'Virtual' | 'Presencial'; // Modalidad de la tutoría
  
  // Campo condicional para modalidad 'Virtual'
  enlaceReunion?: string; // URL de la reunión virtual. Requerido si modalidad es 'Virtual'.
  
  // Campo condicional para modalidad 'Presencial'
  lugarEncuentro?: string; // Descripción del lugar de encuentro. Requerido si modalidad es 'Presencial'.
}
```

**Validaciones del Cuerpo de la Petición:**

*   **`tutoriaId`**:
    *   Debe ser un UUID válido.
    *   Debe coincidir con el `id` proporcionado en los parámetros de ruta.
*   **`modalidad`**:
    *   Obligatorio.
    *   Debe ser `'Virtual'` o `'Presencial'`.
*   **`enlaceReunion`** (si `modalidad` es `'Virtual'`):
    *   Obligatorio.
    *   Debe ser una URL válida (ej. debe comenzar con `https://` o `http://`).
    *   Mensaje de error: "El enlace de reunión es obligatorio."
    *   Mensaje de error: "Ingresa una URL válida (debe comenzar con https:// o http://)."
*   **`lugarEncuentro`** (si `modalidad` es `'Presencial'`):
    *   Obligatorio.
    *   Mínimo 10 caracteres.
    *   Máximo 100 caracteres.
    *   Mensaje de error: "El lugar de encuentro es obligatorio."
    *   Mensaje de error: "Mínimo 10 caracteres para el lugar."
    *   Mensaje de error: "Máximo 100 caracteres para el lugar."

**Ejemplo de Cuerpo de Petición (Virtual):**

```json
{
  "tutoriaId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "modalidad": "Virtual",
  "enlaceReunion": "https://zoom.us/j/123456789"
}
```

**Ejemplo de Cuerpo de Petición (Presencial):**

```json
{
  "tutoriaId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "modalidad": "Presencial",
  "lugarEncuentro": "Edificio H, Aula 205, Campus Principal"
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "message": "Tutoría confirmada exitosamente.",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "estado": "aceptada",
    "modalidad": "Virtual",
    "enlaceReunion": "https://zoom.us/j/123456789",
    "lugarEncuentro": null,
    "fecha": "2024-07-20T10:00:00.000Z",
    "duracionMinutos": 60,
    "idEstudiante": "uuid-del-estudiante",
    "idTutor": "uuid-del-tutor",
    "createdAt": "2024-07-19T15:00:00.000Z",
    "updatedAt": "2024-07-19T16:00:00.000Z"
  }
}
```
*(Nota: El objeto `data` contendrá los campos actualizados de la `TutoriaEntity` en la base de datos. Los campos `enlaceReunion` o `lugarEncuentro` serán `null` según la modalidad opuesta a la confirmada.)*

**Respuestas de Error:**

| Código | Descripción                                                                                   | Ejemplo de Respuesta                                                                                                |
| :----- | :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `400`  | **Bad Request** - Errores de validación en el DTO o inconsistencia en IDs.                     | `{ "statusCode": 400, "message": "El enlace de reunión es obligatorio.", "error": "Bad Request" }`                  |
|        |                                                                                               | `{ "statusCode": 400, "message": "Ingresa una URL válida (debe comenzar con https:// o http://).", "error": "Bad Request" }` |
|        |                                                                                               | `{ "statusCode": 400, "message": "Mínimo 10 caracteres para el lugar.", "error": "Bad Request" }`                   |
|        |                                                                                               | `{ "statusCode": 400, "message": "El ID de tutoría en la URL no coincide con el del cuerpo de la solicitud.", "error": "Bad Request" }` |
|        |                                                                                               | `{ "statusCode": 400, "message": "Solo se pueden confirmar tutorías en estado \"pendiente\".", "error": "Bad Request" }` |
| `404`  | **Not Found** - La tutoría con el ID proporcionado no existe.                                | `{ "statusCode": 404, "message": "La tutoría con ID {id} no fue encontrada.", "error": "Not Found" }`             |
| `500`  | **Internal Server Error** - Ocurrió un error inesperado en el servidor durante el procesamiento. | `{ "statusCode": 500, "message": "Ocurrió un error en el servidor. Intenta de nuevo.", "error": "Internal Server Error" }` |

**Controller:** `TutoriasController.confirmar(@Param('id') id: string, @Body() confirmarTutoriaDto: ConfirmarTutoriaDto)`

**Service:** `TutoriasService.confirmar(confirmarTutoriaDto: ConfirmarTutoriaDto)`

**DTO Response:** `ApiResponse<TutoriaEntity>`