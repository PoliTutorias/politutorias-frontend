# Documentación de Endpoints - HU22 - Ver reseñas sobre el tutor

---

### 1. Resumen de la Historia de Usuario

**HU:** HU22 - Ver reseñas sobre el tutor
**Descripción:** Como estudiante, quiero ver las reseñas sobre un tutor para tomar una decisión informada antes de agendar.
**Criterios de Aceptación:**
*   Al navegar a la sección 'Reseñas de Estudiantes' de la pantalla de detalle de oferta del tutor, el sistema debe mostrar un consolidado general de calificaciones, un gráfico de barras porcentuales, y un listado inicial de hasta 3 reseñas individuales.
*   Si existen más de 3 reseñas, el estudiante puede hacer clic en 'Ver más reseñas' para expandir la lista, cargando comentarios adicionales y actualizando un contador dinámico.

---

### 2. Tabla de Endpoints

| # | Método | Ruta Completa                 | Descripción                                   | Autenticación | Controller                    | Service                     | DTO Request        | DTO Response           |
| - | ------ | ----------------------------- | --------------------------------------------- | ------------- | ----------------------------- | --------------------------- | ------------------ | ---------------------- |
| 1 | GET    | /api/tutors/:tutorId/reviews | Obtiene las reseñas y el resumen de un tutor | No requerida  | ReviewsController.getTutorReviews | ReviewsService.findTutorReviews | ReviewQueryParams | PaginatedReviewsResponse |

---

### 3. Detalle de Cada Endpoint

#### 1. GET /api/tutors/:tutorId/reviews

**Descripción:**
Este endpoint permite a un estudiante obtener una lista paginada de reseñas, junto con un resumen de calificaciones, para un tutor específico. La lista de reseñas puede ser ordenada y filtrada según los parámetros de consulta.

**Autenticación:**
❌ No requerida (Acceso público para visualizar reseñas).

**Parámetros de Ruta:**

| Parámetro | Tipo   | Requerido | Descripción                            |
| :-------- | :----- | :-------- | :------------------------------------- |
| tutorId   | string | Sí        | ID único del tutor cuyas reseñas se desean obtener. |

**Parámetros de Consulta:**

| Parámetro    | Tipo    | Requerido | Valor por defecto | Descripción                                                               | Validaciones                                        |
| :----------- | :------ | :-------- | :---------------- | :------------------------------------------------------------------------ | :-------------------------------------------------- |
| page         | number  | No        | 1                 | Número de la página actual de resultados.                                 | `>= 1`, entero                                      |
| limit        | number  | No        | 5                 | Cantidad máxima de reseñas por página.                                    | `>= 1`, `<= 20`, entero                             |
| sortBy       | string  | No        | 'date'            | Criterio para ordenar las reseñas.                                        | `'date'` (más recientes), `'rating'` (más valoradas) |
| ratingFilter | string  | No        | 'all'             | Filtro para mostrar reseñas de una calificación específica o todas.       | `'all'`, `'5'`, `'4'`, `'3'`, `'2'`, `'1'`          |

**Cuerpo de la Petición:**
No aplica (método GET).

**Respuesta Exitosa (200 OK):**
```json
{
  "reviews": [
    {
      "id": "uuid-reseña-1",
      "studentName": "Ana García",
      "studentAvatarUrl": "https://example.com/avatar_ana.jpg",
      "date": "2023-10-26T10:00:00.000Z",
      "stars": 5,
      "tutoringSubject": "Matemáticas Básicas",
      "comment": "¡Excelente tutoría! El profesor explicó muy bien y resolvió todas mis dudas."
    },
    {
      "id": "uuid-reseña-2",
      "studentName": "Carlos López",
      "studentAvatarUrl": "https://example.com/avatar_carlos.jpg",
      "date": "2023-10-20T14:30:00.000Z",
      "stars": 4,
      "tutoringSubject": "Introducción a la Programación",
      "comment": "Muy buena clase, aunque me hubiera gustado un poco más de práctica."
    },
    {
      "id": "uuid-reseña-3",
      "studentName": "Sofía Hernández",
      "studentAvatarUrl": null,
      "date": "2023-10-15T09:00:00.000Z",
      "stars": 5,
      "tutoringSubject": "Física I",
      "comment": "El tutor es muy paciente y didáctico. Recomiendo al 100%."
    }
  ],
  "summary": {
    "avgRating": 4.7,
    "totalReviews": 8,
    "starDistribution": {
      "5": 63,
      "4": 25,
      "3": 12,
      "2": 0,
      "1": 0
    }
  },
  "total": 8,
  "page": 1,
  "limit": 3
}
```

**Respuesta de Error:**

| Código | Descripción                                      | Ejemplo                                                              |
| :----- | :----------------------------------------------- | :------------------------------------------------------------------- |
| 400    | Petición inválida (ej. parámetros de consulta erróneos) | `{ "message": "Validation failed (numeric string is expected for page)" }` |
| 404    | Tutor no encontrado                               | `{ "message": "Tutor con ID 'abc-123' no encontrado." }`                  |
| 500    | Error interno del servidor                       | `{ "message": "Error interno del servidor." }`                       |

**Controller:** `ReviewsController.getTutorReviews(@Param('tutorId') tutorId: string, @Query() queryParams: ReviewQueryParams)`

**Service:** `ReviewsService.findTutorReviews(tutorId: string, queryParams: ReviewQueryParams)`

**DTO Request:** `ReviewQueryParams`

**DTO Response:** `PaginatedReviewsResponse`