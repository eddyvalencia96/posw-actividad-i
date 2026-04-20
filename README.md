# EcommerceAdmin

This administration panel serves as the central hub for managing core operations of the e-commerce platform. It provides comprehensive tools for managing the product catalog, overseeing user accounts, processing orders, and monitoring system metrics to ensure smooth daily operations.

## 🚀 Getting Started

### Prerequisites
Before running this project, ensure you have the following installed:
*   Node.js: Version 16.0.0 or higher
*   Angular CLI: Must be installed globally (`ng add @angular/cli`)

### Installation
To install dependencies, run:
```bash
npm install
```

## 🚀 Usage

### 🌐 Development Server
To start a local development server, run:
```bash
ng serve
```
Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### 🔬 Code Scaffolding
Angular CLI includes powerful code scaffolding tools. To generate a new component, run:
```bash
ng generate component component-name
```
For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:
```bash
ng generate --help
```

### 🏗️ Building
To build the project for deployment, run:
```bash
ng build
```
This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### 🧪 Testing
Run unit tests using the Vitest test runner with:
```bash
ng test
```
For end-to-end (e2e) testing, run:
```bash
ng e2e
```

## 📚 Key Architectural Notes
*   **State Management:** The application utilizes [NgRx](https://ngrx.dev/) for centralized and predictable state management across complex features.
*   **API Endpoints:** All communication with the backend is standardized through the `/api/v1/...` endpoint group.
*   **Styling:** We follow **[SCSS Variables and Mixins]** to ensure global theme consistency across all modules.

## ⚙️ CLI Reference
For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

(This section follows the standard Angular CLI template for developer reference.)