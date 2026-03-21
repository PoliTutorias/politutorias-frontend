# HU15 - Ver tutorías agendadas del tutor

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 13 |
| **Historia de Usuario** | Como tutor, quiero ver mis tutorías agendadas para recordar cuando tengo que impartir las tutorías. |


---

# HU15 - Criterios de Aceptación

| Escenario | Descripción |
|---|---|
| **Navegación a Mi Agenda** | **Dado** que el tutor se encuentra autenticado operando en la plataforma PoliTutorias.<br> **cuando** ubica el cursor y hace clic sobre el enlace 'Mi Agenda' en la barra de navegación global superior.<br> **entonces** el sistema enruta y carga la vista principal de la agenda. Se visualiza el título 'Mi Agenda' y el subtítulo 'Calendario de sesiones confirmadas'. El enlace 'Mi Agenda' en el menú superior queda marcado con un resaltado amarillo indicando la ubicación activa. La vista se divide en dos columnas: la izquierda muestra el calendario mensual con indicadores textuales en los días agendados, y la columna derecha (panel lateral) muestra el resumen 'ESTE MES' informando el conteo total y listando en tarjetas las tutorías en orden cronológico separadas por días. |
| **Actualizar Panel al Seleccionar Día** | **Dado** que el tutor se encuentra en la pantalla de Mi Agenda observando el calendario mensual con datos cargados, donde se evidencian días específicos que contienen etiquetas de sesiones confirmadas.<br> **cuando** el tutor posiciona el cursor y hace clic sobre el cuadro numérico correspondiente a un día específico en el calendario.<br> **entonces** el panel lateral derecho reacciona a la selección e inmediatamente actualiza su cabecera para mostrar la fecha específica seleccionada junto al recuento de sesiones de ese día. El bloque de tarjetas 'ESTE MES' se desplaza hacia abajo y en la parte superior del panel se renderiza la tarjeta resumen del día seleccionado (con fondo amarillo claro, borde resaltado y el texto 'Toca para ver detalles →'). |
| **Ver Detalle Tutoría Virtual Pendiente** | **Dado** que el tutor se encuentra en la pantalla de Mi Agenda, interactúa con el calendario seleccionando un día y el panel derecho visualiza la tarjeta resumen de una tutoría confirmada cuya modalidad es 'Virtual'.<br> **cuando** hace clic sobre la tarjeta resumen de la sesión en el panel lateral derecho.<br> **entonces** el sistema bloquea la vista de fondo y abre el modal 'Detalles de la Sesión'. El contenido del modal renderiza obligatoriamente la información del estudiante asociado, y un bloque titulado "ENLACE" que presenta la URL en color azul. Adicionalmente, se muestran los bloques de la materia (fecha, hora, modalidad y precio) y el 'MENSAJE DEL ESTUDIANTE'. La botonera inferior del modal despliega el botón "Cancelar Tutoría" (texto rojo y papelera) a la izquierda, y el botón "Cerrar" a la derecha. |
| **Ver Detalle Tutoría Presencial Pendiente** | **Dado** que el tutor se encuentra en la pantalla de Mi Agenda, interactúa con el calendario seleccionando un día y el panel derecho visualiza la tarjeta resumen de una tutoría confirmada cuya modalidad es 'Presencial'.<br> **cuando** hace clic sobre la tarjeta resumen de la sesión en el panel lateral derecho.<br> **entonces** el sistema abre el modal 'Detalles de la Sesión'. El contenido estructural difiere renderizando la información del estudiante asociado y un bloque específico titulado "LUGAR" (acompañado de un ícono de ubicación) que expone la dirección física del encuentro. Los bloques de materia (marcando 'Presencial') y mensaje se mantienen. La botonera inferior del modal despliega el botón "Cancelar Tutoría" (texto rojo y papelera) y el botón "Cerrar". |
| **Ver Detalle Tutoría Completada** | **Dado** que el tutor se encuentra en la pantalla de Mi Agenda, observa en el calendario que las sesiones de fechas pasadas se marcan en color gris claro, selecciona dicho día, y visualiza la tarjeta en el panel derecho.<br> **cuando** hace clic sobre la tarjeta de la sesión correspondiente a una fecha ya pasada (estado 'Completada').<br> **entonces** el sistema abre el modal 'Detalles de la Sesión'. En la cabecera interna del modal se inyecta un bloque de ancho completo con fondo gris claro que contiene el texto exacto: 'Tutoría completada. Esta tutoría ya se realizó. Solo puedes ver los detalles.'. Se renderizan debajo los datos habituales de la sesión. En la botonera inferior del modal se restringe la acción destructiva, renderizando de manera aislada y exclusiva el botón "Cerrar". |
| **Cerrar Detalles de la Sesión** | **Dado** que el tutor se encuentra interactuando con el modal 'Detalles de la Sesión' en modo solo lectura correspondiente a una tutoría ya pasada (Completada).<br> **cuando** hace clic en el botón "Cerrar" en la esquina inferior derecha o en el ícono 'X' en la esquina superior derecha del modal.<br> **entonces** la acción de cerrado se ejecuta, la capa del modal es destruida y la pantalla principal de Mi Agenda recupera el foco. Visualmente, el calendario mensual y el panel lateral derecho preservan el estado exacto (día seleccionado, tarjetas mostradas) que tenían justo antes de disparar la apertura del modal. |
| **Cerrar Detalle Tutoría Pendiente** | **Dado** que el tutor se encuentra interactuando con el modal 'Detalles de la Sesión' de una tutoría futura (Pendiente).<br> **cuando** hace clic en el botón "Cerrar" en la esquina inferior derecha o en el ícono 'X' en la esquina superior derecha del modal.<br> **entonces** la acción de cerrado sin cambios se ejecuta, el modal desaparece de la vista y la pantalla principal de Mi Agenda recupera el foco conservando el día previamente seleccionado en el calendario y la vista del panel derecho intacta. |
| **Iniciar Cancelación de Tutoría** | **Dado** que el tutor se encuentra interactuando con el modal 'Detalles de la Sesión' de una tutoría futura (Pendiente) que contiene habilitado el botón de acción destructiva.<br> **cuando** hace clic explícitamente sobre el botón con texto rojo "Cancelar Tutoría" en la parte inferior izquierda del modal.<br> **entonces** el sistema intercepta el clic, procede a cerrar la vista actual del modal 'Detalles de la Sesión', y de manera inmediata dispara el flujo lógico de cancelación de tutorías en el sistema, lo cual obliga al tutor a seleccionar un motivo justificado antes de poder retornar a la vista base de la agenda. |


## Frames del Prototipo

### T. Mi Agenda (Sesiones del mes desplegadas)

**Frame ID**: [1HzPSCjk1RCjm5nL-Yh_MCj8tSmFxBNgo](https://drive.google.com/file/d/1HzPSCjk1RCjm5nL-Yh_MCj8tSmFxBNgo/view?usp=drivesdk)

### T. Mi Agenda (Detalle Tutoría)

**Frame ID**: [1IRaNDUewH1sVlIi-K7XPIxO1_xbwubY6](https://drive.google.com/file/d/1IRaNDUewH1sVlIi-K7XPIxO1_xbwubY6/view?usp=drivesdk)


## Observaciones

La HU15 abarca todo lo presentado en la pantalla "T. Mi Agenda (Sesiones del mes desplegadas)". La pantalla "T. Mi Agenda (Detalle Tutoría)" representa el modal que muestra el detalle de una tutoría agendada. Revisar las reglas de negocio para la presentación de la información, recordando que las tutorías solo se pueden solicitar para la semana en curso.
