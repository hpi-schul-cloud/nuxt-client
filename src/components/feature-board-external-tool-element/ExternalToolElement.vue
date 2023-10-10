<template>
	<v-card
		v-show="hasLinkedTool || isEditMode"
		class="mb-4"
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
		<div class="pa-4 d-flex gap-8 grey lighten-4">
			<v-img
				v-if="toolDisplayData && toolDisplayData.logoUrl"
				class="mr-1"
				:src="toolDisplayData.logoUrl"
			></v-img>
			<v-icon v-else>{{ mdiPuzzleOutline }}</v-icon>
			<span class="align-self-center title flex-1">
				{{
					hasLinkedTool
						? toolDisplayName
						: t("feature-board-external-tool-element.placeholder.selectTool")
				}}
			</span>
			<ExternalToolElementMenu
				v-if="isEditMode"
				ref="externalToolElementMenu"
				:isFirstElement="isFirstElement"
				:isLastElement="isLastElement"
				:hasMultipleElements="hasMultipleElements"
				@move-down:element="onMoveElementDown"
				@move-up:element="onMoveElementUp"
				@delete:element="onDeleteElement"
				@edit:element="onEditElement"
			></ExternalToolElementMenu>
		</div>
	</v-card>
</template>

<script lang="ts">
import { useI18n } from "@/composables/i18n.composable";
import { ExternalToolElementResponse } from "@/serverApi/v3";
import ContextExternalToolsModule from "@/store/context-external-tools";
import { ExternalToolDisplayData } from "@/store/external-tool";
import {
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { useBoardFocusHandler } from "@data-board";
import { mdiPuzzleOutline } from "@mdi/js";
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
			type: Object as PropType<ExternalToolElementResponse>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
	emits: [
		"delete:element",
		"move-down:edit",
		"move-up:edit",
		"move-keyboard:edit",
	],
	setup(props, { emit }) {
		const contextExternalToolsModule: ContextExternalToolsModule = injectStrict(
			CONTEXT_EXTERNAL_TOOLS_MODULE_KEY
		);
		const { t } = useI18n();
		const autofocus: Ref<boolean> = ref(false);
		const element: Ref<ExternalToolElementResponse> = toRef(props, "element");

		const hasLinkedTool: ComputedRef<boolean> = computed(
			() => !!element.value.content.contextExternalToolId
		);

		const toolDisplayData: Ref<ExternalToolDisplayData | undefined> = computed(
			() =>
				contextExternalToolsModule.getExternalToolDisplayDataList.find(
					(externalToolDisplayData: ExternalToolDisplayData) =>
						externalToolDisplayData.contextExternalToolId ===
						element.value.content.contextExternalToolId
				)
		);

		const toolDisplayName: ComputedRef<string> = computed(
			() => toolDisplayData.value?.name ?? "..."
		);

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

		const onDeleteElement = () => emit("delete:element", element.value.id);

		const onEditElement = () => {
			// TODO N21-1248: Edit dialog
		};

		const onClickElement = () => {
			if (props.isEditMode) {
				if (!hasLinkedTool.value) {
					// TODO N21-1248: Edit dialog
				}
			} else {
				// TODO N21-1285: launch tool
			}
		};

		return {
			t,
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

.flex-1 {
	flex: 1;
}
</style>
