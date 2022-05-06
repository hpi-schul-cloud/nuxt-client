import { roomModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import RoomModule from "@/store/room";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount } from "@vue/test-utils";
import CourseCopyResult from "./CourseCopyResult.vue";

declare let createComponentMocks: Function;

const propsData = {
	items: [
		{
			id: "courseId",
			name: "Mathe",
			status: "partial",
			children: [
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
		},
	],
	openNodes: ["courseId", "4", "10"],
	showSpinner: false,
};

const getWrapper: any = (props: object, options?: object) => {
	return mount(CourseCopyResult, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		propsData: props,
		...options,
	});
};

describe("@components/molecules/CourseCopyResult", () => {
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		setupStores({ "env-config": EnvConfigModule, room: RoomModule });
	});

	it("should have correct props and configuration", async () => {
		const wrapper = getWrapper(propsData);

		expect(wrapper.vm.items).toStrictEqual(propsData.items);
		expect(wrapper.vm.openNodes).toStrictEqual(propsData.openNodes);
		expect(wrapper.vm.showSpinner).toStrictEqual(propsData.showSpinner);
	});

	it.skip("should expand and collapse nodes according to the status property", async () => {
		const wrapper = getWrapper(propsData);
		await wrapper.vm.$nextTick();
		const nodes = wrapper.findAll(".v-treeview-node__toggle--open");

		expect(wrapper.vm.items).toStrictEqual(propsData.items);
		expect(wrapper.vm.openNodes).toStrictEqual(propsData.openNodes);
		expect(wrapper.vm.showSpinner).toStrictEqual(propsData.showSpinner);
	});
});
