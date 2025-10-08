import FormCreateUser from "./FormCreateUser";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { nextTick } from "vue";
import { createStore } from "vuex";

const validRole = {
	data: ["student"],
};

const getMockActions = () => ({
	findStudents: vi.fn().mockReturnValue(Promise.resolve()),
	find: vi.fn().mockReturnValue(Promise.resolve(validRole)),
});

const getMockActionsErrorCreate = () => ({
	create: () => {
		throw new Error("Duplicate Mail");
	},
	find: vi.fn().mockReturnValue(Promise.resolve(validRole)),
});

describe("@/components/organisms/FormCreateUser", () => {
	const setup = (actions = getMockActions(), options = {}) => {
		const wrapper = mount(FormCreateUser, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$store: createStore({
						modules: {
							users: {
								actions,
							},
							roles: {
								actions,
							},
						},
					}),
				},
			},
			...options,
		});

		return { wrapper };
	};

	describe("create", () => {
		it("emits create-user event on form submit", async () => {
			const { wrapper } = setup(getMockActionsErrorCreate());

			const inputFirstName = wrapper.find('[data-testid="input_create-user_firstname"] input');
			const inputLastName = wrapper.find('[data-testid="input_create-user_lastname"] input');
			const inputEmail = wrapper.find('[data-testid="input_create-user_email"] input');
			const submitButton = wrapper.find('button[data-testid="button_create-user_submit"]');
			expect(inputFirstName.exists()).toBe(true);
			inputFirstName.setValue("Klara");

			expect(inputLastName.exists()).toBe(true);
			inputLastName.setValue("Fall");

			expect(inputEmail.exists()).toBe(true);
			inputEmail.setValue("klara.fall@mail.de");

			expect(submitButton.exists()).toBe(true);

			await submitButton.trigger("click");

			await nextTick();
			await nextTick();

			const eventUserData = wrapper.emitted("create-user")[0][0];
			expect(eventUserData.firstName).toBe("Klara");
			expect(eventUserData.lastName).toBe("Fall");
			expect(eventUserData.email).toBe("klara.fall@mail.de");
		});

		it("does not emit create-user event if form is invalid", async () => {
			const { wrapper } = setup(getMockActionsErrorCreate());

			const submitButton = wrapper.find('button[data-testid="button_create-user_submit"]');

			await submitButton.trigger("click");

			const eventUserData = wrapper.emitted();
			expect(eventUserData["create-user"]).toBeUndefined();
		});

		it("renders slot content", () => {
			const { wrapper } = setup(getMockActionsErrorCreate(), {
				slots: {
					inputs: '<input label="test"/>',
				},
			});

			const slotInput = wrapper.find('input[label="test"]');
			expect(slotInput.exists()).toBe(true);
		});
	});
});
