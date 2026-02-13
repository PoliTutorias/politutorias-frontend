---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed para OfertaDto[] de ejemplo. HU_NUMBER: HU02 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---
 
---START_PROMPT--- Contexto: Se necesita un conjunto de datos de ejemplo para simular ofertas de tutoría, permitiendo el desarrollo y pruebas del frontend de forma independiente del backend.
Objetivo: Crear un archivo de seed con una interfaz `OfertaDto` y datos de muestra que representen tanto un estado con ofertas como un estado sin ellas.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/lib/seeds/ofertas.ts`

Tecnologías: Next.js 16, TypeScript, React.

Estructura: Definir la interfaz `OfertaDto` y un array de objetos `OfertaDto` con al menos 3-5 entradas, incluyendo el ejemplo "Cálculo en una Variable" de los criterios de aceptación. Exportar una función `getOfertaSeeds()` que retorne este array. Incluir una variación para simular un estado vacío (ej. otra función o una flag).

Validaciones:
- La estructura de `OfertaDto` debe ser consistente con la expectativa del backend.
- Los datos deben ser coherentes con los criterios de aceptación (título, descripción, `isPresencial`, `pricePerHour`, `tags`).

Diseño: No aplica directamente, pero los datos deben soportar el diseño visual futuro.

Integración: Este seed será importado por el Server Action `getTutorOffersAction`.

Criterios de Aceptación Técnica:
- El archivo `src/lib/seeds/ofertas.ts` existe y exporta una función `getOfertaSeeds()`.
- La función `getOfertaSeeds()` retorna un `OfertaDto[]` con al menos 3 ofertas de ejemplo.
- La estructura de cada `OfertaDto` en el seed coincide exactamente con la `OfertaDto` documentada.
- El seed incluye los datos del ejemplo "Cálculo en una Variable".
---END_PROMPT---

---START_COMMIT--- HU02-T01 feat(seed): crear seed data para ofertas de tutoría ---END_COMMIT---

---END_TASK---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Implementación del Server Action `getTutorOffersAction` con seed. HU_NUMBER: HU02 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se necesita una acción de servidor para recuperar las ofertas de tutoría. Inicialmente, esta acción usará datos de seed para facilitar el desarrollo del frontend. El código para la integración real con el backend debe estar escrito y comentado.
Objetivo: Crear un Server Action que simule la obtención de ofertas usando el seed y prepare el código para la futura integración con el backend.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/actions/ofertas.ts`
- `src/lib/seeds/ofertas.ts` (solo lectura)

Tecnologías: Next.js 16 (Server Actions), TypeScript.

Estructura: Crear el archivo `src/app/actions/ofertas.ts` y marcarlo con `'use server'`. Implementar la función `export async function getTutorOffersAction(): Promise<ApiResponse<OfertaDto[]>>`. Inicialmente, esta función retornará los datos del `getOfertaSeeds()`. Opcionalmente, se puede añadir un `setTimeout` para simular latencia de red.

Validaciones: La estructura de la respuesta debe ser `ApiResponse<OfertaDto[]>`.

Diseño: No aplica.

Integración:
- Importar `getOfertaSeeds` de `src/lib/seeds/ofertas.ts`.
- Escribir y comentar completamente el bloque de código `fetch` para `GET /api/tutor/:tutorId/ofertas`, incluyendo `try-catch`, manejo de errores y `headers` (Content-Type, Authorization si aplica).

Criterios de Aceptación Técnica:
- El archivo `src/app/actions/ofertas.ts` existe y está marcado como `use server`.
- La función `getTutorOffersAction` retorna un objeto `ApiResponse<OfertaDto[]>` con los datos del seed.
- El código de la petición `fetch` al backend real está presente pero completamente comentado.
- La estructura de la respuesta (tanto del seed como la esperada del `fetch` comentado) coincide con `ApiResponse<OfertaDto[]>`.
---END_PROMPT---

---START_COMMIT--- HU02-T02 feat(action): implementar getTutorOffersAction con seed ---END_COMMIT---

---END_TASK---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Estructura y maquetación de `DashboardPage` y renderizado condicional. HU_NUMBER: HU02 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Inicio Tutor (Oferta Creada) ---END_FRAME---

---START_ESTIMATION--- 2H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La página principal del dashboard del tutor necesita mostrar las ofertas de tutoría o un mensaje de estado vacío, según la disponibilidad de ofertas. Siempre debe mostrar un título y un botón de creación de oferta.
Objetivo: Crear la página `DashboardPage` que utilice el Server Action `getTutorOffersAction` para decidir qué componente renderizar (`MisOfertasSection` o `EmptyOffersState`).

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/tutor/dashboard/page.tsx`
- `src/app/actions/ofertas.ts` (solo lectura)
- `src/components/ofertas/MisOfertasSection.tsx` (se referenciará, no se crea en esta tarea)
- `src/components/ofertas/EmptyOffersState.tsx` (se referenciará, no se crea en esta tarea)

Tecnologías: Next.js 16 (Server Component), React, TypeScript, Tailwind CSS 4.

Estructura:
- Crear el Server Component asíncrono `DashboardPage` en `src/app/tutor/dashboard/page.tsx`.
- Dentro de `DashboardPage`, llamar a `await getTutorOffersAction()`.
- Implementar un renderizado condicional: si la respuesta del action es un arreglo vacío, renderizar `EmptyOffersState`; de lo contrario, renderizar `MisOfertasSection` pasándole las ofertas como prop.
- La página debe incluir estáticamente el título "Mis Ofertas de Tutorías" y un placeholder para el botón "+ Nueva Oferta".

Validaciones:
- La carga de datos debe ser asíncrona.
- El renderizado condicional debe basarse en el contenido del array de ofertas.

Diseño:
- Utilizar Tailwind CSS 4 para una maquetación básica responsiva de la página.
- El título y el botón deben ser visibles según el frame `T. Inicio Tutor (Oferta Creada)`.

Integración:
- Consumir el `getTutorOffersAction`.

Criterios de Aceptación Técnica:
- `DashboardPage` se renderiza y muestra el título "Mis Ofertas de Tutorías".
- `DashboardPage` llama a `getTutorOffersAction` correctamente.
- Si `getTutorOffersAction` retorna un arreglo vacío, `EmptyOffersState` es renderizado.
- Si `getTutorOffersAction` retorna ofertas, `MisOfertasSection` es renderizado y recibe las ofertas como prop.
- La maquetación básica de la página es funcional.
---END_PROMPT---

---START_COMMIT--- HU02-T03 feat(page): estructurar DashboardPage y renderizado condicional ---END_COMMIT---

---END_TASK---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Creación y maquetación del componente `OfertaCard`. HU_NUMBER: HU02 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Inicio Tutor (Oferta Creada) ---END_FRAME---

---START_ESTIMATION--- 2.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Es necesario un componente reutilizable para mostrar los detalles de una oferta de tutoría individual en el dashboard, siguiendo el diseño del prototipo.
Objetivo: Desarrollar el Client Component `OfertaCard` que reciba un objeto `OfertaDto` y muestre su información de manera estructurada y visualmente atractiva.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/ofertas/OfertaCard.tsx`
- `src/interfaces/ofertas/OfertaDto.ts` (si no existe, definir aquí o en un archivo común)

Tecnologías: Next.js 16 (Client Component), React, TypeScript, Tailwind CSS 4, react-icons (para el ícono de "Presencial").

Estructura:
- Crear el Client Component `OfertaCard` en `src/components/ofertas/OfertaCard.tsx` y marcarlo con `'use client'`.
- Definir una interfaz de props que extienda `OfertaDto` o reciba una prop `offer: OfertaDto`.
- Renderizar:
    - `title`
    - Ícono de "Presencial" condicionalmente (`isPresencial === true`).
    - `description`.
    - `tags` como elementos visuales (ej. pills o badges).
    - `pricePerHour` formateado (ej. `$10/h`).

Validaciones: Mostrar el ícono de "Presencial" solo cuando el valor booleano sea `true`.

Diseño:
- Usar Tailwind CSS 4 para replicar el diseño de la tarjeta del prototipo `T. Inicio Tutor (Oferta Creada)` (bordes redondeados, sombras, espaciado, tipografía, colores).
- Asegurar que el componente sea responsivo.
- Omitir el ícono de basurero.

Integración: El componente recibirá un objeto `OfertaDto` como prop.

Criterios de Aceptación Técnica:
- `OfertaCard` acepta un `OfertaDto` como prop.
- Muestra correctamente el título, descripción, precio y etiquetas de la oferta.
- El ícono de "Presencial" se muestra solo cuando `isPresencial` es `true`.
- El diseño visual de la tarjeta coincide con el frame del prototipo (excluyendo el ícono de basurero según las observaciones).
- Los datos son formateados correctamente (ej. precio con "$/h").
---END_PROMPT---

---START_COMMIT--- HU02-T04 feat(component): crear y maquetar OfertaCard ---END_COMMIT---

---END_TASK---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Creación y maquetación del componente `MisOfertasSection`. HU_NUMBER: HU02 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Inicio Tutor (Oferta Creada) ---END_FRAME---

---START_ESTIMATION--- 2H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La `DashboardPage` necesita una sección que liste todas las ofertas de tutoría utilizando el componente `OfertaCard` y también incluya el botón para crear una nueva oferta.
Objetivo: Desarrollar el componente `MisOfertasSection` que actúe como un contenedor para las `OfertaCard` y el botón de creación de oferta.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/ofertas/MisOfertasSection.tsx`
- `src/components/ofertas/OfertaCard.tsx` (uso)

Tecnologías: Next.js 16 (puede ser Server Component si solo renderiza, o Client Component si hay interactividad en esta sección), React, TypeScript, Tailwind CSS 4. Se optará por Server Component para optimización si la interacción se delega a Client Components anidados.

Estructura:
- Crear el componente `MisOfertasSection` en `src/components/ofertas/MisOfertasSection.tsx`.
- Definir `props` para recibir un array `offers: OfertaDto[]`.
- Iterar sobre el array `offers` y, por cada `OfertaDto`, renderizar una `OfertaCard` pasándole los datos.
- Incluir un placeholder para el botón "+ Nueva Oferta".

Validaciones: Asegurar que la iteración sobre las ofertas maneje correctamente las claves (`key`) para la lista de componentes.

Diseño:
- Usar Tailwind CSS 4 para organizar las `OfertaCard` en un layout de rejilla (grid) o flexbox.
- La disposición de las tarjetas y el botón debe coincidir con el frame `T. Inicio Tutor (Oferta Creada)`.

Integración: El componente recibirá un array de `OfertaDto` y renderizará `OfertaCard`. Será usado por `DashboardPage`.

Criterios de Aceptación Técnica:
- `MisOfertasSection` recibe un array de `OfertaDto`.
- Itera sobre el array y renderiza una `OfertaCard` por cada oferta.
- El botón "+ Nueva Oferta" es visible en la sección.
- La disposición de las tarjetas y el botón coincide con el diseño del prototipo.
---END_PROMPT---

---START_COMMIT--- HU02-T05 feat(section): crear MisOfertasSection para listar ofertas ---END_COMMIT---

---END_TASK---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Creación y maquetación del componente `EmptyOffersState`. HU_NUMBER: HU02 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Inicio Tutor (Sin Ofertas) ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Cuando el tutor no ha publicado ninguna oferta, el dashboard debe mostrar un mensaje claro que lo invite a crear su primera oferta.
Objetivo: Desarrollar el Client Component `EmptyOffersState` que muestre el mensaje y un botón para crear la primera oferta.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/ofertas/EmptyOffersState.tsx`

Tecnologías: Next.js 16 (Client Component), React, TypeScript, Tailwind CSS 4.

Estructura:
- Crear el Client Component `EmptyOffersState` en `src/components/ofertas/EmptyOffersState.tsx` y marcarlo con `'use client'`.
- El componente debe contener:
    - El título "No tienes ofertas activas".
    - El subtexto "Publica tu primera oferta para que los estudiantes te encuentren".
    - Un placeholder para el botón "+ Crear mi primera oferta".

Validaciones: No aplica lógica compleja.

Diseño:
- Usar Tailwind CSS 4 para centrar el contenido vertical y horizontalmente.
- El diseño visual del contenedor con el mensaje y el botón debe ser limpio y seguir un estilo consistente con el resto de la aplicación (referencia implícita de `T. Inicio Tutor (Sin Ofertas)`).

Integración: Será utilizado por `DashboardPage` cuando no haya ofertas.

Criterios de Aceptación Técnica:
- `EmptyOffersState` se renderiza correctamente con el mensaje y subtexto.
- El botón "+ Crear mi primera oferta" es visible.
- El diseño visual coincide con el frame de estado vacío (implícito en el HU).
- El componente es funcionalmente independiente.
---END_PROMPT---

---START_COMMIT--- HU02-T06 feat(component): crear EmptyOffersState para sin ofertas ---END_COMMIT---

---END_TASK---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Implementación de botones `NuevaOfertaButton` y `CrearPrimeraOfertaButton`. HU_NUMBER: HU02 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Inicio Tutor (Oferta Creada), T. Inicio Tutor (Sin Ofertas) ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Los botones para crear una nueva oferta o la primera oferta deben activar la visualización de un modal de creación de oferta. Esto requiere un mecanismo de estado centralizado para el modal.
Objetivo: Crear componentes de botón reutilizables y un contexto/hook para gestionar la apertura/cierre del modal, integrándolos en sus respectivas secciones.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/ui/buttons/NuevaOfertaButton.tsx`
- `src/components/ui/buttons/CrearPrimeraOfertaButton.tsx`
- `src/contexts/oferta-modal-context.tsx`
- `src/components/ofertas/MisOfertasSection.tsx` (modificación)
- `src/components/ofertas/EmptyOffersState.tsx` (modificación)

Tecnologías: Next.js 16 (Client Components), React (Context API, Hooks), TypeScript, Tailwind CSS 4.

Estructura:
- Crear `src/contexts/oferta-modal-context.tsx` para definir un `OfertaModalContext` y un `useOfertaModal` hook, proporcionando funciones `openModal()` y `closeModal()`.
- Crear el Client Component `NuevaOfertaButton.tsx` en `src/components/ui/buttons/NuevaOfertaButton.tsx`. Este botón usará `useOfertaModal().openModal()` en su `onClick`.
- Crear el Client Component `CrearPrimeraOfertaButton.tsx` en `src/components/ui/buttons/CrearPrimeraOfertaButton.tsx`. Este botón también usará `useOfertaModal().openModal()` en su `onClick`.
- Reemplazar los placeholders de botones en `MisOfertasSection` y `EmptyOffersState` con estos nuevos componentes.

Validaciones: Asegurar que al hacer clic, la función `openModal` sea invocada.

Diseño: Los botones deben mantener el estilo visual definido en los prototipos, utilizando Tailwind CSS 4.

Integración: Los botones usarán el contexto global del modal. `MisOfertasSection` y `EmptyOffersState` integrarán estos botones.

Criterios de Aceptación Técnica:
- Ambos botones son visibles en sus respectivos componentes.
- Al hacer clic en cualquiera de los botones, se activa una función que indica la apertura de un modal.
- Se utiliza un patrón de estado (contexto/hook) para gestionar la apertura/cierre del modal.
---END_PROMPT---

---START_COMMIT--- HU02-T07 feat(ui): implementar botones y contexto para modal de oferta ---END_COMMIT---

---END_TASK---

---START_TASK--- TASK_NUMBER: 8 TASK_TITLE: Creación de la estructura básica del componente `CreateOfertaModal`. HU_NUMBER: HU02 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Inicio Tutor (Crear Oferta Modal) ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se necesita un modal para la creación de nuevas ofertas de tutoría que se superponga a la vista del dashboard. En esta tarea, solo se implementará su estructura básica.
Objetivo: Crear el esqueleto del componente `CreateOfertaModal` con funcionalidad de apertura/cierre y un título, sin la lógica completa del formulario.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/ofertas/CreateOfertaModal.tsx`
- `src/contexts/oferta-modal-context.tsx` (modificación para usar el modal)
- `src/app/tutor/dashboard/page.tsx` (modificación para renderizar el modal)

Tecnologías: Next.js 16 (Client Component), React (useState, Context API), TypeScript, Tailwind CSS 4.

Estructura:
- Crear el Client Component `CreateOfertaModal` en `src/components/ofertas/CreateOfertaModal.tsx` y marcarlo con `'use client'`.
- Las `props` deben incluir `isOpen: boolean` y `onClose: () => void`.
- Utilizar un componente de modal (ej. una implementación custom con `useState` y CSS para superposición) que se muestre condicionalmente según `isOpen`.
- Incluir un título como "Crear Nueva Oferta de Tutoría" y un botón de cierre (ej. 'X' o "Cancelar") que invoque `onClose`.
- Renderizar `CreateOfertaModal` en `DashboardPage` (o un layout superior si es más apropiado), controlando su visibilidad y cierre mediante el `useOfertaModal` hook.

Validaciones:
- El modal debe aparecer cuando `isOpen` es `true`.
- El modal debe desaparecer al hacer clic en el botón de cierre.

Diseño:
- Usar Tailwind CSS 4 para estilizar el modal: superposición, fondo semitransparente, centrado, bordes, sombras.
- El diseño debe replicar la idea de un "modal superpuesto" como se describe en el criterio de aceptación.

Integración: El modal será controlado por el `OfertaModalContext` y renderizado en `DashboardPage`.

Criterios de Aceptación Técnica:
- El modal se muestra/oculta correctamente cuando se activa desde los botones.
- El modal tiene un título visible y un mecanismo para cerrarlo.
- El modal se superpone a la vista existente.
- No hay lógica de formulario de creación de oferta en esta tarea, solo la estructura del modal.
---END_PROMPT---

---START_COMMIT--- HU02-T08 feat(modal): crear estructura básica de CreateOfertaModal ---END_COMMIT---

---END_TASK---

---START_TASK--- TASK_NUMBER: 9 TASK_TITLE: Integración del Server Action `getTutorOffersAction` con el backend real. HU_NUMBER: HU02 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El Server Action `getTutorOffersAction` se implementó inicialmente usando datos de seed. Ahora el backend está disponible y es necesario activar la integración real.
Objetivo: Modificar `getTutorOffersAction` para que realice una petición `fetch` al endpoint del backend y deshabilitar la carga de datos de seed.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/actions/ofertas.ts`

Tecnologías: Next.js 16 (Server Actions), TypeScript.

Estructura:
- Abrir `src/app/actions/ofertas.ts`.
- Descomentar el bloque de código `fetch` que apunta a `/api/tutor/:tutorId/ofertas`.
- Comentar o eliminar la línea de código que retorna los datos del seed (`getOfertaSeeds()`).
- Asegurar que `process.env.NEXT_PUBLIC_API_BASE_URL` esté configurado y que la URL construida sea correcta.
- Confirmar el manejo de `tutorId` (placeholder o real) y `headers` (ej. 'Authorization').

Validaciones:
- La aplicación debe cargar las ofertas directamente del backend (o mostrar el estado vacío si el backend retorna un array vacío).
- No deben existir errores de red o deserialización de datos.

Diseño: No aplica.

Integración: Realizar la conexión final con el endpoint `GET /api/tutor/:tutorId/ofertas`.

Criterios de Aceptación Técnica:
- `getTutorOffersAction` realiza una petición `fetch` real al backend.
- La respuesta del backend (con ofertas o vacío) es recibida y procesada sin errores.
- La aplicación se renderiza correctamente mostrando las ofertas reales o el estado vacío, según la respuesta del backend.
- No hay errores de CORS o autenticación (si el backend lo requiere, asumimos que ya está resuelto para la prueba).
---END_PROMPT---

---START_COMMIT--- HU02-T09 fix(action): integrar getTutorOffersAction con backend real ---END_COMMIT---

---END_TASK---