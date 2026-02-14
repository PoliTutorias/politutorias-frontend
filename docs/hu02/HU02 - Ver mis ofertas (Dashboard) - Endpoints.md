# Documentación de Endpoints - HU02 - Ver mis ofertas (Dashboard)

---

### 2. Resumen de la Historia de Usuario

HU: HU02 - Ver mis ofertas (Dashboard)
Descripción: Como tutor, quiero ver un listado de las ofertas de tutoría que he publicado para saber qué tutorías estoy ofreciendo.
Criterios de Aceptación:
*   Visualización de Oferta Publicada: Si el tutor tiene ofertas, la página muestra el título 'Mis Ofertas de Tutorías', el botón '+ Nueva Oferta', y una tarjeta por cada oferta con sus detalles (título, ícono presencial, descripción, etiquetas y precio).
*   Redirección a Creación de Oferta: Al hacer clic en '+ Nueva Oferta' (o '+ Crear mi primera oferta'), se visualiza un modal para la creación de una nueva oferta.
*   Visualización de Estado Vacío: Si el tutor no tiene ofertas, la página muestra el título 'Mis Ofertas de Tutorías', el botón '+ Nueva Oferta', y un mensaje central indicando "No tienes ofertas activas" con un botón '+ Crear mi primera oferta'.

---

### 3. Tabla de Endpoints

| # | Método | Ruta Completa                 | Descripción                                   | Autenticación | Controller                      | Service                         | DTO Request | DTO Response           |
| - | ------ | ----------------------------- | --------------------------------------------- | ------------- | ------------------------------- | ------------------------------- | ----------- | ---------------------- |
| 1 | GET    | /api/tutor/:tutorId/ofertas | Obtiene un listado de ofertas de tutoría de un tutor específico | No requerida  | OfertasController.findAllByTutorId | OfertasService.findAllByTutorId | -           | ApiResponse<OfertaDto[]> |

---

### 4. Detalle de Cada Endpoint

### 1. GET /api/tutor/:tutorId/ofertas

**Descripción:**
Obtiene un listado de todas las ofertas de tutoría publicadas por un tutor específico. Si el tutor no tiene ofertas, devuelve un arreglo vacío. Esta funcionalidad es clave para la visualización en el dashboard del tutor.

**Autenticación:**
❌ No requerida
_**Nota:** Aunque en un entorno de producción este endpoint debería estar protegido por autenticación (ej. JWT), los diagramas y el código proporcionado omiten explícitamente el uso de guardias (`JwtAuthGuard`) para esta HU. Se asume que el `tutorId` se gestiona por contexto de la sesión o token de alguna manera, pero no se valida explícitamente a nivel de API para esta HU._

**Parámetros de Ruta:**

| Parámetro | Tipo   | Requerido | Descripción                                      |
| --------- | ------ | --------- | ------------------------------------------------ |
| tutorId   | string | Sí        | El identificador único (UUID) del tutor.         |

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**
No aplica (método GET)

**Respuesta Exitosa (200 OK):**
Retorna un objeto `ApiResponse` que contiene un arreglo de `OfertaDto` si hay ofertas, o un arreglo vacío si el tutor no ha publicado ninguna oferta.

```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      "title": "Cálculo en una Variable",
      "description": "Me enfoco en ejercicios de MRU y aplicaciones de derivadas e integrales.",
      "isPresencial": true,
      "pricePerHour": 10.00,
      "tags": [
        "Matemática",
        "Formación Básica",
        "Preparación de Exámenes",
        "Resolución de Ejercicios",
        "Laboratorios"
      ]
    },
    {
      "id": "f5e4d3c2-b1a0-9876-5432-10fedcba9876",
      "title": "Física I - Cinemática y Dinámica",
      "description": "Clases personalizadas para entender los principios de la mecánica clásica.",
      "isPresencial": false,
      "pricePerHour": 12.50,
      "tags": [
        "Física",
        "Ingeniería",
        "Resolución de Problemas"
      ]
    }
  ]
}
```

**Respuesta Exitosa (200 OK) - Sin ofertas:**
Retorna un objeto `ApiResponse` con un arreglo vacío en `data`, indicando que el tutor no tiene ofertas activas.

```json
{
  "statusCode": 200,
  "data": []
}
```

**Respuesta de Error:**

| Código | Descripción                                      | Ejemplo                                                      |
| ------ | ------------------------------------------------ | ------------------------------------------------------------ |
| 500    | Error interno del servidor o fallo de conexión.  | `{ "statusCode": 500, "message": "Error interno del servidor al obtener ofertas.", "error": "Database connection error" }` |

**Controller:** `OfertasController.findAllByTutorId(@Param('tutorId') tutorId: string)`

**Service:** `OfertasService.findAllByTutorId(tutorId: string)`

**DTO Response:** `ApiResponse<OfertaDto[]>`

```typescript
// Definición de DTO para la respuesta
interface OfertaDto {
  id: string;
  title: string;
  description: string;
  isPresencial: boolean;
  pricePerHour: number;
  tags: string[];
}

interface ApiResponse<T> {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
}
```