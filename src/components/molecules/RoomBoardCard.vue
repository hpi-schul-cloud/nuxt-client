<template>
	<VCard
		class="mx-auto mb-4 board-card"
		tabindex="0"
		@click="openBoard"
		@keydown.enter.self="openBoard"
		@keydown.up.down.space.prevent="onKeyPress"
		@keydown.tab="$emit('tab-pressed')"
	>
		<VCardText>
			<div class="mb-0">
				<div class="title-section">
					<VIcon size="14">{{ mdiViewDashboard }}</VIcon>
					Spalten-Board
				</div>
			</div>
			<h6 class="mb-2 board-title mt-1">Kurs-Board</h6>
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
		id: { type: String, default: "646c64347fc09976edcff185" },
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
		const onKeyPress = (e: KeyboardEvent) => {
			console.log(e);
			if (e.key === " ") {
				emit("on-drag");
			}

			if (e.key === "ArrowUp" && props.keyDrag) {
				emit("move-element", {
					id: props.id,
					moveIndex: -1,
				});
			}

			if (e.key === "ArrowDown" && props.keyDrag) {
				emit("move-element", {
					id: props.id,
					moveIndex: 1,
				});
			}
		};

		return {
			mdiViewDashboard,
			openBoard,
			onKeyPress,
		};
	},
});
</script>

<style lang="scss" scoped>
.board-card {
	background-color: var(--v-primary-lighten10);
}
</style>
