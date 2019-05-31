# Angular Search User using NodeJS and MongoDb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5.

This application will let you search for a particular user whose name starts with the given search text from a list of predefined users.

Angular features that have been used in this application are
- Modularity for making the code more scalabale and maintainable.
- Lazy Loading is used to load the module only when user interacts with it.
- Interceptors for showing loader while fethcing response from HTTP request.
- Resolver is used so that any route will only be displayed to the user when all the data has    been loaded.
- Bootstrap for enhanced user experience and to make application responsive.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm run start:nodeserver` for a node server. Navigate to `http://localhost:3000/`. This will start the node server.

You can use `ng serve` and `npm run start:nodeserver` simultaneoulsy to run the application.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
