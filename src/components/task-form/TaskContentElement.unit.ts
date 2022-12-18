import { provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TaskContentElement from "@/components/task-form/TaskContentElement.vue";

const getWrapper = (props?: object, options?: object) => {
	return mount(TaskContentElement, {
		...createComponentMocks({
			i18n: true,
		}),
		setup() {
			provide("i18n", { t: (key: string) => key });
		},
		propsData: props,
		...options,
	});
};

// TODO Promise rejection - CKEditorError: bo.window.ResizeObserver is not a constructor
describe("@components/task-form/TaskContentElement", () => {
	it("should render component", () => {
		const wrapper = getWrapper({ value: "abc" });
		expect(wrapper.findComponent(TaskContentElement).exists()).toBe(true);
	});

	it("should emit delete-element event", async () => {
		const wrapper = getWrapper({ value: "abc" });
		const deleteBtn = wrapper.find('[data-testid="delete-element-btn"]');

		expect(deleteBtn.exists()).toBe(true);
		await deleteBtn.trigger("click");

		expect(wrapper.emitted("delete-element")).toBeTruthy();
	});

	it("should render drag handle", async () => {
		const wrapper = getWrapper({ value: "abc" });
		const dragBtn = wrapper.find('[data-testid="drag-element-btn"]');

		expect(dragBtn.exists()).toBe(true);
	});

	it("should render slot", async () => {
		const wrapper = getWrapper(
			{ value: "abc" },
			{ slots: { default: "<div id='slot'>slot content</div>" } }
		);
		const slot = wrapper.find("#slot");

		expect(slot.exists()).toBe(true);
		expect(slot.text()).toContain("slot content");
	});
});
