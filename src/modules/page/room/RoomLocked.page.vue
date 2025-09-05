<template>
	<DefaultWireframe max-width="full" :breadcrumbs="breadcrumbs">
		<template #header>
			<div class="d-flex mt-3">
				<h1 class="pb-2 ma-0" data-testid="locked-room-title">
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
				<h2 class="ml-4 text-center error-msg pl-4 pr-4">
					{{ t("pages.room.locked") }}
				</h2>
			</div>
		</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import PermissionErrorSvg from "../../../assets/img/PermissionErrorSvg.vue";

interface Props {
	title: string;
}

const props = defineProps<Props>();
const { t } = useI18n();

const breadcrumbs = computed(() => [
	{
		title: t("pages.rooms.title"),
		to: "/rooms",
	},
	{
		title: props.title,
		disabled: true,
	},
]);
</script>
