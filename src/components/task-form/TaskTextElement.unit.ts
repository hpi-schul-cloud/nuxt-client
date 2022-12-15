import { provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TaskTextElement from "@components/task-form/TaskTextElement.vue";

const getWrapper = (props?: object, options?: object) => {
	return mount(TaskTextElement, {
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
describe("@components/task-form/TaskTextElement", () => {
	it("should render component", () => {
		const wrapper = getWrapper({ value: "abc" });
		expect(wrapper.findComponent(TaskTextElement).exists()).toBe(true);
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

	it("should render ckeditor", async () => {
		const wrapper = getWrapper({ value: "abc" });
		const editor = wrapper.find('[data-testid="ckeditor"]');

		expect(editor.exists()).toBe(true);
	});
});
