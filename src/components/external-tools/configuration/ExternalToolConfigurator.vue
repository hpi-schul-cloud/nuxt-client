<template>
	<div>
		<v-autocomplete
			:label="$t('pages.tool.select.label')"
			item-title="name"
			item-value="id"
			hide-selected
			clearable
			:items="configurationTemplates"
			v-model="selectedTemplate"
			:no-data-text="$t('common.nodata')"
			return-object
			:disabled="isInEditMode"
			:loading="loading"
			data-testId="configuration-select"
			@update:modelValue="onChangeSelection"
			variant="underlined"
		>
			<template #selection="{ item }">
				<external-tool-selection-row
					:item="item.raw"
					max-height="20"
					max-width="20"
					data-testId=""
				/>
			</template>
			<template #item="{ item, props }">
				<external-tool-selection-row
					v-bind="props"
					data-testId="configuration-select-item"
					:item="item.raw"
				/>
			</template>
		</v-autocomplete>
		<h2
			v-if="
				displaySettingsTitle &&
				selectedTemplate &&
				(!isAboveParametersSlotEmpty || selectedTemplate.parameters.length > 0)
			"
			class="text-h4 mb-10"
		>
			{{ $t("pages.tool.settings") }}
		</h2>
		<slot name="aboveParameters" :selectedTemplate="selectedTemplate" />
		<external-tool-config-settings
			v-if="selectedTemplate && selectedTemplate.parameters.length > 0"
			:template="selectedTemplate"
			v-model="parameterConfiguration"
		/>
		<v-spacer class="mt-10" />
		<v-alert v-if="error && error.message" type="error" :icon="mdiAlertCircle">
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
import { useExternalToolMappings } from "@/composables/external-tool-mappings.composable";
import {
	ExternalToolConfigurationTemplate,
	SchoolExternalTool,
	ToolParameter,
	ToolParameterEntry,
} from "@/store/external-tool";
import { ContextExternalTool } from "@/store/external-tool/context-external-tool";
import { BusinessError } from "@/store/types/commons";
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
import { mdiAlertCircle } from "@/components/icons/material";

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

			emit("change", selectedTemplate.value);
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

			selectedTemplate.value?.parameters.forEach((parameter, index) => {
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

		if (loadedConfiguration.value) {
			populateEditMode(loadedConfiguration.value);
		}

		watch(loadedConfiguration, (newConfig) => {
			if (newConfig) {
				populateEditMode(newConfig);
			}
		});

		return {
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
		};
	},
});
</script>
