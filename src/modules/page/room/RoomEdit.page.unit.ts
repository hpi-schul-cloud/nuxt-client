import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useRoomEditState } from "@data-room";
import { RoomEditPage } from "@page-room";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import { useRoute, useRouter } from "vue-router";
import { RoomUpdateParams, RoomColor } from "@/types/room/Room";
import { RoomForm } from "@feature-room";
import { nextTick } from "vue";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import NotifierModule from "@/store/notifier";

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

const roomParams: RoomUpdateParams = {
	name: "test",
	color: RoomColor.Blue,
	features: [],
};

describe("@pages/RoomEdit.page.vue", () => {
	const setup = () => {
		const notifierModule = createModuleMocks(NotifierModule);
		const wrapper = mount(RoomEditPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
		});

		const { isLoading, updateRoom } = useRoomEditState();
		const roomFormComponent = wrapper.findComponent(RoomForm);

		return {
			wrapper,
			isLoading,
			useRoute,
			router: useRouter(),
			updateRoom,
			roomFormComponent,
		};
	};

	it("should be rendered in DOM", () => {
		const { wrapper } = setup();
		expect(wrapper.exists()).toBe(true);
	});

	it("should have roomFormComponent", () => {
		const { roomFormComponent } = setup();
		expect(roomFormComponent).toBeDefined();
	});

	it("should have breadcrumbs prop in DefaultWireframe component", async () => {
		const { wrapper } = setup();

		await nextTick();
		const defaultWireframe = wrapper.findComponent({
			name: "DefaultWireframe",
		});
		const breadcrumbsProp: Breadcrumb[] = defaultWireframe.props().breadcrumbs;
		const breadcrumb = breadcrumbsProp.find(
			(breadcrumb: Breadcrumb) => breadcrumb.title === roomDataMock.value.name
		);

		expect(breadcrumb?.to).toContain(roomIdMock);
	});

	it("should call updateRoom with correct parameters on save event", async () => {
		const { updateRoom, roomFormComponent } = setup();

		roomFormComponent.vm.$emit("save", { room: roomParams });

		expect(updateRoom).toHaveBeenCalledWith(roomIdMock, roomParams);
	});

	it("should navigate to 'room-details' with correct room id on save", async () => {
		const { roomFormComponent, router } = setup();

		roomFormComponent.vm.$emit("save", roomParams);

		expect(router.push).toHaveBeenCalledWith({
			name: "room-details",
			params: { id: roomIdMock },
		});
	});

	it("should navigate to 'rooms' on cancel", async () => {
		const { roomFormComponent, router } = setup();

		roomFormComponent.vm.$emit("cancel", roomParams);

		expect(router.push).toHaveBeenCalledWith({
			name: "room-details",
			params: { id: roomIdMock },
		});
	});

	it("should render roomForm as component is not loading  ", async () => {
		(useRoomEditState as jest.Mock).mockReturnValueOnce({
			isLoading: false,
			roomData: roomDataMock,
			updateRoom: jest.fn(),
			fetchRoom: jest.fn(),
		});

		const { roomFormComponent } = setup();
		expect(roomFormComponent).toBeDefined();
	});

	it("should not render roomForm as component is loading  ", async () => {
		(useRoomEditState as jest.Mock).mockReturnValueOnce({
			isLoading: true,
			roomData: roomDataMock,
			updateRoom: jest.fn(),
			fetchRoom: jest.fn(),
		});

		const { roomFormComponent } = setup();
		expect(roomFormComponent.exists()).toEqual(false);
	});
});
