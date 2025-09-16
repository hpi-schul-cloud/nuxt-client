/* eslint-disable no-console */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Alias } from "vite";

export function getTsconfigAliases(tsconfigPath = "./tsconfig.json") {
	console.log("> getTsconfigAliases called with tsconfigPath:", tsconfigPath);
	const tsconfig = JSON.parse(readFileSync(resolve(tsconfigPath), "utf-8"));
	const paths = tsconfig.compilerOptions?.paths || {};
	const baseUrl = tsconfig.compilerOptions?.baseUrl || ".";
	const aliases: Alias[] = [];

	const __dirName = dirname(fileURLToPath(import.meta.url));
	const baseDir = resolve(__dirName, "..", "..", baseUrl);
	console.log("Base directory for aliases:", baseDir);

	for (const [key, valueArr] of Object.entries(paths)) {
		// Ensure valueArr is an array and get the first value
		const value = Array.isArray(valueArr) ? valueArr[0] : valueArr;
		// Remove trailing /* from key and value
		const aliasKey = key.replace(/\/\*$/, "");
		const aliasValue = resolve(baseDir, value.replace(/\/\*$/, ""));
		// console.log(`Alias found: ${aliasKey} -> ${aliasValue}`);
		aliases.push({
			find: aliasKey,
			replacement: aliasValue,
		});
	}

	// we filter out the aliases that are not meant for runtime
	// '@@' e.g. has to be configured seperately in vitest.config.ts
	const runtimeAliases = aliases.filter((alias) => alias.find !== "@@");

	return runtimeAliases;
}
