---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed data para tutorías en diversos estados HU_NUMBER: HU43 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se requiere simular la respuesta de los endpoints del backend para permitir el desarrollo y pruebas de los componentes de frontend de manera independiente y sin depender de la API real.

Objetivo: Crear un archivo de seed con datos de ejemplo para tutorías en diferentes estados (SIN_CONFIRMAR, COMPLETADA sin calificar, COMPLETADA con calificación) y funciones de utilidad para acceder a estos datos.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/seed/TutoriasSeedData.ts`
- `src/interfaces/tutoria-tipo/TutoriaDetalleDto.ts`
- `src/interfaces/tutoria-tipo/TutoriaEntity.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
- `src/interfaces/tutoria-tipo/TutoriaDetalleDto.ts`: Definir una interfaz `TutoriaDetalleDto` que contenga todos los campos necesarios para el detalle de una tutoría, incluyendo `calificacionEstudiante` y `comentarioEstudiante` como opcionales o `null`.
- `src/interfaces/tutoria-tipo/TutoriaEntity.ts`: Definir una interfaz `TutoriaEntity` que represente la estructura de una tutoría actualizada, específicamente para la respuesta del PATCH (con al menos el `id` y `estado`).
- `src/seed/TutoriasSeedData.ts`:
    - Exportar `const TUTORIAS_SEED_DATA: TutoriaDetalleDto[]` con al menos 3 objetos de tutoría:
        - Una tutoría con `estado: 'SIN_CONFIRMAR'`.
        - Una tutoría con `estado: 'COMPLETADA'`, `calificacionEstudiante: null`, `comentarioEstudiante: null`.
        - Una tutoría con `estado: 'COMPLETADA'`, `calificacionEstudiante` (ej. 4.5), `comentarioEstudiante` (ej. "Excelente tutoría, muy útil.").
    - Exportar una función `getTutoriaSeed(id: string): TutoriaDetalleDto | undefined` que busque y retorne una tutoría del `TUTORIAS_SEED_DATA` por su ID.
    - Exportar una función `getUpdatedTutoriaSeed(id: string): TutoriaEntity | undefined` que simule la actualización de una tutoría, cambiando su estado a `COMPLETADA` y retorne una `TutoriaEntity` con el nuevo estado.

Validaciones:
- La estructura de los datos de seed debe ser compatible con las interfaces `TutoriaDetalleDto` y `TutoriaEntity`.

Diseño: Ninguno.

Integración: Ninguna (solo seed data para mocks).

Criterios de Aceptación Técnica:
- El archivo `TutoriasSeedData.ts` contiene semillas para tutorías en `SIN_CONFIRMAR` y `COMPLETADA` (con y sin calificación).
- La estructura de los seeds coincide exactamente con `TutoriaDetalleDto` y `TutoriaEntity` respectivamente.
- Las funciones de utilidad (`getTutoriaSeed`, `getUpdatedTutoriaSeed`) retornan los datos simulados correctamente.
---END_PROMPT---

---START_COMMIT--- HU43-T01 feat(seed): crear datos de prueba para tutorías en diversos estados ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Implementación de `marcarTutoriaCompletadaAction` (con seed) y su integración en `TutoriaCard` y `DetalleTutoriaModal` (incluye `BotonCompletadaCard` y `BotonCompletadaModal`) HU_NUMBER: HU43 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Historial. T. Historial (Detalle Tutoría sin Confirmar). ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Es necesario permitir a los tutores marcar sus tutorías como completadas tanto desde el listado general como desde el modal de detalle. Inicialmente, esta funcionalidad utilizará datos de seed para facilitar el desarrollo frontend.

Objetivo: Implementar el Server Action `marcarTutoriaCompletadaAction` que simulará la actualización de una tutoría a estado 'COMPLETADA' usando seed data. Crear los componentes `BotonCompletadaCard` y `BotonCompletadaModal` e integrarlos condicionalmente en `TutoriaCard` y `DetalleTutoriaModal` respectivamente, para invocar este Server Action.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/tutoria-actions/marcarTutoriaCompletadaAction.ts`
- `src/seed/TutoriasSeedData.ts` (modificar si es necesario para importar)
- `src/components/tutoria-ui/boton-completada-card/BotonCompletadaCard.tsx`
- `src/components/tutoria-ui/boton-completada-modal/BotonCompletadaModal.tsx`
- `src/components/tutoria-ui/tutoria-card/TutoriaCard.tsx`
- `src/components/tutoria-ui/detalle-tutoria-modal/DetalleTutoriaModal.tsx` (se creará en Tarea 3, pero la integración debe planificarse aquí)

Tecnologías: Next.js 16 (Server Actions), React, TypeScript, Tailwind CSS 4.

Estructura:
- `src/actions/tutoria-actions/marcarTutoriaCompletadaAction.ts`:
    - Marcar el archivo con `'use server'`.
    - Importar `getUpdatedTutoriaSeed` de `src/seed/TutoriasSeedData.ts`.
    - Definir `marcarTutoriaCompletadaAction(tutoriaId: string): Promise<{ success: boolean; data?: TutoriaEntity; error?: string }>`:
        - Retornar `{ success: true, data: getUpdatedTutoriaSeed(tutoriaId) }` simulando un retraso con `setTimeout` (ej. 500ms).
        - **Comentar completamente** el bloque de código `try-catch` para la petición `fetch` a `PATCH /api/tutorias/{id}/completar`, incluyendo headers (Content-Type, Authorization si aplica) y manejo de errores. Añadir `revalidatePath('/tutor/historial')` dentro del `try` si la petición fuera real.
- `src/components/tutoria-ui/boton-completada-card/BotonCompletadaCard.tsx` (Client Component):
    - Recibe `tutoriaId: string` y `onCompletar: (tutoriaId: string) => Promise<void>`.
    - Renderiza un botón con texto "Completada", borde y texto verde (`border-green-500 text-green-500 hover:bg-green-500 hover:text-white`).
    - Al hacer clic, invoca `onCompletar(tutoriaId)`.
- `src/components/tutoria-ui/boton-completada-modal/BotonCompletadaModal.tsx` (Client Component):
    - Similar a `BotonCompletadaCard.tsx`, adaptado para el contexto de un modal. Recibe `tutoriaId: string` y `onCompletar: (tutoriaId: string) => Promise<void>`.
- `src/components/tutoria-ui/tutoria-card/TutoriaCard.tsx` (Client Component):
    - Condicionalmente renderizar `BotonCompletadaCard` si la `tutoria.estado` es `'SIN_CONFIRMAR'`.
    - Pasar el `tutoria.id` y `marcarTutoriaCompletadaAction` como prop `onCompletar` al `BotonCompletadaCard`.
- `src/components/tutoria-ui/detalle-tutoria-modal/DetalleTutoriaModal.tsx` (Client Component, a ser creado en Tarea 3):
    - Planificar la integración: Condicionalmente renderizar `BotonCompletadaModal` si la `tutoria.estado` es `'SIN_CONFIRMAR'`.
    - Pasar el `tutoria.id` y `marcarTutoriaCompletadaAction` como prop `onCompletar` al `BotonCompletadaModal`.

Validaciones:
- La lógica de renderizado condicional de los botones debe basarse en el estado de la tutoría.

Diseño:
- Los botones deben tener un estilo de borde verde y texto verde, cambiando a fondo verde con texto blanco al hover, según los frames T. Historial y T. Historial (Detalle Tutoría sin Confirmar).

Integración:
- Invocación de Server Actions desde Client Components utilizando el `onClick` del botón.

Criterios de Aceptación Técnica:
- `marcarTutoriaCompletadaAction` retorna un `success: true` y el seed de una tutoría `COMPLETADA`.
- El código de `fetch` en `marcarTutoriaCompletadaAction` está presente y completamente comentado.
- `BotonCompletadaCard` y `BotonCompletadaModal` se renderizan con los estilos correctos.
- Los botones invocan `marcarTutoriaCompletadaAction` al ser clickeados.
- Se utiliza `tutoriaId` correctamente en la invocación del Server Action.
---END_PROMPT---

---START_COMMIT--- HU43-T02 feat(frontend): implementar boton completar tutoria y action (seed) ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Implementación de `getDetalleTutoriaAction` (con seed) y su integración en `DetalleTutoriaModal` (incluye `SeccionCalificacionEstudiante` y `BotonCerrarModal`) HU_NUMBER: HU43 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Historial (Detalle Tutoría sin Confirmar). ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se necesita una forma de visualizar los detalles completos de una tutoría al hacer clic en su tarjeta, así como permitir la interacción para marcarla como completada si aplica.

Objetivo: Implementar el Server Action `getDetalleTutoriaAction` que simulará la obtención de detalles de una tutoría usando seed data. Crear el componente `DetalleTutoriaModal` para mostrar esta información, incluyendo `SeccionCalificacionEstudiante` y `BotonCerrarModal`. Actualizar `TutoriaCard` y `HistorialTutoriasPage` para gestionar la apertura de este modal.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/tutoria-actions/getDetalleTutoriaAction.ts`
- `src/seed/TutoriasSeedData.ts` (modificar si es necesario para importar)
- `src/components/tutoria-ui/seccion-calificacion-estudiante/SeccionCalificacionEstudiante.tsx`
- `src/components/ui/boton-cerrar-modal/BotonCerrarModal.tsx`
- `src/components/tutoria-ui/detalle-tutoria-modal/DetalleTutoriaModal.tsx`
- `src/components/tutoria-ui/tutoria-card/TutoriaCard.tsx`
- `src/app/tutor/historial/page.tsx`

Tecnologías: Next.js 16 (Server Actions), React, TypeScript, Tailwind CSS 4.

Estructura:
- `src/actions/tutoria-actions/getDetalleTutoriaAction.ts`:
    - Marcar el archivo con `'use server'`.
    - Importar `getTutoriaSeed` de `src/seed/TutoriasSeedData.ts`.
    - Definir `getDetalleTutoriaAction(tutoriaId: string): Promise<TutoriaDetalleDto | null>`:
        - Retornar `getTutoriaSeed(tutoriaId)` simulando un retraso (ej. 300ms). Si no se encuentra, retornar `null`.
        - **Comentar completamente** el bloque de código `try-catch` para la petición `fetch` a `GET /api/tutorias/{id}`, incluyendo headers, `cache: 'no-store'` y el manejo de `response.status === 404` para retornar `null`.
- `src/components/tutoria-ui/seccion-calificacion-estudiante/SeccionCalificacionEstudiante.tsx` (Client Component):
    - Recibe `calificacion: number` y `comentario: string`.
    - Renderiza la calificación usando estrellas (ej. `react-icons`) y el comentario del estudiante.
- `src/components/ui/boton-cerrar-modal/BotonCerrarModal.tsx` (Client Component):
    - Recibe `onClick: () => void`.
    - Renderiza un botón simple con texto "Cerrar".
- `src/components/tutoria-ui/detalle-tutoria-modal/DetalleTutoriaModal.tsx` (Client Component):
    - Recibe `tutoriaId: string | null`, `isOpen: boolean`, `onClose: () => void`.
    - Utilizar un `useEffect` para llamar a `getDetalleTutoriaAction(tutoriaId)` cuando `isOpen` sea `true` y `tutoriaId` no sea `null`. Almacenar el resultado en un estado local.
    - Renderizar los detalles de la tutoría (`estudiante`, `materia`, `fecha`, `hora`, `estado`, etc.) de forma clara.
    - Integrar `SeccionCalificacionEstudiante` (se renderizará condicionalmente en Tarea 4).
    - Integrar `BotonCerrarModal` y vincular su `onClick` a la prop `onClose`.
    - Incluir el `BotonCompletadaModal` (de Tarea 2) condicionalmente.
- `src/components/tutoria-ui/tutoria-card/TutoriaCard.tsx` (Client Component):
    - Modificar el `onClick` del área general de la tarjeta (excluyendo el botón "Completada") para que, al ser clickeado, invoque una prop `onOpenDetails(tutoriaId: string)`.
- `src/app/tutor/historial/page.tsx` (Server Component):
    - Gestionar el estado (`useState`) para `isModalOpen: boolean` y `selectedTutoriaId: string | null`.
    - Renderizar `DetalleTutoriaModal` pasándole los estados y las funciones para `onClose` y `onOpenDetails`.

Validaciones:
- El modal debe cargar y mostrar los datos de la tutoría correcta.

Diseño:
- El `DetalleTutoriaModal` debe replicar la estructura y estilos del frame "T. Historial (Detalle Tutoría sin Confirmar)". Responsive design con Tailwind CSS 4.

Integración:
- Server Action para la carga de datos.
- Comunicación entre `TutoriaCard` (Client) y `HistorialTutoriasPage` (Server/Client con useState) para abrir el modal.

Criterios de Aceptación Técnica:
- `getDetalleTutoriaAction` retorna el `TutoriaDetalleDto` del seed correcto.
- El código de `fetch` en `getDetalleTutoriaAction` está presente y completamente comentado.
- `DetalleTutoriaModal` se abre al hacer clic en la `TutoriaCard`.
- `DetalleTutoriaModal` consume `getDetalleTutoriaAction` y muestra los detalles del seed.
- `SeccionCalificacionEstudiante` y `BotonCerrarModal` se renderizan correctamente dentro del modal.
---END_PROMPT---

---START_COMMIT--- HU43-T03 feat(frontend): implementar detalle de tutoria y action (seed) ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Lógica de visualización y actualización de estados en `TutoriaCard` y `DetalleTutoriaModal` (incluye `EtiquetaEstadoCompletada` y `ContadorTutoriasCompletadas` en modo lectura) HU_NUMBER: HU43 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Historial. T. Historial (Detalle Tutoría sin Confirmar). ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La interfaz de usuario necesita reflejar de manera precisa y dinámica el estado de las tutorías, especialmente cuando han sido marcadas como completadas, y proporcionar una métrica visible de las tutorías completadas.

Objetivo: Implementar la lógica condicional en `TutoriaCard` y `DetalleTutoriaModal` para mostrar correctamente los diferentes estados de las tutorías, incluyendo la creación de una `EtiquetaEstadoCompletada` y un `ContadorTutoriasCompletadas`. Asegurar la actualización en tiempo real de los elementos visuales y métricas.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/tutoria-ui/etiqueta-estado-completada/EtiquetaEstadoCompletada.tsx`
- `src/components/tutoria-ui/tutoria-card/TutoriaCard.tsx`
- `src/components/tutoria-ui/detalle-tutoria-modal/DetalleTutoriaModal.tsx`
- `src/components/ui/contador-tutorias-completadas/ContadorTutoriasCompletadas.tsx`
- `src/app/tutor/historial/page.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, react-icons, clsx.

Estructura:
- `src/components/tutoria-ui/etiqueta-estado-completada/EtiquetaEstadoCompletada.tsx` (Client Component):
    - Recibe `className?: string`.
    - Renderiza un `span` o `div` con el texto 'Completada', un ícono de check (ej. `FaCheckCircle` de `react-icons`) y estilos verdes estáticos (ej. `bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-medium`). Utilizar `clsx` para combinar `className`.
- `src/components/tutoria-ui/tutoria-card/TutoriaCard.tsx` (Client Component):
    - Recibe un objeto `tutoria: TutoriaDetalleDto`.
    - Si `tutoria.estado === 'COMPLETADA'`:
        - Ocultar `BotonCompletadaCard` y cualquier otro botón de acción.
        - Renderizar `EtiquetaEstadoCompletada` en su lugar, alineado con el diseño del frame.
    - Asegurar que la tarjeta se re-renderice correctamente después de la invocación de `marcarTutoriaCompletadaAction`. Esto se gestionará mediante `revalidatePath` en el Server Action, pero el componente debe ser capaz de mostrar el nuevo estado.
- `src/components/tutoria-ui/detalle-tutoria-modal/DetalleTutoriaModal.tsx` (Client Component):
    - Recibe el `tutoriaDetalleDto` completo cargado.
    - Si `tutoriaDetalleDto.estado === 'COMPLETADA'`:
        - Ocultar `BotonCompletadaModal` y cualquier otro botón de acción (ej. `BotonInasistenciaModal` si existiera).
        - Mostrar en la parte inferior izquierda el texto estático "Estado: " seguido de `EtiquetaEstadoCompletada`.
        - Solo el `BotonCerrarModal` debe estar habilitado en la parte inferior derecha.
        - Si `tutoriaDetalleDto.calificacionEstudiante` y `tutoriaDetalleDto.comentarioEstudiante` no son `null`, renderizar `SeccionCalificacionEstudiante` con los datos de calificación y comentario.
    - Implementar lógica para que el modal se cierre automáticamente después de que `marcarTutoriaCompletadaAction` se complete exitosamente (si fue invocado desde dentro del modal).
- `src/components/ui/contador-tutorias-completadas/ContadorTutoriasCompletadas.tsx` (Client Component):
    - Recibe `count: number`.
    - Renderiza un display (`div` o `span`) con el texto "Tutorías Completadas: [count]".
- `src/app/tutor/historial/page.tsx` (Server Component):
    - Obtener el listado de tutorías y calcular el `totalTutoriasCompletadas` para pasarlo como prop al `ContadorTutoriasCompletadas`.
    - Asegurar que después de cualquier acción que modifique el estado de las tutorías (ej. `marcarTutoriaCompletadaAction`), la página se revalide (`revalidatePath`) para actualizar el listado y el contador.

Validaciones:
- La renderización condicional debe ser precisa según el estado de la tutoría y la presencia de calificación.

Diseño:
- Adaptación visual de los componentes `TutoriaCard` y `DetalleTutoriaModal` según los frames para reflejar los estados de "Completada" y "Modo Lectura".
- El `ContadorTutoriasCompletadas` debe ser visible en la página de historial. Responsive design con Tailwind CSS 4.

Integración:
- Comunicación de estados y props entre Server Components (`page.tsx`) y Client Components (`TutoriaCard`, `DetalleTutoriaModal`, `ContadorTutoriasCompletadas`).

Criterios de Aceptación Técnica:
- La `TutoriaCard` se actualiza visualmente al estado 'Completada' (mostrando etiqueta verde, sin botones de acción).
- `DetalleTutoriaModal` se muestra en modo lectura para tutorías completadas (sin botones de acción, solo `BotonCerrarModal`).
- Si una tutoría completada ha sido calificada, `SeccionCalificacionEstudiante` se muestra en el modal con la puntuación y el comentario.
- El `ContadorTutoriasCompletadas` muestra el número correcto de tutorías completadas y se actualiza en tiempo real después de una acción de completado.
- El modal se cierra automáticamente tras la acción de "Completada" desde dentro del modal.
---END_PROMPT---

---START_COMMIT--- HU43-T04 feat(frontend): logica de visualizacion de estados y contador ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Integración final de `marcarTutoriaCompletadaAction` con backend real HU_NUMBER: HU43 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La funcionalidad de marcar una tutoría como completada se ha desarrollado con seed data y ahora es necesario integrar el Server Action con el backend real para que las actualizaciones sean persistentes.

Objetivo: Activar la integración real con el backend para la funcionalidad de marcar una tutoría como completada, descomentando el código de la petición `fetch` pre-escrito en `marcarTutoriaCompletadaAction` y eliminando el retorno del seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/tutoria-actions/marcarTutoriaCompletadaAction.ts`

Tecnologías: Next.js 16 (Server Actions), TypeScript.

Estructura:
- `src/actions/tutoria-actions/marcarTutoriaCompletadaAction.ts`:
    - Comentar o eliminar la línea que retorna el seed data (`return { success: true, data: getUpdatedTutoriaSeed(tutoriaId) };`).
    - Descomentar el bloque `try-catch` que contiene la petición `fetch` a `PATCH /api/tutorias/{id}/completar`.
    - Verificar que la URL del endpoint utilice `process.env.NEXT_PUBLIC_API_URL` correctamente.
    - Confirmar que los headers (`Content-Type: application/json`, `Authorization` si aplica con el token del usuario autenticado) estén configurados apropiadamente.
    - Asegurarse de que `revalidatePath('/tutor/historial')` se ejecute al éxito de la operación para refrescar la UI.
    - Implementar el manejo de errores apropiado, retornando `{ success: false, error: '...' }` en caso de fallas de la API.

Validaciones:
- La acción debe realizar una petición HTTP real al backend.

Diseño: Ninguno.

Integración:
- Conexión directa con el endpoint `PATCH /api/tutorias/{id}/completar` del backend.

Criterios de Aceptación Técnica:
- `marcarTutoriaCompletadaAction` realiza una petición `PATCH` exitosa al endpoint real del backend.
- La respuesta del backend se maneja correctamente, incluyendo códigos de error.
- La `TutoriaCard` y el `ContadorTutoriasCompletadas` se actualizan con datos del backend.
- No hay errores de red, CORS o autenticación en el flujo de "marcar como completada".
---END_PROMPT---

---START_COMMIT--- HU43-T05 fix(backend): integrar action marcar tutoría completada con API real ---END_COMMIT---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Integración final de `getDetalleTutoriaAction` con backend real HU_NUMBER: HU43 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La obtención de detalles de una tutoría se ha desarrollado con seed data y ahora es necesario integrar el Server Action con el backend real para que los datos mostrados en el modal sean los reales.

Objetivo: Activar la integración real con el backend para la obtención de detalles de una tutoría, descomentando el código de la petición `fetch` pre-escrito en `getDetalleTutoriaAction` y eliminando el retorno del seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/tutoria-actions/getDetalleTutoriaAction.ts`

Tecnologías: Next.js 16 (Server Actions), TypeScript.

Estructura:
- `src/actions/tutoria-actions/getDetalleTutoriaAction.ts`:
    - Comentar o eliminar la línea que retorna el seed data (`return getTutoriaSeed(tutoriaId);`).
    - Descomentar el bloque `try-catch` que contiene la petición `fetch` a `GET /api/tutorias/{id}`.
    - Verificar que la URL del endpoint utilice `process.env.NEXT_PUBLIC_API_URL` correctamente.
    - Confirmar que los headers (`Content-Type: application/json`, `Authorization` si aplica) estén configurados apropiadamente.
    - Asegurarse de que `cache: 'no-store'` esté presente en la configuración de `fetch` para garantizar que se obtengan los datos más recientes.
    - Implementar el manejo de errores, especialmente para `response.status === 404`, retornando `null` en ese caso. Retornar `null` o lanzar un error para otros códigos de estado que indiquen falla.

Validaciones:
- La acción debe realizar una petición HTTP real al backend.

Diseño: Ninguno.

Integración:
- Conexión directa con el endpoint `GET /api/tutorias/{id}` del backend.

Criterios de Aceptación Técnica:
- `getDetalleTutoriaAction` realiza una petición `GET` exitosa al endpoint real del backend.
- La respuesta del backend (que es `TutoriaDetalleDto`) se maneja correctamente.
- El `DetalleTutoriaModal` muestra los datos reales de la tutoría, incluyendo el estado y la calificación si existen.
- No hay errores de red, CORS o autenticación en el flujo de "obtener detalles de tutoría".
---END_PROMPT---

---START_COMMIT--- HU43-T06 fix(backend): integrar action obtener detalle tutoría con API real ---END_COMMIT---