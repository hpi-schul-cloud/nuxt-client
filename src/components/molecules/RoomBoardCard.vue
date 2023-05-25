<template>
	<VCard
		class="mx-auto mb-4 board-card"
		role="button"
		tabindex="0"
		@click="openBoard"
		@keydown.enter.self="openBoard"
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
		keyDrag: { type: Boolean, required: true },
		dragInProgress: { type: Boolean, required: true },
	},

	setup(props) {
		const router = useRouter();
		const openBoard = () => {
			if (!props.dragInProgress) {
				router.push("646e1722d921ff87bc02f7df/board");
			}
		};
		return {
			mdiViewDashboard,
			openBoard,
		};
	},
});
</script>

<style lang="scss" scoped>
.board-card {
	background-color: rgba(158, 41, 43, 0.1);
}
</style>
