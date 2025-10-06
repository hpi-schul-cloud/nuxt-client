import FileAttributes from "./attributes/FileAttributes.vue";
import ContentElementFooter from "./ContentElementFooter.vue";
import FileDownload from "./download/FileDownload.vue";
import { PreviewStatus } from "@/fileStorageApi/v3";
import { ContentElementType } from "@/serverApi/v3";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";

describe("ContentElementFooter", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			fileProperties: {
				name: "file-record #1.txt",
				size: 3800,
				url: "1/file-record #1.txt",
				previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
				isDownloadAllowed: true,
				mimeType: "text/plain",
				isCollaboraEditable: false,
				element: {
					id: "1",
					type: ContentElementType.File,
					content: {
						caption: "File caption",
						alternativeText: "File alternative text",
					},
					timestamps: {
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
						lastUpdatedAt: new Date().toISOString(),
					},
				},
			},
		};

		const wrapper = shallowMount(ContentElementFooter, {
			propsData,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return {
			wrapper,
			fileNameProp: propsData.fileProperties.name,
			urlProp: propsData.fileProperties.url,
			isDownloadAllowedProp: propsData.fileProperties.isDownloadAllowed,
			fileSizeProp: propsData.fileProperties.size,
		};
	};

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const fileContentElement = wrapper.findComponent(ContentElementFooter);

		expect(fileContentElement.exists()).toBe(true);
	});

	it("should render attributes component with proper props", () => {
		const { wrapper, fileNameProp, fileSizeProp } = setup();

		const props = wrapper.findComponent(FileAttributes).attributes();

		expect(props.filename).toEqual(fileNameProp);
		expect(props.filesize).toBe(fileSizeProp.toString());
	});

	it("should render download component with proper props", () => {
		const { wrapper, fileNameProp, urlProp, isDownloadAllowedProp } = setup();

		const props = wrapper.findComponent(FileDownload).attributes();

		expect(props.filename).toEqual(fileNameProp);
		expect(props.url).toEqual(urlProp);
		expect(!!props.isdownloadallowed).toEqual(isDownloadAllowedProp);
	});
});
