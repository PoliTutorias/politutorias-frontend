---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed para la entidad `Oferta` (para `DetalleOfertaPage`) HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se requiere simular la respuesta de la API `GET /api/ofertas/:id` para el desarrollo frontend sin depender del backend.
Objetivo: Crear un archivo de seed que contenga datos de ofertas de tutoría, incluyendo una con modalidad única y otra con modalidad dual, para facilitar las pruebas de la `DetalleOfertaPage` y el `ModalSolicitarTutoria`.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/lib/seeds/OfertaSeedData.ts`
*   `src/interfaces/ofertas/TutoriaDetailDto.ts` (si no existe, definir la interfaz para la estructura de la oferta)
*   `src/interfaces/tutor/TutorInfoDto.ts` (si no existe, definir la interfaz para la estructura del tutor)
*   `src/interfaces/common/HorarioDisponibleDto.ts` (si no existe, definir la interfaz para la estructura del horario)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura: Definir interfaces claras y un array de objetos seed. Exportar una función `getOfertaSeed(id: string)` para obtener ofertas por ID.

Validaciones: Los datos deben ser representativos para probar los escenarios de modalidad única y dual.

Diseño: No aplica, es un seed de datos.

Integración: El seed simulará la respuesta del endpoint `GET /api/ofertas/:id`. La estructura debe coincidir con `TutoriaDetailDto`.

Criterios de Aceptación Técnica:
-   El archivo `OfertaSeedData.ts` existe y exporta una función para obtener ofertas por ID.
-   El seed contiene al menos una oferta con una única modalidad ('virtual' o 'presencial') y una con modalidad dual ('virtual/presencial').
-   La estructura de los datos del seed coincide con `TutoriaDetailDto`.
---END_PROMPT---

---START_COMMIT--- HU06-T01 chore(seed): crear seed para OfertaDetailDto ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Creación de seed para la respuesta de `verificarSolicitudPreviaAction` HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Es necesario simular las respuestas del Server Action `verificarSolicitudPreviaAction` para probar los escenarios donde ya existe una solicitud activa previa y donde no.
Objetivo: Crear un archivo de seed que permita simular las respuestas de verificación de solicitud previa, facilitando las pruebas frontend del bloqueo por solicitud ya existente.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/lib/seeds/VerificarSolicitudPreviaSeedData.ts`
*   `src/interfaces/solicitudes/VerificarSolicitudPreviaResponseDto.ts`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura: Definir la interfaz `VerificarSolicitudPreviaResponseSeed` y exportar funciones para simular `existe: true` con mensaje y `existe: false`.

Validaciones: El mensaje de "solicitud previa" debe coincidir con el criterio de aceptación.

Diseño: No aplica, es un seed de datos.

Integración: El seed simulará la respuesta de un DTO que indica si existe o no una solicitud previa.

Criterios de Aceptación Técnica:
-   El seed permite simular respuestas de existencia y no existencia de solicitudes previas.
-   El mensaje de "solicitud previa" coincide con el CA.
-   La estructura de la respuesta del seed coincide con `VerificarSolicitudPreviaResponseDto`.
---END_PROMPT---

---START_COMMIT--- HU06-T02 chore(seed): crear seed para verificar solicitud previa ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Creación de seed para la respuesta de `enviarSolicitudTutoriaAction` HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Para probar el flujo de éxito del envío de una solicitud de tutoría desde el frontend, se necesita una respuesta simulada del Server Action `enviarSolicitudTutoriaAction`.
Objetivo: Crear un archivo de seed que simule una `SolicitudEntity` creada con éxito por el backend.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/lib/seeds/SolicitudCreadaSeedData.ts`
*   `src/interfaces/solicitudes/SolicitudEntity.ts`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura: Definir la interfaz `SolicitudEntitySeed` que coincida con la `SolicitudEntity` esperada del backend y exportar una función que retorne este objeto.

Validaciones: No aplica directamente a este seed, pero los datos deben ser consistentes con una solicitud exitosa.

Diseño: No aplica, es un seed de datos.

Integración: El seed simulará la entidad devuelta por el endpoint `POST /api/solicitudes`.

Criterios de Aceptación Técnica:
-   El seed contiene un objeto `SolicitudEntity` de ejemplo.
-   La estructura de los datos del seed coincide con la `SolicitudEntity` esperada del backend.
---END_PROMPT---

---START_COMMIT--- HU06-T03 chore(seed): crear seed para solicitud creada ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Implementación de `DetalleOfertaPage` (maquetación y carga inicial de datos) HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Detalle Oferta (Horario Seleccionado) ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se necesita la página principal para mostrar los detalles de una oferta de tutoría, sirviendo como punto de entrada para la funcionalidad de solicitud.
Objetivo: Estructurar la página `/oferta/[id]` y cargar los datos iniciales de la oferta utilizando el seed creado, maquetando las secciones clave según el prototipo.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/app/oferta/[id]/page.tsx` (Server Component)
*   `src/lib/seeds/OfertaSeedData.ts` (solo importación)
*   `src/interfaces/ofertas/TutoriaDetailDto.ts` (solo importación)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   La página debe ser un Server Component (`page.tsx`).
*   Implementar la lógica para obtener el `id` de los parámetros de la URL y usar `getOfertaSeed(id)` para cargar los datos.
*   Maquetar la información del tutor (nombre, foto), detalles de la oferta (título, descripción, precio) y la sección "Disponibilidad Semanal".
*   Posicionar un placeholder para el `BotonSolicitarTutoria`.

Validaciones: No aplica validación de formulario en esta etapa.

Diseño: La maquetación debe asemejarse al frame `E. Detalle Oferta (Horario Seleccionado)`, utilizando Tailwind CSS 4 para estilos responsivos.

Integración: Carga de datos iniciales desde `OfertaSeedData.ts`.

Criterios de Aceptación Técnica:
-   La página renderiza correctamente los datos de la oferta cargados desde el seed.
-   La maquetación inicial de la página se asemeja al frame `E. Detalle Oferta (Horario Seleccionado)`.
-   La información del tutor y los detalles de la oferta son visibles.
---END_PROMPT---

---START_COMMIT--- HU06-T04 feat(page): maquetar DetalleOfertaPage con seed ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Implementación de `ChipHorario` y su lógica de selección HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Detalle Oferta (Horario Seleccionado) ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El estudiante necesita poder seleccionar uno o varios horarios disponibles para la tutoría.
Objetivo: Crear un componente `ChipHorario` interactivo que represente un horario y permita su selección/deselección, reportando el estado a la página contenedora (`DetalleOfertaPage`).

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/oferta-ui/ChipHorario/ChipHorario.tsx` (Client Component)
*   `src/app/oferta/[id]/page.tsx`
*   `src/interfaces/common/HorarioDisponibleDto.ts` (si no existe, definir la interfaz para el tipo de `horario`)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   `ChipHorario` debe ser un Client Component.
*   `props` para `ChipHorario`: `horario: HorarioDisponibleDto`, `isSelected: boolean`, `onSelect: (horario: HorarioDisponibleDto) => void`.
*   Renderizado visual del chip con fecha y hora.
*   `onClick` que alterne la selección y llame a `onSelect`.
*   En `DetalleOfertaPage`, integrar `ChipHorario` mapeando `oferta.horariosDisponibles`.
*   Gestionar el estado `horariosSeleccionados` en `DetalleOfertaPage` para almacenar los horarios elegidos.

Validaciones: No aplica en este componente.

Diseño: El `ChipHorario` debe cambiar visualmente cuando está seleccionado, según el diseño general. Usar Tailwind CSS 4 para estilos.

Integración: `ChipHorario` es un componente de UI que interactúa con la `DetalleOfertaPage` para la gestión del estado de selección.

Criterios de Aceptación Técnica:
-   Los `ChipHorario` se renderizan correctamente en la `DetalleOfertaPage`.
-   Al hacer clic en un `ChipHorario`, su estado visual de selección cambia.
-   La `DetalleOfertaPage` actualiza su lista de `horariosSeleccionados` correctamente.
---END_PROMPT---

---START_COMMIT--- HU06-T05 feat(component): implementar ChipHorario y logica de seleccion ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Lógica `validarSeleccionHorario` y estado de `BotonSolicitarTutoria` HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Detalle Oferta (Horario Seleccionado) ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El botón "Solicitar Tutoría" debe estar deshabilitado hasta que el estudiante haya seleccionado al menos un horario.
Objetivo: Implementar un componente `BotonSolicitarTutoria` y la lógica en `DetalleOfertaPage` para habilitar/deshabilitar visualmente el botón basándose en la selección de horarios.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/oferta-ui/BotonSolicitarTutoria/BotonSolicitarTutoria.tsx` (Client Component)
*   `src/app/oferta/[id]/page.tsx`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   `BotonSolicitarTutoria` debe ser un Client Component con `props`: `isDisabled: boolean`, `onClick: () => void`, `cantidadHorarios: number`.
*   En `DetalleOfertaPage`, implementar una variable de estado o derivada para `isDisabled` basada en `horariosSeleccionados.length`.
*   Pasar `isDisabled` y `horariosSeleccionados.length` al `BotonSolicitarTutoria`.
*   El texto del botón debe incluir la cantidad de horarios seleccionados (ej. "Solicitar Tutoría (1)").

Validaciones: La validación es a nivel de UI: si `horariosSeleccionados` está vacío, el botón está deshabilitado.

Diseño: Aplicar estilos CSS (Tailwind 4) para el estado deshabilitado (ej. opacidad, cursor `not-allowed`). El texto del botón debe reflejar el número de horarios seleccionados como en el prototipo.

Integración: `DetalleOfertaPage` pasa el estado de selección de horarios al `BotonSolicitarTutoria`.

Criterios de Aceptación Técnica:
-   **CA: Bloqueo por Horario No Seleccionado:** El botón "Solicitar Tutoría" está deshabilitado cuando no hay `ChipHorario` seleccionados.
-   El botón se habilita cuando al menos un `ChipHorario` está seleccionado.
-   El texto del botón refleja la cantidad de horarios seleccionados (ej. "Solicitar Tutoría (1)").
---END_PROMPT---

---START_COMMIT--- HU06-T06 feat(component): habilitar BotonSolicitarTutoria basado en seleccion ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Implementación de `AlertaSolicitudPrevia` HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se necesita una forma clara y visual para informar al estudiante cuando no puede solicitar un horario debido a una solicitud previa existente.
Objetivo: Crear un componente reutilizable `AlertaSolicitudPrevia` que muestre un mensaje de advertencia específico al usuario.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/common-ui/AlertaSolicitudPrevia/AlertaSolicitudPrevia.tsx` (Client Component)
*   `src/app/oferta/[id]/page.tsx` (solo para integración)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   `AlertaSolicitudPrevia` debe ser un Client Component.
*   `props`: `message: string`, `isVisible: boolean`, `onClose: () => void`.
*   Maquetar la alerta como un toast o un modal flotante simple, que se renderice condicionalmente cuando `isVisible` es `true`.
*   Incluir un mecanismo para cerrar la alerta (ej. botón "X" o `onClose` automático después de un tiempo).

Validaciones: El componente mostrará el mensaje de error de una validación externa.

Diseño: La alerta debe ser visualmente distintiva (ej. fondo rojo o naranja) y el texto exacto del CA. Utilizar Tailwind CSS 4.

Integración: Este componente será renderizado condicionalmente en `DetalleOfertaPage` y activado por la lógica de verificación de solicitudes previas.

Criterios de Aceptación Técnica:
-   **CA: Bloqueo por Solicitud Previa:** La alerta se muestra con el texto exacto: "Horario ya solicitado. Ya tienes una solicitud activa para Miércoles 14:00." (o similar, incluyendo fecha y hora).
-   La alerta es visible y se puede cerrar.
---END_PROMPT---

---START_COMMIT--- HU06-T07 feat(component): crear AlertaSolicitudPrevia ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 8 TASK_TITLE: Implementación de `verificarSolicitudPreviaAction` con seed data HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Antes de abrir el modal de solicitud, el sistema debe verificar si el estudiante ya tiene una solicitud activa para los horarios seleccionados.
Objetivo: Implementar el Server Action `verificarSolicitudPreviaAction` que, inicialmente, simulará la respuesta del backend utilizando el seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/actions/solicitudes/verificarSolicitudPreviaAction.ts` (Server Action)
*   `src/lib/seeds/VerificarSolicitudPreviaSeedData.ts` (solo importación)
*   `src/interfaces/solicitudes/VerificarSolicitudPreviaPayload.ts` (definir la estructura del payload)
*   `src/interfaces/solicitudes/VerificarSolicitudPreviaResponseDto.ts` (solo importación)
*   `src/app/oferta/[id]/page.tsx`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   Crear `verificarSolicitudPreviaAction` en `src/actions/solicitudes/verificarSolicitudPreviaAction.ts` como un Server Action (`'use server'`).
*   Importar `getSolicitudPreviaExisteSeed()` y `getSolicitudPreviaNoExisteSeed()`.
*   Implementar lógica condicional para retornar los seeds (ej. si el primer horario del payload es "Miércoles 14:00", devuelve `existe: true`, de lo contrario `existe: false`).
*   Escribir el bloque `fetch` para `POST /api/solicitudes/verificar-previa` con los headers (ej. JWT) y body adecuados, y **comentarlo completamente**.
*   En `DetalleOfertaPage`, al hacer clic en `BotonSolicitarTutoria`, llamar a este Server Action.
*   Manejar la respuesta: si `existe: true`, mostrar `AlertaSolicitudPrevia`; de lo contrario, proceder a abrir el modal.

Validaciones: La simulación de `existe: true` se basa en una condición simple del seed.

Diseño: No aplica directamente, pero la integración debe mostrar la `AlertaSolicitudPrevia` según la lógica.

Integración: Consumo del Server Action por `DetalleOfertaPage`. Contrato con el backend para `POST /api/solicitudes/verificar-previa` documentado en comentarios.

Criterios de Aceptación Técnica:
-   El `verificarSolicitudPreviaAction` retorna correctamente el seed data (simulando `existe: true` o `false`).
-   El código de integración con el backend (petición `fetch`) está presente y completamente comentado.
-   La estructura de la respuesta del Server Action coincide con el contrato del endpoint `POST /api/solicitudes/verificar-previa`.
-   La `DetalleOfertaPage` consume la respuesta del Server Action y muestra la `AlertaSolicitudPrevia` cuando `existe: true`.
---END_PROMPT---

---START_COMMIT--- HU06-T08 feat(action): implementar verificarSolicitudPreviaAction con seed ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 9 TASK_TITLE: Maquetación base de `ModalSolicitarTutoria` HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- E. Solicitar Tutoria (Una Modalidad), E. Solicitar Tutoria (Lleno) ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El estudiante necesita un formulario en un modal para completar y enviar su solicitud de tutoría.
Objetivo: Implementar la estructura base del modal "Solicitar Tutoría", incluyendo el overlay y los elementos principales (información del tutor, horarios, placeholders para mensaje y botones de acción) sin la lógica de validación o envío.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/solicitud-ui/ModalSolicitarTutoria/ModalSolicitarTutoria.tsx` (Client Component)
*   `src/interfaces/tutor/TutorInfoDto.ts` (si no existe, definir la interfaz para `tutorInfo`)
*   `src/interfaces/common/HorarioDisponibleDto.ts` (si no existe, definir la interfaz para `selectedHorarios`)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   `ModalSolicitarTutoria` debe ser un Client Component.
*   `props`: `isOpen: boolean`, `onClose: () => void`, `tutorInfo: TutorInfoDto`, `selectedHorarios: HorarioDisponibleDto[]`, `ofertaModalidad: 'virtual' | 'presencial' | 'virtual/presencial'`.
*   Maquetar el overlay (fondo oscuro semitransparente) y la caja central del modal.
*   Renderizar la foto y el nombre del tutor.
*   Mostrar los "Horarios seleccionados" de forma clara.
*   Incluir `div`s o placeholders para el campo de mensaje, el selector de modalidad (si aplica) y los botones de acción (`Cancelar`, `Enviar Solicitud`).

Validaciones: No aplica en esta etapa de maquetación.

Diseño: El modal debe replicar la apariencia de `E. Solicitar Tutoria (Una Modalidad)` y `E. Solicitar Tutoria (Lleno)` con Tailwind CSS 4, incluyendo el centrado y el overlay.

Integración: El modal recibe información del tutor y horarios seleccionados como props.

Criterios de Aceptación Técnica:
-   El modal se renderiza con un overlay y el contenido central.
-   La información del tutor y los horarios seleccionados son visibles.
-   Los elementos placeholders para el mensaje y los botones están presentes.
---END_PROMPT---

---START_COMMIT--- HU06-T09 feat(component): maquetar base de ModalSolicitarTutoria ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 10 TASK_TITLE: Implementación de `InputMensaje` con contador y límite de caracteres HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Solicitar Tutoria (Una Modalidad), E. Solicitar Tutoria (Lleno) ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El modal de solicitud requiere un campo de texto para el mensaje del tutor, que debe tener un límite de caracteres y un contador visible.
Objetivo: Crear un componente `InputMensaje` reutilizable que encapsule un `textarea` con contador de caracteres y un límite máximo de 500, bloqueando la entrada adicional.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/common-ui/InputMensaje/InputMensaje.tsx` (Client Component)
*   `src/components/solicitud-ui/ModalSolicitarTutoria/ModalSolicitarTutoria.tsx`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   `InputMensaje` debe ser un Client Component.
*   `props`: `value: string`, `onChange: (value: string) => void`, `maxLength: number`, `placeholder: string`, `label: string`, `error?: string`, `name: string`.
*   Maquetar el `textarea` con su `label`, un contador de caracteres (`0/500`) y un espacio para el mensaje de error.
*   Implementar la lógica para actualizar el contador en tiempo real y prevenir la escritura una vez alcanzado `maxLength` (500).
*   Integrar `InputMensaje` en `ModalSolicitarTutoria`, gestionando su estado local con `useState` o React Hook Form.

Validaciones: El componente se encargará del límite de caracteres. La validación de obligatoriedad será externa (React Hook Form).

Diseño: El input debe tener un aspecto claro con su label y el contador. El borde debe cambiar de color si se le pasa un `error` (se integrará en una tarea posterior). Utilizar Tailwind CSS 4.

Integración: `ModalSolicitarTutoria` usará `InputMensaje` para el campo del mensaje.

Criterios de Aceptación Técnica:
-   El `InputMensaje` se renderiza correctamente dentro del modal.
-   El contador de caracteres muestra `0/500` al inicio y se actualiza al escribir.
-   **CA: Bloqueo por Límite Máximo de Caracteres en Mensaje:** El sistema bloquea el ingreso de texto más allá de los 500 caracteres, y el contador muestra `500/500`.
---END_PROMPT---

---START_COMMIT--- HU06-T10 feat(component): crear InputMensaje con contador ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 11 TASK_TITLE: Implementación condicional de `SelectorModalidad` HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Solicitar Tutoria (Lleno) ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La selección de modalidad (Virtual/Presencial) solo debe ser visible si la oferta de tutoría soporta modalidades duales.
Objetivo: Crear un componente `SelectorModalidad` que muestre los botones "Virtual" y "Presencial" y se renderice condicionalmente dentro de `ModalSolicitarTutoria` según la modalidad de la oferta.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/solicitud-ui/SelectorModalidad/SelectorModalidad.tsx` (Client Component)
*   `src/components/solicitud-ui/ModalSolicitarTutoria/ModalSolicitarTutoria.tsx`
*   `src/app/oferta/[id]/page.tsx` (para pasar el tipo de modalidad al modal)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   `SelectorModalidad` debe ser un Client Component.
*   `props`: `selectedModalidad?: 'virtual' | 'presencial'`, `onSelect: (modalidad: 'virtual' | 'presencial') => void`, `error?: string`, `name: string`.
*   Maquetar dos botones (`Virtual` y `Presencial`) con estilos que indiquen el estado seleccionado.
*   En `ModalSolicitarTutoria`, utilizar la prop `ofertaModalidad` para renderizar `SelectorModalidad` condicionalmente (`ofertaModalidad === 'virtual/presencial'`).
*   Gestionar el estado de la modalidad seleccionada dentro de `ModalSolicitarTutoria` (o con React Hook Form).

Validaciones: El componente gestiona su estado de selección. La validación de obligatoriedad será externa (React Hook Form).

Diseño: Los botones deben tener estilos claros para estados activo/inactivo. El selector debe tener un espacio para un mensaje de error si se le pasa uno (se integrará en una tarea posterior). Utilizar Tailwind CSS 4.

Integración: `ModalSolicitarTutoria` pasa el tipo de modalidad de la oferta a `SelectorModalidad` y gestiona su estado.

Criterios de Aceptación Técnica:
-   **CA: Abrir Modal Solicitar Tutoría (Dual Modalidad):** El `SelectorModalidad` es visible si la oferta tiene modalidades duales.
-   **CA: Abrir Modal Solicitar Tutoría (Una Modalidad):** El `SelectorModalidad` NO es visible si la oferta tiene una única modalidad.
-   Al seleccionar una modalidad, su estado visual cambia.
-   `ModalSolicitarTutoria` mantiene el estado de la modalidad seleccionada.
---END_PROMPT---

---START_COMMIT--- HU06-T11 feat(component): implementar SelectorModalidad condicional ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 12 TASK_TITLE: Implementación de botones `BotonEnviarSolicitud` y `BotonCancelar` en el modal HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Solicitar Tutoria (Una Modalidad), E. Solicitar Tutoria (Lleno) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El `ModalSolicitarTutoria` necesita botones de acción para permitir al usuario enviar o cancelar la solicitud.
Objetivo: Implementar los botones "Enviar Solicitud" y "Cancelar" en la parte inferior del `ModalSolicitarTutoria`, con la funcionalidad básica de cerrar el modal para "Cancelar".

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/solicitud-ui/ModalSolicitarTutoria/ModalSolicitarTutoria.tsx`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   En `ModalSolicitarTutoria.tsx`, añadir un `button` para "Cancelar" con un `onClick` que llame a `onClose`.
*   Añadir un `button` para "Enviar Solicitud". Por ahora, este botón no tendrá lógica de envío, pero estará presente y se considerará su estado de deshabilitación basado en validaciones futuras.

Validaciones: El botón "Enviar Solicitud" debería ser deshabilitado si no se cumplen las validaciones de campos (se implementará en tareas posteriores).

Diseño: Aplicar estilos a ambos botones según el prototipo utilizando Tailwind CSS 4. El botón "Enviar Solicitud" podría tener un estilo primario y "Cancelar" un estilo secundario.

Integración: Los botones interactúan con el estado del modal (`onClose`) y con el formulario (futura lógica de envío).

Criterios de Aceptación Técnica:
-   Los botones "Cancelar" y "Enviar Solicitud" se renderizan en el modal.
-   Al hacer clic en "Cancelar", el modal se cierra.
---END_PROMPT---

---START_COMMIT--- HU06-T12 feat(component): agregar botones Enviar y Cancelar a modal ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 13 TASK_TITLE: Implementación de `MensajeErrorForm` para errores de validación en el modal HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Los formularios requieren una forma consistente de mostrar mensajes de error de validación debajo de los campos afectados.
Objetivo: Crear un componente `MensajeErrorForm` reutilizable para mostrar mensajes de error de validación visualmente claros.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/common-ui/MensajeErrorForm/MensajeErrorForm.tsx` (Client Component)
*   `src/components/common-ui/InputMensaje/InputMensaje.tsx`
*   `src/components/solicitud-ui/SelectorModalidad/SelectorModalidad.tsx`
*   `src/components/solicitud-ui/ModalSolicitarTutoria/ModalSolicitarTutoria.tsx` (para pasar los errores)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   `MensajeErrorForm` debe ser un Client Component.
*   `props`: `message: string`.
*   Maquetar el componente para mostrar el `message` en color rojo y con el estilo adecuado para que aparezca debajo de los campos de formulario.
*   Integrar `MensajeErrorForm` condicionalmente en `InputMensaje` y `SelectorModalidad` (pasando la prop `error` y renderizándolo si `error` no es `undefined`).

Validaciones: Este componente solo muestra un mensaje de error proporcionado externamente.

Diseño: El mensaje de error debe ser de color rojo y tener un tamaño de fuente que lo haga legible pero no intrusivo. Usar Tailwind CSS 4.

Integración: Se integra en componentes de formulario existentes para mostrar errores de validación.

Criterios de Aceptación Técnica:
-   Los mensajes de error se muestran correctamente debajo de los campos de formulario cuando se les pasa un `message`.
-   Los mensajes de error tienen el estilo visual requerido (ej. color rojo).
---END_PROMPT---

---START_COMMIT--- HU06-T13 feat(component): crear MensajeErrorForm para validaciones ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 14 TASK_TITLE: Lógica de `abrirModalSolicitud` y manejo de estado del modal HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- E. Solicitar Tutoria (Una Modalidad), E. Solicitar Tutoria (Lleno) ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El `ModalSolicitarTutoria` debe poder abrirse y cerrarse desde la `DetalleOfertaPage`, recibiendo la información necesaria.
Objetivo: Implementar la lógica completa para controlar la visibilidad y el paso de datos al `ModalSolicitarTutoria` desde `DetalleOfertaPage`.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/app/oferta/[id]/page.tsx`
*   `src/components/solicitud-ui/ModalSolicitarTutoria/ModalSolicitarTutoria.tsx` (solo importación)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   En `DetalleOfertaPage.tsx`, implementar un estado (`showModal: boolean`) para controlar la visibilidad del `ModalSolicitarTutoria`.
*   Crear la función asíncrona `handleOpenModal` que se llamará al hacer clic en `BotonSolicitarTutoria` (después de la verificación previa).
*   Dentro de `handleOpenModal`:
    *   Extraer `tutorInfo` y `horariosSeleccionados`.
    *   Determinar `ofertaModalidad` (`oferta.modalidad === 'virtual/presencial' ? 'virtual/presencial' : oferta.modalidad`).
    *   Establecer `showModal = true` y pasar estos datos como props al `ModalSolicitarTutoria`.
*   Implementar `handleCloseModal` para establecer `showModal = false`.
*   Renderizar `ModalSolicitarTutoria` condicionalmente.

Validaciones: Esta tarea se enfoca en el flujo de apertura/cierre y paso de datos. Las validaciones de campos del modal se realizarán en una tarea posterior.

Diseño: La apertura y cierre del modal debe ser fluida.

Integración: `DetalleOfertaPage` es el orquestador que maneja el estado del modal y los datos que se le pasan. Se llama `verificarSolicitudPreviaAction` antes de `handleOpenModal`.

Criterios de Aceptación Técnica:
-   **CA: Abrir Modal Solicitar Tutoría (Una Modalidad):** El modal se abre con la información correcta del tutor y horarios, y sin selector de modalidad si la oferta es única.
-   **CA: Abrir Modal Solicitar Tutoría (Dual Modalidad):** El modal se abre con la información correcta del tutor y horarios, y con el selector de modalidad visible si la oferta es dual.
-   El modal se abre y cierra correctamente.
---END_PROMPT---

---START_COMMIT--- HU06-T14 feat(page): implementar logica de apertura de ModalSolicitarTutoria ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 15 TASK_TITLE: Validaciones frontend en `ModalSolicitarTutoria` (Zod/React Hook Form) HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El formulario de solicitud de tutoría requiere validaciones del lado del cliente para asegurar que los campos obligatorios sean completados antes del envío.
Objetivo: Implementar las validaciones frontend para el campo de mensaje (obligatorio, límite de 500 caracteres) y la modalidad (obligatoria si la oferta es dual) utilizando Zod y React Hook Form en `ModalSolicitarTutoria`.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/lib/validations/solicitud-schema.ts`
*   `src/components/solicitud-ui/ModalSolicitarTutoria/ModalSolicitarTutoria.tsx`
*   `src/components/common-ui/InputMensaje/InputMensaje.tsx` (para pasar el estado de error)
*   `src/components/solicitud-ui/SelectorModalidad/SelectorModalidad.tsx` (para pasar el estado de error)
*   `src/components/common-ui/MensajeErrorForm/MensajeErrorForm.tsx` (solo importación)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   Crear `solicitud-schema.ts` con Zod:
    *   Esquema principal con `mensaje` (requerido, `max(500)`).
    *   Definir un esquema condicional para `modalidad`: requerido solo si `isDualModalidad` es `true`.
*   En `ModalSolicitarTutoria.tsx`:
    *   Integrar `useForm` de React Hook Form con `zodResolver` y el esquema definido.
    *   Conectar `InputMensaje` y `SelectorModalidad` usando `register` y `control` de RHF.
    *   Pasar los errores (`formState.errors`) a `InputMensaje` y `SelectorModalidad` para que `MensajeErrorForm` los visualice.
    *   Ajustar visualmente los bordes de los campos a rojo usando clases de Tailwind (ej. `border-red-500`) cuando haya errores.
    *   Deshabilitar el botón "Enviar Solicitud" si `formState.isValid` es `false`.

Validaciones:
*   **Mensaje**: Obligatorio, máximo 500 caracteres.
*   **Modalidad**: Obligatoria si la prop `ofertaModalidad` del modal es `'virtual/presencial'`.

Diseño: Borde rojo para campos con error, mensaje de error en rojo debajo del campo afectado. El botón "Enviar Solicitud" debe estar deshabilitado visualmente.

Integración: React Hook Form y Zod manejan el estado del formulario y las validaciones.

Criterios de Aceptación Técnica:
-   **CA: Mensaje Obligatorio (Una Modalidad):** Si el mensaje está vacío, el borde del campo se vuelve rojo y se muestra el mensaje "El mensaje es obligatorio.".
-   **CA: Modalidad Obligatoria (Dual):** Si la oferta es dual y la modalidad no está seleccionada, se muestra el mensaje "Selecciona la modalidad." debajo del selector.
-   **CA: Mensaje Y Modalidad Obligatorios (Dual):** Ambos mensajes de error aparecen si ambas validaciones fallan.
-   El botón "Enviar Solicitud" está deshabilitado o bloquea el envío si hay errores de validación.
---END_PROMPT---

---START_COMMIT--- HU06-T15 feat(validation): implementar validaciones frontend con Zod y RHF ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 16 TASK_TITLE: Implementación de `enviarSolicitudTutoriaAction` con seed data HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El `ModalSolicitarTutoria` debe poder enviar los datos de la solicitud al backend, o simularlo en desarrollo.
Objetivo: Implementar el Server Action `enviarSolicitudTutoriaAction` que, inicialmente, simulará el envío de datos y retornará el seed de una solicitud creada con éxito, o errores de validación simulados.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/actions/solicitudes/enviarSolicitudTutoriaAction.ts` (Server Action)
*   `src/lib/seeds/SolicitudCreadaSeedData.ts` (solo importación)
*   `src/interfaces/solicitudes/SolicitudPayload.ts` (definir la estructura del payload)
*   `src/components/solicitud-ui/ModalSolicitarTutoria/ModalSolicitarTutoria.tsx`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   En `app/actions/solicitudes.ts`, implementar la función `enviarSolicitudTutoriaAction(payload: SolicitudPayload)` como un Server Action (`'use server'`).
*   Importar `getSolicitudCreadaSeed()`.
*   Dentro de la función, simular validaciones básicas (por ejemplo, `if (!payload.mensaje)` retorna un error de mensaje, `if (payload.modalidad` no está definido en dual, retorna error de modalidad). Esto es una simulación del lado del servidor para pruebas.
*   Si las validaciones simuladas pasan, retornar `{ success: true, message: '¡Solicitud enviada! 1 horario propuesto. El tutor revisará tu solicitud pronto.' }`.
*   Escribir el bloque `fetch` para `POST /api/solicitudes` con los headers (ej. JWT) y body (`CreateSolicitudDto`) adecuados, y **comentarlo completamente**.
*   Documentar la estructura de la respuesta esperada en los comentarios (éxito con `SolicitudEntity`, fallo con errores).
*   En `ModalSolicitarTutoria`, al hacer `onSubmit` del formulario, llamar a `enviarSolicitudTutoriaAction`.
*   Manejar la respuesta: si `success: true`, cerrar el modal; si `success: false`, mostrar errores usando `setError` de React Hook Form.

Validaciones: Este Server Action incluye simulaciones de validaciones backend para facilitar la prueba de errores.

Diseño: No aplica directamente, pero la gestión de errores debe reflejarse en la UI del modal.

Integración: El `ModalSolicitarTutoria` consume este Server Action para enviar los datos. Contrato con el backend para `POST /api/solicitudes` documentado en comentarios.

Criterios de Aceptación Técnica:
-   El `enviarSolicitudTutoriaAction` retorna correctamente el seed data de éxito.
-   Simula las validaciones de mensaje y modalidad del lado del servidor (para demostración).
-   El código de integración con el backend (petición `fetch`) está presente y completamente comentado.
-   La estructura de la respuesta del Server Action coincide con el contrato del endpoint `POST /api/solicitudes`.
-   El `ModalSolicitarTutoria` consume la respuesta del Server Action y gestiona el cierre o la visualización de errores.
---END_PROMPT---

---START_COMMIT--- HU06-T16 feat(action): implementar enviarSolicitudTutoriaAction con seed ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 17 TASK_TITLE: Implementación de `NotificacionExito` HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Tras el envío exitoso de una solicitud, el estudiante debe recibir una confirmación visual en la pantalla principal.
Objetivo: Crear un componente `NotificacionExito` que muestre un mensaje de éxito temporal en la `DetalleOfertaPage` cuando la solicitud de tutoría ha sido enviada con éxito.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/common-ui/NotificacionExito/NotificacionExito.tsx` (Client Component)
*   `src/app/oferta/[id]/page.tsx`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   `NotificacionExito` debe ser un Client Component.
*   `props`: `message: string`, `isVisible: boolean`, `onClose: () => void`.
*   Maquetar la notificación como un `toast` o `snackbar` flotante (ej. en la parte inferior de la pantalla).
*   Integrar `NotificacionExito` en `DetalleOfertaPage`.
*   En `DetalleOfertaPage`, después de que el `ModalSolicitarTutoria` se cierra y se recibe una respuesta de éxito de `enviarSolicitudTutoriaAction`, activar `NotificacionExito` con el mensaje correcto. Implementar un temporizador para que desaparezca automáticamente.

Validaciones: No aplica a este componente.

Diseño: La notificación debe ser visualmente amigable (ej. fondo verde) y aparecer/desaparecer con una animación suave. El texto debe ser exacto según el CA. Utilizar Tailwind CSS 4.

Integración: `DetalleOfertaPage` orquesta la aparición de `NotificacionExito` basada en la respuesta del Server Action.

Criterios de Aceptación Técnica:
-   **CA: Solicitud Exitosa (Una Modalidad):** La notificación de éxito se muestra con el texto exacto: "¡Solicitud enviada! 1 horario propuesto. El tutor revisará tu solicitud pronto."
-   **CA: Solicitud Exitosa (Dual Modalidad):** Misma notificación.
-   La notificación es visible por un tiempo y luego desaparece automáticamente, o puede ser cerrada por el usuario.
---END_PROMPT---

---START_COMMIT--- HU06-T17 feat(component): crear NotificacionExito para solicitudes ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 18 TASK_TITLE: Integración `GET /api/ofertas/:id` HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La `DetalleOfertaPage` actualmente carga datos de ofertas desde un seed.
Objetivo: Activar la integración real con el backend para obtener los detalles de la oferta, reemplazando el uso del seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/app/oferta/[id]/page.tsx`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   Abrir `src/app/oferta/[id]/page.tsx`.
*   Localizar el bloque de código comentado que realiza la petición `fetch` al endpoint `GET /api/ofertas/:id`.
*   Comentar o eliminar la línea que carga los datos desde `src/lib/seeds/OfertaSeedData.ts`.
*   Descomentar el bloque `fetch` completo.
*   Verificar que la URL del endpoint sea correcta y que los headers (si los hubiera, ej. `Authorization`) estén configurados adecuadamente.
*   Manejar posibles errores de red o del servidor.

Validaciones: La estructura de la respuesta debe coincidir con `TutoriaDetailDto`.

Diseño: No aplica directamente, pero la UI debe renderizar correctamente con los datos reales.

Integración: Petición `fetch` a `GET /api/ofertas/:id`.

Criterios de Aceptación Técnica:
-   La petición `fetch` se ejecuta correctamente hacia el endpoint `GET /api/ofertas/:id`.
-   La respuesta del backend tiene la estructura esperada (`TutoriaDetailDto`).
-   Los componentes de la página (`ChipHorario`, `BotonSolicitarTutoria`, etc.) consumen los datos reales sin errores.
---END_PROMPT---

---START_COMMIT--- HU06-T18 fix(api): integrar GET /api/ofertas/:id ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 19 TASK_TITLE: Integración `POST /api/solicitudes/verificar-previa` HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El Server Action `verificarSolicitudPreviaAction` actualmente simula la respuesta de verificación de solicitudes previas con seed data.
Objetivo: Activar la integración real con el backend para verificar solicitudes previas, reemplazando el uso del seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/actions/solicitudes/verificarSolicitudPreviaAction.ts`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   Abrir `src/actions/solicitudes/verificarSolicitudPreviaAction.ts`.
*   Localizar el bloque de código comentado que realiza la petición `fetch` al endpoint `POST /api/solicitudes/verificar-previa`.
*   Comentar o eliminar la línea que retorna el seed data (`getSolicitudPreviaExisteSeed()`/`getSolicitudPreviaNoExisteSeed()`).
*   Descomentar el bloque `fetch` completo.
*   Verificar que la URL del endpoint y los headers (`Authorization` con JWT) sean correctos.
*   Asegurar que el `body` de la petición sea el `payload` correcto (`VerificarSolicitudPreviaPayload`).
*   Manejar posibles errores de red o del servidor, convirtiéndolos en respuestas `VerificarSolicitudPreviaResponseDto` con `existe: false` o un mensaje de error.

Validaciones: La estructura de la respuesta debe coincidir con `VerificarSolicitudPreviaResponseDto`.

Diseño: No aplica directamente, pero la `AlertaSolicitudPrevia` debe mostrarse según la respuesta real.

Integración: Petición `fetch` a `POST /api/solicitudes/verificar-previa`.

Criterios de Aceptación Técnica:
-   La petición `fetch` se ejecuta correctamente hacia el endpoint `POST /api/solicitudes/verificar-previa`.
-   La respuesta del backend tiene la estructura esperada (`VerificarSolicitudPreviaResponseDto`).
-   Los errores de red y del servidor se manejan adecuadamente.
-   La `AlertaSolicitudPrevia` se muestra correctamente según la respuesta del backend.
---END_PROMPT---

---START_COMMIT--- HU06-T19 fix(api): integrar POST /api/solicitudes/verificar-previa ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 20 TASK_TITLE: Integración `POST /api/solicitudes` HU_NUMBER: HU06 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El Server Action `enviarSolicitudTutoriaAction` actualmente simula el envío y la respuesta de una solicitud.
Objetivo: Activar la integración real con el backend para el envío de solicitudes de tutoría, reemplazando el uso del seed data y las validaciones simuladas.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/actions/solicitudes/enviarSolicitudTutoriaAction.ts`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
*   Abrir `src/actions/solicitudes/enviarSolicitudTutoriaAction.ts`.
*   Localizar el bloque de código comentado que realiza la petición `fetch` al endpoint `POST /api/solicitudes`.
*   Comentar o eliminar las líneas que retornan el seed data o simulan validaciones.
*   Descomentar el bloque `fetch` completo.
*   Verificar que la URL del endpoint y los headers (`Authorization` con JWT) sean correctos.
*   Asegurar que el `body` de la petición contenga `CreateSolicitudDto` formateado correctamente desde el `payload` recibido.
*   Manejar posibles errores de red, del servidor o de validación del backend, convirtiéndolos en un formato `{ success: false, errors: { campo: 'mensaje' } }` que pueda ser consumido por `ModalSolicitarTutoria`.

Validaciones: La estructura de la respuesta debe coincidir con `SolicitudEntity` en éxito, o un objeto de errores de validación en fallo.

Diseño: No aplica directamente, pero la `NotificacionExito` debe aparecer en caso de éxito, y los mensajes de error del backend deben mostrarse en el modal.

Integración: Petición `fetch` a `POST /api/solicitudes`.

Criterios de Aceptación Técnica:
-   La petición `fetch` se ejecuta correctamente hacia el endpoint `POST /api/solicitudes`.
-   La respuesta del backend tiene la estructura esperada (`SolicitudEntity` en éxito, errores de validación en fallo).
-   Los errores de red y del servidor se manejan adecuadamente.
-   La `NotificacionExito` se muestra en caso de éxito.
-   Los mensajes de error del backend se muestran correctamente en `ModalSolicitarTutoria`.
---END_PROMPT---

---START_COMMIT--- HU06-T20 fix(api): integrar POST /api/solicitudes ---END_COMMIT---