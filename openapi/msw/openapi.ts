import OpenAPIBackend from 'openapi-backend';
import ajvFormats from 'ajv-formats';
import YAML from 'yaml';
import fs from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const definition = YAML.parse(
  fs.readFileSync(resolve(__dirname, '../spec/openapi.yml'), 'utf8')
);

export const api = new OpenAPIBackend({
  definition,
  validate: true,
  customizeAjv: (ajv) => {
    // 文字列型のフォーマット検証を追加
    ajvFormats(ajv);
    return ajv;
  },
});

await api.init();
