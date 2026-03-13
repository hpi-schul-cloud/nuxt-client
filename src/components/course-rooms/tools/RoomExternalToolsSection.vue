<template>
	<div>
		<room-external-tool-card
			v-for="(tool, index) in tools"
			:key="index"
			size="360"
			class="mb-4"
			:tool="tool"
			:can-edit="canEdit"
			:data-testid="`external-tool-card-${tool.name}`"
			@delete="onDelete"
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
	</div>
</template>

<script setup lang="ts">
import RoomExternalToolCard from "./RoomExternalToolCard.vue";
import RoomExternalToolsErrorDialog from "./RoomExternalToolsErrorDialog.vue";
import { Permission, ToolContextType } from "@/serverApi/v3";
import { askDeletionItem } from "@/utils/confirm-dialog.utils";
import { useAppStore } from "@data-app";
import { ExternalToolDisplayData } from "@data-external-tool";
import { PropType, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { t } = useI18n();
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

const isErrorDialogOpen = ref(false);
const selectedItem = ref<ExternalToolDisplayData | undefined>();

const canEdit = useAppStore().hasPermission(Permission.ContextToolAdmin);

const onDelete = async (tool: ExternalToolDisplayData) => {
	const confirmed = await askDeletionItem({
		title: t("pages.rooms.tools.deleteDialog.title"),
		itemName: tool.name,
		message: "pages.rooms.tools.deleteDialog.content",
		confirmBtnKey: "common.actions.remove",
	});

	if (confirmed) {
		emit("delete", tool);
	}
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

<style lang="scss" scoped>
.text-break-word {
	word-break: break-word;
}
</style>
