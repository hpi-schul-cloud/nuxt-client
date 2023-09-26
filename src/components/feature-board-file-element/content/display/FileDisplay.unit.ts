import { fileElementResponseFactory } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import FileDescription from "./file-description/FileDescription.vue";
import FileDisplay from "./FileDisplay.vue";
import ImageDisplay from "./image-display/ImageDisplay.vue";

describe("FileDisplay", () => {
	describe("when previewUrl is defined", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			const element = fileElementResponseFactory.build();
			const propsData = {
				fileProperties: {
					name: "test",
					size: 100,
					url: "test",
					previewUrl: "test",
					previewStatus: "test",
					isDownloadAllowed: true,
					element,
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

		it("should render file description display component", () => {
			const { wrapper } = setup();

			const fileDescription = wrapper.findComponent(FileDescription);

			expect(fileDescription.exists()).toBe(true);
		});

		it("should not pass name to file description component", () => {
			const { wrapper } = setup();

			const fileDescription = wrapper
				.findComponent(FileDescription)
				.attributes();
			expect(fileDescription.name).toBeUndefined();
		});
	});

	describe("when previewUrl is undefined", () => {
		const setup = () => {
			document.body.setAttribute("data-app", "true");

			const element = fileElementResponseFactory.build();
			const propsData = {
				fileProperties: {
					name: "test",
					size: 100,
					url: "test",
					previewUrl: undefined,
					previewStatus: "test",
					isDownloadAllowed: true,
					element,
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

		it("should render file description display component", () => {
			const { wrapper } = setup();

			const fileDescription = wrapper.findComponent(FileDescription);

			expect(fileDescription.exists()).toBe(true);
		});

		it("should not render image display component", () => {
			const { wrapper } = setup();

			const imageDisplay = wrapper.findComponent(ImageDisplay);

			expect(imageDisplay.exists()).toBe(false);
		});

		it("should pass name to file description component", () => {
			const { wrapper, fileNameProp } = setup();

			const fileDescription = wrapper
				.findComponent(FileDescription)
				.attributes();
			expect(fileDescription.name).toBe(fileNameProp);
		});
	});
});
