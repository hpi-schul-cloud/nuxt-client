import { RoomColor, RoomCreateParams } from "@/types/room/Room";
import { createTestRoomStore, mockApiResponse, roomItemFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoomForm } from "@feature-room";
import { RoomCreatePage } from "@page-room";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { useRouter } from "vue-router";

vi.mock("vue-router", () => ({
	useRouter: vi.fn().mockReturnValue({
		push: vi.fn(),
	}),
}));

const roomParams: RoomCreateParams = {
	name: "test",
	color: RoomColor.Blue,
	features: [],
};

describe("@pages/RoomCreate.page.vue", () => {
	const setup = () => {
		const wrapper = mount(RoomCreatePage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		const { roomStore } = createTestRoomStore();
		const roomFormComponent = wrapper.findComponent(RoomForm);

		return {
			wrapper,
			router: useRouter(),
			roomStore,
			roomFormComponent,
		};
	};

	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});

	it("should have roomFormComponent", () => {
		const { roomFormComponent } = setup();
		expect(roomFormComponent).toBeDefined();
	});

	it("should call createRoom with correct parameters on save", async () => {
		const { roomStore, roomFormComponent } = setup();
		roomFormComponent.vm.$emit("save", { room: roomParams });
		await flushPromises();
		expect(roomStore.createRoom).toHaveBeenCalledWith(roomParams);
	});

	it("should navigate to 'room-details' with correct room id on save", async () => {
		const { roomFormComponent, router, roomStore } = setup();
		roomStore.createRoom.mockResolvedValue({
			result: mockApiResponse({ data: roomItemFactory.build({ id: "123" }) }),
			success: true,
		});
		await roomFormComponent.vm.$emit("save", roomParams);
		expect(router.push).toHaveBeenCalledWith({
			name: "room-details",
			params: { id: "123" },
		});
	});

	it("should navigate to 'rooms' on cancel", () => {
		const { router, roomFormComponent } = setup();
		roomFormComponent.vm.$emit("cancel");
		expect(router.push).toHaveBeenCalledWith({ name: "rooms" });
	});
});
