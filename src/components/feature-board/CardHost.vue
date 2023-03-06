<template>
	<div class="d-flex" @keydown.up.down.left.right.space.prevent="onKeyDown">
		<VCard :height="height" class="w-100" outlined tabindex="0" :id="id">
			<template v-if="isLoading">
				<CardSkeleton :height="height" />
			</template>
			<template v-if="!isLoading && card">
				<VCardTitle>{{ card.title }}</VCardTitle>
				<CardLegacyTaskReference
					v-if="card.cardType === BoardCardType.LegacyTask"
					:card="card"
				/>
				<CardLegacyLessonReference
					v-else-if="card.cardType === BoardCardType.LegacyLesson"
					:card="card"
				/>
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
	setup(props, { emit }) {
		const { isLoading, card } = useCardState(props.id);

		const onKeyDown = (key: KeyboardEvent) => {
			emit("move-card-keyboard", key.code);
		};

		return {
			isLoading,
			card,
			BoardCardType,
			onKeyDown,
		};
	},
});
</script>
