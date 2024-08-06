<template>
	<default-wireframe
		:headline="t('pages.tool.title')"
		:breadcrumbs="breadcrumbs"
		max-width="short"
		data-testid="context-external-tool-configurator-title"
	>
		<RenderHTML :html="t('pages.tool.description')" component="p" />
		<v-spacer class="mt-10" />
		<ContextExternalToolConfigurator
			ref="contextExternalToolConfigurator"
			:config-id="configId"
			:context-id="contextId"
			:context-type="contextType"
			@cancel="onCancel"
			@success="onSuccess"
		/>
	</default-wireframe>
</template>

<script setup lang="ts">
import ContextExternalToolConfigurator from "@/components/external-tools/configuration/ContextExternalToolConfigurator.vue";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { ToolContextType } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import CourseModule from "@/store/room";
import {
	injectStrict,
	NOTIFIER_MODULE_KEY,
	COURSE_MODULE_KEY,
} from "@/utils/inject";
import { RenderHTML } from "@feature-render-html";
import { computed, ComputedRef, onMounted, PropType, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Router, useRouter } from "vue-router";

const props = defineProps({
	configId: String,
	contextId: { type: String, required: true },
	contextType: { type: String as PropType<ToolContextType>, required: true },
});

const notifierModule: NotifierModule = injectStrict(NOTIFIER_MODULE_KEY);
const courseModule: CourseModule = injectStrict(COURSE_MODULE_KEY);

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
	() => courseModule.getRoomData.title
);

const router: Router = useRouter();

const onCancel = async () => {
	await router.push({ path: contextRoute, query: { tab: "tools" } });
};

const onSuccess = async () => {
	const message = props.configId
		? t("components.administration.externalToolsSection.notification.updated")
		: t("components.administration.externalToolsSection.notification.created");

	notifierModule.show({ text: message, status: "success" });

	await router.push({ path: contextRoute, query: { tab: "tools" } });
};

const contextExternalToolConfigurator: Ref<InstanceType<
	typeof ContextExternalToolConfigurator
> | null> = ref(null);

onMounted(async () => {
	await contextExternalToolConfigurator.value?.fetchData();

	await courseModule.fetchContent(props.contextId);
});
</script>
