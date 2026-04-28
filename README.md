# Dash-Ichthys 🕊️

Plataforma integral, moderna y dinámica para la gestión y administración avanzada de iglesias, desarrollada con **Laravel 11**, **React**, **Inertia.js** y **Tailwind CSS**.

---

## 🌟 Características Principales

### 📊 Dashboard Dinámico
- Visualización de métricas en tiempo real: Total de miembros, total de ministerios, proporción de miembros vs asistentes.
- Estadísticas de progreso de clases eclesiásticas (Crece, Conectar, Capacita).
- Widgets de recordatorios y celebraciones: Cumpleaños del día, aniversarios de matrimonio, y aniversarios de membresía.
- Listado rápido de miembros añadidos recientemente.

### 👥 Gestión de Miembros
- Registro completo de miembros, asistentes regulares y visitas.
- Seguimiento de clases tomadas, estado civil, fechas importantes (nacimiento, matrimonio, conversión).
- Sistema de comentarios internos y notas pastorales en el perfil de cada miembro.
- Sistema de Etiquetas (Tags) coloreadas para segmentación.
- **Exportación de Datos:** Generación de reportes en **PDF** y exportación de listas completas a **Excel**.
- **Importación Masiva:** Carga rápida de miembros mediante archivos `.xlsx` y `.csv`.

### 🏛️ Gestión de Ministerios
- Organización visual de departamentos de la iglesia.
- Asignación de colores personalizados e iconos dinámicos a cada ministerio.
- Inclusión de miembros directamente a los ministerios para llevar un control de servidores.

### 📝 Constructor de Formularios Dinámicos
- Creación de formularios ilimitados con campos personalizados (Texto, Áreas de texto, Números, Fechas).
- Generación automática de URLs públicas para compartir formularios fuera de la plataforma (ej. inscripciones a retiros, encuestas).
- Recolección de respuestas centralizada y vinculada a la cuenta creadora.

### ⚙️ Configuración Global y Branding
- Personalización completa de la apariencia del sistema (White-labeling).
- Subida de Logo oficial de la iglesia.
- Modificación del nombre de la iglesia y establecimiento dinámico de los colores principales y secundarios (Inyectados directamente vía CSS en tiempo real a toda la interfaz).
- Gestión del diccionario de etiquetas globales (Tags) para todo el sistema.

### 🔐 Seguridad y Roles
- Control de acceso mediante roles granulares y permisos (`Spatie/Laravel-Permission`).
- Rutas públicas seguras para formularios.

---

## 💻 Estructura Tecnológica

*   **Backend:** Laravel 11, PHP 8.2+
*   **Frontend:** React 18, Inertia.js
*   **Estilos y UI:** Tailwind CSS, Headless UI
*   **Iconografía Dinámica:** Lucide React
*   **Base de Datos:** MySQL / MariaDB
*   **Manejo de Archivos Excel:** Laravel Excel (Maatwebsite)
*   **Generación de PDF:** Laravel-DomPDF (Barryvdh)
*   **Documentación API:** L5-Swagger

---

## 🚀 Instalación Local (Desarrolladores)

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/patriciomelor/Dash-Ichthys.git
    cd Dash-Ichthys
    ```

2.  **Instalar dependencias de PHP y Node:**
    ```bash
    composer install
    npm install --legacy-peer-deps
    ```

3.  **Configurar entorno:**
    Copia el archivo `.env.example` a `.env` y genera la clave de aplicación.
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
    *(Configura tus credenciales de BD en el `.env`)*

4.  **Migraciones y Datos por Defecto:**
    ```bash
    php artisan migrate --seed
    ```
    *(Esto creará el usuario administrador por defecto: `admin@dashichthys.com` / `password`)*

5.  **Iniciar el Sistema:**
    ```bash
    # En una terminal:
    php artisan serve
    # En otra terminal:
    npm run dev
    ```

---

## 🌐 Despliegue en Producción (cPanel / Shared Hosting)

El sistema ha sido optimizado para poder ser desplegado en servidores compartidos estándar sin acceso a terminal (SSH) de forma sencilla:

1. **Compilar Assets Locales:**
   Ejecuta `npm run build` en tu entorno local y comprime todo el proyecto excluyendo las carpetas `node_modules` y `.git`.
2. **Subir al Hosting:**
   Sube el `.zip` a un directorio **fuera** de tu `public_html` (ej. `/home/tu_usuario/dash_ichthys`). Extrae el archivo.
3. **Mover la Carpeta Pública:**
   Entra a la carpeta extraída, toma todo el contenido de la carpeta `public/` y muévelo a tu carpeta de dominio público (ej. `public_html` o `public_html/intranet`).
4. **Actualizar Rutas Base:**
   En tu carpeta pública, edita el archivo `index.php` para apuntar a la ubicación real de tu sistema:
   ```php
   require __DIR__.'/../dash_ichthys/vendor/autoload.php';
   $app = require_once __DIR__.'/../dash_ichthys/bootstrap/app.php';
   // Agrega esta línea para que Laravel sepa dónde quedó la carpeta public
   $app->usePublicPath(__DIR__);
   ```
5. **Generar Symlink de Imágenes:**
   Como en cPanel compartido a veces no hay consola para enlazar el disco de almacenamiento local, simplemente ingresa en tu navegador a:
   `https://tudominio.com/setup-symlink`
   El sistema generará el acceso directo automáticamente y los logos se verán correctamente.

---
*Desarrollado para Dash-Ichthys. Versión 1.0 (Release)*
