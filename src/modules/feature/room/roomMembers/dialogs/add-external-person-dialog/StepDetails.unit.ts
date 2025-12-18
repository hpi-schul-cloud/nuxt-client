import StepDetails from "./StepDetails.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { flushPromises, mount, VueWrapper } from "@vue/test-utils";
import { VTextField } from "vuetify/components";

describe("StepDetails", () => {
	let wrapper: VueWrapper<InstanceType<typeof StepDetails>>;

	const defaultProps = {
		applicationNames: {
			text: "dBildungsCloud Text",
			alert: "dBildungsCloud Alert",
		},
		email: "test@example.com",
		firstName: "",
		lastName: "",
	};

	const setup = (props = {}) => {
		wrapper = mount(StepDetails, {
			props: { ...defaultProps, ...props },
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		const firstNameInput = wrapper
			.getComponent('[data-testid="add-external-person-firstname"]')
			.getComponent(VTextField);
		const lastNameInput = wrapper.getComponent('[data-testid="add-external-person-lastname"]').getComponent(VTextField);
		const emailInput = wrapper.getComponent('[data-testid="add-external-person-email"]').getComponent(VTextField);
		const confirmButton = wrapper.getComponent('[data-testid="add-external-person-confirm-btn"]');
		const backButton = wrapper.getComponent('[data-testid="add-external-person-back-btn"]');

		const clickConfirmButton = async () => {
			await confirmButton.trigger("click");
			await flushPromises();
		};

		const clickBackButton = async () => {
			await backButton.trigger("click");
			await flushPromises();
		};

		return {
			wrapper,
			firstNameInput,
			lastNameInput,
			emailInput,
			confirmButton,
			backButton,
			clickConfirmButton,
			clickBackButton,
		};
	};

	afterEach(() => {
		wrapper?.unmount();
	});

	describe("when component is mounted", () => {
		it("should render the component", () => {
			const { wrapper } = setup();

			expect(wrapper.find('[data-testid="add-external-person-detail-form"]')).toBeTruthy();
			expect(wrapper.getComponent('[data-testid="add-external-person-email"]')).toBeTruthy();
			expect(wrapper.getComponent('[data-testid="add-external-person-firstname"]')).toBeTruthy();
			expect(wrapper.getComponent('[data-testid="add-external-person-lastname"]')).toBeTruthy();
			expect(wrapper.getComponent('[data-testid="add-external-person-back-btn"]')).toBeTruthy();
			expect(wrapper.getComponent('[data-testid="add-external-person-confirm-btn"]')).toBeTruthy();
		});

		it("should display correct texts", () => {
			const { wrapper } = setup();

			expect(wrapper.text()).toContain("pages.rooms.members.dialog.addExternalPerson.steps.details.heading");
			expect(wrapper.text()).toContain("pages.rooms.members.dialog.addExternalPerson.steps.details.alert");
			expect(wrapper.text()).toContain("pages.rooms.members.dialog.addExternalPerson.steps.details.text");
			expect(wrapper.text()).toContain("common.actions.back");
			expect(wrapper.text()).toContain("pages.rooms.members.dialog.addExternalPerson.button.invite");
		});

		it("should display the provided email in readonly field", async () => {
			const { emailInput } = setup();

			expect(emailInput.vm.modelValue).toBe("test@example.com");
		});
	});

	describe("reactivity", () => {
		const { wrapper, firstNameInput, lastNameInput } = setup();

		describe("when firstName value changes", () => {
			it("should emit 'update:firstName' event with new firstName value", async () => {
				await firstNameInput.setValue("John");

				const emitted = wrapper.emitted();

				expect(emitted).toHaveProperty("update:firstName");
				expect(emitted["update:firstName"]).toEqual([["John"]]);
			});
		});
		describe("when lastName value changes", () => {
			it("should emit 'update:lastName' event with new lastName value", async () => {
				await lastNameInput.setValue("Doe");

				const emitted = wrapper.emitted();

				expect(emitted).toHaveProperty("update:lastName");
				expect(emitted["update:lastName"]).toEqual([["Doe"]]);
			});
		});
	});

	describe("form validation", () => {
		describe("when first name is empty", async () => {
			const { wrapper, firstNameInput, lastNameInput, clickConfirmButton } = setup();

			await lastNameInput.setValue("Doe");
			await clickConfirmButton();
			const emitted = wrapper.emitted();

			it("should show validation error for first name", () => {
				expect(firstNameInput.text()).toContain("pages.rooms.members.dialog.addExternalPerson.label.firstName.error");
			});

			it("should not emit update:details event", () => {
				expect(emitted).not.toHaveProperty("update:details");
			});
		});

		describe("when first name contains html", async () => {
			const { firstNameInput, lastNameInput, clickConfirmButton } = setup();

			await firstNameInput.setValue("John<script>alert('xss')</script>");
			await lastNameInput.setValue("Doe");
			await clickConfirmButton();
			const emitted = wrapper.emitted();

			it("should show validation error for first name", () => {
				expect(firstNameInput.vm.errorMessages).toHaveLength(1);
				expect(firstNameInput.vm.errorMessages?.[0]).toContain("common.validation.containsOpeningTag");
			});

			it("should not emit update:details event", async () => {
				expect(emitted).not.toHaveProperty("update:details");
			});
		});

		describe("when last name is empty", async () => {
			const { firstNameInput, lastNameInput, clickConfirmButton } = setup();

			await firstNameInput.setValue("John");
			await clickConfirmButton();
			const emitted = wrapper.emitted();

			it("should show validation error for last name", () => {
				expect(lastNameInput.text()).toContain("pages.rooms.members.dialog.addExternalPerson.label.lastName.error");
			});

			it("should not emit update:details event", () => {
				expect(emitted).not.toHaveProperty("update:details");
			});
		});

		describe("when last name contains html", async () => {
			const { firstNameInput, lastNameInput, clickConfirmButton } = setup();

			await firstNameInput.setValue("John");
			await lastNameInput.setValue("Doe<script>alert('xss')</script>");
			await clickConfirmButton();
			const emitted = wrapper.emitted();

			it("should show validation error for last name", () => {
				expect(lastNameInput.vm.errorMessages).toHaveLength(1);
				expect(lastNameInput.vm.errorMessages?.[0]).toContain("common.validation.containsOpeningTag");
			});

			it("should not emit update:details event", async () => {
				expect(emitted).not.toHaveProperty("update:details");
			});
		});

		describe("when both names are empty", () => {
			it("should show validation errors for both fields", async () => {
				const { firstNameInput, lastNameInput, clickConfirmButton } = setup();

				await clickConfirmButton();

				expect(firstNameInput.text()).toContain("pages.rooms.members.dialog.addExternalPerson.label.firstName.error");
				expect(lastNameInput.text()).toContain("pages.rooms.members.dialog.addExternalPerson.label.lastName.error");
			});

			it("should not emit update:details event", async () => {
				const { wrapper, clickConfirmButton } = setup();

				await clickConfirmButton();
				const emitted = wrapper.emitted();

				expect(emitted).not.toHaveProperty("update:details");
			});
		});

		describe("when both names contains html", async () => {
			const { firstNameInput, lastNameInput, clickConfirmButton } = setup();

			await firstNameInput.setValue("John<script>alert('xss')</script>");
			await lastNameInput.setValue("Doe<script>alert('xss')</script>");
			await clickConfirmButton();
			const emitted = wrapper.emitted();

			it("should show validation error for first name", () => {
				expect(firstNameInput.vm.errorMessages).toHaveLength(1);
				expect(firstNameInput.vm.errorMessages?.[0]).toContain("common.validation.containsOpeningTag");
			});

			it("should show validation error for last name", () => {
				expect(lastNameInput.vm.errorMessages).toHaveLength(1);
				expect(lastNameInput.vm.errorMessages?.[0]).toContain("common.validation.containsOpeningTag");
			});

			it("should not emit update:details event", async () => {
				expect(emitted).not.toHaveProperty("update:details");
			});
		});
	});

	describe("form submission", () => {
		describe("when both names are valid", () => {
			it("should emit 'update:details' and 'submit:invitation' events with correct data when confirm button is clicked", async () => {
				const { wrapper, firstNameInput, lastNameInput, clickConfirmButton } = setup();

				await firstNameInput.setValue("John");
				await lastNameInput.setValue("Doe");
				await clickConfirmButton();
				const emitted = wrapper.emitted();

				expect(emitted).toHaveProperty("update:details");
				expect(emitted["update:details"]).toEqual([["John", "Doe"]]);
				expect(emitted).toHaveProperty("submit:invitation");
			});

			it("should emit 'update:details' event when enter key is pressed in first name field", async () => {
				const { wrapper, firstNameInput, lastNameInput } = setup();

				await firstNameInput.setValue("John");
				await lastNameInput.setValue("Doe");
				await firstNameInput.trigger("keydown.enter");
				await flushPromises();
				const emitted = wrapper.emitted();

				expect(emitted).toHaveProperty("update:details");
				expect(emitted["update:details"]).toEqual([["John", "Doe"]]);
			});

			it("should emit 'update:details' event when enter key is pressed in last name field", async () => {
				const { wrapper, firstNameInput, lastNameInput } = setup();

				await firstNameInput.setValue("John");
				await lastNameInput.setValue("Doe");
				await lastNameInput.trigger("keydown.enter");
				await flushPromises();
				const emitted = wrapper.emitted();

				expect(emitted).toHaveProperty("update:details");
				expect(emitted["update:details"]).toEqual([["John", "Doe"]]);
			});
		});
	});

	describe("back functionality", () => {
		it("should emit 'back' event when back button is clicked", async () => {
			const { wrapper, clickBackButton } = setup();

			await clickBackButton();
			const emitted = wrapper.emitted();

			expect(emitted).toHaveProperty("back");
		});
	});

	describe("props handling", () => {
		it("should display the correct email from props", () => {
			const customEmail = "custom@example.com";
			const { emailInput } = setup({ email: customEmail });

			expect(emailInput.vm.modelValue).toBe(customEmail);
		});

		describe("accessibility", () => {
			it("should have proper labels and test ids", () => {
				const { wrapper } = setup();

				expect(wrapper.find('[data-testid="add-external-person-detail-form"]')).toBeTruthy();
				expect(wrapper.find('[data-testid="add-external-person-email"]')).toBeTruthy();
				expect(wrapper.find('[data-testid="add-external-person-firstname"]')).toBeTruthy();
				expect(wrapper.find('[data-testid="add-external-person-lastname"]')).toBeTruthy();
				expect(wrapper.find('[data-testid="add-external-person-back-btn"]')).toBeTruthy();
				expect(wrapper.find('[data-testid="add-external-person-confirm-btn"]')).toBeTruthy();
			});

			it("should have proper heading structure", () => {
				const { wrapper } = setup();

				const heading = wrapper.find("h2");

				expect(heading.exists()).toBe(true);
				expect(heading.text()).toContain("pages.rooms.members.dialog.addExternalPerson.steps.details.heading");
			});

			it("should have info alert for user guidance", () => {
				const { wrapper } = setup();

				const alert = wrapper.find(".v-alert");

				expect(alert.exists()).toBe(true);
			});
		});
	});
});
