<template>
	<VCard
		class="mx-auto mb-4 board-card"
		hover
		tabindex="0"
		role="link"
		color="rgba(var(--v-theme-primary-lighten))"
		@click="openBoard"
		@keydown.enter.self="openBoard"
		@keydown.space.prevent="$emit('on-drag')"
		@keydown.tab="$emit('tab-pressed')"
		@keydown.down.prevent="moveCardDown"
		@keydown.up.prevent="moveCardUp"
	>
		<VCardText>
			<div class="mb-0">
				<div class="d-flex align-center mb-3">
					<VIcon size="14" class="mr-1" :icon="mdiViewDashboard" />
					<span class="title-board-card">
						{{ $t("pages.room.boardCard.label.columnBoard") }}
					</span>
				</div>
			</div>
			<h2 class="text-h6 board-title mt-2">
				{{
					board.title && board.title !== ""
						? board.title
						: $t("pages.room.boardCard.label.courseBoard")
				}}
			</h2>
		</VCardText>
	</VCard>
</template>

<script setup lang="ts">
import { mdiViewDashboard } from "@mdi/js";
import { useRouter } from "vue-router";

const props = defineProps({
	columnBoardItem: { type: Object, required: true },
	courseData: { type: Object, required: true },
	keyDrag: { type: Boolean, required: true },
	dragInProgress: { type: Boolean, required: true },
	board: { type: Object, required: true },
});
const emit = defineEmits(["tab-pressed", "on-drag", "move-element"]);

const router = useRouter();

const openBoard = async () => {
	if (!props.dragInProgress) {
		await router.push(`${props.columnBoardItem.columnBoardId}/board`);
	}
};

const moveCardDown = () => {
	if (props.keyDrag) {
		emit("move-element", {
			id: props.columnBoardItem.id,
			moveIndex: 1,
		});
	}
};

const moveCardUp = () => {
	if (props.keyDrag) {
		emit("move-element", {
			id: props.columnBoardItem.id,
			moveIndex: -1,
		});
	}
};
</script>

<style lang="scss" scoped>
.title-board-card {
	margin-top: calc(var(--space-base-vuetify) / 2);
}
</style>
