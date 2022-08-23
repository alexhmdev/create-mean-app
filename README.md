# Create-mean-app

This package will create a simple MEAN stack app

## Run the following comand:

`npx create-mean-app`

Then write your appname like this:

```
Enter your app name: my-app-name
```

This package will generate two folders:

```
my-app-name-backend/
my-app-name-frontend/
```

- First with the suffix frontend as an angluar blank app

```
angular.json
karma.conf.js
package.json
README.md
src/
tsconfig.app.json
tsconfig.json
tsconfig.spec.json
```

- Second with the suffix backend which is an express with mongoose template with some helpers (libraries folder)

```
config/
libraries/
middlewares/
models/
routes/
server.js
```
