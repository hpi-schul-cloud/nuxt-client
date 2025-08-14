<template>
	<DefaultWireframe
		max-width="full"
		:breadcrumbs="breadcrumbs"
		:fab-items="fabAction"
	>
		<template #header>
			<div ref="header">
				<div class="d-flex align-items-center">
					<h1 class="text-h3 mb-4" data-testid="admin-room-title">
						{{ t("pages.rooms.administration.title") }}
					</h1>
				</div>
			</div>
		</template>

		<div class="mt-12">
			{{ t("pages.rooms.administration.roomDetail.infoText") }}
		</div>

		<RoomAdminMembersTable
			:header-bottom="headerBottom"
			:show-select="false"
			:members-info-text="t('pages.rooms.administration.table.membersInfoText')"
		/>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useI18n } from "vue-i18n";
import { computed, ComputedRef, onMounted, onUnmounted, ref, watch } from "vue";
import { RoomAdminMembersTable } from "@feature-room";
import { useAdministrationRoomStore } from "@data-room";
import { storeToRefs } from "pinia";
import { useElementBounding, useTitle } from "@vueuse/core";
import { buildPageTitle } from "@/utils/pageTitle";
import { mdiPlus } from "@icons/material";
import { useRouter } from "vue-router";

const { t } = useI18n();
const router = useRouter();

const adminRoomStore = useAdministrationRoomStore();
const { selectedRoom } = storeToRefs(adminRoomStore);
const { fetchRooms } = adminRoomStore;

const header = ref<HTMLElement | null>(null);
const { bottom: headerBottom } = useElementBounding(header);

onMounted(async () => {
	await fetchRooms();
});

const pageTitle = computed(() =>
	buildPageTitle(t("pages.rooms.administration.pageTitle"))
);
useTitle(pageTitle);

onUnmounted(() => {
	selectedRoom.value = null;
});

watch(
	selectedRoom,
	(newRoom) => {
		if (!newRoom) {
			router.push({
				name: "administration-rooms-manage",
			});
		}
	},
	{ immediate: true }
);

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
	return [
		{
			title: t("global.sidebar.item.management"),

			to: "/administration",
		},
		{
			title: t("pages.rooms.administration.title"),
			to: "/administration/rooms/manage",
		},

		{
			title: t("pages.rooms.administration.roomDetail.breadcrumb", {
				roomName: selectedRoom.value?.roomName || "",
			}),
			to: "/administration/rooms/manage",
			disabled: true,
		},
	];
});

const fabAction = computed(() => {
	{
		return {
			icon: mdiPlus,
			title: t("pages.rooms.members.add"),
			ariaLabel: t("pages.rooms.members.add"),
			dataTestId: "fab-add-members",
		};
	}
});
</script>
