# HU39 - Ver historial de tutorías impartidas

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 5 SP |
| **Historia de Usuario** | Como tutor, quiero ver mi historial de tutorías impartidas para tener un registro de mi experiencia profesional. |


---

# HU39 - Criterios de Aceptación

| **Escenario** | **Descripción** |
| :--- | :--- |
| **Visualización Inicial del Historial (<= 5 registros)** | **Dado** que el tutor ingresa a la opción 'Historial' y no tiene más de 5 tutorías impartidas registradas,<br> **cuando** el sistema carga la pantalla 'Historial de Tutorías Impartidas',<br> **entonces** se visualizan las tres métricas estáticas superiores (Tutorías completadas, Materias impartidas y Estudiantes que califican) y un listado de máximo 5 tarjetas. Cada tarjeta muestra los siguientes campos: iniciales del estudiante (en un círculo), título de la oferta de la tutoría, nombre del estudiante, y la fecha y hora de la sesión. Los controles de paginación están ocultos. |
| **Historial con Paginación Disponible (> 5 registros)** | **Dado** que el tutor tiene más de 5 tutorías registradas y accede a 'Historial',<br> **cuando** el sistema carga la pantalla 'Historial de Tutorías Impartidas',<br> **entonces** se visualiza el listado con las primeras 5 tarjetas (cada una detallando: iniciales, título de la oferta de la tutoría, nombre del estudiante, y fecha y hora de la sesión) y, en la parte inferior, los controles numéricos de paginación y flechas ('<', '1', '2', '>'). |
| **Navegación por Número de Página** | **Dado** que el tutor visualiza la primera página de su 'Historial de Tutorías Impartidas' con los controles de paginación visibles,<br> **cuando** hace clic en el número de página '2',<br> **entonces** el listado se actualiza para mostrar el siguiente bloque de tutorías (tarjetas 6 a 10) y el número '2' se resalta. |
| **Navegación por Flecha Siguiente** | **Dado** que el tutor visualiza la primera página de su 'Historial de Tutorías Impartidas',<br> **cuando** hace clic en la flecha de paginación '>',<br> **entonces** el listado avanza a la siguiente página de resultados y el número de la nueva página activa se resalta. |
| **Navegación por Flecha Anterior** | **Dado** que el tutor se encuentra visualizando la segunda página de su 'Historial de Tutorías Impartidas',<br> **cuando** hace clic en la flecha de paginación '<',<br> **entonces** el listado retrocede a la primera página de resultados y el número '1' se resalta. |
| **Abrir Detalle de Tutoría Impartida** | **Dado** que el tutor visualiza el listado de tarjetas en su 'Historial de Tutorías Impartidas',<br> **cuando** hace clic sobre el área general de una tarjeta individual,<br> **entonces** se despliega la ventana modal 'Detalle de la Tutoría' atenuando el fondo. El modal muestra la información del estudiante, título de la oferta de la tutoría, fecha, hora, modalidad, precio, lugar/enlace y mensaje. En la parte inferior únicamente se visualiza el botón 'Cerrar'. |
| **Cerrar Detalle de Tutoría Impartida** | **Dado** que el tutor se encuentra visualizando el modal 'Detalle de la Tutoría',<br> **cuando** hace clic en el botón 'Cerrar',<br> **entonces** la ventana modal desaparece y el usuario regresa a la vista principal del listado en la pantalla 'Historial de Tutorías Impartidas'. |


## Frames del Prototipo

### T. Historial.

**Frame ID**: [1NsGczwD7An3K0oG2ECbjG0R_sTKImAcl](https://drive.google.com/file/d/1NsGczwD7An3K0oG2ECbjG0R_sTKImAcl/view?usp=drivesdk)

### T. Historial (Detalle Tutoría sin Confirmar).

**Frame ID**: [16hc8mYqRH6j_ITn2X81-jtXJH1TGsUU4](https://drive.google.com/file/d/16hc8mYqRH6j_ITn2X81-jtXJH1TGsUU4/view?usp=drivesdk)


## Observaciones

Esta HU39 abarca las tres métricas de la parte superior y las tarjetas de las tutorías a las que su hora reservada ya ha finalizado representado por la pantalla "T. Historial". También, se incluye la pantalla "T. Historial (Detalle Tutoría sin Confirmar)". Sin embargo, para esta HU39 se DESCARTAN las funcionalidades de Ordenar cronológicamente y filtrar por estado. Así mismo, DESCARTAR las funcionalidades de marcar como completada o inasistencia, representados por los botones "Completada" e "Inasistencia", respectivamente.
