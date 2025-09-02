<template>
	<DefaultWireframe
		max-width="full"
		:breadcrumbs="breadcrumbs"
		:fab-items="fabAction"
	>
		<template #header>
			<div ref="header" class="d-flex align-items-center">
				<h1
					class="text-h3 mb-4"
					data-testid="administration-room-members-title"
				>
					{{ headerText }}
				</h1>
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
import {
	useAdministrationRoomStore,
	useRoomDetailsStore,
	useRoomMembersStore,
} from "@data-room";
import { storeToRefs } from "pinia";
import { useElementBounding, useTitle } from "@vueuse/core";
import { buildPageTitle } from "@/utils/pageTitle";
import { mdiPlus } from "@icons/material";
import { useRoute } from "vue-router";
import { envConfigModule } from "@/store";

const { t } = useI18n();
const route = useRoute();

const adminRoomStore = useAdministrationRoomStore();
const { selectRoomAndLoadMembers } = adminRoomStore;
const { selectedRoom } = storeToRefs(adminRoomStore);

const roomMembersStore = useRoomMembersStore();
const { fetchMembers, setRoomId, resetStore } = roomMembersStore;

const header = ref<HTMLElement | null>(null);
const { bottom: headerBottom } = useElementBounding(header);

const headerText = computed(() =>
	t("pages.rooms.administration.roomDetail.header.text", {
		roomName: selectedRoom.value?.roomName || "",
	})
);

const pageTitle = computed(() => buildPageTitle(headerText.value));
useTitle(pageTitle);

onMounted(async () => {
	console.log("Route params:", JSON.stringify(route.params));
	if (false) {
		const roomId = route.params.roomId.toString();
		selectedRoom.value = roomId;
		// await fetchRoom(roomId);
		setRoomId(roomId)
	}
	await fetchMembers();
});

onUnmounted(() => {
	selectedRoom.value = null;
	resetStore();
});

watch(
	() => route.params.roomId,
	async () => {
		const isFeatureEnabled =
			envConfigModule.getEnv.FEATURE_ADMINISTRATE_ROOMS_ENABLED;

		if (!isFeatureEnabled) {
			window.location.replace("/dashboard");
			return;
		}

		await selectRoomAndLoadMembers(route.params.roomId as string);
	},
	{ immediate: true }
);

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
	return [
		{
			title: t("pages.rooms.administration.title"),
			to: "/administration/rooms/manage",
		},

		{
			title: t("pages.rooms.administration.roomDetail.breadcrumb", {
				roomName: selectedRoom.value?.roomName,
			}),
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
