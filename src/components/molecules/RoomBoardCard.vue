<template>
	<VCard
		class="mx-auto mb-4 board-card"
		:class="{ 'board-hidden': isDraft }"
		hover
		:aria-label="ariaLabel"
		tabindex="0"
		role="link"
		:variant="isDraft ? 'outlined' : 'elevated'"
		data-testid="room-board-card"
		@click="openBoard"
		@keydown.enter.self="openBoard"
		@keydown.space.prevent="$emit('on-drag')"
		@keydown.tab="$emit('tab-pressed')"
		@keydown.down.prevent="onMoveCardDown"
		@keydown.up.prevent="onMoveCardUp"
	>
		<VCardText class="pb-1">
			<div class="top-row-container mb-0">
				<div class="d-flex align-center mb-3 tagline">
					<VIcon size="14" class="mr-1" :icon="mdiViewDashboard" />
					<span class="title-board-card" data-testid="card-title">
						{{ cardTitle }}
					</span>
				</div>
				<div v-if="userRole === Roles.Teacher" class="dot-menu-section">
					<RoomDotMenu
						:menu-items="actionsMenuItems"
						data-testid="content-card-board-menu"
						:aria-label="$t('pages.room.boardCard.menu.ariaLabel')"
					/>
				</div>
			</div>
			<h2 class="text-h6 board-title mt-2" data-testid="board-title">
				{{ boardTitle }}
			</h2>
		</VCardText>
		<VCardActions
			data-testid="content-card-task-actions"
			v-if="isDraft && userRole === Roles.Teacher"
		>
			<VBtn
				v-for="(action, index) in cardActions"
				:key="index"
				:class="`action-button`"
				variant="text"
				color="primary"
				:data-testid="action.dataTestId"
				@click.stop="action.action"
			>
				{{ action.name }}
			</VBtn>
		</VCardActions>
	</VCard>
</template>

<script setup lang="ts">
import {
	mdiPencilOutline,
	mdiTrashCanOutline,
	mdiUndoVariant,
	mdiViewDashboard,
	mdiContentCopy,
	mdiShareVariantOutline,
} from "@/components/icons/material";
import RoomDotMenu from "./RoomDotMenu.vue";
import { computed, PropType } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";

const props = defineProps({
	columnBoardItem: { type: Object, required: true },
	courseData: { type: Object, required: true },
	keyDrag: { type: Boolean, required: true },
	dragInProgress: { type: Boolean, required: true },
	ariaLabel: {
		type: String,
		default: "",
	},
	userRole: { type: String as PropType<Roles>, required: true },
});
const emit = defineEmits([
	"tab-pressed",
	"on-drag",
	"move-element",
	"copy-board",
	"share-board",
	"update-visibility",
	"delete-board",
]);

const router = useRouter();
const { t } = useI18n();

const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

const cardTitle = computed(() => {
	const titlePrefix = t("pages.room.boardCard.label.columnBoard");

	if (isDraft.value) {
		const titleSuffix = ` - ${t("common.words.draft")}`;
		return titlePrefix + titleSuffix;
	}

	return titlePrefix;
});

const isDraft = computed(() => {
	return !props.columnBoardItem.published;
});

const onPublish = () => {
	emit("update-visibility", true);
};

const onUnpublish = () => {
	emit("update-visibility", false);
};

const openBoard = async () => {
	if (!props.dragInProgress) {
		await router.push(`${props.columnBoardItem.columnBoardId}/board`);
	}
};

const onMoveCardDown = () => {
	if (props.keyDrag) {
		emit("move-element", {
			id: props.columnBoardItem.id,
			moveIndex: 1,
		});
	}
};

const onMoveCardUp = () => {
	if (props.keyDrag) {
		emit("move-element", {
			id: props.columnBoardItem.id,
			moveIndex: -1,
		});
	}
};

const cardActions = [
	{
		action: onPublish,
		name: t("common.action.publish"),
		dataTestId: "content-card-board-menu-publish",
	},
];

const boardTitle = computed(() => {
	return props.columnBoardItem.title && props.columnBoardItem.title !== ""
		? props.columnBoardItem.title
		: t("pages.room.boardCard.label.courseBoard").toString();
});

const actionsMenuItems = computed(() => {
	const actions = [];

	actions.push({
		icon: mdiPencilOutline,
		action: openBoard,
		name: t("common.actions.edit"),
		dataTestId: "content-card-board-menu-edit",
	});

	actions.push({
		icon: mdiContentCopy,
		action: () => emit("copy-board"),
		name: t("common.actions.copy"),
		dataTestId: "content-card-board-menu-copy",
	});

	if (envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SHARE) {
		actions.push({
			icon: mdiShareVariantOutline,
			action: () => emit("share-board"),
			name: t("common.actions.shareBoard"),
			dataTestId: "content-card-board-menu-share",
		});
	}

	if (!isDraft.value) {
		actions.push({
			icon: mdiUndoVariant,
			action: onUnpublish,
			name: t("pages.room.cards.label.revert"),
			dataTestId: "content-card-board-menu-unpublish",
		});
	}

	actions.push({
		icon: mdiTrashCanOutline,
		action: () => emit("delete-board"),
		name: t("common.actions.remove"),
		dataTestId: "content-card-board-menu-remove",
	});

	return actions;
});
</script>

<style lang="scss" scoped>
.title-board-card {
	font-size: 14px;
}

.board-hidden {
	.board-title {
		opacity: 0.5;
	}

	.tagline {
		opacity: 0.65;
	}
}

.top-row-container {
	display: grid;
	grid-template-columns: 94% 6%;
	align-items: center;

	.tagline {
		text-align: left;

		.v-icon {
			padding-bottom: var(--space-xs-4);
		}
	}

	.dot-menu-section {
		text-align: right;
		height: calc(var(--space-base-vuetify) * 9);
	}
}
</style>
