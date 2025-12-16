import StepEmail from "./StepEmail.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { flushPromises, mount, VueWrapper } from "@vue/test-utils";
import { VTextField } from "vuetify/components";

describe("StepEmail", () => {
	let wrapper: VueWrapper<InstanceType<typeof StepEmail>>;

	const setup = () => {
		wrapper = mount(StepEmail, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		const emailInput = wrapper.getComponent('[data-testid="add-external-person-email"]').getComponent(VTextField);
		const addButton = wrapper.getComponent('[data-testid="add-external-person-add-email-btn"]');
		const cancelButton = wrapper.getComponent('[data-testid="add-external-person-cancel-btn"]');

		const clickAddButton = async () => {
			await addButton.trigger("click");
			await flushPromises();
		};

		const clickCancelButton = async () => {
			await cancelButton.trigger("click");
			await flushPromises();
		};

		return { wrapper, emailInput, addButton, clickAddButton, cancelButton, clickCancelButton };
	};

	afterEach(() => {
		wrapper?.unmount();
	});

	describe("when component is mounted", () => {
		it("should render the component", () => {
			const { wrapper } = setup();

			expect(wrapper.find('[data-testid="add-external-person-email-form"]')).toBeTruthy();
			expect(wrapper.getComponent('[data-testid="add-external-person-email"]')).toBeTruthy();
			expect(wrapper.getComponent('[data-testid="add-external-person-cancel-btn"]')).toBeTruthy();
			expect(wrapper.getComponent('[data-testid="add-external-person-add-email-btn"]')).toBeTruthy();
		});

		it("should display correct texts", () => {
			const { wrapper } = setup();

			expect(wrapper.text()).toContain("pages.rooms.members.dialog.addExternalPerson.steps.email.heading");
			expect(wrapper.text()).toContain("pages.rooms.members.dialog.addExternalPerson.steps.email.text");
			expect(wrapper.text()).toContain("common.actions.cancel");
			expect(wrapper.text()).toContain("pages.rooms.members.dialog.addExternalPerson.button.add");
		});
	});

	describe("email validation", () => {
		describe("when email is invalid", () => {
			it("should show validation error for invalid email", async () => {
				const { emailInput, clickAddButton } = setup();

				await emailInput.setValue("invalid-email");
				await clickAddButton();

				expect(emailInput.text()).toContain("pages.rooms.members.dialog.addExternalPerson.label.email.error");
			});

			it("should not emit 'update:email' event", async () => {
				const { wrapper, emailInput, clickAddButton } = setup();

				await emailInput.setValue("invalid-email");
				await clickAddButton();
				const emitted = wrapper.emitted();

				expect(emitted).not.toHaveProperty("update:email");
			});
		});

		describe("when email is valid", () => {
			it("should not show validation error", async () => {
				const { emailInput, clickAddButton } = setup();

				await emailInput.setValue("valid@example.com");
				await clickAddButton();

				expect(emailInput.text()).not.toContain("pages.rooms.members.dialog.addExternalPerson.label.email.error");
			});
		});
	});

	describe("form submission", () => {
		describe("when email is valid", () => {
			it("should emit 'update:email' event with valid email when add button is clicked", async () => {
				const { wrapper, emailInput, clickAddButton } = setup();

				await emailInput.setValue("test@example.com");
				await clickAddButton();
				const emitted = wrapper.emitted();

				expect(emitted).toHaveProperty("update:email");
				expect(emitted["update:email"]).toEqual([["test@example.com"]]);
			});

			it("should emit 'update:email' event with valid email when form is submitted", async () => {
				const { wrapper, emailInput, clickAddButton } = setup();

				await emailInput.setValue("test@example.com");
				await clickAddButton();
				const emitted = wrapper.emitted();

				expect(emitted).toHaveProperty("update:email");
				expect(emitted["update:email"]).toEqual([["test@example.com"]]);
			});

			it("should emit 'update:email' event when enter key is pressed in email input", async () => {
				const { wrapper, emailInput } = setup();

				await emailInput.setValue("test@example.com");
				await emailInput.trigger("keydown.enter");
				await flushPromises();
				const emitted = wrapper.emitted();

				expect(emitted).toHaveProperty("update:email");
				expect(emitted["update:email"]).toEqual([["test@example.com"]]);
			});
		});
	});

	describe("cancel functionality", () => {
		it("should emit 'close' event when cancel button is clicked", async () => {
			const { wrapper, clickCancelButton } = setup();

			await clickCancelButton();
			const emitted = wrapper.emitted();

			expect(emitted).toHaveProperty("close");
		});
	});
});
