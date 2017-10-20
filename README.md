# hello-vue

> aframe and vue

## Initial Setup

``` bash
# install dependencies
npm install
```

Fill in `config.js` with tmdb and flickr key

# Running
Open 2 terminals. One for `webpack`

```
`npm bin`/webpack --progress --watch
```

Another, for our backend
```
node server/index.js
```

Then, on browser, open:
http://localhost:3000/dist/main

Components can also be viewed separately. Look at the folder name inside webpack config. 
eg: http://localhost:3000/dist/aframe-dpad
