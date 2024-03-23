<template>
	<v-custom-dialog
		:is-open="isOpen"
		:has-buttons="false"
		@dialog-closed="onCancel"
	>
		<template #title>
			<h2 class="text-h4 my-2">
				{{ t("feature-board-external-tool-element.dialog.title") }}
			</h2>
		</template>
		<template #content>
			<external-tool-configurator
				class="mb-2"
				:templates="configurationTemplates"
				:configuration="configuration"
				:error="apiError"
				:loading="isLoading"
				:display-settings-title="false"
				@cancel="onCancel"
				@save="onSave"
				@change="onSelectionChange"
			>
				<template #aboveParameters="{ selectedTemplate }">
					<v-text-field
						v-if="selectedTemplate"
						v-model="displayName"
						:label="t('pages.tool.context.displayName')"
						:hint="t('pages.tool.context.displayNameDescription')"
						persistent-hint
						validate-on="blur"
						data-testId="parameter-display-name"
					/>
				</template>
			</external-tool-configurator>
		</template>
	</v-custom-dialog>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n";
import { ToolContextType } from "@/serverApi/v3";
import ContextExternalToolsModule from "@/store/context-external-tools";
import {
	ContextExternalToolConfigurationTemplate,
	ToolParameterEntry,
} from "@/store/external-tool";
import {
	ContextExternalTool,
	ContextExternalToolSave,
} from "@/store/external-tool/context-external-tool";
import { ContextExternalToolMapper } from "@/store/external-tool/mapper";
import { BusinessError } from "@/store/types/commons";
import {
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { useBoardNotifier } from "@util-board";
import {
	computed,
	ComputedRef,
	defineComponent,
	PropType,
	ref,
	Ref,
	watch,
} from "vue";
import ExternalToolConfigurator from "@/components/external-tools/configuration/ExternalToolConfigurator.vue";
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";

export default defineComponent({
	emits: ["close", "save"],
	components: { ExternalToolConfigurator, VCustomDialog },
	props: {
		isOpen: {
			type: Boolean,
			required: true,
		},
		contextId: {
			type: String,
			required: true,
		},
		contextType: {
			type: String as PropType<ToolContextType>,
			default: ToolContextType.BoardElement,
		},
		configId: {
			type: String,
		},
	},
	setup(props, { emit }) {
		const contextExternalToolsModule: ContextExternalToolsModule = injectStrict(
			CONTEXT_EXTERNAL_TOOLS_MODULE_KEY
		);

		const { t } = useI18n();
		const { showSuccess } = useBoardNotifier();

		const hasData: Ref<boolean> = ref(false);

		const isLoading: ComputedRef<boolean> = computed(
			() => !hasData.value || contextExternalToolsModule.getLoading
		);

		const configurationTemplates: ComputedRef<
			ContextExternalToolConfigurationTemplate[]
		> = computed(
			() =>
				contextExternalToolsModule.getContextExternalToolConfigurationTemplates
		);

		const configuration: Ref<ContextExternalTool | undefined> = ref();

		const displayName: Ref<string | undefined> = ref();

		const apiError: ComputedRef<BusinessError | undefined> = computed(() =>
			contextExternalToolsModule.getBusinessError.message
				? contextExternalToolsModule.getBusinessError
				: undefined
		);

		const closeDialog = () => {
			configuration.value = undefined;
			displayName.value = undefined;
			hasData.value = false;

			emit("close");
		};

		const onCancel = () => {
			closeDialog();
		};

		const onSave = async (
			template: ContextExternalToolConfigurationTemplate,
			configuredParameterValues: ToolParameterEntry[]
		) => {
			const contextExternalTool: ContextExternalToolSave =
				ContextExternalToolMapper.mapTemplateToContextExternalToolSave(
					template,
					configuredParameterValues,
					props.contextId,
					props.contextType,
					displayName.value
				);

			let savedTool: ContextExternalTool | null;
			if (props.configId) {
				savedTool = await contextExternalToolsModule.updateContextExternalTool({
					contextExternalToolId: props.configId,
					contextExternalTool,
				});
			} else {
				savedTool =
					await contextExternalToolsModule.createContextExternalTool(
						contextExternalTool
					);
			}

			if (savedTool) {
				emit("save", savedTool);
			}

			if (!apiError.value) {
				const message = props.configId
					? t(
							"components.administration.externalToolsSection.notification.updated"
						)
					: t(
							"components.administration.externalToolsSection.notification.created"
						);

				showSuccess(message);

				closeDialog();
			}
		};

		watch(
			() => props.isOpen,
			async (value, oldValue) => {
				if (value && !oldValue) {
					await onOpen();
				}
			}
		);

		const onOpen = async () => {
			if (props.configId) {
				// Loading order is important
				await contextExternalToolsModule.loadConfigurationTemplateForContextExternalTool(
					props.configId
				);

				configuration.value =
					await contextExternalToolsModule.loadContextExternalTool(
						props.configId
					);
				displayName.value = configuration.value?.displayName;
			} else {
				await contextExternalToolsModule.loadAvailableToolsForContext({
					contextId: props.contextId,
					contextType: props.contextType,
				});
			}

			hasData.value = true;
		};

		const onSelectionChange = async () => {
			displayName.value = undefined;
		};

		return {
			t,
			isLoading,
			displayName,
			apiError,
			configurationTemplates,
			configuration,
			onSelectionChange,
			onSave,
			onCancel,
		};
	},
});
</script>
