import { CopyApiResponseTypeEnum } from "@/serverApi/v3";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import CopyResultModalList from "./CopyResultModalList.vue";
import CopyResultModalListItem from "./CopyResultModalListItem.vue";
import { CopyResultItem } from "./types/CopyResultItem";

const mockItems: CopyResultItem[] = [
	{
		type: CopyApiResponseTypeEnum.Task,
		title: "Task Title",
		elementId: "mockId",
		elements: [
			{
				title: "filename.example",
				type: CopyApiResponseTypeEnum.File,
			},
		],
		url: "/tasks/taskId/topics/elementId/edit?returnUrl=rooms/courseId",
	},
	{
		type: CopyApiResponseTypeEnum.Lesson,
		title: "Lesson Title",
		elementId: "mockId",
		elements: [
			{
				title: "Geogebra Element Title",
				type: CopyApiResponseTypeEnum.LessonContentGeogebra,
			},
		],
		url: "/courses/courseId/topics/elementId/edit?returnUrl=rooms/taskId",
	},
];

const getWrapper = (opts = {}) => {
	return mount<any>(CopyResultModalList, {
		...createComponentMocks({
			i18n: true,
		}),
		stubs: {
			CopyResultModalListItem: true,
		},
		...opts,
	});
};

describe("@components/copy-result-modal/CopyResultModalList", () => {
	it("Should render component", () => {
		const wrapper = getWrapper({ propsData: { items: mockItems } });

		expect(wrapper.findComponent(CopyResultModalList).exists()).toBe(true);
	});

	it("Should render the correct number of items", () => {
		const wrapper = getWrapper({ propsData: { items: mockItems } });

		expect(wrapper.findAllComponents(CopyResultModalListItem).length).toBe(2);
	});

	it("Should pass item props to the child components", () => {
		const wrapper = getWrapper({ propsData: { items: mockItems } });

		const itemWrappers = wrapper.findAllComponents(CopyResultModalListItem);

		expect(itemWrappers.at(0).props()).toEqual({ item: mockItems[0] });
		expect(itemWrappers.at(1).props()).toEqual({ item: mockItems[1] });
	});
});
