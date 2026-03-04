# Documentación de Endpoints - HU27 - Filtrar ofertas por precio

---

### Resumen de la Historia de Usuario
**HU**: HU27 - Filtrar ofertas por precio
**Descripción**: Como estudiante, quiero filtrar las ofertas por precio para encontrar opciones que se ajusten a mi presupuesto.
**Criterios de Aceptación**:
*   **Filtrado Exitoso por Precio**: El listado de ofertas se actualiza mostrando solo las que están dentro del rango de precio seleccionado.
*   **Filtrado Sin Coincidencias**: La lista de ofertas se vacía y se muestra el mensaje 'No se encontraron ofertas. Intenta ajustar tus filtros de búsqueda.'.

---

### Tabla de Endpoints

| # | Método | Ruta Completa | Descripción | Autenticación | Controller | Service | DTO Request | DTO Response |
| - | ------ | ------------- | ----------- | ------------- | ---------- | ------- | ----------- | ------------ |
| 1 | GET | /api/ofertas | Obtiene un listado de ofertas de tutoría, permitiendo filtrar por rango de precio. | No requerida | OfertasController.getOfertas | OfertasService.findFilteredOfertas | FilterQueryParams | OfertasResult |

---

### Detalle de Endpoints

#### 1. GET /api/ofertas
**Descripción**:
Obtiene un listado de ofertas de tutoría que pueden ser filtradas por un rango de precio (mínimo y/o máximo).

**Autenticación**:
❌ No requerida (para esta funcionalidad específica, basada en los diagramas y el código proporcionado).

**Parámetros de Ruta**:
Ninguno

**Parámetros de Consulta**:
| Parámetro | Tipo   | Requerido | Descripción | Validaciones |
| --------- | ------ | --------- | ----------- | ------------ |
| minPrice  | number | No        | Precio mínimo para el filtro de ofertas. | `IsNumber`, `Min(0)` |
| maxPrice  | number | No        | Precio máximo para el filtro de ofertas. | `IsNumber`, `IsPositive` |

**Cuerpo de la Petición**:
No aplica (método GET)

**Respuesta Exitosa (200 OK)**:
```json
{
  "ofertas": [
    {
      "id": "clx4v7m7e0000y1nkhm2k8s2e",
      "titulo": "Clases de Cálculo Diferencial",
      "carrera": "Ingeniería de Sistemas",
      "modalidad": "Presencial",
      "descripcion": "Tutorías personalizadas para cálculo diferencial. Preparación para exámenes y resolución de ejercicios.",
      "lugarReunion": "Biblioteca Central UNMSM",
      "precio": 15.00,
      "tutor": {
        "id": "clx4v7m7e0001y1nkhm2k8s2e",
        "nombre": "Juan Pérez",
        "fotoUrl": "https://example.com/juan_perez.jpg",
        "contacto": "juan.perez@example.com"
      },
      "imagenRepresentativaUrl": "https://example.com/calculo_diferencial.jpg"
    },
    {
      "id": "clx4v7m7e0002y1nkhm2k8s2f",
      "titulo": "Ayuda con Álgebra Lineal",
      "carrera": "Ciencias de la Computación",
      "modalidad": "Virtual",
      "descripcion": "Refuerzo en álgebra lineal para estudiantes universitarios. Vectores, matrices y transformaciones.",
      "lugarReunion": "Google Meet",
      "precio": 18.50,
      "tutor": {
        "id": "clx4v7m7e0003y1nkhm2k8s2g",
        "nombre": "María García",
        "fotoUrl": "https://example.com/maria_garcia.jpg",
        "contacto": "maria.garcia@example.com"
      },
      "imagenRepresentativaUrl": "https://example.com/algebra_lineal.jpg"
    }
  ],
  "total": 2
}
```

**Respuesta de Error**:
| Código | Descripción | Ejemplo |
| ------ | ----------- | ------- |
| 400 | Parámetros de consulta inválidos (ej. `minPrice` no es número, `maxPrice` no es positivo, `minPrice > maxPrice`). | `{ "statusCode": 400, "message": ["minPrice debe ser un número válido."], "error": "Bad Request" }` |
| 500 | Error interno del servidor. | `{ "statusCode": 500, "message": "Fallo en la comunicación con el servidor.", "error": "Internal Server Error" }` |

**Controller**: `OfertasController.getOfertas(@Query(new ValidationPipe({ transform: true })) filterParams: FilterQueryParams)`

**Service**: `OfertasService.findFilteredOfertas(filterParams: FilterQueryParams)`

**DTO Request**: `FilterQueryParams`
```typescript
// src/common/dtos/filter-query-params.dto.ts
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterQueryParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'minPrice debe ser un número válido.' })
  @Min(0, { message: 'minPrice no puede ser negativo.' })
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'maxPrice debe ser un número válido.' })
  @IsPositive({ message: 'maxPrice debe ser un número positivo.' })
  maxPrice?: number;
}
```

**DTO Response**: `OfertasResult` (representando el objeto retornado)
```typescript
// Estructura inferida de la respuesta
export interface OfertaEntity {
  id: string;
  titulo: string;
  carrera: string;
  modalidad: string;
  descripcion: string;
  lugarReunion: string;
  precio: number;
  tutor: {
    id: string;
    nombre: string;
    fotoUrl: string;
    contacto: string;
  };
  imagenRepresentativaUrl: string;
}

export interface OfertasResult {
  ofertas: OfertaEntity[];
  total: number;
}
```