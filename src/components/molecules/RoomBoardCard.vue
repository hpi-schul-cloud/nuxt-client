<template>
	<VCard
		class="mx-auto mb-4 board-card"
		hover
		tabindex="0"
		@click="openBoard"
		@keydown.enter.self="openBoard"
		@keydown.space.prevent="$emit('on-drag')"
		@keydown.tab="$emit('tab-pressed')"
		@keydown.down.prevent="moveCardDown"
		@keydown.up.prevent="moveCardUp"
	>
		<VCardText>
			<div class="mb-0">
				<div class="d-flex align-center">
					<VIcon size="14" class="mr-1">{{ mdiViewDashboard }}</VIcon>
					{{ $t("pages.room.taskCard.label.columnBoard") }}
				</div>
			</div>
			<h6 class="board-title mt-2">
				{{ $t("pages.room.taskCard.label.courseBoard") }}
			</h6>
		</VCardText>
	</VCard>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { mdiViewDashboard } from "@mdi/js";
import { useRouter } from "vue-router/composables";
import { setBoardBreadcrumbs } from "../feature-board/shared/BoardBreadcrumbs.composable";
import VueI18n from "vue-i18n";

export default defineComponent({
	name: "RoomBoardCard",
	props: {
		columnBoardItem: { type: Object, required: true },
		courseData: { type: Object, required: true },
		keyDrag: { type: Boolean, required: true },
		dragInProgress: { type: Boolean, required: true },
	},
	emits: ["tab-pressed", "on-drag", "move-element"],
	setup(props, { emit }) {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		const router = useRouter();

		const openBoard = async () => {
			setBoardBreadcrumbs(
				props.courseData.courseName,
				`/rooms/${props.courseData.courseId}`,
				i18n?.t("components.board").toString()
			);
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

		return {
			mdiViewDashboard,
			moveCardDown,
			moveCardUp,
			openBoard,
		};
	},
});
</script>

<style lang="scss" scoped>
.board-card {
	background-color: var(--v-primary-lighten10);
}
</style>
