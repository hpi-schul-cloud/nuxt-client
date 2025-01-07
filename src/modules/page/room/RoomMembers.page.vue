<template>
	<DefaultWireframe
		max-width="full"
		:breadcrumbs="breadcrumbs"
		:fab-items="fabAction"
		:fixed-header="fixedHeader.status"
		@fab:clicked="onFabClick"
		ref="wireframe"
	>
		<template #header>
			<h1 class="text-h3 mb-4" data-testid="room-title">
				{{ t("pages.rooms.members.manage") }}
			</h1>
		</template>

		<div class="mb-8 mt-12" data-testid="info-text">
			<i18n-t keypath="pages.rooms.members.infoText" scope="global">
				<a
					href="https://docs.dbildungscloud.de/display/SCDOK/Teameinladung+freigeben"
					target="_blank"
					rel="noopener"
					:ariaLabel="linkAriaLabel"
				>
					{{ t("pages.rooms.members.infoText.moreInformation") }}
				</a>
			</i18n-t>
		</div>

		<div class="mb-12">
			<MembersTable
				v-if="!isLoading"
				:members="memberList"
				:fixed-position="fixedHeader"
				@remove:members="onRemoveMembers"
			/>
		</div>

		<v-dialog
			v-model="isMembersDialogOpen"
			:width="xs ? 'auto' : 480"
			data-testid="dialog-add-participants"
			max-width="480"
			persistent
			@keydown.esc="onDialogClose"
		>
			<AddMembers
				:memberList="potentialRoomMembers"
				:schools="schools"
				@close="onDialogClose"
				@add:members="onAddMembers"
				@update:role="onUpdateRoleOrSchool"
			/>
		</v-dialog>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle, useElementBounding } from "@vueuse/core";
import { computed, ComputedRef, onMounted, Ref, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { useRoomDetailsStore, useRoomMembers } from "@data-room";
import { storeToRefs } from "pinia";
import { mdiPlus } from "@icons/material";
import { MembersTable, AddMembers } from "@feature-room";
import { RoleName, RoomMemberResponse } from "@/serverApi/v3";
import { useDisplay } from "vuetify";

const { fetchRoom } = useRoomDetailsStore();
const { t } = useI18n();
const route = useRoute();
const { xs, mdAndDown } = useDisplay();
const { room } = storeToRefs(useRoomDetailsStore());
const isMembersDialogOpen = ref(false);
const roomId = route.params.id.toString();
const {
	isLoading,
	potentialRoomMembers,
	roomMembers,
	schools,
	addMembers,
	fetchMembers,
	getPotentialMembers,
	getSchools,
	removeMembers,
} = useRoomMembers(roomId);
const memberList: Ref<RoomMemberResponse[]> = ref(roomMembers);
const pageTitle = computed(() =>
	buildPageTitle(`${room.value?.name} - ${t("pages.rooms.members.manage")}`)
);
const wireframe = ref<HTMLElement | null>(null);
const fixedHeader = ref({
	status: false,
	position: 0,
});
const { y, top } = useElementBounding(wireframe);

useTitle(pageTitle);

const onFabClick = async () => {
	await getSchools();
	await getPotentialMembers({ role: RoleName.Roomeditor });
	isMembersDialogOpen.value = true;
};

const onDialogClose = () => {
	isMembersDialogOpen.value = false;
};

const onAddMembers = async (memberIds: string[]) => {
	await addMembers(memberIds);
};

const onUpdateRoleOrSchool = async (payload: {
	role: RoleName;
	schoolId: string;
}) => {
	await getPotentialMembers(payload);
};

const onRemoveMembers = async (memberIds: string[]) => {
	await removeMembers(memberIds);
};

onMounted(async () => {
	if (room.value === undefined) {
		await fetchRoom(roomId);
	}
	await fetchMembers();
	const header = document.querySelector(".wireframe-header") as HTMLElement;
	fixedHeader.value.position = header.offsetHeight + top.value;
});

watch(y, () => {
	fixedHeader.value.status = y.value <= -top.value && mdAndDown.value;
});

const breadcrumbs: ComputedRef<Breadcrumb[]> = computed(() => {
	if (room === undefined) return [];

	return [
		{
			title: t("pages.rooms.title"),
			to: "/rooms",
		},
		{
			title: room.value?.name || "",
			to: `/rooms/${route.params.id}`,
		},
		{
			title: t("pages.rooms.members.manage"),
			disabled: true,
		},
	];
});

const fabAction = {
	icon: mdiPlus,
	title: t("pages.rooms.members.add"),
	ariaLabel: t("pages.rooms.members.add"),
	dataTestId: "fab-add-members",
};

const linkAriaLabel = computed(
	() =>
		`${t("pages.rooms.members.infoText.moreInformation")}, ${t("common.ariaLabel.newTab")}`
);
</script>
