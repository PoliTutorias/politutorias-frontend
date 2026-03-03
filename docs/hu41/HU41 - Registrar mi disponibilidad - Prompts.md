---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed para respuesta de registro de disponibilidad HU_NUMBER: HU41 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Necesitamos una respuesta simulada del backend para la Server Action de registro de disponibilidad, permitiendo el desarrollo del frontend de forma independiente.

Objetivo: Crear un archivo de seed con una estructura de respuesta exitosa para el registro de disponibilidad.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/seed/AvailabilitySuccessResponseSeed.ts`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- Definir una interfaz `AvailabilitySuccessResponse` para tipar la respuesta.
- Crear un objeto constante `availabilitySuccessSeed` que implemente esta interfaz con datos de ejemplo.
- Exportar el objeto `availabilitySuccessSeed`.

Validaciones: N/A.

Diseño: N/A.

Integración: Este seed será importado y utilizado por la Server Action `guardarDisponibilidadAction` como respuesta mock inicial.

Criterios de Aceptación Técnica:
- El archivo `src/seed/AvailabilitySuccessResponseSeed.ts` existe.
- Contiene una interfaz `AvailabilitySuccessResponse` con `message: string` y `tutorId: string`.
- Contiene un objeto `availabilitySuccessSeed` que se ajusta a la interfaz y es exportado.
- El `tutorId` es un string de ejemplo válido. ---END_PROMPT---

---START_COMMIT--- HU41-T01 feat(seed): crear seed para respuesta de disponibilidad ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Maquetación de la página `DefineHorarioPage` y estructura del layout HU_NUMBER: HU41 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Registro Tutor 2 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El tutor necesita una interfaz para definir su disponibilidad, que es parte de un flujo de registro más amplio.

Objetivo: Implementar la página principal `DefineHorarioPage` con su layout básico, incluyendo elementos de navegación y placeholders.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/registro/disponibilidad/page.tsx`
- `src/components/common/Stepper/Stepper.tsx` (Si aún no existe, para el stepper compartido)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- `DefineHorarioPage` debe ser un Server Component.
- Utilizar Atomic Design para el componente Stepper, si es un componente reusable.
- La página debe contener:
    - Un componente `Stepper` en la parte superior, resaltando "2 Define tu Horario" y con "1 Datos Básicos" como enlace navegable.
    - Un título principal "Define tu Horario" y un subtítulo "Selecciona los bloques de tiempo que tienes disponibles para dar clases".
    - Un contenedor placeholder para el futuro `HorarioGrid`.
    - Un placeholder para el mensaje de error 'Selecciona al menos un horario disponible' (inicialmente oculto).
    - Un placeholder para el contador de horarios seleccionados '✓ X horario(s) seleccionado(s)' (inicialmente oculto).
    - Botones de navegación inferior: '← Atrás Datos Básicos' (enlace) y 'Siguiente Perfil Profesional' (botón principal).

Validaciones: N/A.

Diseño:
- El layout debe coincidir visualmente con el frame 'T. Registro Tutor 2 (Vacío)'.
- Utilizar Tailwind CSS 4 para el estilizado, asegurando un diseño responsive.

Integración: Esta página será el punto de entrada para el componente `HorarioGrid`.

Criterios de Aceptación Técnica:
- La página `app/registro/disponibilidad/page.tsx` renderiza el layout principal.
- El Stepper muestra "2 Define tu Horario" resaltado y "1 Datos Básicos" como enlace.
- Los títulos y subtítulos están presentes y estilizados según el diseño.
- Los placeholders para la cuadrícula, el mensaje de error y el contador están definidos.
- Los botones de navegación inferior están maquetados correctamente.
- La página funciona como un Server Component. ---END_PROMPT---

---START_COMMIT--- HU41-T02 feat(frontend): maquetar pagina de definicion de horario ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Implementación del componente `HorarioGrid` (maquetación inicial estática) HU_NUMBER: HU41 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Registro Tutor 2 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 2H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El componente `HorarioGrid` es central para la interacción del tutor con su disponibilidad horaria.

Objetivo: Crear una versión estática inicial del `HorarioGrid` que muestre los días de la semana y las horas disponibles, como una cuadrícula.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/tutor/HorarioGrid/HorarioGrid.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- `HorarioGrid.tsx` debe ser un Client Component (`'use client'`).
- Definir arrays internos para los días de la semana (ej. `['Lun', 'Mar', ...]`) y las horas (ej. `['07:00', '08:00', ...]`). Las horas deben ir desde las 07:00 hasta las 20:00, con incrementos de una hora.
- Utilizar CSS Grid (a través de clases de Tailwind CSS) para estructurar la cuadrícula, con una fila para los días y una columna para las horas.
- Renderizar los encabezados de los días y las horas.
- Renderizar celdas individuales para cada intersección de día y hora, con un estilo visual por defecto (ej. fondo blanco, bordes).

Validaciones: N/A.

Diseño:
- El componente debe integrarse en el contenedor placeholder de la `DefineHorarioPage`.
- El diseño de la cuadrícula debe ser limpio y visualmente consistente con el frame 'T. Registro Tutor 2 (Vacío)'.
- Las celdas deben tener un aspecto clicable.

Integración: Será utilizado por la `DefineHorarioPage`.

Criterios de Aceptación Técnica:
- El componente `HorarioGrid` se renderiza correctamente dentro de `DefineHorarioPage`.
- La cuadrícula muestra los días de la semana y las horas desde las 07:00 hasta las 20:00.
- Las celdas individuales tienen un estilo visual básico (ej. fondo blanco con bordes sutiles) y un tamaño uniforme.
- El componente está marcado con `'use client'`. ---END_PROMPT---

---START_COMMIT--- HU41-T03 feat(frontend): maquetar componente de cuadrilla de horarios ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Implementación de la lógica de selección/deselección de bloques en `HorarioGrid` HU_NUMBER: HU41 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Registro Tutor 2 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 2H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La cuadrícula de horarios necesita ser interactiva para que el tutor pueda marcar su disponibilidad.

Objetivo: Añadir la funcionalidad de seleccionar y deseleccionar bloques horarios, con feedback visual.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/tutor/HorarioGrid/HorarioGrid.tsx`
- `src/interfaces/tutor/AvailabilityBlock.ts` (para definir la interfaz del bloque horario)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, clsx (opcional para manejo de clases condicionales).

Estructura:
- En `HorarioGrid.tsx`, inicializar el estado `selectedBlocks` utilizando `useState` (ej. `useState<AvailabilityBlock[]>([]);`).
- Definir la interfaz `AvailabilityBlock` en `src/interfaces/tutor/AvailabilityBlock.ts` con propiedades como `day: string` y `hour: string`.
- Implementar la función `toggleBlock(day: string, hour: string)` que:
    - Reciba el día y la hora del bloque clicado.
    - Verifique si el bloque ya existe en `selectedBlocks`.
    - Si existe, lo remueva. Si no existe, lo añada.
    - Debería limpiar cualquier mensaje de error visible al interactuar con la cuadrícula (ej. establecer `errorMessage` a `null`).
- Asignar el evento `onClick` a cada celda de la cuadrícula para llamar a `toggleBlock` con sus respectivos día y hora.
- Aplicar estilos condicionales a cada celda de la cuadrícula:
    - Si la celda está seleccionada, aplicar clases de Tailwind para un "fondo azul oscuro, texto blanco y un ícono '✓' blanco centrado".
    - Si no está seleccionada, aplicar el estilo por defecto (fondo blanco con hover).

Validaciones: N/A (la validación de envío se hará en tareas posteriores).

Diseño:
- El cambio visual de la celda debe ser claro y distinguible (blanco a azul oscuro con checkmark).
- El ícono '✓' debe ser un elemento visualmente centrado en la celda seleccionada.

Integración: `selectedBlocks` será el dato que se envíe a la Server Action.

Criterios de Aceptación Técnica:
- Al hacer clic en una celda, su estilo cambia a azul oscuro con un ícono '✓' blanco.
- Al hacer clic de nuevo en una celda seleccionada, su estilo vuelve a ser blanco y el ícono '✓' desaparece.
- El estado `selectedBlocks` en el componente se actualiza correctamente al seleccionar/deseleccionar bloques.
- La interacción es fluida y no introduce errores visuales o funcionales.
- La interfaz `AvailabilityBlock` está correctamente definida y utilizada. ---END_PROMPT---

---START_COMMIT--- HU41-T04 feat(frontend): implementar seleccion de bloques en HorarioGrid ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Implementación del contador de horarios seleccionados en `HorarioGrid` HU_NUMBER: HU41 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Registro Tutor 2 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Los usuarios necesitan feedback inmediato sobre cuántos horarios han seleccionado.

Objetivo: Mostrar un contador en tiempo real del número de bloques horarios seleccionados sobre la cuadrícula.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/tutor/HorarioGrid/HorarioGrid.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- En `HorarioGrid.tsx`, utilizar la longitud del estado `selectedBlocks` (`selectedBlocks.length`) para calcular el número.
- Renderizar condicionalmente un elemento de texto (`<p>`) encima de la cuadrícula.
- El texto debe ser "✓ X horario(s) seleccionado(s)", donde 'X' es el número actual.
- El mensaje solo debe ser visible si `selectedBlocks.length` es mayor que 0.
- Aplicar estilos de Tailwind CSS para que el mensaje sea de color verde y esté centrado.

Validaciones: N/A.

Diseño:
- El mensaje debe ser claramente visible, verde y centrado, como se indica en los criterios de aceptación.

Integración: Depende del estado `selectedBlocks` para su actualización en tiempo real.

Criterios de Aceptación Técnica:
- El mensaje de contador no es visible si no hay horarios seleccionados.
- Cuando se selecciona al menos un horario, el mensaje "✓ X horario(s) seleccionado(s)" aparece y muestra el número correcto.
- El contador se actualiza dinámicamente al añadir o remover horarios.
- El mensaje es de color verde y está centrado sobre la cuadrícula. ---END_PROMPT---

---START_COMMIT--- HU41-T05 feat(frontend): mostrar contador de horarios seleccionados ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Implementación de Server Action `guardarDisponibilidadAction` con seed data HU_NUMBER: HU41 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 2H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Necesitamos una Server Action para manejar la lógica de guardar la disponibilidad del tutor. Inicialmente, esta acción trabajará con datos mock para facilitar el desarrollo.

Objetivo: Implementar la Server Action `guardarDisponibilidadAction` que valide la entrada y retorne una respuesta simulada de éxito o un mensaje de error de validación.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/tutor/availability.ts`
- `src/seed/AvailabilitySuccessResponseSeed.ts` (ya creado en Tarea 1)
- `src/interfaces/tutor/AvailabilityBlock.ts` (ya creado en Tarea 4)

Tecnologías: Next.js 16 Server Actions, TypeScript.

Estructura:
- Crear el archivo `src/actions/tutor/availability.ts`.
- Añadir `'use server'` al inicio del archivo.
- Importar `availabilitySuccessSeed` desde `src/seed/AvailabilitySuccessResponseSeed.ts`.
- Importar `AvailabilityBlock` desde `src/interfaces/tutor/AvailabilityBlock.ts`.
- Implementar la función asíncrona `guardarDisponibilidadAction(selectedBlocks: AvailabilityBlock[])`.
- Dentro de la función:
    - Validar si `selectedBlocks` está vacío. Si `selectedBlocks.length === 0`, retornar un objeto `{ success: false, message: 'Selecciona al menos un horario disponible' }`.
    - **Fase de Desarrollo (Activo):** Retornar una respuesta exitosa mock utilizando `availabilitySuccessSeed`. Ejemplo: `return { success: true, data: availabilitySuccessSeed };`. Opcionalmente, simular un retardo con `await new Promise(resolve => setTimeout(resolve, 1000));`.
    - **Fase de Integración (Comentado):** Escribir un bloque completo de código para la petición `fetch` al endpoint `POST /api/disponibilidad`.
        - La URL del endpoint debe ser `${process.env.NEXT_PUBLIC_API_URL}/disponibilidad`.
        - Configurar `method: 'POST'`, `headers` (ej. `'Content-Type': 'application/json'`, y potencialmente `Authorization`).
        - El `body` de la petición debe ser `JSON.stringify({ tutorId: "...", blocks: selectedBlocks })`. Asume un `tutorId` de ejemplo por ahora o recupera uno si el contexto lo permite.
        - Implementar el manejo de la respuesta (`response.ok`, `response.json()`).
        - En caso de éxito del `fetch`, incluir `redirect('/registro/perfil-profesional')` para redirigir al siguiente paso.
        - Incluir un bloque `try...catch` para manejar errores de red o del API.
        - **TODO este bloque de código de `fetch` DEBE ESTAR COMENTADO en esta tarea.**
- Documentar en comentarios la estructura de respuesta esperada y los posibles códigos de error del backend.

Validaciones: Validación de `selectedBlocks` vacío.

Diseño: N/A.

Integración: Esta Server Action será invocada desde el `HorarioGrid`.

Criterios de Aceptación Técnica:
- El archivo `src/actions/tutor/availability.ts` está marcado con `'use server'`.
- La función `guardarDisponibilidadAction` valida correctamente si `selectedBlocks` está vacío y retorna el mensaje de error apropiado.
- Cuando `selectedBlocks` no está vacío, la acción retorna un objeto `{ success: true, data: availabilitySuccessSeed }` (o similar mock).
- El bloque de código `fetch` para la integración real con el backend está completamente escrito y COMENTADO dentro de la acción.
- El `redirect('/registro/perfil-profesional')` está incluido en la parte comentada del `fetch`. ---END_PROMPT---

---START_COMMIT--- HU41-T06 feat(backend): implementar Server Action de disponibilidad con seed ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Integración de `HorarioGrid` con `guardarDisponibilidadAction` y manejo de error de validación HU_NUMBER: HU41 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Registro Tutor 2 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El `HorarioGrid` necesita interactuar con la Server Action para guardar los datos y mostrar los mensajes de error adecuados.

Objetivo: Conectar el botón "Siguiente Perfil Profesional" para invocar la Server Action y gestionar el feedback visual del usuario, incluyendo errores de validación y estados de carga.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/tutor/HorarioGrid/HorarioGrid.tsx`
- `src/app/actions/tutor/availability.ts` (ya creado, se usará aquí)

Tecnologías: Next.js 16 Server Actions, React, TypeScript, Tailwind CSS 4.

Estructura:
- En `src/components/tutor/HorarioGrid/HorarioGrid.tsx`:
    - Importar `guardarDisponibilidadAction` desde `src/actions/tutor/availability.ts`.
    - Añadir estados `errorMessage: string | null` y `isSubmitting: boolean` utilizando `useState`.
    - Crear una función `handleSubmit` (o similar) que se ejecutará al hacer clic en el botón "Siguiente Perfil Profesional".
    - Dentro de `handleSubmit`:
        - Establecer `isSubmitting` a `true` y deshabilitar el botón "Siguiente Perfil Profesional".
        - Invocar `guardarDisponibilidadAction(selectedBlocks)`.
        - Esperar la `result` de la acción.
        - Si `result.success` es `false`, establecer `errorMessage` con `result.message` para mostrarlo.
        - Si `result.success` es `true`, la redirección se manejará por la Server Action, así que no se requiere lógica adicional aquí.
        - Establecer `isSubmitting` a `false` una vez que la acción haya finalizado.
- Renderizar condicionalmente el `errorMessage` (el placeholder rojo 'Selecciona al menos un horario disponible' de la Tarea 2) encima de la cuadrícula si `errorMessage` no es nulo.

Validaciones: Mostrar el mensaje de error de validación (`'Selecciona al menos un horario disponible'`) retornado por la Server Action.

Diseño:
- El mensaje de error debe ser visible, de color rojo y centrado sobre la cuadrícula, como se especifica en el criterio de aceptación.
- El botón "Siguiente Perfil Profesional" debe deshabilitarse visualmente mientras `isSubmitting` es `true`.

Integración: El `HorarioGrid` es el punto de interacción con la Server Action.

Criterios de Aceptación Técnica:
- Al hacer clic en "Siguiente Perfil Profesional" sin horarios seleccionados, el texto rojo 'Selecciona al menos un horario disponible' aparece encima de la cuadrícula, y la navegación se bloquea.
- El botón "Siguiente Perfil Profesional" se deshabilita mientras la Server Action está en progreso.
- Cuando se selecciona al menos un horario y se hace clic en el botón, la `guardarDisponibilidadAction` es invocada correctamente. ---END_PROMPT---

---START_COMMIT--- HU41-T07 feat(frontend): integrar HorarioGrid con Server Action y errores ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 8 TASK_TITLE: Implementación de la navegación hacia atrás y enlace de stepper HU_NUMBER: HU41 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Registro Tutor 2 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El flujo de registro debe permitir al usuario retroceder a pasos anteriores para revisar o corregir información.

Objetivo: Habilitar la navegación hacia la página "Datos Básicos" desde el botón inferior y el enlace del stepper superior, asegurando que la información previa se mantenga.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/tutor/HorarioGrid/HorarioGrid.tsx` (para el botón '← Atrás Datos Básicos')
- `src/app/registro/disponibilidad/page.tsx` (para la integración del stepper o si el botón está aquí)
- `src/components/common/Stepper/Stepper.tsx` (si el stepper es un componente compartido y maneja los enlaces)

Tecnologías: Next.js 16 (con `useRouter` y `Link`), React, TypeScript.

Estructura:
- En `src/components/tutor/HorarioGrid/HorarioGrid.tsx` (o donde esté el botón '← Atrás Datos Básicos'):
    - Importar `useRouter` de `next/navigation`.
    - Asignar un `onClick` al botón para invocar `router.push('/registro/datos-basicos')`. (Usar `router.push` en lugar de `router.back()` para asegurar una URL específica y evitar problemas con historial de navegación complejos, además de que `router.back()` podría no preservar el estado en casos específicos dependiendo de cómo se gestionen las rutas.)
- En `src/components/common/Stepper/Stepper.tsx` (o en `page.tsx` si el stepper es parte de la página):
    - Localizar el enlace del paso "1 Datos Básicos".
    - Asegurarse de que utilice el componente `Link` de Next.js (`import Link from 'next/link';`) con `href="/registro/datos-basicos"`.

Validaciones: N/A.

Diseño: N/A.

Integración: Utiliza las capacidades de enrutamiento de Next.js.

Criterios de Aceptación Técnica:
- Al hacer clic en el botón "← Atrás Datos Básicos", el usuario es redirigido a la pantalla `/registro/datos-basicos` (Paso 1).
- Al hacer clic en el enlace "1 Datos Básicos" en el stepper, el usuario es redirigido a la pantalla `/registro/datos-basicos` (Paso 1).
- La información previamente ingresada en el Paso 1 se mantiene intacta al regresar. (Esto es una propiedad de Next.js al usar `router.push` o `Link` y el manejo de estado de formularios si fue implementado correctamente). ---END_PROMPT---

---START_COMMIT--- HU41-T08 feat(frontend): implementar navegacion hacia atras y stepper ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 9 TASK_TITLE: Integración con backend real: Descomentar `fetch` en `guardarDisponibilidadAction` HU_NUMBER: HU41 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El desarrollo inicial de la Server Action y el frontend se realizó utilizando datos simulados (seed). Ahora es el momento de la integración real con el backend.

Objetivo: Conectar la Server Action `guardarDisponibilidadAction` con el endpoint real del backend para enviar y guardar la disponibilidad del tutor.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/tutor/availability.ts`

Tecnologías: Next.js 16 Server Actions, TypeScript.

Estructura:
- Abrir el archivo `src/actions/tutor/availability.ts`.
- Localizar y COMENTAR o ELIMINAR la línea que retorna el seed data (ej. `return { success: true, data: availabilitySuccessSeed };`).
- Localizar el bloque de código `fetch` que fue escrito y COMENTADO en la Tarea 6. DESCOMENTAR todo el bloque.
- Verificar que la URL del endpoint (`${process.env.NEXT_PUBLIC_API_URL}/disponibilidad`) sea correcta y que la variable de entorno `NEXT_PUBLIC_API_URL` esté configurada.
- Asegurarse de que los `headers` (`Content-Type: application/json` y `Authorization` si aplica) sean correctos.
- Confirmar que el `payload` (incluyendo `tutorId` y `blocks`) se esté enviando correctamente en el `body` del `fetch`.
- El bloque `try...catch` debe estar activo para manejar errores de la API.
- Verificar que el `redirect('/registro/perfil-profesional')` esté operativo en caso de respuesta exitosa del backend.

Validaciones: La validación interna de la Server Action (si `selectedBlocks` está vacío) debe seguir funcionando. La respuesta del backend (éxito o error) debe ser manejada y propagada correctamente.

Diseño: N/A.

Integración: Consumo directo del endpoint `POST /api/disponibilidad` del backend.

Criterios de Aceptación Técnica:
- La Server Action `guardarDisponibilidadAction` invoca exitosamente el endpoint `POST /api/disponibilidad` del backend.
- La respuesta del backend (éxito HTTP 2xx o error HTTP 4xx/5xx) es procesada correctamente por la Server Action.
- En caso de éxito del backend, el sistema redirige a `/registro/perfil-profesional`.
- En caso de error del backend (ej. validación, error de servidor), el mensaje de error se propaga al frontend y se muestra al usuario.
- No hay código de seed data activo en la Server Action. ---END_PROMPT---

---START_COMMIT--- HU41-T09 fix(backend): integrar Server Action con API real de disponibilidad ---END_COMMIT---
---END_TASK---