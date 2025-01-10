<template>
	<v-card
		class="mb-4"
		data-testid="drawing-element"
		variant="outlined"
		ref="drawingElement"
		:ripple="false"
		:href="sanitizedUrl"
		target="_blank"
		:aria-label="ariaLabel"
		@keydown.up.down="onKeydownArrow"
		@keydown.stop
	>
		<div class="drawing-element-content">
			<InnerContent :docName="element.id">
				<template v-if="isEditMode">
					<BoardMenu
						:scope="BoardMenuScope.DRAWING_ELEMENT"
						has-background
						:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
					>
						<BoardMenuActionMoveUp
							v-if="isNotFirstElement"
							@click="onMoveDrawingElementEditUp"
						/>
						<BoardMenuActionMoveDown
							v-if="isNotLastElement"
							@click="onMoveDrawingElementEditDown"
						/>
						<BoardMenuActionDelete
							@click="onDeleteElement"
							:scope="BoardMenuScope.DRAWING_ELEMENT"
						/>
					</BoardMenu>
				</template>
			</InnerContent>
		</div>
	</v-card>
</template>

<script setup lang="ts">
import { DrawingElementResponse } from "@/serverApi/v3";
import { sanitizeUrl } from "@braintree/sanitize-url";
import { useBoardFocusHandler } from "@data-board";
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
	BoardMenuScope,
} from "@ui-board";
import { computed, PropType, ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import InnerContent from "./InnerContent.vue";

const props = defineProps({
	element: {
		type: Object as PropType<DrawingElementResponse>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	isNotFirstElement: { type: Boolean, requried: false },
	isNotLastElement: { type: Boolean, requried: false },
	columnIndex: { type: Number, required: true },
	rowIndex: { type: Number, required: true },
	elementIndex: { type: Number, required: true },
});
const emit = defineEmits([
	"delete:element",
	"move-down:edit",
	"move-up:edit",
	"move-keyboard:edit",
]);

const { t } = useI18n();
const drawingElement = ref<HTMLElement | null>(null);
const element = toRef(props, "element");

const sanitizedUrl = computed(() =>
	sanitizeUrl(`/tldraw?parentId=${element.value.id}`)
);

useBoardFocusHandler(element.value.id, drawingElement);

const onKeydownArrow = (event: KeyboardEvent) => {
	if (props.isEditMode) {
		event.preventDefault();
		emit("move-keyboard:edit", event);
	}
};
const onMoveDrawingElementEditDown = () => emit("move-down:edit");
const onMoveDrawingElementEditUp = () => emit("move-up:edit");
const onDeleteElement = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("delete:element", props.element.id);
	}
};

const ariaLabel = computed(() => {
	return `${t("components.cardElement.drawingElement")}, ${t(
		"common.ariaLabel.newTab"
	)}`;
});
</script>
