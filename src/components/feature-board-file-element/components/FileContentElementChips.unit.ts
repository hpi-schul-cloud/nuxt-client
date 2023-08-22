import { convertFileSize } from "@/utils/fileHelper";
import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import { getExtension } from "mime";
import FileContentElementChips from "./FileContentElementChips.vue";

jest.mock("@/utils/fileHelper");
jest.mock("mime");

describe("FileContentElementChips", () => {
	const setup = () => {
		const fileSize = 3800;
		const fileName = "pic.jpeg";
		const mimeType = "image/jpeg";
		const convertedSize = 3800;
		const unit = "KB";
		const convertFileSizeMock = jest
			.mocked(convertFileSize)
			.mockReturnValueOnce({ convertedSize, unit });
		const getFileExtensionMock = jest
			.mocked(getExtension)
			.mockReturnValueOnce("ext");
		const wrapper = mount(FileContentElementChips, {
			...createComponentMocks({
				i18n: true,
			}),
			propsData: {
				fileSize,
				fileName,
				mimeType,
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
			mimeType,
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

		const chipsComponent = wrapper.findComponent(FileContentElementChips);

		expect(chipsComponent.exists()).toBe(true);
	});

	it("should call convertFileSize", () => {
		const { fileSize, convertFileSizeMock } = setup();

		expect(convertFileSizeMock).toHaveBeenCalledTimes(1);
		expect(convertFileSizeMock).toHaveBeenCalledWith(fileSize);
	});

	it("should show correctly human readable file size", () => {
		const { wrapper, fileSize, unit } = setup();

		const chipsComponent = wrapper.findAllComponents({ name: "v-chip" }).at(1);

		expect(chipsComponent.text()).toBe(fileSize + "fileSize" + " " + unit);
	});

	it("should call getFileExtension", () => {
		const { mimeType, getFileExtensionMock } = setup();

		expect(getFileExtensionMock).toHaveBeenCalledTimes(1);
		expect(getFileExtensionMock).toHaveBeenCalledWith(mimeType);
	});

	it("should show correctly file extension", () => {
		const { wrapper } = setup();
		const chipsComponent = wrapper.findAllComponents({ name: "v-chip" }).at(0);

		expect(chipsComponent.text()).toBe("EXT");
	});
});
