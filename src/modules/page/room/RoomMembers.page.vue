<template>
	<DefaultWireframe
		max-width="full"
		:breadcrumbs="breadcrumbs"
		:fab-items="fabAction"
		@fab:clicked="onFabClick"
	>
		<template #header>
			<div ref="header">
				<div class="d-flex align-items-center">
					<h1 class="text-h3 mb-4" data-testid="room-title">
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

		<!-- TODO-9743: discuss if we want this, this would fix the issue that permissions are not ready when mounting (-> invitations/confirmation tables shortly shown without having permission) -->
		<VContainer v-if="isLoading">
			<VSkeletonLoader type="table" class="mt-6" />
		</VContainer>

		<VTabsWindow
			v-else
			v-model="activeTab"
			class="room-members-tabs-window mt-12"
		>
			<VTabsWindowItem
				v-for="tabItem in tabs"
				:key="tabItem.value"
				:value="tabItem.value"
			>
				<component
					:is="tabItem.component"
					v-if="tabItem.isVisible"
					:header-bottom="headerBottom"
				/>
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
			<AddMembers @close="onDialogClose" />
		</VDialog>
	</DefaultWireframe>
	<LeaveRoomProhibitedDialog v-model="isLeaveRoomProhibitedDialogOpen" />
	<ConfirmationDialog />
	<InviteMembersDialog
		v-model="isInvitationDialogOpen"
		:school-name="currentUserSchoolName"
		@close="onDialogClose"
	/>
</template>

<script setup lang="ts">
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle, useElementBounding } from "@vueuse/core";
import {
	type Component,
	computed,
	ComputedRef,
	onMounted,
	onUnmounted,
	PropType,
	ref,
	watchEffect,
} from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import {
	InvitationStep,
	useRoomDetailsStore,
	useRoomMembersStore,
	useRoomAuthorization,
	useRoomInvitationLinkStore,
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
	Confirmations,
	Invitations,
	InviteMembersDialog,
	Members,
} from "@feature-room";
import { useDisplay } from "vuetify";
import { KebabMenu, KebabMenuActionLeaveRoom } from "@ui-kebab-menu";
import {
	useConfirmationDialog,
	ConfirmationDialog,
} from "@ui-confirmation-dialog";
import { LeaveRoomProhibitedDialog } from "@ui-room-details";
import { Tab } from "@/types/room/RoomMembers";
import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { authModule } from "@/store";

const props = defineProps({
	tab: {
		type: String as PropType<Tab>,
		default: Tab.Members,
	},
});

const { fetchRoom } = useRoomDetailsStore();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { xs, mdAndUp } = useDisplay();
const { room, isLoading } = storeToRefs(useRoomDetailsStore());
const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const { FEATURE_ROOM_MEMBERS_TABS_ENABLED } = envConfigModule.getEnv;

const membersInfoText = ref("");

const isMembersDialogOpen = ref(false);
const isLeaveRoomProhibitedDialogOpen = ref(false);

const roomMembersStore = useRoomMembersStore();
const { fetchMembers, getSchools, leaveRoom, resetStore } = roomMembersStore;

const header = ref<HTMLElement | null>(null);
const { bottom: headerBottom } = useElementBounding(header);
const { askConfirmation } = useConfirmationDialog();
const { canAddRoomMembers, canLeaveRoom, canManageRoomInvitationLinks } =
	useRoomAuthorization();

const { isInvitationDialogOpen, invitationStep } = storeToRefs(
	useRoomInvitationLinkStore()
);

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

		if (
			permissionRestrictedTabs.includes(activeTab.value) &&
			!canManageRoomInvitationLinks.value
		) {
			activeTab.value = Tab.Members;
		}
	}
});

const pageTitle = computed(() =>
	buildPageTitle(`${room.value?.name} - ${membersInfoText.value}`)
);
useTitle(pageTitle);

const isVisibleTabNavigation = computed(() => {
	return (
		canManageRoomInvitationLinks.value && FEATURE_ROOM_MEMBERS_TABS_ENABLED
	);
});

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

const onFabClick = async () => {
	switch (activeTab.value) {
		case Tab.Invitations:
			invitationStep.value = InvitationStep.PREPARE;
			isInvitationDialogOpen.value = true;
			break;

		case Tab.Members:
		default:
			await getSchools();
			isMembersDialogOpen.value = true;
			break;
	}
};

const currentUserSchoolName = computed(() => {
	const currentUser = authModule.getUser;
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
	activeTab.value =
		FEATURE_ROOM_MEMBERS_TABS_ENABLED && Object.values(Tab).includes(props.tab)
			? props.tab
			: Tab.Members;

	if (room.value === undefined) {
		const roomId = route.params.id.toString();
		await fetchRoom(roomId);
	}

	await fetchMembers();
});

onUnmounted(() => {
	resetStore();
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

const fabAction = computed(() => {
	if (!canAddRoomMembers.value) return;

	if (activeTab.value === Tab.Members) {
		return {
			icon: mdiPlus,
			title: t("pages.rooms.members.add"),
			ariaLabel: t("pages.rooms.members.add"),
			dataTestId: "fab-add-members",
		};
	}

	if (activeTab.value === Tab.Invitations) {
		return {
			icon: mdiPlus,
			title: t("pages.rooms.members.inviteMember.step.prepare.title"),
			ariaLabel: t("pages.rooms.members.inviteMember.step.prepare.title"),
			dataTestId: "fab-invite-members",
		};
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
