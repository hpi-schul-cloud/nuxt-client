<template>
	<VCardText>
		<div>CardID: {{ card.id }}</div>
		<div>Legacy Lesson: {{ card.lessonId }}</div>
		<VTextarea></VTextarea>
	</VCardText>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { LegacyLessonCard } from "./types/Card";

export default defineComponent({
	name: "CardLegacyLessonReference",
	props: {
		card: {
			type: Object as PropType<LegacyLessonCard>,
			required: true,
		},
	},
	setup() {
		return {};
	},
});
</script>
