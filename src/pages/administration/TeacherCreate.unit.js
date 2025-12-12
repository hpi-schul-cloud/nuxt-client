import { default as NewTeacher } from "./TeacherCreate.page.vue";
import { createTestAppStore, expectNotification } from "@@/tests/test-utils";
import mock$objects from "@@/tests/test-utils/pageStubs";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { createStore } from "vuex";

const createMockStore = (createTeacherStub) => {
	const mockStore = createStore({
		modules: {
			users: {
				namespaced: true,
				actions: {
					createTeacher: createTeacherStub,
				},
				state: () => ({}),
			},
		},
	});
	return mockStore;
};

describe("teachers/new", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestAppStore();
	});

	it("should call 'createTeacher' action", async () => {
		const createTeacherStub = vi.fn();
		const mockStore = createMockStore(createTeacherStub);

		const wrapper = mount(NewTeacher, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$store: mockStore,
				},
			},
		});
		mock$objects(wrapper);

		const inputFirstName = wrapper.find('[data-testid="input_create-user_firstname"]').get("input");
		const inputLastName = wrapper.find('[data-testid="input_create-user_lastname"]').get("input");
		const inputEmail = wrapper.find('[data-testid="input_create-user_email"]').get("input");

		inputFirstName.setValue("Klara");
		inputLastName.setValue("Fall");
		inputEmail.setValue("klara.fall@mail.de");
		await wrapper.find('[data-testid="button_create-user_submit"]').trigger("click");

		// we need to wait until everything is settled
		await flushPromises();

		expect(createTeacherStub).toHaveBeenCalled();
	});

	it("should call notifier successful", async () => {
		const createTeacherStub = vi.fn();
		const mockStore = createMockStore(createTeacherStub);

		const wrapper = mount(NewTeacher, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$store: mockStore,
				},
			},
		});
		mock$objects(wrapper);
		const inputFirstName = wrapper.find('[data-testid="input_create-user_firstname"]').get("input");
		const inputLastName = wrapper.find('[data-testid="input_create-user_lastname"]').get("input");
		const inputEmail = wrapper.find('[data-testid="input_create-user_email"]').get("input");

		inputFirstName.setValue("Klara");
		inputLastName.setValue("Fall");
		inputEmail.setValue("klara.fall@mail.de");
		await wrapper.find('[data-testid="button_create-user_submit"]').trigger("click");

		// we need to wait until everything is settled
		await flushPromises();

		expectNotification("success");
	});

	it("should show error", async () => {
		const failingCreateAction = vi.fn(() => Promise.reject());
		const mockStore = createMockStore(failingCreateAction);

		mockStore.users = {
			actions: {
				createTeacher: failingCreateAction,
			},
			state: () => ({}),
		};
		const wrapper = mount(NewTeacher, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$store: mockStore,
				},
			},
		});
		mock$objects(wrapper);
		const inputFirstName = wrapper.find('[data-testid="input_create-user_firstname"]').get("input");
		const inputLastName = wrapper.find('[data-testid="input_create-user_lastname"]').get("input");
		const inputEmail = wrapper.find('[data-testid="input_create-user_email"]').get("input");
		let errorMessageComponent = wrapper.find(".info-message.bc-error");
		expect(errorMessageComponent.exists()).toBeFalsy();

		inputFirstName.setValue("Klara");
		inputLastName.setValue("Fall");
		inputEmail.setValue("klara.fall@mail.de");
		await wrapper.find('[data-testid="button_create-user_submit"]').trigger("click");

		// we need to wait until everything is settled
		await flushPromises();

		errorMessageComponent = wrapper.find(".info-message.bc-error");
		expect(errorMessageComponent.exists()).toBeTruthy();
	});
});
