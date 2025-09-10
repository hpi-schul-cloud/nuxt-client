<template>
	<div class="d-flex align-start board-header mb-6">
		<InlineEditInteractionHandler
			:id="boardId"
			class="input-container"
			:is-edit-mode="isEditMode"
			tabindex="0"
			@start-edit-mode="onStartEditMode"
			@end-edit-mode="onEndEditMode"
			@keydown.enter.prevent="onStartEditMode"
		>
			<BoardAnyTitleInput
				ref="boardHeader"
				:value="boardTitle"
				class="input"
				scope="board"
				data-testid="board-title"
				:is-edit-mode="isEditMode"
				:is-focused="isFocusedById"
				:max-length="100"
				@update:value="updateBoardTitle"
				@blur="onBoardTitleBlur"
			/>
			<span ref="inputWidthCalcSpan" class="input-width-calc-span" />
		</InlineEditInteractionHandler>
		<div class="d-flex mt-4">
			<BoardDraftChip v-if="isDraft" />
			<BoardMenu
				v-if="hasEditPermission"
				:scope="BoardMenuScope.BOARD"
				data-testid="board-menu-btn"
			>
				<KebabMenuActionRename @click="onStartEditMode" />
				<KebabMenuActionCopy @click="onCopyBoard" />
				<KebabMenuActionShare
					v-if="isShareEnabled && hasShareBoardPermission"
					@click="onShareBoard"
				/>
				<KebabMenuActionPublish v-if="isDraft" @click="onPublishBoard" />
				<KebabMenuActionChangeLayout @click="onChangeBoardLayout" />
				<KebabMenuActionRevert v-if="!isDraft" @click="onUnpublishBoard" />
				<KebabMenuActionDelete
					:name="title"
					scope-language-key="common.words.board"
					@click="onDeleteBoard"
				/>
			</BoardMenu>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useBoardFocusHandler, useBoardPermissions } from "@data-board";
import { BoardMenuScope } from "@ui-board";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import BoardMenu from "@/modules/ui/board/BoardMenu.vue"; // FIX_CIRCULAR_DEPENDENCY
import {
	KebabMenuActionCopy,
	KebabMenuActionDelete,
	KebabMenuActionRename,
	KebabMenuActionPublish,
	KebabMenuActionRevert,
	KebabMenuActionShare,
	KebabMenuActionChangeLayout,
} from "@ui-kebab-menu";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useCourseBoardEditMode } from "@/modules/util/board/editMode.composable"; // FIX_CIRCULAR_DEPENDENCY
import { useDebounceFn } from "@vueuse/core";
import { computed, onMounted, ref, toRef, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import InlineEditInteractionHandler from "../shared/InlineEditInteractionHandler.vue";
import BoardDraftChip from "./BoardDraftChip.vue";
import { upperCaseFirstChar } from "@/utils/textFormatting";
import { useEnvConfig } from "@data-env";

const props = defineProps({
	boardId: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	isDraft: {
		type: Boolean,
		required: true,
	},
});

const emit = defineEmits([
	"copy:board",
	"share:board",
	"update:title",
	"update:visibility",
	"delete:board",
	"change-layout",
]);

const { t } = useI18n();
const boardId = toRef(props, "boardId");
const { isEditMode, startEditMode, stopEditMode } = useCourseBoardEditMode(
	boardId.value
);
const boardHeader = ref<HTMLDivElement | null>(null);
const { isFocusedById } = useBoardFocusHandler(boardId.value, boardHeader);
const { hasEditPermission, hasShareBoardPermission } = useBoardPermissions();

const inputWidthCalcSpan = ref<HTMLElement>();
const fieldWidth = ref("0px");

onMounted(() => setTimeout(calculateWidth, 100));

const boardTitle = ref("");
const boardTitleFallback = computed(() => {
	const translatedTitle = t("common.words.board");
	return upperCaseFirstChar(translatedTitle);
});

const onStartEditMode = () => {
	if (!hasEditPermission.value) return;
	startEditMode();
};

const onEndEditMode = () => {
	if (!hasEditPermission.value) return;
	stopEditMode();
};

const onCopyBoard = () => {
	if (!hasEditPermission.value) return;
	emit("copy:board");
};

const onShareBoard = () => {
	if (!hasShareBoardPermission.value) return;
	emit("share:board");
};

const onPublishBoard = () => {
	if (!hasEditPermission.value) return;
	emit("update:visibility", true);
};

const onUnpublishBoard = () => {
	if (!hasEditPermission.value) return;
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

const onDeleteBoard = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("delete:board", props.boardId);
	}
};

const onChangeBoardLayout = async () => {
	emit("change-layout");
};

const emitTitle = useDebounceFn((newTitle: string) => {
	if (newTitle.length < 1) return;

	emit("update:title", newTitle);
}, 1000);

const calculateWidth = () => {
	if (!inputWidthCalcSpan.value) return;
	const title =
		boardTitle.value || t("components.cardElement.titleElement.placeholder");

	inputWidthCalcSpan.value.innerHTML = title.replace(/\s/g, "&nbsp;");

	const width = inputWidthCalcSpan.value.offsetWidth;

	// 1px is added here to prevent the input value from being cut off with an ellipsis.
	fieldWidth.value = `${width + 1}px`;
};

const isShareEnabled = computed(
	() => useEnvConfig().value.FEATURE_COLUMN_BOARD_SHARE
);

watchEffect(() => {
	boardTitle.value = props.title;
	setTimeout(calculateWidth, 100);
});
</script>

<style lang="scss" scoped>
@use "@/styles/settings.scss" as *;

.v-chip {
	cursor: default;
}

.input-width-calc-span {
	position: absolute;
	left: -9999px;
	display: inline-block;
	min-width: 1em;
	padding: 0 $field-control-padding-end 0 $field-control-padding-start;
	font-size: var(--heading-3);
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
</style>
