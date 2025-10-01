import { CopyApiResponseStatusEnum, CopyApiResponseTypeEnum, RoomApiFactory } from "@/serverApi/v3";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import { ApplicationError } from "@/store/types/application-error";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { mockApiResponse, roomFactory } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoomCopyFlow } from "@feature-room";
import { createMock } from "@golevelup/ts-vitest";
import { flushPromises } from "@vue/test-utils";
import { Mock } from "vitest";
import { nextTick } from "vue";

vi.mock("@/serverApi/v3", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@/serverApi/v3")>();
	return {
		...actual,
		RoomApiFactory: vi.fn(),
	};
});

describe("@feature-room/RoomCopyFlow", () => {
	const mountComponent = async () => {
		const notifierModuleMock = createModuleMocks(NotifierModule);
		const loadingStateModuleMock = createModuleMocks(LoadingStateModule);
		const room = roomFactory.build();
		const errorHandler = vi.fn();

		const roomApiMock = createMock<ReturnType<typeof RoomApiFactory>>();
		(RoomApiFactory as Mock).mockReturnValue(roomApiMock);
		roomApiMock.roomControllerCopyRoom.mockResolvedValue(
			mockApiResponse({
				data: {
					id: "copyId",
					type: CopyApiResponseTypeEnum.Room,
					status: CopyApiResponseStatusEnum.Success,
				},
			})
		);

		const wrapper = mount(RoomCopyFlow, {
			global: {
				config: {
					errorHandler,
				},
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModuleMock,
					["loadingStateModule"]: loadingStateModuleMock,
				},
			},
			props: {
				room,
			},
		});
		// allow components to render
		await nextTick();

		const infoDialog = wrapper.findComponent({
			name: "RoomCopyInfoDialog",
		});

		return {
			wrapper,
			errorHandler,
			infoDialog,
			notifierModuleMock,
			loadingStateModuleMock,
			room,
			roomApiMock,
		};
	};

	describe("when mounted", () => {
		it("should open the info dialog", async () => {
			const { infoDialog } = await mountComponent();

			expect(infoDialog.exists()).toBe(true);
		});
	});

	describe("when the dialog cancel button is clicked", () => {
		const setupWithCancel = async () => {
			const { infoDialog, ...rest } = await mountComponent();
			await infoDialog.vm.$emit("copy:cancel");

			return { infoDialog, ...rest };
		};

		it("should close the dialog", async () => {
			const { infoDialog } = await setupWithCancel();

			expect(infoDialog.exists()).toBe(false);
		});

		it("should emit 'copy:cancel' event", async () => {
			const { wrapper } = await setupWithCancel();

			expect(wrapper.emitted("copy:cancel")).toHaveLength(1);
		});

		it("should emit 'copy:ended' event", async () => {
			const { wrapper } = await setupWithCancel();

			expect(wrapper.emitted("copy:ended")).toHaveLength(1);
		});
	});

	describe("when the dialog confirm button is clicked", () => {
		const setupWithConfirm = async () => {
			const { infoDialog, ...rest } = await mountComponent();

			await infoDialog.vm.$emit("copy:confirm");
			await flushPromises(); // wait for ref to be updated

			return { infoDialog, ...rest };
		};

		it("should close the dialog", async () => {
			const { infoDialog } = await setupWithConfirm();

			expect(infoDialog.exists()).toBe(false);
		});

		it("should open the loading dialog", async () => {
			const { loadingStateModuleMock } = await setupWithConfirm();

			expect(loadingStateModuleMock.open).toHaveBeenCalledWith({
				text: "data-room.copy.loading",
			});
		});

		it("should call the api", async () => {
			const { room, roomApiMock } = await setupWithConfirm();

			expect(roomApiMock.roomControllerCopyRoom).toHaveBeenCalledWith(room.id);
		});
	});

	describe("when the api call is successful", () => {
		const setupWithApiSuccess = async () => {
			const { infoDialog, ...rest } = await mountComponent();

			await infoDialog.vm.$emit("copy:confirm");
			await flushPromises(); // wait for ref to be updated

			return { infoDialog, ...rest };
		};

		it("should close the loading dialog", async () => {
			const { loadingStateModuleMock } = await setupWithApiSuccess();

			expect(loadingStateModuleMock.close).toHaveBeenCalled();
		});

		it("should show a success notification", async () => {
			const { notifierModuleMock } = await setupWithApiSuccess();

			expect(notifierModuleMock.show).toHaveBeenCalledWith(expect.objectContaining({ status: "success" }));
		});

		it("should emit 'copy:success' event", async () => {
			const { wrapper } = await setupWithApiSuccess();

			expect(wrapper.emitted("copy:success")).toHaveLength(1);
		});

		it("should emit 'copy:ended' event", async () => {
			const { wrapper } = await setupWithApiSuccess();

			expect(wrapper.emitted("copy:ended")).toHaveLength(1);
		});
	});

	describe("when the api call fails by status", () => {
		const setupWithFailure = async () => {
			const { infoDialog, roomApiMock, ...rest } = await mountComponent();

			roomApiMock.roomControllerCopyRoom.mockResolvedValue(
				mockApiResponse({
					data: {
						id: "copyId",
						type: CopyApiResponseTypeEnum.Room,
						status: CopyApiResponseStatusEnum.Failure,
					},
				})
			);

			await infoDialog.vm.$emit("copy:confirm");
			await flushPromises(); // wait for ref to be updated

			return { infoDialog, roomApiMock, ...rest };
		};

		it("should close the loading dialog", async () => {
			const { loadingStateModuleMock } = await setupWithFailure();

			expect(loadingStateModuleMock.close).toHaveBeenCalled();
		});

		it("should show a failure notification", async () => {
			const { notifierModuleMock } = await setupWithFailure();

			expect(notifierModuleMock.show).toHaveBeenCalledWith(expect.objectContaining({ status: "error" }));
		});

		it("should emit 'copy:error' event", async () => {
			const { wrapper } = await setupWithFailure();

			expect(wrapper.emitted("copy:error")).toHaveLength(1);
		});

		it("should emit 'copy:ended' event", async () => {
			const { wrapper } = await setupWithFailure();

			expect(wrapper.emitted("copy:ended")).toHaveLength(1);
		});
	});

	describe("when the api returns no id", () => {
		const setupWithNoId = async () => {
			const { infoDialog, roomApiMock, ...rest } = await mountComponent();

			roomApiMock.roomControllerCopyRoom.mockResolvedValue(
				mockApiResponse({
					data: {
						id: undefined,
						type: CopyApiResponseTypeEnum.Room,
						status: CopyApiResponseStatusEnum.Success,
					},
				})
			);

			await infoDialog.vm.$emit("copy:confirm");
			await flushPromises(); // wait for ref to be updated

			return { infoDialog, roomApiMock, ...rest };
		};

		it("should close the loading dialog", async () => {
			const { loadingStateModuleMock } = await setupWithNoId();

			expect(loadingStateModuleMock.close).toHaveBeenCalled();
		});

		it("should show a failure notification", async () => {
			const { notifierModuleMock } = await setupWithNoId();

			expect(notifierModuleMock.show).toHaveBeenCalledWith(expect.objectContaining({ status: "error" }));
		});

		it("should emit 'copy:error' event", async () => {
			const { wrapper } = await setupWithNoId();

			expect(wrapper.emitted("copy:error")).toHaveLength(1);
		});

		it("should emit 'copy:ended' event", async () => {
			const { wrapper } = await setupWithNoId();

			expect(wrapper.emitted("copy:ended")).toHaveLength(1);
		});
	});

	describe("when the api throws an error", () => {
		const setupWithError = async () => {
			const { infoDialog, roomApiMock, ...rest } = await mountComponent();

			roomApiMock.roomControllerCopyRoom.mockRejectedValue(new Error("API call failed"));

			await infoDialog.vm.$emit("copy:confirm");
			await flushPromises(); // wait for ref to be updated

			return { infoDialog, roomApiMock, ...rest };
		};

		it("should close the loading dialog", async () => {
			const { loadingStateModuleMock } = await setupWithError();

			expect(loadingStateModuleMock.close).toHaveBeenCalled();
		});

		it("should show a timeout info notification", async () => {
			const { notifierModuleMock } = await setupWithError();

			expect(notifierModuleMock.show).toHaveBeenCalledWith(expect.objectContaining({ status: "info" }));
		});

		it("should throw an application error", async () => {
			const { errorHandler } = await setupWithError();

			expect(errorHandler).toHaveBeenCalled();
			const firstCallArgs = errorHandler.mock.calls[0];
			expect(firstCallArgs[0]).toBeInstanceOf(ApplicationError);
		});

		it("should emit 'copy:ended' event", async () => {
			const { wrapper } = await setupWithError();

			expect(wrapper.emitted("copy:ended")).toHaveLength(1);
		});
	});
});
