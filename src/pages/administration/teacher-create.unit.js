import { default as NewTeacher } from "./TeacherCreate.page.vue";
import mock$objects from "../../../tests/test-utils/pageStubs";
import setupStores from "@@/tests/test-utils/setupStores";
import AuthModule from "@/store/auth";
import NotifierModule from "@/store/notifier";
import { notifierModule } from "@/store";

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

	beforeEach(() => {
		setupStores({ authModule: AuthModule, notifierModule: NotifierModule });
	});

	it("should call 'createTeacher' action", async () => {
		const wrapper = mount(NewTeacher, {
			...createComponentMocks({ i18n: true, store: mockStore }),
			mocks: {
				$theme: {
					short_name: "instance name",
				},
				$user: { schoolId: "123" },
			},
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

	it("should call notifier successful", async () => {
		const notifierModuleMock = jest.spyOn(notifierModule, "show");
		const wrapper = mount(NewTeacher, {
			...createComponentMocks({ i18n: true, store: mockStore }),
			mocks: {
				$theme: {
					short_name: "instance name",
				},
				$user: { schoolId: "123" },
			},
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
		expect(notifierModuleMock).toHaveBeenCalled();
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
			mocks: {
				$theme: {
					short_name: "instance name",
				},
				$user: { schoolId: "123" },
			},
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
		expect(errorMessageComponent.exists()).toBeFalsy();

		inputFirstName.setValue("Klara");
		inputLastName.setValue("Fall");
		inputEmail.setValue("klara.fall@mail.de");
		wrapper.find("form").trigger("submit");

		await wrapper.vm.$nextTick(); // trigger dispatch
		await wrapper.vm.$nextTick(); // trigger catch clause of dispatch
		await wrapper.vm.$nextTick(); // display error component
		errorMessageComponent = wrapper.find(".info-message.bc-error");
		expect(errorMessageComponent.exists()).toBeTruthy();
	});
});
