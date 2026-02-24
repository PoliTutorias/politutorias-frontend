# HU17 - Buscar tutoría por título de la oferta

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 8 SP |
| **Historia de Usuario** | Como estudiante, quiero buscar una tutoría por el título de la oferta para encontrar resultados específicos rápidamente. |


---

# HU17 - Criterios de Aceptación

| **Escenario** | **Descripción** |
| :--- | :--- |
| **Búsqueda Exitosa por Materia** | **Dado** que el estudiante se encuentra en la interfaz de "Encuentra tu Tutoría" con ofertas disponibles,<br> **cuando** ingresa en el campo 'Buscar por materia, tutor...' el término 'Cálculo' y presiona Enter o hace clic en el icono de búsqueda,<br> **entonces** el contador superior derecho se actualiza a "X resultados", y la lista se filtra mostrando solo las ofertas cuyas tarjetas contienen el término buscado en el título de la materia o en el nombre del tutor, manteniendo la estructura completa de la tarjeta. |
| **Búsqueda sin Coincidencias** | **Dado** que el estudiante se encuentra en la interfaz de "Encuentra tu Tutoría" con ofertas disponibles,<br> **cuando** ingresa en el campo 'Buscar por materia, tutor...' el término 'Astronomía' y presiona Enter o hace clic en el icono de búsqueda,<br> **entonces** el contador superior derecho indica "0 resultados", la lista de ofertas se oculta y en el área central se muestra un círculo con el icono de una lupa, el mensaje principal en negrita "**No se encontraron ofertas**" y el subtexto explicativo "**Intenta ajustar tus filtros de búsqueda**", sin mostrar tarjetas de oferta. |
| **Búsqueda con Campo Vacío** | **Dado** que el estudiante se encuentra en la interfaz de "Encuentra tu Tutoría" con ofertas disponibles,<br> **cuando** deja el campo 'Buscar por materia, tutor...' vacío y presiona Enter o hace clic en el icono de búsqueda,<br> **entonces** la lista muestra todas las ofertas disponibles, el contador superior derecho indica "13 resultados", y las tarjetas se visualizan ordenadas según el criterio por defecto. |


## Frames del Prototipo

### E. Inicio Estudiante - Página 1

**Frame ID**: [1ZvU3ULkXws0-Sum-i-_nEHRz91GLRr7x](https://drive.google.com/file/d/1ZvU3ULkXws0-Sum-i-_nEHRz91GLRr7x/view?usp=drivesdk)


## Observaciones

Centrarse únicamente en la barra de búsqueda de la parte superior. La sección izquierda correspondiente a "Filtros" (Modalidad, Disponibilidad, Precio, Área de Conocimiento, Nivel, Tipo de Apoyo y Facultad) y el ComboBox "Más recientes" descartarlos porque están fuera del alcance de la HU17. Considerar que para este punto las tarjetas que representan las ofertas ya han sido implementadas.
