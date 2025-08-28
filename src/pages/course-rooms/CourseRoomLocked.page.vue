<template>
	<DefaultWireframe max-width="full" :breadcrumbs="breadcrumbs">
		<template #header>
			<div class="d-flex mt-3">
				<h1 class="pb-2 ma-0" data-testid="courses-course-title">
					{{ title }}
				</h1>
			</div>
			<div class="mx-n6 mx-md-0 pb-0 d-flex justify-center" />
		</template>
		<div class="text-center mt-8">
			<permission-error-svg
				:svg-width="$vuetify.display.xs ? 200 : undefined"
				fill="rgba(var(--v-theme-primary))"
				data-testid="img-permission"
			/>
			<div>
				<h3 class="ml-4 text-center text-h4 error-msg pl-4 pr-4">
					{{ t("pages.courseRooms.course-locked") }}
				</h3>
			</div>
		</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useI18n } from "vue-i18n";
import PermissionErrorSvg from "../../assets/img/PermissionErrorSvg.vue";
import { computed } from "vue";

interface Props {
	title: string;
}

const props = defineProps<Props>();
const { t } = useI18n();

const breadcrumbs = computed(() => [
	{
		title: t("common.words.courses"),
		to: "/rooms/courses-overview",
	},
	{
		title: props.title,
		disabled: true,
	},
]);
</script>
