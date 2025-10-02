<template>
	<v-card
		ref="drawingElement"
		class="mb-4"
		data-testid="drawing-element"
		variant="outlined"
		:ripple="false"
		:href="sanitizedUrl"
		target="_blank"
		:aria-label="ariaLabel"
		@keydown.up.down="onKeydownArrow"
		@keydown.stop
	>
		<div class="drawing-element-content">
			<InnerContent :doc-name="element.id">
				<template v-if="isEditMode">
					<BoardMenu
						:scope="BoardMenuScope.DRAWING_ELEMENT"
						has-background
						:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
					>
						<KebabMenuActionMoveUp
							v-if="isNotFirstElement"
							@click="onMoveDrawingElementEditUp"
						/>
						<KebabMenuActionMoveDown
							v-if="isNotLastElement"
							@click="onMoveDrawingElementEditDown"
						/>
						<KebabMenuActionDelete
							scope-language-key="components.cardElement.drawingElement"
							@click="onDeleteElement"
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
import { BoardMenuScope } from "@ui-board";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import BoardMenu from "@/modules/ui/board/BoardMenu.vue"; // FIX_CIRCULAR_DEPENDENCY
import {
	KebabMenuActionDelete,
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
} from "@ui-kebab-menu";
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

const ariaLabel = computed(
	() =>
		`${t("components.cardElement.drawingElement")}, ${t(
			"common.ariaLabel.newTab"
		)}`
);
</script>
