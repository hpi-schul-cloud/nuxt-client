import Vue from "vue";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

function mock(name, template) {
	const componentName = upperFirst(camelCase(name));
	Vue.component(componentName, {
		name: componentName,
		template: template,
	});
}

const mockComponents = {
	nuxt: `<div><slot/></div>`,
	"nuxt-child": `<div><slot/></div>`,
	"nuxt-link": `<div><slot/></div>`,
	"no-ssr": `<div><slot/></div>`,
};

Object.keys(mockComponents).forEach((componentName) =>
	mock(componentName, mockComponents[componentName])
);
