<template>
	<VCard
		v-show="isEditMode"
		ref="elementCard"
		class="mb-4"
		data-testid="board-hp5-element"
		elevation="0"
		variant="outlined"
		:ripple="false"
		tabindex="0"
		role="button"
		:loading="isLoading"
		@keydown.up.down="onKeydownArrow"
		@keydown.stop
	>
		<ContentElementBar :has-grey-background="true" icon="$h5pOutline">
			<template #title> Interaktives Lernelement </template>
			<template #menu>
				<H5pElementMenu
					v-if="isEditMode"
					:display-name="undefined"
					:column-index="columnIndex"
					:row-index="rowIndex"
					:element-index="elementIndex"
					:is-not-first-element="isNotFirstElement"
					:is-not-last-element="isNotLastElement"
					@move-down:element="onMoveElementDown"
					@move-up:element="onMoveElementUp"
					@delete:element="onDeleteElement"
				/>
			</template>
		</ContentElementBar>
	</VCard>
</template>

<script setup lang="ts">
import { H5pElementResponse } from "@/serverApi/v3";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { ContentElementBar } from "@ui-board";
import { computed, Ref, ref, toRef } from "vue";
import H5pElementMenu from "./H5pElementMenu.vue";

const props = defineProps<{
	element: H5pElementResponse;
	isEditMode: boolean;
	isNotFirstElement?: boolean;
	isNotLastElement?: boolean;
	columnIndex: number;
	rowIndex: number;
	elementIndex: number;
}>();

const emit = defineEmits<{
	(e: "delete:element", id: string): void;
	(e: "move-down:edit"): void;
	(e: "move-up:edit"): void;
	(e: "move-keyboard:edit", event: KeyboardEvent): void;
}>();

const element: Ref<H5pElementResponse> = toRef(props, "element");
useContentElementState<H5pElementResponse>(props, {
	autoSaveDebounce: 0,
});

const elementCard = ref<HTMLElement | null>(null);
useBoardFocusHandler(element.value.id, elementCard);

const isLoading = computed(() => false);

const onKeydownArrow = (event: KeyboardEvent) => {
	if (props.isEditMode) {
		event.preventDefault();
		emit("move-keyboard:edit", event);
	}
};

const onMoveElementDown = () => {
	emit("move-down:edit");
};

const onMoveElementUp = () => {
	emit("move-up:edit");
};

const onDeleteElement = () => emit("delete:element", element.value.id);
</script>
