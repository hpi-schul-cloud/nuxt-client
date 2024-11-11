import value from "@/assets/img/tldraw.svg";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useRoomEditState } from "@data-room";
import { RoomEditPage } from "@page-room";

jest.mock("vue-router", () => ({
	useRouter: jest.fn().mockReturnValue({
		push: jest.fn(),
	}),
	useRoute: jest.fn().mockReturnValue({
		params: {
			id: "test-1234",
		},
	}),
}));

const roomDataMock = {
	value: {
		id: "123",
		name: "test",
		color: "blue",
	},
};

jest.mock("@data-room", () => ({
	useRoomEditState: jest.fn().mockReturnValue({
		isLoading: false,
		roomData: roomDataMock,
		updateRoom: jest.fn(),
		fetchRoom: jest.fn(),
	}),
}));

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

// const roomParams: RoomUpdateParams = {
// 	name: "test",
// 	color: RoomColor.Blue,
// };

describe("@pages/RoomEdit.page.vue", () => {
	const setup = () => {
		const wrapper = mount(RoomEditPage, {
			shallow: true,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		const { isLoading } = useRoomEditState();

		return {
			wrapper,
			isLoading,
			// router: useRouter(),
		};
	};

	it("should be rendered in DOM", () => {
		const { wrapper } = setup();
		expect(wrapper.vm).toBeDefined();
	});

	it("should call fetchRoom with correct parameters on mount", async () => {
		setup();
		expect(useRoomEditState().fetchRoom).toHaveBeenCalledWith("test-1234");
	});
	// it("should call createRoom with correct parameters on save", async () => {
	// 	const { createRoom, roomComponent } = setup();
	// 	roomComponent.vm.$emit("save", roomParams);
	// 	expect(createRoom).toHaveBeenCalledWith(roomParams);
	// });
	// it("should navigate to 'room-details' with correct room id on save", async () => {
	// 	const { roomComponent, router } = setup();
	// 	roomComponent.vm.$emit("save", roomParams);
	// 	expect(router.push).toHaveBeenCalledWith({
	// 		name: "room-details",
	// 		params: { id: "123" },
	// 	});
	// });
	// it("should navigate to 'rooms' on cancel", async () => {
	// 	const { router, roomComponent } = setup();
	// 	roomComponent.vm.$emit("cancel");
	// 	expect(router.push).toHaveBeenCalledWith({ name: "rooms" });
	// });
});
