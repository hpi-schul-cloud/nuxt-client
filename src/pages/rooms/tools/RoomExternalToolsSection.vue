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

		<template v-if="selectedItem">
			<RoomExternalToolsErrorDialog
				:selected-item="selectedItem"
				:is-open="isErrorDialogOpen"
				@closed="onCloseErrorDialog"
			/>
		</template>

		<v-dialog
			v-model="isDeleteDialogOpen"
			max-width="360"
			data-testId="delete-dialog"
		>
			<v-card :ripple="false">
				<v-card-title>
					<h2 class="text-h4 my-2">
						{{ t("pages.rooms.tools.deleteDialog.title") }}
					</h2>
				</v-card-title>
				<v-card-text class="text--primary">
					<RenderHTML
						class="text-md mt-2"
						:html="
							t('pages.rooms.tools.deleteDialog.content', {
								itemName: selectedItemName,
							})
						"
						component="p"
					/>
				</v-card-text>
				<v-card-actions>
					<v-spacer />
					<v-btn
						data-testId="dialog-cancel"
						variant="text"
						@click="onCloseDeleteDialog"
					>
						{{ t("common.actions.cancel") }}
					</v-btn>
					<v-btn
						data-testId="dialog-confirm"
						class="px-6"
						color="primary"
						variant="flat"
						@click="onDeleteTool"
					>
						{{ t("common.actions.confirm") }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
import RoomExternalToolCard from "@/components/rooms/RoomExternalToolCard.vue";
import { ToolContextType } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import ContextExternalToolsModule from "@/store/context-external-tools";
import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import {
	AUTH_MODULE_KEY,
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { RenderHTML } from "@feature-render-html";
import {
	computed,
	ComputedRef,
	defineComponent,
	PropType,
	ref,
	Ref,
} from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import RoomExternalToolsErrorDialog from "@/pages/rooms/tools/RoomExternalToolsErrorDialog.vue";

export default defineComponent({
	name: "RoomExternalToolsSection",
	components: {
		RoomExternalToolsErrorDialog,
		RoomExternalToolCard,
		RenderHTML,
	},
	props: {
		tools: {
			type: Array as PropType<ExternalToolDisplayData[]>,
			required: true,
		},
		roomId: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const contextExternalToolsModule: ContextExternalToolsModule = injectStrict(
			CONTEXT_EXTERNAL_TOOLS_MODULE_KEY
		);

		const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);

		const router = useRouter();

		const { t } = useI18n();

		const isDeleteDialogOpen: Ref<boolean> = ref(false);

		const isErrorDialogOpen: Ref<boolean> = ref(false);

		const selectedItem: Ref<ExternalToolDisplayData | undefined> = ref();

		const selectedItemName: ComputedRef<string> = computed(
			() => selectedItem.value?.name || "???"
		);

		const canEdit: ComputedRef<boolean> = computed(() =>
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
				await contextExternalToolsModule.deleteContextExternalTool(
					selectedItem.value.contextExternalToolId
				);
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

		const showErrorDialog = (
			displayData: ExternalToolDisplayData | undefined
		) => {
			selectedItem.value = displayData;
			isErrorDialogOpen.value = true;
		};

		return {
			t,
			canEdit,
			selectedItem,
			selectedItemName,
			isDeleteDialogOpen,
			onOpenDeleteDialog,
			onCloseDeleteDialog,
			onDeleteTool,
			onEditTool,
			isErrorDialogOpen,
			onCloseErrorDialog,
			onError,
		};
	},
});
</script>

<style lang="scss" scoped>
.text-break-word {
	word-break: break-word;
}
</style>
