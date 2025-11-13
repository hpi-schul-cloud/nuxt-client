import { CopyApiResponseStatusEnum, CopyApiResponseTypeEnum } from "@/serverApi/v3";
import LoadingStateModule from "@/store/loading-state";
import { createTestRoomStore, expectNotification, mockApiResponse, roomFactory } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoomCopyFlow } from "@feature-room";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { nextTick } from "vue";

describe("@feature-room/RoomCopyFlow", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const mountComponent = async () => {
		const { roomStore } = createTestRoomStore();

		roomStore.copyRoom.mockResolvedValue({
			result: mockApiResponse({
				data: {
					id: "copyId",
					type: CopyApiResponseTypeEnum.Room,
					status: CopyApiResponseStatusEnum.Success,
				},
			}),
			success: true,
		});

		const loadingStateModuleMock = createModuleMocks(LoadingStateModule);
		const room = roomFactory.build();

		const wrapper = mount(RoomCopyFlow, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					["loadingStateModule"]: loadingStateModuleMock,
				},
			},
			props: {
				room,
			},
		});

		// allow components to render
		await nextTick();

		const infoDialog = wrapper.findComponent({ name: "RoomCopyInfoDialog" });

		return {
			wrapper,
			infoDialog,
			loadingStateModuleMock,
			roomStore,
			room,
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
			const { room, roomStore } = await setupWithConfirm();
			expect(roomStore.copyRoom).toHaveBeenCalledWith(room.id);
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
			await setupWithApiSuccess();
			expectNotification("success");
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
			const { infoDialog, roomStore, ...rest } = await mountComponent();

			roomStore.copyRoom.mockResolvedValue({
				result: mockApiResponse({
					data: {
						id: "copyId",
						type: CopyApiResponseTypeEnum.Room,
						status: CopyApiResponseStatusEnum.Failure,
					},
				}),
				success: true,
			});

			await infoDialog.vm.$emit("copy:confirm");
			await flushPromises(); // wait for ref to be updated

			return { infoDialog, roomStore, ...rest };
		};

		it("should close the loading dialog", async () => {
			const { loadingStateModuleMock } = await setupWithFailure();

			expect(loadingStateModuleMock.close).toHaveBeenCalled();
		});

		it("should show a failure notification", async () => {
			await setupWithFailure();
			expectNotification("error");
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
			const { infoDialog, roomStore, ...rest } = await mountComponent();

			roomStore.copyRoom.mockResolvedValue({
				result: mockApiResponse({
					data: {
						id: undefined,
						type: CopyApiResponseTypeEnum.Room,
						status: CopyApiResponseStatusEnum.Success,
					},
				}),
				success: true,
			});

			await infoDialog.vm.$emit("copy:confirm");
			await flushPromises(); // wait for ref to be updated

			return { infoDialog, roomStore, ...rest };
		};

		it("should close the loading dialog", async () => {
			const { loadingStateModuleMock } = await setupWithNoId();

			expect(loadingStateModuleMock.close).toHaveBeenCalled();
		});

		it("should show a failure notification", async () => {
			await setupWithNoId();
			expectNotification("error");
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
			const { infoDialog, roomStore, ...rest } = await mountComponent();

			roomStore.copyRoom.mockResolvedValue({ error: new Error("API call failed"), success: false });

			await infoDialog.vm.$emit("copy:confirm");
			await flushPromises(); // wait for ref to be updated

			return { infoDialog, roomStore, ...rest };
		};

		it("should close the loading dialog", async () => {
			const { loadingStateModuleMock } = await setupWithError();

			expect(loadingStateModuleMock.close).toHaveBeenCalled();
		});

		it("should show a timeout info notification", async () => {
			await setupWithError();
			expectNotification("info");
		});

		it("should emit 'copy:ended' event", async () => {
			const { wrapper } = await setupWithError();

			expect(wrapper.emitted("copy:ended")).toHaveLength(1);
		});
	});
});
