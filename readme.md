# React Typescript Boilerplate

Customized boilerplate for modern ES6 JavaScript environment for `react` with `redux` that can consume `javascript`, `typescript` and `scss`.

## Structure

Separated into two main application parts `public` and `src`.

### `/build/`

This mirrors the server directory where the application will run from. It contains an `index.php` file and `/static` folder.

Webpack outputs all bundled JavaScript files and processed assets from the pipeline to the `/build/static` folder. This folder does not generally need to be touched except to delete previous bundles.

### `/src/`

This contains all the assets required to produce the client side application such as JavaScript and typescript style sheets, files, JSON, images, fonts, SVG etc.

# .env Files

Configuration files based on environment.

These constants are important for when an application sits behind a subdirectory. They are used throughout the application such as with `<BrowserRouter/>` from the `react-router` library which needs to know the root application URL to manage the browser's `History` object.

For this boilerplate, it is assumed the application lives behind `/myAcmeApp`
 such that the application would be served from behind a folder on 
 the root path like `http://acme.com/myAcmeApp`.

**.env.common**

```dotenv
ACME_APPLICATION_NAME='Acme React Typescript Boilerplate
ACME_HOST_NAME=http://acme.com
```

**.env.staging**

```dotenv
NODE_ENV=staging
ACME_PATH=build/static
ACME_PUBLIC_PATH=/myAcmeApp/static/
ACME_SERVED_PATH=/myAcmeApp
ACME_APPLICATION_API=http://staging.acme.com/myAcmeApp/api
```

**.env.production**

```dotenv
NODE_ENV=production
ACME_PATH=build/static
ACME_PUBLIC_PATH=/myAcmeApp/static/
ACME_SERVED_PATH=/myAcmeApp
ACME_APPLICATION_API=http://acme.com/myAcmeApp/api
```

## Todos

* migrate away from babel js solution and fully embrace typescript