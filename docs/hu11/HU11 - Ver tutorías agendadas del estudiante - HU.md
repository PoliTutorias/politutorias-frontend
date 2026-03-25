# HU11 - Ver tutorías agendadas del estudiante

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 5 |
| **Historia de Usuario** | Como estudiante, quiero ver mis tutorías agendadas para recordar cuando tengo que asistir las tutorías. |


---

# HU11 - Criterios de Aceptación

| Escenario | Descripción |
|---|---|
| **Visualización General de Agenda** | **Dado** que el estudiante se encuentra autenticado en el sistema y posee registros de tutorías confirmadas por sus tutores asociadas a su cuenta.<br> **cuando** interactúa con el menú superior haciendo clic en el enlace de navegación "Agenda".<br> **entonces** el sistema enruta la vista y carga la pantalla de Tutorías Agendadas. La interfaz se divide visualmente mostrando el título principal 'Tutorías Agendadas' y subtítulo 'Lista cronológica de tus sesiones confirmadas'. En el cuerpo central se organizan las tarjetas. Arriba, una sección titulada 'PRÓXIMAS (X)' contiene las tarjetas de tutorías futuras con su fecha, horario, materia y tutor resaltados. Debajo, una sección titulada 'ANTERIORES (Y)' presenta las tarjetas de tutorías pasadas renderizadas en un tono gris claro apagado, portando obligatoriamente una etiqueta derecha con el texto 'COMPLETADA'. Al final de la lista de anteriores se muestra el botón de carga 'Ver todas las anteriores (X más)'. |
| **Ver Detalle de Tutoría Virtual Próxima** | **Dado** que el estudiante se encuentra en la pantalla de Tutorías Agendadas y visualiza en la sección 'PRÓXIMAS' la tarjeta correspondiente a una tutoría configurada bajo la modalidad 'Virtual'.<br> **cuando** hace clic directamente sobre la tarjeta de dicha tutoría virtual en la lista.<br> **entonces** el sistema reacciona levantando la superposición del modal 'Detalles de la Sesión'. La estructura del modal muestra la foto de perfil y nombre del tutor. De manera central, se renderiza el bloque 'ENLACE' mostrando el hipervínculo en color azul correspondiente a la plataforma de reunión. Se listan los datos (fecha, hora, tarifa, modalidad) y el bloque 'TU MENSAJE'. En la esquina inferior izquierda se presenta el botón "Cancelar Tutoría" (en texto rojo con ícono de papelera) y a la derecha el botón "Cerrar". |
| **Ver Detalle de Tutoría Presencial Próxima** | **Dado** que el estudiante se encuentra en la pantalla de Tutorías Agendadas y visualiza en la sección 'PRÓXIMAS' la tarjeta correspondiente a una tutoría configurada bajo la modalidad 'Presencial'.<br> **cuando** hace clic directamente sobre la tarjeta de dicha tutoría presencial en la lista.<br> **entonces** el sistema reacciona levantando la superposición del modal 'Detalles de la Sesión'. La estructura del modal se adapta y, en lugar del bloque de enlace, renderiza el bloque específico 'LUGAR' acompañado de un ícono de ubicación o mapa, detallando la dirección del encuentro. Se listan el resto de datos de la sesión y el mensaje. En la botonera de la parte inferior se mantiene la presencia de los botones "Cancelar Tutoría" y "Cerrar". |
| **Cierre de Modal de Detalle** | **Dado** que el estudiante se encuentra visualizando la ventana superpuesta del modal "Detalles de la Sesión" de una tutoría de la sección próximas.<br> **cuando** decide no interactuar con las opciones de la tutoría y hace clic en el botón "Cerrar" inferior o en el ícono de 'X' de la cabecera.<br> **entonces** el sistema captura la orden de salida, destruye el modal y despeja la pantalla, devolviendo el control total a la vista subyacente de la pantalla de Tutorías Agendadas. La lista de tutorías 'PRÓXIMAS' y 'ANTERIORES' se mantiene en la misma posición de scroll o vista en la que se encontraba originalmente antes del clic. |


## Frames del Prototipo

### E. Agenda

**Frame ID**: [1AYRwkw8eOlWPSA-A-JwpPPQc85DgnrFb](https://drive.google.com/file/d/1AYRwkw8eOlWPSA-A-JwpPPQc85DgnrFb/view?usp=drivesdk)

### E. Agenda (Detalle Tutoría Próxima)

**Frame ID**: [1o8zcjwaUdRPAYU_Zs5QHv586npADBIxo](https://drive.google.com/file/d/1o8zcjwaUdRPAYU_Zs5QHv586npADBIxo/view?usp=drivesdk)


## Observaciones

La HU11 abarca todo lo presentado en la pantalla "E. Agenda" a excepción de la sección inferior "Anteriores". La pantalla "E. Agenda (Detalle Tutoría Próxima)" representa el modal que muestra el detalle de la tutoría agendada, de dicho modal se excluye de la implementación el botón "Cancelar Tutoría".
