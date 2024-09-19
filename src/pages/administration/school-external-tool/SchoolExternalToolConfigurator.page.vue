<template>
	<default-wireframe
		:headline="t('pages.tool.title')"
		:breadcrumbs="breadcrumbs"
		max-width="short"
		data-testid="school-external-tool-configurator-title"
	>
		<RenderHTML
			:html="t('components.administration.externalToolsSection.description')"
			component="p"
			data-testId="tool-configuration-infotext"
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
			<template #aboveParameters="{ selectedTemplate }">
				<v-checkbox
					v-if="selectedTemplate"
					:label="$t('pages.tool.deactivate.label')"
					data-testId="configuration-deactivate-checkbox"
					v-model="isDeactivated"
				/>
				<v-combobox
					v-if="selectedTemplate?.availableContexts"
					clearable
					chips
					multiple
					:disabled="selectedTemplate.availableContexts.length === 0"
					:label="
						t(
							'components.administration.externalToolsSection.dialog.contextRestriction.label'
						)
					"
					:items="templateRestrictionTags"
					v-model="selectedRestrictionTags"
				/>
			</template>
		</external-tool-configurator>
	</default-wireframe>
</template>

<script lang="ts">
import ExternalToolConfigurator from "@/components/external-tools/configuration/ExternalToolConfigurator.vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import AuthModule from "@/store/auth";
import {
	SchoolExternalTool,
	SchoolExternalToolSave,
	ToolParameterEntry,
} from "@/store/external-tool";
import { SchoolExternalToolMapper } from "@/store/external-tool/mapper";
import NotifierModule from "@/store/notifier";
import SchoolExternalToolsModule from "@/store/school-external-tools";
import { BusinessError } from "@/store/types/commons";
import {
	AUTH_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
	SCHOOL_EXTERNAL_TOOLS_MODULE_KEY,
} from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { SchoolExternalToolConfigurationTemplate } from "@data-external-tool";
import { RenderHTML } from "@feature-render-html";
import { useTitle } from "@vueuse/core";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	Ref,
	ref,
} from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { ToolContextType } from "@/serverApi/v3";

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
			title: t("pages.administration.school.index.title"),
			to: "/administration/school-settings",
		};
		const breadcrumbs: Breadcrumb[] = [
			{
				title: t("pages.administration.index.title"),
				to: "/administration/",
			},
			schoolSetting,
			{
				title: t("pages.tool.title"),
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

		const selectedRestriction: Ref<string[] | undefined> = ref();

		const toolContextTypeMapping: Record<ToolContextType, string> = {
			[ToolContextType.MediaBoard]: t(
				"components.administration.externalToolsSection.dialog.contextRestriction.tag.mediaboard"
			),
			[ToolContextType.BoardElement]: t(
				"components.administration.externalToolsSection.dialog.contextRestriction.tag.board"
			),
			[ToolContextType.Course]: t(
				"components.administration.externalToolsSection.dialog.contextRestriction.tag.course"
			),
		};

		const templateRestrictionTags = computed(() => {
			return (
				selectedTemplate.value.availableContexts.map((context) => {
					return {
						title: toolContextTypeMapping[context],
						value: context,
					};
				}) ?? []
			);
		});

		const configuredRestriction: Ref<ToolContextType[]> = ref([]);

		const selectedRestrictionTags: any = ref(
			configuredRestriction.value.map((context) => {
				return {
					title: toolContextTypeMapping[context],
					value: context,
				};
			})
		);

		const apiError: ComputedRef<BusinessError | undefined> = computed(() =>
			schoolExternalToolsModule.getBusinessError.message
				? schoolExternalToolsModule.getBusinessError
				: undefined
		);

		const router = useRouter();
		const onCancel = () => {
			router.push({ path: schoolSetting.to! });
		};

		const isDeactivated: Ref<boolean> = ref(false);

		const filterSelectedContext = () => {
			if (configuration.value && selectedTemplate.value.availableContexts) {
				selectedRestrictionTags.value = configuration.value.availableContexts
					.filter((context: ToolContextType) => {
						return selectedTemplate.value.availableContexts.includes(context);
					})
					.map((context) => {
						return {
							title: toolContextTypeMapping[context],
							value: context,
						};
					});
			}
		};

		const onSave = async (
			template: SchoolExternalToolConfigurationTemplate,
			configuredParameterValues: ToolParameterEntry[]
		) => {
			if (authModule.getSchool) {
				configuredRestriction.value = selectedRestrictionTags.value.map(
					(restrictionTag: any): ToolContextType => {
						return restrictionTag.value;
					}
				);

				const schoolExternalTool: SchoolExternalToolSave =
					SchoolExternalToolMapper.mapTemplateToSchoolExternalToolSave(
						template,
						configuredParameterValues,
						authModule.getSchool.id,
						isDeactivated.value,
						configuredRestriction.value
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

				await router.push({
					path: schoolSetting.to,
					query: { openPanels: "tools" },
				});
			}
		};

		const selectedTemplate = computed(() => {
			return configurationTemplates.value[0];
		});

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

				isDeactivated.value = configuration.value?.isDeactivated ?? false;

				filterSelectedContext();
			} else if (authModule.getSchool) {
				await schoolExternalToolsModule.loadAvailableToolsForSchool(
					authModule.getSchool.id
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
			isDeactivated,
			configuredRestriction,
			selectedRestriction,
			selectedTemplate,
			templateRestrictionTags,
			selectedRestrictionTags,
		};
	},
});
</script>
