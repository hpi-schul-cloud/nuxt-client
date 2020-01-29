import { storiesOf } from "@storybook/vue";

import BaseChip from "./BaseChip";

storiesOf("Base/BaseChip", module).add("default", () => ({
	components: { BaseChip },
	data() {
		return {
			sizes: ["small", "medium", "large"],
			selections: ["medium"],
		};
	},
	methods: {
		toggle(name) {
			if (this.selections.includes(name)) {
				this.selections.splice(this.selections.indexOf(name), 1);
			} else {
				this.selections.push(name);
			}
		},
	},
	template: `
	<div>
		<base-chip
			v-for="size in sizes" :key="size"
			backgroundColor="var(--color-primary)"
			:size="size"
			:selected="selections.includes(size)"
			@click="toggle(size)"
		>
				{{size}} chip
		</base-chip>
	</div>`,
}));
