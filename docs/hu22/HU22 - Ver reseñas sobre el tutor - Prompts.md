---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed para `PaginatedReviewsResponse` HU_NUMBER: HU22 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Crear un archivo de seed que contenga datos de ejemplo para la respuesta paginada de reseñas (`PaginatedReviewsResponse`), incluyendo el resumen de calificaciones (`ReviewSummaryDto`) y las reseñas individuales (`ReviewDto`). Este seed simulará la respuesta del backend y permitirá el desarrollo independiente del frontend.

Objetivo: Definir y exportar datos de ejemplo realistas para la paginación de reseñas de tutores, cumpliendo con la estructura de DTOs esperada.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/interfaces/reviews/review-dtos.ts` (para definir las interfaces `ReviewDto`, `ReviewSummaryDto`, `PaginatedReviewsResponse`, `StarDistributionItem`)
*   `src/interfaces/reviews/review-query-params.ts` (para definir la interfaz `ReviewQueryParams`)
*   `src/seed/TutorReviewsSeedData.ts`

Tecnologías: Next.js 16, TypeScript, Tailwind CSS 4.

Estructura:
*   `ReviewDto`: `id: string`, `studentName: string`, `studentAvatarUrl: string | null`, `date: string` (ISO format), `stars: number` (1-5), `tutoringSubject: string`, `comment: string`.
*   `StarDistributionItem`: `stars: number`, `percentage: number`.
*   `ReviewSummaryDto`: `avgRating: number`, `totalReviews: number`, `starDistribution: StarDistributionItem[]`, `metrics: { totalAppointments: number; completedHours: number; averageResponseTime: number; }` (as per prototype).
*   `PaginatedReviewsResponse`: `data: ReviewDto[]`, `page: number`, `limit: number`, `total: number`, `summary: ReviewSummaryDto`.
*   `ReviewQueryParams`: `tutorId: string`, `page?: number`, `limit?: number`, `sortBy?: 'date' | 'stars'`, `ratingFilter?: 'all' | '1' | '2' | '3' | '4' | '5'`.
*   El seed `tutorReviewsSeed` debe ser una constante exportada que simule la primera página de una respuesta paginada (ej. `limit: 3`, `page: 1`) y contenga entre 5 y 8 reseñas en total para probar la paginación.

Validaciones: Los datos del seed deben ser coherentes y realistas para probar la interfaz de usuario.

Diseño: Ninguno, es una tarea de datos.

Integración: El seed debe ser fácilmente importable por las Server Actions.

Criterios de Aceptación Técnica:
*   Las interfaces `ReviewDto`, `ReviewSummaryDto`, `PaginatedReviewsResponse`, `StarDistributionItem` y `ReviewQueryParams` están correctamente definidas en sus archivos TS.
*   El archivo `src/seed/TutorReviewsSeedData.ts` existe y exporta una constante `tutorReviewsSeed`.
*   `tutorReviewsSeed` es un objeto `PaginatedReviewsResponse` que contiene al menos 5-8 reseñas de ejemplo.
*   La estructura de `tutorReviewsSeed` coincide exactamente con las interfaces definidas.
*   El seed incluye un resumen de calificaciones (`avgRating`, `totalReviews`, `starDistribution` con porcentajes coherentes).
*   Los datos de las reseñas individuales son variados y representativos.
---END_PROMPT---

---START_COMMIT--- HU22-T01 chore(seed): crear seed para PaginatedReviewsResponse ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Implementación de Server Actions (`fetchTutorReviews` helper, `LoadReviewsAction`, `UpdateReviewsAction`) con seed HU_NUMBER: HU22 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Implementar las Server Actions `LoadReviewsAction` y `UpdateReviewsAction`, junto con la función auxiliar `fetchTutorReviews`, que inicialmente retornarán el seed data creado en la Tarea 1. El código para la integración real con el backend (`fetch`) debe estar presente pero COMENTADO, preparado para la Tarea 7.

Objetivo: Crear Server Actions funcionales que simulen la carga y paginación de reseñas utilizando datos de seed, proporcionando una base para la integración futura con el backend.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/actions/tutor-reviews/reviews-actions.ts`
*   `src/seed/TutorReviewsSeedData.ts` (import)
*   `src/interfaces/reviews/review-dtos.ts` (import)
*   `src/interfaces/reviews/review-query-params.ts` (import)

Tecnologías: Next.js 16, React, TypeScript.

Estructura:
*   El archivo `src/actions/tutor-reviews/reviews-actions.ts` debe estar marcado con `'use server'`.
*   **`fetchTutorReviews(params: ReviewQueryParams)` (función auxiliar):**
    *   Debe aceptar `ReviewQueryParams` (tutorId, page, limit, sortBy, ratingFilter).
    *   **Fase de Desarrollo (Activa):** Retornar una porción de `tutorReviewsSeed` que simule la paginación según `page` y `limit` recibidos. Asegurarse de que `summary` y `total` del `PaginatedReviewsResponse` se mantengan consistentes con el seed completo. Puede incluir un `await new Promise(resolve => setTimeout(resolve, 500));` para simular latencia de red.
    *   **Fase de Integración (Comentada):** Escribir el bloque `try-catch` completo para la petición `fetch` al endpoint `GET /api/tutors/:tutorId/reviews`.
        *   Usar `process.env.NEXT_PUBLIC_API_BASE_URL` para construir la URL base.
        *   Construir `URLSearchParams` a partir de `ReviewQueryParams`.
        *   Manejar la respuesta JSON y posibles errores HTTP.
        *   Este bloque debe estar completamente comentado para la Tarea 2.
    *   Retornar un objeto `{ success: boolean, data?: PaginatedReviewsResponse, error?: string }`.
*   **`LoadReviewsAction(tutorId: string)` (Server Action):**
    *   Llamar a `fetchTutorReviews` con `tutorId`, `page: 1`, `limit: 3`, `sortBy: 'date'`, `ratingFilter: 'all'`.
*   **`UpdateReviewsAction(params: ReviewQueryParams)` (Server Action):**
    *   Llamar a `fetchTutorReviews` pasando directamente los `params` recibidos.

Validaciones: Se debe incluir manejo básico de errores (ej. `try-catch`).

Diseño: Ninguno, es una tarea de lógica de backend/servidor.

Integración: Estas Server Actions serán consumidas por componentes de cliente.

Criterios de Aceptación Técnica:
*   `src/actions/tutor-reviews/reviews-actions.ts` existe y tiene `'use server'`.
*   `fetchTutorReviews` está definida y es utilizada por ambas acciones.
*   `LoadReviewsAction` retorna la primera página del seed (`limit: 3`, `page: 1`) junto con el resumen y el total.
*   `UpdateReviewsAction` retorna la página correspondiente del seed según los `params` recibidos.
*   El código de la integración real con el backend (`fetch` y construcción de URL) está presente y completamente comentado.
*   Las funciones retornan un objeto `{ success, data, error }`.
---END_PROMPT---

---START_COMMIT--- HU22-T02 feat(actions): implementar Server Actions con seed para reseñas ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Maquetación de la sección 'Reseñas de Estudiantes' (incluye `ReviewSection`, `RatingSummaryDisplay` con promedio y total, `ReviewListDisplay`, `ReviewCard`) HU_NUMBER: HU22 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Detalle Oferta. ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Implementar la estructura visual principal de la sección de reseñas, incluyendo el componente `ReviewSection` como contenedor, el `RatingSummaryDisplay` para el promedio y el total de reseñas, el `ReviewListDisplay` para el listado de reseñas, y el `ReviewCard` para cada reseña individual. Esto abarca el layout y los estilos básicos, sin el gráfico de barras ni la lógica del botón "Ver más".

Objetivo: Crear los componentes de interfaz de usuario fundamentales para la sección de reseñas, asegurando que se ajusten al diseño del prototipo y sean reutilizables.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/tutor-reviews/review-section/ReviewSection.tsx`
*   `src/components/tutor-reviews/rating-summary-display/RatingSummaryDisplay.tsx`
*   `src/components/tutor-reviews/review-list-display/ReviewListDisplay.tsx`
*   `src/components/tutor-reviews/review-card/ReviewCard.tsx`
*   `src/interfaces/reviews/review-dtos.ts` (para usar las interfaces `ReviewDto`, `ReviewSummaryDto`)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, react-icons, clsx.

Estructura:
*   Todos los componentes deben ser Client Components (`'use client'`).
*   **`ReviewSection` (Molécula/Organismo):** Contenedor principal que orquesta los demás componentes de reseñas. Recibirá `tutorId: string` como prop.
*   **`RatingSummaryDisplay` (Molécula):** Recibirá `summary: ReviewSummaryDto` como prop. Mostrará `avgRating` (con estrellas) y `totalReviews`. Tendrá un layout para integrar el gráfico de barras más tarde.
*   **`ReviewListDisplay` (Organismo):** Recibirá `reviews: ReviewDto[]` como prop. Mapeará sobre `reviews` para renderizar instancias de `ReviewCard`.
*   **`ReviewCard` (Molécula/Átomo):** Recibirá `review: ReviewDto` como prop. Mostrará `studentName`, `studentAvatarUrl` (con un fallback a iniciales si no hay URL), `date`, `stars` (renderizadas como iconos), `tutoringSubject`, `comment`. Utilizará componentes atómicos para estrellas y avatar si existen.

Validaciones: Ninguna de lógica de negocio, solo visual.

Diseño:
*   Referencia al Frame ID `1mAH-3G1AL6eWDFW-Cwk2WiN2OORwc7EE`.
*   Aplicar estilos con Tailwind CSS 4 para replicar el diseño del prototipo.
*   Considerar diseño responsive.
*   Implementar estrellas utilizando iconos (ej. `react-icons`).

Integración: Los componentes se pasarán datos a través de props.

Criterios de Aceptación Técnica:
*   `ReviewSection`, `RatingSummaryDisplay`, `ReviewListDisplay`, `ReviewCard` son creados y maquetados.
*   Los componentes son Client Components.
*   El diseño y la disposición de los elementos visuales coinciden con la sección "Reseñas de Estudiantes" del prototipo (excluyendo el gráfico de barras y el botón "Ver más" por ahora).
*   `RatingSummaryDisplay` muestra el promedio de calificación y el total de reseñas con el formato esperado.
*   `ReviewListDisplay` es capaz de recibir un array de `ReviewDto` y renderiza múltiples `ReviewCard`s.
*   `ReviewCard` muestra todos los campos especificados (`avatar`, `nombre`, `fecha`, `estrellas`, `título oferta`, `comentario`) con estilos apropiados.
*   Las estrellas se representan visualmente (ej. 5 estrellas con las correspondientes rellenas).
---END_PROMPT---

---START_COMMIT--- HU22-T03 feat(ui): maquetar sección de reseñas y subcomponentes ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Implementación del gráfico de barras de distribución de estrellas en `RatingSummaryDisplay` HU_NUMBER: HU22 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Detalle Oferta. ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Añadir el gráfico de barras que muestra la distribución porcentual de estrellas al componente `RatingSummaryDisplay`, utilizando los datos de `starDistribution` del `ReviewSummaryDto`.

Objetivo: Integrar visualmente la distribución de calificaciones por estrellas en el componente `RatingSummaryDisplay` según el diseño del prototipo.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/tutor-reviews/rating-summary-display/RatingSummaryDisplay.tsx`
*   `src/interfaces/reviews/review-dtos.ts` (uso de `StarDistributionItem`)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
*   Modificar `RatingSummaryDisplay` para que reciba `summary.starDistribution: StarDistributionItem[]` como prop.
*   Iterar sobre `starDistribution` para crear 5 barras horizontales, una para cada nivel de estrellas (del 1 al 5).
*   Cada barra debe mostrar: el número de estrellas, la barra visual cuyo ancho se base en el `percentage`, y el texto del porcentaje.

Validaciones: El cálculo del porcentaje debe ser correcto y reflejarse en el ancho de la barra.

Diseño:
*   Referencia al Frame ID `1mAH-3G1AL6eWDFW-Cwk2WiN2OORwc7EE`.
*   Aplicar estilos de Tailwind CSS 4 para que el gráfico de barras se integre fluidamente con el diseño existente de `RatingSummaryDisplay`.
*   Asegurar que las barras sean proporcionales al porcentaje y que las etiquetas sean claras.

Integración: El componente `RatingSummaryDisplay` debe consumir la propiedad `starDistribution` de su prop `summary`.

Criterios de Aceptación Técnica:
*   `RatingSummaryDisplay` renderiza el gráfico de barras de distribución de estrellas.
*   El gráfico muestra 5 barras (para 1 a 5 estrellas).
*   La longitud visual de cada barra es proporcional al porcentaje de `starDistribution`.
*   Las etiquetas de texto para el número de estrellas y el porcentaje se muestran correctamente.
*   El diseño del gráfico es consistente con el prototipo y el resto del componente.
---END_PROMPT---

---START_COMMIT--- HU22-T04 feat(ui): añadir gráfico de barras de estrellas a RatingSummaryDisplay ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Implementación de `PaginationControls` (botón "Ver más reseñas", texto contador y lógica de visibilidad) HU_NUMBER: HU22 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Detalle Oferta. ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Implementar el componente `PaginationControls` que incluirá el botón "Ver más reseñas" y el texto contador dinámico (ej. "Mostrando 3 de 8 reseñas"). Este componente también gestionará la lógica para ocultar el botón cuando se hayan cargado todas las reseñas disponibles.

Objetivo: Crear un componente de control de paginación reutilizable para la sección de reseñas, que permita cargar más elementos y muestre el estado actual de la paginación.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/tutor-reviews/pagination-controls/PaginationControls.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, react-icons.

Estructura:
*   El componente `PaginationControls` debe ser un Client Component (`'use client'`).
*   Recibirá las siguientes props: `currentPage: number`, `limit: number`, `totalReviews: number`, `onLoadMore: () => void`.
*   **Botón "Ver más reseñas":**
    *   Un botón estilizado con texto "Ver más reseñas".
    *   Adjuntar `onClick` a la prop `onLoadMore`.
    *   Ser visible solo si `(currentPage * limit) < totalReviews`.
*   **Texto contador:**
    *   Mostrar el texto "Mostrando X de Y reseñas", donde X es `Math.min(currentPage * limit, totalReviews)` e Y es `totalReviews`.
    *   Utilizar un formato de texto claro y legible.

Validaciones: La lógica de visibilidad del botón y el cálculo del texto contador deben ser precisos.

Diseño:
*   Referencia al Frame ID `1mAH-3G1AL6eWDFW-Cwk2WiN2OORwc7EE`.
*   Aplicar estilos con Tailwind CSS 4 para que el botón y el texto contador se vean profesionales y se integren con la UI.
*   Asegurar que el botón tenga estados de hover/focus adecuados.

Integración: El componente proporcionará la UI para la paginación y emitirá un evento para cargar más datos.

Criterios de Aceptación Técnica:
*   El componente `PaginationControls` existe y es un Client Component.
*   Renderiza el botón "Ver más reseñas" y el texto contador.
*   El texto contador se actualiza dinámicamente mostrando el número correcto de reseñas visibles y el total.
*   El botón "Ver más reseñas" se oculta automáticamente cuando `currentPage * limit >= totalReviews`.
*   Al hacer clic en el botón, se invoca la función `onLoadMore` pasada como prop.
---END_PROMPT---

---START_COMMIT--- HU22-T05 feat(ui): implementar PaginationControls para reseñas ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Integración de `ReviewSection` con Server Actions y manejo de estado local para reseñas HU_NUMBER: HU22 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Detalle Oferta. ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Integrar el componente `ReviewSection` con las Server Actions (`LoadReviewsAction`, `UpdateReviewsAction`) para la carga inicial y la carga de reseñas adicionales. Esto incluye la gestión del estado local (reseñas, página actual, total de reseñas, resumen) dentro de `ReviewSection` y la correcta propagación de datos a los componentes hijos.

Objetivo: Conectar la UI de reseñas con la lógica de carga de datos paginada, gestionando el estado y la interacción entre componentes para cumplir con los criterios de aceptación.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/tutor-reviews/review-section/ReviewSection.tsx`
*   `src/actions/tutor-reviews/reviews-actions.ts` (import de las acciones)
*   `src/app/tutors/[tutorId]/page.tsx` (modificación para renderizar `ReviewSection`)
*   `src/components/tutor-reviews/rating-summary-display/RatingSummaryDisplay.tsx` (recibir `summary` prop)
*   `src/components/tutor-reviews/review-list-display/ReviewListDisplay.tsx` (recibir `reviews` prop)
*   `src/components/tutor-reviews/pagination-controls/PaginationControls.tsx` (recibir `currentPage`, `limit`, `totalReviews`, `onLoadMore` props)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
*   **`ReviewSection` (Client Component):**
    *   Importar y utilizar `useState`, `useEffect` para gestionar el estado de `reviews: ReviewDto[]`, `currentPage: number`, `totalReviews: number`, `reviewSummary: ReviewSummaryDto | null`, `limit: number` (constante, ej. 3), `isLoading: boolean`.
    *   Al montar (`useEffect`), llamar a `LoadReviewsAction(tutorId)` para la carga inicial. Actualizar el estado con la respuesta (primeras 3 reseñas, summary, total, page=1).
    *   Definir la función `handleLoadMore()`:
        *   Incrementar `currentPage`.
        *   Llamar a `UpdateReviewsAction` con el nuevo `currentPage`, `limit`, y `tutorId`.
        *   Al recibir la respuesta, **añadir** las nuevas reseñas al estado `reviews` existente (`setReviews(prev => [...prev, ...newReviews])`).
        *   Actualizar `currentPage` y `totalReviews` (si fuera necesario, aunque `totalReviews` no cambia).
    *   Pasar `reviewSummary` al `RatingSummaryDisplay`.
    *   Pasar `reviews` al `ReviewListDisplay`.
    *   Pasar `currentPage`, `limit`, `totalReviews`, y `handleLoadMore` al `PaginationControls`.
    *   Implementar un estado de carga (`isLoading`) y mostrar un indicador o esqueleto mientras se esperan los datos.
    *   Manejar errores de carga y mostrarlos al usuario.
*   **`src/app/tutors/[tutorId]/page.tsx` (Server Component):**
    *   Renderizar el `ReviewSection` y pasarle el `tutorId` obtenido de los `params` de la ruta.

Validaciones:
*   Asegurar que la carga inicial y las cargas adicionales manejen correctamente los estados de carga y errores.
*   Verificar que la lógica de añadir reseñas y actualizar el contador sea precisa.

Diseño:
*   Referencia al Frame ID `1mAH-3G1AL6eWDFW-Cwk2WiN2OORwc7EE`.
*   Mantener la coherencia visual con Tailwind CSS 4.

Integración:
*   Consumir las Server Actions `LoadReviewsAction` y `UpdateReviewsAction`.
*   Propagar datos y callbacks a los componentes hijos (`RatingSummaryDisplay`, `ReviewListDisplay`, `PaginationControls`).

Criterios de Aceptación Técnica:
*   `ReviewSection` se integra correctamente en `src/app/tutors/[tutorId]/page.tsx`.
*   `ReviewSection` realiza la carga inicial de reseñas al montar, mostrando el resumen y las primeras 3 reseñas utilizando `LoadReviewsAction`.
*   El estado local en `ReviewSection` (`reviews`, `currentPage`, `totalReviews`, `reviewSummary`, `isLoading`) se gestiona correctamente.
*   El botón "Ver más reseñas" en `PaginationControls` invoca `handleLoadMore`, que a su vez llama a `UpdateReviewsAction` con los parámetros correctos.
*   Las reseñas cargadas adicionalmente se añaden a la lista existente, no la sobrescriben.
*   El contador de reseñas y la visibilidad del botón "Ver más reseñas" se actualizan dinámicamente con cada carga.
*   Los datos se pasan correctamente a `RatingSummaryDisplay`, `ReviewListDisplay` y `PaginationControls`.
*   Se muestra un indicador de carga durante las peticiones y se manejan los errores de manera visible al usuario.
---END_PROMPT---

---START_COMMIT--- HU22-T06 feat(integration): integrar ReviewSection con Server Actions y estado ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Integración con backend real (descomentar `fetch` en Server Actions) HU_NUMBER: HU22 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Activar la integración real con el backend NestJS descomentando el código de la petición `fetch` que fue pre-escrito en la función `fetchTutorReviews` de las Server Actions. Esto implica reemplazar el retorno del seed data por la llamada HTTP real al API.

Objetivo: Conectar la aplicación frontend con el backend real para obtener datos de reseñas dinámicamente, pasando de la simulación a la funcionalidad completa.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/actions/tutor-reviews/reviews-actions.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
*   En `src/actions/tutor-reviews/reviews-actions.ts`, dentro de la función `fetchTutorReviews`:
    *   Comentar o eliminar la línea que retorna el `tutorReviewsSeed` o cualquier lógica de simulación de datos.
    *   Descomentar el bloque `try-catch` que contiene la lógica de `fetch`.
    *   Asegurarse de que el `process.env.NEXT_PUBLIC_API_BASE_URL` esté correctamente configurado y sea el punto de acceso al backend.
    *   Verificar que la construcción de la URL (incluyendo `tutorId` y `URLSearchParams` para paginación/filtrado) sea correcta según la especificación del API.
    *   Ajustar el manejo de la respuesta (`response.json()`) y el mapeo a `PaginatedReviewsResponse` si fuera necesario para coincidir con la estructura real del backend.
    *   Reforzar el manejo de errores para capturar y reportar fallos de red o respuestas de error del backend.

Validaciones:
*   La aplicación debe ser capaz de cargar reseñas desde el backend real.
*   La paginación ("Ver más reseñas") debe funcionar también con datos del backend.
*   El manejo de errores debe ser robusto y proporcionar retroalimentación útil si el backend no está disponible o responde con errores.

Diseño: Ninguno, es una tarea de integración de backend.

Integración:
*   Dependencia directa del endpoint `GET /api/tutors/:tutorId/reviews` del backend NestJS.
*   Requiere que el backend esté desplegado y accesible.

Criterios de Aceptación Técnica:
*   Las Server Actions en `src/actions/tutor-reviews/reviews-actions.ts` realizan peticiones HTTP al backend real.
*   Los datos de reseñas (resumen, listado, distribución) se cargan y se muestran desde el servicio NestJS.
*   La funcionalidad de paginación "Ver más reseñas" obtiene y muestra datos reales del backend.
*   La aplicación maneja correctamente las respuestas de éxito y error del backend, mostrando mensajes apropiados al usuario en caso de fallo.
*   El código del seed ya no es utilizado para la obtención de datos en producción.
---END_PROMPT---

---START_COMMIT--- HU22-T07 fix(backend): integrar Server Actions con endpoint real de reseñas ---END_COMMIT---
---END_TASK---