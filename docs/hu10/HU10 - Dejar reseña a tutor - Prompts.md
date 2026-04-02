---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seeds para datos de `Tutoría` y `Review`. HU_NUMBER: HU10 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Necesitamos datos de prueba para simular las respuestas del backend, lo que nos permitirá desarrollar y probar el frontend de la funcionalidad de reseñas de tutorías de forma independiente.

Objetivo: Crear archivos de seed que simulen los datos de `Tutoría` (incluyendo su estado de reseña) y `Review` para el desarrollo y pruebas del frontend.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/seed/TutoriaSeedData.ts`
- `src/seed/ReviewSeedData.ts`
- `src/interfaces/tutoria-tipo/TutoriaDetailWithReviewDto.ts`
- `src/interfaces/review-tipo/ReviewEntity.ts`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
- `src/interfaces/tutoria-tipo/TutoriaDetailWithReviewDto.ts`: Definir la interfaz para los detalles de una tutoría, incluyendo un campo `review?: ReviewEntity | null`.
- `src/interfaces/review-tipo/ReviewEntity.ts`: Definir la interfaz para una entidad de reseña (id, rating, comment, tutoriaId, studentId, tutorId, createdAt, etc.).
- `src/seed/TutoriaSeedData.ts`: Un array de objetos `TutoriaDetailWithReviewDto` que incluyan:
    - Al menos una tutoría "Completada" sin un objeto `review` asociado.
    - Al menos una tutoría "Completada" con un objeto `review` asociado.
    - (Opcional) Ejemplos de otras tutorías en diferentes estados para contextualizar la página de historial.
- `src/seed/ReviewSeedData.ts`: Un objeto `ReviewEntity` de ejemplo que simule una respuesta exitosa al crear una reseña.
- Todos los archivos de seed deben exportar las funciones o arrays/objetos necesarios.

Validaciones: Ninguna en esta tarea.

Diseño: Ninguno.

Integración: Estos seeds serán utilizados por los Server Actions y componentes para simular la interacción con el backend.

Criterios de Aceptación Técnica:
- El seed `TutoriaSeedData.ts` contiene al menos una tutoría "Completada" sin reseña y una con reseña.
- La estructura de los datos del seed `TutoriaSeedData.ts` es consistente con `GET /api/tutorias/:id`.
- El seed `ReviewSeedData.ts` contiene un objeto que simula la respuesta de `POST /api/reviews`.
- Todas las interfaces de TypeScript están definidas para los objetos del seed.
---END_PROMPT---

---START_COMMIT--- HU10-T01 chore(data): crear seeds para tutorías y reseñas ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Implementación del componente `StarRatingInput`. HU_NUMBER: HU10 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Historial (Calificar Tutoría) ---END_FRAME---

---START_ESTIMATION--- 0.8H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La interfaz de calificación de tutores requiere un método visual e interactivo para que los estudiantes seleccionen una calificación de 1 a 5 estrellas.

Objetivo: Desarrollar un componente de interfaz de usuario reutilizable `StarRatingInput` para la selección visual de calificaciones en estrellas, que permita al usuario elegir de 1 a 5 estrellas.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/components/ui/StarRatingInput/StarRatingInput.tsx` (Client Component)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
- Crear el componente `StarRatingInput` en `src/components/ui/StarRatingInput/StarRatingInput.tsx`.
- Definir props para el componente:
    - `rating: number` (valor actual de la calificación).
    - `onRatingChange: (rating: number) => void` (callback al cambiar la calificación).
    - `readOnly?: boolean` (opcional, para modo de visualización sin interacción).
    - `className?: string` (para estilos adicionales).
- Usar un SVG o un icono de estrella de `react-icons` (por ejemplo, `FaStar` o `FaRegStar`) para representar las 5 estrellas.
- Implementar la lógica para:
    - Renderizar 5 estrellas, mostrando las estrellas seleccionadas como "llenas" y las no seleccionadas como "vacías".
    - Manejar eventos `onClick` en cada estrella para actualizar el `rating` y disparar `onRatingChange`.
    - Opcionalmente, implementar `onMouseEnter`/`onMouseLeave` para un efecto de hover que previsualice la selección.
    - Asegurar que el componente funcione en modo `readOnly` si la prop está en `true`, mostrando la calificación sin permitir interacción.

Validaciones:
- La calificación debe ser un número entero entre 1 y 5 cuando se selecciona.
- El componente debe reflejar visualmente la calificación actual de 0 a 5.

Diseño:
- El componente debe renderizar 5 estrellas con estilos claros para los estados "llena" y "vacía".
- Usar Tailwind CSS 4 para el tamaño, color, espaciado y efectos de interacción de las estrellas.
- El diseño debe ser responsive y coherente con el frame "E. Historial (Calificar Tutoría)".

Integración: Este componente será integrado en `ModalCalificarTutoría` y `SecciónTuReseña`.

Criterios de Aceptación Técnica:
- El componente muestra 5 estrellas.
- Al hacer clic, selecciona la estrella correspondiente y todas las anteriores.
- El componente permite cambiar la selección de estrellas.
- El `onRatingChange` se dispara con el valor numérico de la calificación (1-5).
- El componente se renderiza correctamente con los estilos definidos.
- El modo `readOnly` funciona correctamente, mostrando la calificación sin permitir interacción.
---END_PROMPT---

---START_COMMIT--- HU10-T02 feat(ui): implementar componente StarRatingInput ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Implementación del componente `ComentarioTextArea` con validación. HU_NUMBER: HU10 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Historial (Calificar Tutoría) ---END_FRAME---

---START_ESTIMATION--- 0.8H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Los estudiantes necesitan un campo de texto para agregar comentarios opcionales a sus reseñas, con un límite de caracteres claro para mantener la concisión.

Objetivo: Desarrollar un componente de área de texto reutilizable `ComentarioTextArea` para el comentario de la reseña, que incluya un contador de caracteres y valide el límite de 300 caracteres.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/components/ui/ComentarioTextArea/ComentarioTextArea.tsx` (Client Component)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
- Crear el componente `ComentarioTextArea` en `src/components/ui/ComentarioTextArea/ComentarioTextArea.tsx`.
- Definir props para el componente:
    - `value: string` (valor actual del campo de texto).
    - `onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void` (callback al cambiar el texto).
    - `maxLength: number` (límite máximo de caracteres, 300 para esta HU).
    - `placeholder: string` (texto de marcador de posición).
    - `id?: string` y `name?: string` (para accesibilidad y uso en formularios).
    - `readOnly?: boolean` (opcional, para modo de visualización sin interacción).
    - `className?: string` (para estilos adicionales).
- Usar un `<textarea>` estándar para la entrada de texto.
- Implementar un contador de caracteres que se muestre debajo del `textarea` en el formato "X/Y" (ej. "0/300").
- El contador debe actualizarse dinámicamente a medida que el usuario escribe.
- Restringir la entrada de texto para que el usuario no pueda exceder el `maxLength`.

Validaciones:
- El componente debe evitar que el usuario ingrese más de `maxLength` caracteres.
- El contador debe mostrar `maxLength/maxLength` cuando se alcanza el límite.

Diseño:
- El `textarea` debe tener estilos consistentes con la guía de diseño (ej. bordes, padding, tamaño de fuente).
- El contador de caracteres debe ser visible y claro, usando Tailwind CSS 4 para el estilado.
- El diseño debe ser responsive y consistente con el frame "E. Historial (Calificar Tutoría)".

Integración: Este componente será integrado en `ModalCalificarTutoría`.

Criterios de Aceptación Técnica:
- El componente muestra un `textarea`.
- El contador de caracteres se actualiza correctamente.
- El ingreso de texto se restringe a 300 caracteres.
- El contador muestra "300/300" al alcanzar el límite.
---END_PROMPT---

---START_COMMIT--- HU10-T03 feat(ui): implementar ComentarioTextArea con contador ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Maquetación y lógica de estado del `ModalCalificarTutoría`. HU_NUMBER: HU10 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Historial (Calificar Tutoría) ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Necesitamos un modal dedicado para que los estudiantes puedan ingresar su calificación y comentario para una tutoría. Este modal debe contener los componentes de `StarRatingInput` y `ComentarioTextArea` y gestionar su estado.

Objetivo: Crear la estructura visual del modal "Califica tu tutoría", integrar los componentes `StarRatingInput` y `ComentarioTextArea`, y desarrollar la lógica de estado local para la calificación y el comentario, incluyendo la habilitación/deshabilitación del botón "Enviar Reseña".

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/components/modals/ModalCalificarTutoria/ModalCalificarTutoria.tsx` (Client Component)
- `src/interfaces/review-tipo/ReviewFormData.ts` (para definir el formato de los datos del formulario)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
- Crear el componente `ModalCalificarTutoria` en `src/components/modals/ModalCalificarTutoria/ModalCalificarTutoria.tsx`.
- Definir props para el modal:
    - `isOpen: boolean` (para controlar la visibilidad del modal).
    - `onClose: () => void` (callback para cerrar el modal).
    - `onSubmit: (data: ReviewFormData) => void` (callback para manejar el envío de la reseña).
    - `tutoriaId: string` (ID de la tutoría que se va a calificar).
- Maquetar la estructura del modal:
    - Título: "Califica tu tutoría".
    - Área para el `StarRatingInput`.
    - Área para el `ComentarioTextArea` con `maxLength` de 300 caracteres.
    - Botones: "Enviar Reseña" y "Cancelar".
- Implementar la lógica de estado local utilizando `useState`:
    - `rating` (inicialmente 0).
    - `comment` (inicialmente vacío).
- Pasar las props `rating`, `onRatingChange`, `value`, `onChange`, `maxLength`, `placeholder` a `StarRatingInput` y `ComentarioTextArea` respectivamente.
- Controlar la habilitación del botón "Enviar Reseña":
    - Inicialmente deshabilitado (estilo gris).
    - Habilitar solo cuando `rating` sea mayor que 0 (al menos 1 estrella seleccionada), independientemente del campo de comentario.
- El botón "Cancelar" debe invocar `onClose()`.

Validaciones:
- El botón "Enviar Reseña" debe estar deshabilitado si `rating` es 0.
- El `ComentarioTextArea` debe restringir a 300 caracteres.

Diseño:
- El diseño del modal debe ser consistente con el frame "E. Historial (Calificar Tutoría)".
- Usar Tailwind CSS 4 para el diseño responsivo, colores, tipografía y espaciado de todos los elementos dentro del modal.
- El botón "Enviar Reseña" debe cambiar visualmente de deshabilitado a habilitado.

Integración: Este modal será abierto desde `TutoríaCard` y `ModalDetalleTutoría`. Consumirá `StarRatingInput` y `ComentarioTextArea`.

Criterios de Aceptación Técnica:
- El modal se renderiza con el título, `StarRatingInput`, `ComentarioTextArea` y los botones.
- El `StarRatingInput` y `ComentarioTextArea` funcionan y actualizan el estado local.
- El botón "Enviar Reseña" está deshabilitado si no hay estrellas seleccionadas.
- El botón "Enviar Reseña" se habilita cuando se selecciona al menos una estrella.
- El contador de caracteres de `ComentarioTextArea` funciona correctamente.
---END_PROMPT---

---START_COMMIT--- HU10-T04 feat(modal): maquetar ModalCalificarTutoria y estado ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Implementación del Server Action `submitReviewAction` con seed data. HU_NUMBER: HU10 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Para permitir el envío de reseñas desde el frontend, necesitamos una forma de interactuar con el "backend". En esta etapa inicial, simularemos la respuesta del backend utilizando datos de seed.

Objetivo: Implementar el Server Action `submitReviewAction` que, en esta fase de desarrollo, retornará un seed data simulando el éxito de la operación. El código de la llamada `fetch` al backend real debe estar presente pero COMENTADO.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/actions/review-funcionalidad/submitReviewAction.ts` (Server Action)
- `src/interfaces/review-tipo/ReviewEntity.ts` (para la estructura de la respuesta)
- `src/interfaces/review-tipo/SubmitReviewData.ts` (nueva interfaz para la entrada de datos del Server Action)
- `src/seed/ReviewSeedData.ts` (para el seed data a retornar)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
- Crear el archivo `src/actions/review-funcionalidad/submitReviewAction.ts` y agregar la directiva `'use server'`.
- Definir la interfaz `SubmitReviewData` con campos como `tutoriaId: string`, `rating: number`, `comment?: string`.
- Importar el objeto `ReviewEntity` de `src/interfaces/review-tipo/ReviewEntity.ts` y el seed data de `src/seed/ReviewSeedData.ts`.
- Implementar la función `submitReviewAction(data: SubmitReviewData)`:
    - **Fase de desarrollo (activa):** Retornar un objeto `{ success: true, message: "Reseña enviada. Gracias por calificar tu tutoría.", data: { ...seedData, tutoriaId: data.tutoriaId, rating: data.rating, comment: data.comment || null } }`. Adaptar el seed data para reflejar la entrada actual.
    - **Fase de integración (COMENTADO):** Escribir el bloque completo de la llamada `fetch` al endpoint `POST /api/reviews`.
        - Incluir `method: 'POST'`, `headers` (`Content-Type: application/json`, `Authorization: Bearer <token>`).
        - Incluir `body: JSON.stringify(data)`.
        - Manejo de `response.ok` y errores (parsear `response.json()` para mensajes de error).
        - Añadir `revalidatePath('/historial');` dentro del bloque de éxito del `fetch` (comentado).
    - Incluir un bloque `try-catch` para manejar errores y retornar `{ success: false, message: error.message }`.

Validaciones: Ninguna en esta tarea, el Server Action recibe los datos ya validados por el cliente.

Diseño: Ninguno.

Integración: Este Server Action será invocado por `ModalCalificarTutoría`.

Criterios de Aceptación Técnica:
- El Server Action `submitReviewAction` está creado y marcado con `'use server'`.
- La función retorna `{ success: true, message: "...", data: seedDataModificado }` cuando se invoca.
- El código de la llamada `fetch` al endpoint `POST /api/reviews` está presente y COMENTADO.
- La estructura de la respuesta simulada es consistente con `ReviewEntity`.
- Se incluye `revalidatePath('/historial')` dentro del bloque `fetch` comentado.
---END_PROMPT---

---START_COMMIT--- HU10-T05 feat(server-action): crear submitReviewAction con seed ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Adaptación de `TutoríaCard` (botón 'Calificar' y apertura de modales). HU_NUMBER: HU10 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Historial. ---END_FRAME---
---START_FRAME--- E. Historial (Detalle Tutoría Completada). ---END_FRAME---

---START_ESTIMATION--- 0.9H ---END_ESTIMATION---

---START_PROMPT---
Contexto: La `TutoríaCard` en la pantalla 'Historial de Tutorías' necesita indicar cuándo una tutoría está "Completada" y si ya fue calificada o no, para ofrecer la opción de calificar o abrir el detalle.

Objetivo: Modificar el componente `TutoríaCard` para que, cuando una tutoría esté en estado "Completada" y aún no haya sido calificada, muestre un botón "Calificar" interactivo. Además, configurar la lógica para abrir `ModalCalificarTutoría` o `ModalDetalleTutoría` al hacer clic.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/components/tutorias/TutoriaCard/TutoriaCard.tsx` (Client Component)
- `src/app/historial/page.tsx` (para orquestar la apertura de modales)
- `src/interfaces/tutoria-tipo/TutoriaDetailWithReviewDto.ts` (para asegurar la información de la reseña en la tarjeta)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
- Abrir `src/components/tutorias/TutoriaCard/TutoriaCard.tsx`.
- Ajustar las props de `TutoríaCard` para recibir un objeto `tutoria` que incluya un campo `review?: ReviewEntity | null` (utilizando la interfaz `TutoriaDetailWithReviewDto`).
- Implementar renderizado condicional del botón "Calificar":
    - Mostrar un botón con el texto "Calificar" si `tutoria.status === 'Completada'` y `!tutoria.review` (no hay reseña asociada).
    - El botón debe ser visualmente interactivo (ej. oscuro, con efecto hover).
    - Ocultar este botón en cualquier otro caso (tutorías en otros estados, o "Completada" pero ya con reseña).
- Configurar la apertura de modales:
    - Al hacer clic en el botón "Calificar" de la tarjeta, se debe invocar una función para abrir `ModalCalificarTutoria` (pasando el `tutoriaId`).
    - Al hacer clic en el área general de la tarjeta (si es "Completada" y no calificada), se debe invocar una función para abrir `ModalDetalleTutoria` (pasando el `tutoriaId`).
- La orquestación de la apertura de modales (`ModalCalificarTutoria` y `ModalDetalleTutoria`) probablemente se realizará en `src/app/historial/page.tsx`, donde se gestionarán los estados `isOpen` y se pasarán los `tutoriaId`s.

Validaciones:
- El botón "Calificar" solo es visible bajo las condiciones especificadas.

Diseño:
- El botón "Calificar" debe seguir la estética del frame "E. Historial.".
- El estilo de la tarjeta debe adaptarse a la presencia o ausencia de la reseña, según se especifica en los frames.
- Usar Tailwind CSS 4 para el estilado.

Integración: Depende de los datos de seed de tutorías (Tarea 1) y los componentes `ModalCalificarTutoria` (Tarea 4) y `ModalDetalleTutoria` (existente o asumido para esta integración).

Criterios de Aceptación Técnica:
- El botón "Calificar" aparece en `TutoríaCard` para tutorías "Completadas" sin reseña.
- El botón "Calificar" no aparece en otros casos.
- Hacer clic en el botón "Calificar" de la tarjeta abre `ModalCalificarTutoría`.
- Hacer clic en el área general de una tarjeta "Completada" sin reseña abre `ModalDetalleTutoría`.
---END_PROMPT---

---START_COMMIT--- HU10-T06 feat(component): adaptar TutoriaCard para calificar ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Desarrollo de `SecciónTuReseña` y su integración en `ModalDetalleTutoría`. HU_NUMBER: HU10 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Historial (Detalle Tutoría Calificada) ---END_FRAME---

---START_ESTIMATION--- 0.9H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Cuando una tutoría ya ha sido calificada, el modal de detalle de la tutoría no debe mostrar la opción de calificar nuevamente, sino la reseña ya enviada.

Objetivo: Crear un componente `SecciónTuReseña` para mostrar una reseña ya existente e integrar este componente dentro de `ModalDetalleTutoría`. La `ModalDetalleTutoría` deberá mostrar esta sección si la tutoría ya fue calificada, y ocultar el botón "Calificar" en ese caso, dejando solo el botón "Cerrar".

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/components/tutorias/SeccionTuResena/SeccionTuResena.tsx` (Client Component)
- `src/components/modals/ModalDetalleTutoria/ModalDetalleTutoria.tsx` (Client Component - asumiendo que ya existe)
- `src/components/ui/StarRatingInput/StarRatingInput.tsx` (para reutilizar en modo `readOnly`)
- `src/interfaces/review-tipo/ReviewEntity.ts`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
- Crear el componente `SecciónTuReseña` en `src/components/tutorias/SeccionTuResena/SeccionTuResena.tsx`.
    - Aceptar props como `rating: number` y `comment?: string | null`.
    - Reutilizar el componente `StarRatingInput` en modo `readOnly` para mostrar las estrellas.
    - Renderizar el texto del comentario debajo de las estrellas, si existe.
    - Añadir un título o subtítulo como "Tu Reseña".
- Modificar `src/components/modals/ModalDetalleTutoria/ModalDetalleTutoria.tsx` (asumiendo que ya existe):
    - Ajustar las props para recibir los detalles completos de la tutoría, incluyendo `tutoria.review?: ReviewEntity | null`.
    - Implementar la lógica condicional en la parte inferior del modal:
        - Si `tutoria.review` existe (la tutoría ya fue calificada), mostrar `SecciónTuReseña` (pasando `tutoria.review.rating` y `tutoria.review.comment`).
        - En este caso, el botón "Calificar" debe ser ocultado, y solo el botón "Cerrar" debe estar visible y habilitado.
        - Si `tutoria.review` no existe y `tutoria.status === 'Completada'`, mostrar el botón "Calificar" (interactivo).
        - Si la tutoría no está "Completada", no mostrar ni "Calificar" ni "Tu Reseña".
    - Configurar el botón "Calificar" (si es visible) para abrir `ModalCalificarTutoria` (pasando el `tutoriaId`).

Validaciones:
- La visualización de "Tu Reseña" o el botón "Calificar" depende estrictamente del estado de la reseña de la tutoría.

Diseño:
- `SecciónTuReseña` debe ser un bloque claro y bien estilizado, consistente con el frame "E. Historial (Detalle Tutoría Calificada)".
- Los estilos de `ModalDetalleTutoría` deben adaptarse para acomodar `SecciónTuReseña` o el botón "Calificar" de manera fluida, usando Tailwind CSS 4.
- El botón "Calificar" y "Cerrar" deben seguir los estilos definidos en los frames.

Integración: `SecciónTuReseña` consume `StarRatingInput`. `ModalDetalleTutoría` consumirá `SecciónTuReseña` y `ModalCalificarTutoria`.

Criterios de Aceptación Técnica:
- El componente `SecciónTuReseña` muestra correctamente las estrellas y el comentario.
- `ModalDetalleTutoría` muestra `SecciónTuReseña` si la tutoría fue calificada.
- `ModalDetalleTutoría` oculta el botón "Calificar" si la tutoría ya fue calificada.
- `ModalDetalleTutoría` solo muestra el botón "Cerrar" habilitado para tutorías calificadas.
- Si la tutoría está "Completada" y no calificada, `ModalDetalleTutoría` muestra el botón "Calificar".
---END_PROMPT---

---START_COMMIT--- HU10-T07 feat(ui): implementar SeccionTuResena en ModalDetalleTutoria ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 8 TASK_TITLE: Implementación del Server Action `getTutoriaDetailsAction` con seed data. HU_NUMBER: HU10 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT---
Contexto: El `ModalDetalleTutoría` necesita cargar los detalles completos de una tutoría, incluyendo la información de si ya ha sido calificada o no, para renderizar la interfaz correcta.

Objetivo: Implementar un Server Action `getTutoriaDetailsAction` para obtener los detalles de una tutoría específica, incluyendo su reseña si existe. En esta fase, el Server Action utilizará datos de seed y tendrá el código para la llamada `fetch` al backend COMENTADO.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/actions/tutoria-funcionalidad/getTutoriaDetailsAction.ts` (Server Action)
- `src/seed/TutoriaSeedData.ts` (para el seed data a retornar)
- `src/interfaces/tutoria-tipo/TutoriaDetailWithReviewDto.ts`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
- Crear el archivo `src/actions/tutoria-funcionalidad/getTutoriaDetailsAction.ts` y agregar la directiva `'use server'`.
- Importar el array de tutorías (con y sin reseña) de `src/seed/TutoriaSeedData.ts`.
- Implementar la función `getTutoriaDetailsAction(tutoriaId: string)`:
    - **Fase de desarrollo (activa):** Buscar en el seed data de tutorías el objeto con el `tutoriaId` correspondiente.
        - Si se encuentra, retornar `{ success: true, data: tutoriaDetails }`.
        - Si no se encuentra, retornar `{ success: false, message: "Tutoría no encontrada." }`.
    - **Fase de integración (COMENTADO):** Escribir el bloque completo de la llamada `fetch` al endpoint `GET /api/tutorias/:id`.
        - Incluir `method: 'GET'`, `headers` (`Content-Type: application/json`, `Authorization: Bearer <token>`).
        - Manejo de `response.ok` y errores.
    - Incluir un bloque `try-catch` para manejar errores.

Validaciones: Ninguna en esta tarea.

Diseño: Ninguno.

Integración: Este Server Action será invocado por `ModalDetalleTutoría`.

Criterios de Aceptación Técnica:
- El Server Action `getTutoriaDetailsAction` está creado y marcado con `'use server'`.
- La función retorna correctamente los detalles de una tutoría del seed data.
- La respuesta incluye el campo `review` (objeto o `null`) según el seed.
- El código de la llamada `fetch` al endpoint `GET /api/tutorias/:id` está presente y COMENTADO.
---END_PROMPT---

---START_COMMIT--- HU10-T08 feat(server-action): crear getTutoriaDetailsAction con seed ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 9 TASK_TITLE: Integración de `submitReviewAction` en `ModalCalificarTutoría` y manejo de feedback. HU_NUMBER: HU10 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.8H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Una vez que el estudiante ha seleccionado su calificación y/o comentario en el `ModalCalificarTutoría`, la información debe ser enviada al "backend" y el usuario debe recibir una confirmación visual.

Objetivo: Integrar el Server Action `submitReviewAction` en el `ModalCalificarTutoría` para manejar el envío de la reseña. Esto incluye llamar al Server Action, procesar su respuesta (éxito o error), cerrar el modal, mostrar una notificación `ToastNotification` y revalidar la ruta `/historial`.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/components/modals/ModalCalificarTutoria/ModalCalificarTutoria.tsx` (Client Component)
- `src/actions/review-funcionalidad/submitReviewAction.ts`
- `src/components/ui/ToastNotification/ToastNotification.tsx` (Asumiendo su existencia para mostrar el feedback)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
- Abrir `src/components/modals/ModalCalificarTutoria/ModalCalificarTutoria.tsx`.
- Modificar el handler del botón "Enviar Reseña" para que:
    - Recolecte el `rating` y `comment` del estado local, junto con el `tutoriaId` recibido por props.
    - Invoque el Server Action `submitReviewAction` con estos datos.
    - Utilice `await` para esperar la respuesta del Server Action.
- Manejar la respuesta del Server Action:
    - Si la respuesta es `{ success: true, ... }`:
        - Llamar a `onClose()` para cerrar el modal.
        - Mostrar un `ToastNotification` con el mensaje exacto: "Reseña enviada. Gracias por calificar tu tutoría.".
        - Confirmar que `revalidatePath('/historial')` se ejecuta dentro del Server Action para actualizar los datos en el historial.
    - Si la respuesta es `{ success: false, message: "..." }` (error):
        - Mostrar un `ToastNotification` con el mensaje de error recibido.
- Incluir un estado de carga (`isLoading`) y deshabilitar el botón "Enviar Reseña" mientras se procesa el envío.

Validaciones:
- Se debe mostrar el `ToastNotification` con los mensajes correctos para éxito o error.
- El modal debe cerrarse solo en caso de éxito.

Diseño:
- El `ToastNotification` debe ser visualmente claro y de corta duración.

Integración: Este componente integra el `submitReviewAction` y utiliza el sistema de `ToastNotification`.

Criterios de Aceptación Técnica:
- Al hacer clic en "Enviar Reseña", se invoca `submitReviewAction` con los datos correctos.
- Tras un envío exitoso, el `ModalCalificarTutoría` se cierra.
- Se muestra un `ToastNotification` con el mensaje de éxito correcto.
- En caso de error, se muestra un `ToastNotification` con el mensaje de error.
- La ruta `/historial` se revalida después del envío exitoso.
---END_PROMPT---

---START_COMMIT--- HU10-T09 feat(modal): integrar submitReviewAction en ModalCalificarTutoria ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 10 TASK_TITLE: Integración de `getTutoriaDetailsAction` en `ModalDetalleTutoría` y manejo de estado. HU_NUMBER: HU10 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Historial (Detalle Tutoría Completada) ---END_FRAME---
---START_FRAME--- E. Historial (Detalle Tutoría Calificada) ---END_FRAME---

---START_ESTIMATION--- 0.8H ---END_ESTIMATION---

---START_PROMPT---
Contexto: El `ModalDetalleTutoría` debe ser capaz de cargar y mostrar dinámicamente los detalles de cualquier tutoría, incluyendo su estado de reseña, al momento de su apertura.

Objetivo: Integrar el Server Action `getTutoriaDetailsAction` en el `ModalDetalleTutoría` para cargar los detalles completos de una tutoría, incluyendo su reseña si existe, cuando el modal se abre.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/components/modals/ModalDetalleTutoria/ModalDetalleTutoria.tsx` (Client Component)
- `src/actions/tutoria-funcionalidad/getTutoriaDetailsAction.ts`
- `src/interfaces/tutoria-tipo/TutoriaDetailWithReviewDto.ts`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
- Abrir `src/components/modals/ModalDetalleTutoria/ModalDetalleTutoria.tsx`.
- Modificar el componente para que, cuando la prop `isOpen` cambie a `true` (el modal se abre) y se disponga de un `tutoriaId`, se invoque el Server Action `getTutoriaDetailsAction`. Esto se puede lograr con un `useEffect` que tenga `isOpen` y `tutoriaId` como dependencias.
- Utilizar `useState` para almacenar el `tutoriaDetail` cargado y un estado de carga (`isLoading: boolean`).
- Mostrar un indicador de carga (ej. un spinner o un esqueleto de contenido) mientras `isLoading` es `true` y los datos no han sido recibidos.
- Una vez que `getTutoriaDetailsAction` retorna los datos (`TutoriaDetailWithReviewDto`), actualizar el estado `tutoriaDetail` y ocultar el indicador de carga.
- Asegurar que la lógica de renderizado condicional para el botón "Calificar" o `SecciónTuReseña` (definida en Tarea 7) use los datos cargados por `getTutoriaDetailsAction` del estado local `tutoriaDetail`.

Validaciones:
- El modal debe mostrar un estado de carga mientras se obtienen los datos.
- Los detalles de la tutoría deben cargarse y mostrarse correctamente al abrir el modal.

Diseño:
- El estado de carga debe ser visualmente claro y no bloquear la UI por completo.
- El diseño general del modal debe ser coherente con los frames "E. Historial (Detalle Tutoría Completada)" y "E. Historial (Detalle Tutoría Calificada)", usando Tailwind CSS 4.

Integración: Este componente integra el `getTutoriaDetailsAction`.

Criterios de Aceptación Técnica:
- Al abrir `ModalDetalleTutoría`, se invoca `getTutoriaDetailsAction` con el `tutoriaId` correcto.
- Los detalles de la tutoría (incluyendo la reseña si existe) se muestran correctamente en el modal.
- El modal muestra un estado de carga mientras espera la respuesta del Server Action.
- La lógica de mostrar el botón "Calificar" o "Tu Reseña" funciona con los datos cargados dinámicamente.
---END_PROMPT---

---START_COMMIT--- HU10-T10 feat(modal): integrar getTutoriaDetailsAction en ModalDetalleTutoria ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 11 TASK_TITLE: Tareas de cierre: Manejo de `CancelarButton` y `CerrarButton` en modales. HU_NUMBER: HU10 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Historial (Calificar Tutoría) ---END_FRAME---
---START_FRAME--- E. Historial (Detalle Tutoría Completada) ---END_FRAME---
---START_FRAME--- E. Historial (Detalle Tutoría Calificada) ---END_FRAME---

---START_ESTIMATION--- 0.6H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Los modales deben ofrecer una forma clara y funcional para que el usuario pueda cerrarlos sin guardar cambios, regresando a la vista anterior.

Objetivo: Implementar la lógica para los botones de cancelación y cierre en los modales `ModalCalificarTutoría` y `ModalDetalleTutoría`, asegurando que cierran los modales sin guardar información y regresan al usuario a la vista anterior correcta.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/components/modals/ModalCalificarTutoria/ModalCalificarTutoria.tsx` (Client Component)
- `src/components/modals/ModalDetalleTutoria/ModalDetalleTutoria.tsx` (Client Component)
- `src/app/historial/page.tsx` (para el manejo de `onClose` a nivel de página)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
- Abrir `src/components/modals/ModalCalificarTutoria/ModalCalificarTutoria.tsx`.
    - Asegurar que el botón "Cancelar" tiene un `onClick` que llama a la prop `onClose()` recibida por el modal.
    - Confirmar que esta acción limpia cualquier estado local (`rating`, `comment`) y no invoca el Server Action de envío.
- Abrir `src/components/modals/ModalDetalleTutoria/ModalDetalleTutoria.tsx`.
    - Asegurar que el botón "Cerrar" tiene un `onClick` que llama a la prop `onClose()` recibida por el modal.
    - Confirmar que esta acción limpia cualquier estado local (`tutoriaDetail`, `isLoading`) y no guarda datos.
- En `src/app/historial/page.tsx` (o donde se maneje el estado de apertura de los modales):
    - La función `onClose` para cada modal debe restablecer el estado que controla su visibilidad (ej. `setIsOpenCalificarModal(false)`).

Validaciones:
- Al hacer clic en "Cancelar" o "Cerrar", el modal debe desaparecer y el estado de la aplicación no debe alterarse (excepto por la visibilidad del modal).

Diseño:
- Los botones de "Cancelar" y "Cerrar" deben ser claramente identificables y seguir el diseño de los frames.

Integración: Estos componentes interactúan con el componente padre que controla su visibilidad.

Criterios de Aceptación Técnica:
- Hacer clic en "Cancelar" en `ModalCalificarTutoría` cierra el modal.
- Hacer clic en "Cerrar" en `ModalDetalleTutoría` cierra el modal.
- Ninguna información se guarda al cerrar los modales con estos botones.
- El usuario regresa a la vista anterior (tarjeta o listado) después de cerrar los modales.
---END_PROMPT---

---START_COMMIT--- HU10-T11 fix(modal): manejar cierre de modales con Cancelar y Cerrar ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 12 TASK_TITLE: Integración final con backend: Descomentar `fetch` en Server Actions. HU_NUMBER: HU10 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Una vez que el desarrollo del frontend con datos de seed ha sido completado y probado, es necesario integrar los Server Actions con el backend real para que la funcionalidad sea operativa.

Objetivo: Realizar la integración final con el backend descomentando el código de las llamadas `fetch` previamente escritas en los Server Actions `submitReviewAction` y `getTutoriaDetailsAction`, y comentando o eliminando las líneas que retornaban los datos de seed.

Especificaciones Técnicas:
Archivos a crear/modificar:
- `src/actions/review-funcionalidad/submitReviewAction.ts` (Server Action)
- `src/actions/tutoria-funcionalidad/getTutoriaDetailsAction.ts` (Server Action)
- `.env` (para verificar `NEXT_PUBLIC_API_BASE_URL` o similar)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
- Abrir `src/actions/review-funcionalidad/submitReviewAction.ts`.
    - Comentar o eliminar la lógica que retorna los datos de seed.
    - Descomentar el bloque `try-catch` completo que contiene la llamada `fetch` al endpoint `POST /api/reviews`.
    - Verificar la URL del endpoint (ej. usando `process.env.NEXT_PUBLIC_API_BASE_URL`) y que los `headers` (`Content-Type`, `Authorization`) sean correctos.
    - Asegurar que `revalidatePath('/historial');` esté activo dentro del bloque de éxito del `fetch`.
- Abrir `src/actions/tutoria-funcionalidad/getTutoriaDetailsAction.ts`.
    - Comentar o eliminar la lógica que retorna los datos de seed.
    - Descomentar el bloque `try-catch` completo que contiene la llamada `fetch` al endpoint `GET /api/tutorias/:id`.
    - Verificar la URL del endpoint y los `headers`.
- Asegurarse de que las variables de entorno para la URL del API estén correctamente configuradas en `.env` para los diferentes ambientes.

Validaciones:
- Todas las llamadas `fetch` a los endpoints del backend deben ser exitosas.
- La UI debe mostrar los datos y comportarse según las respuestas del backend real.
- El envío de reseñas debe persistir en el backend.
- La visualización de reseñas existentes y la actualización de la UI deben reflejar el estado real del backend.

Diseño: Ninguno.

Integración: Esta tarea completa la integración frontend-backend. Requiere que el backend esté disponible y funcionando correctamente.

Criterios de Aceptación Técnica:
- Ambos Server Actions (`submitReviewAction` y `getTutoriaDetailsAction`) realizan llamadas `fetch` a los endpoints del backend.
- Los datos se envían y reciben correctamente desde y hacia el backend real.
- La UI se actualiza y muestra el feedback del backend.
- Los errores del backend se manejan y muestran al usuario.
- No hay errores de CORS o autenticación.
---END_PROMPT---

---START_COMMIT--- HU10-T12 refactor(server-action): descomentar fetch para backend real ---END_COMMIT---
---END_TASK---