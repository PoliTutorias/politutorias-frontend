# Documentación de Endpoints - HU40 - Ver historial de tutorías recibidas

---

### Resumen de la Historia de Usuario

**HU:** HU40 - Ver historial de tutorías recibidas

**Descripción:** Como estudiante, quiero ver mi historial de tutorías recibidas para recordar tutores anteriores y revisar mi progreso.

**Criterios de Aceptación:**
*   Al ingresar a la pestaña "Historial", se listan solo las tutorías en estado "Completada" e "Inasistencia".
*   Se permite la navegación por paginación (páginas específicas, siguiente, anterior).
*   Al hacer clic en una tarjeta de tutoría, se abre un modal con los detalles de la sesión.
*   El modal de detalle muestra la etiqueta de estado ("Completada" o "Inasistencia") y solo el botón "Cerrar". (El botón "Calificar" y otras funcionalidades son descartadas para esta HU, como se especifica en las observaciones).

---

### Tabla de Endpoints

| # | Método | Ruta Completa | Descripción | Autenticación | Controller | Service | DTO Request | DTO Response |
| - | ------ | ------------- | ----------- | ------------- | ---------- | ------- | ----------- | ------------ |
| 1 | GET | `/api/tutorias/historial` | Obtiene el historial paginado y filtrado de tutorías recibidas por el estudiante. | JWT (JwtAuthGuard) | TutoriasController.getHistorial | TutoriasService.findHistorialByStudent | HistorialQueryParams | ApiResponse<TutoriaHistorialListDTO[]> |
| 2 | GET | `/api/tutorias/:id` | Obtiene los detalles completos de una tutoría específica del historial del estudiante. | JWT (JwtAuthGuard) | TutoriasController.getDetalle | TutoriasService.findOneTutoriaDetalle | - | ApiResponse<TutoriaDetalleDTO> |

---

### Detalle de Cada Endpoint

#### 1. GET `/api/tutorias/historial`

**Descripción:**
Obtiene un listado paginado del historial de tutorías recibidas por el estudiante autenticado. El listado se filtra por defecto para incluir solo las tutorías con estado "Completada" e "Inasistencia". Permite ordenar los resultados por fecha y especificar el número de página y elementos por página.

**Autenticación:**
✅ Requerida (JWT - `JwtAuthGuard`)
El usuario debe enviar un token de autorización JWT válido en el encabezado `Authorization: Bearer <token>`.

**Parámetros de Ruta:**
Ninguno

**Parámetros de Consulta:**
| Parámetro | Tipo | Requerido | Valor por Defecto | Descripción |
| --------- | ---- | -------- | ----------------- | ----------- |
| `page` | `number` | No | `1` | Número de página a recuperar. |
| `limit` | `number` | No | `10` | Cantidad de elementos por página. |
| `orderBy` | `string` | No | `fecha` | Campo por el cual ordenar los resultados (ej. `fecha`). |
| `orderDirection` | `string` | No | `desc` | Dirección de ordenamiento (`asc` para ascendente, `desc` para descendente). |
| `status` | `string[]` | No | `['COMPLETADA', 'INASISTENCIA']` | Filtro por el estado de las tutorías. **Para esta HU40, los valores predeterminados son 'COMPLETADA' e 'INASISTENCIA'.** Puede repetirse el parámetro para enviar múltiples estados. |

**Cuerpo de la Petición:**
No aplica (método GET)

**Respuesta Exitosa (200 OK):**
Retorna un objeto `ApiResponse` que contiene un array de `TutoriaHistorialListDTO` y metadatos de paginación.

```json
{
  "success": true,
  "data": [
    {
      "id": "tutoria_id_123",
      "materia": "Programación Orientada a Objetos",
      "tutor": {
        "id": "tutor_id_456",
        "nombre": "Juan",
        "apellido": "Pérez",
        "fotoUrl": "https://example.com/fotos/juan.jpg"
      },
      "fecha": "2023-10-26T10:00:00.000Z",
      "hora": "14:00",
      "estado": "COMPLETADA"
    },
    {
      "id": "tutoria_id_124",
      "materia": "Cálculo Diferencial",
      "tutor": {
        "id": "tutor_id_457",
        "nombre": "Maria",
        "apellido": "García",
        "fotoUrl": "https://example.com/fotos/maria.jpg"
      },
      "fecha": "2023-10-25T10:00:00.000Z",
      "hora": "10:30",
      "estado": "INASISTENCIA"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10
}
```

**Respuesta de Error:**
| Código | Descripción | Ejemplo |
| ------ | ----------- | ------- |
| 401 | No autorizado | `{ "message": "Unauthorized" }` |
| 500 | Error interno del servidor | `{ "message": "Error inesperado al procesar la solicitud." }` |

**Controller:** `TutoriasController.getHistorial(@CurrentUser() user: User, @Query() query: HistorialQueryParams)`

**Service:** `TutoriasService.findHistorialByStudent(studentId: string, query: HistorialQueryParams)`

**DTO Response:** `ApiResponse<TutoriaHistorialListDTO[]>`

---

#### 2. GET `/api/tutorias/:id`

**Descripción:**
Obtiene los detalles completos de una tutoría específica, identificada por su ID, siempre y cuando pertenezca al historial del estudiante autenticado.

**Autenticación:**
✅ Requerida (JWT - `JwtAuthGuard`)
El usuario debe enviar un token de autorización JWT válido en el encabezado `Authorization: Bearer <token>`.

**Parámetros de Ruta:**
| Parámetro | Tipo | Requerido | Descripción |
| --------- | ---- | -------- | ----------- |
| `id` | `string` | Sí | ID único de la tutoría a consultar. |

**Parámetros de Consulta:**
Ninguno

**Cuerpo de la Petición:**
No aplica (método GET)

**Respuesta Exitosa (200 OK):**
Retorna un objeto `ApiResponse` que contiene la `TutoriaDetalleDTO` de la tutoría.

```json
{
  "success": true,
  "data": {
    "id": "tutoria_id_123",
    "materia": "Programación Orientada a Objetos",
    "tutor": {
      "id": "tutor_id_456",
      "nombre": "Juan",
      "apellido": "Pérez",
      "fotoUrl": "https://example.com/fotos/juan.jpg"
    },
    "fecha": "2023-10-26T10:00:00.000Z",
    "hora": "14:00",
    "modalidad": "Virtual",
    "precioPorHora": 15.50,
    "enlaceReunion": "https://zoom.us/j/1234567890",
    "ubicacion": null,
    "mensajeEstudiante": "Necesito ayuda con los patrones de diseño.",
    "estado": "COMPLETADA",
    "resena": { // 'resena' es opcional y solo se incluye si existe y la tutoría está completada
      "calificacion": 5,
      "comentario": "Excelente explicación de los temas complejos.",
      "fechaCreacion": "2023-10-27T12:00:00.000Z"
    }
  }
}
```
**Ejemplo de respuesta con estado 'INASISTENCIA' (sin reseña):**
```json
{
  "success": true,
  "data": {
    "id": "tutoria_id_124",
    "materia": "Cálculo Diferencial",
    "tutor": {
      "id": "tutor_id_457",
      "nombre": "Maria",
      "apellido": "García",
      "fotoUrl": "https://example.com/fotos/maria.jpg"
    },
    "fecha": "2023-10-25T10:00:00.000Z",
    "hora": "10:30",
    "modalidad": "Presencial",
    "precioPorHora": 12.00,
    "enlaceReunion": null,
    "ubicacion": "Aula 305",
    "mensajeEstudiante": "Dudas con integrales indefinidas.",
    "estado": "INASISTENCIA"
    // 'resena' no se incluye ya que no aplica o no existe
  }
}
```

**Respuesta de Error:**
| Código | Descripción | Ejemplo |
| ------ | ----------- | ------- |
| 401 | No autorizado | `{ "message": "Unauthorized" }` |
| 404 | Tutoría no encontrada o no pertenece al estudiante | `{ "message": "Tutoría no encontrada o no pertenece al estudiante." }` |
| 500 | Error interno del servidor | `{ "message": "Error inesperado al procesar la solicitud." }` |

**Controller:** `TutoriasController.getDetalle(@Param('id') id: string, @CurrentUser() user: User)`

**Service:** `TutoriasService.findOneTutoriaDetalle(tutoriaId: string, studentId: string)`

**DTO Response:** `ApiResponse<TutoriaDetalleDTO>`