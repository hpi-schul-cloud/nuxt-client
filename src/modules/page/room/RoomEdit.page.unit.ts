import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { RoomEditPage } from "@page-room";
import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import { useRoute, useRouter } from "vue-router";
import { RoomUpdateParams, RoomColor } from "@/types/room/Room";
import { RoomForm } from "@feature-room";
import { nextTick, ref } from "vue";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import NotifierModule from "@/store/notifier";
import { useRoomAuthorization, useRoomDetailsStore } from "@data-room";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { createTestingPinia } from "@pinia/testing";
import { mockedPiniaStoreTyping, roomFactory } from "@@/tests/test-utils";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";

jest.mock("vue-router");
const useRouteMock = useRoute as jest.Mock;

jest.mock("@data-room/roomAuthorization.composable");
const roomAuthorization = jest.mocked(useRoomAuthorization);

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

const roomParams: RoomUpdateParams = {
	name: "test",
	color: RoomColor.Blue,
};

describe("@pages/RoomEdit.page.vue", () => {
	let roomPermissions: DeepMocked<ReturnType<typeof useRoomAuthorization>>;
	let useRouterMock: DeepMocked<ReturnType<typeof useRouter>>;

	beforeEach(() => {
		roomPermissions = createMock<ReturnType<typeof useRoomAuthorization>>();
		roomAuthorization.mockReturnValue(roomPermissions);

		useRouterMock = createMock<ReturnType<typeof useRouter>>();
		jest.mocked(useRouter).mockReturnValue(useRouterMock);
		useRouterMock.replace = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const setup = (
		options?: Partial<{
			isLoading: boolean;
		}>
	) => {
		const notifierModule = createModuleMocks(NotifierModule);
		const room = roomFactory.build();

		useRouteMock.mockImplementation(() => ({
			params: {
				id: room.id,
			},
		}));

		const wrapper = mount(RoomEditPage, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia({
						initialState: {
							roomDetailsStore: {
								isLoading: options?.isLoading ?? false,
								room,
							},
						},
					}),
				],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
		});

		const { isLoading, updateRoom, fetchRoom } =
			mockedPiniaStoreTyping(useRoomDetailsStore);
		const roomFormComponent = wrapper.findComponent(RoomForm);

		return {
			wrapper,
			isLoading,
			useRoute,
			updateRoom,
			fetchRoom,
			roomFormComponent,
			room,
		};
	};

	it("should be rendered in DOM", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	it("should fetch room details on mount", () => {
		const { fetchRoom, room } = setup();

		expect(fetchRoom).toHaveBeenCalledWith(room.id);
	});

	describe("while loading", () => {
		it("should not render DefaultWireframe", () => {
			const { wrapper } = setup({ isLoading: true });

			const defaultWireframe = wrapper.findComponent(DefaultWireframe);
			expect(defaultWireframe.exists()).toBe(false);
		});
	});

	describe("loading is done", () => {
		describe("when user has no edit room permissions", () => {
			it("should not render DefaultWireframe", () => {
				roomPermissions.canEditRoom = ref(false);
				const { wrapper } = setup({ isLoading: false });
				const defaultWireframe = wrapper.findComponent(DefaultWireframe);

				expect(defaultWireframe.exists()).toBe(false);
			});

			it("should navigate to room details page", async () => {
				roomPermissions.canEditRoom = ref(false);

				const { room } = setup({ isLoading: false });
				await nextTick();

				expect(useRouterMock.replace).toHaveBeenCalledWith({
					name: "room-details",
					params: { id: room.id },
				});
			});
		});

		describe("when user has edit room permissions ", () => {
			beforeEach(() => {
				roomPermissions.canEditRoom = ref(true);
			});
			it("should render DefaultWireframe", () => {
				const { wrapper } = setup();
				const defaultWireframe = wrapper.findComponent(DefaultWireframe);
				expect(defaultWireframe.exists()).toBe(true);
			});

			it("should have roomFormComponent", () => {
				const { roomFormComponent } = setup();
				expect(roomFormComponent.exists()).toBe(true);
			});

			it("should have breadcrumbs prop in DefaultWireframe component", async () => {
				const { wrapper, room } = setup();

				await nextTick();
				const defaultWireframe = wrapper.findComponent({
					name: "DefaultWireframe",
				});
				const breadcrumbsProp: Breadcrumb[] =
					defaultWireframe.props().breadcrumbs;
				const breadcrumb = breadcrumbsProp.find(
					(breadcrumb: Breadcrumb) => breadcrumb.title === room.name
				);

				expect(breadcrumb?.to).toContain(room.id);
			});

			it("should call updateRoom with correct parameters on save event", async () => {
				const { updateRoom, roomFormComponent, room } = setup();

				roomFormComponent.vm.$emit("save", { room: roomParams });

				expect(updateRoom).toHaveBeenCalledWith(room.id, roomParams);
			});

			it("should navigate to 'room-details' with correct room id on save", async () => {
				const { roomFormComponent, room } = setup();

				roomFormComponent.vm.$emit("save", { room: roomParams });
				await nextTick();

				expect(useRouterMock.push).toHaveBeenCalledWith({
					name: "room-details",
					params: { id: room.id },
				});
			});

			it("should navigate to 'rooms' on cancel", async () => {
				const { roomFormComponent, room } = setup();

				roomFormComponent.vm.$emit("cancel");

				expect(useRouterMock.push).toHaveBeenCalledWith({
					name: "room-details",
					params: { id: room.id },
				});
			});
		});
	});
});
