import ExternalToolSelectionRow from "./ExternalToolSelectionRow.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";

describe("ExternalToolSelectionRow", () => {
	const setup = (maxHeight?: number, maxWidth?: number) => {
		const wrapper = mount(ExternalToolSelectionRow, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				item: {
					logoUrl: "expectedLogoUrl",
					name: "expectedName",
					externalToolId: "expectedExternalToolId",
					parameters: [],
					baseUrl: "https://epxected-url.com",
				},
				maxHeight: maxHeight,
				maxWidth: maxWidth,
			},
		});

		return { wrapper };
	};

	describe("when component is used", () => {
		it("should be found in the dom", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(ExternalToolSelectionRow).exists()).toBeTruthy();
		});
	});

	describe("component is rendered", () => {
		it("should have a span with name from props", () => {
			const { wrapper } = setup();

			const span = wrapper.findComponent({ name: "v-list-item" });

			expect(span.text()).toEqual("expectedName");
		});

		it("should have to v-image with url from props", () => {
			const { wrapper } = setup();

			const image = wrapper.findComponent({ name: "v-img" });

			expect(image.props("src")).toEqual("expectedLogoUrl");
		});

		it("should have sizes from props", () => {
			const expectedMaxHeight = 10;
			const expectedMaxWidth = 15;
			const { wrapper } = setup(expectedMaxHeight, expectedMaxWidth);

			const image = wrapper.findComponent({ name: "v-img" });

			expect(image.props("maxHeight")).toEqual(expectedMaxHeight);
			expect(image.props("maxWidth")).toEqual(expectedMaxWidth);
		});
	});
});
