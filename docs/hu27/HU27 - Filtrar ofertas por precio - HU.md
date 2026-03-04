# HU27 - Filtrar ofertas por precio

## Información de la Historia de Usuario

| **Sección** | **Descripción** |
| :--- | :--- |
| **Estimación** | 8 SP |
| **Historia de Usuario** | Como estudiante, quiero filtrar las ofertas por precio para encontrar opciones que se ajusten a mi presupuesto. |


---

# HU27 - Criterios de Aceptación

| **Escenario** | **Descripción** |
| :--- | :--- |
| **Filtrado Exitoso por Precio** | **Dado** que el estudiante se encuentra en la interfaz de "Encuentra tu Tutoría" con ofertas disponibles, <br> **cuando** ajusta el slider de "Precio" a un rango (ej: de '$5.00' a '$20.00') que contiene ofertas, <br> **entonces** el listado de ofertas se actualiza mostrando solo las que están dentro del rango de precio seleccionado y el slider refleja los valores de '$5.00' a '$20.00'. |
| **Filtrado Sin Coincidencias** | **Dado** que el estudiante se encuentra en la interfaz de "Encuentra tu Tutoría" con ofertas disponibles, <br> **cuando** ajusta el slider de "Precio" a un rango (ej: de '$1' a '$4') que no contiene ofertas, <br> **entonces** la lista de ofertas se vacía y se muestra el mensaje 'No se encontraron ofertas. Intenta ajustar tus filtros de búsqueda.'. |


## Frames del Prototipo

### E. Inicio Estudiante 1

**Frame ID**: [16m3CuRBCPBOwO3FxZE7ICYVadFu07sj2](https://drive.google.com/file/d/16m3CuRBCPBOwO3FxZE7ICYVadFu07sj2/view?usp=drivesdk)


## Observaciones

Descartar la lista de ofertas de tutoría, los filtros (Modalidad, Disponibilidad, Área de conocimiento, Nivel, Tipo de Apoyo, Facultad) y ordenamiento (Más recientes, Precio: menor a mayor, Precio: mayor a menor, Mejor calificación). Enfocarse únicamente en desarrollar el slider del filtro por Precio.
