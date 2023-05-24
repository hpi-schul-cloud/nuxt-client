<template>
	<vCard class="mx-auto mb-4 board-card" @click="handleClick">
		<v-card-text>
			<div class="mb-0">
				<div class="title-section" tabindex="0">
					<v-icon size="14">{{ mdiViewDashboard }}</v-icon>
					Spalten-Board
				</div>
			</div>
			<h6 class="mb-2 task-name mt-1">Kurs-Board</h6>
		</v-card-text>
	</vCard>
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

	setup() {
		const router = useRouter();
		const handleClick = () => {
			router.push("646e1722d921ff87bc02f7df/board");
		};
		return {
			mdiViewDashboard,
			handleClick,
		};
	},
});
</script>

<style lang="scss" scoped>
.board-card {
	background-color: rgba(158, 41, 43, 0.1);
}
</style>
