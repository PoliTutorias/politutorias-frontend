# HU41 - Registrar mi disponibilidad

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 8 SP |
| **Historia de Usuario** | Como tutor, quiero registrar mi disponibilidad para que los estudiantes conozcan cuándo pueden solicitar mis servicios. |


---

# HU41 - Criterios de Aceptación

| Escenario | Descripción |
|---|---|
| **Bloqueo sin selección de horario** | **Dado** que el tutor se encuentra en la interfaz de "Define tu Horario" <br>**cuando** no ha seleccionado ningún bloque de horario en la cuadrícula y hace clic en el botón 'Siguiente Perfil Profesional'<br>**entonces** el sistema bloquea la navegación y muestra el texto rojo 'Selecciona al menos un horario disponible' encima de la cuadrícula. |
| **Selección de bloques horarios** | **Dado** que el tutor se encuentra en la interfaz de "Define tu Horario" <br>**cuando** hace clic en un bloque de horario en la cuadrícula Lun a  09:00 <br>**entonces** el bloque horario seleccionado cambia visualmente de color blanco a azul oscuro y muestra un ícono '✓' blanco en el centro, y aparece el texto verde centrado sobre la cuadrícula: '✓ 1 horario seleccionado'. |
| **Avance a Perfil Profesional con horario seleccionado** | **Dado** que el tutor se encuentra en la interfaz de "Define tu Horario" y ha seleccionado al menos un bloque de horario Mar a las  10:00<br>**cuando** hace clic en el botón 'Siguiente Perfil Profesional'<br>**entonces** el sistema redirige  '3 Perfil Profesional' resaltado, el título 'Detalles Profesionales', el subtítulo 'Añade tu experiencia y materias para destacar', y el botón 'Finalizar Registro'. |
| **Deselección de bloques horarios** | **Dado** que el tutor se encuentra en la interfaz de "Define tu Horario" y tiene bloques de horario previamente seleccionados ej: 'Mié de 11:00' y 'Mié de 12:00', mostrando '✓ 2 horarios seleccionados')<br>**cuando** vuelve a hacer clic en un bloque horario ya marcado (ej: 'Miércoles 11:00')<br>**entonces** el bloque horario vuelve a ser blanco, el ícono '✓' desaparece, y el contador superior verde disminuye su número en tiempo real (ej: mostrando '✓ 1 horario seleccionado'). |
| **Navegabilidad hacia atrás: Del Paso 2 al 1** | **Dado** que el tutor se encuentra en la interfaz de "Define tu Horario" <br>**cuando** hace clic en el botón inferior izquierdo de '← Atrás Datos Básicos' o en el paso '1 Datos Básicos' del menú superior<br>**entonces** el sistema redirige a la pantalla del Paso 1, conservando intacta toda la información previamente ingresada por el usuario en los campos. |


## Frames del Prototipo

### T. Registro Tutor 2 (Vacío)

**Frame ID**: [1f4y6Ivl80c6YRD6Pp-K33rN4E_uxaQOe](https://drive.google.com/file/d/1f4y6Ivl80c6YRD6Pp-K33rN4E_uxaQOe/view?usp=drivesdk)


## Observaciones

Cualquier funcionalidad respecto a cargar documentos sobre récord académico, DESCARTARLO. La pantalla del wizard "Disponibilidad" desarrollarlo por completo.
