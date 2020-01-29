import { storiesOf } from "@storybook/vue";
import notes from "@docs/storybook/typography.md";

storiesOf("Styles/Typography", module)
	.addParameters({
		notes,
	})
	.add("Size & Font", () => ({
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
	}));
