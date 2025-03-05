# SocialITEC

SocialITEC es una plataforma moderna que simplifica la gestión y manejo de documentos del Servicio Social en el Instituto Tecnológico de León.

## 🚀 Getting Started

Follow these steps to clone and run the project on your local machine.

## Fuentes y Recursos

[Figma](https://www.figma.com/design/FpSHqBpDOTFpBI9ZSE6brA/SocialITEC?node-id=0-1&p=f&t=VLbPfDsGMA4nErl5-0)
[Documentación Tailwind](https://tailwindcss.com/plus/ui-blocks/documentation)
[Página Base](https://bustamante2034.github.io/proyecto/structures/landing-page.html)
[Tablero](https://trello.com/b/WyzQdb5A/tablero-socialitec)

### 📦 Prerequisites

Ensure you have the following installed:

- [Bun](https://bun.sh/) (latest version)
- [Git](https://git-scm.com/)

### 📥 Clone the Repository

Run the following command in your terminal:

```bash
git clone https://github.com/Creator-DevOps/socialitec-frontend.git
```

Navigate to the project directory:

```bash
cd socialitec-frontend
```

### 📦 Install Dependencies

Use **Bun** to install project dependencies:

```bash
bun install
```

### ▶️ Run the Development Server

Start the development server with:

```bash
bun run dev
```

By default, the application will be available at:

```bash
    http://localhost:5173/
```

### 🛠️ Build for Production

To generate an optimized production build:

```bash
bun run build
```

The built files will be located in the `dist/` directory.

### ⚡ Running the Preview Server

To preview the production build:

```bash
bun run preview
```

### ❓ Troubleshooting

- If you encounter issues with Bun, try updating it:

  ```bash
  bun upgrade
  ```

- If Bun is not installed, follow the installation instructions [here](https://bun.sh/docs/installation).

### 🔧 Information about the template: React + TypeScript + Vite

Template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

#### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

---

### Instalación y configuración de tailwindcss

1.En la ruta del proyecto ejecutar

```bash
    npm install tailwindcss @tailwindcss/vite
```

2.Configurar tailwing en la configuración del archivo "vite.config.js"

```bash
    import tailwindcss from '@tailwindcss/vite'

    export default {
     plugins: [
      tailwindcss(),
     ],
    }
```

3.Agregamos la directiva de tailwind en el archivo de estilos principal "index.css"

```bash
    @import "tailwind"
```

4.Ejemplo de uso para agregar color de fondo, borde, margen, padding, color al texto, cambiar tamaño a texto

```bash
    <div className="bg-red"></div>
    <div className="border-red-50"></div>
    <div className="m-4 mr-2 ml-3"></div>
    <div className="p-4 pb-4 pt-2"></div>
    <div className="text-red-50"></div>
    <div className="text-2xl font-bold"></div>
```

## RAMAS, COLABORACIONES Y PULLREQUEST

Este parte explica cómo se gestionan las ramas en el proyecto, los Pull Requests (PR) y las normas para colaborar de manera efectiva.

## Estructura de Ramas

### Rama Principal (`main`)

- La **rama `main`** es la rama principal de producción del proyecto.
- **Solo los administradores** tienen permisos para fusionar cambios en esta rama.
- Esta rama siempre debe estar en un estado funcional y estable.

### Rama de Desarrollo (`development`)

- La **rama `development`** es la rama donde se integran los cambios que están en desarrollo.
- Todos los colaboradores deben hacer sus cambios en ramas individuales y luego realizar Pull Requests hacia la rama `development`.
- **Los cambios en `development` no se fusionan directamente en `main`**, a menos que se haya aprobado el PR por un administrador.

### Ramas de Características o Colaboradores

- **Cada colaborador debe crear una rama específica** para trabajar en sus cambios. Por ejemplo:
  - `feature/nueva-funcionalidad`
  - `feature/cambios-front`
  - `collaborator/nombre-colaborador`
  
- Estas ramas deben ser creadas a partir de `development` y contener solo los cambios relacionados con una única tarea o funcionalidad.
  
## Flujo de Trabajo

### Paso 1: Crear una Rama Nueva para Colaboración

1. Antes de comenzar a trabajar en cualquier cambio, asegúrate de tener la **última versión de la rama `development`** en tu máquina local:

    ```bash
    git checkout development
    git pull origin development
    ```

2. Crea una nueva rama para tus cambios a partir de development:

    ```bash
        git checkout -b nombre-de-tu-rama
    ```

3. Realiza los cambios en tu rama y asegúrate de hacer commits frecuentes con mensajes claros y descriptivos:

    ```bash
        git add .
        git commit -m "Descripción de los cambios realizados"
    ```

### Paso 2: Subir los Cambios a la Rama de Desarrollo

1. Una vez que termines tus cambios, sube tu rama al repositorio remoto:

    ```bash
        git push origin nombre-de-tu-rama
    ```

2. Crea un Pull Request hacia la rama development:

    - Ve a GitHub (o tu plataforma de control de versiones).
    - Abre un Pull Request desde tu rama hacia la rama development.
    - No hagas Pull Requests directamente hacia la rama main

3. En el Pull Request, asegúrate de describir claramente los cambios realizados y cualquier contexto relevante.

    - Puedes asignar a un superisor para revirsar tu cambio

### Paso 3: Revisar y Resolver Conflictos

1. Si hay conflictos entre tu rama y development, resuélvelos antes de continuar con el Pull Request:

    ```bash
        git checkout development
        git pull origin development
        git checkout nombre-de-tu-rama
        git merge development
    ```

    - Resuelve los conflictos manualmente, realiza un commit con los cambios, y luego vuelve a subir los cambios:

        ```bash
            git add .
            git commit -m "Resolución de conflictos"
            git push origin nombre-de-tu-rama
        ```

2. Una vez que el Pull Request sea revisado y aprobado, un administrador fusionará los cambios en development.

### Paso 4: mantener tu Rama Actualizada

1. Antes de continuar trabajando en tu rama, asegúrate de bajar los últimos cambios de development:

    ```bash
        git checkout development
        git pull origin development
        git checkout nombre-de-tu-rama
        git merge development
    ```

2. Si hay conflictos, resuélvelos de manera similar al paso anterior.

3. Realiza tus cambios y vuelve a subirlos a tu rama.

### Paso 5: Fusión a main

1. Antes de continuar trabajando en tu rama, asegúrate de bajar los últimos cambios de development:
    - Una vez que los cambios han sido fusionados en development y todo está aprobado, los administradores harán un Pull Request hacia main.
    - Esto asegura que solo cambios estables y aprobados se fusionen en la rama principal de producción.

### PRECAUCIÓN

- No hacer commits directamente en development ni en main. Siempre trabaja en una rama específica.

### 📜 License

This project is licensed under the **MIT License**.
