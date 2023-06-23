<template>
	<VCard
		class="mx-auto mb-4 board-card"
		hover
		tabindex="0"
		role="button"
		color="var(--v-primary-lighten)"
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
					<VIcon size="14" class="mr-1">{{ mdiViewDashboard }}</VIcon>
					<span class="title-board-card">
						{{ $t("pages.room.boardCard.label.columnBoard") }}
					</span>
				</div>
			</div>
			<h6 class="board-title mt-2">
				{{ $t("pages.room.boardCard.label.courseBoard") }}
			</h6>
		</VCardText>
	</VCard>
</template>

<script lang="ts">
import { I18N_KEY, injectStrict } from "@/utils/inject";
import { mdiViewDashboard } from "@mdi/js";
import { defineComponent } from "vue";
import { useRouter } from "vue-router/composables";
import { setBoardBreadcrumbs } from "../feature-board/shared/BoardBreadcrumbs.composable";

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
		const i18n = injectStrict(I18N_KEY);
		const router = useRouter();

		const openBoard = async () => {
			setBoardBreadcrumbs(
				props.courseData.courseName,
				`/rooms/${props.courseData.courseId}`,
				i18n.t("components.board").toString()
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
.title-board-card {
	margin-top: calc(var(--space-base-vuetify) / 2);
}
</style>
