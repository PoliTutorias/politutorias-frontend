# Documentación de Endpoints - HU17 - Buscar tutoría por título de la oferta

---

### 2. Resumen de la Historia de Usuario

**HU:** HU17 - Buscar tutoría por título de la oferta.md
**Descripción:** Como estudiante, quiero buscar una tutoría por el título de la oferta o por el nombre del tutor para encontrar resultados específicos rápidamente en la interfaz "Encuentra tu Tutoría".
**Criterios de Aceptación:**
*   La búsqueda exitosa por un término (ej. 'Cálculo') filtra la lista de ofertas, actualiza el contador de resultados y muestra las tarjetas coincidentes.
*   Si no hay coincidencias (ej. 'Astronomía'), el contador muestra "0 resultados", se oculta la lista y se muestra un mensaje "No se encontraron ofertas".
*   Una búsqueda con el campo vacío muestra todas las ofertas disponibles (ej. "13 resultados") y las ordena por defecto.

---

### 3. Tabla de Endpoints

| # | Método | Ruta Completa      | Descripción                                                | Autenticación | Controller                  | Service                     | DTO Request        | DTO Response           |
| - | ------ | ------------------ | ---------------------------------------------------------- | ------------- | --------------------------- | --------------------------- | ------------------ | ---------------------- |
| 1 | GET    | /api/ofertas       | Busca y pagina ofertas de tutoría por título o nombre del tutor | No requerida  | OfertasController.findAll() | OfertasService.searchOffers() | OffersQueryParams  | PaginatedOffersResponse |

---

### 4. Detalle de Cada Endpoint

#### 1. GET /api/ofertas
**Descripción:**
Obtiene una lista paginada de ofertas de tutoría, permitiendo filtrar por un término de búsqueda que coincida con el título de la oferta (materia) o el nombre del tutor. Si el término de búsqueda está vacío, devuelve todas las ofertas paginadas.

**Autenticación:**
❌ No requerida

**Parámetros de Ruta:**
Ninguno

**Parámetros de Consulta:**
| Parámetro  | Tipo   | Requerido | Descripción                                                              | Valores por defecto |
| ---------- | ------ | -------- | ------------------------------------------------------------------------ | ------------------- |
| `searchTerm` | `string` | No       | Término de búsqueda para filtrar ofertas por título o nombre del tutor. | `undefined`         |
| `page`     | `string` | No       | Número de página de resultados a recuperar (ej. '1', '2').               | `'1'`               |
| `limit`    | `string` | No       | Cantidad de resultados por página (ej. '10', '20').                    | `'10'`              |

**Cuerpo de la Petición:**
No aplica (método GET)

**Respuesta Exitosa (200 OK):**
```json
{
  "items": [
    {
      "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      "titulo": "Cálculo Diferencial",
      "descripcion": "Clases personalizadas de cálculo diferencial y aplicaciones.",
      "precioHora": 15.50,
      "modalidad": "Presencial",
      "lugarReunion": "Cafetería Central, Campus Principal",
      "carrera": "Ingeniería de Sistemas",
      "imagenRepresentativaUrl": "https://example.com/calculo-diferencial.jpg",
      "createdAt": "2023-10-26T10:00:00Z",
      "tutor": {
        "id": "tutor-123",
        "nombre": "Juan Pérez",
        "fotoUrl": "https://example.com/tutor-juan.jpg"
      }
    },
    {
      "id": "b1c2d3e4-f5a6-7890-1234-567890abcdef",
      "titulo": "Programación Orientada a Objetos",
      "descripcion": "Ayuda con conceptos POO en Java y Python.",
      "precioHora": 18.00,
      "modalidad": "Virtual",
      "lugarReunion": null,
      "carrera": "Ciencias de la Computación",
      "imagenRepresentativaUrl": "https://example.com/poo.jpg",
      "createdAt": "2023-10-25T14:30:00Z",
      "tutor": {
        "id": "tutor-456",
        "nombre": "Ana García",
        "fotoUrl": "https://example.com/tutor-ana.jpg"
      }
    }
  ],
  "totalResults": 2,
  "page": 1,
  "limit": 10
}
```

**Ejemplos de Respuesta exitosa (200 OK) según Criterios de Aceptación:**

*   **Búsqueda Exitosa por Materia (ej. `searchTerm=Cálculo`, `page=1`, `limit=10`):**
    ```json
    {
      "items": [
        {
          "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
          "titulo": "Cálculo Diferencial",
          "descripcion": "Clases personalizadas de cálculo diferencial y aplicaciones.",
          "precioHora": 15.50,
          "modalidad": "Presencial",
          "lugarReunion": "Cafetería Central, Campus Principal",
          "carrera": "Ingeniería de Sistemas",
          "imagenRepresentativaUrl": "https://example.com/calculo-diferencial.jpg",
          "createdAt": "2023-10-26T10:00:00Z",
          "tutor": {
            "id": "tutor-123",
            "nombre": "Juan Pérez",
            "fotoUrl": "https://example.com/tutor-juan.jpg"
          }
        },
        {
          "id": "c5d6e7f8-a9b0-1234-5678-90abcdef0123",
          "titulo": "Cálculo Vectorial",
          "descripcion": "Conceptos avanzados de cálculo vectorial.",
          "precioHora": 17.00,
          "modalidad": "Virtual",
          "lugarReunion": null,
          "carrera": "Física",
          "imagenRepresentativaUrl": "https://example.com/calculo-vectorial.jpg",
          "createdAt": "2023-10-24T09:00:00Z",
          "tutor": {
            "id": "tutor-789",
            "nombre": "Luisa Martínez",
            "fotoUrl": "https://example.com/tutor-luisa.jpg"
          }
        }
      ],
      "totalResults": 2,
      "page": 1,
      "limit": 10
    }
    ```

*   **Búsqueda sin Coincidencias (ej. `searchTerm=Astronomía`, `page=1`, `limit=10`):**
    ```json
    {
      "items": [],
      "totalResults": 0,
      "page": 1,
      "limit": 10
    }
    ```

*   **Búsqueda con Campo Vacío (ej. `searchTerm=`, `page=1`, `limit=10`):**
    ```json
    {
      "items": [
        { /* Primera oferta por defecto */ },
        { /* Segunda oferta por defecto */ },
        // ... hasta 10 ofertas por defecto
      ],
      "totalResults": 13,
      "page": 1,
      "limit": 10
    }
    ```

**Respuesta de Error:**
| Código | Descripción                                      | Ejemplo                                                               |
| ------ | ------------------------------------------------ | --------------------------------------------------------------------- |
| 400    | Parámetros de consulta inválidos (ej. `page < 1`) | `{"statusCode": 400, "message": ["La página debe ser al menos 1"], "error": "Bad Request"}` |
| 500    | Error interno del servidor al procesar la búsqueda | `{"statusCode": 500, "message": "Internal server error"}`             |

**Controller:** `OfertasController.findAll(@Query(new ValidationPipe({ transform: true, whitelist: true })) query: OffersQueryParams)`

**Service:** `OfertasService.searchOffers(query: OffersQueryParams)`

**DTO Response:** `PaginatedOffersResponse` (contiene una lista de `OfertaEntity` y metadatos de paginación)