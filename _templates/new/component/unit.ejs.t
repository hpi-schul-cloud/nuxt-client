---
to: "src/components/<%= type %>/<%= name %>.unit.js"

---
import <%= name %> from './<%= name %>'

describe('@components/<%= name %>', () => {
	it(...isValidComponent(<%= name %>));
})
