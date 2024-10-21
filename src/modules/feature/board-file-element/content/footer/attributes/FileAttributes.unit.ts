import { convertFileSize, getFileExtension } from "@/utils/fileHelper";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { useI18n } from "vue-i18n";
import FileAttributes from "./FileAttributes.vue";

vi.mock("@/utils/fileHelper");

vi.mock("vue-i18n");

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
		const i18nMock = vi.mocked(useI18n).mockReturnValue({
			t: vi.fn().mockImplementation((key: string) => key),
			n: vi.fn().mockImplementation((key: string) => key),
		});

		const wrapper = mount(FileAttributes, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
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
			i18nMock,
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
		const { wrapper, fileSize, extension, unit } = setup();

		expect(wrapper.text()).toBe(`${extension} ⋅ ${fileSize} ${unit}`);
	});

	it("should call getFileExtension", () => {
		const { fileName, getFileExtensionMock } = setup();

		expect(getFileExtensionMock).toHaveBeenCalledTimes(1);
		expect(getFileExtensionMock).toHaveBeenCalledWith(fileName);
	});
});
