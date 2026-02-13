# Cómo Trabajar con la Infraestructura de Azure

**Autor:** Estefano Proaño (Ingeniero DevOps)  
**Proyecto:** Poli-Tutorías

---

## 1. Introducción

Hola equipo,

Esta guía centraliza las prácticas y convenciones para desarrollar en Poli-Tutorías integrando con la infraestructura desplegada en Azure. Mi objetivo como Componente DevOps es simplificar y proteger la interacción con la nube para que ustedes puedan enfocarse en construir funcionalidades de alto valor. Sigan estas pautas para mantener seguridad, escalabilidad y coherencia entre entornos.

Regla principal: el equipo de desarrollo se concentra en la lógica del negocio; yo me encargo de que esa lógica corra de forma segura y eficiente en Azure.

---

## 2. Regla de Oro: NUNCA secretos en el código

No se debe hardcodear en el repositorio:
- URLs privadas
- Usuarios o contraseñas
- Cadenas de conexión
- Claves de API

Toda la información sensible se gestiona con variables de entorno y, en entornos compartidos (QA/Producción), mediante Azure Key Vault. Localmente se usan archivos `.env.local` que están en .gitignore y no deben subirse al repositorio.

---

## 3. Arquitectura y flujo de comunicación

Componentes en Azure:
- Frontend: Next.js — alojado en **Azure Static Web Apps**.
- Backend (API): alojado en **Azure App Service**.
- Base de datos: **Azure Database for PostgreSQL**.
- Almacenamiento de archivos: **Azure Blob Storage**.

Flujo permitido:
1. El Frontend (navegador) SÓLO se comunica con la API del Backend.
2. El Backend es el único con acceso directo a la Base de Datos y al Blob Storage.

Importante: el Frontend nunca debe conectarse directamente a la base de datos ni contener credenciales.

---

## 4. Configuración del entorno de desarrollo local

Cada desarrollador crea su propio `.env.local` en la raíz del proyecto. Estos archivos no deben subirse al repositorio.

### Frontend (`poli_tutorias_frontend`)

1. Crear `.env.local` en la raíz del proyecto.
2. Ejemplo mínimo:

```env
# URL base de la API (para desarrollo local)
NEXT_PUBLIC_API_BASE_URL=http://localhost:7071/api
```

Notas:
- Las variables que comienzan con NEXT_PUBLIC_ se exponen al cliente en Next.js. Solo pon aquí valores que puedan estar en el navegador.
- Para llamadas locales a la API, asegúrate de que la API esté corriendo en la ruta indicada.

### Backend (`poli_tutorias_backend`)

1. Crear `.env.local` en la raíz del proyecto.
2. Ejemplo:

```env
# Cadena de conexión a PostgreSQL para desarrollo local
DATABASE_URL="postgresql://dev_user:dev_password@localhost:5432/politutorias_db"

# Conexión a Blob Storage (usar Azurite local o credenciales de dev)
BLOB_STORAGE_CONNECTION_STRING="DefaultEndpointsProtocol=...;AccountName=...;AccountKey=...;EndpointSuffix=core.windows.net"

# Otros valores no sensibles (ejemplo)
NODE_ENV=development
PORT=7071
```

Notas:
- Pide las credenciales de desarrollo al equipo o usa servicios emulados (p. ej. Azurite para Blob Storage, docker-compose para Postgres).
- Nunca incluyan estas cadenas en commits.

---

## 5. Uso de variables de entorno en el código

Ejemplo Frontend (Next.js):

```js
// Llamada a la API desde el frontend
async function getTutores() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${apiUrl}/tutores`);
  if (!response.ok) throw new Error('Error al obtener tutores');
  return response.json();
}
```

Ejemplo Backend (Node.js/Express u otro):

```js
// Conexión a Postgres con DATABASE_URL
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
```

En entornos de Azure, las variables se configuran en:
- Azure App Service: Application settings (se inyectan como variables de entorno).
- Azure Static Web Apps: Configuration > Environment variables.
- Secretos sensibles: Azure Key Vault (con Managed Identity del App Service/Function App cuando aplique).

---

## 6. Añadir una nueva variable o clave (proceso)

Si tu funcionalidad requiere una nueva variable o secreto:

1. No ponerla en el código ni en el repo.
2. Indícame (DevOps) la necesidad y el propósito.
3. Acordaremos el nombre de la variable (ej.: MAPS_API_KEY).
4. Tú la añades temporalmente en tu `.env.local` para desarrollo.
5. Yo la añadiré en Key Vault y la expondré a los entornos QA / Producción mediante la configuración apropiada y pipelines de CI/CD.

Consejo de nombres:
- Usar mayúsculas y _ para separar: EJEMPLO_SERVICE_API_KEY
- Para variables públicas en frontend usar prefijo NEXT_PUBLIC_

---

## 7. Pipelines, despliegues y secretos

- Los pipelines de CI/CD usan variables seguras y/o Key Vault para no exponer secretos en logs.
- Las credenciales de despliegue se manejan con Service Principals y Managed Identities.
- No pongas secretos en variables de pipeline sin marcar como secret (y aun así preferimos Key Vault).

Si necesitas acceso temporal a un recurso, solicita un permiso explícito y registrable.

---

## 8. Buenas prácticas y checklist antes de un PR

- No incluir archivos `.env.local` ni credenciales.
- Validar que las variables públicas (NEXT_PUBLIC_) no contengan secretos.
- Añadir documentación de cualquier variable nueva en el README del servicio.
- Probar localmente con valores de desarrollo/emulación.
- Revisar el pipeline para detectar referencias a variables nuevas.

---

## 9. Tabla de responsabilidades

| Rol | Responsabilidades clave |
| --- | --- |
| Desarrollador | - Escribir código mantenible y seguro. <br> - Usar variables de entorno (process.env). <br> - Mantener `.env.local` privado. <br> - Comunicar necesidades de nuevas variables. |
| DevOps | - Mantener infraestructura en Azure. <br> - Gestionar pipelines CI/CD y secretos. <br> - Configurar Key Vault y permisos. <br> - Monitoreo y alertas de la aplicación. |

---

## 10. Troubleshooting rápido

- Error de conexión a DB local: verificar que Postgres esté corriendo y que DATABASE_URL sea correcta.
- Variables undefined en producción: comprobar Application Settings / Key Vault y reiniciar la App Service si es necesario.
- CORS / 401 en frontend: verificar que la API permita el origen o que los tokens se envíen correctamente.
