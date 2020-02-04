import { storiesOf } from "@storybook/vue";

import FormActions from "./FormActions";
import BaseButton from "@basecomponents/BaseButton";

storiesOf("5 Molecules/FormActions", module).add("default", () => ({
	components: { FormActions, BaseButton },
	template: `
		<FormActions>
			<template v-slot:primary>
				<base-button design="primary">Speichern</base-button>
				<base-button design="text">Abbrechen</base-button>
			</template>
			<template v-slot:secondary>
				<base-button design="danger text">Löschen</base-button>
			</template>
		</FormActions>`,
}));
