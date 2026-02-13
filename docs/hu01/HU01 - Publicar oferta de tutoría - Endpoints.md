# Documentación de Endpoints - HU01 - Publicar oferta de tutoría

---

### Resumen de la Historia de Usuario

**HU:** HU01 - Publicar oferta de tutoría
**Descripción:** Como tutor, quiero publicar que domino una materia, para atraer estudiantes interesados.
**Criterios de Aceptación:**
*   **Publicación Exitosa:** Un tutor puede crear una oferta de tutoría con todos los campos válidos (Título, Precio, Modalidad, Categorías, Descripción) y el sistema la publica, mostrando un mensaje de éxito.
*   **Validaciones de Campos:** El sistema bloquea la publicación si campos como 'Título', 'Precio', 'Categorías' o 'Descripción' están vacíos, tienen formatos inválidos o no cumplen con límites de longitud (min/max caracteres, min/max categorías).
*   **Gestión de Modal:** El tutor puede cancelar la creación de la oferta cerrando la modal con el botón 'Cancelar' o el botón 'X', regresando al Dashboard.
*   **Límites Visuales:** El UI implementa truncado y contadores para límites de caracteres (Título 80, Descripción 250) y categorías (máx. 5).

---

### Tabla de Endpoints

| # | Método | Ruta Completa | Descripción | Autenticación | Controller | Service | DTO Request | DTO Response |
| - | ------ | ------------- | ----------- | ------------- | ---------- | ------- | ----------- | ------------ |
| 1 | POST | /api/ofertas | Publica una nueva oferta de tutoría | No requerida | OfertasController.create() | OfertasService.create() | CreateOfertaDto | OfertaEntity (o similar) |

---

### Detalle de Cada Endpoint

### 1. POST /api/ofertas

**Descripción:**
Permite a un tutor publicar una nueva oferta de tutoría en el sistema. La solicitud incluye los detalles de la oferta como título, precio por hora, modalidad, categorías y una descripción. Los datos son validados en el servidor mediante el Server Action de Next.js y el `CreateOfertaDto` de NestJS.

**Autenticación:**
❌ No requerida (según los diagramas proporcionados, aunque en un sistema real se esperaría autenticación de tutor).

**Parámetros de Ruta:**
Ninguno

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**
El cuerpo de la petición debe ser un objeto JSON que cumpla con la estructura de `CreateOfertaDto`.

```json
{
  "title": "Cálculo Vectorial",
  "price": 10,
  "modality": "Presencial",
  "categories": ["Matemáticas"],
  "description": "Se enseñará cálculo vectorial, incluyendo integrales de línea y superficie."
}
```

**DTO Request:** `CreateOfertaDto`

| Campo | Tipo | Requerido | Restricciones | Descripción |
| :---- | :--- | :-------- | :------------ | :---------- |
| `title` | `string` | Sí | `IsString`, `IsNotEmpty`, `MinLength(3)`, `MaxLength(80)` | Título de la oferta (ej. "Cálculo Vectorial"). |
| `price` | `number` | Sí | `IsNumber`, `IsPositive`, `Min(5)` | Precio por hora de tutoría en USD. |
| `modality` | `string` | Sí | `IsString`, `IsNotEmpty` | Modalidad de la tutoría (ej. "Presencial", "Virtual"). |
| `categories` | `string[]` | Sí | `IsArray`, `IsString(each)`, `ArrayMinSize(1)`, `ArrayMaxSize(5)` | Lista de categorías a las que pertenece la oferta (ej. ["Matemáticas", "Física"]). |
| `description` | `string` | Sí | `IsString`, `IsNotEmpty`, `MinLength(20)`, `MaxLength(250)` | Descripción detallada de lo que incluye la oferta. |

**Respuesta Exitosa (201 Created):**
Retorna un objeto con el estado de la operación, un mensaje y los datos de la oferta creada, incluyendo un ID único.

```json
{
  "statusCode": 201,
  "message": "Oferta creada exitosamente",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "title": "Cálculo Vectorial",
    "price": 10,
    "modality": "Presencial",
    "categories": ["Matemáticas"],
    "description": "Se enseñará cálculo vectorial, incluyendo integrales de línea y superficie.",
    "createdAt": "2023-10-27T10:30:00.000Z",
    "updatedAt": "2023-10-27T10:30:00.000Z"
  }
}
```

**DTO Response:** `OfertaEntity` (estructura de la entidad persistida en la base de datos).

**Respuestas de Error:**
La `createOfertaAction` del frontend procesa los errores del backend y los retorna en una estructura consistente para el UI.

| Código HTTP | Descripción | Ejemplo de Respuesta (retornada por `createOfertaAction` al frontend) |
| :---------- | :---------- | :------------------------------------------------------------------ |
| `400 Bad Request` | **Errores de validación:** Los datos de la petición no cumplen con las reglas de validación definidas en `CreateOfertaDto` o en el Server Action. | ```json<br>{<br>  "success": false,<br>  "message": "Validación fallida",<br>  "errors": {<br>    "title": "El título de la oferta debe tener al menos 3 caracteres.",<br>    "price": "El precio mínimo por hora es de $5.",<br>    "description": "La descripción de la oferta debe tener al menos 20 caracteres."<br>  }<br>}``` |
| `409 Conflict` | **Conflicto de recursos:** Se intenta crear una oferta que ya existe con un criterio único (por ejemplo, el mismo tutor intenta crear otra oferta con el mismo título). | ```json<br>{<br>  "success": false,<br>  "message": "Ya existe una oferta con este título."<br>}``` |
| `500 Internal Server Error` | **Error interno del servidor:** Un error inesperado ocurrió durante el procesamiento de la petición en el backend. | ```json<br>{<br>  "success": false,<br>  "message": "Ocurrió un error inesperado."<br>}``` |

**Controller:** `OfertasController.create(@Body() createOfertaDto: CreateOfertaDto)`

**Service:** `OfertasService.create(createOfertaDto: CreateOfertaDto)`