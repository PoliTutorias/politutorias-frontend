# PoliTutorías Frontend

Sistema de gestión de tutorías desarrollado con Next.js 15, desplegado en Vercel.

## Inicio Rápido

### Desarrollo Local

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repo>
   cd politutorias-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.template
   ```
   o crea manualmente una copia del archivo 
   ```bash
   .env.template
   ```
   y renómbralo a
    ```bash
   .env
   ```
   Edita `.env.` con tus valores:
   ```bash
   NEXT_PUBLIC_BACKEND_URL="http://localhost:3001/api"
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   
   El servidor corre por defecto en [http://localhost:3001](http://localhost:3001)



## Scripts Disponibles

```bash
npm run dev          # Desarrollo con Turbopack
npm run build        # Build para producción
npm run start        # Servidor de producción
npm run lint         # Linter
```

## Autenticación

El sistema usa JWT (JSON Web Tokens) con las siguientes características:

- Rotación automática de tokens
- Server Actions de Next.js

### Flujo de Autenticación

1. Usuario hace login → Recibe access y refresh tokens
2. Tokens se guardan en cookies
3. Cada petición incluye el token en header `Authorization`
4. Si el access token expira, se usa refresh token automáticamente
5. Al hacer logout, se limpian todas las cookies

## Tecnologías

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **Forms**: React Hook Form
- **State**: Zustand
- **Icons**: React Icons
- **Build**: Turbopack
- **Deployment**: Vercel

## Equipo

Desarrollado por estudiantes de DTIC - EPN  

- **Anthony Morales** - Scrum
- **Estéfano Proaño** - DevOps
- **Sebastián Guerra** - Discovery
- **Emilio Jácomme** - Backend
- **José Merchán** - Frontend
- **David Quille** - Agile Testing

#### Tutores  
- **Dr. Julio Sandobalín**
- **Dr. Carlos Iñiguez**  
  

---
**Última actualización**: Julio 2026