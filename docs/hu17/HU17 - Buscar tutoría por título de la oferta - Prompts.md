---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed para `PaginatedOffersResponse` de ofertas. HU_NUMBER: HU17 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La HU17 requiere la funcionalidad de búsqueda de tutorías. Para permitir el desarrollo y pruebas del frontend de manera independiente antes de la integración con el backend, es necesario simular los datos que recibiría el frontend.
Objetivo: Crear un archivo de seed con datos de ejemplo que simulen la estructura de `PaginatedOffersResponse` y `OfertaEntity`, incluyendo diferentes escenarios de búsqueda (exitosa, sin coincidencias, y todas las ofertas).

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/lib/seeds/ofertas.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
*   El archivo `ofertas.ts` debe exportar un array de objetos `OfertaEntity` y una función `getOfertasPaginatedSeed(searchTerm?: string)` que devuelva `PaginatedOffersResponse`.
*   Asegurar que la estructura de `OfertaEntity` dentro del seed incluya `id`, `titulo`, `descripcion`, `precioHora`, `modalidad`, `tutor` con `nombre` y `fotoUrl`, `createdAt`, etc.
*   La función `getOfertasPaginatedSeed` debe implementar la lógica condicional para retornar subsets de datos:
    *   Si `searchTerm` es "Cálculo", retornar 2-3 ofertas relevantes con `totalResults` correspondiente.
    *   Si `searchTerm` es "Astronomía", retornar `items` vacío y `totalResults: 0`.
    *   Si `searchTerm` es vacío o `undefined`, retornar todas las ofertas de ejemplo (15-20 registros) con el `totalResults` total.
*   Incluir `page` y `limit` por defecto (ej. 1 y 10).
*   Documentar la estructura y los casos de uso dentro del archivo seed.

Validaciones:
*   Los datos de ejemplo deben ser coherentes con el dominio de "tutorías".
*   Los escenarios de búsqueda deben reflejarse fielmente en los `items` y `totalResults` devueltos.

Diseño: N/A

Integración: Este seed será utilizado por la Server Action `searchOffersAction` en fases iniciales.

Criterios de Aceptación Técnica:
*   El seed contiene suficientes ofertas de ejemplo (al menos 15-20) para simular diferentes escenarios.
*   La función `getOfertasPaginatedSeed` retorna `PaginatedOffersResponse` con los `items` y `totalResults` correctos para cada `searchTerm` simulado.
*   La estructura de cada `OfertaEntity` en el seed coincide con el contrato del endpoint.
*   Se simulan los escenarios de búsqueda exitosa, sin coincidencias y campo vacío.
---END_PROMPT---

---START_COMMIT--- HU17-T01 feat(seed): crear seed para ofertas paginadas y búsqueda ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Definición de tipos para `PaginatedOffersResponse` y `OfertaEntity`. HU_NUMBER: HU17 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Para asegurar la coherencia y el tipado fuerte en el frontend del proyecto Poli-Tutorias, es esencial definir los tipos TypeScript para las entidades de datos clave, como las ofertas y sus respuestas paginadas.
Objetivo: Crear las definiciones de tipos TypeScript (`interface` o `type`) para `PaginatedOffersResponse` y `OfertaEntity` basándose en el contrato del endpoint del backend.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/interfaces/ofertas/Oferta.ts` (Utilizando `src/interfaces/` como la ruta genérica para definiciones de tipos/interfaces en lugar de `src/types/` para consistencia con la estructura de proyecto atómica).

Tecnologías: Next.js 16, TypeScript.

Estructura:
*   Dentro de `src/interfaces/ofertas/Oferta.ts`, definir las siguientes interfaces:
    *   `interface TutorEntity`: Incluir `id: string`, `nombre: string`, `fotoUrl?: string`.
    *   `interface OfertaEntity`: Incluir campos como `id: string`, `titulo: string`, `descripcion: string`, `precioHora: number`, `modalidad: 'Presencial' | 'Virtual' | 'Híbrido'`, `lugarReunion?: string`, `carrera?: string`, `imagenRepresentativaUrl?: string`, `createdAt: string` (o `Date`), y una relación `tutor: TutorEntity`.
    *   `interface PaginatedOffersResponse`: Incluir `items: OfertaEntity[]`, `totalResults: number`, `page: number`, `limit: number`.

Validaciones:
*   Todos los campos relevantes del contrato de API para ofertas deben estar representados y tipados correctamente.

Diseño: N/A

Integración: Estos tipos serán usados por el seed de datos, la Server Action `searchOffersAction` y los componentes de UI que renderizan la información de las ofertas.

Criterios de Aceptación Técnica:
*   Los tipos `OfertaEntity` y `PaginatedOffersResponse` están definidos en `src/interfaces/ofertas/Oferta.ts`.
*   La estructura de los tipos coincide exactamente con la respuesta JSON del endpoint documentado.
*   Todos los campos relevantes están correctamente tipados (strings, numbers, arrays, etc.).
---END_PROMPT---

---START_COMMIT--- HU17-T02 feat(types): definir tipos para ofertas y respuesta paginada ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Implementación del componente `SearchBar` (Client Component). HU_NUMBER: HU17 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Inicio Estudiante - Página 1 ([1ZvU3ULkXws0-Sum-i-_nEHRz91GLRr7x](https://drive.google.com/file/d/1ZvU3ULkXws0-Sum-i-_nEHRz91GLRr7x/view?usp=drivesdk)) ---END_FRAME---

---START_ESTIMATION--- 2.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La interfaz "Encuentra tu Tutoría" necesita una barra de búsqueda interactiva para permitir a los estudiantes filtrar ofertas por título o nombre del tutor, según se describe en la HU17.
Objetivo: Desarrollar el componente `SearchBar` que capture la entrada del usuario, maneje la interacción y actualice los parámetros de consulta de la URL, activando así la lógica de búsqueda.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/ofertas-ui/SearchBar/SearchBar.tsx`
*   `app/ofertas/page.tsx` (para la integración del componente)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, `useState`, `useRouter`, `useSearchParams`, `react-icons` (para el icono de lupa).

Estructura:
*   Crear `src/components/ofertas-ui/SearchBar/SearchBar.tsx` como un Client Component (`'use client'`).
*   El componente debe tener un `input` de tipo texto y un botón o icono clickable (ej. una lupa de `react-icons`).
*   Utilizar `useState` para manejar el valor del input.
*   Implementar un `onChange` para actualizar el estado del input.
*   Implementar una función `handleSearch` que:
    *   Obtenga los parámetros de búsqueda actuales de la URL usando `useSearchParams`.
    *   Actualice el parámetro `searchTerm` con el valor del input (si está vacío, eliminar el parámetro).
    *   Utilice `router.push()` para actualizar la URL, lo que provocará un re-render del Server Component `OfertasPage`.
*   Asignar `handleSearch` a los eventos `onKeyPress` (para la tecla Enter) del input y `onClick` del icono de búsqueda.
*   Inicializar el valor del input con el `searchTerm` presente en la URL (`useSearchParams`) al montar el componente.

Validaciones:
*   La URL se debe actualizar correctamente al presionar Enter o hacer clic en el icono.
*   Si el campo se deja vacío, el parámetro `searchTerm` debe ser eliminado de la URL.

Diseño:
*   El diseño del `SearchBar` debe coincidir con el frame "E. Inicio Estudiante - Página 1".
*   Utilizar Tailwind CSS 4 para estilizar el input y el icono de búsqueda.
*   Considerar un diseño responsive básico.

Integración: Este componente se integrará en `app/ofertas/page.tsx`.

Criterios de Aceptación Técnica:
*   El componente `SearchBar` renderiza el campo de entrada y el icono de búsqueda.
*   El campo de entrada permite al usuario escribir y su estado se actualiza localmente.
*   Al presionar Enter o hacer clic en el icono de búsqueda, la URL se actualiza con el `searchTerm` como un parámetro de consulta (`?searchTerm=...`).
*   El `SearchBar` se inicializa con el `searchTerm` presente en la URL al cargar la página.
*   El diseño del componente coincide con el frame de Figma.
---END_PROMPT---

---START_COMMIT--- HU17-T03 feat(frontend): implementar componente SearchBar con actualización de URL ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Implementación del componente `ResultsCounter` (Client Component). HU_NUMBER: HU17 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Inicio Estudiante - Página 1 ([1ZvU3ULkXws0-Sum-i-_nEHRz91GLRr7x](https://drive.google.com/file/d/1ZvU3ULkXws0-Sum-i-_nEHRz91GLRr7x/view?usp=drivesdk)) ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: En la interfaz de "Encuentra tu Tutoría", es necesario mostrar al estudiante el número de ofertas encontradas después de una búsqueda o al cargar la página.
Objetivo: Crear un componente de UI (`ResultsCounter`) que muestre de forma clara el número total de resultados obtenidos.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/ofertas-ui/ResultsCounter/ResultsCounter.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
*   Crear `src/components/ofertas-ui/ResultsCounter/ResultsCounter.tsx` como un Client Component (`'use client'`).
*   El componente debe aceptar una prop `totalResults` de tipo `number`.
*   Renderizar el texto en el formato "X resultados" (ej. "13 resultados", "0 resultados").
*   Considerar la pluralización/singularización si el requisito es estricto, de lo contrario, mantener "X resultados" como un formato simple y consistente.

Validaciones:
*   El número mostrado debe ser exactamente el valor de `totalResults`.

Diseño:
*   Aplicar estilos básicos con Tailwind CSS 4 para que el texto sea visible y coincida con el diseño esperado del contador superior derecho en el frame (ej. tamaño de fuente, color).

Integración: Este componente será integrado en `app/ofertas/page.tsx` para mostrar los resultados de `searchOffersAction`.

Criterios de Aceptación Técnica:
*   El componente `ResultsCounter` muestra correctamente el número de resultados.
*   El texto "resultados" se pluraliza o singulariza correctamente si aplica (o se mantiene simple si no hay un requerimiento explícito).
*   El diseño coincide con la expectativa del frame.
---END_PROMPT---

---START_COMMIT--- HU17-T04 feat(frontend): implementar componente ResultsCounter ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Implementación del componente `NoResultsMessage` (Client Component). HU_NUMBER: HU17 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Inicio Estudiante - Página 1 (condición de "sin coincidencias" - [1ZvU3ULkXws0-Sum-i-_nEHRz91GLRr7x](https://drive.google.com/file/d/1ZvU3ULkXws0-Sum-i-_nEHRz91GLRr7x/view?usp=drivesdk)) ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Cuando una búsqueda no arroja resultados, el sistema debe proporcionar una retroalimentación clara y amigable al usuario.
Objetivo: Crear un componente de UI (`NoResultsMessage`) que se muestre en el área central de la página cuando no se encuentren ofertas, siguiendo las especificaciones de diseño.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/ofertas-ui/NoResultsMessage/NoResultsMessage.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, `react-icons` (para el icono de lupa).

Estructura:
*   Crear `src/components/ofertas-ui/NoResultsMessage/NoResultsMessage.tsx` como un Client Component (`'use client'`).
*   El componente debe incluir:
    *   Un icono de lupa (ej. de `react-icons`).
    *   Un mensaje principal en negrita: "**No se encontraron ofertas**".
    *   Un subtexto explicativo: "**Intenta ajustar tus filtros de búsqueda**".
*   El contenido debe estar centrado vertical y horizontalmente en el área principal donde normalmente se mostrarían las tarjetas de oferta.

Validaciones:
*   El componente debe renderizarse exactamente con los textos y el icono especificados.

Diseño:
*   Aplicar estilos con Tailwind CSS 4 para lograr el posicionamiento centrado y la apariencia visual (tamaño de fuente, color, negrita) descrita en el criterio de aceptación "Búsqueda sin Coincidencias" del frame.
*   El icono de lupa debe ser visible y tener un tamaño adecuado.

Integración: Este componente será renderizado condicionalmente en `app/ofertas/page.tsx` cuando `totalResults === 0`.

Criterios de Aceptación Técnica:
*   El componente `NoResultsMessage` se renderiza con el icono de lupa visible.
*   El mensaje principal "**No se encontraron ofertas**" aparece en negrita.
*   El subtexto "**Intenta ajustar tus filtros de búsqueda**" se muestra correctamente.
*   El diseño y la disposición del mensaje coinciden con las especificaciones.
---END_PROMPT---

---START_COMMIT--- HU17-T05 feat(frontend): implementar componente NoResultsMessage ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Implementación de `searchOffersAction` (Server Action con seed data). HU_NUMBER: HU17 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Para la HU17, la lógica de búsqueda de ofertas debe residir en el servidor para aprovechar las capacidades de Next.js Server Components y Server Actions, mientras se permite el desarrollo frontend en paralelo.
Objetivo: Implementar la Server Action `searchOffersAction` que, en esta fase, retornará datos del seed para simular la respuesta del backend. Además, el código para la integración real con `fetch` debe estar presente pero COMENTADO.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `app/actions/ofertas.ts`

Tecnologías: Next.js 16 (Server Actions), TypeScript.

Estructura:
*   Crear el archivo `app/actions/ofertas.ts` y marcarlo con `'use server'`.
*   Importar `getOfertasPaginatedSeed` de `src/lib/seeds/ofertas.ts` y los tipos `PaginatedOffersResponse` de `src/interfaces/ofertas/Oferta.ts`.
*   Definir la función `export async function searchOffersAction(searchTerm: string = ''): Promise<PaginatedOffersResponse>`.
*   Dentro de `searchOffersAction`, llamar a `getOfertasPaginatedSeed(searchTerm)` y retornar su resultado. Opcionalmente, añadir un pequeño retardo (`await new Promise(resolve => setTimeout(resolve, 500))`) para simular latencia de red.
*   Crear un bloque `try-catch` para la lógica de `fetch` al endpoint `GET /api/ofertas` (asumiendo que el backend existe o se está desarrollando).
    *   Construir la URL con `process.env.NEXT_PUBLIC_API_BASE_URL` y los `queryParams` (ej. `searchTerm`, `page=1`, `limit=10`).
    *   Manejar la respuesta (`response.json()`) y verificar `response.ok`.
    *   En caso de error, retornar una `PaginatedOffersResponse` vacía o de error adecuada.
*   **Comentar TODO el bloque de `fetch` completamente** para que no se ejecute en esta fase de desarrollo con seed data.

Validaciones:
*   La acción debe retornar `PaginatedOffersResponse` según el `searchTerm` usando los datos del seed.

Diseño: N/A

Integración: Esta Server Action será invocada por `app/ofertas/page.tsx`.

Criterios de Aceptación Técnica:
*   La Server Action `searchOffersAction` está definida y marcada con `'use server'`.
*   La acción retorna `PaginatedOffersResponse` utilizando `getOfertasPaginatedSeed` en base al `searchTerm` recibido.
*   El código completo para realizar la petición `fetch` al backend real está presente en el Server Action, pero **completamente comentado**.
*   El `fetch` comentado incluye la construcción de `queryParams`, URL, manejo de `response.ok` y `try-catch`.
*   Los tipos de entrada y salida del Server Action son correctos (`searchTerm: string`, `Promise<PaginatedOffersResponse>`).
---END_PROMPT---

---START_COMMIT--- HU17-T06 feat(action): implementar searchOffersAction con seed data y fetch comentado ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Actualización de `OfertasPage` (Server Component) para búsqueda y renderizado condicional. HU_NUMBER: HU17 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Inicio Estudiante - Página 1 ([1ZvU3ULkXws0-Sum-i-_nEHRz91GLRr7x](https://drive.google.com/file/d/1ZvU3ULkXws0-Sum-i-_nEHRz91GLRr7x/view?usp=drivesdk)) ---END_FRAME---

---START_ESTIMATION--- 3H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Para completar la funcionalidad de búsqueda de la HU17, la página principal de ofertas debe ser capaz de consumir los parámetros de búsqueda de la URL, invocar la Server Action correspondiente y mostrar los resultados de manera dinámica.
Objetivo: Modificar la `OfertasPage` para que sea un Server Component asíncrono que gestione el flujo de búsqueda y renderice condicionalmente los componentes de UI (`SearchBar`, `ResultsCounter`, `OfferCardsList`, `NoResultsMessage`).

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `app/ofertas/page.tsx`

Tecnologías: Next.js 16 (Server Components, `searchParams`), React, TypeScript.

Estructura:
*   Modificar `app/ofertas/page.tsx` para que sea una función `async` que reciba `searchParams` como prop: `async function OfertasPage({ searchParams }: { searchParams: { searchTerm?: string } })`.
*   Extraer `searchTerm` de `searchParams` (usar un string vacío `''` como valor por defecto si no está presente).
*   Importar `searchOffersAction` de `app/actions/ofertas.ts`.
*   Al inicio del componente, llamar a `const { items, totalResults } = await searchOffersAction(searchTerm || '')`.
*   Importar los componentes `SearchBar`, `ResultsCounter`, `NoResultsMessage` de sus respectivas rutas `src/components/ofertas-ui/...`.
*   Importar `OfferCardsList` (asumiendo su existencia en `src/components/ofertas/OfferCardsList/OfferCardsList.tsx`).
*   Renderizar la `SearchBar` en la parte superior.
*   Renderizar el `ResultsCounter` pasando `totalResults` como prop.
*   Implementar renderizado condicional:
    *   Si `totalResults > 0`, renderizar `OfferCardsList` pasando `items` como prop.
    *   Si `totalResults === 0`, renderizar `NoResultsMessage`.
*   Asegurar que el diseño general de la página se mantenga como en el frame, con los componentes colocados en sus ubicaciones correctas.

Validaciones:
*   La página debe mostrar todas las ofertas si `searchTerm` está vacío o no está presente.
*   Debe mostrar ofertas filtradas si se proporciona un `searchTerm` que coincide.
*   Debe mostrar el mensaje de "No Results" si `searchTerm` no tiene coincidencias.
*   El `ResultsCounter` debe reflejar el número correcto de ofertas en cada escenario.

Diseño:
*   La disposición de los componentes en la página (`SearchBar` arriba, `ResultsCounter` a la derecha, lista de ofertas o mensaje central) debe coincidir con el frame "E. Inicio Estudiante - Página 1".

Integración: Esta página orquesta la interacción entre la URL, la Server Action y los componentes de UI.

Criterios de Aceptación Técnica:
*   `OfertasPage` es un Server Component que recibe y procesa `searchParams`.
*   `searchOffersAction` es invocada correctamente con el `searchTerm` de la URL.
*   `ResultsCounter` muestra el número correcto de resultados.
*   Si `totalResults > 0`, `OfferCardsList` se renderiza con las ofertas filtradas.
*   Si `totalResults === 0`, `NoResultsMessage` se renderiza con el mensaje específico.
*   El comportamiento de búsqueda con campo vacío (`searchTerm` no presente o vacío) muestra todas las ofertas.
*   El flujo completo de interacción (SearchBar -> URL update -> Page re-render -> Action call -> UI update) es funcional.
---END_PROMPT---

---START_COMMIT--- HU17-T07 feat(page): actualizar OfertasPage para búsqueda y renderizado condicional ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 8 TASK_TITLE: Integración de `searchOffersAction` con backend real (descomentar `fetch`). HU_NUMBER: HU17 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Una vez que el frontend y la Server Action han sido desarrollados y probados con datos de seed, es momento de integrar la funcionalidad de búsqueda con el backend real de NestJS.
Objetivo: Activar la integración con el backend real para la búsqueda de ofertas, descomentando el código de `fetch` en la Server Action `searchOffersAction` y eliminando el uso del seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `app/actions/ofertas.ts`

Tecnologías: Next.js 16 (Server Actions), TypeScript, `fetch` (API del navegador/Node.js).

Estructura:
*   Abrir `app/actions/ofertas.ts`.
*   Comentar o eliminar la línea que llama y retorna `getOfertasPaginatedSeed`.
*   Descomentar todo el bloque `try-catch` que contiene la lógica para realizar la petición `fetch` al endpoint `GET /api/ofertas`.
*   Verificar que la construcción de la URL (`process.env.NEXT_PUBLIC_API_BASE_URL`) y los `queryParams` (`searchTerm`, `page`, `limit`) sean correctos y se ajusten a la API de NestJS.
*   Asegurarse de que el manejo de errores (`!response.ok` y `catch`) devuelva una `PaginatedOffersResponse` vacía o de error que sea compatible con los tipos definidos y que la UI pueda manejar.

Validaciones:
*   La búsqueda en la UI debe reflejar los datos reales del backend.
*   Los escenarios de búsqueda exitosa, sin coincidencias y con campo vacío deben funcionar correctamente con el backend.
*   El `totalResults` y los `items` deben ser los proporcionados por el backend.

Diseño: N/A

Integración: Esta tarea completa la integración de la Server Action con el backend.

Criterios de Aceptación Técnica:
*   La Server Action `searchOffersAction` realiza la petición `fetch` al backend de NestJS correctamente.
*   La respuesta del backend es parseada y utilizada por `OfertasPage` sin errores.
*   El `totalResults` y `items` reflejan los datos reales del backend.
*   Se manejan los errores de red o del servidor mostrando un comportamiento adecuado en la UI (ej. `NoResultsMessage` o un mensaje de error).
*   El código de seed data ya no se utiliza para la respuesta.
---END_PROMPT---

---START_COMMIT--- HU17-T08 feat(action): integrar searchOffersAction con backend real ---END_COMMIT---
---END_TASK---