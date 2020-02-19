import { storiesOf } from "@storybook/vue";

import FormDatasourceLogin from "./FormDatasourceLogin";

storiesOf("6 Organisms", module).add("FormDatasourceLogin", () => ({
	components: { FormDatasourceLogin },
	template: `<FormDatasourceLogin>
		<template v-slot:inputs="{ config }">
			<base-input
				v-model="config.username"
				type="text"
				label="Benutzername"
				:placeholder="'WebUntis Nutzername'"
				class="mt--md"
				>
					<template v-slot:icon>
						<base-icon source="custom" icon="user" />
					</template>
			</base-input>
			<base-input
				v-model="config.password"
				type="password"
				label="Passwort"
				:placeholder="'WebUntis Passwort'"
				class="mt--md"
				>
					<template v-slot:icon>
						<base-icon source="custom" icon="lock" />
					</template>
			</base-input>
			<base-input
				v-model="config.url"
				type="text"
				label="URL"
				:placeholder="'URL der Datenquellen'"
				class="mt--md"
				/>

		</template>
	/>`,
	data: () => ({
		config: {
			target: "webuntis",
			username: "Anna",
			password: "12367",
			url: "www.webunits.de",
		},
	}),
}));
