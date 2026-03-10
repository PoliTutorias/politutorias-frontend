---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de tipos de datos (`OfferDetails`, `TutorProfile`, `ExperienceEntry`) para el frontend. HU_NUMBER: HU05 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La aplicación Next.js 16 necesita interfaces TypeScript robustas para manejar la información del tutor y las ofertas de tutoría, garantizando la seguridad de tipos y la consistencia con los DTOs del backend.

Objetivo: Definir las interfaces TypeScript `OfferDetails`, `TutorProfile` y `ExperienceEntry` que reflejen la estructura de datos esperada del backend (`OfferDetailsDto`, `TutorProfileDto`, `ExperienceEntryDto`).

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/interfaces/offers/OfferDetails.ts`
- `src/interfaces/offers/TutorProfile.ts`
- `src/interfaces/offers/ExperienceEntry.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
1.  Crear `src/interfaces/offers/ExperienceEntry.ts` con la interfaz `ExperienceEntry` que tenga las propiedades `role: string`, `institution: string`, `startDate: string`, `endDate: string`.
2.  Crear `src/interfaces/offers/TutorProfile.ts` con la interfaz `TutorProfile` que contenga:
    *   `id: string`
    *   `name: string`
    *   `academicInfo: string`
    *   `biography: string`
    *   `subjects: string[]`
    *   `rating: number`
    *   `reviewCount: number`
    *   `profileImageUrl: string`
3.  Crear `src/interfaces/offers/OfferDetails.ts` con la interfaz `OfferDetails` que incluya al menos las propiedades:
    *   `id: string`
    *   `title: string`
    *   `description: string`
    *   `pricePerHour: number`
    *   `tutor: TutorProfile` (importar desde `src/interfaces/offers/TutorProfile.ts`)
    *   `tutorExperiences: ExperienceEntry[]` (importar desde `src/interfaces/offers/ExperienceEntry.ts`)
4.  Asegurar que todas las interfaces sean exportadas.

Validaciones: Las estructuras de las interfaces deben coincidir exactamente con los DTOs correspondientes del backend.

Diseño: N/A.

Integración: Estas interfaces serán utilizadas en Server Actions, componentes y seed data.

Criterios de Aceptación Técnica:
- Existen los archivos `src/interfaces/offers/OfferDetails.ts`, `src/interfaces/offers/TutorProfile.ts` y `src/interfaces/offers/ExperienceEntry.ts`.
- Las interfaces `OfferDetails`, `TutorProfile` y `ExperienceEntry` están definidas con las propiedades y tipos de datos correctos.
- La estructura de estas interfaces coincide exactamente con la de los DTOs definidos en el backend (`OfferDetailsDto`, `TutorProfileDto`, `ExperienceEntryDto`).
- Las interfaces se exportan y son accesibles para otros módulos.
---END_PROMPT---

---START_COMMIT--- HU05-T01 feat(types): definir interfaces OfferDetails y TutorProfile ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Creación de seed para `OfferDetailsDto` (incluye tutor y experiencias). HU_NUMBER: HU05 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Se requiere un conjunto de datos de ejemplo para simular la respuesta del backend durante el desarrollo y las pruebas del frontend, permitiendo trabajar de forma independiente.

Objetivo: Crear un archivo de seed (`offerDetailsSeed.ts`) que contenga un objeto `OfferDetails` completo, incluyendo el perfil del tutor y su historial de experiencia, tipado con las interfaces definidas en la Tarea 1.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/seed/OfferDetailsSeedData.ts`
- `src/interfaces/offers/OfferDetails.ts` (para importación)

Tecnologías: Next.js 16, TypeScript.

Estructura:
1.  Crear `src/seed/OfferDetailsSeedData.ts`.
2.  Importar la interfaz `OfferDetails` de `src/interfaces/offers/OfferDetails.ts`.
3.  Definir y exportar una constante `offerDetailsSeed` de tipo `OfferDetails` con los siguientes datos de ejemplo:
    *   Propiedades de `OfferDetails` (id, title, description, pricePerHour, etc.).
    *   Un objeto `tutor` (de tipo `TutorProfile`) con datos realistas para:
        *   `id`
        *   `name` (ej: 'Juan Pérez')
        *   `academicInfo` (ej: 'FIM - Mecánica ☁️ 9° Semestre')
        *   `biography` (ej: 'Soy un apasionado por la mecánica y las matemáticas aplicadas. Me encanta guiar a otros en el camino del aprendizaje y verlos superar sus desafíos.')
        *   `subjects` (ej: `['Cálculo Vectorial', 'Física I', 'Estática', 'Dinámica', 'Termodinámica']`)
        *   `rating` (ej: 4.8)
        *   `reviewCount` (ej: 25)
        *   `profileImageUrl` (ej: 'https://cdn.example.com/tutor_juan_perez.jpg' o una imagen de placeholder).
    *   Un array `tutorExperiences` (de tipo `ExperienceEntry[]`) con al menos dos entradas:
        *   Una con `endDate` como 'Presente' (ej: `{ role: 'Ayudante de Cátedra - Estática', institution: 'EPN, Facultad de Mecánica', startDate: '2024-03-01', endDate: 'Presente' }`).
        *   Otra con `endDate` como una fecha pasada (ej: `{ role: 'Tutor Particular - Cálculo y Física', institution: 'Independiente', startDate: '2023-01-15', endDate: '2023-12-31' }`).

Validaciones: El seed data debe ser compatible con la interfaz `OfferDetails`.

Diseño: N/A.

Integración: Este seed será utilizado por el Server Action `getOfferDetailsAction` en su fase inicial.

Criterios de Aceptación Técnica:
- El archivo `src/seed/OfferDetailsSeedData.ts` existe y exporta la constante `offerDetailsSeed`.
- La estructura del `offerDetailsSeed` coincide con la interfaz `OfferDetails` y los DTOs del backend.
- El seed incluye datos realistas y completos para el perfil del tutor y al menos dos entradas de experiencia, incluyendo el manejo de `endDate: 'Presente'`.
---END_PROMPT---

---START_COMMIT--- HU05-T02 feat(seed): crear seed data para OfferDetails ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Implementación de Server Action `getOfferDetailsAction` con seed data. HU_NUMBER: HU05 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La aplicación necesita una forma de obtener los detalles de una oferta en el servidor. Inicialmente, se usará seed data para desacoplar el desarrollo frontend del backend.

Objetivo: Crear el Server Action `getOfferDetailsAction(offerId: string)` que, en su primera versión, retornará el `offerDetailsSeed`. Se debe incluir el código para la integración real con el backend, pero comentado.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/actions/offers/getOfferDetailsAction.ts`
- `src/seed/OfferDetailsSeedData.ts` (para importación)
- `src/interfaces/offers/OfferDetails.ts` (para tipado)

Tecnologías: Next.js 16, TypeScript.

Estructura:
1.  Crear el archivo `src/actions/offers/getOfferDetailsAction.ts`.
2.  Marcar el archivo con `'use server'` en la parte superior.
3.  Importar `offerDetailsSeed` de `src/seed/OfferDetailsSeedData.ts` y `OfferDetails` de `src/interfaces/offers/OfferDetails.ts`.
4.  Definir la función asíncrona `getOfferDetailsAction(offerId: string): Promise<OfferDetails | null>`.
5.  Dentro de la función, retornar directamente `offerDetailsSeed`.
6.  Simular un retardo de red para una experiencia de usuario más realista durante el desarrollo (ej. `await new Promise(resolve => setTimeout(resolve, 500))`).
7.  Añadir un bloque de código COMENTADO que demuestre la futura integración con el backend:
    *   Utilizar `process.env.NEXT_PUBLIC_API_BASE_URL` para la URL base.
    *   Realizar una petición `fetch` al endpoint `GET /api/offers/:id`.
    *   Configurar `method: 'GET'` y `headers: { 'Content-Type': 'application/json' }`.
    *   Manejar la validación `response.ok` y el parseo de la respuesta `await response.json()`.
    *   Incluir un `try-catch` para manejar errores de red o del servidor.
    *   Documentar la estructura de respuesta esperada en los comentarios.

Validaciones: La función debe retornar un `OfferDetails` o `null` tipado correctamente.

Diseño: N/A.

Integración: Este Server Action será invocado por `app/offers/[id]/page.tsx`.

Criterios de Aceptación Técnica:
- El Server Action `getOfferDetailsAction` existe en `src/actions/offers/getOfferDetailsAction.ts` y está marcado con `'use server'`.
- Al ser invocado, `getOfferDetailsAction` retorna el `offerDetailsSeed` con la estructura `OfferDetails`.
- Se simula un retardo para emular una petición de red.
- El código de la petición `fetch` al backend real está presente pero COMENTADO, con placeholders para la URL del API y manejo de errores.
- La función `getOfferDetailsAction` está tipada correctamente con `Promise<OfferDetails | null>`.
---END_PROMPT---

---START_COMMIT--- HU05-T03 feat(actions): implementar getOfferDetailsAction con seed ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Maquetación de la página `OfferDetailPage` (`app/offers/[id]/page.tsx`). HU_NUMBER: HU05 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Detalle Oferta ---END_FRAME---

---START_ESTIMATION--- 2.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La aplicación necesita una página para mostrar los detalles de una oferta específica, centrándose en la información del tutor.

Objetivo: Crear la página `app/offers/[id]/page.tsx` como un Server Component que obtendrá los datos del tutor y renderizará la estructura base para las secciones "Sobre el Tutor" y "Experiencia", ignorando otros detalles de la oferta.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/app/offers/[id]/page.tsx`
- `src/actions/offers/getOfferDetailsAction.ts` (para importación)
- `src/interfaces/offers/OfferDetails.ts` (para importación)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
1.  Crear el archivo `src/app/offers/[id]/page.tsx`.
2.  Definir el componente `OfferDetailPage` como un Server Component (por defecto en `app` router).
3.  La función del componente debe aceptar `params: { id: string }` como prop.
4.  Dentro del componente, invocar de forma asíncrona `getOfferDetailsAction(params.id)` para obtener los datos de la oferta.
5.  Renderizar un contenedor principal (`div` o `main`) con estilos básicos de Tailwind CSS 4 para centrar el contenido y aplicar un espaciado adecuado (ej. `max-w-4xl mx-auto p-4`).
6.  Dentro del contenedor, añadir dos secciones (`div` o `section`) con títulos (`h2` o `h3`) placeholders para "Sobre el Tutor" y "Experiencia".
7.  Utilizar condicionales básicos para manejar el caso en que `offerDetails` sea `null` (mostrar un mensaje de "Oferta no encontrada").
8.  Tipar la interfaz de `params` y la respuesta del Server Action.

Validaciones: N/A (la validación de datos se hará en el Server Action y los componentes hijos).

Diseño:
- La maquetación debe seguir la estructura visual de las secciones "Sobre el Tutor" y "Experiencia" del Frame E. Detalle Oferta.
- Aplicar estilos de Tailwind CSS 4 para lograr una presentación limpia y responsiva que actúe como esqueleto para los componentes futuros.

Integración: Esta página será el punto de entrada para mostrar la información del tutor y pasará los datos a los componentes hijos.

Criterios de Aceptación Técnica:
- El archivo `src/app/offers/[id]/page.tsx` existe y define el componente `OfferDetailPage` como un Server Component.
- La página invoca `getOfferDetailsAction` con el ID de la oferta y espera su resolución.
- Se renderiza una estructura HTML básica con estilos de Tailwind CSS 4 que incluye contenedores y títulos placeholders para las secciones "Sobre el Tutor" y "Experiencia".
- Los datos obtenidos del Server Action (`OfferDetails`) se almacenan en una variable local y están disponibles para pasar a futuros componentes hijos.
- Se muestra un mensaje simple si la oferta no se encuentra.
---END_PROMPT---

---START_COMMIT--- HU05-T04 feat(page): maquetar OfferDetailPage para tutor info ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Implementación del componente `TutorInfoSection` (sección "Sobre el Tutor"). HU_NUMBER: HU05 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Detalle Oferta ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La página de detalle de oferta necesita un componente específico para encapsular y presentar toda la información relevante de la sección "Sobre el Tutor".

Objetivo: Crear el componente `TutorInfoSection` que recibirá la información del perfil del tutor (`TutorProfile`) como props y servirá como contenedor para `TutorProfileCard`, `TutorBiographyDisplay` y `SubjectTagsList`.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/components/tutors/TutorInfoSection/TutorInfoSection.tsx`
- `src/interfaces/offers/TutorProfile.ts` (para importación)
- `src/app/offers/[id]/page.tsx` (para integrar el componente)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
1.  Crear el archivo `src/components/tutors/TutorInfoSection/TutorInfoSection.tsx`.
2.  Definir el componente `TutorInfoSection` como un Server Component.
3.  Definir las props del componente para aceptar `tutor: TutorProfile`.
4.  Maquetar la sección principal "Sobre el Tutor" utilizando un elemento `section` o `div`.
5.  Incluir un título `h2` o `h3` con el texto "Sobre el Tutor".
6.  Dentro de esta sección, añadir placeholders para los futuros sub-componentes: `TutorProfileCard`, `TutorBiographyDisplay` y `SubjectTagsList`.
7.  Integrar `TutorInfoSection` en `src/app/offers/[id]/page.tsx`, pasándole el `tutor` object extraído de `OfferDetails`.

Validaciones: Las props `tutor` deben estar tipadas correctamente.

Diseño:
- Aplicar estilos de Tailwind CSS 4 para el espaciado, márgenes y una estructura visual clara de la sección, siguiendo la sección "Sobre el Tutor" del Frame E. Detalle Oferta.
- Asegurar que la sección sea responsiva.

Integración: Será un componente hijo de `OfferDetailPage` y padre de `TutorProfileCard`, `TutorBiographyDisplay` y `SubjectTagsList`.

Criterios de Aceptación Técnica:
- El componente `src/components/tutors/TutorInfoSection/TutorInfoSection.tsx` existe.
- El componente `TutorInfoSection` es un Server Component.
- Acepta un prop `tutor` de tipo `TutorProfile`.
- Muestra el título "Sobre el Tutor" y tiene la estructura básica para contener los sub-componentes.
- Se integra correctamente en `src/app/offers/[id]/page.tsx` y recibe los datos del tutor.
- Posee estilos básicos de Tailwind CSS 4 para su presentación.
---END_PROMPT---

---START_COMMIT--- HU05-T05 feat(components): crear TutorInfoSection ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Implementación del componente `TutorProfileCard` (imagen, nombre, info académica, rating). HU_NUMBER: HU05 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Detalle Oferta ---END_FRAME---

---START_ESTIMATION--- 2H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Dentro de la sección "Sobre el Tutor", se necesita un componente que muestre de manera concisa la información principal del perfil del tutor.

Objetivo: Crear el componente `TutorProfileCard` que presentará la imagen de perfil, el nombre, la información académica, el rating y el número de reseñas del tutor, recibiendo estos datos como props.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/components/tutors/TutorProfileCard/TutorProfileCard.tsx`
- `src/components/tutors/TutorInfoSection/TutorInfoSection.tsx` (para integrar el componente)
- `src/interfaces/offers/TutorProfile.ts` (para tipado de props)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, `next/image`, `react-icons`.

Estructura:
1.  Crear el archivo `src/components/tutors/TutorProfileCard/TutorProfileCard.tsx`.
2.  Definir el componente `TutorProfileCard` como un Server Component (ya que solo renderiza data).
3.  Definir las props para aceptar: `profileImageUrl: string`, `name: string`, `academicInfo: string`, `rating: number`, `reviewCount: number`.
4.  Maquetar la tarjeta de perfil:
    *   Utilizar el componente `Image` de Next.js para la `profileImageUrl`, asegurando `alt` text y propiedades `width`/`height` (o `fill`) para optimización y estilos (ej. circular).
    *   Mostrar el `name` del tutor (`h3`).
    *   Mostrar `academicInfo` (ej: 'FIM - Mecánica ☁️ 9° Semestre') (`p` o `span`).
    *   Renderizar el `rating` y `reviewCount`. Usar un ícono de estrella (ej. de `react-icons`) junto al rating.
5.  Integrar `TutorProfileCard` en `TutorInfoSection`, pasándole las props adecuadas del objeto `tutor`.

Validaciones: Las props deben estar tipadas correctamente. Asegurar que `profileImageUrl` sea una URL válida para `Image`.

Diseño:
- Aplicar estilos de Tailwind CSS 4 para dar a la tarjeta una apariencia moderna y responsiva.
- La imagen de perfil debe ser circular y de un tamaño adecuado.
- El nombre y la información académica deben ser legibles y bien espaciados.
- El rating debe destacarse visualmente, posiblemente con un color para las estrellas y un texto claro para el rating numérico y el conteo de reseñas.
- Referencia al Frame E. Detalle Oferta para la disposición visual.

Integración: Será un componente hijo de `TutorInfoSection`.

Criterios de Aceptación Técnica:
- El componente `src/components/tutors/TutorProfileCard/TutorProfileCard.tsx` existe.
- Es un Server Component.
- Recibe y muestra correctamente la imagen de perfil (usando `next/image`), nombre, información académica, rating y review count.
- El diseño de la tarjeta es consistente con el prototipo del Frame E. Detalle Oferta y es responsivo utilizando Tailwind CSS 4.
- Los iconos (ej. estrella) se utilizan para mejorar la presentación del rating.
- Se integra y renderiza correctamente dentro de `TutorInfoSection`.
---END_PROMPT---

---START_COMMIT--- HU05-T06 feat(components): crear TutorProfileCard ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Implementación del componente `TutorBiographyDisplay` (descripción bibliográfica). HU_NUMBER: HU05 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Detalle Oferta ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La biografía del tutor necesita ser mostrada de manera clara y legible dentro de la sección "Sobre el Tutor".

Objetivo: Crear el componente `TutorBiographyDisplay` que recibirá la descripción bibliográfica del tutor como un prop de texto y la mostrará con estilos adecuados.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/components/tutors/TutorBiographyDisplay/TutorBiographyDisplay.tsx`
- `src/components/tutors/TutorInfoSection/TutorInfoSection.tsx` (para integrar el componente)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
1.  Crear el archivo `src/components/tutors/TutorBiographyDisplay/TutorBiographyDisplay.tsx`.
2.  Definir el componente `TutorBiographyDisplay` como un Server Component.
3.  Definir las props del componente para aceptar `biography: string`.
4.  Renderizar el texto de la biografía dentro de un elemento `p` o `div`.
5.  Integrar `TutorBiographyDisplay` en `TutorInfoSection`, pasándole la prop `biography` del objeto `tutor`.

Validaciones: La prop `biography` debe ser de tipo `string`.

Diseño:
- Aplicar estilos de Tailwind CSS 4 para asegurar un formato de texto legible, con un tamaño de fuente, color y espaciado adecuados.
- Considerar `text-justify` o similar si la biografía es larga.
- Asegurar que el componente sea responsivo.
- Referencia al Frame E. Detalle Oferta.

Integración: Será un componente hijo de `TutorInfoSection`.

Criterios de Aceptación Técnica:
- El componente `src/components/tutors/TutorBiographyDisplay/TutorBiographyDisplay.tsx` existe.
- Es un Server Component.
- Recibe y muestra correctamente la biografía del tutor.
- El texto es legible y tiene un estilo adecuado según Tailwind CSS 4.
- Se integra correctamente dentro de `TutorInfoSection`.
---END_PROMPT---

---START_COMMIT--- HU05-T07 feat(components): crear TutorBiographyDisplay ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 8 TASK_TITLE: Implementación del componente `SubjectTagsList` (materias dominadas como tags). HU_NUMBER: HU05 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Detalle Oferta ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Las materias que domina un tutor deben presentarse como una lista de tags estilizados, facilitando su visualización y comprensión.

Objetivo: Crear el componente `SubjectTagsList` que recibirá un array de strings (nombres de materias) y renderizará cada uno como un tag individual con estilos de Tailwind CSS 4.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/components/tutors/SubjectTagsList/SubjectTagsList.tsx`
- `src/components/tutors/TutorInfoSection/TutorInfoSection.tsx` (para integrar el componente)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
1.  Crear el archivo `src/components/tutors/SubjectTagsList/SubjectTagsList.tsx`.
2.  Definir el componente `SubjectTagsList` como un Server Component.
3.  Definir las props del componente para aceptar `subjects: string[]`.
4.  Dentro del componente, iterar sobre el array `subjects` usando `map`.
5.  Para cada `subject`, renderizar un `span` o `div` que representará el tag.
6.  Asegurar una `key` única para cada tag (ej. `index` si no hay otro identificador).
7.  Integrar `SubjectTagsList` en `TutorInfoSection`, pasándole la prop `subjects` del objeto `tutor`.

Validaciones: La prop `subjects` debe ser un `string[]`. Manejar el caso de un array vacío.

Diseño:
- Aplicar estilos de Tailwind CSS 4 a cada tag, dándole un fondo (ej. `bg-blue-100`), color de texto (ej. `text-blue-800`), padding (ej. `px-3 py-1`), bordes redondeados (ej. `rounded-full`) y un tamaño de fuente pequeño.
- Organizar los tags en un contenedor flexbox con `flex-wrap` para que se ajusten a múltiples líneas en pantallas pequeñas.
- Asegurar un espaciado adecuado entre los tags.
- Referencia al Frame E. Detalle Oferta.

Integración: Será un componente hijo de `TutorInfoSection`.

Criterios de Aceptación Técnica:
- El componente `src/components/tutors/SubjectTagsList/SubjectTagsList.tsx` existe.
- Es un Server Component.
- Recibe un array de strings (`subjects`) y renderiza cada string como un tag visible.
- Los tags tienen estilos consistentes y responsivos con Tailwind CSS 4 (fondo, texto, padding, bordes redondeados).
- La lista de tags se muestra correctamente, permitiendo el flujo y el ajuste en pantallas pequeñas.
- Se integra correctamente dentro de `TutorInfoSection`.
---END_PROMPT---

---START_COMMIT--- HU05-T08 feat(components): crear SubjectTagsList ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 9 TASK_TITLE: Implementación del componente `TutorExperienceSection` (sección "Experiencia"). HU_NUMBER: HU05 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Detalle Oferta ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Se necesita una sección dedicada para mostrar el historial de experiencia del tutor.

Objetivo: Crear el componente `TutorExperienceSection` que encapsulará la sección "Experiencia" del tutor, recibiendo un array de `ExperienceEntry` como props y sirviendo como contenedor para múltiples `ExperienceEntryCard`.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/components/tutors/TutorExperienceSection/TutorExperienceSection.tsx`
- `src/interfaces/offers/ExperienceEntry.ts` (para importación)
- `src/app/offers/[id]/page.tsx` (para integrar el componente)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
1.  Crear el archivo `src/components/tutors/TutorExperienceSection/TutorExperienceSection.tsx`.
2.  Definir el componente `TutorExperienceSection` como un Server Component.
3.  Definir las props del componente para aceptar `experiences: ExperienceEntry[]`.
4.  Maquetar la sección principal "Experiencia" utilizando un elemento `section` o `div`.
5.  Incluir un título `h2` o `h3` con el texto "Experiencia".
6.  Dentro de esta sección, añadir un contenedor (`div`) donde se iterará sobre `experiences` y se renderizarán placeholders para `ExperienceEntryCard` por cada entrada.
7.  Integrar `TutorExperienceSection` en `src/app/offers/[id]/page.tsx`, pasándole el `tutorExperiences` array extraído de `OfferDetails`.

Validaciones: Las props `experiences` deben estar tipadas como `ExperienceEntry[]`.

Diseño:
- Aplicar estilos de Tailwind CSS 4 para el espaciado, márgenes y una estructura visual clara de la sección, siguiendo la sección "Experiencia" del Frame E. Detalle Oferta.
- Asegurar que la sección sea responsiva.

Integración: Será un componente hijo de `OfferDetailPage` y padre de `ExperienceEntryCard`.

Criterios de Aceptación Técnica:
- El componente `src/components/tutors/TutorExperienceSection/TutorExperienceSection.tsx` existe.
- Es un Server Component.
- Acepta un prop `experiences` de tipo `ExperienceEntry[]`.
- Muestra el título "Experiencia" y tiene la estructura básica para contener las entradas de experiencia.
- Se integra correctamente en `src/app/offers/[id]/page.tsx` y recibe los datos de experiencia.
- Posee estilos básicos de Tailwind CSS 4 para su presentación.
---END_PROMPT---

---START_COMMIT--- HU05-T09 feat(components): crear TutorExperienceSection ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 10 TASK_TITLE: Implementación del componente `ExperienceEntryCard` (entrada individual de experiencia). HU_NUMBER: HU05 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Detalle Oferta ---END_FRAME---

---START_ESTIMATION--- 2H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Cada entrada del historial de experiencia del tutor necesita ser mostrada de manera individual, clara y con un formato de fecha específico.

Objetivo: Crear el componente `ExperienceEntryCard` para mostrar una entrada individual de experiencia, formateando el rol, institución y las fechas (`startDate`, `endDate`), incluyendo el manejo de la cadena "Presente" para `endDate`.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/components/tutors/ExperienceEntryCard/ExperienceEntryCard.tsx`
- `src/interfaces/offers/ExperienceEntry.ts` (para tipado de props)
- `src/components/tutors/TutorExperienceSection/TutorExperienceSection.tsx` (para integrar el componente)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
1.  Crear el archivo `src/components/tutors/ExperienceEntryCard/ExperienceEntryCard.tsx`.
2.  Definir el componente `ExperienceEntryCard` como un Server Component.
3.  Definir las props del componente para aceptar: `role: string`, `institution: string`, `startDate: string`, `endDate: string`.
4.  Maquetar la tarjeta de experiencia individual:
    *   Mostrar el `role` (ej: 'Ayudante de Cátedra - Estática') con un estilo de texto destacado (ej. `font-semibold`).
    *   Mostrar la `institution` (ej: 'EPN, Facultad de Mecánica').
    *   Formatear y mostrar las fechas:
        *   Extraer el año de `startDate` (ej. '2024').
        *   Si `endDate` es la cadena 'Presente', mostrar 'Presente'.
        *   Si `endDate` es una fecha ('YYYY-MM-DD'), extraer el año (ej. '2023').
        *   Unir los años con un guion (ej. '2024 — Presente' o '2022 — 2023').
5.  Integrar `ExperienceEntryCard` en `TutorExperienceSection`, iterando sobre el array `experiences` y pasándole las props de cada `ExperienceEntry`. Asegurar una `key` única para cada tarjeta.

Validaciones: Las props `role`, `institution`, `startDate`, `endDate` deben ser de tipo `string`.

Diseño:
- Aplicar estilos de Tailwind CSS 4 para dar a cada entrada un formato de tarjeta o lista, asegurando un espaciado adecuado.
- Usar diferentes tamaños y pesos de fuente para el rol, institución y fechas para mejorar la legibilidad.
- Asegurar que el componente sea responsivo.
- Referencia al Frame E. Detalle Oferta.

Integración: Será un componente hijo de `TutorExperienceSection`.

Criterios de Aceptación Técnica:
- El componente `src/components/tutors/ExperienceEntryCard/ExperienceEntryCard.tsx` existe.
- Es un Server Component.
- Recibe y muestra correctamente el rol, institución y fechas de la experiencia.
- Las fechas `startDate` y `endDate` (incluyendo 'Presente') se formatean correctamente para visualización (ej. 'YYYY — Presente' o 'YYYY — YYYY').
- El diseño de la entrada de experiencia es claro, legible y responsivo con Tailwind CSS 4.
- Se integra y renderiza correctamente dentro de `TutorExperienceSection`.
---END_PROMPT---

---START_COMMIT--- HU05-T10 feat(components): crear ExperienceEntryCard ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 11 TASK_TITLE: Manejo de estados de carga, error y "oferta no encontrada" en `OfferDetailPage`. HU_NUMBER: HU05 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Para mejorar la experiencia de usuario, la página de detalle de oferta debe informar al usuario sobre el estado de la carga de datos (cargando, error, o no encontrada).

Objetivo: Modificar `OfferDetailPage` (`app/offers/[id]/page.tsx`) para implementar la lógica de manejo de estados de carga, error y "oferta no encontrada", mostrando mensajes adecuados en cada situación.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/app/offers/[id]/page.tsx`
- `src/actions/offers/getOfferDetailsAction.ts` (asegurarse de que pueda lanzar errores o retornar `null` de forma controlada)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
1.  Modificar `src/app/offers/[id]/page.tsx`.
2.  Dado que `getOfferDetailsAction` es una función `async` en un Server Component, el estado de carga se maneja implícitamente por el flujo de rendering. Para un Server Component, la forma más sencilla de manejar la "carga" inicial es a través del `loading.tsx` adyacente, sin embargo, para mostrar un spinner *dentro* del componente mientras se esperan datos, es más común en Client Components. Como alternativa, si la HU quiere indicar el *fetching* dentro de la misma página, se puede simular un componente de carga en los hijos o asumir que la página se renderiza una vez que la promesa ha resuelto. Para esta tarea, nos enfocaremos en los estados post-carga: error y no encontrado.
3.  Modificar la invocación de `getOfferDetailsAction` con un bloque `try-catch` para capturar errores.
4.  Si `getOfferDetailsAction` retorna `null` (indicando que la oferta no existe), renderizar un mensaje claro "Oferta no encontrada" con un estilo de Tailwind CSS 4 (ej. `text-center text-red-500 text-xl mt-10`).
5.  Si ocurre un error durante la ejecución de `getOfferDetailsAction` (capturado por el `try-catch`), renderizar un mensaje de error genérico "Error al cargar la información del tutor" con estilos similares.
6.  Si los datos se cargan correctamente, proceder a renderizar el contenido normal de la página (`TutorInfoSection` y `TutorExperienceSection`).

Validaciones:
- La página debe mostrar "Oferta no encontrada" si `offerDetails` es `null`.
- La página debe mostrar un mensaje de error genérico si el Server Action falla.

Diseño:
- Los mensajes de estado (no encontrada, error) deben ser prominentes y visualmente informativos utilizando Tailwind CSS 4.
- Los estilos deben ser consistentes con el resto de la aplicación.

Integración: Esta lógica se implementa directamente en el componente de la página `OfferDetailPage`.

Criterios de Aceptación Técnica:
- Cuando el `getOfferDetailsAction` retorna `null`, la página `OfferDetailPage` muestra un mensaje claro de "Oferta no encontrada".
- Si el `getOfferDetailsAction` lanza una excepción, la página `OfferDetailPage` captura el error y muestra un mensaje "Error al cargar la información del tutor".
- La interfaz de usuario se actualiza correctamente para mostrar el contenido si los datos se cargan exitosamente.
- El manejo de errores y estados de "no encontrada" está tipado correctamente.
---END_PROMPT---

---START_COMMIT--- HU05-T11 feat(page): manejar estados de carga y error en OfferDetailPage ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 12 TASK_TITLE: Integración de `getOfferDetailsAction` con el backend real. HU_NUMBER: HU05 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La fase de desarrollo utilizando seed data ha concluido para esta funcionalidad. Es momento de conectar el frontend con el backend real.

Objetivo: Descomentar el código de la petición `fetch` en el Server Action `getOfferDetailsAction` y eliminar el uso del seed data, activando así la integración con el endpoint `GET /api/offers/:id` del backend de NestJS.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/actions/offers/getOfferDetailsAction.ts`
- `.env.local` (posible verificación/adición de `NEXT_PUBLIC_API_BASE_URL`)

Tecnologías: Next.js 16, TypeScript.

Estructura:
1.  Abrir el archivo `src/actions/offers/getOfferDetailsAction.ts`.
2.  Eliminar o comentar la línea que retorna `offerDetailsSeed` y el `setTimeout` de simulación de retardo.
3.  Eliminar la importación de `offerDetailsSeed`.
4.  Descomentar el bloque `try-catch` que contiene la llamada `fetch` al backend.
5.  Asegurar que `process.env.NEXT_PUBLIC_API_BASE_URL` esté correctamente configurado en el entorno local (`.env.local`) y en el pipeline de CI/CD para producción.
6.  Verificar que el endpoint `GET /api/offers/${offerId}` sea correcto y que los headers (especialmente `Content-Type`) estén definidos.
7.  Asegurar que el manejo de errores (ej. `response.ok` y el retorno de `null` para 404) esté implementado para la respuesta real del backend.

Validaciones:
- La aplicación debe obtener y mostrar datos reales del backend al navegar a la página de detalle de oferta.
- La aplicación debe manejar correctamente los casos de oferta no encontrada (retorno 404 del backend) y errores del servidor.

Diseño: N/A.

Integración: Conexión directa con el backend NestJS a través de la API REST.

Criterios de Aceptación Técnica:
- El Server Action `getOfferDetailsAction` en `src/actions/offers/getOfferDetailsAction.ts` realiza una petición `fetch` al endpoint real del backend.
- La importación y el uso del seed data (`offerDetailsSeed`) han sido eliminados o comentados.
- Los datos mostrados en la página `OfferDetailPage` provienen del backend NestJS.
- El manejo de errores (ej. 404 Not Found) y de éxito se activa correctamente con la respuesta del backend.
- No hay errores de red, CORS, parsing JSON o tipado en la consola del navegador o del servidor Next.js.
---END_PROMPT---

---START_COMMIT--- HU05-T12 chore(actions): integrar getOfferDetailsAction con backend real ---END_COMMIT---
---END_TASK---