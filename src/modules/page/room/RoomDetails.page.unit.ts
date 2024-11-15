import { RoomColor } from "@/serverApi/v3";
import { RoomBoardItem, RoomDetails } from "@/types/room/Room";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { RoomVariant, useRoomDetailsStore } from "@data-room";
import { RoomDetailsPage } from "@page-room";
import { createTestingPinia } from "@pinia/testing";

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

jest.mock("@/utils/inject", () => ({
	injectStrict: jest.fn().mockImplementation(() => {
		return {
			getEnv: jest.fn().mockReturnValue(true),
		};
	}),
}));

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

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
	// it("should render RoomDetails component when isLoading is false", () => {
	// 	const { wrapper } = setup({
	// 		isLoading: false,
	// 		room: {
	// 			id: "test-123",
	// 			name: "test",
	// 			color: RoomColor.Blue,
	// 			createdAt: "2021-01-01T00:00:00.000Z",
	// 			updatedAt: "2021-01-01T00:00:00.000Z",
	// 		},
	// 		roomVariant: RoomVariant.ROOM,
	// 		roomBoards: [],
	// 	});
	// 	console.log(wrapper.html());
	// 	expect(wrapper.exists()).toBe(true);
	// });
});
