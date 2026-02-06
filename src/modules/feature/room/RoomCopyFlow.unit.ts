import { CopyApiResponseStatusEnum, CopyApiResponseTypeEnum } from "@/serverApi/v3";
import {
	createTestRoomStore,
	expectNotification,
	mockApiResponse,
	mockedPiniaStoreTyping,
	roomFactory,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useLoadingStore } from "@data-app";
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

		const loadingStore = mockedPiniaStoreTyping(useLoadingStore);
		const room = roomFactory.build();

		const wrapper = mount(RoomCopyFlow, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
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
			loadingStore,
			roomStore,
			room,
		};
	};

	describe("when mounted", () => {
		it("should open the info dialog", async () => {
			const { infoDialog } = await mountComponent();

			expect(infoDialog.exists()).toBe(true);
		});

		it("should set loading state to false", async () => {
			const { loadingStore } = await mountComponent();

			expect(loadingStore.setLoadingState).toHaveBeenCalledWith(false);
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

		it("should set the loading status to true with the correct message", async () => {
			const { loadingStore } = await setupWithConfirm();

			expect(loadingStore.setLoadingState).toHaveBeenCalledWith(true, "data-room.copy.loading");
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

		it("should set the loading status to false", async () => {
			const { loadingStore } = await setupWithApiSuccess();

			expect(loadingStore.setLoadingState).toHaveBeenNthCalledWith(3, false);
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

		it("should set the loading status to false", async () => {
			const { loadingStore } = await setupWithFailure();

			expect(loadingStore.setLoadingState).toHaveBeenNthCalledWith(3, false);
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

		it("should set the loading status to false", async () => {
			const { loadingStore } = await setupWithNoId();

			expect(loadingStore.setLoadingState).toHaveBeenNthCalledWith(3, false);
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
			const { infoDialog, ...rest } = await mountComponent();

			await infoDialog.vm.$emit("copy:confirm");
			await flushPromises(); // wait for ref to be updated

			return { infoDialog, ...rest };
		};

		it("should set the loading status to false", async () => {
			const { loadingStore } = await setupWithError();

			expect(loadingStore.setLoadingState).toHaveBeenNthCalledWith(3, false);
		});

		it("should emit 'copy:ended' event", async () => {
			const { wrapper } = await setupWithError();

			expect(wrapper.emitted("copy:ended")).toHaveLength(1);
		});
	});
});
