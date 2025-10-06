<template>
	<default-wireframe
		:headline="t('pages.tool.title')"
		:breadcrumbs="breadcrumbs"
		max-width="short"
		data-testid="school-external-tool-configurator-title"
	>
		<div data-testId="tool-configuration-infotext">
			<p>
				{{ t("components.administration.externalToolsSection.description.firstParagraph") }}
			</p>
			<p>
				<i18n-t keypath="components.administration.externalToolsSection.description.secondParagraph" scope="global">
					<a href="https://docs.dbildungscloud.de/x/uoKqDg" target="_blank" rel="noopener"
						>{{ t("components.administration.externalToolsSection.description.secondParagraph.link") }}
					</a>
				</i18n-t>
			</p>
		</div>
		<v-spacer class="mt-10" />
		<external-tool-configurator
			:templates="configurationTemplates"
			:configuration="configuration"
			:error="apiError"
			:loading="loading"
			@cancel="onCancel"
			@save="onSave"
		>
			<template #aboveSettings="{ selectedTemplate }">
				<external-tool-medium-details
					v-if="selectedTemplate && selectedTemplate.medium"
					:selected-template-medium="selectedTemplate.medium"
				/>
			</template>
			<template #aboveParameters="{ selectedTemplate }">
				<v-checkbox
					v-if="selectedTemplate"
					v-model="isDeactivated"
					:label="$t('pages.tool.deactivate.label')"
					data-testId="configuration-deactivate-checkbox"
				/>
			</template>
		</external-tool-configurator>
	</default-wireframe>
</template>

<script setup lang="ts">
import ExternalToolConfigurator from "@/components/external-tools/configuration/ExternalToolConfigurator.vue";
import ExternalToolMediumDetails from "@/components/external-tools/configuration/ExternalToolMediumDetails.vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { SchoolExternalTool, SchoolExternalToolSave, ToolParameterEntry } from "@/store/external-tool";
import { SchoolExternalToolMapper } from "@/store/external-tool/mapper";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import { BusinessError } from "@/store/types/commons";
import { injectStrict, SCHOOL_EXTERNAL_TOOLS_MODULE_KEY } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { notifySuccess, useAppStoreRefs } from "@data-app";
import { SchoolExternalToolConfigurationTemplate } from "@data-external-tool";
import { useTitle } from "@vueuse/core";
import { computed, ComputedRef, onMounted, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const props = defineProps<{
	configId?: string;
}>();

const { school } = useAppStoreRefs();

const schoolExternalToolsModule: SchoolExternalToolsModule = injectStrict(SCHOOL_EXTERNAL_TOOLS_MODULE_KEY);
const { t } = useI18n();

const pageTitle = buildPageTitle(t("pages.tool.title"));
useTitle(pageTitle);

const schoolSettingPath = "/administration/school-settings";

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
	return [
		{
			title: t("pages.administration.school.index.title"),
			to: schoolSettingPath,
		},
		{
			title: t("pages.tool.title"),
			disabled: true,
		},
	];
});

const hasData: Ref<boolean> = ref(false);
const loading: ComputedRef<boolean> = computed(() => !hasData.value || schoolExternalToolsModule.getLoading);

const configurationTemplates: ComputedRef<SchoolExternalToolConfigurationTemplate[]> = computed(
	() => schoolExternalToolsModule.getSchoolExternalToolConfigurationTemplates
);

const configuration: Ref<SchoolExternalTool | undefined> = ref();

const apiError: ComputedRef<BusinessError | undefined> = computed(() =>
	schoolExternalToolsModule.getBusinessError.message ? schoolExternalToolsModule.getBusinessError : undefined
);

const router = useRouter();
const onCancel = () => {
	router.push({ path: schoolSettingPath });
};

const isDeactivated: Ref<boolean> = ref(false);

const onSave = async (
	template: SchoolExternalToolConfigurationTemplate,
	configuredParameterValues: ToolParameterEntry[]
) => {
	if (school.value) {
		const schoolExternalTool: SchoolExternalToolSave = SchoolExternalToolMapper.mapTemplateToSchoolExternalToolSave(
			template,
			configuredParameterValues,
			school.value.id,
			isDeactivated.value
		);

		if (props.configId) {
			await schoolExternalToolsModule.updateSchoolExternalTool({
				schoolExternalToolId: props.configId,
				schoolExternalTool,
			});
		} else {
			await schoolExternalToolsModule.createSchoolExternalTool(schoolExternalTool);
		}
	}

	if (!apiError.value) {
		const message = props.configId
			? t("components.administration.externalToolsSection.notification.updated")
			: t("components.administration.externalToolsSection.notification.created");

		notifySuccess(message);

		await router.push({
			path: schoolSettingPath,
			query: { openPanels: "tools" },
		});
	}
};

onMounted(async () => {
	if (props.configId) {
		// Loading order is important
		await schoolExternalToolsModule.loadConfigurationTemplateForSchoolExternalTool(props.configId);

		configuration.value = await schoolExternalToolsModule.loadSchoolExternalTool(props.configId);

		isDeactivated.value = configuration.value?.isDeactivated ?? false;
	} else if (school.value) {
		await schoolExternalToolsModule.loadAvailableToolsForSchool(school.value.id);
	}

	hasData.value = true;
});
</script>
