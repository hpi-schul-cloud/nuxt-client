import TeacherCreate from "./TeacherCreate.page.vue";
import InfoMessage from "@/components/administration/InfoMessage.vue";
import { createTestAppStore, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useUsersStore } from "@data-users";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { createRouterMock, getRouter, injectRouterMock } from "vue-router-mock";
import { VForm } from "vuetify/components";

vi.mock("vue-i18n", async (importOriginal) => {
	const actual = await importOriginal<typeof import("vue-i18n")>();
	return {
		...actual,
		useI18n: vi.fn().mockReturnValue({ t: (key: string) => key }),
	};
});

describe("teachers/new", () => {
	injectRouterMock(createRouterMock());

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestAppStore();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = () => {
		const usersStore = mockedPiniaStoreTyping(useUsersStore);

		const wrapper = mount(TeacherCreate, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper, usersStore };
	};

	describe("create teacher", () => {
		it("should call 'createTeacher' action", async () => {
			const { wrapper, usersStore } = setup();
			(usersStore.createUser as Mock).mockResolvedValue({ error: false, result: {} });

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
			expect(usersStore.createUser).toHaveBeenCalledWith(expectedPayload);
			expect(getRouter().push).toHaveBeenCalledWith("/administration/teachers");
		});
	});

	it("should set businessError to true if there is an error", async () => {
		const { wrapper, usersStore } = setup();
		(usersStore.createUser as Mock).mockResolvedValue({ error: true, result: {} });

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
		expect(usersStore.createUser).toHaveBeenCalled();
		expect(getRouter().push).not.toHaveBeenCalled();
	});
});
