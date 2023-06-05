import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";

describe("FileContentElementDisplay", () => {
	const setupProps = () => ({
		caption: "Test Caption",
		fileRecord: {
			name: "File Record Name",
			url: "File Record URL",
		},
	});

	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = setupProps();

		const wrapper = shallowMount(FileContentElementDisplay, {
			...createComponentMocks({ i18n: true }),
			propsData,
		});

		return {
			wrapper,
			captionProp: propsData.caption,
			fileRecordProp: propsData.fileRecord,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const fileContentElement = wrapper.findComponent(FileContentElementDisplay);
		expect(fileContentElement.exists()).toBe(true);
	});

	it("should display icon", async () => {
		const { wrapper } = setup();

		const fileIcon = wrapper.find("v-icon-stub");

		expect(fileIcon.exists()).toBe(true);
	});

	it("should find file name", async () => {
		const { wrapper, fileRecordProp } = setup();

		const fileName = wrapper.find("a").text();

		expect(fileName).toBe(fileRecordProp.name);
	});

	it("should find download url", async () => {
		const { wrapper, fileRecordProp } = setup();

		const downloadUrl = wrapper.find("a").attributes("href");

		expect(downloadUrl).toBe(fileRecordProp.url);
	});

	it("should find caption", () => {
		const { wrapper, captionProp } = setup();

		const caption = wrapper.find(".file-info").text();
		expect(caption).toBe(captionProp);
	});
});
