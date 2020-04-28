import FormCreateUser from "./FormCreateUser";

const validRole = {
	data: ["student"],
};

const getMockActions = () => ({
	create: jest.fn().mockReturnValue(Promise.resolve()),
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
		it("dispatches create action on form submit", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(FormCreateUser, {
				...mock,
				propsData: {
					roleName: "student",
				},
			});

			const divArray = wrapper.findAll('input[type="text"]');

			const inputFirstName = divArray.at(0);
			const inputLastName = divArray.at(1);
			const inputEmail = divArray.at(2);

			expect(inputFirstName.exists()).toBe(true);
			inputFirstName.setValue("Klara");

			expect(inputLastName.exists()).toBe(true);
			inputLastName.setValue("Fall");

			expect(inputEmail.exists()).toBe(true);
			inputEmail.setValue("klara.fall@mail.de");

			wrapper.trigger("submit");

			await wrapper.vm.$nextTick();
			expect(wrapper.vm.actionType).toStrictEqual("create");
			await wrapper.vm.$nextTick();
			expect(actions.create.mock.calls).toHaveLength(1);

			await wrapper.vm.$nextTick();
			expect(wrapper.emitted("success")).toHaveLength(1);
		});

		it("throws error on failing create", async () => {
			const actions = getMockActionsErrorCreate();
			const mock = getMocks({ actions });
			const wrapper = mount(FormCreateUser, {
				...mock,
				propsData: {
					roleName: "student",
				},
			});

			wrapper.trigger("submit");
			// await for user role resolve
			await wrapper.vm.$nextTick();
			// await for create resolve
			await wrapper.vm.$nextTick();
			// await for emit
			await wrapper.vm.$nextTick();

			expect(wrapper.emitted("error")).toHaveLength(1);
		});

		it("renders slot content", async () => {
			const actions = getMockActionsErrorCreate();
			const mock = getMocks({ actions });
			const wrapper = shallowMount(FormCreateUser, {
				...mock,
				propsData: {
					roleName: "student",
				},
				slots: {
					inputs: '<input label="test" value="test"/>',
				},
			});
			const slot_input = wrapper.find('input[value="test"]');
			expect(slot_input.exists()).toBe(true);
		});
	});
});
