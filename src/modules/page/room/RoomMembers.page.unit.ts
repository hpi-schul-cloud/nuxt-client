import { createTestingPinia } from "@pinia/testing";
import {
	mockedPiniaStoreTyping,
	roomMemberFactory,
	envsFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import {
	useRoomDetailsStore,
	useRoomMembersStore,
	useRoomMemberVisibilityOptions,
} from "@data-room";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { Router, useRoute, useRouter } from "vue-router";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import EnvConfigModule from "@/store/env-config";
import setupStores from "@@/tests/test-utils/setupStores";
import { computed, ref } from "vue";
import { RoleName, RoomDetailsResponse } from "@/serverApi/v3";
import { roomFactory } from "@@/tests/test-utils/factory/room";
import { VBtn, VDialog, VTab, VTabs } from "vuetify/lib/components/index.mjs";
import {
	AddMembers,
	Confirmations,
	Invitations,
	Members,
	useRoomAuthorization,
} from "@feature-room";
import { mdiPlus } from "@icons/material";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { LeaveRoomProhibitedDialog } from "@ui-room-details";
import { KebabMenuActionLeaveRoom } from "@ui-kebab-menu";
import { useBoardNotifier } from "@util-board";
import SchoolsModule from "@/store/schools";
import AuthModule from "@/store/auth";
import { schoolsModule } from "@/store";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { Tab } from "@/types/room/RoomMembers";
import RoomMembersPage from "./RoomMembers.page.vue";

jest.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;
const useRouteMock = <jest.Mock>useRoute;

jest.mock("@vueuse/integrations"); // mock focus trap from add members because we use mount

jest.mock("@ui-confirmation-dialog");
const mockedUseRemoveConfirmationDialog = jest.mocked(useConfirmationDialog);

jest.mock("@feature-room/roomAuthorization.composable");
const roomAuthorization = jest.mocked(useRoomAuthorization);

jest.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = jest.mocked(useBoardNotifier);

jest.mock("@data-room/roomMembers/membersVisibleOptions.composable");
const useMemberVisibilityOptions = jest.mocked(useRoomMemberVisibilityOptions);

describe("RoomMembersPage", () => {
	let router: DeepMocked<Router>;
	let route: DeepMocked<ReturnType<typeof useRoute>>;
	let askConfirmationMock: jest.Mock;
	let roomPermissions: ReturnType<typeof useRoomAuthorization>;
	let boardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	let memberVisibilityOptions: DeepMocked<
		ReturnType<typeof useRoomMemberVisibilityOptions>
	>;

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
		useRouteMock.mockReturnValue({ params: { id: routeRoomId } });

		router = createMock<Router>();
		useRouterMock.mockReturnValue(router);

		askConfirmationMock = jest.fn();
		setupConfirmationComposableMock({
			askConfirmationMock,
		});

		roomPermissions = {
			canAddRoomMembers: ref(false),
			canCreateRoom: ref(false),
			canChangeOwner: ref(false),
			canViewRoom: ref(false),
			canEditRoom: ref(false),
			canDeleteRoom: ref(false),
			canLeaveRoom: ref(false),
			canRemoveRoomMembers: ref(false),
			canEditRoomContent: ref(false),
		};
		roomAuthorization.mockReturnValue(roomPermissions);

		boardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(boardNotifierCalls);

		memberVisibilityOptions =
			createMock<ReturnType<typeof useRoomMemberVisibilityOptions>>();
		useMemberVisibilityOptions.mockReturnValue(memberVisibilityOptions);
	});

	const setup = (options?: {
		createRoom?: boolean;
		isVisibleAddMemberButton?: boolean;
		isVisibleTabNavigation?: boolean;
		isFeatureRoomMembersTabsEnabled?: boolean;
		activeTab?: Tab;
	}) => {
		const {
			createRoom,
			isVisibleAddMemberButton,
			isVisibleTabNavigation,
			isFeatureRoomMembersTabsEnabled,
			activeTab,
		} = {
			createRoom: true,
			isVisibleAddMemberButton: true,
			isVisibleTabNavigation: true,
			isFeatureRoomMembersTabsEnabled: true,
			activeTab: Tab.Members,

			...options,
		};

		memberVisibilityOptions.isVisibleAddMemberButton = computed(
			() => isVisibleAddMemberButton
		);
		memberVisibilityOptions.isVisibleTabNavigation = computed(
			() => isVisibleTabNavigation
		);

		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getEnv: {
				...envsFactory.build(),
				FEATURE_ROOMMEMBERS_TABS_ENABLED: isFeatureRoomMembersTabsEnabled,
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
						},
					}),
					createTestingI18n(),
					createTestingVuetify(),
				],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
				},
				stubs: { LeaveRoomProhibitedDialog: true, AddMembers: true },
			},

			props: {
				tab: activeTab,
			},
		});

		const roomDetailsStore = mockedPiniaStoreTyping(useRoomDetailsStore);
		const roomMembersStore = mockedPiniaStoreTyping(useRoomMembersStore);

		return { wrapper, roomDetailsStore, roomMembersStore, members, room };
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

	it("should set the page title", () => {
		const { room } = setup();

		expect(document.title).toContain(
			`${room?.name} - pages.rooms.members.manage`
		);
	});

	it("should have the correct heading", async () => {
		const { wrapper } = setup();

		const heading = wrapper.get("h1");

		expect(heading.text()).toBe("pages.rooms.members.manage");
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
		const buildBreadcrumbs = (room: RoomDetailsResponse) => {
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
					title: "pages.rooms.members.manage",
					disabled: true,
				},
			];
		};

		it("should render DefaultWireframe", async () => {
			const { wrapper } = setup();
			const wireframe = wrapper.findComponent(DefaultWireframe);

			expect(wireframe.exists()).toBe(true);
		});

		it("should set the breadcrumbs and fab items", async () => {
			const { wrapper, room } = setup();
			const wireframe = wrapper.findComponent(DefaultWireframe);

			const expectedBreadcrumbs = buildBreadcrumbs(room!);

			expect(wireframe.props("breadcrumbs")).toEqual(expectedBreadcrumbs);
			expect(wireframe.props("fabItems")).toEqual({
				icon: mdiPlus,
				title: "pages.rooms.members.add",
				ariaLabel: "pages.rooms.members.add",
				dataTestId: "fab-add-members",
			});
		});
	});

	describe("add members fab", () => {
		it("should render when isVisibleAddMemberButton is true", () => {
			const { wrapper } = setup();
			const wireframe = wrapper.findComponent(DefaultWireframe);
			const addMemberButton = wireframe.findComponent(
				"[data-testid=fab-add-members]"
			);
			expect(addMemberButton.exists()).toBe(true);
		});

		it("should not render when isVisibleAddMemberButton is false", () => {
			const { wrapper } = setup({ isVisibleAddMemberButton: false });
			const wireframe = wrapper.findComponent(DefaultWireframe);
			const addMemberButton = wireframe.findComponent(
				"[data-testid=fab-add-members]"
			);
			expect(addMemberButton.exists()).toBe(false);
			expect(wireframe.props("fabItems")).toBe(null);
		});

		it("should call getSchools and getPotantialMembers method", async () => {
			const { wrapper, roomMembersStore } = setup();
			const wireframe = wrapper.findComponent(DefaultWireframe);

			const addMemberButton = wireframe
				.getComponent("[data-testid=fab-add-members]")
				.getComponent(VBtn);

			await addMemberButton.trigger("click");

			expect(roomMembersStore.getSchools).toHaveBeenCalled();
			expect(roomMembersStore.getPotentialMembers).toHaveBeenCalledWith(
				RoleName.Teacher
			);
		});

		it("should open Dialog", async () => {
			const { wrapper } = setup();
			const wireframe = wrapper.findComponent(DefaultWireframe);
			const addMemberDialogBeforeClick = wrapper
				.getComponent(VDialog)
				.findComponent(AddMembers);

			expect(addMemberDialogBeforeClick.exists()).toBe(false);

			const addMemberButton = wireframe
				.getComponent("[data-testid=fab-add-members]")
				.getComponent(VBtn);

			await addMemberButton.trigger("click");

			const addMemberDialogAfterClick = wrapper
				.getComponent(VDialog)
				.findComponent(AddMembers);

			expect(addMemberDialogAfterClick.exists()).toBe(true);
		});
	});

	describe("add members dialog", () => {
		it("should set isMembersDialogOpen to false on @close", async () => {
			const { wrapper } = setup();

			const dialog = wrapper.findComponent(VDialog);
			await dialog.setValue(true);
			expect(dialog.props("modelValue")).toBe(true);

			const addMemberComponent = dialog.findComponent(AddMembers);
			await addMemberComponent.vm.$emit("close");

			expect(dialog.props("modelValue")).toBe(false);
		});

		it("should close dialog on escape key", async () => {
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
			const { wrapper } = setup({ isVisibleTabNavigation: false });

			const tabs = wrapper.findComponent(VTabs);

			expect(tabs.exists()).toBe(false);
		});

		it("should render all tabs when isVisibleTabNavigation is true", () => {
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
			"should default to members tab if the feature is not enabled, regardless of the active tab (%s)",
			(activeTab) => {
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
			const { wrapper } = setup({
				activeTab: Tab.Invitations,
			});

			const tabs = wrapper.findComponent(VTabs);
			expect(tabs.props("modelValue")).toBe(Tab.Invitations);
		});
	});
});
