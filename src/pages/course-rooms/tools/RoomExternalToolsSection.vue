<template>
	<div>
		<room-external-tool-card
			v-for="(tool, index) in tools"
			size="360"
			:key="index"
			class="mb-4"
			:tool="tool"
			:can-edit="canEdit"
			@delete="onOpenDeleteDialog"
			@edit="onEditTool"
			@error="onError"
			:data-testid="`external-tool-card-${index}`"
		/>

		<RoomExternalToolsErrorDialog
			v-if="selectedItem"
			:selected-item="selectedItem"
			:is-open="isErrorDialogOpen"
			@closed="onCloseErrorDialog"
		/>

		<v-custom-dialog
			:is-open="isDeleteDialogOpen"
			:has-buttons="true"
			:buttons="['cancel', 'confirm']"
			max-width="360"
			data-testId="delete-dialog"
			@dialog-confirmed="onDeleteTool"
			@dialog-canceled="onCloseDeleteDialog"
		>
			<template #title>
				<h2 class="text-h4 my-2" data-testid="delete-dialog-title">
					{{ t("pages.rooms.tools.deleteDialog.title") }}
				</h2>
			</template>
			<template #content>
				<RenderHTML
					class="text-md mt-2"
					data-testid="delete-dialog-content"
					:html="
						t('pages.rooms.tools.deleteDialog.content', {
							itemName: selectedItemName,
						})
					"
					component="p"
				/>
			</template>
		</v-custom-dialog>
	</div>
</template>

<script setup lang="ts">
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import RoomExternalToolCard from "@/components/rooms/RoomExternalToolCard.vue";
import RoomExternalToolsErrorDialog from "@/pages/course-rooms/tools/RoomExternalToolsErrorDialog.vue";
import { ToolContextType } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { ExternalToolDisplayData } from "@data-external-tool";
import { RenderHTML } from "@feature-render-html";
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
}>();

const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);
const router = useRouter();
const { t } = useI18n();

const isDeleteDialogOpen = ref(false);
const isErrorDialogOpen = ref(false);
const selectedItem = ref<ExternalToolDisplayData | undefined>();

const selectedItemName = computed(() => selectedItem.value?.name || "???");
const canEdit = computed(() =>
	authModule.getUserPermissions.includes("CONTEXT_TOOL_ADMIN".toLowerCase())
);

const onOpenDeleteDialog = (tool: ExternalToolDisplayData) => {
	selectedItem.value = tool;
	isDeleteDialogOpen.value = true;
};

const onCloseDeleteDialog = () => {
	selectedItem.value = undefined;
	isDeleteDialogOpen.value = false;
};

const onDeleteTool = async () => {
	if (selectedItem.value) {
		emit("delete", selectedItem.value);
	}

	onCloseDeleteDialog();
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
