import path from "path";
import { isDev } from "./check.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
// utilsディレクトリから一つ階層を上がる
const __dirname = path.join(
  path.dirname(__filename),
  '../'
);

export function publicDirectoryPath (filename?: string) : string {
  return path.join(
    __dirname,
    isDev() ? '../../client/dist' : 'public',
    ...(filename ? [filename] : [])
  )
};
