# Dash-Ichthys 🕊️

Plataforma integral para la gestión y administración de iglesias, desarrollada con **Laravel 11**, **React**, **Inertia.js** y **Tailwind CSS**.

## Características Principales

*   **Gestión de Usuarios y Roles:** Control de acceso mediante roles granulares (Super Admin, Pastor, Líder, Colaborador) utilizando `Spatie/Laravel-Permission`.
*   **Directorio de Miembros:** Registro completo de miembros, asistentes regulares y visitas, incluyendo importación masiva desde archivos **Excel**.
*   **Constructor de Formularios:** Crea formularios dinámicos para registros, eventos y recolección de datos personalizados.
*   **Gestión de Ministerios:** Organiza y estructura los diferentes departamentos y grupos de la iglesia.
*   **Configuración del Portal:** Personaliza la apariencia del sistema (nombre de la iglesia, colores institucionales).
*   **API Documentada:** Documentación automática de endpoints mediante **L5-Swagger**.

## Requisitos Previos

*   PHP >= 8.2
*   Composer
*   Node.js >= 20 & NPM
*   MySQL / MariaDB

## Instalación Local

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/patriciomelor/Dash-Ichthys.git
    cd Dash-Ichthys
    ```

2.  **Instalar dependencias de PHP:**
    ```bash
    composer install
    ```

3.  **Instalar dependencias de Node.js:**
    ```bash
    npm install --legacy-peer-deps
    ```

4.  **Configurar entorno:**
    Copia el archivo de configuración y genera la clave de aplicación.
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```
    *(Asegúrate de configurar tus credenciales de base de datos en el archivo `.env`)*

5.  **Ejecutar migraciones y seeders:**
    ```bash
    php artisan migrate --seed
    ```
    *(Esto creará la estructura de base de datos y un usuario administrador por defecto: `admin@dashichthys.com` / `password`)*

6.  **Generar documentación de API:**
    ```bash
    php artisan l5-swagger:generate
    ```

7.  **Iniciar servidores de desarrollo:**
    En una terminal:
    ```bash
    php artisan serve
    ```
    En otra terminal:
    ```bash
    npm run dev
    ```

## Acceso Inicial

*   **URL:** `http://localhost:8000`
*   **Email:** `admin@dashichthys.com`
*   **Contraseña:** `password`

## Estructura Tecnológica

*   **Backend:** Laravel 11
*   **Frontend:** React 18 + Inertia.js
*   **Estilos:** Tailwind CSS
*   **Iconos:** Lucide React
*   **Excel:** Laravel Excel (Maatwebsite)
*   **Documentación API:** L5-Swagger

## Despliegue CI/CD

Este proyecto incluye un archivo de GitHub Actions (`.github/workflows/deploy.yml`) configurado para ejecutar pruebas e integración continua en las ramas `main` y `Dev`.

---
*Desarrollado para Dash-Ichthys.*
