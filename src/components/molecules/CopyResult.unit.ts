import { mount } from "@vue/test-utils";
import CopyResult from "./CopyResult.vue";

declare let createComponentMocks: Function;

const propsData = {
	items: [
		{
			id: "1",
			type: "lesson",
			title: "Lesson 1",
			status: "success",
			index: 0,
			elements: [
				{ index: 1, type: "file", title: "file_1.jpg", status: "success" },
				{ index: 2, type: "file", title: "file_2.jpg", status: "success" },
			],
		},
		{
			id: "4",
			title: "Task 2",
			type: "task",
			status: "partial",
			index: 3,
			elements: [
				{ index: 4, type: "file", title: "file_3.jpg", status: "success" },
				{ index: 5, type: "file", title: "file_4.jpg", status: "failure" },
			],
		},
		{
			id: "7",
			title: "Lesson 2",
			type: "lesson",
			status: "success",
			index: 6,
			elements: [
				{ index: 7, type: "file", title: "file_5.jpg", status: "success" },
				{ index: 8, type: "file", title: "file_6.jpg", status: "success" },
			],
		},
		{
			id: "10",
			title: "Lesson 3",
			type: "lesson",
			status: "partial",
			index: 9,
			elements: [
				{ index: 10, type: "file", title: "file_7.jpg", status: "failure" },
				{ index: 11, type: "file", title: "file_8.jpg", status: "success" },
			],
		},
	],
	showSpinner: false,
};

const getWrapper: any = (props: object, options?: object) => {
	return mount(CopyResult, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/molecules/CopyResult", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
	});

	it("should have correct props and configuration", async () => {
		const wrapper = getWrapper(propsData);

		expect(wrapper.vm.items).toStrictEqual(propsData.items);
		expect(wrapper.vm.showSpinner).toStrictEqual(propsData.showSpinner);
	});

	it("should nodes be expanded and collapsed according to the status property inside the items", async () => {
		const wrapper = getWrapper(propsData);
		await wrapper.vm.$nextTick();
		const openedNodes = wrapper.findAll(`[aria-expanded="true"]`);
		const closedNodes = wrapper.findAll(`[aria-expanded="false"]`);

		expect(openedNodes.wrappers[0].vm.item.title).toStrictEqual("Task 2");
		expect(openedNodes.wrappers[1].vm.item.title).toStrictEqual("Lesson 3");

		expect(closedNodes.wrappers[0].vm.item.title).toStrictEqual("Lesson 1");
		expect(closedNodes.wrappers[3].vm.item.title).toStrictEqual("Lesson 2");
	});

	it("should calculate which nodes are opened", async () => {
		const wrapper = getWrapper(propsData);
		await wrapper.vm.$nextTick();

		const expectedExpandedNodes = [3, 9];
		expect(wrapper.vm.expandedNodes).toStrictEqual(expectedExpandedNodes);
	});

	it("should show spinner when its prop set", async () => {
		const wrapper = getWrapper(propsData);
		await wrapper.vm.$nextTick();
		const spinnerElementBefore = wrapper.findAll(".spinner");
		expect(spinnerElementBefore).toHaveLength(0);

		await wrapper.setProps({ showSpinner: true });
		const spinnerElementAfter = wrapper.find(".spinner");
		expect(spinnerElementAfter.vm.isVisible).toBe(true);
	});

	it("should all items have accessibility text", async () => {
		const wrapper = getWrapper(propsData);
		await wrapper.vm.$nextTick();

		const elementsDone = wrapper.findAll(".treeview-item-success");
		const elementsPartial = wrapper.findAll(".treeview-item-partial");
		const elementsError = wrapper.findAll(".treeview-item-failure");
		const textDone = wrapper.vm.$i18n.t(
			"components.molecules.copyResult.aria.parentItem.info",
			{
				itemTitle: propsData.items[0].title,
				itemStatus: wrapper.vm.$i18n.t(
					`common.labels.${propsData.items[0].status}`
				),
				includedItems: propsData.items[0].elements.length,

				action: wrapper.vm.$i18n.t("common.labels.expand"),
			}
		);
		const textPartial = wrapper.vm.$i18n.t(
			"components.molecules.copyResult.aria.parentItem.info",
			{
				itemTitle: propsData.items[1].title,
				itemStatus: wrapper.vm.$i18n.t(
					`common.labels.${propsData.items[1].status}`
				),
				includedItems: propsData.items[1].elements.length,
				action: wrapper.vm.$i18n.t("common.labels.collapse"),
			}
		);
		const textError = wrapper.vm.$i18n.t(
			"components.molecules.copyResult.aria.childItem.info",
			{
				itemTitle: propsData.items[1].elements[1].title,
				itemStatus: wrapper.vm.$i18n.t(
					`common.labels.${propsData.items[1].elements[1].status}`
				),
			}
		);

		expect(elementsDone.wrappers[0].element.outerHTML).toContain(textDone);
		expect(elementsPartial.wrappers[0].element.outerHTML).toContain(
			textPartial
		);
		expect(elementsError.wrappers[0].element.outerHTML).toContain(textError);
	});

	it("should expand and collapse nodes when 'space' key pressed", async () => {
		const wrapper = getWrapper(propsData);
		await wrapper.vm.$nextTick();

		const openNodesAsDefault = [3, 9];
		const openNodesAfterKeyPress = [3, 9, 0];
		expect(wrapper.vm.expandedNodes).toStrictEqual(openNodesAsDefault);

		const elementsDone = wrapper.find(".treeview-item-success");

		elementsDone.trigger("keydown.space");
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.expandedNodes).toStrictEqual(openNodesAfterKeyPress);
	});
});
