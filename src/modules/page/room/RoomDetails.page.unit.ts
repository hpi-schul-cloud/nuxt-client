import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { RoomDetailsPage } from "@page-room";
import { storeToRefs } from "pinia";

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
// const mockRoomDetailsStore = {
// 	deactivateRoom: jest.fn(),
// 	fetchRoom: jest.fn(),
// 	resetState: jest.fn(),
// };

jest.mock("@data-room", () => ({
	useRoomDetailsStore: jest.fn().mockReturnValue({
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
		isLoading: jest.fn(),
		room: jest.fn(),
		roomVariant: jest.fn(),
		roomBoards: jest.fn(),
	}),
}));

describe("@pages/RoomsDetails.page.vue", () => {
	const setup = () => {
		const wrapper = mount(RoomDetailsPage, {
			shallow: true,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
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
});
