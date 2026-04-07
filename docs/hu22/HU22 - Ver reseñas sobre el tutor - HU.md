# HU22 - Ver reseñas sobre el tutor

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 5 SP |
| **Historia de Usuario** | Como estudiante, quiero ver las reseñas sobre un tutor para tomar una decisión informada antes de agendar. |


---

# HU22 - Criterios de Aceptación

| **Escenario** | **Descripción** |
| :--- | :--- |
| **Vista Inicial de Reseñas (Integración HU-10)** | **Dado** que el estudiante se desplaza a la sección 'Reseñas de Estudiantes' dentro de la pantalla de detalle de oferta del tutor,<br> **cuando** el sistema carga la sección,<br> **entonces** visualiza el consolidado general de calificaciones, el gráfico de barras porcentuales, las tres métricas del tutor, y un listado de un máximo de 3 reseñas individuales (con avatar, nombre, fecha, estrellas, título de la oferta de la tutoría a la cual asistió el estudiante y comentario). |
| **Carga de Reseñas Adicionales (Integración HU-10)** | **Dado** que el estudiante se encuentra en la sección 'Reseñas de Estudiantes' y existen más de 3 reseñas en total para ese tutor,<br> **cuando** hace clic en el botón inferior 'Ver más reseñas',<br> **entonces** la lista se expande cargando comentarios adicionales hacia abajo, y el texto contador (ej. "Mostrando 3 de 8 reseñas") se actualiza dinámicamente. El botón permanece visible si hay más reseñas por mostrar o desaparece si se alcanzó el total. |


## Frames del Prototipo

### E. Detalle Oferta.

**Frame ID**: [1mAH-3G1AL6eWDFW-Cwk2WiN2OORwc7EE](https://drive.google.com/file/d/1mAH-3G1AL6eWDFW-Cwk2WiN2OORwc7EE/view?usp=drivesdk)


## Observaciones

Enfocarse ÚNICAMENTE en la sección "Reseñas de Estudiantes" de la pantalla "E. Detalle Oferta". De dicha sección descartar la funcionalidad "Ordenar por:" esta funcionalidad excede el alcance de la HU22.
