<template>
	<VCardText class="mb-n4">
		<template v-for="(element, index) in elements" :key="element.id">
			<div :data-testid="`board-contentelement-${columnIndex}-${rowIndex}-${index}`">
				<component
					:is="mapToComponent(element.type)"
					:id="element.id"
					:element="element"
					:column-index="columnIndex"
					:element-index="index"
					:is-edit-mode="isEditMode"
					:is-detail-view="isDetailView"
					:is-not-first-element="isNotFirstElement(index)"
					:is-not-last-element="isNotLastElement(index)"
					:row-index="rowIndex"
					v-bind="getTabIndex(element)"
					@delete:element="onDeleteElement"
					@move-down:edit="onMoveElementDown(index, element)"
					@move-up:edit="onMoveElementUp(index, element)"
					@move-keyboard:edit="onMoveElementKeyboard(index, element, $event)"
				/>
			</div>
		</template>
	</VCardText>
</template>

<script setup lang="ts">
import { ContentElementType } from "@/serverApi/v3";
import { AnyContentElement } from "@/types/board/ContentElement";
import { ElementMove } from "@/types/board/DragAndDrop";
import { useEnvConfig } from "@data-env";
import { CollaborativeTextEditorElement } from "@feature-board-collaborative-text-editor-element";
import { DeletedElement } from "@feature-board-deleted-element";
import { DrawingContentElement } from "@feature-board-drawing-element";
import { ExternalToolElement } from "@feature-board-external-tool-element";
import { FileContentElement } from "@feature-board-file-element";
import { FolderContentElement } from "@feature-board-folder-element";
import { H5pElement } from "@feature-board-h5p-element";
import { LinkContentElement } from "@feature-board-link-element";
import { RichTextContentElement } from "@feature-board-text-element";
import { VideoConferenceContentElement } from "@feature-board-video-conference-element";
import { PropType } from "vue";

const props = defineProps({
	elements: {
		type: Array as PropType<AnyContentElement[]>,
		required: true,
	},
	isEditMode: {
		type: Boolean,
		required: true,
	},
	isDetailView: {
		type: Boolean,
		required: true,
	},
	rowIndex: {
		type: Number,
		required: true,
	},
	columnIndex: {
		type: Number,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "delete:element", elementId: string): void;
	(e: "move-down:element", elementMove: ElementMove): void;
	(e: "move-up:element", elementMove: ElementMove): void;
	(e: "move-keyboard:element", elementMove: ElementMove, code: string): void;
}>();

const onDeleteElement = (elementId: string) => {
	emit("delete:element", elementId);
};

const onMoveElementDown = (elementIndex: number, element: AnyContentElement) => {
	const elementMove: ElementMove = {
		elementIndex,
		payload: element.id,
	};
	emit("move-down:element", elementMove);
};

const onMoveElementUp = (elementIndex: number, element: AnyContentElement) => {
	const elementMove: ElementMove = {
		elementIndex,
		payload: element.id,
	};
	emit("move-up:element", elementMove);
};

const onMoveElementKeyboard = (elementIndex: number, element: AnyContentElement, event: KeyboardEvent) => {
	const elementMove: ElementMove = {
		elementIndex,
		payload: element.id,
	};
	emit("move-keyboard:element", elementMove, event.code);
};

const mapToComponent = (type: ContentElementType) => {
	const envConfig = useEnvConfig();

	switch (type) {
		case ContentElementType.COLLABORATIVE_TEXT_EDITOR:
			if (envConfig.value.FEATURE_COLUMN_BOARD_COLLABORATIVE_TEXT_EDITOR_ENABLED) {
				return CollaborativeTextEditorElement;
			}
			break;
		case ContentElementType.DRAWING:
			if (envConfig.value.FEATURE_TLDRAW_ENABLED) {
				return DrawingContentElement;
			}
			break;
		case ContentElementType.EXTERNAL_TOOL:
			if (envConfig.value.FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED) {
				return ExternalToolElement;
			}
			break;
		case ContentElementType.FILE:
			return FileContentElement;
		case ContentElementType.LINK:
			if (envConfig.value.FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED) {
				return LinkContentElement;
			}
			break;
		case ContentElementType.RICH_TEXT:
			return RichTextContentElement;
		case ContentElementType.VIDEO_CONFERENCE:
			if (envConfig.value.FEATURE_COLUMN_BOARD_VIDEOCONFERENCE_ENABLED) {
				return VideoConferenceContentElement;
			}
			break;
		case ContentElementType.DELETED:
			return DeletedElement;
		case ContentElementType.FILE_FOLDER:
			if (envConfig.value.FEATURE_COLUMN_BOARD_FILE_FOLDER_ENABLED) {
				return FolderContentElement;
			}
			break;
		case ContentElementType.H5P:
			if (envConfig.value.FEATURE_COLUMN_BOARD_H5P_ENABLED) {
				return H5pElement;
			}
			break;
		default:
			return "span";
	}
};

const elementTypesWithTabindexZero = [
	ContentElementType.COLLABORATIVE_TEXT_EDITOR,
	ContentElementType.DRAWING,
	ContentElementType.EXTERNAL_TOOL,
	ContentElementType.FILE,
	ContentElementType.LINK,
	ContentElementType.H5P,
];

const getTabIndex = (element: AnyContentElement) => {
	const tabindex = elementTypesWithTabindexZero.includes(element.type) ? 0 : undefined;
	return tabindex !== undefined ? { tabindex } : undefined;
};

const isNotFirstElement = (elementIndex: number) => elementIndex !== 0 && props.elements.length > 1;

const isNotLastElement = (elementIndex: number) =>
	elementIndex !== props.elements.length - 1 && props.elements.length > 1;
</script>
