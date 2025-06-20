import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { RoleName, RoomDetailsResponse } from "@/serverApi/v3";
import { schoolsModule } from "@/store";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import SchoolsModule from "@/store/schools";
import { Tab } from "@/types/room/RoomMembers";
import { ENV_CONFIG_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import {
	envsFactory,
	mockedPiniaStoreTyping,
	roomMemberFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import { roomFactory } from "@@/tests/test-utils/factory/room";
import { roomInvitationLinkFactory } from "@@/tests/test-utils/factory/room/roomInvitationLinkFactory";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import {
	InvitationStep,
	useRoomAuthorization,
	useRoomDetailsStore,
	useRoomInvitationLinkStore,
	useRoomMembersStore,
} from "@data-room";
import { AddMembers, Confirmations, Invitations, Members } from "@feature-room";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mdiPlus } from "@icons/material";
import { createTestingPinia } from "@pinia/testing";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import { KebabMenuActionLeaveRoom } from "@ui-kebab-menu";
import { LeaveRoomProhibitedDialog } from "@ui-room-details";
import { useBoardNotifier } from "@util-board";
import { ref } from "vue";
import { Router, useRoute, useRouter } from "vue-router";
import { VBtn, VDialog, VTab, VTabs } from "vuetify/lib/components/index";
import RoomMembersPage from "./RoomMembers.page.vue";

jest.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;
const useRouteMock = <jest.Mock>useRoute;

jest.mock("@vueuse/integrations"); // mock focus trap from add members because we use mount

jest.mock("@ui-confirmation-dialog");
const mockedUseRemoveConfirmationDialog = jest.mocked(useConfirmationDialog);

jest.mock("@data-room/roomAuthorization.composable");
const roomAuthorization = jest.mocked(useRoomAuthorization);

jest.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

describe("RoomMembersPage", () => {
	let router: DeepMocked<Router>;
	let route: DeepMocked<ReturnType<typeof useRoute>>;
	let askConfirmationMock: jest.Mock;
	let roomPermissions: ReturnType<typeof useRoomAuthorization>;
	let boardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	const routeRoomId = "room-id";

	beforeEach(() => {
		mockedUseRemoveConfirmationDialog.mockReturnValue({
			askConfirmation: askConfirmationMock,
			isDialogOpen: ref(false),
		});

		setupStores({
			envConfigModule: EnvConfigModule,
			schoolsModule: SchoolsModule,
			authModule: AuthModule,
		});

		schoolsModule.setSchool(
			schoolFactory.build({
				id: "school-id",
				name: "Paul-Gerhardt-Gymnasium",
			})
		);

		route = createMock<ReturnType<typeof useRoute>>();
		useRouteMock.mockReturnValue(route);
		useRouteMock.mockReturnValue({
			params: { id: routeRoomId },
		});

		router = createMock<Router>({
			currentRoute: ref({ query: { tab: "" } }),
		});
		useRouterMock.mockReturnValue(router);

		askConfirmationMock = jest.fn();
		setupConfirmationComposableMock({
			askConfirmationMock,
		});

		roomPermissions = {
			canAddRoomMembers: ref(true),
			canCreateRoom: ref(false),
			canChangeOwner: ref(false),
			canCopyRoom: ref(false),
			canViewRoom: ref(false),
			canEditRoom: ref(false),
			canDeleteRoom: ref(false),
			canLeaveRoom: ref(false),
			canRemoveRoomMembers: ref(false),
			canEditRoomContent: ref(false),
			canSeeAllStudents: ref(false),
			canShareRoom: ref(false),
		};
		roomAuthorization.mockReturnValue(roomPermissions);

		boardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(boardNotifierCalls);
	});

	const setup = (options?: {
		createRoom?: boolean;
		isFeatureRoomMembersTabsEnabled?: boolean;
		activeTab?: Tab;
	}) => {
		const { createRoom, isFeatureRoomMembersTabsEnabled, activeTab } = {
			createRoom: true,
			isFeatureRoomMembersTabsEnabled: true,
			activeTab: Tab.Members,

			...options,
		};

		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getEnv: {
				...envsFactory.build(),
				FEATURE_ROOM_MEMBERS_TABS_ENABLED: isFeatureRoomMembersTabsEnabled,
			},
		});

		const room = createRoom ? roomFactory.build() : undefined;

		const members = roomMemberFactory
			.buildList(3, { roomRoleName: RoleName.Roomeditor })
			.map((member) => ({
				...member,
				displayRoomRole: "",
				displaySchoolRole: "",
			}));

		const roomInvitationLinks = roomInvitationLinkFactory.buildList(3);

		const wrapper = mount(RoomMembersPage, {
			attachTo: document.body,
			global: {
				plugins: [
					createTestingPinia({
						initialState: {
							roomDetailsStore: {
								isLoading: false,
								room,
							},
							roomInvitationLinkStore: {
								roomInvitationLinks,
								isInvitationDialogOpen: false,
								invitationStep: InvitationStep.SHARE,
							},
						},
					}),
					createTestingI18n(),
					createTestingVuetify(),
				],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: createModuleMocks(NotifierModule),
				},
				stubs: {
					LeaveRoomProhibitedDialog: true,
					AddMembers: true,
					Members: true,
				},
			},

			props: {
				tab: activeTab,
			},
		});

		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);
		const roomMembersStore = mockedPiniaStoreTyping(useRoomMembersStore);
		const roomInvitationLinkStore = mockedPiniaStoreTyping(
			useRoomInvitationLinkStore
		);

		return {
			wrapper,
			roomDetailsStore,
			roomMembersStore,
			roomInvitationLinkStore,
			members,
			room,
		};
	};

	it("should be found in the dom", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	it("should fetch members on mount", async () => {
		const { roomMembersStore } = setup();

		expect(roomMembersStore.fetchMembers).toHaveBeenCalled();
	});

	it("should fetch room from room details store when room is undefined", () => {
		const { roomDetailsStore } = setup({ createRoom: false });

		expect(roomDetailsStore.fetchRoom).toHaveBeenCalledWith(routeRoomId);
	});

	describe("page title", () => {
		it("should set correct title when user can add members", () => {
			roomPermissions.canAddRoomMembers.value = true;
			const { room } = setup();
			expect(document.title).toContain(
				`${room?.name} - pages.rooms.members.manage`
			);
		});
		it("should set correct title when user can not add members", () => {
			roomPermissions.canAddRoomMembers.value = false;
			const { room } = setup();
			expect(document.title).toContain(
				`${room?.name} - pages.rooms.members.label`
			);
		});
	});

	describe("heading", () => {
		it("should set the correct heading when user can add members", () => {
			roomPermissions.canAddRoomMembers.value = true;
			const { wrapper } = setup({});
			const heading = wrapper.get("h1");
			expect(heading.text()).toBe("pages.rooms.members.management");
		});

		it("should set the correct heading when user can not add members", () => {
			roomPermissions.canAddRoomMembers.value = false;
			const { wrapper } = setup({});
			const heading = wrapper.get("h1");
			expect(heading.text()).toBe("pages.rooms.members.label");
		});
	});

	describe("onLeaveRoom", () => {
		it("should render kebab menu with leave room menu item", async () => {
			const { wrapper } = setup();

			const roomMemberMenu = wrapper.findComponent(
				'[data-testid="room-member-menu"]'
			);
			expect(roomMemberMenu.exists()).toBe(true);

			await roomMemberMenu.trigger("click");

			const leaveRoomButton = wrapper.findComponent(KebabMenuActionLeaveRoom);
			expect(leaveRoomButton.exists()).toBe(true);
		});

		describe("when user can leave the room", () => {
			it("should open confirmation dialog when member can leave room", async () => {
				roomPermissions.canLeaveRoom.value = true;
				const { wrapper } = setup();
				askConfirmationMock.mockResolvedValue(true);

				const menuBtn = wrapper.findComponent(
					'[data-testid="room-member-menu"]'
				);
				await menuBtn.trigger("click");

				const leaveMenu = wrapper.findComponent(
					'[data-testid="kebab-menu-action-leave-room"]'
				);
				await leaveMenu.trigger("click");

				expect(askConfirmationMock).toHaveBeenCalledWith({
					confirmActionLangKey: "common.actions.leave",
					message: "pages.rooms.leaveRoom.confirmation",
				});
			});

			it("should call remove method after confirmation", async () => {
				roomPermissions.canLeaveRoom.value = true;
				const { wrapper, roomMembersStore } = setup();

				askConfirmationMock.mockResolvedValue(true);

				const menuBtn = wrapper.findComponent(
					'[data-testid="room-member-menu"]'
				);
				await menuBtn.trigger("click");

				const leaveMenu = wrapper.findComponent(
					'[data-testid="kebab-menu-action-leave-room"]'
				);
				await leaveMenu.trigger("click");

				expect(roomMembersStore.leaveRoom).toHaveBeenCalled();
			});

			it("should not call remove method when dialog is cancelled", async () => {
				const { wrapper, roomMembersStore } = setup();

				askConfirmationMock.mockResolvedValue(false);

				const menuBtn = wrapper.findComponent(
					'[data-testid="room-member-menu"]'
				);
				await menuBtn.trigger("click");

				const leaveMenu = wrapper.findComponent(
					'[data-testid="kebab-menu-action-leave-room"]'
				);
				await leaveMenu.trigger("click");

				expect(roomMembersStore.removeMembers).not.toHaveBeenCalled();
			});
		});

		describe("when user can't leave the room", () => {
			it("should open leave room prohibited dialog", async () => {
				const { wrapper } = setup();

				const menuBtn = wrapper.findComponent(
					'[data-testid="room-member-menu"]'
				);
				await menuBtn.trigger("click");

				const leaveMenuItem = wrapper.findComponent(KebabMenuActionLeaveRoom);
				await leaveMenuItem.trigger("click");

				const leaveRoomProhibitedDialogDialog = wrapper.findComponent(
					LeaveRoomProhibitedDialog
				);

				expect(leaveRoomProhibitedDialogDialog.isVisible()).toBe(true);
				expect(leaveRoomProhibitedDialogDialog.props("modelValue")).toBe(true);
			});

			it("should not call leaveRoom", async () => {
				const { wrapper, roomMembersStore } = setup();

				const menuBtn = wrapper.findComponent(
					'[data-testid="room-member-menu"]'
				);
				await menuBtn.trigger("click");

				const leaveMenuItem = wrapper.findComponent(KebabMenuActionLeaveRoom);
				await leaveMenuItem.trigger("click");

				expect(roomMembersStore.leaveRoom).not.toHaveBeenCalled();
			});
		});
	});

	describe("DefaultWireframe", () => {
		const buildBreadcrumbs = (
			room: RoomDetailsResponse,
			canAddRoomMembers: boolean
		) => {
			const membersBreadcrumb = canAddRoomMembers
				? "pages.rooms.members.management"
				: "pages.rooms.members.label";
			return [
				{
					title: "pages.rooms.title",
					to: "/rooms",
				},
				{
					title: room.name || "",
					to: `/rooms/${routeRoomId}`,
				},
				{
					title: membersBreadcrumb,
					disabled: true,
				},
			];
		};

		it("should render DefaultWireframe", async () => {
			const { wrapper } = setup();
			const wireframe = wrapper.findComponent(DefaultWireframe);

			expect(wireframe.exists()).toBe(true);
		});

		describe("fab items", () => {
			it.each([
				{
					activeTab: Tab.Members,
					expectedFabItems: {
						icon: mdiPlus,
						title: "pages.rooms.members.add",
						ariaLabel: "pages.rooms.members.add",
						dataTestId: "fab-add-members",
					},
				},
				{
					activeTab: Tab.Invitations,
					expectedFabItems: {
						icon: mdiPlus,
						title: "pages.rooms.members.inviteMember.step.prepare.title",
						ariaLabel: "pages.rooms.members.inviteMember.step.prepare.title",
						dataTestId: "fab-invite-members",
					},
				},
			])(
				"should set correct fab items when active tab is $activeTab",
				async ({ activeTab, expectedFabItems }) => {
					roomPermissions.canAddRoomMembers.value = true;
					const { wrapper } = setup({ activeTab });
					const wireframe = wrapper.findComponent(DefaultWireframe);

					expect(wireframe.props("fabItems")).toEqual(expectedFabItems);
				}
			);
		});

		describe("breadcrumbs", () => {
			it("should set correct breadcrumbs when user can add members", () => {
				roomPermissions.canAddRoomMembers.value = true;
				const { wrapper, room } = setup();
				const wireframe = wrapper.findComponent(DefaultWireframe);
				const expectedBreadcrumbs = buildBreadcrumbs(room!, true);

				expect(wireframe.props("breadcrumbs")).toEqual(expectedBreadcrumbs);
			});

			it("should set correct breadcrumbs when user can not add members", () => {
				roomPermissions.canAddRoomMembers.value = false;
				const { wrapper, room } = setup();
				const wireframe = wrapper.findComponent(DefaultWireframe);
				const expectedBreadcrumbs = buildBreadcrumbs(room!, false);

				expect(wireframe.props("breadcrumbs")).toEqual(expectedBreadcrumbs);
			});
		});
	});

	describe("add members fab", () => {
		it("should render when user can add members", () => {
			roomPermissions.canAddRoomMembers.value = true;
			const { wrapper } = setup();
			const wireframe = wrapper.findComponent(DefaultWireframe);
			const addMemberButton = wireframe.findComponent(
				"[data-testid=fab-add-members]"
			);
			expect(addMemberButton.exists()).toBe(true);
		});

		it("should not render when user can not add members", () => {
			roomPermissions.canAddRoomMembers.value = false;
			const { wrapper } = setup();
			const wireframe = wrapper.findComponent(DefaultWireframe);
			const addMemberButton = wireframe.findComponent(
				"[data-testid=fab-add-members]"
			);
			expect(addMemberButton.exists()).toBe(false);
			expect(wireframe.props("fabItems")).toBe(null);
		});

		it("should call getSchools method", async () => {
			roomPermissions.canAddRoomMembers.value = true;
			const { wrapper, roomMembersStore } = setup();
			const wireframe = wrapper.findComponent(DefaultWireframe);

			const addMemberButton = wireframe
				.getComponent("[data-testid=fab-add-members]")
				.getComponent(VBtn);

			await addMemberButton.trigger("click");

			expect(roomMembersStore.getSchools).toHaveBeenCalled();
		});

		it("should open Dialog", async () => {
			roomPermissions.canAddRoomMembers.value = true;
			const { wrapper } = setup({
				activeTab: Tab.Members,
				isFeatureRoomMembersTabsEnabled: true,
			});
			const wireframe = wrapper.findComponent(DefaultWireframe);
			const addMemberDialogBeforeClick = wrapper.findComponent(AddMembers);

			expect(addMemberDialogBeforeClick.exists()).toBe(false);

			const addMemberButton = wireframe
				.getComponent("[data-testid=fab-add-members]")
				.getComponent(VBtn);

			await addMemberButton.trigger("click");

			const addMemberDialogAfterClick = wrapper.findComponent(AddMembers);

			expect(addMemberDialogAfterClick.exists()).toBe(true);
		});
	});

	describe("invite members fab", () => {
		it("should open Dialog", async () => {
			roomPermissions.canAddRoomMembers.value = true;
			const { wrapper, roomInvitationLinkStore } = setup({
				activeTab: Tab.Invitations,
				isFeatureRoomMembersTabsEnabled: true,
			});
			const wireframe = wrapper.findComponent(DefaultWireframe);
			const dialogBeforeClick = wrapper.findComponent({
				name: "InviteMembersDialog",
			});

			expect(dialogBeforeClick.props("modelValue")).toBe(false);
			expect(roomInvitationLinkStore.isInvitationDialogOpen).toBe(false);

			const addMemberButton = wireframe
				.getComponent("[data-testid=fab-invite-members]")
				.getComponent(VBtn);

			await addMemberButton.trigger("click");

			const dialogAfterClick = wrapper.findComponent({
				name: "InviteMembersDialog",
			});

			expect(dialogAfterClick.props("modelValue")).toBe(true);
			expect(roomInvitationLinkStore.isInvitationDialogOpen).toBe(true);
			expect(roomInvitationLinkStore.invitationStep).toBe(
				InvitationStep.PREPARE
			);
		});
	});

	describe("add members dialog", () => {
		it("should set isMembersDialogOpen to false on @close", async () => {
			roomPermissions.canAddRoomMembers.value = true;
			const { wrapper } = setup();

			const dialog = wrapper.findComponent(VDialog);
			await dialog.setValue(true);
			expect(dialog.props("modelValue")).toBe(true);

			const addMemberComponent = dialog.findComponent(AddMembers);
			await addMemberComponent.vm.$emit("close");

			expect(dialog.props("modelValue")).toBe(false);
		});

		it("should close dialog on escape key", async () => {
			roomPermissions.canAddRoomMembers.value = true;
			const { wrapper } = setup();

			const dialog = wrapper.getComponent(VDialog);
			await dialog.setValue(true);

			const dialogContent = dialog.getComponent(AddMembers);
			await dialogContent.trigger("keydown.escape");

			expect(dialog.props("modelValue")).toBe(false);
		});
	});

	describe("Tabnavigation", () => {
		it("should not render tabs when isVisibleTabNavigation is false", () => {
			roomPermissions.canAddRoomMembers.value = true;
			const { wrapper } = setup({ isFeatureRoomMembersTabsEnabled: false });

			const tabs = wrapper.findComponent(VTabs);

			expect(tabs.exists()).toBe(false);
		});

		it("should render all tabs when isVisibleTabNavigation is true", () => {
			roomPermissions.canAddRoomMembers.value = true;
			const { wrapper } = setup({
				isFeatureRoomMembersTabsEnabled: true,
			});

			const tabs = wrapper.findComponent(VTabs);
			expect(tabs.exists()).toBe(true);

			const expectedTabs = [
				"pages.rooms.members.tab.members",
				"pages.rooms.members.tab.invitations",
				"pages.rooms.members.tab.confirmations",
			];

			const allTabs = tabs.findAllComponents(VTab);
			expect(allTabs.length).toBe(expectedTabs.length);

			allTabs.forEach((tab, index) => {
				expect(tab.text()).toContain(expectedTabs[index]);
			});
		});

		it.each([
			{ activeTab: Tab.Members, component: Members },
			{ activeTab: Tab.Invitations, component: Invitations },
			{ activeTab: Tab.Confirmations, component: Confirmations },
		])(
			"should render the correct component for the tab %s",
			({ activeTab, component }) => {
				const { wrapper } = setup({ activeTab });

				const tabContent = wrapper.findComponent(component);
				expect(tabContent.exists()).toBe(true);
			}
		);
	});

	describe("active tab behaviour", () => {
		it.each(Object.values(Tab))(
			"should default to members tab if the feature is not enabled, regardless of the active tab (%s)",
			(activeTab) => {
				roomPermissions.canAddRoomMembers.value = true;
				setup({
					isFeatureRoomMembersTabsEnabled: false,
					activeTab,
				});

				expect(router.replace).toHaveBeenCalledWith({
					query: { tab: Tab.Members },
				});
			}
		);

		it("should set the active tab to the one passed in props if the feature is enabled", () => {
			roomPermissions.canAddRoomMembers.value = true;
			const { wrapper } = setup({
				activeTab: Tab.Invitations,
			});

			const tabs = wrapper.findComponent(VTabs);
			expect(tabs.props("modelValue")).toBe(Tab.Invitations);
		});
	});
});
