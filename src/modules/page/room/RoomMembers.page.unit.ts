import RoomMembersPage from "./RoomMembers.page.vue";
import { ConfigResponse, RoleName, RoomDetailsResponse } from "@/serverApi/v3";
import { schoolsModule } from "@/store";
import SchoolsModule from "@/store/schools";
import { Tab } from "@/types/room/RoomMembers";
import { createTestEnvStore, mockedPiniaStoreTyping, roomMemberFactory, schoolFactory } from "@@/tests/test-utils";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import { roomFactory } from "@@/tests/test-utils/factory/room";
import { roomInvitationLinkFactory } from "@@/tests/test-utils/factory/room/roomInvitationLinkFactory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import {
	InvitationStep,
	useRegistrationStore,
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
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { mdiPlus } from "@icons/material";
import { createTestingPinia } from "@pinia/testing";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import { KebabMenuActionLeaveRoom } from "@ui-kebab-menu";
import { DefaultWireframe } from "@ui-layout";
import { LeaveRoomProhibitedDialog } from "@ui-room-details";
import { SpeedDialMenu, SpeedDialMenuAction } from "@ui-speed-dial-menu";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { nextTick, ref } from "vue";
import { Router, useRoute, useRouter } from "vue-router";
import { VBtn, VCard, VDialog, VSkeletonLoader, VTab, VTabs } from "vuetify/components";

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;
const useRouteMock = <Mock>useRoute;

vi.mock("@ui-confirmation-dialog");
const mockedUseRemoveConfirmationDialog = vi.mocked(useConfirmationDialog);

vi.mock("@vueuse/integrations/useFocusTrap", () => ({
	useFocusTrap: vi.fn(),
}));

describe("RoomMembersPage", () => {
	let router: DeepMocked<Router>;
	let route: DeepMocked<ReturnType<typeof useRoute>>;
	let askConfirmationMock: Mock;

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
			replace: vi.fn(),
		});
		useRouterMock.mockReturnValue(router);

		askConfirmationMock = vi.fn();
		setupConfirmationComposableMock({
			askConfirmationMock,
		});

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
		envConfig?: Partial<ConfigResponse>;
		allowedOperations?: Partial<RoomDetailsResponse["allowedOperations"]>;
	}) => {
		const { createRoom, activeTab, isLoading, envConfig, allowedOperations } = {
			createRoom: true,
			activeTab: Tab.Members,
			isLoading: false,
			...options,
		};

		setActivePinia(createTestingPinia());
		createTestEnvStore(envConfig);

		const room = createRoom ? roomFactory.build({ allowedOperations }) : undefined;

		const members = roomMemberFactory.buildList(3, { roomRoleName: RoleName.Roomeditor }).map((member) => ({
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
				stubs: {
					LeaveRoomProhibitedDialog: true,
					// Do not stub AddMembersDialog so that VDialog is accessible in tests
					Members: true,
					UseFocusTrap: true,
				},
			},

			props: {
				tab: activeTab,
			},
		});

		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);
		const roomMembersStore = mockedPiniaStoreTyping(useRoomMembersStore);
		const roomInvitationLinkStore = mockedPiniaStoreTyping(useRoomInvitationLinkStore);
		const registrationStore = mockedPiniaStoreTyping(useRegistrationStore);

		return {
			wrapper,
			registrationStore,
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

	describe("when user has no permission to see members list", () => {
		it("should not render content", () => {
			const { wrapper } = setup({ allowedOperations: { viewMemberlist: false } });
			const wireframe = wrapper.findComponent(DefaultWireframe);
			expect(wireframe.exists()).toBe(false);
		});

		it("should not fetch members on mount", () => {
			const { roomMembersStore } = setup({ allowedOperations: { viewMemberlist: false } });
			expect(roomMembersStore.fetchMembers).not.toHaveBeenCalled();
		});

		it("should replace the route to /rooms", () => {
			setup({ allowedOperations: { viewMemberlist: false } });
			expect(router.replace).toHaveBeenCalledWith("/rooms");
		});
	});

	it("should fetch members on mount", () => {
		const { roomMembersStore } = setup({ allowedOperations: { viewMemberlist: true } });
		expect(roomMembersStore.fetchMembers).toHaveBeenCalled();
	});

	it("should fetch room from room details store when room is undefined", () => {
		const { roomDetailsStore } = setup({ createRoom: false });

		expect(roomDetailsStore.fetchRoom).toHaveBeenCalledWith(routeRoomId);
	});

	describe("when user has permission to manage room invitation links", () => {
		it("should fetch registrations on mount", () => {
			const { registrationStore } = setup({ allowedOperations: { updateRoomInvitationLinks: true } });
			expect(registrationStore.fetchRegistrationsForCurrentRoom).toHaveBeenCalled();
		});
	});

	it("should not fetch registrations on mount on default", () => {
		const { registrationStore } = setup();
		expect(registrationStore.fetchRegistrationsForCurrentRoom).not.toHaveBeenCalled();
	});

	describe("page title", () => {
		it("should set correct title when user can add members", () => {
			const { room } = setup({ allowedOperations: { addMembers: true } });
			expect(document.title).toContain(`pages.rooms.members.management - ${room?.name}`);
		});

		it("should set correct title when user can not add members", () => {
			const { room } = setup({ allowedOperations: { addMembers: false } });
			expect(document.title).toContain(`pages.rooms.members.label - ${room?.name}`);
		});
	});

	describe("heading", () => {
		it("should set the correct heading when user can add members", () => {
			const { wrapper } = setup({ allowedOperations: { addMembers: true, viewMemberlist: true } });
			const heading = wrapper.get("h1");
			expect(heading.text()).toBe("pages.rooms.members.management");
		});

		it("should set the correct heading when user can not add members", () => {
			const { wrapper } = setup({ allowedOperations: { addMembers: false, viewMemberlist: true } });
			const heading = wrapper.get("h1");
			expect(heading.text()).toBe("pages.rooms.members.label");
		});
	});

	describe("onLeaveRoom", () => {
		it("should render kebab menu with leave room menu item", async () => {
			const { wrapper } = setup({ allowedOperations: { leaveRoom: true, viewMemberlist: true } });

			const roomMemberMenu = wrapper.findComponent('[data-testid="room-member-menu"]');
			expect(roomMemberMenu.exists()).toBe(true);

			await roomMemberMenu.trigger("click");

			const leaveRoomButton = wrapper.findComponent(KebabMenuActionLeaveRoom);
			expect(leaveRoomButton.exists()).toBe(true);
		});

		describe("when user can leave the room", () => {
			it("should open confirmation dialog when member can leave room", async () => {
				const { wrapper } = setup({ allowedOperations: { leaveRoom: true, viewMemberlist: true } });
				askConfirmationMock.mockResolvedValue(true);

				const menuBtn = wrapper.findComponent('[data-testid="room-member-menu"]');
				await menuBtn.trigger("click");

				const leaveMenu = wrapper.findComponent('[data-testid="kebab-menu-action-leave-room"]');
				await leaveMenu.trigger("click");

				expect(askConfirmationMock).toHaveBeenCalledWith({
					confirmActionLangKey: "common.actions.leave",
					message: "pages.rooms.leaveRoom.confirmation",
				});
			});

			it("should call remove method after confirmation", async () => {
				const { wrapper, roomMembersStore } = setup({ allowedOperations: { leaveRoom: true, viewMemberlist: true } });

				askConfirmationMock.mockResolvedValue(true);

				const menuBtn = wrapper.findComponent('[data-testid="room-member-menu"]');
				await menuBtn.trigger("click");

				const leaveMenu = wrapper.findComponent('[data-testid="kebab-menu-action-leave-room"]');
				await leaveMenu.trigger("click");

				expect(roomMembersStore.leaveRoom).toHaveBeenCalled();
			});

			it("should not call remove method when dialog is cancelled", async () => {
				const { wrapper, roomMembersStore } = setup({ allowedOperations: { leaveRoom: true, viewMemberlist: true } });

				askConfirmationMock.mockResolvedValue(false);

				const menuBtn = wrapper.findComponent('[data-testid="room-member-menu"]');
				await menuBtn.trigger("click");

				const leaveMenu = wrapper.findComponent('[data-testid="kebab-menu-action-leave-room"]');
				await leaveMenu.trigger("click");

				expect(roomMembersStore.removeMembers).not.toHaveBeenCalled();
			});
		});

		describe("when user can't leave the room", () => {
			it("should open leave room prohibited dialog", async () => {
				const { wrapper } = setup({ allowedOperations: { leaveRoom: false, viewMemberlist: true } });

				const menuBtn = wrapper.findComponent('[data-testid="room-member-menu"]');
				await menuBtn.trigger("click");

				const leaveMenuItem = wrapper.findComponent(KebabMenuActionLeaveRoom);
				await leaveMenuItem.trigger("click");

				const leaveRoomProhibitedDialogDialog = wrapper.findComponent(LeaveRoomProhibitedDialog);

				expect(leaveRoomProhibitedDialogDialog.isVisible()).toBe(true);
				expect(leaveRoomProhibitedDialogDialog.props("modelValue")).toBe(true);
			});

			it("should not call leaveRoom", async () => {
				const { wrapper, roomMembersStore } = setup({ allowedOperations: { leaveRoom: false, viewMemberlist: true } });

				const menuBtn = wrapper.findComponent('[data-testid="room-member-menu"]');
				await menuBtn.trigger("click");

				const leaveMenuItem = wrapper.findComponent(KebabMenuActionLeaveRoom);
				await leaveMenuItem.trigger("click");

				expect(roomMembersStore.leaveRoom).not.toHaveBeenCalled();
			});
		});
	});

	describe("DefaultWireframe", () => {
		const buildBreadcrumbs = (room: RoomDetailsResponse, canAddRoomMembers: boolean) => {
			const membersBreadcrumb = canAddRoomMembers ? "pages.rooms.members.management" : "pages.rooms.members.label";
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
			const { wrapper } = setup({ allowedOperations: { viewMemberlist: true } });
			const wireframe = wrapper.findComponent(DefaultWireframe);

			expect(wireframe.exists()).toBe(true);
		});

		describe("fab items", () => {
			it.each([
				{
					activeTab: Tab.Members,
					expectedFabItems: [
						{
							icon: mdiPlus,
							label: "pages.rooms.members.add",
							dataTestId: "fab-add-members",
						},
					],
				},
				{
					activeTab: Tab.Invitations,
					expectedFabItems: [
						{
							icon: mdiPlus,
							label: "pages.rooms.members.inviteMember.step.prepare.title",
							dataTestId: "fab-invite-members",
						},
					],
				},
			])("should set correct fab items when active tab is $activeTab", ({ activeTab, expectedFabItems }) => {
				const { wrapper } = setup({ activeTab, allowedOperations: { addMembers: true, viewMemberlist: true } });
				const fab = wrapper.findComponent(`[data-testid=${expectedFabItems[0].dataTestId}]`);

				expect(fab.exists()).toBe(true);
			});
		});

		describe("breadcrumbs", () => {
			it("should set correct breadcrumbs when user can add members", () => {
				const { wrapper, room } = setup({ allowedOperations: { addMembers: true, viewMemberlist: true } });
				const wireframe = wrapper.findComponent(DefaultWireframe);
				const expectedBreadcrumbs = buildBreadcrumbs(room!, true);

				expect(wireframe.props("breadcrumbs")).toEqual(expectedBreadcrumbs);
			});

			it("should set correct breadcrumbs when user can not add members", () => {
				const { wrapper, room } = setup({ allowedOperations: { addMembers: false, viewMemberlist: true } });
				const wireframe = wrapper.findComponent(DefaultWireframe);
				const expectedBreadcrumbs = buildBreadcrumbs(room!, false);

				expect(wireframe.props("breadcrumbs")).toEqual(expectedBreadcrumbs);
			});
		});
	});

	describe("add members fab", () => {
		it("should render when user can add members", () => {
			const { wrapper } = setup({ allowedOperations: { addMembers: true, viewMemberlist: true } });
			const wireframe = wrapper.findComponent(DefaultWireframe);
			const addMemberButton = wireframe.findComponent("[data-testid=fab-add-members]");
			expect(addMemberButton.exists()).toBe(true);
		});

		it("should not render when user can not add members", () => {
			const { wrapper } = setup({ allowedOperations: { addMembers: false, viewMemberlist: true } });
			const wireframe = wrapper.findComponent(DefaultWireframe);
			const addMemberButton = wireframe.findComponent("[data-testid=fab-add-members]");
			expect(addMemberButton.exists()).toBe(false);
			expect(wireframe.props("fabItems")).toBe(undefined);
		});

		it("should call loadSchoolList method", async () => {
			const { wrapper, roomMembersStore } = setup({ allowedOperations: { addMembers: true, viewMemberlist: true } });
			const wireframe = wrapper.findComponent(DefaultWireframe);

			const addMemberButton = wireframe.getComponent("[data-testid=fab-add-members]").getComponent(VBtn);

			await addMemberButton.trigger("click");

			expect(roomMembersStore.loadSchoolList).toHaveBeenCalled();
		});

		it("should open Dialog", async () => {
			const { wrapper } = setup({
				activeTab: Tab.Members,
				allowedOperations: { addMembers: true, viewMemberlist: true },
			});
			const wireframe = wrapper.findComponent(DefaultWireframe);
			const addMemberDialogBeforeClick = wrapper.findComponent(AddMembersDialog).findComponent(VDialog);

			expect(addMemberDialogBeforeClick.vm.modelValue).toBe(false);

			const addMemberButton = wireframe.getComponent("[data-testid=fab-add-members]").getComponent(VBtn);

			await addMemberButton.trigger("click");

			const addMemberDialogAfterClick = wrapper.findComponent(AddMembersDialog).findComponent(VDialog);

			expect(addMemberDialogAfterClick.vm.modelValue).toBe(true);
		});

		describe("when FEATURE_ROOM_LINK_INVITATION_EXTERNAL_PERSONS_ENABLED is true", () => {
			describe("SpeedDialMenu", () => {
				it("should have speed dial menu actions", async () => {
					const { wrapper } = setup({
						activeTab: Tab.Members,
						envConfig: {
							FEATURE_ROOM_LINK_INVITATION_EXTERNAL_PERSONS_ENABLED: true,
						},
						allowedOperations: { addMembers: true, viewMemberlist: true },
					});

					const wireframe = wrapper.findComponent(DefaultWireframe);
					const addMemberButton = wireframe.getComponent("[data-testid=fab-add-members]").getComponent(VBtn);
					await addMemberButton.trigger("click");

					const fabActions = wrapper.findAllComponents(SpeedDialMenuAction);
					expect(fabActions.length).toBe(2);
				});
			});

			it("should open add members dialog when clicking on add-member action", async () => {
				const { wrapper } = setup({
					activeTab: Tab.Members,
					envConfig: {
						FEATURE_ROOM_LINK_INVITATION_EXTERNAL_PERSONS_ENABLED: true,
					},
					allowedOperations: { addMembers: true, viewMemberlist: true },
				});

				const addMemberDialogBefore = wrapper.findComponent(AddMembersDialog).findComponent(VCard);
				expect(addMemberDialogBefore.exists()).toBe(false);

				await wrapper.findComponent(SpeedDialMenu).findComponent(VBtn).trigger("click");

				const addMemberBtn = wrapper.findComponent("[data-testid='fab-select-from-directory']").getComponent(VBtn);
				await addMemberBtn.trigger("click");

				const addMemberDialog = wrapper.findComponent(AddMembersDialog).findComponent(VCard);
				expect(addMemberDialog.exists()).toBe(true);
			});

			it("should open AddExternalPerson dialog when clicking on invite-members action", async () => {
				const { wrapper } = setup({
					activeTab: Tab.Members,
					envConfig: {
						FEATURE_ROOM_LINK_INVITATION_EXTERNAL_PERSONS_ENABLED: true,
					},
					allowedOperations: { addMembers: true, viewMemberlist: true },
				});

				const addExternalMemberDialogBefore = wrapper.findComponent(AddExternalPersonDialog).findComponent(VCard);
				expect(addExternalMemberDialogBefore.exists()).toBe(false);

				await wrapper.findComponent(SpeedDialMenu).findComponent(VBtn).trigger("click");

				const addExternalBtn = wrapper.findComponent("[data-testid='fab-add-external-person']").getComponent(VBtn);
				await addExternalBtn.trigger("click");

				const addExternalMemberDialog = wrapper.findComponent(AddExternalPersonDialog).findComponent(VCard);
				expect(addExternalMemberDialog.exists()).toBe(true);
			});
		});
	});

	describe("invite members fab", () => {
		it("should open Dialog", async () => {
			const { wrapper, roomInvitationLinkStore } = setup({
				activeTab: Tab.Invitations,
				allowedOperations: { addMembers: true, viewMemberlist: true },
			});

			const dialogBeforeClick = wrapper.findComponent(InviteMembersDialog).findComponent(VCard);

			expect(dialogBeforeClick.exists()).toBe(false);
			expect(roomInvitationLinkStore.isInvitationDialogOpen).toBe(false);

			const addMemberButton = wrapper.findComponent("[data-testid=fab-invite-members]").getComponent(VBtn);
			await addMemberButton.trigger("click");

			const dialogAfterClick = wrapper.findComponent(InviteMembersDialog).findComponent(VCard);

			expect(dialogAfterClick.exists()).toBe(true);
			expect(roomInvitationLinkStore.isInvitationDialogOpen).toBe(true);
			expect(roomInvitationLinkStore.invitationStep).toBe(InvitationStep.PREPARE);
		});
	});

	describe("add members dialog", () => {
		it("should set isMembersDialogOpen to false on @close", async () => {
			const { wrapper } = setup({ allowedOperations: { addMembers: true } });

			const dialog = wrapper.findComponent(AddMembersDialog);
			await dialog.setValue(true);
			expect(dialog.props("modelValue")).toBe(true);

			await dialog.vm.$emit("close");

			expect(dialog.props("modelValue")).toBe(false);
		});

		it("should close dialog on escape key", async () => {
			const { wrapper } = setup({ allowedOperations: { addMembers: true } });

			const dialog = wrapper.getComponent(VDialog);
			await dialog.setValue(true);
			expect(dialog.props("modelValue")).toBe(true);

			window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", keyCode: 27 }));
			await nextTick();

			expect(dialog.props("modelValue")).toBe(false);
		});

		it("should close dialog on close", async () => {
			const { wrapper } = setup({ allowedOperations: { addMembers: true } });

			const dialog = wrapper.getComponent(AddMembersDialog);
			await dialog.setValue(true);

			await dialog.vm.$emit("close");

			expect(dialog.props("modelValue")).toBe(false);
		});
	});

	describe("Tabnavigation", () => {
		it("should not render tabs when isVisibleTabNavigation is false", () => {
			const { wrapper } = setup({ allowedOperations: { updateRoomInvitationLinks: false } });

			const tabs = wrapper.findComponent(VTabs);

			expect(tabs.exists()).toBe(false);
		});

		it("should render all tabs when isVisibleTabNavigation is true", () => {
			const { wrapper } = setup({ allowedOperations: { updateRoomInvitationLinks: true, viewMemberlist: true } });

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
		])("should render the correct component for the tab %s", ({ activeTab, component }) => {
			const { wrapper } = setup({ activeTab, allowedOperations: { viewMemberlist: true } });

			const tabContent = wrapper.findComponent(component);
			expect(tabContent.exists()).toBe(true);
		});
	});

	describe("active tab behaviour", () => {
		it.each(Object.values(Tab))("should set the active tab to the one passed in props (%s)", (activeTab) => {
			const { wrapper } = setup({
				activeTab,
				allowedOperations: { updateRoomInvitationLinks: true, viewMemberlist: true },
			});

			const tabs = wrapper.findComponent(VTabs);
			expect(tabs.props("modelValue")).toBe(activeTab);
		});
	});

	describe("skeleton loader", () => {
		it("should show skeleton loader when room is loading", () => {
			const { wrapper } = setup({ isLoading: true, allowedOperations: { viewMemberlist: true } });

			const skeletonLoader = wrapper.findComponent(VSkeletonLoader);
			expect(skeletonLoader.exists()).toBe(true);
		});

		it("should not show skeleton loader when room is loaded", () => {
			const { wrapper } = setup({ isLoading: false, allowedOperations: { viewMemberlist: true } });

			const skeletonLoader = wrapper.findComponent(VSkeletonLoader);
			expect(skeletonLoader.exists()).toBe(false);
		});
	});
});
