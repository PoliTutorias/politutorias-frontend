---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed para ExperienciaDto HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se requiere un conjunto de datos de ejemplo para simular la respuesta del backend al guardar una experiencia académica, permitiendo el desarrollo del frontend de manera independiente.
Objetivo: Crear un archivo de seed para ExperienciaDto que contenga ejemplos variados de experiencias profesionales.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/interfaces/experiencia-tipo/Experiencia.ts`
- `src/seed/ExperienciaSeedData.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
- Definir la interfaz `Experiencia` en `Experiencia.ts` que refleje la estructura esperada del DTO y entidad (`puesto`, `institucion`, `fechaInicio`, `fechaFin`).
- En `ExperienciaSeedData.ts`, crear y exportar un array `experienciaSeedData` de objetos que conformen la interfaz `Experiencia`.

Validaciones:
- Ninguna en esta tarea.

Diseño:
- N/A.

Integración:
- Los datos de este seed serán utilizados por la Server Action `actionGuardarExperiencia` (Tarea 10).
- Incluir ejemplos con `fechaFin` en formato `MM/AAAA` y la palabra "Presente".

Criterios de Aceptación Técnica:
- El seed contiene al menos 2 experiencias de ejemplo.
- La estructura de datos coincide con `ExperienciaDto` (representada por la interfaz `Experiencia`).
- Se incluyen ejemplos con `fechaFin` en formato `MM/AAAA` y `Presente`.
---END_PROMPT---

---START_COMMIT--- HU42-T01 chore(seed): crear seed para ExperienciaDto y su interfaz ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Creación de seed para PerfilProfesionalDto HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se necesita un conjunto de datos de ejemplo para simular la respuesta del backend al finalizar el registro del perfil profesional.
Objetivo: Crear un archivo de seed para PerfilProfesionalDto que incluya un array de experiencias y un array de materias.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/interfaces/perfil-profesional-tipo/PerfilProfesional.ts`
- `src/seed/PerfilProfesionalSeedData.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
- Definir la interfaz `PerfilProfesional` en `PerfilProfesional.ts` que refleje la estructura esperada del DTO y entidad, incluyendo arrays de `Experiencia` (de Tarea 1) y `string` para materias.
- En `PerfilProfesionalSeedData.ts`, crear y exportar un objeto `perfilProfesionalSeedData` que conforma la interfaz `PerfilProfesional`.
- Utilizar el `experienciaSeedData` de la Tarea 1 para poblar el campo `experiencias`.

Validaciones:
- Ninguna en esta tarea.

Diseño:
- N/A.

Integración:
- Los datos de este seed serán utilizados por la Server Action `actionFinalizarRegistro` (Tarea 16).

Criterios de Aceptación Técnica:
- El seed contiene un objeto `PerfilProfesionalDto` (representado por la interfaz `PerfilProfesional`) con experiencias y materias de ejemplo.
- La estructura de datos coincide con `PerfilProfesionalDto`.
---END_PROMPT---

---START_COMMIT--- HU42-T02 chore(seed): crear seed para PerfilProfesionalDto y su interfaz ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Implementación de la página `PaginaDetallesProfesionales` (layout principal y navegación) HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Registro Tutor 3 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 2H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se requiere crear la página principal para el tercer paso del wizard de registro de tutor, que es la sección de detalles profesionales.
Objetivo: Implementar el layout base de la página, incluyendo la barra de progreso y los botones de navegación, preparando el contenedor para el formulario principal.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/tutor/registro/detalles-profesionales/page.tsx`
- (Opcional) `src/components/layout/progress-bar/ProgressBar.tsx` (si existe un componente genérico de barra de progreso)
- (Opcional) `src/components/ui/button/Button.tsx` (para los botones de navegación)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- `src/app/tutor/registro/detalles-profesionales/page.tsx` debe ser un Server Component.
- Debe contener la estructura básica de la página, un header para la barra de progreso, un contenedor principal para el formulario y un footer para los botones de navegación.
- La barra de progreso debe resaltar visualmente el "Paso 3: Detalles Profesionales". Si se usa un componente `ProgressBar` genérico, asegurarse de pasar las props adecuadas para destacar este paso.
- Los botones de navegación '← Atrás Disponibilidad' y 'Finalizar Registro' deben estar posicionados en la parte inferior de la página.

Validaciones:
- Ninguna en esta tarea, solo maquetación.

Diseño:
- Basarse en el frame `T. Registro Tutor 3 (Vacío)` para el layout general, la barra de progreso y la posición de los botones.
- Aplicar estilos con Tailwind CSS 4 para un diseño responsive y estético.

Integración:
- N/A.

Criterios de Aceptación Técnica:
- La página renderiza el layout general del Paso 3.
- La barra de progreso muestra correctamente el Paso 3 como activo.
- Los elementos de navegación (botones 'atrás' y 'finalizar') están presentes visualmente y correctamente estilizados.
---END_PROMPT---

---START_COMMIT--- HU42-T03 feat(layout): implementar pagina Detalles Profesionales con layout y navegacion ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Creación del componente `FormDetallesProfesionales` (contenedor del formulario y estado local) HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Registro Tutor 3 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 2.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La página de detalles profesionales necesita un componente de formulario que encapsule la lógica y el estado de las experiencias y materias.
Objetivo: Crear un componente `FormDetallesProfesionales` que actúe como contenedor principal del formulario, gestionando el estado local para experiencias y materias, y renderizando sus secciones correspondientes.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/registro/form-detalles-profesionales/FormDetallesProfesionales.tsx`
- `src/app/tutor/registro/detalles-profesionales/page.tsx` (para integrar este componente)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- `src/components/registro/form-detalles-profesionales/FormDetallesProfesionales.tsx` debe ser un Client Component (`'use client'`).
- Definir un estado local usando `useState<Experiencia[]>` para las experiencias profesionales (utilizando la interfaz `Experiencia` de Tarea 1). Inicializar como un array vacío.
- Definir un estado local usando `useState<string[]>` para las materias. Inicializar como un array vacío.
- Renderizar las secciones visuales para "Experiencia" (con un botón '+ Añadir Experiencia') y "Materias" (con un campo de entrada y botón '+ Agregar').
- Preparar placeholders o contenedores vacíos donde se renderizarán el `ModalNuevaExperiencia` (Tarea 5) y la lista de `EtiquetaMateria` (Tarea 14).
- Integrar este componente dentro de `src/app/tutor/registro/detalles-profesionales/page.tsx`.

Validaciones:
- Ninguna en esta tarea, solo estructura y estado inicial.

Diseño:
- Basarse en el frame `T. Registro Tutor 3 (Vacío)` para la disposición general de las secciones de experiencia y materias.
- Aplicar estilos con Tailwind CSS 4.

Integración:
- Será el componente padre que pasará los handlers de actualización de estado a los componentes hijos (modal, inputs, etiquetas).

Criterios de Aceptación Técnica:
- El componente se renderiza correctamente dentro de la página principal.
- Los estados `experiencias` y `materias` están definidos como arrays vacíos y listos para ser gestionados.
- Las secciones visuales para experiencias y materias están maquetadas y con sus respectivos botones/inputs (aunque la lógica detallada se implemente en tareas posteriores).
---END_PROMPT---

---START_COMMIT--- HU42-T04 feat(frontend): crear FormDetallesProfesionales con estado local ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Implementación del componente `ModalNuevaExperiencia` (UI del modal) HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- El modal se deriva del frame `T. Registro Tutor 3 (Vacío)` al hacer clic en '+ Añadir Experiencia'. ---END_FRAME---

---START_ESTIMATION--- 2H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Al añadir una nueva experiencia, el tutor necesita una interfaz modal para introducir los detalles.
Objetivo: Implementar el componente `ModalNuevaExperiencia` con su estructura visual, incluyendo campos para puesto, institución, fechas y botones de acción.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/registro/modal-nueva-experiencia/ModalNuevaExperiencia.tsx`
- `src/components/registro/form-detalles-profesionales/FormDetallesProfesionales.tsx` (para invocar el modal)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- `src/components/registro/modal-nueva-experiencia/ModalNuevaExperiencia.tsx` debe ser un Client Component (`'use client'`).
- Implementar la estructura básica de un modal (overlay de fondo oscuro, ventana centrada flotante).
- Incluir props `isOpen` (booleano) y `onClose` (función) para controlar la visibilidad y el cierre del modal.
- Dentro del modal, añadir:
    - Campo para 'Puesto' (utilizando `InputExperiencia` de Tarea 6).
    - Campo para 'Institución' (utilizando `InputExperiencia` de Tarea 6).
    - Campos para 'Fecha Inicio' y 'Fecha Fin' (utilizando `InputFechaExperiencia` de Tarea 7).
- Incluir un botón 'Cancelar' y un botón 'Guardar' en la parte inferior del modal, con handlers de eventos vacíos por ahora.

Validaciones:
- Ninguna visual en esta tarea, solo estructura del modal.

Diseño:
- Basarse en la descripción de un modal estándar: fondo oscuro semitransparente, ventana centrada con bordes redondeados, campos bien espaciados.
- Aplicar estilos con Tailwind CSS 4.

Integración:
- `FormDetallesProfesionales` invocará y controlará la visibilidad de este modal.
- Los campos de entrada dependerán de los componentes `InputExperiencia` y `InputFechaExperiencia` de tareas futuras.

Criterios de Aceptación Técnica:
- El modal se renderiza correctamente cuando `isOpen` es `true`, y se oculta cuando es `false`.
- El modal presenta la estructura visual con los placeholders para los campos de entrada de texto y fecha.
- Los botones 'Cancelar' y 'Guardar' son visibles y estilizados.
---END_PROMPT---

---START_COMMIT--- HU42-T05 feat(frontend): implementar UI de ModalNuevaExperiencia ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Implementación del componente `InputExperiencia` (campos Puesto e Institución) HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Los campos de texto "Puesto" e "Institución" dentro del modal de experiencia necesitan un componente de entrada reutilizable.
Objetivo: Crear un componente `InputExperiencia` genérico que acepte propiedades comunes de un campo de texto y aplique estilos.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/registro/input-experiencia/InputExperiencia.tsx`
- `src/components/registro/modal-nueva-experiencia/ModalNuevaExperiencia.tsx` (para usar este input)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- `src/components/registro/input-experiencia/InputExperiencia.tsx` debe ser un Client Component (`'use client'`).
- Definir un componente que renderice un elemento `<input type="text">`.
- Aceptar props: `label: string`, `placeholder: string`, `value: string`, `onChange: (e: React.ChangeEvent<HTMLInputElement>) => void`.
- Incluir un `label` asociado al input.

Validaciones:
- Ninguna en esta tarea.

Diseño:
- Aplicar estilos básicos de input con Tailwind CSS 4 (ej. `border`, `rounded`, `p-2`, `w-full`).
- Asegurar que el input sea accesible con un `label` correctamente asociado.

Integración:
- Será utilizado por `ModalNuevaExperiencia` para los campos 'Puesto' e 'Institución'.

Criterios de Aceptación Técnica:
- El componente `InputExperiencia` es funcional y renderiza un campo de texto.
- Permite la entrada de texto y actualiza su valor a través de `onChange`.
- El label se muestra correctamente encima del input.
---END_PROMPT---

---START_COMMIT--- HU42-T06 feat(frontend): crear componente InputExperiencia ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Implementación del componente `InputFechaExperiencia` y lógica `handleDateInputFormat` HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 2H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Los campos de fecha requieren un manejo especial de formato y bloqueo de caracteres para cumplir los Criterios de Aceptación CA3 y CA4.
Objetivo: Implementar el componente `InputFechaExperiencia` y una función utilitaria `handleDateInputFormat` que formatee automáticamente a `MM/AAAA`, bloquee caracteres no numéricos y permita la palabra "Presente" en el campo de fecha fin.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/registro/input-fecha-experiencia/InputFechaExperiencia.tsx`
- `src/utils/clientDateValidation.ts`
- `src/components/registro/modal-nueva-experiencia/ModalNuevaExperiencia.tsx` (para usar este input)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- `src/components/registro/input-fecha-experiencia/InputFechaExperiencia.tsx` debe ser un Client Component (`'use client'`).
- Recibirá props como `label`, `placeholder`, `value`, `onChange`, y `fieldName: 'fechaInicio' | 'fechaFin'`.
- La función `handleDateInputFormat(event: React.KeyboardEvent<HTMLInputElement>, fieldName: 'fechaInicio' | 'fechaFin')` debe ser definida en `src/utils/clientDateValidation.ts`.
- Esta función en `clientDateValidation.ts` debe:
    - **CA3:** Bloquear la entrada de caracteres que no sean números o '/' y permitir teclas de control (Backspace, Delete, flechas).
    - **CA3:** Si `fieldName` es 'fechaFin', permitir la entrada de la palabra "Presente" (case-insensitive) exactamente.
    - **Formato automático:** Al ingresar el tercer dígito numérico, auto-agregar '/' (ej: '03' -> '03/').
    - **CA4 (prevención de exceso):** Prevenir la entrada de caracteres si la longitud excede 7 para `MM/AAAA` o 8 para "Presente" (antes de que la validación formal de Tarea 8 muestre el error).

Validaciones:
- Implementar la lógica de bloqueo y auto-formateo descrita en los pasos de implementación y CA3, CA4 (prevención).

Diseño:
- Aplicar estilos de input con Tailwind CSS 4, similar a `InputExperiencia`.

Integración:
- `InputFechaExperiencia` utilizará `handleDateInputFormat` en el evento `onKeyDown` o `onInput` para controlar la entrada de datos.
- Será utilizado por `ModalNuevaExperiencia`.

Criterios de Aceptación Técnica:
- **CA3:** El campo de fecha solo permite la entrada de números y '/'.
- **CA3:** En el campo 'Fecha Fin', se permite la palabra 'Presente' (y la maneja correctamente para evitar que otros caracteres la modifiquen).
- El formato `MM/AAAA` se aplica automáticamente al ingresar el tercer dígito (ej. '03' se convierte en '03/').
- La longitud máxima de caracteres es controlada para `MM/AAAA` (7) y "Presente" (8).
---END_PROMPT---

---START_COMMIT--- HU42-T07 feat(frontend): implementar InputFechaExperiencia y logica de formato ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 8 TASK_TITLE: Implementación de la utilidad `clientValidarFecha` y renderizado de `MensajeErrorFecha` HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 2H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Además del formateo en tiempo real, se necesita una validación formal de las fechas ingresadas y mostrar mensajes de error visibles.
Objetivo: Crear la utilidad `clientValidarFecha` para validar el formato `MM/AAAA` y la longitud máxima, y un componente `MensajeErrorFecha` para mostrar los errores.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/utils/clientDateValidation.ts` (añadir `clientValidarFecha`)
- `src/components/ui/mensaje-error-fecha/MensajeErrorFecha.tsx`
- `src/components/registro/input-fecha-experiencia/InputFechaExperiencia.tsx` (para usar la validación y el mensaje de error)
- `src/components/registro/modal-nueva-experiencia/ModalNuevaExperiencia.tsx` (para gestionar el estado de error de las fechas)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- En `src/utils/clientDateValidation.ts`, implementar la función `clientValidarFecha(dateString: string, fieldName: 'fechaInicio' | 'fechaFin'): { isValid: boolean, message?: string }`.
    - Esta función debe:
        - Si `fieldName` es 'fechaFin' y `dateString.toLowerCase() === 'presente'`, retornar `{ isValid: true }`.
        - **CA2:** Validar que `dateString` cumpla el formato `MM/AAAA` mediante una expresión regular (ej. `/^(0[1-9]|1[0-2])\/\d{4}$/`).
        - Validar que el mes esté entre 01 y 12.
        - Validar que el año sea un año razonable (ej. no futuro excesivo, no pasado muy lejano).
        - **CA4:** Verificar que la longitud de `dateString` no exceda los 7 caracteres para `MM/AAAA`. Si excede y no es "Presente", retornar `{ isValid: false, message: 'Máximo 7 caracteres' }`.
- `src/components/ui/mensaje-error-fecha/MensajeErrorFecha.tsx` debe ser un componente sencillo (`<span>` o `div`) que reciba `message: string` como prop y lo muestre con estilos de error (texto rojo, tamaño pequeño). Debe ser un Client Component.
- En `InputFechaExperiencia`, integrar el `MensajeErrorFecha`. El `InputFechaExperiencia` recibirá una prop `errorMessage: string | undefined`. Si `errorMessage` tiene un valor, lo mostrará debajo del input.
- En `ModalNuevaExperiencia`, gestionar el estado de los errores de fecha, llamando a `clientValidarFecha` en el evento `onChange` de los `InputFechaExperiencia` y actualizando un estado local para los mensajes de error.

Validaciones:
- **CA2:** La utilidad `clientValidarFecha` valida el formato `MM/AAAA`.
- **CA4:** Si la fecha excede los 7 caracteres (o 8 para 'Presente'), `clientValidarFecha` retorna el mensaje de error "Máximo 7 caracteres" (o similar).

Diseño:
- El `MensajeErrorFecha` debe tener estilos Tailwind CSS 4 para mostrar el texto en rojo y un tamaño legible debajo del campo de fecha.

Integración:
- `InputFechaExperiencia` se encargará de mostrar el mensaje de error basado en una prop.
- `ModalNuevaExperiencia` será responsable de ejecutar la validación y pasar el mensaje de error.

Criterios de Aceptación Técnica:
- **CA2:** Las fechas ingresadas se validan contra el formato `MM/AAAA` y rangos lógicos de mes/año.
- **CA4:** Si la fecha excede los 7 caracteres (o 8 para 'Presente'), se muestra el mensaje de error "Máximo 7 caracteres" debajo del campo de fecha.
- Los mensajes de error de fecha se muestran en rojo debajo del campo correspondiente.
---END_PROMPT---

---START_COMMIT--- HU42-T08 feat(frontend): implementar clientValidarFecha y MensajeErrorFecha ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 9 TASK_TITLE: Lógica client-side `actionValidarCamposExperiencia` para CA1 HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El Criterio de Aceptación CA1 requiere que si el tutor intenta guardar una experiencia con todos los campos vacíos, la acción se ignore silenciosamente y el modal permanezca abierto.
Objetivo: Implementar una función client-side `actionValidarCamposExperiencia` que verifique si los campos clave de una experiencia están vacíos y, en base a esto, controle la acción de guardar.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/registro/modal-nueva-experiencia/ModalNuevaExperiencia.tsx` (añadir la lógica o helper)
- (Opcional) `src/utils/formValidation.ts` si se considera una utilidad más genérica.

Tecnologías: Next.js 16, React, TypeScript.

Estructura:
- Dentro de `ModalNuevaExperiencia.tsx`, crear una función `validarCamposVaciosExperiencia(experiencia: Experiencia): boolean`.
- Esta función debe verificar si las propiedades `puesto`, `institucion`, y `fechaInicio` (y `fechaFin` si no es "Presente") del objeto `experiencia` están vacías o solo contienen espacios en blanco.
- En el handler del botón 'Guardar' de `ModalNuevaExperiencia`:
    - Antes de llamar a cualquier lógica de guardado, invocar `validarCamposVaciosExperiencia`.
    - **CA1:** Si la función retorna `true` (campos vacíos), el handler debe retornar `void` sin realizar ninguna otra acción (ej. sin cerrar el modal, sin llamadas a Server Actions, sin mensajes de error).

Validaciones:
- **CA1:** La función valida que los campos clave de la experiencia no estén vacíos.

Diseño:
- N/A.

Integración:
- Integrar esta lógica en el `onClick` del botón 'Guardar' dentro de `ModalNuevaExperiencia`.

Criterios de Aceptación Técnica:
- **CA1:** Si todos los campos de 'Nueva Experiencia' (`puesto`, `institucion`, `fechaInicio`, `fechaFin` si no es "Presente") están vacíos (o solo espacios), al hacer clic en 'Guardar', el modal permanece en pantalla y no hay mensajes de error ni intentos de guardar.
---END_PROMPT---

---START_COMMIT--- HU42-T09 feat(frontend): implementar logica para ignorar guardar experiencia vacia (CA1) ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 10 TASK_TITLE: Implementación de Server Action `actionGuardarExperiencia` con seed data HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 2H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Después de validar la experiencia, es necesario un mecanismo para "guardarla". Inicialmente, esto será simulado con seed data.
Objetivo: Implementar la Server Action `actionGuardarExperiencia` que, de forma preliminar, retornará seed data, y preparar el código de integración con el backend (comentado). Actualizar el frontend para usarla.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/registro/guardarExperiencia.ts`
- `src/seed/ExperienciaSeedData.ts` (importar)
- `src/components/registro/modal-nueva-experiencia/ModalNuevaExperiencia.tsx` (para llamar a la action)
- `src/components/registro/form-detalles-profesionales/FormDetallesProfesionales.tsx` (para actualizar el estado)
- `src/interfaces/experiencia-tipo/Experiencia.ts` (importar)

Tecnologías: Next.js 16, React, TypeScript.

Estructura:
- Crear `src/actions/registro/guardarExperiencia.ts` y marcarlo con `'use server'`.
- Importar la interfaz `Experiencia` y el `experienciaSeedData` de Tarea 1.
- Definir la función `actionGuardarExperiencia(experienciaData: Experiencia)`:
    - Retornar un objeto de éxito que incluya una `Experiencia` (se puede retornar una experiencia simulada, como la primera del `experienciaSeedData`, o una nueva experiencia generada con un ID simulado a partir de `experienciaData` para un comportamiento más realista).
    - Simular un pequeño retardo con `await new Promise(resolve => setTimeout(resolve, 500))` para emular una llamada de red.
- **IMPORTANTE:** Escribir el bloque de código completo para la petición `fetch` a un endpoint `POST /api/experiencias` (o el endpoint real del backend), incluyendo headers (`Content-Type: application/json`), `body` (`JSON.stringify(experienciaData)`), y manejo de errores (`try-catch`), pero COMENTAR TODO ESTE BLOQUE.
- En el `onClick` del botón 'Guardar' de `ModalNuevaExperiencia` (después de la validación CA1):
    - Recolectar los datos del formulario de la experiencia.
    - Llamar a `actionGuardarExperiencia` con estos datos.
    - Manejar la respuesta: si es exitosa, cerrar el modal y notificar al componente padre.
- En `FormDetallesProfesionales`, implementar una función `onExperienciaGuardada` (pasada como prop al modal) que:
    - Reciba la `Experiencia` guardada.
    - Actualice el estado local `experiencias` añadiendo la nueva experiencia.

Validaciones:
- N/A, la validación client-side de CA1 ya ocurrió.

Diseño:
- N/A.

Integración:
- `ModalNuevaExperiencia` llama a la Server Action.
- `FormDetallesProfesionales` gestiona el estado global de experiencias.

Criterios de Aceptación Técnica:
- La Server Action `actionGuardarExperiencia` se puede invocar y retorna correctamente el seed data (o una simulación de guardado).
- El código de integración con el backend (`fetch`) está presente en `actionGuardarExperiencia.ts` y completamente comentado.
- Al hacer clic en 'Guardar' (con campos llenos y válidos), el modal se cierra y la experiencia "guardada" se refleja en el estado local y potencialmente en la UI del `FormDetallesProfesionales`.
---END_PROMPT---

---START_COMMIT--- HU42-T10 feat(api): implementar actionGuardarExperiencia con seed data ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 11 TASK_TITLE: Renderizado de la lista de experiencias añadidas en `FormDetallesProfesionales` HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Registro Tutor 3 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Las experiencias que el tutor ha añadido necesitan ser visibles en la interfaz principal del formulario.
Objetivo: Implementar la visualización de las experiencias como una lista de tarjetas en la sección "Experiencia" del `FormDetallesProfesionales`.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/registro/form-detalles-profesionales/FormDetallesProfesionales.tsx` (mapear y renderizar)
- `src/components/registro/tarjeta-experiencia/TarjetaExperiencia.tsx` (nuevo componente)
- `src/interfaces/experiencia-tipo/Experiencia.ts` (importar)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, react-icons (para el icono de eliminar).

Estructura:
- En `src/components/registro/form-detalles-profesionales/FormDetallesProfesionales.tsx`, dentro de la sección de experiencias, mapear el array `experiencias` del estado local.
- Para cada `Experiencia` en el array, renderizar un componente `TarjetaExperiencia`.
- `src/components/registro/tarjeta-experiencia/TarjetaExperiencia.tsx` debe ser un Client Component (`'use client'`).
- `TarjetaExperiencia` debe recibir una prop `experiencia: Experiencia` y una prop `onDelete: (id: string) => void`.
- Dentro de `TarjetaExperiencia`, mostrar el `puesto`, `institucion`, `fechaInicio` y `fechaFin` de manera legible.
- Incluir un botón o icono (ej. `MdClose` de `react-icons/md`) con una 'x' para eliminar la experiencia. Este botón debe invocar `onDelete` pasando el ID de la experiencia (o un índice si no hay ID persistido).
- La lógica `onDelete` en `FormDetallesProfesionales` debe eliminar la experiencia correspondiente del estado local `experiencias` (solo client-side por ahora).

Validaciones:
- N/A.

Diseño:
- Las tarjetas de experiencia deben ser visualmente atractivas, con un diseño claro que muestre la información principal.
- Aplicar estilos con Tailwind CSS 4 para el diseño de la tarjeta y el botón de eliminar.

Integración:
- `FormDetallesProfesionales` es el padre que gestiona el estado y pasa los datos.
- `TarjetaExperiencia` es el componente hijo que muestra la información y permite la eliminación local.

Criterios de Aceptación Técnica:
- Las experiencias añadidas se muestran como una lista o tarjetas en la interfaz del `FormDetallesProfesionales`.
- Cada tarjeta muestra la información relevante de la experiencia (puesto, institución, fechas).
- Se puede eliminar una experiencia de la lista localmente haciendo clic en la 'x' de la tarjeta.
---END_PROMPT---

---START_COMMIT--- HU42-T11 feat(frontend): renderizar lista de experiencias con TarjetaExperiencia ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 12 TASK_TITLE: Implementación de los componentes `InputMateria` y `BotonAgregarMateria` HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Registro Tutor 3 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El tutor necesita una forma de ingresar y añadir materias en la sección correspondiente del formulario.
Objetivo: Implementar el campo de texto para "Escribe una Materia" y el botón '+ Agregar' en `FormDetallesProfesionales`.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/registro/form-detalles-profesionales/FormDetallesProfesionales.tsx` (añadir el input y botón)
- (Opcional) `src/components/ui/input/Input.tsx` (para el input de materia)
- (Opcional) `src/components/ui/button/Button.tsx` (para el botón de agregar)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- En `src/components/registro/form-detalles-profesionales/FormDetallesProfesionales.tsx`, dentro de la sección de materias:
    - Crear un estado local `useState<string>` para el valor del input de materia (ej. `materiaInput`).
    - Renderizar un `<input type="text">` con `placeholder="Ej. Cálculo, Física..."` y el `value` vinculado a `materiaInput`.
    - Renderizar un `<button>` con el texto '+ Agregar'.
    - Implementar un handler `onChange` para el input que actualice `materiaInput`.
    - El `onClick` del botón '+ Agregar' estará vacío por ahora (se implementará en Tarea 13).

Validaciones:
- Ninguna en esta tarea.

Diseño:
- Basarse en el frame `T. Registro Tutor 3 (Vacío)` para la disposición y estilos del input y botón.
- El input y botón deben estar alineados, con el botón a la derecha del input.
- Aplicar estilos con Tailwind CSS 4.

Integración:
- N/A.

Criterios de Aceptación Técnica:
- El campo de texto 'Escribe una Materia' y el botón '+ Agregar' son visibles y correctamente estilizados en `FormDetallesProfesionales`.
- El campo de texto permite la entrada de materias y su valor se gestiona localmente.
---END_PROMPT---

---START_COMMIT--- HU42-T12 feat(frontend): implementar InputMateria y BotonAgregarMateria ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 13 TASK_TITLE: Lógica client-side `actionAgregarMateria` para añadir y gestionar materias (CA5) HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Registro Tutor 3 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Cuando el tutor ingresa una materia y hace clic en '+ Agregar', el sistema debe procesar esa materia.
Objetivo: Implementar la lógica client-side en `FormDetallesProfesionales` para añadir una materia al estado local, limpiar el campo de texto y evitar duplicados (CA5).

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/registro/form-detalles-profesionales/FormDetallesProfesionales.tsx` (añadir la lógica)

Tecnologías: Next.js 16, React, TypeScript.

Estructura:
- En `src/components/registro/form-detalles-profesionales/FormDetallesProfesionales.tsx`:
    - Crear una función `actionAgregarMateria` (o `handleAgregarMateria`) que será el handler del `onClick` del botón '+ Agregar'.
    - Esta función debe:
        - Obtener el valor actual de `materiaInput` (el estado local del input).
        - Realizar una validación simple: si `materiaInput` está vacío o solo contiene espacios en blanco, no hacer nada y salir.
        - Convertir `materiaInput` a un formato estandarizado (ej. `trim()`, capitalizar la primera letra si se desea, aunque no es un requisito explícito).
        - **CA5 (evitar duplicados):** Verificar si la materia ya existe en el array `materias` del estado local (ignorando mayúsculas/minúsculas o espacios). Si ya existe, no añadirla.
        - Si la materia es válida y no es un duplicado, añadirla al array `materias` del estado local usando `setMaterias([...materias, nuevaMateria])`.
        - **CA5 (limpiar campo):** Limpiar el campo de texto `materiaInput` usando `setMateriaInput('')`.
    - Asignar esta función al `onClick` del botón '+ Agregar'.

Validaciones:
- La materia no debe ser una cadena vacía o solo espacios.
- Se debe evitar añadir materias duplicadas.

Diseño:
- N/A.

Integración:
- Esta lógica interactúa directamente con el estado local `materiaInput` y `materias` de `FormDetallesProfesionales`.

Criterios de Aceptación Técnica:
- **CA5:** Al ingresar una materia válida y hacer clic en '+ Agregar', el campo de texto del input se limpia.
- **CA5:** La materia ingresada se añade al estado local `materias`.
- Las materias duplicadas no se añaden al estado.
---END_PROMPT---

---START_COMMIT--- HU42-T13 feat(frontend): implementar logica para agregar y gestionar materias (CA5) ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 14 TASK_TITLE: Implementación del componente `EtiquetaMateria` (visualización y eliminación de tags) HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Registro Tutor 3 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Las materias añadidas por el tutor deben ser presentadas visualmente como etiquetas (`pill` o `tag`) y deben poder ser eliminadas.
Objetivo: Implementar el componente `EtiquetaMateria` y la lógica para renderizar y eliminar estas etiquetas en `FormDetallesProfesionales` (CA5).

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/registro/etiqueta-materia/EtiquetaMateria.tsx`
- `src/components/registro/form-detalles-profesionales/FormDetallesProfesionales.tsx` (para mapear y renderizar)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, react-icons (para el icono de eliminar).

Estructura:
- `src/components/registro/etiqueta-materia/EtiquetaMateria.tsx` debe ser un Client Component (`'use client'`).
- Recibir props: `materia: string` y `onDelete: (materia: string) => void`.
- Renderizar un `div` o `span` con el texto de la `materia` y aplicar estilos de "pill" (ej. fondo celeste claro, bordes redondeados, padding).
- Incluir un botón o icono (ej. `MdClose` de `react-icons/md`) con una 'x' a la derecha. Al hacer clic, este botón debe invocar `onDelete(materia)`.
- En `src/components/registro/form-detalles-profesionales/FormDetallesProfesionales.tsx`, dentro de la sección de materias:
    - Mapear el array `materias` del estado local.
    - Para cada materia, renderizar un `EtiquetaMateria`, pasando la materia y una función `onDelete` que filtre la materia del estado local `materias`.

Validaciones:
- N/A.

Diseño:
- **CA5:** El `EtiquetaMateria` debe tener un estilo visual de "pill" de color celeste claro con el texto de la materia.
- Debe incluir una 'x' visible a la derecha que actúe como botón para eliminar.
- Aplicar estilos con Tailwind CSS 4.

Integración:
- `FormDetallesProfesionales` es el padre que gestiona el estado `materias` y los callbacks de eliminación.
- `EtiquetaMateria` es el componente hijo que visualiza y permite la interacción.

Criterios de Aceptación Técnica:
- **CA5:** Las materias añadidas se muestran como etiquetas visuales con estilo de "pill" celeste claro.
- **CA5:** Cada etiqueta tiene una 'x' a la derecha que permite eliminarla de la lista de materias.
- La eliminación de una etiqueta actualiza el estado local de `materias`.
---END_PROMPT---

---START_COMMIT--- HU42-T14 feat(frontend): implementar componente EtiquetaMateria (CA5) ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 15 TASK_TITLE: Implementación del componente `BotonFinalizarRegistro` HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Registro Tutor 3 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La página de registro de detalles profesionales necesita un botón para finalizar todo el proceso.
Objetivo: Implementar el botón 'Finalizar Registro' en la parte inferior de la página, listo para recolectar y enviar los datos.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/ui/boton-finalizar-registro/BotonFinalizarRegistro.tsx`
- `src/components/registro/form-detalles-profesionales/FormDetallesProfesionales.tsx` (para renderizarlo y pasarle el handler)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- `src/components/ui/boton-finalizar-registro/BotonFinalizarRegistro.tsx` debe ser un Client Component (`'use client'`).
- Definir un componente que renderice un elemento `<button>` con el texto 'Finalizar Registro'.
- Aceptar una prop `onClick: () => void`.
- En `src/components/registro/form-detalles-profesionales/FormDetallesProfesionales.tsx`:
    - Renderizar el `BotonFinalizarRegistro` en la parte inferior.
    - El handler `onClick` para este botón debe ser una función que recolecte los arrays de `experiencias` y `materias` del estado local. Esta función preparará la llamada a la Server Action `actionFinalizarRegistro` (Tarea 16).

Validaciones:
- Ninguna en esta tarea, solo UI.

Diseño:
- El botón debe estar estilizado según el prototipo (normalmente un botón primario, visible y claro).
- Aplicar estilos con Tailwind CSS 4.

Integración:
- `FormDetallesProfesionales` será el componente padre que invoque el `onClick` del botón.

Criterios de Aceptación Técnica:
- El botón 'Finalizar Registro' es visible y clicable en la interfaz.
- Al hacer clic, intenta recopilar los datos de experiencias y materias del estado local.
---END_PROMPT---

---START_COMMIT--- HU42-T15 feat(frontend): implementar componente BotonFinalizarRegistro ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 16 TASK_TITLE: Implementación de Server Action `actionFinalizarRegistro` con seed data y redirección HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 2.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Una vez que el tutor ha ingresado toda su información profesional, necesita un mecanismo para finalizar el proceso y ser redirigido a una pantalla de éxito.
Objetivo: Implementar la Server Action `actionFinalizarRegistro` que, inicialmente, simulará el guardado con seed data y luego redirigirá al usuario a la `PantallaRegistroExitoso` (CA6).

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/registro/finalizarRegistro.ts`
- `src/seed/PerfilProfesionalSeedData.ts` (importar)
- `src/components/registro/form-detalles-profesionales/FormDetallesProfesionales.tsx` (para llamar a la action)
- `src/interfaces/perfil-profesional-tipo/PerfilProfesional.ts` (importar)

Tecnologías: Next.js 16, React, TypeScript.

Estructura:
- En `src/actions/registro/finalizarRegistro.ts`, crear la función `actionFinalizarRegistro(perfilData: PerfilProfesional)`. Marcarla con `'use server'`.
- Importar la interfaz `PerfilProfesional` y el `perfilProfesionalSeedData` de Tarea 2.
- Dentro de `actionFinalizarRegistro`:
    - Simular un pequeño retardo con `await new Promise(resolve => setTimeout(resolve, 500))`.
    - Retornar un objeto de éxito con el `perfilProfesionalSeedData` o una simulación de guardado basada en `perfilData`.
    - **IMPORTANTE:** Escribir el bloque de código completo para la petición `fetch` a un endpoint `POST /api/perfil/finalizar` (o el endpoint real del backend), incluyendo headers y `body`, pero COMENTAR TODO ESTE BLOQUE.
    - **CA6 (redirección):** Si la simulación es exitosa, usar `redirect('/registro-exitoso')` de `next/navigation`.
- En el handler `onClick` del `BotonFinalizarRegistro` en `FormDetallesProfesionales`:
    - Recolectar los datos finales de `experiencias` y `materias` del estado local para formar un objeto `PerfilProfesional`.
    - Llamar a `actionFinalizarRegistro` con estos datos.
    - Manejar la respuesta (la redirección se hará automáticamente por la Server Action).

Validaciones:
- N/A, las validaciones de campos individuales ya ocurrieron.

Diseño:
- N/A.

Integración:
- `FormDetallesProfesionales` llama a la Server Action.
- La Server Action utiliza `next/navigation` para la redirección.

Criterios de Aceptación Técnica:
- **CA6:** La Server Action `actionFinalizarRegistro` retorna un éxito con el seed data (o una simulación).
- **CA6:** Tras el éxito, el sistema redirige al usuario a la URL `/registro-exitoso` utilizando `redirect` de Next.js.
- El código de integración con el backend (`fetch`) está presente en `finalizarRegistro.ts` y completamente comentado.
---END_PROMPT---

---START_COMMIT--- HU42-T16 feat(api): implementar actionFinalizarRegistro con seed data y redireccion (CA6) ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 17 TASK_TITLE: Implementación de la página `PantallaRegistroExitoso` HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- No se proporcionó un frame específico, pero es una pantalla de éxito. ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Después de un registro exitoso, el tutor debe ver una pantalla de confirmación.
Objetivo: Crear la página `PantallaRegistroExitoso` que muestre un mensaje de éxito y un diseño amigable (CA6).

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/registro-exitoso/page.tsx`

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura:
- `src/app/registro-exitoso/page.tsx` debe ser un Server Component.
- Contener un `div` centralizado que muestre el mensaje principal.
- Mostrar el texto: "¡Perfil creado! Ahora puedes publicar tus ofertas de tutorías."
- (Opcional) Incluir un botón estilizado para "Ir a mi perfil" o "Publicar oferta", aunque sin funcionalidad por ahora.

Validaciones:
- N/A.

Diseño:
- La página debe tener un diseño limpio y centrado, transmitiendo éxito y finalización.
- Utilizar Tailwind CSS 4 para centrar el contenido, estilizar el texto y cualquier botón opcional.

Integración:
- Esta página es el destino de la redirección desde `actionFinalizarRegistro` (Tarea 16).

Criterios de Aceptación Técnica:
- **CA6:** La página `/registro-exitoso` se renderiza correctamente.
- **CA6:** La página muestra el mensaje "¡Perfil creado! Ahora puedes publicar tus ofertas de tutorías."
- La página tiene un diseño visual adecuado y legible.
---END_PROMPT---

---START_COMMIT--- HU42-T17 feat(frontend): implementar PantallaRegistroExitoso (CA6) ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 18 TASK_TITLE: Implementación de botones y lógica de navegación hacia atrás (CA7) HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Registro Tutor 3 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El tutor necesita poder navegar hacia atrás al Paso 2 del wizard (`Disponibilidad`) desde la página de Detalles Profesionales.
Objetivo: Implementar la funcionalidad de los botones '← Atrás Disponibilidad' y el link '2 Disponibilidad' para redirigir al Paso 2, asumiendo que el estado previo se mantendrá (CA7).

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/tutor/registro/detalles-profesionales/page.tsx` (para integrar los botones/links)
- `src/components/ui/boton-atras-disponibilidad/BotonAtrasDisponibilidad.tsx` (nuevo componente)
- (Opcional) `src/components/layout/progress-bar/ProgressBar.tsx` (si el link del paso está allí)

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, `next/navigation`.

Estructura:
- `src/components/ui/boton-atras-disponibilidad/BotonAtrasDisponibilidad.tsx` debe ser un Client Component (`'use client'`).
- Este componente debe renderizar un botón con el texto '← Atrás Disponibilidad'.
- En su handler `onClick`, utilizar `useRouter().push('/tutor/registro/disponibilidad')`.
- En `src/app/tutor/registro/detalles-profesionales/page.tsx`, integrar `BotonAtrasDisponibilidad`.
- Identificar el link o elemento en la barra de progreso que representa el '2 Disponibilidad' (si es un componente rehusable, asegurarse que acepte un `onClick` o `href`).
- Configurar el `onClick` o `href` del link '2 Disponibilidad' para que también use `useRouter().push('/tutor/registro/disponibilidad')`.

Validaciones:
- N/A.

Diseño:
- Estilizar el botón y el link de la barra de progreso con Tailwind CSS 4 para que sean clicables y visualmente coherentes.

Integración:
- `useRouter` de `next/navigation` es clave para la navegación.
- Se asume que el estado de disponibilidad en `/tutor/registro/disponibilidad` se carga y muestra correctamente al navegar hacia él (esta parte es responsabilidad de la `PaginaDisponibilidad` en el Paso 2).

Criterios de Aceptación Técnica:
- **CA7:** Al hacer clic en '← Atrás Disponibilidad' o en el paso '2 Disponibilidad' del menú superior, el sistema redirige a la URL `/tutor/registro/disponibilidad`.
- La navegación se realiza sin errores.
---END_PROMPT---

---START_COMMIT--- HU42-T18 feat(frontend): implementar navegacion hacia atras a disponibilidad (CA7) ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 19 TASK_TITLE: Integración con backend para `actionGuardarExperiencia` (descomentar fetch) HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Las Server Actions han estado utilizando seed data para facilitar el desarrollo del frontend. Ahora es el momento de conectarlas al backend real.
Objetivo: Activar la integración real con el backend para la Server Action `actionGuardarExperiencia`, descomentando el código `fetch` previamente escrito y eliminando el uso de seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/registro/guardarExperiencia.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
- Abrir `src/actions/registro/guardarExperiencia.ts`.
- Localizar la función `actionGuardarExperiencia`.
- **Comentar o eliminar** la línea que retorna el `seedData` o la simulación de guardado.
- **Descomentar** el bloque completo del `try-catch` que contiene la petición `fetch` al endpoint `POST /api/experiencias`.
- Asegurarse de que la URL del endpoint esté configurada correctamente (ej. `process.env.NEXT_PUBLIC_BACKEND_URL + '/api/experiencias'`).
- Verificar que los headers (especialmente `Content-Type: application/json`) y el cuerpo de la petición (`JSON.stringify(experienciaData)`) sean correctos.

Validaciones:
- Probar la funcionalidad de añadir experiencia end-to-end con el backend real para asegurar que los datos se persisten correctamente.

Diseño:
- N/A.

Integración:
- La Server Action ahora realizará una llamada HTTP real al backend.

Criterios de Aceptación Técnica:
- La petición `fetch` se ejecuta correctamente hacia el endpoint `POST /api/experiencias` del backend real.
- La respuesta del backend se procesa sin errores en el frontend.
- Una experiencia guardada se persiste correctamente en la base de datos del backend.
- No hay errores de red o del servidor visibles en la consola del navegador.
---END_PROMPT---

---START_COMMIT--- HU42-T19 feat(api): integrar actionGuardarExperiencia con backend real ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 20 TASK_TITLE: Integración con backend para `actionFinalizarRegistro` (descomentar fetch) HU_NUMBER: HU42 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La Server Action `actionFinalizarRegistro` también ha estado utilizando seed data. Es necesario conectarla al backend real.
Objetivo: Activar la integración real con el backend para la Server Action `actionFinalizarRegistro`, descomentando el código `fetch` y eliminando el uso de seed data.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/registro/finalizarRegistro.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura:
- Abrir `src/actions/registro/finalizarRegistro.ts`.
- Localizar la función `actionFinalizarRegistro`.
- **Comentar o eliminar** la línea que retorna el `seedData` o la simulación de guardado.
- **Descomentar** el bloque completo del `try-catch` que contiene la petición `fetch` al endpoint `POST /api/perfil/finalizar`.
- Asegurarse de que la URL del endpoint esté configurada correctamente (ej. `process.env.NEXT_PUBLIC_BACKEND_URL + '/api/perfil/finalizar'`).
- Confirmar que los headers y el cuerpo de la petición (`JSON.stringify(perfilData)`) sean correctos.

Validaciones:
- Probar la funcionalidad de finalizar registro end-to-end con el backend real para asegurar que el perfil profesional se persiste y la redirección ocurre correctamente.

Diseño:
- N/A.

Integración:
- La Server Action ahora realizará una llamada HTTP real al backend.

Criterios de Aceptación Técnica:
- La petición `fetch` se ejecuta correctamente hacia el endpoint `POST /api/perfil/finalizar` del backend real.
- La respuesta del backend se procesa sin errores en el frontend.
- El perfil profesional se persiste correctamente en la base de datos del backend.
- La redirección a `/registro-exitoso` ocurre tras una respuesta exitosa del backend.
---END_PROMPT---

---START_COMMIT--- HU42-T20 feat(api): integrar actionFinalizarRegistro con backend real ---END_COMMIT---
---END_TASK---