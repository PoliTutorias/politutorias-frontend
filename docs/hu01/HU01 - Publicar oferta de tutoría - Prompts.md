---START_TASK--- TASK_NUMBER: 1 TASK_TITLE: Creación de seed para datos de oferta (OfertaEntity). HU_NUMBER: HU01 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Necesitamos datos simulados para el desarrollo frontend de la publicación de ofertas de tutoría. Este seed servirá como mock de la respuesta del backend. Objetivo: Crear un archivo de seed en TypeScript que defina la interfaz `OfertaEntity` y exporte una función que retorne un array de ofertas de ejemplo con una estructura consistente.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/seed/OfertaSeedData.ts`

Tecnologías: Next.js 16, TypeScript.

Estructura: Definir la interfaz `OfertaEntity` que represente la estructura de una oferta (ej. `id`, `title`, `price`, `modality`, `categories`, `description`, `tutorId`, `createdAt`, `updatedAt`, `status`). Crear una función `getOfertaSeed(): OfertaEntity[]` que retorne un array con al menos 3-5 ofertas de ejemplo válidas, cubriendo diferentes escenarios (ej. con todas las categorías, con pocas, precios variados).

Validaciones: N/A para el seed en sí, pero la estructura de los datos de ejemplo debe ser válida según la `OfertaEntity`.

Diseño: N/A

Integración: N/A, es solo para mock data.

Criterios de Aceptación Técnica:
- El seed contiene al menos 3 ofertas de ejemplo válidas.
- La estructura de cada oferta en el seed coincide exactamente con la `OfertaEntity` esperada del backend.
- La función `getOfertaSeed()` está correctamente exportada y retorna los datos. ---END_PROMPT---

---START_COMMIT--- HU01-T01 feat(seed): crear seed data para ofertas de tutoría ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 2 TASK_TITLE: Implementación del componente NuevaOfertaModal. HU_NUMBER: HU01 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Crear Oferta de Tutoría ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Necesitamos un componente modal reusable que sirva como contenedor para el formulario de creación de ofertas. Debe manejar su propia visibilidad y un mecanismo de cierre. Objetivo: Desarrollar el componente `NuevaOfertaModal` con funcionalidad de apertura/cierre y un botón 'X' para cerrar.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/components/ui/NuevaOfertaModal/NuevaOfertaModal.tsx`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React.

Estructura: Componente de React (Client Component) que acepte `isOpen: boolean` y `onClose: () => void` como props. Debe renderizar un overlay semitransparente que ocupe toda la pantalla y un contenedor modal centrado. Incluir un botón 'X' en la esquina superior derecha del modal que llame a `onClose` al hacer clic.

Validaciones: N/A.

Diseño: Inspirado en el frame `T. Crear Oferta de Tutoría`. Utilizar Tailwind CSS 4 para el estilizado del overlay y el modal, asegurando un diseño responsivo.

Integración: Se integrará en `DashboardPage` y contendrá el `OfertaForm`.

Criterios de Aceptación Técnica:
- El modal se abre y cierra correctamente según la prop `isOpen`.
- El botón 'X' cierra el modal al hacer clic.
- El modal se renderiza sobre el contenido de la página. ---END_PROMPT---

---START_COMMIT--- HU01-T02 feat(ui): implementar componente NuevaOfertaModal ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 3 TASK_TITLE: Estructura y maquetación del OfertaForm (campos básicos). HU_NUMBER: HU01 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Crear Oferta de Tutoría ---END_FRAME---

---START_ESTIMATION--- 2.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se requiere la interfaz principal para que los tutores puedan introducir la información de su oferta de tutoría. Objetivo: Implementar la estructura visual inicial del formulario `OfertaForm` con sus campos básicos ('Título de la Oferta', 'Precio por Hora ($)', 'Modalidad', 'Descripción de la Oferta'), siguiendo el diseño de los prototipos de Figma.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/forms/OfertaForm/OfertaForm.tsx`
- `src/components/forms/OfertaForm/InputTituloOferta.tsx` (Componente atómico para el input del título)
- `src/components/forms/OfertaForm/InputPrecioHora.tsx` (Componente atómico para el input del precio)
- `src/components/forms/OfertaForm/SelectModalidad.tsx` (Componente atómico para el selector de modalidad, usando radios o un select simple)
- `src/components/forms/OfertaForm/TextareaDescripcionOferta.tsx` (Componente atómico para el textarea de descripción)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React.

Estructura: `OfertaForm` debe ser un Client Component que contenga los subcomponentes atómicos para cada campo. Cada subcomponente debe incluir su `<label>` asociado. `InputTituloOferta` será de tipo texto. `InputPrecioHora` de tipo numérico. `SelectModalidad` debe ofrecer "Presencial" y "Virtual". `TextareaDescripcionOferta` será un área de texto multilinea.

Validaciones: Solo placeholders visuales para la futura integración con React Hook Form/Zod. Los campos deben ser interactivos.

Diseño: Alineado con el frame "T. Crear Oferta de Tutoría". Aplicar estilos con Tailwind CSS 4 para la maquetación, espaciado, tipografía y elementos de formulario.

Integración: Será un componente hijo de `NuevaOfertaModal`.

Criterios de Aceptación Técnica:
- El formulario se renderiza con todos los campos básicos: Título, Precio, Modalidad, Descripción.
- El diseño se alinea con el frame "T. Crear Oferta de Tutoría".
- Los campos son interactivos y permiten la entrada de datos. ---END_PROMPT---

---START_COMMIT--- HU01-T03 feat(form): estructurar y maquetar OfertaForm con campos basicos ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 4 TASK_TITLE: Desarrollo del componente CategorySelector. HU_NUMBER: HU01 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Crear Oferta de Tutoría (Categorías Seleccionadas) ---END_FRAME---

---START_ESTIMATION--- 2.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Se necesita un selector de categorías flexible que permita al tutor elegir múltiples materias relacionadas con su oferta, con una visualización clara de las seleccionadas y preparación para un límite de 5. Objetivo: Desarrollar un componente `CategorySelector` que permita la selección múltiple de categorías para la oferta, incluyendo su visualización y manejo de estado.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/forms/CategorySelector/CategorySelector.tsx`
- `src/interfaces/oferta/Category.ts` (para la estructura de la categoría, ej. `{ id: string; name: string; }`)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React.

Estructura: Componente de React (Client Component). Debe aceptar props como `selectedCategories: string[]`, `onSelectCategory: (category: string) => void`, y `availableCategories: Category[]`. La interfaz de selección puede ser un dropdown que liste las categorías disponibles o una serie de elementos interactivos (ej. badges/checkboxes). Las categorías seleccionadas deben mostrarse como "chips" o "badges" dentro del mismo componente.

Validaciones: El componente debe prepararse para la lógica de limitar la selección a 5 categorías (la lógica de limitación será implementada en T11).

Diseño: Consistente con el frame "T. Crear Oferta de Tutoría (Categorías Seleccionadas)". Estilizar el selector y las categorías seleccionadas utilizando Tailwind CSS 4, incluyendo estados de interacción (hover, selected).

Integración: Será un subcomponente de `OfertaForm`.

Criterios de Aceptación Técnica:
- El componente permite seleccionar múltiples categorías.
- Las categorías seleccionadas se muestran visiblemente.
- El diseño del selector es consistente con el frame "T. Crear Oferta de Tutoría (Categorías Seleccionadas)". ---END_PROMPT---

---START_COMMIT--- HU01-T04 feat(form): desarrollar componente CategorySelector ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 5 TASK_TITLE: Implementación de botones de acción: Publicar, Cancelar y 'X' de cierre. HU_NUMBER: HU01 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Crear Oferta de Tutoría ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El formulario de oferta necesita botones claros para que el tutor pueda enviar su oferta o cancelar la acción. El modal también requiere un botón de cierre. Objetivo: Implementar los botones de acción para el formulario: "Publicar Oferta", "Cancelar" y el botón 'X' de cierre del modal, con sus respectivos estados y funcionalidades básicas.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/ui/buttons/PrimaryButton.tsx` (Componente reutilizable para el botón "Publicar Oferta")
- `src/components/ui/buttons/SecondaryButton.tsx` (Componente reutilizable para el botón "Cancelar")
- `src/components/forms/OfertaForm/OfertaForm.tsx` (para integrar los botones "Publicar" y "Cancelar")
- `src/components/ui/NuevaOfertaModal/NuevaOfertaModal.tsx` (para el botón 'X' de cierre)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React.

Estructura: Los botones `PrimaryButton` y `SecondaryButton` deben ser Client Components y aceptar props como `onClick: () => void`, `isLoading: boolean` (para `PrimaryButton`) y `disabled: boolean`. `PrimaryButton` se usará para "Publicar Oferta" y debe tener un estado de carga. `SecondaryButton` para "Cancelar". El botón 'X' en `NuevaOfertaModal` debe invocar su prop `onClose`.

Validaciones: N/A.

Diseño: Estilizar los botones según el prototipo "T. Crear Oferta de Tutoría" usando Tailwind CSS 4. Definir estilos para estados `normal`, `hover`, `focus` y `disabled`. El botón de "Publicar Oferta" debe tener un estilo principal y el de "Cancelar" un estilo secundario.

Integración: Los botones "Publicar Oferta" y "Cancelar" se colocarán en el pie del `OfertaForm`. El botón 'X' ya debe estar implementado en `NuevaOfertaModal` (desde Tarea 2).

Criterios de Aceptación Técnica:
- Los botones "Publicar Oferta" y "Cancelar" se muestran en el `OfertaForm`.
- El botón "Publicar Oferta" puede mostrar un estado de carga.
- El botón "Cancelar" tiene una funcionalidad básica para cerrar el modal (sin lógica de guardado).
- El botón 'X' de cierre en `NuevaOfertaModal` cierra el modal al hacer clic. ---END_PROMPT---

---START_COMMIT--- HU01-T05 feat(ui): implementar botones Publicar, Cancelar y cierre de modal ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 6 TASK_TITLE: Implementación del componente ValidationMessages para errores de formulario. HU_NUMBER: HU01 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- T. Crear Oferta de Tutoría (Errores) ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Cuando un usuario ingresa datos incorrectos, es crucial mostrar mensajes de error claros y estilizados debajo de cada campo afectado. Objetivo: Crear un componente reutilizable `ValidationMessage` que se encargue de mostrar los mensajes de error asociados a los campos del formulario, con el estilo y la ubicación definidos en los prototipos.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/ui/ValidationMessage/ValidationMessage.tsx`
- `src/components/forms/OfertaForm/OfertaForm.tsx` (para preparar la integración)
- Modificar los componentes de input/textarea (ej. `InputTituloOferta.tsx`, `InputPrecioHora.tsx`, `TextareaDescripcionOferta.tsx`, `CategorySelector.tsx`, `SelectModalidad.tsx`) para recibir un prop `error?: string` y aplicar borde rojo si está presente.

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React.

Estructura: Componente de React (Client Component) que acepte un prop `message: string | undefined`. Solo debe renderizarse si `message` es una cadena no vacía.

Validaciones: N/A para el componente en sí, pero su propósito es mostrar errores de validación.

Diseño: El mensaje debe ser de texto pequeño, de color rojo, y con un espaciado adecuado, como se muestra en el frame "T. Crear Oferta de Tutoría (Errores)". Los campos de entrada (`input`, `textarea`, `select`, etc.) que tengan un error asociado deben mostrar un borde rojo para indicar el problema. Utilizar clases de Tailwind CSS 4.

Integración: El `OfertaForm` deberá pasar los mensajes de error (provenientes de React Hook Form) a los componentes de entrada correspondientes, los cuales a su vez renderizarán `ValidationMessage` debajo de sí mismos.

Criterios de Aceptación Técnica:
- El componente `ValidationMessage` muestra un mensaje de error con los estilos correctos.
- Cuando hay un error de validación, el campo correspondiente muestra un borde rojo y el mensaje de error aparece debajo. ---END_PROMPT---

---START_COMMIT--- HU01-T06 feat(ui): implementar componente ValidationMessage para errores ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 7 TASK_TITLE: Implementación del componente SuccessToast para notificación de éxito. HU_NUMBER: HU01 ---END_HEADER---

---START_TOOL--- builder.io ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Después de una acción exitosa, como la publicación de una oferta, es importante proporcionar una retroalimentación no intrusiva al usuario. Objetivo: Desarrollar un componente `SuccessToast` que se utilizará para mostrar una notificación efímera al usuario cuando la oferta se haya publicado exitosamente.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/components/ui/Toast/Toast.tsx`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React.

Estructura: Componente de React (Client Component) que acepte props como `message: string`, `isVisible: boolean`, `onClose: () => void` y `duration?: number` (tiempo en milisegundos para que se oculte automáticamente). El toast debe posicionarse de forma fija en una esquina de la pantalla (ej. superior derecha o inferior), aparecer con una animación suave y desaparecer automáticamente.

Validaciones: N/A.

Diseño: Estilizar el toast para que tenga un aspecto de éxito: fondo verde claro, texto oscuro o blanco, y posiblemente un icono de "check" o "éxito". Utilizar transiciones de Tailwind CSS 4 para la animación de entrada y salida.

Integración: La `DashboardPage` (o un contexto global) deberá ser capaz de activar la visibilidad y pasar el mensaje a este toast.

Criterios de Aceptación Técnica:
- El `SuccessToast` aparece y desaparece automáticamente después de un tiempo definido.
- El toast muestra un mensaje de éxito claro al usuario.
- El diseño es discreto y no interrumpe la interacción. ---END_PROMPT---

---START_COMMIT--- HU01-T07 feat(ui): implementar componente SuccessToast para notificaciones ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 8 TASK_TITLE: Configuración de React Hook Form y esquema Zod para OfertaForm. HU_NUMBER: HU01 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Crear Oferta de Tutoría (Errores) ---END_FRAME---

---START_ESTIMATION--- 2.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Para manejar eficientemente el estado del formulario, la validación y los mensajes de error, se integrará `React Hook Form` con un esquema `Zod`. Objetivo: Integrar `React Hook Form` en `OfertaForm` y crear un esquema de validación con `Zod` que cubra todas las reglas de validación definidas en los criterios de aceptación para los campos principales.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `package.json` (instalar `react-hook-form`, `zod`, `@hookform/resolvers`)
- `src/lib/validations/ofertaSchema.ts`
- `src/components/forms/OfertaForm/OfertaForm.tsx`
- `src/components/forms/OfertaForm/InputTituloOferta.tsx` (para registrar el campo y mostrar error)
- `src/components/forms/OfertaForm/InputPrecioHora.tsx` (para registrar el campo y mostrar error)
- `src/components/forms/OfertaForm/SelectModalidad.tsx` (para registrar el campo y mostrar error)
- `src/components/forms/OfertaForm/TextareaDescripcionOferta.tsx` (para registrar el campo y mostrar error)
- `src/components/forms/CategorySelector/CategorySelector.tsx` (para integrar con RHF y Zod)
- `src/components/ui/ValidationMessage/ValidationMessage.tsx` (ya existente, para usar los mensajes de error)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React Hook Form, Zod.

Estructura: `OfertaForm` debe ser un Client Component. Utilizar `useForm` de `react-hook-form` con `zodResolver`. El esquema Zod (`ofertaSchema.ts`) debe definir validaciones para:
- `title`: string, requerido (`'Escribe el título de la materia'`), min 3 (`'Mínimo 3 caracteres'`), max 80.
- `price`: number, requerido (`'Ingresa un precio'`), mayor que 0.
- `modality`: string, requerido.
- `categories`: array de strings, requerido (`'Selecciona al menos una categoría'`), mínimo 1, máximo 5.
- `description`: string, requerido (`'Agrega una descripción'`), min 20 (`'Mínimo 20 caracteres'`), max 250.

Validaciones: Todas las reglas especificadas en los criterios de aceptación para cada campo. Los mensajes de error de Zod deben coincidir exactamente con los mensajes esperados.

Diseño: Los campos inválidos deben mostrar un borde rojo (mediante clases de Tailwind CSS 4) y el mensaje de error correspondiente (usando `ValidationMessage`) debe aparecer debajo del campo, como se muestra en el frame "T. Crear Oferta de Tutoría (Errores)".

Integración: Conectar todos los campos del formulario con `register` de `react-hook-form` y gestionar los errores con `formState.errors`.

Criterios de Aceptación Técnica:
- Todas las validaciones de `Zod` para los campos están implementadas con los mensajes de error correctos.
- `OfertaForm` muestra los mensajes de error de validación correctos cuando los campos no cumplen las reglas.
- Los campos inválidos muestran un borde rojo.
- La sumisión del formulario se bloquea si hay errores de validación. ---END_PROMPT---

---START_COMMIT--- HU01-T08 feat(form): configurar React Hook Form y Zod para OfertaForm ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 9 TASK_TITLE: Implementación de contadores de caracteres y truncado en InputTituloOferta. HU_NUMBER: HU01 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Crear Oferta de Tutoría ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El campo de título tiene un límite de 80 caracteres. Es necesario guiar al usuario con un contador y evitar que exceda este límite. Objetivo: Implementar la lógica en `InputTituloOferta` para mostrar un contador de caracteres en tiempo real (`X/80`) y truncar el texto si excede el límite de 80 caracteres, impidiendo que el usuario escriba más.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/components/forms/OfertaForm/InputTituloOferta.tsx`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React.

Estructura: Modificar `InputTituloOferta` (Client Component). Deberá gestionar internamente el estado del valor del input para controlar la longitud. El `onChange` del input debe validar la longitud, truncar el valor a 80 caracteres si es necesario, y actualizar el contador. Mostrar el contador visual (`currentLength/80`) debajo del campo de título.

Validaciones: Límite de 80 caracteres para el título, incluyendo el truncado y la prevención de entrada de más caracteres.

Diseño: El contador de caracteres debe ser discreto y estilizado con Tailwind CSS 4, ubicado debajo del campo de entrada. Debe mostrar "80/80" cuando se alcanza el límite.

Integración: `InputTituloOferta` ya es un subcomponente de `OfertaForm` y debe interactuar correctamente con `react-hook-form` y `zodResolver` (Tarea 8). El valor truncado debe ser el valor final que recibe el formulario.

Criterios de Aceptación Técnica:
- El contador de caracteres del título se actualiza en tiempo real.
- El texto del título se trunca a 80 caracteres y no permite más entrada.
- El contador visual muestra "80/80" cuando se alcanza el límite. ---END_PROMPT---

---START_COMMIT--- HU01-T09 feat(form): implementar contador y truncado en InputTituloOferta ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 10 TASK_TITLE: Implementación de contadores de caracteres y truncado en TextareaDescripcionOferta. HU_NUMBER: HU01 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Crear Oferta de Tutoría ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El campo de descripción tiene un límite de 250 caracteres. Es necesario guiar al usuario con un contador y evitar que exceda este límite. Objetivo: Implementar la lógica en `TextareaDescripcionOferta` para mostrar un contador de caracteres en tiempo real (`X/250`) y truncar el texto si excede el límite de 250 caracteres, impidiendo que el usuario escriba más.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/components/forms/OfertaForm/TextareaDescripcionOferta.tsx`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React.

Estructura: Modificar `TextareaDescripcionOferta` (Client Component). Deberá gestionar internamente el estado del valor del textarea para controlar la longitud. El `onChange` del textarea debe validar la longitud, truncar el valor a 250 caracteres si es necesario, y actualizar el contador. Mostrar el contador visual (`currentLength/250`) debajo del campo de descripción.

Validaciones: Límite de 250 caracteres para la descripción, incluyendo el truncado y la prevención de entrada de más caracteres.

Diseño: El contador de caracteres debe ser discreto y estilizado con Tailwind CSS 4, ubicado debajo del campo de entrada. Debe mostrar "250/250" cuando se alcanza el límite.

Integración: `TextareaDescripcionOferta` ya es un subcomponente de `OfertaForm` y debe interactuar correctamente con `react-hook-form` y `zodResolver` (Tarea 8). El valor truncado debe ser el valor final que recibe el formulario.

Criterios de Aceptación Técnica:
- El contador de caracteres de la descripción se actualiza en tiempo real.
- El texto de la descripción se trunca a 250 caracteres y no permite más entrada.
- El contador visual muestra "250/250" cuando se alcanza el límite. ---END_PROMPT---

---START_COMMIT--- HU01-T10 feat(form): implementar contador y truncado en TextareaDescripcionOferta ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 11 TASK_TITLE: Implementación de lógica para el límite de 5 categorías en CategorySelector. HU_NUMBER: HU01 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Crear Oferta de Tutoría (Categorías Seleccionadas) ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Para mantener la coherencia y evitar abusos, el `CategorySelector` debe limitar la selección a un máximo de 5 categorías. Objetivo: Añadir la lógica al `CategorySelector` para que el usuario no pueda seleccionar más de 5 categorías, mostrando un contador visual (`X/5`) y deshabilitando la selección de categorías adicionales una vez alcanzado el límite.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/components/forms/CategorySelector/CategorySelector.tsx`

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React.

Estructura: Modificar `CategorySelector` (Client Component). La función `onSelectCategory` (o la lógica interna de selección) debe verificar el número de categorías seleccionadas. Si se llega al límite de 5, cualquier intento de seleccionar una sexta categoría debe ser ignorado. Las categorías no seleccionadas deben deshabilitarse visualmente (ej. cambiando su estilo, añadiendo un `disabled` si son inputs, o grey-out). Incluir un contador visual (`selectedCount/5`) dentro o cerca del selector.

Validaciones: Límite de 5 categorías seleccionadas.

Diseño: El contador (`selectedCount/5`) debe mostrarse claramente, utilizando estilos de Tailwind CSS 4. Las categorías no seleccionadas deben mostrarse con un estilo deshabilitado (ej. color gris, menor opacidad) cuando se alcanza el límite.

Integración: `CategorySelector` ya es un subcomponente de `OfertaForm` y debe interactuar con `react-hook-form` y `zodResolver` (Tarea 8).

Criterios de Aceptación Técnica:
- El `CategorySelector` impide la selección de una sexta categoría.
- El contador visual muestra "5/5" cuando se alcanzan 5 categorías.
- Las categorías no seleccionadas se deshabilitan visualmente cuando se alcanza el límite. ---END_PROMPT---

---START_COMMIT--- HU01-T11 feat(form): implementar limite de 5 categorias en CategorySelector ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 12 TASK_TITLE: Implementación de createOfertaAction con seed data. HU_NUMBER: HU01 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 2.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Necesitamos una Next.js Server Action para procesar el formulario de oferta. Inicialmente, esta acción usará datos de seed y simulará la latencia del backend, con el código de la integración real comentado. Objetivo: Implementar la Next.js Server Action `createOfertaAction` que se encargará de procesar los datos del formulario. Retornará datos del seed para permitir el desarrollo independiente del frontend, con el código de la llamada `fetch` al backend real presente pero comentado.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/actions/oferta/createOfertaAction.ts`
- `src/lib/types/oferta.ts` (Si no existen, definir las interfaces `CreateOfertaDto` y `OfertaEntity` para tipar los datos de entrada y salida)

Tecnologías: Next.js 16 (Server Actions), TypeScript.

Estructura: La función asíncrona `createOfertaAction(prevState: any, formData: FormData)` debe ser marcada con `'use server'`.

Validaciones: Extraer los datos (`title`, `price`, `modality`, `categories`, `description`) del `formData`. Implementar validaciones básicas (ej. `!title`, `title.length < 3`, `isNaN(price)`, `categories.length === 0`, `description.length < 20`). Si alguna validación falla, retornar `{ success: false, errors: { campo: 'mensaje de error' } }`.

Diseño: N/A.

Integración:
- Importar la función `getOfertaSeed()` de `src/seed/OfertaSeedData.ts`.
- Si las validaciones son exitosas, simular un pequeño delay (ej. `await new Promise(resolve => setTimeout(resolve, 1000));`) para emular latencia de red.
- Retornar `{ success: true, message: 'Oferta creada exitosamente', data: getOfertaSeed()[0] }` con una oferta del seed.
- Incluir un bloque de código *completamente comentado* con la estructura de la petición `fetch` al endpoint `POST /api/ofertas` (configurando headers como `Content-Type` y `Authorization`, y el cuerpo `JSON.stringify(offerData)`), manejando la respuesta y errores del backend.

Criterios de Aceptación Técnica:
- El Server Action `createOfertaAction` está creado y es `use server`.
- Realiza validaciones básicas de los inputs y retorna errores si es necesario.
- Retorna un objeto `{ success: true, data: ... }` con una oferta del seed cuando es exitoso.
- El código de la petición `fetch` al backend está presente y completamente comentado.
- La estructura de la respuesta (éxito/error) es consistente con la esperada del backend y la historia de usuario. ---END_PROMPT---

---START_COMMIT--- HU01-T12 feat(action): implementar createOfertaAction con seed data ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 13 TASK_TITLE: Integración de NuevaOfertaModal en DashboardPage. HU_NUMBER: HU01 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Crear Oferta de Tutoría ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El tutor debe poder iniciar el proceso de creación de una oferta desde su panel de control. Objetivo: Integrar el componente `NuevaOfertaModal` en la `DashboardPage` para que se abra cuando el tutor haga clic en el botón "+ Nueva Oferta".

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/app/dashboard/tutor/page.tsx`
- `src/components/ui/NuevaOfertaModal/NuevaOfertaModal.tsx` (verificar que tenga las props adecuadas)

Tecnologías: Next.js 16, Tailwind CSS 4, TypeScript, React.

Estructura: Modificar `src/app/dashboard/tutor/page.tsx` (puede ser Server Component con Client Components anidados). Añadir un estado local (`useState`) para controlar la visibilidad del modal (`isModalOpen: boolean`). Renderizar el `NuevaOfertaModal` en la página, pasándole las props `isOpen={isModalOpen}` y `onClose={() => setIsModalOpen(false)}`. Incluir un botón "+ Nueva Oferta" que, al hacer clic, cambie el estado `isModalOpen` a `true`.

Validaciones: N/A.

Diseño: El botón "+ Nueva Oferta" debe ser claramente visible en el Dashboard del tutor, siguiendo los estilos de Tailwind CSS 4. El modal debe aparecer como se diseñó en la Tarea 2.

Integración: El modal y su control de visibilidad se gestionan desde la `DashboardPage`.

Criterios de Aceptación Técnica:
- El botón "+ Nueva Oferta" en el Dashboard abre el modal.
- El modal se cierra correctamente al hacer clic en 'X' o al invocar `onClose`. ---END_PROMPT---

---START_COMMIT--- HU01-T13 feat(page): integrar NuevaOfertaModal en DashboardPage ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 14 TASK_TITLE: Conexión de OfertaForm con createOfertaAction y manejo de estados de carga/error. HU_NUMBER: HU01 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Crear Oferta de Tutoría (Errores) ---END_FRAME---

---START_ESTIMATION--- 1.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El `OfertaForm` debe enviar sus datos al Server Action `createOfertaAction` y manejar la retroalimentación del envío, incluyendo estados de carga y errores de validación del lado del servidor. Objetivo: Conectar el `OfertaForm` con el `createOfertaAction` para enviar los datos de la oferta. Se deberá gestionar el estado de envío (`pending` del Server Action) y mostrar errores retornados por el Server Action.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/forms/OfertaForm/OfertaForm.tsx`
- `src/actions/oferta/createOfertaAction.ts` (asegurar que el formato de retorno de errores sea consistente)
- `src/components/ui/buttons/PrimaryButton.tsx` (para el `PublicarOfertaButton`, para deshabilitarlo)

Tecnologías: Next.js 16 (Client Components, Server Actions, `useFormStatus`, `useActionState`), React, TypeScript, Tailwind CSS 4.

Estructura: En `OfertaForm.tsx` (Client Component):
- Importar `createOfertaAction` y usarlo como prop `action` del `<form>`.
- Utilizar `useFormStatus` de `react-dom` para obtener el estado `pending` del Server Action. Pasar este estado a `PrimaryButton` (Publicar Oferta) para deshabilitarlo y mostrar un indicador de carga.
- Utilizar `useActionState` (o `useState` si se simula) para gestionar la respuesta del Server Action (éxito/error/data).
- Si `createOfertaAction` retorna un objeto `{ success: false, errors: { ... } }`, mapear estos errores y pasarlos a los componentes de entrada (`InputTituloOferta`, `TextareaDescripcionOferta`, `CategorySelector`, etc.) para que muestren el `ValidationMessage` (Tarea 6) y el borde rojo correspondiente.

Validaciones: Mostrar los errores de validación retornados por el Server Action de forma clara, debajo de cada campo afectado. El formulario no debe cerrarse si hay errores.

Diseño: El botón "Publicar Oferta" debe deshabilitarse y opcionalmente mostrar un spinner o texto "Publicando..." cuando `pending` sea `true`. Los mensajes de error deben aparecer con el estilo definido en `T. Crear Oferta de Tutoría (Errores)`.

Integración: `OfertaForm` se conectará directamente al Server Action a través del prop `action`.

Criterios de Aceptación Técnica:
- El botón "Publicar Oferta" se deshabilita mientras el Server Action está en curso.
- Los errores retornados por `createOfertaAction` se muestran correctamente debajo de los campos afectados en el formulario.
- El formulario no se cierra si el Server Action retorna un error. ---END_PROMPT---

---START_COMMIT--- HU01-T14 feat(form): conectar OfertaForm con createOfertaAction y manejar estados ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 15 TASK_TITLE: Manejo de cierre de modal y redirección/notificación post-publicación exitosa. HU_NUMBER: HU01 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 1.0H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Cuando una oferta se publica con éxito, el usuario debe ser notificado y el modal debe cerrarse, refrescando el dashboard. Objetivo: Implementar la lógica para cerrar el modal `NuevaOfertaModal` y mostrar un mensaje de éxito (`SuccessToast`) en la `DashboardPage` cuando una oferta es publicada exitosamente. Además, se revalidará la caché de Next.js para actualizar la lista de ofertas.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/forms/OfertaForm/OfertaForm.tsx`
- `src/app/dashboard/tutor/page.tsx`
- `src/components/ui/NuevaOfertaModal/NuevaOfertaModal.tsx`
- `src/components/ui/Toast/Toast.tsx`
- `src/actions/oferta/createOfertaAction.ts`

Tecnologías: Next.js 16 (Server Components, `revalidatePath`), React, TypeScript.

Estructura:
- En `OfertaForm.tsx` (Client Component): La lógica de `useActionState` (Tarea 14) debe detectar cuando `createOfertaAction` retorna `success: true`. En ese momento, debe invocar una prop `onSuccess` que se pasará desde `NuevaOfertaModal`.
- En `NuevaOfertaModal.tsx` (Client Component): Pasar la prop `onSuccess` que recibe desde `DashboardPage` hacia `OfertaForm`.
- En `src/app/dashboard/tutor/page.tsx` (Server Component, manejando Client Components):
    - La función `onSuccess` (pasada a `NuevaOfertaModal`) deberá:
        - Actualizar el estado `isModalOpen` a `false` para cerrar el modal.
        - Actualizar el estado del `SuccessToast` (Tarea 7) para que sea visible con el mensaje "Oferta creada".
    - El `createOfertaAction` (`src/actions/oferta/createOfertaAction.ts`) debe incluir una llamada a `revalidatePath('/dashboard/tutor')` antes de retornar el éxito para asegurar que el dashboard se refresque con la nueva oferta.

Validaciones: N/A.

Diseño: El `SuccessToast` debe aparecer con el mensaje "Oferta creada" de forma efímera.

Integración: Coordinación entre `OfertaForm` (que detecta el éxito del Server Action), `NuevaOfertaModal` (que coordina el cierre) y `DashboardPage` (que activa el toast y maneja la visibilidad del modal).

Criterios de Aceptación Técnica:
- Tras una publicación exitosa, la modal se cierra.
- Aparece el `SuccessToast` con el mensaje "Oferta creada".
- El dashboard se actualiza para potencialmente mostrar la nueva oferta. ---END_PROMPT---

---START_COMMIT--- HU01-T15 feat(flow): manejar cierre de modal y notificacion post-publicacion ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 16 TASK_TITLE: Manejo de cierre de modal al cancelar (botón 'X' o 'Cancelar'). HU_NUMBER: HU01 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- T. Crear Oferta de Tutoría ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: El usuario debe poder cancelar la creación de una oferta en cualquier momento sin guardar los cambios. Objetivo: Asegurar que el modal `NuevaOfertaModal` se cierre correctamente al hacer clic en el botón "Cancelar" o en el botón "X" de cierre, sin guardar ningún dato y regresando al estado original del `DashboardPage`.

Especificaciones Técnicas:

Archivos a crear/modificar:
- `src/components/forms/OfertaForm/OfertaForm.tsx` (para conectar el botón Cancelar)
- `src/components/ui/NuevaOfertaModal/NuevaOfertaModal.tsx` (para el botón 'X' y pasar la función de cierre)
- `src/components/ui/buttons/SecondaryButton.tsx` (para el botón "Cancelar")
- `src/app/dashboard/tutor/page.tsx` (para manejar el estado `isModalOpen`)

Tecnologías: Next.js 16, React, TypeScript.

Estructura:
- En `OfertaForm.tsx` (Client Component): El `SecondaryButton` ("Cancelar") debe invocar una prop `onCancel: () => void` que recibirá.
- En `NuevaOfertaModal.tsx` (Client Component): El botón 'X' ya debe invocar su prop `onClose`. También, la prop `onClose` de `NuevaOfertaModal` debe pasarse a `OfertaForm` como `onCancel`.
- En `src/app/dashboard/tutor/page.tsx` (Server Component, manejando Client Components): La función pasada como `onClose` al `NuevaOfertaModal` simplemente debe establecer `isModalOpen` a `false`.

Validaciones: N/A.

Diseño: N/A.

Integración: Conectar los eventos `onClick` de los botones "Cancelar" y 'X' a la función de cierre del modal.

Criterios de Aceptación Técnica:
- El modal se cierra al hacer clic en el botón "Cancelar".
- El modal se cierra al hacer clic en el botón 'X'.
- El sistema regresa al `DashboardPage` sin mostrar ningún mensaje o error.
- Los datos ingresados en el formulario no se persisten. ---END_PROMPT---

---START_COMMIT--- HU01-T16 fix(flow): manejar cierre de modal al cancelar ---END_COMMIT---
---END_TASK---

---START_TASK--- TASK_NUMBER: 17 TASK_TITLE: Integración final con backend real (descomentar fetch en createOfertaAction). HU_NUMBER: HU01 ---END_HEADER---

---START_TOOL--- copilot ---END_TOOL---

---START_FRAME--- Ninguno ---END_FRAME---

---START_ESTIMATION--- 0.5H ---END_ESTIMATION---

---START_PROMPT--- Contexto: Una vez que el frontend esté estable con los datos de seed, se procederá a integrar la funcionalidad con el backend real. Objetivo: Activar la integración real con el backend de NestJS descomentando el código de la petición `fetch` pre-escrito en `createOfertaAction` y eliminando el retorno de seed data.

Especificaciones Técnicas:

Archivos a crear/modificar: `src/actions/oferta/createOfertaAction.ts`

Tecnologías: Next.js 16 (Server Actions), TypeScript.

Estructura:
- Abrir `src/actions/oferta/createOfertaAction.ts`.
- **Desactivar el retorno de seed data:** Comentar o eliminar la línea que retorna `{ success: true, message: 'Oferta creada exitosamente', data: getOfertaSeed()[0] }` y el `setTimeout` de simulación.
- **Descomentar el bloque `fetch`:** Descomentar el bloque `try-catch` completo que contiene la llamada `fetch` al endpoint del backend.

Validaciones: Asegurarse de que la `CreateOfertaDto` enviada en el `fetch` sea correcta. El `fetch` debe manejar la respuesta del backend (`response.ok`, `response.json()`) y los errores, retornando el mismo formato de éxito/error (`{ success: boolean, message?: string, errors?: { [campo: string]: string }, data?: OfertaEntity }`) que se usó con los datos de seed. Esto asegura que el frontend (Tarea 14) pueda seguir procesando las respuestas sin cambios.

Diseño: N/A.

Integración: Consumir el endpoint `POST /ofertas` del backend. Asegurarse de que `process.env.NEXT_PUBLIC_API_BASE_URL` esté correctamente configurado y accesible en el Server Action.

Criterios de Aceptación Técnica:
- El Server Action `createOfertaAction` realiza una petición HTTP `POST` real al endpoint `/api/ofertas`.
- La oferta se crea exitosamente en el backend.
- El frontend maneja correctamente las respuestas de éxito y error del backend.
- La estructura de la respuesta del backend coincide con la esperada. ---END_PROMPT---

---START_COMMIT--- HU01-T17 feat(integration): integrar createOfertaAction con backend real ---END_COMMIT---
---END_TASK---