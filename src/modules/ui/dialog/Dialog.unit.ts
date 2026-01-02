import Dialog from "./Dialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { VCard, VDialog } from "vuetify/lib/components/index";

describe("Dialog", () => {
	enableAutoUnmount(afterEach);

	describe("when the dialog isDialogOpen is true", () => {
		const setup = () => {
			const title = "title of dialog";
			const slotContent = "<div>content</div>";
			const confirmBtnLangKey = "language.key";

			const wrapper = mount(Dialog, {
				props: {
					isDialogOpen: true,
					title,
					confirmBtnLangKey,
				},
				slots: {
					content: slotContent,
				},
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					stubs: { UseFocusTrap: true },
					renderStubDefaultSlot: true, // to access content inside focus trap
				},
			});
			return { wrapper, slotContent, title, confirmBtnLangKey };
		};

		it("should render title", () => {
			const { wrapper, title } = setup();
			const card = wrapper.findComponent(VDialog).findComponent(VCard);

			expect(card.text()).toContain(title);
		});

		it("should render slot content", () => {
			const { wrapper, slotContent } = setup();
			const card = wrapper.findComponent(VDialog).findComponent(VCard);

			expect(card.html()).toContain(slotContent);
		});

		describe("when VDialog emits update:modelValue", () => {
			it("should emit update:is-dialog-open", async () => {
				const { wrapper } = setup();
				const dialog = wrapper.findComponent(VDialog);

				await dialog.vm.$emit("update:modelValue", false);

				expect(wrapper.emitted("update:is-dialog-open")).toBeTruthy();
				expect(wrapper.emitted("update:is-dialog-open")?.[0]).toEqual([false]);
			});
		});

		describe("when cancel button is clicked", () => {
			it("should emit cancel", async () => {
				const { wrapper } = setup();
				const card = wrapper.findComponent(VDialog).findComponent(VCard);
				const cancelButton = card.find('[data-testid="dialog-cancel"]');

				await cancelButton.trigger("click");

				expect(wrapper.emitted("cancel")).toBeTruthy();
			});
		});

		describe("when confirm button is clicked", () => {
			it("should emit confirm", async () => {
				const { wrapper } = setup();
				const card = wrapper.findComponent(VDialog).findComponent(VCard);
				const confirmButton = card.find('[data-testid="dialog-confirm"]');

				await confirmButton.trigger("click");

				expect(wrapper.emitted("confirm")).toBeTruthy();
			});
		});

		describe("when the dialog has finished transition out", () => {
			it("should emit after-leave", async () => {
				const { wrapper } = setup();

				const dialog = wrapper.findComponent(VDialog);
				await dialog.vm.$emit("after-leave");

				expect(wrapper.emitted("after-leave")).toBeTruthy();
			});
		});
	});

	describe("when the dialog isDialogOpen is false", () => {
		const setup = () => {
			const wrapper = mount(Dialog, {
				props: {
					isDialogOpen: false,
					title: "title of dialog",
				},
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
			});
			return { wrapper };
		};

		it("should not render card", () => {
			const { wrapper } = setup();
			const card = wrapper.findComponent(VDialog).findComponent(VCard);

			expect(card.exists()).toBe(false);
		});
	});

	describe("when confirmBtnLangKey is defined", () => {
		const setup = () => {
			const confirmBtnLangKey = "language.key";

			const wrapper = mount(Dialog, {
				props: {
					isDialogOpen: true,
					title: "title of dialog",
					confirmBtnLangKey,
				},
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					stubs: { UseFocusTrap: true },
					renderStubDefaultSlot: true, // to access content inside focus trap
				},
			});
			return { wrapper, confirmBtnLangKey };
		};

		it("should render confirm button with correct text", () => {
			const { wrapper, confirmBtnLangKey } = setup();
			const card = wrapper.findComponent(VDialog).findComponent(VCard);
			const confirmButton = card.find('[data-testid="dialog-confirm"]');

			expect(confirmButton.text()).toContain(confirmBtnLangKey);
		});
	});

	describe("when confirmBtnLangKey is not defined", () => {
		const setup = () => {
			const wrapper = mount(Dialog, {
				props: {
					title: "title of dialog",
					isDialogOpen: true,
				},
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					stubs: { UseFocusTrap: true },
					renderStubDefaultSlot: true, // to access content inside focus trap
				},
			});
			return { wrapper };
		};

		it("should render confirm button with default text", () => {
			const { wrapper } = setup();
			const card = wrapper.findComponent(VDialog).findComponent(VCard);
			const confirmButton = card.find('[data-testid="dialog-confirm"]');

			expect(confirmButton.text()).toContain("common.actions.confirm");
		});
	});
});
