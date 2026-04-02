# HU10 - Dejar reseña a tutor

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 13 SP |
| **Historia de Usuario** | Como estudiante, quiero dejar una reseña a un tutor para compartir mi experiencia con otros estudiantes. |


---

# HU10 - Criterios de Aceptación

| **Escenario** | **Descripción** |
| :--- | :--- |
| **Apertura de Modal de Calificación desde Tarjeta (Integración HU-40)** | **Dado** que el estudiante visualiza una tutoría "Completada" en su pantalla 'Historial de Tutorías',<br> **cuando** hace clic en el botón oscuro 'Calificar' directamente en la tarjeta,<br> **entonces** se despliega la ventana modal "Califica tu tutoría" con 5 estrellas vacías, el campo opcional de comentario ("0/300") y el botón "Enviar Reseña" deshabilitado (gris). |
| **Apertura de Detalle de Tutoría Completada (Integración HU-40)** | **Dado** que el estudiante hace clic sobre el área general de una tarjeta "Completada",<br> **cuando** se abre el modal 'Detalle de la Tutoría',<br> **entonces** se muestran los datos de la sesión y, en la parte inferior junto al botón "Cerrar", se visualiza el botón oscuro interactivo "Calificar". |
| **Apertura de Modal de Calificación desde Detalle** | **Dado** que el estudiante se encuentra dentro del modal 'Detalle de la Tutoría' de una sesión completada,<br> **cuando** hace clic en el botón 'Calificar',<br> **entonces** se superpone el modal "Califica tu tutoría" bloqueando la vista anterior, con las 5 estrellas vacías, el campo de comentario opcional y el botón "Enviar Reseña" deshabilitado. |
| **Botón Enviar Reseña Deshabilitado sin Estrellas** | **Dado** que el estudiante se encuentra en el modal "Califica tu tutoría",<br> **cuando** ingresa texto en el campo opcional de comentario pero no selecciona ninguna estrella,<br> **entonces** el botón "Enviar Reseña" permanece deshabilitado. |
| **Habilitación de Botón de Envío** | **Dado** que el estudiante se encuentra en el modal "Califica tu tutoría",<br> **cuando** hace clic para seleccionar de 1 a 5 estrellas,<br> **entonces** el botón "Enviar Reseña" cambia visualmente a estado habilitado e interactuable. |
| **Validación Límite de Caracteres en Comentario** | **Dado** que el estudiante ingresa texto en el campo opcional de comentario,<br> **cuando** alcanza los 300 caracteres permitidos,<br> **entonces** el sistema restringe el ingreso de texto adicional, indicando en el contador "300/300". |
| **Envío de Reseña con Comentario (Integración HU-43)** | **Dado** que el estudiante está en el modal "Califica tu tutoría" con estrellas seleccionadas y un comentario ingresado,<br> **cuando** hace clic en el botón "Enviar Reseña",<br> **entonces** el modal se cierra, se muestra el mensaje temporal exacto: "Reseña enviada. Gracias por calificar tu tutoría." y la tarjeta en el historial se actualiza mostrando la sección "TU CALIFICACIÓN" con las estrellas y el texto. El botón "Calificar" desaparece. |
| **Envío de Reseña sin Comentario (Integración HU-43)** | **Dado** que el estudiante está en el modal "Califica tu tutoría" con estrellas seleccionadas pero deja el campo de comentario vacío,<br> **cuando** hace clic en "Enviar Reseña",<br> **entonces** el sistema procesa el envío correctamente, mostrando el mensaje temporal exacto: "Reseña enviada. Gracias por calificar tu tutoría." y actualizando la tarjeta solo con la representación de las estrellas. |
| **Cancelación de Reseña** | **Dado** que el estudiante visualiza el modal "Califica tu tutoría",<br> **cuando** hace clic en el botón "Cancelar",<br> **entonces** el modal se cierra sin guardar información, regresando al estudiante a la vista exacta donde se encontraba (tarjeta o detalle). |
| **Visualización de Detalle de Tutoría Calificada** | **Dado** que el estudiante hace clic sobre una tarjeta que ya fue calificada en su 'Historial de Tutorías',<br> **cuando** se abre el modal 'Detalle de la Tutoría',<br> **entonces** el modal muestra la información estática y una sección inferior "Tu Reseña" con las estrellas y el texto exacto ingresado. Solo el botón "Cerrar" está habilitado. |
| **Cerrar Detalle de Tutoría Calificada** | **Dado** que el estudiante visualiza el modal 'Detalle de la Tutoría' de una sesión calificada,<br> **cuando** hace clic en el botón 'Cerrar',<br> **entonces** el modal se cierra y el usuario regresa al listado principal. |


## Frames del Prototipo

### E. Historial.

**Frame ID**: [1XjMCd6z1xnfxnUF_rSsB_-KWbYRkA2ha](https://drive.google.com/file/d/1XjMCd6z1xnfxnUF_rSsB_-KWbYRkA2ha/view?usp=drivesdk)

### E. Historial (Calificar Tutoría).

**Frame ID**: [1MuGppJbDLGNwXGm2BJVoVs-sKDvYH2gb](https://drive.google.com/file/d/1MuGppJbDLGNwXGm2BJVoVs-sKDvYH2gb/view?usp=drivesdk)

### E. Historial (Detalle Tutoría Completada).

**Frame ID**: [1K5XHM7U7QWko1DZkX6P7qnzHBfO-em0V](https://drive.google.com/file/d/1K5XHM7U7QWko1DZkX6P7qnzHBfO-em0V/view?usp=drivesdk)

### E. Historial (Detalle Tutoría Calificada).

**Frame ID**: [1XjMCd6z1xnfxnUF_rSsB_-KWbYRkA2ha](https://drive.google.com/file/d/1XjMCd6z1xnfxnUF_rSsB_-KWbYRkA2ha/view?usp=drivesdk)

### T. Historial (Detalle Tutoría Confirmada).

**Frame ID**: [1hPAk_Drn-X1VKl5dhcaE2GrgAGFwkhvJ](https://drive.google.com/file/d/1hPAk_Drn-X1VKl5dhcaE2GrgAGFwkhvJ/view?usp=drivesdk)


## Observaciones

Implementar únicamente lo pendiente de la HU40, que es el botón "Calificar" presente desde la lista de tarjeta de tutorías recibidas con estado "Completada" en la pantalla "E. Historial" y desde el detalle de la tarjeta representada en la pantalla "E. Historial (Detalle Tutoría Completada)". También, implementar el modal "E. Historial (Calificar Tutoría)". Implementar la calificación provocará que se agregue el estilo de tarjeta de tutoría de estado "Completada" con la calificación representado en la pantalla "E. Historial", así mismo el estilo de detalle de tutoría de estado "Completada" con la calificación, representado en la pantalla "E. Historial (Detalle Tutoría Calificada)". Desde el punto de vista del tutor, agregar una reseña implicaría actualizar el estilo de las tarjetas de tutoría de Estado "Completada" para incluir la reseña del estudiante, esto se representa en la pantalla "T. Historial (Detalle Tutoría Confirmada)".
