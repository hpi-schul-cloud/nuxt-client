import { RoomColor, RoomDetailsResponse } from "@/serverApi/v3";
import { RoomDetails } from "@/types/room/Room";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { RoomVariant } from "@data-room";
import { RoomDetailsPage } from "@page-room";
import { storeToRefs } from "pinia";

const roomDataMock: RoomDetailsResponse = {
	id: "test-123",
	name: "Test room",
	color: "blue" as RoomColor,
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString(),
};

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

jest.mock("@data-room", () => ({
	useRoomDetailsStore: jest.fn().mockReturnValue({
		isLoading: false,
		room: {
			id: "test-123",
			name: "Test room",
			color: "blue",
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		roomVariant: "room" as RoomVariant,
		deactivateRoom: jest.fn(),
		fetchRoom: jest.fn(),
		resetState: jest.fn(),
	}),
	useRoomsState: jest.fn().mockReturnValue({
		deleteRoom: jest.fn(),
	}),
}));

jest.mock("pinia", () => ({
	storeToRefs: jest.fn().mockReturnValue({
		isLoading: false,
		room: {
			id: "test-123",
			name: "Test room",
			color: "blue" as RoomColor,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		roomVariant: "room" as RoomVariant,
		roomBoards: [],
	}),
}));

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

describe("@pages/RoomsDetails.page.vue", () => {
	const setup = () => {
		const wrapper = mount(RoomDetailsPage, {
			shallow: true,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					roomVariant: {
						value: "room" as RoomVariant,
					},
				},
			},
		});

		return {
			wrapper,
		};
	};
	it("should be rendered in DOM", () => {
		const { wrapper } = setup();
		expect(wrapper.vm).toBeDefined();
	});
	// it("should not render roomForm as component is loading  ", async () => {
	// 	(storeToRefs as jest.Mock).mockReturnValueOnce({
	// 		isLoading: false,
	// 		room: jest.fn(),
	// 		roomVariant: jest.fn(),
	// 		roomBoards: jest.fn(),
	// 	});

	// 	const { wrapper } = setup();
	// 	console.log(wrapper.html());
	// 	expect(wrapper.vm).toBeDefined();
	// });
});
