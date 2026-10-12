import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Post-process script for OpenAPI Generator
 * Replaces the generated base path expression in common.ts with a custom one
 *
 * Unfortunately, OpenAPI Generator does not provide a built-in way to customize this expression, so we need to replace it manually.
 */

const generatedFile = process.argv[2];
if (!generatedFile || path.basename(generatedFile) !== "common.ts") {
	process.exit(0);
}

const generatedBasePathExpression =
	"url: (axios.defaults.baseURL ? '' : configuration?.basePath ?? basePath) + axiosArgs.url";
const basePathExpression = "url: (configuration?.basePath ?? basePath) + axiosArgs.url";
const source = await readFile(generatedFile, "utf8");

if (source.includes(generatedBasePathExpression)) {
	await writeFile(generatedFile, source.replace(generatedBasePathExpression, basePathExpression));
} else if (!source.includes(basePathExpression)) {
	throw new Error(`Unexpected generated API URL expression in ${generatedFile}`);
}
