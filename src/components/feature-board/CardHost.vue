<template>
	<div class="d-flex mb-6">
		<VCard :height="height" class="w-100">
			<template v-if="isLoading">
				<CardSkeleton :height="height"></CardSkeleton>
			</template>
			<template v-if="!isLoading && card">
				<VCardTitle>{{ card.title }}</VCardTitle>
				<CardLegacyTaskReference
					v-if="card.cardType === BoardCardType.LegacyTask"
					:card="card"
				></CardLegacyTaskReference>
				<CardLegacyLessonReference
					v-else-if="card.cardType === BoardCardType.LegacyLesson"
					:card="card"
				></CardLegacyLessonReference>
				<div v-else>Unknown card-type</div>
			</template>
		</VCard>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCardState } from "./CardState.composable";
import CardSkeleton from "./CardSkeleton.vue";
import CardLegacyTaskReference from "./CardLegacyTaskReference.vue";
import CardLegacyLessonReference from "./CardLegacyLessonReference.vue";
import { BoardCardType } from "./types/Card";

export default defineComponent({
	name: "CardHost",
	components: {
		CardSkeleton,
		CardLegacyTaskReference,
		CardLegacyLessonReference,
	},
	props: {
		height: { type: Number, required: true },
		id: { type: String, required: true },
	},
	setup(props) {
		const { isLoading, card } = useCardState(props.id);

		return {
			isLoading,
			card,
			BoardCardType,
		};
	},
});
</script>
