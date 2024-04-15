<template>
	<default-wireframe
		:headline="t('pages.tool.title')"
		:breadcrumbs="breadcrumbs"
		:full-width="false"
		data-testid="context-external-tool-configurator-title"
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
			@change="onSelectionChange"
		>
			<template #aboveParameters="{ selectedTemplate }">
				<v-text-field
					v-if="selectedTemplate"
					v-model="displayName"
					:label="t('pages.tool.context.displayName')"
					:hint="t('pages.tool.context.displayNameDescription')"
					persistent-hint
					validate-on="blur"
					data-testId="parameter-display-name"
				/>
			</template>
		</external-tool-configurator>
	</default-wireframe>
</template>

<script setup lang="ts">
import ExternalToolConfigurator from "@/components/external-tools/configuration/ExternalToolConfigurator.vue";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useI18n } from "vue-i18n";
import { ToolContextType } from "@/serverApi/v3";
import ContextExternalToolsModule from "@/store/context-external-tools";
import {
	ContextExternalToolConfigurationTemplate,
	ToolParameterEntry,
} from "@/store/external-tool";
import {
	ContextExternalTool,
	ContextExternalToolSave,
} from "@/store/external-tool/context-external-tool";
import { ContextExternalToolMapper } from "@/store/external-tool/mapper";
import NotifierModule from "@/store/notifier";
import RoomModule from "@/store/room";
import {
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY,
	injectStrict,
	NOTIFIER_MODULE_KEY,
	ROOM_MODULE_KEY,
} from "@/utils/inject";
import { RenderHTML } from "@feature-render-html";
import { computed, ComputedRef, onMounted, PropType, Ref, ref } from "vue";
import { Router, useRouter } from "vue-router";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import { BusinessError } from "@/store/types/commons";

const props = defineProps({
	configId: String,
	contextId: { type: String, required: true },
	contextType: { type: String as PropType<ToolContextType>, required: true },
});

const contextExternalToolsModule: ContextExternalToolsModule = injectStrict(
	CONTEXT_EXTERNAL_TOOLS_MODULE_KEY
);
const notifierModule: NotifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const roomModule: RoomModule = injectStrict(ROOM_MODULE_KEY);

const { t } = useI18n();

const contextRoute = `/rooms/${props.contextId}`;

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
	const crumbs = [{ title: t("common.words.courses"), to: "/rooms-overview/" }];

	if (courseTitle.value) {
		crumbs.push({ title: courseTitle.value, to: contextRoute });
	}

	return crumbs;
});

const courseTitle: ComputedRef<string> = computed(
	() => roomModule.getRoomData.title
);

const hasData: Ref<boolean> = ref(false);
const loading: ComputedRef<boolean> = computed(
	() => !hasData.value || contextExternalToolsModule.getLoading
);

const configurationTemplates: ComputedRef<
	ContextExternalToolConfigurationTemplate[]
> = computed(
	() => contextExternalToolsModule.getContextExternalToolConfigurationTemplates
);

const configuration: Ref<ContextExternalTool | undefined> = ref<
	ContextExternalTool | undefined
>();
const displayName: Ref<string | undefined> = ref<string | undefined>();

const apiError: ComputedRef<BusinessError | undefined> = computed(() =>
	contextExternalToolsModule.getBusinessError.message
		? contextExternalToolsModule.getBusinessError
		: undefined
);

const router: Router = useRouter();

const onCancel = async () => {
	await router.push({ path: contextRoute, query: { tab: "tools" } });
};

const onSelectionChange = async () => {
	displayName.value = undefined;
};

const onSave = async (
	template: ContextExternalToolConfigurationTemplate,
	configuredParameterValues: ToolParameterEntry[]
) => {
	const contextExternalTool: ContextExternalToolSave =
		ContextExternalToolMapper.mapTemplateToContextExternalToolSave(
			template,
			configuredParameterValues,
			props.contextId,
			props.contextType,
			displayName.value
		);

	if (props.configId) {
		await contextExternalToolsModule.updateContextExternalTool({
			contextExternalToolId: props.configId,
			contextExternalTool,
		});
	} else {
		await contextExternalToolsModule.createContextExternalTool(
			contextExternalTool
		);
	}

	if (!apiError.value) {
		const message = props.configId
			? t("components.administration.externalToolsSection.notification.updated")
			: t(
					"components.administration.externalToolsSection.notification.created"
				);

		notifierModule.show({ text: message, status: "success" });

		await router.push({ path: contextRoute, query: { tab: "tools" } });
	}
};

onMounted(async () => {
	if (props.configId) {
		await contextExternalToolsModule.loadConfigurationTemplateForContextExternalTool(
			props.configId
		);

		configuration.value =
			await contextExternalToolsModule.loadContextExternalTool(props.configId);
		displayName.value = configuration.value?.displayName;
	} else {
		await contextExternalToolsModule.loadAvailableToolsForContext({
			contextId: props.contextId,
			contextType: props.contextType,
		});
	}

	await roomModule.fetchContent(props.contextId);

	hasData.value = true;
});
</script>
