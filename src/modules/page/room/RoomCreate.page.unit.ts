import { RoomColor, RoomCreateParams } from "@/types/room/Room";
import { useRoomCreateState } from "@data-room";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { RoomCreatePage } from "@page-room";
import { useRouter } from "vue-router";
import { RoomForm } from "@feature-room";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import NotifierModule from "@/store/notifier";
import { flushPromises } from "@vue/test-utils";

vi.mock("vue-router", () => ({
	useRouter: vi.fn().mockReturnValue({
		push: vi.fn(),
	}),
}));

vi.mock("@data-room/RoomCreate.state.ts", () => ({
	useRoomCreateState: vi.fn().mockReturnValue({
		createRoom: vi.fn().mockResolvedValue({
			id: "123",
			name: "test",
			color: "blue",
			features: [],
		}),
		roomData: {
			name: "test-room-data",
			color: "blue",
			features: [],
		},
	}),
}));

vi.mock(
	"@/utils/pageTitle",
	() =>
		({
			buildPageTitle: (pageTitle) => pageTitle ?? "",
		}) as typeof import("@/utils/pageTitle")
);

const roomParams: RoomCreateParams = {
	name: "test",
	color: RoomColor.Blue,
	features: [],
};

describe("@pages/RoomCreate.page.vue", () => {
	const setup = () => {
		const notifierModule = createModuleMocks(NotifierModule);

		const wrapper = mount(RoomCreatePage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
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
		roomFormComponent.vm.$emit("save", { room: roomParams });
		await flushPromises();
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
