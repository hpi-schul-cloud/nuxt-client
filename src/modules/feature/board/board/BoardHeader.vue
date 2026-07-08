<template>
	<div>
		<div class="d-flex align-start board-header mb-2">
			<InlineEditInteractionHandler
				:id="boardId"
				class="input-container"
				:is-edit-mode="isEditMode"
				tabindex="0"
				@start-edit-mode="onStartEditMode"
				@end-edit-mode="onEndEditMode"
				@keydown.enter.prevent="onToggleEditMode"
			>
				<BoardAnyTitleInput
					ref="boardHeader"
					:value="boardTitle"
					class="input"
					scope="board"
					data-testid="board-title"
					:is-edit-mode="isEditMode"
					:is-focused="isFocusedById"
					:has-edit-permission="allowedOperations.updateBoardTitle"
					@update:value="updateBoardTitle"
					@blur="onBoardTitleBlur"
				/>
				<span ref="inputWidthCalcSpan" class="input-width-calc-span" />
			</InlineEditInteractionHandler>
			<div class="d-flex mt-4">
				<VChip v-if="isDraft" class="align-self-center cursor-default" data-testid="board-draft-chip">
					{{ t("common.words.draft") }}
				</VChip>
				<BoardEditableChip v-if="isEditableChipVisible" />
				<BoardMenu
					v-if="allowedOperations.updateBoardTitle || allowedOperations.shareBoard"
					:scope="BoardMenuScope.BOARD"
					data-testid="board-menu-btn"
				>
					<KebabMenuActionRename @click="onStartEditMode" />
					<KebabMenuActionDuplicate
						v-if="allowedOperations.copyBoard"
						data-testid="kebab-menu-action-duplicate-board"
						@click="onCopyBoard"
					/>
					<KebabMenuActionShare v-if="isShareEnabled && allowedOperations.shareBoard" @click="onShareBoard" />
					<KebabMenuActionPublish v-if="isDraft" @click="onPublishBoard" />
					<KebabMenuActionRevert v-if="!isDraft" @click="onUnpublishBoard" />
					<KebabMenuActionEditingSettings
						v-if="allowedOperations.updateReadersCanEditSetting && isRoomBoard"
						@click="onEditBoardSettings"
					/>
					<KebabMenuActionChangeLayout @click="onChangeBoardLayout" />
					<KebabMenuActionDelete :name="title" @click="onDeleteBoard" />
				</BoardMenu>
			</div>
			<div v-if="isScrollModeToggleVisible" class="ms-auto mt-4 scroll-mode-toggle">
				<VSwitch
					:model-value="isPageScrollMode"
					:label="t('components.board.action.fixColumns')"
					hide-details
					density="compact"
					data-testid="scroll-mode-toggle-checkbox"
					@update:model-value="onToggleScrollMode"
				/>
			</div>
		</div>
		<VDivider v-if="isPageScrollMode && hasScrolledInPageMode" class="mx-n6" role="presentation" />
	</div>
</template>

<script setup lang="ts">
import { BoardExternalReferenceType } from "../../../../generated/serverApi/v3";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import { useBoardScrollMode } from "../shared/BoardScrollMode.composable";
import InlineEditInteractionHandler from "../shared/InlineEditInteractionHandler.vue";
import BoardEditableChip from "./BoardEditableChip.vue";
import KebabMenuActionEditingSettings from "./KebabMenuActionEditingSettings.vue";
import { askDeletionForType } from "@/utils/confirmation-dialog.utils";
import { upperCaseFirstChar } from "@/utils/textFormatting";
import { useBoardAllowedOperations, useBoardFocusHandler, useCourseBoardEditMode } from "@data-board";
import { useEnvConfig } from "@data-env";
import { BoardMenu, BoardMenuScope } from "@ui-board";
import {
	KebabMenuActionChangeLayout,
	KebabMenuActionDelete,
	KebabMenuActionDuplicate,
	KebabMenuActionPublish,
	KebabMenuActionRename,
	KebabMenuActionRevert,
	KebabMenuActionShare,
} from "@ui-kebab-menu";
import { useDebounceFn, useScroll } from "@vueuse/core";
import { computed, onMounted, ref, toRef, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

type Props = {
	boardId: string;
	boardContextType?: BoardExternalReferenceType;
	title: string;
	isDraft: boolean;
	isEditableChipVisible?: boolean;
	hasReadersEditPermission: boolean;
	isListBoard?: boolean;
};

const props = defineProps<Props>();

const emit = defineEmits([
	"copy:board",
	"share:board",
	"update:title",
	"update:visibility",
	"delete:board",
	"change-layout",
	"edit:settings",
]);

const { t } = useI18n();
const boardId = toRef(props, "boardId");
const { isEditMode, startEditMode, stopEditMode } = useCourseBoardEditMode(boardId.value);
const boardHeader = ref<HTMLDivElement | null>(null);
const { isFocusedById } = useBoardFocusHandler(boardId.value, boardHeader);
const { allowedOperations } = useBoardAllowedOperations();
const { isPageScrollMode, toggleScrollMode } = useBoardScrollMode();

const onToggleScrollMode = () => {
	const columnBoard = document.querySelector<HTMLElement>(".column-board");
	const mainContent = boardScrollContainer.value;
	const wasPageMode = isPageScrollMode.value;

	// In page mode the scroll container is .main-content-flex; in columns mode it is .column-board
	const scrollLeft = wasPageMode ? (mainContent?.scrollLeft ?? 0) : (columnBoard?.scrollLeft ?? 0);

	toggleScrollMode();

	const target = wasPageMode ? columnBoard : mainContent;
	if (target) target.scrollLeft = scrollLeft;
};
const { xs } = useDisplay();
const isScrollModeToggleVisible = computed(() => !props.isListBoard && !xs.value);

const boardScrollContainer = ref<HTMLElement | null>(null);
const { y: contentScrollY } = useScroll(boardScrollContainer);

const hasScrolledInPageMode = ref(false);

watch(isPageScrollMode, () => {
	hasScrolledInPageMode.value = false;
});

watch(contentScrollY, () => {
	if (isPageScrollMode.value) {
		hasScrolledInPageMode.value = contentScrollY.value > 0;
	}
});

const inputWidthCalcSpan = ref<HTMLElement>();
const fieldWidth = ref("0px");

onMounted(() => {
	boardScrollContainer.value = document.querySelector<HTMLElement>(".main-content-flex");
	setTimeout(calculateWidth, 100);
});

const boardTitle = ref("");
const boardTitleFallback = computed(() => {
	const translatedTitle = t("common.words.board");
	return upperCaseFirstChar(translatedTitle);
});

const isRoomBoard = computed(() => props.boardContextType === BoardExternalReferenceType.ROOM);

const onStartEditMode = () => {
	startEditMode();
};

const onEndEditMode = () => {
	stopEditMode();
};

const onToggleEditMode = () => {
	if (isEditMode.value) {
		onEndEditMode();
	} else {
		onStartEditMode();
	}
};

const onCopyBoard = () => {
	emit("copy:board");
};

const onShareBoard = () => {
	emit("share:board");
};

const onPublishBoard = () => {
	emit("update:visibility", true);
};

const onUnpublishBoard = () => {
	emit("update:visibility", false);
};

const onBoardTitleBlur = () => {
	stopEditMode();
	if (boardTitle.value.length < 1) {
		updateBoardTitle(boardTitleFallback.value);
	}
};

const updateBoardTitle = async (value: string) => {
	boardTitle.value = value;
	calculateWidth();
	await emitTitle(value);
};

const onDeleteBoard = async () => {
	const shouldDelete = await askDeletionForType("common.words.board");
	if (shouldDelete) {
		emit("delete:board", props.boardId);
	}
};

const onChangeBoardLayout = async () => {
	emit("change-layout");
};

const onEditBoardSettings = () => {
	emit("edit:settings");
};

const emitTitle = useDebounceFn((newTitle: string) => {
	if (newTitle.length < 1) return;

	emit("update:title", newTitle);
}, 1000);

const calculateWidth = () => {
	if (!inputWidthCalcSpan.value) return;
	const title = boardTitle.value || t("components.cardElement.titleElement.placeholder");

	inputWidthCalcSpan.value.innerHTML = title.replaceAll(/\s/g, "&nbsp;");

	const width = inputWidthCalcSpan.value.offsetWidth;

	// 1px is added here to prevent the input value from being cut off with an ellipsis.
	fieldWidth.value = `${width + 1}px`;
};

const isShareEnabled = computed(() => useEnvConfig().value.FEATURE_COLUMN_BOARD_SHARE);

watchEffect(() => {
	boardTitle.value = props.title;
});
</script>

<style>
html.board-page-scroll .column-board {
	height: auto;
	overflow-x: visible;
}
</style>

<style lang="scss" scoped>
@use "@/styles/settings.scss" as *;

.input-width-calc-span {
	position: absolute;
	left: -9999px;
	display: inline-block;
	min-width: 1em;
	padding: 0 $field-control-padding-end 0 $field-control-padding-start;
	font-size: var(--heading-1);
	font-family: var(--font-accent);
	letter-spacing: $field-letter-spacing;
}

.input-container {
	overflow: hidden;
}

.input {
	max-width: calc(100%);
	width: v-bind("fieldWidth");
}

.scroll-mode-toggle :deep(.v-selection-control) {
	flex-direction: row-reverse;

	.v-label {
		padding-inline-start: 0;
		padding-inline-end: 10px;
	}
}
</style>
