<template>
	<div>
		<v-combobox
			ref="comboboxRef"
			:label="$t('pages.tool.select.label')"
			item-title="name"
			item-value="id"
			hide-selected
			clearable
			open-on-clear
			:items="configurationTemplates"
			v-model="selectedTemplate"
			:no-data-text="$t('pages.tool.select.nodata')"
			return-object
			:disabled="isInEditMode"
			:loading="loading"
			data-testId="configuration-select"
			@update:modelValue="onChangeSelection"
			@update:search="(value) => onSearchInput(value)"
			@click:append="pasteFromClipboard"
			variant="underlined"
			:append-icon="mdiContentPaste"
			:hide-no-data="hideNoData"
			:custom-filter="
				(value, query, item) => customFilter(value, query, item?.raw)
			"
			persistent-hint
			:hint="$t('pages.tool.select.description')"
		>
			<template #selection="{ item }">
				<external-tool-selection-row
					:item="item.raw"
					max-height="20"
					max-width="20"
					data-testid="configuration-selected-item"
				/>
			</template>
			<template #item="{ item, props }">
				<external-tool-selection-row
					v-bind="props"
					data-testId="configuration-select-item"
					:item="item.raw"
				/>
			</template>
		</v-combobox>
		<h2
			v-if="
				displaySettingsTitle &&
				selectedTemplate?.externalToolId &&
				(!isAboveParametersSlotEmpty || selectedTemplate.parameters.length > 0)
			"
			class="text-h4 mb-10"
		>
			{{ $t("pages.tool.settings") }}
		</h2>
		<slot
			v-if="selectedTemplate?.externalToolId"
			name="aboveParameters"
			:selectedTemplate="selectedTemplate"
		/>
		<external-tool-config-settings
			v-if="
				selectedTemplate &&
				selectedTemplate.parameters &&
				selectedTemplate.parameters.length > 0
			"
			:template="selectedTemplate"
			v-model="parameterConfiguration"
		/>
		<v-spacer class="mt-10" />
		<v-alert
			v-if="error && error.message"
			type="error"
			:icon="mdiAlertCircle"
			data-testId="tool-error-alert"
		>
			{{ $t(getBusinessErrorTranslationKey(error)!) }}
		</v-alert>
		<v-row class="justify-end mt-10">
			<v-btn
				class="mr-2"
				variant="outlined"
				@click="onCancel"
				data-testId="cancel-button"
			>
				{{ $t("common.actions.cancel") }}
			</v-btn>
			<v-btn
				class="mr-2"
				color="primary"
				variant="flat"
				:disabled="!parametersValid"
				@click="onSave"
				data-testId="save-button"
			>
				{{
					isInEditMode ? $t("common.actions.update") : $t("common.actions.add")
				}}
			</v-btn>
		</v-row>
	</div>
</template>

<script lang="ts">
import ExternalToolConfigSettings from "@/components/external-tools/configuration/ExternalToolConfigSettings.vue";
import { mdiAlertCircle } from "@/components/icons/material";
import { mdiContentPaste } from "@mdi/js";
import { useExternalToolMappings } from "@/composables/external-tool-mappings.composable";
import { useExternalToolUrlInsertion } from "@/components/external-tools/configuration/external-tool-url-insertion.composable";
import {
	SchoolExternalTool,
	ToolParameter,
	ToolParameterEntry,
} from "@/store/external-tool";
import { BusinessError } from "@/store/types/commons";
import {
	ContextExternalTool,
	ExternalToolConfigurationTemplate,
} from "@data-external-tool";
import {
	computed,
	ComputedRef,
	defineComponent,
	PropType,
	Ref,
	ref,
	toRef,
	useSlots,
	watch,
} from "vue";
import ExternalToolSelectionRow from "./ExternalToolSelectionRow.vue";

type ConfigurationTypes = SchoolExternalTool | ContextExternalTool;

export default defineComponent({
	emits: ["cancel", "save", "change"],
	components: {
		ExternalToolConfigSettings,
		ExternalToolSelectionRow,
	},
	props: {
		templates: {
			type: Array as PropType<Array<ExternalToolConfigurationTemplate>>,
			required: true,
		},
		configuration: {
			type: Object as PropType<ConfigurationTypes>,
		},
		error: {
			type: Object as PropType<BusinessError>,
		},
		loading: {
			type: Boolean,
		},
		displaySettingsTitle: {
			type: Boolean,
			default: true,
		},
	},
	setup(props, { emit }) {
		const slots = useSlots();

		const { getBusinessErrorTranslationKey } = useExternalToolMappings();

		const configurationTemplates: Ref<ExternalToolConfigurationTemplate[]> =
			toRef(props, "templates");
		const loadedConfiguration: Ref<ConfigurationTypes | undefined> = toRef(
			props,
			"configuration"
		);

		const {
			isValidUrl,
			findMatchingTemplate,
			extractPathParameters,
			extractQueryParameters,
		} = useExternalToolUrlInsertion();

		const comboboxRef = ref();

		const isInEditMode: ComputedRef<boolean> = computed(
			() => !!loadedConfiguration.value
		);

		const isAboveParametersSlotEmpty: ComputedRef<boolean> = computed(
			() => slots.aboveParameters?.({ selectedTemplate }) === undefined
		);

		const selectedTemplate: Ref<ExternalToolConfigurationTemplate | undefined> =
			ref();

		const parametersValid: ComputedRef<boolean> = computed(
			() => !!selectedTemplate.value
		);

		const parameterConfiguration: Ref<(string | undefined)[]> = ref([]);

		const hideNoData: Ref<boolean> = ref(false);

		const searchString: Ref<string> = ref("");

		const onCancel = () => {
			emit("cancel");
		};

		const onSave = async () => {
			if (selectedTemplate.value) {
				const parameterEntries: ToolParameterEntry[] = mapValidParameterEntries(
					selectedTemplate.value
				);

				emit("save", selectedTemplate.value, parameterEntries);
			}
		};

		const mapValidParameterEntries = (
			template: ExternalToolConfigurationTemplate
		) => {
			const parameterEntries: ToolParameterEntry[] = template.parameters
				.map(
					(parameter: ToolParameter, index: number): ToolParameterEntry => ({
						name: parameter.name,
						value: parameterConfiguration.value[index],
					})
				)
				.filter(
					(parameterEntry: ToolParameterEntry) =>
						parameterEntry.value !== undefined && parameterEntry.value !== ""
				);

			return parameterEntries;
		};

		const onChangeSelection = async () => {
			fillParametersWithDefaultValues();
			extractAndSetParametersFromUrl(selectedTemplate.value?.baseUrl);

			emit("change", selectedTemplate.value);
		};

		const onSearchInput = (text: string) => {
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
						(templateParameter) =>
							templateParameter.name === configuredParameter.name
					) ?? -1;

				if (index >= 0) {
					parameterConfiguration.value[index] = configuredParameter.value;
				}
			});
		};

		const extractAndSetParametersFromUrl = (baseUrl: string | undefined) => {
			if (!baseUrl || !searchString.value) {
				return;
			}

			const pathParams = extractPathParameters(searchString.value, baseUrl);
			const queryParams = extractQueryParameters(searchString.value);
			const allParams = new Map([...pathParams, ...queryParams]);

			allParams.forEach((value, name) => {
				const paramIndex = selectedTemplate.value?.parameters.findIndex(
					(param) => param.name === name
				);
				if (paramIndex !== undefined && paramIndex >= 0) {
					parameterConfiguration.value[paramIndex] = value;
				}
			});
		};

		const pasteFromClipboard = async () => {
			try {
				const text = await navigator.clipboard.readText();
				comboboxRef.value.search = text;
				comboboxRef.value.isFocused = true;
				comboboxRef.value.menu = true;
				onSearchInput(text);
			} catch (err) {
				console.error("Failed to read clipboard contents: ", err);
			}
		};

		if (loadedConfiguration.value) {
			populateEditMode(loadedConfiguration.value);
		}

		watch(loadedConfiguration, (newConfig) => {
			if (newConfig) {
				populateEditMode(newConfig);
			}
		});

		const customFilter = (
			_value: string,
			query: string,
			item: ExternalToolConfigurationTemplate | undefined
		): boolean => {
			if (!item) {
				return false;
			}
			const isMatchItemUrl =
				findMatchingTemplate(query, configurationTemplates)?.baseUrl ===
				item.baseUrl;
			const isMatchItemName = item.name
				.toLowerCase()
				.includes(query.toLowerCase());
			return isMatchItemName || isMatchItemUrl;
		};

		return {
			comboboxRef,
			searchString,
			onSearchInput,
			customFilter,
			configurationTemplates,
			loadedConfiguration,
			getBusinessErrorTranslationKey,
			parametersValid,
			selectedTemplate,
			onCancel,
			onSave,
			onChangeSelection,
			isInEditMode,
			fillParametersWithDefaultValues,
			parameterConfiguration,
			isAboveParametersSlotEmpty,
			mdiAlertCircle,
			mdiContentPaste,
			hideNoData,
			pasteFromClipboard,
		};
	},
});
</script>
