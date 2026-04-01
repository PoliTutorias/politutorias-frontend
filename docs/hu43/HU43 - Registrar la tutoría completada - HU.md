# HU43 - Registrar la tutoría completada

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 5 SP |
| **Historia de Usuario** | Como tutor, quiero registrar que la tutoría ha sido completada para mantener mi historial actualizado y recibir el pago. |


---

# HU43 - Criterios de Aceptación

| **Escenario** | **Descripción** |
| :--- | :--- |
| **Registro de Tutoría Completada desde Tarjeta** | **Dado** que el tutor visualiza una tutoría "sin confirmar" en el listado de 'Historial de Tutorías Impartidas',<br>**cuando** hace clic directamente en el botón 'Completada' (con borde verde) ubicado en la tarjeta,<br>**entonces** la tarjeta se actualiza en tiempo real. Los botones de acción desaparecen y la tarjeta muestra únicamente una etiqueta verde estática con el ícono check y el texto 'Completada', lo cual incrementa en uno la métrica de "Tutorías completadas". |
| **Apertura de Detalle de Tutoría sin Confirmar** | **Dado** que el tutor visualiza una tutoría "sin confirmar" en el listado principal,<br>**cuando** hace clic sobre el área general de dicha tarjeta,<br>**entonces** se despliega el modal 'Detalle de la Tutoría'. En su parte inferior se visualiza el botón interactivo 'Completada' (borde verde) junto al botón 'Cerrar'. |
| **Registro de Tutoría Completada desde Modal** | **Dado** que el tutor se encuentra visualizando el modal 'Detalle de la Tutoría' con los botones de acción habilitados,<br>**cuando** hace clic en el botón 'Completada' dentro del modal,<br>**entonces** la ventana modal se cierra automáticamente. Al regresar al listado principal, la tarjeta correspondiente se actualiza visualmente al estado 'Completada' (mostrando solo la etiqueta verde estática) e incrementa en uno la métrica de "Tutorías completadas". |
| **Visualización de Detalle de Tutoría Completada (Solo Lectura)** | **Dado** que el tutor hace clic en el área general de una tarjeta que ya está en estado 'Completada' (y el estudiante aún no ha calificado),<br>**cuando** se abre el modal 'Detalle de la Tutoría',<br>**entonces** la vista es de modo lectura. En la esquina inferior izquierda se visualiza el texto estático "Estado: [Icono] Completada" y en la esquina inferior derecha únicamente está habilitado el botón 'Cerrar'. |
| **Cierre de Detalle de Tutoría Completada** | **Dado** que el tutor se encuentra visualizando el modal 'Detalle de la Tutoría' en modo lectura,<br>**cuando** hace clic en el botón 'Cerrar',<br>**entonces** la ventana modal se cierra y el sistema regresa a la pantalla 'Historial de Tutorías Impartidas'. |
| **Visualización de Detalle de Tutoría Confirmada (Integración HU-10)** | **Dado** que el tutor hace clic en una tarjeta 'Completada' que ya fue calificada por el estudiante,<br>**cuando** se abre el modal 'Detalle de la Tutoría',<br>**entonces** la vista es de lectura y muestra, en su parte inferior, una sección adicional con la puntuación en estrellas otorgada y el comentario exacto redactado por el estudiante. Solo el botón 'Cerrar' está habilitado. |


## Frames del Prototipo

### T. Historial.

**Frame ID**: [1NsGczwD7An3K0oG2ECbjG0R_sTKImAcl](https://drive.google.com/file/d/1NsGczwD7An3K0oG2ECbjG0R_sTKImAcl/view?usp=drivesdk)

### T. Historial (Detalle Tutoría sin Confirmar).

**Frame ID**: [16hc8mYqRH6j_ITn2X81-jtXJH1TGsUU4](https://drive.google.com/file/d/16hc8mYqRH6j_ITn2X81-jtXJH1TGsUU4/view?usp=drivesdk)


## Observaciones

Agregar el botón verde de nombre "Completada" útil para marcar una tutoría como que se llevó a cabo satisfactoriamente. Debe implementarse tanto en la pantalla "T. Historial" como en el modal de la pantalla "T. Historial (Detalle Tutoría sin Confirmar)."
