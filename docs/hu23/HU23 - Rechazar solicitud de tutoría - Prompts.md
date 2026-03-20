---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed para la respuesta de una solicitud rechazada HU_NUMBER: HU23 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Crear un seed de datos iniciales que simule la estructura de una solicitud de tutoría *después* de ser rechazada por el backend. Este seed será utilizado por el Server Action durante la fase de desarrollo para permitir que el frontend avance de manera independiente.
Objetivo: Definir y exportar un objeto de tipo `Solicitud` con estado 'Rechazada' y campos relevantes de rechazo, para simular la respuesta del backend.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/seed/RechazoSolicitudResponseSeed.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura: Definir una interfaz `Solicitud` que represente la respuesta del backend. Crear un objeto constante siguiendo esta interfaz.

Validaciones: Asegurarse que la estructura del seed coincida con la esperada del `SolicitudDto` del backend.

Diseño: No aplica.

Integración: Este seed se integrará con el Server Action `rechazarSolicitudAction`.

Criterios de Aceptación Técnica:
- El seed contiene un objeto de solicitud que simula una respuesta de rechazo exitosa del backend.
- La estructura del objeto en el seed coincide exactamente con el `SolicitudDto` que el backend retornaría tras un rechazo.
- Los campos `status`, `rejectionReason`, `rejectionComment` (si aplica) y `respondedAt` están presentes y reflejan un estado de rechazo.
---END_PROMPT---

---START_COMMIT--- HU23-T1 chore(seed): crear seed para respuesta de rechazo de solicitud ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Implementación del botón "Rechazar" en `SolicitudTutoríaCard` HU_NUMBER: HU23 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Bandeja de Entrada (Solicitud Pendiente Desplegada) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Modificar el componente `SolicitudTutoríaCard` para incluir el botón "Rechazar" (fondo blanco) visible cuando la solicitud está desplegada y en estado 'Pendiente', e implementar su lógica para abrir el modal de rechazo.
Objetivo: Añadir un botón "Rechazar" estilizado, condicionalmente visible, en el componente `SolicitudTutoríaCard` y configurar su acción para activar la apertura del modal `RechazarSolicitudModal`, pasando el ID de la solicitud.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/solicitudes-ui/solicitud-tutoria-card/SolicitudTutoriaCard.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura: Modificar el componente `SolicitudTutoriaCard` (Client Component) para incluir el botón. Utilizar estado local para controlar la visibilidad del modal y pasar el `solicitudId`.

Validaciones: La visibilidad del botón debe basarse en el estado 'Pendiente' de la solicitud.

Diseño: El botón debe tener fondo blanco y texto oscuro, siguiendo el estilo del frame "T. Bandeja de Entrada (Solicitud Pendiente Desplegada)". Asegurar el responsive design con Tailwind 4.

Integración: El botón activará la apertura del modal `RechazarSolicitudModal`.

Criterios de Aceptación Técnica:
- El botón "Rechazar" es visible en `SolicitudTutoríaCard` solo cuando la fila está desplegada y la solicitud está en estado 'Pendiente'.
- Al hacer clic en "Rechazar", se activa un mecanismo para abrir el modal `RechazarSolicitudModal`.
- El `solicitudId` de la tarjeta se guarda o se pasa correctamente para ser utilizado por el modal.
---END_PROMPT---

---START_COMMIT--- HU23-T2 feat(component): agregar boton "Rechazar" a SolicitudTutoriaCard ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Estructura y maquetación inicial del modal "Rechazar Solicitud" HU_NUMBER: HU23 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Rechazar Solicitud de Tutoría ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Crear el componente `RechazarSolicitudModal` con su estructura básica y maquetación inicial, incluyendo el título, texto descriptivo, y los botones "Cancelar" y "Confirmar Rechazo" (este último inicialmente deshabilitado).
Objetivo: Desarrollar el componente `RechazarSolicitudModal` desde cero, estableciendo su esqueleto visual con los elementos estáticos y los botones de acción iniciales según el prototipo.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/modals/rechazar-solicitud-modal/RechazarSolicitudModal.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, shadcn/ui (para componentes de diálogo).

Estructura: Crear `RechazarSolicitudModal` como un Client Component (`'use client'`). Utilizar un componente de diálogo/modal de `shadcn/ui` para la base. Definir props `isOpen`, `onClose` y `solicitudId`.

Validaciones: El botón "Confirmar Rechazo" debe estar deshabilitado inicialmente.

Diseño: Maquetar el modal con el título "Rechazar Solicitud" y el texto "Selecciona un motivo para ayudarle a entender la situación.". Posicionar los botones "Cancelar" y "Confirmar Rechazo" con los estilos del frame "T. Rechazar Solicitud de Tutoría". Asegurar responsive design con Tailwind 4.

Integración: Este modal será abierto por el `SolicitudTutoriaCard`.

Criterios de Aceptación Técnica:
- El modal `RechazarSolicitudModal` se renderiza y se oculta correctamente en respuesta a las props `isOpen`/`onClose`.
- Contiene el texto exacto: "Selecciona un motivo para ayudarle a entender la situación.".
- El botón "Confirmar Rechazo" está visible pero deshabilitado al abrir el modal.
- El botón "Cancelar" está visible y funcional, cerrando el modal.
---END_PROMPT---

---START_COMMIT--- HU23-T3 feat(modal): crear estructura y maquetacion inicial de modal de rechazo ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Implementación de radio buttons de motivo y campo "Otro" condicional HU_NUMBER: HU23 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Rechazar Solicitud de Tutoría ---END_FRAME---

---START_ESTIMATION--- 2H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Integrar los cuatro radio buttons predefinidos para los motivos de rechazo en el modal y la lógica para mostrar condicionalmente el campo de comentario cuando se selecciona la opción "Otro".
Objetivo: Añadir los radio buttons al `RechazarSolicitudModal` y habilitar/deshabilitar condicionalmente un campo de comentario (`textarea`) cuando el usuario selecciona la opción "Otro".

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/modals/rechazar-solicitud-modal/RechazarSolicitudModal.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, shadcn/ui (para radio group).

Estructura: Dentro de `RechazarSolicitudModal` (Client Component), utilizar `useState` para gestionar el motivo de rechazo seleccionado. Renderizar un `RadioGroup` de `shadcn/ui` con los cuatro motivos. Si el motivo seleccionado es "Otro", renderizar un `textarea` adicional.

Validaciones: Los radio buttons deben estar deseleccionados por defecto. El `textarea` solo debe aparecer si se selecciona "Otro".

Diseño: Ajustar el tamaño del modal y la disposición de los elementos para acomodar el campo de comentario cuando se expande, manteniendo la estética del frame "T. Rechazar Solicitud de Tutoría". Asegurar responsive design con Tailwind 4.

Integración: No aplica integración externa en esta tarea, solo lógica interna del componente.

Criterios de Aceptación Técnica:
- Los cuatro radio buttons se muestran correctamente y están deseleccionados al abrir el modal.
- Al seleccionar un radio button, su estado se actualiza visualmente.
- El campo "Comentario adicional (opcional)" solo aparece cuando se selecciona el radio button "Otro".
- El modal se expande visualmente cuando el campo de comentario aparece, manteniendo una buena UX.
---END_PROMPT---

---START_COMMIT--- HU23-T4 feat(modal): implementar radio buttons y campo "Otro" condicional ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Implementación de validaciones Zod y React Hook Form para el modal HU_NUMBER: HU23 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Rechazar Solicitud de Tutoría ---END_FRAME---

---START_ESTIMATION--- 2.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Integrar `react-hook-form` y `zod` para gestionar el estado del formulario y aplicar las validaciones necesarias en el modal "Rechazar Solicitud", incluyendo la validación de la selección del motivo y la longitud del comentario.
Objetivo: Implementar un esquema Zod para validar los datos del formulario de rechazo y conectar `react-hook-form` para manejar el estado, el envío y la habilitación/deshabilitación condicional del botón de confirmación.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/lib/validations/rechazar-solicitud.schema.ts`
- `src/components/modals/rechazar-solicitud-modal/RechazarSolicitudModal.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, React Hook Form, Zod, zod-resolver.

Estructura: Crear el esquema Zod en `src/lib/validations/rechazar-solicitud.schema.ts`. En `RechazarSolicitudModal` (Client Component), inicializar `useForm` con `zodResolver`. Conectar los radio buttons y el `textarea` mediante `register` de `react-hook-form`.

Validaciones: El esquema Zod debe:
- `reason`: Ser requerido y corresponder a uno de los motivos predefinidos.
- `comment`: Ser opcional, de tipo string, y con `maxLength(300)`, pero solo si `reason` es "Otro".
El botón "Confirmar Rechazo" debe habilitarse cuando cualquier motivo sea seleccionado y deshabilitarse si el comentario (cuando "Otro" está seleccionado) excede los 300 caracteres o si no hay un motivo seleccionado.

Diseño: No aplica cambios de diseño directos, pero la habilitación/deshabilitación del botón es un efecto visible.

Integración: `react-hook-form` gestionará el estado del formulario.

Criterios de Aceptación Técnica:
- El botón "Confirmar Rechazo" se habilita tan pronto como se selecciona cualquier radio button.
- Si se selecciona "Otro" y el comentario excede los 300 caracteres, el botón "Confirmar Rechazo" se deshabilita.
- Los errores de validación (ej. motivo no seleccionado, comentario muy largo) son gestionados por `react-hook-form` y listos para ser mostrados al usuario.
---END_PROMPT---

---START_COMMIT--- HU23-T5 feat(modal): integrar Zod y React Hook Form para validaciones ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Implementación de contador y bloqueo de caracteres en campo de comentario HU_NUMBER: HU23 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Rechazar Solicitud de Tutoría ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Implementar la funcionalidad del contador de caracteres y el bloqueo de ingreso de texto en el campo "Comentario adicional (opcional)" del modal, asegurando que no se pueda superar el límite de 300 caracteres.
Objetivo: Añadir un contador de caracteres debajo del `textarea` del comentario que se actualice en tiempo real y limitar la entrada de texto a un máximo de 300 caracteres.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/modals/rechazar-solicitud-modal/RechazarSolicitudModal.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura: Dentro de `RechazarSolicitudModal` (Client Component), gestionar el estado del comentario con `useState` (o a través de `react-hook-form`). Mostrar el contador debajo del `textarea`. Utilizar la prop `maxLength` del `textarea` y/o lógica de JavaScript para limitar la entrada.

Validaciones: El contador debe mostrar "X/300". El `textarea` no debe permitir más de 300 caracteres.

Diseño: El contador debe ser discreto y coherente con el estilo del modal, reflejando el límite de 300 caracteres como en el frame "T. Rechazar Solicitud de Tutoría". Asegurar responsive design con Tailwind 4.

Integración: Esta funcionalidad se integra con el campo de comentario dentro del modal.

Criterios de Aceptación Técnica:
- El contador de caracteres se muestra debajo del campo de comentario y se actualiza dinámicamente.
- El contador muestra "300/300" cuando el comentario alcanza los 300 caracteres.
- El usuario no puede ingresar más de 300 caracteres en el campo de comentario.
- Visual y funcionalmente, el límite de 300 caracteres no se puede sobrepasar.
---END_PROMPT---

---START_COMMIT--- HU23-T6 feat(modal): implementar contador y bloqueo de caracteres en comentario ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Implementación de Server Action `rechazarSolicitudAction` (con seed) HU_NUMBER: HU23 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 2H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Implementar el Server Action `rechazarSolicitudAction` en Next.js. Inicialmente, este Server Action realizará validaciones básicas y retornará una respuesta simulada utilizando el seed data. El código real de la petición `fetch` al backend estará presente pero comentado, siguiendo el patrón de desarrollo progresivo.
Objetivo: Crear el Server Action `rechazarSolicitudAction` que simula el proceso de rechazo de una solicitud utilizando datos de seed y realiza validaciones básicas, mientras se prepara el código para la integración real con el backend.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/solicitudes/rechazarSolicitudAction.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura: Crear `rechazarSolicitudAction` como una función asíncrona marcada con `'use server'` en `src/actions/solicitudes/rechazarSolicitudAction.ts`. Recibirá `formData` (o un objeto de datos directos) con `solicitudId`, `reason` y `comment?`.

Validaciones: Incluir validaciones básicas para la presencia de `solicitudId` y `reason`, y la longitud de `comment` (máx 300 si `reason` es "Otro").

Diseño: No aplica.

Integración:
- Importar y utilizar `RECHAZO_SOLICITUD_SEED_RESPONSE` de `src/seed/RechazoSolicitudResponseSeed.ts`.
- Simular una respuesta exitosa retornando `{ success: true, message: '...', solicitud: RECHAZO_SOLICITUD_SEED_RESPONSE }`.
- Incluir `revalidatePath('/tutor/inbox')` al final.
- Escribir el código completo del `fetch` a `POST /api/solicitudes/:id/rechazar` con `method`, `headers` (Content-Type, Authorization si aplica) y `body` (`JSON.stringify({ reason, comment })`). **Este bloque de código de `fetch` debe estar completamente comentado.**

Criterios de Aceptación Técnica:
- El `rechazarSolicitudAction` ejecuta las validaciones básicas de `solicitudId`, `reason` y `comment` (longitud).
- El Server Action retorna una respuesta `{ success: true, ... }` usando el seed data para simular el éxito.
- El código de integración con el backend (petición `fetch`) está completo y COMENTADO.
- Se llama a `revalidatePath('/tutor/inbox')` después de la respuesta exitosa (simulada).
---END_PROMPT---

---START_COMMIT--- HU23-T7 feat(action): implementar Server Action de rechazo con seed ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 8 TASK_TITLE: Manejo de estados y submit del formulario del modal HU_NUMBER: HU23 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Rechazar Solicitud de Tutoría ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Conectar el formulario del modal `RechazarSolicitudModal` con el Server Action `rechazarSolicitudAction`, gestionando los estados de carga, el cierre del modal al éxito y el manejo básico de errores.
Objetivo: Implementar la función `onSubmit` en el `RechazarSolicitudModal` para invocar el Server Action `rechazarSolicitudAction`, manejar los estados de carga con `useTransition` o `useState`, y responder a los resultados (cerrar modal en éxito, mantener abierto en error).

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/modals/rechazar-solicitud-modal/RechazarSolicitudModal.tsx`

Tecnologías: Next.js 16, React, TypeScript, React Hook Form (para `onSubmit`), `useTransition` (React Hook).

Estructura: En `RechazarSolicitudModal` (Client Component), integrar la función `onSubmit` con el formulario. Utilizar `useTransition` para gestionar el estado `isPending` y deshabilitar el botón de confirmación durante el envío.

Validaciones: Asegurar que el botón "Confirmar Rechazo" se deshabilita mientras `isPending` es true.

Diseño: El botón "Confirmar Rechazo" debe reflejar el estado de carga (ej. con un spinner o cambio de opacidad) mientras el Server Action está en progreso.

Integración:
- Invocar `src/actions/solicitudes/rechazarSolicitudAction.ts` con los datos validados del formulario y el `solicitudId`.
- Si la respuesta es `{ success: true }`, llamar a `onClose()` para cerrar el modal y `reset()` el formulario.
- Si la respuesta es `{ success: false }`, registrar el error en consola (el manejo visual se realizará en T11).

Criterios de Aceptación Técnica:
- Al hacer clic en "Confirmar Rechazo", el botón se deshabilita temporalmente mientras se procesa la acción.
- Si `rechazarSolicitudAction` retorna éxito, el modal se cierra y el formulario se resetea.
- Si `rechazarSolicitudAction` retorna un error, el modal permanece abierto y el error es capturado internamente.
---END_PROMPT---

---START_COMMIT--- HU23-T8 feat(modal): conectar formulario con Server Action y gestionar estados ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 9 TASK_TITLE: Asegurar la revalidación y actualización de la UI en `BandejaEntradaPage` HU_NUMBER: HU23 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Bandeja de Entrada (Solicitud Pendiente Desplegada) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Verificar que la `BandejaEntradaPage` se actualice correctamente después de un rechazo exitoso, lo que implica que la solicitud removida de "Pendientes" y los contadores numéricos de "Pendientes" y "Respondidas" se vean reflejados. Esto se logra principalmente a través del `revalidatePath` en el Server Action.
Objetivo: Confirmar que la `BandejaEntradaPage` (Server Component) revalida sus datos y renderiza la UI actualizada de forma automática tras el rechazo de una solicitud vía `rechazarSolicitudAction`.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/tutor/inbox/page.tsx` (Verificación, no modificación directa en esta tarea salvo que se detecte una anomalía).
- `src/actions/solicitudes/rechazarSolicitudAction.ts` (Verificar que `revalidatePath` esté presente y sea efectivo).

Tecnologías: Next.js 16, React, TypeScript.

Estructura: `BandejaEntradaPage` debe ser un Server Component que obtiene sus datos de solicitudes y contadores de una fuente que se beneficie de la revalidación (ej. `fetch` sin caché `no-store` o `revalidate`).

Validaciones: Se verificará visualmente que los cambios se reflejan en la UI sin recarga manual.

Diseño: No aplica cambios de diseño, solo actualización de datos en la UI.

Integración: La revalidación se activará desde el `rechazarSolicitudAction` a través de `revalidatePath('/tutor/inbox')`.

Criterios de Aceptación Técnica:
- Después de un rechazo exitoso, la solicitud correspondiente es removida de la pestaña "Pendientes" en `BandejaEntradaPage`.
- El contador numérico de "Pendientes" se reduce en 1.
- El contador numérico de "Respondidas" aumenta en 1.
- Estos cambios se reflejan automáticamente en la UI sin necesidad de recargar manualmente la página.
---END_PROMPT---

---START_COMMIT--- HU23-T9 chore(ui): verificar revalidacion de BandejaEntradaPage tras rechazo ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 10 TASK_TITLE: Integración con backend de `rechazarSolicitudAction` (descomentar fetch) HU_NUMBER: HU23 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Realizar el paso final de integración con el backend. Esta tarea consiste en descomentar el código de la petición `fetch` pre-escrito en el Server Action `rechazarSolicitudAction` y eliminar el retorno del seed data, permitiendo la comunicación real con el endpoint `POST /api/solicitudes/:id/rechazar`.
Objetivo: Habilitar la comunicación real con el backend en `rechazarSolicitudAction` descomentando la llamada `fetch` y removiendo el mock de datos, para que la acción procese solicitudes de rechazo de forma efectiva.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/solicitudes/rechazarSolicitudAction.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura: Modificar el Server Action `rechazarSolicitudAction`. Eliminar el retorno del seed data y descomentar el bloque `try-catch` que contiene la llamada `fetch` al backend.

Validaciones: Asegurarse que los datos enviados (`reason`, `comment`) y recibidos por el `fetch` concuerden con las especificaciones del backend (`RejectSolicitudDto`).

Diseño: No aplica.

Integración:
- Descomentar la lógica de `fetch` a `POST ${process.env.BACKEND_API_URL}/api/solicitudes/${solicitudId}/rechazar`.
- Verificar `method: 'POST'`, `headers` (`Content-Type`, `Authorization`), y `body` (`JSON.stringify({ reason, comment })`).
- Asegurar que la respuesta del backend sea manejada (`response.ok`).
- Confirmar que `revalidatePath('/tutor/inbox')` se ejecuta después de una respuesta exitosa del backend.

Criterios de Aceptación Técnica:
- El `rechazarSolicitudAction` realiza una petición HTTP POST real al endpoint del backend.
- La petición se envía con los datos correctos (`solicitudId`, `reason`, `comment`).
- La respuesta del backend es recibida y procesada correctamente por el Server Action.
- El `revalidatePath('/tutor/inbox')` se ejecuta tras una respuesta exitosa del backend.
---END_PROMPT---

---START_COMMIT--- HU23-T10 chore(action): integrar Server Action de rechazo con backend real ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 11 TASK_TITLE: Manejo de errores visuales para la acción de rechazo HU_NUMBER: HU23 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT---
Contexto: Mejorar la experiencia de usuario en el modal `RechazarSolicitudModal` mostrando mensajes de error claros y amigables cuando el Server Action `rechazarSolicitudAction` retorna un fallo (ej. error de validación, error de red, error del servidor).
Objetivo: Implementar un sistema de notificación visual (ej. toasts) para mostrar mensajes de error al usuario cuando la acción de rechazo de solicitud falla, mejorando la retroalimentación.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/modals/rechazar-solicitud-modal/RechazarSolicitudModal.tsx`
- (Posiblemente un componente de `ToastProvider` o similar si no existe)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, react-toast o shadcn/ui toast.

Estructura: En `RechazarSolicitudModal` (Client Component), utilizar un hook o una función del sistema de notificación (ej. `toast()`).

Validaciones: Mostrar el `message` de error retornado por `rechazarSolicitudAction` si `success: false`.

Diseño: Los mensajes de error deben ser visibles, claros y consistentes con el diseño general de la aplicación, utilizando un componente de toast o notificación.

Integración: La función `onSubmit` en `RechazarSolicitudModal` invocará el sistema de notificación cuando el `rechazarSolicitudAction` devuelva un resultado de error.

Criterios de Aceptación Técnica:
- Si la acción de rechazo falla (desde el Server Action), se muestra un mensaje de error claro y conciso al usuario (ej. usando un toast).
- El modal permanece abierto, permitiendo al usuario ver el mensaje de error y reintentar si es posible.
- Los mensajes de error son informativos y ayudan al usuario a entender la situación.
---END_PROMPT---

---START_COMMIT--- HU23-T11 feat(ui): implementar manejo visual de errores en modal de rechazo ---END_COMMIT---