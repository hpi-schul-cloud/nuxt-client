<template>
	<VCardText>
		<div>Legacy Lesson: {{ card.id }}</div>
	</VCardText>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { VCardText } from "vuetify/lib";
import { LegacyLessonCard } from "./types/Card";

export default defineComponent({
	name: "CardLegacyTaskReference",
	props: {
		card: {
			type: Object as PropType<LegacyLessonCard>,
			required: true,
		},
	},
	setup(props) {
		return {};
	},
	components: { VCardText },
});
</script>
