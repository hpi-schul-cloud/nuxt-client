import { PreviewStatus } from "@/fileStorageApi/v3";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import FileAlert from "./alert/FileAlert.vue";
import FileContent from "./FileContent.vue";
import ContentElementFooter from "./footer/ContentElementFooter.vue";

describe("FileContent", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const fileProperties = {
			name: "test",
			size: 100,
			url: "test",
			previewUrl: "test",
			previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
			isDownloadAllowed: true,
		};
		const wrapper = shallowMount(FileContent, {
			propsData: {
				fileProperties,
				isEditMode: true,
			},
			...createComponentMocks({}),
		});

		return {
			wrapper,
			fileProperties,
		};
	};

	it("should pass props to FileContent", () => {
		const { wrapper, fileProperties } = setup();

		const fileContent = wrapper.findComponent(FileContent);

		expect(fileContent.props()).toEqual({
			fileProperties,
			isEditMode: true,
		});
	});

	it("should pass props to ContentElementFooter", () => {
		const { wrapper, fileProperties } = setup();

		const contentElementFooter = wrapper.findComponent(ContentElementFooter);

		expect(contentElementFooter.props()).toEqual({
			fileProperties,
		});
	});

	it("Should pass props to FileAlert", () => {
		const { wrapper, fileProperties } = setup();

		const fileAlert = wrapper.findComponent(FileAlert);

		expect(fileAlert.props()).toEqual({
			previewStatus: fileProperties.previewStatus,
		});
	});

	it("should emit delete event when alter emits on status reload", async () => {
		const { wrapper } = setup();

		const fileAlert = wrapper.findComponent(FileAlert);

		await fileAlert.vm.$emit("on-status-reload");

		expect(wrapper.emitted("fetch:file")).toBeTruthy();
	});
});
