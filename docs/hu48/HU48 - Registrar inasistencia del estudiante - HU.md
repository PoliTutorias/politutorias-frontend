# HU48 - Registrar inasistencia del estudiante

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 5 SP |
| **Historia de Usuario** | Como tutor, quiero registrar la inasistencia de un estudiante para proteger mi tiempo y evitar pérdidas económicas. |


---

# HU48 - Criterios de Aceptación

| **Escenario** | **Descripción** |
| :--- | :--- |
| **Mostrar Modal de Confirmación desde Tarjeta** | **Dado** que el tutor visualiza una tutoría "sin confirmar" en su 'Historial de Tutorías Impartidas',<br> **cuando** hace clic en el botón 'Inasistencia' (con borde rojo) de la tarjeta,<br> **entonces** se superpone la ventana modal de advertencia "Confirmar Inasistencia" con el texto: "¿Estás seguro? Esta acción marcará la tutoría como inasistencia del estudiante. Esta acción no se puede deshacer.", y los botones "Cancelar" y "Sí, reportar inasistencia". |
| **Mostrar Modal de Confirmación desde Detalle** | **Dado** que el tutor se encuentra dentro del modal 'Detalle de la Tutoría' de una sesión pendiente,<br> **cuando** hace clic en el botón rojo 'Inasistencia' dentro de este modal,<br> **entonces** se superpone el modal de advertencia "Confirmar Inasistencia" bloqueando la vista anterior, mostrando el mensaje de confirmación y los botones "Cancelar" y "Sí, reportar inasistencia". |
| **Cancelar Confirmación de Inasistencia** | **Dado** que el tutor visualiza el modal de advertencia "Confirmar Inasistencia",<br> **cuando** hace clic en el botón 'Cancelar',<br> **entonces** el modal de advertencia desaparece sin aplicar cambios. El sistema devuelve al tutor exactamente a la interfaz que estaba debajo (el modal de detalle). |
| **Reportar Inasistencia Exitosamente** | **Dado** que el tutor visualiza el modal de advertencia "Confirmar Inasistencia",<br> **cuando** hace clic en el botón rojo 'Sí, reportar inasistencia',<br> **entonces** todos los modales abiertos se cierran. En el listado principal de 'Historial de Tutorías Impartidas', la tarjeta se actualiza visualmente mostrando una etiqueta estática con contorno rojo, ícono de "X" y el texto "Inasistencia". Los botones de acción desaparecen. |
| **Ver Detalles de Tutoría con Inasistencia (Solo lectura)** | **Dado** que el tutor hace clic sobre una tarjeta que ya se encuentra en estado 'Inasistencia',<br> **cuando** se despliega el modal 'Detalle de la Tutoría',<br> **entonces** la información se presenta en modo lectura. En la parte inferior se muestra estáticamente "Estado: [Ícono X rojo] Inasistencia". Solo el botón "Cerrar" está habilitado. |
| **Cerrar Detalle de Tutoría con Inasistencia** | **Dado** que el tutor se encuentra visualizando el modal 'Detalle de la Tutoría' de una sesión con inasistencia,<br> **cuando** hace clic en el botón 'Cerrar',<br> **entonces** el modal se cierra y el sistema regresa a la pantalla 'Historial de Tutorías Impartidas'. |


## Frames del Prototipo

### T. Historial.

**Frame ID**: [1NsGczwD7An3K0oG2ECbjG0R_sTKImAcl](https://drive.google.com/file/d/1NsGczwD7An3K0oG2ECbjG0R_sTKImAcl/view?usp=drivesdk)

### T. Historial (Detalle Tutoría con Inasistencia).

**Frame ID**: [1vmWX-VxUW0dy4b4SzE--yu5uXZV1kZmc](https://drive.google.com/file/d/1vmWX-VxUW0dy4b4SzE--yu5uXZV1kZmc/view?usp=drivesdk)


## Observaciones

Agregar el botón rojo de nombre "Inasistencia" útil para marcar una tutoría que no se llevó a cabo por inasistencia del estudiante. Debe implementarse tanto en la pantalla "T. Historial" como en el modal de detalle de la tutoría para este estado "Inasistencia" representado por la pantalla "T. Historial (Detalle Tutoría con Inasistencia)." Así mismo, esta HU incluye el modal de confirmación cuando se hace clic sobre el botón rojo "Inasistencia".
