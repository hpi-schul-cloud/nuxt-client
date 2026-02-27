import { RoomApiFactory, RoomDetailsResponse, RoomItemResponseAllowedOperations } from "@/serverApi/v3";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { RoomColor, RoomDetails, RoomUpdateParams } from "@/types/room/Room";
import { expectNotification, mockApiResponse, mockedPiniaStoreTyping, roomFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useAppStore } from "@data-app";
import { useRoomDetailsStore } from "@data-room";
import { RoomForm } from "@feature-room";
import { createMock } from "@golevelup/ts-vitest";
import { RoomEditPage } from "@page-room";
import { createTestingPinia } from "@pinia/testing";
import { Breadcrumb, DefaultWireframe } from "@ui-layout";
import { nextTick } from "vue";
import { createRouterMock, injectRouterMock, type RouterMock } from "vue-router-mock";

vi.mock("@/serverApi/v3");

const roomParams: RoomUpdateParams = {
	name: "test",
	color: RoomColor.Blue,
	features: [],
};

describe("@pages/RoomEdit.page.vue", () => {
	const roomApiMock = createMock<ReturnType<typeof RoomApiFactory>>();
	let router: RouterMock;

	beforeEach(() => {
		router = createRouterMock();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (
		options?: Partial<{
			isLoading: boolean;
			isRoomDefined: boolean;
			room: RoomDetails | undefined;
			allowedOperations: Partial<RoomItemResponseAllowedOperations> | undefined;
		}>
	) => {
		const { isRoomDefined = true, allowedOperations = {} } = options ?? {};
		const room = isRoomDefined ? roomFactory.build({ allowedOperations }) : undefined;
		const roomId = room ? room.id : "test-room-id";

		injectRouterMock(router);
		router.setParams({ id: roomId });

		const wrapper = mount(RoomEditPage, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia({
						stubActions: false,
						initialState: {
							roomDetailsStore: {
								isLoading: options?.isLoading ?? false,
								room: options?.isLoading ? undefined : room,
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
			const { fetchRoom, roomId } = setup({ isRoomDefined: false, allowedOperations: { updateRoom: true } });

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
				const { wrapper } = setup({ isLoading: false, allowedOperations: { updateRoom: false } });
				const defaultWireframe = wrapper.findComponent(DefaultWireframe);

				expect(defaultWireframe.exists()).toBe(false);
			});

			it("should navigate to room details page", async () => {
				const { roomId } = setup({ isLoading: false, allowedOperations: { updateRoom: false } });
				await nextTick();

				expect(router.replace).toHaveBeenCalledWith({
					name: "room-details",
					params: { id: roomId },
				});
			});
		});

		describe("when user has edit room permissions ", () => {
			it("should render DefaultWireframe", () => {
				const { wrapper } = setup({ allowedOperations: { updateRoom: true } });
				const defaultWireframe = wrapper.findComponent(DefaultWireframe);

				expect(defaultWireframe.exists()).toBe(true);
			});

			it("should have roomFormComponent", async () => {
				const { wrapper } = setup({ allowedOperations: { updateRoom: true } });
				await nextTick();

				const roomFormComponent = wrapper.findComponent(RoomForm);
				expect(roomFormComponent.exists()).toBe(true);
			});

			it("should render roomFormComponent with correct props", async () => {
				const { wrapper, room } = setup({ allowedOperations: { updateRoom: true } });
				await nextTick();

				const roomFormComponent = wrapper.findComponent(RoomForm);
				expect(roomFormComponent.props().room).toMatchObject({
					name: room?.name,
					color: room?.color,
				});
			});

			it("should have breadcrumbs prop in DefaultWireframe component", async () => {
				const { wrapper, roomId, room } = setup({ allowedOperations: { updateRoom: true } });
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
					const { updateRoom, roomId, wrapper } = setup({ allowedOperations: { updateRoom: true } });
					await nextTick();

					const roomFormComponent = wrapper.findComponent(RoomForm);
					roomFormComponent.vm.$emit("save", { room: roomParams });

					expect(updateRoom).toHaveBeenCalledWith(roomId, roomParams);
				});

				it("should navigate to 'room-details' with correct room id on save", async () => {
					roomApiMock.roomControllerUpdateRoom.mockResolvedValueOnce(mockApiResponse<RoomDetailsResponse>({}));
					const { updateRoom, wrapper, roomId } = setup({ allowedOperations: { updateRoom: true } });
					updateRoom.mockResolvedValueOnce(undefined);
					await nextTick();

					const roomFormComponent = wrapper.findComponent(RoomForm);
					roomFormComponent.vm.$emit("save", { room: roomParams });
					await nextTick();

					expect(router.push).toHaveBeenCalledWith({
						name: "room-details",
						params: { id: roomId },
					});
				});

				it("should show error notification on invalid request error", async () => {
					const { updateRoom, wrapper } = setup({ allowedOperations: { updateRoom: true } });
					await nextTick();

					const apiError = {
						code: HttpStatusCode.BadRequest,
						message: "Bad Request",
					};
					updateRoom.mockRejectedValueOnce(apiError);

					const roomFormComponent = wrapper.findComponent(RoomForm);
					roomFormComponent.vm.$emit("save", { room: roomParams });
					await nextTick();

					expectNotification("error");
				});

				it("should create an application error if not due to invalid request", async () => {
					const { updateRoom, wrapper } = setup({ allowedOperations: { updateRoom: true } });
					updateRoom.mockRejectedValue({ code: HttpStatusCode.Unauthorized });

					await (wrapper.vm as unknown as typeof RoomEditPage).onSave({
						room: roomParams,
					});
					expect(useAppStore().handleApplicationError).toHaveBeenCalledWith(HttpStatusCode.Unauthorized);
				});
			});

			it("should navigate to 'rooms' on cancel", async () => {
				const { wrapper, roomId } = setup({ allowedOperations: { updateRoom: true } });
				await nextTick();

				const roomFormComponent = wrapper.findComponent(RoomForm);
				roomFormComponent.vm.$emit("cancel");

				expect(router.push).toHaveBeenCalledWith({
					name: "room-details",
					params: { id: roomId },
				});
			});
		});
	});
});
