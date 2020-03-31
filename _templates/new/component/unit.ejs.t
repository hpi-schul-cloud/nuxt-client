---
to: "src/components/<%= type %>/<%= name %>.unit.js"

---
import <%= name %> from "./<%= name %>";

describe("@components/<%= type %>/<%= name %>", () => {
	it(...isValidComponent(<%= name %>));
});
