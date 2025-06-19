import { convertFileSize, getFileExtension } from "@/utils/fileHelper";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import FileAttributes from "./FileAttributes.vue";

vi.mock("@/utils/fileHelper");

vi.mock("vue-i18n", () => {
	return {
		...vi.requireActual("vue-i18n"),
		useI18n: () => {
			return {
				t: (key: string) => key,
				n: (key: string) => key,
			};
		},
	};
});

describe("FileAttributes", () => {
	const setup = () => {
		const fileSize = 3800;
		const fileName = "pic.jpeg";
		const unit = "KB";
		const extension = "ext";
		const convertFileSizeMock = vi
			.mocked(convertFileSize)
			.mockReturnValueOnce({ convertedSize: fileSize, unit });
		const getFileExtensionMock = vi
			.mocked(getFileExtension)
			.mockReturnValueOnce(extension);

		const wrapper = mount(FileAttributes, {
			global: {
				plugins: [createTestingVuetify()],
			},
			props: {
				fileSize,
				fileName,
				extension,
				unit,
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
		vi.resetAllMocks();
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
		const { wrapper, fileSize, extension, unit } = setup();

		expect(wrapper.text()).toBe(`${extension} ⋅ ${fileSize} ${unit}`);
	});

	it("should call getFileExtension", () => {
		const { fileName, getFileExtensionMock } = setup();

		expect(getFileExtensionMock).toHaveBeenCalledTimes(1);
		expect(getFileExtensionMock).toHaveBeenCalledWith(fileName);
	});
});
