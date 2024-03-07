<template>
	<VCard
		class="mx-auto mb-4 board-card"
		hover
		tabindex="0"
		role="link"
		data-testid="room-board-card"
		@click="openBoard"
		@keydown.enter.self="openBoard"
		@keydown.space.prevent="$emit('on-drag')"
		@keydown.tab="$emit('tab-pressed')"
		@keydown.down.prevent="moveCardDown"
		@keydown.up.prevent="moveCardUp"
	>
		<template #item>
			<div class="d-flex align-center">
				<VIcon size="14" class="mr-1" :icon="mdiViewDashboard" />
				<span class="title-board-card">
					{{ $t("pages.room.boardCard.label.columnBoard") }}
				</span>
			</div>
		</template>
		<template #append>
			<div>
				<RoomDotMenu
					:menu-items="actionsMenuItems()"
					data-testid="content-card-board-menu"
					:aria-label="$t('pages.room.boardCard.menu.ariaLabel')"
				/>
			</div>
		</template>
		<VCardText>
			<h2 class="text-h6 mt-0">
				{{ boardTitle }}
			</h2>
		</VCardText>
	</VCard>
</template>

<script setup lang="ts">
import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";
import {
	mdiPencilOutline,
	mdiTrashCanOutline,
	mdiViewDashboard,
} from "@mdi/js";
import { PropType, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import RoomDotMenu from "./RoomDotMenu.vue";

const props = defineProps({
	columnBoardItem: { type: Object, required: true },
	courseData: { type: Object, required: true },
	keyDrag: { type: Boolean, required: true },
	dragInProgress: { type: Boolean, required: true },
	role: {
		type: String as PropType<Roles>,
		required: false,
		default: Roles.Teacher,
	},
});

const emit = defineEmits([
	"tab-pressed",
	"on-drag",
	"move-element",
	"delete-board",
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

const boardTitle = computed(() => {
	return props.columnBoardItem.title && props.columnBoardItem.title !== ""
		? props.columnBoardItem.title
		: t("pages.room.boardCard.label.courseBoard").toString();
});

const actionsMenuItems = () => {
	const roleBasedMoreActions = [];

	if (props.role === Roles.Teacher) {
		roleBasedMoreActions.push({
			icon: mdiPencilOutline,
			action: openBoard,
			name: t("common.actions.edit"),
			dataTestId: "content-card-board-menu-edit",
		});
		roleBasedMoreActions.push({
			icon: mdiTrashCanOutline,
			action: () => emit("delete-board"),
			name: t("common.actions.remove"),
			dataTestId: "content-card-board-menu-remove",
		});
	}

	return roleBasedMoreActions;
};
</script>
<style scoped>
.title-board-card {
	font-size: 14px;
}
</style>
