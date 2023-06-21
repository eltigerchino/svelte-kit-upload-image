import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const directories = __dirname.split("/");
const i = directories.indexOf("server");
export const projectRoot = directories.slice(0, i).join("/");
