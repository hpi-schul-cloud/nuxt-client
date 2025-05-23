import { FilePreviewStatus } from "@/types/file/File";
import { fileRecordFactory } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { useLightBox } from "@ui-light-box";
import { ref } from "vue";
import { FileRecordItem } from "../types/filerecord-item";
import FileInteractionHandler from "./FileInteractionHandler.vue";

jest.mock("@ui-light-box");

describe("FileInteractionHandler", () => {
	const setupMocks = () => {
		const useLightBoxMock = jest.mocked(useLightBox);
		const isLightBoxOpen = ref(false);
		const open = jest.fn();
		useLightBoxMock.mockReturnValue({ isLightBoxOpen, open });

		return { useLightBoxMock };
	};

	const setupWrapper = (fileRecordItem: FileRecordItem) => {
		const wrapper = mount(FileInteractionHandler, {
			global: {
				plugins: [createTestingI18n()],
			},
			props: {
				fileRecordItem,
			},
		});
		return { wrapper };
	};

	describe("when file is selectable and preview is possible", () => {
		const setup = () => {
			const fileRecord = fileRecordFactory.build({
				previewStatus: FilePreviewStatus.PREVIEW_POSSIBLE,
			});
			const fileRecordItem = {
				...fileRecord,
				isSelectable: true,
			};

			const { wrapper } = setupWrapper(fileRecordItem);
			const { useLightBoxMock } = setupMocks();

			return { wrapper, useLightBoxMock };
		};

		it("should render button", () => {
			const { wrapper } = setup();

			const button = wrapper.find("button");

			expect(button.exists()).toBe(true);
		});

		it("should open lightbox when button is clicked", () => {
			const { wrapper, useLightBoxMock } = setup();

			const button = wrapper.find("button");
			button.trigger("click");

			expect(useLightBoxMock().open).toHaveBeenCalled();
		});
	});

	describe("when file is not selectable", () => {
		const setup = () => {
			const fileRecord = fileRecordFactory.build({
				previewStatus: FilePreviewStatus.PREVIEW_POSSIBLE,
			});
			const fileRecordItem = {
				...fileRecord,
				isSelectable: false,
			};

			const { wrapper } = setupWrapper(fileRecordItem);

			return { wrapper };
		};

		it("should render div instead of button", () => {
			const { wrapper } = setup();

			const div = wrapper.find("div");
			const button = wrapper.find("button");

			expect(div.exists()).toBe(true);
			expect(button.exists()).toBe(false);
		});
	});

	describe("when preview is not possible", () => {
		const setup = () => {
			const fileRecord = fileRecordFactory.build({
				previewStatus: FilePreviewStatus.PREVIEW_NOT_POSSIBLE_WRONG_MIME_TYPE,
			});
			const fileRecordItem = {
				...fileRecord,
				isSelectable: true,
			};

			const { wrapper } = setupWrapper(fileRecordItem);

			return { wrapper };
		};

		it("should render div instead of button", () => {
			const { wrapper } = setup();

			const div = wrapper.find("div");
			const button = wrapper.find("button");

			expect(div.exists()).toBe(true);
			expect(button.exists()).toBe(false);
		});
	});
});
