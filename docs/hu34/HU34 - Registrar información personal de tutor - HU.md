# HU34 - Registrar información personal de tutor

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 8 SP |
| **Historia de Usuario** | Como tutor, quiero registrar información personal para generar confianza en los estudiantes. |


---

# HU34 - Criterios de Aceptación

| Escenario | Descripción |
|---|---|
| **Registro exitoso de Datos Básicos** | **Dado** que el tutor se encuentra en la interfaz de "Completa tu Perfil<br>**cuando** ingresa en el campo 'Nombre Completo': 'Daniela Castro', ingresa en el campo 'Número de WhatsApp': '593991234567', selecciona en el dropdown 'Facultad': 'FIS - Sistemas', selecciona en el dropdown 'Semestre Actual': '4° Semestre', ingresa en el campo 'Biografía Corta': 'Tengo 5 años de experiencia en desarrollo de software y disfruto enseñar algoritmos.', y hace clic en el botón 'Siguiente Disponibilidad'<br>**entonces** el sistema redirige a '2 Disponibilidad' resaltado, el título 'Define tu Horario', el subtítulo 'Selecciona los bloques horarios en los que puedes dar clases', una cuadrícula con encabezados ('Lun' a 'Dom', '7:00' a '20:00') y el botón 'Siguiente Perfil Profesional'. |
| **Validación de campos obligatorios vacíos** | **Dado** que el tutor se encuentra en la interfaz de "Completa tu Perfil" <br>**cuando** deja los campos 'Nombre Completo', 'Número de WhatsApp', 'Facultad', 'Semestre Actual', y 'Biografía Corta' vacíos, y hace clic en el botón 'Siguiente Disponibilidad'<br>**entonces** el sistema permanece en la pantalla, muestra el mensaje de error 'El nombre es obligatorio' debajo de 'Nombre Completo', el mensaje de error 'El número de WhatsApp es obligatorio' debajo de 'Número de WhatsApp', el mensaje de error 'Selecciona tu facultad' debajo del dropdown 'Facultad', el mensaje de error 'Selecciona tu semestre' debajo del dropdown 'Semestre Actual', y el mensaje de error 'La biografía es obligatoria' debajo de 'Biografía Corta'. |
| **Validación de Nombre Completo - Mínimo de caracteres** | **Dado** que el tutor se encuentra en la interfaz de "Completa tu Perfil" <br>**cuando** ingresa en el campo 'Nombre Completo': 'Jo', y hace clic en el botón 'Siguiente Disponibilidad'<br>**entonces** el sistema permanece en la pantalla y muestra el mensaje en rojo 'Mínimo 3 caracteres' debajo de 'Nombre Completo'. |
| **Validación de Nombre Completo - Máximo de caracteres** | **Dado** que el tutor se encuentra en la interfaz de "Completa tu Perfil" <br>**cuando** ingresa en el campo 'Nombre Completo' 'Este es un nombre muy largo que definitivamente excede los sesenta caracteres para una prueba de longitud máxima' que excede los 60 caracteres <br>**entonces** el sistema limita el ingreso a 60 caracteres, muestra el contador '60/60' debajo del campo 'Nombre Completo', y no permite más digitación ni pegar texto. |
| **Validación de Nombre Completo - Caracteres no permitidos** | **Dado** que el tutor se encuentra en la interfaz de "Completa tu Perfil" <br>**cuando** intenta ingresar números o caracteres especiales (ej: 'Juan123$' o 'María@!') en el campo 'Nombre Completo', y hace clic en el botón 'Siguiente Disponibilidad'<br>**entonces** el sistema bloquea el ingreso, y los caracteres no permitidos (números y especiales) no aparecen en la pantalla, permitiendo solo letras y espacios. |
| **Validación de Número de WhatsApp - Mínimo de dígitos** | **Dado** que el tutor se encuentra en la interfaz de "Completa tu Perfil" <br>**cuando** ingresa en el campo 'Número de WhatsApp' un número con menos de 10 dígitos (ej: '593991234'), y hace clic en el botón 'Siguiente Disponibilidad'<br>**entonces** el sistema permanece en la pantalla y muestra el mensaje en rojo 'Ingresa un número válido (10-13 dígitos)' debajo del campo 'Número de WhatsApp'. |
| **Validación de Número de WhatsApp - Máximo de dígitos** | **Dado** que el tutor se encuentra en la interfaz de "Completa tu Perfil" <br>**cuando** ingresa en el campo 'Número de WhatsApp' un número con más de 13 dígitos (ej: '59399123456789'), y hace clic en el botón 'Siguiente Disponibilidad'<br>**entonces** el sistema permanece en la pantalla y muestra el mensaje en rojo 'Ingresa un número válido (10-13 dígitos)' debajo del campo 'Número de WhatsApp'. |
| **Validación de Número de WhatsApp - Caracteres no numéricos** | **Dado** que el tutor se encuentra en la interfaz de "Completa tu Perfil" <br>**cuando** intenta ingresar letras o caracteres especiales (ej: '593abcd123' o '593-99123') en el campo 'Número de WhatsApp', y hace clic en el botón 'Siguiente Disponibilidad'<br>**entonces** el sistema bloquea el ingreso, y las letras y caracteres especiales no aparecen en la pantalla, permitiendo solo números. |
| **Validación de Biografía Corta - Mínimo de caracteres** | **Dado** que el tutor se encuentra en la interfaz de "Completa tu Perfil" <br>**cuando** ingresa en el campo 'Biografía Corta' un texto con menos de 20 caracteres (ej: 'Soy un tutor nuevo.'), y hace clic en el botón 'Siguiente Disponibilidad'<br>**entonces** el sistema permanece en la pantalla y muestra el mensaje en rojo 'Mínimo 20 caracteres' debajo de 'Biografía Corta'. |
| **Validación de Biografía Corta - Máximo de caracteres** | **Dado** que el tutor se encuentra en la interfaz de "Completa tu Perfil"<br>**cuando** ingresa en el campo 'Biografía Corta' 'Este es un texto de biografía muy extenso diseñado específicamente para superar el límite de trescientos caracteres y comprobar que el sistema bloquea correctamente cualquier intento de ingreso adicional una vez alcanzado el tope máximo permitido por el contador' que excede los 300 caracteres<br>**entonces** el sistema limita el ingreso a 300 caracteres, muestra el contador '300/300' debajo del campo 'Biografía Corta', y no permite más digitación ni pegar texto. |


## Frames del Prototipo

### T. Registro Tutor 1 (Vacío)

**Frame ID**: [1lqfKLob3-1QSNkCN3WIgiSwXnwb35a5i](https://drive.google.com/file/d/1lqfKLob3-1QSNkCN3WIgiSwXnwb35a5i/view?usp=drivesdk)


## Observaciones

Cualquier funcionalidad respecto a cargar documentos sobre récord académico, DESCARTARLO. La pantalla del wizard "Datos Básicos" desarrollarlo por completo.
