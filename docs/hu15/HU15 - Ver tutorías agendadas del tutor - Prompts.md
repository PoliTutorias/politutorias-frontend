---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed data para `InitialAgendaData`, `SelectedDayInfo`, y `SessionDetailDTO` HU_NUMBER: HU15 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se requiere establecer un conjunto de datos de ejemplo (seed data) que simule las respuestas del backend para las operaciones relacionadas con la agenda del tutor.
Objetivo: Crear un archivo de seed que contenga datos mockeados para `InitialAgendaData`, `SelectedDayInfo`, y `SessionDetailDTO`, permitiendo el desarrollo y las pruebas del frontend de forma independiente.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/seed/AgendaSeedData.ts` (para los datos de seed)
*   `src/interfaces/agenda/AgendaInterfaces.ts` (para las interfaces de `InitialAgendaData`, `SelectedDayInfo`, `CalendarDayData`, `MonthlySessionSummary`, `SessionSummary`)
*   `src/interfaces/session/SessionInterfaces.ts` (para la interfaz `SessionDetailDTO`)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   El archivo `AgendaSeedData.ts` debe exportar constantes que representen los datos de `InitialAgendaData`, `SelectedDayInfo` y un array de `SessionDetailDTO`.
*   Las interfaces deben ser definidas en los archivos `.ts` correspondientes, siguiendo las especificaciones del DTO de la API.

Validaciones:
*   Los datos de seed deben cubrir los diferentes escenarios de `SessionDetailDTO`: Virtual Pendiente, Presencial Pendiente, Virtual Completada, Presencial Completada.
*   `InitialAgendaData` debe reflejar un calendario mensual con días que tengan y no tengan sesiones, y un resumen mensual.
*   `SelectedDayInfo` debe contener al menos 2 sesiones para un día específico.

Diseño: No aplica directamente, pero la estructura de datos debe ser consistente con la UI propuesta en Figma.

Integración: Estos datos serán utilizados por los Server Actions simulados para alimentar los componentes de la UI.

Criterios de Aceptación Técnica:
*   El archivo `AgendaSeedData.ts` existe y exporta los datos de seed necesarios.
*   Las interfaces `InitialAgendaData`, `SelectedDayInfo` y `SessionDetailDTO` (y sus sub-interfaces) están definidas y coinciden con la estructura de los DTOs esperados del backend.
*   Los datos de seed de `SessionDetailDTO` incluyen ejemplos para todas las combinaciones de estado (`PENDING`, `COMPLETED`) y modalidad (`VIRTUAL`, `PRESENCIAL`), con sus respectivos campos (`link` o `location`).
*   Los seeds de `InitialAgendaData` y `SelectedDayInfo` contienen datos coherentes para el mes actual y días con sesiones. ---END_PROMPT---

---START_COMMIT--- HU15-T01 feat(seed): crear datos mock para agenda de tutor ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Implementación de utilidad `getTutorIdFromSession` HU_NUMBER: HU15 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se necesita una función de utilidad que simule la obtención del ID del tutor autenticado desde la sesión, para que los Server Actions puedan operar con un contexto de usuario.
Objetivo: Implementar una función mock para `getTutorIdFromSession` que retorne un ID de tutor estático, preparando el terreno para una futura integración con el sistema de autenticación real.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/utils/auth/authUtils.ts`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   Crear una función asíncrona `getTutorIdFromSession()` dentro de `authUtils.ts`.
*   Esta función inicialmente retornará un string estático que representa un `tutorId` mockeado.
*   Incluir un comentario claro indicando que esta función será reemplazada por la lógica de autenticación real en el futuro.

Validaciones:
*   La función debe ser `async`.
*   Debe retornar un `string`.

Diseño: No aplica.

Integración: Esta utilidad será importada y utilizada por todos los Server Actions que requieran el ID del tutor autenticado.

Criterios de Aceptación Técnica:
*   La función `getTutorIdFromSession` existe en `src/utils/auth/authUtils.ts` y puede ser importada.
*   La función es `async` y retorna un `string` que representa un ID de tutor mockeado (ej: `'mock-tutor-id-123'`).
*   El código incluye un comentario que especifica la futura integración con un servicio de autenticación real. ---END_PROMPT---

---START_COMMIT--- HU15-T02 feat(auth): implementar utilidad para obtener tutor ID mock ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Implementación de `NavigationBar` (enlace 'Mi Agenda' y resaltado) y `MiAgendaPage` (estructura principal y títulos) HU_NUMBER: HU15 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Mi Agenda (Sesiones del mes desplegadas) ---END_FRAME---

---START_ESTIMATION--- 2.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El tutor necesita una forma de navegar a su agenda de tutorías y una página principal que muestre el esqueleto de la agenda.
Objetivo: Implementar el enlace "Mi Agenda" en la `NavigationBar` con resaltado activo y crear la página `MiAgendaPage` con su estructura principal de dos columnas y títulos.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/layout/NavigationBar/NavigationBar.tsx`
*   `src/app/tutor/agenda/page.tsx`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   **`NavigationBar.tsx` (Client Component):**
    *   Añadir un nuevo `<Link>` con texto "Mi Agenda" que apunte a `/tutor/agenda`.
    *   Implementar lógica para que el enlace se resalte con un color amarillo (usando Tailwind CSS) cuando la ruta actual sea `/tutor/agenda`. Utilizar el hook `usePathname` de Next.js.
*   **`page.tsx` (Server Component):**
    *   Definir el componente `MiAgendaPage`.
    *   Renderizar el título "Mi Agenda" y el subtítulo "Calendario de sesiones confirmadas".
    *   Establecer una estructura de layout principal con dos columnas, utilizando clases de Tailwind CSS (ej. `grid grid-cols-1 md:grid-cols-2 gap-4`).
    *   Crear placeholders para la columna izquierda (calendario) y la columna derecha (panel lateral).

Validaciones:
*   Navegación correcta al hacer clic en el enlace.
*   Resaltado del enlace según la ruta activa.
*   Carga de la página con los títulos especificados.
*   Estructura de dos columnas visible.

Diseño:
*   Referencia al Frame `T. Mi Agenda (Sesiones del mes desplegadas)`.
*   Utilizar clases de Tailwind CSS 4 para el layout, tipografía y colores.
*   Asegurar un diseño responsive para la `NavigationBar` y la página `MiAgendaPage`.

Integración:
*   La `NavigationBar` se integra globalmente en el layout de la aplicación.
*   `MiAgendaPage` será el contenedor principal para los futuros componentes de calendario y panel lateral.

Criterios de Aceptación Técnica:
*   El enlace "Mi Agenda" aparece en la `NavigationBar` y navega correctamente a `/tutor/agenda`.
*   El enlace "Mi Agenda" se resalta con un color amarillo (o equivalente según la paleta de Tailwind) cuando la ruta activa es `/tutor/agenda`.
*   La página `MiAgendaPage` carga con los títulos "Mi Agenda" y "Calendario de sesiones confirmadas" correctamente estilizados.
*   La página tiene una estructura de dos columnas preparada, visible y responsive para alojar los componentes de calendario y panel lateral. ---END_PROMPT---

---START_COMMIT--- HU15-T03 feat(ui): implementar enlace 'Mi Agenda' y estructura de página ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Implementación de `CalendarComponent` (estructura mensual, `DayCell` con indicadores, navegación) y `ThisMonthSummary` (conteo y `SessionCard`s iniciales) HU_NUMBER: HU15 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Mi Agenda (Sesiones del mes desplegadas) ---END_FRAME---

---START_ESTIMATION--- 2.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La página de agenda necesita mostrar un calendario mensual interactivo y un resumen de las sesiones del mes actual en un panel lateral.
Objetivo: Desarrollar los componentes `CalendarComponent`, `DayCell`, `SessionCard`, `RightPanel` y `ThisMonthSummary` para la visualización inicial de la agenda, basándose en el diseño de Figma.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/calendar/CalendarComponent/CalendarComponent.tsx` (Client Component)
*   `src/components/calendar/DayCell/DayCell.tsx` (Client Component)
*   `src/components/session/SessionCard/SessionCard.tsx` (Client Component)
*   `src/components/agenda/RightPanel/RightPanel.tsx` (Client Component)
*   `src/components/agenda/ThisMonthSummary/ThisMonthSummary.tsx` (Client Component)
*   `src/app/tutor/agenda/page.tsx` (para la integración)
*   `src/interfaces/agenda/AgendaInterfaces.ts` (para las interfaces de props)
*   `src/interfaces/session/SessionInterfaces.ts` (para las interfaces de props)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   **`CalendarComponent.tsx`:**
    *   Recibirá `currentMonthName`, `currentYear` y `calendarDays` (array de `CalendarDayData`) como props.
    *   Maquetará una cuadrícula de 7 días x 5-6 semanas para el calendario.
    *   Incluirá botones de navegación (flechas) para cambiar el mes (la lógica de cambio de mes se implementará más adelante).
    *   Renderizará `DayCell` para cada día.
*   **`DayCell.tsx`:**
    *   Recibirá `dayNumber`, `sessionCount` y `isPastDay` como props.
    *   Mostrará el número del día.
    *   Aplicará estilos de resaltado (ej. un pequeño círculo o texto "sesión(es)") si `sessionCount > 0`.
    *   Aplicará un estilo de color gris claro (`bg-gray-100` o `text-gray-400`) si `isPastDay` es `true`.
    *   Será clickeable, pero el handler se implementará en Tarea 7.
*   **`SessionCard.tsx`:**
    *   Recibirá `id`, `time`, `courseName`, `studentName` y `status` como props.
    *   Maquetará la tarjeta de sesión con la información básica visible.
*   **`RightPanel.tsx`:**
    *   Actuará como un contenedor para el panel lateral derecho.
    *   Recibirá `monthlySummary` (de tipo `MonthlySessionSummary`) como prop inicial.
    *   Gestionará el estado local para el día seleccionado y las sesiones de ese día (en Tarea 7).
    *   Renderizará `ThisMonthSummary` inicialmente.
*   **`ThisMonthSummary.tsx`:**
    *   Recibirá `totalConfirmed` y `sessions` (array de `SessionSummary`) como props.
    *   Mostrará el título "ESTE MES" y el conteo de `totalConfirmed`.
    *   Listará las sesiones en `SessionCard`s, agrupadas por día y en orden cronológico.

Validaciones:
*   La cuadrícula del calendario debe ser funcional.
*   Los días con sesiones deben mostrar el indicador.
*   Los días pasados deben tener el estilo gris.
*   Las tarjetas de sesión deben mostrar la información correctamente.
*   El resumen mensual debe reflejar el conteo y la lista de sesiones del mes.

Diseño:
*   Coincidir con el Frame `T. Mi Agenda (Sesiones del mes desplegadas)`.
*   Utilizar Tailwind CSS 4 para todos los estilos (layout, tipografía, colores, efectos visuales).
*   Asegurar que los componentes sean visualmente consistentes y responsive.

Integración:
*   `CalendarComponent` y `RightPanel` serán hijos directos de `MiAgendaPage`.
*   `DayCell` será un hijo de `CalendarComponent`.
*   `ThisMonthSummary` y `SessionCard` serán hijos de `RightPanel`.

Criterios de Aceptación Técnica:
*   El `CalendarComponent` se renderiza mostrando un calendario mensual con botones de navegación para meses anterior/siguiente.
*   Los `DayCell`s dentro del calendario muestran el número del día y un indicador visual cuando tienen sesiones agendadas (`sessionCount > 0`).
*   Los días pasados se muestran con un estilo distinto (color gris claro).
*   El `RightPanel` muestra la cabecera "ESTE MES" y el conteo total de sesiones confirmadas (del `totalConfirmed`).
*   Las `SessionCard`s se renderizan correctamente dentro de `ThisMonthSummary` con la información básica (`time`, `courseName`, `studentName`) extraída del `monthlySummary`.
*   La maquetación general de los componentes `CalendarComponent` y `RightPanel` coincide con el frame de Figma para la vista inicial. ---END_PROMPT---

---START_COMMIT--- HU15-T04 feat(ui): crear componentes de calendario y resumen mensual ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Implementación de Server Action `fetchAgendaInitialData` con seed data HU_NUMBER: HU15 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La página de la agenda necesita cargar datos iniciales del calendario y el resumen mensual al renderizarse.
Objetivo: Implementar el Server Action `fetchAgendaInitialData` que, durante la fase de desarrollo, devolverá datos mockeados (seed data) para la agenda inicial del tutor, con el código real de `fetch` al backend pre-escrito y comentado para una futura integración.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/actions/agenda/agendaActions.ts`
*   `src/utils/auth/authUtils.ts` (ya creado en Tarea 2)
*   `src/seed/AgendaSeedData.ts` (ya creado en Tarea 1)
*   `src/interfaces/agenda/AgendaInterfaces.ts` (ya creado en Tarea 1)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   Crear el archivo `agendaActions.ts` y marcarlo con `'use server'`.
*   Definir la función `async function fetchAgendaInitialData(): Promise<{ success: boolean; data?: InitialAgendaData; error?: string }>`
*   Dentro de la función:
    *   Llamar a `getTutorIdFromSession()` para obtener el ID del tutor.
    *   Manejar el caso en que `tutorId` no esté disponible (retornar error).
    *   **Fase de Desarrollo:** Retornar `{ success: true, data: initialAgendaDataSeed }`.
    *   **Fase de Integración (comentado):** Incluir un bloque `try-catch` con la lógica completa para realizar un `fetch` a `process.env.NEXT_PUBLIC_API_URL/tutor/agenda/:tutorId`.
        *   Configurar `method: 'GET'`, `headers` (incluyendo `Authorization` si aplica) y `next: { revalidate: 0 }` para no cachear los datos de la agenda.
        *   Parsear la respuesta como `InitialAgendaData`.
        *   **Asegurarse de que este bloque de `fetch` esté completamente comentado.**
    *   Manejar errores de la petición (simulados o reales).

Validaciones:
*   La función debe ser un Server Action.
*   Debe retornar un objeto con `success`, `data` (si es exitoso) o `error` (si falla).
*   El `tutorId` debe ser obtenido de la utilidad `getTutorIdFromSession`.

Diseño: No aplica.

Integración: Este Server Action será invocado directamente por `MiAgendaPage` (Server Component) para la carga inicial de datos.

Criterios de Aceptación Técnica:
*   El Server Action `fetchAgendaInitialData` existe en `src/actions/agenda/agendaActions.ts` y está marcado con `'use server'`.
*   La función retorna el `initialAgendaDataSeed` (importado de `src/seed/AgendaSeedData.ts`) correctamente, envuelto en un objeto `{ success: true, data: ... }`.
*   El código de integración con el endpoint `GET /tutor/agenda/:tutorId` está presente dentro de la función pero completamente comentado.
*   Se utiliza la utilidad `getTutorIdFromSession` para obtener el ID del tutor (incluso si mockeado).
*   La función maneja un caso de error simulado (ej. si el `tutorId` es nulo) retornando `{ success: false, error: ... }`. ---END_PROMPT---

---START_COMMIT--- HU15-T05 feat(server-action): implementar fetchAgendaInitialData con seed ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Integración de `MiAgendaPage` con `fetchAgendaInitialData` para renderizar el calendario y el resumen mensual inicial HU_NUMBER: HU15 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Mi Agenda (Sesiones del mes desplegadas) ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Los componentes del calendario y el resumen mensual ya están definidos, y el Server Action para obtener los datos iniciales también.
Objetivo: Conectar `MiAgendaPage` con `fetchAgendaInitialData` para cargar y pasar los datos iniciales a `CalendarComponent` y `ThisMonthSummary`, haciendo que la vista inicial sea dinámica.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/app/tutor/agenda/page.tsx`
*   `src/actions/agenda/agendaActions.ts` (solo para importación)
*   `src/components/calendar/CalendarComponent/CalendarComponent.tsx` (modificar para aceptar props)
*   `src/components/agenda/RightPanel/RightPanel.tsx` (modificar para aceptar props)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   **`MiAgendaPage.tsx` (Server Component):**
    *   Importar `fetchAgendaInitialData`.
    *   Dentro del componente, llamar a `fetchAgendaInitialData()` usando `await`.
    *   Manejar la respuesta: si `success` es `false`, mostrar un mensaje de error o un fallback.
    *   Extraer `calendarDays`, `currentMonthName`, `currentYear` y `monthlySummary` de la `data` obtenida.
    *   Pasar `currentMonthName`, `currentYear` y `calendarDays` como props a `CalendarComponent`.
    *   Pasar `monthlySummary` como prop a `RightPanel`.
*   **`CalendarComponent.tsx`:** Actualizar la firma para aceptar `calendarDays`, `currentMonthName`, `currentYear` como props.
*   **`RightPanel.tsx`:** Actualizar la firma para aceptar `monthlySummary` como prop inicial.

Validaciones:
*   La página debe cargar y mostrar el calendario y el resumen mensual con los datos del seed.
*   Los datos deben coincidir con la estructura definida en `AgendaSeedData.ts`.
*   Si la llamada al Server Action falla, se debe mostrar un mensaje de error apropiado.

Diseño:
*   El diseño debe seguir el Frame `T. Mi Agenda (Sesiones del mes desplegadas)`.
*   El `CalendarComponent` y `RightPanel` deben renderizar los datos iniciales según las especificaciones de diseño.

Integración: `MiAgendaPage` actúa como orquestador, conectando la capa de datos (Server Action) con la capa de presentación (UI components).

Criterios de Aceptación Técnica:
*   `MiAgendaPage` invoca el `fetchAgendaInitialData` y consume los datos retornados.
*   El `CalendarComponent` se renderiza mostrando los días, el mes y el año, y los marcadores de sesiones basados en los `calendarDays` de `InitialAgendaData`.
*   El `RightPanel` muestra el `ThisMonthSummary` con el conteo total y la lista de `SessionCard`s extraídos del `monthlySummary` de `InitialAgendaData`.
*   La página carga sin errores visuales o de consola, y el contenido inicial refleja exactamente los datos proporcionados por el seed. ---END_PROMPT---

---START_COMMIT--- HU15-T06 feat(integration): conectar MiAgendaPage con datos iniciales ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Implementación de `selectDayHandler` en `DayCell`, Server Action `fetchDaySessions` con seed, y actualización de `RightPanel` HU_NUMBER: HU15 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Mi Agenda (Sesiones del mes desplegadas) ---END_FRAME---

---START_ESTIMATION--- 2.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El tutor necesita poder seleccionar un día en el calendario y ver las sesiones específicas de ese día en el panel lateral.
Objetivo: Implementar la interactividad del `DayCell` para disparar una acción al seleccionar un día, crear un Server Action `fetchDaySessions` que retorne datos de seed, y actualizar el `RightPanel` para mostrar la cabecera y las sesiones del día seleccionado.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/calendar/DayCell/DayCell.tsx`
*   `src/actions/agenda/agendaActions.ts`
*   `src/components/agenda/RightPanel/RightPanel.tsx`
*   `src/components/agenda/SelectedDayHeader/SelectedDayHeader.tsx` (Nuevo Client Component)
*   `src/seed/AgendaSeedData.ts` (solo para importación de `selectedDayInfoSeed`)
*   `src/interfaces/agenda/AgendaInterfaces.ts` (solo para importación de `SelectedDayInfo`)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   **`DayCell.tsx` (Client Component):**
    *   Añadir una prop `onDaySelect: (date: string) => void`.
    *   Implementar un `onClick` que invoque `onDaySelect` con la fecha del día en formato `YYYY-MM-DD`.
*   **`agendaActions.ts` (Server Action):**
    *   Definir `async function fetchDaySessions(dateString: string): Promise<{ success: boolean; data?: SelectedDayInfo; error?: string }>`.
    *   Obtener `tutorId` con `getTutorIdFromSession()`.
    *   **Fase de Desarrollo:** Retornar `{ success: true, data: selectedDayInfoSeed }`.
    *   **Fase de Integración (comentado):** Incluir bloque `fetch` a `process.env.NEXT_PUBLIC_API_URL/tutor/agenda/sessions?tutorId=:tutorId&date=:dateString`.
    *   Manejar errores.
*   **`RightPanel.tsx` (Client Component):**
    *   Gestionar un estado local (`useState`) para `selectedDayInfo` (inicialmente `null`) y `selectedDateString` (inicialmente la fecha actual del mes).
    *   Recibir una prop `onDaySelected: (date: string) => void` del padre (`MiAgendaPage`). Este `onDaySelected` llamará a `fetchDaySessions` y actualizará el estado `selectedDayInfo`.
    *   Renderizar `SelectedDayHeader` si `selectedDayInfo` no es `null`.
    *   La lista de `SessionCard`s se renderizará a partir de `selectedDayInfo.sessions` si un día está seleccionado, o de `monthlySummary.sessions` si no hay día seleccionado.
    *   Asegurar que `ThisMonthSummary` se "desplace" visualmente hacia abajo cuando `SelectedDayHeader` y las sesiones del día se renderizan en la parte superior del panel.
*   **`SelectedDayHeader.tsx` (Client Component):**
    *   Recibirá `date` (string) y `totalSessions` (number) como props.
    *   Mostrará la fecha formateada (ej. "Lunes, 24 de Octubre") y el conteo de sesiones ("3 sesiones").
    *   Incluirá el texto 'Toca para ver detalles →' como se muestra en el frame.

Validaciones:
*   Al hacer clic en un `DayCell`, se debe invocar `fetchDaySessions`.
*   El `RightPanel` debe actualizar su contenido con los datos del día seleccionado del seed.
*   El `ThisMonthSummary` debe reubicarse visualmente.

Diseño:
*   Coincidir con el Frame `T. Mi Agenda (Sesiones del mes desplegadas)`.
*   El `SelectedDayHeader` debe tener el fondo amarillo claro y borde resaltado como en el diseño.
*   Utilizar Tailwind CSS 4 para animaciones de desplazamiento y estilos.

Integración:
*   `MiAgendaPage` pasará la función de manejo de selección de día a `CalendarComponent` que a su vez la pasará a `DayCell`.
*   `RightPanel` consumirá el `selectedDayInfo` para renderizar su contenido.

Criterios de Aceptación Técnica:
*   Al hacer clic en un `DayCell` en el `CalendarComponent`, se invoca la función `onDaySelect` con la fecha del día en formato `YYYY-MM-DD`.
*   El Server Action `fetchDaySessions` existe en `src/actions/agenda/agendaActions.ts` y se invoca con la fecha correcta.
*   `fetchDaySessions` retorna el `selectedDayInfoSeed` correctamente envuelto en un objeto `{ success: true, data: ... }`.
*   El `RightPanel` actualiza su estado interno para reflejar el día seleccionado.
*   El `SelectedDayHeader` se renderiza en la parte superior del `RightPanel` con la fecha seleccionada y el conteo de sesiones del día.
*   Las `SessionCard`s mostradas en el `RightPanel` corresponden a las sesiones del día seleccionado (obtenidas del `selectedDayInfoSeed`).
*   El bloque `ThisMonthSummary` se desplaza visualmente hacia abajo o se reubica para dar espacio a la información del día seleccionado. ---END_PROMPT---

---START_COMMIT--- HU15-T07 feat(ui): implementar selección de día y panel de sesiones diarias ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 8 TASK_TITLE: Implementación de `openSessionDetailsHandler` en `SessionCard`, Server Action `fetchSessionDetails` con seed, y `SessionDetailModal` HU_NUMBER: HU15 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Mi Agenda (Detalle Tutoría) ---END_FRAME---

---START_ESTIMATION--- 3.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El tutor necesita ver los detalles completos de una tutoría al hacer clic en su tarjeta resumen. Estos detalles varían según la modalidad (Virtual/Presencial) y el estado (Pendiente/Completada).
Objetivo: Implementar un `onClick` en `SessionCard` para abrir un modal de detalles (`SessionDetailModal`), crear un Server Action `fetchSessionDetails` que retorne datos de seed con variaciones, y diseñar el `SessionDetailModal` para mostrar información condicional.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/session/SessionCard/SessionCard.tsx`
*   `src/actions/agenda/agendaActions.ts`
*   `src/components/session/SessionDetailModal/SessionDetailModal.tsx` (Nuevo Client Component)
*   `src/components/session/CompletedSessionBanner/CompletedSessionBanner.tsx` (Nuevo Client Component)
*   `src/seed/AgendaSeedData.ts` (para `sessionDetailDTOSeeds`)
*   `src/interfaces/session/SessionInterfaces.ts` (para `SessionDetailDTO`)
*   `src/app/tutor/agenda/page.tsx` (para gestionar el estado de apertura del modal)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   **`SessionCard.tsx` (Client Component):**
    *   Añadir una prop `onSessionClick: (sessionId: string) => void`.
    *   Implementar un `onClick` que invoque `onSessionClick` con el `id` de la sesión.
*   **`agendaActions.ts` (Server Action):**
    *   Definir `async function fetchSessionDetails(sessionId: string): Promise<{ success: boolean; data?: SessionDetailDTO; error?: string }>`.
    *   Obtener `tutorId` con `getTutorIdFromSession()`.
    *   **Fase de Desarrollo:** Buscar en `sessionDetailDTOSeeds` por el `sessionId` y retornar el objeto `{ success: true, data: ... }`. Si no se encuentra, retornar un error o un valor por defecto.
    *   **Fase de Integración (comentado):** Incluir bloque `fetch` a `process.env.NEXT_PUBLIC_API_URL/tutor/sessions/:id?tutorId=:tutorId`.
*   **`MiAgendaPage.tsx` (Server Component - o el componente que lo gestione):**
    *   Gestionar un estado `showModal` (boolean) y `selectedSessionId` (string | null).
    *   Implementar una función `openSessionDetailsHandler` que, al ser llamada desde `SessionCard`, actualice `selectedSessionId`, llame a `fetchSessionDetails` y muestre el modal con los datos.
    *   Pasar `sessionDetailData` como prop al `SessionDetailModal`.
*   **`SessionDetailModal.tsx` (Client Component):**
    *   Recibirá `isOpen` (boolean), `onClose` (función), y `sessionDetails` (SessionDetailDTO) como props.
    *   Maquetar la estructura de un modal estándar (fondo oscuro que bloquea la vista, contenido centrado, botón 'X' de cierre en la esquina superior derecha, título "Detalles de la Sesión").
    *   Renderizar la información del estudiante, bloques de materia, mensaje del estudiante.
    *   **Renderizado condicional por `modality`:**
        *   Si `sessionDetails.modality === 'VIRTUAL'`, mostrar un bloque "ENLACE" con la URL (`sessionDetails.link`).
        *   Si `sessionDetails.modality === 'PRESENCIAL'`, mostrar un bloque "LUGAR" (con un ícono de ubicación) con la dirección (`sessionDetails.location`).
    *   **Renderizado condicional por `status`:**
        *   Si `sessionDetails.status === 'COMPLETED'`:
            *   Renderizar el `CompletedSessionBanner` en la cabecera interna.
            *   En la botonera inferior, mostrar *solo* el botón "Cerrar".
        *   Si `sessionDetails.status === 'PENDING'`:
            *   En la botonera inferior, mostrar el botón "Cancelar Tutoría" (rojo con ícono de papelera) a la izquierda y el botón "Cerrar" a la derecha.
*   **`CompletedSessionBanner.tsx` (Client Component):**
    *   Componente simple que muestra el texto 'Tutoría completada. Esta tutoría ya se realizó. Solo puedes ver los detalles.' con fondo gris claro.

Validaciones:
*   El modal se abre al hacer clic en una tarjeta.
*   La información dentro del modal se carga dinámicamente según la sesión seleccionada.
*   La UI del modal cambia según la modalidad (ENLACE/LUGAR) y el estado (PENDIENTE/COMPLETADA).
*   La botonera inferior se ajusta según el estado de la sesión.

Diseño:
*   El `SessionDetailModal` debe replicar el Frame `T. Mi Agenda (Detalle Tutoría)`.
*   Utilizar Tailwind CSS 4 para el modal, superposición, animaciones, estilos condicionales y íconos (ej. `react-icons`).
*   Asegurar que el modal sea responsive y accesible.

Integración:
*   `SessionCard` invoca a una función padre para abrir el modal.
*   El modal consume los datos de `fetchSessionDetails` para su renderizado.

Criterios de Aceptación Técnica:
*   Al hacer clic en una `SessionCard`, se llama a `onSessionClick` con el ID de la sesión y se abre el `SessionDetailModal`.
*   El Server Action `fetchSessionDetails` existe en `src/actions/agenda/agendaActions.ts` y se invoca con el `sessionId`.
*   `fetchSessionDetails` retorna el `SessionDetailDTO` correspondiente del `sessionDetailDTOSeeds` (o un mock por defecto) correctamente.
*   El `SessionDetailModal` se abre y renderiza los detalles de la sesión obtenidos del `fetchSessionDetails`.
*   Los bloques "ENLACE" (para `VIRTUAL`) o "LUGAR" (para `PRESENCIAL`) se muestran correctamente según la `modality` de la sesión.
*   Si `status` es 'COMPLETED', el `CompletedSessionBanner` se muestra en la cabecera interna del modal, y la botonera inferior muestra *solo* el botón "Cerrar".
*   Si `status` es 'PENDING', la botonera inferior muestra los botones "Cancelar Tutoría" (rojo con papelera) y "Cerrar".
*   La información del estudiante asociado, los bloques de materia (fecha, hora, modalidad, precio) y el 'MENSAJE DEL ESTUDIANTE' se visualizan correctamente dentro del modal. ---END_PROMPT---

---START_COMMIT--- HU15-T08 feat(ui): implementar modal de detalles de sesión ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 9 TASK_TITLE: Implementación de `closeModalHandler` y `cancelTutoriaHandler` en `SessionDetailModal` HU_NUMBER: HU15 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Mi Agenda (Detalle Tutoría) ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El `SessionDetailModal` necesita funcionalidades para cerrarse y para iniciar el proceso de cancelación de una tutoría pendiente.
Objetivo: Implementar los handlers para cerrar el modal de detalles de sesión y para disparar el flujo de cancelación de tutorías desde el botón correspondiente.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/session/SessionDetailModal/SessionDetailModal.tsx`
*   `src/app/tutor/agenda/page.tsx` (para gestionar el estado `isOpen` del modal)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   **`SessionDetailModal.tsx` (Client Component):**
    *   La prop `onClose` ya debe existir. Conectar esta función al botón "Cerrar" en la botonera inferior y al ícono 'X' de la esquina superior derecha.
    *   Añadir una prop `onCancelTutoria: (sessionId: string) => void` a `SessionDetailModal`.
    *   Implementar un `onClick` para el botón "Cancelar Tutoría" que invoque `onCancelTutoria` con el `id` de la sesión actual.
*   **`MiAgendaPage.tsx` (o el componente padre que gestiona el modal):**
    *   La función `closeModalHandler` debe actualizar el estado `showModal` a `false` y resetear `selectedSessionId` a `null`.
    *   La función `cancelTutoriaHandler(sessionId: string)` debe:
        *   Cerrar el `SessionDetailModal` (llamando al `closeModalHandler` interno).
        *   Redirigir al usuario a la ruta de cancelación, pasando el `sessionId` como parámetro de consulta (ej. `router.push('/tutor/cancelar-tutoria?sessionId=' + sessionId)`). Usar `useRouter` de `next/navigation`.

Validaciones:
*   El modal se cierra al hacer clic en "Cerrar" o en la 'X'.
*   Al cerrar, el estado de la página principal (día seleccionado, tarjetas) se mantiene.
*   Al hacer clic en "Cancelar Tutoría", el modal se cierra y se inicia una redirección con el ID de sesión.

Diseño:
*   Los botones deben mantener el estilo definido en el Frame `T. Mi Agenda (Detalle Tutoría)`.
*   El cierre del modal debe ser suave y sin interrupciones visuales en la página de fondo.

Integración:
*   Las funciones de cierre y cancelación son manejadas por el componente padre que controla el estado del modal.

Criterios de Aceptación Técnica:
*   Al hacer clic en el botón "Cerrar" o en el ícono 'X' en el `SessionDetailModal`, este se cierra y la vista principal de la agenda recupera el foco, preservando el estado previo del calendario y el panel lateral.
*   Al hacer clic en el botón "Cancelar Tutoría" (visible solo para sesiones pendientes), el `SessionDetailModal` se cierra.
*   Inmediatamente después del cierre del modal por cancelación, se inicia una redirección simulada a una URL de cancelación (ej. `/tutor/cancelar-tutoria?sessionId=<id>`). ---END_PROMPT---

---START_COMMIT--- HU15-T09 feat(modal): implementar cierre y cancelación en modal de detalles ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 10 TASK_TITLE: Integración con backend real: Descomentar `fetchAgendaInitialData` HU_NUMBER: HU15 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La fase de desarrollo utilizando seed data para la carga inicial de la agenda ha concluido. El backend `GET /tutor/agenda/:tutorId` está listo.
Objetivo: Modificar el Server Action `fetchAgendaInitialData` para que realice una llamada real al backend, utilizando el código `fetch` previamente comentado y eliminando el retorno del seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/actions/agenda/agendaActions.ts`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   En `src/actions/agenda/agendaActions.ts`, dentro de `fetchAgendaInitialData`:
    *   Comentar o eliminar la línea que retorna `{ success: true, data: initialAgendaDataSeed }`.
    *   Descomentar el bloque completo `try-catch` que contiene la petición `fetch` al endpoint `GET /tutor/agenda/:tutorId`.
    *   Asegurarse de que `process.env.NEXT_PUBLIC_API_URL` esté configurado correctamente para apuntar al backend.
    *   Verificar que los `headers` de la petición (especialmente `Authorization`) sean correctos y se obtengan del `tutorId` de la sesión.
    *   Mantener el `next: { revalidate: 0 }` para asegurar que los datos no se cacheaden estáticamente.

Validaciones:
*   La aplicación debe cargar el calendario y el resumen mensual con datos provenientes del backend real.
*   No deben existir errores de red o del servidor.
*   La estructura de los datos del backend debe coincidir con `InitialAgendaData`.

Diseño: No aplica, la UI debe seguir mostrando la misma estructura y estilos, pero con datos reales.

Integración: Conexión directa con el endpoint `GET /tutor/agenda/:tutorId` del backend.

Criterios de Aceptación Técnica:
*   La petición `fetch` en `fetchAgendaInitialData` se ejecuta correctamente hacia el backend real.
*   La respuesta del backend tiene la estructura `InitialAgendaData` esperada y se parsea sin errores.
*   Los errores de red y del servidor (ej. 4xx, 5xx) se manejan apropiadamente dentro del Server Action, retornando `{ success: false, error: ... }`.
*   El `CalendarComponent` y el `ThisMonthSummary` en la `MiAgendaPage` se renderizan con los datos obtenidos del backend sin requerir cambios adicionales en la UI. ---END_PROMPT---

---START_COMMIT--- HU15-T10 chore(integration): descomentar fetchAgendaInitialData para backend real ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 11 TASK_TITLE: Integración con backend real: Descomentar `fetchDaySessions` HU_NUMBER: HU15 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La fase de desarrollo utilizando seed data para la obtención de sesiones por día ha concluido. El backend `GET /tutor/agenda/sessions?date` está listo.
Objetivo: Modificar el Server Action `fetchDaySessions` para que realice una llamada real al backend, utilizando el código `fetch` previamente comentado y eliminando el retorno del seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/actions/agenda/agendaActions.ts`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   En `src/actions/agenda/agendaActions.ts`, dentro de `fetchDaySessions`:
    *   Comentar o eliminar la línea que retorna `{ success: true, data: selectedDayInfoSeed }`.
    *   Descomentar el bloque completo `try-catch` que contiene la petición `fetch` al endpoint `GET /tutor/agenda/sessions?tutorId=:tutorId&date=:dateString`.
    *   Asegurarse de que `process.env.NEXT_PUBLIC_API_URL` esté configurado correctamente.
    *   Verificar que los `headers` de la petición sean correctos.

Validaciones:
*   Al hacer clic en un día del calendario, el panel lateral derecho (`RightPanel`) debe actualizarse con datos provenientes del backend real para ese día.
*   No deben existir errores de red o del servidor.
*   La estructura de los datos del backend debe coincidir con `SelectedDayInfo`.

Diseño: No aplica.

Integración: Conexión directa con el endpoint `GET /tutor/agenda/sessions?date` del backend.

Criterios de Aceptación Técnica:
*   La petición `fetch` en `fetchDaySessions` se ejecuta correctamente hacia el backend real al seleccionar un día en el calendario.
*   La respuesta del backend tiene la estructura `SelectedDayInfo` esperada y se parsea sin errores.
*   El `RightPanel` actualiza la `SelectedDayHeader` y la lista de `SessionCard`s del día seleccionado con los datos obtenidos del backend.
*   Los errores de red y del servidor se manejan apropiadamente. ---END_PROMPT---

---START_COMMIT--- HU15-T11 chore(integration): descomentar fetchDaySessions para backend real ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 12 TASK_TITLE: Integración con backend real: Descomentar `fetchSessionDetails` HU_NUMBER: HU15 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La fase de desarrollo utilizando seed data para la obtención de detalles de sesión ha concluido. El backend `GET /tutor/sessions/:id` está listo.
Objetivo: Modificar el Server Action `fetchSessionDetails` para que realice una llamada real al backend, utilizando el código `fetch` previamente comentado y eliminando el retorno del seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/actions/agenda/agendaActions.ts`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   En `src/actions/agenda/agendaActions.ts`, dentro de `fetchSessionDetails`:
    *   Comentar o eliminar la línea que retorna el seed `SessionDetailDTO`.
    *   Descomentar el bloque completo `try-catch` que contiene la petición `fetch` al endpoint `GET /tutor/sessions/:id?tutorId=:tutorId`.
    *   Asegurarse de que `process.env.NEXT_PUBLIC_API_URL` esté configurado correctamente.
    *   Verificar que los `headers` de la petición sean correctos.

Validaciones:
*   Al hacer clic en una tarjeta de sesión, el `SessionDetailModal` debe abrirse y mostrar los detalles de la sesión provenientes del backend real.
*   No deben existir errores de red o del servidor.
*   La estructura de los datos del backend debe coincidir con `SessionDetailDTO`.

Diseño: No aplica.

Integración: Conexión directa con el endpoint `GET /tutor/sessions/:id` del backend.

Criterios de Aceptación Técnica:
*   La petición `fetch` en `fetchSessionDetails` se ejecuta correctamente hacia el backend real al hacer clic en una `SessionCard`.
*   La respuesta del backend tiene la estructura `SessionDetailDTO` esperada y se parsea sin errores.
*   El `SessionDetailModal` se renderiza con los datos obtenidos del backend para la sesión detallada.
*   Los bloques condicionales (ENLACE/LUGAR, banner de Completada, botones) se comportan correctamente según los datos reales del backend.
*   Los errores de red y del servidor se manejan apropiadamente. ---END_PROMPT---

---START_COMMIT--- HU15-T12 chore(integration): descomentar fetchSessionDetails para backend real ---END_COMMIT---