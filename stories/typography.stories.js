import { storiesOf } from "@storybook/vue";
import notes from "@docs/storybook/typography.md";

storiesOf("1 Design Tokens/Typography", module)
	.addParameters({
		notes,
	})
	.add("Headlines & Text", () => ({
		components: {},
		template: `
			<div>
				<h1 class="h1">H1 / PT Sans Narrow</h1>
				<h2 class= "h2">H2 / PT Sans Narrow</h2>
				<h3 class= "h3">H3 / PT Sans Narrow</h3>
				<h4 class= "h4">H4 / PT Sans Narrow</h4>
				<h5 class="h5">H5 / PT Sans Narrow</h5>
				<h6 class="h6">H6 / PT Sans Narrow</h6>
				<p class="text-lg">text-lg / PT Sans regular</p>
				<p class="text-md">text-md / PT Sans regular</p>
				<p class="text-sm">text-sm / PT Sans regular</p>
				<p class="text-xs">text-xs / PT Sans regular</p>
			</div>
			`,
		methods: {},
	}))
	.add("Line-Heights", () => ({
		components: {},
		template: `
			<div>
				<p style="line-height: var(--line-height-xl); border-top: solid 1px gray; border-bottom: solid 1px gray;">line-height-xl 2</p>
				<p style="line-height: var(--line-height-lg); border-top: solid 1px gray; border-bottom: solid 1px gray;">line-height-lg 1.4</p>
				<p style="line-height: var(--line-height-md); border-top: solid 1px gray; border-bottom: solid 1px gray;">line-height-md 1.2</p>
				<p style="line-height: var(--line-height-sm); border-top: solid 1px gray; border-bottom: solid 1px gray;">line-height-sm 1.05</p>
			</div>
			`,
		methods: {},
	}));
