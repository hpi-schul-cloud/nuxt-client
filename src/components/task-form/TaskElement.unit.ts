import { provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import TaskElement from "@/components/task-form/TaskElement.vue";
import TaskTextElement from "@/components/task-form/TaskTextElement.vue";
import { ElementComponentEnum } from "@/store/types/task";

const getWrapper = (props?: object, options?: object) => {
	return mount(TaskElement, {
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

describe("@components/task-form/TaskElement", () => {
	it("should render component", () => {
		const wrapper = getWrapper();
		expect(wrapper.findComponent(TaskElement).exists()).toBe(true);
	});

	it("should emit delete-element event for rich text", async () => {
		const wrapper = getWrapper({
			component: ElementComponentEnum.RichText,
		});
		const deleteBtn = wrapper.find('[data-testid="delete-element-btn"]');

		expect(deleteBtn.exists()).toBe(true);
		await deleteBtn.trigger("click");

		expect(wrapper.emitted("delete-element")).toBeTruthy();
	});

	it("should render drag handle for rich text", async () => {
		const wrapper = getWrapper({
			component: ElementComponentEnum.RichText,
		});
		const dragBtn = wrapper.find('[data-testid="drag-element-btn"]');

		expect(dragBtn.exists()).toBe(true);
	});

	it("should not render drag handle for title", async () => {
		const wrapper = getWrapper({
			component: ElementComponentEnum.Title,
		});
		const dragBtn = wrapper.find('[data-testid="drag-element-btn"]');

		expect(dragBtn.exists()).toBe(false);
	});

	it("should render dynamic component", async () => {
		const wrapper = getWrapper({
			component: ElementComponentEnum.RichText,
		});

		expect(wrapper.findComponent(TaskTextElement).exists()).toBe(true);
	});
});
