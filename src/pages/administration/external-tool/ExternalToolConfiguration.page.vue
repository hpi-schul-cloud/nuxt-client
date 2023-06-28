<template>
	<default-wireframe
		:headline="t('pages.tool.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="false"
	>
		<RenderHTML :html="t('pages.tool.description')" component="p" />
		<v-spacer class="mt-10" />
		<v-select
			:label="t('pages.tool.select.label')"
			item-title="name"
			item-value="id"
			:items="configurationItems"
			v-model="selectedItem"
			:no-data-text="t('common.nodata')"
			return-object
			:disabled="isInEditMode"
			:loading="loading"
			@change="onSelectTemplate"
			data-testId="configuration-select"
		>
			<template #selection="{ item }">
				<external-tool-selection-row
					:item="item"
					max-height="20"
					max-width="20"
				/>
			</template>
			<template #item="{ item }">
				<external-tool-selection-row :item="item" />
			</template>
		</v-select>
		<template v-if="toolTemplate && toolTemplate.parameters.length > 0">
			<external-tool-config-settings v-model="toolTemplate" />
		</template>
		<v-spacer class="mt-10"></v-spacer>
		<v-alert v-if="apiError.message" light prominent text type="error">
			{{ t(getBusinessErrorTranslationKey(apiError)) }}
		</v-alert>
		<v-row class="justify-end mt-10">
			<v-btn
				class="mr-2"
				color="secondary"
				outlined
				@click="onCancel"
				data-testId="cancel-button"
			>
				{{ t("common.actions.cancel") }}
			</v-btn>
			<v-btn
				class="mr-2"
				color="primary"
				depressed
				:disabled="!parametersValid"
				@click="onSaveTool"
				data-testId="save-button"
			>
				{{
					isInEditMode
						? t("pages.tool.editBtn.label")
						: t("pages.tool.addBtn.label")
				}}
			</v-btn>
		</v-row>
	</default-wireframe>
</template>

<script lang="ts">
import ExternalToolConfigSettings from "@/components/administration/external-tool/ExternalToolConfigSettings.vue";
import RenderHTML from "@/components/common/render-html/RenderHTML.vue";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import { useExternalToolMappings } from "@/composables/external-tool-mappings.composable";
import {
	SchoolExternalTool,
	ToolConfigurationListItem,
	ToolConfigurationTemplate,
	ToolParameter,
} from "@/store/external-tool";
import { ToolParameterEntry } from "@/store/external-tool/tool-parameter-entry";
import ExternalToolsModule from "@/store/external-tools";
import { BusinessError } from "@/store/types/commons";
import { I18N_KEY, injectStrict } from "@/utils/inject";
import {
	computed,
	ComputedRef,
	defineComponent,
	inject,
	onMounted,
	Ref,
	ref,
} from "vue";
import VueRouter from "vue-router";
import { useRouter } from "vue-router/composables";
import ExternalToolSelectionRow from "./ExternalToolSelectionRow.vue";

export default defineComponent({
	name: "ExternalToolConfiguration",
	components: {
		DefaultWireframe,
		ExternalToolConfigSettings,
		ExternalToolSelectionRow,
		RenderHTML,
	},
	props: {
		configId: {
			type: String,
		},
	},
	setup(props) {
		const i18n = injectStrict(I18N_KEY);
		const externalToolsModule: ExternalToolsModule | undefined =
			inject<ExternalToolsModule>("externalToolsModule");
		if (!i18n || !externalToolsModule) {
			throw new Error("Injection of dependencies failed");
		}

		// TODO: https://ticketsystem.dbildungscloud.de/browse/BC-443
		const t = (key: string) => {
			const translateResult = i18n.t(key);
			if (typeof translateResult === "string") {
				return translateResult;
			}
			return "unknown translation-key:" + key;
		};

		const schoolSetting: Breadcrumb = {
			text: t("pages.administration.school.index.title"),
			to: "/administration/school-settings",
		};
		const breadcrumbs: Breadcrumb[] = [
			{
				text: t("pages.administration.index.title"),
				to: "/administration/",
			},
			schoolSetting,
			{
				text: t("pages.tool.title"),
				disabled: true,
			},
		];

		const { getBusinessErrorTranslationKey } = useExternalToolMappings();

		const hasData: Ref<boolean> = ref(false);
		const loading: ComputedRef<boolean> = computed(
			() => !hasData.value || externalToolsModule.getLoading
		);
		const isInEditMode: Ref<boolean> = ref(
			!!props.configId && props.configId !== ""
		);

		const configurationItems: ComputedRef<ToolConfigurationListItem[]> =
			computed(() => {
				if (isInEditMode.value && toolTemplate.value) {
					const editItem: ToolConfigurationListItem = {
						id: toolTemplate.value.id,
						name: toolTemplate.value.name,
						logoUrl: toolTemplate.value.logoUrl,
					};
					return [editItem];
				} else {
					return externalToolsModule.getToolConfigurations;
				}
			});
		const selectedItem: Ref<ToolConfigurationListItem | undefined> = ref();

		// TODO N21-904 use SchoolExternalToolTemplate as a type for the list and the selected template so we don't have to load another template
		const toolTemplate: Ref<ToolConfigurationTemplate | undefined> = ref();
		const parametersValid: ComputedRef<boolean> = computed(
			() => !!toolTemplate.value
		);

		const apiError: ComputedRef<BusinessError> = computed(
			() => externalToolsModule.getBusinessError
		);

		const onSelectTemplate = async (
			selectedTool: ToolConfigurationListItem
		) => {
			toolTemplate.value =
				await externalToolsModule.loadToolConfigurationTemplateFromExternalTool(
					selectedTool.id
				);
		};

		const router: VueRouter = useRouter();
		const onCancel = () => {
			router.push({ path: schoolSetting.to });
		};

		const onSaveTool = async () => {
			if (toolTemplate.value) {
				if (isInEditMode.value) {
					await externalToolsModule.updateSchoolExternalTool(
						toolTemplate.value
					);
				} else {
					await externalToolsModule.createSchoolExternalTool(
						toolTemplate.value
					);
				}
			}

			if (!externalToolsModule.getBusinessError.message) {
				await router.push({ path: schoolSetting.to });
			}
		};

		const populateEditForm = async (config: SchoolExternalTool) => {
			toolTemplate.value =
				await externalToolsModule.loadToolConfigurationTemplateFromExternalTool(
					config.toolId
				);

			if (toolTemplate.value) {
				selectedItem.value = configurationItems.value[0];

				toolTemplate.value.configId = config.id;
				toolTemplate.value.parameters.forEach(
					(templateParameter: ToolParameter) => {
						templateParameter.value = getParameterValueFromConfig(
							config,
							templateParameter.name
						);
					}
				);
			}
		};

		const getParameterValueFromConfig = (
			config: SchoolExternalTool,
			parameterName: string
		) => {
			const configuredParameter: ToolParameterEntry | undefined =
				config.parameters.find(
					(configParameter: ToolParameterEntry) =>
						configParameter.name === parameterName
				);

			return configuredParameter ? configuredParameter.value : undefined;
		};

		onMounted(async () => {
			if (isInEditMode.value && props.configId) {
				const editConfig: SchoolExternalTool | undefined =
					await externalToolsModule.loadSchoolExternalTool(props.configId);
				if (editConfig) {
					await populateEditForm(editConfig);
				}
			} else {
				await externalToolsModule.loadAvailableToolConfigurations();
			}
			hasData.value = true;
		});

		return {
			t,
			breadcrumbs,
			getBusinessErrorTranslationKey,
			loading,
			configurationItems,
			selectedItem,
			apiError,
			parametersValid,
			toolTemplate,
			onSelectTemplate,
			onCancel,
			onSaveTool,
			isInEditMode,
		};
	},
});
</script>
