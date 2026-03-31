---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed para datos de tutorías en diferentes estados. HU_NUMBER: HU48 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se requiere un conjunto de datos iniciales que simulen tutorías en diversos estados (`sin confirmar`, `pendiente`, `inasistencia`) para facilitar el desarrollo y las pruebas del frontend de manera independiente, sin depender del backend en las fases iniciales.
Objetivo: Crear un archivo de seed que contenga datos de ejemplo para las tutorías, respetando la estructura del `TutoriaResponseDto` y exportando una función para obtener estos datos.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/seed/TutoriasSeedData.ts`
*   `src/interfaces/tutoria/TutoriaResponseDto.ts` (Si no existe, definir la interfaz. Si existe, asegurar que coincida con el contrato esperado).

Tecnologías: Next.js 16, TypeScript, React.

Estructura:
*   El archivo `TutoriasSeedData.ts` debe contener un array de objetos que simulen la `TutoriaResponseDto`.
*   Exportar una función (ej. `getTutoriasSeed()`) que devuelva este array.

Validaciones:
*   La estructura de los objetos de tutoría debe ser consistente con la interfaz `TutoriaResponseDto`.

Diseño: N/A.

Integración:
*   El seed será consumido por componentes en el frontend, como `app/tutor/historial/page.tsx`, para cargar datos simulados.

Criterios de Aceptación Técnica:
*   El seed contiene tutorías de ejemplo en los estados `sin confirmar`, `pendiente` e `inasistencia`.
*   Cada tutoría en el seed incluye todos los campos esperados del `TutoriaResponseDto`.
*   La estructura de datos del seed coincide con el contrato de la API.
---END_PROMPT---

---START_COMMIT--- HU48-T01 feat(seed): crear datos de tutorías para estados de inasistencia ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: `TutoriaCard` - Implementar botón 'Inasistencia' y estado visual. HU_NUMBER: HU48 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Historial. [1NsGczwD7An3K0oG2ECbjG0R_sTKImAcl](https://drive.google.com/file/d/1NsGczwD7An3K0oG2ECbjG0R_sTKImAcl/view?usp=drivesdk) ---END_FRAME---

---START_ESTIMATION--- 0.8H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El componente `TutoriaCard` es clave para mostrar las tutorías en el historial del tutor. Se requiere añadir un botón de acción "Inasistencia" para tutorías que están "sin confirmar" y una representación visual clara de las tutorías que ya están en estado "inasistencia".
Objetivo: Modificar `TutoriaCard` para añadir condicionalmente un botón 'Inasistencia' (con borde rojo) para tutorías "sin confirmar" y mostrar una etiqueta estática (con contorno rojo e ícono "X") para tutorías en estado "inasistencia", ocultando otros botones de acción en este último caso.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/tutoria/tutoria-card/TutoriaCard.tsx`
*   `src/app/tutor/historial/page.tsx` (para el manejo de la apertura del modal y la gestión del estado de las tutorías si fuera necesario)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, `react-icons` (para el ícono "X"), `clsx` (para estilos condicionales).

Estructura:
*   Client Component.
*   Dentro de `TutoriaCard.tsx`, implementar renderizado condicional:
    *   Un botón con el texto "Inasistencia" y estilos de borde rojo (Tailwind CSS 4) solo si `tutoria.estado === 'sin confirmar'`.
    *   Una etiqueta estática con contorno rojo, un ícono de "X" y el texto "Inasistencia" solo si `tutoria.estado === 'inasistencia'`.
    *   Si `tutoria.estado === 'inasistencia'`, asegurar que los botones de acción existentes (como 'Ver Detalles' o cualquier otro) no se muestren o estén deshabilitados.
*   El `onClick` del botón 'Inasistencia' debe invocar una función (pasada por props) que a su vez abrirá el `ConfirmModal` (implementado en Tarea 4), pasándole el `tutoriaId`.

Validaciones:
*   **CA: Mostrar Modal de Confirmación desde Tarjeta:** El botón debe aparecer solo en el estado correcto y su `onClick` debe ser funcional para la apertura del `ConfirmModal`.
*   **CA: Reportar Inasistencia Exitosamente:** La tarjeta debe actualizarse visualmente para mostrar la etiqueta "Inasistencia" y ocultar botones de acción.

Diseño:
*   Referencia al frame "T. Historial".
*   El botón "Inasistencia" debe tener un borde rojo.
*   La etiqueta de estado "Inasistencia" debe tener un contorno rojo y un ícono de "X" (ej. `XCircleIcon` de `react-icons`).
*   Diseño responsive utilizando Tailwind CSS 4.

Integración:
*   El componente `TutoriaCard` recibirá un objeto `tutoria` y una función `onReportInasistencia` por props.

Criterios de Aceptación Técnica:
*   El botón "Inasistencia" (con borde rojo) aparece solo en tarjetas con estado "sin confirmar".
*   Al hacer clic en el botón "Inasistencia", se inicia la apertura del `ConfirmModal`.
*   Las tarjetas con estado "inasistencia" muestran la etiqueta estática con ícono "X" y texto "Inasistencia".
*   Los botones de acción desaparecen en las tarjetas con estado "inasistencia".
---END_PROMPT---

---START_COMMIT--- HU48-T02 feat(tutoria-card): añadir botón 'Inasistencia' y vista de estado ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: `DetalleModal` - Implementar botón 'Inasistencia' y modo lectura. HU_NUMBER: HU48 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Historial (Detalle Tutoría con Inasistencia). [1vmWX-VxUW0dy4b4SzE--yu5uXZV1kZmc](https://drive.google.com/file/d/1vmWX-VxUW0dy4b4SzE--yu5uXZV1kZmc/view?usp=drivesdk) ---END_FRAME---

---START_ESTIMATION--- 0.8H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El `DetalleModal` muestra información detallada de una tutoría. Se requiere extender su funcionalidad para permitir a los tutores registrar inasistencias desde esta vista y para mostrar los detalles en modo solo lectura cuando la tutoría ya esté marcada como inasistencia.
Objetivo: Modificar `DetalleModal` para añadir un botón rojo 'Inasistencia' para tutorías "pendiente" y para presentar la información en modo solo lectura con un indicador de estado "Inasistencia" cuando corresponda, deshabilitando todos los botones excepto el de "Cerrar".

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/tutoria/detalle-modal/DetalleModal.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, `react-icons` (para el ícono "X"), `clsx` (para estilos condicionales).

Estructura:
*   Client Component.
*   Dentro de `DetalleModal.tsx`, implementar renderizado condicional:
    *   Un botón rojo con el texto "Inasistencia" solo si `tutoria.estado === 'pendiente'`.
    *   Este botón debe tener un `onClick` que invoque una función (pasada por props) para superponer el `ConfirmModal` (implementado en Tarea 4), pasándole el `tutoriaId`.
*   Cuando `tutoria.estado === 'inasistencia'`:
    *   El modal debe mostrar toda su información en modo solo lectura (campos deshabilitados, sin inputs editables).
    *   En la parte inferior, mostrar estáticamente el texto "Estado: [Ícono X rojo] Inasistencia".
    *   Asegurar que solo el botón "Cerrar" esté habilitado; todos los demás botones de acción/edición deben estar deshabilitados o no ser visibles.

Validaciones:
*   **CA: Mostrar Modal de Confirmación desde Detalle:** El botón debe aparecer solo en el estado correcto y su `onClick` debe ser funcional para superponer el `ConfirmModal`.
*   **CA: Ver Detalles de Tutoría con Inasistencia (Solo lectura):** El modal debe mostrarse en modo lectura, con el indicador de estado y solo el botón "Cerrar" habilitado.
*   **CA: Cerrar Detalle de Tutoría con Inasistencia:** El botón "Cerrar" debe funcionar correctamente en este estado.

Diseño:
*   Referencia al frame "T. Historial (Detalle Tutoría con Inasistencia)".
*   El botón "Inasistencia" debe ser de color rojo.
*   El indicador de estado "Inasistencia" debe incluir un ícono de "X" (ej. `XCircleIcon` de `react-icons`) y texto en rojo.
*   Diseño responsive utilizando Tailwind CSS 4.

Integración:
*   El componente `DetalleModal` recibirá un objeto `tutoria` y una función `onReportInasistencia` por props.

Criterios de Aceptación Técnica:
*   El botón rojo "Inasistencia" dentro del `DetalleModal` aparece solo cuando la tutoría está en estado "pendiente".
*   Al hacer clic en el botón "Inasistencia" dentro del `DetalleModal`, se inicia la superposición del `ConfirmModal`.
*   Para tutorías con estado "inasistencia", el `DetalleModal` se muestra en modo solo lectura.
*   El texto "Estado: [Ícono X rojo] Inasistencia" se muestra estáticamente en el `DetalleModal` para este estado.
*   Solo el botón "Cerrar" está habilitado en el `DetalleModal` para tutorías en estado "inasistencia".
---END_PROMPT---

---START_COMMIT--- HU48-T03 feat(detalle-modal): añadir botón 'Inasistencia' y modo lectura ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: `ConfirmModal` - Integración de contenido y lógica 'Cancelar'. HU_NUMBER: HU48 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La acción de reportar inasistencia requiere una confirmación explícita del tutor para evitar errores. Se utilizará un `ConfirmModal` genérico para este propósito, el cual debe mostrar un mensaje específico y manejar correctamente la cancelación de la acción.
Objetivo: Integrar el `ConfirmModal` para que sea invocado por `TutoriaCard` y `DetalleModal`, mostrando el mensaje de confirmación "Confirmar Inasistencia" y gestionando la lógica del botón "Cancelar" para cerrar el modal sin cambios y restaurar la vista anterior.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/ui/confirm-modal/ConfirmModal.tsx` (ajustar props para flexibilidad de título/contenido si es necesario)
*   `src/components/tutoria/tutoria-card/TutoriaCard.tsx` (modificar para invocar el modal)
*   `src/components/tutoria/detalle-modal/DetalleModal.tsx` (modificar para invocar el modal)
*   `src/app/tutor/historial/page.tsx` (para gestionar el estado de visibilidad de los modales y el `tutoriaId` a reportar)
*   `src/store/modal/modalStore.ts` (Opcional, si se opta por un estado global para la gestión de modales con Zustand)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, Zustand (opcional para el store de modales).

Estructura:
*   Client Components.
*   El `ConfirmModal` debe ser un componente UI reutilizable que acepte `title`, `message`, `onConfirm` y `onCancel` como props.
*   El `page.tsx` (`app/tutor/historial/page.tsx`) será el responsable de gestionar los estados booleanos para la visibilidad de `DetalleModal` y `ConfirmModal`, así como el `tutoriaId` de la tutoría seleccionada.
*   Al invocar `ConfirmModal` desde `TutoriaCard` o `DetalleModal`, se deben pasar los textos:
    *   Título: "Confirmar Inasistencia"
    *   Mensaje: "¿Estás seguro? Esta acción marcará la tutoría como inasistencia del estudiante. Esta acción no se puede deshacer."
    *   Botones: "Cancelar" y "Sí, reportar inasistencia".
*   La función `onCancel` del `ConfirmModal` debe cerrar el propio `ConfirmModal`. Si el `DetalleModal` estaba abierto debajo, este debe volver a ser visible.

Validaciones:
*   **CA: Mostrar Modal de Confirmación desde Tarjeta:** Verificar el texto y botones del modal.
*   **CA: Mostrar Modal de Confirmación desde Detalle:** Verificar el texto, botones y el efecto de superposición.
*   **CA: Cancelar Confirmación de Inasistencia:** Asegurar que el modal desaparezca y la vista previa se restaure sin aplicar cambios.

Diseño:
*   El modal debe superponerse a la interfaz actual.
*   Utilizar estilos de Tailwind CSS 4 para el diseño de los botones y el modal.

Integración:
*   Los componentes `TutoriaCard` y `DetalleModal` invocarán el `ConfirmModal` a través de un callback o de un store global de estado.

Criterios de Aceptación Técnica:
*   Al hacer clic en 'Inasistencia' desde `TutoriaCard` o `DetalleModal`, se superpone el `ConfirmModal`.
*   El `ConfirmModal` muestra el texto de advertencia exacto: "¿Estás seguro? Esta acción marcará la tutoría como inasistencia del estudiante. Esta acción no se puede deshacer."
*   Los botones "Cancelar" y "Sí, reportar inasistencia" son visibles.
*   Al hacer clic en "Cancelar", el `ConfirmModal` desaparece sin aplicar cambios, y la interfaz anterior (ej. `DetalleModal`) se restaura.
---END_PROMPT---

---START_COMMIT--- HU48-T04 feat(confirm-modal): integrar y manejar cancelación de inasistencia ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: `reportarInasistenciaAction` - Server Action con seed y revalidación. HU_NUMBER: HU48 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Para gestionar el reporte de inasistencias de manera segura y eficiente, se necesita un Server Action de Next.js. En esta fase de desarrollo, el Server Action simulará una respuesta exitosa, permitiendo que el frontend se desarrolle y pruebe de forma aislada, e incluirá la lógica de revalidación necesaria para Next.js. El código para la integración real con el backend se preparará, pero se mantendrá comentado.
Objetivo: Implementar el Server Action `reportarInasistenciaAction` que acepta un `tutoriaId`, simula una respuesta de éxito con un retardo, incluye el `revalidatePath` para la ruta de historial, y contiene el código de `fetch` a la API de backend comentado para su uso futuro.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/actions/tutoria/reportarInasistenciaAction.ts`

Tecnologías: Next.js 16 (Server Actions), TypeScript.

Estructura:
*   Crear un archivo `src/actions/tutoria/reportarInasistenciaAction.ts`.
*   Marcar el archivo con `'use server'` en la parte superior.
*   Definir y exportar una función `reportarInasistenciaAction(tutoriaId: string)` asíncrona.
*   Dentro de la función, simular un retardo con `await new Promise(resolve => setTimeout(resolve, 500))`.
*   Retornar un objeto `{ success: true, message: 'Inasistencia reportada con éxito. (Seed data)' }`.
*   **Escribir y COMENTAR COMPLETAMENTE** el bloque `try-catch` que contendría la lógica de la petición `fetch` real al endpoint `POST /api/tutorias/:id/inasistencia`, incluyendo la URL (`process.env.NEXT_PUBLIC_API_URL`), el método (`POST`), los headers y el manejo de respuestas `!response.ok` y errores.
*   Después del retorno simulado (y del `fetch` comentado), incluir `revalidatePath('/tutor/historial');`.

Validaciones: N/A para esta fase (simulación).

Diseño: N/A.

Integración:
*   Este Server Action será invocado por el `ConfirmModal` (Tarea 6) desde el lado del cliente.
*   `revalidatePath` garantizará la actualización de la caché de datos de Next.js para la página de historial.

Criterios de Aceptación Técnica:
*   El Server Action `reportarInasistenciaAction` existe en `src/actions/tutoria/reportarInasistenciaAction.ts`.
*   Al ser invocado, retorna un objeto `{ success: true, message: ... }` simulado.
*   El código para la integración con el backend (`fetch` y manejo de errores) está presente pero completamente comentado.
*   Se incluye `revalidatePath('/tutor/historial')` para la actualización de la UI.
---END_PROMPT---

---START_COMMIT--- HU48-T05 feat(server-action): crear 'reportarInasistenciaAction' con seed y revalidación ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: `ConfirmModal` - Lógica 'Sí, reportar inasistencia' y notificación. HU_NUMBER: HU48 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Historial. [1NsGczwD7An3K0oG2ECbjG0R_sTKImAcl](https://drive.google.com/file/d/1NsGczwD7An3K0oG2ECbjG0R_sTKImAcl/view?usp=drivesdk) ---END_FRAME---

---START_ESTIMATION--- 0.4H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Una vez que el tutor ha confirmado su intención de reportar la inasistencia, se debe ejecutar la acción correspondiente, cerrar las interfaces modales y proporcionar una notificación clara sobre el resultado de la operación.
Objetivo: Implementar la lógica para el botón "Sí, reportar inasistencia" en el `ConfirmModal`. Esta lógica debe invocar el `reportarInasistenciaAction` (Server Action), cerrar todos los modales abiertos (`ConfirmModal` y `DetalleModal` si estaba visible), y mostrar una notificación (`SuccessToast` o de error) al usuario.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/components/ui/confirm-modal/ConfirmModal.tsx` (para la implementación del handler `onConfirm`)
*   `src/app/tutor/historial/page.tsx` (para gestionar el estado de los modales y el lanzamiento de toasts)
*   `src/actions/tutoria/reportarInasistenciaAction.ts` (importación del Server Action)
*   `src/components/ui/success-toast/SuccessToast.tsx` (o el sistema de notificaciones global utilizado, siguiendo Atomic Design)
*   `src/store/toast/toastStore.ts` (Opcional, si se usa Zustand para la gestión de toasts)

Tecnologías: Next.js 16 (Server Actions), React, TypeScript, Tailwind CSS 4, Zustand (opcional), `react-icons`.

Estructura:
*   Client Components.
*   En el `ConfirmModal`, el `onClick` del botón "Sí, reportar inasistencia" debe ser asíncrono.
*   Esta función `onConfirm` debe:
    *   Llamar a `reportarInasistenciaAction(tutoriaId)`.
    *   Manejar la respuesta:
        *   Si `success: true`: Cerrar el `ConfirmModal` y el `DetalleModal` (si estaba abierto). Mostrar un `SuccessToast` con el mensaje "Inasistencia reportada con éxito.".
        *   Si `success: false` o error: Mostrar un `ErrorToast` con el mensaje de error.
*   La gestión del cierre de modales y la apertura de toasts debe estar centralizada, idealmente en `app/tutor/historial/page.tsx` o a través de un store global.

Validaciones:
*   **CA: Reportar Inasistencia Exitosamente:** La implementación de esta lógica debe cumplir con todos los pasos descritos: invocación de acción, cierre de modales y notificación.

Diseño:
*   El `SuccessToast` debe ser visualmente consistente con el diseño general de la aplicación.
*   Diseño responsive con Tailwind CSS 4.

Integración:
*   El `ConfirmModal` invocará directamente el `reportarInasistenciaAction`.
*   La gestión de toasts y el estado de los modales se coordinará en el nivel de página o un store global.

Criterios de Aceptación Técnica:
*   Al hacer clic en "Sí, reportar inasistencia", se invoca `reportarInasistenciaAction` con el `tutoriaId` correcto.
*   Tras una respuesta exitosa, todos los modales (confirmación y detalle) se cierran.
*   Una notificación `SuccessToast` aparece mostrando el mensaje de éxito o error.
---END_PROMPT---

---START_COMMIT--- HU48-T06 feat(confirm-modal): lógica 'sí, reportar inasistencia' y notificaciones ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: `reportarInasistenciaAction` - Integración con backend. HU_NUMBER: HU48 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La fase de desarrollo inicial de `reportarInasistenciaAction` incluyó un retorno de seed data y el código de integración con el backend comentado. Ahora que se ha validado la interfaz de usuario con datos simulados, es momento de activar la comunicación real con el backend.
Objetivo: Modificar el Server Action `reportarInasistenciaAction` para que realice la petición `fetch` real al endpoint del backend, eliminando el retorno de datos simulados.

Especificaciones Técnicas:

Archivos a crear/modificar:
*   `src/actions/tutoria/reportarInasistenciaAction.ts`

Tecnologías: Next.js 16 (Server Actions), TypeScript.

Estructura:
*   Abrir `src/actions/tutoria/reportarInasistenciaAction.ts`.
*   Comentar o eliminar la línea que simula el retorno de éxito (ej. `return { success: true, message: 'Inasistencia reportada con éxito. (Seed data)' }`).
*   Descomentar completamente el bloque `try-catch` que contiene la llamada `fetch` al endpoint `POST /api/tutorias/:id/inasistencia`.
*   Asegurar que la URL del endpoint esté configurada correctamente (ej. usando `process.env.NEXT_PUBLIC_API_URL`).
*   Verificar que los `headers`, el `method` (`POST`) y cualquier `payload` (si fuera necesario para el backend) sean consistentes con la documentación de la API.
*   Confirmar que el manejo de errores y las respuestas `!response.ok` estén correctamente implementados.
*   Asegurar que `revalidatePath('/tutor/historial');` se mantenga después de la lógica de la petición real.

Validaciones:
*   La petición `fetch` debe comunicarse exitosamente con el backend.
*   Las respuestas del backend (éxito/error) deben ser manejadas correctamente por el Server Action.

Diseño: N/A.

Integración:
*   Comunicación directa con el endpoint del backend para reportar inasistencia.

Criterios de Aceptación Técnica:
*   La petición `fetch` se ejecuta correctamente hacia el endpoint real del backend.
*   La aplicación maneja correctamente las respuestas de éxito y error del backend.
*   El `revalidatePath('/tutor/historial')` sigue funcionando correctamente para actualizar la UI.
*   No se observan errores de red (CORS, etc.) en la consola del navegador.
---END_PROMPT---

---START_COMMIT--- HU48-T07 feat(server-action): integrar 'reportarInasistenciaAction' con backend ---END_COMMIT---