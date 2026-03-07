**Titulo:**
[HU07] Implementar consulta de disponibilidad del tutor (Frontend)

**Resumen:**
Este Pull Request implementa la funcionalidad frontend para que un tutor autenticado pueda visualizar su disponibilidad horaria registrada en una cuadrícula de solo lectura. Se creó una nueva página `GestionarDisponibilidadPage`, un Server Action `getDisponibilidadAction` para consumir el endpoint del backend, y se añadió una prop `readOnly` al componente `HorarioGrid` para renderizar celdas no interactivas. También se actualizó el Dashboard del tutor con la card "Disponibilidad" para navegar a esta nueva página.

**Historias de Usuario cubiertas:**
- HU07 - Consultar mi disponibilidad

**Tareas implementadas:**
- Tarea 1: Creación de seed para datos iniciales de disponibilidad del tutor.
- Tarea 2: Implementación de Server Action `getDisponibilidadAction` con integración al backend.
- Tarea 3: Estructura y maquetación de la página `GestionarDisponibilidadPage`.
- Tarea 4: Implementación del componente `HorarioGrid` en modo solo lectura (`readOnly` prop).
- Tarea 5: Configuración de navegación del `Header` a `DashboardTutorPage`.
- Tarea 6: Integración de `getDisponibilidadAction` con el backend real.
- Tarea 9: Verificación de la correcta carga de la cuadrícula en modo "Solo lectura".

**Criterios de Aceptación Cumplidos:**
- **CA1 (Visualización de Horario Registrado):** La página `GestionarDisponibilidadPage` carga correctamente mostrando:
  - En la cabecera: el texto 'Volver al Panel' a la izquierda y el logo 'PoliTutorías' a la derecha.
  - El título 'Gestionar Disponibilidad'.
  - La descripción 'Haz clic en los horarios que tienes disponibles para ofrecer tutorías.'.
  - La sub-descripción 'Tu horario se mostrará en la zona horaria local (GMT-5).'.
  - El contador en verde '✓ N horarios seleccionados' (dinámico según datos del backend).
  - La cuadrícula de horarios desde las 7:00 hasta las 20:00 con columnas 'HORA', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'.
  - Los bloques con disponibilidad registrada aparecen resaltados con checkmark blanco sobre fondo oscuro.
  - Los botones 'Cancelar' y 'Guardar Cambios' están visibles pero permanentemente deshabilitados (modo solo lectura).
  - La cuadrícula no es clickeable: las celdas se renderizan como `<div>` en lugar de `<button>`.
- **CA2 (Navegación a Panel de Control):** Al hacer clic en 'Volver al Panel', el tutor es redirigido correctamente a `/dashboard/tutor`.

**Archivos Clave modificados/creados:**
- `src/app/dashboard/tutor/disponibilidad/page.tsx` — Nueva página `GestionarDisponibilidadPage` que carga la disponibilidad del backend, muestra la cuadrícula en modo solo lectura con botones deshabilitados.
- `src/actions/tutor/getDisponibilidadAction.ts` — Nuevo Server Action que realiza un `GET` al endpoint `/api/disponibilidad` del backend con el token de autenticación.
- `src/components/tutor/HorarioGrid/HorarioGrid.tsx` — Añadida prop `readOnly` (default `false`). Cuando `readOnly=true`, las celdas se renderizan como `<div>` no interactivos en lugar de `<button>`. Se hizo `onBlocksChange` opcional.
- `src/components/dashboard/TutorDashboardContent.tsx` — Añadida card "Disponibilidad" en la sección "Gestión Rápida" que navega a `/dashboard/tutor/disponibilidad`.
- `src/app/dashboard/tutor/page.tsx` — Actualizada la estructura del header del Dashboard del tutor con botón "Cerrar Sesión".
- `src/components/ofertas/EmptyOfferState.tsx` — Corregido ícono SVG (book-open de lucide) y estilo del contenedor (borde punteado).
- `src/components/shared/input-field/InputField.tsx` — Envuelto `validateInput` en `useCallback` para resolver errores de `react-hooks/preserve-manual-memoization` del React Compiler.

**Notas:**
- El componente `HorarioGrid` ahora soporta dos modos: interactivo (registro, HU41) y solo lectura (consulta, HU07), controlados por la prop `readOnly`.
- La página de disponibilidad usa `max-w-7xl` en el header para alinear el botón "Volver al Panel" con la posición del logo en el navbar principal.
- El linter pasa sin errores con `npm run lint` (0 errores, solo warnings).
- Se eliminó el seed data de experiencias del formulario de registro (`FormDetallesProfesionales.tsx`) para que arranque vacío en lugar de con datos precargados.
