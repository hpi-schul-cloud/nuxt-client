<template>
	<div
		class="d-flex"
		id="refDiv"
		@keydown.up.down.left.right.prevent="onKeyDown"
		ref="cardHost"
	>
		<VCard
			:height="isLoading ? height : 'auto'"
			class="w-100"
			outlined
			tabindex="0"
			:id="id"
			:ripple="false"
		>
			<template v-if="isLoading">
				<CardSkeleton :height="height" />
			</template>
			<template v-if="!isLoading && card">
				<CardHeader>
					<template v-slot:title>
						<CardHeaderTitleInput
							:value="card.title"
							@change="onUpdateCardTitle"
						></CardHeaderTitleInput>
						{{ card.height }}
					</template>
					<template v-slot:menu>
						<CardHostMenu>
							<CardHostMenuAction @click="onDelete"
								>Delete Card</CardHostMenuAction
							>
						</CardHostMenu>
					</template>
				</CardHeader>

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
import { useElementSize, watchDebounced } from "@vueuse/core";
import { defineComponent, ref } from "vue";
import CardHeader from "./CardHeader.vue";
import CardHeaderTitleInput from "./CardHeaderTitleInput.vue";
import CardHostMenu from "./CardHostMenu.vue";
import CardHostMenuAction from "./CardHostMenuAction.vue";
import CardLegacyLessonReference from "./CardLegacyLessonReference.vue";
import CardLegacyTaskReference from "./CardLegacyTaskReference.vue";
import CardSkeleton from "./CardSkeleton.vue";
import { useCardState } from "./CardState.composable";
import { BoardCardType } from "./types/Card";

export default defineComponent({
	name: "CardHost",
	components: {
		CardSkeleton,
		CardLegacyTaskReference,
		CardLegacyLessonReference,
		CardHeader,
		CardHostMenu,
		CardHostMenuAction,
		CardHeaderTitleInput,
	},
	props: {
		height: { type: Number, required: true },
		id: { type: String, required: true },
	},
	setup(props, { emit }) {
		const cardHost = ref(null);
		const { isLoading, card, updateTitle, deleteCard, updateCardHeight } =
			useCardState(props.id);
		const { height: cardHostHeight } = useElementSize(cardHost);

		const onKeyDown = (key: KeyboardEvent) => {
			emit("move-card-keyboard", key.code);
		};

		const onUpdateCardTitle = updateTitle;
		const onDelete = deleteCard;

		watchDebounced(
			cardHostHeight,
			(newHeight: number) => updateCardHeight(newHeight),
			{ debounce: 500, maxWait: 2000 }
		);

		return {
			isLoading,
			card,
			BoardCardType,
			onKeyDown,
			onUpdateCardTitle,
			onDelete,
			cardHost,
		};
	},
});
</script>
