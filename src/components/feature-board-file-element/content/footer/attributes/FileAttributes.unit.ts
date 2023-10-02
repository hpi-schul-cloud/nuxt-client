import { convertFileSize, getFileExtension } from "@/utils/fileHelper";
import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import FileAttributes from "./FileAttributes.vue";

jest.mock("@/utils/fileHelper");

describe("FileAttributes", () => {
	const setup = () => {
		const fileSize = 3800;
		const fileName = "pic.jpeg";
		const unit = "KB";
		const extension = "ext";
		const convertFileSizeMock = jest
			.mocked(convertFileSize)
			.mockReturnValueOnce({ convertedSize: fileSize, unit });
		const getFileExtensionMock = jest
			.mocked(getFileExtension)
			.mockReturnValueOnce(extension);
		const wrapper = mount(FileAttributes, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: {
				fileSize,
				fileName,
			},
			provide: {
				[I18N_KEY.valueOf()]: {
					n: (size: number, format: string) => size.toString() + format,
				},
			},
		});

		return {
			wrapper,
			fileSize,
			extension: extension.toUpperCase(),
			fileName,
			convertFileSizeMock,
			getFileExtensionMock,
			unit,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should be found in dom", () => {
		const { wrapper } = setup();

		const fileAttributes = wrapper.findComponent(FileAttributes);

		expect(fileAttributes.exists()).toBe(true);
	});

	it("should call convertFileSize", () => {
		const { fileSize, convertFileSizeMock } = setup();

		expect(convertFileSizeMock).toHaveBeenCalledTimes(1);
		expect(convertFileSizeMock).toHaveBeenCalledWith(fileSize);
	});

	it("should display file extension and size", async () => {
		const { wrapper, fileSize, unit, extension } = setup();

		expect(wrapper.html()).toContain(
			`${extension} ⋅ ${fileSize}fileSize ${unit}`
		);
	});

	it("should call getFileExtension", () => {
		const { fileName, getFileExtensionMock } = setup();

		expect(getFileExtensionMock).toHaveBeenCalledTimes(1);
		expect(getFileExtensionMock).toHaveBeenCalledWith(fileName);
	});
});
