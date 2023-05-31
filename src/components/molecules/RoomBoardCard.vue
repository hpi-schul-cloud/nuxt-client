<template>
	<VCard
		class="mx-auto mb-4 board-card"
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
import { defineComponent } from "vue";
import { mdiViewDashboard } from "@mdi/js";
import { useRouter } from "vue-router/composables";

export default defineComponent({
	name: "RoomBoardCard",
	props: {
		id: { type: String, default: "6477489d770242f9200a3df0" },
		keyDrag: { type: Boolean, required: true },
		dragInProgress: { type: Boolean, required: true },
	},
	emits: ["tab-pressed", "on-drag", "move-element"],
	setup(props, { emit }) {
		const router = useRouter();
		const openBoard = () => {
			if (!props.dragInProgress) {
				router.push(`${props.id}/board`);
			}
		};

		const moveCardDown = () => {
			if (props.keyDrag) {
				emit("move-element", {
					id: props.id,
					moveIndex: 1,
				});
			}
		};

		const moveCardUp = () => {
			if (props.keyDrag) {
				emit("move-element", {
					id: props.id,
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
