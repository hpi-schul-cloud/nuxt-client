import { FileRecordScanStatus, PreviewStatus } from "@/fileStorageApi/v3";
import NotifierModule from "@/store/notifier";
import { AnyContentElement } from "@/types/board/ContentElement";
import { convertDownloadToPreviewUrl } from "@/utils/fileHelper";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { setupFileStorageApiMock } from "@@/tests/test-utils/api-mocks/fileStorageApiMock";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { fileElementResponseFactory } from "@@/tests/test-utils/factory/fileElementResponseFactory";
import { fileRecordResponseFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { createMock } from "@golevelup/ts-jest";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { MountOptions, shallowMount } from "@vue/test-utils";
import Vue, { nextTick } from "vue";
import FileContentElement from "./FileContentElement.vue";
import FileContentElementAlert from "./FileContentElementAlert.vue";
import FileContentElementChips from "./FileContentElementChips.vue";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";
import FileContentElementInit from "./FileContentElementInit.vue";
import ImageFileDisplay from "./ImageFileDisplay.vue";

jest.mock("@data-board", () => {
	return {
		useBoardFocusHandler: jest.fn(),
		useContentElementState: jest.fn(() => ({ modelValue: {} })),
	};
});
jest.mock("@feature-board");
jest.mock("../FileStorageApi.composable");

jest.mock("@ui-confirmation-dialog");
const mockedUse = createMock<ReturnType<typeof useDeleteConfirmationDialog>>();
mockedUse.askDeleteConfirmation.mockResolvedValue(true);
const useDeleteConfirmationDialogMock = jest.mocked(
	useDeleteConfirmationDialog
);
useDeleteConfirmationDialogMock.mockReturnValue(mockedUse);

describe("FileContentElement", () => {
	const notifierModule = createModuleMocks(NotifierModule);
	const getWrapper = (props: {
		fileName: string;
		element: AnyContentElement;
		isEditMode: boolean;
		isFirstElement: boolean;
		isLastElement: boolean;
		hasMultipleElements: boolean;
	}) => {
		const deleteElementMock = jest.fn();

		const wrapper = shallowMount(FileContentElement as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
			},
			propsData: { ...props, deleteElement: deleteElementMock },
		});

		return { wrapper, deleteElementMock };
	};

	describe("when component is in view mode", () => {
		describe("when file needs to be uploaded", () => {
			const setup = () => {
				const element = fileElementResponseFactory.build();
				document.body.setAttribute("data-app", "true");

				const fileRecordResponse = fileRecordResponseFactory.build({});

				const uploadMock = jest.fn().mockImplementationOnce(() => {
					fileRecord.value = fileRecordResponse;
				});
				const { upload, fileRecord } = setupFileStorageApiMock({
					uploadMock,
				});

				const { wrapper, deleteElementMock } = getWrapper({
					fileName: "myfile",
					element,
					isEditMode: false,
					isFirstElement: false,
					isLastElement: false,
					hasMultipleElements: false,
				});

				return {
					wrapper,
					upload,
					fileRecord,
					deleteElementMock,
				};
			};

			it("should be found in dom", () => {
				const { wrapper } = setup();
				expect(wrapper.findComponent(FileContentElement).exists()).toBe(true);
			});

			it("should not render Init component", async () => {
				const { wrapper } = setup();

				await wrapper.vm.$nextTick();

				const fileContentElementInit = wrapper.findComponent(
					FileContentElementInit
				);
				expect(fileContentElementInit.exists()).toBe(false);
			});
		});

		describe("when file is uploaded", () => {
			const setup = () => {
				const element = fileElementResponseFactory.build();
				document.body.setAttribute("data-app", "true");

				const fileRecordResponse = fileRecordResponseFactory.build({
					securityCheckStatus: FileRecordScanStatus.PENDING,
				});
				const fetchFileMock = jest.fn().mockImplementationOnce(() => {
					fileRecord.value = fileRecordResponse;
				});
				const { fetchFile, fileRecord } = setupFileStorageApiMock({
					fetchFileMock,
				});

				mockedUse.askDeleteConfirmation.mockResolvedValue(true);

				const { wrapper, deleteElementMock } = getWrapper({
					fileName: "abc.jpg",
					element,
					isEditMode: false,
					isFirstElement: false,
					isLastElement: false,
					hasMultipleElements: false,
				});

				return {
					wrapper,
					fetchFile,
					fileRecordResponse,
					element,
					deleteElementMock,
				};
			};

			describe("when no virus is detected", () => {
				it("should be found in dom", () => {
					const { wrapper } = setup();

					const fileContentElement = wrapper.findComponent(FileContentElement);
					expect(fileContentElement.exists()).toBe(true);
				});

				it("should render FileContentElementDisplay component", async () => {
					const { wrapper } = setup();

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					const fileContentElementDisplay = wrapper.findComponent(
						FileContentElementDisplay
					);
					expect(fileContentElementDisplay.exists()).toBe(true);
				});

				it("should hand over correct fileProperties to FileContentElementDisplay", async () => {
					const { wrapper, fileRecordResponse } = setup();

					await wrapper.vm.$nextTick();

					const fileProperties = wrapper
						.findComponent(FileContentElementDisplay)
						.props("fileProperties");

					const expectedFileProperties = {
						name: fileRecordResponse.name,
						isDownloadAllowed: true,
						url: fileRecordResponse.url,
						previewUrl: undefined,
						size: fileRecordResponse.size,
					};

					expect(fileProperties).toEqual(expectedFileProperties);
				});

				it("should call fetchFile", async () => {
					const { wrapper, fetchFile } = setup();

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					expect(fetchFile).toHaveBeenCalledTimes(1);
				});

				describe("when file is an image", () => {
					const setup = () => {
						const element = fileElementResponseFactory.build();
						document.body.setAttribute("data-app", "true");

						const fileRecordResponse = fileRecordResponseFactory.build({
							securityCheckStatus: FileRecordScanStatus.PENDING,
							mimeType: "image/png",
							previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
						});
						const fetchFileMock = jest.fn().mockImplementationOnce(() => {
							fileRecord.value = fileRecordResponse;
						});
						const { fetchFile, fileRecord } = setupFileStorageApiMock({
							fetchFileMock,
						});

						mockedUse.askDeleteConfirmation.mockResolvedValue(true);

						const { wrapper, deleteElementMock } = getWrapper({
							fileName: "abc.jpg",
							element,
							isEditMode: false,
							isFirstElement: false,
							isLastElement: false,
							hasMultipleElements: false,
						});

						return {
							wrapper,
							fetchFile,
							fileRecordResponse,
							element,
							deleteElementMock,
						};
					};

					it("should render ImageFileDisplay component", async () => {
						const { wrapper } = setup();

						await wrapper.vm.$nextTick();
						await wrapper.vm.$nextTick();

						const imageFileDisplay = wrapper.findComponent(ImageFileDisplay);
						expect(imageFileDisplay.exists()).toBe(true);
					});

					it("should hand over correct fileProperties to ImageFileDisplay", async () => {
						const { wrapper, fileRecordResponse } = setup();

						await wrapper.vm.$nextTick();

						const fileProperties = wrapper
							.findComponent(ImageFileDisplay)
							.props("fileProperties");

						const url = fileRecordResponse.url;
						const expectedFileProperties = {
							name: fileRecordResponse.name,
							isDownloadAllowed: true,
							url,
							previewUrl: convertDownloadToPreviewUrl(url),
							size: fileRecordResponse.size,
						};

						expect(fileProperties).toEqual(expectedFileProperties);
					});

					it("should hand over isFirstElement property to ImageFileDisplay", async () => {
						const { wrapper } = setup();

						await wrapper.vm.$nextTick();

						const isFirstElement = wrapper
							.findComponent(ImageFileDisplay)
							.props("isFirstElement");

						expect(isFirstElement).toBe(false);
					});

					it("should hand over isLastElement property to ImageFileDisplay", async () => {
						const { wrapper } = setup();

						await wrapper.vm.$nextTick();

						const isLastElement = wrapper
							.findComponent(ImageFileDisplay)
							.props("isLastElement");

						expect(isLastElement).toBe(false);
					});

					it("should hand over hasMultipleElements property to ImageFileDisplay", async () => {
						const { wrapper } = setup();

						await wrapper.vm.$nextTick();

						const hasMultipleElements = wrapper
							.findComponent(ImageFileDisplay)
							.props("hasMultipleElements");

						expect(hasMultipleElements).toBe(false);
					});
				});
			});

			describe("when a virus is detected", () => {
				const setup = () => {
					const element = fileElementResponseFactory.build();
					document.body.setAttribute("data-app", "true");

					const fileRecordResponse = fileRecordResponseFactory.build({
						securityCheckStatus: FileRecordScanStatus.BLOCKED,
						mimeType: "image/png",
						previewStatus:
							PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED,
					});
					const fetchFileMock = jest.fn().mockImplementationOnce(() => {
						fileRecord.value = fileRecordResponse;
					});
					const { fetchFile, fileRecord } = setupFileStorageApiMock({
						fetchFileMock,
					});

					mockedUse.askDeleteConfirmation.mockResolvedValue(true);

					const { wrapper, deleteElementMock } = getWrapper({
						fileName: "abc.jpg",
						element,
						isEditMode: false,
						isFirstElement: false,
						isLastElement: false,
						hasMultipleElements: false,
					});

					return {
						wrapper,
						fetchFile,
						fileRecordResponse,
						element,
						deleteElementMock,
					};
				};

				it("should not render ImageFileDisplay", async () => {
					const { wrapper } = setup();

					await wrapper.vm.$nextTick();

					const componentExists = wrapper
						.findComponent(ImageFileDisplay)
						.exists();

					expect(componentExists).toBe(false);
				});

				it("should render FileContentElementAlert component", async () => {
					const { wrapper } = setup();

					await wrapper.vm.$nextTick();

					const fileContentElementAlert = wrapper.findComponent(
						FileContentElementAlert
					);
					expect(fileContentElementAlert.exists()).toBe(true);
				});

				describe("when file is an image", () => {
					const setup = () => {
						const element = fileElementResponseFactory.build();
						document.body.setAttribute("data-app", "true");

						const fileRecordResponse = fileRecordResponseFactory.build({
							securityCheckStatus: FileRecordScanStatus.BLOCKED,
							mimeType: "image/png",
						});
						const fetchFileMock = jest.fn().mockImplementationOnce(() => {
							fileRecord.value = fileRecordResponse;
						});
						const { fetchFile, fileRecord } = setupFileStorageApiMock({
							fetchFileMock,
						});

						mockedUse.askDeleteConfirmation.mockResolvedValue(true);

						const { wrapper, deleteElementMock } = getWrapper({
							fileName: "abc.jpg",
							element,
							isEditMode: false,
							isFirstElement: false,
							isLastElement: false,
							hasMultipleElements: false,
						});

						return {
							wrapper,
							fetchFile,
							fileRecordResponse,
							element,
							deleteElementMock,
						};
					};

					it("should not render ImageFileDisplay", async () => {
						const { wrapper } = setup();

						await wrapper.vm.$nextTick();

						const componentExists = wrapper
							.findComponent(ImageFileDisplay)
							.exists();

						expect(componentExists).toBe(false);
					});
				});
			});
		});
	});

	describe("when component is in edit mode", () => {
		describe("when file needs to be uploaded", () => {
			describe("when upload is successful", () => {
				const setup = () => {
					const element = fileElementResponseFactory.build();
					document.body.setAttribute("data-app", "true");

					const fileRecordResponse = fileRecordResponseFactory.build();

					const uploadMock = jest.fn().mockImplementationOnce(() => {
						fileRecord.value = fileRecordResponse;
					});
					const { upload, fileRecord } = setupFileStorageApiMock({
						uploadMock,
					});

					mockedUse.askDeleteConfirmation.mockResolvedValue(true);

					const { wrapper, deleteElementMock } = getWrapper({
						fileName: "abc.jpg",
						element,
						isEditMode: true,
						isFirstElement: false,
						isLastElement: false,
						hasMultipleElements: false,
					});

					return {
						wrapper,
						upload,
						fileRecord,
						deleteElementMock,
					};
				};

				it("should be found in dom", () => {
					const { wrapper } = setup();
					expect(wrapper.findComponent(FileContentElement).exists()).toBe(true);
				});

				it("should render fileContentElementInit component", async () => {
					const { wrapper } = setup();

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					const fileContentElementInit = wrapper.findComponent(
						FileContentElementInit
					);
					expect(fileContentElementInit.exists()).toBe(true);
				});
			});

			describe("when upload throws error", () => {
				const setup = () => {
					const element = fileElementResponseFactory.build();
					document.body.setAttribute("data-app", "true");

					const error = new Error("test");
					const uploadMock = jest.fn().mockRejectedValueOnce(error);
					setupFileStorageApiMock({ uploadMock });

					mockedUse.askDeleteConfirmation.mockResolvedValue(true);

					const { wrapper, deleteElementMock } = getWrapper({
						fileName: "abc.jpg",
						element,
						isEditMode: true,
						isFirstElement: false,
						isLastElement: false,
						hasMultipleElements: false,
					});

					return {
						wrapper,
						deleteElementMock,
					};
				};

				it("should emit delete:element", async () => {
					const { wrapper } = setup();

					const initComponent = wrapper.findComponent(FileContentElementInit);
					initComponent.vm.$emit("upload:file", { fileName: "mysample.txt" });

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					expect(wrapper.emitted("delete:element")).toHaveLength(1);
				});

				it("should not render FileContentElementChips component", async () => {
					const { wrapper } = setup();

					await wrapper.vm.$nextTick();

					const FileContentElementChip = wrapper.findComponent(
						FileContentElementChips
					);
					expect(FileContentElementChip.exists()).toBe(false);
				});
			});

			describe("when file is uploaded", () => {
				describe("when no virus is detected", () => {
					const setup = () => {
						const element = fileElementResponseFactory.build();
						document.body.setAttribute("data-app", "true");

						const fileRecordResponse = fileRecordResponseFactory.build({
							securityCheckStatus: FileRecordScanStatus.PENDING,
							mimeType: "image/png",
						});
						const fetchFileMock = jest.fn().mockImplementationOnce(() => {
							fileRecord.value = fileRecordResponse;
						});
						const { fetchFile, fileRecord } = setupFileStorageApiMock({
							fetchFileMock,
						});

						mockedUse.askDeleteConfirmation.mockResolvedValue(true);

						const { wrapper, deleteElementMock } = getWrapper({
							fileName: "abc.jpg",
							element,
							isEditMode: true,
							isFirstElement: false,
							isLastElement: false,
							hasMultipleElements: false,
						});

						return {
							wrapper,
							fetchFile,
							fileRecordResponse,
							element,
							deleteElementMock,
						};
					};

					it("should be found in dom", () => {
						const { wrapper } = setup();
						expect(wrapper.findComponent(FileContentElement).exists()).toBe(
							true
						);
					});

					it("should render FileContentElementEdit component", async () => {
						const { wrapper } = setup();

						await wrapper.vm.$nextTick();
						await wrapper.vm.$nextTick();

						const fileContentElementEdit = wrapper.findComponent(
							FileContentElementEdit
						);
						expect(fileContentElementEdit.exists()).toBe(true);
					});

					it("should hand over fileProperties to FileContentElementEdit", async () => {
						const { wrapper, fileRecordResponse } = setup();

						await wrapper.vm.$nextTick();

						const fileProperties = wrapper
							.findComponent(FileContentElementEdit)
							.props("fileProperties");

						const expectedFileProperties = {
							name: fileRecordResponse.name,
							isDownloadAllowed: true,
							url: fileRecordResponse.url,
							previewUrl: undefined,
							size: fileRecordResponse.size,
						};

						expect(fileProperties).toEqual(expectedFileProperties);
					});

					it("should pass delete:element event from child to parent", async () => {
						const { wrapper } = setup();

						await nextTick();
						await nextTick();

						const child = wrapper.findComponent(FileContentElementEdit);
						child.vm.$emit("delete:element");

						await nextTick();
						await nextTick();

						expect(wrapper.emitted("delete:element")).toHaveLength(1);
					});

					it("should emit 'move-down:edit' when it receives move-down:element event from child", async () => {
						const { wrapper } = setup();

						await wrapper.vm.$nextTick();

						const fileContentElementEdit = wrapper.findComponent(
							FileContentElementEdit
						);
						fileContentElementEdit.vm.$emit("move-down:element");

						const emitted = wrapper.emitted();
						expect(emitted["move-down:edit"]).toBeDefined();
					});

					it("should emit 'move-up:edit' when it receives move-up:element event from child", async () => {
						const { wrapper } = setup();

						await wrapper.vm.$nextTick();

						const fileContentElementEdit = wrapper.findComponent(
							FileContentElementEdit
						);
						fileContentElementEdit.vm.$emit("move-up:element");

						const emitted = wrapper.emitted();
						expect(emitted["move-up:edit"]).toBeDefined();
					});

					// currently blocked as v-card blocks correct usage of keydown event (works when its a div)
					it.todo(
						"should emit 'move-keyboard:edit' when arrow key up or is pressed"
					);
					/* async () => {
						const { wrapper } = setup();

						await wrapper.vm.$nextTick();

						await wrapper.trigger("keydown.up");

						const emitted = wrapper.emitted();
						expect(emitted["move-keyboard:edit"]).toBeDefined();
					}; */

					describe("when file is an image", () => {
						const setup = () => {
							const element = fileElementResponseFactory.build();
							document.body.setAttribute("data-app", "true");

							const fileRecordResponse = fileRecordResponseFactory.build({
								securityCheckStatus: FileRecordScanStatus.VERIFIED,
								mimeType: "image/png",
								previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
							});
							const fetchFileMock = jest.fn().mockImplementationOnce(() => {
								fileRecord.value = fileRecordResponse;
							});
							const { fetchFile, fileRecord } = setupFileStorageApiMock({
								fetchFileMock,
							});

							mockedUse.askDeleteConfirmation.mockResolvedValue(true);

							const { wrapper, deleteElementMock } = getWrapper({
								fileName: "abc.jpg",
								element,
								isEditMode: true,
								isFirstElement: false,
								isLastElement: false,
								hasMultipleElements: false,
							});

							return {
								wrapper,
								fetchFile,
								fileRecordResponse,
								element,
								deleteElementMock,
							};
						};

						it("should render ImageFileDisplay component", async () => {
							const { wrapper } = setup();

							await wrapper.vm.$nextTick();
							await wrapper.vm.$nextTick();

							const imageFileDisplay = wrapper.findComponent(ImageFileDisplay);
							expect(imageFileDisplay.exists()).toBe(true);
						});

						it("should hand over isFirstElement property to ImageFileDisplay", async () => {
							const { wrapper } = setup();

							await wrapper.vm.$nextTick();

							const isFirstElement = wrapper
								.findComponent(ImageFileDisplay)
								.props("isFirstElement");

							expect(isFirstElement).toBe(false);
						});

						it("should hand over isLastElement property to ImageFileDisplay", async () => {
							const { wrapper } = setup();

							await wrapper.vm.$nextTick();

							const isLastElement = wrapper
								.findComponent(ImageFileDisplay)
								.props("isLastElement");

							expect(isLastElement).toBe(false);
						});

						it("should hand over hasMultipleElements property to ImageFileDisplay", async () => {
							const { wrapper } = setup();

							await wrapper.vm.$nextTick();

							const hasMultipleElements = wrapper
								.findComponent(ImageFileDisplay)
								.props("hasMultipleElements");

							expect(hasMultipleElements).toBe(false);
						});
					});
				});

				describe("when a virus is detected", () => {
					const setup = () => {
						const element = fileElementResponseFactory.build();
						document.body.setAttribute("data-app", "true");

						const fileRecordResponse = fileRecordResponseFactory.build({
							securityCheckStatus: FileRecordScanStatus.BLOCKED,
							mimeType: "image/png",
							previewStatus:
								PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED,
						});
						const fetchFileMock = jest.fn().mockImplementationOnce(() => {
							fileRecord.value = fileRecordResponse;
						});
						const { fetchFile, fileRecord } = setupFileStorageApiMock({
							fetchFileMock,
						});

						mockedUse.askDeleteConfirmation.mockResolvedValue(true);

						const { wrapper, deleteElementMock } = getWrapper({
							fileName: "abc.jpg",
							element,
							isEditMode: true,
							isFirstElement: false,
							isLastElement: false,
							hasMultipleElements: false,
						});

						return {
							wrapper,
							fetchFile,
							fileRecordResponse,
							element,
							deleteElementMock,
						};
					};

					it("should hand over correct file properties to FileContentElementEdit", async () => {
						const { wrapper, fileRecordResponse } = setup();

						await wrapper.vm.$nextTick();

						const fileProperties = wrapper
							.findComponent(FileContentElementEdit)
							.props("fileProperties");

						const expectedFileProperties = {
							name: fileRecordResponse.name,
							isDownloadAllowed: false,
							url: fileRecordResponse.url,
							previewUrl: undefined,
							size: fileRecordResponse.size,
						};

						expect(fileProperties).toEqual(expectedFileProperties);
					});

					it("should hand over isFirstElement property to FileContentElementEdit", async () => {
						const { wrapper } = setup();

						await wrapper.vm.$nextTick();

						const isFirstElement = wrapper
							.findComponent(FileContentElementEdit)
							.props("isFirstElement");

						expect(isFirstElement).toBe(false);
					});

					it("should hand over isLastElement property to FileContentElementEdit", async () => {
						const { wrapper } = setup();

						await wrapper.vm.$nextTick();

						const isLastElement = wrapper
							.findComponent(FileContentElementEdit)
							.props("isLastElement");

						expect(isLastElement).toBe(false);
					});

					it("should hand over hasMultipleElements property to FileContentElementEdit", async () => {
						const { wrapper } = setup();

						await wrapper.vm.$nextTick();

						const hasMultipleElements = wrapper
							.findComponent(FileContentElementEdit)
							.props("hasMultipleElements");

						expect(hasMultipleElements).toBe(false);
					});

					it("should render FileContentElementAlert component", async () => {
						const { wrapper } = setup();

						await wrapper.vm.$nextTick();

						const fileContentElementAlert = wrapper.findComponent(
							FileContentElementAlert
						);
						expect(fileContentElementAlert.exists()).toBe(true);
					});

					it("should pass delete:element event from child to parent", async () => {
						const { wrapper } = setup();

						await nextTick();
						await nextTick();

						const child = wrapper.findComponent(FileContentElementEdit);
						child.vm.$emit("delete:element");

						await nextTick();
						await nextTick();

						expect(wrapper.emitted("delete:element")).toHaveLength(1);
					});

					describe("when file is an image", () => {
						const setup = () => {
							const element = fileElementResponseFactory.build();
							document.body.setAttribute("data-app", "true");

							const fileRecordResponse = fileRecordResponseFactory.build({
								securityCheckStatus: FileRecordScanStatus.BLOCKED,
								mimeType: "image/png",
								previewStatus:
									PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED,
							});
							const fetchFileMock = jest.fn().mockImplementationOnce(() => {
								fileRecord.value = fileRecordResponse;
							});
							const { fetchFile, fileRecord } = setupFileStorageApiMock({
								fetchFileMock,
							});

							mockedUse.askDeleteConfirmation.mockResolvedValue(true);

							const { wrapper, deleteElementMock } = getWrapper({
								fileName: "abc.jpg",
								element,
								isEditMode: true,
								isFirstElement: false,
								isLastElement: false,
								hasMultipleElements: false,
							});

							return {
								wrapper,
								fetchFile,
								fileRecordResponse,
								element,
								deleteElementMock,
							};
						};

						it("should not render ImageFileDisplay component", async () => {
							const { wrapper } = setup();

							await wrapper.vm.$nextTick();
							await wrapper.vm.$nextTick();

							const imageFileDisplay = wrapper.findComponent(ImageFileDisplay);
							expect(imageFileDisplay.exists()).toBe(false);
						});
					});
				});
			});
		});
	});
});
