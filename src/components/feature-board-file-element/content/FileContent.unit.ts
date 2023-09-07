import { PreviewStatus } from "@/fileStorageApi/v3";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import FileContentElementAlert from "./alert/FileContentElementAlert.vue";
import FileContent from "./FileContent.vue";
import FileContentElementFooter from "./footer/FileContentElementFooter.vue";

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

	it("should pass props to FileDisplay", () => {
		const { wrapper, fileProperties } = setup();

		const fileDisplay = wrapper.findComponent(FileContent);

		expect(fileDisplay.props()).toEqual({
			fileProperties,
			isEditMode: true,
		});
	});

	it("should pass props to FileContentElementFooter", () => {
		const { wrapper, fileProperties } = setup();

		const fileContentElementFooter = wrapper.findComponent(
			FileContentElementFooter
		);

		expect(fileContentElementFooter.props()).toEqual({
			fileProperties,
		});
	});

	it("Should pass props to FileContentElementAlert", () => {
		const { wrapper, fileProperties } = setup();

		const fileContentElementAlert = wrapper.findComponent(
			FileContentElementAlert
		);

		expect(fileContentElementAlert.props()).toEqual({
			previewStatus: fileProperties.previewStatus,
		});
	});

	it("should emit delete event when alter emits on status reload", async () => {
		const { wrapper } = setup();

		const fileContentElementAlert = wrapper.findComponent(
			FileContentElementAlert
		);

		await fileContentElementAlert.vm.$emit("on-status-reload");

		expect(wrapper.emitted("fetch:file")).toBeTruthy();
	});
});
