import TeacherCreate from "./TeacherCreate.page.vue";
import InfoMessage from "@/components/administration/InfoMessage.vue";
import { createTestAppStore, mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useUsers } from "@data-users";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { createRouterMock, getRouter, injectRouterMock } from "vue-router-mock";
import { VForm } from "vuetify/components";

vi.mock("@data-users");
const useUsersMock = vi.mocked(useUsers);

describe("teachers/new", () => {
	let useUsersMockHandler: Mocked<ReturnType<typeof useUsers>>;
	injectRouterMock(createRouterMock());

	beforeEach(() => {
		useUsersMockHandler = mockComposable(useUsers);
		useUsersMock.mockReturnValue(useUsersMockHandler);
		setActivePinia(createTestingPinia());

		createTestAppStore();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = () => {
		const wrapper = mount(TeacherCreate, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper };
	};

	describe("create teacher", () => {
		it("should call 'createTeacher' action", async () => {
			useUsersMockHandler.createUser = vi.fn().mockResolvedValue({ error: false, result: {} });
			const { wrapper } = setup();

			const inputFirstName = wrapper.find('[data-testid="input_create-user_firstname"] input');
			const inputLastName = wrapper.find('[data-testid="input_create-user_lastname"] input');
			const inputEmail = wrapper.find('[data-testid="input_create-user_email"] input');

			await inputFirstName.setValue("Klara");
			await inputLastName.setValue("Fall");
			await inputEmail.setValue("klara.fall@mail.de");
			await wrapper.findComponent(VForm).trigger("submit.prevent");

			const expectedPayload = {
				firstName: "Klara",
				lastName: "Fall",
				email: "klara.fall@mail.de",
				generateRegistrationLink: true,
				roles: ["teacher"],
				schoolId: "school-1",
				sendRegistration: false,
			};

			await flushPromises();
			expect(useUsersMockHandler.createUser).toHaveBeenCalledWith(expectedPayload);
			expect(getRouter().push).toHaveBeenCalledWith("/administration/teachers");
		});
	});

	it("should set businessError to true if there is an error", async () => {
		useUsersMockHandler.createUser = vi.fn().mockResolvedValue({ error: true, result: {} });
		const { wrapper } = setup();
		const infoMessageBefore = wrapper.findComponent({ name: "InfoMessage" });

		expect(infoMessageBefore.exists()).toBe(false);

		const inputFirstName = wrapper.find('[data-testid="input_create-user_firstname"] input');
		const inputLastName = wrapper.find('[data-testid="input_create-user_lastname"] input');
		const inputEmail = wrapper.find('[data-testid="input_create-user_email"] input');

		await inputFirstName.setValue("Klara");
		await inputLastName.setValue("Fall");
		await inputEmail.setValue("klara.fall@mail.de");
		await wrapper.findComponent(VForm).trigger("submit.prevent");

		await flushPromises();

		const infoMessageAfter = wrapper.findComponent(InfoMessage);
		expect(infoMessageAfter.exists()).toBe(true);
		expect(useUsersMockHandler.createUser).toHaveBeenCalled();
		expect(getRouter().push).not.toHaveBeenCalled();
	});
});
