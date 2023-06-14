import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";
import { fileRecordResponseFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";

describe("FileContentElementDisplay", () => {
	const setupProps = () => ({
		caption: "Test Caption",
		fileRecord: fileRecordResponseFactory.build(),
		url: "www.test-url.com/download",
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
			urlProp: propsData.url,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const fileContentElement = wrapper.findComponent(FileContentElementDisplay);
		expect(fileContentElement.exists()).toBe(true);
	});

	it("should find download url", async () => {
		const { wrapper, urlProp } = setup();

		const downloadUrl = wrapper.find("v-list-item-stub").attributes("href");

		expect(downloadUrl).toBe(urlProp);
	});

	it("should display icon", async () => {
		const { wrapper } = setup();

		const fileIcon = wrapper.find("v-icon-stub");

		expect(fileIcon.exists()).toBe(true);
	});

	it("should find file name", async () => {
		const { wrapper, fileRecordProp } = setup();

		const fileName = wrapper.find("v-list-item-title-stub").text();

		expect(fileName).toBe(fileRecordProp.name);
	});
});
