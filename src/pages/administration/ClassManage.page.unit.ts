import ClassManage from "./ClassManage.page.vue";
import { createTestAppStoreWithPermissions, mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { Permission } from "@api-server";
import { useEnvConfig } from "@data-env";
import { useClassFormOptions, useGroupClasses } from "@data-group";
import { useUsersStore } from "@data-users";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";
import { computed, ref } from "vue";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

vi.mock("@data-group");
vi.mock("@data-users");
vi.mock("@data-env", async (importOriginal) => {
	const actual = await importOriginal<typeof import("@data-env")>();
	const { ref } = await import("vue");
	return {
		...actual,
		useEnvConfig: vi.fn(() =>
			ref({
				FEATURE_CONSENT_NECESSARY: true,
				SC_THEME: "default",
				SC_TITLE: "dbildungscloud",
			})
		),
	};
});

const useGroupClassesMock = vi.mocked(useGroupClasses);
const useClassFormOptionsMock = vi.mocked(useClassFormOptions);
const useUsersStoreMock = vi.mocked(useUsersStore);

describe("ClassManage.page", () => {
	let useGroupClassesMockHandler: Mocked<ReturnType<typeof useGroupClasses>>;
	let useClassFormOptionsMockHandler: Mocked<ReturnType<typeof useClassFormOptions>>;
	let useUsersStoreMockHandler: Mocked<ReturnType<typeof useUsersStore>>;
	const router = createRouterMock();
	injectRouterMock(router);

	beforeEach(() => {
		const pinia = createTestingPinia();
		setActivePinia(pinia);
		createTestAppStoreWithPermissions([Permission.CLASS_EDIT, Permission.STUDENT_LIST], pinia);

		useGroupClassesMockHandler = mockComposable(useGroupClasses, {
			fetchClassById: vi.fn().mockResolvedValue({
				_id: "class123",
				name: "5a",
				teacherIds: [{ _id: "teacher1", firstName: "Max", lastName: "Mustermann" }],
				userIds: [{ _id: "student1", firstName: "Tim", lastName: "Tester" }],
			}),
			updateClass: vi.fn().mockResolvedValue({ success: true }),
			isMutating: computed(() => false),
		});
		useGroupClassesMock.mockReturnValue(useGroupClassesMockHandler);

		useClassFormOptionsMockHandler = mockComposable(useClassFormOptions, {
			schoolYearOptions: computed(() => [{ title: "2023/2024", value: "year123" }]),
			activeYearId: computed(() => "year123"),
			teacherOptions: computed(() => [
				{ title: "Max Mustermann", value: "teacher1" },
				{ title: "Anna Schmidt", value: "teacher2" },
			]),
			studentOptions: computed(() => [
				{ title: "Tim Tester", value: "student1" },
				{ title: "Lisa Mueller", value: "student2" },
			]),
			defaultTeacherIds: computed(() => []),
			loadTeachers: vi.fn().mockResolvedValue(undefined),
			loadStudents: vi.fn().mockResolvedValue(undefined),
			isAdmin: computed(() => true),
		});
		useClassFormOptionsMock.mockReturnValue(useClassFormOptionsMockHandler);

		useUsersStoreMockHandler = mockComposable(useUsersStore, {
			sendRegistrationLink: vi.fn().mockResolvedValue(undefined),
		});
		useUsersStoreMock.mockReturnValue(useUsersStoreMockHandler);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (props = { classId: "class123" }) => {
		const wrapper = mount(ClassManage, {
			props,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper };
	};

	it("fetches class data and loads teachers and students on mount", async () => {
		setup();
		await flushPromises();

		expect(useClassFormOptionsMockHandler.loadTeachers).toHaveBeenCalled();
		expect(useClassFormOptionsMockHandler.loadStudents).toHaveBeenCalled();
		expect(useGroupClassesMockHandler.fetchClassById).toHaveBeenCalledWith("class123", {
			$populate: ["teacherIds", "userIds"],
		});
	});

	it("renders rename class button pointing to edit route", async () => {
		const { wrapper } = setup();
		await flushPromises();

		const renameBtn = wrapper.find('[data-testid="rename-class-btn"]');
		expect(renameBtn.exists()).toBe(true);
	});

	it("renders teacher and student selection controls", async () => {
		const { wrapper } = setup();
		await flushPromises();

		expect(wrapper.find('[data-testid="teacher-selection-on-manage-class"]').exists()).toBe(true);
		expect(wrapper.find('[data-testid="student-selection-on-manage-class"]').exists()).toBe(true);
	});

	it("submits update with selected teachers and students", async () => {
		const { wrapper } = setup();
		await flushPromises();

		const form = wrapper.find("form");
		expect(form.exists()).toBe(true);

		await form.trigger("submit");
		await flushPromises();

		expect(useGroupClassesMockHandler.updateClass).toHaveBeenCalledWith("class123", {
			teacherIds: ["teacher1"],
			userIds: ["student1"],
		});
		expect(router.push).toHaveBeenCalledWith("/administration/groups/classes");
	});

	it("navigates to overview on cancel", async () => {
		const { wrapper } = setup();
		await flushPromises();

		const cancelBtn = wrapper.find('[data-testid="button_manage_cancel"]');
		expect(cancelBtn.exists()).toBe(true);

		await cancelBtn.trigger("click");
		await flushPromises();

		expect(router.push).toHaveBeenCalledWith("/administration/groups/classes");
	});

	it("triggers send registration links when button is clicked", async () => {
		const { wrapper } = setup();
		await flushPromises();

		const sendBtn = wrapper.find('[data-testid="send-registration-links-btn"]');
		expect(sendBtn.exists()).toBe(true);

		await sendBtn.trigger("click");
		await flushPromises();

		expect(useUsersStoreMockHandler.sendRegistrationLink).toHaveBeenCalledWith({
			userIds: ["student1"],
			selectionType: "inclusive",
		});
	});

	it("disables the registration links button when the class has no students", async () => {
		useGroupClassesMockHandler.fetchClassById.mockResolvedValue({
			_id: "class123",
			name: "5a",
			teacherIds: [],
			userIds: [],
		});

		const { wrapper } = setup();
		await flushPromises();

		const sendBtn = wrapper.find('[data-testid="send-registration-links-btn"]');
		expect(sendBtn.attributes("disabled")).toBeDefined();
	});

	describe("when the class could not be loaded", () => {
		beforeEach(() => {
			useGroupClassesMockHandler.fetchClassById.mockResolvedValue(undefined);
		});

		it("disables the save button", async () => {
			const { wrapper } = setup();
			await flushPromises();

			const saveBtn = wrapper.find('[data-testid="manage-confirm"]');
			expect(saveBtn.attributes("disabled")).toBeDefined();
		});

		it("does not send an update when the form is submitted", async () => {
			const { wrapper } = setup();
			await flushPromises();

			await wrapper.find("form").trigger("submit");
			await flushPromises();

			expect(useGroupClassesMockHandler.updateClass).not.toHaveBeenCalled();
		});

		it("does not send registration links", async () => {
			const { wrapper } = setup();
			await flushPromises();

			await wrapper.find('[data-testid="send-registration-links-btn"]').trigger("click");
			await flushPromises();

			expect(useUsersStoreMockHandler.sendRegistrationLink).not.toHaveBeenCalled();
		});
	});

	it("renders expansion panels for guidance notes", async () => {
		const { wrapper } = setup();
		await flushPromises();

		const panels = wrapper.find('[data-testid="class-manage-expansion-panels"]');
		expect(panels.exists()).toBe(true);
	});

	it("handles non-admin and filters unassigned students when lacking STUDENT_LIST permission", async () => {
		useClassFormOptionsMockHandler.isAdmin = computed(() => false);
		const pinia = createTestingPinia();
		setActivePinia(pinia);
		createTestAppStoreWithPermissions([Permission.CLASS_EDIT], pinia);

		const { wrapper } = setup();
		await flushPromises();

		expect(wrapper.find('[data-testid="teacher-selection-on-manage-class"]').exists()).toBe(true);
		expect(wrapper.find('[data-testid="student-selection-on-manage-class"]').exists()).toBe(true);
	});

	describe("consent notice", () => {
		const mockEnvConfig = (config: { FEATURE_CONSENT_NECESSARY: boolean; SC_THEME: string }) => {
			vi.mocked(useEnvConfig).mockReturnValue(
				ref({ SC_TITLE: "dbildungscloud", ...config }) as ReturnType<typeof useEnvConfig>
			);
		};

		afterEach(() => {
			mockEnvConfig({ FEATURE_CONSENT_NECESSARY: true, SC_THEME: "default" });
		});

		it("shows the Niedersachsen notice when consent is not necessary", async () => {
			mockEnvConfig({ FEATURE_CONSENT_NECESSARY: false, SC_THEME: "n21" });
			const { wrapper } = setup();
			await flushPromises();

			expect(wrapper.find('[data-testid="class-manage-no-consent-notice"]').exists()).toBe(true);
			expect(wrapper.text()).toContain("pages.administration.classes.noConsentNecessary.n21.headline");
			expect(wrapper.text()).toContain("pages.administration.classes.noConsentNecessary.n21.firstParagraph");
		});

		it("shows the Brandenburg notice when consent is not necessary", async () => {
			mockEnvConfig({ FEATURE_CONSENT_NECESSARY: false, SC_THEME: "brb" });
			const { wrapper } = setup();
			await flushPromises();

			expect(wrapper.text()).toContain("pages.administration.classes.noConsentNecessary.brb.headline");
			expect(wrapper.text()).toContain("pages.administration.classes.noConsentNecessary.brb.firstParagraph");
			expect(wrapper.text()).not.toContain("pages.administration.classes.noConsentNecessary.n21");
		});

		it("shows the generic notice without a state-specific paragraph for other themes", async () => {
			mockEnvConfig({ FEATURE_CONSENT_NECESSARY: false, SC_THEME: "default" });
			const { wrapper } = setup();
			await flushPromises();

			expect(wrapper.find('[data-testid="class-manage-no-consent-notice"]').exists()).toBe(true);
			expect(wrapper.text()).toContain("pages.administration.classes.studentsNotInSystem");
			expect(wrapper.text()).not.toContain("pages.administration.classes.noConsentNecessary");
		});

		it("does not show the notice when consent is necessary", async () => {
			mockEnvConfig({ FEATURE_CONSENT_NECESSARY: true, SC_THEME: "n21" });
			const { wrapper } = setup();
			await flushPromises();

			expect(wrapper.find('[data-testid="class-manage-no-consent-notice"]').exists()).toBe(false);
		});
	});
});
