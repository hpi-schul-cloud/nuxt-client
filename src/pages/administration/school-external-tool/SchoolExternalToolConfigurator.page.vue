<template>
	<default-wireframe
		:headline="t('pages.tool.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="false"
	>
		<RenderHTML :html="t('pages.tool.description')" component="p" />
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
import RenderHTML from "@/components/common/render-html/RenderHTML.vue";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import {
	SchoolExternalTool,
	SchoolExternalToolConfigurationTemplate,
	SchoolExternalToolSave,
} from "@/store/external-tool";
import ExternalToolsModule from "@/store/external-tools";
import { BusinessError } from "@/store/types/commons";
import {
	AUTH_MODULE_KEY,
	EXTERNAL_TOOLS_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	Ref,
	ref,
} from "vue";
import VueRouter from "vue-router";
import { useRouter } from "vue-router/composables";
import NotifierModule from "@/store/notifier";
import AuthModule from "@/store/auth";
import { SchoolExternalToolMapper } from "@/store/external-tool/mapper";
import { useI18n } from "@/composables/i18n.composable";
import ExternalToolConfigurator from "@/components/external-tools/configuration/ExternalToolConfigurator.vue";

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
		const externalToolsModule: ExternalToolsModule = injectStrict(
			EXTERNAL_TOOLS_MODULE_KEY
		);
		const notifierModule: NotifierModule = injectStrict(NOTIFIER_MODULE_KEY);
		const authModule: AuthModule = injectStrict(AUTH_MODULE_KEY);

		const { t } = useI18n();

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
			() => !hasData.value || externalToolsModule.getLoading
		);

		const configurationTemplates: ComputedRef<
			SchoolExternalToolConfigurationTemplate[]
		> = computed(
			() => externalToolsModule.getSchoolExternalToolConfigurationTemplates
		);

		const configuration: Ref<SchoolExternalTool | undefined> = ref();

		const apiError: ComputedRef<BusinessError | undefined> = computed(() =>
			externalToolsModule.getBusinessError.message
				? externalToolsModule.getBusinessError
				: undefined
		);

		const router: VueRouter = useRouter();
		const onCancel = () => {
			router.push({ path: schoolSetting.to });
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
					await externalToolsModule.updateSchoolExternalTool({
						schoolExternalToolId: props.configId,
						schoolExternalTool,
					});
				} else {
					await externalToolsModule.createSchoolExternalTool(
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

				await router.push({ path: schoolSetting.to });
			}
		};

		onMounted(async () => {
			if (props.configId) {
				// Loading order is important
				await externalToolsModule.loadConfigurationTemplateForSchoolExternalTool(
					props.configId
				);

				configuration.value = await externalToolsModule.loadSchoolExternalTool(
					props.configId
				);
			} else if (authModule.getUser) {
				await externalToolsModule.loadAvailableToolsForSchool(
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
