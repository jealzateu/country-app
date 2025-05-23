# CountryApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.12.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Installation

If you have just cloned the repository, run:

```bash
npm install
```
to install all dependencies before starting the development server.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

To execute unit tests with coverage report, run:

```bash
ng test --watch=false --code-coverage
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
npx cypress open
```

## Continuous Integration (CI) commands

The following commands should be run as part of the CI pipeline:

```bash
ng lint
ng test --watch=false --code-coverage
ng build --configuration=production
```

## Architectural Decisions
**Modular Structure:**

- **_core/:_** Singleton services, interceptors, and modules imported once application-wide.

- **_shared/:_** Reusable components, pipes, and directives used across different features.

- **_features/:_** Domain-specific modules, such as countries, grouping all related functionality.

- **_Angular Signals:_** Used for reactive state management in services, for example in FavoritesService.

- **_Change Detection Strategy:_** Use of OnPush strategy in components to optimize performance and minimize unnecessary renders.

- **_Routing:_** Implementation of lazy loading to improve load times by loading feature modules only when needed.

- **_Folder Organization:_** Clear separation of concerns to facilitate project scalability and maintainability.

- **_Pipes and Directives:_** Custom pipes like region-name and truncate for data formatting, and directives such as autofocus for DOM behavior enhancement, promoting reusable and clean templates.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
