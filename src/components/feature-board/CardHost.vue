<template>
	<div class="d-flex" @keydown.up.down.left.right.prevent="onKeyDown">
		<VCard
			:height="height"
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
import { defineComponent } from "vue";
import { useCardState } from "./CardState.composable";
import CardSkeleton from "./CardSkeleton.vue";
import CardLegacyTaskReference from "./CardLegacyTaskReference.vue";
import CardLegacyLessonReference from "./CardLegacyLessonReference.vue";
import CardHeader from "./CardHeader.vue";
import CardHostMenu from "./CardHostMenu.vue";
import CardHostMenuAction from "./CardHostMenuAction.vue";
import CardHeaderTitleInput from "./CardHeaderTitleInput.vue";
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
		const { isLoading, card, updateTitle, deleteCard } = useCardState(props.id);

		const onKeyDown = (key: KeyboardEvent) => {
			emit("move-card-keyboard", key.code);
		};

		const onUpdateCardTitle = updateTitle;
		const onDelete = deleteCard;

		return {
			isLoading,
			card,
			BoardCardType,
			onKeyDown,
			onUpdateCardTitle,
			onDelete,
		};
	},
});
</script>
