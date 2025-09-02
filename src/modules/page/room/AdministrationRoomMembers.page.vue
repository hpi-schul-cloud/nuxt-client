<template>
	<DefaultWireframe
		max-width="full"
		:breadcrumbs="breadcrumbs"
		:fab-items="fabAction"
		@fab:clicked="onFabClick"
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

		<VDialog
			v-model="isMembersDialogOpen"
			:width="xs ? 'auto' : 480"
			data-testid="dialog-add-participants"
			max-width="480"
			persistent
			@keydown.esc="onDialogClose"
		>
			<AddMembers @close="onDialogClose" />
		</VDialog>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { useI18n } from "vue-i18n";
import { computed, ComputedRef, onMounted, onUnmounted, ref, watch } from "vue";
import { AddMembers, RoomAdminMembersTable } from "@feature-room";
import { useRoomDetailsStore, useRoomMembersStore } from "@data-room";
import { storeToRefs } from "pinia";
import { useElementBounding, useTitle } from "@vueuse/core";
import { buildPageTitle } from "@/utils/pageTitle";
import { mdiPlus } from "@icons/material";
import { useRoute } from "vue-router";
import { envConfigModule } from "@/store";
import { useDisplay } from "vuetify";
const { fetchRoom } = useRoomDetailsStore();
const { room } = storeToRefs(useRoomDetailsStore());
const { xs } = useDisplay();

const { t } = useI18n();
const route = useRoute();
const isMembersDialogOpen = ref(false);

const roomMembersStore = useRoomMembersStore();
const { fetchMembers, loadSchoolList, resetStore } = roomMembersStore;

const header = ref<HTMLElement | null>(null);
const { bottom: headerBottom } = useElementBounding(header);

const headerText = computed(() =>
	t("pages.rooms.administration.roomDetail.header.text", {
		roomName: room.value?.name || "",
	})
);

const pageTitle = computed(() => buildPageTitle(headerText.value));
useTitle(pageTitle);

onMounted(async () => {
	const roomId = route.params.roomId.toString();
	await fetchRoom(roomId);
	await fetchMembers();
});

onUnmounted(() => {
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
				roomName: room.value?.name,
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

const onFabClick = async () => {
	loadSchoolList();
	isMembersDialogOpen.value = true;
};

const onDialogClose = () => {
	// membersToChangeRole.value = [];
	isMembersDialogOpen.value = false;
};
</script>
