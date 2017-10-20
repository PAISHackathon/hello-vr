"use strict";

const Koa = require("koa");
const app = new Koa();
const mount = require("koa-mount");
const serve = require("koa-static");
const Router = require("koa-router");
const router = new Router();
const logger = require("koa-logger");
const request = require("request-promise-native");
//const mdb = require('./mdb.js')

app.keys = ["im a newer secret", "i like turtle"];

let webpackDevMiddleware = require("koa-webpack-dev-middleware");
let webpack = require("webpack");

let compiler = webpack(require("../webpack.config.js"));

/*app.use(
  webpackDevMiddleware(compiler, {
    publicPath: "/assets/"
  })
);*/
app.use(logger());
app.use(mount("/dist", serve("dist", { gzip: true, maxage: 0 })));

// response
/*app.use(ctx => {
  ctx.body = "Hello Koa";
});*/

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  await next();
});

router.get("/proxy", async function(ctx) {
  console.log(ctx.query.url);
  const res = await request({
    uri: ctx.query.url,
    resolveWithFullResponse: true,
    encoding: null
  }).then(resp => {
    console.log(resp.headers);
    const headers = Object.keys(resp.headers);
    headers.forEach(item => {
      ctx.set(item, resp.headers[item]);
    });

    return resp;
  });
  //console.log(res);
  //ctx.set()
  //ctx.set('Content-Type', 'image/png');
  ctx.body = res.body;
});

router.get("/search", async ctx => {});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
