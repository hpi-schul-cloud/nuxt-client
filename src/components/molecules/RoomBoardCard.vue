<template>
	<VCard
		class="mx-auto mb-4 board-card"
		hover
		tabindex="0"
		role="link"
		color="rgba(var(--v-theme-primary-lighten))"
		data-testid="room-board-card"
		@click="openBoard"
		@keydown.enter.self="openBoard"
		@keydown.space.prevent="$emit('on-drag')"
		@keydown.tab="$emit('tab-pressed')"
		@keydown.down.prevent="moveCardDown"
		@keydown.up.prevent="moveCardUp"
	>
		<VCardText>
			<div class="mb-0">
				<div
					class="d-flex align-center justify-space-between mb-3 title-board-card"
				>
					<div class="d-flex align-center">
						<VIcon size="14" class="mr-1" :icon="mdiViewDashboard" />
						<span>
							{{ $t("pages.room.boardCard.label.columnBoard") }}
						</span>
					</div>
					<div>
						<room-dot-menu
							:menu-items="moreActionsMenuItems"
							data-testid="content-card-task-menu"
							:aria-label="$t('pages.room.taskCard.menu.ariaLabel')"
						/>
					</div>
				</div>
			</div>
			<h2 class="text-h6 board-title mt-2">
				{{ $t("pages.room.boardCard.label.courseBoard") }}
			</h2>
		</VCardText>
	</VCard>
</template>

<script setup lang="ts">
import { mdiContentCopy, mdiViewDashboard } from "@/components/icons/material";
import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import RoomDotMenu from "./RoomDotMenu.vue";

const props = defineProps({
	columnBoardItem: { type: Object, required: true },
	courseData: { type: Object, required: true },
	keyDrag: { type: Boolean, required: true },
	dragInProgress: { type: Boolean, required: true },
	role: { type: String, required: true },
});
const emit = defineEmits([
	"tab-pressed",
	"on-drag",
	"move-element",
	"copy-board",
]);

const router = useRouter();
const { t } = useI18n();

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

const moreActionsMenuItems = computed(() => {
	const actions = [];

	if (props.role === Roles.Teacher) {
		actions.push({
			icon: mdiContentCopy,
			action: () => {
				emit("copy-board");
			},
			name: t("common.actions.copy"),
			dataTestId: "content-card-board-menu-copy",
		});
	}

	return actions;
});
</script>

<style lang="scss" scoped>
.title-board-card {
	margin-top: calc(var(--space-base-vuetify) / 2);
}
</style>
