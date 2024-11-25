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

jest.mock("@data-room/RoomCreate.state.ts", () => ({
	useRoomCreateState: jest.fn().mockReturnValue({
		createRoom: jest.fn().mockResolvedValue({
			id: "123",
			name: "test",
			color: "blue",
		}),
		roomData: {
			name: "test-room-data",
			color: "blue",
		},
	}),
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
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		const { createRoom } = useRoomCreateState();
		const roomFormComponent = wrapper.findComponent(RoomForm);

		return {
			wrapper,
			router: useRouter(),
			createRoom,
			roomFormComponent,
		};
	};

	it("should have roomFormComponent", () => {
		const { roomFormComponent } = setup();
		expect(roomFormComponent).toBeDefined();
	});
	it("should call createRoom with correct parameters on save", async () => {
		const { createRoom, roomFormComponent } = setup();
		roomFormComponent.vm.$emit("save", roomParams);
		expect(createRoom).toHaveBeenCalledWith(roomParams);
	});
	it("should navigate to 'room-details' with correct room id on save", async () => {
		const { roomFormComponent, router } = setup();
		roomFormComponent.vm.$emit("save", roomParams);
		expect(router.push).toHaveBeenCalledWith({
			name: "room-details",
			params: { id: "123" },
		});
	});
	it("should navigate to 'rooms' on cancel", async () => {
		const { router, roomFormComponent } = setup();
		roomFormComponent.vm.$emit("cancel");
		expect(router.push).toHaveBeenCalledWith({ name: "rooms" });
	});
});
