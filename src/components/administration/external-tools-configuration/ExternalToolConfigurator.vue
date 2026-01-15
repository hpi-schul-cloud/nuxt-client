<template>
	<div>
		<v-autocomplete
			ref="autocompleteRef"
			v-model="selectedTemplate"
			v-model:search="searchString"
			:label="$t('pages.tool.select.label')"
			variant="underlined"
			hide-selected
			clearable
			open-on-clear
			item-title="name"
			item-value="id"
			:items="configurationTemplates"
			:no-data-text="$t('pages.tool.select.nodata')"
			return-object
			:disabled="isInEditMode"
			:loading="loading"
			data-testId="configuration-select"
			:hide-no-data="hideNoData"
			:custom-filter="(_value, query, item) => filterToolNameOrUrl(query, item?.raw)"
			persistent-hint
			:hint="$t('pages.tool.select.description')"
			@update:model-value="onChangeSelection"
			@update:search="updateSearchInput"
		>
			<template #append>
				<VIcon tabindex="-1" aria-hidden="true" @click="pasteFromClipboard">
					{{ mdiContentPaste }}
				</VIcon>
			</template>
			<template #selection="{ item }">
				<external-tool-selection-row
					:item="item.raw"
					max-height="20"
					max-width="20"
					data-testid="configuration-selected-item"
				/>
			</template>
			<template #item="{ item, props: itemProps }">
				<external-tool-selection-row v-bind="itemProps" data-testId="configuration-select-item" :item="item.raw" />
			</template>
		</v-autocomplete>
		<slot name="aboveSettings" :selected-template="selectedTemplate" />
		<h2
			v-if="displaySettingsTitle && selectedTemplate && (!isAboveParametersSlotEmpty || hasSelectedTemplateParameters)"
		>
			{{ $t("pages.tool.settings") }}
		</h2>
		<slot name="aboveParameters" :selected-template="selectedTemplate" />
		<external-tool-config-settings
			v-if="selectedTemplate && hasSelectedTemplateParameters"
			v-model="parameterConfiguration"
			:template="selectedTemplate"
			data-testid="configuration-field"
		/>
		<ErrorAlert v-if="error && error.message" class="mt-10" data-testId="tool-error-alert">
			{{ $t(getBusinessErrorTranslationKey(error)!) }}
		</ErrorAlert>
		<div class="d-flex mt-10">
			<VSpacer />
			<div class="d-flex ga-2 mr-2">
				<v-btn variant="outlined" data-testId="cancel-button" @click="onCancel">
					{{ $t("common.actions.cancel") }}
				</v-btn>
				<v-btn color="primary" variant="flat" :disabled="!parametersValid" data-testId="save-button" @click="onSave">
					{{ isInEditMode ? $t("common.actions.update") : $t("common.actions.add") }}
				</v-btn>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" generic="T extends ExternalToolConfigurationTemplate">
import { useExternalToolUrlInsertion } from "./external-tool-url-insertion.composable";
import ExternalToolSelectionRow from "./ExternalToolSelectionRow.vue";
import ExternalToolConfigSettings from "@/components/administration/external-tools-configuration/ExternalToolConfigSettings.vue";
import { useExternalToolMappings } from "@/composables/external-tool-mappings.composable";
import { SchoolExternalTool, ToolParameter, ToolParameterEntry } from "@/store/external-tool";
import { BusinessError } from "@/store/types/commons";
import { notifyError } from "@data-app";
import { ContextExternalTool, ExternalToolConfigurationTemplate } from "@data-external-tool";
import { mdiContentPaste } from "@icons/material";
import { ErrorAlert } from "@ui-alert";
import { computed, ComputedRef, nextTick, Ref, ref, toRef, useSlots, watch } from "vue";
import { useI18n } from "vue-i18n";

type ConfigurationTypes = SchoolExternalTool | ContextExternalTool;

const { t } = useI18n();

const slots = useSlots();

const { displaySettingsTitle = true, ...props } = defineProps<{
	templates: T[];
	configuration: ConfigurationTypes | undefined;
	isPreferredTool?: boolean;
	error: BusinessError | undefined;
	loading?: boolean;
	displaySettingsTitle?: boolean;
}>();

const emit = defineEmits<{
	(e: "cancel"): void;
	(e: "save", template: T, values: ToolParameterEntry[]): void;
	(e: "change", value: T | undefined): void;
}>();

const { getBusinessErrorTranslationKey } = useExternalToolMappings();

const { isValidUrl, findMatchingTemplate, extractPathParameters, extractQueryParameters } =
	useExternalToolUrlInsertion();

const configurationTemplates: Ref<T[]> = toRef(props, "templates");

const loadedConfiguration: Ref<ConfigurationTypes | undefined> = toRef(props, "configuration");

const autocompleteRef = ref();

const isInEditMode: ComputedRef<boolean> = computed(() => !!loadedConfiguration.value);

const isAboveParametersSlotEmpty: ComputedRef<boolean> = computed(
	() => slots.aboveParameters?.({ selectedTemplate }) === undefined
);

const hasSelectedTemplateParameters: ComputedRef<boolean> = computed(
	() => !!(selectedTemplate.value?.parameters && selectedTemplate.value?.parameters.length > 0)
);

const selectedTemplate: Ref<T | undefined> = ref();

const parametersValid: ComputedRef<boolean> = computed(() => !!selectedTemplate.value);

const parameterConfiguration: Ref<(string | undefined)[]> = ref([]);

const hideNoData: Ref<boolean> = ref(false);

const searchString: Ref<string> = ref("");

const onCancel = () => {
	emit("cancel");
};

const onSave = () => {
	if (selectedTemplate.value) {
		const parameterEntries: ToolParameterEntry[] = mapValidParameterEntries(selectedTemplate.value);

		emit("save", selectedTemplate.value, parameterEntries);
	}
};

const mapValidParameterEntries = (template: T) => {
	const parameterEntries: ToolParameterEntry[] = template.parameters
		.map(
			(parameter: ToolParameter, index: number): ToolParameterEntry => ({
				name: parameter.name,
				value: parameterConfiguration.value[index],
			})
		)
		.filter((parameterEntry: ToolParameterEntry) => parameterEntry.value !== undefined && parameterEntry.value !== "");

	return parameterEntries;
};

const onChangeSelection = async () => {
	fillParametersWithDefaultValues();

	if (hasSelectedTemplateParameters.value) {
		extractAndSetParametersFromUrl(selectedTemplate.value?.baseUrl);
	}

	emit("change", selectedTemplate.value);
};

const updateSearchInput = (text: string) => {
	searchString.value = text;
	hideNoData.value = isValidUrl(text);
};

const populateEditMode = (configuration: ConfigurationTypes) => {
	if (props.templates.length >= 1) {
		selectedTemplate.value = props.templates[0];

		fillParametersWithDefaultValues();

		fillParametersWithValues(configuration);
	}
};

const fillParametersWithDefaultValues = () => {
	parameterConfiguration.value = [];
	selectedTemplate.value?.parameters?.forEach((parameter, index) => {
		parameterConfiguration.value[index] = parameter.defaultValue;
	});
};

const fillParametersWithValues = (configuration: ConfigurationTypes) => {
	configuration.parameters.forEach((configuredParameter) => {
		// Find the index of the configured parameter in the template
		const index: number =
			selectedTemplate.value?.parameters.findIndex(
				(templateParameter) => templateParameter.name === configuredParameter.name
			) ?? -1;

		if (index >= 0) {
			parameterConfiguration.value[index] = configuredParameter.value;
		}
	});
};

const extractAndSetParametersFromUrl = (baseUrl: string | undefined) => {
	if (!baseUrl || !searchString.value || !isValidUrl(searchString.value)) {
		return;
	}

	const pathParams: Map<string, string> = extractPathParameters(searchString.value, baseUrl);
	const queryParams: Map<string, string> = extractQueryParameters(searchString.value);
	const allParams: Map<string, string> = new Map();
	pathParams.forEach((value, key) => allParams.set(key, value));
	queryParams.forEach((value, key) => allParams.set(key, value));

	selectedTemplate.value?.parameters?.forEach((parameter: ToolParameter, index: number) => {
		const value: string | undefined = allParams.get(parameter.name);

		if (value) {
			parameterConfiguration.value[index] = value;
		}
	});
};

const pasteFromClipboard = async () => {
	try {
		const text = await navigator.clipboard.readText();

		autocompleteRef.value.focus();

		await nextTick();

		updateSearchInput(text);
	} catch {
		notifyError(t("pages.tool.select.clipboard.error"));
	}
};

const filterToolNameOrUrl = (query: string, item: T | undefined): boolean => {
	if (!item) {
		return false;
	}
	const isMatchItemUrl = findMatchingTemplate(query, configurationTemplates.value)?.baseUrl === item.baseUrl;
	const isMatchItemName = item.name.toLowerCase().includes(query.toLowerCase());

	return isMatchItemName || isMatchItemUrl;
};

watch(
	loadedConfiguration,
	(newConfig) => {
		if (newConfig) {
			populateEditMode(newConfig);
		}
	},
	{ immediate: true }
);

watch(
	configurationTemplates,
	() => {
		if (props.isPreferredTool && props.templates.length > 0) {
			selectedTemplate.value = props.templates[0];
		}
	},
	{ immediate: true }
);
</script>
