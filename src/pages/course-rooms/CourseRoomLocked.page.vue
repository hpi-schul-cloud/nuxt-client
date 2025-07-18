<template>
	<DefaultWireframe max-width="full" :breadcrumbs="breadcrumbs">
		<div class="d-flex mt-3">
			<h1
				class="text-h3 pb-2 ma-0 course-title"
				data-testid="courses-course-title"
			>
				{{ title }}
			</h1>
		</div>
		<div class="d-flex justify-center align-center" style="min-height: 40vh">
			<strong class="ml-4">Dieser Kurs ist momentan gesperrt</strong>
		</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useI18n } from "vue-i18n";

interface Props {
	title: string;
}
const { t } = useI18n();

const { title } = defineProps<Props>();

const breadcrumbs = [
	{
		title: t("common.words.courses"),
		to: "/rooms/courses-overview",
		disabled: false,
	},
];
</script>
