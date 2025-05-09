<template>
	<external-tool-configurator
		:templates="availableTools"
		:configuration="configuration"
		:is-preferred-tool="isPreferredTool"
		:error="apiError"
		:loading="loading"
		:display-settings-title="displaySettingsTitle"
		@cancel="onCancel"
		@save="onSave"
		@change="onSelectionChange"
	>
		<template #aboveParameters="{ selectedTemplate }">
			<v-text-field
				v-if="selectedTemplate"
				v-model="displayName"
				:label="$t('pages.tool.context.displayName')"
				:hint="$t('pages.tool.context.displayNameDescription')"
				persistent-hint
				validate-on="blur"
				data-testId="parameter-display-name"
			/>
		</template>
	</external-tool-configurator>
</template>

<script setup lang="ts">
import ExternalToolConfigurator from "@/components/external-tools/configuration/ExternalToolConfigurator.vue";
import { ToolContextType } from "@/serverApi/v3";
import { ToolParameterEntry } from "@/store/external-tool";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import { BusinessError } from "@/store/types/commons";
import { injectStrict, SCHOOL_EXTERNAL_TOOLS_MODULE_KEY } from "@/utils/inject";
import {
	ContextExternalTool,
	ContextExternalToolConfigurationTemplate,
	ContextExternalToolMapper,
	ContextExternalToolSave,
	useContextExternalToolConfigurationState,
	useContextExternalToolState,
} from "@data-external-tool";
import { computed, ComputedRef, PropType, Ref, ref } from "vue";

const props = defineProps({
	configId: {
		type: [String, null],
		default: null,
	},
	contextId: {
		type: String,
		required: true,
	},
	contextType: {
		type: String as PropType<ToolContextType>,
		required: true,
	},
	displaySettingsTitle: {
		type: Boolean,
		default: true,
	},
});

const emit = defineEmits<{
	(e: "success", value: ContextExternalTool): void;
	(e: "cancel"): void;
}>();

const {
	availableTools,
	fetchAvailableToolConfigurationsForContext,
	fetchConfigurationForContextExternalTool,
	isLoading: isLoadingTemplate,
	error: templateError,
} = useContextExternalToolConfigurationState();
const {
	contextExternalTool: configuration,
	fetchContextExternalTool,
	createContextExternalTool,
	updateContextExternalTool,
	isLoading: isLoadingConfig,
	error: configError,
} = useContextExternalToolState();

const hasData: Ref<boolean> = ref(false);
const loading: ComputedRef<boolean> = computed(
	() => !hasData.value || isLoadingConfig.value || isLoadingTemplate.value
);

const displayName: Ref<string | undefined> = ref<string | undefined>();

const apiError: ComputedRef<BusinessError | undefined> = computed(
	() => configError.value || templateError.value
);

const schoolExternalToolsModule: SchoolExternalToolsModule = injectStrict(
	SCHOOL_EXTERNAL_TOOLS_MODULE_KEY
);

const preferredTool =
	schoolExternalToolsModule.getContextExternalToolConfigurationTemplate;

const isPreferredTool: Ref<boolean> = ref(false);

const onCancel = async () => {
	emit("cancel");
};

const onSelectionChange = async () => {
	displayName.value = undefined;
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

	let savedTool: ContextExternalTool | undefined;
	if (props.configId) {
		savedTool = await updateContextExternalTool(
			props.configId,
			contextExternalTool
		);
	} else {
		savedTool = await createContextExternalTool(contextExternalTool);
	}

	if (savedTool && !apiError.value) {
		emit("success", savedTool);
	}
};

const fetchData = async () => {
	if (props.configId) {
		// Loading order is important
		await fetchConfigurationForContextExternalTool(props.configId);

		await fetchContextExternalTool(props.configId);
		displayName.value = configuration.value?.displayName;
	} else if (preferredTool) {
		availableTools.value = [preferredTool];
		isPreferredTool.value = true;
		schoolExternalToolsModule.setContextExternalToolConfigurationTemplate(
			undefined
		);
	} else {
		await fetchAvailableToolConfigurationsForContext(
			props.contextId,
			props.contextType
		);
	}

	hasData.value = true;
};

const clearData = () => {
	availableTools.value = [];
	configuration.value = undefined;
	displayName.value = undefined;
	hasData.value = false;
};

defineExpose({
	fetchData,
	clearData,
});
</script>
