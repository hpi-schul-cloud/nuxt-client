import RoomsPage from "./Rooms.page.vue";
import { RoomItem } from "@/types/room/Room";
import {
	createTestAppStoreWithPermissions,
	createTestRoomStore,
	mockApi,
	mockComposable,
	roomItemFactory,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import * as serverApi from "@api-server";
import { CopyApiResponse, CopyElementType, CopyStatusEnum, Permission } from "@api-server";
import { useImportFlow } from "@feature-import";
import { RoomGrid } from "@feature-room";
import { createTestingPinia } from "@pinia/testing";
import { InfoAlert } from "@ui-alert";
import { EmptyState } from "@ui-empty-state";
import { DefaultWireframe } from "@ui-layout";
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
		useImportFlowMock.executeImport.mockResolvedValue({ result: undefined, success: false, error: undefined });
	});

	const setup = (
		roomItems: RoomItem[] = [roomItemFactory.build({ isLocked: false }), roomItemFactory.build({ isLocked: true })],
		isLoading = false
	) => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		const { roomStore } = createTestRoomStore(roomItems);
		roomStore.isLoading = isLoading;
		roomStore.fetchRooms.mockResolvedValue();

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

		it("should try to execute import with the token", () => {
			router.setQuery({ import: token });
			setup();

			expect(useImportFlowMock.executeImport).toHaveBeenCalledWith(token, expect.anything());
		});
	});

	describe("when the page is in import mode", () => {
		const token = "6S6s-CWVVxEG";

		it("should pass only unlocked rooms as available destinations", () => {
			router.setQuery({ import: token });
			setup();

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
						result: { ...copyResult, destination: { id: "room-id", type: "room" } },
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
						result: { ...copyResult, destination: { id: "column-id", type: "column", boardId: "board-id" } },
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
						result: { ...copyResult, destination: undefined },
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
});
