# HU06 - Enviar solicitud de tutoría

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 13 |
| **Historia de Usuario** | Como estudiante, quiero enviar una solicitud para agendar una tutoría. |


---

# HU06 - Criterios de Aceptación

| Escenario | Descripción |
|---|---|
| **Bloqueo por Horario No Seleccionado** | **Dado** que el estudiante se encuentra autenticado y en la pantalla de Detalle de Oferta de una tutoría.<br> **cuando** no ha seleccionado ningún chip de horario en la sección "Disponibilidad Semanal".<br> **entonces** el botón "Solicitar Tutoría" se muestra en un estado visual deshabilitado, impidiendo la interacción del usuario para abrir el modal de solicitud. |
| **Bloqueo por Solicitud Previa** | **Dado** que el estudiante se encuentra en la pantalla de Detalle de Oferta, ha seleccionado el horario de las "14:00" del día "Miércoles" en la sección "Disponibilidad Semanal" y ya tiene una solicitud activa previa para ese mismo horario.<br> **cuando** hace clic en el botón "Solicitar Tutoría".<br> **entonces** el sistema bloquea el modal y visualiza una alerta con el texto exacto: "Horario ya solicitado. Ya tienes una solicitud activa para Miércoles 14:00." |
| **Abrir Modal Solicitar Tutoría (Una Modalidad)** | **Dado** que el estudiante se encuentra en la pantalla de Detalle de Oferta de una tutoría con una única modalidad configurada y ha seleccionado el horario "Lunes 9 mar · 14:00".<br> **cuando** hace clic en el botón "Solicitar Tutoría (1)".<br> **entonces** se superpone el modal "Solicitar Tutoría" mostrando la foto y nombre del tutor, el chip de "Horarios seleccionados", el campo de texto "Mensaje para el tutor *" con el contador "0/500", el botón "Cancelar" y el botón "Enviar Solicitud". No se visualiza selector de modalidad. |
| **Abrir Modal Solicitar Tutoría (Dual Modalidad)** | **Dado** que el estudiante se encuentra en la pantalla de Detalle de Oferta de una tutoría con modalidades "Virtual/Presencial" configuradas y ha seleccionado el horario "Lunes 9 mar · 14:00".<br> **cuando** hace clic en el botón "Solicitar Tutoría (1)".<br> **entonces** se superpone el modal "Solicitar Tutoría" mostrando la información del tutor, los "Horarios seleccionados", la sección obligatoria "Modalidad *" con los botones "Virtual" y "Presencial", el campo de texto "Mensaje para el tutor *" con el contador "0/500", el botón "Cancelar" y el botón "Enviar Solicitud". |
| **Solicitud Exitosa (Una Modalidad)** | **Dado** que el estudiante se encuentra en el modal "Solicitar Tutoría" (sin selector de modalidad) tras haber seleccionado horarios disponibles.<br> **cuando** ingresa en el campo "Mensaje para el tutor *": "Requiero ayuda urgente con este tema para mi examen." y hace clic en "Enviar Solicitud".<br> **entonces** el modal se cierra y se visualiza en la pantalla principal una notificación de éxito con el texto exacto: "¡Solicitud enviada! 1 horario propuesto. El tutor revisará tu solicitud pronto." |
| **Mensaje Obligatorio (Una Modalidad)** | **Dado** que el estudiante se encuentra en el modal "Solicitar Tutoría" (sin selector de modalidad).<br> **cuando** deja el campo "Mensaje para el tutor *" completamente vacío y hace clic en "Enviar Solicitud".<br> **entonces** el sistema impide el envío, el borde del campo "Mensaje para el tutor *" cambia a color rojo y justo debajo se muestra el mensaje de error exacto: "El mensaje es obligatorio." |
| **Modalidad Obligatoria (Dual)** | **Dado** que el estudiante se encuentra en el modal "Solicitar Tutoría" con las opciones de modalidad "Virtual/Presencial" visibles.<br> **cuando** deja la sección "Modalidad *" sin seleccionar, ingresa en el campo "Mensaje para el tutor *": "Necesito repasar integrales." y hace clic en "Enviar Solicitud".<br> **entonces** el sistema impide el envío y justo debajo de los botones de selección "Virtual" y "Presencial" se muestra el mensaje de error exacto en color rojo: "Selecciona la modalidad". |
| **Solicitud Exitosa (Dual Modalidad)** | **Dado** que el estudiante se encuentra en el modal "Solicitar Tutoría" con las opciones de modalidad "Virtual/Presencial" visibles.<br> **cuando** selecciona el botón "Virtual" en la sección "Modalidad *", ingresa en el campo "Mensaje para el tutor *": "Necesito repasar integrales." y hace clic en "Enviar Solicitud".<br> **entonces** el modal se cierra y se visualiza una notificación de éxito con el texto exacto: "¡Solicitud enviada! 1 horario propuesto. El tutor revisará tu solicitud pronto." |
| **Mensaje Obligatorio (Dual - Modalidad Seleccionada)** | **Dado** que el estudiante se encuentra en el modal "Solicitar Tutoría" con las opciones de modalidad "Virtual/Presencial" visibles.<br> **cuando** selecciona el botón "Presencial" en la sección "Modalidad *", deja el campo "Mensaje para el tutor *" completamente vacío y hace clic en "Enviar Solicitud".<br> **entonces** el sistema impide el envío, el borde del campo "Mensaje para el tutor *" cambia a color rojo y justo debajo se muestra el mensaje de error exacto: "El mensaje es obligatorio." |
| **Mensaje Y Modalidad Obligatorios (Dual)** | **Dado** que el estudiante se encuentra en el modal "Solicitar Tutoría" con las opciones de modalidad "Virtual/Presencial" visibles.<br> **cuando** deja la sección "Modalidad *" sin seleccionar, deja el campo "Mensaje para el tutor *" vacío y hace clic en "Enviar Solicitud".<br> **entonces** el sistema impide el envío, debajo de los botones de selección se muestra en rojo "Selecciona la modalidad", y el borde del campo "Mensaje para el tutor *" cambia a color rojo mostrando debajo "El mensaje es obligatorio." |
| **Bloqueo por Límite Máximo de Caracteres en Mensaje** | **Dado** que el estudiante se encuentra en el modal "Solicitar Tutoría".<br> **cuando** ingresa en el campo "Mensaje para el tutor *": "A" (letra repetida 501 veces sin espacios).<br> **entonces** el sistema bloquea el ingreso adicional de texto, el contador inferior muestra exactamente "500/500" y no se permite sobrepasar este límite visual ni funcionalmente al teclear. |


## Frames del Prototipo

### E. Detalle Oferta (Horario Seleccionado)

**Frame ID**: [121EoamAN4UsvT6iHK2JE0eIUssQyaeUJ](https://drive.google.com/file/d/121EoamAN4UsvT6iHK2JE0eIUssQyaeUJ/view?usp=drivesdk)

### E. Solicitar Tutoria (Una Modalidad)

**Frame ID**: [1Me4VFPOOC3q3xFUAkwYjBzIG0EF0d2ro](https://drive.google.com/file/d/1Me4VFPOOC3q3xFUAkwYjBzIG0EF0d2ro/view?usp=drivesdk)

### E. Solicitar Tutoria (Lleno)

**Frame ID**: [1jKEOVqDn167pxvYZx8N-L6eFTx9EO5Eo](https://drive.google.com/file/d/1jKEOVqDn167pxvYZx8N-L6eFTx9EO5Eo/view?usp=drivesdk)


## Observaciones

Considerar que para iniciar una solicitud se debe seleccionar al menos una hora de la lista disponible de la sección "Disponibilidad Semanal" del tutor. Considerar que el diseño de pantalla "E. Solicitar Tutoria (Una Modalidad)" se presenta cuando la oferta se ofrece en una ÚNICA modalidad. Por otro lado, considerar el diseño de pantalla "E. Solicitar Tutoria (Lleno)" cuando la oferta se ofrece en modalidad dual, es decir tanto virtual como presencial (la etiqueta para esta modalidad es Virtual/Presencial).  Además, considerar las reglas de negocio: 
[Reglas de Negocio (IA) - Overview](https://dev.azure.com/DTIC-2025-B/PoliTutoriasAI/_wiki/wikis/PoliTutorias%20AI/1236/Reglas-de-Negocio-(IA))
