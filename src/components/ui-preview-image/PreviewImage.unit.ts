import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { PreviewImage } from "@ui-preview-image";
import { shallowMount } from "@vue/test-utils";

describe("PreviewImage", () => {
	const setup = (props: any) => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			src: "https://www.example.com/image-preview.jpg",
			alt: "image.jpg",
			"aspect-ratio": "1.77777",
			position: "top",
			contain: "true",
		};
		const wrapper = shallowMount(PreviewImage, {
			attachTo: document.body,
			propsData,
			...createComponentMocks({}),
		});
		return {
			wrapper,
			src: propsData.src,
			alt: propsData.alt,
		};
	};

	it("should display image with correct props", () => {
		const { wrapper, src, alt } = setup({});

		const image = wrapper.find("v-img-stub");

		expect(image.exists()).toBe(true);
		expect(image.attributes("src")).toBe(src);
		expect(image.attributes("alt")).toBe(alt);
		expect(image.attributes("aspectratio")).toBe("1.77777");
		expect(image.attributes("position")).toBe("top");
		expect(image.attributes("contain")).toBe("true");
	});
});
