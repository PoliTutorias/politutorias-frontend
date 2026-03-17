# HU33 - Ver solicitudes de tutoría enviadas

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 5 |
| **Historia de Usuario** | Como estudiante, quiero ver las solicitudes que he enviado para saber qué servicios he solicitado. |


---

# HU33 - Criterios de Aceptación

| Escenario | Descripción |
|---|---|
| **Visualización Filtro Todas** | **Dado** que el estudiante se encuentra autenticado y navega a la pantalla principal de Mis Solicitudes.<br> **cuando** hace clic en la pestaña superior "Todas (16)".<br> **entonces** la pestaña seleccionada cambia a un estado activo (fondo oscuro, texto blanco). En el área de contenido, el sistema renderiza una lista de tarjetas que combina visualmente solicitudes en estado Pendiente, Aceptada, Rechazada y Expirada. Cada tarjeta muestra de forma obligatoria el avatar, materia, tutor, fecha/hora, modalidad, precio, y la respectiva etiqueta de estado en la esquina superior derecha. |
| **Visualización Filtro Pendientes** | **Dado** que el estudiante se encuentra en la pantalla de Mis Solicitudes.<br> **cuando** hace clic en la pestaña "Pendientes (1)".<br> **entonces** la pestaña seleccionada cambia a estado activo. El sistema filtra la lista principal y renderiza únicamente las tarjetas correspondientes a solicitudes en curso. En todas las tarjetas visibles, la esquina superior derecha contiene el tag "Pendiente" (texto naranja, ícono de reloj, fondo naranja claro). |
| **Visualización Filtro Aceptadas** | **Dado** que el estudiante se encuentra en la pantalla de Mis Solicitudes.<br> **cuando** hace clic en la pestaña "Aceptadas (7)".<br> **entonces** la pestaña seleccionada cambia a estado activo. El sistema filtra la lista principal y renderiza únicamente las tarjetas donde el tutor ha dado confirmación. En todas las tarjetas visibles, la esquina superior derecha contiene el tag "Aceptada" (texto oscuro, ícono de check, fondo gris claro). |
| **Visualización Filtro Rechazadas** | **Dado** que el estudiante se encuentra en la pantalla de Mis Solicitudes.<br> **cuando** hace clic en la pestaña "Rechazadas (2)".<br> **entonces** la pestaña seleccionada cambia a estado activo. El sistema filtra la lista principal y renderiza únicamente las tarjetas declinadas por el tutor. En todas las tarjetas visibles, la esquina superior derecha contiene el tag "Rechazada" (texto gris oscuro, ícono de cruz, fondo gris claro). |
| **Visualización Filtro Expiradas** | **Dado** que el estudiante se encuentra en la pantalla de Mis Solicitudes.<br> **cuando** hace clic en la pestaña "Expiradas (6)".<br> **entonces** la pestaña seleccionada cambia a estado activo. El sistema filtra la lista principal y renderiza únicamente las tarjetas que superaron la regla de tiempo. Visualmente, todas las tarjetas mostradas presentan una franja lateral izquierda color rojo y en la esquina superior derecha contienen el tag "Expirada" (texto rojo, ícono de reloj, fondo rojo claro). |
| **Ver Detalle Solicitud Pendiente** | **Dado** que el estudiante se encuentra en la vista de Mis Solicitudes y visualiza en su lista una tarjeta con el tag de estado "Pendiente".<br> **cuando** hace clic sobre cualquier parte de esa tarjeta de solicitud.<br> **entonces** el sistema superpone en la pantalla el modal "Detalle de la Solicitud". El modal despliega el resumen del tutor, el bloque informativo de la tutoría, y el recuadro "TU MENSAJE" con el texto original enviado. En la parte inferior, se muestra el botón "Cancelar Solicitud" (visualmente inactivo/gris) y el botón "Cerrar". |
| **Ver Detalle Solicitud Aceptada** | **Dado** que el estudiante se encuentra en la vista de Mis Solicitudes y visualiza en su lista una tarjeta con el tag de estado "Aceptada".<br> **cuando** hace clic sobre cualquier parte de esa tarjeta de solicitud.<br> **entonces** el sistema superpone el modal "Detalle de la Solicitud". En la cabecera del modal se visualiza el tag "Aceptada". El cuerpo del modal incluye obligatoriamente el recuadro de confirmación ("LUGAR" o "ENLACE") con los datos provistos por el tutor, seguido de los detalles de la materia y el recuadro "TU MENSAJE". En la parte inferior se renderizan los botones "Cancelar Tutoría" (botón activo con texto rojo y papelera) y "Cerrar". |
| **Ver Detalle Solicitud Rechazada** | **Dado** que el estudiante se encuentra en la vista de Mis Solicitudes y visualiza en su lista una tarjeta con el tag de estado "Rechazada".<br> **cuando** hace clic sobre cualquier parte de esa tarjeta de solicitud.<br> **entonces** el sistema superpone el modal "Detalle de la Solicitud". En la cabecera del modal se visualiza el tag "Rechazada". El cuerpo del modal muestra los detalles de la materia, el recuadro "TU MENSAJE", y justo debajo, renderiza un recuadro con fondo gris claro titulado "MOTIVO DE RECHAZO" conteniendo la justificación del tutor. En la parte inferior únicamente se muestra el botón "Cerrar". |
| **Ver Detalle Solicitud Expirada** | **Dado** que el estudiante se encuentra en la vista de Mis Solicitudes y visualiza en su lista una tarjeta con el tag de estado "Expirada".<br> **cuando** hace clic sobre cualquier parte de esa tarjeta de solicitud.<br> **entonces** el sistema superpone el modal "Detalle de la Solicitud". En la cabecera del modal se visualiza el tag "Expirada" (rojo). El modal opera en modo solo lectura, mostrando la información base de la tutoría solicitada. En la parte inferior únicamente se muestra el botón "Cerrar". |
| **Mostrar Paginación** | **Dado** que el estudiante navega a la pantalla de Mis Solicitudes y hace clic en la pestaña "Todas (16)" cuyo contador numérico indica que existen más de 5 registros asociados.<br> **cuando** la aplicación termina de cargar y renderizar la lista inicial de las primeras 5 tarjetas.<br> **entonces** el sistema renderiza automáticamente en la parte inferior de la lista (debajo de la última tarjeta visible) la barra de paginación numérica '< 1 2 3 4 >' que permite navegar entre las páginas, resaltando el número de la página activa dentro de un recuadro oscuro. |


## Frames del Prototipo

### E. Mis Solicitudes 4

**Frame ID**: [1RVqVF0YEXJvS0ZItB2cEPKo9Bx6fnuUa](https://drive.google.com/file/d/1RVqVF0YEXJvS0ZItB2cEPKo9Bx6fnuUa/view?usp=drivesdk)

### E. Detalle Solicitud (Pendiente)

**Frame ID**: [1K34R1p_z2v8s7kyWPM3mUfcZlfFYDUaJ](https://drive.google.com/file/d/1K34R1p_z2v8s7kyWPM3mUfcZlfFYDUaJ/view?usp=drivesdk)

### E. Mis Solicitudes 1

**Frame ID**: [11kh9PQsY6-FSB0RiA_X6DrM6i2HMQGCE](https://drive.google.com/file/d/11kh9PQsY6-FSB0RiA_X6DrM6i2HMQGCE/view?usp=drivesdk)


## Observaciones

La HU33 abarca las pestañas "Todas", "Pendientes" y "Expiradas". La pestaña "Pendientes" está representada por la pantalla "E. Mis Solicitudes 4". La pantalla "E. Detalle Solicitud (Pendiente)" presenta el detalle de la solicitud "Pendiente" de dónde se descarta el botón "Cancelar Solicitud". La pestaña "Todas" está representada por la pantalla "E. Mis Solicitudes 1" que lista a las solicitudes con los siguientes estados: Aceptada, Rechazada, Expiradas y Pendientes, pero que para la HU33 solo va a listar las solicitudes de estado "Pendiente" y "Expirada" DESCARTANDO las solicitudes de estado "Aceptada" y "Rechazada". La pantalla "E. Detalle Solicitud (Expirada)" presenta el detalle de la solicitud "Expirada".
