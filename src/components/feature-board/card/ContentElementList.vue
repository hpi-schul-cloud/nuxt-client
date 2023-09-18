<template>
	<VCardText>
		<template v-for="(element, index) in elements">
			<RichTextContentElement
				v-if="isRichTextElementResponse(element)"
				:key="element.id"
				:element="element"
				:isEditMode="isEditMode"
				@delete:element="onDeleteElement"
			/>
			<FileContentElement
				v-else-if="isFileElementResponse(element)"
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
			<SubmissionContentElement
				v-else-if="showSubmissionContainerElement(element)"
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
			<ExternalToolElement
				v-else-if="showExternalToolElement(element)"
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
		</template>
	</VCardText>
</template>

<script lang="ts">
import { ExternalToolElement } from "@/components/feature-board-external-tool-element";
import {
	ContentElementType,
	ExternalToolElementResponse,
	FileElementResponse,
	RichTextElementResponse,
	SubmissionContainerElementResponse,
} from "@/serverApi/v3";
import { AnyContentElement } from "@/types/board/ContentElement";
import { ElementMove } from "@/types/board/DragAndDrop";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { FileContentElement } from "@feature-board-file-element";
import { SubmissionContentElement } from "@feature-board-submission-element";
import { RichTextContentElement } from "@feature-board-text-element";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
	name: "ContentElementList",
	components: {
		ExternalToolElement,
		FileContentElement,
		RichTextContentElement,
		SubmissionContentElement,
	},
	props: {
		elements: {
			type: Array as PropType<AnyContentElement[]>,
			required: true,
		},
		isEditMode: {
			type: Boolean,
			required: true,
		},
	},
	emits: [
		"delete:element",
		"move-down:element",
		"move-up:element",
		"move-keyboard:element",
	],
	setup(props, { emit }) {
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
				!!envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED &&
				isSubmissionContainerElementResponse(element)
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
				!!envConfigModule.getEnv.FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED &&
				isExternalToolElementResponse(element)
			);
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

		const onMoveElementUp = (
			elementIndex: number,
			element: AnyContentElement
		) => {
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
			return props.elements.length > 0
				? props.elements[lastElementIndex].id
				: null;
		});

		return {
			ContentElementType,
			firstElementId,
			hasMultipleElements,
			isFileElementResponse,
			isRichTextElementResponse,
			isSubmissionContainerElementResponse,
			showSubmissionContainerElement,
			isExternalToolElementResponse,
			showExternalToolElement,
			lastElementId,
			onDeleteElement,
			onMoveElementDown,
			onMoveElementUp,
			onMoveElementKeyboard,
		};
	},
});
</script>
