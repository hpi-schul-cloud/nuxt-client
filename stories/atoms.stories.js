import { storiesOf } from "@storybook/vue";

storiesOf("3 Atoms", module).add("3 Atoms", () => ({
	template: `
	<div>
	<h1>Atoms</h1>
	<p>Atoms are the basic building blocks of the UI. Layouts are very abstract and are usually not usable on their own. They can be combined to molecules.</p>
	</div>
	`,
}));
