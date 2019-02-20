import { storiesOf } from "@storybook/vue";
import { withMarkdownNotes } from "@storybook/addon-notes";
import typographyDoc from "@docs/stories/typography.md";

storiesOf("Typography", module)
	.addDecorator(withMarkdownNotes(typographyDoc))
	.add("with text", () => ({
		components: {},
		template: `<div>
			<h1 class="h1">H1 / PT Sans Narrow bold 96</h1>
			<h2>H2 / PT Sans Narrow bold 60</h2>
			<h3>H3 / PT Sans Narrow bold 48</h3>
			<h4>H4 / PT Sans Narrow bold 32</h4>
			<h5>H5 / PT Sans Narrow bold 24</h5>
			<h6>H6 / PT Sans Narrow bold 20</h6>
			</div>
			`,
		methods: {},
	}));
