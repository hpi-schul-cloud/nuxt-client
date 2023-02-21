<template>
	<default-wireframe
		:headline="$t('pages.tool.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="false"
	>
		<p v-html="$t('pages.tool.description')"></p>
		<v-spacer class="mt-10"></v-spacer>
		<v-select
			:label="$t('pages.tool.select.label')"
			item-title="name"
			item-value="id"
			:items="configurationItems"
			v-model="selectedItem"
			:no-data-text="$t('common.nodata')"
			return-object
			:disabled="isEdit"
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
			<external-tool-config-settings
				v-model="toolTemplate"
			></external-tool-config-settings>
		</template>
		<v-spacer class="mt-10"></v-spacer>
		<v-alert v-if="apiError.message" light prominent text type="error">
			{{ $t(getTranslationKey(apiError)) }}
		</v-alert>
		<v-row class="justify-end mt-10">
			<v-btn
				class="mr-2"
				color="secondary"
				outlined
				@click="onCancel"
				data-testId="cancel-button"
			>
				{{ $t("common.actions.cancel") }}
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
					isEdit
						? $t("pages.tool.editBtn.label")
						: $t("pages.tool.addBtn.label")
				}}
			</v-btn>
		</v-row>
	</default-wireframe>
</template>

<script lang="ts">
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";
import { useExternalToolMappings } from "@/composables/external-tool-mappings.composable";
import {
	computed,
	ComputedRef,
	defineComponent,
	inject,
	onMounted,
	ref,
	Ref,
} from "vue";
import { BusinessError } from "@/store/types/commons";
import {
	SchoolExternalTool,
	ToolConfigurationListItem,
	ToolConfigurationTemplate,
	ToolConfigurationTemplateParameter,
} from "@/store/external-tool";
import { useRouter } from "vue-router/composables";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import ExternalToolConfigSettings from "@/components/administration/external-tool/ExternalToolConfigSettings.vue";
import { ToolParameterEntry } from "@/store/external-tool/tool-parameter-entry";
import ExternalToolSelectionRow from "./ExternalToolSelectionRow.vue";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import ExternalToolsModule from "@/store/external-tools";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ExternalToolConfigOverview",
	components: {
		DefaultWireframe,
		ExternalToolConfigSettings,
		ExternalToolSelectionRow,
	},
	props: {
		configId: {
			type: String,
		},
	},
	setup(props) {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
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

		const { getTranslationKey } = useExternalToolMappings();

		const loading: Ref<boolean> = ref(externalToolsModule.getLoading);
		const isEdit: Ref<boolean> = ref(!!props.configId && props.configId !== "");

		const configurationItems: ComputedRef<ToolConfigurationListItem[]> =
			computed(() => {
				if (isEdit.value && toolTemplate.value) {
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
				if (isEdit.value) {
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
					(templateParameter: ToolConfigurationTemplateParameter) => {
						const configuredParameter: ToolParameterEntry | undefined =
							config.parameters.find(
								(parameter: ToolParameterEntry) =>
									parameter.name === templateParameter.name
							);

						if (configuredParameter) {
							templateParameter.value = configuredParameter.value;
						}
					}
				);
			}
		};

		onMounted(async () => {
			if (isEdit.value && props.configId) {
				const editConfig: SchoolExternalTool | undefined =
					await externalToolsModule.loadSchoolExternalTool(props.configId);
				if (editConfig) {
					await populateEditForm(editConfig);
				}
			} else {
				await externalToolsModule.loadAvailableToolConfigurations();
			}
		});

		return {
			t,
			breadcrumbs,
			getTranslationKey,
			loading,
			configurationItems,
			selectedItem,
			apiError,
			parametersValid,
			toolTemplate,
			onSelectTemplate,
			onCancel,
			onSaveTool,
			isEdit,
		};
	},
});
</script>
