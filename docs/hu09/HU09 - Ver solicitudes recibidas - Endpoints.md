# Documentación de Endpoints - HU09 - Ver solicitudes recibidas

## Resumen de la Historia de Usuario

**HU:** HU09 - Ver solicitudes recibidas
**Descripción:** Como tutor, quiero ver las solicitudes de tutoría que he recibido para enterarme de los estudiantes que necesitan mi ayuda.
**Criterios de Aceptación:**
*   Visualización inicial de solicitudes en estado "Pendiente" con conteos globales.
*   Manejo de escenarios sin solicitudes pendientes o expiradas.
*   Cambio entre pestañas "Pendientes" y "Expiradas" para ver solicitudes por estado.
*   Expansión/Colapso de filas de solicitud para ver detalles (modalidad, precio, mensaje completo).
*   Los botones "Aceptar" y "Rechazar" solo se muestran en solicitudes "Pendiente" expandidas y no se manejan en esta HU.
*   No se gestiona la pestaña "Respondidas" en esta HU.

## Tabla de Endpoints

| # | Método | Ruta Completa                      | Descripción                                                  | Autenticación                    | Controller                                    | Service                                     | DTO Request        | DTO Response           |
| - | ------ | ---------------------------------- | ------------------------------------------------------------ | -------------------------------- | --------------------------------------------- | ------------------------------------------- | ------------------ | ---------------------- |
| 1 | GET    | /api/solicitudes/counts            | Obtiene el conteo de solicitudes por estado para el tutor autenticado. | JWT (JwtAuthGuard, TutorAuthGuard) | SolicitudesController.getRequestCounts()      | SolicitudesService.getCountsByStatus()      | -                  | GlobalCountsDto        |
| 2 | GET    | /api/solicitudes                   | Obtiene una lista paginada de solicitudes de tutoría, filtradas por estado, para el tutor autenticado. | JWT (JwtAuthGuard, TutorAuthGuard) | SolicitudesController.getFilteredRequests() | SolicitudesService.getFiltered()            | FilterParamsDto    | PaginatedSolicitudesDto |

## Detalle de Cada Endpoint

### 1. GET /api/solicitudes/counts

**Descripción:**
Este endpoint permite a un tutor autenticado obtener un resumen de la cantidad de solicitudes de tutoría que ha recibido, clasificadas por estado (Pendiente, Expirada, Respondida). Es utilizado para mostrar los indicadores globales en la interfaz de usuario.

**Autenticación:**
✅ **Requerida:** JWT (Token de portador)
*   **JwtAuthGuard:** Asegura que el usuario esté autenticado y el token sea válido.
*   **TutorAuthGuard:** Asegura que el usuario autenticado tenga el rol de 'tutor'.

**Parámetros de Ruta:**
Ninguno

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**
No aplica (método GET)

**Respuesta Exitosa (200 OK):**
```typescript
interface GlobalCountsDto {
  pending: number;
  expired: number;
  responded: number;
}
```
**Ejemplo de Respuesta:**
```json
{
  "pending": 3,
  "expired": 14,
  "responded": 12
}
```

**Respuestas de Error:**
| Código | Descripción                                   | Ejemplo                                         |
| ------ | --------------------------------------------- | ----------------------------------------------- |
| 401    | No autorizado (token JWT ausente o inválido). | `{"statusCode": 401, "message": "Unauthorized"}` |
| 403    | Prohibido (usuario no tiene rol de tutor).    | `{"statusCode": 403, "message": "Forbidden"}`   |
| 500    | Error interno del servidor.                   | `{"statusCode": 500, "message": "Internal server error"}` |

**Controller:** `SolicitudesController.getRequestCounts(@Request() req)`

**Service:** `SolicitudesService.getCountsByStatus(tutorId: string)`

**DTO Response:** `GlobalCountsDto`

---

### 2. GET /api/solicitudes

**Descripción:**
Este endpoint permite a un tutor autenticado recuperar una lista paginada de sus solicitudes de tutoría, con la capacidad de filtrar por estado. Incluye detalles relevantes para la visualización tanto colapsada como expandida de las solicitudes.

**Autenticación:**
✅ **Requerida:** JWT (Token de portador)
*   **JwtAuthGuard:** Asegura que el usuario esté autenticado y el token sea válido.
*   **TutorAuthGuard:** Asegura que el usuario autenticado tenga el rol de 'tutor'.

**Parámetros de Ruta:**
Ninguno

**Parámetros de Consulta:**
Este endpoint acepta parámetros de consulta para filtrado y paginación.
| Parámetro | Tipo                                 | Requerido | Descripción                                                                |
| --------- | ------------------------------------ | --------- | -------------------------------------------------------------------------- |
| `status`  | `string` (`'PENDIENTE' \| 'EXPIRADA' \| 'RESPONDIDA'`) | Opcional  | Filtra las solicitudes por su estado. Si se omite, el comportamiento por defecto (por ejemplo, 'PENDIENTE') o la respuesta no filtrada dependerá de la implementación. |
| `page`    | `number`                             | Opcional  | El número de página a recuperar (por defecto: 1). Debe ser `>= 1`.           |
| `limit`   | `number`                             | Opcional  | El número de elementos por página (por defecto: 10). Debe ser `>= 1` y `<= 100`. |

**Cuerpo de la Petición:**
No aplica (método GET)

**Respuesta Exitosa (200 OK):**
```typescript
interface SolicitudDetailsDto {
  id: string;
  estudiante: string; // Nombre del estudiante
  materia: string;
  fechaHora: string; // Fecha y hora formateada (ej. "DD Mon YYYY HH:MM")
  mensajeResumen: string; // Mensaje truncado para la vista colapsada
  estado: 'PENDIENTE' | 'EXPIRADA' | 'RESPONDIDA';
  modalidad?: 'Virtual' | 'Presencial'; // Detalles para la vista expandida
  precioHora?: number; // Detalles para la vista expandida
  mensajeCompleto?: string; // Mensaje completo para la vista expandida
}

interface PaginatedSolicitudesDto {
  data: SolicitudDetailsDto[];
  total: number; // Número total de solicitudes que coinciden con los filtros
  page: number; // Página actual
  limit: number; // Límite de elementos por página
}
```
**Ejemplo de Respuesta (estado 'PENDIENTE'):**
```json
{
  "data": [
    {
      "id": "sol-abc-123",
      "estudiante": "Valeria Sánchez",
      "materia": "Cálculo I",
      "fechaHora": "25 May 2024 10:30",
      "mensajeResumen": "Hola, necesito ayuda con derivadas e integrales...",
      "estado": "PENDIENTE",
      "modalidad": "Virtual",
      "precioHora": 10,
      "mensajeCompleto": "Hola, necesito ayuda urgente con el examen de Cálculo I. Estoy teniendo dificultades con los temas de derivadas e integrales avanzadas. ¿Tienes disponibilidad para una sesión virtual pronto?"
    },
    {
      "id": "sol-def-456",
      "estudiante": "Carlos Gómez",
      "materia": "Programación Orientada a Objetos",
      "fechaHora": "24 May 2024 15:00",
      "mensajeResumen": "Buenas tardes, quisiera una tutoría sobre...",
      "estado": "PENDIENTE",
      "modalidad": "Presencial",
      "precioHora": 12,
      "mensajeCompleto": "Buenas tardes, quisiera una tutoría sobre herencia y polimorfismo en Java. Mi universidad queda en el centro, ¿hay posibilidad de vernos en algún café cerca?"
    }
  ],
  "total": 3,
  "page": 1,
  "limit": 10
}
```

**Ejemplo de Respuesta (estado 'EXPIRADA'):**
```json
{
  "data": [
    {
      "id": "sol-ghi-789",
      "estudiante": "Diego Castillo",
      "materia": "Física Moderna",
      "fechaHora": "20 May 2024 09:00",
      "mensajeResumen": "Hola, estoy interesado en una tutoría...",
      "estado": "EXPIRADA",
      "modalidad": "Presencial",
      "precioHora": 8,
      "mensajeCompleto": "Hola, estoy interesado en una tutoría de física moderna, especialmente en el efecto fotoeléctrico. Tengo flexibilidad de horario."
    }
  ],
  "total": 14,
  "page": 1,
  "limit": 10
}
```

**Ejemplo de Respuesta (sin solicitudes para el estado):**
```json
{
  "data": [],
  "total": 0,
  "page": 1,
  "limit": 10
}
```

**Respuestas de Error:**
| Código | Descripción                                   | Ejemplo                                         |
| ------ | --------------------------------------------- | ----------------------------------------------- |
| 400    | Petición inválida (parámetros de consulta incorrectos). | `{"statusCode": 400, "message": "El estado de la solicitud no es válido.", "error": "Bad Request"}`<br>`{"statusCode": 400, "message": "La página debe ser al menos 1.", "error": "Bad Request"}` |
| 401    | No autorizado (token JWT ausente o inválido). | `{"statusCode": 401, "message": "Unauthorized"}` |
| 403    | Prohibido (usuario no tiene rol de tutor).    | `{"statusCode": 403, "message": "Forbidden"}`   |
| 500    | Error interno del servidor.                   | `{"statusCode": 500, "message": "Internal server error"}` |

**Controller:** `SolicitudesController.getFilteredRequests(@Request() req, @Query() filterParams: FilterParamsDto)`

**Service:** `SolicitudesService.getFiltered(tutorId: string, status?: SolicitudStatus, page: number, limit: number)`

**DTO Request:** `FilterParamsDto`
```typescript
import { IsEnum, IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export enum SolicitudStatus {
  PENDIENTE = 'PENDIENTE',
  EXPIRADA = 'EXPIRADA',
  RESPONDIDA = 'RESPONDIDA',
}

export class FilterParamsDto {
  @IsOptional()
  @IsEnum(SolicitudStatus, { message: 'El estado de la solicitud no es válido.' })
  status?: SolicitudStatus;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'El número de página debe ser un entero.' })
  @Min(1, { message: 'La página debe ser al menos 1.' })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'El límite debe ser un entero.' })
  @Min(1, { message: 'El límite debe ser al menos 1.' })
  @Max(100, { message: 'El límite no puede exceder 100.' })
  limit?: number = 10;
}
```

**DTO Response:** `PaginatedSolicitudesDto` (que contiene `SolicitudDetailsDto` en su campo `data`)