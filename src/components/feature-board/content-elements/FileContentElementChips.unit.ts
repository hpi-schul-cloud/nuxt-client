import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import FileContentElementChips from "./FileContentElementChips.vue";
import {
	convertFileSizeToHumanReadable,
	getFileExtension,
} from "@/utils/fileHelper";

describe("FileContentElementChips", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props: { fileRecordSize: number; fileRecordName: string }) => {
		wrapper = shallowMount(FileContentElementChips as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: props,
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom when a file is added", () => {
			setup({ fileRecordSize: 3800, fileRecordName: "image.jpeg" });
			expect(wrapper.findComponent(FileContentElementChips).exists()).toBe(
				true
			);
		});

		it("should return file extension in upper case", () => {
			setup({ fileRecordSize: 3800, fileRecordName: "image.jpeg" });
			expect(getFileExtension("image.jpeg")).toBe("JPEG");
		});

		it("should return file extension in upper case, even if a dot exists in filename", () => {
			setup({ fileRecordSize: 3800, fileRecordName: "text.1.pdf" });
			expect(getFileExtension("text.1.pdf")).toBe("PDF");
		});

		it("should return file size converted in KB", () => {
			setup({ fileRecordSize: 3800, fileRecordName: "image.jpeg" });
			expect(convertFileSizeToHumanReadable(3800)).toStrictEqual("3.71 KB");
		});

		it("should return file size converted in MB", () => {
			setup({ fileRecordSize: 104857600, fileRecordName: "image.jpeg" });
			expect(convertFileSizeToHumanReadable(104857600)).toStrictEqual(
				"100.00 MB"
			);
		});

		it("should return file size converted in GB", () => {
			setup({ fileRecordSize: 1073741824, fileRecordName: "image.jpeg" });
			expect(convertFileSizeToHumanReadable(1073741824)).toStrictEqual(
				"1.00 GB"
			);
		});
	});
});
