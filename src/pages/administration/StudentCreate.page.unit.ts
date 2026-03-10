import StudentCreate from "./StudentCreate.page.vue";
import { createTestAppStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useAppStore } from "@data-app";
import { useUsers } from "@data-users";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { Router, useRouter } from "vue-router";
import { VForm } from "vuetify/components";

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

	describe("create student", () => {
		it("should call 'createStudent' action", async () => {
			useUsersMockHandler.createUser = vi.fn().mockResolvedValue({ error: false, result: {} });
			const { wrapper } = setup();

			const testDate = new Date("2000-01-01T00:00:00.000Z");

			const inputFirstName = wrapper.find('[data-testid="input_create-user_firstname"] input');
			const inputLastName = wrapper.find('[data-testid="input_create-user_lastname"] input');
			const inputEmail = wrapper.find('[data-testid="input_create-user_email"] input');

			await inputFirstName.setValue("Klara");
			await inputLastName.setValue("Fall");
			await inputEmail.setValue("klara.fall@mail.de");

			const inputBirthdayValue = wrapper.findComponent('[data-testid="input_create-student_birthdate"]');
			inputBirthdayValue.setValue(testDate);

			await wrapper.findComponent(VForm).trigger("submit.prevent");

			const expectedPayload = {
				firstName: "Klara",
				lastName: "Fall",
				email: "klara.fall@mail.de",
				birthday: testDate,
				roles: ["student"],
				schoolId: useAppStore().school?.id,
				sendRegistration: false,
			};

			await flushPromises();

			expect(useUsersMockHandler.createUser).toHaveBeenCalledWith(expectedPayload);
			expect(router.push).toHaveBeenCalledWith("/administration/students");
		});

		it("should set businessError to true if there is an error", async () => {
			useUsersMockHandler.createUser = vi.fn().mockResolvedValue({ error: true, result: {} });
			const { wrapper } = setup();
			const infoMessageBefore = wrapper.findComponent({ name: "InfoMessage" });

			expect(infoMessageBefore.exists()).toBe(false);

			const inputFirstName = wrapper.find('[data-testid="input_create-user_firstname"] input');
			const inputLastName = wrapper.find('[data-testid="input_create-user_lastname"] input');
			const inputEmail = wrapper.find('[data-testid="input_create-user_email"] input');
			const inputBirthday = wrapper.find('[data-testid="input_create-student_birthdate"] input');

			await inputFirstName.setValue("Klara");
			await inputLastName.setValue("Fall");
			await inputEmail.setValue("klara.fall@mail.de");
			await inputBirthday.setValue("01.01.2000");
			await inputBirthday.trigger("input");

			await wrapper.findComponent(VForm).trigger("submit.prevent");

			await flushPromises();

			const infoMessageAfter = wrapper.findComponent({ name: "InfoMessage" });
			expect(infoMessageAfter.exists()).toBe(true);
			expect(useUsersMockHandler.createUser).toHaveBeenCalled();
			expect(router.push).not.toHaveBeenCalled();
		});
	});
});
