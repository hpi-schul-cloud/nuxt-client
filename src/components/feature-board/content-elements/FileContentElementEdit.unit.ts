import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import FileContentElementEdit from "./FileContentElementEdit.vue";
import { fileRecordResponseFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";

describe("FileContentElementEdit", () => {
	const setupProps = () => ({
		caption: "Test Caption",
		fileRecord: fileRecordResponseFactory.build(),
	});
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = setupProps();
		const wrapper = shallowMount(FileContentElementEdit, {
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

		const fileContentElement = wrapper.findComponent(FileContentElementEdit);
		expect(fileContentElement.exists()).toBe(true);
	});

	it("should find download url", async () => {
		const { wrapper, fileRecordProp } = setup();

		const downloadUrl = wrapper.find("v-list-item-stub").attributes("href");

		expect(downloadUrl).toBe(fileRecordProp.url);
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
