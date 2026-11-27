import BoardImportDialog from "./BoardImportDialog.vue";
import { mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import {
	BoardImportJobFailureReason,
	BoardImportJobResponse,
	BoardImportJobStatus,
	BoardImportNoteResponse,
	BoardImportNoteType,
	BoardImportTargetType,
} from "@api-board-import";
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

	const setup = (options?: { job?: BoardImportJobResponse; hasError?: boolean; errorMessages?: string[] }) => {
		const boardImportJob = mockComposable(useBoardImportJob, {
			job: ref(options?.job),
			hasError: ref(options?.hasError ?? false),
			errorMessages: ref(options?.errorMessages ?? []),
			isStarting: ref(false),
		});
		vi.mocked(useBoardImportJob).mockReturnValue(boardImportJob);

		const targetType = BoardImportTargetType.ROOM;
		const targetId = "room-id";

		wrapper = mount(BoardImportDialog, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			props: {
				modelValue: true,
				targetType,
				targetId,
				"onUpdate:modelValue": (modelValue: boolean) => wrapper.setProps({ modelValue }),
			},
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

		it("should remove the spaces around the link", async () => {
			const { wrapper, boardImportJob, targetType, targetId } = setup();
			const link = "https://example.com/board";

			await wrapper.findComponent(VTextField).setValue(`  ${link}\n`);
			await wrapper.findComponent("[data-testid='board-import-dialog-confirm']").trigger("click");

			expect(boardImportJob.startImport).toHaveBeenCalledWith(link, targetType, targetId);
		});

		it("should disable the start button while the link has only spaces", async () => {
			const { wrapper } = setup();

			await wrapper.findComponent(VTextField).setValue("   ");
			const startButton = wrapper.findComponent("[data-testid='board-import-dialog-confirm']");

			expect(startButton.attributes("disabled")).toBeDefined();
		});
	});

	describe("when an import was started", () => {
		it("should show the id and the status of the job", () => {
			const job = { id: "job-id", status: BoardImportJobStatus.RUNNING, notes: [] };
			const { wrapper } = setup({ job });

			expect(document.querySelector("[data-testid='board-import-job-id']")?.textContent).toBe(job.id);
			expect(document.querySelector("[data-testid='board-import-job-status']")?.textContent?.trim()).toBe(job.status);
			expect(document.querySelector("[data-testid='board-import-progress']")).not.toBeNull();
			expect(wrapper.findComponent("[data-testid='board-import-link']").exists()).toBe(false);
		});
	});

	describe("when the running job has a progress", () => {
		const setupProgress = () => {
			const progress = { total: 8, imported: 2 };
			setup({ job: { id: "job-id", status: BoardImportJobStatus.RUNNING, notes: [], progress } });
			const progressBar = document.querySelector("[data-testid='board-import-progress']");
			const progressCount = document.querySelector("[data-testid='board-import-progress-count']");

			return { progressBar, progressCount };
		};

		it("should show the progress as a part of the progress bar", () => {
			const { progressBar } = setupProgress();

			expect(progressBar?.getAttribute("aria-valuenow")).toBe("25");
		});

		it("should show the count of the imported sections and cards", () => {
			const { progressCount } = setupProgress();

			expect(progressCount?.textContent?.trim()).toBe("feature-board-import.dialog.progress");
		});
	});

	describe("when the running job has no progress", () => {
		it("should show a progress bar without a value and no count", () => {
			setup({ job: { id: "job-id", status: BoardImportJobStatus.RUNNING, notes: [] } });

			const progressBar = document.querySelector("[data-testid='board-import-progress']");

			expect(progressBar?.getAttribute("aria-valuenow")).toBeNull();
			expect(document.querySelector("[data-testid='board-import-progress-count']")).toBeNull();
		});
	});

	describe("when the plan of the job has no sections", () => {
		it("should show a progress bar without a value", () => {
			const progress = { total: 0, imported: 0 };
			setup({ job: { id: "job-id", status: BoardImportJobStatus.RUNNING, notes: [], progress } });

			const progressBar = document.querySelector("[data-testid='board-import-progress']");

			expect(progressBar?.getAttribute("aria-valuenow")).toBeNull();
		});
	});

	describe("when the import ended", () => {
		it("should still show the count of the imported sections and cards", () => {
			const progress = { total: 8, imported: 8 };
			setup({ job: { id: "job-id", status: BoardImportJobStatus.FINISHED, notes: [], progress } });

			expect(document.querySelector("[data-testid='board-import-progress-count']")).not.toBeNull();
		});

		it("should not show the progress bar", () => {
			setup({ job: { id: "job-id", status: BoardImportJobStatus.FINISHED, notes: [] } });

			expect(document.querySelector("[data-testid='board-import-progress']")).toBeNull();
		});
	});

	describe("when the import is running", () => {
		it("should show no failure and no notes", () => {
			setup({ job: { id: "job-id", status: BoardImportJobStatus.RUNNING, notes: [] } });

			expect(document.querySelector("[data-testid='board-import-failure']")).toBeNull();
			expect(document.querySelector("[data-testid='board-import-notes']")).toBeNull();
		});
	});

	describe("when the import finished", () => {
		const setupFinished = (notes: BoardImportNoteResponse[]) => {
			setup({ job: { id: "job-id", status: BoardImportJobStatus.FINISHED, notes } });
			const noteTexts = [...document.querySelectorAll("[data-testid='board-import-note']")].map((note) =>
				note.textContent?.trim()
			);

			return { noteTexts };
		};

		it("should show that there are no notes when the job has none", () => {
			const { noteTexts } = setupFinished([]);

			expect(noteTexts).toEqual([]);
			expect(document.querySelector("[data-testid='board-import-no-notes']")).not.toBeNull();
		});

		it("should show one entry for each note", () => {
			const { noteTexts } = setupFinished([
				{ type: BoardImportNoteType.BOARD_TITLE_SHORTENED },
				{ type: BoardImportNoteType.BOARD_DESCRIPTION_LEFT_OUT },
				{ type: BoardImportNoteType.ELEMENT_LEFT_OUT, sectionTitle: "Section", cardTitle: "Card", elementType: "link" },
			]);

			expect(noteTexts).toEqual([
				"feature-board-import.dialog.notes.boardTitleShortened",
				"feature-board-import.dialog.notes.boardDescriptionLeftOut",
				"feature-board-import.dialog.notes.elementLeftOut",
			]);
			expect(document.querySelector("[data-testid='board-import-no-notes']")).toBeNull();
		});

		it("should show no failure", () => {
			setupFinished([]);

			expect(document.querySelector("[data-testid='board-import-failure']")).toBeNull();
		});
	});

	describe("when the import failed", () => {
		const setupFailed = (failureReason?: BoardImportJobFailureReason) => {
			setup({ job: { id: "job-id", status: BoardImportJobStatus.FAILED, failureReason, notes: [] } });
			const failureText = document.querySelector("[data-testid='board-import-failure']")?.textContent?.trim();

			return { failureText };
		};

		it("should show the text of the failure reason", () => {
			const { failureText } = setupFailed(BoardImportJobFailureReason.SOURCE_NOT_READABLE);

			expect(failureText).toBe("feature-board-import.dialog.failure.sourceNotReadable");
		});

		it("should show no notes", () => {
			setupFailed();

			expect(document.querySelector("[data-testid='board-import-notes']")).toBeNull();
		});
	});

	describe("when a request failed", () => {
		it("should show the generic error when the backend gave no message", () => {
			const { wrapper } = setup({ hasError: true });

			const alert = wrapper.findComponent("[data-testid='board-import-error']");

			expect(alert.text()).toContain("feature-board-import.dialog.error");
		});

		it("should show the messages of the backend", () => {
			const errorMessages = ["Forbidden: Feature disabled", "link: must be a URL"];
			const { wrapper } = setup({ hasError: true, errorMessages });

			const alert = wrapper.findComponent("[data-testid='board-import-error']");

			expect(alert.text()).toContain(errorMessages[0]);
			expect(alert.text()).toContain(errorMessages[1]);
			expect(alert.text()).not.toContain("feature-board-import.dialog.error");
		});

		it("should not show the progress bar when the status could not be read", () => {
			setup({ job: { id: "job-id", status: BoardImportJobStatus.RUNNING, notes: [] }, hasError: true });

			expect(document.querySelector("[data-testid='board-import-progress']")).toBeNull();
		});
	});

	describe("when the dialog is closed", () => {
		it("should reset the job and close", async () => {
			const { wrapper, boardImportJob } = setup();

			await wrapper.findComponent("[data-testid='board-import-dialog-cancel']").trigger("click");

			expect(boardImportJob.reset).toHaveBeenCalled();
			expect(wrapper.emitted("update:modelValue")).toEqual([[false]]);
		});

		it("should reset the job when the dialog closes without the close button", async () => {
			const { wrapper, boardImportJob } = setup();

			await wrapper.setProps({ modelValue: false });

			expect(boardImportJob.reset).toHaveBeenCalled();
		});

		it("should emit imported when the import finished", async () => {
			const { wrapper } = setup({ job: { id: "job-id", status: BoardImportJobStatus.FINISHED, notes: [] } });

			await wrapper.setProps({ modelValue: false });

			expect(wrapper.emitted("imported")).toHaveLength(1);
		});

		it("should not emit imported when the import did not finish", async () => {
			const { wrapper } = setup({ job: { id: "job-id", status: BoardImportJobStatus.FAILED, notes: [] } });

			await wrapper.setProps({ modelValue: false });

			expect(wrapper.emitted("imported")).toBeUndefined();
		});
	});
});
