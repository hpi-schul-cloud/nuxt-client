import CopyModule from "@/store/copy";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import {
	COPY_MODULE_KEY,
	LOADING_STATE_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { useRoomsState, useRoomAuthorization } from "@data-room";
import { createMock } from "@golevelup/ts-vitest";
import { ref } from "vue";
import { RouteLocation, Router, useRoute, useRouter } from "vue-router";
import RoomsPage from "./Rooms.page.vue";
import { mdiPlus } from "@icons/material";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { RoomGrid } from "@feature-room";
import ImportFlow from "@/components/share/ImportFlow.vue";
import { InfoAlert } from "@ui-alert";
import { Mock } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import AuthModule from "@/store/auth";
import { RoomItem } from "@/types/room/Room";
import { roomItemFactory } from "@@/tests/test-utils";

vi.mock("vue-router");
const useRouteMock = useRoute as Mock;
const useRouterMock = useRouter as Mock;

vi.mock("@data-room/Rooms.state");
const useRoomsStateMock = useRoomsState as Mock;

vi.mock("@data-room/roomAuthorization.composable");
const roomAuthorization = vi.mocked(useRoomAuthorization);

describe("RoomsPage", () => {
	let roomPermissions: ReturnType<typeof useRoomAuthorization>;

	beforeEach(() => {
		setupStores({
			authModule: AuthModule,
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
			canListDrafts: ref(false),
			canManageRoomInvitationLinks: ref(false),
			canManageVideoconferences: ref(false),
		};
		roomAuthorization.mockReturnValue(roomPermissions);
	});

	const setup = (routeQuery: RouteLocation["query"] = {}) => {
		const copyModule = createModuleMocks(CopyModule);
		const loadingState = createModuleMocks(LoadingStateModule);
		const notifierModuleMock = createModuleMocks(NotifierModule);

		const route = createMock<RouteLocation>({
			query: routeQuery,
		});
		useRouteMock.mockReturnValue(route);

		const router = createMock<Router>();
		useRouterMock.mockReturnValue(router);

		const roomItems = [
			roomItemFactory.build({ isLocked: false }),
			roomItemFactory.build({ isLocked: true }),
		];

		useRoomsStateMock.mockReturnValue({
			rooms: ref(roomItems),
			isLoading: ref(false),
			isEmpty: ref(false),
			fetchRooms: vi.fn(),
			deleteRoom: vi.fn(),
		});

		const wrapper = mount(RoomsPage, {
			global: {
				plugins: [
					createTestingI18n(),
					createTestingVuetify(),
					createTestingPinia(),
				],
				provide: {
					[COPY_MODULE_KEY]: copyModule,
					[LOADING_STATE_MODULE_KEY]: loadingState,
					[NOTIFIER_MODULE_KEY]: notifierModuleMock,
				},
				stubs: { ImportFlow: true },
			},
		});

		return {
			wrapper,
			notifierModuleMock,
			router,
		};
	};

	describe("when the page is mounted", () => {
		it("should be found in the dom", () => {
			const { wrapper } = setup();

			expect(wrapper.exists()).toBe(true);
		});

		it("should have the correct page title", () => {
			setup();

			expect(document.title).toContain("pages.rooms.title");
		});

		it("should render info alert", () => {
			const { wrapper } = setup();
			const alert = wrapper.findComponent(InfoAlert);

			expect(alert.exists()).toBe(true);

			const expectedListHeaderTexts = "pages.rooms.infoAlert.welcome";
			const expectedListText = [
				"pages.rooms.infoAlert.welcome.collaboration",
				"pages.rooms.infoAlert.welcome.teamsAndCourses",
				"pages.rooms.infoAlert.welcome.furtherInformation",
			].join("");

			const expectedInfoText = `${expectedListHeaderTexts} ${expectedListText}`;

			expect(alert.text()).toBe(expectedInfoText);
		});
	});

	describe("when the page is in import mode", () => {
		const setupImportMode = () => {
			const token = "6S6s-CWVVxEG";
			const { wrapper, notifierModuleMock, router } = setup({ import: token });

			return {
				wrapper,
				token,
				notifierModuleMock,
				router,
			};
		};

		it("should render import flow", () => {
			const { wrapper } = setupImportMode();
			const importFLow = wrapper.findComponent(ImportFlow);

			expect(importFLow.exists()).toBe(true);
		});

		it("should activate import flow", () => {
			const { wrapper } = setupImportMode();
			const importFLow = wrapper.getComponent(ImportFlow);

			expect(importFLow.props().isActive).toBe(true);
		});

		it("should pass the token to the import flow", () => {
			const { wrapper, token } = setupImportMode();
			const importFLow = wrapper.getComponent(ImportFlow);

			expect(importFLow.props().token).toBe(token);
		});

		it("should filter out locked rooms for the import flow", () => {
			const { wrapper } = setupImportMode();
			const importFLow = wrapper.getComponent(ImportFlow);

			const destinations = importFLow.props().destinations as RoomItem[];

			expect(destinations).toHaveLength(1);
			expect(destinations.every((room) => !room.isLocked)).toBe(true);
		});

		describe("when the import flow succeeded", () => {
			it("should notify about successful import", () => {
				const { wrapper, notifierModuleMock } = setupImportMode();
				const importFlow = wrapper.getComponent(ImportFlow);

				importFlow.vm.$emit("success", "newName", "newId");

				expect(notifierModuleMock.show).toHaveBeenCalledWith(
					expect.objectContaining({
						text: "components.molecules.import.options.success",
						status: "success",
					})
				);
			});

			it("should go to the room details page", () => {
				const { wrapper, router } = setupImportMode();
				const importFlow = wrapper.getComponent(ImportFlow);

				importFlow.vm.$emit("success", "newName", "newId");

				expect(router.replace).toHaveBeenCalledWith({
					name: "room-details",
					params: { id: "newId" },
				});
			});
		});
	});

	describe("Page Components", () => {
		describe("DefaultWireframe", () => {
			it("should be found in the dom", () => {
				const { wrapper } = setup();
				const wireframe = wrapper.findComponent({
					name: "DefaultWireframe",
				});

				expect(wireframe.exists()).toBe(true);
			});

			it("should have the correct props", () => {
				roomPermissions.canCreateRoom.value = true;
				const { wrapper } = setup();
				const wireframe = wrapper.findComponent(DefaultWireframe);

				const expectedFabItems = {
					icon: mdiPlus,
					title: "common.actions.create",
					to: "/rooms/new",
					ariaLabel: "pages.rooms.fab.title",
					dataTestId: "fab-add-room",
				};

				expect(wireframe.props("fabItems")).toEqual(expectedFabItems);
			});
		});

		describe("RoomGrid", () => {
			it("should be found in the dom", () => {
				const { wrapper } = setup();
				const roomGrid = wrapper.findComponent(RoomGrid);

				expect(roomGrid.exists()).toBe(true);
			});
		});
	});
});
