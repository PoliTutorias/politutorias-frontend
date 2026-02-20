---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed para datos de ofertas de tutorías de ejemplo. HU_NUMBER: HU03 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La aplicación frontend necesita datos de ofertas de tutorías para su desarrollo y pruebas, antes de la integración con el backend.
Objetivo: Crear un archivo de seed que contenga datos de ejemplo estructurados, incluyendo al menos 13 ofertas para simular paginación, y que una de las ofertas cumpla con los detalles específicos de los criterios de aceptación de la HU03.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/interfaces/offers/OfferResponseDto.ts` (para definir las interfaces de los DTOs de respuesta)
- `src/seed/OfferSeedData.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
- El archivo `OfferResponseDto.ts` debe definir las interfaces `OfferResponseDto` y `PaginatedOffersResponse` de forma que coincidan exactamente con la estructura esperada del endpoint `GET /api/offers`.
    ```typescript
    // src/interfaces/offers/OfferResponseDto.ts
    interface TutorResponseDto {
      id: string;
      name: string;
      photo: string; // URL de la foto
    }

    export interface OfferResponseDto {
      id: string;
      title: string;
      price: number; // Precio por hora, ej. 10
      modality: 'Virtual' | 'Presencial' | 'Virtual/Presencial';
      description: string;
      tags: string[]; // Ej. ['Matemática', 'Formación Básica']
      rating: number; // Ej. 4.8
      reviewsCount: number; // Ej. 15
      tutor: TutorResponseDto;
    }

    export interface PaginatedOffersResponse {
      data: OfferResponseDto[];
      meta: {
        totalResults: number;
        currentPage: number;
        itemsPerPage: number;
        totalPages: number;
      };
    }
    ```
- El archivo `OfferSeedData.ts` debe exportar una función `getOffersSeedData()` que retorne un objeto `PaginatedOffersResponse` completo con al menos 13 ofertas de ejemplo.
- La primera oferta del array (`data[0]`) debe tener los siguientes valores exactos:
    - `title`: 'Cálculo Vectorial'
    - `price`: 10 (esto se mostrará como '$10/h')
    - `modality`: 'Virtual/Presencial'
    - `tags`: ['Matemática', 'Formación Básica']
    - `tutor.name`: 'Juan Pérez'
    - `tutor.photo`: Una URL de imagen de ejemplo.
    - `rating`: 4.8
    - `reviewsCount`: 15
- Las ofertas 11-13 deben ser diferenciables visualmente para poder verificar la paginación.
- Los metadatos de `PaginatedOffersResponse` deben ser consistentes: `totalResults: 13`, `currentPage: 1`, `itemsPerPage: 10`, `totalPages: 2`.

Validaciones:
- La estructura del seed debe adherirse estrictamente a `OfferResponseDto` y `PaginatedOffersResponse`.
- La primera oferta debe cumplir con los criterios específicos de la HU.

Diseño: No aplica, es una tarea de datos.

Integración: Este seed será utilizado por el Server Action `getOffersAction`.

Criterios de Aceptación Técnica:
- El seed contiene al menos 13 ofertas de ejemplo.
- La estructura de datos de las ofertas coincide exactamente con `OfferResponseDto` del contrato del API documentado.
- La primera oferta del seed cumple con los detalles específicos de la HU (título, precio, modalidad, etiquetas, tutor, calificación).
- La función de seed retorna un objeto completo `PaginatedOffersResponse`. ---END_PROMPT---

---START_COMMIT--- HU03-T01 feat(seed): crear seed data para ofertas de tutorías ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Implementación del Server Action `getOffersAction` con seed data. HU_NUMBER: HU03 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El frontend necesita una forma de obtener las ofertas de tutorías. Para permitir el desarrollo independiente, el Server Action debe simular la respuesta del backend utilizando el seed data.
Objetivo: Crear el Server Action `getOffersAction` que inicialmente retorne datos del seed, con la lógica de integración real con el backend comentada para una futura activación.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/offers/getOffersAction.ts`
- `src/seed/OfferSeedData.ts` (ya creado, se importará)
- `src/interfaces/offers/OfferResponseDto.ts` (ya creado, se importará para tipado)

Tecnologías: Next.js 16, TypeScript.

Estructura:
- Crear el archivo `src/actions/offers/getOffersAction.ts`.
- El archivo debe iniciar con `'use server';`.
- Definir una interfaz para los parámetros de la acción, por ejemplo `GetOffersParams { page?: number; limit?: number; }`.
- Implementar la función `export async function getOffersAction(params: GetOffersParams = {})`.
- Dentro de la función:
    1.  Importar `getOffersSeedData()` y `PaginatedOffersResponse` de sus respectivos archivos.
    2.  Simular un retardo con `await new Promise(resolve => setTimeout(resolve, 500))`.
    3.  Extraer `page` y `limit` de `params`, con valores por defecto (ej. `page = 1`, `limit = 10`).
    4.  Filtrar el `seedData.data` para simular la paginación:
        - Calcular `startIndex` y `endIndex`.
        - Obtener un sub-array de ofertas.
        - Retornar un objeto `PaginatedOffersResponse` con los datos paginados y metadatos actualizados (`currentPage`, `itemsPerPage`, `totalPages`). `totalPages` debe calcularse en base a `totalResults` y `itemsPerPage`.
    5.  **Comentar completamente** un bloque `try-catch` que contenga la lógica para realizar una petición `fetch` al endpoint del backend (`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/offers`). Este bloque debe incluir:
        - Construcción de `queryParams` a partir de `params`.
        - `method: 'GET'`.
        - `headers: { 'Content-Type': 'application/json' }`.
        - Manejo de `response.ok` y parsing de la respuesta JSON.
        - Retorno de la respuesta `PaginatedOffersResponse`.
    - Añadir JSDoc o comentarios de TypeScript para describir la interfaz `PaginatedOffersResponse` que retorna el Server Action.

Validaciones:
- La acción debe retornar la estructura `PaginatedOffersResponse` definida.
- La paginación debe funcionar correctamente para `page=1` (10 ofertas) y `page=2` (3 ofertas).

Diseño: No aplica, es una tarea de lógica de datos.

Integración:
- Se integra con `src/seed/OfferSeedData.ts`.
- La lógica de integración con el backend (`fetch`) está pre-escrita pero comentada, esperando la Tarea 8.

Criterios de Aceptación Técnica:
- El Server Action `getOffersAction` retorna correctamente el seed data paginado según los parámetros `page` y `limit`.
- El código de integración con el backend (la petición `fetch`) está presente y completamente comentado.
- La estructura de la respuesta del Server Action coincide con la `PaginatedOffersResponse` documentada.
- El Server Action maneja la simulación de retardo. ---END_PROMPT---

---START_COMMIT--- HU03-T02 feat(actions): implementar getOffersAction con seed data y lógica fetch comentada ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Creación y maquetación de la página `PoliTutoriasPage`. HU_NUMBER: HU03 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Inicio Estudiante - Página 1 ---END_FRAME---

---START_ESTIMATION--- 2.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La página principal para ver las ofertas de tutorías necesita ser creada como un Server Component para la carga inicial de datos y la orquestación de los componentes de UI.
Objetivo: Implementar la página `src/app/encuentra-tutoria/page.tsx` que realice la llamada inicial al `getOffersAction`, obtenga los `searchParams` de paginación y renderice la estructura principal de la interfaz de usuario, excluyendo filtros y barra de búsqueda.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/encuentra-tutoria/page.tsx`
- `src/actions/offers/getOffersAction.ts` (se importará)
- `src/interfaces/offers/OfferResponseDto.ts` (se importará para tipado)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Crear el archivo `src/app/encuentra-tutoria/page.tsx`.
- Este componente debe ser un **Server Component** (`async function Page(...)`).
- Utilizar el prop `searchParams: { [key: string]: string | string[] | undefined }` para obtener los parámetros de paginación (`page`, `limit`). Convertir `page` y `limit` a números, usando valores por defecto (ej. `page = 1`, `limit = 10`).
- Realizar la llamada a `getOffersAction` con los parámetros de paginación.
- Implementar un bloque `try-catch` para manejar errores al obtener los datos. En caso de error, renderizar un mensaje amigable.
- Maquetar la estructura principal de la página, respetando el diseño del frame de Figma, pero **omitiendo deliberadamente la sección de "Filtros" a la izquierda, el ComboBox "Más recientes" y la barra de búsqueda superior**, según las observaciones de la HU.
- La estructura general debe incluir:
    - Un contenedor principal.
    - Un área para la cabecera de resultados (`SearchResultsHeader`).
    - Un área para la lista de ofertas (`OfferList`).
    - Un área para los controles de paginación (`PaginationControls`).
- Renderizar condicionalmente un mensaje si `data` está vacío (no hay ofertas).
- Pasar los datos obtenidos (`data`, `totalResults`, `currentPage`, `totalPages`, `itemsPerPage`) como props a los componentes hijos `SearchResultsHeader`, `OfferList` y `PaginationControls`. Estos componentes serán implementados en tareas posteriores.

Validaciones:
- La página debe cargar y mostrar la información de las ofertas obtenida del `getOffersAction`.
- Los parámetros de paginación de la URL deben ser leídos y pasados correctamente al Server Action.

Diseño:
- El layout básico de la página debe coincidir con el frame `E. Inicio Estudiante - Página 1`, pero excluyendo las secciones especificadas en las observaciones.
- Utilizar Tailwind CSS 4 para aplicar los estilos de maquetación general.

Integración:
- Se integra con `src/actions/offers/getOffersAction.ts`.
- Será el padre de `SearchResultsHeader`, `OfferList` y `PaginationControls`.

Criterios de Aceptación Técnica:
- La página `PoliTutoriasPage` es un Server Component.
- Realiza la llamada a `getOffersAction` al cargar.
- Renderiza el layout principal de la página (sin filtros ni barra de búsqueda).
- Pasa los datos de las ofertas, el total de resultados y la información de paginación a los componentes hijos.
- Maneja los `searchParams` de la URL para la paginación. ---END_PROMPT---

---START_COMMIT--- HU03-T03 feat(pages): crear y maquetar PoliTutoriasPage ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Implementación del componente `SearchResultsHeader`. HU_NUMBER: HU03 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Inicio Estudiante - Página 1 ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La página de búsqueda de tutorías necesita una cabecera que muestre el número total de resultados encontrados.
Objetivo: Implementar el componente `SearchResultsHeader` que reciba el número total de resultados y lo muestre formateado como "X resultados".

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/offers/SearchResultsHeader/SearchResultsHeader.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Crear el archivo `src/components/offers/SearchResultsHeader/SearchResultsHeader.tsx`.
- Este componente debe ser un **Client Component** (`'use client';`).
- Definir la interfaz de props: `interface SearchResultsHeaderProps { totalResults: number; }`.
- El componente debe renderizar un elemento de texto (ej. `<h2>` o `<div>`) que muestre `totalResults` en el formato "X resultados".
- Asegurarse de que para 13 resultados, el texto sea "13 resultados".

Validaciones:
- El componente debe mostrar el `totalResults` proporcionado.

Diseño:
- Aplicar estilos con Tailwind CSS 4 para que el texto coincida con la tipografía y el color del diseño en la sección de cabecera de la lista de ofertas del frame `E. Inicio Estudiante - Página 1`.

Integración:
- Será consumido por `src/app/encuentra-tutoria/page.tsx`.

Criterios de Aceptación Técnica:
- El componente `SearchResultsHeader` es un Client Component.
- Recibe `totalResults` como prop.
- Muestra correctamente el número total de resultados en el formato "X resultados".
- El estilo visual coincide con el diseño. ---END_PROMPT---

---START_COMMIT--- HU03-T04 feat(components): crear SearchResultsHeader ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Implementación del componente `OfferCard`. HU_NUMBER: HU03 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Inicio Estudiante - Página 1 ---END_FRAME---

---START_ESTIMATION--- 3H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Cada oferta de tutoría debe ser mostrada en una tarjeta individual con sus detalles.
Objetivo: Implementar el componente `OfferCard` que reciba un objeto de oferta (`OfferResponseDto`) y renderice todos sus detalles de forma visualmente atractiva, siguiendo el diseño del frame de Figma.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/offers/OfferCard/OfferCard.tsx`
- `src/interfaces/offers/OfferResponseDto.ts` (se importará para tipado)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, react-icons, clsx.

Estructura:
- Crear el archivo `src/components/offers/OfferCard/OfferCard.tsx`.
- Este componente debe ser un **Client Component** (`'use client';`).
- Definir la interfaz de props: `interface OfferCardProps { offer: OfferResponseDto; }`, donde `OfferResponseDto` es la interfaz definida en la Tarea 1.
- Maquetar la tarjeta de oferta para mostrar los siguientes campos del objeto `offer`:
    - `title`: Título de la tutoría.
    - `price`: Precio por hora, formateado como "$X/h".
    - `modality`: 'Virtual', 'Presencial' o 'Virtual/Presencial'. Incluir un icono representativo (ej. `IoVideocamOutline` para virtual, `IoLocationOutline` para presencial, o ambos para virtual/presencial de `react-icons`).
    - `tags`: Mostrar cada etiqueta como un "badge" o "píldora".
    - `tutor.name`: Nombre del tutor.
    - `tutor.photo`: Imagen de perfil del tutor.
    - `rating`: Puntuación de calificación. Mostrar con iconos de estrellas (ej. `IoStar`, `IoStarHalf`) y `reviewsCount` (número de reseñas) entre paréntesis, siguiendo el formato '4.8 (15)'.

Validaciones:
- El componente debe renderizar todos los datos de `OfferResponseDto` correctamente.
- La primera tarjeta de oferta debe coincidir exactamente con los detalles del criterio de aceptación de la HU.

Diseño:
- Aplicar estilos con Tailwind CSS 4 para que el diseño de la tarjeta coincida con el frame `E. Inicio Estudiante - Página 1`.
- Prestar especial atención a la tipografía, colores, espaciado y disposición de los elementos.
- Los iconos de modalidad y estrellas deben ser visualmente consistentes con el diseño.
- Asegurar que la imagen del tutor tenga un formato circular.

Integración:
- Será consumido por `src/components/offers/OfferList/OfferList.tsx`.

Criterios de Aceptación Técnica:
- El componente `OfferCard` es un Client Component.
- Recibe un objeto `Offer` completo como prop.
- Muestra correctamente todos los detalles de la oferta según el frame de Figma y los criterios de aceptación: título, precio, modalidad (con icono), etiquetas, tutor (nombre y foto), y calificación.
- El estilo visual coincide con el diseño. ---END_PROMPT---

---START_COMMIT--- HU03-T05 feat(components): crear OfferCard con detalles y estilos ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Implementación del componente `OfferList`. HU_NUMBER: HU03 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Inicio Estudiante - Página 1 ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La página `PoliTutoriasPage` necesita un componente que muestre una colección de tarjetas de ofertas.
Objetivo: Implementar el componente `OfferList` que actúe como un contenedor para las `OfferCard`s, mostrando un mensaje si no hay ofertas.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/offers/OfferList/OfferList.tsx`
- `src/components/offers/OfferCard/OfferCard.tsx` (se importará)
- `src/interfaces/offers/OfferResponseDto.ts` (se importará para tipado)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Crear el archivo `src/components/offers/OfferList/OfferList.tsx`.
- Este componente debe ser un **Client Component** (`'use client';`).
- Definir la interfaz de props: `interface OfferListProps { offers: OfferResponseDto[]; }`.
- Utilizar `Array.map()` para iterar sobre el array `offers` y renderizar un `OfferCard` para cada elemento.
- Asegurar que cada `OfferCard` tenga una `key` única (ej. `offer.id`).
- Implementar una lógica condicional para mostrar un mensaje amigable (ej. "No se encontraron ofertas") si el array `offers` está vacío.

Validaciones:
- El componente debe renderizar 10 `OfferCard`s para la página 1 y 3 `OfferCard`s para la página 2, según el seed data.
- El mensaje de "no ofertas" debe mostrarse cuando corresponda.

Diseño:
- Aplicar estilos con Tailwind CSS 4 para organizar las `OfferCard`s en una cuadrícula o lista que coincida con el frame `E. Inicio Estudiante - Página 1`.
- La disposición debe ser responsiva y mostrar 10 tarjetas por página según el diseño para el escenario de la primera página.

Integración:
- Será consumido por `src/app/encuentra-tutoria/page.tsx`.
- Consume `src/components/offers/OfferCard/OfferCard.tsx`.

Criterios de Aceptación Técnica:
- El componente `OfferList` es un Client Component.
- Recibe un array de `Offer`s como prop.
- Renderiza correctamente un `OfferCard` para cada oferta en el array.
- Muestra un mensaje cuando no hay ofertas disponibles.
- La disposición de las tarjetas coincide con el diseño. ---END_PROMPT---

---START_COMMIT--- HU03-T06 feat(components): crear OfferList para agrupar OfferCards ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Implementación del componente `PaginationControls`. HU_NUMBER: HU03 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Inicio Estudiante - Página 1 ---END_FRAME---

---START_ESTIMATION--- 3.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La paginación es crucial para navegar entre las diferentes páginas de ofertas. Este componente debe ser interactivo y actualizar la URL.
Objetivo: Implementar el componente `PaginationControls` que muestre los botones de paginación y navegue a la página seleccionada actualizando los parámetros de la URL.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/offers/PaginationControls/PaginationControls.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, `next/navigation` (useRouter, useSearchParams), clsx.

Estructura:
- Crear el archivo `src/components/offers/PaginationControls/PaginationControls.tsx`.
- Este componente debe ser un **Client Component** (`'use client';`).
- Definir la interfaz de props: `interface PaginationControlsProps { currentPage: number; totalPages: number; }`.
- Importar `useRouter` y `useSearchParams` de `next/navigation`.
- Obtener la instancia del router y los `searchParams` actuales.
- Renderizar los botones de paginación:
    - Botones para navegar a páginas específicas (ej. '1', '2').
    - Botones de navegación 'anterior' (`<`) y 'siguiente' (`>`).
- La visibilidad y el estado activo/inactivo de los botones deben basarse en `currentPage` y `totalPages`.
    - Para `currentPage = 1`, el botón '1' debe estar activo y '2' inactivo.
    - Los botones '<' y '>' siempre visibles si hay más de una página.
- Implementar un manejador de eventos `onClick` para cada botón de paginación:
    - Cuando se hace clic, construir un nuevo objeto `URLSearchParams`.
    - Establecer el nuevo parámetro `page` (y opcionalmente `limit`) en los `searchParams` existentes.
    - Usar `router.push(newUrl)` para navegar a la nueva URL. Esto causará que `PoliTutoriasPage` (Server Component) se re-renderice con los nuevos datos.

Validaciones:
- La paginación debe reflejar el `currentPage` actual.
- Al hacer clic en un número de página, la URL debe actualizarse y la lista de ofertas debe cambiar (verificando página 1 y página 2).

Diseño:
- Aplicar estilos con Tailwind CSS 4 para que los controles de paginación coincidan con el diseño del frame `E. Inicio Estudiante - Página 1`.
- Distinguir visualmente el botón de la página activa.

Integración:
- Será consumido por `src/app/encuentra-tutoria/page.tsx`.
- Depende de que `getOffersAction` y `PoliTutoriasPage` funcionen con los `searchParams`.

Criterios de Aceptación Técnica:
- El componente `PaginationControls` es un Client Component.
- Recibe `currentPage` y `totalPages` como props.
- Muestra correctamente los botones de paginación y navegación (`< 1 2 >`).
- El botón de la página actual está activo, y los otros inactivos.
- Al hacer clic en un botón de página, actualiza el parámetro `page` en la URL utilizando `useRouter().push()`.
- El estilo visual coincide con el diseño. ---END_PROMPT---

---START_COMMIT--- HU03-T07 feat(components): crear PaginationControls interactivos ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 8 TASK_TITLE: Integración del Server Action `getOffersAction` con el backend real. HU_NUMBER: HU03 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Una vez que el frontend está desarrollado y probado con datos simulados, la siguiente etapa es integrarlo con el backend real.
Objetivo: Modificar el Server Action `getOffersAction` para que realice la llamada `fetch` al endpoint del backend y desactive el uso del seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/offers/getOffersAction.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
- Abrir el archivo `src/actions/offers/getOffersAction.ts`.
- Descomentar el bloque `try-catch` que contiene la llamada `fetch` al endpoint del backend (`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/offers`).
- Asegurarse de que la construcción de `URLSearchParams` para los `queryParams` (`page`, `limit`) esté correcta.
- Comentar o eliminar la lógica que retorna el seed data (`getOffersSeedData()`, la simulación de retardo y el filtrado del array de ofertas).
- Asegurarse de que `process.env.NEXT_PUBLIC_API_BASE_URL` esté definido y apunte a la URL base del backend NestJS.

Validaciones:
- La aplicación debe cargar ofertas directamente desde el backend.
- La paginación debe funcionar correctamente utilizando la respuesta real del backend.
- El formato de la respuesta del backend debe ser consistente con `PaginatedOffersResponse`.

Diseño: No aplica, es una tarea de integración de datos.

Integración:
- Se conecta directamente con el endpoint `GET /api/offers` del backend.

Criterios de Aceptación Técnica:
- El Server Action `getOffersAction` realiza la petición `fetch` al endpoint real del backend.
- La aplicación carga y visualiza ofertas obtenidas del backend.
- La paginación funciona correctamente con datos del backend.
- La estructura de la respuesta del backend coincide con `PaginatedOffersResponse` y `OfferResponseDto`.
- No hay errores de CORS o de conexión con el backend.
- Se manejan los casos de éxito y error de la petición al backend. ---END_PROMPT---

---START_COMMIT--- HU03-T08 feat(actions): integrar getOffersAction con backend real ---END_COMMIT---