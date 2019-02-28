import { storiesOf } from "@storybook/vue";
import { withMarkdownNotes } from "@storybook/addon-notes";
import typographyDoc from "@docs/storybook/typography.md";
// TODO Caption class
storiesOf("Typography", module)
	.addDecorator(withMarkdownNotes(typographyDoc))
	.add("with text", () => ({
		components: {},
		template: `<div>
			<h1 class="h1">H1 / PT Sans Narrow bold</h1>
			<h2 class= "h2">H2 / PT Sans Narrow bold</h2>
			<h3 class= "h3">H3 / PT Sans Narrow bold</h3>
			<h4 class= "h4">H4 / PT Sans Narrow bold</h4>
			<h5 class="h5">H5 / PT Sans Narrow bold</h5>
			<h6 class="h6">H6 / PT Sans Narrow bold</h6>
			<div class="body1">Body 1 / PT Sans regular</div>
			<div class="body2">Body 2 / PT Sans regular</div>
			<div class="caption">caption / PT Sans Narrow regular </div>
			</div>
			`,
		methods: {},
	}));
