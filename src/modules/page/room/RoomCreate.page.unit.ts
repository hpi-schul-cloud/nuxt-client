import { RoomCreateParams } from "@/types/room/Room";
import { useRoomCreateState } from "@data-room";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { RoomCreatePage } from "@page-room";
import { useRouter } from "vue-router";
import { RoomColor } from "@/serverApi/v3";
import { RoomForm } from "@feature-room";

jest.mock("vue-router", () => ({
	useRouter: jest.fn().mockReturnValue({
		push: jest.fn(),
	}),
}));

jest.mock("@data-room", () => ({
	useRoomCreateState: jest.fn().mockReturnValue({
		createRoom: jest.fn().mockResolvedValue({
			id: "123",
			name: "test",
			color: "blue",
		}),
	}),
	roomData: {},
}));

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

const roomParams: RoomCreateParams = {
	name: "test",
	color: RoomColor.Blue,
};

describe("@pages/RoomCreate.page.vue", () => {
	const setup = () => {
		const wrapper = mount(RoomCreatePage, {
			shallow: true,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		const { createRoom } = useRoomCreateState();
		const roomComponent = wrapper.findComponent(RoomForm);

		return {
			wrapper,
			router: useRouter(),
			createRoom,
			roomComponent,
		};
	};

	it("should be rendered in DOM", () => {
		const { wrapper } = setup();
		expect(wrapper.vm).toBeDefined();
	});
	it("should call createRoom with correct parameters on save", async () => {
		const { createRoom, roomComponent } = setup();
		roomComponent.vm.$emit("save", roomParams);
		expect(createRoom).toHaveBeenCalledWith(roomParams);
	});
	it("should navigate to 'room-details' with correct room id on save", async () => {
		const { roomComponent, router } = setup();
		roomComponent.vm.$emit("save", roomParams);
		expect(router.push).toHaveBeenCalledWith({
			name: "room-details",
			params: { id: "123" },
		});
	});
	it("should navigate to 'rooms' on cancel", async () => {
		const { router, roomComponent } = setup();
		roomComponent.vm.$emit("cancel");
		expect(router.push).toHaveBeenCalledWith({ name: "rooms" });
	});
});
