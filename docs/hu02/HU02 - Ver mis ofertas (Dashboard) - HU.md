# HU02 - Ver mis ofertas (Dashboard)

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 8 SP |
| **Historia de Usuario** | Como tutor, quiero ver un listado de las ofertas de tutoría que he publicado para saber que tutorías estoy ofreciendo. |


---

# HU02 - Criterios de Aceptación

| **Escenario** | **Descripción** |
| :--- | :--- |
| **Visualización de Oferta Publicada** | **Dado** que el tutor ha publicado al menos una oferta de tutoría <br> **cuando** accede a la sección 'Mis Ofertas de Tutorías' <br> **entonces** la página muestra el título 'Mis Ofertas de Tutorías', el botón '+ Nueva Oferta' y una tarjeta de oferta para 'Cálculo en una Variable' que incluye el ícono de 'Presencial', la descripción 'Me enfoco en ejercicios de MRU.', las etiquetas 'Matemática', 'Formación Básica', 'Preparación de Exámenes', 'Resolución de Ejercicios', 'Laboratorios' y el precio '$10/h'. |
| **Redirección a Creación de Oferta** | **Dado** que el tutor se encuentra en la sección 'Mis Ofertas de Tutorías' <br> **cuando** hace clic en el botón '+ Nueva Oferta' <br> **entonces** se visualiza un modal superpuesto para la creación de una nueva oferta de tutoría. |
| **Visualización de Estado Vacío** | **Dado** que el tutor no ha publicado ninguna oferta de tutoría <br> **cuando** accede a la sección 'Mis Ofertas de Tutorías' <br> **entonces** la página 'Mis Ofertas de Tutorías' muestra el título 'Mis Ofertas de Tutorías', el botón '+ Nueva Oferta', y un contenedor central con el mensaje 'No tienes ofertas activas', el subtexto 'Publica tu primera oferta para que los estudiantes te encuentren' y el botón '+ Crear mi primera oferta'. |


## Frames del Prototipo

### T. Inicio Tutor (Oferta Creada)

**Frame ID**: [1uIrdp2qZb_7d_zmuXNaJXvwwyQaizIEd](https://drive.google.com/file/d/1uIrdp2qZb_7d_zmuXNaJXvwwyQaizIEd/view?usp=drivesdk)


## Observaciones

Omitir el desarrollo de Frontend y Backend para la sección Izquierda que incluye el perfil del tutor (Ej. Foto, Nombre, botón "Editar Perfil", botón "Perfil Visible", sección de estadísticas). También omitir el ícono de basurero ubicado en la tarjeta de la oferta.
- Solo centrarse como se presenta las ofertas como en Cálculo en una Variable y el botón de Nueva Oferta.
