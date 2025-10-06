import EndCourseSyncDialog from "./EndCourseSyncDialog.vue";
import { expectNotification } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useCourseApi } from "@data-room";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";

vi.mock("@data-room");

describe("EndCourseSyncDialog", () => {
	let courseApiMock: DeepMocked<ReturnType<typeof useCourseApi>>;

	const getWrapper = () => {
		const wrapper = mount(EndCourseSyncDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				isOpen: true,
				courseName: "testCourseName",
				groupName: "testGroupName",
				courseId: "courseId",
			},
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		courseApiMock = createMock<ReturnType<typeof useCourseApi>>();

		vi.mocked(useCourseApi).mockReturnValue(courseApiMock);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when clicking on cancel", () => {
		it("should close the dialog", async () => {
			const { wrapper } = getWrapper();

			const cancelBtn = wrapper.findComponent("[data-testid=dialog-cancel]");
			await cancelBtn.trigger("click");

			expect(wrapper.vm.isOpen).toEqual(false);
			expect(wrapper.emitted("update:isOpen")).toBeDefined();
		});
	});

	describe("when clicking on confirm", () => {
		it("should close the dialog", async () => {
			const { wrapper } = getWrapper();

			const confirmBtn = wrapper.findComponent("[data-testid=dialog-confirm]");
			await confirmBtn.trigger("click");

			expect(wrapper.vm.isOpen).toEqual(false);
			expect(wrapper.emitted("update:isOpen")).toBeDefined();
		});

		it("should call the api", async () => {
			const { wrapper } = getWrapper();

			const confirmBtn = wrapper.findComponent("[data-testid=dialog-confirm]");
			await confirmBtn.trigger("click");

			expect(courseApiMock.stopSynchronization).toHaveBeenCalledWith("courseId");
		});

		it("should show a success notification", async () => {
			const { wrapper } = getWrapper();

			const confirmBtn = wrapper.findComponent("[data-testid=dialog-confirm]");
			await confirmBtn.trigger("click");

			expectNotification("success");
		});

		it("should emit a success event", async () => {
			const { wrapper } = getWrapper();

			const confirmBtn = wrapper.findComponent("[data-testid=dialog-confirm]");
			await confirmBtn.trigger("click");

			expect(wrapper.emitted("success")).toBeDefined();
		});
	});

	describe("when the stopping fails", () => {
		const setup = () => {
			const { wrapper } = getWrapper();

			courseApiMock.stopSynchronization.mockRejectedValueOnce(new Error());

			return {
				wrapper,
			};
		};

		it("should show an error notification", async () => {
			const { wrapper } = setup();

			const confirmBtn = wrapper.findComponent("[data-testid=dialog-confirm]");
			await confirmBtn.trigger("click");

			expectNotification("error");
		});

		it("should not emit a success event", async () => {
			const { wrapper } = setup();

			const confirmBtn = wrapper.findComponent("[data-testid=dialog-confirm]");
			await confirmBtn.trigger("click");

			expect(wrapper.emitted("success")).toBeUndefined();
		});
	});
});
