import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { RoleName, RoomDetailsResponse } from "@/serverApi/v3";
import { schoolsModule } from "@/store";
import NotifierModule from "@/store/notifier";
import SchoolsModule from "@/store/schools";
import { Tab } from "@/types/room/RoomMembers";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import {
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
import {
	AddMembersDialog,
	Confirmations,
	Invitations,
	Members,
} from "@feature-room";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { mdiPlus } from "@icons/material";
import { createTestingPinia } from "@pinia/testing";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import { KebabMenuActionLeaveRoom } from "@ui-kebab-menu";
import { LeaveRoomProhibitedDialog } from "@ui-room-details";
import { useBoardNotifier } from "@util-board";
import { nextTick, computed, ref } from "vue";
import { Router, useRoute, useRouter } from "vue-router";
import {
	VBtn,
	VDialog,
	VSkeletonLoader,
	VTab,
	VTabs,
} from "vuetify/components";
import RoomMembersPage from "./RoomMembers.page.vue";
import { Mock } from "vitest";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap.mjs";

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;
const useRouteMock = <Mock>useRoute;

vi.mock("@ui-confirmation-dialog");
const mockedUseRemoveConfirmationDialog = vi.mocked(useConfirmationDialog);

vi.mock("@data-room/roomAuthorization.composable");
const roomAuthorization = vi.mocked(useRoomAuthorization);

vi.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = vi.mocked(useBoardNotifier);

vi.mock("@vueuse/integrations/useFocusTrap", () => {
	return {
		useFocusTrap: vi.fn(),
	};
});

describe("RoomMembersPage", () => {
	let router: DeepMocked<Router>;
	let route: DeepMocked<ReturnType<typeof useRoute>>;
	let askConfirmationMock: Mock;
	let roomPermissions: ReturnType<typeof useRoomAuthorization>;
	let boardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	let pauseMock: Mock;
	let unpauseMock: Mock;
	let deactivateMock: Mock;

	const routeRoomId = "room-id";

	beforeEach(() => {
		mockedUseRemoveConfirmationDialog.mockReturnValue({
			askConfirmation: askConfirmationMock,
			isDialogOpen: ref(false),
		});

		setupStores({
			schoolsModule: SchoolsModule,
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

		askConfirmationMock = vi.fn();
		setupConfirmationComposableMock({
			askConfirmationMock,
		});

		roomPermissions = {
			canAddRoomMembers: computed(() => true),
			canAddAllStudents: computed(() => false),
			canCreateRoom: computed(() => false),
			canChangeOwner: computed(() => false),
			canCopyRoom: computed(() => false),
			canViewRoom: computed(() => false),
			canEditRoom: computed(() => false),
			canDeleteRoom: computed(() => false),
			canLeaveRoom: computed(() => false),
			canRemoveRoomMembers: computed(() => false),
			canEditRoomContent: computed(() => false),
			canSeeAllStudents: computed(() => false),
			canShareRoom: computed(() => false),
			canManageRoomInvitationLinks: computed(() => false),
			canListDrafts: computed(() => false),
			canManageVideoconferences: computed(() => false),
		};
		roomAuthorization.mockReturnValue(roomPermissions);

		boardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(boardNotifierCalls);

		pauseMock = vi.fn();
		unpauseMock = vi.fn();
		deactivateMock = vi.fn();

		(useFocusTrap as Mock).mockReturnValue({
			pause: pauseMock,
			unpause: unpauseMock,
			deactivate: deactivateMock,
		});
	});

	const setup = (options?: {
		createRoom?: boolean;
		activeTab?: Tab;
		isLoading?: boolean;
	}) => {
		const { createRoom, activeTab, isLoading } = {
			createRoom: true,
			activeTab: Tab.Members,
			isLoading: false,

			...options,
		};

		const room = createRoom ? roomFactory.build() : undefined;

		const members = roomMemberFactory
			.buildList(3, { roomRoleName: RoleName.Roomeditor })
			.map((member) => {
				return {
					...member,
					displayRoomRole: "",
					displaySchoolRole: "",
				};
			});

		const roomInvitationLinks = roomInvitationLinkFactory.buildList(3);

		const wrapper = mount(RoomMembersPage, {
			attachTo: document.body,
			global: {
				plugins: [
					createTestingPinia({
						initialState: {
							roomDetailsStore: {
								isLoading,
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
					[NOTIFIER_MODULE_KEY.valueOf()]: createModuleMocks(NotifierModule),
				},
				stubs: {
					LeaveRoomProhibitedDialog: true,
					// Do not stub AddMembersDialog so that VDialog is accessible in tests
					Members: true,
					InviteMembersDialog: true,
					UseFocusTrap: true,
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

	it("should fetch members on mount", () => {
		const { roomMembersStore } = setup();
		expect(roomMembersStore.fetchMembers).toHaveBeenCalled();
	});

	it("should fetch room from room details store when room is undefined", () => {
		const { roomDetailsStore } = setup({ createRoom: false });

		expect(roomDetailsStore.fetchRoom).toHaveBeenCalledWith(routeRoomId);
	});

	describe("page title", () => {
		it("should set correct title when user can add members", () => {
			roomPermissions.canAddRoomMembers = computed(() => true);
			const { room } = setup();
			expect(document.title).toContain(
				`${room?.name} - pages.rooms.members.manage`
			);
		});
		it("should set correct title when user can not add members", () => {
			roomPermissions.canAddRoomMembers = computed(() => false);
			const { room } = setup();
			expect(document.title).toContain(
				`${room?.name} - pages.rooms.members.label`
			);
		});
	});

	describe("heading", () => {
		it("should set the correct heading when user can add members", () => {
			roomPermissions.canAddRoomMembers = computed(() => true);
			const { wrapper } = setup({});
			const heading = wrapper.get("h1");
			expect(heading.text()).toBe("pages.rooms.members.management");
		});

		it("should set the correct heading when user can not add members", () => {
			roomPermissions.canAddRoomMembers = computed(() => false);
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
				roomPermissions.canLeaveRoom = computed(() => true);
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
				roomPermissions.canLeaveRoom = computed(() => true);

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

		it("should render DefaultWireframe", () => {
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
				({ activeTab, expectedFabItems }) => {
					roomPermissions.canAddRoomMembers = computed(() => true);
					const { wrapper } = setup({ activeTab });
					const wireframe = wrapper.findComponent(DefaultWireframe);

					expect(wireframe.props("fabItems")).toEqual(expectedFabItems);
				}
			);
		});

		describe("breadcrumbs", () => {
			it("should set correct breadcrumbs when user can add members", () => {
				roomPermissions.canAddRoomMembers = computed(() => true);
				const { wrapper, room } = setup();
				const wireframe = wrapper.findComponent(DefaultWireframe);
				const expectedBreadcrumbs = buildBreadcrumbs(room!, true);

				expect(wireframe.props("breadcrumbs")).toEqual(expectedBreadcrumbs);
			});

			it("should set correct breadcrumbs when user can not add members", () => {
				roomPermissions.canAddRoomMembers = computed(() => false);
				const { wrapper, room } = setup();
				const wireframe = wrapper.findComponent(DefaultWireframe);
				const expectedBreadcrumbs = buildBreadcrumbs(room!, false);

				expect(wireframe.props("breadcrumbs")).toEqual(expectedBreadcrumbs);
			});
		});
	});

	describe("add members fab", () => {
		it("should render when user can add members", () => {
			roomPermissions.canAddRoomMembers = computed(() => true);
			const { wrapper } = setup();
			const wireframe = wrapper.findComponent(DefaultWireframe);
			const addMemberButton = wireframe.findComponent(
				"[data-testid=fab-add-members]"
			);
			expect(addMemberButton.exists()).toBe(true);
		});

		it("should not render when user can not add members", () => {
			roomPermissions.canAddRoomMembers = computed(() => false);
			const { wrapper } = setup();
			const wireframe = wrapper.findComponent(DefaultWireframe);
			const addMemberButton = wireframe.findComponent(
				"[data-testid=fab-add-members]"
			);
			expect(addMemberButton.exists()).toBe(false);
			expect(wireframe.props("fabItems")).toBe(null);
		});

		it("should call loadSchoolList method", async () => {
			roomPermissions.canAddRoomMembers = computed(() => true);
			const { wrapper, roomMembersStore } = setup();
			const wireframe = wrapper.findComponent(DefaultWireframe);

			const addMemberButton = wireframe
				.getComponent("[data-testid=fab-add-members]")
				.getComponent(VBtn);

			await addMemberButton.trigger("click");

			expect(roomMembersStore.loadSchoolList).toHaveBeenCalled();
		});

		it("should open Dialog", async () => {
			roomPermissions.canAddRoomMembers = computed(() => true);
			const { wrapper } = setup({
				activeTab: Tab.Members,
			});
			const wireframe = wrapper.findComponent(DefaultWireframe);
			const addMemberDialogBeforeClick = wrapper
				.findComponent(AddMembersDialog)
				.findComponent(VDialog);

			expect(addMemberDialogBeforeClick.vm.modelValue).toBe(false);

			const addMemberButton = wireframe
				.getComponent("[data-testid=fab-add-members]")
				.getComponent(VBtn);

			await addMemberButton.trigger("click");

			const addMemberDialogAfterClick = wrapper
				.findComponent(AddMembersDialog)
				.findComponent(VDialog);

			expect(addMemberDialogAfterClick.vm.modelValue).toBe(true);
		});
	});

	describe("invite members fab", () => {
		it("should open Dialog", async () => {
			roomPermissions.canAddRoomMembers = computed(() => true);
			const { wrapper, roomInvitationLinkStore } = setup({
				activeTab: Tab.Invitations,
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
			roomPermissions.canAddRoomMembers = computed(() => true);
			const { wrapper } = setup();

			const dialog = wrapper.findComponent(AddMembersDialog);
			await dialog.setValue(true);
			expect(dialog.props("modelValue")).toBe(true);

			await dialog.vm.$emit("close");

			expect(dialog.props("modelValue")).toBe(false);
		});

		it("should close dialog on escape key", async () => {
			roomPermissions.canAddRoomMembers = computed(() => true);
			const { wrapper } = setup();

			const dialog = wrapper.getComponent(VDialog);
			await dialog.setValue(true);
			expect(dialog.props("modelValue")).toBe(true);

			window.dispatchEvent(
				new KeyboardEvent("keydown", { key: "Escape", keyCode: 27 })
			);
			await nextTick();

			expect(dialog.props("modelValue")).toBe(false);
		});

		it("should close dialog on close", async () => {
			roomPermissions.canAddRoomMembers.value = true;
			const { wrapper } = setup();

			const dialog = wrapper.getComponent(AddMembersDialog);
			await dialog.setValue(true);

			await dialog.vm.$emit("close");

			expect(dialog.props("modelValue")).toBe(false);
		});
	});

	describe("Tabnavigation", () => {
		it("should not render tabs when isVisibleTabNavigation is false", () => {
			roomPermissions.canManageRoomInvitationLinks = computed(() => false);
			const { wrapper } = setup();

			const tabs = wrapper.findComponent(VTabs);

			expect(tabs.exists()).toBe(false);
		});

		it("should render all tabs when isVisibleTabNavigation is true", () => {
			roomPermissions.canManageRoomInvitationLinks = computed(() => true);
			const { wrapper } = setup();

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
			"should set the active tab to the one passed in props (%s)",
			(activeTab) => {
				roomPermissions.canManageRoomInvitationLinks = computed(() => true);
				const { wrapper } = setup({
					activeTab,
				});

				const tabs = wrapper.findComponent(VTabs);
				expect(tabs.props("modelValue")).toBe(activeTab);
			}
		);
	});

	describe("skeleton loader", () => {
		it("should show skeleton loader when room is loading", () => {
			const { wrapper } = setup({ isLoading: true });

			const skeletonLoader = wrapper.findComponent(VSkeletonLoader);
			expect(skeletonLoader.exists()).toBe(true);
		});

		it("should not show skeleton loader when room is loaded", () => {
			const { wrapper } = setup({ isLoading: false });

			const skeletonLoader = wrapper.findComponent(VSkeletonLoader);
			expect(skeletonLoader.exists()).toBe(false);
		});
	});
});
