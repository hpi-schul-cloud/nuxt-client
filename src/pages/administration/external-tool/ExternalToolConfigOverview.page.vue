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
			item-text="name"
			:items="configurationItems"
			:no-data-text="$t('common.nodata')"
			return-object
			:loading="loading"
			@change="onSelectTemplate"
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
		<template v-if="toolTemplate.parameters.length > 0">
			<external-tool-config-settings
				v-model="toolTemplate"
				@update:value="(value) => (toolTemplate = value)"
			>
			</external-tool-config-settings>
		</template>
		<v-spacer class="mt-10"></v-spacer>
		<v-alert v-if="apiError.message" light prominent text type="error">
			{{ $t(getTranslationKey(apiError)) }}
		</v-alert>
		<v-row class="justify-end mt-10">
			<v-btn class="mr-2" color="secondary" outlined @click="onCancel">
				{{ $t("common.actions.cancel") }}
			</v-btn>
			<v-btn
				class="mr-2"
				color="primary"
				depressed
				:disabled="!parametersValid"
				@click="saveTool"
			>
				{{ $t("pages.tool.addBtn.label") }}
			</v-btn>
		</v-row>
	</default-wireframe>
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import VueI18n from "vue-i18n";
import ExternalToolSelectionRow from "./ExternalToolSelectionRow.vue";
import VueRouter from "vue-router";
import { useExternalToolUtils } from "@/composables/external-tool-utils.composable";
import { computed, ComputedRef, inject, onMounted, ref, Ref } from "vue";
import { externalToolsModule } from "@/store";
import { BusinessError } from "@/store/types/commons";
import {
	ToolConfiguration,
	ToolConfigurationTemplate,
} from "@/store/external-tool";
import { useRouter } from "vue-router/composables";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import ExternalToolConfigSettings from "@/components/administration/external-tool/ExternalToolConfigSettings.vue";

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
	},
];

const { getTranslationKey } = useExternalToolUtils();

const loading: Ref<boolean> = ref(externalToolsModule.getLoading);

const configurationItems: ComputedRef<ToolConfiguration[]> = computed(
	() => externalToolsModule.getToolConfigurations
);

const apiError: ComputedRef<BusinessError> = computed(
	() => externalToolsModule.getBusinessError
);

const parametersValid: Ref<boolean> = ref(false);

const toolTemplate: Ref<ToolConfigurationTemplate> = ref(
	new ToolConfigurationTemplate()
);
const onSelectTemplate = async (selectedTool: ToolConfiguration) => {
	toolTemplate.value =
		await externalToolsModule.loadToolConfigurationTemplateFromExternalTool(
			selectedTool.id
		);
	parametersValid.value = true;
};

const router: VueRouter = useRouter();
const onCancel = () => {
	router.push({ path: schoolSetting.to });
};

const saveTool = async () => {
	await externalToolsModule.saveSchoolExternalTool(toolTemplate.value);

	if (!externalToolsModule.getBusinessError.message) {
		await router.push({ path: schoolSetting.to });
	}
};
</script>
