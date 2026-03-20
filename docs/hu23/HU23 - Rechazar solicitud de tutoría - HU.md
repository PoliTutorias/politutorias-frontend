# HU23 - Rechazar solicitud de tutoría

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 5 |
| **Historia de Usuario** | Como tutor, quiero rechazar una solicitud para descartar las tutorías que no me convienen impartir. |


---

# HU23 - Criterios de Aceptación

| Escenario | Descripción |
|---|---|
| **Abrir Modal Rechazar Solicitud** | **Dado** que el tutor se encuentra en la pantalla de Bandeja de Entrada y ha desplegado la fila de una solicitud en estado 'Pendiente'.<br> **cuando** hace clic en el botón "Rechazar" (fondo blanco).<br> **entonces** se despliega el modal "Rechazar Solicitud" mostrando el texto "Selecciona un motivo para ayudarle a entender la situación.", los cuatro radio buttons deseleccionados ("Imprevisto personal", "Conflicto de horarios con otra tutoría", "Enfermedad", "Otro"), el botón "Confirmar Rechazo" deshabilitado y el botón "Cancelar" habilitado. |
| **Rechazo con Motivo Predefinido Exitoso** | **Dado** que el tutor se encuentra en el modal "Rechazar Solicitud" para una solicitud en estado 'Pendiente'.<br> **cuando** hace clic en el radio button "Conflicto de horarios con otra tutoría" y hace clic en el botón "Confirmar Rechazo".<br> **entonces** el sistema procesa el rechazo y la ventana modal desaparece. En la vista principal, la solicitud es removida de la pestaña "Pendientes", su contador numérico se reduce en 1 y el contador de la pestaña "Respondidas" aumenta en 1. |
| **Rechazo con Motivo 'Otro' (sin comentario) Exitoso** | **Dado** que el tutor se encuentra en el modal "Rechazar Solicitud" para una solicitud en estado 'Pendiente'.<br> **cuando** hace clic en el radio button "Otro" (lo que expande el modal mostrando el campo de comentario), deja el campo "Comentario adicional (opcional)" completamente vacío, y hace clic en el botón "Confirmar Rechazo".<br> **entonces** el sistema procesa el rechazo y la ventana modal desaparece. La solicitud es removida de la pestaña "Pendientes" y trasladada a "Respondidas", actualizando sus respectivos contadores. |
| **Rechazo con Motivo 'Otro' (con comentario) Exitoso** | **Dado** que el tutor se encuentra en el modal "Rechazar Solicitud" para una solicitud en estado 'Pendiente'.<br> **cuando** hace clic en el radio button "Otro", ingresa en el campo "Comentario adicional (opcional)": "No podré atender esta semana debido a un cruce de horarios.", y hace clic en el botón "Confirmar Rechazo".<br> **entonces** el sistema procesa el rechazo guardando el texto ingresado y la ventana modal desaparece. La solicitud es removida de la pestaña "Pendientes" y trasladada a "Respondidas", actualizando sus respectivos contadores. |
| **Bloqueo por Límite Máximo de Caracteres en Comentario** | **Dado** que el tutor se encuentra en el modal "Rechazar Solicitud" y ha seleccionado el radio button "Otro".<br> **cuando** ingresa en el campo "Comentario adicional (opcional)": "C" (letra repetida 301 veces sin espacios).<br> **entonces** el sistema bloquea el ingreso adicional de texto, el contador inferior muestra exactamente "300/300" y no se permite sobrepasar este límite visual ni funcionalmente. |
| **Cancelar Rechazo (con motivo predefinido seleccionado)** | **Dado** que el tutor se encuentra en el modal "Rechazar Solicitud" de una solicitud pendiente.<br> **cuando** hace clic en el radio button "Imprevisto personal" y seguidamente hace clic en el botón "Cancelar" ubicado en la parte inferior izquierda del modal.<br> **entonces** el sistema interrumpe la acción y la ventana modal se cierra inmediatamente. La pantalla base permanece inalterada, la solicitud continúa visible en la pestaña "Pendientes", la fila sigue desplegada y los contadores numéricos no sufren alteraciones. |
| **Cancelar Rechazo (con motivo 'Otro' seleccionado, sin comentario)** | **Dado** que el tutor se encuentra en el modal "Rechazar Solicitud" con el radio button "Otro" previamente seleccionado.<br> **cuando** deja el campo "Comentario adicional (opcional)" vacío y hace clic en el botón "Cancelar".<br> **entonces** el sistema interrumpe la acción y la ventana modal expandida se cierra inmediatamente. La pantalla base permanece inalterada y los contadores no sufren alteraciones. |
| **Cancelar Rechazo (con motivo 'Otro' seleccionado, con comentario)** | **Dado** que el tutor se encuentra en el modal "Rechazar Solicitud" con el radio button "Otro" previamente seleccionado.<br> **cuando** ingresa en el campo "Comentario adicional (opcional)": "Revisar agenda", y hace clic en el botón "Cancelar".<br> **entonces** el sistema interrumpe la acción descartando el texto escrito y la ventana modal se cierra inmediatamente. La pantalla base permanece inalterada y los contadores no sufren alteraciones. |


## Frames del Prototipo

### T. Bandeja de Entrada (Solicitud Pendiente Desplegada)

**Frame ID**: [175_OQOp1hzhvbnjFCkXa-sKJ9PQl6aN8](https://drive.google.com/file/d/175_OQOp1hzhvbnjFCkXa-sKJ9PQl6aN8/view?usp=drivesdk)


## Observaciones

Agregar únicamente el botón "Rechazar" visible en la pantalla "T. Bandeja de Entrada (Solicitud Pendiente Desplegada)" acompañado del modal "T. Rechazar Solicitud de Tutoría".
