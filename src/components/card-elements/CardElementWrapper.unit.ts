import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import CardElementWrapper from "@/components/card-elements/CardElementWrapper.vue";
import RichTextCardElement from "@/components/card-elements/RichTextCardElement.vue";
import TitleCardElement from "@/components/card-elements/TitleCardElement.vue";
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
	describe("editMode set to true", () => {
		it("should render component", () => {
			const wrapper = getWrapper({ editMode: true });
			expect(wrapper.findComponent(CardElementWrapper).exists()).toBe(true);
		});

		it("should emit delete-element event for rich text", async () => {
			const wrapper = getWrapper({
				component: CardElementComponentEnum.RichText,
				editMode: true,
			});
			const deleteBtn = wrapper.find('[data-testid="delete-element-btn"]');

			expect(deleteBtn.exists()).toBe(true);
			await deleteBtn.trigger("click");

			expect(wrapper.emitted("delete-element")).toBeTruthy();
		});

		it("should emit add-element event for rich text", async () => {
			const wrapper = getWrapper({
				component: CardElementComponentEnum.RichText,
				editMode: true,
			});
			const addBtn = wrapper.find('[data-testid="add-element-btn"]');

			expect(addBtn.exists()).toBe(true);
			await addBtn.trigger("click");

			expect(wrapper.emitted("add-element")).toBeTruthy();
		});

		it("should render drag handle for rich text", () => {
			const wrapper = getWrapper({
				component: CardElementComponentEnum.RichText,
				editMode: true,
			});
			const dragBtn = wrapper.find('[data-testid="drag-element-btn"]');

			expect(dragBtn.exists()).toBe(true);
		});

		it("should not render drag handle for title", () => {
			const wrapper = getWrapper({
				component: CardElementComponentEnum.Title,
				editMode: true,
			});
			const dragBtn = wrapper.find('[data-testid="drag-element-btn"]');

			expect(dragBtn.isVisible()).toBe(false);
		});

		it("should render dynamic component", () => {
			const wrapper = getWrapper({
				component: CardElementComponentEnum.RichText,
				editMode: true,
			});

			expect(wrapper.findComponent(RichTextCardElement).exists()).toBe(true);
		});
	});

	describe("editMode set to false", () => {
		it("should render component", () => {
			const wrapper = getWrapper({ editMode: false });
			expect(wrapper.findComponent(CardElementWrapper).exists()).toBe(true);
		});

		it("delete element button for title should not be present", () => {
			const wrapper = getWrapper({
				component: CardElementComponentEnum.Title,
				editMode: false,
			});
			const deleteBtn = wrapper.find('[data-testid="delete-element-btn"]');

			expect(deleteBtn.exists()).toBe(false);
		});

		it("delete element button for rich text should not be present", () => {
			const wrapper = getWrapper({
				component: CardElementComponentEnum.RichText,
				editMode: false,
			});
			const deleteBtn = wrapper.find('[data-testid="delete-element-btn"]');

			expect(deleteBtn.exists()).toBe(false);
		});

		it("add element button for title should not be present", () => {
			const wrapper = getWrapper({
				component: CardElementComponentEnum.Title,
				editMode: false,
			});
			const addBtn = wrapper.find('[data-testid="add-element-btn"]');

			expect(addBtn.exists()).toBe(false);
		});

		it("add element button for rich text should not be present", () => {
			const wrapper = getWrapper({
				component: CardElementComponentEnum.RichText,
				editMode: false,
			});
			const addBtn = wrapper.find('[data-testid="add-element-btn"]');

			expect(addBtn.exists()).toBe(false);
		});

		it("drag element button for title should not be present", () => {
			const wrapper = getWrapper({
				component: CardElementComponentEnum.Title,
				editMode: false,
			});
			const dragBtn = wrapper.find('[data-testid="drag-element-btn"]');

			expect(dragBtn.exists()).toBe(false);
		});

		it("drag element button for rich text should not be present", () => {
			const wrapper = getWrapper({
				component: CardElementComponentEnum.RichText,
				editMode: false,
			});
			const dragBtn = wrapper.find('[data-testid="drag-element-btn"]');

			expect(dragBtn.exists()).toBe(false);
		});

		it("should render title component", () => {
			const wrapper = getWrapper({
				component: CardElementComponentEnum.Title,
				editMode: false,
			});

			expect(wrapper.findComponent(TitleCardElement).exists()).toBe(true);
		});

		it("should render rich text component", () => {
			const wrapper = getWrapper({
				component: CardElementComponentEnum.RichText,
				editMode: false,
			});

			expect(wrapper.findComponent(RichTextCardElement).exists()).toBe(true);
		});
	});
});
