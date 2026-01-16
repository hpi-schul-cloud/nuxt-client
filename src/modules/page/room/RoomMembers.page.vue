<template>
	<DefaultWireframe v-if="canSeeMembersList" max-width="full" :breadcrumbs="breadcrumbs" :fab-items="fabItems">
		<template #header>
			<div ref="header">
				<div class="d-flex align-center">
					<h1 data-testid="room-title">
						{{ membersInfoText }}
					</h1>
					<KebabMenu
						class="mx-2"
						data-testid="room-member-menu"
						:aria-label="
							t('pages.rooms.members.menu.ariaLabel', {
								membersInfoText: membersInfoText,
							})
						"
					>
						<KebabMenuActionLeaveRoom @click="onLeaveRoom" />
					</KebabMenu>
				</div>
				<VTabs
					v-if="isVisibleTabNavigation"
					v-model="activeTab"
					align-tabs="center"
					fixed-tabs
					:class="{ 'room-members-tabs': mdAndUp }"
				>
					<VTab
						v-for="tabItem in tabs"
						:key="tabItem.value"
						:prepend-icon="tabItem.icon"
						:aria-label="t(tabItem.title)"
						:text="xs ? undefined : t(tabItem.title)"
						:value="tabItem.value"
						:data-testid="`room-members-tab-${tabItem.testId}`"
					/>
				</VTabs>
			</div>
		</template>
		<VContainer v-if="isLoading">
			<VSkeletonLoader type="table" class="mt-6" />
		</VContainer>
		<VTabsWindow v-else v-model="activeTab" class="room-members-tabs-window" :class="{ 'mt-12': canAddRoomMembers }">
			<VTabsWindowItem v-for="tabItem in tabs" :key="tabItem.value" :value="tabItem.value">
				<component :is="tabItem.component" v-if="tabItem.isVisible" :header-bottom="headerBottom" />
			</VTabsWindowItem>
		</VTabsWindow>
	</DefaultWireframe>
	<AddMembersDialog v-model="isMembersDialogOpen" @close="onDialogClose" />
	<LeaveRoomProhibitedDialog v-model="isLeaveRoomProhibitedDialogOpen" />
	<InviteMembersDialog v-model="isInvitationDialogOpen" :school-name="currentUserSchoolName" @close="onDialogClose" />
	<AddExternalPersonDialog v-model="isExternalPersonDialogOpen" />
	<ConfirmationDialog />
</template>

<script setup lang="ts">
import { Tab } from "@/types/room/RoomMembers";
import { buildPageTitle } from "@/utils/pageTitle";
import { useAppStoreRefs } from "@data-app";
import {
	InvitationStep,
	useRegistrationStore,
	useRoomAuthorization,
	useRoomDetailsStore,
	useRoomInvitationLinkStore,
	useRoomMembersStore,
} from "@data-room";
import {
	AddExternalPersonDialog,
	AddMembersDialog,
	Confirmations,
	Invitations,
	InviteMembersDialog,
	Members,
} from "@feature-room";
import {
	mdiAccountClockOutline,
	mdiAccountMultipleOutline,
	mdiAccountQuestionOutline,
	mdiLink,
	mdiListBoxOutline,
	mdiPlus,
} from "@icons/material";
import { ConfirmationDialog, useConfirmationDialog } from "@ui-confirmation-dialog";
import { KebabMenu, KebabMenuActionLeaveRoom } from "@ui-kebab-menu";
import { Breadcrumb, DefaultWireframe } from "@ui-layout";
import { LeaveRoomProhibitedDialog } from "@ui-room-details";
import { FabAction } from "@ui-speed-dial-menu";
import { useElementBounding, useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { type Component, computed, ComputedRef, onMounted, onUnmounted, PropType, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";

const props = defineProps({
	tab: {
		type: String as PropType<Tab>,
		default: Tab.Members,
	},
});

enum FabEvent {
	ADD_MEMBERS = "addMembers",
	INVITE_MEMBERS = "addExternalPerson",
}

const { fetchRoom } = useRoomDetailsStore();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { xs, mdAndUp } = useDisplay();
const { room, isLoading } = storeToRefs(useRoomDetailsStore());

const membersInfoText = ref("");

const isMembersDialogOpen = ref(false);
const isLeaveRoomProhibitedDialogOpen = ref(false);

const roomMembersStore = useRoomMembersStore();
const registrationStore = useRegistrationStore();
roomMembersStore.setAdminMode(false);
const { fetchMembers, loadSchoolList, leaveRoom, resetStore: resetRoomMembersStore } = roomMembersStore;
const { fetchRegistrationsForCurrentRoom, resetStore: resetRegistrationStore } = registrationStore;

const header = ref<HTMLElement | null>(null);
const { bottom: headerBottom } = useElementBounding(header);
const { askConfirmation } = useConfirmationDialog();
const { canAddRoomMembers, canLeaveRoom, canManageRoomInvitationLinks, canSeeMembersList } = useRoomAuthorization();

const { isInvitationDialogOpen, invitationStep, isInviteExternalPersonsFeatureEnabled } =
	storeToRefs(useRoomInvitationLinkStore());

const isExternalPersonDialogOpen = ref(false);

const activeTab = computed<Tab>({
	get() {
		return props.tab;
	},
	set: async (newTab) => {
		await router.replace({
			query: { ...route.query, tab: newTab },
		});
	},
});

watchEffect(() => {
	if (canAddRoomMembers.value !== undefined) {
		membersInfoText.value = canAddRoomMembers.value
			? t("pages.rooms.members.management")
			: t("pages.rooms.members.label");
	}

	if (room.value?.permissions) {
		const permissionRestrictedTabs = [Tab.Invitations, Tab.Confirmations];

		if (permissionRestrictedTabs.includes(activeTab.value) && !canManageRoomInvitationLinks.value) {
			activeTab.value = Tab.Members;
		}
	}
});

const pageTitle = computed(() => buildPageTitle(membersInfoText.value, room.value?.name));
useTitle(pageTitle);

const isVisibleTabNavigation = computed(() => canManageRoomInvitationLinks.value);

const tabs: Array<{
	title: string;
	value: Tab;
	icon: string;
	component: Component;
	isVisible: ComputedRef<boolean>;
	testId: string;
}> = [
	{
		title: "pages.rooms.members.tab.members",
		value: Tab.Members,
		icon: mdiAccountMultipleOutline,
		component: Members,
		isVisible: computed(() => true),
		testId: "members",
	},
	{
		title: "pages.rooms.members.tab.invitations",
		value: Tab.Invitations,
		icon: mdiLink,
		component: Invitations,
		isVisible: isVisibleTabNavigation,
		testId: "invitations",
	},
	{
		title: "pages.rooms.members.tab.confirmations",
		value: Tab.Confirmations,
		icon: mdiAccountQuestionOutline,
		component: Confirmations,
		isVisible: isVisibleTabNavigation,
		testId: "confirmations",
	},
];

const onFabClick = () => {
	switch (activeTab.value) {
		case Tab.Invitations:
			invitationStep.value = InvitationStep.PREPARE;
			isInvitationDialogOpen.value = true;
			break;
		case Tab.Members:
		default:
			loadSchoolList();
			isMembersDialogOpen.value = true;
			break;
	}
};

const handleAddMember = (event: string | undefined) => {
	if (event === FabEvent.ADD_MEMBERS) {
		loadSchoolList();
		isMembersDialogOpen.value = true;
		return;
	}

	isExternalPersonDialogOpen.value = true;
};

const { user } = useAppStoreRefs();

const currentUserSchoolName = computed(() => {
	const currentUser = user.value;
	if (!currentUser) return "";
	const member = roomMembersStore.getMemberById(currentUser?.id);

	return member?.schoolName || "";
});

const onDialogClose = () => {
	isMembersDialogOpen.value = false;
	isInvitationDialogOpen.value = false;
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

onMounted(async () => {
	activeTab.value = Object.values(Tab).includes(props.tab) ? props.tab : Tab.Members;
	const roomId = route.params.id.toString();

	if (room.value === undefined) {
		await fetchRoom(roomId);
	}
	if (canSeeMembersList.value === false) {
		router.replace("/rooms");
		return;
	}
	const promises = [fetchMembers()];
	if (canManageRoomInvitationLinks.value) {
		promises.push(fetchRegistrationsForCurrentRoom());
	}
	await Promise.all(promises);
});

onUnmounted(() => {
	resetRoomMembersStore();
	resetRegistrationStore();
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
			title: membersInfoText.value,
			disabled: true,
		},
	];
});

const fabItems = computed<FabAction[] | undefined>(() => {
	if (!canAddRoomMembers.value) return;

	if (activeTab.value === Tab.Members) {
		const actions: FabAction[] = [
			{
				icon: mdiPlus,
				label: t("pages.rooms.members.add"),
				dataTestId: "fab-add-members",
				clickHandler: onFabClick,
			},
		];

		if (!isInviteExternalPersonsFeatureEnabled.value) {
			return actions;
		}

		actions.push(
			{
				icon: mdiListBoxOutline,
				label: t("pages.rooms.members.fab.selectFromDirectory"),
				dataTestId: "fab-select-from-directory",
				clickHandler: () => handleAddMember(FabEvent.ADD_MEMBERS),
			},
			{
				icon: mdiAccountClockOutline,
				label: t("pages.rooms.members.fab.addExternalPerson"),
				dataTestId: "fab-add-external-person",
				clickHandler: () => handleAddMember(FabEvent.INVITE_MEMBERS),
			}
		);

		return actions;
	}

	if (activeTab.value === Tab.Invitations) {
		return [
			{
				icon: mdiPlus,
				label: t("pages.rooms.members.inviteMember.step.prepare.title"),
				dataTestId: "fab-invite-members",
				clickHandler: onFabClick,
			},
		];
	}

	return undefined;
});
</script>
<style scoped lang="scss">
// the sticky search bar needs the whole window as nearest scrolling ancestor
// if we didn't add the following line the tab window would be the nearest scrolling ancestor
// and the search bar would be offset by a lot and overlap the table
.room-members-tabs-window {
	overflow: unset;
}

// estimated width of the fab button so it doesn't overlap the tabs on smallest medium screens
.room-members-tabs {
	margin: 0 200px;
}
</style>
