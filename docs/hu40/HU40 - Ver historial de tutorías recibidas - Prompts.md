---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed para el listado de historial de tutorías HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se necesita un conjunto de datos de ejemplo para simular el historial de tutorías recibidas por un estudiante, permitiendo el desarrollo frontend independiente sin depender del backend.
Objetivo: Crear un archivo de seed con datos simulados que representen la respuesta del endpoint `GET /api/tutorias/historial`, incluyendo tutorías en estados "Completada" e "Inasistencia".

Especificaciones Técnicas:

Archivos a crear/modificar: `src/seed/HistorialTutoriasSeedData.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura: El archivo debe exportar una función que retorne un array de objetos que se ajusten a la interfaz `TutoriaHistorialListDTO`. Debe incluir entre 5 y 10 registros, con una mezcla de `estado: "COMPLETADA"` y `estado: "INASISTENCIA"`. Los datos de `tutor` (nombre, apellido) y `materia` (nombre) deben ser coherentes y completos.

Validaciones: Los objetos de datos deben ser válidos conforme a `TutoriaHistorialListDTO` (definido en Tarea 3).

Diseño: No aplica (solo datos).

Integración: Ninguna directa. Será consumido por Server Actions.

Criterios de Aceptación Técnica:
- El archivo `src/seed/HistorialTutoriasSeedData.ts` existe.
- Contiene un array de `TutoriaHistorialListDTO` válido.
- Los datos incluyen al menos una tutoría "Completada" y una "Inasistencia".
- La estructura de los objetos coincide con la interfaz `TutoriaHistorialListDTO` del frontend (que replicará la del backend). ---END_PROMPT---

---START_COMMIT--- HU40-T01 feat(seed): crear seed para listado de historial de tutorías ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Creación de seed para el detalle de una tutoría HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Para desarrollar el modal de detalle de tutoría de forma independiente, se requiere un seed con datos de una tutoría específica.
Objetivo: Crear un archivo de seed con datos simulados para el detalle de una tutoría individual, replicando la respuesta del endpoint `GET /api/tutorias/:id`.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/seed/TutoriaDetalleSeedData.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura: El archivo debe exportar una función que, dado un ID de tutoría, retorne un objeto `TutoriaDetalleDTO`. Debe incluir al menos dos ejemplos de detalle, uno con `estado: "COMPLETADA"` (sin `resena`, según las observaciones de HU40) y otro con `estado: "INASISTENCIA"`. Todos los campos de `TutoriaDetalleDTO` deben estar presentes y ser coherentes.

Validaciones: Los objetos de datos deben ser válidos conforme a `TutoriaDetalleDTO` (definido en Tarea 3).

Diseño: No aplica (solo datos).

Integración: Ninguna directa. Será consumido por Server Actions.

Criterios de Aceptación Técnica:
- El archivo `src/seed/TutoriaDetalleSeedData.ts` existe.
- Contiene objetos `TutoriaDetalleDTO` válidos para diferentes IDs.
- Los datos incluyen ejemplos para "Completada" e "Inasistencia".
- La estructura de los objetos coincide con la interfaz `TutoriaDetalleDTO` del frontend. ---END_PROMPT---

---START_COMMIT--- HU40-T02 feat(seed): crear seed para detalle de tutoría ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Definición de tipos de datos Frontend (DTOs y QueryParams) HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Para garantizar un tipado seguro y una comunicación clara entre el frontend y el backend, es esencial definir las interfaces de TypeScript que representen las estructuras de datos esperadas.
Objetivo: Definir las interfaces de TypeScript para los QueryParams del historial y los DTOs de listado y detalle de tutorías en el frontend.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/interfaces/historial/HistorialTypes.ts`
- `src/interfaces/common/ApiResponse.ts` (si aún no existe, replicar la estructura general de respuesta de API)

Tecnologías: Next.js 16, TypeScript.

Estructura:
- Crear `src/interfaces/historial/HistorialTypes.ts`.
- Definir la interfaz `HistorialQueryParams` con propiedades para `page: number`, `limit: number`, `orderBy?: string`, `orderDirection?: 'ASC' | 'DESC'`, y `status?: ('COMPLETADA' | 'INASISTENCIA')[]`.
- Definir las interfaces `TutorInfoShort` (para listado) y `TutoriaHistorialListDTO` (para el listado completo de tarjetas).
- Definir las interfaces `TutorInfo`, `ResenaInfo` (aunque sin uso para HU40) y `TutoriaDetalleDTO` (para el detalle de una tutoría).
- Exportar todas las interfaces. Asegurarse de que `ApiResponse` es genérica y se puede usar con cualquier tipo de datos.

Validaciones: Las propiedades y sus tipos en las interfaces deben coincidir con la documentación de los DTOs del backend (NestJS).

Diseño: No aplica.

Integración: Estas interfaces serán utilizadas en Server Actions y componentes React para el tipado.

Criterios de Aceptación Técnica:
- Las interfaces están correctamente definidas y exportadas en `src/interfaces/historial/HistorialTypes.ts`.
- Las propiedades y sus tipos coinciden con la documentación de endpoints y DTOs de NestJS.
- `ApiResponse` está definida y es reutilizable. ---END_PROMPT---

---START_COMMIT--- HU40-T03 feat(types): definir interfaces para historial de tutorías y query params ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Implementación de Server Action `fetchHistorialAction` con seed HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La página de historial de tutorías necesita una forma de obtener los datos del listado. Para un desarrollo frontend desacoplado, inicialmente se utilizará un seed de datos.
Objetivo: Implementar una Server Action `fetchHistorialAction` que retorne los datos del seed. Incluir el código comentado para la futura integración con el endpoint real del backend.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/actions/historial/tutoriaActions.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
- Crear el archivo `src/actions/historial/tutoriaActions.ts`.
- Marcar el archivo con `'use server'`.
- Importar el seed `HistorialTutoriasSeedData` de `src/seed/HistorialTutoriasSeedData.ts` y las interfaces de `src/interfaces/historial/HistorialTypes.ts`.
- Implementar la función `fetchHistorialAction(queryParams: HistorialQueryParams)` que:
    - Retorna `Promise<ApiResponse<TutoriaHistorialListDTO[]>>`.
    - Inicialmente filtra el `HistorialTutoriasSeedData` por el `status` proporcionado en `queryParams` (si existe), y aplica `page`/`limit`.
    - Simula un retraso de red con `await new Promise(resolve => setTimeout(resolve, 500))`.
    - Retorna un objeto `ApiResponse` con `success: true` y los datos paginados del seed.
    - Los `queryParams` iniciales deben forzar `status: ['COMPLETADA', 'INASISTENCIA']` para cumplir con HU40.
- Dentro de esta función, escribir un bloque completo de código para la petición `fetch` al endpoint real (`/api/tutorias/historial`) incluyendo:
    - Construcción de `URLSearchParams` con `queryParams`.
    - `method: 'GET'`, `headers` (incluyendo posible `Authorization` token).
    - `next: { tags: ['tutorias-historial'] }` para revalidación.
    - Manejo de `response.ok` y `throw new Error` para HTTP errores.
    - Un bloque `try-catch` para manejar errores de red o del servidor.
- Comentar **TODO** el bloque de código de la petición `fetch` real.

Validaciones: La función debe manejar `queryParams` de `page` y `limit` para la paginación simulada, y el filtro por `status`.

Diseño: No aplica.

Integración: Esta Server Action será invocada desde `src/app/historial/page.tsx`.

Criterios de Aceptación Técnica:
- La `fetchHistorialAction` existe en `src/actions/historial/tutoriaActions.ts` y es una Server Action.
- Retorna datos del seed de historial de tutorías correctamente, aplicando paginación y el filtro de estados `COMPLETADA` e `INASISTENCIA`.
- El código de la petición `fetch` al backend real está presente y completamente comentado.
- Se manejan casos de éxito y error (simulados) de forma consistente con `ApiResponse`. ---END_PROMPT---

---START_COMMIT--- HU40-T04 feat(actions): implementar fetchHistorialAction con seed y código comentado para backend ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Implementación de Server Action `fetchDetalleAction` con seed HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Similar al listado, el modal de detalle de tutoría necesita una Server Action para obtener los datos de una tutoría específica.
Objetivo: Implementar una Server Action `fetchDetalleAction` que retorne los datos del seed. Incluir el código comentado para la futura integración con el endpoint real del backend.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/actions/historial/tutoriaActions.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
- Agregar la función `fetchDetalleAction(tutoriaId: string)` al archivo `src/actions/historial/tutoriaActions.ts`.
- Importar el seed `TutoriaDetalleSeedData` de `src/seed/TutoriaDetalleSeedData.ts` y las interfaces de `src/interfaces/historial/HistorialTypes.ts`.
- Implementar la función que:
    - Retorna `Promise<ApiResponse<TutoriaDetalleDTO>>`.
    - Busca el detalle en el `TutoriaDetalleSeedData` usando `tutoriaId`.
    - Simula un retraso de red con `await new Promise(resolve => setTimeout(resolve, 500))`.
    - Retorna `success: true` con los datos del seed si se encuentra, o `success: false` con un mensaje de error si no se encuentra.
- Dentro de esta función, escribir un bloque completo de código para la petición `fetch` al endpoint real (`/api/tutorias/:id`) incluyendo:
    - `method: 'GET'`, `headers` (incluyendo posible `Authorization` token).
    - `next: { tags: [\`tutoria-${tutoriaId}\`] }` para revalidación.
    - Manejo de `response.ok` y `throw new Error` para HTTP errores.
    - Un bloque `try-catch` para manejar errores de red o del servidor.
- Comentar **TODO** el bloque de código de la petición `fetch` real.

Validaciones: La función debe buscar por `tutoriaId` y manejar el caso de no encontrar la tutoría.

Diseño: No aplica.

Integración: Esta Server Action será invocada desde `src/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria.tsx`.

Criterios de Aceptación Técnica:
- La `fetchDetalleAction` existe en `src/actions/historial/tutoriaActions.ts` y es una Server Action.
- Retorna datos del seed de detalle de tutoría correctamente para un ID dado.
- El código de la petición `fetch` al backend real está presente y completamente comentado.
- Se manejan casos de éxito y error (simulados) de forma consistente con `ApiResponse`. ---END_PROMPT---

---START_COMMIT--- HU40-T05 feat(actions): implementar fetchDetalleAction con seed y código comentado para backend ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Configuración de la página `app/historial/page.tsx` HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Historial ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La ruta `/historial` necesita una página principal que sirva como punto de entrada para el historial de tutorías.
Objetivo: Configurar el archivo principal de la ruta `/historial` como un Server Component en Next.js, definiendo su estructura básica y el manejo de `searchParams`.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/app/historial/page.tsx`

Tecnologías: Next.js 16, React, TypeScript.

Estructura:
- Crear el archivo `src/app/historial/page.tsx`.
- Definir el componente `HistorialTutoriasPage` como un Server Component.
- El componente debe aceptar la prop `searchParams: { [key: string]: string | string[] | undefined }`.
- Crear una estructura JSX básica que devuelva un `div` principal, listo para contener el título y el listado de tutorías.

Validaciones: La página debe renderizarse sin errores.

Diseño: No aplica diseño visual complejo aún, solo la estructura básica para la página.

Integración: N/A.

Criterios de Aceptación Técnica:
- `src/app/historial/page.tsx` es un Server Component.
- Acepta la prop `searchParams`.
- La página se renderiza sin errores en el navegador. ---END_PROMPT---

---START_COMMIT--- HU40-T06 feat(page): configurar página de historial de tutorías ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Maquetación del contenedor principal y título de la página HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Historial ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La página de historial de tutorías requiere un título descriptivo y un contenedor visualmente organizado para el listado de tarjetas.
Objetivo: Implementar el layout principal de la página "Historial de Tutorías" con su título, siguiendo el diseño general proporcionado en el prototipo "E. Historial".

Especificaciones Técnicas:

Archivos a crear/modificar: `src/app/historial/page.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Dentro del componente `HistorialTutoriasPage`, añadir un título (`<h1>` o `<h2>`) con el texto "Historial de Tutorías".
- Aplicar estilos básicos con Tailwind CSS 4 para centrar o posicionar el título y establecer un layout contenedor para el futuro listado de tarjetas. El contenedor debe proporcionar un espaciado adecuado y posiblemente un ancho máximo.

Validaciones: El título debe ser visible en la página.

Diseño: Referencia a "E. Historial". El título y el contenedor principal deben seguir las directrices de espaciado y alineación. Aplicar responsive design básico.

Integración: N/A.

Criterios de Aceptación Técnica:
- El título "Historial de Tutorías" es visible en la página.
- El layout básico de la página coincide visualmente con el prototipo "E. Historial", con un contenedor central y espaciado adecuado. ---END_PROMPT---

---START_COMMIT--- HU40-T07 feat(ui): maquetar contenedor principal y título de la página de historial ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 8 TASK_TITLE: Carga y renderizado inicial del listado de tutorías en `page.tsx` HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Historial ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La página principal del historial debe cargar y mostrar las tutorías recibidas por el estudiante.
Objetivo: En `HistorialTutoriasPage`, utilizar la Server Action `fetchHistorialAction` para cargar el listado inicial de tutorías y renderizar un contenedor donde se mostrarán las tarjetas, inicialmente con placeholders o una estructura básica.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/app/historial/page.tsx`

Tecnologías: Next.js 16, React, TypeScript.

Estructura:
- En `HistorialTutoriasPage`, extraer los parámetros `page` y `limit` de `searchParams`, asignando valores por defecto (ej. `page=1`, `limit=10`).
- Construir el objeto `queryParams` para `fetchHistorialAction`, asegurando que el `status` incluya `['COMPLETADA', 'INASISTENCIA']` según la HU40.
- Llamar a `fetchHistorialAction(queryParams)` para obtener los datos del historial.
- Implementar un manejo básico del estado de carga (ej. mostrando un mensaje "Cargando...") y error (ej. "Error al cargar el historial").
- Crear un `div` o `section` con estilos Tailwind CSS 4 para envolver el futuro listado de `TarjetaTutoria`.
- (Opcional, para pre-maquetación) Mapear sobre los datos de las tutorías recibidas para renderizar placeholders o una estructura `div` básica para cada tutoría, confirmando que los datos se han cargado.

Validaciones: La carga de datos debe ser exitosa y los `queryParams` deben construirse correctamente.

Diseño: El contenedor del listado debe tener un estilo general para la disposición de las tarjetas (ej. grid o flex wrap).

Integración: Invocar `fetchHistorialAction` de `src/actions/historial/tutoriaActions.ts`.

Criterios de Aceptación Técnica:
- La página carga los datos del historial de tutorías (del seed) al renderizarse.
- El listado de tutorías se muestra en la consola o en una estructura básica en la interfaz, indicando que los datos han sido recibidos.
- Los `queryParams` se construyen correctamente, incluyendo los estados requeridos `COMPLETADA` e `INASISTENCIA`. ---END_PROMPT---

---START_COMMIT--- HU40-T08 feat(page): cargar y renderizar listado inicial de tutorías en página de historial ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 9 TASK_TITLE: Creación del componente `TarjetaTutoria` (estructura base) HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Historial, E. Historial (Tutorías con Inasistencia) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Cada entrada en el historial de tutorías se presentará como una tarjeta individual.
Objetivo: Crear el componente Client Component `TarjetaTutoria`, estableciendo su estructura JSX básica y definiendo las props necesarias para aceptar los datos de una tutoría.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/components/historial-ui/TarjetaTutoria/TarjetaTutoria.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Crear el archivo `src/components/historial-ui/TarjetaTutoria/TarjetaTutoria.tsx`.
- Definir el componente `TarjetaTutoria` como un Client Component (`'use client'`).
- Definir las `props` del componente para aceptar una `tutoria` de tipo `TutoriaHistorialListDTO` (importada de `src/interfaces/historial/HistorialTypes.ts`).
- Crear una estructura básica de `div` con estilos de tarjeta (ej. borde redondeado, sombra, padding, fondo claro) usando Tailwind CSS 4.

Validaciones: El componente debe renderizar sin errores con props básicas.

Diseño: Referencia a "E. Historial" y "E. Historial (Tutorías con Inasistencia)". La estructura debe ser genérica para ambos estados de tarjeta.

Integración: Este componente será utilizado por `src/app/historial/page.tsx`.

Criterios de Aceptación Técnica:
- El componente `TarjetaTutoria` existe en `src/components/historial-ui/TarjetaTutoria/TarjetaTutoria.tsx` y es un Client Component.
- Acepta props de tipo `TutoriaHistorialListDTO`.
- Renderiza una estructura HTML básica que visualmente se parece a una tarjeta (ej. con bordes, sombra, fondo). ---END_PROMPT---

---START_COMMIT--- HU40-T09 feat(ui): crear componente TarjetaTutoria (estructura base) ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 10 TASK_TITLE: Renderizado de datos básicos en `TarjetaTutoria` HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Historial ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Las tarjetas del historial deben mostrar información clave de cada tutoría de forma legible.
Objetivo: Dentro del componente `TarjetaTutoria`, mostrar la información esencial de la tutoría como la materia, el nombre del tutor, la fecha y la hora, utilizando los datos pasados por las props.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/components/historial-ui/TarjetaTutoria/TarjetaTutoria.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Acceder a las propiedades del objeto `tutoria: TutoriaHistorialListDTO` recibido como prop.
- Mostrar `tutoria.materia`, `tutoria.tutor.nombre`, `tutoria.tutor.apellido`, `tutoria.fecha` y `tutoria.hora` dentro de la tarjeta.
- Formatear la fecha y hora para una visualización amigable (ej. "26 octubre, 14:00" o "26/10/2024, 14:00") utilizando la API `Intl.DateTimeFormat` o una utilidad de fecha.
- Utilizar elementos semánticos (ej. `h3` para materia, `p` para otros detalles) y aplicar estilos Tailwind CSS 4 para una presentación clara y organizada.

Validaciones: La información debe ser visible y correcta.

Diseño: Referencia a "E. Historial". Los elementos deben estar bien espaciados y alineados, y el texto debe ser legible.

Integración: Consume datos de `TutoriaHistorialListDTO`.

Criterios de Aceptación Técnica:
- La tarjeta muestra la materia, el nombre y apellido del tutor, la fecha y la hora de la tutoría.
- La información es correcta, legible y formateada adecuadamente. ---END_PROMPT---

---START_COMMIT--- HU40-T10 feat(ui): renderizar datos básicos en TarjetaTutoria ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 11 TASK_TITLE: Estilos condicionales de estado para `TarjetaTutoria` (Completada) HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Historial ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Las tarjetas de tutorías deben indicar visualmente su estado, con un estilo específico para las tutorías "Completada".
Objetivo: Aplicar los estilos visuales específicos para las tarjetas de tutorías con estado "Completada" (ej. etiqueta verde), según lo especificado en el prototipo "E. Historial".

Especificaciones Técnicas:

Archivos a crear/modificar: `src/components/historial-ui/TarjetaTutoria/TarjetaTutoria.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, clsx.

Estructura:
- Dentro del componente `TarjetaTutoria`, añadir un elemento (`span` o `div`) para mostrar el estado de la tutoría.
- Si `tutoria.estado === "COMPLETADA"`, aplicar los estilos Tailwind CSS 4 para la etiqueta verde (ej. `bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-semibold`) y cualquier otro estilo de borde o sombra asociado a este estado, utilizando la librería `clsx` para gestionar clases condicionales.

Validaciones: La etiqueta de estado debe aparecer correctamente y con los colores esperados para tutorías "Completada".

Diseño: Referencia a "E. Historial". La etiqueta debe ser prominente y clara.

Integración: N/A.

Criterios de Aceptación Técnica:
- Las tarjetas de tutorías "Completada" tienen la etiqueta de estado "Completada" visible y con los estilos de color verde correctos.
- Los estilos se aplican condicionalmente basándose en el estado de la tutoría. ---END_PROMPT---

---START_COMMIT--- HU40-T11 feat(ui): aplicar estilos de estado "Completada" a TarjetaTutoria ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 12 TASK_TITLE: Estilos condicionales de estado para `TarjetaTutoria` (Inasistencia) HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Historial (Tutorías con Inasistencia) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Las tarjetas de tutorías deben indicar visualmente su estado, con un estilo específico para las tutorías con "Inasistencia".
Objetivo: Aplicar los estilos visuales específicos para las tarjetas de tutorías con estado "Inasistencia" (ej. recuadro rojo con mensaje), según lo especificado en el prototipo "E. Historial (Tutorías con Inasistencia)".

Especificaciones Técnicas:

Archivos a crear/modificar: `src/components/historial-ui/TarjetaTutoria/TarjetaTutoria.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, clsx.

Estructura:
- Dentro del componente `TarjetaTutoria`, si `tutoria.estado === "INASISTENCIA"`, aplicar los estilos Tailwind CSS 4 para el recuadro rojo (ej. `border-red-500 bg-red-50`) y mostrar el mensaje "El tutor reportó inasistencia para esta sesión.".
- Asegurar que estos estilos coexistan correctamente con los demás elementos de la tarjeta, y que el mensaje de inasistencia sea claramente visible. Utilizar `clsx` para una gestión limpia de las clases condicionales.

Validaciones: La etiqueta y el recuadro rojo deben aparecer correctamente para tutorías "Inasistencia".

Diseño: Referencia a "E. Historial (Tutorías con Inasistencia)". El recuadro y el mensaje deben ser consistentes con el prototipo.

Integración: N/A.

Criterios de Aceptación Técnica:
- Las tarjetas de tutorías "Inasistencia" tienen el recuadro rojo y el mensaje "El tutor reportó inasistencia para esta sesión.".
- Los estilos se aplican condicionalmente basándose en el estado de la tutoría. ---END_PROMPT---

---START_COMMIT--- HU40-T12 feat(ui): aplicar estilos de estado "Inasistencia" a TarjetaTutoria ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 13 TASK_TITLE: Creación del componente `PaginacionHistorial` (estructura base) HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Historial ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La página de historial de tutorías requiere un control de paginación para navegar por el listado de tarjetas.
Objetivo: Crear el componente Client Component `PaginacionHistorial`, estableciendo su estructura JSX básica y definiendo las props para la paginación.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/components/historial-ui/PaginacionHistorial/PaginacionHistorial.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Crear el archivo `src/components/historial-ui/PaginacionHistorial/PaginacionHistorial.tsx`.
- Definir el componente `PaginacionHistorial` como un Client Component (`'use client'`).
- Definir las `props` para `currentPage: number`, `totalPages: number`, y una función `onPageChange: (page: number) => void`.
- Crear una estructura básica con botones para "anterior" (`<`), "siguiente" (`>`) y un espacio central donde se renderizarán los números de página. Aplicar estilos básicos de paginación con Tailwind CSS 4.

Validaciones: El componente debe renderizar sin errores con props básicas.

Diseño: Referencia a "E. Historial". La estructura debe ser clara y funcional, con botones estilizados.

Integración: N/A.

Criterios de Aceptación Técnica:
- El componente `PaginacionHistorial` existe en `src/components/historial-ui/PaginacionHistorial/PaginacionHistorial.tsx` y es un Client Component.
- Acepta props `currentPage`, `totalPages`, y `onPageChange`.
- Renderiza una estructura HTML básica con controles de navegación y un espacio para números de página. ---END_PROMPT---

---START_COMMIT--- HU40-T13 feat(ui): crear componente PaginacionHistorial (estructura base) ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 14 TASK_TITLE: Lógica y renderizado de números de página en `PaginacionHistorial` HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Historial ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El componente de paginación debe mostrar dinámicamente los números de página disponibles y resaltar la página actual.
Objetivo: Implementar la lógica para calcular y renderizar dinámicamente los números de página en el componente `PaginacionHistorial`, resaltando la página activa y haciéndolos clicables.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/components/historial-ui/PaginacionHistorial/PaginacionHistorial.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, clsx.

Estructura:
- Dentro de `PaginacionHistorial`, implementar la lógica para generar un array de números de página a mostrar. Se recomienda mostrar un rango limitado de páginas (ej. 2 páginas a cada lado de `currentPage`, más elipsis si es necesario), o todas si `totalPages` es pequeño.
- Mapear sobre este array para renderizar botones o enlaces clicables para cada número de página.
- Aplicar estilos condicionales (`bg-dark` o similar para texto claro sobre fondo oscuro) usando `clsx` para resaltar la `currentPage`.
- Asociar un `onClick` a cada número de página para llamar a la prop `onPageChange` con el número de página correspondiente.

Validaciones: Los números de página deben ser correctos y la página activa debe resaltarse.

Diseño: Referencia a "E. Historial". Los números de página deben ser consistentes con el diseño del prototipo, incluyendo el resaltado de la página activa.

Integración: Utiliza `currentPage`, `totalPages` y `onPageChange` de las props.

Criterios de Aceptación Técnica:
- Los números de página se renderizan correctamente y son clicables.
- La página activa se resalta visualmente con un estilo distintivo (ej. fondo oscuro, texto claro). ---END_PROMPT---

---START_COMMIT--- HU40-T14 feat(ui): implementar lógica y renderizado de números de página en PaginacionHistorial ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 15 TASK_TITLE: Implementación de navegación ">" y "<" en `PaginacionHistorial` HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Historial ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Además de los números, el componente de paginación requiere controles para avanzar y retroceder una página.
Objetivo: Añadir la funcionalidad a los controles de paginación de "siguiente" (>) y "anterior" (<) en el componente `PaginacionHistorial`, deshabilitándolos cuando se alcanzan los límites de `totalPages`.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/components/historial-ui/PaginacionHistorial/PaginacionHistorial.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Identificar o crear los botones para "anterior" (`<`) y "siguiente" (`>`).
- Deshabilitar el botón "anterior" (`<`) si `currentPage` es `1`.
- Deshabilitar el botón "siguiente" (`>`) si `currentPage` es `totalPages`.
- Asociar un `onClick` a estos botones para llamar a `onPageChange` con `currentPage - 1` o `currentPage + 1` respectivamente.
- Aplicar estilos Tailwind CSS 4 para los botones, incluyendo estados deshabilitados (ej. `opacity-50 cursor-not-allowed`).

Validaciones: Los botones deben deshabilitarse correctamente en los límites.

Diseño: Referencia a "E. Historial". Los botones deben tener un diseño coherente con el resto de la paginación.

Integración: Utiliza `currentPage`, `totalPages` y `onPageChange` de las props.

Criterios de Aceptación Técnica:
- Los botones ">" y "<" son funcionales y cambian la página al hacer clic.
- Se deshabilitan correctamente cuando la `currentPage` es la primera o la última página, respectivamente. ---END_PROMPT---

---START_COMMIT--- HU40-T15 feat(ui): implementar navegación anterior/siguiente en PaginacionHistorial ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 16 TASK_TITLE: Integración de `PaginacionHistorial` con `searchParams` de Next.js HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Historial ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Para que la paginación sea persistente y cause un re-render del Server Component, los cambios de página deben reflejarse en la URL.
Objetivo: Conectar el componente `PaginacionHistorial` con los `searchParams` de Next.js, de modo que los cambios de página actualicen la URL y provoquen una nueva carga del `HistorialTutoriasPage`.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/historial/page.tsx`
- `src/components/historial-ui/PaginacionHistorial/PaginacionHistorial.tsx`

Tecnologías: Next.js 16, React, TypeScript.

Estructura:
- En `src/app/historial/page.tsx`:
    - Obtener el `router` de Next.js (ej. `useRouter()`).
    - Crear una función `handlePageChange(page: number)` que construya una nueva URL con el `page` `searchParam` actualizado y utilice `router.push()` para navegar.
    - Pasar `currentPage`, `totalPages` (calculado a partir de `totalRecords` de la `ApiResponse` y el `limit`), y `handlePageChange` como `onPageChange` al componente `PaginacionHistorial`.
- En `src/components/historial-ui/PaginacionHistorial/PaginacionHistorial.tsx`:
    - Utilizar la prop `onPageChange` al hacer clic en los números de página o los botones de navegación.

Validaciones: La URL debe actualizarse con el `page` `searchParam` correcto. El listado de tutorías debe cambiar visualmente.

Diseño: No aplica, solo funcionalidad.

Integración: Uso de `useRouter` de `next/navigation` y props entre `page.tsx` y `PaginacionHistorial`.

Criterios de Aceptación Técnica:
- La URL se actualiza con el `page` `searchParam` al cambiar de página (ej. `?page=2`).
- El listado de tutorías se actualiza (del seed) al cambiar de página.
- El número de página activo se resalta correctamente después de la actualización de la URL. ---END_PROMPT---

---START_COMMIT--- HU40-T16 feat(pagination): integrar PaginacionHistorial con searchParams de Next.js ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 17 TASK_TITLE: Creación del componente `ModalDetalleTutoria` (estructura base) HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Historial (Detalle Tutoría con Inasistencia), E. Historial (Detalle Tutoría Completada) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Cuando el estudiante selecciona una tarjeta del historial, se debe mostrar un modal con los detalles completos de esa tutoría.
Objetivo: Crear el componente Client Component `ModalDetalleTutoria`, estableciendo su estructura JSX básica (fondo oscuro, ventana central) y definiendo las props.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Crear el archivo `src/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria.tsx`.
- Definir el componente `ModalDetalleTutoria` como un Client Component (`'use client'`).
- Definir las `props` para `tutoriaId: string | null`, `isOpen: boolean`, y `onClose: () => void`.
- Crear una estructura básica de un modal:
    - Un `div` para el overlay de fondo oscuro (`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`).
    - Un `div` para el contenedor central del modal (fondo blanco, bordes redondeados, padding, sombra, ancho máximo, `z-50`).
- Aplicar estilos Tailwind CSS 4 para el modal, asegurando que esté centrado y ocupe un espacio razonable en la pantalla.

Validaciones: El componente debe renderizar sin errores con props básicas.

Diseño: Referencia a "E. Historial (Detalle Tutoría con Inasistencia)" y "E. Historial (Detalle Tutoría Completada)". El modal debe tener la apariencia general de un modal típico, con fondo semitransparente y una ventana flotante.

Integración: N/A.

Criterios de Aceptación Técnica:
- El componente `ModalDetalleTutoria` existe en `src/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria.tsx` y es un Client Component.
- Acepta props `tutoriaId`, `isOpen` y `onClose`.
- Renderiza una estructura HTML básica que simula un modal (overlay de fondo y contenedor central). ---END_PROMPT---

---START_COMMIT--- HU40-T17 feat(ui): crear componente ModalDetalleTutoria (estructura base) ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 18 TASK_TITLE: Implementación de apertura y cierre de `ModalDetalleTutoria` HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Historial (Detalle Tutoría con Inasistencia), E. Historial (Detalle Tutoría Completada) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El modal de detalle de tutoría debe poder abrirse y cerrarse de manera interactiva.
Objetivo: Implementar la lógica para que el `ModalDetalleTutoria` se muestre u oculte condicionalmente, y para que el evento `onClose` se dispare al hacer clic fuera del modal o en un botón de cierre.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, clsx.

Estructura:
- En `src/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria.tsx`, usar la prop `isOpen` para mostrar/ocultar el modal. Se puede hacer envolviendo todo el contenido del modal en una condición `if (isOpen) { ... }` o utilizando clases condicionales de Tailwind CSS 4 para la visibilidad (ej. `hidden` vs. `block`, o `opacity-0` vs. `opacity-100`).
- Asociar un `onClick` al `div` del overlay de fondo oscuro para llamar a la prop `onClose()`.
- Para evitar que el clic en el contenido del modal cierre el mismo, añadir `e.stopPropagation()` a los `onClick` de los elementos internos del modal que no deben cerrarlo.

Validaciones: El modal debe mostrarse/ocultarse correctamente.

Diseño: El modal debe aparecer y desaparecer suavemente, si se implementan transiciones (opcional para esta tarea).

Integración: Utiliza `isOpen` y `onClose` de las props.

Criterios de Aceptación Técnica:
- El modal se muestra cuando `isOpen` es `true` y se oculta (o no se renderiza) cuando es `false`.
- El modal se cierra correctamente al hacer clic en el fondo oscuro (overlay). ---END_PROMPT---

---START_COMMIT--- HU40-T18 feat(ui): implementar apertura y cierre de ModalDetalleTutoria ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 19 TASK_TITLE: Manejo de estado para `tutoriaId` seleccionada HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Historial, E. Historial (Detalle Tutoría con Inasistencia), E. Historial (Detalle Tutoría Completada) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Para abrir el modal de detalle, la página principal debe saber qué tutoría fue seleccionada y gestionar el estado de visibilidad del modal.
Objetivo: Implementar el estado local en `HistorialTutoriasPage` para almacenar el ID de la tutoría seleccionada y controlar la apertura/cierre del modal de detalle.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/historial/page.tsx`
- `src/components/historial-ui/TarjetaTutoria/TarjetaTutoria.tsx`
- `src/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria.tsx`

Tecnologías: Next.js 16, React, TypeScript.

Estructura:
- En `src/app/historial/page.tsx`:
    - Definir un estado con `useState` para `selectedTutoriaId: string | null` (inicialmente `null`).
    - Definir un estado con `useState` para `isModalOpen: boolean` (inicialmente `false`).
    - Crear una función `handleOpenModal(tutoriaId: string)` que actualice `selectedTutoriaId` al ID recibido y establezca `isModalOpen` en `true`.
    - Crear una función `handleCloseModal()` que reinicie `selectedTutoriaId` a `null` y `isModalOpen` a `false`.
    - Pasar `handleOpenModal` a cada `TarjetaTutoria` como una prop `onClick` (o `onSelectTutoria`).
    - Pasar `tutoriaId={selectedTutoriaId}`, `isOpen={isModalOpen}`, y `onClose={handleCloseModal}` al componente `ModalDetalleTutoria`.
- En `src/components/historial-ui/TarjetaTutoria/TarjetaTutoria.tsx`:
    - Añadir una prop `onSelectTutoria: (tutoriaId: string) => void`.
    - Asociar un `onClick` a la tarjeta principal que llame a `onSelectTutoria(tutoria.id)`.
- En `src/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria.tsx`:
    - Asegurarse de que las props `tutoriaId`, `isOpen`, `onClose` se reciben y utilizan correctamente.

Validaciones: El `tutoriaId` y el estado de apertura/cierre deben reflejarse correctamente.

Diseño: No aplica, solo lógica.

Integración: Comunicación entre `page.tsx` (Server Component, pero usando `useState` para estados locales a través de Client Components) y los Client Components `TarjetaTutoria` y `ModalDetalleTutoria`.

Criterios de Aceptación Técnica:
- Al hacer clic en una `TarjetaTutoria`, el `selectedTutoriaId` en `HistorialTutoriasPage` se actualiza con el ID de la tutoría y `isModalOpen` se vuelve `true`.
- El `ModalDetalleTutoria` recibe las props `tutoriaId` e `isOpen` correctamente, controlando su visibilidad. ---END_PROMPT---

---START_COMMIT--- HU40-T19 feat(state): manejar estado de tutoría seleccionada para modal de detalle ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 20 TASK_TITLE: Carga de datos de detalle de tutoría en `ModalDetalleTutoria` HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Historial (Detalle Tutoría con Inasistencia), E. Historial (Detalle Tutoría Completada) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Una vez que el modal se abre con un ID de tutoría, debe cargar los datos detallados de esa tutoría.
Objetivo: Dentro del `ModalDetalleTutoria`, utilizar `fetchDetalleAction` para cargar los detalles completos de la tutoría cuando el modal se abre y un `tutoriaId` válido está disponible.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria.tsx`

Tecnologías: Next.js 16, React, TypeScript.

Estructura:
- En `src/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria.tsx`:
    - Definir un estado local para `tutoriaDetalle: TutoriaDetalleDTO | null` y `isLoading: boolean`.
    - Usar un `useEffect` que se active cuando `tutoriaId` cambie y `isOpen` sea `true` (y `tutoriaId` no sea `null`).
    - Dentro del `useEffect`, llamar a `fetchDetalleAction(tutoriaId)`:
        - Establecer `isLoading` a `true` antes de la llamada y a `false` después.
        - Almacenar el `TutoriaDetalleDTO` resultante en el estado local `tutoriaDetalle`.
        - Manejar posibles errores (ej. `console.error` o mostrar un mensaje en el modal).
    - Mostrar un indicador de carga (spinner o texto "Cargando...") mientras `isLoading` es `true`.

Validaciones: Los datos de detalle deben cargarse correctamente.

Diseño: El indicador de carga debe ser visible y estéticamente agradable.

Integración: Invoca `fetchDetalleAction` de `src/actions/historial/tutoriaActions.ts`.

Criterios de Aceptación Técnica:
- Cuando el modal se abre con un `tutoriaId` válido, se ejecuta `fetchDetalleAction`.
- Los datos de detalle de la tutoría (del seed) se cargan y almacenan en el estado local `tutoriaDetalle`.
- Se muestra un indicador de carga mientras se obtienen los datos. ---END_PROMPT---

---START_COMMIT--- HU40-T20 feat(modal): cargar datos de detalle de tutoría en ModalDetalleTutoria ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 21 TASK_TITLE: Renderizado de datos de detalle en `ModalDetalleTutoria` HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Historial (Detalle Tutoría con Inasistencia), E. Historial (Detalle Tutoría Completada) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Una vez que los datos de detalle de la tutoría se han cargado, deben ser presentados al usuario dentro del modal.
Objetivo: Renderizar toda la información disponible (`materia`, `tutor`, `fecha`, `hora`, `modalidad`, `precioPorHora`, `enlaceReunion`/`ubicacion`, `mensajeEstudiante`) dentro del `ModalDetalleTutoria`, siguiendo los prototipos.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Acceder al objeto `tutoriaDetalle` del estado local (asumiendo que no es `null` ni `undefined`).
- Mostrar los campos principales: materia, nombre del tutor, fecha y hora (formateadas).
- Mostrar la `modalidad` (ej. "Virtual", "Presencial") y `precioPorHora`.
- Condicionalmente, mostrar `tutoriaDetalle.enlaceReunion` si `modalidad` es "Virtual", o `tutoriaDetalle.ubicacion` si `modalidad` es "Presencial".
- Mostrar el `tutoriaDetalle.mensajeEstudiante`.
- Aplicar estilos de maquetación con Tailwind CSS 4 para los diferentes campos del detalle, agrupándolos lógicamente y siguiendo la distribución de los prototipos "E. Historial (Detalle Tutoría con Inasistencia)" y "E. Historial (Detalle Tutoría Completada)".

Validaciones: Todos los datos relevantes deben estar visibles y ser correctos.

Diseño: Referencia a "E. Historial (Detalle Tutoría con Inasistencia)" y "E. Historial (Detalle Tutoría Completada)". Los campos deben estar organizados, con etiquetas claras y alineación adecuada.

Integración: Consume `TutoriaDetalleDTO` del estado local.

Criterios de Aceptación Técnica:
- Todos los datos de detalle de la tutoría (`materia`, `tutor`, `fecha`, `hora`, `modalidad`, `precioPorHora`, `enlaceReunion`/`ubicacion`, `mensajeEstudiante`) se muestran correctamente en el modal.
- La información se presenta de manera clara, organizada y con los estilos adecuados.
- Los campos condicionales (enlace de reunión o ubicación) se muestran correctamente según la modalidad. ---END_PROMPT---

---START_COMMIT--- HU40-T21 feat(modal): renderizar datos de detalle en ModalDetalleTutoria ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 22 TASK_TITLE: Renderizado de etiqueta de estado en `ModalDetalleTutoria` HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Historial (Detalle Tutoría con Inasistencia), E. Historial (Detalle Tutoría Completada) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El modal de detalle debe mostrar también el estado de la tutoría para una referencia rápida.
Objetivo: Mostrar la etiqueta de estado de la tutoría ("Completada" o "Inasistencia") en la parte inferior del `ModalDetalleTutoria`, con los estilos correspondientes, según los prototipos.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, clsx.

Estructura:
- En `src/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria.tsx`, acceder al `tutoriaDetalle.estado`.
- Renderizar un elemento `<span>` o `<div>` que muestre el texto "Estado: [Estado]".
- Aplicar estilos Tailwind CSS 4 para la etiqueta de estado:
    - Para `estado: "COMPLETADA"`, usar estilos de etiqueta verde (ej. `bg-green-100 text-green-800 rounded-full px-3 py-1`).
    - Para `estado: "INASISTENCIA"`, usar estilos de etiqueta roja (ej. `bg-red-100 text-red-800 rounded-full px-3 py-1`).
- Posicionar esta etiqueta en la parte inferior del contenido del modal, justo encima del botón "Cerrar", siguiendo el prototipo.

Validaciones: La etiqueta de estado debe ser visible y con los colores correctos.

Diseño: Referencia a "E. Historial (Detalle Tutoría con Inasistencia)" y "E. Historial (Detalle Tutoría Completada)". La etiqueta debe ser visualmente consistente con las etiquetas de estado de las tarjetas.

Integración: Consume `tutoriaDetalle.estado`.

Criterios de Aceptación Técnica:
- La etiqueta de estado de la tutoría ("Estado: Completada" o "Estado: Inasistencia") es visible en la parte inferior del modal.
- Los estilos para "Completada" (verde) e "Inasistencia" (rojo) son correctos y se aplican condicionalmente. ---END_PROMPT---

---START_COMMIT--- HU40-T22 feat(modal): renderizar etiqueta de estado en ModalDetalleTutoria ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 23 TASK_TITLE: Implementación de botón "Cerrar" en `ModalDetalleTutoria` HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Historial (Detalle Tutoría con Inasistencia), E. Historial (Detalle Tutoría Completada) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Para una experiencia de usuario completa, el modal debe tener un botón explícito para cerrar.
Objetivo: Añadir el botón "Cerrar" en la parte inferior del `ModalDetalleTutoria` y conectarlo con la funcionalidad de cierre del modal.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- En `src/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria.tsx`, agregar un componente `Button` (o un botón HTML simple con estilos) con el texto "Cerrar" en la parte inferior del modal, como se muestra en los prototipos.
- Asociar un `onClick` a este botón para llamar a la prop `onClose()`.
- Aplicar los estilos del botón con Tailwind CSS 4 (ej. `bg-gray-200 text-gray-800 px-4 py-2 rounded`).

Validaciones: El botón debe ser visible y funcional.

Diseño: Referencia a "E. Historial (Detalle Tutoría con Inasistencia)" y "E. Historial (Detalle Tutoría Completada)". El botón debe tener un estilo consistente con los elementos de UI de la aplicación.

Integración: Utiliza la prop `onClose`.

Criterios de Aceptación Técnica:
- El botón "Cerrar" es visible en la parte inferior del modal.
- Al hacer clic en el botón "Cerrar", el modal desaparece. ---END_PROMPT---

---START_COMMIT--- HU40-T23 feat(modal): implementar botón "Cerrar" en ModalDetalleTutoria ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 24 TASK_TITLE: Deshabilitar o no renderizar `FiltrosHistorial` y `BotonCalificar` HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Historial (Detalle Tutoría Completada) ---END_FRAME---

---START_ESTIMATION--- 0.1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Las observaciones de la HU40 especifican explícitamente que ciertas funcionalidades (filtros de ordenación/estado y el botón "Calificar") no deben estar presentes en esta implementación.
Objetivo: Asegurarse de que los componentes o elementos de UI relacionados con `FiltrosHistorial` y `BotonCalificar` no se rendericen o estén explícitamente deshabilitados para cumplir con las observaciones de HU40.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/historial/page.tsx`
- `src/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria.tsx`

Tecnologías: Next.js 16, React, TypeScript.

Estructura:
- En `src/app/historial/page.tsx`:
    - Revisar el contenido para asegurarse de que no se importa ni se renderiza ningún componente relacionado con `FiltrosHistorial` (ej. para "Ordenar:" o "Estado:"). Si existe código placeholder, debe ser eliminado o comentado.
- En `src/components/historial-ui/ModalDetalleTutoria/ModalDetalleTutoria.tsx`:
    - Asegurar que cualquier código que pudiera renderizar un `BotonCalificar` (o una funcionalidad similar) **NO** se incluya. Esto es crucial ya que el prototipo "E. Historial (Detalle Tutoría Completada)" lo muestra, pero las observaciones lo descartan para HU40.

Validaciones: Los elementos mencionados no deben ser visibles en la interfaz de usuario.

Diseño: No deben aparecer elementos visuales no deseados.

Integración: N/A.

Criterios de Aceptación Técnica:
- Ni los filtros de ordenación/estado ni el botón "Calificar" son visibles en la interfaz de usuario de la aplicación para esta HU. ---END_PROMPT---

---START_COMMIT--- HU40-T24 chore(ui): deshabilitar filtros y botón calificar según HU40 ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 25 TASK_TITLE: Integración `fetchHistorialAction` con backend real HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Una vez que el desarrollo frontend basado en seeds está completo y aprobado, la `fetchHistorialAction` debe integrarse con el backend real para obtener datos dinámicos.
Objetivo: Activar la integración real con el backend descomentando el código de la petición `fetch` pre-escrito en `fetchHistorialAction` y comentando o eliminando el retorno del seed data.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/actions/historial/tutoriaActions.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
- Abrir `src/actions/historial/tutoriaActions.ts`.
- Comentar o eliminar la lógica de retorno del seed data (incluyendo el `setTimeout`).
- Descomentar el bloque completo de código que realiza la petición `fetch` al endpoint `GET /api/tutorias/historial`.
- Verificar que la URL del endpoint (`process.env.NEXT_PUBLIC_API_BASE_URL` o similar) y los `headers` (ej. `Authorization` con un token JWT si es necesario) estén configurados correctamente.

Validaciones: La aplicación debe cargar los datos del historial directamente del backend real.

Diseño: No aplica, solo funcionalidad.

Integración: Conexión con el endpoint `GET /api/tutorias/historial` del backend.

Criterios de Aceptación Técnica:
- La petición `fetch` se ejecuta correctamente hacia el endpoint real del backend (`/api/tutorias/historial`).
- La respuesta del backend tiene la estructura esperada (`ApiResponse<TutoriaHistorialListDTO[]>`).
- Los componentes de la interfaz de historial se actualizan con los datos reales del backend sin errores. ---END_PROMPT---

---START_COMMIT--- HU40-T25 feat(integration): integrar fetchHistorialAction con backend real ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 26 TASK_TITLE: Integración `fetchDetalleAction` con backend real HU_NUMBER: HU40 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: De manera similar a la acción de listado, la `fetchDetalleAction` debe integrarse con el backend real para obtener detalles de tutorías dinámicos.
Objetivo: Activar la integración real con el backend descomentando el código de la petición `fetch` pre-escrito en `fetchDetalleAction` y comentando o eliminando el retorno del seed data.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/actions/historial/tutoriaActions.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
- Abrir `src/actions/historial/tutoriaActions.ts`.
- Comentar o eliminar la lógica de retorno del seed data en `fetchDetalleAction` (incluyendo el `setTimeout`).
- Descomentar el bloque completo de código que realiza la petición `fetch` al endpoint `GET /api/tutorias/:id`.
- Verificar que la URL del endpoint y los `headers` (ej. `Authorization`) estén configurados correctamente.

Validaciones: La aplicación debe cargar los detalles de una tutoría directamente del backend real al abrir el modal.

Diseño: No aplica, solo funcionalidad.

Integración: Conexión con el endpoint `GET /api/tutorias/:id` del backend.

Criterios de Aceptación Técnica:
- La petición `fetch` se ejecuta correctamente hacia el endpoint real del backend (`/api/tutorias/:id`).
- La respuesta del backend tiene la estructura esperada (`ApiResponse<TutoriaDetalleDTO>`).
- El modal de detalle muestra los datos reales del backend sin errores. ---END_PROMPT---

---START_COMMIT--- HU40-T26 feat(integration): integrar fetchDetalleAction con backend real ---END_COMMIT---
---END_TASK---