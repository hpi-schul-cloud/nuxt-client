import RoomsPage from "./Rooms.page.vue";
import { RoomItem } from "@/types/room/Room";
import {
	createTestAppStoreWithPermissions,
	createTestEnvStore,
	createTestRoomStore,
	expectNotification,
	mockApi,
	mockApiResponse,
	mockComposable,
	roomArrangementResponseFactory,
	roomGroupResponseFactory,
	roomItemFactory,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import * as serverApi from "@api-server";
import {
	ConfigResponse,
	CopyApiResponse,
	CopyElementType,
	CopyStatusEnum,
	Permission,
	RoomArrangementResponse,
	RoomItemResponseAllowedOperations,
} from "@api-server";
import { useImportFlow } from "@feature-import";
import { RoomGrid, RoomGroupedOverview } from "@feature-room";
import { createTestingPinia } from "@pinia/testing";
import { InfoAlert } from "@ui-alert";
import { EmptyState } from "@ui-empty-state";
import { KebabMenuAction } from "@ui-kebab-menu";
import { DefaultWireframe } from "@ui-layout";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { nextTick, toValue } from "vue";
import { createRouterMock, injectRouterMock, RouterMock } from "vue-router-mock";
import { VSkeletonLoader } from "vuetify/components";

vi.mock("@feature-import/import-flow.composable");

describe("RoomsPage", () => {
	let router: RouterMock;
	let useImportFlowMock: Mocked<ReturnType<typeof useImportFlow>>;

	beforeEach(() => {
		const roomApiMock = mockApi<ReturnType<typeof serverApi.RoomApiFactory>>();
		roomApiMock.roomControllerGetRooms.mockResolvedValue({ data: { data: [] } } as never);
		vi.spyOn(serverApi, "RoomApiFactory").mockReturnValue(roomApiMock);

		router = createRouterMock();
		injectRouterMock(router);

		useImportFlowMock = mockComposable(useImportFlow, {});
		vi.mocked(useImportFlow).mockReturnValue(useImportFlowMock);
		useImportFlowMock.executeImport.mockResolvedValue({
			result: undefined,
			success: false,
			error: undefined,
			destinations: undefined,
		});
	});

	const setup = (
		roomItems: RoomItem[] = [roomItemFactory.build({ isLocked: false }), roomItemFactory.build({ isLocked: true })],
		isLoading = false,
		envs: Partial<ConfigResponse> = {}
	) => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		const { roomStore } = createTestRoomStore(roomItems);
		roomStore.isLoading = isLoading;
		roomStore.fetchRooms.mockResolvedValue(true);
		createTestEnvStore(envs);

		createTestAppStoreWithPermissions([Permission.SCHOOL_CREATE_ROOM]);

		const wrapper = mount(RoomsPage, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
				stubs: { RouterLink: true },
			},
		});

		return {
			wrapper,
			roomStore,
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

	describe("when a token is provided as query parameter", () => {
		const token = "6S6s-CWVVxEG";

		it("should try to execute import with the token", async () => {
			router.setQuery({ import: token });
			setup();
			await flushPromises();

			expect(useImportFlowMock.executeImport).toHaveBeenCalledWith(token, expect.anything());
		});
	});

	describe("when the page is in import mode", () => {
		const token = "6S6s-CWVVxEG";

		it("should pass only unlocked rooms as available destinations", async () => {
			const roomsWithEditContent = [
				roomItemFactory.build({
					isLocked: false,
					allowedOperations: { editContent: true } as unknown as RoomItemResponseAllowedOperations,
				}),
				roomItemFactory.build({
					isLocked: true,
					allowedOperations: { editContent: true } as unknown as RoomItemResponseAllowedOperations,
				}),
			];
			router.setQuery({ import: token });
			setup(roomsWithEditContent);
			await flushPromises();

			const [, destinations] = useImportFlowMock.executeImport.mock.calls[0];
			expect(toValue(destinations)).toHaveLength(1);
		});

		describe("when the import flow succeeded", () => {
			describe("and the destination is a room", () => {
				const mockBoardCopyResult = () => {
					const copyResult: CopyApiResponse = {
						id: "board-copy-id",
						type: CopyElementType.BOARD,
						status: CopyStatusEnum.SUCCESS,
					};

					useImportFlowMock.executeImport.mockResolvedValue({
						result: [copyResult],
						destinations: [{ id: "room-id", type: "room" }],
						success: true,
						error: undefined,
					});
				};

				it("should go to the room details page", async () => {
					mockBoardCopyResult();
					router.setQuery({ import: token });
					setup();
					await nextTick();

					expect(router.replace).toHaveBeenCalledWith({ name: "room-details", params: { id: "room-id" } });
				});
			});

			describe("and the destination is a column", () => {
				const mockCardCopyResult = () => {
					const copyResult: CopyApiResponse = {
						id: "card-copy-id",
						type: CopyElementType.CARD,
						status: CopyStatusEnum.SUCCESS,
					};

					useImportFlowMock.executeImport.mockResolvedValue({
						result: [copyResult],
						destinations: [{ id: "column-id", type: "column", boardId: "board-id" }],
						success: true,
						error: undefined,
					});
				};

				it("should go to the room details page", async () => {
					mockCardCopyResult();
					router.setQuery({ import: token });
					setup();
					await nextTick();

					expect(router.replace).toHaveBeenCalledWith({ name: "boards-id", params: { id: "board-id" } });
				});
			});

			describe("and the there is no destination", () => {
				const mockRoomCopyResult = () => {
					const copyResult: CopyApiResponse = {
						id: "room-copy-id",
						type: CopyElementType.ROOM,
						status: CopyStatusEnum.SUCCESS,
					};

					useImportFlowMock.executeImport.mockResolvedValue({
						result: [copyResult],
						destinations: [],
						success: true,
						error: undefined,
					});
				};

				it("should go to the rooms page", async () => {
					mockRoomCopyResult();
					router.setQuery({ import: token });
					setup();
					await nextTick();

					expect(router.replace).toHaveBeenCalledWith({ name: "rooms" });
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

			it("should have the correct props", async () => {
				const { wrapper } = setup();
				const wireframe = wrapper.findComponent(DefaultWireframe);

				expect(wireframe.props("fabItems")).toBeTruthy();
			});
		});

		describe("RoomGrid", () => {
			it("should render loading state when rooms are loading", () => {
				const { wrapper } = setup([], true);

				const loader = wrapper.findComponent(VSkeletonLoader);
				expect(loader.exists()).toBe(true);
			});

			it("should render empty state when no rooms were found", () => {
				const { wrapper } = setup([]);

				const emptyState = wrapper.findComponent(EmptyState);
				expect(emptyState.exists()).toBe(true);
				expect(emptyState.props("title")).toBe("pages.rooms.emptyState");
			});

			it("should be found in the dom", () => {
				const { wrapper } = setup();
				const roomGrid = wrapper.findComponent(RoomGrid);

				expect(roomGrid.exists()).toBe(true);
			});
		});
	});

	describe("archived rooms entry point", () => {
		describe("when the feature is enabled", () => {
			it("should show the rooms menu with an entry to navigate to archived rooms", async () => {
				const { wrapper } = setup(undefined, false, { FEATURE_ROOM_ARCHIVE_ENABLED: true });

				const menuBtn = wrapper.find("[data-testid=rooms-menu]");
				expect(menuBtn.exists()).toBe(true);

				await menuBtn.trigger("click");
				await wrapper.findComponent(KebabMenuAction).trigger("click");

				expect(router.push).toHaveBeenCalledWith({ name: "rooms-archive" });
			});
		});

		describe("when the feature is disabled", () => {
			it("should NOT show the rooms menu", () => {
				const { wrapper } = setup(undefined, false, { FEATURE_ROOM_ARCHIVE_ENABLED: false });

				expect(wrapper.find("[data-testid=rooms-menu]").exists()).toBe(false);
			});
		});
	});

	describe("room grouping", () => {
		const mockArrangementApi = (arrangement: Partial<RoomArrangementResponse> = {}) => {
			const arrangementApi = mockApi<ReturnType<typeof serverApi.RoomArrangementApiFactory>>();
			const response = roomArrangementResponseFactory.build(arrangement);
			arrangementApi.roomArrangementControllerGetArrangement.mockResolvedValue(mockApiResponse({ data: response }));
			arrangementApi.roomArrangementControllerUpdatePreferences.mockResolvedValue(
				mockApiResponse({ data: { ...response, revision: response.revision + 1, confirmGroupDeletion: true } })
			);
			vi.spyOn(serverApi, "RoomArrangementApiFactory").mockReturnValue(arrangementApi);
			return arrangementApi;
		};

		describe("when the feature is disabled", () => {
			it("should render the legacy room grid without arrangement requests", async () => {
				const arrangementApi = mockArrangementApi();
				const { wrapper, roomStore } = setup(undefined, false, { FEATURE_ROOM_GROUPING_ENABLED: false });
				await flushPromises();

				expect(wrapper.findComponent(RoomGrid).exists()).toBe(true);
				expect(wrapper.findComponent(RoomGrid).props("sectionKey")).toBeUndefined();
				expect(wrapper.findComponent(RoomGroupedOverview).exists()).toBe(false);
				expect(roomStore.fetchRooms).toHaveBeenCalled();
				expect(arrangementApi.roomArrangementControllerGetArrangement).not.toHaveBeenCalled();
			});
		});

		describe("when the feature is enabled", () => {
			it("should load the arrangement and render the grouped overview", async () => {
				const rooms = roomItemFactory.buildList(2);
				const arrangementApi = mockArrangementApi({ ungroupedRoomIds: rooms.map((room) => room.id) });
				const { wrapper } = setup(rooms, false, { FEATURE_ROOM_GROUPING_ENABLED: true });
				await flushPromises();

				expect(arrangementApi.roomArrangementControllerGetArrangement).toHaveBeenCalledTimes(1);
				expect(wrapper.findComponent(RoomGroupedOverview).exists()).toBe(true);
				expect(wrapper.find("[data-testid='room-group-ungrouped']").exists()).toBe(true);
				expect(wrapper.findComponent(EmptyState).exists()).toBe(false);
			});

			it("should show the loading state until the arrangement is loaded", () => {
				mockArrangementApi();
				const { wrapper } = setup([], false, { FEATURE_ROOM_GROUPING_ENABLED: true });

				expect(wrapper.findComponent(VSkeletonLoader).exists()).toBe(true);
			});

			it("should show the empty state and the add group entry without rooms and groups", async () => {
				mockArrangementApi();
				const { wrapper } = setup([], false, { FEATURE_ROOM_GROUPING_ENABLED: true });
				await flushPromises();

				expect(wrapper.findComponent(EmptyState).exists()).toBe(true);
				expect(wrapper.find("[data-testid='room-group-add']").exists()).toBe(true);
			});

			it("should not show the empty state when only an empty group exists", async () => {
				mockArrangementApi({ groups: [roomGroupResponseFactory.build()] });
				const { wrapper } = setup([], false, { FEATURE_ROOM_GROUPING_ENABLED: true });
				await flushPromises();

				expect(wrapper.findComponent(EmptyState).exists()).toBe(false);
				expect(wrapper.find("[data-testid='room-group-0']").exists()).toBe(true);
			});

			it("should keep the archive entry point", async () => {
				mockArrangementApi();
				const { wrapper } = setup(undefined, false, {
					FEATURE_ROOM_GROUPING_ENABLED: true,
					FEATURE_ROOM_ARCHIVE_ENABLED: true,
				});
				await flushPromises();

				expect(wrapper.find("[data-testid=rooms-menu]").exists()).toBe(true);
			});

			it("should execute the import flow", async () => {
				mockArrangementApi();
				router.setQuery({ import: "6S6s-CWVVxEG" });
				setup(undefined, false, { FEATURE_ROOM_GROUPING_ENABLED: true });
				await flushPromises();

				expect(useImportFlowMock.executeImport).toHaveBeenCalledWith("6S6s-CWVVxEG", expect.anything());
			});

			it("should not offer restoring delete confirmations while they are enabled", async () => {
				mockArrangementApi({ confirmGroupDeletion: true });
				const { wrapper } = setup(undefined, false, {
					FEATURE_ROOM_GROUPING_ENABLED: true,
					FEATURE_ROOM_ARCHIVE_ENABLED: false,
				});
				await flushPromises();

				expect(wrapper.find("[data-testid=rooms-menu]").exists()).toBe(false);
			});

			it("should restore delete confirmations from the rooms menu", async () => {
				const arrangementApi = mockArrangementApi({ revision: 2, confirmGroupDeletion: false });
				const { wrapper } = setup(undefined, false, { FEATURE_ROOM_GROUPING_ENABLED: true });
				await flushPromises();

				await wrapper.get("[data-testid=rooms-menu]").trigger("click");
				await wrapper
					.findAllComponents(KebabMenuAction)
					.find((action) => action.attributes("data-testid") === "rooms-menu-restore-group-delete-confirmation")
					?.trigger("click");
				await flushPromises();

				expect(arrangementApi.roomArrangementControllerUpdatePreferences).toHaveBeenCalledWith({
					expectedRevision: 2,
					confirmGroupDeletion: true,
				});
				expectNotification("success");
			});
		});
	});
});
