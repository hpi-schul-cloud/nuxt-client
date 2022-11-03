import { default as NewStudent } from "./StudentCreate.page.vue";
import mock$objects from "../../../tests/test-utils/pageStubs";
import setupStores from "@@/tests/test-utils/setupStores";
import AuthModule from "@/store/auth";

describe("students/new", () => {
	const createStudentStub = jest.fn();
	const mockStore = {
		auth: {
			getters: {
				getUser: () => ({
					permissions: ["STUDENT_CREATE"],
				}),
			},
		},
		users: {
			actions: {
				createStudent: createStudentStub,
				businessError: jest.fn(),
			},
			getters: {
				getBusinessError: jest.fn(),
			},
			mutations: {
				resetBusinessError: jest.fn(),
			},
			state: () => ({
				businessError: "null",
			}),
		},
	};

	beforeEach(() => {
		setupStores({ authModule: AuthModule });
	});

	it("should call 'createStudent' action", async () => {
		const wrapper = mount(NewStudent, {
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
		expect(createStudentStub).toHaveBeenCalled();
	});
});
