import { ComponentProps } from "@/types/vue";
import { mediaAvailableLineElementResponseFactory } from "@@/tests/test-utils";
import { shallowMount } from "@vue/test-utils";
import { MediaElementDisplay } from "./data/types";
import MediaBoardAvailableElement from "./MediaBoardAvailableElement.vue";
import MediaBoardElementDisplay from "./MediaBoardElementDisplay.vue";

describe("MediaBoardAvailableElement", () => {
	const getWrapper = (
		props: ComponentProps<typeof MediaBoardAvailableElement>
	) => {
		const wrapper = shallowMount(MediaBoardAvailableElement, {
			props,
		});

		return {
			wrapper,
		};
	};

	const setup = () => {
		const availableLineElement = mediaAvailableLineElementResponseFactory.build(
			{
				name: "title",
				description: "description",
			}
		);

		const { wrapper } = getWrapper({
			element: availableLineElement,
		});

		return {
			wrapper,
			availableLineElement,
		};
	};

	it("should map the props", () => {
		const { wrapper, availableLineElement } = setup();

		const displayComponent = wrapper.findComponent(MediaBoardElementDisplay);

		expect(displayComponent.props().element).toEqual<MediaElementDisplay>({
			title: availableLineElement.name,
			description: availableLineElement.description,
			thumbnail: undefined,
		});
	});
});
