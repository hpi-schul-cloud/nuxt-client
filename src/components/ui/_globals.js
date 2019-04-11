// Globally register all base components for convenience, because they
// will be used very frequently. Components are registered using the
// PascalCased version of their file name.

import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context(
	// Look for files in the current directory
	".",
	// Do not look in subdirectories
	true,
	// Only include "Base" prefixed .vue files
	/Base[\w]+\.vue$/
);

// For each matching file name...
requireComponent.keys().forEach((fileName) => {
	// Get the component config
	const componentConfig = requireComponent(fileName);
	// Get Component Name
	const componentName = fileName.match(/([\w]+).vue$/)[1];
	// Is naming scheme valid?
	if (componentName !== upperFirst(camelCase(componentName))) {
		return console.error(`${fileName} is not in PascalCase.`);
	}
	// Is it a Entrypoint?
	const isEntrypoint =
		fileName.startsWith(`./${componentName}.vue`) || // standalone component
		fileName.startsWith(`./${componentName}/`); // or root component of folder
	// Globally register the component
	if (isEntrypoint) {
		Vue.component(componentName, componentConfig.default || componentConfig);
	}
});
