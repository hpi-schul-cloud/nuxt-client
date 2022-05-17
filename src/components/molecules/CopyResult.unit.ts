import { mount } from "@vue/test-utils";
import CopyResult from "./CopyResult.vue";

declare let createComponentMocks: Function;

const propsData = {
	items: [
		{
			id: "1",
			type: "lesson",
			name: "Lesson 1",
			status: "done",
			children: [
				{ id: "2", type: "file", name: "file_1.jpg", status: "done" },
				{ id: "3", type: "file", name: "file_2.jpg", status: "done" },
			],
		},
		{
			id: "4",
			name: "Task 2",
			type: "task",
			status: "partial",
			children: [
				{ id: "5", type: "file", name: "file_3.jpg", status: "done" },
				{ id: "6", type: "file", name: "file_4.jpg", status: "error" },
			],
		},
		{
			id: "7",
			name: "Lesson 2",
			type: "lesson",
			status: "done",
			children: [
				{ id: "8", type: "file", name: "file_5.jpg", status: "done" },
				{ id: "9", type: "file", name: "file_6.jpg", status: "done" },
			],
		},
		{
			id: "10",
			name: "Lesson 3",
			type: "lesson",
			status: "partial",
			children: [
				{ id: "11", type: "file", name: "file_7.jpg", status: "error" },
				{ id: "12", type: "file", name: "file_8.jpg", status: "done" },
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

		expect(openedNodes.wrappers[0].vm.item.name).toStrictEqual("Task 2");
		expect(openedNodes.wrappers[1].vm.item.name).toStrictEqual("Lesson 3");

		expect(closedNodes.wrappers[0].vm.item.name).toStrictEqual("Lesson 1");
		expect(closedNodes.wrappers[3].vm.item.name).toStrictEqual("Lesson 2");
	});

	it("should calculate which nodes are opened", async () => {
		const wrapper = getWrapper(propsData);
		await wrapper.vm.$nextTick();

		const expectedExpandedNodes = ["4", "10"];
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

		const elementsDone = wrapper.findAll(".treeview-item-done");
		const elementsPartial = wrapper.findAll(".treeview-item-partial");
		const elementsError = wrapper.findAll(".treeview-item-error");
		const textDone = wrapper.vm.$i18n.t(
			"components.molecules.courseCopyResult.aria.parentItem.info",
			{
				itemName: propsData.items[0].name,
				itemStatus: wrapper.vm.$i18n.t(
					`common.labels.${propsData.items[0].status}`
				),
				action: wrapper.vm.$i18n.t("common.labels.expand"),
			}
		);
		const textPartial = wrapper.vm.$i18n.t(
			"components.molecules.courseCopyResult.aria.parentItem.info",
			{
				itemName: propsData.items[1].name,
				itemStatus: wrapper.vm.$i18n.t(
					`common.labels.${propsData.items[1].status}`
				),
				action: wrapper.vm.$i18n.t("common.labels.collapse"),
			}
		);
		const textError = wrapper.vm.$i18n.t(
			"components.molecules.courseCopyResult.aria.childItem.info",
			{
				itemName: propsData.items[1].children[1].name,
				itemStatus: wrapper.vm.$i18n.t(
					`common.labels.${propsData.items[1].children[1].status}`
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

		const openNodesAsDefault = ["4", "10"];
		const openNodesAfterKeyPress = ["4", "10", "1"];
		expect(wrapper.vm.expandedNodes).toStrictEqual(openNodesAsDefault);

		const elementsDone = wrapper.find(".treeview-item-done");

		elementsDone.trigger("keydown.space");
		await wrapper.vm.$nextTick();

		expect(wrapper.vm.expandedNodes).toStrictEqual(openNodesAfterKeyPress);
	});
});
