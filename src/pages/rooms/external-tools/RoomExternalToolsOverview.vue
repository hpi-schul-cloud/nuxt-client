<template>
	<div class="centered-container">
		<div
			v-if="tools.length === 0"
			class="mt-16 text-center"
			data-testid="tools-empty-state"
		>
			<v-img
				height="200"
				src="@/assets/img/empty-state/tools-empty-state.svg"
				contain
				:alt="$t('pages.rooms.tools.logo')"
			/>
			<h4>
				{{ $t("pages.rooms.tools.emptyState") }}
			</h4>
		</div>

		<room-external-tool-card
			v-for="(tool, index) in tools"
			:key="index"
			class="mb-4"
			:tool="tool"
			:can-edit="canEdit"
			@delete="onOpenDeleteDialog"
			@edit="onEditTool"
			@click="onClickTool"
		></room-external-tool-card>

		<v-dialog
			v-model="isDeleteDialogOpen"
			max-width="450"
			data-testId="delete-dialog"
		>
			<v-card :ripple="false">
				<v-card-title>
					<h2 class="text-h4 my-2">
						{{ $t("pages.rooms.tools.deleteDialog.title") }}
					</h2>
				</v-card-title>
				<v-card-text class="text--primary">
					<p
						class="text-md mt-2"
						v-html="
							$t('pages.rooms.tools.deleteDialog.content', {
								itemName: getItemToDeleteName,
							})
						"
					/>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						data-testId="dialog-cancel"
						depressed
						text
						@click="onCloseDeleteDialog"
					>
						{{ $t("common.actions.cancel") }}
					</v-btn>
					<v-btn
						data-testId="dialog-confirm"
						class="px-6"
						color="primary"
						depressed
						@click="onDeleteTool"
					>
						{{ $t("common.actions.confirm") }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
import RoomExternalToolCard from "@/components/external-tools/RoomExternalToolCard.vue";
import { externalToolsModule } from "@/store";
import AuthModule from "@/store/auth";
import ContextExternalToolsModule from "@/store/context-external-tool";
import { ContextExternalTool } from "@/store/external-tool/context-external-tool";
import { computed, ComputedRef, defineComponent, inject, ref, Ref } from "vue";
import {
	ToolLaunchRequestResponse,
	ToolLaunchRequestResponseMethodEnum,
} from "@/serverApi/v3";

export default defineComponent({
	name: "RoomExternalToolOverview",
	components: { RoomExternalToolCard },
	setup() {
		const authModule: AuthModule | undefined = inject<AuthModule>("authModule");
		const contextExternalToolsModule: ContextExternalToolsModule | undefined =
			inject<ContextExternalToolsModule>("contextExternalToolsModule");

		const tools: ComputedRef<ContextExternalTool[]> = computed(
			() => contextExternalToolsModule?.getContextExternalTools || []
		);

		const isDeleteDialogOpen: Ref<boolean> = ref(false);

		const itemToDelete: Ref<ContextExternalTool | undefined> = ref();

		const getItemToDeleteName: ComputedRef<string> = computed(
			() => itemToDelete.value?.name || "???"
		);

		const onOpenDeleteDialog = (tool: ContextExternalTool) => {
			itemToDelete.value = tool;
			isDeleteDialogOpen.value = true;
		};

		const onCloseDeleteDialog = () => {
			itemToDelete.value = undefined;
			isDeleteDialogOpen.value = false;
		};

		const onDeleteTool = () => {
			console.log("Delete Tool");

			onCloseDeleteDialog();
		};

		const onEditTool = () => {
			console.log("Edit Tool");
		};

		const onClickTool = async (tool: ContextExternalTool) => {
			await launchTool(tool.id);
		};

		const launchTool = async (contextToolId: string) => {
			const launchToolResponse: ToolLaunchRequestResponse | undefined =
				await externalToolsModule?.getToolLaunchData(contextToolId);

			switch (launchToolResponse?.method) {
				case ToolLaunchRequestResponseMethodEnum.Get:
					handleGetLaunchRequest(launchToolResponse);
					break;
				case ToolLaunchRequestResponseMethodEnum.Post:
					handlePostLaunchRequest(launchToolResponse);
					break;
				default:
					break;
			}
		};

		const handleGetLaunchRequest = (toolLaunch: ToolLaunchRequestResponse) => {
			if (toolLaunch.openNewTab) {
				window.open(toolLaunch.url, "_blank");
			} else {
				window.location.href = toolLaunch.url;
			}
		};

		const handlePostLaunchRequest = (toolLaunch: ToolLaunchRequestResponse) => {
			const form: HTMLFormElement = document.createElement("form");
			form.method = "POST";
			form.action = toolLaunch.url;
			form.target = toolLaunch.openNewTab ? "_blank" : "_self";

			const payload = JSON.parse(toolLaunch.payload || "{}");

			for (const key in payload) {
				if (Object.prototype.hasOwnProperty.call(payload, key)) {
					const hiddenField = document.createElement("input");
					hiddenField.type = "hidden";
					hiddenField.name = key;
					hiddenField.value = payload[key];

					form.appendChild(hiddenField);
				}
			}

			document.body.appendChild(form);
			form.submit();
		};

		const canEdit: ComputedRef<boolean> = computed(
			() =>
				!!authModule?.getUserPermissions.includes(
					"CONTEXT_TOOL_ADMIN".toLowerCase()
				)
		);

		return {
			tools,
			canEdit,
			itemToDelete,
			getItemToDeleteName,
			isDeleteDialogOpen,
			onOpenDeleteDialog,
			onCloseDeleteDialog,
			onDeleteTool,
			onClickTool,
			onEditTool,
		};
	},
});
</script>

<style lang="scss" scoped>
.centered-container {
	max-width: var(--size-content-width-max);
	margin: 0 auto;
}
</style>
