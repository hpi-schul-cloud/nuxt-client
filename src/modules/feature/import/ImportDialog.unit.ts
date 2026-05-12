import ImportDialog from "./ImportDialog.vue";
import { type CopyWarning, useImportContent } from "@/composables/copy-content.composable";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ShareTokenInfoResponse, ShareTokenInfoResponseParentType } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { computed, nextTick } from "vue";
import { VSelect, VTextField } from "vuetify/components";

vi.mock("@/composables/copy-content.composable");

describe("ImportDialog", () => {
	let wrapper: ReturnType<typeof mount>;

	afterEach(() => wrapper?.unmount());

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		vi.mocked(useImportContent).mockReturnValue({
			text: computed(() => "Import text"),
			warnings: computed(() => []),
			info: computed(() => ""),
			itemNameKey: computed(() => "unknown"),
		} as Mocked<ReturnType<typeof useImportContent>>);
	});

	const buildShareTokenInfo = (
		parentType: ShareTokenInfoResponseParentType = ShareTokenInfoResponseParentType.LESSONS,
		parentName = "My Lesson"
	): ShareTokenInfoResponse => ({
		token: "token-123",
		parentType,
		parentName,
	});

	const destinations = [
		{ id: "dest-1", name: "Destination 1" },
		{ id: "dest-2", name: "Destination 2" },
	];

	const setup = (
		options: Partial<{
			shareTokenInfo: ShareTokenInfoResponse;
			availableDestinations: { id: string; name: string }[];
			destinationType: "room" | "course";
			isDialogOpen: boolean;
		}> = {}
	) => {
		const {
			shareTokenInfo = buildShareTokenInfo(),
			availableDestinations = destinations,
			destinationType = "course",
			isDialogOpen = true,
		} = options;

		wrapper = mount(ImportDialog, {
			props: {
				shareTokenInfo,
				availableDestinations,
				destinationType,
				"is-dialog-open": isDialogOpen,
			},
			global: {
				stubs: { UseFocusTrap: true },
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			attachTo: document.body,
		});

		return { wrapper };
	};

	describe("rendering", () => {
		it("renders the dialog", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(SvsDialog).exists()).toBe(true);
		});

		it("renders the info text element", () => {
			setup();
			expect(document.querySelector("[data-testid=import-dialog-info-text]")).not.toBeNull();
		});
	});

	describe("select step", () => {
		it.each([
			ShareTokenInfoResponseParentType.LESSONS,
			ShareTokenInfoResponseParentType.TASKS,
			ShareTokenInfoResponseParentType.COLUMN_BOARD,
		])("starts on select step for parentType %s", (parentType) => {
			const { wrapper } = setup({ shareTokenInfo: buildShareTokenInfo(parentType) });
			expect(wrapper.findComponent(VSelect).exists()).toBe(true);
		});

		it("disables the confirm button when no destination is selected", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(SvsDialog).props("confirmBtnDisabled")).toBe(true);
		});

		it("enables the confirm button when a destination is selected", async () => {
			const { wrapper } = setup();
			await wrapper.findComponent(VSelect).vm.$emit("update:modelValue", "dest-1");
			await nextTick();
			expect(wrapper.findComponent(SvsDialog).props("confirmBtnDisabled")).toBe(false);
		});

		it("shows 'continue' as the confirm button label", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(SvsDialog).props("confirmBtnLangKey")).toBe("common.actions.continue");
		});

		it("advances to the rename step when confirm is triggered with a destination selected", async () => {
			const { wrapper } = setup();
			await wrapper.findComponent(VSelect).vm.$emit("update:modelValue", "dest-1");
			await nextTick();
			wrapper.findComponent(SvsDialog).vm.$emit("confirm");
			await nextTick();
			expect(wrapper.findComponent(VSelect).exists()).toBe(false);
			expect(wrapper.findComponent(VTextField).exists()).toBe(true);
		});
	});

	describe("rename step", () => {
		it.each([ShareTokenInfoResponseParentType.COURSES, ShareTokenInfoResponseParentType.ROOM])(
			"starts directly on the rename step for parentType %s",
			(parentType) => {
				const { wrapper } = setup({ shareTokenInfo: buildShareTokenInfo(parentType) });
				expect(wrapper.findComponent(VSelect).exists()).toBe(false);
				expect(wrapper.findComponent(VTextField).exists()).toBe(true);
			}
		);

		it("pre-fills the name input with the parentName", () => {
			const { wrapper } = setup({
				shareTokenInfo: buildShareTokenInfo(ShareTokenInfoResponseParentType.COURSES, "My Course"),
			});
			expect(wrapper.findComponent(VTextField).props("modelValue")).toBe("My Course");
		});

		it("shows 'import' as the confirm button label", () => {
			const { wrapper } = setup({
				shareTokenInfo: buildShareTokenInfo(ShareTokenInfoResponseParentType.COURSES),
			});
			expect(wrapper.findComponent(SvsDialog).props("confirmBtnLangKey")).toBe("common.actions.import");
		});

		it("disables the confirm button when the name is cleared", async () => {
			const { wrapper } = setup({
				shareTokenInfo: buildShareTokenInfo(ShareTokenInfoResponseParentType.COURSES),
			});
			await wrapper.findComponent(VTextField).vm.$emit("update:modelValue", "");
			await nextTick();
			expect(wrapper.findComponent(SvsDialog).props("confirmBtnDisabled")).toBe(true);
		});

		it("emits confirm with the current name and no destination for single-step types", async () => {
			const { wrapper } = setup({
				shareTokenInfo: buildShareTokenInfo(ShareTokenInfoResponseParentType.COURSES, "My Course"),
			});
			wrapper.findComponent(SvsDialog).vm.$emit("confirm");
			await nextTick();
			expect(wrapper.emitted("confirm")).toEqual([[{ newName: "My Course", destination: undefined }]]);
		});

		it("shows WarningAlert when warnings are present", () => {
			const mockWarning: CopyWarning = { testId: "warn-1", text: "Warning text" };
			vi.mocked(useImportContent).mockReturnValue({
				text: computed(() => "Import text"),
				warnings: computed(() => [mockWarning]),
				info: computed(() => ""),
				itemNameKey: computed(() => "unknown"),
			} as Mocked<ReturnType<typeof useImportContent>>);
			const { wrapper } = setup({
				shareTokenInfo: buildShareTokenInfo(ShareTokenInfoResponseParentType.COURSES),
			});
			expect(wrapper.findComponent(WarningAlert).exists()).toBe(true);
		});

		it("does not show WarningAlert when there are no warnings", () => {
			const { wrapper } = setup({
				shareTokenInfo: buildShareTokenInfo(ShareTokenInfoResponseParentType.COURSES),
			});
			expect(wrapper.findComponent(WarningAlert).exists()).toBe(false);
		});
	});

	describe("full two-step flow", () => {
		it("emits confirm with name and destination after completing both steps", async () => {
			const { wrapper } = setup({
				shareTokenInfo: buildShareTokenInfo(ShareTokenInfoResponseParentType.LESSONS, "My Lesson"),
			});

			// Step 1: select a destination and advance
			await wrapper.findComponent(VSelect).vm.$emit("update:modelValue", "dest-1");
			await nextTick();
			wrapper.findComponent(SvsDialog).vm.$emit("confirm");
			await nextTick();

			// Step 2: confirm on rename step
			wrapper.findComponent(SvsDialog).vm.$emit("confirm");
			await nextTick();

			expect(wrapper.emitted("confirm")).toEqual([
				[{ newName: "My Lesson", destination: { type: "course", id: "dest-1" } }],
			]);
		});
	});

	describe("cancel", () => {
		it("emits the cancel event when the dialog is cancelled", async () => {
			const { wrapper } = setup();
			wrapper.findComponent(SvsDialog).vm.$emit("cancel");
			await nextTick();
			expect(wrapper.emitted("cancel")).toHaveLength(1);
		});
	});

	describe("dialog reset", () => {
		it("disables the confirm button again after after-leave resets state", async () => {
			const { wrapper } = setup();
			// Select a destination to make confirm enabled
			await wrapper.findComponent(VSelect).vm.$emit("update:modelValue", "dest-1");
			await nextTick();
			expect(wrapper.findComponent(SvsDialog).props("confirmBtnDisabled")).toBe(false);

			// Trigger after-leave reset
			wrapper.findComponent(SvsDialog).vm.$emit("after-leave");
			await nextTick();

			expect(wrapper.findComponent(SvsDialog).props("confirmBtnDisabled")).toBe(true);
		});
	});
});
