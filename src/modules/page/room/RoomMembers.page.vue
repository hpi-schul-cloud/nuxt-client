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
					<KebabMenu class="mx-2" data-testid="room-member-menu">
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
					/>
				</VTabs>
			</div>
		</template>

		<VTabsWindow
			v-model="activeTab"
			class="room-members-tabs-window"
			:class="isVisibleAddMemberButton ? 'mt-12' : ''"
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
	</DefaultWireframe>
	<LeaveRoomProhibitedDialog v-model="isLeaveRoomProhibitedDialogOpen" />
	<ConfirmationDialog />
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
	<VDialog
		v-model="isInvitationDialogOpen"
		:width="xs ? 'auto' : 480"
		data-testid="dialog-add-participants"
		max-width="480"
		scrim
		@keydown.esc="onDialogClose"
	>
		<InviteMembers
			:school-name="currentUser.schoolName"
			@close="onDialogClose"
		/>
	</VDialog>
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
	useRoomDetailsStore,
	useRoomMembersStore,
	useRoomMemberVisibilityOptions,
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
	InviteMembers,
	Members,
	useRoomAuthorization,
} from "@feature-room";
import { RoleName } from "@/serverApi/v3";
import { useDisplay } from "vuetify";
import { KebabMenu, KebabMenuActionLeaveRoom } from "@ui-kebab-menu";
import {
	useConfirmationDialog,
	ConfirmationDialog,
} from "@ui-confirmation-dialog";
import { LeaveRoomProhibitedDialog } from "@ui-room-details";
import { Tab } from "@/types/room/RoomMembers";
import { envConfigModule } from "@/store";

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
const { room } = storeToRefs(useRoomDetailsStore());

const membersInfoText = ref("");

const isMembersDialogOpen = ref(false);
const isLeaveRoomProhibitedDialogOpen = ref(false);
const isInvitationDialogOpen = ref(false);

const roomMembersStore = useRoomMembersStore();
const { currentUser } = storeToRefs(roomMembersStore);
const { fetchMembers, getPotentialMembers, getSchools, leaveRoom, resetStore } =
	roomMembersStore;

const header = ref<HTMLElement | null>(null);
const { bottom: headerBottom } = useElementBounding(header);
const { askConfirmation } = useConfirmationDialog();
const { canLeaveRoom } = useRoomAuthorization();
const { isVisibleAddMemberButton, isVisibleTabNavigation } =
	useRoomMemberVisibilityOptions(currentUser);
const { FEATURE_ROOM_MEMBERS_TABS_ENABLED } = envConfigModule.getEnv;

watchEffect(() => {
	if (isVisibleAddMemberButton.value !== undefined) {
		membersInfoText.value = isVisibleAddMemberButton.value
			? t("pages.rooms.members.management")
			: t("pages.rooms.members.label");
	}
});

const pageTitle = computed(() =>
	buildPageTitle(`${room.value?.name} - ${membersInfoText.value}`)
);
useTitle(pageTitle);

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

const tabs: Array<{
	title: string;
	value: Tab;
	icon: string;
	component: Component;
	isVisible: ComputedRef<boolean>;
}> = [
	{
		title: "pages.rooms.members.tab.members",
		value: Tab.Members,
		icon: mdiAccountMultipleOutline,
		component: Members,
		isVisible: computed(() => true),
	},
	{
		title: "pages.rooms.members.tab.invitations",
		value: Tab.Invitations,
		icon: mdiLink,
		component: Invitations,
		isVisible: isVisibleTabNavigation,
	},
	{
		title: "pages.rooms.members.tab.confirmations",
		value: Tab.Confirmations,
		icon: mdiAccountQuestionOutline,
		component: Confirmations,
		isVisible: isVisibleTabNavigation,
	},
];

const dialogs = [
	{
		name: "members",
		component: AddMembers,
		modelValue: isMembersDialogOpen,
	},
	{
		name: "invitations",
		component: InviteMembers,
		modelValue: isInvitationDialogOpen,
	},
];

const onFabClick = async () => {
	if (activeTab.value === Tab.Members) {
		await getSchools();
		await getPotentialMembers(RoleName.Teacher);
		isMembersDialogOpen.value = true;
		return;
	}
	if (activeTab.value === Tab.Invitations) {
		isInvitationDialogOpen.value = true;
		return;
	}
};

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
	if (!isVisibleAddMemberButton.value) return;

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
			title: "Create invitation link",
			ariaLabel: t("pages.rooms.members.add"), // TODO: add translation
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
