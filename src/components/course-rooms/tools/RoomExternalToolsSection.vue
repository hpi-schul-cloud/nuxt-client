<template>
	<room-external-tool-card
		v-for="(tool, index) in tools"
		:key="index"
		size="360"
		class="mb-4"
		:tool="tool"
		:can-edit="canEdit"
		:data-testid="`external-tool-card-${tool.name}`"
		@delete="onOpenDeleteDialog"
		@edit="onEditTool"
		@error="onError"
		@refresh="$emit('refresh')"
	/>
	<RoomExternalToolsErrorDialog
		v-if="selectedItem"
		:selected-item="selectedItem"
		:is-open="isErrorDialogOpen"
		@closed="onCloseErrorDialog"
	/>
	<ConfirmationDialog />
</template>

<script setup lang="ts">
import RoomExternalToolCard from "./RoomExternalToolCard.vue";
import RoomExternalToolsErrorDialog from "./RoomExternalToolsErrorDialog.vue";
import { Permission, ToolContextType } from "@/serverApi/v3";
import { useAppStore } from "@data-app";
import { ExternalToolDisplayData } from "@data-external-tool";
import { ConfirmationDialog, useConfirmationDialog } from "@ui-confirmation-dialog";
import { computed, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const props = defineProps({
	tools: {
		type: Array as PropType<ExternalToolDisplayData[]>,
		required: true,
	},
	roomId: {
		type: String,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "delete", value: ExternalToolDisplayData): void;
	(e: "refresh"): void;
}>();

const router = useRouter();
const { t } = useI18n();

const isErrorDialogOpen = ref(false);
const selectedItem = ref<ExternalToolDisplayData | undefined>();

const selectedItemName = computed(() => selectedItem.value?.name || "???");
const canEdit = useAppStore().hasPermission(Permission.ContextToolAdmin);

const { askConfirmation } = useConfirmationDialog();

const onOpenDeleteDialog = async (tool: ExternalToolDisplayData) => {
	selectedItem.value = tool;

	const shouldDelete = await askConfirmation({
		message: t("pages.rooms.tools.deleteDialog.content", {
			itemName: selectedItemName.value,
		}),
		confirmActionLangKey: "common.actions.delete",
	});

	if (shouldDelete) {
		onDeleteTool();
	} else {
		unsetSelectedItem();
	}
};

const unsetSelectedItem = () => {
	selectedItem.value = undefined;
};

const onDeleteTool = () => {
	if (selectedItem.value) {
		emit("delete", selectedItem.value);
	}

	unsetSelectedItem();
};

const onCloseErrorDialog = () => {
	isErrorDialogOpen.value = false;
};

const onEditTool = (tool: ExternalToolDisplayData) => {
	router.push({
		name: "context-external-tool-configuration-edit",
		params: { configId: tool.contextExternalToolId },
		query: {
			contextId: props.roomId,
			contextType: ToolContextType.Course,
		},
	});
};

const onError = (displayData: ExternalToolDisplayData): void => {
	showErrorDialog(displayData);
};

const showErrorDialog = (displayData: ExternalToolDisplayData | undefined) => {
	selectedItem.value = displayData;
	isErrorDialogOpen.value = true;
};
</script>
