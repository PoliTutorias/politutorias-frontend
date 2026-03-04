# HU42 - Registrar información académica

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 8 SP |
| **Historia de Usuario** | Como tutor, quiero registrar información académica para que los estudiantes se enteren cuáles son mis conocimientos. |


---

# HU42 - Criterios de Aceptación

| Escenario | Descripción |
|---|---|
| **Ignorar Guardar Experiencia Vacía** | **Dado** que el tutor se encuentra en la interfaz de "Detalles Profesionales"  y ha abierto el modal de 'Nueva Experiencia' (al hacer clic en '+ Añadir Experiencia')<br>**cuando** deja todos los campos del modal 'Nueva Experiencia' (ej. Puesto, Institución, Fechas) vacíos y hace clic en el botón 'Guardar' dentro del modal<br>**entonces** la acción de guardar se ignora silenciosamente, no aparece ningún mensaje de error, y el modal 'Nueva Experiencia' permanece en pantalla. |
| **Validar Formato de Fecha MM/AAAA** | **Dado** que el tutor se encuentra en la interfaz de "Detalles Profesionales" en el campo "Nueva Experiencia" y está ingresando fechas en un campo de 'Fecha Inicio' o 'Fecha Fin'<br>**cuando** ingresa una fecha en el formato MM/AAAA (ej: '03/2024')<br>**entonces** el sistema valida y mantiene el formato de la fecha (ej: '03/2024'). |
| **Bloquear Caracteres No-Numéricos en Fecha** | **Dado** que el tutor se encuentra en la interfaz de "Detalles Profesionales"y está ingresando fechas en un campo de experiencia (ej: 'Fecha Inicio' o 'Fecha Fin')<br>**cuando** intenta ingresar Hola en los campos de fecha  o intenta ingresar algo distinto a 'Presente' en 'Fecha Fin'<br>**entonces** el sistema bloquea el ingreso, y las letras y signos no se muestran, permitiendo solo números. En el campo 'Fecha Fin', permite la palabra exacta 'Presente'. |
| **Validar Máximo Caracteres en Fecha** | **Dado** que el tutor se encuentra en la interfaz de "Detalles Profesionales"  y está ingresando una fecha en un campo de experiencia (ej: 'Fecha Inicio' o 'Fecha Fin')<br>**cuando** ingresa la fecha '12/20255' que excede los 7 caracteres del formato MM/AAAA <br>**entonces** el sistema muestra el mensaje de error en rojo 'Máximo 7 caracteres' debajo del campo de fecha. |
| **Añadir Materia como Etiqueta** | **Dado** que el tutor se encuentra en la interfaz de "Detalles Profesionales"  y está en la sección para añadir materias<br>**cuando** ingresa 'Cálculo' en el campo 'Escribe una Materia(Ej. Cálculo, Física...)' y hace clic en el botón '+ Agregar'<br>**entonces** el sistema limpia el campo de texto y crea un elemento visual (etiqueta o 'pill') de color celeste claro con el texto de la materia (ej: 'Cálculo') y una 'x' a la derecha que permite eliminar. |
| **Finalización Exitosa del Registro** | **Dado** que el tutor se encuentra en la interfaz de "Detalles Profesionales"  y ha completado los pasos anteriores<br>**cuando** hace clic en el botón 'Finalizar Registro' (habiendo llenado o dejado vacíos los campos opcionales)<br>**entonces** el sistema finaliza el proceso sin errores y muestra una pantalla con el mensaje "¡Perfil creado! Ahora puedes publicar tus ofertas de tutorías."  | 
| **Navegabilidad hacia atrás: Del Paso 3 al 2** | **Dado** que el tutor se encuentra en la interfaz de "Detalles Profesionales" <br>**cuando** hace clic en el botón inferior izquierdo de '← Atrás Disponibilidad' o en el paso '2 Disponibilidad' del menú superior<br>**entonces** el sistema redirige a la pantalla del Paso 2, conservando intactos todos los bloques horarios previamente seleccionados en la cuadrícula. |


## Frames del Prototipo

### T. Registro Tutor 3 (Vacío)

**Frame ID**: [1e98fRqVfoc5x75ifUFP9sNCBNXzPyYnD](https://drive.google.com/file/d/1e98fRqVfoc5x75ifUFP9sNCBNXzPyYnD/view?usp=drivesdk)


## Observaciones

Cualquier funcionalidad respecto a cargar documentos sobre récord académico, DESCARTARLO. La pantalla del wizard "Perfil Profesional" desarrollarlo por completo.
