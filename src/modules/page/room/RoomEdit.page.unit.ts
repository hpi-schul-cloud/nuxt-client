import { Breadcrumb } from "@/components/templates/default-wireframe.types";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import { ApplicationError } from "@/store/types/application-error";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { RoomColor, RoomUpdateParams } from "@/types/room/Room";
import { expectNotification, mockedPiniaStoreTyping, roomFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useRoomAuthorization, useRoomDetailsStore } from "@data-room";
import { RoomForm } from "@feature-room";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { RoomEditPage } from "@page-room";
import { createTestingPinia } from "@pinia/testing";
import { Mock } from "vitest";
import { computed, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";

vi.mock("vue-router");
const useRouteMock = useRoute as Mock;

vi.mock("@data-room/roomAuthorization.composable");
const roomAuthorization = vi.mocked(useRoomAuthorization);

const roomParams: RoomUpdateParams = {
	name: "test",
	color: RoomColor.Blue,
	features: [],
};

describe("@pages/RoomEdit.page.vue", () => {
	let roomPermissions: DeepMocked<ReturnType<typeof useRoomAuthorization>>;
	let useRouterMock: DeepMocked<ReturnType<typeof useRouter>>;

	beforeEach(() => {
		roomPermissions = createMock<ReturnType<typeof useRoomAuthorization>>();
		roomAuthorization.mockReturnValue(roomPermissions);

		useRouterMock = createMock<ReturnType<typeof useRouter>>();
		vi.mocked(useRouter).mockReturnValue(useRouterMock);
		useRouterMock.replace = vi.fn();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (
		options?: Partial<{
			isLoading: boolean;
			isRoomDefined: boolean;
		}>
	) => {
		const { isRoomDefined } = { isRoomDefined: true, ...options };
		const room = isRoomDefined ? roomFactory.build() : undefined;
		const roomId = room ? room.id : "test-room-id";

		useRouteMock.mockImplementation(() => ({
			params: {
				id: roomId,
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
			},
		});

		const { isLoading, updateRoom, fetchRoom } = mockedPiniaStoreTyping(useRoomDetailsStore);

		return {
			wrapper,
			isLoading,
			useRoute,
			updateRoom,
			fetchRoom,
			room,
			roomId,
		};
	};

	it("should be rendered in DOM", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	describe("is room undefined", () => {
		it("should fetch room details on mount", () => {
			const { fetchRoom, roomId } = setup({ isRoomDefined: false });

			expect(fetchRoom).toHaveBeenCalledWith(roomId);
		});
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
				roomPermissions.canEditRoom = computed(() => false);

				const { wrapper } = setup({ isLoading: false });
				const defaultWireframe = wrapper.findComponent(DefaultWireframe);

				expect(defaultWireframe.exists()).toBe(false);
			});

			it("should navigate to room details page", async () => {
				roomPermissions.canEditRoom = computed(() => false);

				const { roomId } = setup({ isLoading: false });
				await nextTick();

				expect(useRouterMock.replace).toHaveBeenCalledWith({
					name: "room-details",
					params: { id: roomId },
				});
			});
		});

		describe("when user has edit room permissions ", () => {
			beforeEach(() => {
				roomPermissions.canEditRoom = computed(() => true);
			});
			it("should render DefaultWireframe", () => {
				const { wrapper } = setup();
				const defaultWireframe = wrapper.findComponent(DefaultWireframe);

				expect(defaultWireframe.exists()).toBe(true);
			});

			it("should have roomFormComponent", async () => {
				const { wrapper } = setup();
				await nextTick();

				const roomFormComponent = wrapper.findComponent(RoomForm);
				expect(roomFormComponent.exists()).toBe(true);
			});

			it("should render roomFormComponent with correct props", async () => {
				const { wrapper, room } = setup();
				await nextTick();

				const roomFormComponent = wrapper.findComponent(RoomForm);
				expect(roomFormComponent.props().room).toMatchObject({
					name: room?.name,
					color: room?.color,
				});
			});

			it("should have breadcrumbs prop in DefaultWireframe component", async () => {
				const { wrapper, roomId, room } = setup();
				await nextTick();

				const defaultWireframe = wrapper.findComponent({
					name: "DefaultWireframe",
				});
				const breadcrumbsProp: Breadcrumb[] = defaultWireframe.props().breadcrumbs;
				const breadcrumb = breadcrumbsProp.find((breadcrumb: Breadcrumb) => breadcrumb.title === room?.name);

				expect(breadcrumb?.to).toContain(roomId);
			});

			describe("when roomFormComponent emits save event", () => {
				it("should call updateRoom with correct parameters on save event", async () => {
					const { updateRoom, roomId, wrapper } = setup();
					await nextTick();

					const roomFormComponent = wrapper.findComponent(RoomForm);
					roomFormComponent.vm.$emit("save", { room: roomParams });

					expect(updateRoom).toHaveBeenCalledWith(roomId, roomParams);
				});

				it("should navigate to 'room-details' with correct room id on save", async () => {
					const { wrapper, roomId } = setup();
					await nextTick();

					const roomFormComponent = wrapper.findComponent(RoomForm);
					roomFormComponent.vm.$emit("save", { room: roomParams });
					await nextTick();

					expect(useRouterMock.push).toHaveBeenCalledWith({
						name: "room-details",
						params: { id: roomId },
					});
				});

				it("should show error notification on invalid request error", async () => {
					const { updateRoom, wrapper } = setup();
					await nextTick();

					const apiError = {
						code: HttpStatusCode.BadRequest,
						message: "Bad Request",
					};
					updateRoom.mockRejectedValue(apiError);

					const roomFormComponent = wrapper.findComponent(RoomForm);
					roomFormComponent.vm.$emit("save", { room: roomParams });
					await nextTick();

					expectNotification("error");
				});

				it("should throw application error if not due to invalid request", async () => {
					const { updateRoom, wrapper } = setup();
					updateRoom.mockRejectedValue({ code: HttpStatusCode.Unauthorized });

					await expect(() =>
						(wrapper.vm as unknown as typeof RoomEditPage).onSave({
							room: roomParams,
						})
					).rejects.toThrow(new ApplicationError(HttpStatusCode.Unauthorized, "error.401"));
				});
			});

			it("should navigate to 'rooms' on cancel", async () => {
				const { wrapper, roomId } = setup();
				await nextTick();

				const roomFormComponent = wrapper.findComponent(RoomForm);
				roomFormComponent.vm.$emit("cancel");

				expect(useRouterMock.push).toHaveBeenCalledWith({
					name: "room-details",
					params: { id: roomId },
				});
			});
		});
	});
});
