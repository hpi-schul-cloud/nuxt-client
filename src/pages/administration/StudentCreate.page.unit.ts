import StudentCreatePage from "./StudentCreate.page.vue";
import { createTestAppStore } from "@@/tests/test-utils";
import mock$objects from "@@/tests/test-utils/pageStubs";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VForm } from "vuetify/components";
import { createStore } from "vuex";

vi.mock("vue-router", () => ({
	useRouter: vi.fn(),
}));

const createMockStore = () => {
	const createStudentStub = vi.fn();
	const mockStore = createStore({
		modules: {
			users: {
				namespaced: true,
				actions: {
					createStudent: createStudentStub,
					businessError: vi.fn(),
				},
				getters: {
					getBusinessError: vi.fn(),
				},
				mutations: {
					resetBusinessError: vi.fn(),
				},
				state: () => ({
					businessError: "null",
				}),
			},
		},
	});

	return { mockStore, createStudentStub };
};

describe("students/new", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestAppStore();
	});

	const setup = () => {
		const { mockStore, createStudentStub } = createMockStore();

		const wrapper = mount(StudentCreatePage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$store: mockStore,
				},
			},
		});
		mock$objects(wrapper);

		return { wrapper, createStudentStub };
	};

	it("should call 'createStudent' action", async () => {
		const { wrapper, createStudentStub } = setup();

		const inputFirstName = wrapper.find('[data-testid="input_create-user_firstname"]').get("input");
		const inputLastName = wrapper.find('[data-testid="input_create-user_lastname"]').get("input");
		const inputEmail = wrapper.find('[data-testid="input_create-user_email"]').get("input");

		await inputFirstName.setValue("Klara");
		await inputLastName.setValue("Fall");
		await inputEmail.setValue("klara.fall@mail.de");

		await wrapper.findComponent(VForm).trigger("submit.prevent");
		await flushPromises();

		expect(createStudentStub).toHaveBeenCalled();
	});
});
