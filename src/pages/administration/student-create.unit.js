import AuthModule from "@/store/auth";
import NotifierModule from "@/store/notifier";
import { meResponseFactory } from "@@/tests/test-utils";
import mock$objects from "@@/tests/test-utils/pageStubs";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { nextTick } from "vue";
import { createStore } from "vuex";
import NewStudent from "./StudentCreate.page.vue";

jest.mock("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

const createMockStore = () => {
	const createStudentStub = vi.fn();
	const mockStore = createStore({
		modules: {
			auth: {
				namespaced: true,
				getters: {
					getUser: () => ({
						permissions: ["STUDENT_CREATE"],
					}),
				},
			},
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
		setupStores({ authModule: AuthModule, notifierModule: NotifierModule });
	});

	const setup = () => {
		const { mockStore, createStudentStub } = createMockStore();
		const mockMe = meResponseFactory.build();

		const wrapper = mount(NewStudent, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$store: mockStore,
					$me: mockMe,
					$t: (key) => key,
				},
			},
		});
		mock$objects(wrapper);

		return { wrapper, createStudentStub };
	};

	it("should call 'createStudent' action", async () => {
		const { wrapper, createStudentStub } = setup();

		const inputFirstName = wrapper
			.find('[data-testid="input_create-user_firstname"]')
			.get("input");
		const inputLastName = wrapper
			.find('[data-testid="input_create-user_lastname"]')
			.get("input");
		const inputEmail = wrapper
			.find('[data-testid="input_create-user_email"]')
			.get("input");

		inputFirstName.setValue("Klara");
		inputLastName.setValue("Fall");
		inputEmail.setValue("klara.fall@mail.de");
		const submitButton = wrapper.find(
			'button[data-testid="button_create-user_submit"]'
		);
		await submitButton.trigger("click");

		await nextTick();
		await nextTick();
		expect(createStudentStub).toHaveBeenCalled();
	});
});
