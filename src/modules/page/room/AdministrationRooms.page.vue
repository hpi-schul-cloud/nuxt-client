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
		<template v-if="isNoRooms">
			<EmptyState :title="t('pages.rooms.emptyState')">
				<template #media>
					<RoomsEmptyStateSvg />
				</template>
			</EmptyState>
		</template>
		<template v-else>
			<RoomAdminTable />
		</template>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useI18n } from "vue-i18n";
import { computed, ComputedRef, watch, ref } from "vue";
import { RoomAdminTable } from "@feature-room";
import { useAdministrationRoomStore } from "@data-room";
import { storeToRefs } from "pinia";
import { EmptyState, RoomsEmptyStateSvg } from "@ui-empty-state";

const { t } = useI18n();

const adminRoomStore = useAdministrationRoomStore();
const { roomList } = storeToRefs(adminRoomStore);

const isNoRooms = ref<boolean>(false);

watch(roomList, () => {
	isNoRooms.value = roomList.value.length === 0;
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
