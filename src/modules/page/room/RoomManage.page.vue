<template>
	<DefaultWireframe max-width="full" :breadcrumbs="breadcrumbs">
		<template #header>
			<div ref="header">
				<div class="d-flex align-items-center">
					<h1 class="text-h3 mb-4" data-testid="room-title">Räume verwalten</h1>
				</div>
			</div>
		</template>
		<RoomAdminTable />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useI18n } from "vue-i18n";
import { computed, ComputedRef } from "vue";
import { RoomAdminTable } from "@feature-room";

const { t } = useI18n();

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
	return [
		{
			title: t("global.sidebar.item.management"),
			to: "/rooms",
		},
		{
			title: "Räume verwalten",
			disabled: true,
		},
	];
});
</script>
