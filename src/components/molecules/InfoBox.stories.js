import { storiesOf } from "@storybook/vue";
import { text, boolean } from "@storybook/addon-knobs";
import InfoBox from "./InfoBox";
import BaseButton from "@basecomponents/BaseButton";
import BaseInput from "@basecomponents/BaseInput/BaseInputCheckbox";

storiesOf("5 Molecules/InfoBox", module)
	.addParameters({

	})
	.add("InfoBox", () => ({
		components: { InfoBox, BaseButton, BaseInput },
			data: () => ({
			active: true,
			header: text("header", "Einverständniserklärung"),
			body: text(
				"content",
				"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
			),
			checked: true,
			unchecked: false,
			labelHidden: boolean("labelHidden", false),
		}),
		template: `	<info-box :active.sync="active">
								<template v-slot:header>{{header}}</template>
								<template v-slot:body>{{body}}</template>
								<template v-slot:actions>
									<base-input
										type="checkbox"
										v-model="unchecked"
										name="switch"
										label="Diese Meldung nicht mehr anzeigen"
										:labelHidden="labelHidden"
									/>

									<base-button design="info outline">Unvollständige auswählen</base-button>
								</template>
							</info-box>`,

	}))
