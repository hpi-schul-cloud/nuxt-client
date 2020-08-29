import { storiesOf } from "@storybook/vue";
import { text, select } from "@storybook/addon-knobs";

import AccountCard from "./AccountCard";
import BaseIcon from "@basecomponents/BaseIcon";

storiesOf("5 Molecules/AccountCard", module).add("default", () => ({
	components: { AccountCard, BaseIcon },
	data: () => ({
		heading: text("Heading", "Aktuelle Nutzerdaten"),
		readOnly: select("Read-only", [true, false], false),
		data: text("data", "Vorname Nachname"),
	}),
	template: `
	<div>
		<AccountCard :heading="heading" :readonly="readOnly" :data="data" style="max-width: 60ch"/>
		<AccountCard heading="Aktuelles Passwort" :readonly="readOnly" style="max-width: 60ch">
			<template v-slot:icon>
				<base-icon
					source="material"
					icon="lock"
					style="
						margin-top: calc(0.1 * (var(--space-xs)));
						margin-right: var(--space-xs);
						font-size: var(--heading-4);
						color: var(--color-black);
					"
				/>
			</template>
		</AccountCard>
	</div>
	`,
}));
