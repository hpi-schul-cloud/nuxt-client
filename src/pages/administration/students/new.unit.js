import { default as NewStudent } from "./new.vue";
import mock$objects from "../../../../tests/test-utils/pageStubs";

describe("students/new", () => {
	const createStudentStub = jest.fn();
	const mockStore = {
		auth: {
			state: () => ({
				user: {
					permissions: ["STUDENT_CREATE"],
				},
			}),
		},
		users: {
			actions: {
				createStudent: createStudentStub,
				businessError: jest.fn(),
			},
			getters: {
				businessError: jest.fn(),
			},
			mutations: {
				resetBusinessError: jest.fn(),
			},
			state: () => ({
				businessError: "null",
			}),
		},
	};

	it(...isValidComponent(NewStudent));

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
