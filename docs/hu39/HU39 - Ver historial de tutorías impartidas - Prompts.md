---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed para historial y detalle de tutorías HU_NUMBER: HU39 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se necesita generar datos de prueba estáticos para simular las respuestas del backend y permitir el desarrollo independiente del frontend.
Objetivo: Crear un archivo de seed con datos estructurados para el historial de tutorías (métricas y listado paginado) y el detalle de una tutoría, junto con sus interfaces TypeScript.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/seed/tutorialsSeedData.ts`
*   `src/interfaces/tutorial/tutorial.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
*   En `src/interfaces/tutorial/tutorial.ts`, definir las interfaces TypeScript `TutorialSummaryDto`, `TutorialHistoryItemDto`, `PaginatedTutorialHistoryDto`, `HistoryResponse` y `TutorialDetailDto` que representen los DTOs esperados del backend.
    *   `TutorialSummaryDto`: `completedTutorials: number`, `subjectsTaught: number`, `studentsQualified: number`.
    *   `TutorialHistoryItemDto`: `id: string`, `studentInitials: string`, `offerTitle: string`, `studentName: string`, `date: string`, `time: string`.
    *   `PaginatedTutorialHistoryDto`: `items: TutorialHistoryItemDto[]`, `total: number`, `page: number`, `limit: number`.
    *   `HistoryResponse`: `summary: TutorialSummaryDto`, `paginatedData: PaginatedTutorialHistoryDto`.
    *   `TutorialDetailDto`: `id: string`, `studentName: string`, `studentInitials: string`, `offerTitle: string`, `subject: string`, `date: string`, `time: string`, `modality: 'Presencial' | 'Virtual'`, `price: number`, `currency: string`, `locationOrLink: string`, `message: string`.
*   En `src/seed/tutorialsSeedData.ts`, crear y exportar:
    *   `historySeedData`: Un objeto de tipo `HistoryResponse` que contenga:
        *   `summary`: Datos para las tres métricas estáticas superiores.
        *   `paginatedData`: Un arreglo `items` con al menos 7-8 `TutorialHistoryItemDto` para simular varias páginas. Incluir datos realistas de iniciales, título, nombre, fecha (`DD [de] MMMM [de] YYYY`) y hora (`HH:MM`). `total` debe reflejar el número total de items generados, `page` y `limit` como valores por defecto (ej. 1 y 5).
    *   `tutorialDetailSeedData`: Un objeto de tipo `TutorialDetailDto` con datos completos para una tutoría específica, asegurando que todos los campos definidos en la interfaz estén presentes y con formatos correctos (ej. `DD [de] MMMM [de] YYYY` para fecha, `HH:MM` para hora, etc.).

Validaciones: Asegurar que los datos de fecha y hora estén en el formato `DD [de] MMMM [de] YYYY` y `HH:MM` respectivamente.

Diseño: No aplica.

Integración: Estos seeds serán utilizados por los Server Actions para simular la respuesta del backend.

Criterios de Aceptación Técnica:
*   El archivo `tutorialsSeedData.ts` existe en la ruta `src/seed/`.
*   El archivo `tutorial.ts` existe en la ruta `src/interfaces/tutorial/`.
*   Las interfaces `TutorialSummaryDto`, `TutorialHistoryItemDto`, `PaginatedTutorialHistoryDto`, `HistoryResponse` y `TutorialDetailDto` están correctamente definidas en `src/interfaces/tutorial/tutorial.ts`.
*   Los seeds `historySeedData` y `tutorialDetailSeedData` están definidos y exportados en `src/seed/tutorialsSeedData.ts`.
*   `historySeedData` contiene un `summary` y al menos 7 `TutorialHistoryItemDto` en `paginatedData.items` para probar la paginación, con la estructura de `HistoryResponse`.
*   `tutorialDetailSeedData` contiene todos los campos definidos en `TutorialDetailDto` con datos de ejemplo.
*   La estructura y tipos de los seeds coinciden exactamente con los DTOs de respuesta esperados.
*   Los formatos de fecha y hora en los seeds son consistentes con los requerimientos (`DD [de] MMMM [de] YYYY` y `HH:MM`).
---END_PROMPT---

---START_COMMIT--- HU39-T01 feat(seed): crear seed data e interfaces para historial de tutorías ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Implementación de Server Actions con seed data (historial y detalle) HU_NUMBER: HU39 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Los Server Actions son la capa de comunicación del frontend con el backend. Para un desarrollo independiente, deben simular las respuestas del backend usando los seeds.
Objetivo: Implementar los Server Actions `getTutorialHistoryAction` y `getTutorialDetailAction` para que, inicialmente, retornen los datos del seed. El código real de integración con el backend (petición `fetch`) debe estar preescrito y comentado para una futura activación.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/actions/tutorials/getTutorialHistoryAction.ts`
*   `src/actions/tutorials/getTutorialDetailAction.ts`
*   `src/seed/tutorialsSeedData.ts` (import)
*   `src/interfaces/tutorial/tutorial.ts` (import)

Tecnologías: Next.js 16, TypeScript.

Estructura:
*   Crear `src/actions/tutorials/getTutorialHistoryAction.ts`:
    *   Definir una función `getTutorialHistoryAction(page: number = 1, limit: number = 5)` que sea `export async function`.
    *   Importar `historySeedData` y las interfaces necesarias.
    *   Implementar lógica para retornar un subconjunto de `historySeedData.paginatedData.items` basado en `page` y `limit`, simulando la paginación. El `summary` siempre será el completo del seed.
    *   Dentro de la función, COMENTAR un bloque completo de código `fetch` que simularía la llamada a `GET /api/tutorias/historial?page=${page}&limit=${limit}`. Incluir `Authorization` header y manejo básico de errores (ej. `try/catch`).
*   Crear `src/actions/tutorials/getTutorialDetailAction.ts`:
    *   Definir una función `getTutorialDetailAction(id: string)` que sea `export async function`.
    *   Importar `tutorialDetailSeedData` y las interfaces necesarias.
    *   Retornar `tutorialDetailSeedData` directamente (o buscar por ID si se generaron múltiples detalles en el seed, pero para simplicidad, se puede retornar un seed fijo).
    *   Dentro de la función, COMENTAR un bloque completo de código `fetch` que simularía la llamada a `GET /api/tutorias/${id}`. Incluir `Authorization` header y manejo básico de errores.

Validaciones: Ninguna en esta fase, ya que se usan seeds.

Diseño: No aplica.

Integración: Estos Server Actions serán invocados por los Server Components de la interfaz de usuario.

Criterios de Aceptación Técnica:
*   Ambos Server Actions (`getTutorialHistoryAction`, `getTutorialDetailAction`) están definidos en las rutas correctas.
*   Ambos Server Actions retornan el seed data correspondiente, simulando la paginación para el historial.
*   El código `fetch` para la integración real con el backend está presente en ambos Server Actions, correctamente configurado (URLs, headers, parámetros) y completamente COMENTADO.
*   Los Server Actions manejan los parámetros `page` y `limit` para el historial incluso con el seed data.
*   No hay errores de compilación o ejecución relacionados con los Server Actions o los seeds.
---END_PROMPT---

---START_COMMIT--- HU39-T02 feat(actions): implementar server actions con seed data y fetch comentado ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Maquetación `HistorialTutoriasPage` con carga inicial y estado HU_NUMBER: HU39 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Historial ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La página principal del historial de tutorías es el punto de entrada para el tutor. Necesita cargar los datos iniciales y gestionar el estado de la UI (paginación, modal).
Objetivo: Implementar la página `HistorialTutoriasPage` como un Server Component que cargue los datos iniciales del historial de tutorías (métricas y primer bloque paginado), y establezca el estado necesario para la interacción del usuario.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/app/tutor/historial/page.tsx`
*   `src/actions/tutorials/getTutorialHistoryAction.ts` (import)
*   `src/actions/tutorials/getTutorialDetailAction.ts` (import)
*   `src/interfaces/tutorial/tutorial.ts` (import)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
*   Crear el componente `HistorialTutoriasPage` en `src/app/tutor/historial/page.tsx` como un Server Component.
*   Utilizar `useState` para gestionar:
    *   `currentPage: number` (valor inicial 1).
    *   `isModalOpen: boolean` (valor inicial `false`).
    *   `selectedTutorialId: string | null` (valor inicial `null`).
*   La función `HistorialTutoriasPage` debe ser `async` para llamar directamente a `getTutorialHistoryAction` para la carga inicial.
*   Manejar la carga inicial de datos (métricas y la primera página del listado) desde `getTutorialHistoryAction`. Implementar un estado de carga (`isLoading`) y un manejo básico de errores (ej. `error: string | null`).
*   Maquetar la estructura principal de la página, incluyendo:
    *   Un título `h1` "Historial de Tutorías Impartidas".
    *   Un contenedor para las métricas (placeholder por ahora, `MetricCardsDisplay`).
    *   Un contenedor para el listado de tarjetas (placeholder por ahora, `TutorialHistoryList`).
    *   Un contenedor para los controles de paginación (placeholder por ahora, `PaginationControls`).

Validaciones: La carga inicial debe funcionar sin errores y los estados deben ser gestionados correctamente.

Diseño: El layout general de la página debe coincidir con el frame `T. Historial`. Aplicar responsive design y Tailwind CSS 4.

Integración: La página se encargará de invocar a `getTutorialHistoryAction` y pasará los datos a componentes hijos una vez que estos sean creados. También gestionará los estados que afectarán a otros componentes (paginación, modal).

Criterios de Aceptación Técnica:
*   La página `HistorialTutoriasPage` se renderiza correctamente en `src/app/tutor/historial/page.tsx` como un Server Component.
*   La página realiza una llamada exitosa a `getTutorialHistoryAction` para obtener los datos iniciales (métricas y primer bloque de tutorías del seed).
*   Los estados `currentPage`, `isModalOpen` y `selectedTutorialId` están correctamente inicializados y sus respectivos setters están disponibles.
*   La página muestra un título "Historial de Tutorías Impartidas" y contenedores esqueléticos o placeholders para las métricas, el listado de tarjetas y la paginación.
*   El diseño general de la página `HistorialTutoriasPage` coincide con el frame `T. Historial`.
---END_PROMPT---

---START_COMMIT--- HU39-T03 feat(page): maquetar historial page e implementar carga inicial y estados ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Implementación de componentes `TutorialCard`, `MetricCardsDisplay` y `TutorialHistoryList` HU_NUMBER: HU39 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Historial ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Los componentes visuales son la base de la interfaz de usuario. Necesitan ser modularizados y reutilizables para mostrar las métricas y el listado de tutorías.
Objetivo: Desarrollar los componentes `MetricCardsDisplay`, `TutorialCard` y `TutorialHistoryList` y integrarlos en `HistorialTutoriasPage`. `TutorialCard` debe ser interactivo para emitir un evento de clic que la página principal pueda manejar.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/app/tutor/historial/components/MetricCardsDisplay/MetricCardsDisplay.tsx`
*   `src/app/tutor/historial/components/TutorialCard/TutorialCard.tsx`
*   `src/app/tutor/historial/components/TutorialHistoryList/TutorialHistoryList.tsx`
*   `src/app/tutor/historial/page.tsx` (integración)
*   `src/interfaces/tutorial/tutorial.ts` (import)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, clsx.

Estructura:
*   **`MetricCardsDisplay` (Client Component):**
    *   Crear `src/app/tutor/historial/components/MetricCardsDisplay/MetricCardsDisplay.tsx`.
    *   Recibirá una prop `summary` de tipo `TutorialSummaryDto`.
    *   Maquetar tres tarjetas de métricas que muestren "Tutorías completadas", "Materias impartidas" y "Estudiantes que califican" con sus respectivos valores.
*   **`TutorialCard` (Client Component):**
    *   Crear `src/app/tutor/historial/components/TutorialCard/TutorialCard.tsx`.
    *   Recibirá las props `tutorial: TutorialHistoryItemDto` y `onClick: (id: string) => void`.
    *   Maquetar la tarjeta individual de tutoría, mostrando: iniciales del estudiante (en un círculo), título de la oferta de la tutoría, nombre del estudiante, y la fecha y hora de la sesión.
    *   El componente debe ser un botón o un elemento `div` con `onClick` que llame a `onClick(tutorial.id)`.
*   **`TutorialHistoryList` (Client Component):**
    *   Crear `src/app/tutor/historial/components/TutorialHistoryList/TutorialHistoryList.tsx`.
    *   Recibirá las props `items: TutorialHistoryItemDto[]` y `onCardClick: (id: string) => void`.
    *   Mapear sobre la lista de `items` y renderizar un `TutorialCard` por cada uno, pasando el `onCardClick` al `TutorialCard`.
*   **Integración en `HistorialTutoriasPage` (Server Component):**
    *   Importar y utilizar `MetricCardsDisplay` y `TutorialHistoryList`.
    *   Pasar los datos `summary` y `paginatedData.items` a los componentes respectivos.
    *   Implementar una función `handleCardClick = (id: string) => void` en `HistorialTutoriasPage` que actualice `selectedTutorialId` y `isModalOpen` a `true`, y pasarla como `onCardClick` a `TutorialHistoryList`.

Validaciones: Los componentes deben mostrar la información correctamente y el `onClick` de la tarjeta debe actualizar el estado de la página principal.

Diseño: Los componentes deben seguir el diseño del frame `T. Historial`, utilizando Tailwind CSS 4 para estilos, responsive design y clsx para condicionales de estilo.

Integración: `HistorialTutoriasPage` pasa los datos del Server Action a estos componentes visuales.

Criterios de Aceptación Técnica:
*   `MetricCardsDisplay` se renderiza correctamente con las métricas de resumen obtenidas del Server Action.
*   `TutorialCard` muestra la información de resumen de una tutoría (`iniciales`, `título`, `nombre estudiante`, `fecha`, `hora`) y es funcionalmente clicable.
*   `TutorialHistoryList` renderiza una lista de `TutorialCard`s dinámicamente a partir de los `items` recibidos.
*   Al hacer clic en una `TutorialCard`, la página `HistorialTutoriasPage` actualiza `selectedTutorialId` y establece `isModalOpen` a `true`.
*   El diseño de los componentes `MetricCardsDisplay`, `TutorialCard` y `TutorialHistoryList` coincide con el frame `T. Historial`.
---END_PROMPT---

---START_COMMIT--- HU39-T04 feat(components): implementar MetricCardsDisplay, TutorialCard y TutorialHistoryList ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Implementación de `PaginationControls` (funcional y condicional) HU_NUMBER: HU39 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Historial ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La paginación es esencial para manejar grandes volúmenes de datos. Debe ser funcional, visualmente coherente y condicionalmente oculta.
Objetivo: Desarrollar un componente de paginación reutilizable (`PaginationControls`) que permita navegar entre páginas y se oculte cuando no sea necesario. Integrarlo en `HistorialTutoriasPage`.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/common/PaginationControls/PaginationControls.tsx`
*   `src/app/tutor/historial/page.tsx` (integración y lógica de paginación)
*   `src/actions/tutorials/getTutorialHistoryAction.ts` (re-llamada con nueva página)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, clsx.

Estructura:
*   **`PaginationControls` (Client Component):**
    *   Crear `src/components/common/PaginationControls/PaginationControls.tsx`.
    *   Recibirá las props:
        *   `totalItems: number` (número total de registros).
        *   `itemsPerPage: number` (registros por página, ej. 5).
        *   `currentPage: number` (página actualmente activa).
        *   `onPageChange: (page: number) => void` (callback para cambiar de página).
    *   Calcular `totalPages`.
    *   Renderizar botones numéricos (ej. '1', '2') y flechas de navegación ('<', '>').
    *   Resaltar visualmente la `currentPage`.
    *   Implementar lógica para ocultar completamente el componente si `totalItems <= itemsPerPage`.
    *   Los eventos `onClick` de los botones y flechas deben llamar a `onPageChange` con la página correspondiente.
*   **Integración en `HistorialTutoriasPage` (Server Component):**
    *   Importar y utilizar `PaginationControls`.
    *   Pasar `paginatedData.total`, `paginatedData.limit` y `currentPage` a `PaginationControls`.
    *   Implementar una función `handlePageChange = async (page: number) => void` en `HistorialTutoriasPage`. Esta función debe:
        *   Actualizar el estado `currentPage`.
        *   Realizar una nueva llamada a `getTutorialHistoryAction(page, paginatedData.limit)` para obtener los datos de la nueva página.
        *   Actualizar el estado del listado de tutorías.

Validaciones: Los controles de paginación deben aparecer/ocultarse correctamente. La navegación debe actualizar el listado.

Diseño: El diseño de los controles de paginación debe coincidir con el frame `T. Historial`, utilizando Tailwind CSS 4 y responsive design.

Integración: `PaginationControls` es un componente de UI que interactúa con el estado de `HistorialTutoriasPage` para disparar nuevas llamadas a `getTutorialHistoryAction`.

Criterios de Aceptación Técnica:
*   `PaginationControls` se renderiza correctamente en `src/components/common/PaginationControls/PaginationControls.tsx`.
*   El componente `PaginationControls` está oculto si el número total de ítems es 5 o menos (según el `itemsPerPage` configurado, que debe ser 5).
*   La página activa se resalta visualmente en los controles de paginación.
*   Al hacer clic en los números de página o flechas, `HistorialTutoriasPage` actualiza el estado `currentPage` y dispara una nueva solicitud a `getTutorialHistoryAction`.
*   El listado de tutorías se actualiza para mostrar los resultados de la página seleccionada.
*   El diseño de `PaginationControls` coincide con el frame `T. Historial`.
---END_PROMPT---

---START_COMMIT--- HU39-T05 feat(components): implementar PaginationControls funcional y condicional ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Desarrollo y lógica de `TutorialDetailModal` (visualización y cierre) HU_NUMBER: HU39 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Historial (Detalle Tutoría sin Confirmar) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Al seleccionar una tutoría del historial, el tutor debe poder ver todos sus detalles en un modal.
Objetivo: Desarrollar el componente `TutorialDetailModal` que cargue y muestre la información detallada de una tutoría, y que pueda ser cerrado por el usuario.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/app/tutor/historial/components/TutorialDetailModal/TutorialDetailModal.tsx`
*   `src/app/tutor/historial/page.tsx` (integración)
*   `src/actions/tutorials/getTutorialDetailAction.ts` (llamada)
*   `src/interfaces/tutorial/tutorial.ts` (import)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
*   **`TutorialDetailModal` (Client Component):**
    *   Crear `src/app/tutor/historial/components/TutorialDetailModal/TutorialDetailModal.tsx`.
    *   Recibirá las props `tutorialId: string | null`, `isOpen: boolean`, `onClose: () => void`.
    *   Utilizar un `useEffect` para detectar cambios en `tutorialId` y `isOpen`. Si `isOpen` es `true` y `tutorialId` no es `null`, realizar la llamada `getTutorialDetailAction(tutorialId)` para obtener los detalles de la tutoría. Manejar estados de carga (`isLoading`) y error (`error`).
    *   Maquetar la estructura del modal (fondo atenuado, contenido centrado).
    *   Dentro del modal, mostrar todos los campos de `TutorialDetailDto`: nombre del estudiante, iniciales, título de la oferta, asignatura, fecha, hora, modalidad, precio, lugar/enlace y mensaje.
    *   Incluir un botón "Cerrar" en la parte inferior que, al ser clicado, ejecute la función `onClose` pasada por props.
*   **Integración en `HistorialTutoriasPage` (Server Component):**
    *   Importar y utilizar `TutorialDetailModal`.
    *   Pasar los estados `selectedTutorialId` y `isModalOpen` al modal.
    *   Implementar una función `handleCloseModal = () => void` en `HistorialTutoriasPage` que:
        *   Restablezca `isModalOpen` a `false`.
        *   Restablezca `selectedTutorialId` a `null`.
        *   Esta función se pasará como `onClose` al `TutorialDetailModal`.

Validaciones: El modal debe aparecer/desaparecer correctamente. Los datos de detalle deben cargarse y mostrarse.

Diseño: El diseño del modal debe coincidir con el frame `T. Historial (Detalle Tutoría sin Confirmar)`, incluyendo el fondo atenuado, utilizando Tailwind CSS 4 y responsive design.

Integración: `TutorialDetailModal` es un componente de UI que consume datos de `getTutorialDetailAction` y gestiona su propia visibilidad a través de callbacks a `HistorialTutoriasPage`.

Criterios de Aceptación Técnica:
*   El componente `TutorialDetailModal` se crea en `src/app/tutor/historial/components/TutorialDetailModal/TutorialDetailModal.tsx`.
*   El modal se muestra correctamente cuando `isModalOpen` es `true` y `selectedTutorialId` tiene un valor.
*   El modal carga y muestra la información detallada de la tutoría obtenida del `getTutorialDetailAction` (del seed, por ahora).
*   El diseño del modal, incluyendo el fondo atenuado y el contenido, coincide con el frame `T. Historial (Detalle Tutoría sin Confirmar)`.
*   Al hacer clic en el botón "Cerrar", el modal desaparece y los estados `isModalOpen` y `selectedTutorialId` se resetean en `HistorialTutoriasPage`.
---END_PROMPT---

---START_COMMIT--- HU39-T06 feat(modal): desarrollar TutorialDetailModal para visualización y cierre ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Integración final de Server Actions con backend HU_NUMBER: HU39 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Con toda la interfaz de usuario desarrollada y probada con seeds, es el momento de conectar la aplicación con los endpoints reales del backend.
Objetivo: Activar las llamadas `fetch` a los endpoints reales del backend en los Server Actions `getTutorialHistoryAction` y `getTutorialDetailAction`, reemplazando la lógica de retorno del seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/actions/tutorials/getTutorialHistoryAction.ts`
*   `src/actions/tutorials/getTutorialDetailAction.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
*   **Modificar `src/actions/tutorials/getTutorialHistoryAction.ts`:**
    *   Eliminar o comentar la línea que retorna directamente `historySeedData` (o la lógica de paginación del seed).
    *   Descomentar el bloque completo del código `fetch` que apunta al endpoint `/api/tutorias/historial`.
    *   Asegurar que la URL del endpoint esté correctamente configurada, utilizando `process.env.NEXT_PUBLIC_API_URL` para la base URL.
    *   Verificar que los `headers` de la petición incluyan el token de autenticación (ej. `Authorization: Bearer ${token}`).
    *   Ajustar el procesamiento de la respuesta `JSON` del `fetch` para que coincida con la estructura de `HistoryResponse`.
*   **Modificar `src/actions/tutorials/getTutorialDetailAction.ts`:**
    *   Eliminar o comentar la línea que retorna directamente `tutorialDetailSeedData`.
    *   Descomentar el bloque completo del código `fetch` que apunta al endpoint `/api/tutorias/:id`.
    *   Asegurar que la URL del endpoint esté correctamente configurada, utilizando `process.env.NEXT_PUBLIC_API_URL`.
    *   Verificar que los `headers` de la petición incluyan el token de autenticación.
    *   Ajustar el procesamiento de la respuesta `JSON` del `fetch` para que coincida con la estructura de `TutorialDetailDto`.

Validaciones: Las peticiones deben realizarse al backend real y los datos recibidos deben ser los esperados.

Diseño: No aplica.

Integración: Conectar los Server Actions directamente a los endpoints RESTful del backend.

Criterios de Aceptación Técnica:
*   Las peticiones `fetch` en `getTutorialHistoryAction` y `getTutorialDetailAction` se ejecutan correctamente hacia los endpoints reales del backend (`/api/tutorias/historial` y `/api/tutorias/:id`).
*   Los Server Actions ya no retornan el seed data; consumen y procesan los datos provenientes del backend real.
*   La aplicación consume los datos de forma exitosa y sin errores desde el backend, mostrando información real en el historial y el modal de detalle.
*   El manejo de errores (ej. `401 Unauthorized`, `404 Not Found`, etc.) implementado en los Server Actions se gestiona correctamente.
---END_PROMPT---

---START_COMMIT--- HU39-T07 chore(actions): integrar server actions con backend real ---END_COMMIT---
---END_TASK---