import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import DefaultDisplay from "./DefaultDisplay.vue";
import FileDisplay from "./FileDisplay.vue";
import ImageDisplay from "./ImageDisplay.vue";

describe("FileDisplay", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			name: "file-record #1.txt",
			previewUrl: "preview/1/file-record #1.txt",
			isEditMode: false,
		};

		const wrapper = shallowMount(FileDisplay, {
			propsData,
			...createComponentMocks({}),
		});

		return {
			wrapper,
			fileNameProp: propsData.name,
			previewUrlProp: propsData.previewUrl,
			editModeProp: propsData.isEditMode,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const fileDisplay = wrapper.findComponent(FileDisplay);

		expect(fileDisplay.exists()).toBe(true);
	});

	it("should render image display component with proper props", () => {
		const { wrapper, fileNameProp, previewUrlProp, editModeProp } = setup();

		const props = wrapper.findComponent(ImageDisplay).attributes();

		expect(props.filename).toBe(fileNameProp);
		expect(props.previewUrl).toBe(previewUrlProp);
		expect(props.editMode).toBe(editModeProp);
	});

	it("should render default display component with proper props", () => {
		const { wrapper, fileNameProp } = setup();

		const props = wrapper.findComponent(DefaultDisplay).attributes();

		expect(props.filename).toBe(fileNameProp);
	});
});
