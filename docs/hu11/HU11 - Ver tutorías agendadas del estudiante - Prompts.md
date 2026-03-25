---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed para Tutorías Agendadas (`TutoriasAgendadasDTO[]`). HU_NUMBER: HU11 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Crear un archivo de seed que contenga un array de objetos `TutoriasAgendadasDTO`. Este seed simulará la respuesta completa que se espera del endpoint `GET /api/tutorias/agendadas` del backend, incluyendo los campos `enlaceReunion` o `direccion` según la modalidad. Incluirá tutorías futuras (próximas) y pasadas para propósitos de prueba de filtrado y visualización, aunque solo se renderizarán las próximas en este sprint.
Objetivo: Generar datos de ejemplo realistas y variados para tutorías agendadas, que servirán como mock de la API para el desarrollo frontend.

Especificaciones Técnicas:
Archivos a crear/modificar:
*   `src/lib/seeds/scheduled-tutorias.ts` (mover a `src/seed/scheduled-tutorias.ts` para seguir las convenciones).
*   `src/interfaces/tutorias-agendadas/TutoriasAgendadasDTO.ts` (para la definición de DTOs, siguiendo las convenciones).

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React.

Estructura:
*   Definir la interfaz `TutoriasAgendadasDTO` y `TutorAgendadoDTO` (o importarlas si ya existen) en `src/interfaces/tutorias-agendadas/TutoriasAgendadasDTO.ts` que coincida exactamente con la estructura de datos documentada en los DTOs de NestJS.
*   En `src/seed/scheduled-tutorias.ts`, crear un array de al menos 5-7 objetos de `TutoriasAgendadasDTO` con datos de ejemplo realistas.
    *   Incluir al menos 3 tutorías con `modalidad: 'Virtual'` y su `enlaceReunion` correspondiente (e.g., "https://meet.google.com/xyz-abc").
    *   Incluir al menos 2 tutorías con `modalidad: 'Presencial'` y su `direccion` correspondiente (e.g., "Av. 12 de Octubre y Roca, Edificio A, Piso 3").
    *   Asegurar que haya tutorías con `estado: 'AGENDADA'` (futuras, con fechas y horas en el futuro).
    *   Asegurar que haya tutorías con `estado: 'COMPLETADA'` (pasadas, con fechas y horas en el pasado) y `estado: 'CANCELADA'` para futuras pruebas y para la lógica de filtrado inicial, aunque la sección "Anteriores" no se renderice en este sprint.
    *   Incluir datos de `tutor` (id, nombre, apellido, fotoUrl) para cada tutoría.
*   Exportar la función `getScheduledTutoriasSeedData()` que retorne este array de datos.
*   Añadir comentarios documentando la estructura de los datos para facilitar su comprensión.

Criterios de Aceptación Técnica:
*   El archivo `scheduled-tutorias.ts` existe y exporta una función que devuelve un array de `TutoriasAgendadasDTO[]`.
*   El seed contiene una variedad de tutorías que cubren diferentes modalidades (Virtual, Presencial) y estados (AGENDADA, COMPLETADA, CANCELADA).
*   La estructura de los objetos en el seed coincide exactamente con la `TutoriasAgendadasDTO` (incluyendo `enlaceReunion` o `direccion` condicionalmente).
*   Los datos de ejemplo son coherentes y realistas. ---END_PROMPT---

---START_COMMIT--- HU11-T01 feat(seed): crear seed para tutorías agendadas ---END_COMMIT---
---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Implementación de `getScheduledTutoriasAction` con seed data. HU_NUMBER: HU11 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Implementar el Server Action `getScheduledTutoriasAction` en Next.js. Este action será responsable de obtener la lista de tutorías agendadas para el estudiante. En esta fase, el action devolverá el seed data creado en la Tarea 1, y el código de la llamada `fetch` al backend real de NestJS estará presente pero completamente comentado.
Objetivo: Crear un Server Action que simule la obtención de datos de tutorías agendadas, utilizando datos seed, y preparar la estructura para una futura integración real con el backend.

Especificaciones Técnicas:
Archivos a crear/modificar:
*   `src/actions/tutorias-agendadas/getScheduledTutoriasAction.ts` (siguiendo las convenciones).
*   `src/seed/scheduled-tutorias.ts` (para importar el seed data).
*   `src/interfaces/tutorias-agendadas/TutoriasAgendadasDTO.ts` (para la definición de DTOs).

Tecnologías: Next.js 16 (Server Actions), TypeScript, React.

Estructura:
*   Crear el archivo `src/actions/tutorias-agendadas/getScheduledTutoriasAction.ts` y marcarlo con `'use server'`.
*   Importar el seed data creado en la Tarea 1 (`getScheduledTutoriasSeedData`).
*   Implementar la función asíncrona `getScheduledTutoriasAction()`:
    *   Simular la obtención del `authToken` de las cookies (e.g., `cookies().get('auth_token')?.value`).
    *   Retornar una respuesta exitosa que contenga el `getScheduledTutoriasSeedData()`.
    *   Simular un pequeño retraso (`await new Promise(resolve => setTimeout(resolve, 500))`) para emular latencia de red (opcional, pero útil para testing UI de carga).
*   Escribir el bloque completo de código para la llamada `fetch` al endpoint `GET /api/tutorias/agendadas`:
    *   Configurar `method: 'GET'`, `headers` (Content-Type, Authorization con Bearer Token). Usar `process.env.NEXT_PUBLIC_API_BASE_URL`.
    *   Incluir lógica `try-catch` para manejo de errores de red y de API.
    *   Parsear la respuesta JSON y manejar `response.ok`.
    *   Retornar un objeto con `data` o `error` siguiendo un patrón consistente (e.g., `{ data: T[], error?: string }`).
    *   **Comentar todo este bloque de código `fetch` para que no se ejecute en esta fase.**
*   Documentar en comentarios dentro del archivo la estructura de la respuesta esperada del backend y las posibles respuestas de error.

Criterios de Aceptación Técnica:
*   `getScheduledTutoriasAction` es un Server Action correctamente definido.
*   La función `getScheduledTutoriasAction()` retorna el seed data de `scheduled-tutorias.ts`.
*   El código de la llamada `fetch` al backend (`GET /api/tutorias/agendadas`) está completamente presente pero comentado.
*   El Server Action maneja de forma simulada la autenticación (obtención de token).
*   La estructura de la respuesta del Server Action (`{ data: ..., error?: ... }`) es consistente y lista para ser consumida por la página. ---END_PROMPT---

---START_COMMIT--- HU11-T02 feat(server-action): implementar getScheduledTutoriasAction con seed ---END_COMMIT---
---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Creación y maquetación de `AgendaNavButton` (Client Component). HU_NUMBER: HU11 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Implementar el componente de navegación `AgendaNavButton`. Este será un componente de cliente que representa el enlace "Agenda" en la cabecera de la aplicación y que permite al usuario navegar a la pantalla de Tutorías Agendadas (`/agenda`).
Objetivo: Crear un componente de botón de navegación reutilizable que redirija a la página de agenda.

Especificaciones Técnicas:
Archivos a crear/modificar:
*   `src/components/ui/agenda-nav-button/AgendaNavButton.tsx` (siguiendo las convenciones).
*   `src/app/layout.tsx` (para integrar el botón en la cabecera, si aplica).

Tecnologías: Next.js 16 (Client Component), React, TypeScript, Tailwind CSS 4.

Estructura:
*   Crear el archivo `src/components/ui/agenda-nav-button/AgendaNavButton.tsx` y marcarlo con `'use client'`.
*   Utilizar el componente `Link` de `next/link` para crear un enlace navegable.
*   Establecer la ruta `href` del enlace a `/agenda`.
*   Añadir el texto "Agenda" y, opcionalmente, un ícono representativo (e.g., de `react-icons/fa` o similar).
*   Aplicar estilos básicos utilizando Tailwind CSS 4 para que el botón se vea como un elemento de navegación. Considerar estados de `:hover` y `active`.
*   Asegurar que al hacer clic redirija correctamente a la ruta `/agenda`.

Diseño:
*   El botón debe integrarse estéticamente en la cabecera existente de la aplicación, manteniendo la paleta de colores y tipografía del proyecto.
*   Debe ser responsive y accesible.

Criterios de Aceptación Técnica:
*   El `AgendaNavButton` se renderiza correctamente en la interfaz.
*   Al hacer clic en el botón, el usuario es redirigido a la ruta `/agenda`.
*   El componente está estilizado de acuerdo a un diseño básico de navegación. ---END_PROMPT---

---START_COMMIT--- HU11-T03 feat(ui): crear AgendaNavButton para navegación ---END_COMMIT---
---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Creación y maquetación de `AgendaPage` (Server Component). HU_NUMBER: HU11 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Agenda ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Implementar el componente de página principal `AgendaPage`. Este será un Server Component que se encargará de la carga inicial de datos (tutorías agendadas) utilizando `getScheduledTutoriasAction` y de la maquetación general de la pantalla de Tutorías Agendadas, incluyendo el título principal y subtítulo.
Objetivo: Crear la página principal para mostrar las tutorías agendadas, encargándose de la carga de datos inicial y la estructura básica de la interfaz.

Especificaciones Técnicas:
Archivos a crear/modificar:
*   `src/app/agenda/page.tsx` (siguiendo las convenciones).
*   `src/actions/tutorias-agendadas/getScheduledTutoriasAction.ts` (para la llamada a la acción).
*   `src/interfaces/tutorias-agendadas/TutoriasAgendadasDTO.ts` (para la definición de DTOs).

Tecnologías: Next.js 16 (Server Component), React, TypeScript, Tailwind CSS 4.

Estructura:
*   Crear el archivo `src/app/agenda/page.tsx`.
*   Definir el componente `AgendaPage` como una función asíncrona.
*   Dentro de `AgendaPage`, llamar a `getScheduledTutoriasAction()` para obtener las tutorías agendadas.
*   Manejar el estado de carga y error:
    *   Si `getScheduledTutoriasAction` devuelve un error, mostrar un mensaje de error amigable.
    *   Considerar un fallback de UI si la acción es lenta (aunque los Server Components suelen resolver antes del render).
*   Maquetar la estructura principal de la página:
    *   Añadir el título principal: 'Tutorías Agendadas' (usando un `<h1>` con estilos de Tailwind CSS 4).
    *   Añadir el subtítulo: 'Lista cronológica de tus sesiones confirmadas' (usando un `<p>` o `<h2>` con estilos de Tailwind CSS 4).
    *   Crear un contenedor (`<div>`) principal para la lista de tutorías, donde se renderizará el componente `TutoriasList` (a desarrollar en tareas posteriores).
*   Aplicar estilos con Tailwind CSS 4 para que la página coincida con el diseño general del frame 'E. Agenda' (título y subtítulo).
*   Pasar los datos obtenidos (`TutoriasAgendadasDTO[]`) al componente `TutoriasList` (que se implementará en tareas posteriores) como prop.

Diseño:
*   El diseño del título y subtítulo debe reflejar el frame 'E. Agenda'.
*   La página debe tener un layout responsive.

Criterios de Aceptación Técnica:
*   La ruta `/agenda` carga y renderiza correctamente la `AgendaPage`.
*   La página muestra el título 'Tutorías Agendadas' y el subtítulo 'Lista cronológica de tus sesiones confirmadas'.
*   `AgendaPage` llama a `getScheduledTutoriasAction` y está preparada para recibir y pasar los datos a los componentes hijos.
*   El manejo básico de errores y carga para la obtención de datos está implementado.
*   El diseño de la página corresponde al frame 'E. Agenda' para el título y subtítulo. ---END_PROMPT---

---START_COMMIT--- HU11-T04 feat(page): crear y maquetar AgendaPage ---END_COMMIT---
---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Creación y maquetación de `TutoriasCard` (Client Component). HU_NUMBER: HU11 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Agenda ---END_FRAME---

---START_ESTIMATION--- 2.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Implementar el componente `TutoriasCard`, que representa una tarjeta individual para una tutoría agendada. Este será un Client Component, ya que será interactivo (se podrá hacer clic en él). Mostrará la fecha, horario, materia y el nombre y foto del tutor.
Objetivo: Diseñar y construir un componente de tarjeta interactivo para mostrar los detalles clave de una tutoría individual.

Especificaciones Técnicas:
Archivos a crear/modificar:
*   `src/components/tutorias-agendadas/tutorias-card/TutoriasCard.tsx` (siguiendo las convenciones).
*   `src/interfaces/tutorias-agendadas/TutoriasAgendadasDTO.ts` (para la interfaz de datos).

Tecnologías: Next.js 16 (Client Component), React, TypeScript, Tailwind CSS 4.

Estructura:
*   Crear el archivo `src/components/tutorias-agendadas/tutorias-card/TutoriasCard.tsx` y marcarlo con `'use client'`.
*   Definir la interfaz de props para el componente `TutoriasCard`, esperando recibir un objeto `TutoriasAgendadasDTO` (que contendrá todos los campos necesarios para la card y el modal) y una función `onCardClick: (tutoria: TutoriasAgendadasDTO) => void`.
*   Maquetar la estructura de la tarjeta siguiendo el diseño del frame 'E. Agenda':
    *   Contenedor principal de la tarjeta (debe ser clicable, e.g., `<button>` o `<div>` con `onClick`).
    *   Sección para fecha (formateada, resaltada).
    *   Sección para horario (formateado, resaltado).
    *   Sección para materia.
    *   Sección para el tutor (foto de perfil y nombre completo).
    *   Asegurar que el diseño sea adaptable y visualmente atractivo.
*   Aplicar estilos con Tailwind CSS 4 para lograr el aspecto visual de las tarjetas en el frame 'E. Agenda'. Utilizar clases como `flex`, `grid`, `gap`, `bg-white`, `shadow-md`, `rounded-lg`, `p-4`, etc.
*   Implementar el evento `onClick` en el contenedor de la tarjeta para que invoque la función `onCardClick` recibida como prop, pasándole los datos de la tutoría (`props.tutoria`).

Diseño:
*   El diseño de la tarjeta debe replicar fielmente el estilo y la disposición de elementos mostrados en el frame 'E. Agenda'.
*   La tarjeta debe tener un estado visual de `:hover` para indicar que es interactiva.
*   Considerar el uso de `next/image` para la foto del tutor para optimización.

Criterios de Aceptación Técnica:
*   El componente `TutoriasCard` se renderiza correctamente con los datos de una tutoría.
*   La tarjeta muestra la fecha, hora, materia, nombre del tutor y su foto de perfil.
*   El diseño de la tarjeta coincide con las especificaciones del frame 'E. Agenda'.
*   La tarjeta es un elemento interactivo que responde a eventos de clic. ---END_PROMPT---

---START_COMMIT--- HU11-T05 feat(ui): crear y maquetar TutoriasCard ---END_COMMIT---
---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Creación y maquetación de `TutoriasList` (Client Component). HU_NUMBER: HU11 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Agenda (principalmente la sección "PRÓXIMAS") ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Implementar el componente `TutoriasList`. Este Client Component recibirá la lista completa de tutorías agendadas (incluyendo próximas y pasadas) del `AgendaPage` Server Component. Deberá filtrar las tutorías para mostrar **únicamente la sección 'PRÓXIMAS'** (tutorías futuras) y renderizar el encabezado 'PRÓXIMAS (X)' (donde X es el número de tutorías próximas). Para cada tutoría próxima, renderizará una `TutoriasCard`. La sección 'ANTERIORES' se excluye de la implementación en este sprint.
Objetivo: Mostrar la lista filtrada de tutorías próximas en tarjetas interactivas, cumpliendo con los requisitos de diseño y exclusiones.

Especificaciones Técnicas:
Archivos a crear/modificar:
*   `src/components/tutorias-agendadas/tutorias-list/TutoriasList.tsx` (siguiendo las convenciones).
*   `src/components/tutorias-agendadas/tutorias-card/TutoriasCard.tsx` (para la renderización de tarjetas).
*   `src/interfaces/tutorias-agendadas/TutoriasAgendadasDTO.ts` (para la interfaz de datos).

Tecnologías: Next.js 16 (Client Component), React, TypeScript, Tailwind CSS 4.

Estructura:
*   Crear el archivo `src/components/tutorias-agendadas/tutorias-list/TutoriasList.tsx` y marcarlo con `'use client'`.
*   Definir la interfaz de props para el componente `TutoriasList`, esperando recibir un array de `tutorias: TutoriasAgendadasDTO[]` y una función `onCardClick: (tutoria: TutoriasAgendadasDTO) => void`.
*   Implementar la lógica para filtrar las tutorías:
    *   Dentro del componente (e.g., usando `useMemo` si las props no cambian mucho, o directamente en el render), obtener la fecha y hora actual del sistema.
    *   Filtrar el array `tutorias` para identificar solo las que tienen una fecha y hora posteriores a la actual, considerándolas "próximas".
*   Maquetar la sección 'PRÓXIMAS':
    *   Renderizar el título 'PRÓXIMAS (X)', donde `X` es el número de tutorías filtradas como próximas. Utilizar estilos de Tailwind CSS 4 para el título.
    *   Iterar sobre el array de tutorías próximas y, para cada una, renderizar un componente `TutoriasCard`, pasándole los datos de la tutoría como props y la función `onCardClick`.
    *   Asegurarse de que las tarjetas se organicen en una cuadrícula o lista visualmente agradable (usar `grid` o `flex` de Tailwind).
*   **Asegurarse de que la sección 'ANTERIORES' no se renderice en absoluto en este sprint, de acuerdo con las observaciones de la HU.**

Diseño:
*   El diseño de la lista y el encabezado 'PRÓXIMAS (X)' deben coincidir con la parte superior del frame 'E. Agenda'.
*   Debe ser responsive, ajustando la disposición de las tarjetas en diferentes tamaños de pantalla.

Criterios de Aceptación Técnica:
*   El componente `TutoriasList` recibe y procesa correctamente el array de tutorías.
*   Se renderiza el encabezado 'PRÓXIMAS (X)' con el conteo correcto de tutorías futuras.
*   Solo las tutorías futuras (próximas) se renderizan utilizando el componente `TutoriasCard`.
*   La sección de tutorías 'ANTERIORES' no se muestra en la interfaz.
*   El diseño general de la lista coincide con la parte superior del frame 'E. Agenda'. ---END_PROMPT---

---START_COMMIT--- HU11-T06 feat(ui): crear y maquetar TutoriasList para próximas tutorías ---END_COMMIT---
---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Creación y maquetación de `DetallesSesionModal` (Client Component). HU_NUMBER: HU11 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Agenda (Detalle Tutoría Próxima) ---END_FRAME---

---START_ESTIMATION--- 2.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Implementar la estructura base y la maquetación del componente modal `DetallesSesionModal`. Este será un Client Component que se activa al hacer clic en una tarjeta de tutoría. Mostrará información detallada de la sesión, incluyendo la foto y nombre del tutor, y datos generales de la sesión. Deberá incluir un botón "Cerrar" funcional. **Es crucial recordar que el botón "Cancelar Tutoría" y su funcionalidad están excluidos de este sprint según las observaciones.**
Objetivo: Construir un modal de detalles de sesión con información de la tutoría y un botón para cerrarlo, excluyendo elementos no requeridos.

Especificaciones Técnicas:
Archivos a crear/modificar:
*   `src/components/modals/detalles-sesion-modal/DetallesSesionModal.tsx` (siguiendo las convenciones).
*   `src/interfaces/tutorias-agendadas/TutoriasAgendadasDTO.ts` (para la interfaz de datos).

Tecnologías: Next.js 16 (Client Component), React, TypeScript, Tailwind CSS 4, clsx (para manejo condicional de clases).

Estructura:
*   Crear el archivo `src/components/modals/detalles-sesion-modal/DetallesSesionModal.tsx` y marcarlo con `'use client'`.
*   Definir la interfaz de props para el modal, incluyendo `isOpen: boolean`, `onClose: () => void`, y `tutoria: TutoriasAgendadasDTO | null`.
*   Implementar la estructura básica del modal:
    *   Un overlay semitransparente que ocupe toda la pantalla cuando `isOpen` es `true`.
    *   Un contenedor central para el contenido del modal, que esté centrado vertical y horizontalmente.
    *   Cabecera con título 'Detalles de la Sesión' y un botón o ícono 'X' para cerrar (`onClose`).
    *   Cuerpo principal con las secciones de información.
    *   Pie de página con los botones de acción.
*   En el cuerpo del modal, maquetar las secciones de información:
    *   Sección superior con la foto de perfil del tutor (usar `next/image` si aplica) y su nombre completo (e.g., "Juan Pérez").
    *   Bloque central para los datos generales de la sesión (fecha, hora, tarifa, modalidad). Formatear fecha y hora adecuadamente.
    *   Bloque 'TU MENSAJE' que se renderizará condicionalmente si `tutoria.mensajeEstudiante` existe y no está vacío.
*   En el pie de página, renderizar solo el botón "Cerrar" (con estilos de Tailwind CSS 4).
*   Implementar la lógica para que el modal se muestre (`isOpen`) y se oculte (`onClose`) correctamente, usando estilos de `visibility`, `opacity` o animaciones de Tailwind CSS 4.
*   **Asegurarse de que el botón "Cancelar Tutoría" no sea renderizado en este sprint, siguiendo las observaciones de la HU.**

Diseño:
*   El diseño del modal (colores, tipografía, espaciado, forma) debe ajustarse al frame 'E. Agenda (Detalle Tutoría Próxima)'.
*   El modal debe ser responsive.
*   El overlay debe oscurecer el contenido de la página de fondo.

Criterios de Aceptación Técnica:
*   El `DetallesSesionModal` se muestra y oculta correctamente mediante los props `isOpen` y `onClose`.
*   La estructura del modal (cabecera, cuerpo, pie de página) está bien definida.
*   El modal muestra la foto y nombre del tutor, y los datos generales de la sesión (fecha, hora, tarifa, modalidad).
*   El bloque 'TU MENSAJE' se renderiza condicionalmente si hay un mensaje.
*   El botón "Cerrar" es funcional y cierra el modal.
*   El botón "Cancelar Tutoría" no está presente en el modal.
*   El diseño del modal coincide con el frame 'E. Agenda (Detalle Tutoría Próxima)' (excluyendo el botón de cancelación). ---END_PROMPT---

---START_COMMIT--- HU11-T07 feat(ui): crear y maquetar DetallesSesionModal ---END_COMMIT---
---START_TASK--- TASK_NUMBER: 8 TASK_TITLE: Implementación de lógica condicional en `DetallesSesionModal` por modalidad. HU_NUMBER: HU11 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Agenda (Detalle Tutoría Próxima) ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Mejorar el `DetallesSesionModal` para que adapte dinámicamente el contenido de un bloque central según la modalidad de la tutoría. Si la modalidad es 'Virtual', se mostrará un bloque 'ENLACE' con el hipervínculo de la reunión. Si es 'Presencial', se mostrará un bloque 'LUGAR' con la dirección y un ícono de ubicación.
Objetivo: Implementar la lógica para que el modal de detalles de sesión muestre información específica (enlace o dirección) según la modalidad de la tutoría.

Especificaciones Técnicas:
Archivos a crear/modificar:
*   `src/components/modals/detalles-sesion-modal/DetallesSesionModal.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, react-icons (para el ícono de ubicación).

Estructura:
*   Abrir el archivo `src/components/modals/detalles-sesion-modal/DetallesSesionModal.tsx`.
*   Dentro del cuerpo del modal, localizar el área donde se debe mostrar la información específica de la modalidad.
*   Implementar lógica condicional (`if/else` o ternario) basada en `tutoria.modalidad`:
    *   Si `tutoria.modalidad === 'Virtual'`:
        *   Renderizar un bloque con el título 'ENLACE'.
        *   Dentro de este bloque, mostrar `tutoria.enlaceReunion` como un hipervínculo clicable (usando `<a href={tutoria.enlaceReunion} target="_blank" rel="noopener noreferrer">...</a>`) en color azul. Asegurarse de que sea un enlace seguro y funcional.
    *   Si `tutoria.modalidad === 'Presencial'`:
        *   Renderizar un bloque con el título 'LUGAR'.
        *   Incluir un ícono de ubicación o mapa (e.g., `<FaMapMarkerAlt />` de `react-icons/fa`) junto a la dirección.
        *   Mostrar `tutoria.direccion`.
*   Aplicar estilos con Tailwind CSS 4 para que estos bloques condicionales se vean bien integrados y coincidan con el frame 'E. Agenda (Detalle Tutoría Próxima)'.

Diseño:
*   Los bloques 'ENLACE' y 'LUGAR' deben tener un diseño claro y consistente con el resto del modal, siguiendo el frame de Figma.
*   El hipervínculo debe ser visible y clicable. El ícono de ubicación debe ser reconocible.

Criterios de Aceptación Técnica:
*   El modal `DetallesSesionModal` muestra el bloque 'ENLACE' con un hipervínculo funcional cuando la tutoría es 'Virtual'.
*   El modal `DetallesSesionModal` muestra el bloque 'LUGAR' con la dirección y un ícono cuando la tutoría es 'Presencial'.
*   El contenido del bloque de modalidad se adapta correctamente sin mostrar información irrelevante.
*   Los estilos aplicados a estos bloques coinciden con el diseño del frame. ---END_PROMPT---

---START_COMMIT--- HU11-T08 feat(modal): adaptar DetallesSesionModal por modalidad ---END_COMMIT---
---START_TASK--- TASK_NUMBER: 9 TASK_TITLE: Conexión de `TutoriasCard` con `DetallesSesionModal`. HU_NUMBER: HU11 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Agenda, E. Agenda (Detalle Tutoría Próxima) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Implementar la lógica para que al hacer clic en una `TutoriasCard`, se abra el `DetallesSesionModal` y se le pasen los datos de la tutoría correspondiente. Esto implica gestionar el estado de visibilidad del modal y los datos de la tutoría seleccionada en el componente `TutoriasList` o `AgendaPage`.
Objetivo: Conectar la interacción de clic en las tarjetas de tutoría con la apertura del modal de detalles, gestionando el estado necesario.

Especificaciones Técnicas:
Archivos a crear/modificar:
*   `src/components/tutorias-agendadas/tutorias-list/TutoriasList.tsx` (Componente principal que gestionará el estado del modal).
*   `src/components/tutorias-agendadas/tutorias-card/TutoriasCard.tsx` (Para invocar la función de clic).
*   `src/components/modals/detalles-sesion-modal/DetallesSesionModal.tsx` (Para recibir y mostrar los datos).

Tecnologías: Next.js 16 (Client Component), React (useState), TypeScript.

Estructura:
*   Modificar `src/components/tutorias-agendadas/tutorias-list/TutoriasList.tsx`:
    *   Añadir estado local para controlar la visibilidad del modal (ej. `const [isModalOpen, setIsModalOpen] = useState<boolean>(false);`).
    *   Añadir estado local para almacenar los datos de la tutoría seleccionada (ej. `const [selectedTutoria, setSelectedTutoria] = useState<TutoriasAgendadasDTO | null>(null);`).
    *   Crear una función `handleCardClick(tutoria: TutoriasAgendadasDTO)` que:
        *   Establezca `setSelectedTutoria(tutoria)`.
        *   Establezca `setIsModalOpen(true)`.
    *   Crear una función `handleCloseModal()` que establezca `setIsModalOpen(false)` y `setSelectedTutoria(null)`.
*   En `src/components/tutorias-agendadas/tutorias-list/TutoriasList.tsx`, pasar la función `handleCardClick` como prop (`onCardClick`) a cada `TutoriasCard` que se renderiza.
*   Modificar `src/components/tutorias-agendadas/tutorias-card/TutoriasCard.tsx` para que su prop `onCardClick` se invoque al hacer clic en la tarjeta, pasando los propios datos de la tutoría (`props.tutoria`).
*   Renderizar `DetallesSesionModal` en `src/components/tutorias-agendadas/tutorias-list/TutoriasList.tsx`, pasándole los estados `isOpen={isModalOpen}`, `onClose={handleCloseModal}` y `tutoria={selectedTutoria}`.
*   Asegurar que el modal se muestre solo cuando `isModalOpen` es `true` y se oculte cuando `onClose` es llamado.

Diseño:
*   La transición de apertura y cierre del modal debe ser fluida.
*   El scroll de la página de fondo debe mantenerse en su posición al abrir y cerrar el modal.

Criterios de Aceptación Técnica:
*   Al hacer clic en cualquier `TutoriasCard` de la sección 'PRÓXIMAS', se abre el `DetallesSesionModal`.
*   El modal muestra correctamente los detalles de la tutoría seleccionada.
*   El modal se cierra al hacer clic en el botón "Cerrar" o en el ícono 'X' de la cabecera, devolviendo el control a la lista de agenda.
*   El estado de la lista de tutorías (posición de scroll) se mantiene al cerrar el modal. ---END_PROMPT---

---START_COMMIT--- HU11-T09 feat(integration): conectar TutoriasCard con DetallesSesionModal ---END_COMMIT---
---START_TASK--- TASK_NUMBER: 10 TASK_TITLE: Integración de `getScheduledTutoriasAction` con backend real. HU_NUMBER: HU11 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Finalizar la implementación del Server Action `getScheduledTutoriasAction` activando la integración real con el backend de NestJS. Esto implica descomentar el bloque de código de la petición `fetch` que se había dejado comentado, y eliminar (o comentar) la línea que retorna el seed data. Se realizará una verificación final de la estructura de la respuesta.
Objetivo: Conectar el Server Action de obtención de tutorías agendadas con el endpoint real del backend para consumir datos en vivo.

Especificaciones Técnicas:
Archivos a crear/modificar:
*   `src/actions/tutorias-agendadas/getScheduledTutoriasAction.ts`
*   `src/lib/seeds/scheduled-tutorias.ts` (posiblemente comentar el import también si el seed ya no se usa).

Tecnologías: Next.js 16 (Server Actions), TypeScript, fetch API.

Estructura:
*   Abrir el archivo `src/actions/tutorias-agendadas/getScheduledTutoriasAction.ts`.
*   Localizar la línea que retorna directamente el seed data y comentarla o eliminarla. También comentar o eliminar el `import` del seed data.
*   Localizar el bloque completo de código (la estructura `try-catch` con la llamada `fetch`) que realiza la petición `GET` al endpoint `/api/tutorias/agendadas` del backend.
*   Descomentar todo este bloque de código.
*   Verificar que la URL del endpoint esté correctamente configurada utilizando las variables de entorno (e.g., `process.env.NEXT_PUBLIC_API_BASE_URL + '/api/tutorias/agendadas'`).
*   Confirmar que los `headers` (especialmente `Authorization` con el `Bearer Token`, obtenido de las cookies) estén correctamente configurados.
*   Asegurarse de que el manejo de errores (`response.ok`, `errorData`) y el retorno de datos (`response.json()`) estén alineados con la `TutoriasAgendadasDTO[]` esperados por el frontend.
*   Realizar una prueba manual para verificar que la aplicación ahora carga los datos reales del backend y los componentes los renderizan correctamente.

Criterios de Aceptación Técnica:
*   `getScheduledTutoriasAction` realiza una petición HTTP `GET` exitosa al endpoint real del backend.
*   La aplicación renderiza los datos de tutorías agendadas obtenidos del backend, no del seed.
*   Los errores de la API (si los hay) se manejan y muestran al usuario de manera apropiada.
*   La estructura de los datos recibidos del backend coincide con la esperada por los componentes de la interfaz.
*   No hay errores de red, CORS o autenticación al intentar la conexión. ---END_PROMPT---

---START_COMMIT--- HU11-T10 feat(api): integrar getScheduledTutoriasAction con backend real ---END_COMMIT---