# Documentación de Endpoints - HU03 - Ver ofertas de tutorías

## Resumen de la Historia de Usuario
**HU:** HU03 - Ver ofertas de tutorías
**Descripción:** Como estudiante, quiero revisar la oferta de tutorías, para encontrar la que mejor se adapte a mis necesidades.
**Criterios de Aceptación:**
*   **Visualización de Ofertas - Página 1:** Al revisar la lista por primera vez, se visualizan 10 tarjetas de oferta con detalles como título ('Cálculo Vectorial'), precio ('$10/h'), modalidad ('Virtual/Presencial'), etiquetas ('Matemática', 'Formación Básica'), tutor ('Juan Pérez' con foto), y calificación ('4.8 (15)'). La cabecera muestra '13 resultados' y los controles de paginación muestran '< 1 2 >' con '1' activo.
*   **Visualización de Ofertas - Página 2:** Al hacer clic en el botón de paginación '2', la lista de ofertas se actualiza mostrando las tarjetas correspondientes a los resultados 11 al 13, y los controles de paginación reflejan el cambio con '2' activo y '1' inactivo.

## Tabla de Endpoints

| # | Método | Ruta Completa | Descripción | Autenticación | Controller | Service | DTO Request | DTO Response |
| - | ------ | ------------- | ----------- | ------------- | ---------- | ------- | ----------- | ------------ |
| 1 | GET | /api/offers | Obtiene una lista paginada y filtrada de ofertas de tutorías. | No requerida | OffersController.findAll() | OffersService.findAll() | OfferQueryDto | PaginatedOffersResponse |

## Detalle de Cada Endpoint

### 1. GET /api/offers
**Descripción:**
Este endpoint permite a los estudiantes obtener una lista de ofertas de tutorías. Soporta paginación y varios parámetros de consulta para filtrar los resultados, como modalidad, área de conocimiento, rango de precios y criterios de ordenamiento.

**Autenticación:**
❌ No requerida

**Parámetros de Ruta:**
Ninguno

**Parámetros de Consulta:**
| Parámetro | Tipo | Requerido | Descripción | Validaciones |
| --------- | ---- | -------- | ----------- | ------------ |
| `page` | `number` | Opcional | Número de página de los resultados a recuperar. | `@IsInt()`, `@Min(1)`. Por defecto: `1`. |
| `limit` | `number` | Opcional | Cantidad máxima de ofertas por página. | `@IsInt()`, `@Min(1)`, `@Max(100)`. Por defecto: `10`. |
| `modality` | `string` | Opcional | Filtra ofertas por modalidad. Ejemplos: `'Virtual'`, `'Presencial'`, `'Ambos'`. | `@IsString()` |
| `areaConocimiento` | `string[]` | Opcional | Filtra ofertas por una o más áreas de conocimiento/etiquetas. | `@IsArray()`, `@IsString({ each: true })` |
| `minPrice` | `number` | Opcional | Precio mínimo por hora de la tutoría. | `@IsInt()`, `@Min(0)` |
| `maxPrice` | `number` | Opcional | Precio máximo por hora de la tutoría. | `@IsInt()`, `@Min(0)` |
| `sortBy` | `string` | Opcional | Campo por el cual ordenar los resultados. Ejemplos: `'price'`, `'rating'`, `'date'`. | `@IsString()` |
| `sortOrder` | `'asc' \| 'desc'` | Opcional | Orden de clasificación. `'asc'` para ascendente, `'desc'` para descendente. | `@IsString()`, solo `'asc'` o `'desc'`. |

**Cuerpo de la Petición:**
No aplica (método GET)

**Respuesta Exitosa (200 OK):**
```json
{
  "offers": [
    {
      "id": "uuid-oferta-1",
      "title": "Cálculo Vectorial",
      "price": 10,
      "modality": "Virtual/Presencial",
      "description": "Clases personalizadas de cálculo vectorial para estudiantes universitarios.",
      "tags": ["Matemática", "Formación Básica", "Cálculo"],
      "rating": 4.8,
      "reviewsCount": 15,
      "tutor": {
        "id": "uuid-tutor-juan",
        "name": "Juan Pérez",
        "photo": "https://example.com/photos/juan_perez.jpg"
      }
    },
    {
      "id": "uuid-oferta-2",
      "title": "Álgebra Lineal Avanzada",
      "price": 12,
      "modality": "Virtual",
      "description": "Tutorías intensivas en álgebra lineal para niveles avanzados.",
      "tags": ["Matemática", "Ingeniería"],
      "rating": 4.5,
      "reviewsCount": 10,
      "tutor": {
        "id": "uuid-tutor-maria",
        "name": "María García",
        "photo": "https://example.com/photos/maria_garcia.jpg"
      }
    },
    // ... 8 ofertas más para la página 1
  ],
  "totalResults": 13,
  "currentPage": 1,
  "itemsPerPage": 10,
  "totalPages": 2
}
```

**Respuesta de Error:**
| Código | Descripción | Ejemplo |
| ------ | ----------- | ------- |
| 400 | Parámetros de consulta inválidos. | `{ "statusCode": 400, "message": ["page must not be less than 1", "limit must not be greater than 100"], "error": "Bad Request" }` |
| 500 | Error interno del servidor. | `{ "statusCode": 500, "message": "Failed to fetch offers", "error": "Internal Server Error" }` |

**Controller:** `OffersController.findAll(@Query() query: OfferQueryDto)`

**Service:** `OffersService.findAll(query: OfferQueryDto)`

**DTO Request:** `OfferQueryDto`
```typescript
// src/offers/dto/offer-query.dto.ts
import { IsOptional, IsInt, Min, Max, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class OfferQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  modality?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  areaConocimiento?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxPrice?: number;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';
}
```

**DTO Response:** `PaginatedOffersResponse`
```typescript
// src/offers/interfaces/paginated-offers-response.interface.ts
export interface PaginatedOffersResponse {
  offers: OfferResponseDto[];
  totalResults: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
}

export interface OfferResponseDto {
  id: string;
  title: string;
  price: number;
  modality: string;
  description: string;
  tags: string[]; // Etiquetas como 'Matemática', 'Formación Básica'
  rating: number;
  reviewsCount: number;
  tutor: {
    id: string;
    name: string;
    photo: string; // URL de la foto del tutor
  };
  // ... otros campos relevantes para la UI de una oferta
}
```