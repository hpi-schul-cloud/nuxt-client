import value from "@/assets/img/tldraw.svg";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useRoomEditState } from "@data-room";
import { RoomEditPage } from "@page-room";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import { useRoute } from "vue-router";

const roomIdMock = "test-1234";

const roomDataMock = {
	value: {
		id: roomIdMock,
		name: "test",
		color: "blue",
	},
};

jest.mock("vue-router", () => ({
	useRouter: jest.fn().mockReturnValue({
		push: jest.fn(),
	}),
	useRoute: jest.fn().mockReturnValue({
		params: {
			id: roomIdMock,
		},
	}),
}));

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
			useRoute,
		};
	};

	it("should be rendered in DOM", () => {
		const { wrapper } = setup();
		expect(wrapper.vm).toBeDefined();
	});

	it("should have breadcrumbs prop in DefaultWireframe component", () => {
		const { wrapper } = setup();
		const defaultWireframe = wrapper.findComponent({
			name: "DefaultWireframe",
		});
		const breadcrumbsProp: Breadcrumb[] = defaultWireframe.props().breadcrumbs;
		const breadcrumb = breadcrumbsProp.find(
			(breadcrumb: Breadcrumb) => breadcrumb.to === `/rooms/${roomIdMock}`
		);
		expect(breadcrumb).toBeDefined();
	});
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
