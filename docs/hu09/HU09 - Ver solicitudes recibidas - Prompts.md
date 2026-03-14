---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed para `GlobalCountsDto`. HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La aplicación necesita datos de conteo global de solicitudes (pendientes, expiradas, respondidas) para la navegación y la UI. Para desacoplar el desarrollo frontend del backend, se requiere un archivo de seed con esta información.
Objetivo: Crear un archivo de seed en TypeScript que contenga un objeto con el conteo global de solicitudes, simulando la respuesta de un endpoint de conteos.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/seed/GlobalCountsSeedData.ts`
- `src/interfaces/solicitudes/SolicitudesDTO.ts`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
- En `src/interfaces/solicitudes/SolicitudesDTO.ts`, definir la interfaz `GlobalCountsDto` con propiedades `pending: number`, `expired: number`, `responded: number`.
- En `src/seed/GlobalCountsSeedData.ts`, crear un objeto `globalCountsSeed` de tipo `GlobalCountsDto` con valores de ejemplo (ej. `pending: 3, expired: 14, responded: 12`).
- Exportar el objeto `globalCountsSeed`.

Validaciones: Asegurar que los tipos de datos sean correctos (numéricos para los conteos).

Diseño: N/A (esto es simulación de datos de backend).

Integración: Este seed será utilizado por Server Actions para simular respuestas de API.

Criterios de Aceptación Técnica:
- El seed contiene un objeto con las propiedades `pending`, `expired`, `responded`.
- Los valores del seed son numéricos y representan un escenario típico.
- La estructura de datos coincide con `GlobalCountsDto`.
---END_PROMPT---

---START_COMMIT--- HU09-T01 feat(seeds): crear seed para conteos globales de solicitudes ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Creación de seed para `PaginatedSolicitudesDto` (estado PENDIENTE). HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Se necesita simular la respuesta paginada de solicitudes en estado "Pendiente" para el desarrollo de la tabla de solicitudes. Este seed debe incluir detalles para la vista colapsada y expandida.
Objetivo: Crear un archivo de seed que contenga datos de ejemplo para solicitudes en estado "Pendiente", estructurado como un DTO paginado.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/seed/SolicitudesPendingSeedData.ts`
- `src/interfaces/solicitudes/SolicitudesDTO.ts`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
- En `src/interfaces/solicitudes/SolicitudesDTO.ts`:
    - Definir la interfaz `SolicitudDetailsDto` con campos `id: string`, `estudiante: string`, `materia: string`, `fechaHora: string` (en formato ISO o similar para fácil manejo), `mensajeResumen: string`, `estado: 'PENDIENTE' | 'EXPIRADA' | 'RESPONDIDA'`, `modalidad: 'Virtual' | 'Presencial'`, `precioHora: number`, `mensajeCompleto: string`.
    - Definir la interfaz `PaginatedSolicitudesDto` con `data: SolicitudDetailsDto[]`, `total: number`, `page: number`, `limit: number`.
- En `src/seed/SolicitudesPendingSeedData.ts`:
    - Crear un array de 3-5 objetos `SolicitudDetailsDto` con estado 'PENDIENTE'. Asegurarse que `mensajeResumen` sea una versión truncada de `mensajeCompleto`.
    - Envolver este array en un objeto `paginatedSolicitudesPendingSeed` de tipo `PaginatedSolicitudesDto` que incluya `total`, `page` y `limit` coherentes.
    - Exportar `paginatedSolicitudesPendingSeed`.

Validaciones: Coherencia entre `mensajeResumen` y `mensajeCompleto`. Asegurarse de que el `estado` sea 'PENDIENTE'.

Diseño: N/A (esto es simulación de datos de backend).

Integración: Utilizado por Server Actions para simular la API de solicitudes.

Criterios de Aceptación Técnica:
- El seed contiene un `PaginatedSolicitudesDto` válido con solicitudes en estado 'PENDIENTE'.
- Cada `SolicitudDetailsDto` incluye todos los campos necesarios para las vistas colapsada y expandida.
- La estructura de datos coincide exactamente con el `PaginatedSolicitudesDto` y `SolicitudDetailsDto` documentados.
---END_PROMPT---

---START_COMMIT--- HU09-T02 feat(seeds): crear seed para solicitudes pendientes ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Creación de seed para `PaginatedSolicitudesDto` (estado EXPIRADA). HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Se requiere un seed similar al de solicitudes pendientes para simular solicitudes en estado "Expirada", lo cual es crucial para probar la funcionalidad de la pestaña de expiradas.
Objetivo: Crear un archivo de seed con datos de ejemplo para solicitudes en estado "Expirada", siguiendo la misma estructura que el seed de solicitudes pendientes.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/seed/SolicitudesExpiredSeedData.ts`
- `src/interfaces/solicitudes/SolicitudesDTO.ts` (reutilizar las interfaces ya definidas)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
- Reutilizar las interfaces `PaginatedSolicitudesDto` y `SolicitudDetailsDto` previamente definidas en `src/interfaces/solicitudes/SolicitudesDTO.ts`.
- En `src/seed/SolicitudesExpiredSeedData.ts`:
    - Crear un array de 3-5 objetos `SolicitudDetailsDto` con estado 'EXPIRADA'. Asegurarse de que los datos sean representativos de solicitudes expiradas.
    - Envolver este array en un objeto `paginatedSolicitudesExpiredSeed` de tipo `PaginatedSolicitudesDto` con `total`, `page` y `limit` coherentes.
    - Exportar `paginatedSolicitudesExpiredSeed`.

Validaciones: Asegurar que el `estado` de todas las solicitudes en este seed sea 'EXPIRADA'.

Diseño: N/A (esto es simulación de datos de backend).

Integración: Utilizado por Server Actions para simular la API de solicitudes filtradas por estado.

Criterios de Aceptación Técnica:
- El seed contiene un `PaginatedSolicitudesDto` válido con solicitudes en estado 'EXPIRADA'.
- Cada `SolicitudDetailsDto` incluye todos los campos necesarios.
- La estructura de datos coincide con los DTOs documentados.
---END_PROMPT---

---START_COMMIT--- HU09-T03 feat(seeds): crear seed para solicitudes expiradas ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Creación del componente reutilizable `StatusTag`. HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La UI de la bandeja de entrada necesita mostrar el estado de las solicitudes con un tag visualmente distintivo que cambie de color según el estado. Se requiere un componente reutilizable para esto.
Objetivo: Implementar un componente `StatusTag` que reciba un estado de solicitud y aplique estilos de Tailwind CSS (fondo y color de texto) de forma condicional según el estado.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/common/StatusTag/StatusTag.tsx`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React, clsx.

Estructura:
- Componente funcional de React `StatusTag` como Client Component.
- Recibir una prop `status` de tipo `'PENDIENTE' | 'EXPIRADA' | 'RESPONDIDA'`.
- Utilizar un `<span>` para renderizar el texto del estado.
- Aplicar clases de Tailwind CSS condicionalmente usando `clsx` para manejar el fondo, color de texto, padding, y bordes redondeados:
    - 'PENDIENTE': `bg-orange-100 text-orange-800` (ejemplo, ajustar a paleta de colores si existe).
    - 'EXPIRADA': `bg-red-100 text-red-800` (ejemplo, ajustar a paleta de colores si existe).
    - Incluir clases base para `rounded-full px-2 py-0.5 text-xs font-semibold`.

Validaciones: N/A, la validación es visual y de props.

Diseño: Los colores de fondo y texto deben ser distintivos para cada estado y coincidir con el diseño si se especifica en Figma.

Integración: Será utilizado en `SolicitudRow` y posiblemente en otras partes de la UI que muestren estados de solicitud.

Criterios de Aceptación Técnica:
- El componente `StatusTag` se renderiza correctamente.
- El color de fondo y texto del tag cambia según el estado recibido.
- El componente es modular y reutilizable.
---END_PROMPT---

---START_COMMIT--- HU09-T04 feat(common): crear componente StatusTag ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Implementación de Server Action `fetchInitialDataAction` con seed. HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Para la carga inicial de la página de Bandeja de Entrada, se necesitan tanto los conteos globales de solicitudes como la lista inicial de solicitudes pendientes. Este Server Action simulará la obtención de estos datos.
Objetivo: Implementar un Server Action `fetchInitialDataAction` que retorne los datos de `globalCountsSeed` y `paginatedSolicitudesPendingSeed`. Debe incluir el código `fetch` real comentado para futura integración.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/solicitudes/solicitudes.ts`
- `src/seed/GlobalCountsSeedData.ts` (importar)
- `src/seed/SolicitudesPendingSeedData.ts` (importar)
- `src/interfaces/solicitudes/SolicitudesDTO.ts` (para definir la interfaz de respuesta combinada `InitialFetchResponse`)

Tecnologías: Next.js 16, TypeScript.

Estructura:
- Crear `src/actions/solicitudes/solicitudes.ts` y añadir `'use server';`.
- En `src/interfaces/solicitudes/SolicitudesDTO.ts`, definir `interface InitialFetchResponse { solicitudes: PaginatedSolicitudesDto; counts: GlobalCountsDto; }`.
- En `src/actions/solicitudes/solicitudes.ts`:
    - Importar `globalCountsSeed` y `paginatedSolicitudesPendingSeed`.
    - Definir la función `async function fetchInitialDataAction(page: number, limit: number): Promise<InitialFetchResponse>`.
    - Implementar un `setTimeout` de 500-1000ms para simular latencia de red.
    - Después del `setTimeout`, retornar un objeto `{ solicitudes: paginatedSolicitudesPendingSeed, counts: globalCountsSeed }` como tipo `InitialFetchResponse`.
    - **Crucial:** Escribir el bloque `try-catch` completo para las peticiones `fetch` al endpoint real `/api/solicitudes/counts` y `/api/solicitudes?status=PENDIENTE&page=${page}&limit=${limit}`. Incluir `Authorization` header con un token JWT (e.g., `Bearer ${authToken}`) y `next: { tags: ['solicitudes', 'global-counts'] }` para revalidación de caché. Este bloque de código `fetch` debe estar **totalmente comentado**.
    - Documentar la estructura de la respuesta esperada en los JSDocs o comentarios del código.

Validaciones: N/A (simulación en esta etapa).

Diseño: N/A (lógica de backend).

Integración: Será invocado por la `BandejaEntradaPage` (Server Component) para la carga inicial.

Criterios de Aceptación Técnica:
- El Server Action `fetchInitialDataAction` retorna correctamente los seeds de conteos y solicitudes pendientes.
- El código de integración con el backend real (petición `fetch`) está presente y totalmente comentado.
- La estructura de la respuesta del Server Action coincide con la `InitialFetchResponse` definida.
---END_PROMPT---

---START_COMMIT--- HU09-T05 feat(api): implementar Server Action fetchInitialDataAction con seeds ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Implementación de Server Action `getSolicitudesAction` con seed. HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Se necesita un Server Action para obtener solicitudes filtradas por estado (PENDIENTE, EXPIRADA) cuando el usuario cambia de pestaña. Inicialmente, este action usará seeds para desacoplar el desarrollo.
Objetivo: Implementar un Server Action `getSolicitudesAction` que reciba un estado de solicitud y retorne el seed correspondiente de solicitudes. El código de integración con el backend real debe estar escrito pero COMENTADO.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/solicitudes/solicitudes.ts` (modificar)
- `src/seed/SolicitudesPendingSeedData.ts` (importar)
- `src/seed/SolicitudesExpiredSeedData.ts` (importar)
- `src/interfaces/solicitudes/SolicitudesDTO.ts` (reutilizar `PaginatedSolicitudesDto`).

Tecnologías: Next.js 16, TypeScript.

Estructura:
- En `src/actions/solicitudes/solicitudes.ts`:
    - Añadir la función `async function getSolicitudesAction(status: 'PENDIENTE' | 'EXPIRADA' | 'RESPONDIDA', page: number, limit: number): Promise<PaginatedSolicitudesDto>`.
    - Importar `paginatedSolicitudesPendingSeed` y `paginatedSolicitudesExpiredSeed`.
    - Implementar un `setTimeout` de 500-1000ms para simular latencia de red.
    - Dentro de la función, usar una declaración `if/else if` para retornar el seed apropiado (`paginatedSolicitudesPendingSeed` si `status === 'PENDIENTE'`, `paginatedSolicitudesExpiredSeed` si `status === 'EXPIRADA'`).
    - Para otros estados (ej. 'RESPONDIDA'), retornar un seed vacío o un error si no se contempla en esta HU.
    - **Crucial:** Escribir el bloque `try-catch` completo para la petición `fetch` al endpoint real `/api/solicitudes?status=${status}&page=${page}&limit=${limit}`. Incluir `Authorization` header con un token JWT y `next: { tags: ['solicitudes', `solicitudes-${status.toLowerCase()}`] }`. Este bloque de código `fetch` debe estar **totalmente comentado**.
    - Documentar la estructura de respuesta esperada.

Validaciones: N/A (simulación en esta etapa).

Diseño: N/A (lógica de backend).

Integración: Será invocado por el `TabsComponent` (o un manejador en `BandejaEntradaPage`) cuando se cambie de pestaña.

Criterios de Aceptación Técnica:
- El Server Action `getSolicitudesAction` retorna el seed correcto basado en el estado solicitado.
- El código de integración con el backend real (petición `fetch`) está presente y totalmente comentado.
- La estructura de la respuesta del Server Action coincide con la `PaginatedSolicitudesDto` definida.
---END_PROMPT---

---START_COMMIT--- HU09-T06 feat(api): implementar Server Action getSolicitudesAction con seeds ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Estructura y maquetación de la página `BandejaEntradaPage`. HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Bandeja de Entrada (Solicitud Pendiente Desplegada), T. Bandeja de Entrada (Solicitud Expirada Desplegada) ---END_FRAME---

---START_ESTIMATION--- 2.0H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Esta es la página principal para la bandeja de entrada del tutor, la cual es responsable de orquestar la carga inicial de datos y la renderización de los componentes hijos (`GlobalPendingCount`, `TabsComponent`, `SolicitudesTable`, `NoRequestsMessage`).
Objetivo: Crear la página `BandejaEntradaPage` como un Next.js Server Component, que cargue los datos iniciales, maneje el estado de las solicitudes y renderice los componentes UI principales.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/bandeja/page.tsx`
- `src/actions/solicitudes/solicitudes.ts` (invocar `fetchInitialDataAction` y `getSolicitudesAction`)
- `src/components/bandeja-entrada/TabsComponent/TabsComponent.tsx` (importar)
- `src/components/bandeja-entrada/SolicitudesTable/SolicitudesTable.tsx` (importar)
- `src/components/bandeja-entrada/NoRequestsMessage/NoRequestsMessage.tsx` (importar)
- `src/interfaces/solicitudes/SolicitudesDTO.ts` (para `SolicitudDetailsDto` y `GlobalCountsDto`)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React (Server Component, `useState`, `useTransition` para manejo de estado en la página si se usa Client Component para el renderizado condicional de la tabla).

Estructura:
- Crear `src/app/bandeja/page.tsx` como un `async` Server Component.
- Al inicio del componente, invocar `const { solicitudes: initialSolicitudes, counts: globalCounts } = await fetchInitialDataAction(1, 10);` (o parámetros de paginación iniciales).
- Utilizar `useState` para gestionar el array de solicitudes (`currentSolicitudes`) y la pestaña activa (`activeTab`) que se pasarán a `SolicitudesTable` y `TabsComponent`. Inicializar `currentSolicitudes` con `initialSolicitudes.data` y `activeTab` a 'PENDIENTE'.
- Implementar una función `handleTabChange` (posiblemente un `useCallback` o una función inline en un Client Wrapper) que reciba el `newStatus` y use `getSolicitudesAction` para obtener las nuevas solicitudes, actualizando `currentSolicitudes`. Usar `useTransition` para manejar el estado de carga y la actualización de la UI de forma no bloqueante.
- Renderizar el `TabsComponent`, pasándole `globalCounts.pending`, `globalCounts.expired` y la función `handleTabChange`.
- Renderizar condicionalmente `SolicitudesTable` o `NoRequestsMessage`:
    - Si `currentSolicitudes.length > 0`, renderizar `SolicitudesTable` pasándole `currentSolicitudes` y `activeTab`.
    - Si `currentSolicitudes.length === 0`, renderizar `NoRequestsMessage` pasándole `activeTab`.
- Asegurar que los conteos de `globalCounts` puedan ser accesibles por `NavBar` (posiblemente a través de un layout superior o como prop en `NavBar` si es Client Component o a través de un Context). Para esta tarea, nos enfocamos en pasarlo a `TabsComponent` y el prop al `NavBar`.

Validaciones: Asegurar que los datos iniciales y los datos de cambio de pestaña se pasen correctamente como props a los componentes hijos.

Diseño: La maquetación general de la página debe coincidir con los frames de Figma, incluyendo la disposición de las pestañas y la tabla.

Integración: Llama a `fetchInitialDataAction` y `getSolicitudesAction`. Pasa datos y callbacks a `TabsComponent` y `SolicitudesTable`.

Criterios de Aceptación Técnica:
- La página `BandejaEntradaPage` se renderiza correctamente como Server Component.
- `fetchInitialDataAction` es invocado y sus resultados se utilizan para props iniciales.
- Los conteos globales y solicitudes pendientes se pasan a los componentes hijos.
- Se muestra el mensaje "No hay solicitudes pendientes." si la data inicial está vacía.
---END_PROMPT---

---START_COMMIT--- HU09-T07 feat(bandeja-entrada): estructurar página BandejaEntradaPage ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 8 TASK_TITLE: Implementación e integración de `GlobalPendingCount` en `NavBar`. HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Bandeja de Entrada (Solicitud Pendiente Desplegada) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La barra de navegación superior necesita un indicador visible del número total de solicitudes pendientes. Este indicador debe actualizarse con el conteo global obtenido.
Objetivo: Implementar un componente `GlobalPendingCount` que muestre el número total de solicitudes pendientes e integrarlo en la `NavBar`.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/layout/GlobalPendingCount/GlobalPendingCount.tsx`
- `src/components/layout/NavBar/NavBar.tsx` (modificar)
- `src/app/bandeja/page.tsx` (modificar para pasar la prop)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React.

Estructura:
- Crear `src/components/layout/GlobalPendingCount/GlobalPendingCount.tsx` como Client Component (`'use client'`).
- Este componente debe recibir `pendingCount: number` como prop.
- Renderizar el número de pendientes en un elemento `<span>` o `<div>` con estilos de Tailwind que lo hagan visualmente prominente y coherente con el diseño de la `NavBar` (ej. un círculo rojo con el número en blanco).
- Modificar `src/components/layout/NavBar/NavBar.tsx` para integrar el `GlobalPendingCount`. La `NavBar` debe recibir `pendingCount` como prop de su componente padre (que en el contexto de esta HU, sería `BandejaEntradaPage` o el layout superior que envuelve a `BandejaEntradaPage`).
- En `src/app/bandeja/page.tsx`, asegurar que `globalCounts.pending` se pase como prop a la `NavBar` (asumiendo que `NavBar` es un componente al que se le pueden pasar props desde la página o un layout).

Validaciones: El indicador en la `NavBar` debe mostrar el número correcto de solicitudes pendientes.

Diseño: El indicador debe ser visible y estilizado para encajar con la `NavBar`, según el frame de Figma.

Integración: La `NavBar` recibe el `pendingCount` y se lo pasa a `GlobalPendingCount`.

Criterios de Aceptación Técnica:
- El indicador de pendientes en la `NavBar` muestra el número correcto.
- El `GlobalPendingCount` se actualiza con el valor proporcionado por `BandejaEntradaPage`.
- La integración visual es consistente con el diseño de la `NavBar`.
---END_PROMPT---

---START_COMMIT--- HU09-T08 feat(layout): integrar GlobalPendingCount en NavBar ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 9 TASK_TITLE: Estructura del `TabsComponent` con pestañas Pendientes y Expiradas. HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Bandeja de Entrada (Solicitud Pendiente Desplegada) ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La bandeja de entrada necesita una interfaz de pestañas para que el tutor pueda filtrar las solicitudes por estado (Pendientes, Expiradas).
Objetivo: Crear la estructura base del `TabsComponent` como un Client Component, incluyendo las pestañas "Pendientes" y "Expiradas" con sus respectivos conteos, y omitiendo la pestaña "Respondidas".

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/bandeja-entrada/TabsComponent/TabsComponent.tsx`
- `src/app/bandeja/page.tsx` (modificar para importar y pasar props)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React.

Estructura:
- Crear `src/components/bandeja-entrada/TabsComponent/TabsComponent.tsx` como Client Component (`'use client'`).
- Este componente debe recibir props `initialPendingCount: number`, `initialExpiredCount: number`, y `onTabChange: (status: 'PENDIENTE' | 'EXPIRADA') => void`.
- Internamente, se puede definir un sub-componente funcional `Tab` (o una interfaz `TabProps`) para representar cada pestaña.
- Renderizar una estructura de pestañas que contenga dos elementos clickeables:
    - Una pestaña para "Pendientes", mostrando el label "Pendientes" y `initialPendingCount`.
    - Una pestaña para "Expiradas", mostrando el label "Expiradas" y `initialExpiredCount`.
- Asegurar que la pestaña "Respondidas" no se renderice en absoluto, tal como se especifica en las observaciones de la HU.
- Aplicar estilos de Tailwind CSS para la disposición horizontal de las pestañas y el estilo base de los botones/enlaces de pestaña.

Validaciones: El componente renderiza dos pestañas con los conteos correctos. La pestaña "Respondidas" no está presente.

Diseño: La estructura de las pestañas debe coincidir con el diseño del frame de Figma, mostrando los conteos como parte del texto de la pestaña.

Integración: Recibe los conteos iniciales y un callback para el cambio de pestaña de `BandejaEntradaPage`.

Criterios de Aceptación Técnica:
- El `TabsComponent` renderiza correctamente dos pestañas: "Pendientes" y "Expiradas".
- Cada pestaña muestra el conteo inicial correcto.
- La pestaña "Respondidas" no se renderiza.
---END_PROMPT---

---START_COMMIT--- HU09-T09 feat(bandeja-entrada): estructurar TabsComponent ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 10 TASK_TITLE: Estilización de pestañas y manejo de estado `activeTab`. HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Bandeja de Entrada (Solicitud Pendiente Desplegada) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Las pestañas en el `TabsComponent` deben indicar visualmente cuál está activa mediante una estilización específica (fondo oscuro, texto blanco).
Objetivo: Implementar la lógica de estado local en `TabsComponent` para gestionar la pestaña activa (`activeTab`) y aplicar la estilización correspondiente de Tailwind CSS a la pestaña seleccionada, y revertir la estilización de las pestañas inactivas.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/bandeja-entrada/TabsComponent/TabsComponent.tsx` (modificar)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React (useState, clsx).

Estructura:
- En `src/components/bandeja-entrada/TabsComponent/TabsComponent.tsx`:
    - Utilizar `useState<string>` para `activeTab`, inicializándolo a `'PENDIENTE'` para que la pestaña "Pendientes" esté activa por defecto.
    - Implementar la lógica de estilizado condicional utilizando `clsx` en el elemento de la pestaña (ej. un `button` o `div`).
        - Si la pestaña es `activeTab`: Aplicar clases de Tailwind para fondo oscuro (ej. `bg-gray-800`), texto blanco (ej. `text-white`), y un borde inferior distintivo si se requiere.
        - Si la pestaña no es `activeTab`: Aplicar clases para un estilo por defecto (ej. `bg-gray-100` o `bg-transparent`, `text-gray-700`).
    - El `onClick` handler de cada pestaña debe actualizar el estado `activeTab` con el identificador de la pestaña seleccionada.
    - Asegurar que la estilización del conteo dentro de la pestaña (ej. "Pendientes (3)") cambie su color de texto para que sea legible y coherente con el estilo general de la pestaña activa/inactiva.

Validaciones: La pestaña "Pendientes" se muestra activa por defecto. Al hacer clic en una pestaña, esta cambia su estilo a "activa" y las demás vuelven a "inactivas".

Diseño: Los estilos de las pestañas activa e inactiva deben coincidir con el frame de Figma (fondo oscuro/texto blanco para activa).

Integración: Lógica de estado interna del `TabsComponent`.

Criterios de Aceptación Técnica:
- La pestaña 'Pendientes' se muestra activa por defecto al cargar la página.
- Al hacer clic en una pestaña, esta cambia su estilo a "activa" (fondo oscuro, texto blanco).
- La pestaña inactiva vuelve a su estilo por defecto.
---END_PROMPT---

---START_COMMIT--- HU09-T10 feat(bandeja-entrada): estilizar pestañas y gestionar activeTab ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 11 TASK_TITLE: Implementación del manejo de cambio de pestaña (`onTabChange`). HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Bandeja de Entrada (Solicitud Pendiente Desplegada), T. Bandeja de Entrada (Solicitud Expirada Desplegada) ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Cuando un tutor cambia de pestaña en la Bandeja de Entrada, la lista de solicitudes en la tabla debe actualizarse para mostrar las solicitudes del estado seleccionado, obteniendo los datos del backend (o seeds).
Objetivo: Implementar la función `handleTabClick` en `TabsComponent` para que, al cambiar de pestaña, se notifique al componente padre (`BandejaEntradaPage`) con el estado correspondiente. El padre, a su vez, invocará `getSolicitudesAction` para actualizar la tabla.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/bandeja-entrada/TabsComponent/TabsComponent.tsx` (modificar)
- `src/app/bandeja/page.tsx` (modificar para implementar el callback)
- `src/actions/solicitudes/solicitudes.ts` (invocar `getSolicitudesAction`)
- `src/interfaces/solicitudes/SolicitudesDTO.ts` (para tipos de solicitudes)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React (useState, useTransition).

Estructura:
- En `src/components/bandeja-entrada/TabsComponent/TabsComponent.tsx`:
    - La prop `onTabChange` que recibe del padre debe tener la firma `(status: 'PENDIENTE' | 'EXPIRADA') => void`.
    - En el `onClick` handler de cada pestaña, después de actualizar el estado `activeTab` interno, llamar a `onTabChange(status_de_la_pestaña)`.
- En `src/app/bandeja/page.tsx` (asumiendo que es un Client Wrapper o se usa un Client Component para manejar el estado dinámico):
    - Mantener un estado para `currentSolicitudes: SolicitudDetailsDto[]` y `currentActiveTab: 'PENDIENTE' | 'EXPIRADA'`.
    - Implementar la función `handleTabChange` que reciba el `newStatus: 'PENDIENTE' | 'EXPIRADA'`.
    - Dentro de `handleTabChange`:
        - Actualizar `currentActiveTab` con `newStatus`.
        - Utilizar `useTransition` (obteniendo `isPending`, `startTransition`) para gestionar el estado de carga y las actualizaciones de la UI.
        - Dentro de `startTransition`, invocar `const newSolicitudes = await getSolicitudesAction(newStatus, 1, 10);` (ajustar paginación si es necesario).
        - Actualizar `currentSolicitudes` con `newSolicitudes.data`.
        - Considerar mostrar un indicador de carga (`isPending`) en la UI mientras se esperan los nuevos datos.

Validaciones: `getSolicitudesAction` es invocado con el estado correcto. La lista de solicitudes en la tabla se actualiza.

Diseño: Se debe considerar un indicador de carga visible (ej. un spinner o un estado de "cargando...") mientras se obtienen los nuevos datos de solicitudes, para mejorar la experiencia de usuario.

Integración: El `TabsComponent` emite un evento que `BandejaEntradaPage` captura para llamar al Server Action `getSolicitudesAction` y actualizar la UI.

Criterios de Aceptación Técnica:
- Al hacer clic en una pestaña, se activa la carga de solicitudes para ese estado.
- El `getSolicitudesAction` es invocado con el `status` correcto.
- El componente padre (`BandejaEntradaPage`) recibe la notificación y actualiza la lista de solicitudes en `SolicitudesTable`.
---END_PROMPT---

---START_COMMIT--- HU09-T11 feat(bandeja-entrada): implementar cambio de pestaña y carga de solicitudes ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 12 TASK_TITLE: Estructura base de `SolicitudesTable` y cabeceras condicionales. HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Bandeja de Entrada (Solicitud Pendiente Desplegada) ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La lista de solicitudes debe presentarse en un formato de tabla. Para cumplir con los criterios de aceptación, la tabla debe ser flexible y ocultar sus cabeceras cuando no hay solicitudes.
Objetivo: Crear la estructura base del componente `SolicitudesTable` como un Client Component, que renderice las cabeceras de la tabla (ESTUDIANTE, MATERIA, FECHA/HORA, MENSAJE, ESTADO) y tenga la lógica para ocultarlas cuando el array de solicitudes está vacío.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/bandeja-entrada/SolicitudesTable/SolicitudesTable.tsx`
- `src/app/bandeja/page.tsx` (modificar para importar y pasar props)
- `src/interfaces/solicitudes/SolicitudesDTO.ts` (para `SolicitudDetailsDto`)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React.

Estructura:
- Crear `src/components/bandeja-entrada/SolicitudesTable/SolicitudesTable.tsx` como Client Component (`'use client'`).
- Este componente debe recibir props `solicitudes: SolicitudDetailsDto[]` y `activeTabStatus: 'PENDIENTE' | 'EXPIRADA'`.
- Renderizar un `<table>` con estilos básicos de Tailwind CSS (ej. `w-full table-auto border-collapse`).
- Dentro del `<table>`, implementar la lógica condicional para el `<thead>`:
    - `if (solicitudes.length > 0)`: Renderizar `<thead>` con `<tr>` y `<th>` para las cabeceras: "ESTUDIANTE", "MATERIA", "FECHA/HORA", "MENSAJE", "ESTADO".
    - `else`: No renderizar el `<thead>`.
- Aplicar estilos de Tailwind CSS a las cabeceras (`<th>`) para padding, alineación (ej. `text-left p-4 font-semibold bg-gray-200`).
- En `src/app/bandeja/page.tsx`, pasar `currentSolicitudes` y `activeTab` como props a `SolicitudesTable`.

Validaciones: Las cabeceras de la tabla se muestran solo si `solicitudes` no está vacío.

Diseño: La estructura de la tabla y las cabeceras deben coincidir con el diseño del frame de Figma.

Integración: Recibe las solicitudes y el estado de la pestaña activa de `BandejaEntradaPage`.

Criterios de Aceptación Técnica:
- La tabla se renderiza con las cabeceras especificadas cuando hay solicitudes.
- Las cabeceras de la tabla se ocultan si `solicitudes` está vacío.
---END_PROMPT---

---START_COMMIT--- HU09-T12 feat(bandeja-entrada): estructurar SolicitudesTable con cabeceras condicionales ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 13 TASK_TITLE: Implementación del componente `NoRequestsMessage`. HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Cuando no hay solicitudes para una pestaña específica, se debe mostrar un mensaje claro y localizado al usuario informando de la ausencia de datos.
Objetivo: Implementar un componente `NoRequestsMessage` que muestre un texto específico ("No hay solicitudes pendientes/expiradas.") y la lógica para su visualización.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/bandeja-entrada/NoRequestsMessage/NoRequestsMessage.tsx`
- `src/components/bandeja-entrada/SolicitudesTable/SolicitudesTable.tsx` (modificar para renderizar)
- `src/app/bandeja/page.tsx` (modificar para visualización inicial)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React.

Estructura:
- Crear `src/components/bandeja-entrada/NoRequestsMessage/NoRequestsMessage.tsx` como Client Component.
- Este componente debe recibir una prop `status: 'PENDIENTE' | 'EXPIRADA' | 'RESPONDIDA'`.
- Renderizar un `<div>` o `<p>` centrado con estilos de Tailwind (ej. `text-center text-gray-500 py-10 text-lg`).
- El texto exacto a mostrar debe ser: `No hay solicitudes ${status.toLowerCase()}.` (ej. "No hay solicitudes pendientes." o "No hay solicitudes expiradas.").
- En `src/components/bandeja-entrada/SolicitudesTable/SolicitudesTable.tsx`:
    - Dentro de la lógica condicional que oculta las cabeceras (cuando `solicitudes.length === 0`), renderizar el `NoRequestsMessage` pasándole `activeTabStatus`.
- En `src/app/bandeja/page.tsx`:
    - Asegurar que, si la carga inicial de `initialSolicitudes.data` está vacía, se muestre `NoRequestsMessage` pasándole `'PENDIENTE'` como estado.

Validaciones: El mensaje debe ser el texto exacto especificado en los Criterios de Aceptación. Se muestra cuando la lista de solicitudes está vacía y se oculta cuando hay datos.

Diseño: El mensaje debe estar centrado en el área de la tabla, con un tamaño de fuente y color legible.

Integración: Condicionalmente renderizado por `SolicitudesTable` o directamente por `BandejaEntradaPage`.

Criterios de Aceptación Técnica:
- Se muestra el mensaje "No hay solicitudes pendientes." cuando no hay solicitudes en la pestaña "Pendientes".
- Se muestra el mensaje "No hay solicitudes expiradas." cuando no hay solicitudes en la pestaña "Expiradas".
- El mensaje se oculta cuando sí hay solicitudes.
---END_PROMPT---

---START_COMMIT--- HU09-T13 feat(bandeja-entrada): crear componente NoRequestsMessage ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 14 TASK_TITLE: Implementación del componente `SolicitudRowCollapsed`. HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Bandeja de Entrada (Solicitud Pendiente Desplegada) ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Cada solicitud en la tabla debe mostrar una vista resumida, colapsada, que sea interactiva para expandir y ver más detalles.
Objetivo: Implementar la vista colapsada de una fila de solicitud (`SolicitudRow`) que muestre información resumida (estudiante, materia, fecha/hora, mensaje resumido, estado) y un ícono de flecha hacia abajo, haciéndola clickeable para expandir.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/bandeja-entrada/SolicitudesTable/SolicitudesTable.tsx` (modificar para renderizar `SolicitudRow`)
- `src/components/bandeja-entrada/SolicitudesTable/SolicitudRow.tsx`
- `src/interfaces/solicitudes/SolicitudesDTO.ts` (para `SolicitudDetailsDto`)
- `src/components/common/StatusTag/StatusTag.tsx` (importar)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React, react-icons (FaChevronDown, FaChevronUp).

Estructura:
- Crear `src/components/bandeja-entrada/SolicitudesTable/SolicitudRow.tsx` como Client Component (`'use client'`).
- Este componente debe recibir props `solicitud: SolicitudDetailsDto`, `onToggleExpand: (id: string) => void`, y `isExpanded: boolean`.
- En `SolicitudesTable.tsx`, iterar sobre el array de `solicitudes` (recibido como prop) dentro del `<tbody>` y renderizar un `SolicitudRow` por cada solicitud, pasando las props correspondientes (incluyendo el `id` de la fila expandida desde el estado de `SolicitudesTable` y la función `toggleRowExpansion`).
- En `SolicitudRow.tsx`, renderizar un `<tr>` principal que será clickeable (aplicar `cursor-pointer hover:bg-gray-50`).
- Dentro de este `<tr>`, colocar celdas `<td>` para:
    - `solicitud.estudiante`
    - `solicitud.materia`
    - `solicitud.fechaHora` (formatear para ser legible, ej. `DD/MM/YYYY HH:mm`).
    - `solicitud.mensajeResumen`.
    - Un `<td>` que contenga el `StatusTag` (Tarea 4) con `solicitud.estado`, y al lado el ícono de flecha (FaChevronDown si `!isExpanded`, FaChevronUp si `isExpanded`).
- El `onClick` del `<tr>` principal (o un `div` contenedor) debe invocar `onToggleExpand(solicitud.id)`.

Validaciones: Los datos de resumen se muestran correctamente. El ícono de flecha es `FaChevronDown` cuando la fila está colapsada. La fila es clickeable.

Diseño: La fila colapsada debe seguir el diseño del frame de Figma, incluyendo los estilos para el tag de estado y la flecha.

Integración: Utiliza `StatusTag`. Proporciona un callback al componente padre (`SolicitudesTable`) para manejar la expansión/colapso.

Criterios de Aceptación Técnica:
- Cada fila de solicitud muestra correctamente el nombre del estudiante, materia, fecha/hora, mensaje resumido y el tag de estado.
- El ícono de flecha hacia abajo se visualiza en cada fila colapsada.
- La fila es clickeable.
---END_PROMPT---

---START_COMMIT--- HU09-T14 feat(bandeja-entrada): implementar SolicitudRowCollapsed ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 15 TASK_TITLE: Implementación de `SolicitudRowExpanded` para solicitudes PENDIENTE. HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Bandeja de Entrada (Solicitud Pendiente Desplegada) ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Al expandir una solicitud pendiente, el tutor debe ver detalles adicionales como la modalidad, el precio por hora y el mensaje completo del estudiante. Es crucial que los botones de acción ("Aceptar", "Rechazar") NO sean visualizados en esta HU, según las observaciones.
Objetivo: Extender el componente `SolicitudRow` para mostrar los detalles expandidos específicos de una solicitud en estado "Pendiente", asegurando la ausencia de los botones de acción.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/bandeja-entrada/SolicitudesTable/SolicitudRow.tsx` (modificar)
- `src/interfaces/solicitudes/SolicitudesDTO.ts` (reutilizar `SolicitudDetailsDto`)
- Posibles componentes átomos a crear para modularidad:
    - `src/components/common/ModalityDetails/ModalityDetails.tsx`
    - `src/components/common/PriceDetails/PriceDetails.tsx`
    - `src/components/common/FullMessageDisplay/FullMessageDisplay.tsx`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React.

Estructura:
- En `src/components/bandeja-entrada/SolicitudesTable/SolicitudRow.tsx`:
    - Dentro del componente, utilizar la prop `isExpanded: boolean` para renderizar condicionalmente una nueva fila (`<tr>`) o un `div` anidado que contenga los detalles expandidos cuando `isExpanded` es `true`.
    - Esta sección expandida debe ocupar el ancho completo de la tabla (usar `colspan` en el `<td>` si es un `<tr>` nuevo).
    - Dentro de la sección expandida, mostrar:
        - Ícono y texto de modalidad (`solicitud.modalidad`). Considerar crear un `ModalityDetails.tsx` que reciba la modalidad.
        - Precio por hora (`solicitud.precioHora`). Considerar crear un `PriceDetails.tsx` que reciba el precio.
        - Un bloque 'MENSAJE DEL ESTUDIANTE' con el texto completo (`solicitud.mensajeCompleto`). Considerar crear un `FullMessageDisplay.tsx` que reciba el mensaje.
    - **Crucial:** Implementar una condición `if (solicitud.estado === 'PENDIENTE')` antes de renderizar los botones "Aceptar" y "Rechazar" y asegurarse de que, por ahora, **estos botones NO se rendericen para cumplir estrictamente con las observaciones de la HU**. Este código para los botones debe estar omitido o comentado.
    - Aplicar estilos de Tailwind CSS para el diseño de los detalles expandidos (padding, espaciado, fuentes, etc.).

Validaciones: Los detalles se muestran solo cuando la fila está expandida y son correctos. Los botones de acción NO están presentes para solicitudes pendientes.

Diseño: Los detalles expandidos deben coincidir con el frame de Figma "T. Bandeja de Entrada (Solicitud Pendiente Desplegada)".

Integración: Recibe la `SolicitudDetailsDto` completa para mostrar sus propiedades.

Criterios de Aceptación Técnica:
- Al expandir una solicitud pendiente, se visualizan la modalidad, precio y mensaje completo.
- Los botones "Aceptar" y "Rechazar" NO se visualizan.
- El diseño de los detalles coincide con el frame de Figma.
---END_PROMPT---

---START_COMMIT--- HU09-T15 feat(bandeja-entrada): implementar SolicitudRowExpanded para PENDIENTE ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 16 TASK_TITLE: Implementación de `SolicitudRowExpanded` para solicitudes EXPIRADA. HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Bandeja de Entrada (Solicitud Expirada Desplegada) ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Las solicitudes en estado "Expirada" también deben poder expandirse para mostrar detalles completos (modalidad, precio, mensaje completo), de manera similar a las solicitudes pendientes, pero sin ninguna opción de acción.
Objetivo: Ajustar el componente `SolicitudRow` para manejar la vista expandida de solicitudes en estado "Expirada", mostrando los detalles y garantizando la ausencia total de botones de acción.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/bandeja-entrada/SolicitudesTable/SolicitudRow.tsx` (modificar)
- `src/interfaces/solicitudes/SolicitudesDTO.ts` (reutilizar `SolicitudDetailsDto`)
- `src/components/common/ModalityDetails/ModalityDetails.tsx` (reutilizar)
- `src/components/common/PriceDetails/PriceDetails.tsx` (reutilizar)
- `src/components/common/FullMessageDisplay/FullMessageDisplay.tsx` (reutilizar)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React.

Estructura:
- En `src/components/bandeja-entrada/SolicitudesTable/SolicitudRow.tsx`:
    - La lógica para mostrar los detalles expandidos (modalidad, precio, mensaje completo) debe ser la misma que la implementada para las solicitudes pendientes, ya que la información a mostrar es estructuralmente idéntica. Reutilizar `ModalityDetails`, `PriceDetails`, `FullMessageDisplay`.
    - La condición principal a asegurar es que, para `solicitud.estado === 'EXPIRADA'`, los botones de acción ("Aceptar", "Rechazar") **NUNCA** se visualicen. Esto puede ser gestionado con una condición `if (solicitud.estado === 'PENDIENTE')` antes de la lógica de renderizado de los botones, o simplemente omitiendo la renderización de botones en esta HU para cualquier estado, ya que la observación lo especifica incluso para Pendientes.

Validaciones: Los detalles se muestran correctamente para solicitudes expiradas. NO hay botones de acción en la vista expandida de solicitudes expiradas.

Diseño: Los detalles expandidos deben coincidir con el frame de Figma "T. Bandeja de Entrada (Solicitud Expirada Desplegada)".

Integración: Reutiliza los mismos subcomponentes de detalles.

Criterios de Aceptación Técnica:
- Al expandir una solicitud expirada, se visualizan la modalidad, precio y mensaje completo.
- NO se visualizan botones de acción en la vista expandida de solicitudes expiradas.
- El diseño de los detalles coincide con el frame de Figma.
---END_PROMPT---

---START_COMMIT--- HU09-T16 feat(bandeja-entrada): implementar SolicitudRowExpanded para EXPIRADA ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 17 TASK_TITLE: Gestión del estado de expansión/colapso de filas en tabla. HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Bandeja de Entrada (Solicitud Pendiente Desplegada), T. Bandeja de Entrada (Solicitud Expirada Desplegada) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La tabla de solicitudes debe permitir a los usuarios expandir y colapsar individualmente las filas para ver detalles adicionales. Al expandirse, el ícono de flecha debe cambiar para indicar el estado de la fila.
Objetivo: Implementar la lógica en `SolicitudesTable` para gestionar el estado de la fila expandida (solo una a la vez), permitir que una fila se expanda o colapse al hacer clic, y actualizar el ícono de flecha en `SolicitudRow` de acuerdo a su estado.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/bandeja-entrada/SolicitudesTable/SolicitudesTable.tsx` (modificar)
- `src/components/bandeja-entrada/SolicitudesTable/SolicitudRow.tsx` (modificar)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React (useState), react-icons (FaChevronUp, FaChevronDown).

Estructura:
- En `src/components/bandeja-entrada/SolicitudesTable/SolicitudesTable.tsx`:
    - Utilizar `useState<string | null>(null)` para el estado `expandedRowId`, que almacenará el `id` de la solicitud actualmente expandida, o `null` si ninguna lo está.
    - Implementar la función `toggleRowExpansion(id: string)`:
        - Si el `id` recibido es igual a `expandedRowId`, establecer `expandedRowId` a `null` (colapsar la fila).
        - Si el `id` es diferente o `expandedRowId` es `null`, establecer `expandedRowId` al `id` recibido (expandir la nueva fila y colapsar la anterior si existía).
    - Al renderizar cada `SolicitudRow` dentro de la tabla:
        - Pasar la función `toggleRowExpansion` como prop `onToggleExpand`.
        - Pasar una prop `isExpanded: boolean` cuyo valor sea `expandedRowId === solicitud.id`.
- En `src/components/bandeja-entrada/SolicitudesTable/SolicitudRow.tsx`:
    - Recibir la prop `isExpanded: boolean`.
    - Utilizar esta prop para renderizar condicionalmente:
        - El ícono `FaChevronUp` si `isExpanded` es `true`.
        - El ícono `FaChevronDown` si `isExpanded` es `false`.
    - La vista expandida (detalles adicionales) debe renderizarse solo si `isExpanded` es `true`.

Validaciones: Al hacer clic en una fila, esta se expande y su ícono de flecha cambia a arriba. Al hacer clic en otra fila, esta se expande y la anterior se colapsa. Al hacer clic en una fila expandida, se colapsa.

Diseño: El cambio de ícono de flecha debe ser perceptible y el efecto de expansión/colapso debe ser visualmente claro.

Integración: `SolicitudesTable` gestiona el estado y `SolicitudRow` consume este estado para renderizar dinámicamente.

Criterios de Aceptación Técnica:
- Al hacer clic en una fila, esta se expande y el ícono de flecha cambia a arriba.
- Al hacer clic nuevamente en una fila expandida, esta se contrae y el ícono de flecha cambia a abajo.
- Solo una fila puede estar expandida a la vez.
---END_PROMPT---

---START_COMMIT--- HU09-T17 feat(bandeja-entrada): gestionar expansión/colapso de filas en tabla ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 18 TASK_TITLE: Implementación del componente `PaginationComponent` (placeholder). HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Se requiere un componente para la paginación de la tabla de solicitudes, pero su funcionalidad completa se abordará en futuras HUs. Por ahora, se necesita un placeholder visual que represente la navegación de paginación.
Objetivo: Crear un componente `PaginationComponent` básico que represente visualmente la navegación de paginación de la tabla de solicitudes, sin implementar ninguna lógica de paginación real.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/common/PaginationComponent/PaginationComponent.tsx`
- `src/components/bandeja-entrada/SolicitudesTable/SolicitudesTable.tsx` (o `src/app/bandeja/page.tsx`) (para integrar el placeholder)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React.

Estructura:
- Crear `src/components/common/PaginationComponent/PaginationComponent.tsx` como Client Component (`'use client'`).
- Este componente no necesita recibir props en esta fase, o puede recibir un `totalItems`, `itemsPerPage`, `currentPage` para un renderizado más "realista" sin lógica.
- Renderizar un `div` con estilos de Tailwind CSS para centrar y espaciar los elementos.
- Dentro del `div`, renderizar algunos elementos `button` o `<a>` que simulen botones de paginación (ej. "Anterior", "1", "2", "3", "Siguiente").
- Aplicar estilos básicos de Tailwind CSS a estos elementos para que el componente sea visualmente presentable y parezca funcional (ej. `bg-blue-500 text-white px-3 py-1 rounded mx-1`).
- Integrar este componente en `src/components/bandeja-entrada/SolicitudesTable/SolicitudesTable.tsx` (después del `<table>`) o en `src/app/bandeja/page.tsx` (en la parte inferior de la sección principal que contiene la tabla), para que sea visible en la interfaz.

Validaciones: El componente de paginación se renderiza visualmente en la UI. No tiene funcionalidad activa en esta HU.

Diseño: Placeholder de paginación simple pero estilizado, ubicado en la parte inferior de la tabla o sección principal.

Integración: Solo visual en esta etapa.

Criterios de Aceptación Técnica:
- Un componente de paginación básico se renderiza en la UI.
- El componente no tiene funcionalidad de navegación activa en esta HU.
---END_PROMPT---

---START_COMMIT--- HU09-T18 feat(common): implementar PaginationComponent (placeholder) ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 19 TASK_TITLE: Integración de `fetchInitialDataAction` con backend real. HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Habiendo completado el desarrollo frontend de la carga inicial de la Bandeja de Entrada con seeds, es el momento de conectar la obtención de datos al backend real para que la aplicación funcione con información dinámica.
Objetivo: Activar la integración real con el backend para `fetchInitialDataAction` descomentando el código `fetch` pre-escrito y eliminando la lógica de retorno de seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/solicitudes/solicitudes.ts` (modificar)

Tecnologías: Next.js 16, TypeScript, Fetch API.

Estructura:
- Abrir `src/actions/solicitudes/solicitudes.ts`.
- Localizar la función `fetchInitialDataAction`.
- **Comentar o eliminar** la(s) línea(s) que retorna(n) los seeds (ej. `return { solicitudes: paginatedSolicitudesPendingSeed, counts: globalCountsSeed };`) y el `setTimeout` que simulaba la latencia.
- **Descomentar completamente** el bloque `try-catch` que realiza las peticiones `fetch` a `/api/solicitudes/counts` y `/api/solicitudes?status=PENDIENTE&page=${page}&limit=${limit}`.
- Verificar que:
    - Las URLs de los endpoints sean correctas.
    - Los `headers` incluyan `Authorization` con un token JWT (este token debe ser obtenido de forma segura, ej. desde una cookie o un mecanismo de autenticación).
    - Las opciones de `fetch` incluyan `next: { tags: ['solicitudes', 'global-counts'] }` para la revalidación de caché de Next.js.
    - El manejo de errores dentro del `catch` sea adecuado, retornando un objeto de error o un estado vacío que la UI pueda gestionar.
- Eliminar las importaciones de `globalCountsSeed` y `paginatedSolicitudesPendingSeed` si ya no se utilizan en el archivo.

Validaciones: Realizar pruebas end-to-end con el backend desplegado. La UI debe cargar los datos reales del backend para los conteos globales y las solicitudes pendientes.

Diseño: N/A (lógica de integración).

Integración: Conexión directa con los endpoints `/api/solicitudes/counts` y `/api/solicitudes` para la carga inicial.

Criterios de Aceptación Técnica:
- La `fetchInitialDataAction` realiza peticiones HTTP reales al backend.
- Los datos iniciales (conteo global y solicitudes pendientes) se cargan del backend.
- La estructura de la respuesta del backend coincide con la esperada (`InitialFetchResponse`).
- Se manejan correctamente los errores de red y del servidor, mostrando un mensaje adecuado en la UI.
---END_PROMPT---

---START_COMMIT--- HU09-T19 ci(api): integrar fetchInitialDataAction con backend real ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 20 TASK_TITLE: Integración de `getSolicitudesAction` con backend real. HU_NUMBER: HU09 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Conectar el Server Action responsable de filtrar solicitudes por estado (`getSolicitudesAction`) al backend real para obtener datos dinámicos al cambiar de pestaña, reemplazando la simulación con seeds.
Objetivo: Activar la integración real con el backend para `getSolicitudesAction` descomentando el código `fetch` pre-escrito y eliminando la lógica de retorno de seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/solicitudes/solicitudes.ts` (modificar)

Tecnologías: Next.js 16, TypeScript, Fetch API.

Estructura:
- Abrir `src/actions/solicitudes/solicitudes.ts`.
- Localizar la función `getSolicitudesAction`.
- **Comentar o eliminar** la lógica condicional que retorna los seeds basada en el `status` (ej. `if (status === 'PENDIENTE') return paginatedSolicitudesPendingSeed;` y el `setTimeout`).
- **Descomentar completamente** el bloque `try-catch` que realiza la petición `fetch` a `/api/solicitudes?status=${status}&page=${page}&limit=${limit}`.
- Verificar que:
    - La URL del endpoint sea correcta y los parámetros (`status`, `page`, `limit`) se inyecten correctamente.
    - Los `headers` incluyan `Authorization` con el token JWT.
    - Las opciones de `fetch` incluyan `next: { tags: ['solicitudes', `solicitudes-${status.toLowerCase()}`] }` para la revalidación de caché de Next.js.
    - El manejo de errores dentro del `catch` sea adecuado, retornando un objeto de error o un estado vacío en caso de fallo.
- Eliminar las importaciones de `paginatedSolicitudesPendingSeed` y `paginatedSolicitudesExpiredSeed` si ya no se utilizan en el archivo.

Validaciones: Realizar pruebas end-to-end con el backend desplegado, verificando que al cambiar de pestaña (Pendientes/Expiradas), la tabla muestra los datos reales filtrados del backend.

Diseño: N/A (lógica de integración).

Integración: Conexión directa con el endpoint `/api/solicitudes` filtrando por el parámetro `status`.

Criterios de Aceptación Técnica:
- La `getSolicitudesAction` realiza peticiones HTTP reales al backend cuando se cambia de pestaña.
- Las solicitudes filtradas por estado se cargan del backend.
- La estructura de la respuesta del backend coincide con la esperada (`PaginatedSolicitudesDto`).
- Se manejan correctamente los errores de red y del servidor.
---END_PROMPT---

---START_COMMIT--- HU09-T20 ci(api): integrar getSolicitudesAction con backend real ---END_COMMIT---
---END_TASK---