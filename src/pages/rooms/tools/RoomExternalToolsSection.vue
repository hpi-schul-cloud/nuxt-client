<template>
	<div>
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

		<v-custom-dialog
			:is-open="isErrorDialogOpen"
			:has-buttons="true"
			:buttons="['close']"
			data-testId="error-dialog"
			@dialog-closed="onCloseErrorDialog"
		>
			<h2 slot="title" class="text-h4 my-2 text-break-word">
				{{ t(getBusinessErrorTranslationKey(launchError)) }}
			</h2>
		</v-custom-dialog>

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
import RenderHTML from "@/components/common/render-html/RenderHTML.vue";
import RoomExternalToolCard from "@/components/rooms/RoomExternalToolCard.vue";
import {
	ToolLaunchRequestResponse,
	ToolLaunchRequestResponseMethodEnum,
} from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import ContextExternalToolsModule from "@/store/context-external-tools";
import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import ExternalToolsModule from "@/store/external-tools";
import {
	AUTH_MODULE,
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	EXTERNAL_TOOLS_MODULE_KEY,
	I18N_KEY,
	injectStrict,
} from "@/utils/inject";
import {
	computed,
	ComputedRef,
	defineComponent,
	PropType,
	ref,
	Ref,
} from "vue";
import VueI18n from "vue-i18n";
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { useExternalToolMappings } from "@/composables/external-tool-mappings.composable";
import { BusinessError } from "@/store/types/commons";

export default defineComponent({
	name: "RoomExternalToolsSection",
	components: {
		VCustomDialog,
		RoomExternalToolCard,
		RenderHTML,
	},
	props: {
		tools: {
			type: Array as PropType<ExternalToolDisplayData[]>,
			required: true,
		},
	},
	setup() {
		const contextExternalToolsModule: ContextExternalToolsModule = injectStrict(
			CONTEXT_EXTERNAL_TOOLS_MODULE_KEY
		);
		const externalToolsModule: ExternalToolsModule = injectStrict(
			EXTERNAL_TOOLS_MODULE_KEY
		);
		const i18n: VueI18n = injectStrict(I18N_KEY);
		const authModule: AuthModule = injectStrict(AUTH_MODULE);

		// TODO: https://ticketsystem.dbildungscloud.de/browse/BC-443
		const t = (key: string, values?: VueI18n.Values): string =>
			i18n.tc(key, 0, values);

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
				await contextExternalToolsModule.deleteContextExternalTool(
					itemToDelete.value.id
				);
			}

			onCloseDeleteDialog();
		};

		const onEditTool = () => {
			// TODO N21-XXXX implement onEditTool
		};

		const onClickTool = async (tool: ExternalToolDisplayData) => {
			await launchTool(tool.id);
		};

		const launchTool = async (contextToolId: string) => {
			const launchToolResponse: ToolLaunchRequestResponse | undefined =
				await externalToolsModule.loadToolLaunchData(contextToolId);

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

		const canEdit: ComputedRef<boolean> = computed(() =>
			authModule.getUserPermissions.includes("CONTEXT_TOOL_ADMIN".toLowerCase())
		);

		const launchError: ComputedRef<BusinessError | undefined> = computed(
			() => externalToolsModule.getBusinessError
		);

		const { getBusinessErrorTranslationKey } = useExternalToolMappings();

		const isErrorDialogOpen: ComputedRef<boolean> = computed(
			() => launchError.value?.error !== undefined
		);

		const onCloseErrorDialog = () => {
			externalToolsModule.resetBusinessError();
		};

		return {
			t,
			getBusinessErrorTranslationKey,
			canEdit,
			itemToDelete,
			getItemToDeleteName,
			isDeleteDialogOpen,
			onOpenDeleteDialog,
			onCloseDeleteDialog,
			onDeleteTool,
			onClickTool,
			onEditTool,
			isErrorDialogOpen,
			launchError,
			onCloseErrorDialog,
		};
	},
});
</script>

<style lang="scss" scoped>
.text-break-word {
	word-break: break-word;
}
</style>
