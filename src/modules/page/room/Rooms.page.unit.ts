import RoomsPage from "./Rooms.page.vue";
import ImportFlow from "@/components/share/ImportFlow.vue";
import { ShareTokenBodyParamsParentTypeEnum } from "@/serverApi/v3";
import CopyModule from "@/store/copy";
import LoadingStateModule from "@/store/loading-state";
import { RoomItem } from "@/types/room/Room";
import { COPY_MODULE_KEY, LOADING_STATE_MODULE_KEY } from "@/utils/inject";
import { createTestRoomStore, expectNotification, roomItemFactory } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useRoomAuthorization } from "@data-room";
import { ImportCardDialog } from "@feature-board";
import { RoomGrid } from "@feature-room";
import { createTestingPinia } from "@pinia/testing";
import { InfoAlert } from "@ui-alert";
import { EmptyState } from "@ui-empty-state";
import { DefaultWireframe } from "@ui-layout";
import { setActivePinia } from "pinia";
import { computed } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { VSkeletonLoader } from "vuetify/components";

vi.mock("@data-room/roomAuthorization.composable");
const roomAuthorization = vi.mocked(useRoomAuthorization);

describe("RoomsPage", () => {
	const router = createRouterMock();
	let roomPermissions: ReturnType<typeof useRoomAuthorization>;

	beforeEach(() => {
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
			canListDrafts: computed(() => false),
			canManageRoomInvitationLinks: computed(() => false),
			canManageVideoconferences: computed(() => false),
			canSeeMembersList: computed(() => false),
		};
		roomAuthorization.mockReturnValue(roomPermissions);
	});

	const setup = (
		roomItems: RoomItem[] = [roomItemFactory.build({ isLocked: false }), roomItemFactory.build({ isLocked: true })],
		isLoading = false
	) => {
		const copyModule = createModuleMocks(CopyModule);
		const loadingState = createModuleMocks(LoadingStateModule);

		injectRouterMock(router);

		setActivePinia(createTestingPinia());
		const { roomStore } = createTestRoomStore(roomItems);
		roomStore.isLoading = isLoading;

		const wrapper = mount(RoomsPage, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
				provide: {
					[COPY_MODULE_KEY]: copyModule,
					[LOADING_STATE_MODULE_KEY]: loadingState,
				},
				stubs: { ImportFlow: true, ImportCardDialog: true, RouterLink: true },
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

	describe("when the page is in import mode", () => {
		const token = "6S6s-CWVVxEG";

		const setupImportMode = () => {
			router.setQuery({ import: token });

			const { wrapper } = setup();

			return {
				wrapper,
			};
		};

		it("should render import card dialog with card type", () => {
			router.setQuery({ import: token, importedType: ShareTokenBodyParamsParentTypeEnum.Card });
			const { wrapper } = setup();

			const importFLow = wrapper.findComponent(ImportCardDialog);

			expect(importFLow.exists()).toBe(true);
			expect(importFLow.props().token).toBe(token);
		});

		it("should not render import card dialog with room type", () => {
			router.setQuery({ import: token, type: ShareTokenBodyParamsParentTypeEnum.Room });
			const { wrapper } = setup();
			const importFLow = wrapper.findComponent(ImportCardDialog);
			expect(importFLow.exists()).toBe(false);
		});

		it("should render import flow and be passed data", () => {
			const { wrapper } = setupImportMode();
			const importFLow = wrapper.findComponent(ImportFlow);

			expect(importFLow.exists()).toBe(true);
			expect(importFLow.props().isActive).toBe(true);
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
				const { wrapper } = setupImportMode();
				const importFlow = wrapper.getComponent(ImportFlow);

				importFlow.vm.$emit("success", "newName", "newId");

				expectNotification("success");
			});

			it("should go to the room details page", () => {
				const { wrapper } = setupImportMode();
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
				roomPermissions.canCreateRoom = computed(() => true);

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
