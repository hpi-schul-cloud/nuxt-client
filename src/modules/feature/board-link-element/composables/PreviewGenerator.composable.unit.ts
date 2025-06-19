import { FileRecordParentType, PreviewStatus } from "@/fileStorageApi/v3";
import { convertDownloadToPreviewUrl } from "@/utils/fileHelper";
import { fileRecordFactory } from "@@/tests/test-utils";
import * as FileStorageApi from "@data-file";
import { createMock } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { usePreviewGenerator } from "./PreviewGenerator.composable";

vi.mock("@feature-board-file-element");

describe("usePreviewGenerator", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	const getWrapper = (elementId: string) => {
		let composable: ReturnType<typeof usePreviewGenerator> | undefined;

		const TestComponent = defineComponent({
			setup() {
				composable = usePreviewGenerator(elementId);
			},
			template: "<div/>",
		});

		const wrapper = mount(TestComponent, {});
		return { wrapper, composable };
	};

	describe("createPreviewImage", () => {
		describe("when meta tags could be extracted", () => {
			describe("when image can be uploaded", () => {
				const setup = () => {
					const elementId = "my-custom-mocked-id";
					const fileRecord = fileRecordFactory.build({
						previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
					});

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
						fileRecord,
					]);

					const { wrapper, composable } = getWrapper(elementId);

					return {
						wrapper,
						composable,
						fileStorageApiMock,
						elementId,
						fileRecord,
					};
				};

				it("should be defined", () => {
					const { composable } = setup();

					expect(composable?.createPreviewImage).toBeDefined();
				});

				it("should upload the external image", async () => {
					const { composable, fileStorageApiMock, elementId } = setup();

					const imageUrl = "https://test.de/my-article/image.jpg";
					await composable?.createPreviewImage(imageUrl);

					expect(fileStorageApiMock.uploadFromUrl).toHaveBeenCalledWith(
						imageUrl,
						elementId,
						FileRecordParentType.BOARDNODES
					);
				});

				it("should return image url for the preview image", async () => {
					const { composable, fileRecord } = setup();

					const externalImageUrl = "https://test.de/my-article/image.jpg";
					const result = await composable?.createPreviewImage(externalImageUrl);

					const expectedPreviewImageUrl = convertDownloadToPreviewUrl(
						fileRecord.url
					);
					expect(result).toEqual(
						expect.stringContaining(expectedPreviewImageUrl)
					);
				});
			});

			describe("when upload throws error", () => {
				const setup = () => {
					const externalImageUrl = "https://test.de/my-article/image.jpg";
					const elementId = "my-custom-mocked-id";
					const error = new Error("upload failed");

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);
					fileStorageApiMock.uploadFromUrl.mockRejectedValueOnce(error);

					const { wrapper, composable } = getWrapper(elementId);

					return {
						wrapper,
						composable,
						fileStorageApiMock,
						elementId,
						externalImageUrl,
						error,
					};
				};

				it("should pass error", async () => {
					const { composable, externalImageUrl, error } = setup();

					await expect(
						composable?.createPreviewImage(externalImageUrl)
					).rejects.toThrowError(error);
				});
			});

			describe("when getFileRecord returns undefined ref", () => {
				const setup = () => {
					const externalImageUrl = "https://test.de/my-article/image.jpg";
					const elementId = "my-custom-mocked-id";

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const { wrapper, composable } = getWrapper(elementId);

					return {
						wrapper,
						composable,
						fileStorageApiMock,
						elementId,
						externalImageUrl,
					};
				};

				it("should return undefined", async () => {
					const { composable, externalImageUrl } = setup();

					const result = await composable?.createPreviewImage(externalImageUrl);

					expect(result).toBeUndefined();
				});
			});
		});
	});
});
