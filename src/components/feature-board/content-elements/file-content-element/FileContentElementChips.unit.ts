import { convertFileSize, getFileExtension } from "@/utils/fileHelper";
import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount } from "@vue/test-utils";
import FileContentElementChips from "./FileContentElementChips.vue";
jest.mock("@/utils/fileHelper");

describe("FileContentElementChips", () => {
	const setup = () => {
		const fileSize = 3800;
		const fileName = "pic.jpeg";
		const convertedSize = 3800;
		const unit = "KB";
		const convertFileSizeMock = jest
			.mocked(convertFileSize)
			.mockReturnValueOnce({ convertedSize, unit });
		const getFileExtensionMock = jest
			.mocked(getFileExtension)
			.mockReturnValueOnce("ext");
		const wrapper = mount(FileContentElementChips, {
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
		const { fileName, getFileExtensionMock } = setup();

		expect(getFileExtensionMock).toHaveBeenCalledTimes(1);
		expect(getFileExtensionMock).toHaveBeenCalledWith(fileName);
	});

	it("should show correctly file extension", () => {
		const { wrapper } = setup();
		const chipsComponent = wrapper.findAllComponents({ name: "v-chip" }).at(0);

		expect(chipsComponent.text()).toBe("EXT");
	});
});
