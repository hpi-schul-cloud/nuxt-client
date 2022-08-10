import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import CopyResultModalListItem from "@components/copy-result-modal/CopyResultModalListItem.vue";
import { CopyResultItem } from "@components/copy-result-modal/types/CopyResultItem";
import { CopyApiResponseTypeEnum } from "@/serverApi/v3";

describe("@components/molecules/CopyResultModalListItem", () => {
	let wrapper: Wrapper<Vue>;

	const mockItem: CopyResultItem = {
		type: CopyApiResponseTypeEnum.Lesson,
		title: "MockItem",
		elementId: "mockId",
		elements: [],
	};

	const mountComponent = (attrs = {}) => {
		const wrapper = mount(CopyResultModalListItem, {
			...createComponentMocks({
				i18n: true,
			}),
			...attrs,
		});

		return wrapper;
	};

	it("Should render", () => {
		wrapper = mountComponent({
			propsData: {
				item: mockItem,
			},
		});

		expect(wrapper.findComponent(CopyResultModalListItem).exists()).toBe(true);
	});
});
