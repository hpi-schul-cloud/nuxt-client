<template>
	<v-card
		class="mb-4 flex gap-8 pa-4"
		data-testid="board-external-tool-element"
		dense
		elevation="0"
		outlined
		ref="externalToolElement"
		:ripple="false"
		tabindex="0"
		:loading="isLoading"
		@keydown.up.down="onKeydownArrow"
		@click="onClickElement"
	>
		<v-img
			v-if="toolDisplayData?.logoUrl"
			class="mr-1"
			:src="toolDisplayData.logoUrl"
		></v-img>
		<v-icon v-else>{{ mdiPuzzleOutline }}</v-icon>
		<p>{{ hasLinkedTool ? toolDisplayName : "Tool auswählen..." }}</p>
		<ExternalToolElementMenu
			v-if="isEditMode"
			:isFirstElement="isFirstElement"
			:isLastElement="isLastElement"
			:hasMultipleElements="hasMultipleElements"
			@move-down:element="onMoveElementDown"
			@move-up:element="onMoveElementUp"
			@delete:element="onDeleteElement"
			@edit:element="onEditElement"
		></ExternalToolElementMenu>
	</v-card>
</template>

<script lang="ts">
import { ExternalToolDisplayData } from "@/store/external-tool";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { mdiPuzzleOutline } from "@mdi/js";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import {
	computed,
	ComputedRef,
	defineComponent,
	PropType,
	Ref,
	ref,
	toRef,
} from "vue";
import ExternalToolElementMenu from "./ExternalToolElementMenu.vue";

export default defineComponent({
	components: { ExternalToolElementMenu },
	props: {
		element: {
			type: Object as PropType<any>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
		isFirstElement: { type: Boolean, required: true },
		isLastElement: { type: Boolean, required: true },
		hasMultipleElements: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"move-down:edit",
		"move-up:edit",
		"move-keyboard:edit",
	],
	setup(props, { emit }) {
		const { modelValue } = useContentElementState(props);
		const { askDeleteConfirmation } = useDeleteConfirmationDialog();
		const autofocus: Ref<boolean> = ref(false);
		const element: Ref<any> = toRef(props, "element");

		const toolDisplayData: Ref<ExternalToolDisplayData | undefined> =
			ref(undefined);
		const toolDisplayName: ComputedRef<string> = computed(
			() => toolDisplayData.value?.name ?? "..."
		);
		const hasLinkedTool: ComputedRef<boolean> = computed(() => false); // TODO
		const isLoading = computed(
			() => hasLinkedTool.value && !toolDisplayData.value
		);

		useBoardFocusHandler(element.value.id, ref(null), () => {
			autofocus.value = true;
		});

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

		const onDeleteElement = async () => {
			const shouldDelete = await askDeleteConfirmation(
				toolDisplayData.value?.name,
				"boardElement"
			);

			if (shouldDelete) {
				emit("delete:element", element.value.id);
			}
		};

		const onEditElement = () => {
			// TODO Edit dialog
		};

		const onClickElement = () => {
			if (!hasLinkedTool.value) {
				// TODO Edit dialog
			} else if (!props.isEditMode) {
				// TODO launch tool
			}
		};

		return {
			modelValue,
			hasLinkedTool,
			toolDisplayData,
			toolDisplayName,
			isLoading,
			mdiPuzzleOutline,
			onMoveElementDown,
			onMoveElementUp,
			onKeydownArrow,
			onDeleteElement,
			onEditElement,
			onClickElement,
		};
	},
});
</script>

<style scoped lang="scss">
.gap-8 {
	gap: 8px;
}
</style>
