# SocialITEC

SocialITEC es una plataforma moderna que simplifica la gestión y manejo de documentos del Servicio Social en el Instituto Tecnológico de León.

## 🚀 Getting Started

Follow these steps to clone and run the project on your local machine.

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

```
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

### 📜 License

This project is licensed under the **MIT License**.
