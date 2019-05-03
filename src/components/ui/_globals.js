// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.

import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

import fs from "fs";
import path from "path";

function readDirRecursiveSync(dir) {
	let results = [];
	const list = fs.readdirSync(dir);
	list.forEach((file) => {
		file = path.join(dir, file);
		const stat = fs.statSync(file);
		if (stat && stat.isDirectory()) {
			/* Recurse into a subdirectory */
			results.push(...readDirRecursiveSync(file));
		} else {
			/* Is a file */
			results.push(file);
		}
	});
	return results;
}

const mountBaseComponents = (globalComponentFiles, getComponentConfig) => {
	for (const fileName of globalComponentFiles) {
		// Get Component Name
		const componentName = fileName.match(/([\w]+).vue$/)[1];
		// Is naming scheme valid?
		if (componentName !== upperFirst(camelCase(componentName))) {
			throw new Error(`${fileName} is not in PascalCase.`);
		}
		// Is it a Entrypoint?
		const isEntrypoint =
			fileName.startsWith(`./${componentName}.vue`) || // standalone component
			fileName.startsWith(`./${componentName}/`); // or root component of folder
		// Globally register the component
		if (isEntrypoint) {
			const componentConfig = getComponentConfig(fileName);
			Vue.component(componentName, componentConfig.default || componentConfig);
		}
	}
};

const mountWithWebpack = () => {
	// https://webpack.js.org/guides/dependency-management/#require-context
	const requireComponent = require.context(
		// Look for files in the current directory
		".",
		// Do not look in subdirectories
		true,
		// Only include "Base" prefixed .vue files
		/Base[\w]+\.vue$/
	);

	mountBaseComponents(requireComponent.keys(), (fileName) =>
		requireComponent(fileName)
	);
};

const mountWithFs = () => {
	const globalComponentFiles = readDirRecursiveSync(__dirname)
		// Only include "Base" prefixed .vue files
		.filter((fileName) => /Base[A-Z][\w]+\.vue$/.test(fileName))
		.map((fileName) => "./" + path.relative(__dirname, fileName));

	mountBaseComponents(globalComponentFiles, (fileName) =>
		require(path.join("../../src/components/ui/", fileName))
	);
};

if (process.env.JEST_WORKER_ID !== undefined) {
	// used for tests (jest)
	mountWithFs();
} else {
	mountWithWebpack();
}
