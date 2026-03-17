# Documentación de Endpoints - HU33 - Ver solicitudes de tutoría enviadas

## Resumen de la Historia de Usuario
**HU**: HU33 - Ver solicitudes de tutoría enviadas.md
**Descripción**: Como estudiante, quiero ver las solicitudes que he enviado para saber qué servicios he solicitado.
**Criterios de Aceptación**:
*   Visualización de solicitudes filtradas por estado (Todas, Pendientes, Aceptadas, Rechazadas, Expiradas) y con paginación.
*   Cada solicitud en la lista debe mostrar avatar, materia, tutor, fecha/hora, modalidad, precio, y una etiqueta de estado.
*   Acceso al detalle de una solicitud específica a través de un modal, cuyo contenido se adapta al estado (Pendiente, Aceptada, Rechazada, Expirada).
*   Los detalles para solicitudes Aceptadas incluyen lugar/enlace de la tutoría y un botón activo para "Cancelar Tutoría".
*   Los detalles para solicitudes Rechazadas incluyen el "MOTIVO DE RECHAZO" del tutor.
*   Los detalles para solicitudes Pendientes muestran un botón "Cancelar Solicitud" inactivo.
*   Los detalles para solicitudes Expiradas son de solo lectura.
*   Un componente de paginación numérica se muestra en la parte inferior si la lista tiene más de 5 registros.

---

## Tabla de Endpoints

| # | Método | Ruta Completa                 | Descripción                                                                          | Autenticación      | Controller                         | Service                             | DTO Request        | DTO Response            |
| - | ------ | ----------------------------- | ------------------------------------------------------------------------------------ | ------------------ | ---------------------------------- | ----------------------------------- | ------------------ | ----------------------- |
| 1 | GET    | /api/solicitudes              | Obtiene la lista paginada y filtrada de solicitudes de tutoría enviadas por el estudiante. | JWT (JwtAuthGuard) | SolicitudesController.findAll()    | SolicitudesService.findAll()        | SolicitudListParams | PaginatedSolicitudListDto |
| 2 | GET    | /api/solicitudes/:id          | Obtiene los detalles completos de una solicitud de tutoría específica.               | JWT (JwtAuthGuard) | SolicitudesController.findOne()    | SolicitudesService.findById()       | -                  | SolicitudDetailDto      |
| 3 | PATCH  | /api/solicitudes/:id/cancel   | Permite al estudiante cancelar una solicitud de tutoría pendiente o aceptada.        | JWT (JwtAuthGuard) | SolicitudesController.cancel()     | SolicitudesService.cancel()         | CancelSolicitudDto | APIResponse             |

---

## Detalle de Cada Endpoint

### 1. GET /api/solicitudes
*   **Descripción**: Permite al estudiante autenticado obtener una lista paginada de las solicitudes de tutoría que ha enviado. La lista puede ser filtrada por el estado de las solicitudes (Pendientes, Aceptadas, Rechazadas, Expiradas, o Todas).

*   **Autenticación**:
    ✅ Requerida (JWT - `JwtAuthGuard`)

*   **Parámetros de Ruta**:
    Ninguno

*   **Parámetros de Consulta**:
    | Parámetro | Tipo                       | Requerido | Descripción                                                                | Ejemplo        |
    | :-------- | :------------------------- | :-------- | :------------------------------------------------------------------------- | :------------- |
    | `status`  | `string` (`SolicitudStatus` \| 'TODAS') | No        | Filtra las solicitudes por su estado. Por defecto, 'TODAS'.              | `PENDIENTE`    |
    | `page`    | `number`                   | No        | Número de página de resultados. Valor por defecto: `1`. Mínimo: `1`.       | `2`            |
    | `limit`   | `number`                   | No        | Cantidad de solicitudes por página. Valor por defecto: `5`. Mínimo: `1`. | `10`           |

*   **Cuerpo de la Petición**:
    No aplica (método `GET`).

*   **Respuesta Exitosa (200 OK)**:
    ```json
    {
      "items": [
        {
          "id": "solicitud-001",
          "tutorAvatarUrl": "https://example.com/avatars/tutor1.jpg",
          "tutorName": "Dra. Sofía Martínez",
          "subject": "Cálculo I",
          "date": "2023-11-20T10:00:00.000Z",
          "modality": "Virtual",
          "pricePerHour": 35.00,
          "status": "PENDIENTE"
        },
        {
          "id": "solicitud-002",
          "tutorAvatarUrl": "https://example.com/avatars/tutor2.jpg",
          "tutorName": "Lic. Carlos Ruiz",
          "subject": "Historia Moderna",
          "date": "2023-11-15T14:30:00.000Z",
          "modality": "Presencial",
          "pricePerHour": 28.50,
          "status": "ACEPTADA"
        }
      ],
      "total": 16,
      "page": 1,
      "limit": 5
    }
    ```

*   **Respuesta de Error**:
    | Código | Descripción                 | Ejemplo                                                                                             |
    | :----- | :-------------------------- | :-------------------------------------------------------------------------------------------------- |
    | 401    | No autorizado               | `{ "statusCode": 401, "message": "Unauthorized" }`                                                  |
    | 400    | Parámetros de consulta inválidos | `{ "statusCode": 400, "message": "Status must be a valid SolicitudStatus enum value or \"TODAS\"" }` |
    | 500    | Error interno del servidor  | `{ "statusCode": 500, "message": "Failed to fetch solicitations" }`                                 |

*   **Controller**: `SolicitudesController.findAll(@Request() req, @Query() params: SolicitudListParams)`

*   **Service**: `SolicitudesService.findAll(studentId: string, params: SolicitudListParams)`

*   **DTO Request**: `SolicitudListParams` (Query)
    ```typescript
    // @nestjs/src/solicitudes/dto/solicitud-list-params.dto.ts
    import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
    import { SolicitudStatus } from '../enums/solicitud-status.enum';

    export class SolicitudListParams {
      @IsOptional()
      @IsEnum(SolicitudStatus, { message: 'Status must be a valid SolicitudStatus enum value or "TODAS"' })
      status?: SolicitudStatus | 'TODAS' = 'TODAS'; // Valor por defecto
      
      @IsOptional()
      @IsNumber()
      @Min(1)
      page?: number = 1;

      @IsOptional()
      @IsNumber()
      @Min(1)
      limit?: number = 5; // Cantidad de tarjetas por página según prototipo
    }
    ```

*   **DTO Response**: `PaginatedSolicitudListDto`
    ```typescript
    // @nestjs/src/solicitudes/dto/paginated-solicitud-list.dto.ts
    import { SolicitudListItemDto } from './solicitud-list-item.dto';

    export class PaginatedSolicitudListDto {
      items: SolicitudListItemDto[];
      total: number;
      page: number;
      limit: number;
    }

    // @nestjs/src/solicitudes/dto/solicitud-list-item.dto.ts
    export class SolicitudListItemDto {
      id: string;
      tutorAvatarUrl?: string;
      tutorName: string;
      subject: string;
      date: Date; // Fecha representativa (ej. la primera propuesta o aceptada)
      modality: 'Virtual' | 'Presencial';
      pricePerHour: number;
      status: SolicitudStatus;
    }
    ```

### 2. GET /api/solicitudes/:id
*   **Descripción**: Obtiene todos los detalles de una solicitud de tutoría específica identificada por su ID. La información retornada se adapta al estado actual de la solicitud para mostrar datos relevantes como el motivo de rechazo o el lugar/enlace de la tutoría.

*   **Autenticación**:
    ✅ Requerida (JWT - `JwtAuthGuard`)

*   **Parámetros de Ruta**:
    | Parámetro | Tipo   | Requerido | Descripción                      | Ejemplo        |
    | :-------- | :----- | :-------- | :------------------------------- | :------------- |
    | `id`      | `string` | Sí        | ID único de la solicitud a consultar | `solicitud-001` |

*   **Parámetros de Consulta**:
    Ninguno

*   **Cuerpo de la Petición**:
    No aplica (método `GET`).

*   **Respuesta Exitosa (200 OK)**:
    El contenido varía según el `status` de la solicitud.

    **Ejemplo (Solicitud en estado "Pendiente")**:
    ```json
    {
      "id": "solicitud-001",
      "studentId": "student-abc",
      "tutorId": "tutor-xyz",
      "tutorAvatarUrl": "https://example.com/avatars/tutor1.jpg",
      "tutorName": "Dra. Sofía Martínez",
      "subject": "Cálculo I",
      "date": "2023-11-20T10:00:00.000Z",
      "modality": "Virtual",
      "pricePerHour": 35.00,
      "status": "PENDIENTE",
      "proposedSchedules": [
        {"date": "2023-11-20T10:00:00.000Z", "time": "10:00-11:00"},
        {"date": "2023-11-21T15:00:00.000Z", "time": "15:00-16:00"}
      ],
      "studentMessage": "Hola Sofía, me gustaría repasar integrales y series.",
      "createdAt": "2023-11-18T08:00:00.000Z",
      "updatedAt": "2023-11-18T08:00:00.000Z"
    }
    ```

    **Ejemplo (Solicitud en estado "Aceptada" - Modalidad Presencial)**:
    ```json
    {
      "id": "solicitud-002",
      "studentId": "student-abc",
      "tutorId": "tutor-xyz",
      "tutorAvatarUrl": "https://example.com/avatars/tutor2.jpg",
      "tutorName": "Lic. Carlos Ruiz",
      "subject": "Historia Moderna",
      "date": "2023-11-15T14:30:00.000Z",
      "modality": "Presencial",
      "pricePerHour": 28.50,
      "status": "ACEPTADA",
      "proposedSchedules": [ /* ... */ ],
      "studentMessage": "Necesito ayuda para mi ensayo sobre la Revolución Francesa.",
      "acceptedMeetingLocation": "Biblioteca de la Facultad, Sala de estudio 5",
      "createdAt": "2023-11-10T09:00:00.000Z",
      "updatedAt": "2023-11-12T11:00:00.000Z"
    }
    ```

    **Ejemplo (Solicitud en estado "Rechazada")**:
    ```json
    {
      "id": "solicitud-003",
      "studentId": "student-abc",
      "tutorId": "tutor-xyz",
      "tutorAvatarUrl": "https://example.com/avatars/tutor3.jpg",
      "tutorName": "Ing. Laura Vélez",
      "subject": "Física II",
      "date": "2023-11-25T13:00:00.000Z",
      "modality": "Virtual",
      "pricePerHour": 32.00,
      "status": "RECHAZADA",
      "proposedSchedules": [ /* ... */ ],
      "studentMessage": "Dudas con el tema de electricidad y magnetismo.",
      "rejectionReason": "Lo siento, no tengo disponibilidad en ninguna de las franjas horarias propuestas.",
      "createdAt": "2023-11-22T10:00:00.000Z",
      "updatedAt": "2023-11-23T16:00:00.000Z"
    }
    ```
    
    **Ejemplo (Solicitud en estado "Expirada")**:
    ```json
    {
      "id": "solicitud-004",
      "studentId": "student-abc",
      "tutorId": "tutor-xyz",
      "tutorAvatarUrl": "https://example.com/avatars/tutor4.jpg",
      "tutorName": "Prof. Roberto Dávila",
      "subject": "Literatura Española",
      "date": "2023-11-10T11:00:00.000Z",
      "modality": "Virtual",
      "pricePerHour": 20.00,
      "status": "EXPIRADA",
      "proposedSchedules": [ /* ... */ ],
      "studentMessage": "Necesito revisar el Siglo de Oro español.",
      "createdAt": "2023-11-08T09:00:00.000Z",
      "updatedAt": "2023-11-10T11:00:00.000Z"
    }
    ```

*   **Respuesta de Error**:
    | Código | Descripción                                     | Ejemplo                                                                                         |
    | :----- | :---------------------------------------------- | :------------------------------------------------------------------------------------------------ |
    | 401    | No autorizado                                   | `{ "statusCode": 401, "message": "Unauthorized" }`                                              |
    | 404    | Solicitud no encontrada o no pertenece al estudiante | `{ "statusCode": 404, "message": "Solicitud con ID solicitud-XXX no encontrada o no pertenece a este estudiante." }` |
    | 500    | Error interno del servidor                      | `{ "statusCode": 500, "message": "Failed to fetch solicitation details" }`                        |

*   **Controller**: `SolicitudesController.findOne(@Request() req, @Param('id') id: string)`

*   **Service**: `SolicitudesService.findById(studentId: string, id: string)`

*   **DTO Response**: `SolicitudDetailDto`
    ```typescript
    // @nestjs/src/solicitudes/dto/solicitud-detail.dto.ts
    import { SolicitudListItemDto } from './solicitud-list-item.dto';

    export class SolicitudDetailDto extends SolicitudListItemDto {
      studentId: string; // ID del estudiante que hizo la solicitud
      tutorId: string;   // ID del tutor al que se le hizo la solicitud
      proposedSchedules: { date: Date; time: string }[];
      studentMessage: string;
      
      // Propiedades condicionales basadas en el estado
      acceptedMeetingLocation?: string; // Para estado Aceptada (Presencial)
      acceptedMeetingLink?: string;     // Para estado Aceptada (Virtual)
      rejectionReason?: string;         // Para estado Rechazada o CANCELADA por tutor
      createdAt: Date;
      updatedAt: Date;
      // ... otras propiedades detalladas que el modal pueda necesitar
    }
    ```

### 3. PATCH /api/solicitudes/:id/cancel
*   **Descripción**: Permite a un estudiante cancelar una solicitud de tutoría que se encuentre en estado `PENDIENTE` o `ACEPTADA`. Si la solicitud ya está en estado `RECHAZADA`, `EXPIRADA` o `CANCELADA`, la operación no será permitida. Se puede proporcionar un motivo de cancelación opcional.

*   **Autenticación**:
    ✅ Requerida (JWT - `JwtAuthGuard`)

*   **Parámetros de Ruta**:
    | Parámetro | Tipo   | Requerido | Descripción                                | Ejemplo        |
    | :-------- | :----- | :-------- | :----------------------------------------- | :------------- |
    | `id`      | `string` | Sí        | ID único de la solicitud de tutoría a cancelar. | `solicitud-001` |

*   **Parámetros de Consulta**:
    Ninguno

*   **Cuerpo de la Petición**:
    ```json
    {
      "reason": "Me surgió un imprevisto y no podré asistir a la tutoría."
    }
    ```
    (El campo `reason` es opcional).

*   **Respuesta Exitosa (200 OK)**:
    ```json
    {
      "success": true,
      "message": "Solicitud cancelada exitosamente.",
      "data": {
        "id": "solicitud-001",
        "status": "CANCELADA"
      }
    }
    ```

*   **Respuesta de Error**:
    | Código | Descripción                                     | Ejemplo                                                                                             |
    | :----- | :---------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
    | 401    | No autorizado                                   | `{ "statusCode": 401, "message": "Unauthorized" }`                                              |
    | 404    | Solicitud no encontrada                         | `{ "statusCode": 404, "message": "Solicitud con ID solicitud-XXX no encontrada." }`                   |
    | 400    | Operación no permitida por el estado de la solicitud | `{ "statusCode": 400, "message": "No se puede cancelar una solicitud rechazada, expirada o ya cancelada." }` |
    | 400    | Datos de entrada inválidos                      | `{ "statusCode": 400, "message": "El motivo de cancelación no puede exceder los 500 caracteres." }`   |
    | 500    | Error interno del servidor                      | `{ "statusCode": 500, "message": "Failed to cancel solicitation" }`                               |

*   **Controller**: `SolicitudesController.cancel(@Request() req, @Param('id') id: string, @Body() cancelDto: CancelSolicitudDto)`

*   **Service**: `SolicitudesService.cancel(studentId: string, id: string, cancelDto: CancelSolicitudDto)`

*   **DTO Request**: `CancelSolicitudDto` (Body)
    ```typescript
    // @nestjs/src/solicitudes/dto/cancel-solicitud.dto.ts
    import { IsOptional, IsString, MaxLength } from 'class-validator';

    export class CancelSolicitudDto {
      @IsOptional()
      @IsString()
      @MaxLength(500, { message: 'El motivo de cancelación no puede exceder los 500 caracteres.' })
      reason?: string; // Motivo opcional de cancelación
    }
    ```

*   **DTO Response**: `APIResponse`
    ```typescript
    // @nestjs/src/common/dto/api-response.dto.ts
    export class APIResponse {
      success: boolean;
      message: string;
      data?: any;
    }
    ```