<template>
	<DefaultWireframe max-width="full" :breadcrumbs="breadcrumbs">
		<template #header>
			<div ref="header">
				<div class="d-flex align-items-center">
					<h1 class="text-h3 mb-4" data-testid="admin-room-title">
						{{ t("pages.rooms.administration.title") }}
					</h1>
				</div>
			</div>
		</template>
		<template v-if="isEmptyList">
			<EmptyState :title="t('pages.rooms.emptyState')">
				<template #media>
					<RoomsEmptyStateSvg />
				</template>
			</EmptyState>
		</template>
		<template v-else>
			<RoomAdminTable :show-select="false" :header-bottom="headerBottom" />
		</template>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useI18n } from "vue-i18n";
import { computed, ComputedRef, onMounted, ref } from "vue";
import { RoomAdminTable } from "@feature-room";
import { useAdministrationRoomStore } from "@data-room";
import { storeToRefs } from "pinia";
import { EmptyState, RoomsEmptyStateSvg } from "@ui-empty-state";
import { useElementBounding } from "@vueuse/core";

const { t } = useI18n();

const adminRoomStore = useAdministrationRoomStore();
const { isEmptyList } = storeToRefs(adminRoomStore);
const { fetchRooms } = adminRoomStore;

const header = ref<HTMLElement | null>(null);
const { bottom: headerBottom } = useElementBounding(header);

onMounted(async () => {
	await fetchRooms();
});

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
	return [
		{
			title: t("global.sidebar.item.management"),
			to: "/administration",
		},
		{
			title: t("pages.rooms.administration.title"),
			disabled: true,
		},
	];
});
</script>
