import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";
import FileAttributes from "./attributes/FileAttributes.vue";
import ContentElementFooter from "./ContentElementFooter.vue";
import FileDownload from "./download/FileDownload.vue";

describe("ContentElementFooter", () => {
	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const propsData = {
			fileProperties: {
				name: "file-record #1.txt",
				url: "1/file-record #1.txt",
				isDownloadAllowed: true,
				size: 3800,
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
