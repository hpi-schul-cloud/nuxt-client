import StudentCreate from "./StudentCreate.page.vue";
import { createTestAppStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useUsers } from "@data-users";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { Router, useRouter } from "vue-router";

vi.mock("vue-i18n", () => ({
	useI18n: () => ({ t: (key: string) => key }),
	createI18n: () => ({
		global: {
			t: (key: string) => key,
		},
	}),
}));

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;

vi.mock("@data-users");
const useUsersMock = vi.mocked(useUsers);

describe("students/new", () => {
	let useUsersMockHandler: DeepMocked<ReturnType<typeof useUsers>>;
	const router = createMock<Router>();
	useRouterMock.mockReturnValue(router);

	beforeEach(() => {
		useUsersMockHandler = createMock<ReturnType<typeof useUsers>>();
		useUsersMock.mockReturnValue(useUsersMockHandler);
		setActivePinia(createTestingPinia());

		createTestAppStore();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = () => {
		const wrapper = mount(StudentCreate, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper };
	};

	it("should call 'createStudent' action", async () => {
		const { wrapper } = setup();

		const inputFirstName = wrapper.find('[data-testid="input_create-user_firstname"] input');
		const inputLastName = wrapper.find('[data-testid="input_create-user_lastname"] input');
		const inputEmail = wrapper.find('[data-testid="input_create-user_email"] input');
		const inputBirthday = wrapper.find('[data-testid="input_create-student_birthdate"] input');

		await inputFirstName.setValue("Klara");
		await inputLastName.setValue("Fall");
		await inputEmail.setValue("klara.fall@mail.de");
		await inputBirthday.setValue("01.01.2000");
		await inputBirthday.trigger("input");
		const submitButton = wrapper.find('button[data-testid="button_create-user_submit"]');
		await submitButton.trigger("click");

		const expectedPayload = {
			firstName: "Klara",
			lastName: "Fall",
			email: "klara.fall@mail.de",
			birthday: "",
			roles: ["student"],
			schoolId: "school-1",
			sendRegistration: false,
		};

		await flushPromises();

		expect(useUsersMockHandler.createUser).toHaveBeenCalledWith(expectedPayload);
		expect(router.push).toHaveBeenCalledWith("/administration/students");
	});
});
