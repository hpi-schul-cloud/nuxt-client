import { ColorOverlay } from "@ui-color-overlay";
import { shallowMount } from "@vue/test-utils";

describe("ColorOverlay", () => {
	const setup = (props: {
		isOverlayDisabled: boolean;
		color: string;
		opacity: string;
	}) => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			isOverlayDisabled: props.isOverlayDisabled,
			color: props.color,
			opacity: props.opacity,
		};
		const wrapper = shallowMount(ColorOverlay, {
			propsData,
		});

		return {
			wrapper,
			...propsData,
		};
	};
});
