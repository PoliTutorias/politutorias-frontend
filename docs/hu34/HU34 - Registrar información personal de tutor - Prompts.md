---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Preparación de seeds para dropdowns y simulación de API HU_NUMBER: HU34 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La tarea consiste en preparar datos estáticos (seeds) que simulen las opciones para los dropdowns de 'Facultad' y 'Semestre Actual', así como una respuesta exitosa del API para el registro de datos básicos del tutor. Estos seeds son cruciales para un desarrollo frontend independiente antes de la integración real con el backend.

Objetivo: Crear los archivos de seed en `src/lib/seeds/` para `facultades.ts`, `semestres.ts`, y `tutor-registro-response.ts`.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/lib/seeds/facultades.ts`: Exportar un `readonly string[]` con ejemplos de facultades (ej. 'FIS - Sistemas', 'FCEC').
- `src/lib/seeds/semestres.ts`: Exportar un `readonly string[]` con ejemplos de semestres (ej. '1° Semestre', '2° Semestre', '4° Semestre').
- `src/lib/seeds/tutor-registro-response.ts`: Exportar un objeto que represente la `RespuestaExito` del endpoint `POST /api/tutor/datos-basicos`. La estructura debe incluir campos como `id`, `userId`, `nombreCompleto`, `numeroWhatsapp`, `facultad`, `semestreActual`, `biografiaCorta`, `createdAt`, `updatedAt`, con datos de ejemplo coherentes (ej. 'Daniela Castro').

Tecnologías: Next.js 16, TypeScript.

Estructura: Los seeds deben ser arrays de strings o interfaces y objetos bien definidos.

Validaciones: No aplica en esta tarea.

Diseño: No aplica en esta tarea.

Integración: Estos seeds serán utilizados por los componentes de UI y la Server Action para simular la lógica y la respuesta del backend durante el desarrollo.

Criterios de Aceptación Técnica:
- Los archivos `facultades.ts` y `semestres.ts` exportan arrays de strings que corresponden a los enums del DTO de NestJS.
- El archivo `tutor-registro-response.ts` exporta un objeto con la estructura `RespuestaExito` y datos de ejemplo válidos.
- Las estructuras de los seeds coinciden con los contratos esperados del backend. ---END_PROMPT---

---START_COMMIT--- HU34-T01 feat(seed): crear seeds para facultades, semestres y simulación API ---END_COMMIT---
---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Maquetación de la página `RegistrarTutorPage` y estructura del `FormularioDatosBasicos` HU_NUMBER: HU34 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Registro Tutor 1 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 3H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se necesita desarrollar la estructura principal de la página de registro del tutor y el componente de formulario inicial, basándose en el prototipo proporcionado. Esto incluye el layout general, los indicadores de los pasos del wizard y la disposición básica de los campos y el botón de navegación.

Objetivo: Crear la página `src/app/tutor/registro/page.tsx` como Server Component y el componente `src/components/tutor/formulario-datos-basicos/FormularioDatosBasicos.tsx` como Client Component, estableciendo la maquetación inicial con Tailwind CSS 4.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/tutor/registro/page.tsx`:
    - Componente de tipo Server Component.
    - Contendrá el título "Completa tu Perfil".
    - Mostrará los indicadores de paso del wizard: "1 Datos Básicos", "2 Disponibilidad", "3 Perfil Profesional".
    - El indicador "1 Datos Básicos" debe estar visualmente resaltado según el prototipo.
    - Incluirá el subtítulo y el componente `FormularioDatosBasicos`.
- `src/components/tutor/formulario-datos-basicos/FormularioDatosBasicos.tsx`:
    - Componente de tipo Client Component.
    - Contendrá la estructura básica de un formulario (`<form>`).
    - Añadir placeholders para los campos 'Nombre Completo', 'Número de WhatsApp', 'Facultad', 'Semestre Actual' y 'Biografía Corta'.
    - Incluir el botón "Siguiente Disponibilidad" con `type="submit"`.
    - Aplicar estilos iniciales con Tailwind CSS 4 para que la disposición se asemeje al `T. Registro Tutor 1 (Vacío)` frame.

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura: Seguir principios de Atomic Design para la página y el componente del formulario.

Validaciones: No aplica en esta tarea.

Diseño: La maquetación debe coincidir con el `T. Registro Tutor 1 (Vacío)` frame, prestando especial atención al resaltado del paso actual del wizard.

Integración: `FormularioDatosBasicos` se integrará en `RegistrarTutorPage`.

Criterios de Aceptación Técnica:
- La página `RegistrarTutorPage` renderiza el título, subtítulo y los indicadores de paso, con "1 Datos Básicos" visualmente resaltado (AC1).
- El componente `FormularioDatosBasicos` se renderiza dentro de la página con los placeholders y el botón de submit.
- La maquetación del formulario se asemeja al frame del prototipo. ---END_PROMPT---

---START_COMMIT--- HU34-T02 feat(ui): maquetar pagina de registro y formulario de datos basicos ---END_COMMIT---
---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Implementación de campos de entrada (`InputFieldNombre`, `InputFieldWhatsapp`, `TextareaBiografia`) con reglas de UI HU_NUMBER: HU34 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Registro Tutor 1 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 2.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Esta tarea se centra en implementar los campos de entrada de texto y el área de texto para el formulario de datos básicos del tutor, incorporando reglas de interacción de UI como el bloqueo de caracteres no permitidos y los contadores de caracteres con límites definidos.

Objetivo: Crear componentes reutilizables `InputField` y `Textarea` y luego utilizarlos en `FormularioDatosBasicos`, aplicando las lógicas de UI para `nombreCompleto`, `numeroWhatsapp` y `biografiaCorta`.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/shared/input-field/InputField.tsx`: (Client Component)
    - Componente genérico para campos de texto.
    - Props para `label`, `placeholder`, `type`, `maxLength`, `pattern` (para bloqueo de caracteres), `showCharCount`, `error`.
    - Lógica interna para manejar el contador de caracteres y bloquear la digitación/pegado de texto según `maxLength`.
    - Lógica para bloquear caracteres no permitidos (ej. usando `onKeyPress` o filtrando el valor `onChange`).
- `src/components/shared/textarea/Textarea.tsx`: (Client Component)
    - Componente genérico para áreas de texto.
    - Props para `label`, `placeholder`, `maxLength`, `showCharCount`, `error`.
    - Lógica interna para manejar el contador de caracteres y limitar la entrada de texto según `maxLength`.
- `src/components/tutor/formulario-datos-basicos/FormularioDatosBasicos.tsx`: (Client Component)
    - Integrar `InputField` para `nombreCompleto` y `numeroWhatsapp`.
    - Integrar `Textarea` para `biografiaCorta`.
    - Configurar las props de estos componentes según los siguientes requisitos:
        - `nombreCompleto` (usando `InputField`):
            - Lógica JavaScript para **bloquear la digitación de números y caracteres especiales** (AC5). Permitir solo letras y espacios.
            - **Contador de caracteres y limitación a 60 caracteres**, evitando digitación o pegado que exceda el límite (AC4).
        - `numeroWhatsapp` (usando `InputField`):
            - Configurar `type="tel"`.
            - Lógica JavaScript para **bloquear la digitación de letras y caracteres especiales**, permitiendo solo números (AC8).
        - `biografiaCorta` (usando `Textarea`):
            - **Contador de caracteres y limitación a 300 caracteres**, evitando digitación o pegado que exceda el límite (AC10).

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura: Componentes reutilizables siguiendo Atomic Design (`InputField`, `Textarea`) utilizados por `FormularioDatosBasicos`. Todos son Client Components.

Validaciones: Implementar las validaciones de UI de los ACs mencionados. Las validaciones de negocio (mínimo, obligatorio) se cubrirán en Tarea 5.

Diseño: Los campos deben reflejar el diseño del `T. Registro Tutor 1 (Vacío)` frame, incluyendo la visibilidad del contador de caracteres donde sea requerido.

Integración: Los componentes se auto-contienen las reglas de UI y se usan en el formulario principal.

Criterios de Aceptación Técnica:
- El campo `Nombre Completo` solo permite letras y espacios, y bloquea otros caracteres (AC5).
- El campo `Nombre Completo` limita la entrada a 60 caracteres y muestra un contador 'X/60' (AC4).
- El campo `Número de WhatsApp` solo permite números y bloquea letras/caracteres especiales (AC8).
- El campo `Biografía Corta` limita la entrada a 300 caracteres y muestra un contador 'X/300' (AC10). ---END_PROMPT---

---START_COMMIT--- HU34-T03 feat(ui): implementar campos de entrada con reglas de UI ---END_COMMIT---
---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Implementación de componentes Dropdown (`Facultad`, `Semestre Actual`) HU_NUMBER: HU34 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Registro Tutor 1 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se requiere implementar los dropdowns para seleccionar la `Facultad` y el `Semestre Actual` dentro del `FormularioDatosBasicos`, utilizando los datos estáticos (`seeds`) creados en la Tarea 1.

Objetivo: Crear un componente `Dropdown` reutilizable y luego integrarlo en `FormularioDatosBasicos` para los campos de `facultad` y `semestreActual`, poblando sus opciones desde los seeds correspondientes.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/shared/dropdown/Dropdown.tsx`: (Client Component)
    - Componente genérico para dropdowns (`<select>`).
    - Props para `label`, `options: string[]`, `defaultValue` (para la opción "Selecciona..."), `error`.
    - Renderizar una lista de opciones (`<option>`) a partir de `options`.
    - Incluir una opción por defecto seleccionable (ej. "Selecciona tu facultad", "Selecciona tu semestre").
- `src/components/tutor/formulario-datos-basicos/FormularioDatosBasicos.tsx`: (Client Component)
    - Integrar `Dropdown` para `facultad`.
    - Integrar `Dropdown` para `semestreActual`.
    - Importar y usar `FACULTADES_SEED` de `src/lib/seeds/facultades.ts` para las opciones de facultad.
    - Importar y usar `SEMESTRES_SEED` de `src/lib/seeds/semestres.ts` para las opciones de semestre.

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4.

Estructura: Componente reutilizable `Dropdown` siguiendo Atomic Design, utilizado por `FormularioDatosBasicos`. Ambos son Client Components.

Validaciones: No aplica en esta tarea, las validaciones de campos obligatorios se gestionarán en la Tarea 5.

Diseño: Los dropdowns deben seguir el diseño visual del `T. Registro Tutor 1 (Vacío)` frame.

Integración: Los componentes `Dropdown` se poblarán con datos de `src/lib/seeds/facultades.ts` y `src/lib/seeds/semestres.ts`.

Criterios de Aceptación Técnica:
- Los dropdowns `Facultad` y `Semestre Actual` se renderizan correctamente con sus respectivas opciones.
- Las opciones de los dropdowns provienen de los seeds de datos correspondientes.
- Ambos dropdowns tienen una opción por defecto seleccionable. ---END_PROMPT---

---START_COMMIT--- HU34-T04 feat(ui): implementar dropdowns de facultad y semestre ---END_COMMIT---
---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Configuración de validaciones del lado del cliente con React Hook Form/Zod HU_NUMBER: HU34 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Registro Tutor 1 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 2.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La tarea es integrar `react-hook-form` con `zod` para gestionar el estado del formulario y aplicar todas las validaciones del lado del cliente, mostrando mensajes de error en tiempo real debajo de cada campo afectado. Esto cubrirá la mayoría de los criterios de aceptación relacionados con la validación del formulario.

Objetivo: Configurar `FormularioDatosBasicos` para usar `react-hook-form` con `zodResolver`, definir un esquema Zod completo para todos los campos, y mostrar mensajes de error personalizados según los criterios de aceptación.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/lib/validations/tutor-basicos-schema.ts`:
    - Definir un `z.object` (Zod schema) para los campos `nombreCompleto`, `numeroWhatsapp`, `facultad`, `semestreActual` y `biografiaCorta`.
    - Incluir las siguientes validaciones y sus mensajes de error personalizados:
        - `nombreCompleto`:
            - `required`: 'El nombre es obligatorio' (AC2)
            - `min(3)`: 'Mínimo 3 caracteres' (AC3)
            - `max(60)`: 'Máximo 60 caracteres' (AC4 ya cubierto por UI, pero reforzar en schema)
            - `regex(/^[a-zA-Z\s]*$/)`: 'Solo letras y espacios' (AC5 ya cubierto por UI, pero reforzar en schema)
        - `numeroWhatsapp`:
            - `required`: 'El número de WhatsApp es obligatorio' (AC2)
            - `regex(/^\d+$/)`: 'Solo números' (AC8 ya cubierto por UI, pero reforzar)
            - `min(10)`: 'Ingresa un número válido (10-13 dígitos)' (AC6)
            - `max(13)`: 'Ingresa un número válido (10-13 dígitos)' (AC7)
        - `facultad`:
            - `required`: 'Selecciona tu facultad' (AC2)
            - `not("Selecciona tu facultad")`: 'Selecciona tu facultad' (para el valor por defecto del dropdown)
        - `semestreActual`:
            - `required`: 'Selecciona tu semestre' (AC2)
            - `not("Selecciona tu semestre")`: 'Selecciona tu semestre' (para el valor por defecto del dropdown)
        - `biografiaCorta`:
            - `required`: 'La biografía es obligatoria' (AC2)
            - `min(20)`: 'Mínimo 20 caracteres' (AC9)
            - `max(300)`: 'Máximo 300 caracteres' (AC10 ya cubierto por UI, pero reforzar)
- `src/components/tutor/formulario-datos-basicos/FormularioDatosBasicos.tsx`: (Client Component)
    - Instalar `@hookform/resolvers` y `zod`.
    - Importar `useForm` de `react-hook-form` y el `zodResolver`.
    - Inicializar `useForm` con el esquema Zod (`tutorBasicosSchema`) y configurar el modo de validación (ej. `mode: 'onBlur'` o `mode: 'onChange'`).
    - Conectar cada campo de los componentes `InputField`, `Textarea` y `Dropdown` con la función `register` de `react-hook-form`.
    - Mostrar los mensajes de error (`errors.<fieldName>?.message`) debajo de cada campo correspondiente cuando la validación falle (AC2, AC3, AC6, AC7, AC9). Los mensajes deben ser en rojo.

Tecnologías: Next.js 16, React, TypeScript, Tailwind CSS 4, React Hook Form, Zod, @hookform/resolvers, clsx (para aplicar estilos condicionales de error).

Estructura: `FormularioDatosBasicos` es un Client Component que utiliza el esquema Zod para la validación.

Validaciones: Implementar todas las validaciones de los criterios de aceptación desde AC2 hasta AC10. Los mensajes de error deben ser específicos y claros.

Diseño: Los mensajes de error deben aparecer en rojo, debajo de cada campo afectado, siguiendo el diseño general del `T. Registro Tutor 1 (Vacío)` frame.

Integración: `useForm`, `zodResolver`, `register`, `formState.errors`.

Criterios de Aceptación Técnica:
- Todos los campos del formulario tienen validaciones `zod` conectadas (AC2, AC3, AC4, AC5, AC6, AC7, AC8, AC9, AC10).
- Los mensajes de error personalizados aparecen debajo de los campos cuando fallan las validaciones.
- El formulario previene el envío si hay errores de validación del lado del cliente.
- El sistema muestra los mensajes de error especificados en los criterios de aceptación para validaciones vacías, de longitud y formato (AC2, AC3, AC6, AC7, AC9). ---END_PROMPT---

---START_COMMIT--- HU34-T05 feat(validation): configurar validaciones con react-hook-form y zod ---END_COMMIT---
---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Implementación de `registrarDatosBasicosAction` (Server Action) con seed data y validaciones iniciales HU_NUMBER: HU34 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 2.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se debe implementar una Next.js Server Action (`registrarDatosBasicosAction`) que reciba los datos del formulario del lado del cliente. Esta acción realizará validaciones iniciales, simulará una respuesta exitosa del backend utilizando datos semilla, y contendrá el bloque de código para la integración real con el backend (comentado).

Objetivo: Crear el archivo `src/actions/tutor/registrarDatosBasicosAction.ts` como una Server Action. Implementar la extracción y limpieza de datos, realizar validaciones básicas, retornar `seedData` en caso de éxito simulado, o errores en caso de fallo de validación, y añadir el código `fetch` comentado para la integración futura con el backend real.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/tutor/registrarDatosBasicosAction.ts`:
    - Marcar con `'use server'` en la parte superior.
    - Definir la función asíncrona `registrarDatosBasicosAction(formData: FormData)`.
    - Extraer y limpiar los datos de los campos `nombreCompleto`, `numeroWhatsapp`, `facultad`, `semestreActual` y `biografiaCorta` del `formData`.
    - Implementar validaciones iniciales (de presencia, longitud mínima/máxima y formato) para todos los campos (AC2, AC3, AC4, AC5, AC6, AC7, AC8, AC9, AC10). Estas validaciones deben ser similares o las mismas que las de Zod.
    - Si las validaciones internas fallan, retornar un objeto con `{ success: false, message: 'Errores de validación', errors: { [fieldName]: 'mensaje de error' } }` (estructura compatible con React Hook Form `setError`).
    - Si las validaciones internas son exitosas (fase de desarrollo):
        - Importar `TUTOR_REGISTRO_RESPONSE_SEED` de `src/lib/seeds/tutor-registro-response.ts`.
        - Retornar `{ success: true, message: 'Datos simulados guardados con éxito', data: TUTOR_REGISTRO_RESPONSE_SEED }`.
    - **Escribir y COMENTAR el bloque completo de código para la petición `fetch` al endpoint `POST /api/tutor/datos-basicos` del backend real.**
        - Incluir `method: 'POST'`, `headers` (`Content-Type: application/json`, `Authorization` si aplica).
        - Incluir `body` con `JSON.stringify` de los datos validados.
        - Manejar la respuesta `response.ok` y `result = await response.json()`.
        - Implementar el manejo de errores de la API (`result.message` o `result.errors` si el backend los retorna).
        - En caso de éxito de la API real, la Server Action debería usar `redirect('/tutor/disponibilidad')`.

Tecnologías: Next.js 16 (Server Actions), TypeScript.

Estructura: Una función Server Action.

Validaciones: Las validaciones se ejecutan en el servidor para un feedback rápido antes de la integración con el backend.

Diseño: No aplica en esta tarea.

Integración: Utiliza `src/lib/seeds/tutor-registro-response.ts` para la simulación. Prepara el código para `fetch` a una URL de backend (ej. `process.env.NEXT_PUBLIC_BACKEND_URL`).

Criterios de Aceptación Técnica:
- El archivo `src/actions/tutor/registrarDatosBasicosAction.ts` está marcado con `'use server'`.
- La función `registrarDatosBasicosAction` extrae y limpia correctamente los datos del `FormData`.
- Las validaciones iniciales de la Server Action se ejecutan correctamente y retornan un objeto de `errors` si fallan (similar a la estructura del `zodResolver`).
- Si las validaciones internas son exitosas, la Server Action retorna el `seedData` de la respuesta exitosa.
- El código `fetch` para la integración con el backend está presente pero completamente comentado. ---END_PROMPT---

---START_COMMIT--- HU34-T06 feat(server-action): implementar action registrarDatosBasicos con seeds y validaciones ---END_COMMIT---
---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Manejo de la respuesta del Server Action y lógica de redirección/error HU_NUMBER: HU34 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Registro Tutor 1 (Vacío) ---END_FRAME---

---START_ESTIMATION--- 2H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Una vez implementada la `registrarDatosBasicosAction`, es necesario integrar el `FormularioDatosBasicos` para que interactúe con ella. Esto implica manejar las respuestas de la Server Action: mostrar errores de validación si los hay o redirigir al usuario a la siguiente página del wizard en caso de un envío exitoso.

Objetivo: Conectar el `onSubmit` del `FormularioDatosBasicos` con la `registrarDatosBasicosAction`. Gestionar la respuesta de la Server Action para actualizar los errores del formulario usando `setError` de React Hook Form o, en caso de éxito, verificar que la redirección funcione (AC1).

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/tutor/formulario-datos-basicos/FormularioDatosBasicos.tsx`: (Client Component)
    - Importar la `registrarDatosBasicosAction` de `src/actions/tutor/registrarDatosBasicosAction.ts`.
    - Modificar la función `onSubmit` del formulario:
        - Convertir los datos validados por Zod/React Hook Form a `FormData` para pasarlos a la Server Action.
        - Llamar a `registrarDatosBasicosAction` con los datos del formulario.
        - Manejar la respuesta (`result`) de la `Server Action`:
            - Si `result.success` es `false` y `result.errors` existe, iterar sobre `result.errors` y usar `setError(fieldName, { message: errorMessage })` para mostrar los errores en los campos correspondientes del formulario. Asegurar que los mensajes de error se muestren debajo de los campos afectados (AC2, AC3, AC6, AC7, AC9).
            - Si `result.success` es `true`, la Server Action ya habrá manejado la redirección (en la implementación final) o se simula aquí, si fuera necesario, para el testeo. Para esta tarea, verificar que el flujo de éxito lleve a la siguiente pantalla (AC1). No es necesario una redirección explícita en el cliente si la Server Action la realiza.

Tecnologías: Next.js 16, React, TypeScript, React Hook Form (`handleSubmit`, `setError`), Next.js Server Actions.

Estructura: Client Component `FormularioDatosBasicos` que interactúa con una Server Action.

Validaciones: Propagar los errores de validación de la Server Action de vuelta al formulario del cliente.

Diseño: Los mensajes de error de la Server Action deben presentarse de la misma manera que los errores de validación del lado del cliente. El formulario debe permanecer visible con los errores cuando el envío no es exitoso.

Integración: `FormularioDatosBasicos` invoca `registrarDatosBasicosAction`.

Criterios de Aceptación Técnica:
- Al enviar el formulario con datos inválidos, los errores retornados por `registrarDatosBasicosAction` se muestran correctamente debajo de los campos correspondientes.
- El formulario permanece en la pantalla cuando hay errores de validación.
- Al enviar el formulario con datos válidos (simulado por el seed de la Server Action), el sistema simula la redirección a la página `/tutor/disponibilidad` (AC1).
- El título, subtítulo y el resaltado de "2 Disponibilidad" se muestran en la página de destino (AC1, esto se verificará visualmente). ---END_PROMPT---

---START_COMMIT--- HU34-T07 feat(form): manejar respuesta de server action y redireccion ---END_COMMIT---
---START_TASK--- TASK_NUMBER: 8 TASK_TITLE: Integración final de `registrarDatosBasicosAction` con el backend real HU_NUMBER: HU34 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1H ---END_ESTIMATION---

---START_PROMPT--- Contexto: La última tarea es completar la integración del frontend con el backend real. Esto implica descomentar el bloque de código `fetch` en la `registrarDatosBasicosAction` que previamente estaba en modo simulación (Tarea 6) y eliminar la lógica de retorno del seed data.

Objetivo: Modificar la `registrarDatosBasicosAction` para que realice una petición `POST` real al endpoint de NestJS `/api/tutor/datos-basicos`, maneje la respuesta real del backend (éxito o error), y elimine cualquier referencia al seed data o la lógica de simulación.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/tutor/registrarDatosBasicosAction.ts`:
    - Localizar el bloque de código `fetch` que fue escrito y comentado en la Tarea 6.
    - **Descomentar este bloque completo de código.**
    - Eliminar o comentar la línea que retorna el `seedData` (ej. `return { success: true, message: 'Datos simulados guardados con éxito', data: seedData };`).
    - Asegurarse de que la URL del endpoint esté configurada correctamente utilizando `process.env.NEXT_PUBLIC_BACKEND_URL + '/api/tutor/datos-basicos'`.
    - Verificar que los `headers` (especialmente `Content-Type: application/json` y `Authorization` si aplica) sean correctos.
    - Confirmar que el manejo de `response.ok` y los errores de la API (`result.message` o `result.errors`) estén correctamente implementados para propagar cualquier error del backend al cliente (similar a la Tarea 7).
    - En caso de éxito (`response.ok` es true), la Server Action debe usar `redirect('/tutor/disponibilidad')` para navegar a la siguiente página del wizard (AC1).

Tecnologías: Next.js 16 (Server Actions), TypeScript, `fetch` API, `process.env`.

Estructura: Server Action que se comunica directamente con el backend.

Validaciones: La Server Action ahora confiará en las validaciones del backend para la lógica de negocio final, pero seguirá haciendo validaciones rápidas previas para reducir el tráfico innecesario. Los errores del backend deben ser capturados y formateados para su visualización en el cliente.

Diseño: No aplica en esta tarea.

Integración: Conexión directa con el backend NestJS.

Criterios de Aceptación Técnica:
- La `registrarDatosBasicosAction` realiza una petición `POST` exitosa al endpoint `/api/tutor/datos-basicos` del backend.
- La `registrarDatosBasicosAction` ya no retorna el seed data, sino que procesa la respuesta del backend real.
- La redirección a `/tutor/disponibilidad` se produce tras una respuesta exitosa del backend.
- Los errores de validación o del servidor (si el backend los retorna) son manejados y mostrados correctamente en el `FormularioDatosBasicos`.
- No hay errores de red (CORS, conexión) al comunicarse con el backend. ---END_PROMPT---

---START_COMMIT--- HU34-T08 chore(backend): integrar registrarDatosBasicosAction con backend real ---END_COMMIT---