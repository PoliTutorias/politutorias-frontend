---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de DTOs y Seeds para listado y detalle de solicitudes HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La aplicación necesita estructuras de datos para manejar la información de solicitudes de tutoría tanto en formato de lista paginada como en detalle completo, y datos simulados para el desarrollo inicial del frontend sin una API real disponible.
Objetivo: Definir los Data Transfer Objects (DTOs) para la visualización de solicitudes y crear los archivos de seed que proporcionarán datos de prueba para el listado y el detalle de solicitudes, cubriendo todos los posibles estados y campos condicionales.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/dtos/solicitudes.dto.ts`: Contendrá las interfaces y tipos (`SolicitudListParams`, `PaginatedSolicitudListDto`, `SolicitudListItemDto`, `SolicitudDetailDto`, `CancelSolicitudDto`, `APIResponse`, `SolicitudStatus` enum).
- `src/lib/seeds/solicitudes-list.ts`: Exportará una función para generar un `PaginatedSolicitudListDto` simulado.
- `src/lib/seeds/solicitudes-detail.ts`: Exportará una función que, dado un ID, retorne un `SolicitudDetailDto` simulado para diferentes estados.

Tecnologías: Next.js 16, TypeScript, Tailwind CSS 4.

Estructura:
- Definir tipos e interfaces claras para todos los DTOs.
- El `SolicitudStatus` enum debe incluir 'PENDIENTE', 'ACEPTADA', 'RECHAZADA', 'EXPIRADA'.
- `SolicitudListItemDto` debe incluir: `id`, `avatarUrl`, `tutorName`, `subject`, `dateTime`, `modality`, `price`, `status`.
- `SolicitudDetailDto` debe expandir `SolicitudListItemDto` con campos como `studentMessage`, `proposedSchedules`, `rejectionReason`, `acceptedMeetingLocation`, `acceptedMeetingLink`.
- Los seeds deben generar datos coherentes con los DTOs. El seed de lista debe priorizar solicitudes `PENDIENTE` y `EXPIRADA` según las observaciones de la HU. El seed de detalle debe simular los diferentes estados y sus campos condicionales.

Validaciones:
- La estructura de los DTOs debe ser consistente y prever todos los campos necesarios según los criterios de aceptación de la HU.
- Los seeds deben proveer datos de prueba variados para cada estado de solicitud.

Diseño: Ninguno (solo estructura de datos).

Integración: Los DTOs y seeds serán utilizados por los Server Actions y componentes React para la gestión de datos.

Criterios de Aceptación Técnica:
- Los DTOs definidos en el frontend (`src/dtos/solicitudes.dto.ts`) reflejan la estructura de los DTOs del backend.
- `src/lib/seeds/solicitudes-list.ts` contiene datos simulados de `PaginatedSolicitudListDto` con ítems en estado `PENDIENTE` y `EXPIRADA`.
- `src/lib/seeds/solicitudes-detail.ts` contiene datos simulados de `SolicitudDetailDto` para cada estado, incluyendo propiedades condicionales.
---END_PROMPT---

---START_COMMIT--- HU33-T01 feat(dtos): crear DTOs y seed data para solicitudes ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Maquetación de `MisSolicitudesPage` y estado de filtros/paginación HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Mis Solicitudes 4, E. Mis Solicitudes 1 ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se necesita una página principal para que el estudiante visualice sus solicitudes de tutoría, con secciones para filtros de estado y un listado paginado.
Objetivo: Implementar la estructura principal de la página "Mis Solicitudes" (`src/app/dashboard/solicitudes/page.tsx`), gestionando el estado local para el filtro de estado actual y el número de página.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/dashboard/solicitudes/page.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Crear un Server Component `page.tsx` que sea el contenedor principal de la pantalla "Mis Solicitudes".
- La página debe incluir un título, un espacio para el componente `SolicitudFilterTabs` (a crear en Tarea 3), un contenedor para `SolicitudList` (a crear en Tarea 5) y un área para `PaginationComponent` (a crear en Tarea 6).
- Gestionar el estado local (usando `useState` o `useSearchParams` para reactividad) para `currentStatusFilter` (por defecto 'TODAS') y `currentPage` (por defecto `1`).
- Implementar la lógica de renderizado condicional para los componentes hijos basándose en estos estados.

Validaciones: Ninguna en esta tarea.

Diseño:
- Basarse en los frames "E. Mis Solicitudes 4" y "E. Mis Solicitudes 1" para la estructura general del layout.
- Utilizar Tailwind CSS 4 para el diseño responsivo y la disposición de los elementos.

Integración: Esta página orquestará la interacción entre los componentes de filtro, lista y paginación.

Criterios de Aceptación Técnica:
- La página `MisSolicitudesPage` renderiza la estructura principal de la interfaz de usuario.
- El estado de `currentStatusFilter` y `currentPage` se gestiona correctamente.
- La página es capaz de pasar los estados de filtro y página a sus componentes hijos.
---END_PROMPT---

---START_COMMIT--- HU33-T02 feat(page): maquetar MisSolicitudesPage y gestionar estados ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Implementación de `SolicitudFilterTabs` con estados y eventos HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Mis Solicitudes 4, E. Mis Solicitudes 1 ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La página de "Mis Solicitudes" requiere un componente interactivo para filtrar la lista de solicitudes por su estado.
Objetivo: Crear el Client Component `SolicitudFilterTabs` que muestre las pestañas de filtro (Todas, Pendientes, Aceptadas, Rechazadas, Expiradas), gestione el estado activo y emita eventos de cambio.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/solicitudes/SolicitudFilterTabs/SolicitudFilterTabs.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, clsx.

Estructura:
- Crear un Client Component `SolicitudFilterTabs`.
- Recibir las siguientes props: `currentStatusFilter: SolicitudStatus | 'TODAS'`, `onFilterChange: (status: SolicitudStatus | 'TODAS') => void`, `counts: { [key in SolicitudStatus | 'TODAS']: number }`.
- Renderizar un conjunto de botones o enlaces, cada uno representando un estado de solicitud ('TODAS', 'PENDIENTE', 'ACEPTADA', 'RECHAZADA', 'EXPIRADA'), incluyendo el contador numérico.
- Aplicar estilos condicionales para resaltar la pestaña activa (fondo oscuro, texto blanco).
- Adjuntar un manejador de eventos `onClick` a cada pestaña que llame a `onFilterChange` con el estado correspondiente.

Validaciones:
- La pestaña activa debe reflejar el `currentStatusFilter` pasado por props.
- Los contadores deben ser dinámicos a través de la prop `counts`.

Diseño:
- Basarse en los prototipos "E. Mis Solicitudes 4" y "E. Mis Solicitudes 1" para el estilo visual de las pestañas.
- Utilizar Tailwind CSS 4 para los estilos, asegurando un diseño responsivo.
- Usar `clsx` para manejar las clases condicionales de Tailwind CSS para el estado activo.

Integración: Este componente se integrará en `MisSolicitudesPage` y comunicará los cambios de filtro a su componente padre.

Criterios de Aceptación Técnica:
- Las pestañas de filtro se renderizan correctamente con los contadores de solicitudes.
- La pestaña seleccionada cambia visualmente a un estado activo.
- El evento `onFilterChange` se dispara correctamente al hacer clic en una pestaña.
---END_PROMPT---

---START_COMMIT--- HU33-T03 feat(components): implementar SolicitudFilterTabs ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Implementación de `SolicitudCard` con datos y tags de estado HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Mis Solicitudes 4, E. Mis Solicitudes 1 ---END_FRAME---

---START_ESTIMATION--- 2H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La lista de solicitudes requiere un componente visualmente atractivo y consistente para mostrar el resumen de cada solicitud.
Objetivo: Crear el Client Component `SolicitudCard` que visualice la información obligatoria de una solicitud individual y su tag de estado dinámico, además de manejar el evento de clic para ver detalles.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/solicitudes/SolicitudCard/SolicitudCard.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, react-icons, clsx.

Estructura:
- Crear un Client Component `SolicitudCard`.
- Recibir una prop `solicitud: SolicitudListItemDto` y una prop `onClick: (id: string) => void`.
- Maquetar la tarjeta para mostrar: avatar, nombre del tutor, materia, fecha/hora, modalidad y precio.
- Implementar la lógica para renderizar el tag de estado en la esquina superior derecha (`SolicitudStatusTag` como subcomponente o lógica inline), aplicando estilos condicionales:
    - `PENDIENTE`: texto naranja, ícono de reloj, fondo naranja claro.
    - `ACEPTADA`: texto oscuro, ícono de check, fondo gris claro.
    - `RECHAZADA`: texto gris oscuro, ícono de cruz, fondo gris claro.
    - `EXPIRADA`: texto rojo, ícono de reloj, fondo rojo claro, franja lateral izquierda color rojo para la tarjeta.
- Configurar un evento `onClick` en la tarjeta completa que llame a la prop `onClick` con el `id` de la solicitud.

Validaciones: Ninguna, los datos vienen del DTO.

Diseño:
- Basarse en los frames "E. Mis Solicitudes 4" y "E. Mis Solicitudes 1" para el diseño de la tarjeta.
- Utilizar Tailwind CSS 4 para los estilos, incluyendo responsive y los colores/fondos específicos para cada tag de estado.
- Usar `react-icons` para los íconos de los tags de estado.
- Usar `clsx` para aplicar clases condicionales.

Integración: `SolicitudCard` será utilizado por `SolicitudList` y comunicará la intención de ver el detalle a un componente padre.

Criterios de Aceptación Técnica:
- Cada `SolicitudCard` muestra correctamente todos los datos resumidos.
- Los tags de estado se renderizan con los estilos visuales correctos para cada tipo de estado.
- El clic en la tarjeta dispara la acción de abrir el modal de detalle con el ID de la solicitud.
---END_PROMPT---

---START_COMMIT--- HU33-T04 feat(components): crear SolicitudCard con tags de estado ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Implementación de `SolicitudList` para renderizar tarjetas HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Mis Solicitudes 4, E. Mis Solicitudes 1 ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Una vez que se tienen las tarjetas individuales (`SolicitudCard`), se necesita un componente que las agrupe y las muestre en una lista.
Objetivo: Crear el Client Component `SolicitudList` que reciba un array de solicitudes y renderice un `SolicitudCard` por cada una.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/solicitudes/SolicitudList/SolicitudList.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Crear un Client Component `SolicitudList`.
- Recibir como props: `solicitudes: SolicitudListItemDto[]` y `onCardClick: (id: string) => void`.
- Utilizar un bucle (`.map()`) para iterar sobre el array `solicitudes`.
- Para cada `solicitud` en la lista, renderizar un componente `SolicitudCard`, pasándole los datos de la solicitud y la función `onCardClick`.
- Manejar el caso de una lista vacía, mostrando un mensaje o un estado vacío.

Validaciones: Ninguna.

Diseño:
- Disponer las tarjetas de forma que sigan el diseño de lista de los frames "E. Mis Solicitudes 4" y "E. Mis Solicitudes 1".
- Utilizar clases de Tailwind CSS 4 para gestionar el espaciado y la disposición de las tarjetas (ej., grid o flexbox con gap).

Integración: `SolicitudList` será utilizado por `MisSolicitudesPage` para mostrar el contenido principal.

Criterios de Aceptación Técnica:
- `SolicitudList` renderiza correctamente un `SolicitudCard` para cada elemento en la lista.
- No se producen errores al renderizar una lista vacía.
---END_PROMPT---

---START_COMMIT--- HU33-T05 feat(components): implementar SolicitudList ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Implementación de `PaginationComponent` con lógica y eventos HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Mis Solicitudes 1 ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Para manejar grandes volúmenes de solicitudes, es esencial un componente de paginación que permita al usuario navegar entre las diferentes páginas de resultados.
Objetivo: Desarrollar el Client Component `PaginationComponent` que muestre los controles de paginación numérica, resalte la página activa y emita eventos de cambio de página.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/common/Pagination/PaginationComponent.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, clsx.

Estructura:
- Crear un Client Component `PaginationComponent`.
- Recibir las siguientes props: `totalItems: number`, `itemsPerPage: number`, `currentPage: number`, `onPageChange: (page: number) => void`.
- Calcular el número total de páginas (`totalPages`).
- Renderizar los números de página (ej. `1 2 3 4`) y las flechas de navegación (`<` y `>`).
- La página actual (`currentPage`) debe estar resaltada visualmente (recuadro oscuro).
- Los botones de página y las flechas deben tener manejadores de eventos `onClick` que llamen a `onPageChange` con el número de página correspondiente.
- El componente solo debe renderizarse si `totalPages` es mayor que 1 (o `totalItems` > `itemsPerPage`).

Validaciones:
- Asegurarse de que las flechas de Anterior/Siguiente se deshabiliten apropiadamente en la primera y última página.
- El número de página activa debe ser correcto.

Diseño:
- Basarse en el frame "E. Mis Solicitudes 1" para el estilo de la barra de paginación numérica.
- Utilizar Tailwind CSS 4 para los estilos, asegurando la responsividad y el resaltado visual de la página activa (recuadro oscuro, texto blanco).
- Usar `clsx` para aplicar clases condicionales para estados activo/inactivo.

Integración: `PaginationComponent` será utilizado por `MisSolicitudesPage` para controlar la paginación de la lista de solicitudes.

Criterios de Aceptación Técnica:
- El componente de paginación se renderiza automáticamente si `totalItems` supera `itemsPerPage`.
- Los números de página y las flechas de navegación se muestran correctamente.
- La página activa se resalta visualmente.
- El evento `onPageChange` se dispara con el número de página correcto al hacer clic.
---END_PROMPT---

---START_COMMIT--- HU33-T06 feat(components): desarrollar PaginationComponent ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Server Action: `getSolicitudesAction` con seed data HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Para la carga inicial y las actualizaciones de la lista de solicitudes, se requiere una función del lado del servidor que interactúe con el backend (o simule su respuesta).
Objetivo: Implementar el Server Action `getSolicitudesAction` que obtendrá una lista paginada y filtrada de solicitudes, utilizando inicialmente datos del seed y con el código de integración real comentado.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/solicitudes/getSolicitudesAction.ts`
- `src/lib/seeds/solicitudes-list.ts` (uso)
- `src/dtos/solicitudes.dto.ts` (uso)

Tecnologías: Next.js 16 (Server Actions), TypeScript.

Estructura:
- Crear un nuevo archivo de Server Action `getSolicitudesAction.ts` dentro de `src/actions/solicitudes/`.
- Marcar la función como `'use server'`.
- La función `getSolicitudesAction` debe aceptar un objeto `params` de tipo `SolicitudListParams` (definido en `solicitudes.dto.ts`) que incluya `page`, `limit` y `status`.
- Importar y utilizar el seed `solicitudes-list.ts` para simular la respuesta del backend.
- Implementar la lógica para filtrar el seed data:
    - Si `params.status` es 'TODAS', 'ACEPTADA' o 'RECHAZADA', el seed debe devolver solo solicitudes en estado `PENDIENTE` y `EXPIRADA` (según las "Observaciones" de la HU para el listado).
    - Si `params.status` es 'PENDIENTE' o 'EXPIRADA', el seed debe filtrar y devolver solo esas solicitudes.
- Aplicar la paginación (`page`, `limit`) sobre los datos filtrados del seed.
- La función debe retornar un objeto `PaginatedSolicitudListDto`.
- **Importante:** Escribir el bloque de código completo para la petición `fetch` al endpoint `GET /api/solicitudes?${query}` (incluyendo headers, manejo de errores y `res.json()`), y COMENTARLO por completo.
- Documentar la estructura de respuesta esperada y los posibles errores en los comentarios del código.

Validaciones:
- El filtrado y paginación del seed data deben funcionar correctamente.
- La estructura de la respuesta debe coincidir con `PaginatedSolicitudListDto`.

Diseño: Ninguno.

Integración: Este Server Action será llamado desde `MisSolicitudesPage` para cargar la lista de solicitudes.

Criterios de Aceptación Técnica:
- El Server Action `getSolicitudesAction` se ejecuta correctamente.
- Retorna un `PaginatedSolicitudListDto` simulado a partir del seed.
- El filtrado del seed data simula correctamente que solo se muestran solicitudes `PENDIENTE` y `EXPIRADA` en la lista, según las observaciones de la HU.
- El código de integración con el backend (`fetch`) está presente y completamente comentado.
---END_PROMPT---

---START_COMMIT--- HU33-T07 feat(server-actions): implementar getSolicitudesAction con seed ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 8 TASK_TITLE: Integración de `MisSolicitudesPage` con `getSolicitudesAction` HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Mis Solicitudes 4, E. Mis Solicitudes 1 ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La página `MisSolicitudesPage` necesita obtener dinámicamente la lista de solicitudes y responder a los cambios de filtro y paginación.
Objetivo: Integrar el Server Action `getSolicitudesAction` en la `MisSolicitudesPage` para cargar y actualizar la lista de solicitudes.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/dashboard/solicitudes/page.tsx`

Tecnologías: Next.js 16 (Server Components, Server Actions), React (useState, useEffect), TypeScript, Tailwind CSS 4.

Estructura:
- En `src/app/dashboard/solicitudes/page.tsx`, realizar la llamada inicial a `getSolicitudesAction` como un Server Component para cargar la primera página de solicitudes (por defecto estado 'TODAS', página 1).
- Utilizar `useState` para gestionar las solicitudes obtenidas (`solicitudes: SolicitudListItemDto[]`), el estado de carga (`isLoading: boolean`) y posibles errores (`error: string | null`).
- Pasar la lista de `items` a `SolicitudList` y los metadatos de paginación (`total`, `page`, `limit`) a `PaginationComponent`.
- Implementar una función (o un `useEffect` con dependencias en los estados de filtro/página) para re-llamar a `getSolicitudesAction` cada vez que `currentStatusFilter` o `currentPage` cambien. Esto puede requerir convertir el componente de página en un Client Component o usar patrones de `use` para llamadas asíncronas desde el cliente.
- Mostrar estados de carga (ej., un spinner) y mensajes de error en la UI.
- Pasar la función `onFilterChange` al componente `SolicitudFilterTabs` y `onPageChange` al `PaginationComponent`.

Validaciones:
- La lista se carga automáticamente y se muestra.
- Los cambios de filtro y página desencadenan una nueva carga de datos.
- Los estados de carga y error se reflejan en la UI.

Diseño:
- El diseño general debe seguir los frames "E. Mis Solicitudes 4" y "E. Mis Solicitudes 1".
- Utilizar Tailwind CSS 4 para los indicadores de carga y mensajes de error.

Integración:
- Llamada a `getSolicitudesAction`.
- Comunicación con `SolicitudFilterTabs`, `SolicitudList` y `PaginationComponent` mediante props.

Criterios de Aceptación Técnica:
- La lista de solicitudes se carga automáticamente en la página al iniciar.
- La lista se actualiza correctamente al cambiar el filtro de estado.
- La lista se actualiza correctamente al cambiar de página.
- Los estados de carga y error se gestionan y muestran adecuadamente en la UI.
---END_PROMPT---

---START_COMMIT--- HU33-T08 feat(page): integrar MisSolicitudesPage con getSolicitudesAction ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 9 TASK_TITLE: Maquetación base de `DetalleSolicitudModal` y elementos comunes HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Detalle Solicitud (Pendiente) ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Al hacer clic en una solicitud, se debe abrir un modal con sus detalles, el cual compartirá una estructura base para todos los estados.
Objetivo: Crear la estructura base del Client Component `DetalleSolicitudModal`, incluyendo el contenedor, el fondo (`backdrop`) y los elementos comunes a todos los estados de solicitud (título, información del tutor, mensaje del estudiante).

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/solicitudes/DetalleSolicitudModal/DetalleSolicitudModal.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Crear un Client Component `DetalleSolicitudModal`.
- Recibir como props: `isOpen: boolean`, `onClose: () => void`, `solicitudDetail: SolicitudDetailDto | null`.
- Implementar la estructura básica de un modal:
    - Un overlay de fondo oscuro y semitransparente que ocupe toda la pantalla.
    - Un contenedor central para el contenido del modal, con un tamaño fijo o responsivo.
    - El título del modal "Detalle de la Solicitud" en la cabecera.
    - Un botón de cierre (`CloseButton`, a crear en Tarea 17) en la esquina superior derecha.
- Dentro del cuerpo del modal, diseñar y posicionar los bloques para mostrar la información común:
    - Avatar del tutor.
    - Nombre del tutor.
    - Materia.
    - Un recuadro titulado "TU MENSAJE" que muestre el `studentMessage` de la solicitud.

Validaciones: Ninguna en esta tarea.

Diseño:
- Basarse en el frame "E. Detalle Solicitud (Pendiente)" para la estructura general del modal y la ubicación de los elementos comunes.
- Utilizar Tailwind CSS 4 para los estilos del modal (fondo, contenedor, tipografía, espaciado) y asegurar un diseño responsivo.

Integración: Este modal se abrirá desde `MisSolicitudesPage` y mostrará los detalles obtenidos de `getSolicitudDetailAction`.

Criterios de Aceptación Técnica:
- El modal se renderiza correctamente con un título y un botón de cierre.
- La información básica del tutor y el mensaje del estudiante se muestran de forma consistente.
- El modal se superpone a la pantalla principal.
---END_PROMPT---

---START_COMMIT--- HU33-T09 feat(components): maquetar DetalleSolicitudModal base ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 10 TASK_TITLE: Implementación de `DetalleSolicitudModal` para estado "Pendiente" HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Detalle Solicitud (Pendiente) ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El `DetalleSolicitudModal` debe mostrar contenido específico cuando la solicitud se encuentra en estado "Pendiente".
Objetivo: Implementar el renderizado condicional del contenido para solicitudes "Pendiente" dentro del `DetalleSolicitudModal`, incluyendo los horarios propuestos y un botón "Cancelar Solicitud" inactivo.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/solicitudes/DetalleSolicitudModal/DetalleSolicitudModal.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Dentro del `DetalleSolicitudModal.tsx`, agregar lógica condicional para detectar cuando `solicitudDetail.status === 'PENDIENTE'`.
- Cuando el estado es "Pendiente":
    - Mostrar el tag de estado "Pendiente" en la cabecera del modal con los estilos correspondientes (texto naranja, ícono de reloj, fondo naranja claro).
    - Renderizar un bloque informativo con los detalles de la tutoría: fecha, hora, modalidad y precio.
    - Mostrar los horarios propuestos por el estudiante (`proposedSchedules`).
    - Renderizar el componente `CancelButton` (a crear en Tarea 17) con el texto "Cancelar Solicitud".
    - Configurar el `CancelButton` para que esté visualmente inactivo/gris, según el prototipo.
    - Asegurarse de que el `CloseButton` también esté presente en la parte inferior.

Validaciones:
- El contenido específico para "Pendiente" solo debe aparecer cuando el estado es el correcto.
- El botón "Cancelar Solicitud" debe ser visible pero inactivo.

Diseño:
- Basarse en el frame "E. Detalle Solicitud (Pendiente)" para la disposición y estilos de los elementos específicos de este estado.
- Utilizar Tailwind CSS 4 para los estilos de los bloques informativos y del botón inactivo.

Integración: N/A.

Criterios de Aceptación Técnica:
- El modal muestra el tag "Pendiente" y la información de horarios propuestos para solicitudes en este estado.
- El botón "Cancelar Solicitud" se renderiza y está visualmente inactivo/gris.
---END_PROMPT---

---START_COMMIT--- HU33-T10 feat(components): añadir vista Pendiente a DetalleSolicitudModal ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 11 TASK_TITLE: Implementación de `DetalleSolicitudModal` para estado "Aceptada" HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El `DetalleSolicitudModal` debe mostrar contenido específico cuando la solicitud ha sido "Aceptada" por el tutor.
Objetivo: Implementar el renderizado condicional del contenido para solicitudes "Aceptada" dentro del `DetalleSolicitudModal`, incluyendo el recuadro de confirmación de lugar/enlace y un botón "Cancelar Tutoría" activo.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/solicitudes/DetalleSolicitudModal/DetalleSolicitudModal.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, react-icons.

Estructura:
- Dentro del `DetalleSolicitudModal.tsx`, agregar lógica condicional para detectar cuando `solicitudDetail.status === 'ACEPTADA'`.
- Cuando el estado es "Aceptada":
    - Mostrar el tag de estado "Aceptada" en la cabecera del modal con los estilos correspondientes (texto oscuro, ícono de check, fondo gris claro).
    - Incluir el cuerpo del modal:
        - Renderizar el recuadro de confirmación:
            - Si la modalidad es Presencial y `acceptedMeetingLocation` está presente, mostrar un recuadro con el título "LUGAR" y el valor de `acceptedMeetingLocation`.
            - Si la modalidad es Virtual y `acceptedMeetingLink` está presente, mostrar un recuadro con el título "ENLACE" y el valor de `acceptedMeetingLink`.
        - Seguido de los detalles de la materia y el recuadro "TU MENSAJE" (ya implementado en la base).
    - Renderizar el `CancelButton` con el texto "Cancelar Tutoría".
    - Configurar el `CancelButton` para que esté visualmente activo, con texto rojo y un ícono de papelera (de `react-icons`), según los criterios de aceptación.
    - Asegurarse de que el `CloseButton` también esté presente en la parte inferior.

Validaciones:
- El contenido específico para "Aceptada" solo debe aparecer cuando el estado es el correcto.
- El recuadro de confirmación debe mostrar "LUGAR" o "ENLACE" de forma condicional y con los datos correctos.
- El botón "Cancelar Tutoría" debe ser visible y activo.

Diseño:
- Utilizar Tailwind CSS 4 para los estilos de los nuevos bloques informativos y del botón activo.

Integración: N/A.

Criterios de Aceptación Técnica:
- El modal muestra el tag "Aceptada" y el recuadro de confirmación (LUGAR o ENLACE) para solicitudes en este estado.
- El botón "Cancelar Tutoría" se renderiza y está visualmente activo (rojo, papelera).
---END_PROMPT---

---START_COMMIT--- HU33-T11 feat(components): añadir vista Aceptada a DetalleSolicitudModal ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 12 TASK_TITLE: Implementación de `DetalleSolicitudModal` para estado "Rechazada" HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El `DetalleSolicitudModal` debe mostrar contenido específico cuando la solicitud ha sido "Rechazada" por el tutor.
Objetivo: Implementar el renderizado condicional del contenido para solicitudes "Rechazada" dentro del `DetalleSolicitudModal`, incluyendo el motivo de rechazo y únicamente el botón "Cerrar".

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/solicitudes/DetalleSolicitudModal/DetalleSolicitudModal.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Dentro del `DetalleSolicitudModal.tsx`, agregar lógica condicional para detectar cuando `solicitudDetail.status === 'RECHAZADA'`.
- Cuando el estado es "Rechazada":
    - Mostrar el tag de estado "Rechazada" en la cabecera del modal con los estilos correspondientes (texto gris oscuro, ícono de cruz, fondo gris claro).
    - El cuerpo del modal debe mostrar los detalles de la materia y el recuadro "TU MENSAJE" (ya implementado en la base).
    - Justo debajo, renderizar un recuadro con fondo gris claro titulado "MOTIVO DE RECHAZO" conteniendo la justificación del tutor (`rejectionReason`).
    - En la parte inferior del modal, asegurarse de que **únicamente** se muestre el `CloseButton`. El `CancelButton` no debe estar presente para este estado.

Validaciones:
- El contenido específico para "Rechazada" solo debe aparecer cuando el estado es el correcto.
- El recuadro "MOTIVO DE RECHAZO" debe mostrar la justificación del tutor.
- Solo el botón "Cerrar" debe ser visible.

Diseño:
- Utilizar Tailwind CSS 4 para los estilos del recuadro "MOTIVO DE RECHAZO".

Integración: N/A.

Criterios de Aceptación Técnica:
- El modal muestra el tag "Rechazada" y el "MOTIVO DE RECHAZO" del tutor.
- Solo el botón "Cerrar" es visible en la parte inferior del modal.
---END_PROMPT---

---START_COMMIT--- HU33-T12 feat(components): añadir vista Rechazada a DetalleSolicitudModal ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 13 TASK_TITLE: Implementación de `DetalleSolicitudModal` para estado "Expirada" HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El `DetalleSolicitudModal` debe mostrar contenido específico cuando la solicitud ha "Expirado".
Objetivo: Implementar el renderizado condicional del contenido para solicitudes "Expirada" dentro del `DetalleSolicitudModal`, mostrando la información en modo solo lectura y únicamente el botón "Cerrar".

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/solicitudes/DetalleSolicitudModal/DetalleSolicitudModal.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Dentro del `DetalleSolicitudModal.tsx`, agregar lógica condicional para detectar cuando `solicitudDetail.status === 'EXPIRADA'`.
- Cuando el estado es "Expirada":
    - Mostrar el tag de estado "Expirada" en la cabecera del modal con los estilos correspondientes (texto rojo, ícono de reloj, fondo rojo claro).
    - El modal debe operar en modo solo lectura, mostrando toda la información base de la tutoría solicitada (tutor, materia, fecha, modalidad, precio, mensaje del estudiante). No debe haber elementos interactivos para este estado más allá del cierre del modal.
    - En la parte inferior del modal, asegurarse de que **únicamente** se muestre el `CloseButton`. El `CancelButton` no debe estar presente para este estado.

Validaciones:
- El contenido específico para "Expirada" solo debe aparecer cuando el estado es el correcto.
- La información base debe ser visible pero no editable.
- Solo el botón "Cerrar" debe ser visible.

Diseño:
- Utilizar Tailwind CSS 4 para los estilos, asegurando que el tag "Expirada" sea de color rojo.

Integración: N/A.

Criterios de Aceptación Técnica:
- El modal muestra el tag "Expirada" y la información base en modo solo lectura.
- Solo el botón "Cerrar" es visible en la parte inferior del modal.
---END_PROMPT---

---START_COMMIT--- HU33-T13 feat(components): añadir vista Expirada a DetalleSolicitudModal ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 14 TASK_TITLE: Server Action: `getSolicitudDetailAction` con seed data HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Para mostrar los detalles completos de una solicitud en el modal, se necesita una función del lado del servidor que recupere esa información.
Objetivo: Implementar el Server Action `getSolicitudDetailAction` que recupera los detalles completos de una solicitud por su ID, utilizando inicialmente datos del seed y con el código de integración real comentado.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/solicitudes/getSolicitudDetailAction.ts`
- `src/lib/seeds/solicitudes-detail.ts` (uso)
- `src/dtos/solicitudes.dto.ts` (uso)

Tecnologías: Next.js 16 (Server Actions), TypeScript.

Estructura:
- Crear un nuevo archivo de Server Action `getSolicitudDetailAction.ts` dentro de `src/actions/solicitudes/`.
- Marcar la función como `'use server'`.
- La función `getSolicitudDetailAction` debe aceptar un `solicitudId: string` como parámetro.
- Importar y utilizar el seed `solicitudes-detail.ts` para simular la respuesta del backend.
- La lógica del seed debe ser capaz de retornar un `SolicitudDetailDto` que represente diferentes estados (Pendiente, Aceptada, Rechazada, Expirada) basado en el `solicitudId` (por ejemplo, usando IDs específicos para cada estado en el seed).
- La función debe retornar un `SolicitudDetailDto` o `null` si no se encuentra.
- **Importante:** Escribir el bloque de código completo para la petición `fetch` al endpoint `GET /api/solicitudes/:id` (incluyendo headers, manejo de errores y `res.json()`), y COMENTARLO por completo.
- Documentar la estructura de respuesta esperada y los posibles errores en los comentarios del código.

Validaciones:
- La función debe retornar un detalle completo para el `solicitudId` dado.
- Los detalles deben incluir las propiedades condicionales correctas según el estado simulado.

Diseño: Ninguno.

Integración: Este Server Action será llamado desde `DetalleSolicitudModal` para cargar la información detallada.

Criterios de Aceptación Técnica:
- El Server Action `getSolicitudDetailAction` se ejecuta correctamente.
- Retorna un `SolicitudDetailDto` simulado del seed que varía según el ID (simulando diferentes estados).
- El código de integración con el backend (`fetch`) está presente y completamente comentado.
---END_PROMPT---

---START_COMMIT--- HU33-T14 feat(server-actions): implementar getSolicitudDetailAction con seed ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 15 TASK_TITLE: Integración de `SolicitudCard` y `DetalleSolicitudModal` HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Detalle Solicitud (Pendiente) ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Los componentes `SolicitudCard` y `DetalleSolicitudModal` necesitan interactuar para permitir al usuario ver los detalles de una solicitud.
Objetivo: Conectar el evento de clic de `SolicitudCard` con la apertura del `DetalleSolicitudModal` y la llamada al `getSolicitudDetailAction` para cargar y mostrar los detalles de la solicitud.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/dashboard/solicitudes/page.tsx`
- `src/components/solicitudes/SolicitudCard/SolicitudCard.tsx` (modificar prop `onClick`)
- `src/components/solicitudes/DetalleSolicitudModal/DetalleSolicitudModal.tsx` (añadir props para `solicitudId`, gestión de carga y llamada a Server Action)

Tecnologías: Next.js 16, React (useState, useCallback, useEffect), TypeScript, Tailwind CSS 4.

Estructura:
- En `src/app/dashboard/solicitudes/page.tsx`:
    - Gestionar el estado local para `isModalOpen: boolean` y `selectedSolicitudId: string | null`.
    - Crear una función `handleCardClick(id: string)` que actualice `selectedSolicitudId` y establezca `isModalOpen` a `true`.
    - Pasar `handleCardClick` al prop `onCardClick` de `SolicitudList`.
    - Renderizar `DetalleSolicitudModal`, pasando `isModalOpen`, una función `onClose` que establezca `isModalOpen` a `false`, y `selectedSolicitudId`.
- En `src/components/solicitudes/DetalleSolicitudModal/DetalleSolicitudModal.tsx`:
    - Recibir `solicitudId: string | null` como prop (además de las existentes).
    - Usar un `useEffect` para detectar cambios en `solicitudId`. Cuando `solicitudId` sea válido y `isOpen` sea `true`, llamar a `getSolicitudDetailAction(solicitudId)`.
    - Gestionar el estado de carga (`isLoadingDetail`) y posibles errores durante la obtención del detalle.
    - Pasar el `solicitudDetail` obtenido al resto del modal para renderizar su contenido.

Validaciones:
- El modal debe abrirse solo cuando se hace clic en una tarjeta.
- El `solicitudId` pasado al Server Action debe ser el correcto.
- Los detalles deben cargarse y mostrarse en el modal.

Diseño:
- Mostrar un spinner o mensaje de carga dentro del modal mientras se obtienen los detalles.
- Utilizar Tailwind CSS 4 para los estilos de carga/error.

Integración: Conexión entre `SolicitudCard` -> `MisSolicitudesPage` -> `DetalleSolicitudModal` -> `getSolicitudDetailAction`.

Criterios de Aceptación Técnica:
- Al hacer clic en una `SolicitudCard`, el `DetalleSolicitudModal` se abre.
- `getSolicitudDetailAction` se llama con el ID de la solicitud correcta.
- Los detalles de la solicitud se renderizan correctamente en el modal según su estado.
- Los estados de carga y error se visualizan adecuadamente durante la obtención del detalle.
---END_PROMPT---

---START_COMMIT--- HU33-T15 feat(integration): conectar SolicitudCard con DetalleSolicitudModal ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 16 TASK_TITLE: Server Action: `cancelarSolicitudAction` con seed data HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La aplicación necesita la capacidad de simular la cancelación de una solicitud por parte del estudiante.
Objetivo: Implementar el Server Action `cancelarSolicitudAction` que simula la cancelación de una solicitud, retornando inicialmente una respuesta estática de éxito/error del seed y con el código de integración real comentado.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/solicitudes/cancelarSolicitudAction.ts`
- `src/dtos/solicitudes.dto.ts` (uso)

Tecnologías: Next.js 16 (Server Actions), TypeScript.

Estructura:
- Crear un nuevo archivo de Server Action `cancelarSolicitudAction.ts` dentro de `src/actions/solicitudes/`.
- Marcar la función como `'use server'`.
- La función `cancelarSolicitudAction` debe aceptar `solicitudId: string` y un `reason?: string` como parámetros.
- La función debe retornar un objeto `APIResponse` (definido en `solicitudes.dto.ts`) simulado que indique éxito (`success: true, message: 'Solicitud cancelada exitosamente.'`). Se puede simular un error para pruebas con algún ID específico.
- **Importante:** Escribir el bloque de código completo para la petición `fetch` al endpoint `PATCH /api/solicitudes/:id/cancel` (incluyendo `method: 'PATCH'`, `headers`, `body` con `CancelSolicitudDto` si aplica, manejo de errores y `res.json()`), y COMENTARLO por completo.
- Documentar la estructura de respuesta esperada y los posibles errores en los comentarios del código.

Validaciones:
- La función debe retornar una respuesta de éxito simulada.
- Los parámetros `solicitudId` y `reason` deben ser manejados correctamente.

Diseño: Ninguno.

Integración: Este Server Action será llamado desde `DetalleSolicitudModal` cuando el estudiante intente cancelar una solicitud.

Criterios de Aceptación Técnica:
- El Server Action `cancelarSolicitudAction` se ejecuta correctamente.
- Retorna un `APIResponse` simulado que indica éxito.
- El código de integración con el backend (`fetch`) está presente y completamente comentado.
---END_PROMPT---

---START_COMMIT--- HU33-T16 feat(server-actions): implementar cancelarSolicitudAction con seed ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 17 TASK_TITLE: Integración de `DetalleSolicitudModal` con `cancelarSolicitudAction` HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Detalle Solicitud (Pendiente) ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La funcionalidad de cancelación para solicitudes aceptadas debe ser interactiva y actualizar la interfaz de usuario.
Objetivo: Integrar la funcionalidad de cancelación en el `DetalleSolicitudModal` para solicitudes "Aceptada", incluyendo la creación de botones reutilizables y la gestión del flujo post-cancelación.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/common/CancelButton/CancelButton.tsx` (nuevo componente)
- `src/components/common/CloseButton/CloseButton.tsx` (nuevo componente)
- `src/components/solicitudes/DetalleSolicitudModal/DetalleSolicitudModal.tsx` (integración de botones y llamada a Server Action)
- `src/app/dashboard/solicitudes/page.tsx` (para refrescar la lista)

Tecnologías: Next.js 16, React (useState, useCallback), TypeScript, Tailwind CSS 4, react-icons.

Estructura:
- Crear el Client Component `CancelButton.tsx` en `src/components/common/CancelButton/`. Recibirá props como `onClick`, `text`, `isActive`, `icon`.
- Crear el Client Component `CloseButton.tsx` en `src/components/common/CloseButton/`. Recibirá props como `onClick`.
- En `src/components/solicitudes/DetalleSolicitudModal/DetalleSolicitudModal.tsx`:
    - Reemplazar el botón de cierre manual por el nuevo `CloseButton`.
    - Para solicitudes en estado "Aceptada", utilizar el nuevo `CancelButton`.
    - Implementar una función `handleCancelSolicitud` que, al ser llamada por `CancelButton`, invoque a `cancelarSolicitudAction(solicitudDetail.id)`.
    - Manejar la respuesta de `cancelarSolicitudAction`:
        - Si es exitosa: Llamar a `onClose()` para cerrar el modal. Notificar a `MisSolicitudesPage` (ej., mediante una prop `onSuccessAction`) para que refresque su lista de solicitudes.
        - Si hay un error: Mostrar un mensaje de error al usuario dentro del modal.
    - Asegurarse de que el `CancelButton` para el estado "Pendiente" siga visualmente inactivo y sin llamar a la acción.
- En `src/app/dashboard/solicitudes/page.tsx`:
    - Añadir una función `handleSolicitudActionSuccess` que, al ser llamada, reactive la carga de datos de la lista (ej. re-llamando a `getSolicitudesAction`) y se la pase al modal.

Validaciones:
- El `CancelButton` de estado "Aceptada" debe ser funcional.
- El modal debe cerrarse y la lista de solicitudes debe refrescarse al cancelar exitosamente.
- Los errores de cancelación deben mostrarse claramente.

Diseño:
- Los `CancelButton` y `CloseButton` deben seguir los estilos definidos en los criterios de aceptación (rojo, papelera para cancelar activo; gris para inactivo).
- Utilizar Tailwind CSS 4.

Integración:
- `DetalleSolicitudModal` interactúa con `cancelarSolicitudAction`.
- `DetalleSolicitudModal` notifica a `MisSolicitudesPage` sobre acciones exitosas para actualizar la lista.

Criterios de Aceptación Técnica:
- El `CancelButton` en el modal (para estado "Aceptada") llama a `cancelarSolicitudAction`.
- Al cancelar exitosamente, el modal se cierra y la lista de solicitudes en `MisSolicitudesPage` se refresca.
- Los errores de cancelación se gestionan y muestran al usuario.
- El `CloseButton` cierra el modal.
---END_PROMPT---

---START_COMMIT--- HU33-T17 feat(integration): integrar cancelacion en DetalleSolicitudModal ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 18 TASK_TITLE: Integración con Backend: `getSolicitudesAction` HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se ha completado el desarrollo del frontend con seed data, y ahora es momento de conectar la página de solicitudes con el backend real.
Objetivo: Activar la integración real con el backend para el Server Action `getSolicitudesAction`, descomentando el código de la petición `fetch` pre-escrito y eliminando o comentando el retorno del seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/solicitudes/getSolicitudesAction.ts`

Tecnologías: Next.js 16 (Server Actions), TypeScript.

Estructura:
- En `src/actions/solicitudes/getSolicitudesAction.ts`:
    - Comentar o eliminar la línea que retorna el seed data simulado.
    - Descomentar el bloque de código completo que realiza la petición `fetch` al endpoint `GET /api/solicitudes`.
    - Verificar y ajustar la URL del endpoint, los headers necesarios (ej. para autenticación si aplica) y el manejo de parámetros de consulta (`params` de `SolicitudListParams`).
    - Asegurarse de que el manejo de errores y la conversión de la respuesta (`res.json()`) sean correctos.

Validaciones:
- Realizar pruebas exhaustivas para asegurar que la lista de solicitudes se carga correctamente desde el backend.
- Verificar que el filtrado y la paginación funcionan según lo esperado por la API real.
- Confirmar que los estados de carga y error se comportan adecuadamente con las respuestas del backend.

Diseño: Ninguno.

Integración: Este cambio conectará directamente el frontend con el servicio backend para la gestión de solicitudes.

Criterios de Aceptación Técnica:
- `getSolicitudesAction` realiza una petición `fetch` exitosa al backend real.
- La respuesta del backend tiene la estructura `PaginatedSolicitudListDto` esperada.
- Los componentes de la UI muestran los datos reales del backend.
- Los errores de red o del servidor se manejan correctamente.
---END_PROMPT---

---START_COMMIT--- HU33-T18 chore(backend): activar getSolicitudesAction para backend real ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 19 TASK_TITLE: Integración con Backend: `getSolicitudDetailAction` HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Una vez probada la lista, se requiere conectar el modal de detalle de solicitudes con el backend real.
Objetivo: Activar la integración real con el backend para el Server Action `getSolicitudDetailAction`, descomentando el código de la petición `fetch` pre-escrito y eliminando o comentando el retorno del seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/solicitudes/getSolicitudDetailAction.ts`

Tecnologías: Next.js 16 (Server Actions), TypeScript.

Estructura:
- En `src/actions/solicitudes/getSolicitudDetailAction.ts`:
    - Comentar o eliminar la línea que retorna el seed data simulado.
    - Descomentar el bloque de código completo que realiza la petición `fetch` al endpoint `GET /api/solicitudes/:id`.
    - Verificar y ajustar la URL del endpoint (especialmente el placeholder `:id`), los headers necesarios (ej. para autenticación si aplica).
    - Asegurarse de que el manejo de errores y la conversión de la respuesta (`res.json()`) sean correctos.

Validaciones:
- Realizar pruebas para asegurar que los detalles de solicitudes de todos los estados se cargan correctamente desde el backend al abrir el modal.
- Verificar que los campos condicionales (lugar, enlace, motivo de rechazo) se muestran correctamente según el estado real de la solicitud.
- Confirmar que los estados de carga y error se comportan adecuadamente.

Diseño: Ninguno.

Integración: Este cambio conectará el modal de detalle con el servicio backend para obtener la información completa de una solicitud.

Criterios de Aceptación Técnica:
- `getSolicitudDetailAction` realiza una petición `fetch` exitosa al backend real.
- La respuesta del backend tiene la estructura `SolicitudDetailDto` esperada para todos los estados.
- El modal de detalle muestra la información real del backend.
- Los errores de red o del servidor se manejan correctamente.
---END_PROMPT---

---START_COMMIT--- HU33-T19 chore(backend): activar getSolicitudDetailAction para backend real ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 20 TASK_TITLE: Integración con Backend: `cancelarSolicitudAction` HU_NUMBER: HU33 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Finalmente, se debe habilitar la cancelación real de solicitudes interactuando con el backend.
Objetivo: Activar la integración real con el backend para el Server Action `cancelarSolicitudAction`, descomentando el código de la petición `fetch` pre-escrito y eliminando o comentando el retorno del seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/solicitudes/cancelarSolicitudAction.ts`

Tecnologías: Next.js 16 (Server Actions), TypeScript.

Estructura:
- En `src/actions/solicitudes/cancelarSolicitudAction.ts`:
    - Comentar o eliminar la línea que retorna la respuesta simulada.
    - Descomentar el bloque de código completo que realiza la petición `fetch` al endpoint `PATCH /api/solicitudes/:id/cancel`.
    - Verificar y ajustar la URL del endpoint, el método HTTP (`PATCH`), los headers y el `body` (`CancelSolicitudDto` si aplica y es requerido por el backend).
    - Asegurarse de que el manejo de errores y la conversión de la respuesta (`res.json()`) sean correctos.

Validaciones:
- Intentar cancelar una solicitud "Aceptada" y verificar que la solicitud se marca como cancelada en el backend y la UI se actualiza (la solicitud debería desaparecer de la lista o cambiar su estado).
- Probar el manejo de errores si el backend responde con un error.

Diseño: Ninguno.

Integración: Este cambio completará la conexión bidireccional entre el frontend y el backend para la gestión de solicitudes.

Criterios de Aceptación Técnica:
- `cancelarSolicitudAction` realiza una petición `fetch` exitosa al backend real.
- La respuesta del backend tiene la estructura `APIResponse` esperada.
- La lista de solicitudes se actualiza correctamente tras una cancelación exitosa desde el backend.
- Los errores de red o del servidor se manejan correctamente.
---END_PROMPT---

---START_COMMIT--- HU33-T20 chore(backend): activar cancelarSolicitudAction para backend real ---END_COMMIT---
---END_TASK---