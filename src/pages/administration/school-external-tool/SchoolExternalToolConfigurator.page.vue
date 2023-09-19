<template>
	<default-wireframe
		:headline="t('pages.tool.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="false"
	>
		<RenderHTML
			:html="t('components.administration.externalToolsSection.description')"
			component="p"
		/>
		<v-spacer class="mt-10" />
		<external-tool-configurator
			:templates="configurationTemplates"
			:configuration="configuration"
			:error="apiError"
			:loading="loading"
			@cancel="onCancel"
			@save="onSave"
		>
		</external-tool-configurator>
	</default-wireframe>
</template>

<script lang="ts">
import { RenderHTML } from "@feature-render-html";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import {
	SchoolExternalTool,
	SchoolExternalToolConfigurationTemplate,
	SchoolExternalToolSave,
} from "@/store/external-tool";
import { BusinessError } from "@/store/types/commons";
import {
	AUTH_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
	SCHOOL_EXTERNAL_TOOLS_MODULE_KEY,
} from "@/utils/inject";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	Ref,
	ref,
} from "vue";
import { useRouter } from "vue-router";
import NotifierModule from "@/store/notifier";
import AuthModule from "@/store/auth";
import { SchoolExternalToolMapper } from "@/store/external-tool/mapper";
import ExternalToolConfigurator from "@/components/external-tools/configuration/ExternalToolConfigurator.vue";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle } from "@vueuse/core";
import { useI18n } from "vue-i18n";

export default defineComponent({
	components: {
		ExternalToolConfigurator,
		DefaultWireframe,
		RenderHTML,
	},
	props: {
		configId: {
			type: String,
		},
	},
	setup(props) {
		const schoolExternalToolsModule: SchoolExternalToolsModule = injectStrict(
			SCHOOL_EXTERNAL_TOOLS_MODULE_KEY
		);
		const notifierModule: NotifierModule = injectStrict(NOTIFIER_MODULE_KEY);
		const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);

		const { t } = useI18n();

		const pageTitle = buildPageTitle(t("pages.tool.title"));
		useTitle(pageTitle);

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

		const hasData: Ref<boolean> = ref(false);
		const loading: ComputedRef<boolean> = computed(
			() => !hasData.value || schoolExternalToolsModule.getLoading
		);

		const configurationTemplates: ComputedRef<
			SchoolExternalToolConfigurationTemplate[]
		> = computed(
			() =>
				schoolExternalToolsModule.getSchoolExternalToolConfigurationTemplates
		);

		const configuration: Ref<SchoolExternalTool | undefined> = ref();

		const apiError: ComputedRef<BusinessError | undefined> = computed(() =>
			schoolExternalToolsModule.getBusinessError.message
				? schoolExternalToolsModule.getBusinessError
				: undefined
		);

		const router = useRouter();
		const onCancel = () => {
			router.push({ path: schoolSetting.to! });
		};

		const onSave = async (
			template: SchoolExternalToolConfigurationTemplate,
			configuredParameterValues: (string | undefined)[]
		) => {
			if (authModule.getUser) {
				const schoolExternalTool: SchoolExternalToolSave =
					SchoolExternalToolMapper.mapTemplateToSchoolExternalToolSave(
						template,
						configuredParameterValues,
						authModule.getUser.schoolId
					);

				if (props.configId) {
					await schoolExternalToolsModule.updateSchoolExternalTool({
						schoolExternalToolId: props.configId,
						schoolExternalTool,
					});
				} else {
					await schoolExternalToolsModule.createSchoolExternalTool(
						schoolExternalTool
					);
				}
			}

			if (!apiError.value) {
				const message = props.configId
					? t(
							"components.administration.externalToolsSection.notification.updated"
					  )
					: t(
							"components.administration.externalToolsSection.notification.created"
					  );

				notifierModule.show({
					text: message,
					status: "success",
				});

				await router.push({ path: schoolSetting.to! });
			}
		};

		onMounted(async () => {
			if (props.configId) {
				// Loading order is important
				await schoolExternalToolsModule.loadConfigurationTemplateForSchoolExternalTool(
					props.configId
				);

				configuration.value =
					await schoolExternalToolsModule.loadSchoolExternalTool(
						props.configId
					);
			} else if (authModule.getUser) {
				await schoolExternalToolsModule.loadAvailableToolsForSchool(
					authModule.getUser?.schoolId
				);
			}

			hasData.value = true;
		});

		return {
			t,
			breadcrumbs,
			loading,
			configurationTemplates,
			apiError,
			onCancel,
			onSave,
			configuration,
		};
	},
});
</script>
