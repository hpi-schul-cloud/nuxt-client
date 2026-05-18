import ShareDialog from "./ShareDialog.vue";
import ShareDialogResult from "./ShareDialogResult.vue";
import { expectNotification } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ShareTokenBodyParamsParentType } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { InfoAlert, WarningAlert } from "@ui-alert";
import { SvsDialog } from "@ui-dialog";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";

describe("@feature-share/ShareDialog", () => {
	let wrapper: ReturnType<typeof mount>;

	afterEach(() => wrapper?.unmount());

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setup = (shareItemType: ShareTokenBodyParamsParentType, extraProps: Record<string, unknown> = {}) => {
		wrapper = mount(ShareDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				shareItemType,
				"is-open": true,
				...extraProps,
			},
			attachTo: document.body,
		});

		return { wrapper };
	};

	describe("askOptions step", () => {
		it("shows two checkboxes", () => {
			const { wrapper } = setup(ShareTokenBodyParamsParentType.COURSES);

			expect(wrapper.findAllComponents({ name: "v-checkbox" })).toHaveLength(2);
		});

		it("shows the options title", () => {
			const { wrapper } = setup(ShareTokenBodyParamsParentType.COURSES);

			expect(wrapper.findComponent({ name: "v-card-title" }).text()).toContain(
				"components.molecules.share.options.title"
			);
		});

		it("shows copyright and privacy info alert", () => {
			const { wrapper } = setup(ShareTokenBodyParamsParentType.COURSES);

			expect(wrapper.findComponent(InfoAlert).text()).toBe("components.molecules.share.checkPrivacyAndCopyright");
		});

		it.each([
			ShareTokenBodyParamsParentType.COURSES,
			ShareTokenBodyParamsParentType.ROOM,
			ShareTokenBodyParamsParentType.COLUMN_BOARD,
			ShareTokenBodyParamsParentType.CARD,
			ShareTokenBodyParamsParentType.LESSONS,
		])("shows warning alert for %s", (shareItemType) => {
			const { wrapper } = setup(shareItemType);

			expect(wrapper.findComponent(WarningAlert).exists()).toBe(true);
		});

		describe("when task is shared", () => {
			it("shows copyright and privacy info alert", () => {
				const { wrapper } = setup(ShareTokenBodyParamsParentType.TASKS);

				expect(wrapper.findComponent(InfoAlert).exists()).toBe(true);
			});

			it("does not show warning alert", () => {
				const { wrapper } = setup(ShareTokenBodyParamsParentType.TASKS);

				expect(wrapper.findComponent(WarningAlert).exists()).toBe(false);
			});
		});
	});

	describe("when confirm button is clicked", () => {
		it("emits 'confirm' with default share options", async () => {
			const { wrapper } = setup(ShareTokenBodyParamsParentType.COURSES);

			wrapper.findComponent(SvsDialog).vm.$emit("confirm");
			await nextTick();

			expect(wrapper.emitted("confirm")).toEqual([[{ isSchoolInternal: true, hasExpiryDate: true }]]);
		});

		it("advances to the showResult step when shareUrl is provided", async () => {
			const { wrapper } = setup(ShareTokenBodyParamsParentType.COURSES, {
				shareUrl: "https://example.com/share",
			});

			wrapper.findComponent(SvsDialog).vm.$emit("confirm");
			await nextTick();

			expect(wrapper.findComponent(ShareDialogResult).exists()).toBe(true);
		});

		it("shows the result title after advancing to the showResult step", async () => {
			const { wrapper } = setup(ShareTokenBodyParamsParentType.COURSES, {
				shareUrl: "https://example.com/share",
			});

			wrapper.findComponent(SvsDialog).vm.$emit("confirm");
			await nextTick();

			expect(wrapper.findComponent({ name: "v-card-title" }).text()).toContain(
				"components.molecules.share.result.title"
			);
		});
	});

	describe("when cancel button is clicked in the askOptions step", () => {
		it("emits 'cancel'", async () => {
			const { wrapper } = setup(ShareTokenBodyParamsParentType.COURSES);

			wrapper.findComponent(SvsDialog).vm.$emit("cancel");
			await nextTick();

			expect(wrapper.emitted("cancel")).toBeTruthy();
		});
	});

	describe("in the showResult step", () => {
		const setupShowResult = async (shareUrl = "https://example.com/share") => {
			const { wrapper } = setup(ShareTokenBodyParamsParentType.COURSES, { shareUrl });
			wrapper.findComponent(SvsDialog).vm.$emit("confirm");
			await nextTick();

			return { wrapper };
		};

		it("emits 'done' when cancel button is clicked", async () => {
			const { wrapper } = await setupShowResult();

			wrapper.findComponent(SvsDialog).vm.$emit("cancel");
			await nextTick();

			expect(wrapper.emitted("done")).toBeTruthy();
		});

		it("emits 'done' when ShareDialogResult emits 'done'", async () => {
			const { wrapper } = await setupShowResult();

			wrapper.findComponent(ShareDialogResult).vm.$emit("done");
			await nextTick();

			expect(wrapper.emitted("done")).toBeTruthy();
		});

		it("shows a success notification when ShareDialogResult emits 'copied'", async () => {
			const { wrapper } = await setupShowResult();

			wrapper.findComponent(ShareDialogResult).vm.$emit("copied");

			expectNotification("success");
		});
	});
});
