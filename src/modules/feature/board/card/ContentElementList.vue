<template>
	<VCardText class="mb-n4">
		<template v-for="(element, index) in elements" :key="element.id">
			<ContentElement :index="index" :elementCount="elements.length">
				<RichTextContentElement
					v-if="isRichTextElementResponse(element)"
					:element="element"
					:isEditMode="isEditMode"
					@move-keyboard:edit="onMoveElementKeyboard(index, element, $event)"
					@move-down:edit="onMoveElementDown(index, element)"
					@move-up:edit="onMoveElementUp(index, element)"
					@delete:element="onDeleteElement"
				/>
				<LinkContentElement
					v-else-if="showLinkElement(element)"
					:element="element"
					:isEditMode="isEditMode"
					:isDetailView="isDetailView"
					@move-keyboard:edit="onMoveElementKeyboard(index, element, $event)"
					@move-down:edit="onMoveElementDown(index, element)"
					@move-up:edit="onMoveElementUp(index, element)"
					@delete:element="onDeleteElement"
				/>
				<FileContentElement
					v-else-if="isFileElementResponse(element)"
					:element="element"
					:isEditMode="isEditMode"
					@move-keyboard:edit="onMoveElementKeyboard(index, element, $event)"
					@move-down:edit="onMoveElementDown(index, element)"
					@move-up:edit="onMoveElementUp(index, element)"
					@delete:element="onDeleteElement"
				/>
				<SubmissionContentElement
					v-else-if="showSubmissionContainerElement(element)"
					:element="element"
					:isEditMode="isEditMode"
					@move-keyboard:edit="onMoveElementKeyboard(index, element, $event)"
					@move-down:edit="onMoveElementDown(index, element)"
					@move-up:edit="onMoveElementUp(index, element)"
					@delete:element="onDeleteElement"
				/>
				<ExternalToolElement
					v-else-if="showExternalToolElement(element)"
					:element="element"
					:isEditMode="isEditMode"
					@move-keyboard:edit="onMoveElementKeyboard(index, element, $event)"
					@move-down:edit="onMoveElementDown(index, element)"
					@move-up:edit="onMoveElementUp(index, element)"
					@delete:element="onDeleteElement"
				/>
				<DrawingContentElement
					v-else-if="showDrawingElement(element)"
					:key="element.id"
					:element="element"
					:isEditMode="isEditMode"
					:isFirstElement="firstElementId === element.id"
					:isLastElement="lastElementId === element.id"
					:hasMultipleElements="hasMultipleElements"
					@move-keyboard:edit="onMoveElementKeyboard(index, element, $event)"
					@move-down:edit="onMoveElementDown(index, element)"
					@move-up:edit="onMoveElementUp(index, element)"
					@delete:element="onDeleteElement"
				/>
				<CollaborativeTextEditorElement
					v-else-if="showCollaborativeTextEditorElement(element)"
					:element="element"
					:isEditMode="isEditMode"
					:isFirstElement="firstElementId === element.id"
					:isLastElement="lastElementId === element.id"
					:hasMultipleElements="hasMultipleElements"
					@move-keyboard:edit="onMoveElementKeyboard(index, element, $event)"
					@move-down:edit="onMoveElementDown(index, element)"
					@move-up:edit="onMoveElementUp(index, element)"
					@delete:element="onDeleteElement"
				/>
				<AppointmentFinderElement
					v-else-if="isAppointmentFinderElementResponse(element)"
					:element="element"
					:isEditMode="isEditMode"
					:isFirstElement="firstElementId === element.id"
					:isLastElement="lastElementId === element.id"
					:hasMultipleElements="hasMultipleElements"
					@move-keyboard:edit="onMoveElementKeyboard(index, element, $event)"
					@move-down:edit="onMoveElementDown(index, element)"
					@move-up:edit="onMoveElementUp(index, element)"
					@delete:element="onDeleteElement"
				/>
				<DeletedElement
					v-else-if="isDeletedElementResponse(element)"
					:element="element"
					:isEditMode="isEditMode"
					@delete:element="onDeleteElement"
				/>
			</ContentElement>
		</template>
	</VCardText>
</template>

<script setup lang="ts">
import {
	AppointmentFinderElementResponse,
	CollaborativeTextEditorElementResponse,
	ContentElementType,
	DeletedElementResponse,
	DrawingElementResponse,
	ExternalToolElementResponse,
	FileElementResponse,
	LinkElementResponse,
	RichTextElementResponse,
	SubmissionContainerElementResponse,
} from "@/serverApi/v3";
import { AnyContentElement } from "@/types/board/ContentElement";
import { ElementMove } from "@/types/board/DragAndDrop";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { CollaborativeTextEditorElement } from "@feature-board-collaborative-text-editor-element";
import { DeletedElement } from "@feature-board-deleted-element";
import { DrawingContentElement } from "@feature-board-drawing-element";
import { ExternalToolElement } from "@feature-board-external-tool-element";
import { FileContentElement } from "@feature-board-file-element";
import { LinkContentElement } from "@feature-board-link-element";
import { SubmissionContentElement } from "@feature-board-submission-element";
import { RichTextContentElement } from "@feature-board-text-element";
import { AppointmentFinderElement } from "@feature-board-appointment-finder-element";
import { computed, PropType } from "vue";
import ContentElement from "./ContentElement.vue";

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
});

const emit = defineEmits<{
	(e: "update:element", element: AnyContentElement): void;
	(e: "delete:element", elementId: string): void;
	(e: "move-down:element", elementMove: ElementMove): void;
	(e: "move-up:element", elementMove: ElementMove): void;
	(e: "move-keyboard:element", elementMove: ElementMove, code: string): void;
}>();

const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);

const onDeleteElement = (elementId: string) => {
	emit("delete:element", elementId);
};

const isRichTextElementResponse = (
	element: AnyContentElement
): element is RichTextElementResponse => {
	return element.type === ContentElementType.RichText;
};

const isFileElementResponse = (
	element: AnyContentElement
): element is FileElementResponse => {
	return element.type === ContentElementType.File;
};

const isSubmissionContainerElementResponse = (
	element: AnyContentElement
): element is SubmissionContainerElementResponse => {
	return element.type === ContentElementType.SubmissionContainer;
};

const showSubmissionContainerElement = (
	element: AnyContentElement
): element is SubmissionContainerElementResponse => {
	return (
		envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED &&
		isSubmissionContainerElementResponse(element)
	);
};

const isLinkElementResponse = (
	element: AnyContentElement
): element is LinkElementResponse => {
	return element.type === ContentElementType.Link;
};

const showLinkElement = (
	element: AnyContentElement
): element is LinkElementResponse => {
	return (
		envConfigModule.getEnv.FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED &&
		isLinkElementResponse(element)
	);
};

const isExternalToolElementResponse = (
	element: AnyContentElement
): element is ExternalToolElementResponse => {
	return element.type === ContentElementType.ExternalTool;
};

const showExternalToolElement = (
	element: AnyContentElement
): element is ExternalToolElementResponse => {
	return (
		envConfigModule.getEnv.FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED &&
		isExternalToolElementResponse(element)
	);
};

const isDrawingElementResponse = (
	element: AnyContentElement
): element is DrawingElementResponse => {
	return element.type === ContentElementType.Drawing;
};

const showDrawingElement = (
	element: AnyContentElement
): element is DrawingElementResponse => {
	return (
		envConfigModule.getEnv.FEATURE_TLDRAW_ENABLED &&
		isDrawingElementResponse(element)
	);
};

const isCollaborativeTextEditorResponse = (
	element: AnyContentElement
): element is CollaborativeTextEditorElementResponse => {
	return element.type === ContentElementType.CollaborativeTextEditor;
};

const showCollaborativeTextEditorElement = (
	element: AnyContentElement
): element is CollaborativeTextEditorElementResponse => {
	return (
		envConfigModule.getEnv
			.FEATURE_COLUMN_BOARD_COLLABORATIVE_TEXT_EDITOR_ENABLED &&
		isCollaborativeTextEditorResponse(element)
	);
};

const isDeletedElementResponse = (
	element: AnyContentElement
): element is DeletedElementResponse => {
	return element.type === ContentElementType.Deleted;
};

const isAppointmentFinderElementResponse = (
	element: AnyContentElement
): element is AppointmentFinderElementResponse => {
	return element.type === ContentElementType.AppointmentFinder;
};

const onMoveElementDown = (
	elementIndex: number,
	element: AnyContentElement
) => {
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

const onMoveElementKeyboard = (
	elementIndex: number,
	element: AnyContentElement,
	event: KeyboardEvent
) => {
	const elementMove: ElementMove = {
		elementIndex,
		payload: element.id,
	};
	emit("move-keyboard:element", elementMove, event.code);
};

const hasMultipleElements = computed(() => props.elements.length > 1);

const firstElementId = computed<Element["id"] | null>(() =>
	props.elements.length > 0 ? props.elements[0].id : null
);

const lastElementId = computed<Element["id"] | null>(() => {
	const lastElementIndex = props.elements.length - 1;
	return props.elements.length > 0 ? props.elements[lastElementIndex].id : null;
});
</script>
