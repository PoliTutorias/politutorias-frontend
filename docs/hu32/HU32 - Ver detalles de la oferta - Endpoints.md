# Documentación de Endpoints - HU32 - Ver detalles de la oferta

---

### Resumen de la Historia de Usuario

**HU:** HU32 - Ver detalles de la oferta.md
**Descripción:** Como estudiante, quiero ver los detalles de una oferta para tomar una decisión informada.
**Criterios de Aceptación:** El estudiante debe poder visualizar información detallada de una oferta, incluyendo el título de la materia ('Cálculo Vectorial'), modalidad ('Virtual y Presencial'), una descripción de la clase, categorías ('Matemática', 'Formación Básica'), disponibilidad semanal (e.g., Lunes 14:00-15:00), y el precio por hora ($10). Se incluye un botón para volver a la lista de ofertas.

---

### Tabla de Endpoints

| # | Método | Ruta Completa      | Descripción                           | Autenticación | Controller                  | Service                 | DTO Request | DTO Response     |
| - | ------ | ------------------ | ------------------------------------- | ------------- | --------------------------- | ----------------------- | ----------- | ---------------- |
| 1 | GET    | /api/ofertas/:id   | Obtiene detalles de una oferta específica | No requerida  | OffersController.findOne() | OffersService.findOne() | -           | DetallesOfertaDto |

---

### Detalle de Cada Endpoint

### 1. GET /api/ofertas/:id

**Descripción:**
Obtiene los detalles completos de una oferta de tutoría específica, incluyendo la información asociada al tutor, sus categorías, disponibilidad y experiencia.

**Autenticación:**
❌ No requerida

**Parámetros de Ruta:**

| Parámetro | Tipo   | Requerido | Descripción                                  |
| :-------- | :----- | :-------- | :------------------------------------------- |
| `id`      | string | Sí        | ID único (UUID) de la oferta de tutoría. |

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**
No aplica (método GET)

**Respuesta Exitosa (200 OK):**

```json
{
  "id": "string (UUID)",
  "title": "string (Ej: Cálculo Vectorial)",
  "modality": "string (Ej: Virtual y Presencial)",
  "description": "string (Ej: Descripción de la clase)",
  "categories": [
    {
      "name": "string (Ej: Matemática)"
    },
    {
      "name": "string (Ej: Formación Básica)"
    }
  ],
  "availability": [
    {
      "day": "string (Ej: Lunes)",
      "time": "string (Ej: 14:00 - 15:00)"
    },
    {
      "day": "string (Ej: Miércoles)",
      "time": "string (Ej: 14:00 - 15:00)"
    },
    {
      "day": "string (Ej: Viernes)",
      "time": "string (Ej: 09:00 - 10:00)"
    }
  ],
  "pricePerHour": "number (Ej: 10)",
  "tutor": {
    "id": "string (UUID)",
    "name": "string (Ej: Juan Pérez)",
    "career": "string (Ej: FIM - Mecánica)",
    "semester": "string (Ej: 9° Semestre)",
    "rating": "number (Ej: 4.8)",
    "reviewsCount": "number (Ej: 15)",
    "description": "string (Ej: Descripción del tutor)",
    "masteredSubjects": [
      {
        "name": "string (Ej: Cálculo Diferencial)"
      },
      {
        "name": "string (Ej: Álgebra Lineal)"
      }
    ],
    "experience": [
      {
        "position": "string (Ej: Profesor Auxiliar)",
        "institution": "string (Ej: Universidad Politécnica Nacional)",
        "period": "string (Ej: 2020-2022)"
      }
    ],
    "phoneNumber": "string (Ej: +5939XXXXXXXX)"
  }
}
```

**Respuesta de Error:**

| Código | Descripción                                 | Ejemplo                                                       |
| :----- | :------------------------------------------ | :------------------------------------------------------------ |
| 404    | Oferta o tutor asociado no encontrado. | `{ "statusCode": 404, "message": "Offer with ID \"{id}\" not found" }` <br> `{ "statusCode": 404, "message": "Tutor for offer ID \"{id}\" not found" }` |
| 500    | Error interno del servidor.             | `{ "statusCode": 500, "message": "Internal server error" }` |

**Controller:** `OffersController.findOne(@Param('id', ParseUUIDPipe) id: string)`

**Service:** `OffersService.findOne(id: string)`

**DTO Response:** `DetallesOfertaDto`