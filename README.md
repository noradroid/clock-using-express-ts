# Express clock in TypeScript

- [Express basics](#express-basics)
  - [Running an Express app](#running-an-express-app)
  - [Starting the webserver with `.listen()`](#starting-the-webserver-with-listen)
  - [Routing](#routing)
  - [Wildcard routes](#wildcard-routes)
  - [Redirection](#redirection)
  - [Serving static files](#serving-static-files)
- [Migrating to TypeScript](#migrating-to-typescript)
  - [TypeScript config file](#typescript-config-file)
  - [Transpilation command](#transpilation-command)
- [What is `path.join(__dirname, '/public')`?](#what-is-pathjoin__dirname-public)
- [Difficulties faced](#difficulties-faced)
  - [Not able to display webpage properly on Brave browser, `time.js` file would not get loaded](#not-able-to-display-webpage-properly-on-brave-browser-timejs-file-would-not-get-loaded)


### Express basics

#### Running an Express app

```console
node index.js
```

#### Starting the webserver with `.listen()`

We need to call `app.listen(PORT)` so that the webserver will start on port `PORT` and listen to incoming requests to view a certain document. E.g.

```ts
app.listen(3000);
```

will allow the websever to be viewed at `localhost:3000` so viewers can visit this URL to view the website.

Thus the `.listen()` command is a MUST!

We can also get the webserver to start on both HTTP and HTTPS by using the `.createServer()` method from both the `http` and `https` standard libraries:

```ts
const express = require('express');
const https = require('https');
const http = require('http');
const app = express();

http.createServer(app).listen(80);
https.createServer(options, app).listen(443); // not sure what options is
```


#### Routing

Respond to HTTP requests by defining the requested route, request HTTP method (GET, PUT, POST, DELETE etc.) and a function for responding to the request. The format is as below:

```ts
app.METHOD(ROUTE, FUNCTION)
```

where `FUNCTION` takes in two parameters `request` and `response`, which are the same objects that Node uses in the callback function when running `.createServer()`.

E.g. responding to a GET request to base route '/'

```ts
app.get('/', (req, res) => {
  res.send('Hello World!');
});
```

E.g. responding to a POST request to '/profile' route

```ts
app.post('/profile', (req, res) => {
  res.send('Respond to POST request');
});
```

For any undefined / unhandled routes in the app, it will return a `404 NOT FOUND` error and return an error page document.


#### Wildcard routes

Can define wildcard routes by using `*`, e.g.

```ts
app.get('/*'. (req, res) => {
  // code
});
```


#### Redirection

Can redirect requests with `response.redirect()` method, which takes in an optional status code (defaults to `302 FOUND`) and a destination path, e.g.

```ts
app.get('/*', (req, res) => {
  res.redirect(301, '/');
});
```


#### Serving static files

We use functions known as "middleware functions" to serve static files, in particular the `express.static` middleware.

```ts
express.static(DIR, options?)
```

To use middleware functions, call the `.use()` method and pass in the middleware:

```ts
app.use(express.static('public'));
```

This serves the static files belonging in the 'public' directory and allows them to be accessed on the browser.

If a file is inside the 'public' folder like 'public/image.png', then when served it would be found at the `/image.png` route - the name of the static directory will not appear as part of the route.

You can also serve files on a "virtual path", which means a path that does not actually exist physically, but will be mapped as the directory route where your files are served to, e.g.

```ts
app.use('/static', express.static('public'));
```

will serve the 'public/image.png' file to `/static/image.png`.

Other than this, you might also need to use the `res.sendFile()` function to serve a specific html file to the browser.
However, if you have a "index.html" file, express will automatically serve that file.


### Migrating to TypeScript

To migrate to typescript, you need to
- have files written in `.ts` (of course)
- have a folder to contain typescript files and a separate folder that will contain the transpilation of typescript into javascript
  - the separate folder would be something like your output folder ("build" or "public")
  - typescript files could be in a "src" folder
- write a `tsconfig.json` config file

#### TypeScript config file

Basic `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "outDir": "./public",
    "allowJs": true,
    "target": "es5",
  },
  "include": ["./src/**/*"]
}
```

- `include` to include all typescript files that should be transpiled
- `outDir` as the output directory of the transpiled files
- `allowJs` to allow javascript files to be included in the transpilation / not throw arrow if they exist
- `target` as in target version / backward compatibility that we are aiming for. E.g. `es5` means we want to convert the newer javascript code into the older ECMAScript 5 version so that it can be processed by older browsers

#### Transpilation command

```console
tsc
```

Just `tsc` (or `npx tsc` if you do not have typescript installed) and it will transpile code based on the above config file.


### What is `path.join(__dirname, '/public')`?

`__dirname` is an environment variable that tells the absolute path of the directory the currently executing file is in.

`path.join()` is a method from the node standard library `path` (included by doing `const path = require('path');`) that combines two strings into a path string. Hence, we are joining the current directory name (e.g. 'C:/code/project') and the '/public' directory to create a path string (e.g. 'C:/code/project/public').

### Difficulties faced

#### Not able to display webpage properly on Brave browser, `time.js` file would not get loaded

Works on other browsers (Edge, Firefox, Chrome) but does not work on Brave.

Error 1:

> Uncaught SyntaxError: Unexpected token '<' (at time.js:1:1)

Error 2 (when using `type="module"` attribute): 

> Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/html". Strict MIME type checking is enforced for module scripts per HTML spec.
