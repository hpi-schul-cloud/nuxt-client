<template>
	<default-wireframe
		:headline="$t('pages.tool.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="false"
	>
		<p v-html="$t('pages.tool.description')"></p>
		<v-spacer class="mt-10"></v-spacer>
		<v-select :label="$t('pages.tool.select.label')" item-text="name" :items="items"
				  :no-data-text="$t('common.nodata')"
				  return-object :loading="loading" @change="onSelectTemplate">
			<template #selection="{ item }">
				<external-tool-selection-row :item="item" max-height="20" max-width="20"/>
			</template>
			<template #item="{ item }">
				<external-tool-selection-row :item="item"/>
			</template>
		</v-select>
		<template v-if="toolParameters.length > 0">
			<external-tool-config-settings v-model="toolParameters"
										   @parametersValid="(boolean) => parametersValid = boolean"
										   @update:value="(value) => toolParameters = value">
			</external-tool-config-settings>
		</template>
		<v-spacer class="mt-10"></v-spacer>
		<v-alert v-if="apiError.message" light prominent text type="error">
			{{ translateBusinessError() }}
		</v-alert>
		<v-row class="justify-end mt-10">
			<v-btn class="mr-2" color="secondary" outlined @click="onCancel">
				{{ $t("common.actions.cancel") }}
			</v-btn>
			<v-btn class="mr-2" color="primary" depressed :disabled="!parametersValid" @click="saveTool">
				{{ $t('pages.tool.addBtn.label') }}
			</v-btn>
		</v-row>
	</default-wireframe>
</template>

<script lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { defineComponent } from "@vue/composition-api";
import { Breadcrumb } from "@components/templates/default-wireframe.types";
import VueI18n from "vue-i18n";
import { computed, ComputedRef, inject, onMounted, ref, Ref, useRouter } from "@nuxtjs/composition-api";
import ExternalToolConfigSettings from "@components/administration/external-tool/ExternalToolConfigSettings.vue";
import ExternalToolSelectionRow from "./ExternalToolSelectionRow.vue";
import { ToolConfiguration } from "@store/external-tool/tool-configuration";
import { externalToolsModule } from "@utils/store-accessor";
import { ToolConfigurationTemplate } from "@store/external-tool/tool-configuration-template";
import VueRouter from "vue-router";
import { ToolParameter } from "@store/external-tool";
import { BusinessError } from "@store/types/commons";
import { useExternalToolUtils } from "@/composables/external-tool-utils.composable";

export default defineComponent({
	name: "ExternalToolConfigOverview",
	components: {
		ExternalToolSelectionRow,
		ExternalToolConfigSettings,
		DefaultWireframe,
	},
	setup() {
		const i18n: VueI18n | undefined = inject<VueI18n>("i18n");
		if (!i18n) {
			throw new Error("Injection of dependencies failed");
		}

		onMounted(async () => {
			await externalToolsModule.loadAvailableToolConfigurations();
		});

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
			to: "/administration/school-settings#tools",
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
			}
		];

		const { translateBusinessError } = useExternalToolUtils(t);

		const loading: Ref<boolean> = ref(externalToolsModule.getLoading);

		const items: ComputedRef<ToolConfiguration[]> = computed(() => externalToolsModule.getToolConfigurations);

		const toolTemplate: ComputedRef<ToolConfigurationTemplate> = computed(() => externalToolsModule.getToolConfigurationTemplate);

		const toolParameters: ComputedRef<ToolParameter[]> = computed<ToolParameter[]>({
			get() {
				return externalToolsModule.getToolConfigurationTemplate.parameters;
			},
			set(v: ToolParameter[]) {
				externalToolsModule.setToolConfigurationTemplate({
					...externalToolsModule.getToolConfigurationTemplate,
					parameters: v
				});
			}
		});

		const apiError: ComputedRef<BusinessError> = computed(() => externalToolsModule.getBusinessError);

		const parametersValid: Ref<boolean> = ref(false);

		const onSelectTemplate = async (selectedTool: ToolConfiguration) => {
			await externalToolsModule.loadToolConfigurationTemplateFromExternalTool(selectedTool.id);
			if (toolParameters.value.length == 0) {
				parametersValid.value = true;
			}
		};

		const router: VueRouter = useRouter();
		const onCancel = () => {
			router.push({ path: schoolSetting.to });
		};

		const saveTool = async () => {
			externalToolsModule.setToolConfigurationTemplate({
				...externalToolsModule.getToolConfigurationTemplate,
				parameters: toolParameters.value
			});

			await externalToolsModule.saveSchoolExternalTool();

			if (!externalToolsModule.getBusinessError.message) {
				await router.push({ path: schoolSetting.to });
			}
		};

		return {
			breadcrumbs,
			toolTemplate,
			toolParameters,
			items,
			loading,
			onCancel,
			onSelectTemplate,
			saveTool,
			apiError,
			parametersValid,
			translateBusinessError,
		};
	},
});
</script>
