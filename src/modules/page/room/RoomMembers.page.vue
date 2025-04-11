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
			<AddMembers @close="onDialogClose" />
		</VDialog>
	</DefaultWireframe>
	<LeaveRoomProhibitedDialog v-model="isLeaveRoomProhibitedDialogOpen" />
	<ConfirmationDialog />
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
	watch,
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
	useRoomAuthorization,
	Confirmations,
	Invitations,
	Members,
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
const { xs, mdAndDown } = useDisplay();
const { room } = storeToRefs(useRoomDetailsStore());

const isMembersDialogOpen = ref(false);
const isLeaveRoomProhibitedDialogOpen = ref(false);

const roomMembersStore = useRoomMembersStore();
const { currentUser } = storeToRefs(roomMembersStore);
const { fetchMembers, getPotentialMembers, getSchools, leaveRoom, resetStore } =
	roomMembersStore;

const pageTitle = computed(() =>
	buildPageTitle(`${room.value?.name} - ${t("pages.rooms.members.manage")}`)
);
useTitle(pageTitle);

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

const featureActivated = ref(true); // TODO: replace with feature flag

const activeTab = computed<Tab>({
	get() {
		return props.tab;
	},
	set: async (newTab) => {
		if (featureActivated.value) {
			await router.replace({
				query: { ...route.query, tab: newTab },
			});
		}
	},
});

const tabs: Array<{
	title: string;
	value: Tab;
	icon: string;
	component: Component;
}> = [
	{
		title: "Mitglieder", // toDo i18n
		value: Tab.Members,
		icon: mdiAccountMultipleOutline,
		component: Members,
	},
	{
		title: "Invitations",
		value: Tab.Invitations,
		icon: mdiLink,
		component: Invitations,
	},
	{
		title: "Confirmations",
		value: Tab.Confirmations,
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
	activeTab.value = Object.values(Tab).includes(props.tab)
		? props.tab
		: Tab.Members;
	if (room.value === undefined) {
		const roomId = route.params.id.toString();
		await fetchRoom(roomId);
	}

	await fetchMembers();

	const header = document.querySelector(".wireframe-header") as HTMLElement;
	fixedHeaderOnMobile.value.positionTop = header.offsetHeight + y.value;
});

onUnmounted(() => {
	resetStore();
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

	if (activeTab.value === Tab.Members) {
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
