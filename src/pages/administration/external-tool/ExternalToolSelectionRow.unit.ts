import { shallowMount, Wrapper } from "@vue/test-utils";
import ExternalToolSelectionRow from "./ExternalToolSelectionRow.vue";
import createComponentMocks from "../../../../tests/test-utils/componentMocks";

describe("ExternalToolSelectionRow", () => {
	let wrapper: Wrapper<any>;

	const setup = (maxHeight?: string, maxWidth?: string) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(ExternalToolSelectionRow, {
			...createComponentMocks({}),
			propsData: {
				item: {
					logoUrl: "expectedLogoUrl",
					name: "expectedName",
				},
				maxHeight: maxHeight,
				maxWidth: maxWidth,
			},
		});
	};

	describe("when component is used", () => {
		it("should be found in the dom", () => {
			setup();
			expect(
				wrapper.findComponent(ExternalToolSelectionRow).exists()
			).toBeTruthy();
		});
	});

	describe("component is rendered", () => {
		it("should have a span with name from props", () => {
			setup();

			const span = wrapper.find("span");

			expect(span.text()).toEqual("expectedName");
		});

		it("should have to v-image with url from props", () => {
			setup();

			const image = wrapper.find("v-img-stub");

			expect(image.attributes("src")).toEqual("expectedLogoUrl");
		});

		it("should have sizes from props", () => {
			const expectedMaxHeight = "10";
			const expectedMaxWidth = "15";
			setup(expectedMaxHeight, expectedMaxWidth);

			const image = wrapper.find("v-img-stub");

			expect(image.attributes("maxheight")).toEqual(expectedMaxHeight);
			expect(image.attributes("maxwidth")).toEqual(expectedMaxWidth);
		});
	});
});
