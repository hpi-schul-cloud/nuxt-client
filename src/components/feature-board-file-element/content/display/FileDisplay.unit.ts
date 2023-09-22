import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import DefaultDisplay from "./default-display/DefaultDisplay.vue";
import FileDisplay from "./FileDisplay.vue";
import ImageDisplay from "./image-display/ImageDisplay.vue";

describe("FileDisplay", () => {
	describe("when previewUrl is defined", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			const propsData = {
				fileProperties: {
					name: "test",
					size: 100,
					url: "test",
					previewUrl: "test",
					previewStatus: "test",
					isDownloadAllowed: true,
				},
				isEditMode: true,
			};

			const wrapper = shallowMount(FileDisplay, {
				propsData,
				...createComponentMocks({}),
			});

			return {
				wrapper,
				fileNameProp: propsData.fileProperties.name,
				previewUrlProp: propsData.fileProperties.previewUrl,
			};
		};

		it("should be found in dom", () => {
			const { wrapper } = setup();

			const fileDisplay = wrapper.findComponent(FileDisplay);

			expect(fileDisplay.exists()).toBe(true);
		});

		it("should pass correct props to image display component", () => {
			const { wrapper, fileNameProp, previewUrlProp } = setup();

			const props = wrapper.findComponent(ImageDisplay).attributes();
			expect(props.name).toBe(fileNameProp);
			expect(props.previewurl).toBe(previewUrlProp);
			expect(props.iseditmode).toBe("true");
		});

		it("should not render default display component", () => {
			const { wrapper } = setup();

			const defaultDisplay = wrapper.findComponent(DefaultDisplay);

			expect(defaultDisplay.exists()).toBe(false);
		});
	});

	describe("when previewUrl is undefined", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			const propsData = {
				fileProperties: {
					name: "test",
					size: 100,
					url: "test",
					previewUrl: undefined,
					previewStatus: "test",
					isDownloadAllowed: true,
				},
				isEditMode: true,
			};

			const wrapper = shallowMount(FileDisplay, {
				propsData,
				...createComponentMocks({}),
			});

			return {
				wrapper,
				fileNameProp: propsData.fileProperties.name,
				previewUrlProp: propsData.fileProperties.previewUrl,
			};
		};

		it("should pass correct props to default display component", () => {
			const { wrapper, fileNameProp } = setup();

			const props = wrapper.findComponent(DefaultDisplay).attributes();

			expect(props.name).toBe(fileNameProp);
		});

		it("should not render image display component", () => {
			const { wrapper } = setup();

			const imageDisplay = wrapper.findComponent(ImageDisplay);

			expect(imageDisplay.exists()).toBe(false);
		});
	});
});
