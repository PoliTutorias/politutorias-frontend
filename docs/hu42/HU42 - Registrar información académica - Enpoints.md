# Documentación de Endpoints - HU42 - Registrar información académica

---

### Resumen de la Historia de Usuario

**HU:** HU42 - Registrar información académica
**Descripción:** Como tutor, quiero registrar información académica para que los estudiantes se enteren cuáles son mis conocimientos.
**Criterios de Aceptación:**
*   **Ignorar Guardar Experiencia Vacía:** La acción de guardar se ignora si todos los campos de 'Nueva Experiencia' están vacíos, manteniendo el modal en pantalla.
*   **Validar Formato de Fecha MM/AAAA:** Las fechas deben validarse y mantenerse en formato MM/AAAA.
*   **Bloquear Caracteres No-Numéricos en Fecha:** Solo se permiten números en los campos de fecha, y la palabra 'Presente' en 'Fecha Fin'.
*   **Validar Máximo Caracteres en Fecha:** Se muestra un error si las fechas exceden los 7 caracteres (MM/AAAA).
*   **Añadir Materia como Etiqueta:** Al agregar una materia, se limpia el campo y se crea una etiqueta visual interactiva.
*   **Finalización Exitosa del Registro:** Al hacer clic en 'Finalizar Registro', el proceso se completa exitosamente y se muestra una pantalla de confirmación.
*   **Navegabilidad hacia atrás: Del Paso 3 al 2:** Al usar los botones de navegación 'Atrás', se redirige al Paso 2 conservando la disponibilidad previamente seleccionada.

---

### Tabla de Endpoints

| # | Método | Ruta Completa          | Descripción                                        | Autenticación | Controller                    | Service                     | DTO Request        | DTO Response           |
| - | ------ | ---------------------- | -------------------------------------------------- | ------------- | ----------------------------- | --------------------------- | ------------------ | ---------------------- |
| 1 | POST   | /api/experiencias      | Registra una nueva experiencia académica del tutor | No requerida  | ExperienciasController.add()  | ExperienciasService.add()   | ExperienciaDto     | ExperienciaEntity      |
| 2 | POST   | /api/perfil/finalizar  | Finaliza el registro del perfil profesional del tutor | No requerida  | PerfilController.finalizar()  | PerfilService.finalizar()   | PerfilProfesionalDto | PerfilProfesionalEntity |

---

### Detalle de Cada Endpoint

#### 1. POST /api/experiencias

**Descripción:**
Este endpoint permite al tutor registrar una nueva experiencia académica o profesional como parte de su perfil. La información de la experiencia se envía y se persiste en la base de datos.

**Autenticación:**
❌ No requerida (según la ausencia de `JwtAuthGuard` explícito en los diagramas para este controller).

**Parámetros de Ruta:**
Ninguno

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**
Se espera un objeto JSON que cumpla con la estructura de `ExperienciaDto`.

```typescript
// src/dtos/experiencia.dto.ts
import { IsString, IsNotEmpty, IsOptional, Matches, MaxLength } from 'class-validator';

export class ExperienciaDto {
  @IsString()
  @IsNotEmpty({ message: 'El puesto es requerido.' })
  puesto: string;

  @IsString()
  @IsNotEmpty({ message: 'La institución es requerida.' })
  institucion: string;

  @IsString()
  @Matches(/^(0[1-9]|1[0-2])\/\d{4}$/, { message: 'Formato de fecha MM/AAAA inválido para fecha de inicio.' })
  @MaxLength(7, { message: 'Máximo 7 caracteres para fecha de inicio (MM/AAAA).' })
  @IsNotEmpty({ message: 'La fecha de inicio es requerida.' })
  fechaInicio: string; // Formato: MM/AAAA

  @IsString()
  @IsOptional()
  @Matches(/^((0[1-9]|1[0-2])\/\d{4}|Presente)$/, { message: 'Formato de fecha MM/AAAA o "Presente" inválido para fecha de fin.' })
  @MaxLength(9, { message: 'Máximo 7 caracteres (MM/AAAA) o "Presente" (8 caracteres).' })
  fechaFin?: string; // Formato: MM/AAAA o la palabra "Presente"
}
```

**Ejemplo de Cuerpo de Petición:**
```json
{
  "puesto": "Profesor de Cálculo I",
  "institucion": "Universidad Nacional",
  "fechaInicio": "08/2020",
  "fechaFin": "Presente"
}
```

**Respuesta Exitosa (201 Created):**
Retorna el objeto `ExperienciaEntity` que representa la experiencia recién creada en la base de datos.

```typescript
// src/experiencias/experiencia.entity.ts
export class ExperienciaEntity {
    id: number;
    puesto: string;
    institucion: string;
    fechaInicio: string;
    fechaFin?: string;
    tutorId: string; // Relación con el tutor
}
```

**Ejemplo de Respuesta Exitosa:**
```json
{
  "id": 123,
  "puesto": "Profesor de Cálculo I",
  "institucion": "Universidad Nacional",
  "fechaInicio": "08/2020",
  "fechaFin": "Presente",
  "tutorId": "a1b2c3d4e5f6g7h8i9j0"
}
```

**Respuestas de Error:**

| Código | Descripción                                      | Ejemplo                                                               |
| ------ | ------------------------------------------------ | --------------------------------------------------------------------- |
| 400    | Validación de campos fallida (Bad Request)       | `{ "statusCode": 400, "message": ["El puesto es requerido."], "error": "Bad Request" }` |
| 500    | Error interno del servidor                       | `{ "statusCode": 500, "message": "Internal server error" }`           |

**Controller:** `ExperienciasController.add(@Body() experienciaDto: ExperienciaDto)`
**Service:** `ExperienciasService.add(experienciaDto: ExperienciaDto)`
**DTO Request:** `ExperienciaDto`
**DTO Response:** `ExperienciaEntity`

---

#### 2. POST /api/perfil/finalizar

**Descripción:**
Este endpoint se utiliza para finalizar el proceso de registro del perfil profesional del tutor. Recibe todas las experiencias y materias recopiladas y las persiste de manera definitiva en el perfil del tutor.

**Autenticación:**
❌ No requerida (según la ausencia de `JwtAuthGuard` explícito en los diagramas para este controller).

**Parámetros de Ruta:**
Ninguno

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**
Se espera un objeto JSON que cumpla con la estructura de `PerfilProfesionalDto`, conteniendo arrays de experiencias y materias.

```typescript
// src/dtos/perfil-profesional.dto.ts
import { IsArray, ValidateNested, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ExperienciaDto } from './experiencia.dto';

export class PerfilProfesionalDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienciaDto)
  @IsOptional()
  experiencias?: ExperienciaDto[]; // Array de experiencias (opcional si el tutor no añade)

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  materias?: string[]; // Array de strings para las materias (opcional si el tutor no añade)
}
```

**Ejemplo de Cuerpo de Petición:**
```json
{
  "experiencias": [
    {
      "puesto": "Profesor de Cálculo I",
      "institucion": "Universidad Nacional",
      "fechaInicio": "08/2020",
      "fechaFin": "Presente"
    },
    {
      "puesto": "Asistente de Laboratorio",
      "institucion": "Instituto Tecnológico",
      "fechaInicio": "03/2018",
      "fechaFin": "12/2019"
    }
  ],
  "materias": [
    "Cálculo",
    "Física",
    "Álgebra Lineal"
  ]
}
```

**Respuesta Exitosa (200 OK):**
Retorna el objeto `PerfilProfesionalEntity` que confirma la persistencia del perfil completo.

```typescript
// src/perfil/perfil-profesional.entity.ts
import { ExperienciaEntity } from '../experiencias/experiencia.entity';

export class PerfilProfesionalEntity {
    id: string; // ID del tutor
    experiencias?: ExperienciaEntity[];
    materias?: string[];
    fechaRegistro: Date;
    // Otros campos del perfil del tutor, si existieran
}
```

**Ejemplo de Respuesta Exitosa:**
```json
{
  "id": "a1b2c3d4e5f6g7h8i9j0",
  "experiencias": [
    {
      "id": 123,
      "puesto": "Profesor de Cálculo I",
      "institucion": "Universidad Nacional",
      "fechaInicio": "08/2020",
      "fechaFin": "Presente",
      "tutorId": "a1b2c3d4e5f6g7h8i9j0"
    },
    {
      "id": 124,
      "puesto": "Asistente de Laboratorio",
      "institucion": "Instituto Tecnológico",
      "fechaInicio": "03/2018",
      "fechaFin": "12/2019",
      "tutorId": "a1b2c3d4e5f6g7h8i9j0"
    }
  ],
  "materias": [
    "Cálculo",
    "Física",
    "Álgebra Lineal"
  ],
  "fechaRegistro": "2024-03-15T10:00:00.000Z"
}
```

**Respuestas de Error:**

| Código | Descripción                                      | Ejemplo                                                               |
| ------ | ------------------------------------------------ | --------------------------------------------------------------------- |
| 400    | Validación de campos fallida (Bad Request)       | `{ "statusCode": 400, "message": ["experiencias debe ser un array."], "error": "Bad Request" }` |
| 500    | Error interno del servidor                       | `{ "statusCode": 500, "message": "Internal server error" }`           |

**Controller:** `PerfilController.finalizar(@Body() perfilProfesionalDto: PerfilProfesionalDto)`
**Service:** `PerfilService.finalizar(perfilProfesionalDto: PerfilProfesionalDto)`
**DTO Request:** `PerfilProfesionalDto`
**DTO Response:** `PerfilProfesionalEntity`