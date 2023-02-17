<template>
	<VCardText>
		<div>{{ card.id }}</div>
	</VCardText>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { VCardText } from "vuetify/lib";
import { LegacyTaskCard } from "./types/Card";

export default defineComponent({
	name: "CardLegacyTaskReference",
	props: {
		card: {
			type: Object as PropType<LegacyTaskCard>,
			required: true,
		},
	},
	setup(props) {
		return {};
	},
	components: { VCardText },
});
</script>
