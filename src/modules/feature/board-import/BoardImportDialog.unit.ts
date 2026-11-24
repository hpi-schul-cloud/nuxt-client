import BoardImportDialog from "./BoardImportDialog.vue";
import { mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { BoardImportJobResponse, BoardImportJobStatus, BoardImportTargetType } from "@api-board-import";
import { useBoardImportJob } from "@data-board-import";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { ref } from "vue";
import { VTextField } from "vuetify/components";

vi.mock("@data-board-import");

describe("@feature-board-import/BoardImportDialog", () => {
	let wrapper: ReturnType<typeof mount>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	afterEach(() => {
		wrapper?.unmount();
		vi.clearAllMocks();
	});

	const setup = (options?: { job?: BoardImportJobResponse; hasError?: boolean }) => {
		const boardImportJob = mockComposable(useBoardImportJob, {
			job: ref(options?.job),
			hasError: ref(options?.hasError ?? false),
			isStarting: ref(false),
		});
		vi.mocked(useBoardImportJob).mockReturnValue(boardImportJob);

		const targetType = BoardImportTargetType.ROOM;
		const targetId = "room-id";

		wrapper = mount(BoardImportDialog, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			props: { modelValue: true, targetType, targetId },
			attachTo: document.body,
		});

		return { wrapper, boardImportJob, targetType, targetId };
	};

	describe("when no import was started", () => {
		it("should disable the start button while the link is empty", () => {
			const { wrapper } = setup();

			const startButton = wrapper.findComponent("[data-testid='board-import-dialog-confirm']");

			expect(startButton.attributes("disabled")).toBeDefined();
		});

		it("should start the import with the link and the target", async () => {
			const { wrapper, boardImportJob, targetType, targetId } = setup();
			const link = "https://example.com/board";

			await wrapper.findComponent(VTextField).setValue(link);
			await wrapper.findComponent("[data-testid='board-import-dialog-confirm']").trigger("click");

			expect(boardImportJob.startImport).toHaveBeenCalledWith(link, targetType, targetId);
		});
	});

	describe("when an import was started", () => {
		it("should show the id and the status of the job", () => {
			const job = { id: "job-id", status: BoardImportJobStatus.RUNNING };
			const { wrapper } = setup({ job });

			expect(document.querySelector("[data-testid='board-import-job-id']")?.textContent).toBe(job.id);
			expect(document.querySelector("[data-testid='board-import-job-status']")?.textContent?.trim()).toBe(job.status);
			expect(document.querySelector("[data-testid='board-import-progress']")).not.toBeNull();
			expect(wrapper.findComponent("[data-testid='board-import-link']").exists()).toBe(false);
		});
	});

	describe("when the import ended", () => {
		it("should not show the progress bar", () => {
			setup({ job: { id: "job-id", status: BoardImportJobStatus.FINISHED } });

			expect(document.querySelector("[data-testid='board-import-progress']")).toBeNull();
		});
	});

	describe("when a request failed", () => {
		it("should show an error", () => {
			const { wrapper } = setup({ hasError: true });

			expect(wrapper.findComponent("[data-testid='board-import-error']").exists()).toBe(true);
		});
	});

	describe("when the dialog is closed", () => {
		it("should reset the job and close", async () => {
			const { wrapper, boardImportJob } = setup();

			await wrapper.findComponent("[data-testid='board-import-dialog-cancel']").trigger("click");

			expect(boardImportJob.reset).toHaveBeenCalled();
			expect(wrapper.emitted("update:modelValue")).toEqual([[false]]);
		});
	});
});
