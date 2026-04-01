# HU40 - Ver historial de tutorías recibidas

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 5 SP |
| **Historia de Usuario** | Como estudiante, quiero ver mi historial de tutorías recibidas para recordar tutores anteriores y revisar mi progreso. |


---

# HU40 - Criterios de Aceptación

| **Escenario** | **Descripción** |
| :--- | :--- |
| **Visualización Inicial del Historial (Integración HU-43 y HU-48)** | **Dado** que el estudiante ingresa a la pestaña "Historial",<br> **cuando** el sistema carga la pantalla principal 'Historial de Tutorías',<br> **entonces** se listan únicamente las tarjetas en estado "Completada" (etiqueta verde) e "Inasistencia" (con recuadro rojo: "El tutor reportó inasistencia para esta sesión."). |
| **Navegación a Página Específica** | **Dado** que el estudiante visualiza la primera página de su 'Historial de Tutorías' con paginación,<br> **cuando** hace clic en el número de página '2',<br> **entonces** el listado se actualiza para mostrar los registros de la página 2 y el número se resalta con fondo oscuro. |
| **Navegación a Siguiente Página** | **Dado** que el estudiante se encuentra en la primera página de su 'Historial de Tutorías',<br> **cuando** hace clic en el control de paginación '>',<br> **entonces** el listado avanza a la siguiente página y el número activo se resalta. |
| **Navegación a Página Anterior** | **Dado** que el estudiante se encuentra en la segunda página de su 'Historial de Tutorías',<br> **cuando** hace clic en el control de paginación '<',<br> **entonces** el listado retrocede a la página anterior y el número activo se resalta. |
| **Ver Detalles de Tutoría Completada (Integración HU-43)** | **Dado** que el estudiante hace clic sobre el área general de una tarjeta "Completada",<br> **cuando** se abre el modal 'Detalle de la Tutoría',<br> **entonces** se muestran los datos de la sesión y una etiqueta inferior de "Estado: Completada". En la parte inferior únicamente se visualiza el botón "Cerrar". |
| **Ver Detalles de Tutoría con Inasistencia (Integración HU-48)** | **Dado** que el estudiante hace clic sobre una tarjeta con el recuadro rojo de Inasistencia,<br> **cuando** se abre el modal 'Detalle de la Tutoría',<br> **entonces** muestra los datos de la sesión y en la parte inferior la etiqueta "Estado: Inasistencia". Solo el botón "Cerrar" está habilitado. |
| **Cerrar Modal de Detalle de Tutoría** | **Dado** que el estudiante visualiza cualquier modal 'Detalle de la Tutoría' desde su historial,<br> **cuando** hace clic en el botón 'Cerrar',<br> **entonces** la ventana modal desaparece y regresa a la vista del listado de 'Historial de Tutorías'. |


## Frames del Prototipo

### E. Historial

**Frame ID**: [1XjMCd6z1xnfxnUF_rSsB_-KWbYRkA2ha](https://drive.google.com/file/d/1XjMCd6z1xnfxnUF_rSsB_-KWbYRkA2ha/view?usp=drivesdk)

### E. Historial (Tutorías con Inasistencia)

**Frame ID**: [13glmNjJa5V2TLXVoMRc8aoTCgiuYZ0TA](https://drive.google.com/file/d/13glmNjJa5V2TLXVoMRc8aoTCgiuYZ0TA/view?usp=drivesdk)

### E. Historial (Detalle Tutoría con Inasistencia)

**Frame ID**: [1vmWX-VxUW0dy4b4SzE--yu5uXZV1kZmc](https://drive.google.com/file/d/1vmWX-VxUW0dy4b4SzE--yu5uXZV1kZmc/view?usp=drivesdk)

### E. Historial (Detalle Tutoría Completada)

**Frame ID**: [1K5XHM7U7QWko1DZkX6P7qnzHBfO-em0V](https://drive.google.com/file/d/1K5XHM7U7QWko1DZkX6P7qnzHBfO-em0V/view?usp=drivesdk)


## Observaciones

La pantalla "E. Historial" abarca ÚNICAMENTE las tutorías de estado "Completada" e "Inasistencia", para esta HU40 DESCARTAR la presentación de tutorías de estado "Cancelada" y el estilo de tarjeta cuando ya existe una calificación (Eso se implementa en la HU10, cronológicamente primero es la HU40 y luego la HU10). DESCARTAR el botón "Calificar" junto a las tutorías de estado "Completada" y del detalle de la tarjeta disponible en la pantalla "E. Historial (Detalle Tutoría Completada)", también DESCARTAR las funcionalidades "Ordenar:" y "Estado:". La pantalla "E. Historial (Tutorías con Inasistencia)" muestra el estilo de la tarjeta con tutoría de estado "Inasistencia". Las pantallas "E. Historial (Detalle Tutoría con Inasistencia)" y "E. Historial (Detalle Tutoría Completada)" muestran el detalle de las tarjetas de tutorías de estado "Inasistencia" y "Completada".
