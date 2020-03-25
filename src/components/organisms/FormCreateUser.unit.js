import FormCreateUser from "./FormCreateUser";

// const user = {
// 	firstName: "Anna",
// 	lastName: "Fall",
// 	email: "anna.fall@mail.de",
// 	sendRegistration: true,
// };

// const roleObject = {
// 	name: "student",
// 	id: "84841848485",
// };

const slotInputs = [
	` <base-input
      slot-scope="userData"
      v-model="userData.birthday"
      type="date"
      :label="Geburtstag"
      :placeholder="Geburtstag"
      class="mt--md"
    />`,
	`<base-input
      slot-scope="userData"
      v-model="userData.sendRegistration"
      type="checkbox"
      name="switch"
      class="mt--xl"
      :label="Link"
  />`,
];

const getMockActions = () => ({
	create: jest.fn().mockReturnValue(Promise.resolve()),
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
		scopedSlots: {
			inputs: slotInputs,
		},
	});

describe("@components/FormCreateUser", () => {
	it(...isValidComponent(FormCreateUser));

	describe("create", () => {
		it.skip("dispatches create action on form submit", async () => {
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

			await wrapper.vm.$nextTick();
			wrapper.vm.$emit("submit");
			expect(wrapper.vm.actionType).toStrictEqual("create");
			expect(actions.create.mock.calls).toHaveLength(1);
		});
	});
});
