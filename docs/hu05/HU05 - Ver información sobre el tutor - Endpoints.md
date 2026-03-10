# Documentación de Endpoints - HU05 - Ver información sobre el tutor

---

### Resumen de la Historia de Usuario

**HU:** HU05 - Ver información sobre el tutor.md
**Descripción:** Como estudiante, quiero ver la información del tutor para saber que conocimientos tiene.
**Criterios de Aceptación:**
*   Al visualizar los detalles de una oferta, se muestran las secciones "Sobre el Tutor" y "Experiencia".
*   La sección "Sobre el Tutor" incluye la imagen de perfil, nombre, información académica (ej: 'FIM - Mecánica ☁️ 9° Semestre'), descripción bibliográfica y materias dominadas como tags (ej: 'Cálculo Vectorial').
*   La sección "Experiencia" muestra un historial con el rol, institución/lugar y fechas (ej: 'Ayudante de Cátedra - Estática, EPN, Facultad de Mecánica, 2024 — Presente').

---

### Tabla de Endpoints

| # | Método | Ruta Completa          | Descripción                                                                          | Autenticación | Controller                 | Service                  | DTO Request | DTO Response    |
| - | ------ | ---------------------- | ------------------------------------------------------------------------------------ | ------------- | -------------------------- | ------------------------ | ----------- | --------------- |
| 1 | GET    | /api/offers/:id        | Obtiene los detalles de una oferta específica, incluyendo perfil y experiencia del tutor. | No requerida  | OffersController.findOne() | OffersService.findOne()  | -           | OfferDetailsDto |

---

### Detalle de Endpoints

#### 1. GET /api/offers/:id

**Descripción:**
Este endpoint permite a un estudiante obtener los detalles completos de una oferta de tutoría específica, incluyendo la información detallada del tutor que la imparte (su perfil, biografía, materias que domina) y su historial de experiencia laboral o académica. Esta información es crucial para que el estudiante evalúe los conocimientos y la trayectoria del tutor.

**Autenticación:**
❌ No requerida. Este endpoint es accesible públicamente para cualquier estudiante que navegue a una página de detalle de oferta.

**Parámetros de Ruta:**

| Parámetro | Tipo   | Requerido | Descripción                      |
| --------- | ------ | --------- | -------------------------------- |
| `id`      | string | Sí        | ID único de la oferta de tutoría |

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**
No aplica (método GET).

**Respuesta Exitosa (200 OK):**
Retorna un objeto `OfferDetailsDto` que contiene la información de la oferta y los datos anidados del tutor y sus experiencias.

```json
{
  "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  "title": "Tutoría de Cálculo Vectorial y Física I",
  "description": "Ofrezco tutorías personalizadas en Cálculo Vectorial, Física I y Estática para estudiantes de ingeniería. Mi metodología se centra en la comprensión de conceptos y resolución de problemas prácticos.",
  "pricePerHour": 15.50,
  "tutor": {
    "id": "tutor-uuid-12345",
    "name": "Juan Pérez",
    "academicInfo": "FIM - Mecánica ☁️ 9° Semestre",
    "biography": "Soy un apasionado por la mecánica y las matemáticas aplicadas, con experiencia en ayudar a estudiantes a superar sus retos académicos. Mi objetivo es simplificar conceptos complejos y fomentar el pensamiento crítico.",
    "subjects": [
      "Cálculo Vectorial",
      "Física I",
      "Estática",
      "Dinámica",
      "Termodinámica"
    ],
    "rating": 4.8,
    "reviewCount": 25,
    "profileImageUrl": "https://example.com/images/juan_perez_profile.jpg"
  },
  "tutorExperiences": [
    {
      "role": "Ayudante de Cátedra - Estática",
      "institution": "EPN, Facultad de Mecánica",
      "startDate": "2024-01-15",
      "endDate": "Presente"
    },
    {
      "role": "Tutor Particular - Cálculo y Física",
      "institution": "Independiente",
      "startDate": "2023-05-01",
      "endDate": "Presente"
    },
    {
      "role": "Investigador Asistente",
      "institution": "Laboratorio de Materiales Avanzados, EPN",
      "startDate": "2022-09-01",
      "endDate": "2023-04-30"
    }
  ]
}
```

**Respuesta de Error:**

| Código | Descripción                                 | Ejemplo                                                                |
| ------ | ------------------------------------------- | ---------------------------------------------------------------------- |
| `404`  | Oferta no encontrada. El ID proporcionado no corresponde a ninguna oferta existente. | `{ "statusCode": 404, "message": "Offer with ID \"{id}\" not found.", "error": "Not Found" }` |
| `500`  | Error interno del servidor. Se produjo un problema inesperado en el servidor. | `{ "statusCode": 500, "message": "Internal server error", "error": "Internal Server Error" }` |

**Controller:** `OffersController.findOne(@Param('id') id: string)`

**Service:** `OffersService.findOne(id: string)`

**DTO Response:** `OfferDetailsDto`

```typescript
// src/offers/dto/offer-details.dto.ts
import { IsString, IsNotEmpty, IsNumber, ValidateNested, IsArray, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { TutorProfileDto } from './tutor-profile.dto';
import { ExperienceEntryDto } from './experience-entry.dto';

export class OfferDetailsDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  pricePerHour: number;

  // Otros campos de la oferta pueden ir aquí si son relevantes para el frontend,
  // aunque la HU se enfoca en el tutor.

  @ValidateNested()
  @Type(() => TutorProfileDto)
  tutor: TutorProfileDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceEntryDto)
  tutorExperiences: ExperienceEntryDto[];
}

// src/offers/dto/tutor-profile.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUrl, IsArray } from 'class-validator';

export class TutorProfileDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  academicInfo: string; // Ej: "FIM - Mecánica ☁️ 9° Semestre"

  @IsString()
  @IsOptional()
  biography?: string;

  @IsArray()
  @IsString({ each: true })
  subjects: string[]; // Ej: ['Cálculo Vectorial', 'Física I']

  @IsNumber()
  @IsOptional()
  rating?: number; // Ej: 4.8

  @IsNumber()
  @IsOptional()
  reviewCount?: number; // Ej: 15

  @IsUrl()
  @IsOptional()
  profileImageUrl?: string;
}

// src/offers/dto/experience-entry.dto.ts
import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class ExperienceEntryDto {
  @IsString()
  @IsNotEmpty()
  role: string; // Ej: 'Ayudante de Cátedra - Estática'

  @IsString()
  @IsNotEmpty()
  institution: string; // Ej: 'EPN, Facultad de Mecánica' o 'Independiente'

  @IsDateString()
  startDate: string; // Ej: '2024-01-01'

  @IsString() // Se cambia a string para permitir 'Presente'
  @IsOptional()
  endDate?: string; // Ej: 'Presente' o '2024-12-31'
}
```