const { toBeVisible, toBeEmptyDOMElement, toBeInTheDocument } = require("@testing-library/jest-dom/matchers");

global.expect.extend({
	toBeVisible,
	toBeEmptyDOMElement,
	toBeInTheDocument
});
