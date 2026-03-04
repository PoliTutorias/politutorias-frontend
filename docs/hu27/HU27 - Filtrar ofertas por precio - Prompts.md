---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed para OfertasResult HU_NUMBER: HU27 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La historia de usuario HU27 requiere un filtrado de ofertas por precio. Para permitir el desarrollo y las pruebas del frontend de forma independiente del backend, necesitamos datos simulados que representen la estructura esperada de las ofertas.

Objetivo: Crear un archivo de seed con datos simulados (mock data) para las ofertas, definiendo las interfaces TypeScript correspondientes que coincidan con la documentación del endpoint `GET /api/ofertas`.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/interfaces/ofertas/OfertaEntity.ts`
- `src/interfaces/ofertas/OfertasResult.ts`
- `src/seed/OfertasSeedData.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
1.  **`src/interfaces/ofertas/OfertaEntity.ts`**: Definir la interfaz `OfertaEntity` con propiedades como `id: string`, `titulo: string`, `descripcion: string`, `precio: number`, `duracionHoras: number`, `modalidad: 'Presencial' | 'Virtual'`, `areaConocimiento: string`, `nivel: string`, `tutorId: string`, `calificacionPromedio: number`, `totalReseñas: number`, etc. Asegúrate de incluir `precio` como `number`.
2.  **`src/interfaces/ofertas/OfertasResult.ts`**: Definir la interfaz `OfertasResult` que contenga un array de `OfertaEntity` (ej. `ofertas: OfertaEntity[]`) y un `total: number`.
3.  **`src/seed/OfertasSeedData.ts`**:
    *   Importar las interfaces `OfertaEntity` y `OfertasResult`.
    *   Crear un array de objetos de tipo `OfertaEntity` con al menos 5 entradas. Cada oferta debe tener un `id` único, `titulo`, `descripcion`, y especialmente **precios variados** (ej. 10.00, 15.00, 25.00, 5.00, 30.00) para simular diferentes rangos.
    *   Envolver este array dentro de un objeto de tipo `OfertasResult`, por ejemplo: `{ ofertas: [...], total: N }`.
    *   Exportar este objeto `OfertasResult` como una constante.

Validaciones: No aplica directamente para el seed, pero la estructura debe ser válida TypeScript.

Criterios de Aceptación Técnica:
*   El archivo `src/seed/OfertasSeedData.ts` existe y exporta una constante de tipo `OfertasResult`.
*   Contiene al menos 5 ofertas de ejemplo con datos realistas, incluyendo precios variados y representativos.
*   Las interfaces `OfertaEntity` y `OfertasResult` están correctamente definidas en `src/interfaces/ofertas/` y reflejan el contrato esperado del backend.
*   El `precio` en `OfertaEntity` es de tipo `number`.
---END_PROMPT---

---START_COMMIT--- HU27-T01 feat(seed): crear seed data y interfaces para ofertas ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Maquetación inicial de EncuentraTuTutoriaPage y creación de ClientOffersWrapper HU_NUMBER: HU27 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Inicio Estudiante 1 ---END_FRAME---

---START_ESTIMATION--- 2.0H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La historia de usuario HU27 requiere la integración del filtro de precio en la página "Encuentra tu Tutoría". Necesitamos una estructura clara que separe la lógica de renderizado del servidor de la interactividad del cliente.

Objetivo: Configurar la `EncuentraTuTutoriaPage` (Server Component) para que realice la carga inicial de ofertas y delegue la gestión del estado interactivo y el listado de ofertas a un nuevo `ClientOffersWrapper` (Client Component).

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/app/encuentra-tu-tutoria/page.tsx`
- `src/components/ofertas/ClientOffersWrapper/ClientOffersWrapper.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura: Aplicar Atomic Design y componentes reutilizables.
1.  **`src/app/encuentra-tu-tutoria/page.tsx` (Server Component)**:
    *   Esta página será un Server Component.
    *   Importar el Server Action `filtrarOfertasAction` (aún sin lógica de filtrado real, solo retorna seed por Tarea 4) y la interfaz `OfertasResult`.
    *   Al inicio de la función del componente, invocar `filtrarOfertasAction` sin parámetros para obtener todas las `initialOffers` desde el seed data.
    *   Renderizar un `div` o `main` principal que contenga la estructura general de la página.
    *   Dentro de este contenedor, renderizar el `ClientOffersWrapper`, pasándole las `initialOffers` como una prop.
    *   Asegurarse de que no haya lógica de estado (useState, useEffect) ni eventos interactivos en este Server Component.

2.  **`src/components/ofertas/ClientOffersWrapper/ClientOffersWrapper.tsx` (Client Component)**:
    *   Crear este archivo y marcarlo con `'use client'` al principio.
    *   Definir sus props para recibir `initialOffers: OfertaEntity[]`.
    *   Internamente, utilizar `useState` para gestionar el estado actual de las ofertas (`offers: OfertaEntity[]`), inicializándolo con `initialOffers`.
    *   Utilizar `useTransition` para gestionar el estado de carga (`isPending`) que se usará en futuras interacciones.
    *   Por ahora, renderizar un `div` simple con un mensaje como "Aquí irán los filtros y las ofertas" o directamente mostrar el contenido de `offers` de forma básica (ej. `JSON.stringify(offers)`). El renderizado detallado de las ofertas se hará en Tarea 6.

Validaciones: No habrá validaciones en esta etapa, solo maquetación.

Diseño:
*   La estructura básica debe estar alineada con el `Frame E. Inicio Estudiante 1` para la sección principal de contenido.
*   Utilizar Tailwind CSS 4 para estilos básicos de los contenedores.
*   Asegurar que el `ClientOffersWrapper` se hidrate correctamente sin errores.

Integración: El `EncuentraTuTutoriaPage` debe invocar `filtrarOfertasAction` para obtener datos iniciales y pasarlos al `ClientOffersWrapper`.

Criterios de Aceptación Técnica:
*   `src/app/encuentra-tu-tutoria/page.tsx` es un Server Component que carga `initialOffers` mediante `filtrarOfertasAction`.
*   `src/components/ofertas/ClientOffersWrapper/ClientOffersWrapper.tsx` es un Client Component y recibe `initialOffers` como prop.
*   `ClientOffersWrapper` gestiona su propio estado `offers` con `useState` y `isPending` con `useTransition`.
*   No hay errores de hidratación o de Server/Client Component incompatibles al cargar la página.
*   La estructura de la página refleja el `Frame E. Inicio Estudiante 1` en su disposición general.
---END_PROMPT---

---START_COMMIT--- HU27-T02 feat(frontend): maquetar pagina de tutoria e integrar wrapper ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Implementación de PrecioFilterComponent (slider UI y estado local) HU_NUMBER: HU27 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Inicio Estudiante 1 (parte del slider) ---END_FRAME---

---START_ESTIMATION--- 2.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La historia de usuario HU27 requiere un control de filtro por precio mediante un slider. Este componente necesita gestionar su propio estado para los valores mínimo y máximo seleccionados, y presentar una interfaz de usuario clara y funcional.

Objetivo: Implementar el `PrecioFilterComponent` como un Client Component que contenga un slider de rango de precio, muestre los valores seleccionados formateados como moneda, y gestione su estado local para estos valores.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/components/ofertas/PrecioFilterComponent/PrecioFilterComponent.tsx`
- (Posiblemente un componente de UI de slider si no se usa una librería externa)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura: Aplicar Atomic Design.
1.  **`src/components/ofertas/PrecioFilterComponent/PrecioFilterComponent.tsx` (Client Component)**:
    *   Marcarlo con `'use client'` al principio.
    *   Utilizar `useState` para `minPrice` y `maxPrice` (inicializados, por ejemplo, en 0 y 100).
    *   Renderizar un slider de rango de precio. Puedes usar:
        *   Dos inputs `type="range"` (uno para el mínimo, otro para el máximo) con lógica para que `minPrice` no supere `maxPrice` y viceversa.
        *   Una librería de UI como `shadcn/ui` (si está configurada) o `react-range` para un slider más robusto. Si se usa una librería, especificar su integración. Para este ejercicio, se recomienda un enfoque con `input type="range"` si no se especifica una librería de UI.
    *   Mostrar los valores actuales de `minPrice` y `maxPrice` en la interfaz de usuario, formateados como moneda (ej. '$5.00', '$20.00'). Esto se puede hacer con `Intl.NumberFormat`.
    *   Implementar un manejador de eventos `onChange` para los sliders que actualice el estado local de `minPrice` y `maxPrice`.
    *   Definir props para `PrecioFilterComponent` que incluyan un `initialMinPrice` y `initialMaxPrice` (para futuras necesidades) y un callback `onPriceRangeChange: (min: number, max: number) => void` (para Tarea 5).

Validaciones:
*   Asegurar que `minPrice` no sea mayor que `maxPrice` en la lógica del slider.
*   Los valores de precio deben ser números no negativos.

Diseño:
*   El slider debe ser visualmente claro y fácil de usar, inspirándose en la sección de filtro de precio del `Frame E. Inicio Estudiante 1`.
*   Utilizar clases de Tailwind CSS 4 para el estilizado del slider, los valores de precio y el contenedor del componente.
*   Asegurar que sea responsive.

Integración: En esta tarea, el componente solo gestiona su estado local. La integración con el Server Action se realizará en Tarea 5.

Criterios de Aceptación Técnica:
*   `PrecioFilterComponent` se renderiza como un Client Component con un slider de rango de precio funcional.
*   Los valores `minPrice` y `maxPrice` se muestran en la UI y se actualizan en tiempo real al mover el slider.
*   Los valores de precio se formatean correctamente como moneda (ej. "$X.XX").
*   El estado local del componente (`minPrice`, `maxPrice`) se gestiona correctamente.
*   El componente acepta `onPriceRangeChange` y valores iniciales como props.
*   La UI del slider es consistente con el `Frame E. Inicio Estudiante 1`.
---END_PROMPT---

---START_COMMIT--- HU27-T03 feat(frontend): implementar slider de precio ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Implementación de Server Action `filtrarOfertasAction` con seed data y validación básica HU_NUMBER: HU27 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La historia de usuario HU27 requiere una forma para que el frontend invoque el filtrado de ofertas. Un Server Action es el mecanismo ideal en Next.js 16. En esta etapa, el Server Action utilizará el seed data para permitir el desarrollo frontend sin dependencias del backend, pero debe estar preparado para la futura integración con el API real.

Objetivo: Implementar el Server Action `filtrarOfertasAction` que acepte un rango de precios, realice validaciones básicas, y retorne ofertas filtradas del seed data. El código para la integración con el backend real debe estar presente pero *comentado*, siguiendo las mejores prácticas de preparación para CI/CD.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/actions/ofertas/filtrarOfertasAction.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
1.  **`src/actions/ofertas/filtrarOfertasAction.ts`**:
    *   Marcarlo con `'use server'` al principio.
    *   Importar el `seedData` de `OfertasResult` de `src/seed/OfertasSeedData.ts` y las interfaces `OfertaEntity`, `OfertasResult`.
    *   Definir la función asíncrona `filtrarOfertasAction(minPrice: number, maxPrice: number): Promise<OfertasResult | { error: string }>`.
    *   **Validaciones:**
        *   `if (isNaN(minPrice) || isNaN(maxPrice))` retornar `{ error: 'Los precios deben ser números válidos.' }`.
        *   `if (minPrice < 0 || maxPrice < 0)` retornar `{ error: 'Los precios no pueden ser negativos.' }`.
        *   `if (minPrice > maxPrice)` retornar `{ error: 'El precio mínimo no puede ser mayor que el precio máximo.' }`.
    *   **Lógica de filtrado con Seed Data (Activa):**
        *   Filtra el array `ofertas` del `seedData` donde `oferta.precio >= minPrice && oferta.precio <= maxPrice`.
        *   Retornar un objeto `OfertasResult` con las ofertas filtradas y el `total` de ofertas filtradas.
        *   Simular un pequeño retraso con `await new Promise(resolve => setTimeout(resolve, 500))` para emular una llamada de red.
    *   **Bloque de integración con Backend Real (COMENTADO):**
        *   Escribir el código completo para realizar una petición `fetch` al endpoint `GET /api/ofertas` del backend.
        *   Construir los `queryParams` para `minPrice` y `maxPrice`.
        *   Configurar los `headers` necesarios (ej. `Authorization` si aplica, `Content-Type`).
        *   Incluir `cache: 'no-store'` en la configuración del `fetch`.
        *   Manejar la respuesta (`response.ok`, `!response.ok`), parsear el JSON y retornar `OfertasResult` o un objeto de error.
        *   **TODO ESTE BLOQUE DEBE ESTAR COMPLETAMENTE COMENTADO** para no interferir con la lógica del seed data en esta fase.

Validaciones: Las validaciones de los parámetros `minPrice` y `maxPrice` deben ser robustas y retornar mensajes de error claros.

Diseño: No aplica, es lógica de backend/servidor.

Integración: Este Server Action será la API interna para el Client Component `ClientOffersWrapper`.

Criterios de Aceptación Técnica:
*   El archivo `src/actions/ofertas/filtrarOfertasAction.ts` existe y está marcado como `'use server'`.
*   La función `filtrarOfertasAction` acepta `minPrice` y `maxPrice` como números.
*   Las validaciones `isNaN`, `minPrice < 0`, `maxPrice < 0`, y `minPrice > maxPrice` funcionan correctamente y retornan objetos de error.
*   Cuando los inputs son válidos, el Server Action retorna un `OfertasResult` que contiene ofertas filtradas *del seed data*.
*   El código para la petición `fetch` al endpoint `/api/ofertas` del backend real está presente, completo y **totalmente comentado**.
*   Se simula un pequeño retraso antes de retornar el seed data.
---END_PROMPT---

---START_COMMIT--- HU27-T04 feat(server-action): implementar filtrar ofertas con seed y validacion ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Conexión de `PrecioFilterComponent` con `filtrarOfertasAction` y actualización de estado en `ClientOffersWrapper` HU_NUMBER: HU27 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 2.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La historia de usuario HU27 requiere que el slider de precio interactúe con la lógica de filtrado del servidor y que la interfaz de usuario se actualice dinámicamente. `ClientOffersWrapper` es el punto central para gestionar el estado de las ofertas y orquestar esta interacción.

Objetivo: Conectar el `PrecioFilterComponent` con el `filtrarOfertasAction` a través del `ClientOffersWrapper`. Implementar un mecanismo de `debounce` para las llamadas al Server Action, y usar `useTransition` para manejar los estados de carga, actualizando las ofertas mostradas en el `ClientOffersWrapper`.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/components/ofertas/ClientOffersWrapper/ClientOffersWrapper.tsx`
- `src/components/ofertas/PrecioFilterComponent/PrecioFilterComponent.tsx`
- `src/utils/debounce.ts`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
1.  **`src/utils/debounce.ts`**:
    *   Crear una función `debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void`. Esta función debe envolver otra función y retrasar su ejecución hasta que haya pasado un cierto `delay` sin nuevas llamadas. Es crucial para optimizar las llamadas al Server Action cuando el slider se mueve continuamente.

2.  **`src/components/ofertas/ClientOffersWrapper/ClientOffersWrapper.tsx` (Client Component)**:
    *   Importar `filtrarOfertasAction` de `src/actions/ofertas/filtrarOfertasAction.ts`, `PrecioFilterComponent` de `src/components/ofertas/PrecioFilterComponent/PrecioFilterComponent.tsx`, y la interfaz `OfertaEntity`.
    *   Mantener el estado `offers` (`useState`) y `isPending` (`useTransition`) ya definidos.
    *   Crear una función asíncrona `handlePriceRangeChange(minPrice: number, maxPrice: number)`.
    *   Dentro de `handlePriceRangeChange`:
        *   Iniciar la transición con `startTransition`.
        *   Invocar `filtrarOfertasAction(minPrice, maxPrice)`.
        *   Manejar la respuesta: si es exitosa, actualizar el estado `offers` con los datos filtrados; si hay un error (ej. `{ error: string }`), mostrar un mensaje de error en la UI (ej. con otro estado `error: string | null` y renderizar condicionalmente un `div` con el mensaje).
    *   Crear una versión `debouncedHandlePriceRangeChange` de `handlePriceRangeChange` utilizando la función `debounce` creada en `src/utils/debounce.ts`, con un `delay` apropiado (ej. 500ms).
    *   Renderizar `PrecioFilterComponent` y pasar `debouncedHandlePriceRangeChange` a su prop `onPriceRangeChange`.
    *   Considerar mostrar un indicador de carga (`isPending`) en la UI (ej. un spinner o un texto) cuando se está realizando la búsqueda.

3.  **`src/components/ofertas/PrecioFilterComponent/PrecioFilterComponent.tsx` (Client Component)**:
    *   Modificar el `onChange` de los inputs del slider para que, en lugar de llamar directamente a `onPriceRangeChange`, se llame a la versión `debounced` que se recibirá como prop.
    *   Asegurarse de que el `onPriceRangeChange` prop (`(min: number, max: number) => void`) sea invocado con los valores actuales del slider después del `debounce`.

Validaciones: Las validaciones de los parámetros ya están en el Server Action. Aquí se manejará la visualización de errores devueltos.

Diseño:
*   La interfaz de usuario debe mostrar un estado de carga claro (usando `isPending` y Tailwind CSS 4) cuando se está filtrando.
*   Los mensajes de error deben ser visibles y bien estilizados.

Integración: Esta tarea completa la integración entre la UI del slider, el estado del cliente y el Server Action.

Criterios de Aceptación Técnica:
*   `src/utils/debounce.ts` existe y proporciona una implementación funcional de `debounce`.
*   Mover el slider en `PrecioFilterComponent` (después del `debounce`) invoca la función `handlePriceRangeChange` en `ClientOffersWrapper`.
*   `ClientOffersWrapper` invoca `filtrarOfertasAction` con los `minPrice` y `maxPrice` correctos.
*   El estado `isPending` de `useTransition` en `ClientOffersWrapper` se activa durante la llamada al Server Action y se desactiva al completarse.
*   `ClientOffersWrapper` actualiza su estado `offers` con los datos retornados por el Server Action.
*   Los errores retornados por `filtrarOfertasAction` se capturan y pueden mostrarse en la UI del `ClientOffersWrapper`.
*   La funcionalidad de `debounce` previene llamadas excesivas al Server Action.
---END_PROMPT---

---START_COMMIT--- HU27-T05 feat(frontend): conectar filtro de precio con server action y debouncing ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Desarrollo de `OfertasListComponent` y `NoOffersMessageComponent` dentro de `ClientOffersWrapper` HU_NUMBER: HU27 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Inicio Estudiante 1 (listado de ofertas y estado sin coincidencias) ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La historia de usuario HU27 requiere que el listado de ofertas se actualice dinámicamente según el filtro de precio, y que se muestre un mensaje adecuado si no hay coincidencias. Estos componentes visuales necesitan ser modulares y reutilizables.

Objetivo: Implementar `OfertasListComponent` para renderizar las ofertas filtradas como tarjetas, y `NoOffersMessageComponent` para mostrar un mensaje cuando la lista de ofertas esté vacía. Estos componentes serán gestionados por el `ClientOffersWrapper`.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/components/ofertas/OfertasListComponent/OfertasListComponent.tsx`
- `src/components/ofertas/NoOffersMessageComponent/NoOffersMessageComponent.tsx`
- `src/components/ofertas/OfferCard/OfferCard.tsx` (si no existe y es necesario crear una "molécula" o "átomo")
- `src/components/ofertas/ClientOffersWrapper/ClientOffersWrapper.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura: Aplicar Atomic Design y componentes reutilizables.
1.  **`src/components/ofertas/OfferCard/OfferCard.tsx` (Client Component - si es un componente nuevo)**:
    *   Crear este componente si aún no existe. Marcarlo con `'use client'`.
    *   Recibir una prop `offer: OfertaEntity`.
    *   Renderizar una tarjeta individual para una oferta, mostrando `titulo`, `descripcion`, `precio` (formateado), `areaConocimiento`, `calificacionPromedio`, etc.
    *   Estilizar con Tailwind CSS 4 para que sea una "molécula" visualmente atractiva y reutilizable.

2.  **`src/components/ofertas/OfertasListComponent/OfertasListComponent.tsx` (Client Component)**:
    *   Marcarlo con `'use client'`.
    *   Recibir `offers: OfertaEntity[]` como prop.
    *   Dentro del componente, iterar sobre el array `offers`.
    *   Por cada `offer`, renderizar una instancia de `OfferCard`, pasándole la oferta correspondiente.
    *   Utilizar un contenedor con `display: grid` (o flexbox) y Tailwind CSS 4 para organizar las tarjetas de manera visualmente agradable y responsive.
    *   Asegurar que cada `OfferCard` tenga una `key` única (ej. `offer.id`).

3.  **`src/components/ofertas/NoOffersMessageComponent/NoOffersMessageComponent.tsx` (Client Component)**:
    *   Marcarlo con `'use client'`.
    *   No requiere props.
    *   Renderizar un `div` o `p` con el mensaje: "No se encontraron ofertas. Intenta ajustar tus filtros de búsqueda."
    *   Estilizar con Tailwind CSS 4 para que el mensaje sea prominente y centrado, siguiendo la guía de diseño para mensajes de "estado vacío".

4.  **`src/components/ofertas/ClientOffersWrapper/ClientOffersWrapper.tsx` (Client Component)**:
    *   Importar `OfertasListComponent` y `NoOffersMessageComponent`.
    *   Modificar la lógica de renderizado principal:
        *   Si `offers` está vacío (y no hay un estado `isPending` activo, o se muestra un mensaje de carga separado), renderizar `NoOffersMessageComponent`.
        *   De lo contrario, renderizar `OfertasListComponent` y pasarle el estado `offers`.
        *   Considerar el estado `isPending`: mientras sea `true`, mostrar un spinner o un mensaje de "Buscando ofertas..." en lugar de la lista o el mensaje de no ofertas.

Validaciones: La lógica condicional de renderizado asegura que se muestre el componente correcto basado en la disponibilidad de ofertas.

Diseño:
*   El `OfertasListComponent` debe mostrar las tarjetas de oferta de manera organizada y responsive, tal como se ve el listado en `Frame E. Inicio Estudiante 1`.
*   El `NoOffersMessageComponent` debe ser claro y estar centrado, alineado con el mensaje de "sin coincidencias" del `Frame E. Inicio Estudiante 1`.
*   Se utilizará Tailwind CSS 4 para todos los estilos.

Integración: `ClientOffersWrapper` actúa como el organizador que decide qué componente de listado o mensaje mostrar.

Criterios de Aceptación Técnica:
*   `OfertasListComponent` renderiza un listado de `OfferCard`s cuando recibe un array de `OfertaEntity`s no vacío.
*   `NoOffersMessageComponent` muestra el mensaje "No se encontraron ofertas. Intenta ajustar tus filtros de búsqueda." y está correctamente estilizado.
*   `ClientOffersWrapper` renderiza condicionalmente `OfertasListComponent` o `NoOffersMessageComponent` basado en si el estado `offers` está vacío o contiene datos.
*   El listado de ofertas y el mensaje de "no ofertas" se actualizan dinámicamente cuando el estado `offers` cambia.
*   La interfaz de usuario del listado de ofertas es consistente con el `Frame E. Inicio Estudiante 1`.
---END_PROMPT---

---START_COMMIT--- HU27-T06 feat(frontend): desarrollar listado y mensaje de no ofertas ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Integración final de `filtrarOfertasAction` con backend real HU_NUMBER: HU27 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Todas las tareas de frontend y la lógica del Server Action con seed data están completas. La historia de usuario HU27 ahora necesita conectarse con el backend real para el filtrado de ofertas por precio.

Objetivo: Activar la lógica de `fetch` pre-escrita en el Server Action `filtrarOfertasAction` para que se comunique con el endpoint `GET /api/ofertas` del backend real, y eliminar o comentar la lógica que usa el seed data.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/actions/ofertas/filtrarOfertasAction.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
1.  **`src/actions/ofertas/filtrarOfertasAction.ts`**:
    *   Abrir el archivo.
    *   **Identificar y comentar/eliminar la lógica de seed data:** Localizar el bloque de código que filtra el `seedData` y el `setTimeout` que simula el retraso. Comentar o eliminar completamente este bloque.
    *   **Identificar y descomentar la lógica de `fetch`:** Localizar el bloque de código de la petición `fetch` al endpoint `GET /api/ofertas` que fue pre-escrito y comentado en la Tarea 4. Descomentarlo completamente.
    *   **Configuración del `fetch`:**
        *   Asegurarse de que la URL del endpoint esté configurada correctamente utilizando `process.env.NEXT_PUBLIC_API_URL` y concatenando `/api/ofertas`.
        *   Construir los `queryParams` para `minPrice` y `maxPrice` (ej. `?minPrice=${minPrice}&maxPrice=${maxPrice}`).
        *   Verificar que los `headers` necesarios (ej. `Accept: application/json`) estén presentes. Si se requiere autenticación, el `Authorization` header debe ser incluido con el token apropiado (gestionado por el Server Component o un middleware si aplica).
        *   Confirmar que `cache: 'no-store'` está presente en las opciones del `fetch`.
    *   **Manejo de la respuesta:** Asegurarse de que el bloque `try-catch` y la verificación `if (!response.ok)` manejen correctamente los errores de la API, retornando un objeto `{ error: string }`. Si la respuesta es exitosa, debe parsear el JSON y retornar los datos en el formato `OfertasResult`.

Validaciones:
*   Confirmar que las validaciones de `minPrice` y `maxPrice` (isNaN, negativos, min > max) aún se ejecutan *antes* de la llamada `fetch`.

Diseño: No aplica, es integración de backend.

Integración: Esta tarea completa la integración del frontend con el backend real para el filtrado de ofertas.

Criterios de Aceptación Técnica:
*   `filtrarOfertasAction` ya no utiliza el seed data para retornar ofertas.
*   `filtrarOfertasAction` realiza una petición HTTP `GET` real al endpoint `/api/ofertas` del backend.
*   La petición `fetch` incluye los `minPrice` y `maxPrice` como query parameters.
*   La respuesta del backend se procesa correctamente, actualizando la UI con datos reales.
*   Los errores de la API del backend se capturan y se devuelven en el formato `{ error: string }`, los cuales son manejados por el `ClientOffersWrapper`.
*   El filtrado de ofertas por precio funciona de extremo a extremo con el backend real, cubriendo los casos de éxito y "sin coincidencias" de la HU.
---END_PROMPT---

---START_COMMIT--- HU27-T07 fix(server-action): integrar filtrar ofertas con backend real ---END_COMMIT---
---END_TASK---