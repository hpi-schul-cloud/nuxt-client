import { default as NewTeacher } from "./TeacherCreate.page.vue";
import { notifierModule } from "@/store";
import AuthModule from "@/store/auth";
import NotifierModule from "@/store/notifier";
import { meResponseFactory } from "@@/tests/test-utils";
import mock$objects from "@@/tests/test-utils/pageStubs";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { flushPromises } from "@vue/test-utils";
import { createStore } from "vuex";

vi.mock("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

const createMockStore = (createTeacherStub) => {
	const mockStore = createStore({
		modules: {
			auth: {
				namespaced: true,
				getters: {
					getUser: () => ({
						permissions: ["TEACHER_CREATE"],
					}),
				},
			},
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
		setupStores({ authModule: AuthModule, notifierModule: NotifierModule });
	});

	it("should call 'createTeacher' action", async () => {
		const createTeacherStub = vi.fn();
		const mockStore = createMockStore(createTeacherStub);
		const mockMe = meResponseFactory.build();

		const wrapper = mount(NewTeacher, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$me: mockMe,
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
		const mockMe = meResponseFactory.build();

		const notifierModuleMock = vi.spyOn(notifierModule, "show");
		const wrapper = mount(NewTeacher, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$me: mockMe,
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

		expect(notifierModuleMock).toHaveBeenCalled();
	});

	it("should show error", async () => {
		const failingCreateAction = vi.fn(() => Promise.reject());
		const mockStore = createMockStore(failingCreateAction);
		const mockMe = meResponseFactory.build();

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
					$me: mockMe,
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
