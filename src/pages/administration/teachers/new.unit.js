import { default as NewTeacher } from "./new.vue";
import mock$objects from "../../../../tests/test-utils/pageStubs";

describe("teachers/new", () => {
	const createTeacherStub = jest.fn();
	const mockStore = {
		auth: {
			getters: {
				getUser: () => ({
					permissions: ["TEACHER_CREATE"],
				}),
			},
		},
		users: {
			actions: {
				createTeacher: createTeacherStub,
			},
			state: () => ({}),
		},
	};

	it(...isValidComponent(NewTeacher));

	it("should call 'createTeacher' action", async () => {
		const wrapper = mount(NewTeacher, {
			...createComponentMocks({ i18n: true, store: mockStore }),
		});
		mock$objects(wrapper);
		const inputFirstName = wrapper.find(
			'input[data-testid="input_create-user_firstname"]'
		);
		const inputLastName = wrapper.find(
			'input[data-testid="input_create-user_lastname"]'
		);
		const inputEmail = wrapper.find(
			'input[data-testid="input_create-user_email"]'
		);

		inputFirstName.setValue("Klara");
		inputLastName.setValue("Fall");
		inputEmail.setValue("klara.fall@mail.de");
		wrapper.find("form").trigger("submit");

		await wrapper.vm.$nextTick();
		expect(createTeacherStub).toHaveBeenCalled();
	});

	it("should call toast successful", async () => {
		const wrapper = mount(NewTeacher, {
			...createComponentMocks({ i18n: true, store: mockStore }),
		});
		mock$objects(wrapper);
		const inputFirstName = wrapper.find(
			'input[data-testid="input_create-user_firstname"]'
		);
		const inputLastName = wrapper.find(
			'input[data-testid="input_create-user_lastname"]'
		);
		const inputEmail = wrapper.find(
			'input[data-testid="input_create-user_email"]'
		);

		inputFirstName.setValue("Klara");
		inputLastName.setValue("Fall");
		inputEmail.setValue("klara.fall@mail.de");
		wrapper.find("form").trigger("submit");

		await wrapper.vm.$nextTick(); // trigger dispatch
		await wrapper.vm.$nextTick(); // trigger then clause of dispatch
		expect(wrapper.vm.$toast.success).toHaveBeenCalled();
	});

	it("should show error", async () => {
		const failingCreateAction = jest.fn(() => Promise.reject());
		const customMockStore = { ...mockStore };
		customMockStore.users = {
			actions: {
				createTeacher: failingCreateAction,
			},
			state: () => ({}),
		};
		const wrapper = mount(NewTeacher, {
			...createComponentMocks({ i18n: true, store: customMockStore }),
		});
		mock$objects(wrapper);
		const inputFirstName = wrapper.find(
			'input[data-testid="input_create-user_firstname"]'
		);
		const inputLastName = wrapper.find(
			'input[data-testid="input_create-user_lastname"]'
		);
		const inputEmail = wrapper.find(
			'input[data-testid="input_create-user_email"]'
		);
		let errorMessageComponent = wrapper.find(".info-message.bc-error");
		expect(errorMessageComponent.exists()).toBeFalse();

		inputFirstName.setValue("Klara");
		inputLastName.setValue("Fall");
		inputEmail.setValue("klara.fall@mail.de");
		wrapper.find("form").trigger("submit");

		await wrapper.vm.$nextTick(); // trigger dispatch
		await wrapper.vm.$nextTick(); // trigger catch clause of dispatch
		await wrapper.vm.$nextTick(); // display error component
		errorMessageComponent = wrapper.find(".info-message.bc-error");
		expect(errorMessageComponent.exists()).toBeTrue();
	});
});
