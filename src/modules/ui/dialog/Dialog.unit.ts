import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { VCard, VDialog } from "vuetify/lib/components/index.mjs";
import Dialog from "./Dialog.vue";

describe("Dialog", () => {
	enableAutoUnmount(afterEach);

	describe("when the dialog isDialogOpen is true", () => {
		const setup = () => {
			const message = "message to the user";
			const slotContent = "<div>content</div>";
			const confirmBtnLangKey = "language.key";

			const wrapper = mount(Dialog, {
				props: {
					isDialogOpen: true,
					message,
					confirmBtnLangKey,
				},
				slots: {
					content: slotContent,
				},
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
				},
			});
			return { wrapper, slotContent, message, confirmBtnLangKey };
		};

		it("should render message", () => {
			const { wrapper, message } = setup();
			const card = wrapper.findComponent(VDialog).findComponent(VCard);

			expect(card.text()).toContain(message);
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
	});

	describe("when the dialog isDialogOpen is false", () => {
		const setup = () => {
			const wrapper = mount(Dialog, {
				props: {
					isDialogOpen: false,
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
					confirmBtnLangKey,
				},
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
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
					isDialogOpen: true,
				},
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
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
