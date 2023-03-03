<template>
	<div>
		<VCardText>
			<div>CardID: {{ card.id }}</div>
			<div>Legacy Task: {{ card.taskId }}</div>
		</VCardText>
		<VCardActions>
			<VBtn color="primary" text :href="'/homeworks/' + card.taskId"
				>Aufgabe bearbeiten</VBtn
			>
		</VCardActions>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { LegacyTaskCard } from "./types/Card";

export default defineComponent({
	name: "CardLegacyTaskReference",
	props: {
		card: {
			type: Object as PropType<LegacyTaskCard>,
			required: true,
		},
	},
	setup() {
		return {};
	},
});
</script>
