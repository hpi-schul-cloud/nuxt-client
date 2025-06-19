/*
  Note: This app is for testing purposes only,
  e.g. in order to run the vue client in a docker container on localhost
*/
import connect from "connect";
import { createProxyMiddleware } from "./config/vite/dev-server-config.mjs";

const app = connect();

app.use(createProxyMiddleware({ useVueClientProxy: true }));

app.listen(4242);
