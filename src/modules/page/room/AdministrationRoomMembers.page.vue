<template>
	<DefaultWireframe max-width="full" :breadcrumbs="breadcrumbs" :fab-items="fabAction" @fab:clicked="onFabClick">
		<template #header>
			<div ref="header" class="d-flex align-items-center">
				<h1 data-testid="admin-room-detail-title">
					{{ headerText }}
				</h1>
			</div>
		</template>
		<div class="mt-12">
			{{ t("pages.rooms.administration.roomDetail.infoText") }}
		</div>
		<RoomAdminMembersTable :header-bottom="headerBottom" :show-select="false" />
		<AddMembersDialog v-model="isMembersDialogOpen" :is-admin-mode="true" @close="onDialogClose" />
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { schoolsModule } from "@/store";
import { buildPageTitle } from "@/utils/pageTitle";
import { useEnvConfig } from "@data-env";
import { useRoomDetailsStore, useRoomMembersStore } from "@data-room";
import { AddMembersDialog, RoomAdminMembersTable } from "@feature-room";
import { mdiPlus } from "@icons/material";
import { useElementBounding, useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, ComputedRef, onMounted, onUnmounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
const { fetchRoom } = useRoomDetailsStore();
const { room } = storeToRefs(useRoomDetailsStore());

const { t } = useI18n();
const route = useRoute();
const isMembersDialogOpen = ref(false);

const roomMembersStore = useRoomMembersStore();
roomMembersStore.setAdminMode(true);
const { fetchMembers, loadSchoolList, resetStore } = roomMembersStore;

const header = ref<HTMLElement | null>(null);
const { bottom: headerBottom } = useElementBounding(header);

const headerText = computed(() =>
	t("pages.rooms.administration.roomDetail.header.text", {
		roomName: room.value?.name || "",
	})
);

const pageTitle = computed(() => buildPageTitle(headerText.value, t("pages.rooms.administration.title")));
useTitle(pageTitle);

onMounted(async () => {
	const roomId = route.params.roomId?.toString();
	await fetchRoom(roomId);
	await fetchMembers();
});

onUnmounted(() => {
	resetStore();
});

watch(
	() => route.params.roomId,
	async () => {
		const isFeatureEnabled = useEnvConfig().value.FEATURE_ADMINISTRATE_ROOMS_ENABLED;

		if (!isFeatureEnabled) {
			window.location.replace("/dashboard");
		}
	},
	{ immediate: true }
);

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => [
	{
		title: t("pages.rooms.administration.title"),
		to: "/administration/rooms/manage",
	},

	{
		title: t("pages.rooms.administration.roomDetail.breadcrumb", {
			roomName: room.value?.name,
		}),
		disabled: true,
	},
]);

const adminSchoolId = computed(() => schoolsModule.getSchool.id);
const isOwnSchool = computed(() => room.value?.schoolId === adminSchoolId.value);

const fabAction = computed(() =>
	isOwnSchool.value
		? {
				icon: mdiPlus,
				title: t("pages.rooms.members.add"),
				ariaLabel: t("pages.rooms.members.add"),
				dataTestId: "fab-add-members",
			}
		: undefined
);

const onFabClick = async () => {
	if (isOwnSchool.value) {
		loadSchoolList();
		isMembersDialogOpen.value = true;
	}
};

const onDialogClose = () => {
	isMembersDialogOpen.value = false;
};
</script>
