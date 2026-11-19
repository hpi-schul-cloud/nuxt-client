import CourseGroupForm from "./CourseGroupForm.vue";
import { createTestAppStore } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VAutocomplete, VTextField } from "vuetify/components";

describe("CourseGroupForm", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestAppStore();
	});

	const studentOptions = [
		{ title: "Ada Lovelace", value: "user-1" },
		{ title: "Alan Turing", value: "user-2" },
	];

	const setup = (props: Partial<InstanceType<typeof CourseGroupForm>["$props"]> = {}) =>
		mount(CourseGroupForm, {
			props: { studentOptions, ...props },
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			attachTo: document.body,
		});

	it("should put the legacy test ids on the inner inputs", () => {
		const wrapper = setup();

		expect(wrapper.find('input[data-testid="group-name-field"]').exists()).toBe(true);
		expect(wrapper.find('input[data-testid="group-member-field"]').exists()).toBe(true);
	});

	it("should prefill name and members", () => {
		const wrapper = setup({ initialName: "Group A", initialMemberIds: ["user-2"] });

		expect(wrapper.findComponent(VTextField).props("modelValue")).toBe("Group A");
		expect(wrapper.findComponent(VAutocomplete).props("modelValue")).toEqual(["user-2"]);
		expect(wrapper.findComponent(VAutocomplete).props("items")).toEqual(studentOptions);
	});

	it("should take over initial values that arrive later", async () => {
		const wrapper = setup();

		await wrapper.setProps({ initialName: "Loaded", initialMemberIds: ["user-1"] });

		expect(wrapper.findComponent(VTextField).props("modelValue")).toBe("Loaded");
		expect(wrapper.findComponent(VAutocomplete).props("modelValue")).toEqual(["user-1"]);
	});

	it("should emit the trimmed name and the selected members on submit", async () => {
		const wrapper = setup({ initialMemberIds: ["user-1"] });

		await wrapper.findComponent(VTextField).vm.$emit("update:modelValue", "  Group A  ");
		await wrapper.find("form").trigger("submit");
		await flushPromises();

		expect(wrapper.emitted("submit")).toEqual([[{ name: "Group A", userIds: ["user-1"] }]]);
	});

	it("should not emit submit without a name", async () => {
		const wrapper = setup();

		await wrapper.find("form").trigger("submit");
		await flushPromises();

		expect(wrapper.emitted("submit")).toBeUndefined();
	});

	it("should emit cancel", async () => {
		const wrapper = setup();

		await wrapper.find('[data-testid="course-group-cancel"]').trigger("click");

		expect(wrapper.emitted("cancel")).toHaveLength(1);
	});

	it("should label the submit button for create and edit", () => {
		expect(setup().find('[data-testid="create-course-group"]').text()).toBe(
			"pages.courseRoomDetails.groups.form.submit.create"
		);
		expect(setup({ isEdit: true }).find('[data-testid="create-course-group"]').text()).toBe(
			"pages.courseRoomDetails.groups.form.submit.save"
		);
	});
});
