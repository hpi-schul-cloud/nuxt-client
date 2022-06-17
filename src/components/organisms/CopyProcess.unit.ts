import { mount } from "@vue/test-utils";
import CopyProcess from "./CopyProcess.vue";

declare let createComponentMocks: Function;

const propsData = {
	data: {
		title: "Aufgabe",
		type: "task",
		status: "partial",
		id: "12345",
		elements: [
			{ title: "metadata", type: "leaf", status: "success" },
			{ title: "description", type: "leaf", status: "success" },
			{ title: "submissions", type: "leaf", status: "not-doing" },
			{ title: "files", type: "leaf", status: "not-implemented" },
		],
	},
	isOpen: false,
	loading: false,
};

const successPropsData = {
	data: {
		title: "Aufgabe",
		type: "task",
		status: "success",
		id: "12345",
		elements: [
			{ title: "metadata", type: "leaf", status: "success" },
			{ title: "description", type: "leaf", status: "success" },
			{ title: "submissions", type: "leaf", status: "success" },
			{ title: "files", type: "leaf", status: "success" },
		],
	},
	isOpen: false,
	loading: false,
};

const getWrapper: any = (props: object, options?: object) => {
	return mount(CopyProcess, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/organisms/CopyProcess", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
	});

	it("should have correct props and configuration", async () => {
		const wrapper = getWrapper(propsData);

		expect(wrapper.vm.data).toStrictEqual(propsData.data);
		expect(wrapper.vm.isOpen).toStrictEqual(propsData.isOpen);
		expect(wrapper.vm.loading).toStrictEqual(propsData.loading);
	});

	it("should change the prop data to 'copiedItems' object", async () => {
		const wrapper = getWrapper(propsData);

		const changedPropsData = {
			id: "12345",
			status: "partial",
			title: "Aufgabe",
			type: "task",
			index: 0,
			elements: [
				{
					title: wrapper.vm.$i18n.t("components.molecules.copyResult.metadata"),
					type: "leaf",
					status: "success",
					index: 1,
				},
				{
					title: wrapper.vm.$i18n.t("common.labels.description"),
					type: "leaf",
					status: "success",
					index: 2,
				},
				{
					title: wrapper.vm.$i18n.t(
						"components.molecules.copyResult.fileCopy.error"
					),
					type: "leaf",
					status: "failure",
					index: 3,
				},
			],
		};

		expect(wrapper.vm.data).toStrictEqual(propsData.data);
		expect(wrapper.vm.copiedItems).toStrictEqual(changedPropsData);
	});

	it("should filter elements which have 'not-doing' status", async () => {
		const wrapper = getWrapper(propsData);

		const filterResult = wrapper.vm.copiedItems.elements.some(
			(item: any) => item.status === "not-doing"
		);

		expect(filterResult).toBe(false);
	});

	it("should have only one success element when every items' status is 'success'", async () => {
		const wrapper = getWrapper(successPropsData);

		const successObject = {
			id: "12345",
			status: "success",
			title: "Aufgabe",
			type: "task",
			index: 0,
			completed: true,
			elements: [
				{
					id: "12345",
					status: "success-all",
					title: wrapper.vm.$i18n.t(
						"components.molecules.copyResult.successfullyCopied"
					),
					type: "task",
				},
			],
		};

		expect(wrapper.vm.copiedItems).toStrictEqual(successObject);
	});

	it("should show skeleton when its prop set", async () => {
		const wrapper = getWrapper(propsData);
		await wrapper.vm.$nextTick();
		const skeletonElementBefore = wrapper.findAll(
			`[data-testid="copy-process-skeleton"]`
		);
		expect(skeletonElementBefore).toHaveLength(0);

		await wrapper.setProps({ isOpen: true, loading: true });

		const skeletonElementAfter = wrapper.findAll(
			`[data-testid="copy-process-skeleton"]`
		);
		expect(skeletonElementAfter).toHaveLength(1);
	});

	it("'getItemTitleAndStatus' method should return a correct title and status", async () => {
		const wrapper = getWrapper(propsData);
		await wrapper.vm.$nextTick();
		const method = wrapper.vm.getItemTitleAndStatus;

		expect(method("files", "not-implemented").status).toStrictEqual("failure");
		expect(method("files", "not-implemented").title).toStrictEqual(
			wrapper.vm.$i18n.t("components.molecules.copyResult.fileCopy.error")
		);

		expect(method("any", "not-implemented").status).toStrictEqual("failure");
		expect(method("any", "not-implemented").title).toStrictEqual("any");

		expect(method("metadata", "success").status).toStrictEqual("success");
		expect(method("metadata", "success").title).toStrictEqual(
			wrapper.vm.$i18n.t("components.molecules.copyResult.metadata")
		);

		expect(method("description", "success").status).toStrictEqual("success");
		expect(method("description", "success").title).toStrictEqual(
			wrapper.vm.$i18n.t("common.labels.description")
		);
	});
});
