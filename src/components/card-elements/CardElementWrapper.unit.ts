import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import CardElementWrapper from "@/components/card-elements/CardElementWrapper.vue";
import RichTextCardElement from "@/components/card-elements/RichTextCardElement.vue";
import { CardElementComponentEnum } from "@/store/types/card-element";

const getWrapper = (props?: object, options?: object) => {
	return mount(CardElementWrapper, {
		...createComponentMocks({
			i18n: true,
		}),
		provide: {
			i18n: { t: (key: string) => key },
		},
		propsData: props,
		...options,
	});
};

describe("@components/card-elements/CardElementWrapper", () => {
	it("should render component", () => {
		const wrapper = getWrapper();
		expect(wrapper.findComponent(CardElementWrapper).exists()).toBe(true);
	});

	it("should emit delete-element event for rich text", async () => {
		const wrapper = getWrapper({
			component: CardElementComponentEnum.RichText,
		});
		const deleteBtn = wrapper.find('[data-testid="delete-element-btn"]');

		expect(deleteBtn.exists()).toBe(true);
		await deleteBtn.trigger("click");

		expect(wrapper.emitted("delete-element")).toBeTruthy();
	});

	it("should emit add-element event for rich text", async () => {
		const wrapper = getWrapper({
			component: CardElementComponentEnum.RichText,
		});
		const addBtn = wrapper.find('[data-testid="add-element-btn"]');

		expect(addBtn.exists()).toBe(true);
		await addBtn.trigger("click");

		expect(wrapper.emitted("add-element")).toBeTruthy();
	});

	it("should render drag handle for rich text", async () => {
		const wrapper = getWrapper({
			component: CardElementComponentEnum.RichText,
		});
		const dragBtn = wrapper.find('[data-testid="drag-element-btn"]');

		expect(dragBtn.exists()).toBe(true);
	});

	it("should not render drag handle for title", async () => {
		const wrapper = getWrapper({
			component: CardElementComponentEnum.Title,
		});
		const dragBtn = wrapper.find('[data-testid="drag-element-btn"]');

		expect(dragBtn.isVisible()).toBe(false);
	});

	it("should render dynamic component", async () => {
		const wrapper = getWrapper({
			component: CardElementComponentEnum.RichText,
		});

		expect(wrapper.findComponent(RichTextCardElement).exists()).toBe(true);
	});
});
