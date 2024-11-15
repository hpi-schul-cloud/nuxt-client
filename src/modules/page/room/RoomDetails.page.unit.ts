import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { RoomColor } from "@/serverApi/v3";
import { AUTH_MODULE_KEY, ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import EnvConfigModule from "@/store/env-config";
import { RoomBoardItem, RoomDetails } from "@/types/room/Room";
import { envsFactory } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { RoomVariant, useRoomDetailsStore } from "@data-room";
import { RoomDetailsPage } from "@page-room";
import { createTestingPinia } from "@pinia/testing";
import AuthModule from "@/store/auth";
import CourseRoomDetailsPage from "@/pages/course-rooms/CourseRoomDetails.page.vue";

const envs = envsFactory.build();
const envConfigModule = createModuleMocks(EnvConfigModule, {
	getEnv: envs,
});
const authModule = createModuleMocks(AuthModule, {
	getUserPermissions: [],
	getUserRoles: ["teacher"],
});

jest.mock("vue-router", () => ({
	useRouter: jest.fn().mockReturnValue({
		push: jest.fn(),
	}),
	useRoute: jest.fn().mockReturnValue({
		params: {
			id: "test-123",
		},
	}),
}));

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

const mockRoomName = "test-room";
const mockRoomDetails = {
	id: "test-123",
	name: mockRoomName,
	color: RoomColor.Blue,
	createdAt: new Date().toDateString(),
	updatedAt: new Date().toDateString(),
};

interface RoomDetailsStore {
	isLoading?: boolean;
	room?: RoomDetails;
	roomVariant?: RoomVariant;
	roomBoards?: RoomBoardItem[];
}

describe("@pages/RoomsDetails.page.vue", () => {
	const setup = (roomDetailsStore: RoomDetailsStore) => {
		const wrapper = mount(RoomDetailsPage, {
			shallow: true,
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia({
						initialState: {
							roomDetailsStore,
						},
					}),
				],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				},
			},
		});

		const store = useRoomDetailsStore();

		return {
			wrapper,
			store,
		};
	};
	it("should be rendered in DOM", () => {
		const { wrapper } = setup({});
		expect(wrapper.vm).toBeDefined();
	});
	it("should render just an empty div when isLoading is true", () => {
		const { wrapper } = setup({ isLoading: true });
		const div = wrapper.find("div");
		expect(div.element.children.length).toBe(0);
	});
	it("should render DefaultWireframe if roomVariant is valid", () => {
		const { wrapper } = setup({
			isLoading: false,
			roomVariant: RoomVariant.ROOM,
		});
		const defaultWireframe = wrapper.findComponent(DefaultWireframe);
		expect(defaultWireframe).toBeDefined();
	});
	it("should render empty CourseRoomDetailsPage if roomVariant is invalid", () => {
		const { wrapper } = setup({
			isLoading: false,
			roomVariant: undefined,
			room: mockRoomDetails,
		});
		const roomDetailsComponent = wrapper.findComponent(CourseRoomDetailsPage);
		expect(roomDetailsComponent.element.children.length).toBe(0);
	});
	it("should correctly pass room details to RoomDetailsPage component", () => {
		const { wrapper } = setup({
			isLoading: false,
			roomVariant: undefined,
			room: mockRoomDetails,
		});
		const roomDetailsComponent = wrapper.findComponent(RoomDetailsPage);
		expect(roomDetailsComponent.vm.room).toEqual(mockRoomDetails);
	});
});
