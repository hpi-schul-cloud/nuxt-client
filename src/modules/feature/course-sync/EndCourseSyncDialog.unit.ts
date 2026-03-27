import EndCourseSyncDialog from "./EndCourseSyncDialog.vue";
import { expectNotification, mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useCourseApi } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

vi.mock("@data-room");

describe("EndCourseSyncDialog", () => {
	let courseApiMock: Mocked<ReturnType<typeof useCourseApi>>;

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
		courseApiMock = mockComposable(useCourseApi);

		vi.mocked(useCourseApi).mockReturnValue(courseApiMock);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when clicking on confirm", () => {
		it("should call the api", async () => {
			const { wrapper } = getWrapper();

			const dialog = wrapper.findComponent(SvsDialog);
			dialog.vm.$emit("confirm");

			expect(courseApiMock.stopSynchronization).toHaveBeenCalledWith("courseId");
		});

		it("should show a success notification", async () => {
			const { wrapper } = getWrapper();

			const dialog = wrapper.findComponent(SvsDialog);
			await dialog.vm.$emit("confirm");

			expectNotification("success");
		});

		it("should emit a success event", async () => {
			const { wrapper } = getWrapper();

			const dialog = wrapper.findComponent(SvsDialog);
			await dialog.vm.$emit("confirm");

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

			const dialog = wrapper.findComponent(SvsDialog);
			await dialog.vm.$emit("confirm");

			expectNotification("error");
		});

		it("should not emit a success event", async () => {
			const { wrapper } = setup();

			const dialog = wrapper.findComponent(SvsDialog);
			await dialog.vm.$emit("confirm");

			expect(wrapper.emitted("success")).toBeUndefined();
		});
	});
});
