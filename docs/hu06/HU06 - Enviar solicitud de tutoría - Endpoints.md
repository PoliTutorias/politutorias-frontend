# Documentación de Endpoints - HU06 - Enviar solicitud de tutoría

---

## Resumen de la Historia de Usuario

**HU:** HU06 - Enviar solicitud de tutoría.md
**Descripción:** Como estudiante, quiero enviar una solicitud para agendar una tutoría.
**Criterios de Aceptación:** Esta historia de usuario cubre escenarios clave como el bloqueo por horarios no seleccionados, la prevención de solicitudes duplicadas para el mismo horario, la apertura condicional del modal de solicitud (una o dos modalidades), la validación de campos obligatorios (mensaje y modalidad) y la confirmación de envío exitoso, incluyendo un límite máximo de caracteres para el mensaje.

---

## Tabla de Endpoints

| # | Método | Ruta Completa                        | Descripción                                              | Autenticación      | Controller                            | Service                                  | DTO Request                    | DTO Response                       |
| - | ------ | ------------------------------------ | -------------------------------------------------------- | ------------------ | ------------------------------------- | ---------------------------------------- | ------------------------------ | ---------------------------------- |
| 1 | GET    | `/api/ofertas/:id`                   | Obtiene los detalles completos de una oferta de tutoría. | No requerida       | `OfertasController.findOne()`         | `OfertasService.findById()`              | -                              | `TutoriaDetailDto`                 |
| 2 | POST   | `/api/solicitudes/verificar-previa`  | Verifica si ya existe una solicitud activa previa.       | `JWT` (requerida)  | `SolicitudesController.verificarPrevia()` | `SolicitudesService.verificarSolicitudPrevia()` | `VerificarSolicitudPreviaDto`  | `VerificarSolicitudPreviaResponseDto` |
| 3 | POST   | `/api/solicitudes`                   | Crea una nueva solicitud de tutoría.                     | `JWT` (requerida)  | `SolicitudesController.create()`      | `SolicitudesService.create()`            | `CreateSolicitudDto`           | `SolicitudEntity`                  |

---

## Detalle de Cada Endpoint

### 1. GET `/api/ofertas/:id`

**Descripción:**
Obtiene los detalles completos de una oferta de tutoría específica, incluyendo información del tutor, modalidades y horarios disponibles. Esta información es utilizada para renderizar la `DetalleOfertaPage`.

**Autenticación:**
❌ No requerida (información pública de la oferta).

**Parámetros de Ruta:**

| Parámetro | Tipo   | Requerido | Descripción                      |
| :-------- | :----- | :--------- | :------------------------------- |
| `id`      | `string` | Sí         | ID único (UUID) de la oferta de tutoría. |

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**
No aplica (método `GET`)

**Respuesta Exitosa (200 OK):**

```json
{
  "id": "e6a0a8e0-2d8e-4a7b-8c7c-0a2a4b8c7c7c",
  "titulo": "Tutoría de Cálculo Diferencial",
  "carrera": "Ingeniería de Sistemas",
  "modalidad": "virtual/presencial",
  "descripcion": "Ayuda personalizada en temas de cálculo diferencial, límites, derivadas e integrales.",
  "lugarReunion": "Salón 305, Edificio A (solo presencial)",
  "precioHora": 15.00,
  "tutor": {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "nombre": "Juan Pérez",
    "fotoUrl": "https://example.com/foto_juan.jpg",
    "contacto": "juan.perez@example.com"
  },
  "imagenRepresentativaUrl": "https://example.com/calculo_banner.jpg",
  "horariosDisponibles": [
    { "diaSemana": "Lunes", "horaInicio": "10:00", "horaFin": "11:00" },
    { "diaSemana": "Miércoles", "horaInicio": "14:00", "horaFin": "15:00" },
    { "diaSemana": "Viernes", "horaInicio": "09:00", "horaFin": "10:00" }
  ]
}
```

**Respuesta de Error:**

| Código | Descripción                 | Ejemplo                                            |
| :----- | :-------------------------- | :------------------------------------------------- |
| `404`  | Oferta no encontrada        | `{ "message": "Oferta con ID e6a0a8e0... no encontrada." }` |
| `500`  | Error interno del servidor | `{ "message": "Error interno del servidor." }`       |

**Controller:** `OfertasController.findOne(@Param('id') id: string)`

**Service:** `OfertasService.findById(tutoriaId: string)`

**DTO Response:** `TutoriaDetailDto`

---

### 2. POST `/api/solicitudes/verificar-previa`

**Descripción:**
Permite al sistema verificar si el estudiante autenticado ya tiene una solicitud de tutoría `activa` o `pendiente` con el mismo tutor para alguno de los horarios seleccionados. Se utiliza antes de abrir el modal de solicitud para prevenir duplicidades.

**Autenticación:**
✅ Requerida (`JWT` - Se espera un `Bearer Token` en el encabezado `Authorization`).

**Parámetros de Ruta:**
Ninguno

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición (`VerificarSolicitudPreviaDto`):**

| Campo           | Tipo                               | Requerido | Descripción                                                              |
| :-------------- | :--------------------------------- | :--------- | :----------------------------------------------------------------------- |
| `estudianteId`  | `string` (UUID)                    | Sí         | ID del estudiante que realiza la solicitud. Se obtiene de la sesión JWT. |
| `tutorId`       | `string` (UUID)                    | Sí         | ID del tutor al que se le solicita la tutoría.                           |
| `horarios`      | `Array<{ fecha: string; hora: string }>` | Sí         | Lista de horarios seleccionados por el estudiante.                       |
| `horarios[].fecha` | `string` (YYYY-MM-DD)            | Sí         | Fecha del horario seleccionado (ej. "2024-03-09").                       |
| `horarios[].hora`  | `string` (HH:MM)                 | Sí         | Hora del horario seleccionado (ej. "14:00").                             |

```json
{
  "estudianteId": "b1c2d3e4-f5a6-7890-1234-567890fedcba",
  "tutorId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "horarios": [
    { "fecha": "2024-03-09", "hora": "14:00" }
  ]
}
```

**Respuesta Exitosa (200 OK):**

| Campo   | Tipo      | Descripción                                                                                                |
| :------ | :-------- | :--------------------------------------------------------------------------------------------------------- |
| `existe` | `boolean` | `true` si ya existe una solicitud activa/pendiente para esos horarios, `false` en caso contrario.        |
| `mensaje` | `string` | **CA: Bloqueo por Solicitud Previa:** Mensaje descriptivo si `existe` es `true` (ej. "Horario ya solicitado..."). |

```json
// Caso 1: Solicitud previa encontrada
{
  "existe": true,
  "mensaje": "Horario ya solicitado. Ya tienes una solicitud activa para Miércoles 14:00."
}

// Caso 2: No hay solicitud previa
{
  "existe": false
}
```

**Respuesta de Error:**

| Código | Descripción                 | Ejemplo                                                            |
| :----- | :-------------------------- | :----------------------------------------------------------------- |
| `400`  | Datos de entrada inválidos  | `{ "message": ["El ID del tutor debe ser un UUID válido."] }`          |
| `401`  | No autorizado (sin JWT)     | `{ "message": "Unauthorized" }`                                  |
| `500`  | Error interno del servidor | `{ "message": "Error interno del servidor." }`                       |

**Controller:** `SolicitudesController.verificarPrevia(@Body() payload: VerificarSolicitudPreviaDto)`

**Service:** `SolicitudesService.verificarSolicitudPrevia(estudianteId: string, tutorId: string, horarios: Array<{ fecha: string; hora: string }>): Promise<boolean>`

**DTO Request:** `VerificarSolicitudPreviaDto`

**DTO Response:** `VerificarSolicitudPreviaResponseDto`

---

### 3. POST `/api/solicitudes`

**Descripción:**
Crea una nueva solicitud de tutoría por parte de un estudiante a un tutor, asociada a una oferta específica y a los horarios seleccionados. Incluye un mensaje para el tutor y, opcionalmente, la modalidad de la tutoría si la oferta lo permite.

**Autenticación:**
✅ Requerida (`JWT` - Se espera un `Bearer Token` en el encabezado `Authorization`).

**Parámetros de Ruta:**
Ninguno

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición (`CreateSolicitudDto`):**

| Campo           | Tipo                               | Requerido | Descripción                                                                                                                                                                                                           |
| :-------------- | :--------------------------------- | :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `estudianteId`  | `string` (UUID)                    | Sí         | ID del estudiante que realiza la solicitud. Se obtiene de la sesión JWT.                                                                                                                                              |
| `tutorId`       | `string` (UUID)                    | Sí         | ID del tutor al que se le solicita la tutoría.                                                                                                                                                                        |
| `ofertaId`      | `string` (UUID)                    | Sí         | ID de la oferta de tutoría a la que se asocia la solicitud.                                                                                                                                                            |
| `mensaje`       | `string`                           | Sí         | **CA: Mensaje Obligatorio:** Mensaje del estudiante para el tutor. **CA: Bloqueo por Límite Máximo:** Máximo 500 caracteres.                                                                                              |
| `modalidad`     | `'virtual'` \| `'presencial'`      | Condicional | **CA: Modalidad Obligatoria (Dual):** Requerido si la `ofertaId` corresponde a una oferta con modalidad dual (`virtual/presencial`). Opcional si la oferta tiene una única modalidad.                                    |
| `horarios`      | `Array<{ fecha: string; hora: string }>` | Sí         | **CA: Solicitud Exitosa:** Lista de horarios seleccionados para la tutoría. Debe contener al menos un horario.                                                                                                      |
| `horarios[].fecha` | `string` (YYYY-MM-DD)            | Sí         | Fecha del horario seleccionado (ej. "2024-03-09").                                                                                                                                                                    |
| `horarios[].hora`  | `string` (HH:MM)                 | Sí         | Hora del horario seleccionado (ej. "14:00").                                                                                                                                                                          |

```json
// Ejemplo de Request Body para una oferta con modalidad DUAL, seleccionando "Virtual"
{
  "estudianteId": "b1c2d3e4-f5a6-7890-1234-567890fedcba",
  "tutorId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "ofertaId": "e6a0a8e0-2d8e-4a7b-8c7c-0a2a4b8c7c7c",
  "mensaje": "Necesito repasar integrales para mi examen final. ¿Podríamos enfocarnos en eso?",
  "modalidad": "virtual",
  "horarios": [
    { "fecha": "2024-03-15", "hora": "10:00" }
  ]
}

// Ejemplo de Request Body para una oferta con modalidad ÚNICA (ej. presencial), sin enviar "modalidad"
{
  "estudianteId": "b1c2d3e4-f5a6-7890-1234-567890fedcba",
  "tutorId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "ofertaId": "f7b1c2d3-e4f5-6789-0123-456789abcdef",
  "mensaje": "Requiero ayuda urgente con este tema para mi examen.",
  "horarios": [
    { "fecha": "2024-03-12", "hora": "16:00" }
  ]
}
```

**Respuesta Exitosa (201 Created):**

**CA: Solicitud Exitosa (Una Modalidad) & Solicitud Exitosa (Dual Modalidad):** El backend devuelve la entidad `SolicitudEntity` creada con el estado inicial `PENDIENTE`.

```json
{
  "id": "c0d1e2f3-a4b5-6789-0123-456789abcdef",
  "estudianteId": "b1c2d3e4-f5a6-7890-1234-567890fedcba",
  "tutorId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "ofertaId": "e6a0a8e0-2d8e-4a7b-8c7c-0a2a4b8c7c7c",
  "mensaje": "Necesito repasar integrales para mi examen final. ¿Podríamos enfocarnos en eso?",
  "modalidad": "virtual",
  "horarios": [
    { "fecha": "2024-03-15", "hora": "10:00" }
  ],
  "estado": "pendiente",
  "fechaCreacion": "2024-03-08T18:30:00.000Z",
  "fechaActualizacion": "2024-03-08T18:30:00.000Z"
}
```

**Respuesta de Error:**

| Código | Descripción                 | Ejemplo                                                                                                                                                                                           |
| :----- | :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `400`  | Datos de entrada inválidos  | `{ "message": ["El mensaje es obligatorio."] }`<br>`{ "message": ["Selecciona la modalidad."] }`<br>`{ "message": ["El mensaje no debe exceder los 500 caracteres."] }`<br>**CA: Mensaje Y Modalidad Obligatorios (Dual):** `{ "message": ["Selecciona la modalidad (virtual o presencial).", "El mensaje es obligatorio."]} ` |
| `401`  | No autorizado (sin JWT)     | `{ "message": "Unauthorized" }`                                                                                                                                                                   |
| `404`  | Oferta no encontrada        | `{ "message": "La oferta de tutoría especificada no existe." }`                                                                                                                                     |
| `500`  | Error interno del servidor | `{ "message": "Error interno del servidor." }`                                                                                                                                                      |

**Controller:** `SolicitudesController.create(@Body() createSolicitudDto: CreateSolicitudDto)`

**Service:** `SolicitudesService.create(createSolicitudDto: CreateSolicitudDto): Promise<SolicitudEntity>`

**DTO Request:** `CreateSolicitudDto`

**DTO Response:** `SolicitudEntity`