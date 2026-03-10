---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed para `DetallesOfertaDto` con datos de ejemplo. HU_NUMBER: HU32 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Necesitas crear un conjunto de datos iniciales que simule la respuesta de un endpoint de API para los detalles de una oferta de tutoría. Esto permitirá el desarrollo del frontend de manera independiente del backend.
Objetivo: Definir la interfaz `DetallesOfertaDto` y crear un objeto `offerDetailsSeed` con datos de ejemplo que cumplan con los criterios de aceptación de la HU32.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/interfaces/offers/DetallesOfertaDto.ts`
- `src/seed/OfferDetailsSeedData.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
- `DetallesOfertaDto` debe ser una interfaz TypeScript que represente la estructura completa de los detalles de una oferta, incluyendo los campos `title`, `modality`, `description`, `categories` (array de objetos `{ name: string }`), `availability` (array de objetos `{ day: string, time: string }`), `pricePerHour`, y un objeto `tutor` (con campos como `name`, `rating`, `phoneNumber`, etc., aunque no todos se usen en la UI de esta HU).
- `offerDetailsSeed` debe ser un objeto de tipo `DetallesOfertaDto` exportado, con datos realistas para 'Cálculo Vectorial', 'Virtual y Presencial', $10 por hora, y la disponibilidad y categorías especificadas en la HU.

Validaciones:
- Los datos de `categories` y `availability` deben ser arrays de objetos, como se describe.

Diseño: Ninguno (solo estructura de datos).

Integración: Ninguna directa, es un mock de datos para el frontend.

Criterios de Aceptación Técnica:
- El seed contiene un objeto `DetallesOfertaDto` completo y válido.
- La estructura de datos del seed coincide exactamente con la del `DetallesOfertaDto` documentado.
- Los datos de ejemplo son coherentes con los criterios de aceptación de la HU (ej. `title: 'Cálculo Vectorial'`, `pricePerHour: 10`).
---END_PROMPT---

---START_COMMIT--- HU32-T1 feat(seed): crear seed para detalles de oferta ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Implementación de la página `DetallesOfertaPage` (Server Component). HU_NUMBER: HU32 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Detalle Oferta ---END_FRAME---

---START_ESTIMATION--- 2.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Necesitas crear la página principal que mostrará los detalles de una oferta de tutoría. Esta página actuará como un orquestador, obteniendo los datos y pasándolos a los componentes de UI correspondientes.
Objetivo: Implementar `src/app/ofertas/[id]/page.tsx` como un Server Component que obtenga los detalles de la oferta, maneje el estado de "no encontrado" y renderice los componentes `Header`, `OfferInfoSection` y `PricingContactSection` con las props adecuadas.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/ofertas/[id]/page.tsx`
- `src/components/shared/Header/Header.tsx` (consumido)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- La página (`page.tsx`) debe ser un Server Component asíncrono.
- Definir la interfaz `OfferDetailsPageProps` para `params: { id: string }`.
- Importar `HeaderComponent`, `OfferInfoSection`, `PricingContactSection`.
- Utilizar `getOfferDetails(params.id)` (implementado en Tarea 7) para obtener los datos.
- Implementar manejo de `notFound()` de Next.js si la oferta no existe.
- Estructurar el layout principal con un `div` contenedor, el `HeaderComponent` y una sección `<main>` que use un diseño de cuadrícula flexible (ej. `lg:grid-cols-3` o similar) para acomodar `OfferInfoSection` y `PricingContactSection`.
- Pasar las props requeridas a `OfferInfoSection` (`title`, `modality`, `description`, `categories`, `availability`).
- Pasar solo `pricePerHour` a `PricingContactSection`. **Asegurarse de NO pasar información del tutor ni related contact info.**

Validaciones:
- Redirección a 404 si `getOfferDetails` retorna `null`.

Diseño:
- Referencia al Frame `E. Detalle Oferta` para la disposición general de los componentes.
- Aplicar estilos de Tailwind CSS 4 para el layout principal, asegurando un diseño responsivo.

Integración:
- Consumir la función `getOfferDetails(offerId: string)` para el fetching de datos.
- Pasar `DetallesOfertaDto` (o sus subconjuntos) a los componentes hijos.

Criterios de Aceptación Técnica:
- La página `DetallesOfertaPage` se renderiza como un Server Component.
- La página carga los datos de la oferta mediante la función `getOfferDetails`.
- Si la oferta no se encuentra, se redirige a la página 404 de Next.js.
- La información de la oferta (título, modalidad, descripción, categorías, disponibilidad, precio) se pasa correctamente a los componentes hijos.
- La información del tutor (excepto el precio) no se renderiza en la UI, siguiendo las observaciones de la HU.
---END_PROMPT---

---START_COMMIT--- HU32-T2 feat(ofertas): implementar DetallesOfertaPage ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Creación y maquetación del `HeaderComponent` (botón 'Volver' y logo). HU_NUMBER: HU32 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Detalle Oferta ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Necesitas crear un componente de cabecera reutilizable que incluya un botón de 'Volver' y el logo de la aplicación, siguiendo un diseño específico.
Objetivo: Implementar el `HeaderComponent` en `src/components/shared/Header/Header.tsx`, asegurando que muestre el botón 'Volver' a la izquierda y el logo 'PoliTutorias' a la derecha, y que sea estilizado con Tailwind CSS 4.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/shared/Header/Header.tsx`
- `src/components/shared/BackButton/BackButton.tsx` (si se decide modularizar el botón)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- `HeaderComponent` puede ser un Server Component si el botón 'Volver' es un Client Component hijo, o el `HeaderComponent` puede ser un Client Component si contiene la lógica del botón directamente.
- Si el botón es un componente separado (`BackButton`), este debe ser un Client Component (`'use client'`).
- La estructura HTML/JSX debe usar flexbox para alinear el botón y el logo.
- El logo 'PoliTutorias' debe ser un elemento de texto o una imagen placeholder.

Validaciones: Ninguna funcional en esta tarea.

Diseño:
- Replicar el diseño de la cabecera del Frame `E. Detalle Oferta`.
- Aplicar estilos de Tailwind CSS 4 para tipografía, colores, espaciado y alineación.
- Asegurar que el componente sea responsivo.

Integración:
- El botón 'Volver' será integrado con la lógica de navegación en la Tarea 6.

Criterios de Aceptación Técnica:
- El `HeaderComponent` se renderiza correctamente en la parte superior de la página.
- El botón 'Volver' se posiciona a la izquierda y el logo 'PoliTutorias' a la derecha.
- Los estilos visuales coinciden con el frame de Figma.
---END_PROMPT---

---START_COMMIT--- HU32-T3 feat(ui): crear HeaderComponent con boton 'Volver' y logo ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Creación y maquetación del `OfferInfoSection` (detalles de la oferta principal). HU_NUMBER: HU32 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Detalle Oferta ---END_FRAME---

---START_ESTIMATION--- 2H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Necesitas crear una sección de UI que muestre los detalles principales de una oferta de tutoría, incluyendo título, modalidad, descripción, categorías y disponibilidad.
Objetivo: Implementar el `OfferInfoSection` en `src/components/offers/OfferInfoSection/OfferInfoSection.tsx`, que reciba los datos de la oferta como props y los maquete siguiendo el diseño del frame.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/offers/OfferInfoSection/OfferInfoSection.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, react-icons (para el icono de libro).

Estructura:
- El componente debe ser un Server Component (o un Client Component si no tiene interacciones específicas y es puramente presentacional).
- Definir una interfaz de props para `OfferInfoSection` que incluya:
    - `title: string`
    - `modality: string`
    - `description: string`
    - `categories: { name: string }[]`
    - `availability: { day: string, time: string }[]`
- Incluir un icono de libro (ej. de `react-icons`) junto al título.
- Iterar sobre `categories` para mostrar cada uno como un "tag" o "badge".
- Iterar sobre `availability` para mostrar cada día y horario.

Validaciones: Ninguna en esta tarea.

Diseño:
- Replicar la sección principal de información del Frame `E. Detalle Oferta`.
- Aplicar estilos de Tailwind CSS 4 para el icono, fuentes, colores, espaciado, y el diseño de los tags/badges y la disponibilidad.
- Asegurar que el componente sea responsivo.

Integración:
- Recibirá los datos de la oferta como props de `DetallesOfertaPage`.

Criterios de Aceptación Técnica:
- El componente `OfferInfoSection` renderiza el título, modalidad, descripción, categorías y disponibilidad.
- Las categorías y la disponibilidad se muestran dinámicamente a partir de los arrays de props.
- El diseño y los estilos coinciden con el frame de Figma.
---END_PROMPT---

---START_COMMIT--- HU32-T4 feat(ofertas): crear OfferInfoSection para detalles de oferta ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Creación y maquetación del `PricingContactSection` (solo precio por hora). HU_NUMBER: HU32 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Detalle Oferta ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Necesitas crear una sección de UI para el panel lateral que muestre el precio por hora de la tutoría, excluyendo cualquier información de contacto o sobre el tutor, según las observaciones de la HU.
Objetivo: Implementar el `PricingContactSection` en `src/components/offers/PricingContactSection/PricingContactSection.tsx` para mostrar únicamente el 'Precio por hora' de la oferta.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/offers/PricingContactSection/PricingContactSection.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- El componente debe ser un Server Component (o Client Component si no tiene interacciones específicas y es puramente presentacional).
- Definir una interfaz de props para `PricingContactSection` que contenga únicamente `pricePerHour: number`.
- La estructura HTML/JSX debe incluir un título "Precio por hora" y el valor del precio formateado (ej. `$10`).
- **Es crucial NO incluir ningún elemento o lógica relacionada con "Sobre el Tutor", "Experiencia" o "Contactar por WhatsApp" en esta tarea.**

Validaciones: Ninguna en esta tarea.

Diseño:
- Replicar el diseño del panel lateral para la sección de precio del Frame `E. Detalle Oferta`.
- Aplicar estilos de Tailwind CSS 4 para fuentes, colores, espaciado y el formato del precio.
- Asegurar que el componente sea responsivo.

Integración:
- Recibirá `pricePerHour` como prop de `DetallesOfertaPage`.

Criterios de Aceptación Técnica:
- El componente `PricingContactSection` muestra correctamente el "Precio por hora" con su valor.
- **No** se renderiza ningún elemento o lógica relacionada con el contacto por WhatsApp.
- Los estilos visuales coinciden con el frame de Figma para la sección del precio.
---END_PROMPT---

---START_COMMIT--- HU32-T5 feat(ofertas): crear PricingContactSection con solo el precio ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Implementación de la lógica de navegación para el botón 'Volver'. HU_NUMBER: HU32 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: El `HeaderComponent` ya tiene un botón 'Volver' maquetado. Ahora necesitas añadir la funcionalidad para que, al hacer clic, el usuario sea redirigido a la página anterior o a la página principal de listado de ofertas.
Objetivo: Implementar la lógica de navegación en el botón 'Volver' dentro de `src/components/shared/Header/Header.tsx` (o un `BackButton` hijo si existe), utilizando `useRouter` de Next.js para volver a la página previa.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/shared/Header/Header.tsx`
- `src/components/shared/BackButton/BackButton.tsx` (si se usa un componente separado para el botón)

Tecnologías: Next.js 16, React, TypeScript.

Estructura:
- El componente que contiene el botón ('HeaderComponent' o 'BackButton') debe ser un Client Component (con `'use client'` directiva).
- Importar `useRouter` de `next/navigation`.
- Instanciar `useRouter` dentro del componente.
- Asignar un manejador de eventos `onClick` al botón que llame a `router.back()`.

Validaciones:
- La navegación debe funcionar correctamente al hacer clic en el botón.

Diseño: Ninguno (solo lógica).

Integración:
- Uso del hook `useRouter` de Next.js.

Criterios de Aceptación Técnica:
- Al hacer clic en el botón 'Volver', el usuario es redirigido a la URL anterior en el historial (o a `/ofertas` si es la primera página).
- La navegación se realiza sin recargar la página completa.
---END_PROMPT---

---START_COMMIT--- HU32-T6 feat(nav): implementar logica de navegacion para boton 'Volver' ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Implementación de la función `getOfferDetails` (Server Component fetch con seed data). HU_NUMBER: HU32 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La página de detalles de la oferta necesita una forma de obtener los datos de la oferta. Inicialmente, esta función debe simular una llamada a la API utilizando datos de seed, con el código para la integración real del backend ya presente pero comentado.
Objetivo: Crear la función asíncrona `getOfferDetails(offerId: string)` dentro de `src/app/ofertas/[id]/page.tsx` que, por ahora, retorne el `offerDetailsSeed` de la Tarea 1, incluyendo una simulación de delay.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/ofertas/[id]/page.tsx`
- `src/seed/OfferDetailsSeedData.ts` (consumido)
- `src/interfaces/offers/DetallesOfertaDto.ts` (consumido)

Tecnologías: Next.js 16, TypeScript.

Estructura:
- La función `async function getOfferDetails(offerId: string)` debe definirse en `src/app/ofertas/[id]/page.tsx`.
- Importar `offerDetailsSeed` de `src/seed/OfferDetailsSeedData.ts` y `DetallesOfertaDto` de `src/interfaces/offers/DetallesOfertaDto.ts`.
- La función debe simular una latencia de red (`await new Promise(resolve => setTimeout(resolve, 500));`) antes de retornar el `offerDetailsSeed`.
- **El código para la llamada `fetch` al backend real (usando `process.env.NEXT_PUBLIC_API_URL` y manejando 404, etc.) debe estar presente y completamente comentado.**
- Documentar las estructuras de respuesta esperadas para el `fetch` real.

Validaciones:
- La función debe retornar el seed data.

Diseño: Ninguno (solo lógica de datos).

Integración:
- Consumir el `offerDetailsSeed` y el DTO de la Tarea 1.
- Contener el código comentado para `fetch` a `GET /api/ofertas/:id`.

Criterios de Aceptación Técnica:
- La función `getOfferDetails` existe y está implementada en `app/ofertas/[id]/page.tsx`.
- Al ser llamada, `getOfferDetails` retorna el `offerDetailsSeed` de manera consistente.
- El código de la petición `fetch` al backend real está presente y completamente comentado.
- El código comentado incluye manejo de casos de éxito (HTTP 200) y error (HTTP 404, otros errores).
---END_PROMPT---

---START_COMMIT--- HU32-T7 feat(api): implementar getOfferDetails con seed data y mock de fetch ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 8 TASK_TITLE: Integración de `getOfferDetails` con el endpoint real del backend. HU_NUMBER: HU32 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La función `getOfferDetails` ya contiene el código para realizar la petición `fetch` al backend, pero está comentado. Ahora es el momento de activar esta integración para consumir datos reales.
Objetivo: Descomentar el bloque de código de la petición `fetch` en `getOfferDetails` y deshabilitar el uso del seed data, permitiendo que la página cargue los detalles de la oferta directamente desde el backend.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/ofertas/[id]/page.tsx`

Tecnologías: Next.js 16, TypeScript.

Estructura:
- Abrir `src/app/ofertas/[id]/page.tsx` y localizar la función `getOfferDetails`.
- Comentar o eliminar la línea que retorna `offerDetailsSeed` y la simulación de delay.
- Descomentar el bloque `try-catch` que realiza la petición `fetch` al endpoint `GET /api/ofertas/:id`.
- Asegurarse de que `process.env.NEXT_PUBLIC_API_URL` esté correctamente configurado y sea utilizado.
- Verificar el manejo de `res.status === 404` para retornar `null`.

Validaciones:
- Probar la página en un entorno de desarrollo donde el backend esté disponible.
- Asegurarse de que los datos mostrados son los que provienen del backend.

Diseño: Ninguno (solo lógica de integración).

Integración:
- Realizar la llamada `fetch` al endpoint `GET ${process.env.NEXT_PUBLIC_API_URL}/api/ofertas/${offerId}`.
- Manejar la respuesta y los posibles errores de la API.

Criterios de Aceptación Técnica:
- La petición `fetch` se ejecuta correctamente hacia el endpoint real del backend (`/api/ofertas/:id`).
- La página `DetallesOfertaPage` muestra los datos proporcionados por el backend.
- La estructura de la respuesta del backend coincide con la esperada (`DetallesOfertaDto`).
- El manejo de errores (ej. 404 Not Found) funciona correctamente al integrar con el backend.
---END_PROMPT---

---START_COMMIT--- HU32-T8 feat(api): integrar getOfferDetails con endpoint real del backend ---END_COMMIT---
---END_TASK---