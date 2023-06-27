<template>
	<div class="centered-container">
		<div
			v-if="tools.length === 0"
			class="mt-16 text-center"
			data-testid="tools-empty-state"
		>
			<v-custom-empty-state
				ref="tools-empty-state"
				image="tools-empty-state"
				:title="t('pages.rooms.tools.emptyState')"
				class="mt-16"
				imgHeight="200px"
			/>
		</div>
		<v-alert
			v-if="apiError.message"
			light
			prominent
			text
			type="error"
			data-testId="context-tool-error"
		>
			{{ apiError.message }}
		</v-alert>

		<room-external-tool-card
			v-for="(tool, index) in tools"
			:key="index"
			class="mb-4"
			:tool="tool"
			:can-edit="canEdit"
			@delete="onOpenDeleteDialog"
			@edit="onEditTool"
			@click="onClickTool"
			:data-testid="`external-tool-card-${index}`"
		></room-external-tool-card>

		<v-progress-linear
			:active="loading"
			data-testId="progress-bar"
			indeterminate
		></v-progress-linear>

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
					<RenderHTML
						class="text-md mt-2"
						:html="
							t('pages.rooms.tools.deleteDialog.content', {
								itemName: getItemToDeleteName,
							})
						"
						component="p"
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
import AuthModule from "@/store/auth";
import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import {
	computed,
	ComputedRef,
	defineComponent,
	inject,
	onMounted,
	ref,
	Ref,
} from "vue";
import {
	ToolLaunchRequestResponse,
	ToolLaunchRequestResponseMethodEnum,
} from "@/serverApi/v3";
import RenderHTML from "@/components/common/render-html/RenderHTML.vue";
import VCustomEmptyState from "@/components/molecules/vCustomEmptyState.vue";
import { ToolContextType } from "@/store/external-tool/tool-context-type.enum";
import { BusinessError } from "@/store/types/commons";
import VueI18n from "vue-i18n";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import ContextExternalToolsModule from "@/store/context-external-tools";
import ExternalToolsModule from "@/store/external-tools";

export default defineComponent({
	name: "RoomExternalToolsOverview",
	components: { RoomExternalToolCard, RenderHTML, VCustomEmptyState },
	props: {
		roomId: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const authModule: AuthModule | undefined = inject<AuthModule>("authModule");
		const contextExternalToolsModule: ContextExternalToolsModule | undefined =
			inject<ContextExternalToolsModule>("contextExternalToolsModule");
		const externalToolsModule: ExternalToolsModule | undefined =
			inject<ExternalToolsModule>("externalToolsModule");
		const i18n: VueI18n = injectStrict(I18N_KEY);

		onMounted(async () => {
			await contextExternalToolsModule?.loadExternalToolDisplayData({
				contextId: props.roomId,
				contextType: ToolContextType.COURSE,
			});
		});

		// TODO: https://ticketsystem.dbildungscloud.de/browse/BC-443
		const t = (key: string, values?: VueI18n.Values | undefined) => {
			const translateResult = i18n.t(key, values);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const tools: ComputedRef<ExternalToolDisplayData[]> = computed(
			() => contextExternalToolsModule?.getExternalToolDisplayDataList || []
		);

		const isDeleteDialogOpen: Ref<boolean> = ref(false);

		const itemToDelete: Ref<ExternalToolDisplayData | undefined> = ref();

		const getItemToDeleteName: ComputedRef<string> = computed(
			() => itemToDelete.value?.name || "???"
		);

		const onOpenDeleteDialog = (tool: ExternalToolDisplayData) => {
			itemToDelete.value = tool;
			isDeleteDialogOpen.value = true;
		};

		const onCloseDeleteDialog = () => {
			itemToDelete.value = undefined;
			isDeleteDialogOpen.value = false;
		};

		const onDeleteTool = async () => {
			if (itemToDelete.value) {
				await contextExternalToolsModule?.deleteContextExternalTool(
					itemToDelete.value.id
				);
			}

			onCloseDeleteDialog();
		};

		const onEditTool = () => {
			console.log("Edit Tool");
		};

		const onClickTool = async (tool: ExternalToolDisplayData) => {
			await launchTool(tool.id);
		};

		const launchTool = async (contextToolId: string) => {
			const launchToolResponse: ToolLaunchRequestResponse | undefined =
				await externalToolsModule?.loadToolLaunchData(contextToolId);

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
				return;
			}
			window.location.href = toolLaunch.url;
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

		const apiError: ComputedRef<BusinessError | undefined> = computed(
			() => contextExternalToolsModule?.getBusinessError
		);

		const loading: ComputedRef<boolean | undefined> = computed(
			() => contextExternalToolsModule?.getLoading
		);

		return {
			loading,
			t,
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
			apiError,
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
