import FormCreateUser from "./FormCreateUser";

const validRole = {
	data: ["student"],
};

const getMockActions = () => ({
	handleUsers: jest.fn().mockReturnValue(Promise.resolve()),
	find: jest.fn().mockReturnValue(Promise.resolve(validRole)),
});

const getMockActionsErrorCreate = () => ({
	create: () => {
		throw new Error("Duplicate Mail");
	},
	find: jest.fn().mockReturnValue(Promise.resolve(validRole)),
});

const getMocks = ({ actions = getMockActions() } = {}) =>
	createComponentMocks({
		i18n: true,
		user: true,
		store: {
			users: {
				actions,
			},
			roles: {
				actions,
			},
		},
	});

describe("@components/organisms/FormCreateUser", () => {
	it(...isValidComponent(FormCreateUser));

	describe("create", () => {
		it("emits create-user event on form submit", async () => {
			const actions = getMockActionsErrorCreate();
			const mock = getMocks({ actions });
			const wrapper = mount(FormCreateUser, {
				...mock,
			});

			const inputFirstName = wrapper.find(
				'input[data-testid="input_create-user_firstname"]'
			);
			const inputLastName = wrapper.find(
				'input[data-testid="input_create-user_lastname"]'
			);
			const inputEmail = wrapper.find(
				'input[data-testid="input_create-user_email"]'
			);
			expect(inputFirstName.exists()).toBe(true);
			inputFirstName.setValue("Klara");

			expect(inputLastName.exists()).toBe(true);
			inputLastName.setValue("Fall");

			expect(inputEmail.exists()).toBe(true);
			inputEmail.setValue("klara.fall@mail.de");

			wrapper.find("form").trigger("submit");

			await wrapper.vm.$nextTick();
			const eventUserData = wrapper.emitted("create-user")[0][0];
			expect(eventUserData.firstName).toBe("Klara");
			expect(eventUserData.lastName).toBe("Fall");
			expect(eventUserData.email).toBe("klara.fall@mail.de");
		});

		it("does not emit create-user event if form is invalid", async () => {
			const actions = getMockActionsErrorCreate();
			const mock = getMocks({ actions });
			const wrapper = mount(FormCreateUser, {
				...mock,
			});

			wrapper.find("form").trigger("submit");

			await wrapper.vm.$nextTick();
			const eventUserData = wrapper.emitted();
			expect(eventUserData["create-user"]).toBeUndefined();
		});

		it("emit trigger-validation event on form submit", async () => {
			const actions = getMockActionsErrorCreate();
			const mock = getMocks({ actions });
			const wrapper = mount(FormCreateUser, {
				...mock,
			});

			wrapper.find("form").trigger("submit");

			await wrapper.vm.$nextTick();
			expect(wrapper.emitted("trigger-validation")[0]).toHaveLength(1);
		});

		it("renders slot content", async () => {
			const actions = getMockActionsErrorCreate();
			const mock = getMocks({ actions });
			const wrapper = mount(FormCreateUser, {
				...mock,
				slots: {
					inputs: '<input label="test" value="test"/>',
				},
			});
			const slot_input = wrapper.find('input[value="test"]');
			expect(slot_input.exists()).toBe(true);
		});
	});
});
