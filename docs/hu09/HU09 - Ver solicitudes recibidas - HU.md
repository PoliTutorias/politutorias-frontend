# HU09 - Ver solicitudes recibidas

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 5 |
| **Historia de Usuario** | Como tutor, quiero ver las solicitudes de tutoría que he recibido para enterarme de los estudiantes que necesitan mi ayuda. |


---

# HU09 - Criterios de Aceptación

| Escenario | Descripción |
|---|---|
| **Visualización Inicial de Pendientes** | **Dado** que el usuario tutor se encuentra autenticado en el sistema y tiene en su base de datos al menos una solicitud dirigida a él en estado "Pendiente".<br>**cuando** hace clic en la opción "Bandeja" en la barra de navegación superior.<br>**entonces** el sistema carga la pantalla principal de la Bandeja de Entrada. La barra superior muestra el indicador de '3 pendientes'. La pestaña 'Pendientes (3)' se muestra activa (fondo oscuro, texto blanco). Se listan las solicitudes en formato de tabla (ESTUDIANTE, MATERIA, FECHA/HORA, MENSAJE, ESTADO) mostrando filas colapsadas con el tag de estado 'Pendiente' (texto naranja, fondo claro) e ícono de flecha hacia abajo a la derecha. |
| **Visualización Inicial sin Pendientes** | **Dado** que el usuario tutor se encuentra autenticado en el sistema y NO tiene ninguna solicitud en estado "Pendiente".<br>**cuando** hace clic en la opción "Bandeja" en la barra de navegación superior.<br>**entonces** el sistema carga la pantalla de Bandeja de Entrada. El indicador global muestra '0 pendientes'. La pestaña 'Pendientes (0)' se muestra activa. Las cabeceras de la tabla se ocultan y en el área central de la pantalla se visualiza el texto exacto: "No hay solicitudes pendientes.". |
| **Visualización Inicial de Expiradas** | **Dado** que el tutor se encuentra en la pantalla de Bandeja de Entrada y el sistema registra solicitudes que superaron el tiempo límite pasando a estado "Expirada".<br>**cuando** hace clic en la pestaña 'Expiradas (14)'.<br>**entonces** la pestaña 'Expiradas (14)' se vuelve activa (fondo oscuro, texto blanco). Se visualizan las cabeceras de la tabla y se lista la información de las solicitudes expiradas con el tag de estado 'Expirada' (texto rojo) e ícono de flecha hacia abajo. |
| **Visualización Inicial sin Expiradas** | **Dado** que el tutor se encuentra en la pantalla de Bandeja de Entrada y NO existen solicitudes en estado "Expirada" en el sistema.<br>**cuando** hace clic en la pestaña 'Expiradas (0)'.<br>**entonces** la pestaña 'Expiradas (0)' se vuelve activa. Las cabeceras de la tabla se ocultan y en el área central de la pantalla se visualiza el texto exacto: "No hay solicitudes expiradas.". |
| **Cambio a Pestaña Pendientes** | **Dado** que el tutor se encuentra en la pantalla de Bandeja de Entrada con la pestaña 'Expiradas' o 'Respondidas' actualmente activa, y el sistema registra solicitudes en estado "Pendiente".<br>**cuando** hace clic en la pestaña 'Pendientes (3)'.<br>**entonces** la interfaz actualiza su vista, marcando 'Pendientes (3)' como activa (fondo oscuro, texto blanco) y mostrando nuevamente las cabeceras de la tabla junto con la lista de filas de solicitudes en estado 'Pendiente' colapsadas. |
| **Desplegar Solicitud Pendiente** | **Dado** que el tutor se encuentra en la pantalla de Bandeja de Entrada visualizando la pestaña 'Pendientes (3)' y observa la fila colapsada de la solicitud de 'Valeria Sánchez'.<br>**cuando** hace clic en cualquier parte de la fila correspondiente a 'Valeria Sánchez'.<br>**entonces** la fila seleccionada se expande verticalmente. Debajo de la información base aparecen los detalles: ícono y texto de modalidad 'Virtual', precio '$10/h', y el bloque 'MENSAJE DEL ESTUDIANTE' con el texto completo. En la parte inferior derecha de la fila expandida se visualizan los botones de acción "Aceptar" (fondo oscuro) y "Rechazar" (fondo blanco). El ícono de flecha de la fila cambia apuntando hacia arriba. |
| **Colapsar Solicitud Pendiente** | **Dado** que el tutor se encuentra en la pantalla de Bandeja de Entrada, pestaña 'Pendientes (3)', y la fila de la solicitud de 'Valeria Sánchez' se encuentra actualmente expandida.<br>**cuando** hace clic nuevamente sobre la información de la fila de 'Valeria Sánchez' o en su ícono de flecha hacia arriba.<br>**entonces** la fila seleccionada se contrae. Se ocultan los detalles de modalidad, precio, el mensaje completo y los botones "Aceptar" y "Rechazar". La fila vuelve a su estado de resumen inicial con la flecha apuntando hacia abajo. |
| **Desplegar Solicitud Expirada** | **Dado** que el tutor se encuentra en la pantalla de Bandeja de Entrada visualizando la pestaña 'Expiradas (14)' y observa la fila colapsada de la solicitud de 'Diego Castillo'.<br>**cuando** hace clic en cualquier parte de la fila correspondiente a 'Diego Castillo'.<br>**entonces** la fila se expande verticalmente. Aparecen los detalles de modalidad 'Presencial', precio '$8/h' y el bloque 'MENSAJE DEL ESTUDIANTE' con el texto completo. El ícono de flecha cambia apuntando hacia arriba. NO se visualizan botones de acción en esta vista. |
| **Colapsar Solicitud Expirada** | **Dado** que el tutor se encuentra en la pantalla de Bandeja de Entrada, pestaña 'Expiradas (14)', y la fila de la solicitud de 'Diego Castillo' se encuentra actualmente expandida.<br>**cuando** hace clic nuevamente sobre la fila de 'Diego Castillo' o en su ícono de flecha hacia arriba.<br>**entonces** la fila seleccionada se contrae, ocultando los detalles adicionales y retornando al estado de resumen inicial con la flecha apuntando hacia abajo. |


## Frames del Prototipo

### T. Bandeja de Entrada (Solicitud Pendiente Desplegada)

**Frame ID**: [175_OQOp1hzhvbnjFCkXa-sKJ9PQl6aN8](https://drive.google.com/file/d/175_OQOp1hzhvbnjFCkXa-sKJ9PQl6aN8/view?usp=drivesdk)

### T. Bandeja de Entrada (Solicitud Expirada Desplegada)

**Frame ID**: [1YaT5RpwBkGpcdqufL4HNKXINiIh-EjFB](https://drive.google.com/file/d/1YaT5RpwBkGpcdqufL4HNKXINiIh-EjFB/view?usp=drivesdk)


## Observaciones

La HU09 abarca las pestañas "Pendientes" y "Expiradas" presentadas en las pantallas "T. Bandeja de Entrada (Solicitud Pendiente Desplegada)" y "T. Bandeja de Entrada (Solicitud Expirada Desplegada)". Se descartan para esta HU09 los botones "Aceptar" y "Rechazar" que aparecen en la parte inferior al desplegar el detalle de la solicitud en la pestaña de "Pendientes". Así también se descarta totalmente la pestaña "Respondidas".
