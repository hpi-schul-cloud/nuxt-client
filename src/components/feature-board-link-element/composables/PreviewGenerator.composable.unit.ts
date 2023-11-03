import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { usePreviewGenerator } from "./PreviewGenerator.composable";
import {
	fileRecordResponseFactory,
	setupFileStorageApiMock,
} from "@@/tests/test-utils";
import { PreviewStatus } from "@/fileStorageApi/v3";

jest.mock("@feature-board-file-element");

describe("usePreviewGenerator", () => {
	beforeEach(() => {});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const getWrapper = (elementId: string) => {
		let composable: ReturnType<typeof usePreviewGenerator> | undefined;

		const TestComponent = defineComponent({
			template: "<div/>",
			setup() {
				composable = usePreviewGenerator(elementId);
			},
		});

		const wrapper = mount(TestComponent, {});
		return { wrapper, composable };
	};

	describe("getData", () => {
		describe("when meta tags could be extracted", () => {
			const setup = () => {
				const elementId = "my-custom-mocked-id";
				const uploadFromUrlMock = jest.fn();
				const { fileRecord } = setupFileStorageApiMock({ uploadFromUrlMock });

				const { wrapper, composable } = getWrapper(elementId);

				return {
					wrapper,
					composable,
					fileRecord,
					uploadFromUrlMock,
				};
			};

			it("should be defined", () => {
				const { composable } = setup();

				expect(composable?.createPreviewImage).toBeDefined();
			});

			it("should upload the external image", async () => {
				const { composable, uploadFromUrlMock } = setup();

				const imageUrl = "https://test.de/my-article/image.jpg";
				await composable?.createPreviewImage(imageUrl);

				expect(uploadFromUrlMock).toHaveBeenCalledWith(imageUrl);
			});

			describe("when image can be uploaded", () => {
				it("should return image url for the preview image", async () => {
					const { composable, fileRecord } = setup();

					fileRecord.value = fileRecordResponseFactory.build({
						previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
					});

					const externalImageUrl = "https://test.de/my-article/image.jpg";
					const previewImageUrl =
						await composable?.createPreviewImage(externalImageUrl);

					expect(previewImageUrl).toEqual(
						expect.stringContaining(fileRecord.value.url)
					);
				});
			});

			describe("when image can not be uploaded", () => {
				it("should return nothing", async () => {
					const { composable, fileRecord } = setup();

					fileRecord.value = undefined;

					const externalImageUrl = "https://test.de/my-article/image.jpg";
					const previewImageUrl =
						await composable?.createPreviewImage(externalImageUrl);

					expect(previewImageUrl).toBeUndefined();
				});
			});
		});
	});
});
