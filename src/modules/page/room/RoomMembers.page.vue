<template>
	<DefaultWireframe
		ref="wireframe"
		max-width="full"
		:breadcrumbs="breadcrumbs"
		:fab-items="fabAction"
		:fixed-header="fixedHeaderOnMobile.enabled"
		@fab:clicked="onFabClick"
	>
		<template #header>
			<div class="d-flex align-items-center">
				<h1 class="text-h3 mb-4" data-testid="room-title">
					{{ t("pages.rooms.members.manage") }}
				</h1>
				<KebabMenu class="mx-2" data-testid="room-member-menu">
					<KebabMenuActionLeaveRoom @click="onLeaveRoom" />
				</KebabMenu>
			</div>

			<VTabs v-if="featureActivated" v-model="activeTab" align-tabs="center">
				<VTab
					v-for="tabItem in tabs"
					:key="tabItem.value"
					:prepend-icon="tabItem.icon"
					:text="tabItem.title"
					:value="tabItem.value"
				/>
			</VTabs>
		</template>

		<VTabsWindow v-model="activeTab" class="mt-12">
			<VTabsWindowItem
				v-for="tabItem in tabs"
				:key="tabItem.value"
				:value="tabItem.value"
			>
				<component :is="tabItem.component" />
			</VTabsWindowItem>
		</VTabsWindow>

		<VDialog
			v-model="isMembersDialogOpen"
			:width="xs ? 'auto' : 480"
			data-testid="dialog-add-participants"
			max-width="480"
			persistent
			@keydown.esc="onDialogClose"
		>
			<AddMembers
				:member-list="potentialRoomMembers"
				:schools="schools"
				@close="onDialogClose"
				@add:members="onAddMembers"
				@update:role="onUpdateRoleOrSchool"
			/>
		</VDialog>
	</DefaultWireframe>
	<LeaveRoomProhibitedDialog v-model="isLeaveRoomProhibitedDialogOpen" />
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle, useElementBounding } from "@vueuse/core";
import {
	computed,
	ComputedRef,
	onMounted,
	PropType,
	Ref,
	ref,
	watch,
} from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import {
	useRoomDetailsStore,
	useRoomMembers,
	useRoomMemberVisibilityOptions,
	RoomMember,
} from "@data-room";
import { storeToRefs } from "pinia";
import {
	mdiPlus,
	mdiAccountMultipleOutline,
	mdiLink,
	mdiAccountQuestionOutline,
} from "@icons/material";
import {
	AddMembers,
	useRoomAuthorization,
	Confirmations,
	Invitations,
	Members,
} from "@feature-room";
import { ChangeRoomRoleBodyParamsRoleNameEnum, RoleName } from "@/serverApi/v3";
import { useDisplay } from "vuetify";
import { KebabMenu, KebabMenuActionLeaveRoom } from "@ui-kebab-menu";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import { LeaveRoomProhibitedDialog } from "@ui-room-details";

const { fetchRoom } = useRoomDetailsStore();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { xs, mdAndDown } = useDisplay();
const { room } = storeToRefs(useRoomDetailsStore());

const isMembersDialogOpen = ref(false);
const isChangeRoleDialogOpen = ref(false);
const isLeaveRoomProhibitedDialogOpen = ref(false);
const roomId = route.params.id.toString();
const {
	isLoading,
	potentialRoomMembers,
	roomMembers,
	schools,
	currentUser,
	selectedIds,
	addMembers,
	changeRoomOwner,
	fetchMembers,
	getPotentialMembers,
	getSchools,
	leaveRoom,
	removeMembers,
	updateMembersRole,
} = useRoomMembers(roomId);
const memberList: Ref<RoomMember[]> = ref(roomMembers);
const pageTitle = computed(() =>
	buildPageTitle(`${room.value?.name} - ${t("pages.rooms.members.manage")}`)
);
const wireframe = ref<HTMLElement | null>(null);
const fixedHeaderOnMobile = ref({
	enabled: false,
	positionTop: 0,
});
const { y } = useElementBounding(wireframe);
const { askConfirmation } = useConfirmationDialog();
const { canLeaveRoom } = useRoomAuthorization();
const { isVisibleAddMemberButton } =
	useRoomMemberVisibilityOptions(currentUser);

useTitle(pageTitle);

type Tab = "members" | "invitations" | "confirmations"; // TODO: change to enum
const props = defineProps({
	tab: {
		type: String as PropType<Tab>,
		default: "members",
	},
});

const featureActivated = ref(true); // TODO: replace with feature flag

const activeTab = computed({
	get() {
		return props.tab;
	},
	set: async (newTab: string) => {
		if (featureActivated.value) {
			await router.replace({
				query: { ...route.query, tab: newTab },
			});
		}
	},
});

const tabs = [
	{
		title: "Mitglieder",
		value: "members",
		icon: mdiAccountMultipleOutline,
		component: Members,
	},
	{
		title: "Invitations",
		value: "invitations",
		icon: mdiLink,
		component: Invitations,
	},
	{
		title: "Confirmations",
		value: "confirmations",
		icon: mdiAccountQuestionOutline,
		component: Confirmations,
	},
];

const onFabClick = async () => {
	await getSchools();
	await getPotentialMembers(RoleName.Teacher);
	isMembersDialogOpen.value = true;
};

const onDialogClose = () => {
	isMembersDialogOpen.value = false;
	isChangeRoleDialogOpen.value = false;
};

const onAddMembers = async (memberIds: string[]) => {
	await addMembers(memberIds);
};

const onUpdateRoleOrSchool = async (payload: {
	schoolRole: RoleName;
	schoolId: string;
}) => {
	await getPotentialMembers(payload.schoolRole, payload.schoolId);
};

const onRemoveMembers = async (userIds: string[]) => {
	await removeMembers(userIds);
};

const onLeaveRoom = async () => {
	if (!canLeaveRoom.value) {
		isLeaveRoomProhibitedDialogOpen.value = true;
		return;
	}
	const shouldLeave = await askConfirmation({
		message: t("pages.rooms.leaveRoom.confirmation", {
			roomName: room.value?.name,
		}),
		confirmActionLangKey: "common.actions.leave",
	});

	if (!shouldLeave) return;
	await leaveRoom();
	router.push("/rooms");
};

const membersToChangeRole = ref<RoomMember[]>([]);

const onOpenRoleDialog = (ids: string[]) => {
	membersToChangeRole.value =
		ids.length === 1
			? memberList.value.filter((member) => member.userId === ids[0])
			: memberList.value.filter((member) =>
					selectedIds.value.includes(member.userId)
				);
	isChangeRoleDialogOpen.value = true;
};

const onChangeRole = async (
	role: ChangeRoomRoleBodyParamsRoleNameEnum,
	id?: string
) => {
	await updateMembersRole(role, id);
	isChangeRoleDialogOpen.value = false;
	selectedIds.value = [];
};

const onChangeOwner = async (id: string) => {
	await changeRoomOwner(id);
	isChangeRoleDialogOpen.value = false;
	selectedIds.value = [];
};

onMounted(async () => {
	activeTab.value = props.tab ?? "members";
	if (room.value === undefined) {
		await fetchRoom(roomId);
	}

	await fetchMembers();
	const header = document.querySelector(".wireframe-header") as HTMLElement;
	fixedHeaderOnMobile.value.positionTop = header.offsetHeight + y.value;
});

watch(y, () => {
	fixedHeaderOnMobile.value.enabled = y.value <= 0 && mdAndDown.value;
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

const fabAction = computed(() => {
	if (!isVisibleAddMemberButton.value) return;

	if (activeTab.value === "members") {
		return {
			icon: mdiPlus,
			title: t("pages.rooms.members.add"),
			ariaLabel: t("pages.rooms.members.add"),
			dataTestId: "fab-add-members",
		};
	}
	return undefined;
});
</script>
