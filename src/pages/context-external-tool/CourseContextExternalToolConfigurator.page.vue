<template>
	<default-wireframe
		:headline="t('pages.tool.title')"
		:breadcrumbs="breadcrumbs"
		max-width="short"
		data-testid="context-external-tool-configurator-title"
	>
		<p>
			{{ t("pages.tool.description.firstParagraph") }}
		</p>
		<p>
			{{ t("pages.tool.description.secondParagraph") }}
		</p>
		<i18n-t
			keypath="pages.tool.description.moreInformation"
			scope="global"
			tag="p"
		>
			<a
				href="https://docs.dbildungscloud.de/pages/viewpage.action?pageId=246055610"
				target="_blank"
				rel="noopener"
			>
				{{ t("pages.tool.description.moreInformation.link") }}
			</a>
		</i18n-t>
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
import CourseRoomDetailsModule from "@/store/course-room-details";
import { injectStrict, COURSE_ROOM_DETAILS_MODULE_KEY } from "@/utils/inject";
import { computed, ComputedRef, onMounted, PropType, Ref, ref } from "vue";
import { useI18n } from "vue-i18n";
import { Router, useRouter } from "vue-router";
import { notifySuccess } from "@data-app";

const props = defineProps({
	configId: {
		type: String,
		default: "",
	},
	contextId: { type: String, required: true },
	contextType: { type: String as PropType<ToolContextType>, required: true },
});

const courseRoomDetailsModule: CourseRoomDetailsModule = injectStrict(
	COURSE_ROOM_DETAILS_MODULE_KEY
);

const { t } = useI18n();

const contextRoute = computed(() => `/rooms/${props.contextId}`);

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
	const crumbs = [
		{ title: t("common.words.courses"), to: "/rooms/courses-overview/" },
	];

	if (courseTitle.value) {
		crumbs.push({ title: courseTitle.value, to: contextRoute.value });
	}

	return crumbs;
});

const courseTitle: ComputedRef<string> = computed(
	() => courseRoomDetailsModule.getRoomData.title
);

const router: Router = useRouter();

const onCancel = async () => {
	await router.push({ path: contextRoute.value, query: { tab: "tools" } });
};

const onSuccess = async () => {
	const message = props.configId
		? t("components.administration.externalToolsSection.notification.updated")
		: t("components.administration.externalToolsSection.notification.created");

	notifySuccess(message);
	await router.push({ path: contextRoute.value, query: { tab: "tools" } });
};

const contextExternalToolConfigurator: Ref<InstanceType<
	typeof ContextExternalToolConfigurator
> | null> = ref(null);

onMounted(async () => {
	await contextExternalToolConfigurator.value?.fetchData();

	await courseRoomDetailsModule.fetchContent(props.contextId);
});
</script>
