import { fileURLToPath } from "url";
import InitTest from "../tests/init.js";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
await new InitTest(__dirname).start();