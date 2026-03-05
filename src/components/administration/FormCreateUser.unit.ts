import FormCreateUser from "./FormCreateUser.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VForm } from "vuetify/components";
import { createStore } from "vuex";

vi.mock("vue-router", () => ({
	useRouter: vi.fn(),
}));

const validRole = {
	data: ["student"],
};

type MockActions = {
	findStudents?: () => Promise<void>;
	find: () => Promise<{ data: string[] }>;
	create?: () => void;
};

const getMockActions = (): MockActions => ({
	findStudents: vi.fn().mockReturnValue(Promise.resolve()),
	find: vi.fn().mockReturnValue(Promise.resolve(validRole)),
});

const getMockActionsErrorCreate = (): MockActions => ({
	create: () => {
		throw new Error("Duplicate Mail");
	},
	find: vi.fn().mockReturnValue(Promise.resolve(validRole)),
});

describe("FormCreateUser", () => {
	const setup = (actions: MockActions = getMockActions(), options = {}) => {
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

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	describe("create", () => {
		it("emits create-user event on form submit", async () => {
			const { wrapper } = setup(getMockActionsErrorCreate());

			const inputFirstName = wrapper.find('[data-testid="input_create-user_firstname"] input');
			const inputLastName = wrapper.find('[data-testid="input_create-user_lastname"] input');
			const inputEmail = wrapper.find('[data-testid="input_create-user_email"] input');
			expect(inputFirstName.exists()).toBe(true);
			await inputFirstName.setValue("Klara");

			expect(inputLastName.exists()).toBe(true);
			await inputLastName.setValue("Fall");

			expect(inputEmail.exists()).toBe(true);
			await inputEmail.setValue("klara.fall@mail.de");

			const form = wrapper.findComponent(VForm);
			await form.trigger("submit.prevent");
			await flushPromises();

			const emitted = wrapper.emitted("create-user");
			expect(emitted).toBeDefined();
			const eventUserData = emitted?.[0][0];
			expect(eventUserData).toStrictEqual({
				firstName: "Klara",
				lastName: "Fall",
				email: "klara.fall@mail.de",
			});
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
