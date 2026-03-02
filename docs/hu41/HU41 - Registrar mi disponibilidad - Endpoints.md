# Documentación de Endpoints - HU41 - Registrar mi disponibilidad

---

### Resumen de la Historia de Usuario

**HU:** HU41 - Registrar mi disponibilidad
**Descripción:** Como tutor, quiero registrar mi disponibilidad para que los estudiantes conozcan cuándo pueden solicitar mis servicios.
**Criterios de Aceptación:**
*   El sistema bloquea la navegación si no se selecciona ningún bloque de horario y muestra un mensaje de error.
*   Al seleccionar un bloque horario, este cambia visualmente y un contador de horarios seleccionados se actualiza.
*   Al deseleccionar un bloque horario, este vuelve a su estado original y el contador disminuye.
*   Al avanzar con al menos un horario seleccionado, el sistema redirige a la página "3 Perfil Profesional".
*   La navegabilidad hacia atrás (al paso "1 Datos Básicos") redirige a la pantalla anterior conservando la información.

---

### Tabla de Endpoints

| # | Método | Ruta Completa          | Descripción                                             | Autenticación                      | Controller                      | Service                         | DTO Request        | DTO Response              |
| - | ------ | ---------------------- | ------------------------------------------------------- | ---------------------------------- | ------------------------------- | ------------------------------- | ------------------ | ------------------------- |
| 1 | POST   | /api/disponibilidad    | Registra o actualiza la disponibilidad horaria de un tutor. | JWT (requerida para `tutorId`) | DisponibilidadController.save() | DisponibilidadService.save() | CreateAvailabilityDto | SuccessResponse | ErrorResponse |

---

### Detalle de Cada Endpoint

#### 1. POST /api/disponibilidad

**Descripción:**
Este endpoint permite a un tutor registrar o actualizar su disponibilidad horaria. La petición incluye una lista de bloques de tiempo seleccionados por el tutor, y el sistema persistirá esta información en la base de datos, reemplazando cualquier disponibilidad previa para ese tutor o insertándola si es la primera vez.

**Autenticación:**
✅ Requerida (JWT). Aunque no se muestra explícitamente un `AuthGuard` en el diagrama de secuencia, el `tutorId` se espera en el `CreateAvailabilityDto` y la `guardarDisponibilidadAction` asume que se obtiene de un contexto de autenticación (`current-tutor-id`), lo que implica que el usuario debe estar autenticado para realizar esta acción.

**Parámetros de Ruta:**
Ninguno

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**
Se espera un objeto JSON (`CreateAvailabilityDto`) que contiene el ID del tutor y un array de bloques horarios seleccionados.

```typescript
// CreateAvailabilityDto
interface AvailabilityBlockDto {
  day: string; // Ejemplo: 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'
  hour: string; // Ejemplo: '07:00', '08:00', ..., '20:00' (formato HH:00)
}

interface CreateAvailabilityDto {
  tutorId: string; // ID único del tutor
  blocks: AvailabilityBlockDto[]; // Array de bloques horarios seleccionados
}
```

**Ejemplo de Petición:**

```json
{
  "tutorId": "a1b2c3d4e5f6g7h8i9j0",
  "blocks": [
    {
      "day": "Lun",
      "hour": "09:00"
    },
    {
      "day": "Mar",
      "hour": "10:00"
    },
    {
      "day": "Mié",
      "hour": "11:00"
    },
    {
      "day": "Jue",
      "hour": "12:00"
    }
  ]
}
```

**Respuesta Exitosa (201 Created):**
Retorna un objeto JSON con un mensaje de éxito y el ID del tutor cuya disponibilidad fue registrada.

```json
{
  "message": "Disponibilidad registrada exitosamente para el tutor.",
  "tutorId": "a1b2c3d4e5f6g7h8i9j0"
}
```

**Respuesta de Error:**

| Código | Descripción                 | Ejemplo                                                              |
| ------ | --------------------------- | -------------------------------------------------------------------- |
| 400    | Datos de disponibilidad inválidos.  | `{ "statusCode": 400, "message": "Se debe seleccionar al menos un horario disponible.", "error": "Bad Request" }` <br> `{ "statusCode": 400, "message": ["El día debe ser una cadena de texto."], "error": "Bad Request" }` |
| 500    | Error interno del servidor. | `{ "statusCode": 500, "message": "Error interno al guardar la disponibilidad.", "error": "Internal Server Error" }` |

**Controller:** `DisponibilidadController.save(@Body() createAvailabilityDto: CreateAvailabilityDto)`

**Service:** `DisponibilidadService.save(createAvailabilityDto: CreateAvailabilityDto)`

**DTO Request:** `CreateAvailabilityDto`

**DTO Response:** `SuccessResponse` (objeto con `message` y `tutorId`) o `ErrorResponse` (objeto con `statusCode`, `message`, `error`).