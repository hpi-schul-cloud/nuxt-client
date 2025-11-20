import { FileRecordItem } from "../types/filerecord-item";
import FileInteractionHandler from "./FileInteractionHandler.vue";
import { FilePreviewStatus } from "@/types/file/File";
import { createTestEnvStore, fileRecordFactory } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { useLightBox } from "@ui-light-box";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { ref } from "vue";
import { Router, useRouter } from "vue-router";

vi.mock("vue-router");
vi.mock("@ui-light-box");

const useRouterMock = <Mock>useRouter;

describe("FileInteractionHandler", () => {
	const setupMocks = () => {
		const useLightBoxMock = vi.mocked(useLightBox);
		useLightBoxMock.mockReturnValue({
			isLightBoxOpen: ref(false),
			open: vi.fn(),
			close: vi.fn(),
			lightBoxOptions: ref(),
		});

		const router = createMock<Router>({});
		useRouterMock.mockReturnValue(router);

		return { useLightBoxMock };
	};

	const setupWrapper = (fileRecordItem: FileRecordItem) => {
		const wrapper = mount(FileInteractionHandler, {
			global: {
				plugins: [createTestingI18n()],
			},
			props: {
				fileRecordItem,
				hasEditPermission: true,
			},
		});
		return { wrapper };
	};

	describe("when file is selectable", () => {
		const setup = (
			props: { previewStatus?: FilePreviewStatus; mimeType?: string; isCollaboraEditable?: boolean },
			options?: { isCollaboraEnabled?: boolean }
		) => {
			const fileRecord = fileRecordFactory.build({
				previewStatus: props.previewStatus,
				mimeType: props.mimeType,
				isCollaboraEditable: props.isCollaboraEditable,
			});
			const fileRecordItem = {
				...fileRecord,
				isSelectable: true,
			};

			const { useLightBoxMock } = setupMocks();

			setActivePinia(createTestingPinia());
			createTestEnvStore({
				FEATURE_COLUMN_BOARD_COLLABORA_ENABLED: options?.isCollaboraEnabled ?? false,
			});

			const { wrapper } = setupWrapper(fileRecordItem);

			return { wrapper, useLightBoxMock, fileRecordItem };
		};
		describe("when preview is possible", () => {
			it("should render button", () => {
				const { wrapper } = setup({
					previewStatus: FilePreviewStatus.PREVIEW_POSSIBLE,
				});

				const button = wrapper.find("button");

				expect(button.exists()).toBe(true);
			});

			it("should open lightbox when button is clicked", () => {
				const { wrapper, useLightBoxMock } = setup({
					previewStatus: FilePreviewStatus.PREVIEW_POSSIBLE,
					mimeType: "image/png",
				});

				const button = wrapper.find("button");
				button.trigger("click");

				expect(useLightBoxMock().open).toHaveBeenCalled();
			});
		});

		describe("when file is an audio", () => {
			it("should render button", () => {
				const { wrapper } = setup({ mimeType: "audio/..." });

				const button = wrapper.find("button");

				expect(button.exists()).toBe(true);
			});

			it("should open lightbox when button is clicked", () => {
				const { wrapper, useLightBoxMock } = setup({ mimeType: "audio/..." });

				const button = wrapper.find("button");
				button.trigger("click");

				expect(useLightBoxMock().open).toHaveBeenCalled();
			});
		});

		describe("when file is a video", () => {
			it("should render button", () => {
				const { wrapper } = setup({ mimeType: "video/..." });

				const button = wrapper.find("button");

				expect(button.exists()).toBe(true);
			});

			it("should open lightbox when button is clicked", () => {
				const { wrapper, useLightBoxMock } = setup({ mimeType: "video/..." });

				const button = wrapper.find("button");
				button.trigger("click");

				expect(useLightBoxMock().open).toHaveBeenCalled();
			});
		});

		describe("when file is a pdf", () => {
			it("should render button", () => {
				const { wrapper } = setup({ mimeType: "application/pdf" });
				const button = wrapper.find("button");
				expect(button.exists()).toBe(true);
			});

			it("should call open function", () => {
				const { wrapper, fileRecordItem, useLightBoxMock } = setup({
					mimeType: "application/pdf",
				});

				const windowOpenSpy = vi.fn();
				window.open = windowOpenSpy;

				const button = wrapper.find("button");
				button.trigger("click");

				expect(windowOpenSpy).toHaveBeenCalledTimes(1);
				expect(windowOpenSpy).toHaveBeenCalledWith(fileRecordItem.url, "_blank");
				expect(useLightBoxMock().open).not.toHaveBeenCalled();
			});
		});

		describe("when file is a collabora document", () => {
			it("should render button", () => {
				const { wrapper } = setup(
					{ mimeType: "application/msword", isCollaboraEditable: true },
					{ isCollaboraEnabled: true }
				);
				const button = wrapper.find("button");
				expect(button.exists()).toBe(true);
			});

			it("should call open function", () => {
				const { wrapper } = setup(
					{ mimeType: "application/msword", isCollaboraEditable: true },
					{ isCollaboraEnabled: true }
				);

				const windowOpenSpy = vi.fn();
				window.open = windowOpenSpy;

				const button = wrapper.find("button");
				button.trigger("click");

				expect(windowOpenSpy).toHaveBeenCalledTimes(1);
			});
		});

		describe("when preview is not possible and mimeType is not audio or video", () => {
			it("should render div instead of button", () => {
				const { wrapper } = setup({
					previewStatus: FilePreviewStatus.PREVIEW_NOT_POSSIBLE_WRONG_MIME_TYPE,
					mimeType: "some-mime-type",
				});

				const div = wrapper.find("div");
				const button = wrapper.find("button");

				expect(div.exists()).toBe(true);
				expect(button.exists()).toBe(false);
			});
		});
	});

	describe("when file is not selectable", () => {
		const setup = (options?: { isCollaboraEnabled?: boolean }) => {
			const fileRecord = fileRecordFactory.build({
				previewStatus: FilePreviewStatus.PREVIEW_POSSIBLE,
			});
			const fileRecordItem = {
				...fileRecord,
				isSelectable: false,
			};

			setupMocks();
			setActivePinia(createTestingPinia());
			createTestEnvStore({
				FEATURE_COLUMN_BOARD_COLLABORA_ENABLED: options?.isCollaboraEnabled ?? false,
			});

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
