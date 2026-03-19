---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed para datos de tutorías. HU_NUMBER: HU08 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Crear un archivo de seed que contenga datos de ejemplo para solicitudes de tutoría, simulando la respuesta del backend para `TutoriaEntity`.
Objetivo: Permitir el desarrollo y la prueba independiente del frontend de la `BandejaEntradaPage` y el `ConfirmarTutoriaModal`, incluyendo solicitudes en estado 'pendiente' (virtual y presencial) y ya 'aceptadas'.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/lib/seeds/tutorias.ts`
- `src/interfaces/tutoria/TutoriaEntity.ts` (Si no existe, definir la interfaz aquí)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod, Zustand, react-icons, clsx.

Estructura:
- Definir una interfaz TypeScript `TutoriaEntity` que represente la estructura esperada de una solicitud de tutoría (id: string, estado: 'pendiente' | 'aceptada' | 'rechazada', modalidad: 'Virtual' | 'Presencial', enlaceReunion?: string, lugarEncuentro?: string, etc.).
- Crear un array `tutoriasSeedData: TutoriaEntity[]` con al menos 5 objetos `TutoriaEntity` de ejemplo, incluyendo:
    - Una solicitud `pendiente` de modalidad 'Virtual'.
    - Una solicitud `pendiente` de modalidad 'Presencial'.
    - Varias solicitudes ya `aceptadas` o `rechazadas` para simular la bandeja "Respondidas".
- Exportar el array `tutoriasSeedData` para que sea accesible.

Validaciones: N/A. Los datos de seed deben ser válidos según la interfaz definida.

Diseño: N/A.

Integración: N/A. Este seed será consumido directamente por los componentes frontend para simular datos.

Criterios de Aceptación Técnica:
- El seed contiene datos de al menos 5 tutorías variadas.
- Los datos incluyen solicitudes `pendiente` (virtual y presencial) y `aceptada`.
- La estructura de los objetos de tutoría en el seed coincide con la `TutoriaEntity` esperada del backend.
- El seed es accesible desde otros componentes para pruebas. ---END_PROMPT---

---START_COMMIT--- HU08-T01 feat(seed): crear datos de prueba para tutorias ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Modificación de SolicitudTutoriaCard para añadir botón 'Aceptar'. HU_NUMBER: HU08 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Bandeja de Entrada (Solicitud Pendiente Desplegada) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Añadir el botón "Aceptar" a la interfaz de la tarjeta `SolicitudTutoriaCard` cuando la solicitud está desplegada y en estado 'Pendiente'.
Objetivo: Proporcionar una acción clara para que el tutor inicie el proceso de aceptación de una tutoría.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/tutorias/SolicitudTutoriaCard/SolicitudTutoriaCard.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, clsx.

Estructura:
- El componente `SolicitudTutoriaCard` debe ser un Client Component (`'use client'`).
- Identificar la sección de la tarjeta donde se muestran los botones de acción cuando los detalles de la solicitud están desplegados.
- Implementar un botón "Aceptar" con estilos que sigan la guía de diseño (Tailwind CSS 4).
- El botón debe ser visible únicamente si el `estado` de la solicitud es 'pendiente'.
- Añadir un `onClick` handler al botón que, al ser presionado, capture el `tutoriaId` y la `modalidad` de la solicitud y los emita mediante una prop `onAcceptClick` (ej. `onAcceptClick(tutoriaId, modalidad)`).

Validaciones: N/A en este componente.

Diseño:
- El diseño del botón debe coincidir con el frame "T. Bandeja de Entrada (Solicitud Pendiente Desplegada)".
- Asegurar que la visibilidad condicional del botón sea fluida y responsiva.

Integración:
- El `onClick` del botón debe disparar una función `onAcceptClick` pasada por props, que será manejada en el componente padre.

Criterios de Aceptación Técnica:
- El botón "Aceptar" se renderiza correctamente en la tarjeta de solicitud.
- El botón solo es visible cuando la solicitud está en estado 'Pendiente'.
- Al hacer clic, el botón captura el `tutoriaId` y la `modalidad` de la solicitud y los pasa a una función prop. ---END_PROMPT---

---START_COMMIT--- HU08-T02 feat(card): agregar boton 'Aceptar' a SolicitudTutoriaCard ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Creación de componente ConfirmarTutoriaModal (estructura base). HU_NUMBER: HU08 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Confirmar Tutoría ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Crear el componente `ConfirmarTutoriaModal` que servirá como la ventana modal para confirmar la tutoría.
Objetivo: Implementar la estructura básica del modal, incluyendo el título, un recuadro informativo y los botones de acción principales.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/tutorias/ConfirmarTutoriaModal/ConfirmarTutoriaModal.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, clsx.

Estructura:
- Definir el componente `ConfirmarTutoriaModal` como un Client Component (`'use client'`).
- Las props esperadas serán `isOpen: boolean`, `onClose: () => void`, `tutoriaId: string`, `modalidad: 'Virtual' | 'Presencial'`.
- Implementar la estructura básica de un modal:
    - Un `div` para el overlay (fondo oscuro semitransparente que ocupe toda la pantalla).
    - Un `div` para el contenido central del modal (centrado vertical y horizontalmente).
- El modal debe contener:
    - Un título: "Confirmar Tutoría".
    - Un recuadro informativo (ej. un `div` con estilos de borde/fondo ligero) que muestre la modalidad elegida (ej. "Modalidad elegida: Virtual").
    - En la parte inferior, los botones "Cancelar" (alineado a la izquierda) y "Confirmar" (alineado a la derecha), con sus estilos correspondientes.

Validaciones: N/A en esta etapa de estructura base.

Diseño:
- El diseño general del modal (tamaño, centrado, tipografía, colores de fondo y bordes) debe coincidir con el frame "T. Confirmar Tutoría".
- Los botones "Cancelar" y "Confirmar" deben tener los estilos definidos en el prototipo.
- El recuadro informativo debe tener una apariencia distintiva pero sutil.

Integración: N/A.

Criterios de Aceptación Técnica:
- El componente `ConfirmarTutoriaModal` se renderiza como una ventana modal.
- Contiene el título "Confirmar Tutoría" y los botones "Cancelar" y "Confirmar".
- El diseño general coincide con el frame de Figma para la estructura base.
- Acepta las props `isOpen`, `onClose`, `tutoriaId`, `modalidad`. ---END_PROMPT---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Implementación de campo 'Enlace de la reunión' para modalidad 'Virtual' en ConfirmarTutoriaModal. HU_NUMBER: HU08 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Confirmar Tutoría ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Ajustar el `ConfirmarTutoriaModal` para que, cuando la `modalidad` sea 'Virtual', muestre el campo de texto "Enlace de la reunión *".
Objetivo: Capturar el enlace de la reunión para las tutorías virtuales.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/tutorias/ConfirmarTutoriaModal/ConfirmarTutoriaModal.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Dentro del `ConfirmarTutoriaModal`, implementar una lógica de renderizado condicional.
- Si la prop `modalidad` es 'Virtual', renderizar un componente `input` de tipo texto.
- La etiqueta del campo debe ser "Enlace de la reunión *" (el asterisco indica obligatoriedad).
- El campo debe estar listo para integrarse con un `form` (ej. `name="enlaceReunion"`).

Validaciones: N/A en este componente. La validación se hará en el Server Action.

Diseño:
- El campo de texto, su etiqueta y el asterisco deben coincidir con el diseño del frame "T. Confirmar Tutoría" para la modalidad virtual.
- Aplicar estilos de Tailwind CSS 4 para el input y la etiqueta.

Integración: N/A.

Criterios de Aceptación Técnica:
- El campo "Enlace de la reunión *" solo es visible si `modalidad` es 'Virtual'.
- El campo es un input de texto.
- La etiqueta y el asterisco son correctos. ---END_PROMPT---

---START_COMMIT--- HU08-T04 feat(modal): agregar campo enlace reunion a modal virtual ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Implementación de campo 'Lugar de encuentro' con contador para modalidad 'Presencial' en ConfirmarTutoriaModal. HU_NUMBER: HU08 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Confirmar Tutoría ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Ajustar el `ConfirmarTutoriaModal` para que, cuando la `modalidad` sea 'Presencial', muestre el campo de texto "Lugar de encuentro *" con un contador de caracteres "0/100" y un límite máximo de 100 caracteres.
Objetivo: Capturar el lugar de encuentro para las tutorías presenciales, con una guía de longitud para el usuario.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/tutorias/ConfirmarTutoriaModal/ConfirmarTutoriaModal.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Dentro del `ConfirmarTutoriaModal`, implementar una lógica de renderizado condicional.
- Si la prop `modalidad` es 'Presencial', renderizar un componente `textarea` (o un input de texto multilínea).
- La etiqueta del campo debe ser "Lugar de encuentro *" (el asterisco indica obligatoriedad).
- Implementar un estado local para controlar el valor del `textarea` y el contador de caracteres.
- El contador de caracteres debe mostrarse como "caracteresActuales/100" (ej. "0/100" si está vacío).
- El campo `textarea` debe tener un límite `maxLength` de 100 caracteres.
- El campo debe estar listo para integrarse con un `form` (ej. `name="lugarEncuentro"`).

Validaciones: N/A en este componente. La validación se hará en el Server Action. El límite `maxLength` es una validación UI.

Diseño:
- El campo de texto (textarea), su etiqueta, el asterisco y el contador deben coincidir con el diseño del frame "T. Confirmar Tutoría" para la modalidad presencial.
- Aplicar estilos de Tailwind CSS 4 para el textarea, la etiqueta y el contador.

Integración: N/A.

Criterios de Aceptación Técnica:
- El campo "Lugar de encuentro *" solo es visible si `modalidad` es 'Presencial'.
- El campo muestra un contador de caracteres "0/100".
- El input bloquea el ingreso de texto adicional al alcanzar los 100 caracteres.
- La etiqueta y el asterisco son correctos. ---END_PROMPT---

---START_COMMIT--- HU08-T05 feat(modal): agregar campo lugar encuentro y contador a modal presencial ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Implementación de lógica de apertura y cierre del ConfirmarTutoriaModal. HU_NUMBER: HU08 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Bandeja de Entrada (Solicitud Pendiente Desplegada) ---END_FRAME---

---START_FRAME--- T. Confirmar Tutoría ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Conectar el botón "Aceptar" de la `SolicitudTutoriaCard` con el `ConfirmarTutoriaModal` para controlar su visibilidad.
Objetivo: Permitir la apertura del modal al hacer clic en el botón "Aceptar" y cerrarlo al hacer clic en "Cancelar" o al completar exitosamente el flujo de confirmación.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/tutor/inbox/page.tsx`
- `src/components/tutorias/SolicitudTutoriaCard/SolicitudTutoriaCard.tsx`
- `src/components/tutorias/ConfirmarTutoriaModal/ConfirmarTutoriaModal.tsx`

Tecnologías: Next.js 16, React, TypeScript.

Estructura:
- **`src/app/tutor/inbox/page.tsx` (o componente padre que contenga la Bandeja de Entrada):**
    - Debe ser un Client Component (o contener un Client Component Wrapper para la lógica de estado).
    - Gestionar el estado local para controlar la visibilidad del modal (ej. `isModalOpen: boolean`).
    - Gestionar el estado local para almacenar el `tutoriaId` y la `modalidad` de la solicitud seleccionada que se pasará al modal (ej. `selectedTutoria: { id: string, modalidad: 'Virtual' | 'Presencial' } | null`).
    - Crear una función `handleAcceptClick(tutoriaId: string, modalidad: 'Virtual' | 'Presencial')` que actualice los estados `isModalOpen` a `true` y `selectedTutoria` con los datos de la solicitud.
    - Crear una función `handleCloseModal()` que actualice `isModalOpen` a `false` y resetee `selectedTutoria` a `null`.
    - Renderizar el `ConfirmarTutoriaModal` pasándole `isOpen={isModalOpen}`, `onClose={handleCloseModal}`, y los datos de `selectedTutoria`.
- **`src/components/tutorias/SolicitudTutoriaCard/SolicitudTutoriaCard.tsx`:**
    - Modificar el `onClick` del botón "Aceptar" para invocar la prop `onAcceptClick` (definida en Tarea 2), pasándole el `tutoriaId` y la `modalidad` de la solicitud actual.
- **`src/components/tutorias/ConfirmarTutoriaModal/ConfirmarTutoriaModal.tsx`:**
    - El botón "Cancelar" debe invocar la prop `onClose()` cuando se hace clic.
    - Asegurar que el modal recibe y utiliza las props `tutoriaId` y `modalidad` correctamente para mostrar la información o campos condicionales.

Validaciones: N/A.

Diseño: N/A.

Integración:
- El componente `SolicitudTutoriaCard` pasa la información al componente padre (`page.tsx`).
- El componente padre (`page.tsx`) gestiona el estado y abre el `ConfirmarTutoriaModal`.
- El `ConfirmarTutoriaModal` se cierra mediante la prop `onClose`.

Criterios de Aceptación Técnica:
- El modal se abre correctamente al hacer clic en "Aceptar" en la tarjeta de solicitud.
- El `tutoriaId` y la `modalidad` de la solicitud se pasan correctamente al modal.
- El modal se cierra al hacer clic en el botón "Cancelar".
- Al cerrarse por "Cancelar", la pantalla de Bandeja de Entrada no se altera y la solicitud permanece desplegada y pendiente. ---END_PROMPT---

---START_COMMIT--- HU08-T06 feat(modal): implementar logica de apertura y cierre del modal ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Implementación de Server Action 'confirmarTutoriaAction' con validación Zod y seed data. HU_NUMBER: HU08 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 2.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Implementar el Server Action `confirmarTutoriaAction` en Next.js.
Objetivo: Responsabilizarse de la validación inicial de los datos del formulario (enlace de reunión o lugar de encuentro) utilizando Zod, y simular la comunicación con el backend retornando seed data o errores mock. El código para la petición `fetch` al backend real debe estar escrito pero COMENTADO.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/tutoria/confirmarTutoriaAction.ts`
- `src/lib/seeds/tutorias.ts` (ya existente de Tarea 1, se importará)

Tecnologías: Next.js 16 Server Actions, TypeScript, Zod.

Estructura:
- Crear el archivo `src/actions/tutoria/confirmarTutoriaAction.ts` y marcarlo con `'use server'`.
- Importar `z` de `zod` y `revalidatePath` de `next/cache`.
- Importar el seed de tutorías (`tutoriasSeedData`) de `src/lib/seeds/tutorias.ts`.
- **Esquemas Zod:**
    - `confirmarVirtualSchema`:
        ```typescript
        const confirmarVirtualSchema = z.object({
            enlaceReunion: z.string().trim()
                .min(1, { message: "El enlace de reunión es obligatorio." })
                .url("Ingresa una URL válida (debe comenzar con https:// o http://)."),
        });
        ```
    - `confirmarPresencialSchema`:
        ```typescript
        const confirmarPresencialSchema = z.object({
            lugarEncuentro: z.string().trim()
                .min(1, { message: "El lugar de encuentro es obligatorio." })
                .min(10, { message: "Mínimo 10 caracteres para el lugar." })
                .max(100, { message: "Máximo 100 caracteres para el lugar." }),
        });
        ```
- **Función `confirmarTutoriaAction(formData: FormData)`:**
    - Extraer `tutoriaId`, `modalidad`, `enlaceReunion`, `lugarEncuentro` del `FormData`.
    - Implementar un bloque `try-catch` para manejar la validación y la lógica del action.
    - **Validación Condicional Zod:**
        - Si `modalidad` es 'Virtual', aplicar `confirmarVirtualSchema.parse()`.
        - Si `modalidad` es 'Presencial', aplicar `confirmarPresencialSchema.parse()`.
        - En caso de `z.ZodError`, retornar `{ success: false, errors: error.flatten().fieldErrors }`.
    - **Fase de Desarrollo (Seed Data):**
        - Después de la validación Zod exitosa, simular la actualización del estado de la tutoría en el `tutoriasSeedData` (esto es opcional para una simulación más completa, pero no estrictamente necesario si solo se retorna el mock de éxito).
        - Retornar `{ success: true, message: 'Tutoría confirmada exitosamente (SEED).' }`.
        - Opcional: `await new Promise(resolve => setTimeout(resolve, 1000));` para simular latencia.
    - **Fase de Integración (Comentado):**
        - Escribir (pero COMENTAR completamente) el código `fetch` para la petición `PUT` al endpoint del backend: `PUT /api/tutorias/:id/confirmar`.
        - Incluir `method`, `headers` (`Content-Type: application/json`, `Authorization` si aplica), y `body` (`JSON.stringify(validatedData)`).
        - Incluir manejo de errores para la respuesta `!response.ok` y errores de red, retornando `{ success: false, message: 'Error al confirmar la tutoría.' }`.
- **`revalidatePath`:**
    - En el bloque de éxito (ya sea el mock o el `fetch` comentado), añadir `revalidatePath('/tutor/inbox')` para invalidar el caché de la ruta y forzar una nueva obtención de datos al componente padre.

Validaciones:
- Zod para `enlaceReunion`: obligatorio, formato URL válido (HTTP/HTTPS).
- Zod para `lugarEncuentro`: obligatorio, mínimo 10 caracteres, máximo 100 caracteres.
- Los mensajes de error de Zod deben ser exactamente los especificados en los criterios.

Diseño: N/A.

Integración:
- Se integra con el `FormData` del formulario frontend.
- Prepara la base para la integración real con el backend NestJS (comentado).
- Utiliza el seed de tutorías para la fase de desarrollo.

Criterios de Aceptación Técnica:
- El archivo `src/actions/tutoria/confirmarTutoriaAction.ts` está creado y es un Server Action.
- Los esquemas Zod para `Virtual` y `Presencial` están correctamente implementados con los mensajes de error exactos especificados.
- El Server Action procesa `FormData` y aplica validaciones Zod correctamente.
- Retorna un objeto `{ success: false, errors: ... }` con los mensajes de error exactos de Zod cuando la validación falla.
- En caso de validación exitosa, retorna un mock de éxito `{ success: true, message: ... }`.
- El bloque de código `fetch` para el backend real está presente y completamente COMENTADO.
- La función `revalidatePath('/tutor/inbox')` está incluida en la lógica de éxito. ---END_PROMPT---

---START_COMMIT--- HU08-T07 feat(action): crear confirmarTutoriaAction con Zod y seed ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 8 TASK_TITLE: Integración de ConfirmarTutoriaModal con 'confirmarTutoriaAction' y manejo de errores/estados de carga. HU_NUMBER: HU08 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Confirmar Tutoría ---END_FRAME---

---START_ESTIMATION--- 2H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Integrar el formulario del `ConfirmarTutoriaModal` con el `confirmarTutoriaAction` de Next.js.
Objetivo: Enviar los datos del formulario al Server Action, mostrar estados de carga, renderizar mensajes de error de validación específicos o un mensaje de error genérico, y cerrar el modal al éxito.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/tutorias/ConfirmarTutoriaModal/ConfirmarTutoriaModal.tsx`
- (Opcional) `src/components/ui/ErrorMessage/ErrorMessage.tsx` si se crea un componente reutilizable para errores.

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, `useFormState` (React), Zod (para entender la estructura de errores), clsx.

Estructura:
- Modificar `src/components/tutorias/ConfirmarTutoriaModal/ConfirmarTutoriaModal.tsx` para ser un Client Component.
- Utilizar el hook `useFormState` de React para gestionar el estado del formulario y la respuesta del `confirmarTutoriaAction`.
- Envolver los campos y botones de confirmación dentro de un elemento `<form>` que tenga como `action` el `confirmarTutoriaAction`.
- Incluir `hidden inputs` dentro del formulario para `tutoriaId` y `modalidad`, de modo que se envíen automáticamente con el `FormData`.
- **Manejo de Carga:**
    - Utilizar el estado de `pending` del formulario (o un `useState` para el botón "Confirmar") para deshabilitar el botón "Confirmar" y/o mostrar un spinner durante el envío.
- **Manejo de Errores de Validación:**
    - Si la respuesta del Server Action contiene `{ success: false, errors: { campo: ['mensaje'] } }`:
        - Mostrar el mensaje de error correspondiente (ej. `errors.enlaceReunion[0]`) justo debajo del campo afectado (input o textarea).
        - Utilizar estilos de texto rojo (Tailwind CSS 4) para estos mensajes.
- **Manejo de Errores Genéricos:**
    - Si la respuesta contiene `{ success: false, message: '...' }` (error no de validación de campo):
        - Mostrar este `message` en un área visible dentro del modal, por ejemplo, encima de los botones o debajo del título, con estilos de error.
- **Manejo de Éxito:**
    - Si la respuesta del Server Action es `{ success: true, message: '...' }`:
        - Invocar la prop `onClose()` del modal para cerrarlo.
        - (Opcional) Mostrar una notificación de éxito efímera (toast) si el sistema de notificaciones está disponible.

Validaciones: Los mensajes de error exactos ("El enlace de reunión es obligatorio.", "Ingresa una URL válida", "Mínimo 10 caracteres para el lugar.", etc.) deben ser renderizados correctamente.

Diseño:
- Los mensajes de error deben aparecer inmediatamente debajo de su campo correspondiente, en color rojo, siguiendo el diseño del frame "T. Confirmar Tutoría".
- El botón de "Confirmar" debe reflejar el estado de carga (deshabilitado o con un spinner).

Integración:
- El formulario se integra con el Server Action `confirmarTutoriaAction`.
- Los campos de entrada (`input`, `textarea`) deben tener el atributo `name` (`enlaceReunion`, `lugarEncuentro`) para que `FormData` los capture correctamente.

Criterios de Aceptación Técnica:
- El formulario del modal se envía correctamente al `confirmarTutoriaAction`.
- Se muestra un estado de carga mientras se espera la respuesta del Server Action.
- Los mensajes de error de validación (ej. "El enlace de reunión es obligatorio.", "Mínimo 10 caracteres para el lugar.") se muestran correctamente debajo de los campos correspondientes.
- Se muestra un mensaje de error genérico si el Server Action falla con un error no relacionado con la validación de campos.
- El modal se cierra automáticamente al recibir una respuesta exitosa del Server Action. ---END_PROMPT---

---START_COMMIT--- HU08-T08 feat(modal): integrar modal con server action y manejo de errores ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 9 TASK_TITLE: Integración final de 'confirmarTutoriaAction' con el backend real (descomentar fetch). HU_NUMBER: HU08 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Finalizar la integración del Server Action `confirmarTutoriaAction` con el backend real de NestJS.
Objetivo: Descomentar el bloque de código de la petición `fetch` que apunta al endpoint `PUT /api/tutorias/:id/confirmar`, y eliminar o comentar el retorno del seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/tutoria/confirmarTutoriaAction.ts`

Tecnologías: Next.js 16 Server Actions, TypeScript.

Estructura:
- Abrir el archivo `src/actions/tutoria/confirmarTutoriaAction.ts`.
- Localizar el bloque de código que actualmente retorna el seed data o un mock de éxito y **COMENTARLO o ELIMINARLO**.
- Localizar el bloque de código de la petición `fetch` que está COMENTADO (implementado en Tarea 7) y **DESCOMENTARLO por completo**.
- Verificar la URL del endpoint: debe ser `process.env.NEXT_PUBLIC_API_URL/tutorias/${tutoriaId}/confirmar`.
- Asegurar que los `headers` estén configurados correctamente, incluyendo:
    - `Content-Type: application/json`
    - `Authorization: Bearer YOUR_AUTH_TOKEN` (si la autenticación ya está implementada y el token disponible, de lo contrario, dejar como `TODO` o usar un token mock si el backend lo permite para pruebas).
- Confirmar que el `body` de la petición (`JSON.stringify(validatedData)`) se envía con la estructura esperada por el DTO de NestJS. `validatedData` contendrá `enlaceReunion` o `lugarEncuentro` según la modalidad.
- Asegurar que el manejo de respuestas `!response.ok` y los errores de red estén contemplados, retornando mensajes de error significativos.
- Confirmar que `revalidatePath('/tutor/inbox')` se mantiene en la lógica de éxito para asegurar la actualización de la UI.

Validaciones: Manejo de posibles errores devueltos por la API real (ej. 400 Bad Request, 401 Unauthorized, 500 Internal Server Error).

Diseño: N/A.

Integración:
- Conexión directa con el backend NestJS a través de la API REST.

Criterios de Aceptación Técnica:
- El `confirmarTutoriaAction` realiza una petición `PUT` exitosa al endpoint real del backend.
- La respuesta del backend se procesa correctamente, y los datos (si existen) coinciden con el contrato esperado.
- La UI se actualiza correctamente tras la confirmación (modal se cierra, solicitud se elimina de "Pendientes", contadores actualizados).
- Los errores devueltos por el backend real son manejados y mostrados en el frontend de manera adecuada. ---END_PROMPT---

---START_COMMIT--- HU08-T09 fix(action): integrar confirmarTutoriaAction con backend real ---END_COMMIT---