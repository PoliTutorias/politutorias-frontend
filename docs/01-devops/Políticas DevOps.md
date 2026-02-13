Políticas de Ramas y Commits para Poli-Tutorias (Versión Static Web Apps)
=========================================================================

> Redactado por: Ingeniero DevOps – Estefano Proaño  
> Fecha: 19 de octubre de 2025  
> Proyecto: Poli-Tutorias - Escuela Politécnica Nacional

Introducción
------------

Este documento establece las políticas de ramificación (branching) y commits que he definido para el proyecto Poli-Tutorias, asegurando la trazabilidad, calidad y colaboración efectiva del equipo bajo el marco SCRUM. Estas políticas están alineadas con las mejores prácticas de Azure DevOps, Git Flow modificado y las certificaciones AZ-900, AZ-400 y AI-900.
Dada la presencia del rol de Agile Testing en nuestro equipo, he implementado un modelo de **Git Flow modificado con tres ramas permanentes** que permite una clara separación de ambientes y facilita el proceso de validación antes del despliegue a producción. La arquitectura de despliegue se basa en **Azure Static Web Apps** para el frontend (implementado con **Next.js**) y el backend (API Functions), y **Azure Blob Storage** para el almacenamiento de imágenes., y **Azure Blob Storage** para el almacenamiento de imágenes.

1. Estrategia de Ramificación
-----------------------------

### 1.1 Modelo de Ramificación

He adoptado un **modelo Git Flow modificado** con tres ramas permanentes (`main`, `develop`, `qa`), diseñado específicamente para equipos con roles de testing dedicados y procesos de validación formales. Este modelo está alineado con las recomendaciones de la certificación AZ-400 para proyectos que requieren ambientes de prueba separados antes de producción.

### 1.2 Justificación del Modelo

*   **Separación clara de ambientes:** Desarrollo → QA → Producción
    
*   **Integración con Agile Testing:** El ambiente de QA permite validación formal por parte del rol de testing antes de desplegar a producción
    
*   **Trazabilidad completa:** Cada cambio pasa por revisión técnica y de calidad
    
*   **Viabilidad para tesis:** El modelo es suficientemente robusto para demostrar conocimientos DevOps sin ser excesivamente complejo para un equipo de 6 personas
    
*   **Cumplimiento de normativas:** Alineado con AZ-400 y mejores prácticas de control de calidad
    

### 1.3 Ramas Permanentes

El proyecto mantiene tres ramas permanentes que nunca se eliminan:

#### `main` (Producción)

*   **Propósito:** Código desplegado en producción, completamente estable y validado.
    
*   **Ambiente Azure:** **Azure Static Web App (Producción)** con soporte nativo para Next.js y **Azure Blob Storage**.
    
*   **Protección:** Máxima protección.
    
*   **Responsable de aprobar merge:** DevOps Engineer + Scrum Master
    
*   Reglas:
      - No se permite push directo bajo ninguna circunstancia.
      - Solo acepta merges desde qa mediante Pull Request aprobado.
      - Requiere build exitoso, pruebas pasadas y al menos dos revisores.
      - Cada merge debe estar asociado a una Historia de Usuario completada.
      - Genera despliegue automático a producción via pipeline.
    

#### `develop` (Desarrollo e Integración)

*   **Propósito:** Integración continua del trabajo de desarrollo activo del equipo.
    
*   **Ambiente Azure:** **Azure Static Web App** con soporte nativo para Next.js y **Azure Blob Storage**.
    
*   **Protección:** Protegida con políticas de revisión.
    
*   **Responsable de aprobar merge:** DevOps Engineer o cualquier desarrollador senior
    
*   Reglas:
      - Acepta merges desde ramas feature/* y fix/*.
      - Requiere al menos un revisor y build exitoso.
      - Base para crear nuevas ramas de trabajo.
      - No permite push directo.
      - Genera despliegue automático a un ambiente de desarrollo (preview) via pipeline.
    

#### `qa` (Quality Assurance / Pruebas)

*   **Propósito:** Ambiente dedicado para validación formal por parte de Agile Testing.
    
*   **Ambiente Azure:** **Azure Static Web App** con soporte nativo para Next.js y **Azure Blob Storage**.
    
*   **Protección:** Protegida con políticas de revisión.
    
*   **Responsable de aprobar merge:** Agile Testing + DevOps Engineer
    
*   Reglas:
      - Acepta merges solo desde develop.
      - El equipo de Agile Testing valida funcionalidades antes del pase a producción.
      - Requiere documentación de casos de prueba ejecutados.
      - Una vez validado y aprobado, se fusiona a main.
      - Genera despliegue automático al ambiente de QA via pipeline.
    

### 1.4 Ramas de Trabajo Temporales

Todas las ramas de trabajo siguen convenciones estrictas y se eliminan después del merge exitoso.

#### Ramas de Funcionalidad

*   **Formato:** `feature/HU<numero>-<descripcion-breve>`
    
*   **Ejemplo:** `feature/HU01-busqueda-tutores`
    
*   **Origen:** `develop`
    
*   **Destino:** `develop`
    
*   **Propósito:** Desarrollo de nuevas historias de usuario del backlog.
    
*   **Ciclo de vida:** Se eliminan automáticamente después del merge exitoso.
    

#### Ramas de Corrección

*   **Formato:** `fix/HU<numero>-<descripcion-breve>`
    
*   **Ejemplo:** `fix/HU02-error-validacion-email`
    
*   **Origen:** `develop`
    
*   **Destino:** `develop`
    
*   **Propósito:** Corrección de bugs identificados en desarrollo o durante las pruebas en QA.
    
*   **Ciclo de vida:** Se eliminan después del merge.
    

#### Ramas de Hotfix

*   **Formato:** `hotfix/HU<numero>-<descripcion-breve>`
    
*   **Ejemplo:** `hotfix/HU05-caida-autenticacion`
    
*   **Origen:** `main`
    
*   **Destino:** `main` y `develop` (merge simultáneo)
    
*   **Propósito:** Correcciones urgentes de bugs críticos en producción.
    
*   **Ciclo de vida:** Se eliminan inmediatamente después del merge a ambas ramas.
    
*   **Nota:** Los hotfix son casos excepcionales y deben documentarse en la Wiki.
    

2. Políticas de Protección de Ramas
-----------------------------------

### 2.1 Configuración para `main`

He configurado las siguientes políticas en Azure DevOps:
*   **Require a minimum number of reviewers:** Mínimo 2 revisores (DevOps Engineer + Scrum Master o desarrollador senior).
    
*   **Check for linked work items:** Obligatorio vincular a Historia de Usuario.
    
*   **Check for comment resolution:** Todos los comentarios del code review deben resolverse.
    
*   **Require build validation:** Pipeline de producción debe ejecutarse exitosamente.
    
*   **Prohibit direct pushes:** Nadie puede hacer push directo, ni siquiera administradores.
    
*   **Limit merge types:** Solo "merge commit" para mantener historial completo.
    
*   **Require approval from Agile Testing:** Evidencia de pruebas exitosas en QA.
    

### 2.2 Configuración para `develop`

*   **Require a minimum number of reviewers:** Mínimo 1 revisor (cualquier miembro técnico del equipo).
    
*   **Check for linked work items:** Obligatorio vincular a Tarea específica.
    
*   **Check for comment resolution:** Todos los comentarios deben resolverse.
    
*   **Require build validation:** Pipeline de desarrollo debe pasar exitosamente.
    
*   **Prohibit direct pushes:** Nadie puede hacer push directo.
    
*   **Automatically include code reviewers:** Asignación automática según área modificada.
    

### 2.3 Configuración para `qa`

*   **Require a minimum number of reviewers:** Mínimo 1 revisor (preferiblemente Agile Testing).
    
*   **Check for linked work items:** Obligatorio vincular a Historia de Usuario.
    
*   **Require build validation:** Pipeline de QA debe pasar exitosamente.
    
*   **Prohibit direct pushes:** Nadie puede hacer push directo.
    
*   **Testing sign-off required:** Documentación de casos de prueba ejecutados y resultados.
    

3. Políticas de Commits
-----------------------

### 3.1 Estructura del Mensaje de Commit

He establecido el formato **Conventional Commits con vinculación obligatoria a Historia de Usuario y Tarea al inicio del mensaje**:

    HU<numero>-T<numero-tarea> <tipo>(<alcance>): <descripción breve>
    
    [cuerpo opcional con más detalles]
    
    [footer opcional para breaking changes o referencias adicionales]
    

**Importante:** Azure DevOps vincula automáticamente el commit al work item cuando se menciona el formato `HU<numero>-T<numero-tarea>` al inicio del mensaje.

### 3.2 Tipos de Commit Permitidos

*   **feat:** Nueva funcionalidad o característica.
    
*   **fix:** Corrección de un bug o defecto.
    
*   **docs:** Cambios exclusivamente en documentación (README, Wiki, comentarios).
    
*   **style:** Cambios de formato que no afectan la lógica (espacios, formato de código, punto y coma).
    
*   **refactor:** Refactorización de código sin cambiar funcionalidad externa.
    
*   **test:** Adición o corrección de pruebas automatizadas.
    
*   **chore:** Tareas de mantenimiento (actualización de dependencias, configuración, archivos de proyecto).
    
*   **perf:** Mejoras de rendimiento y optimización.
    
*   **ci:** Cambios en configuración de pipelines CI/CD o archivos Docker.
    

### 3.3 Formato de Identificación

*   **HU:** Historia de Usuario (ej: HU01, HU02, HU15)
    
*   **T:** Número de Tarea dentro de la Historia de Usuario (ej: T01, T05, T12)
    
*   **Formato completo:** `HU01-T05` (Historia de Usuario 01, Tarea 05)
    
*   **Posición:** Siempre al inicio del mensaje de commit
    

### 3.4 Historia de Usuario Técnica (HU00)

Para tareas técnicas que no corresponden a funcionalidades de usuario (configuración, mantenimiento, infraestructura), he creado la **HU00 - Configuración y mantenimiento de repositorio**.
Esta HU agrupa tareas como:
*   Configuración de archivos de proyecto (.gitignore, .env)
    
*   Actualización de documentación técnica (README)
    
*   Configuración de herramientas (linters, formatters)
    
*   Setup inicial de infraestructura
    
**Ejemplos de tareas en HU00:**
*   `T01` - Configurar .gitignore
    
*   `T02` - Configurar variables de entorno
    
*   `T03` - Actualizar README con instrucciones de setup
    
*   `T04` - Configurar ESLint y Prettier
    
*   `T05` - Crear plantilla de PR
    

### 3.5 Ejemplos de Commits para Archivos de Configuración

#### `.gitignore`

    HU00-T01 chore(repo): actualizar .gitignore para excluir logs y cache
    
    Agrega exclusiones para:
    - Logs de aplicación (*.log)
    - Archivos de cache (.cache/)
    - Variables de entorno locales (.env.local)
    

#### `.env` o `.env.example`

    HU00-T02 chore(config): agregar variables de entorno para desarrollo
    
    HU00-T03 ci(config): actualizar .env.example con variables de pipeline
    

#### `README.md`

    HU00-T04 docs(readme): actualizar instrucciones de instalación
    
    Incluye:
    - Requisitos del sistema
    - Pasos de instalación de dependencias
    - Configuración inicial de base de datos
    
    HU00-T05 docs(readme): agregar sección de arquitectura del proyecto
    

#### `package.json` / `pom.xml` / `requirements.txt`

    HU00-T06 chore(deps): actualizar dependencias de frontend
    
    Actualiza React a v18.2.0 por mejoras de rendimiento y seguridad.
    
    HU01-T08 chore(deps): agregar biblioteca de validación de formularios
    

#### `staticwebapp.config.json`

    HU00-T07 ci(config): configurar rutas y reglas de enrutamiento
    
    Define rutas personalizadas para la API y reglas de fallback
    para la aplicación de una sola página (SPA).
    

#### Archivos de linters (`.eslintrc`, `.prettierrc`)

    HU00-T09 style(config): configurar reglas de ESLint para el proyecto
    
    Habilita reglas strict y convenciones de código del equipo.
    

#### `tsconfig.json`

    HU00-T10 chore(config): habilitar strict mode en TypeScript
    

#### Archivos de CI/CD (`.github/workflows/`, `azure-pipelines.yml`)

    HU00-T11 ci(pipeline): agregar stage de análisis de código con SonarCloud
    
    HU05-T20 ci(pipeline): configurar despliegue automático a QA
    

#### `LICENSE`

    HU00-T12 docs(legal): agregar licencia MIT al proyecto
    

### 3.6 Ejemplos de Commits Válidos para Funcionalidades

    HU01-T05 feat(frontend): agregar formulario de búsqueda de tutores
    
    Implementa el componente de búsqueda con filtros por materia,
    disponibilidad y calificación. Incluye validación de campos.
    
    HU02-T12 fix(api): corregir validación de email en registro
    
    El regex anterior permitía emails sin dominio válido.
    Actualizado según RFC 5322 en la Azure Function.
    
    HU01-T08 test(frontend): agregar pruebas unitarias para componente de login
    
    Cobertura del 85% en casos de éxito y error.
    
    HU03-T15 refactor(api): optimizar consulta de tutores disponibles
    
    Reduce tiempo de respuesta de 2.5s a 0.8s usando índices en BD.
    
    HU01-T18 perf(api): mejorar tiempo de respuesta de endpoint de búsqueda
    
    Implementa caché en Redis para consultas frecuentes.
    

### 3.7 Tabla de Referencia Rápida

| **Archivo/Cambio** | **Tipo** | **Ejemplo** |
| --- | --- | --- |
| `.gitignore`<br> | `chore`<br> | `HU00-T01 chore(repo): actualizar .gitignore`<br> |
| `.env`, `.env.example`<br> | `chore` o `ci`<br> | `HU00-T02 chore(config): agregar variables de entorno`<br> |
| `README.md`<br> | `docs`<br> | `HU00-T03 docs(readme): actualizar instrucciones`<br> |
| `package.json`<br> | `chore`<br> | `HU00-T04 chore(deps): actualizar dependencias`<br> |
| `staticwebapp.config.json`<br> | `ci`<br> | `HU00-T05 ci(config): configurar rutas`<br> |
| `.eslintrc`<br> | `style`<br> | `HU00-T07 style(config): configurar ESLint`<br> |
| `tsconfig.json`<br> | `chore`<br> | `HU00-T08 chore(config): habilitar strict mode`<br> |
| `azure-pipelines.yml`<br> | `ci`<br> | `HU00-T09 ci(pipeline): agregar stage de testing`<br> |
| `LICENSE`<br> | `docs`<br> | `HU00-T10 docs(legal): agregar licencia MIT`<br> |

### 3.8 Beneficios de la Vinculación HU-Tarea al Inicio

Como DevOps Engineer, he implementado este formato con el identificador al inicio porque proporciona:
*   **Visibilidad inmediata:** Al revisar el historial de Git, se identifica inmediatamente la HU y tarea relacionada.
    
*   **Trazabilidad completa:** Desde la Historia de Usuario → Tarea → Commit → PR → Build → Despliegue.
    
*   **Auditoría para tesis:** Facilita documentar todo el trabajo realizado por sprint con evidencia técnica.
    
*   **Visibilidad SCRUM:** El Scrum Master y el equipo pueden ver en tiempo real qué tareas están en progreso, revisión o completadas.
    
*   **Cumplimiento AZ-400:** La vinculación directa con work items es un requisito de las mejores prácticas DevOps.
    
*   **Métricas automatizadas:** Permite generar reportes de velocidad, burndown y tiempo de ciclo por Historia de Usuario.
    
*   **Filtrado eficiente:** Facilita buscar todos los commits relacionados con una HU específica usando `git log --grep="HU01"`.
    

### 3.9 Reglas de Commits

*   **Identificador primero:** Siempre iniciar con `HU<numero>-T<numero-tarea>`.
    
*   **Descripción breve:** Máximo 50 caracteres después del tipo, en minúsculas, sin punto final.
    
*   **Formato obligatorio:** `HU<numero>-T<numero-tarea> <tipo>(<alcance>): <descripción>`
    
*   **Cuerpo opcional:** Explicación detallada cuando el cambio lo requiera (máximo 72 caracteres por línea).
    
*   **Idioma:** Español (facilita la comunicación del equipo académico).
    
*   **Commits atómicos:** Cada commit representa un cambio lógico completo relacionado con una tarea específica.
    
*   **Sin commits genéricos:** Prohibido usar mensajes como "cambios", "update", "fix" sin contexto ni referencia.
    
*   **Un commit = Una tarea:** Idealmente, los commits deben relacionarse con una sola tarea para mejor trazabilidad.
    

### 3.10 Commits Prohibidos

*   Commits sin referencia a `HU<numero>-T<numero-tarea>` al inicio.
    
*   Commits con mensajes vacíos o genéricos sin descripción.
    
*   Commits que incluyan secretos, credenciales, tokens o información sensible.
    
*   Commits directos a ramas protegidas (`main`, `develop`, `qa`).
    
*   Commits con múltiples responsabilidades no relacionadas (violar principio atómico).
    
*   Commits donde el identificador HU-T no esté al principio del mensaje.
    

4. Flujo de Trabajo Recomendado
-------------------------------

### 4.1 Inicio de Nueva Funcionalidad

1.  Identificar trabajo en Azure Boards:
       - Historia de Usuario: HU01 - "Como estudiante, quiero buscar tutores disponibles"
       - Tarea asignada: T05 - "Implementar formulario de búsqueda en frontend"
    
2.  Sincronizar con develop:
       bash    git checkout develop    git pull origin develop    
    
3.  Crear rama de trabajo:
       bash    git checkout -b feature/HU01-busqueda-tutores    
    

### 4.2 Desarrollo y Commits

1.  Realizar cambios y commitear con formato correcto:
       bash    git add .    git commit -m "HU01-T05 feat(frontend): agregar barra de búsqueda de tutores"    
    
2.  Commits adicionales relacionados con la misma tarea:
       bash    git commit -m "HU01-T05 style(frontend): ajustar diseño de barra de búsqueda"    git commit -m "HU01-T05 test(frontend): agregar pruebas para búsqueda"    
    
3.  Mantener sincronizado con develop (rebase frecuente):
       bash    git fetch origin    git rebase origin/develop    
    

### 4.3 Pull Request a `develop`

1.  Subir rama al repositorio remoto:
       bash    git push origin feature/HU01-busqueda-tutores    
    
2.  Crear PR en Azure DevOps:
       - Título: [HU01] Implementar búsqueda de tutores
       - Descripción: Detalle de cambios, capturas de pantalla si aplica
       - Vincular: Historia de Usuario HU01 y Tarea T05
       - Asignar revisor: Mínimo 1 desarrollador
       - Verificar: Build automático debe pasar
    
3.  Proceso de revisión:
       - Revisor evalúa código, arquitectura y estándares
       - Resuelve comentarios si los hay
       - Una vez aprobado, completar merge
       - Rama se elimina automáticamente
    
4.  **Despliegue automático a ambiente de Desarrollo (preview) en Static Web Apps**
    

### 4.4 Promoción a QA (Periódico por Sprint)

Como DevOps Engineer, coordino la promoción a QA al finalizar cada sprint o cuando hay funcionalidades listas para validación:
1.  Fusionar develop → qa:
       bash    git checkout qa    git pull origin qa    git merge develop    git push origin qa    
    
2.  Notificar a Agile Testing:
       - Documentar en la Wiki las Historias de Usuario incluidas
       - Compartir casos de prueba esperados
       - El pipeline automático despliega al ambiente de QA
    
3.  Proceso de validación en QA:
       - Agile Testing ejecuta pruebas funcionales
       - Reporta bugs encontrados (se crean tareas tipo fix/)
       - Aprueba cuando todas las validaciones son exitosas
    

### 4.5 Promoción a Producción

Una vez que Agile Testing ha validado y aprobado el ambiente QA:
1.  Crear PR de qa → main:
       - Título: Release Sprint X - [Lista de HUs incluidas]
       - Requiere aprobación de DevOps + Scrum Master
       - Documentar en la Wiki las funcionalidades incluidas
    
2.  Fusionar a main:
       bash    git checkout main    git pull origin main    git merge qa    git push origin main    
    
3.  Crear tag de versión:
       bash    git tag -a v1.0.0 -m "Release v1.0.0 - Sprint 1"    git push origin v1.0.0    
    
4.  **Despliegue automático a producción via pipeline**
    
5.  **Documentar en Wiki:** Release notes, funcionalidades desplegadas, métricas
    

### 4.6 Hotfix en Producción (Caso Excepcional)

Solo para bugs críticos que afectan producción:
1.  Crear rama desde main:
       bash    git checkout main    git pull origin main    git checkout -b hotfix/HU05-caida-autenticacion    
    
2.  Realizar corrección urgente:
       bash    git commit -m "HU05-T30 fix(api): corregir timeout en autenticación"    
    
3.  Fusionar a main primero:
       bash    git checkout main    git merge hotfix/HU05-caida-autenticacion    git push origin main    
    
4.  Fusionar también a develop y qa:
       bash    git checkout develop    git merge hotfix/HU05-caida-autenticacion    git push origin develop        git checkout qa    git merge hotfix/HU05-caida-autenticacion    git push origin qa    
    
5.  **Documentar incidente en la Wiki**
    

5. Gestión de Conflictos
------------------------

*   Resolver conflictos localmente antes de push.
    
*   Hacer rebase frecuente con rama base para minimizar conflictos.
    
*   En conflictos complejos que afecten arquitectura, consultar con DevOps Engineer.
    
*   Documentar resoluciones de conflictos complejos en comentarios del PR.
    

6. Auditoría y Trazabilidad
---------------------------

Como responsable DevOps, he implementado los siguientes mecanismos de auditoría:
*   **Todo commit debe incluir `HU<numero>-T<numero-tarea>` al inicio** sin excepciones.
    
*   Azure DevOps registra automáticamente la relación entre:
      - Commits → Tareas → Historias de Usuario → Sprints → Backlog
    
*   El historial de Git debe mantenerse limpio y legible.
    
*   Se prohíbe reescribir historial en ramas compartidas (`git rebase -i`, `git commit --amend`).
    
*   La trazabilidad completa facilita la documentación de la tesis y las auditorías académicas.
    
*   Los pipelines generan logs y artefactos que permiten auditar cada despliegue.
    

7. Integración con Pipelines CI/CD
----------------------------------

Cada rama permanente tiene su pipeline asociado, optimizado para Azure Static Web Apps:
*   **Pipeline de `develop`:** Build, tests, análisis de código, y despliegue a un **ambiente de vista previa (preview environment)** en Azure Static Web Apps.
    
*   **Pipeline de `qa`:** Build, tests exhaustivos, y despliegue al **ambiente de staging (`qa`)** en Azure Static Web Apps.
    
*   **Pipeline de `main`:** Build, tests, validaciones finales, y despliegue al **ambiente de producción** en Azure Static Web Apps.
    
Los pipelines se activan automáticamente con cada push o merge a las ramas correspondientes.

8. Checklist de Cumplimiento
----------------------------

Antes de considerar completada cualquier tarea, verificar:
*   [ ] Rama creada con nomenclatura correcta (`feature/HU##-descripcion`).
    
*   [ ] Todos los commits siguen formato Conventional Commits.
    
*   [ ] Todos los commits inician con `HU<numero>-T<numero-tarea>`.
    
*   [ ] PR creado y vinculado a Historia de Usuario y Tarea en Azure Boards.
    
*   [ ] Build automático ejecutado y exitoso.
    
*   [ ] Mínimo de revisores aprobaron según políticas de la rama destino.
    
*   [ ] Todos los comentarios del code review están resueltos.
    
*   [ ] Pruebas automatizadas pasan exitosamente.
    
*   [ ] Rama eliminada después del merge exitoso.
    
*   [ ] Despliegue automático verificado en el ambiente correspondiente.
    

9. Referencias y Normativas
---------------------------

*   **Git Flow:** [nvie.com/posts/a-successful-git-branching-model](https://nvie.com/posts/a-successful-git-branching-model/ "null")
    
*   **Conventional Commits:** [conventionalcommits.org](https://www.conventionalcommits.org/ "null")
    
*   **Azure DevOps Branching Strategies:** [Microsoft Docs - Git branching guidance](https://learn.microsoft.com/en-us/azure/devops/repos/git/git-branching-guidance "null")
    
*   **Certificación AZ-400:** Módulo sobre estrategias de ramificación, CI/CD y DevOps practices.
    
*   **SCRUM Guide:** Vinculación de trabajo técnico con Product Backlog e Historias de Usuario.
    
*   **Azure DevOps Work Item Linking:** [Microsoft Docs](https://learn.microsoft.com/en-us/azure/devops/boards/backlogs/add-link "null")
    
*   **Azure Static Web Apps:** [Documentación Oficial de Microsoft](https://learn.microsoft.com/en-us/azure/static-web-apps/ "null")
    

10. Conclusión
--------------

Esta política de ramas y commits ha sido diseñada específicamente para el proyecto Poli-Tutorias, considerando:
*   Las necesidades de un equipo académico con roles SCRUM bien definidos
    
*   La presencia del rol de Agile Testing que requiere un ambiente dedicado de validación
    
*   El uso de **Azure Static Web Apps** como plataforma de despliegue principal
    
*   Las mejores prácticas recomendadas por las certificaciones AZ-900 y AZ-400
    
*   La necesidad de trazabilidad completa para documentación de tesis
    
*   La viabilidad de implementación con un equipo de 6 personas
    
Esta política será revisada y actualizada según las lecciones aprendidas durante los sprints y las necesidades emergentes del proyecto.
Última actualización: 19 de octubre de 2025  
Responsable: Estefano Proaño - DevOps Engineer  
Próxima revisión: Al finalizar Sprint 1