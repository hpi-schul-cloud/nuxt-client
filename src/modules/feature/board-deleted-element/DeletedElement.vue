<template>
	<VCard
		v-show="isTeacher"
		ref="deletedElement"
		class="mb-4"
		data-testid="board-deleted-element"
		elevation="0"
		variant="outlined"
		:ripple="false"
	>
		<ContentElementBar :has-grey-background="true" :icon="mdiPuzzleOutline">
			<template #title>
				{{ element.content.title }}
			</template>
			<template #menu>
				<DeletedElementMenu
					v-if="isEditMode"
					:column-index="columnIndex"
					:row-index="rowIndex"
					:element-index="elementIndex"
					@delete:element="onDeleteElement"
				/>
			</template>
		</ContentElementBar>
		<WarningAlert
			v-if="
				element.content.deletedElementType === ContentElementType.ExternalTool
			"
		>
			{{
				t("components.cardElement.deletedElement.warning.externalToolElement", {
					toolName: element.content.title,
				})
			}}
		</WarningAlert>
	</VCard>
</template>

<script setup lang="ts">
import { ContentElementType, DeletedElementResponse } from "@/serverApi/v3";
import { useBoardFocusHandler, useBoardPermissions } from "@data-board";
import { mdiPuzzleOutline } from "@icons/material";
import { WarningAlert } from "@ui-alert";
import { ContentElementBar } from "@ui-board";
import { PropType, Ref, ref, toRef } from "vue";
import DeletedElementMenu from "./DeletedElementMenu.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
	element: {
		type: Object as PropType<DeletedElementResponse>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	columnIndex: { type: Number, required: true },
	rowIndex: { type: Number, required: true },
	elementIndex: { type: Number, required: true },
});

const emit = defineEmits<{
	(e: "delete:element", elementId: string): void;
}>();

const { isTeacher } = useBoardPermissions();

const autofocus: Ref<boolean> = ref(false);
const element: Ref<DeletedElementResponse> = toRef(props, "element");

useBoardFocusHandler(element.value.id, ref(null), () => {
	autofocus.value = true;
});

const onDeleteElement = () => {
	emit("delete:element", element.value.id);
};
</script>
