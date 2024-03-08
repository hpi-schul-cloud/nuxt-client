<template>
	<VCard
		class="mx-auto mb-4 board-card"
		:class="getStyleClasses()"
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
		@keydown.down.prevent="moveCardDown"
		@keydown.up.prevent="moveCardUp"
	>
		<VCardText class="pb-1">
			<div class="top-row-container mb-0">
				<div class="d-flex align-center mb-3 tagline">
					<VIcon size="14" class="mr-1" :icon="mdiViewDashboard" />
					<span class="title-board-card">
						{{ cardTitle() }}
					</span>
				</div>
				<div class="dot-menu-section" v-if="!isDraft && role === Roles.Teacher">
					<RoomDotMenu
						:menu-items="moreActionsMenuItems"
						data-testid="content-card-board-menu"
						:aria-label="$t('pages.room.boardCard.menu.ariaLabel')"
					/>
				</div>
			</div>
			<h2 class="text-h6 board-title mt-2">
				{{ boardTitle }}
			</h2>
		</VCardText>
		<VCardActions
			data-testid="content-card-task-actions"
			v-if="isDraft && role === Roles.Teacher"
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
import { mdiUndoVariant, mdiViewDashboard } from "@mdi/js";
import RoomDotMenu from "./RoomDotMenu.vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { ImportUserResponseRoleNamesEnum as Roles } from "@/serverApi/v3";

const { t } = useI18n();

const props = defineProps({
	columnBoardItem: { type: Object, required: true },
	courseData: { type: Object, required: true },
	keyDrag: { type: Boolean, required: true },
	dragInProgress: { type: Boolean, required: true },
	ariaLabel: {
		type: String,
		default: "",
	},
	role: { type: String, required: true },
});
const emit = defineEmits([
	"tab-pressed",
	"on-drag",
	"move-element",
	"publish-board",
	"revert-board",
]);

const router = useRouter();

const cardTitle = () => {
	const titlePrefix = t("pages.room.boardCard.label.columnBoard");
	let titleSuffix = "";

	if (isDraft.value) {
		titleSuffix = ` - ${t("common.words.draft")}`;
	}

	return titlePrefix + titleSuffix;
};

const getStyleClasses = () => {
	return isDraft.value ? "board-hidden" : "";
};

const isDraft = computed(() => {
	return !props.columnBoardItem.published;
});

const handlePublish = () => {
	emit("publish-board");
};

const handleRevert = () => {
	emit("revert-board");
};

const openBoard = async () => {
	if (!props.dragInProgress) {
		await router.push(`${props.columnBoardItem.columnBoardId}/board`);
	}
};

const cardActions = [
	{
		action: handlePublish,
		name: t("common.action.publish"),
		dataTestId: "content-card-board-menu-publish",
	},
];

const moreActionsMenuItems = [
	{
		icon: mdiUndoVariant,
		action: handleRevert,
		name: t("pages.room.cards.label.revert"),
		dataTestId: "content-card-board-menu-revert",
	},
];

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
</script>

<style lang="scss" scoped>
.title-board-card {
	margin-top: calc(var(--space-base-vuetify) / 2);
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
	grid-template-columns: 95% 5%;
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
