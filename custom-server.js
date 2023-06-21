// https://kit.svelte.dev/docs/adapter-node#custom-server
// https://github.com/lukeed/polka/tree/master/examples/with-sirv
import { handler } from "./build/handler.js";
import polka from "polka";
import serveStatic from "serve-static";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { PORT = 3000 } = process.env;
const dir = path.join(__dirname, "build/public");
const serve = serveStatic(dir);

polka()
  .use(serve)
  .use(handler)
  .listen(PORT, () => {
    console.log(`> Running on localhost:${PORT}`);
  });
