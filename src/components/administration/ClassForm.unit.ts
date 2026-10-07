import ClassForm from "./ClassForm.vue";
import { createTestAppStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { VBtnToggle, VCheckbox, VForm, VSelect, VTextField } from "vuetify/components";

describe("ClassForm.vue", () => {
	const router = createRouterMock();
	injectRouterMock(router);

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestAppStore();
	});

	const defaultProps = {
		schoolYearOptions: [
			{ title: "2023/2024", value: "year1" },
			{ title: "2024/2025", value: "year2" },
		],
		teacherOptions: [
			{ title: "Teacher One", value: "t1" },
			{ title: "Teacher Two", value: "t2" },
		],
		initialData: {
			year: "year1",
			gradeLevel: 6 as number | undefined,
			classSuffix: "b",
			isCustom: false,
			customName: "",
			keepYear: true,
			teacherIds: [] as string[],
		},
	};

	const setup = (props = defaultProps) => {
		const wrapper = mount(ClassForm, {
			props,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper };
	};

	it("renders preview with initial standard class name", () => {
		const { wrapper } = setup();
		const previewName = wrapper.find('[data-testid="class_preview_name"]');
		expect(previewName.text()).toBe("6b");
	});

	it("updates preview when grade or suffix changes", async () => {
		const { wrapper } = setup();

		const suffixInput = wrapper.findComponent<typeof VTextField>('[data-testid="input_class_suffix"]');
		await suffixInput.vm.$emit("update:modelValue", "c");
		await flushPromises();

		const previewName = wrapper.find('[data-testid="class_preview_name"]');
		expect(previewName.text()).toBe("6c");
	});

	it("switches to custom mode and updates preview", async () => {
		const { wrapper } = setup();

		const modeToggle = wrapper.findComponent<typeof VBtnToggle>('[data-testid="toggle_class_mode"]');
		await modeToggle.vm.$emit("update:modelValue", true);
		await flushPromises();

		const customNameInput = wrapper.findComponent<typeof VTextField>('[data-testid="input_class_custom_name"]');
		await customNameInput.vm.$emit("update:modelValue", "Froschklasse");
		await flushPromises();

		const previewName = wrapper.find('[data-testid="class_preview_name"]');
		expect(previewName.text()).toBe("Froschklasse");
	});

	it("disables school year selector when custom class keepYear is false", async () => {
		const { wrapper } = setup();

		const modeToggle = wrapper.findComponent<typeof VBtnToggle>('[data-testid="toggle_class_mode"]');
		await modeToggle.vm.$emit("update:modelValue", true);
		await flushPromises();

		const keepYearCheckbox = wrapper.findComponent<typeof VCheckbox>('[data-testid="checkbox_class_keep_year"]');
		await keepYearCheckbox.vm.$emit("update:modelValue", false);
		await flushPromises();

		const yearSelect = wrapper.findComponent<typeof VSelect>('[data-testid="input_class_school_year"]');
		expect(yearSelect.props("disabled")).toBe(true);
	});

	it("emits submit event with valid standard class payload", async () => {
		const { wrapper } = setup();

		await wrapper.findComponent(VForm).trigger("submit.prevent");
		await flushPromises();

		expect(wrapper.emitted("submit")).toBeTruthy();
		expect(wrapper.emitted("submit")?.[0][0]).toEqual({
			name: "b",
			gradeLevel: 6,
			year: "year1",
			teacherIds: [],
		});
	});

	it("emits submit event with custom class payload", async () => {
		const { wrapper } = setup({
			...defaultProps,
			initialData: {
				year: "year1",
				gradeLevel: undefined,
				classSuffix: "",
				teacherIds: [],
				isCustom: true,
				customName: "Froschklasse",
				keepYear: true,
			},
		});

		await wrapper.findComponent(VForm).trigger("submit.prevent");
		await flushPromises();

		expect(wrapper.emitted("submit")).toBeTruthy();
		expect(wrapper.emitted("submit")?.[0][0]).toEqual({
			name: "Froschklasse",
			gradeLevel: undefined,
			year: "year1",
			teacherIds: [],
		});
	});
});
