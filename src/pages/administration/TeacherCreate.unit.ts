import TeacherCreatePage from "./TeacherCreate.page.vue";
import { createTestAppStore, expectNotification } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { Procedure } from "@vitest/spy";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { VForm } from "vuetify/components";
import { createStore } from "vuex";

vi.mock("vue-router", () => ({
	useRouter: vi.fn(),
}));

describe("teachers/new", () => {
	const setup = (createTeacherMock?: Mock<Procedure>) => {
		const createTeacherStub = createTeacherMock || vi.fn();
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

		const wrapper = mount(TeacherCreatePage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$store: mockStore,
				},
			},
		});

		return { wrapper, createTeacherStub };
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestAppStore();
	});

	it("should call 'createTeacher' action", async () => {
		const { wrapper, createTeacherStub } = setup();

		const inputFirstName = wrapper.find('[data-testid="input_create-user_firstname"]').get("input");
		const inputLastName = wrapper.find('[data-testid="input_create-user_lastname"]').get("input");
		const inputEmail = wrapper.find('[data-testid="input_create-user_email"]').get("input");

		await inputFirstName.setValue("Klara");
		await inputLastName.setValue("Fall");
		await inputEmail.setValue("klara.fall@mail.de");

		await wrapper.findComponent(VForm).trigger("submit.prevent");
		await flushPromises();

		expect(createTeacherStub).toHaveBeenCalled();
	});

	it("should call notifier successful", async () => {
		const { wrapper } = setup();

		const inputFirstName = wrapper.find('[data-testid="input_create-user_firstname"]').get("input");
		const inputLastName = wrapper.find('[data-testid="input_create-user_lastname"]').get("input");
		const inputEmail = wrapper.find('[data-testid="input_create-user_email"]').get("input");

		await inputFirstName.setValue("Klara");
		await inputLastName.setValue("Fall");
		await inputEmail.setValue("klara.fall@mail.de");

		await wrapper.findComponent(VForm).trigger("submit.prevent");
		await flushPromises();

		expectNotification("success");
	});

	it("should show error", async () => {
		const failingCreateAction = vi.fn(() => Promise.reject());
		const { wrapper } = setup(failingCreateAction);

		const inputFirstName = wrapper.find('[data-testid="input_create-user_firstname"]').get("input");
		const inputLastName = wrapper.find('[data-testid="input_create-user_lastname"]').get("input");
		const inputEmail = wrapper.find('[data-testid="input_create-user_email"]').get("input");
		let errorMessageComponent = wrapper.find(".info-message.bc-error");
		expect(errorMessageComponent.exists()).toBeFalsy();

		await inputFirstName.setValue("Klara");
		await inputLastName.setValue("Fall");
		await inputEmail.setValue("klara.fall@mail.de");

		await wrapper.findComponent(VForm).trigger("submit.prevent");
		await flushPromises();

		errorMessageComponent = wrapper.find(".info-message.bc-error");
		expect(errorMessageComponent.exists()).toBeTruthy();
	});
});
