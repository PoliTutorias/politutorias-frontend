# HU03 - Ver ofertas de tutorías

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 8 SP |
| **Historia de Usuario** | Como estudiante, quiero revisar la oferta de tutorías, para encontrar la que mejor se adapte a mis necesidades. |


---

# HU03 - Criterios de Aceptación

| **Escenario** | **Descripción** |
| :--- | :--- |
| **Visualización de Ofertas - Página 1** | **Dado** que el estudiante está en la interfaz 'Encuentra tu Tutoría' con ofertas disponibles <br> **cuando** revisa la lista por primera vez <br> **entonces** se visualiza '13 resultados' en la cabecera, se muestran 10 tarjetas de oferta, donde la primera tarjeta de oferta muestra el título 'Cálculo Vectorial', el precio '$10/h', la modalidad 'Virtual/Presencial' con su icono, las etiquetas 'Matemática' y 'Formación Básica', el tutor 'Juan Pérez' con su foto, y la calificación '4.8 (15)', y los controles de paginación muestran '< 1 2 >' con el botón '1' activo y el botón '2' inactivo. |
| **Visualización de Ofertas - Página 2** | **Dado** que el estudiante está visualizando las ofertas de tutorías en la 'Página 1' <br> **cuando** hace clic en el botón de paginación número '2' <br> **entonces** la lista de ofertas se actualiza y muestra las tarjetas de oferta correspondientes a los resultados 11 al 13 (diferentes a las de la página 1), y en los controles de paginación, el botón '1' pasa a estar inactivo, el botón '2' se activa, y los botones de navegación '<' y '>' se mantienen visibles. |


## Frames del Prototipo

### E. Inicio Estudiante - Página 1

**Frame ID**: [1ZvU3ULkXws0-Sum-i-_nEHRz91GLRr7x](https://drive.google.com/file/d/1ZvU3ULkXws0-Sum-i-_nEHRz91GLRr7x/view?usp=drivesdk)


## Observaciones

Omitir el desarrollo de Frontend y Backend para la sección izquierda correspondiente a "Filtros" (Modalidad, Disponibilidad, Precio, Área de Conocimiento, Nivel, Tipo de Apoyo y Facultad). También omitir el ComboBox "Más recientes" y la barra de búsqueda de la parte superior.
- Solo centrase en como se ve las ofertan
