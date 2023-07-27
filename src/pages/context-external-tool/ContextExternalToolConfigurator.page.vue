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
	ContextExternalToolConfigurationTemplate,
	ToolContextType,
} from "@/store/external-tool";
import ExternalToolsModule from "@/store/external-tools";
import { BusinessError } from "@/store/types/commons";
import {
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	EXTERNAL_TOOLS_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
	ROOM_MODULE_KEY,
} from "@/utils/inject";
import {
	computed,
	ComputedRef,
	defineComponent,
	onMounted,
	PropType,
	Ref,
	ref,
} from "vue";
import VueRouter from "vue-router";
import { useRouter } from "vue-router/composables";
import NotifierModule from "@/store/notifier";
import { ContextExternalToolMapper } from "@/store/external-tool/mapper";
import { useI18n } from "@/composables/i18n.composable";
import ExternalToolConfigurator from "@/components/external-tools/configuration/ExternalToolConfigurator.vue";
import ContextExternalToolsModule from "@/store/context-external-tools";
import RoomModule from "@/store/room";
import {
	ContextExternalTool,
	ContextExternalToolSave,
} from "@/store/external-tool/context-external-tool";

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
		contextId: {
			type: String,
			required: true,
		},
		contextType: {
			type: String as PropType<ToolContextType>,
			required: true,
		},
	},
	setup(props) {
		const externalToolsModule: ExternalToolsModule = injectStrict(
			EXTERNAL_TOOLS_MODULE_KEY
		);
		const contextExternalToolsModule: ContextExternalToolsModule = injectStrict(
			CONTEXT_EXTERNAL_TOOLS_MODULE_KEY
		);
		const notifierModule: NotifierModule = injectStrict(NOTIFIER_MODULE_KEY);
		const roomModule: RoomModule = injectStrict(ROOM_MODULE_KEY);

		const { t } = useI18n();

		const contextRoute = `/rooms/${props.contextId}`;

		const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
			const crumbs: Breadcrumb[] = [
				{
					text: t("common.words.courses"),
					to: "/rooms-overview/",
				},
			];

			if (courseTitle.value) {
				crumbs.push({
					text: courseTitle.value,
					to: contextRoute,
				});
			}

			return crumbs;
		});

		const courseTitle: ComputedRef<string | undefined> = computed(
			() => roomModule.getRoomData.title
		);

		const hasData: Ref<boolean> = ref(false);
		const loading: ComputedRef<boolean> = computed(
			() =>
				!hasData.value ||
				externalToolsModule.getLoading ||
				contextExternalToolsModule.getLoading
		);

		const configurationTemplates: ComputedRef<
			ContextExternalToolConfigurationTemplate[]
		> = computed(
			() => externalToolsModule.getContextExternalToolConfigurationTemplates
		);

		const configuration: Ref<ContextExternalTool | undefined> = ref();

		const apiError: ComputedRef<BusinessError | undefined> = computed(() =>
			contextExternalToolsModule.getBusinessError.message
				? contextExternalToolsModule.getBusinessError
				: undefined
		);

		const router: VueRouter = useRouter();
		const onCancel = async () => {
			await router.push({ path: contextRoute, query: { tab: "tools" } });
		};

		const onSave = async (
			template: ContextExternalToolConfigurationTemplate,
			configuredParameterValues: (string | undefined)[]
		) => {
			const contextExternalTool: ContextExternalToolSave =
				ContextExternalToolMapper.mapTemplateToContextExternalToolSave(
					template,
					configuredParameterValues,
					props.contextId,
					props.contextType
				);

			if (props.configId) {
				// TODO Implement updating of context tools
			} else {
				await contextExternalToolsModule.createContextExternalTool(
					contextExternalTool
				);
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

				await router.push({ path: contextRoute, query: { tab: "tools" } });
			}
		};

		onMounted(async () => {
			if (props.configId) {
				// Loading order is important
				await externalToolsModule.loadConfigurationTemplateForContextExternalTool(
					props.configId
				);

				//TODO Add loading of Context External Tools for updating
				configuration.value = undefined;
			} else {
				await externalToolsModule.loadAvailableToolsForContext({
					contextId: props.contextId,
					contextType: props.contextType,
				});
			}

			await roomModule.fetchContent(props.contextId);

			hasData.value = true;
		});

		return {
			t,
			courseTitle,
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
