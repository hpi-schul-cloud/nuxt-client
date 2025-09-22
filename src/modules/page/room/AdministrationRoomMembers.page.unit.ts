import AdministrationRoomDetailPage from "./AdministrationRoomMembers.page.vue";
import {
	createTestEnvStore,
	meResponseFactory,
	mockedPiniaStoreTyping,
	schoolFactory,
} from "@@/tests/test-utils";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { useAdministrationRoomStore, useRoomMembersStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { useBoardNotifier } from "@util-board";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import SchoolsModule from "@/store/schools";
import { authModule, schoolsModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";
import { Mock } from "vitest";
import { Router, useRoute } from "vue-router";
import { nextTick } from "vue";
import { useI18n } from "vue-i18n";
import AuthModule from "@/store/auth";

vi.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = vi.mocked(useBoardNotifier);

vi.mock("vue-router");
const useRouteMock = <Mock>useRoute;

vi.mock(
	"@/utils/pageTitle",
	() =>
		({
			buildPageTitle: (pageTitle) => pageTitle ?? "",
		}) as typeof import("@/utils/pageTitle")
);

vi.mock("vue-i18n", () => {
	return {
		useI18n: vi.fn().mockReturnValue({
			t: vi.fn().mockImplementation((key: string) => key),
			n: vi.fn().mockImplementation((key: string) => key),
		}),
	};
});
vi.mocked(useI18n());

describe("AdministrationRoomMembers.page", () => {
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	const ownSchool = {
		id: "school-id",
		name: "Paul-Gerhardt-Gymnasium",
	};
	const router = createMock<Router>();

	beforeEach(() => {
		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);

		useRouteMock.mockReturnValue(router);

		setupStores({
			schoolsModule: SchoolsModule,
			authModule: AuthModule,
		});

		const mockMe = meResponseFactory.build({
			roles: [{ id: "admin-id", name: "admin" }],
		});
		authModule.setMe(mockMe);

		schoolsModule.setSchool(schoolFactory.build(ownSchool));
	});
	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (options?: {
		isEmptyList?: boolean;
		featureFlag?: boolean;
	}) => {
		createTestEnvStore({
			FEATURE_ADMINISTRATE_ROOMS_ENABLED: options?.featureFlag ?? true,
		});
		const isEmptyList = options?.isEmptyList ?? false;

		const wrapper = mount(AdministrationRoomDetailPage, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingPinia({
						initialState: {
							administrationRoomStore: {
								roomList: [],
								loading: false,
								isEmptyList: isEmptyList,
								selectedRoom: {
									id: "room-id",
									name: "Room Name",
								},
							},
						},
					}),
				],
				stubs: {
					RoomAdminMembersTable: true,
				},
			},
		});

		const adminRoomStore = mockedPiniaStoreTyping(useAdministrationRoomStore);
		const memberStore = mockedPiniaStoreTyping(useRoomMembersStore);

		return {
			wrapper,
			adminRoomStore,
			memberStore,
		};
	};

	describe("rendering", () => {
		it("should render the page and Table component ", async () => {
			const { wrapper } = setup();
			const roomAdminTable = wrapper.findComponent({
				name: "RoomAdminMembersTable",
			});

			expect(wrapper.exists()).toBe(true);
			expect(roomAdminTable.exists()).toBe(true);
		});

		it("should pass the correct breadcrumbs to the page", () => {
			const { wrapper } = setup();
			const defaultWireframe = wrapper.findComponent({
				name: "DefaultWireframe",
			});

			expect(defaultWireframe.exists()).toBe(true);
			const breadcrumbs = defaultWireframe.props("breadcrumbs");

			expect(breadcrumbs).toEqual([
				{
					title: "pages.rooms.administration.title",
					to: "/administration/rooms/manage",
				},
				{
					title: "pages.rooms.administration.roomDetail.breadcrumb",
					disabled: true,
				},
			]);
		});

		it("should display the correct page title", () => {
			setup();

			expect(document.title).toContain(
				"pages.rooms.administration.roomDetail.header.text"
			);
		});

		it("should display the correct page header", () => {
			const { wrapper } = setup();

			const header = wrapper.find(
				"[data-testid='administration-room-members-title']"
			);

			expect(header.exists()).toBe(true);
			expect(header.text()).toBe(
				"pages.rooms.administration.roomDetail.header.text"
			);
		});

		it("should call resetStore when unMounted", async () => {
			const { memberStore, wrapper } = setup();
			wrapper.unmount();
			await nextTick();

			expect(memberStore.resetStore).toHaveBeenCalled();
		});

		it("should navigate to dashboard if feature is disabled", async () => {
			const mockReplace = vi.fn();
			Object.defineProperty(window, "location", {
				configurable: true,
				value: { replace: mockReplace },
			});

			setup({ featureFlag: false });
			await nextTick();

			expect(mockReplace).toHaveBeenCalledWith("/dashboard");
		});
	});
});
