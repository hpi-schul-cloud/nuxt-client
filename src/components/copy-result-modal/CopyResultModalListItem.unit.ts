import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import CopyResultModalListItem from "@components/copy-result-modal/CopyResultModalListItem.vue";
import { CopyResultItem } from "@components/copy-result-modal/types/CopyResultItem";
import { CopyApiResponseTypeEnum } from "@/serverApi/v3";

const mockItem: CopyResultItem = {
	type: CopyApiResponseTypeEnum.Lesson,
	title: "Lesson Title",
	elementId: "mockId",
	elements: [
		{
			title: "Geogebra Element Title",
			type: CopyApiResponseTypeEnum.LessonContentGeogebra,
		},
		{
			title: "Nexboard Element Title",
			type: CopyApiResponseTypeEnum.LessonContentNexboard,
		},
	],
	url: "/courses/courseId/topics/elementId/edit?returnUrl=rooms/courseId",
};

const getWrapper = (props: object) => {
	return mount<any>(CopyResultModalListItem, {
		...createComponentMocks({
			i18n: true,
		}),
		propsData: props,
	});
};
describe("@components/copy-result-modal/CopyResultModalListItem", () => {
	it("Should render component", () => {
		const wrapper = getWrapper({ item: mockItem });

		expect(wrapper.findComponent(CopyResultModalListItem).exists()).toBe(true);
	});

	it("should render the element with the correct element title", () => {
		const wrapper = getWrapper({ item: mockItem });
		const elementTitle = wrapper.find(".black--text").element.textContent;

		expect(elementTitle).toBe("Geogebra - Geogebra Element Title");
	});

	it("should render the elements with the correct element title", () => {
		const wrapper = getWrapper({ item: mockItem });
		const elementTitles = wrapper
			.findAll(".black--text")
			.wrappers.map((el) => el.element.textContent);

		expect(elementTitles).toEqual([
			"Geogebra - Geogebra Element Title",
			"Nexboard - Nexboard Element Title",
		]);
	});

	it("should render the correct link", () => {
		const wrapper = getWrapper({ item: mockItem });
		const parentInfoLink = wrapper.find(".parent-info a");

		expect(parentInfoLink.element.textContent).toBe("Themen - Lesson Title");
		expect(parentInfoLink.attributes("href")).toBe(mockItem.url);
	});
});
