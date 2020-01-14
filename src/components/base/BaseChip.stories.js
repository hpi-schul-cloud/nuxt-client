import { storiesOf } from "@storybook/vue";

import BaseChip from "./BaseChip";

storiesOf("Base|BaseChip", module).add("default", () => ({
	components: { BaseChip },

	template: `
	<div>
		<base-chip backgroundColor="var(--color-primary)" size="small">small chip</base-chip>
		<base-chip backgroundColor="var(--color-secondary)" size="medium">medium chip</base-chip>
		<base-chip backgroundColor="var(--color-tertiary)" size="large">large chip</base-chip>
		<br/>
		<base-chip backgroundColor="var(--color-primary)" size="small" :selected="true">small chip</base-chip>
		<base-chip backgroundColor="var(--color-secondary)" size="medium" :selected="true">medium chip</base-chip>
		<base-chip backgroundColor="var(--color-tertiary)" size="large" :selected="true">large chip</base-chip>
	</div>`,
}));
