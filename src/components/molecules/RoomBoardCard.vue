<template>
	<VCard
		class="mx-auto mb-4 board-card"
		:hover="vuetifyHover"
		tabindex="0"
		role="button"
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
			<h6 class="board-title mt-2">
				{{ $t("pages.room.boardCard.label.courseBoard") }}
			</h6>
		</VCardText>
	</VCard>
</template>

<script setup lang="ts">
import { mdiViewDashboard } from "@mdi/js";
import { useRouter } from "vue-router";

/**
 * VUE3_UPGRADE
 * - There is a bug report on Vuetify that using the hover attribute on v-card components is problematic.
 * - https://github.com/vuetifyjs/vuetify/issues/17574
 * - Remove this 'vuetifyHover' flag after the upcoming Vuetify release if the issue is solved.
 */
const vuetifyHover = false;

const props = defineProps({
	columnBoardItem: { type: Object, required: true },
	courseData: { type: Object, required: true },
	keyDrag: { type: Boolean, required: true },
	dragInProgress: { type: Boolean, required: true },
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
