# HU08 - Aceptar solicitud de tutoría

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 5 |
| **Historia de Usuario** | Como tutor, quiero aceptar una solicitud para confirmar el agendamiento de la tutoría. |


---

# HU08 - Criterios de Aceptación

| Escenario | Descripción |
|---|---|
| **Abrir Modal Confirmar Tutoría (Virtual)** | **Dado** que el tutor se encuentra en la pantalla de Bandeja de Entrada y ha desplegado los detalles de una solicitud pendiente con modalidad 'Virtual'.<br> **cuando** hace clic en el botón "Aceptar".<br> **entonces** se superpone el modal "Confirmar Tutoría" mostrando el recuadro informativo con "Modalidad elegida: Virtual", el campo de texto obligatorio "Enlace de la reunión *" y los botones inferiores "Cancelar" y "Confirmar". |
| **Abrir Modal Confirmar Tutoría (Presencial)** | **Dado** que el tutor se encuentra en la pantalla de Bandeja de Entrada y ha desplegado los detalles de una solicitud pendiente con modalidad 'Presencial'.<br> **cuando** hace clic en el botón "Aceptar".<br> **entonces** se superpone el modal "Confirmar Tutoría" mostrando el recuadro informativo con "Modalidad elegida: Presencial", el campo de texto obligatorio "Lugar de encuentro *" con el contador "0/100" y los botones inferiores "Cancelar" y "Confirmar". |
| **Aceptación de Tutoría Virtual Exitosa** | **Dado** que el tutor se encuentra en el modal "Confirmar Tutoría" tras presionar el botón "Aceptar" en una solicitud de modalidad 'Virtual'.<br> **cuando** ingresa en el campo "Enlace de la reunión *": "https://zoom.us/j/123456789" y hace clic en el botón "Confirmar".<br> **entonces** la ventana modal se cierra. El sistema procesa la aceptación, cambiando internamente el estado a "Aceptada". En la vista base, la solicitud aceptada se elimina de la pestaña "Pendientes". El contador numérico del tab "Pendientes" se decrementa en 1 y el del tab "Respondidas" se incrementa en 1. |
| **Bloqueo Enlace de Reunión Obligatorio** | **Dado** que el tutor se encuentra en el modal "Confirmar Tutoría" de una solicitud de modalidad 'Virtual'.<br> **cuando** deja el campo "Enlace de la reunión *" completamente vacío y hace clic en el botón "Confirmar".<br> **entonces** el sistema impide la confirmación y el modal permanece abierto en pantalla. Inmediatamente debajo del campo, se renderiza el mensaje de error exacto en rojo: "El enlace de reunión es obligatorio.". |
| **Bloqueo Enlace de Reunión URL Inválida** | **Dado** que el tutor se encuentra en el modal "Confirmar Tutoría" de una solicitud de modalidad 'Virtual'.<br> **cuando** ingresa en el campo "Enlace de la reunión *": "zoom.us/j/1234" y hace clic en el botón "Confirmar".<br> **entonces** el sistema impide la confirmación y el modal permanece abierto. Inmediatamente debajo del campo, se renderiza el mensaje de error exacto en rojo: "Ingresa una URL válida (debe comenzar con https:// o http://).". |
| **Cancelación de Modal de Confirmación Virtual** | **Dado** que el tutor se encuentra en el modal "Confirmar Tutoría" de una solicitud de modalidad 'Virtual'.<br> **cuando** hace clic en el botón "Cancelar" situado en la parte inferior izquierda del modal.<br> **entonces** la ventana modal se cierra inmediatamente descartando la información ingresada. La pantalla de Bandeja de Entrada permanece inalterada, manteniendo la solicitud original en estado "Pendiente" y la fila completamente desplegada. |
| **Aceptación de Tutoría Presencial Exitosa** | **Dado** que el tutor se encuentra en el modal "Confirmar Tutoría" tras presionar el botón "Aceptar" en una solicitud de modalidad 'Presencial'.<br> **cuando** ingresa en el campo "Lugar de encuentro *": "Edificio H, Aula 205, Campus Principal" y hace clic en el botón "Confirmar".<br> **entonces** la ventana modal se cierra. El sistema procesa la aceptación, la solicitud se elimina de la pestaña "Pendientes", el contador numérico de "Pendientes" se decrementa en 1 y el de "Respondidas" se incrementa en 1. |
| **Bloqueo Lugar de Encuentro Obligatorio** | **Dado** que el tutor se encuentra en el modal "Confirmar Tutoría" de una solicitud de modalidad 'Presencial'.<br> **cuando** deja el campo "Lugar de encuentro *" completamente vacío y hace clic en el botón "Confirmar".<br> **entonces** el sistema impide la confirmación y el modal permanece abierto. Inmediatamente debajo del campo, se renderiza el mensaje de error exacto en rojo: "El lugar de encuentro es obligatorio.". |
| **Bloqueo Lugar de Encuentro Mínimo Caracteres** | **Dado** que el tutor se encuentra en el modal "Confirmar Tutoría" de una solicitud de modalidad 'Presencial'.<br> **cuando** ingresa en el campo "Lugar de encuentro *": "Aula 1" y hace clic en el botón "Confirmar".<br> **entonces** el sistema impide la confirmación y el modal permanece abierto. Inmediatamente debajo del campo, se renderiza el mensaje de error exacto en rojo: "Mínimo 10 caracteres para el lugar.". |
| **Bloqueo por Límite Máximo de Caracteres en Lugar** | **Dado** que el tutor se encuentra en el modal "Confirmar Tutoría" de una solicitud de modalidad 'Presencial'.<br> **cuando** ingresa en el campo "Lugar de encuentro *": "B" (letra repetida 101 veces sin espacios).<br> **entonces** el sistema bloquea el ingreso adicional de texto, el contador inferior muestra exactamente "100/100" y no se permite sobrepasar este límite visual ni funcionalmente. |
| **Cancelación de Modal de Confirmación Presencial** | **Dado** que el tutor se encuentra en el modal "Confirmar Tutoría" de una solicitud de modalidad 'Presencial'.<br> **cuando** hace clic en el botón "Cancelar" situado en la parte inferior izquierda del modal.<br> **entonces** la ventana modal se cierra inmediatamente descartando la información. La pantalla de Bandeja de Entrada permanece inalterada, manteniendo la solicitud original en estado "Pendiente" y la fila completamente desplegada. |


## Frames del Prototipo

### T. Bandeja de Entrada (Solicitud Pendiente Desplegada)

**Frame ID**: [175_OQOp1hzhvbnjFCkXa-sKJ9PQl6aN8](https://drive.google.com/file/d/175_OQOp1hzhvbnjFCkXa-sKJ9PQl6aN8/view?usp=drivesdk)

### T. Confirmar Tutoría

**Frame ID**: [1Y7INEa23mSe5HTg7zedwA5TU_H4f5I5R](https://drive.google.com/file/d/1Y7INEa23mSe5HTg7zedwA5TU_H4f5I5R/view?usp=drivesdk)


## Observaciones

Agregar únicamente el botón "Aceptar" visible en la pantalla "T. Bandeja de Entrada (Solicitud Pendiente Desplegada)" acompañado del modal "T. Confirmar Tutoría". Recordar que el campo a llenar en el modal para confirmar la tutoría depende de la modalidad de la oferta. Es decir, si la modalidad de la oferta es "Virtual" el nombre del campo que se presenta es "Enlace de la reunión" y si la modalidad de la oferta es "Presencial" el nombre del campo es "Lugar de encuentro".
