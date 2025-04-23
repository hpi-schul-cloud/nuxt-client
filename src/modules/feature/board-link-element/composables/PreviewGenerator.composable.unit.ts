import { FileRecordParentType, PreviewStatus } from "@/fileStorageApi/v3";
import { convertDownloadToPreviewUrl } from "@/utils/fileHelper";
import {
	fileRecordFactory,
	setupFileStorageApiMock,
} from "@@/tests/test-utils";
import { mount } from "@vue/test-utils";
import { defineComponent, ref } from "vue";
import { usePreviewGenerator } from "./PreviewGenerator.composable";

jest.mock("@feature-board-file-element");

describe("usePreviewGenerator", () => {
	afterEach(() => {
		jest.clearAllMocks();
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
					const uploadFromUrlMock = jest.fn();
					const fileRecord = fileRecordFactory.build({
						previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
					});
					const getFileRecordMock = jest
						.fn()
						.mockReturnValueOnce(ref(fileRecord));
					const { getFileRecord } = setupFileStorageApiMock({
						uploadFromUrlMock,
						getFileRecordMock,
					});

					const { wrapper, composable } = getWrapper(elementId);

					return {
						wrapper,
						composable,
						getFileRecord,
						uploadFromUrlMock,
						elementId,
						fileRecord,
					};
				};

				it("should be defined", () => {
					const { composable } = setup();

					expect(composable?.createPreviewImage).toBeDefined();
				});

				it("should upload the external image", async () => {
					const { composable, uploadFromUrlMock, elementId } = setup();

					const imageUrl = "https://test.de/my-article/image.jpg";
					await composable?.createPreviewImage(imageUrl);

					expect(uploadFromUrlMock).toHaveBeenCalledWith(
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
					const uploadFromUrlMock = jest.fn().mockRejectedValueOnce(error);

					const { getFileRecord } = setupFileStorageApiMock({
						uploadFromUrlMock,
					});

					const { wrapper, composable } = getWrapper(elementId);

					return {
						wrapper,
						composable,
						getFileRecord,
						uploadFromUrlMock,
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
					const uploadFromUrlMock = jest.fn();
					const getFileRecordMock = jest
						.fn()
						.mockReturnValueOnce(ref(undefined));
					const { getFileRecord } = setupFileStorageApiMock({
						uploadFromUrlMock,
						getFileRecordMock,
					});

					const { wrapper, composable } = getWrapper(elementId);

					return {
						wrapper,
						composable,
						getFileRecord,
						uploadFromUrlMock,
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
