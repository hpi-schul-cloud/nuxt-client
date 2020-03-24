import FormCreateUser from "./FormCreateUser";
import flushPromises from "flush-promises";

const user = {
	firstName: "Anna",
	lastName: "Fall",
	email: "anna.fall@mail.de",
	sendRegistration: true,
};

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
	find: jest.fn().mockReturnValue(Promise.resolve()),
	create: jest.fn().mockReturnValue(Promise.resolve(user)),
});

const getMocks = ({ actions = getMockActions() } = {}) =>
	createComponentMocks({
		i18n: true,
		user: true,
		store: {
			roles: {
				actions,
			},
			users: {
				actions,
			},
		},
		scopedSlots: {
			inputs: slotInputs,
		},
	});

describe("@components/FormCreateUser", () => {
	it.skip(...isValidComponent(FormCreateUser));

	describe("find", () => {
		it.skip("dispatches find action on form", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(FormCreateUser, {
				...mock,
				propsData: {},
			});

			await flushPromises();
			expect(wrapper.vm.userData).toStrictEqual(user);
		});
	});

	describe("create", () => {
		it.skip("dispatches create action on form submit", async () => {
			const actions = getMockActions();
			const mock = getMocks({ actions });
			const wrapper = mount(FormCreateUser, {
				...mock,
				propsData: {},
			});
			const nameInput = wrapper.find('input[type="text"]');
			expect(nameInput.exists()).toBe(true);
			nameInput.setValue("Klara");
			wrapper.trigger("submit");
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.actionType).toStrictEqual("create");
			expect(actions.create.mock.calls).toHaveLength(1);
		});

		it.skip("shows error toast if create fails", async () => {
			const errorMessage = "expected error that should be catched";
			const mock = getMocks({
				actions: {
					create: () => {
						throw new Error(errorMessage);
					},
				},
			});
			const wrapper = mount(FormCreateUser, {
				...mock,
				propsData: {},
			});

			const nameInput = wrapper.find('input[type="text"]');
			nameInput.setValue("Klara");

			const toastStubs = { success: jest.fn(), error: jest.fn() };
			wrapper.vm.$toast = toastStubs;
			const consoleError = jest.spyOn(console, "error").mockImplementation();

			wrapper.trigger("submit");
			expect(toastStubs.success.mock.calls).toHaveLength(0); // no success message expected
			const errors = consoleError.mock.calls.map((e) => e.toString());
			expect(errors).toContain(`Error: ${errorMessage}`); // but error log
			expect(toastStubs.error.mock.calls).toHaveLength(1); // and info toast
		});
	});
});
