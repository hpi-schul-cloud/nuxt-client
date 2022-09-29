<template>
	<div>
		<div class="d-flex flex-row pa-2 mb-4 rounded blue lighten-5 background">
			<div class="mx-2">
				<v-icon class="blue--text text--darken-1">{{ mdiInformation }}</v-icon>
			</div>
			<div>
				Mit dem folgenden Link kann der Kurs als Kopie von anderen Lehrkräften
				importiert werden. Personenbezogene Daten werden dabei nicht importiert.
			</div>
		</div>
		<div class="d-flex justify-space-between">
			<div>Link nur schulintern gültig</div>
			<v-switch
				v-model="shareOptions.schoolInternally"
				color="primary"
				value
				input-value="true"
				class="ma-0"
			></v-switch>
		</div>
		<div class="d-flex justify-space-between">
			<div>Link läuft nach 7 Tagen ab</div>
			<v-switch
				v-model="shareOptions.expiresInSevenDays"
				color="primary"
				value
				input-value="true"
				class="ma-0"
			></v-switch>
		</div>
	</div>
</template>

<script>
import { mdiInformation } from "@mdi/js";
import { defineComponent, reactive, watch } from "@vue/composition-api";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ShareModalOptionsForm",
	// emits: ["shareOptionsChange"],
	setup(props, { emit }) {
		const shareOptions = reactive({
			schoolInternally: true,
			expiresInSevenDays: true,
		});

		watch(shareOptions, (newValue) => {
			emit("share-options-change", newValue);
		});

		emit("share-options-change", shareOptions);
		return {
			shareOptions,
			mdiInformation,
		};
	},
});
</script>
