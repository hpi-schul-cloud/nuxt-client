import { RoomColor } from "@/serverApi/v3";
import { RoomCreateParams } from "@/types/room/Room";
import { createTestRoomStore, mockApiResponse, roomItemFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoomForm } from "@feature-room";
import { RoomCreatePage } from "@page-room";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

describe("@pages/RoomCreate.page.vue", () => {
	const router = createRouterMock();

	const setup = () => {
		injectRouterMock(router);

		const wrapper = mount(RoomCreatePage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		const { roomStore } = createTestRoomStore();
		const roomFormComponent = wrapper.findComponent(RoomForm);

		return {
			wrapper,
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

	it("should navigate to 'room-details' with correct room id on save", async () => {
		const { roomFormComponent, roomStore } = setup();

		const roomParams: RoomCreateParams = {
			name: "test",
			color: RoomColor.Blue,
			features: [],
		};

		roomStore.createRoom.mockResolvedValue({
			result: mockApiResponse({ data: roomItemFactory.build({ id: "123" }) }),
			success: true,
		});
		await roomFormComponent.vm.$emit("save", { room: roomParams });
		expect(roomStore.createRoom).toHaveBeenCalledWith(roomParams);
		expect(router.push).toHaveBeenCalledWith({
			name: "room-details",
			params: { id: "123" },
		});
	});

	it("should navigate to 'rooms' on cancel", () => {
		const { roomFormComponent } = setup();
		roomFormComponent.vm.$emit("cancel");
		expect(router.push).toHaveBeenCalledWith({ name: "rooms" });
	});
});
