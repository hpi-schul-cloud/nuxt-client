import {
	FileRecordScanStatus,
	PreviewStatus,
	PreviewWidth,
} from "@/fileStorageApi/v3";
import NotifierModule from "@/store/notifier";
import { AnyContentElement } from "@/types/board/ContentElement";
import { convertDownloadToPreviewUrl } from "@/utils/fileHelper";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { setupFileStorageApiMock } from "@@/tests/test-utils/api-mocks/fileStorageApiMock";
import { fileElementResponseFactory } from "@@/tests/test-utils/factory/fileElementResponseFactory";
import { fileRecordResponseFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";
import { computed, nextTick, ref } from "vue";
import FileContentElement from "./FileContentElement.vue";
import FileContent from "./content/FileContent.vue";
import { useFileAlerts } from "./content/alert/useFileAlerts.composable";
import { FileAlert } from "./shared/types/FileAlert.enum";
import { FileProperties } from "./shared/types/file-properties";
import FileUpload from "./upload/FileUpload.vue";

jest.mock("@data-board", () => {
	return {
		useBoardFocusHandler: vi.fn(),
		useContentElementState: vi.fn(() => ({ modelValue: {} })),
	};
});
jest.mock("@feature-board");
jest.mock("./shared/composables/FileStorageApi.composable");
jest.mock("./content/alert/useFileAlerts.composable");

describe("FileContentElement", () => {
	const notifierModule = createModuleMocks(NotifierModule);
	const getWrapper = (props: {
		element: AnyContentElement;
		isEditMode: boolean;
	}) => {
		const menu = "slot-menu";

		const addAlertMock = vi.fn();
		jest.mocked(useFileAlerts).mockReturnValue({
			addAlert: addAlertMock,
			alerts: computed(() => []),
		});

		const wrapper = shallowMount(FileContentElement, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			provide: {
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
			},
			props,
			slots: {
				menu,
			},
		});

		return { wrapper, menu, addAlertMock };
	};

	describe("when component is in view mode", () => {
		describe("when file record is not available", () => {
			const setup = () => {
				const element = fileElementResponseFactory.build();

				setupFileStorageApiMock({});

				const { wrapper, menu } = getWrapper({
					element,
					isEditMode: false,
				});

				return {
					wrapper,
					element,
					menu,
				};
			};

			it("should be found in dom", () => {
				const { wrapper } = setup();

				expect(wrapper.findComponent(FileContentElement).exists()).toBe(true);
			});

			it("should pass isOutlined prop to v-card", () => {
				const { wrapper } = setup();

				const card = wrapper.findComponent({ ref: "fileContentElement" });

				expect(card.props("variant")).toBe("elevated");
			});

			it("should not render FileContent component", async () => {
				const { wrapper } = setup();

				await nextTick();
				const fileContent = wrapper.findComponent(FileContent);

				expect(fileContent.exists()).toBe(false);
			});

			it("should not render FileUpload component", async () => {
				const { wrapper } = setup();

				await nextTick();

				const fileUpload = wrapper.findComponent(FileUpload);
				expect(fileUpload.exists()).toBe(true);
			});

			it("should not render slot menu component", async () => {
				const { wrapper, menu } = setup();

				await nextTick();

				expect(wrapper.html()).not.toContain(menu);
			});
		});

		describe("when file record is available", () => {
			const setup = (props?: {
				scanStatus?: FileRecordScanStatus;
				previewStatus?: PreviewStatus;
				isUploading?: boolean;
			}) => {
				const element = fileElementResponseFactory.build();
				const fileRecordResponse = fileRecordResponseFactory.build({
					securityCheckStatus:
						props?.scanStatus ?? FileRecordScanStatus.PENDING,
					previewStatus: props?.previewStatus ?? PreviewStatus.PREVIEW_POSSIBLE,
					isUploading: props?.isUploading,
				});

				const getFileRecordMock = vi.fn().mockImplementationOnce(() => {
					return ref(fileRecordResponse);
				});
				const { fetchFile } = setupFileStorageApiMock({
					getFileRecordMock,
				});

				const expectedFileProperties: FileProperties = {
					name: fileRecordResponse.name,
					isDownloadAllowed: true,
					url: fileRecordResponse.url,
					previewUrl: convertDownloadToPreviewUrl(
						fileRecordResponse.url,
						PreviewWidth._500
					),
					size: fileRecordResponse.size,
					previewStatus: fileRecordResponse.previewStatus,
					element,
					mimeType: fileRecordResponse.mimeType,
				};

				const { wrapper, menu, addAlertMock } = getWrapper({
					element,
					isEditMode: false,
				});

				return {
					wrapper,
					fetchFile,
					fileRecordResponse,
					element,
					expectedFileProperties,
					menu,
					addAlertMock,
				};
			};

			describe("when file is uploaded", () => {
				it("should pass isOutlined prop to v-card", async () => {
					const { wrapper } = setup();

					await nextTick();

					const card = wrapper.findComponent({ ref: "fileContentElement" });

					expect(card.props("variant")).toBe("outlined");
				});
			});

			describe("when file is uploading", () => {
				it("should pass isOutlined prop to v-card", async () => {
					const { wrapper } = setup({ isUploading: true });

					await nextTick();

					const card = wrapper.findComponent({ ref: "fileContentElement" });

					expect(card.props("variant")).toBe("elevated");
				});
			});

			describe("when file content emits add:alert event", () => {
				it("should add event payload to emittedAlerts", async () => {
					const { wrapper, addAlertMock } = setup();

					await nextTick();

					const fileContent = wrapper.findComponent(FileContent);
					const alert = FileAlert.VIDEO_FORMAT_ERROR;
					fileContent.vm.$emit("add:alert", alert);

					expect(addAlertMock).toHaveBeenCalledWith(alert);
				});
			});

			describe("when file content emits fetch:file event", () => {
				it("should call fetchFile when FileContent emits fetch:file event", async () => {
					const { wrapper, fetchFile } = setup();

					await nextTick();

					expect(fetchFile).toHaveBeenCalledTimes(1);

					const fileContent = wrapper.findComponent(FileContent);
					fileContent.vm.$emit("fetch:file");

					expect(fetchFile).toHaveBeenCalledTimes(2);
				});
			});

			describe("when v-card emits keydown.down event", () => {
				it("should not emit move-keyboard:edit event", async () => {
					const { wrapper } = setup();

					const card = wrapper.findComponent({ ref: "fileContentElement" });
					card.vm.$emit(
						"keydown",
						new KeyboardEvent("keydown", {
							key: "ArrowDown",
							keyCode: 40,
						})
					);

					await nextTick();
					await nextTick();

					expect(wrapper.emitted("move-keyboard:edit")).toBeUndefined();
				});
			});

			describe("when v-card emits keydown.up event", () => {
				it("should not emit move-keyboard:edit event", async () => {
					const { wrapper } = setup();

					const card = wrapper.findComponent({ ref: "fileContentElement" });
					card.vm.$emit(
						"keydown",
						new KeyboardEvent("keydown", {
							key: "ArrowUp",
							keyCode: 38,
						})
					);

					await nextTick();
					await nextTick();

					expect(wrapper.emitted("move-keyboard:edit")).toBeUndefined();
				});
			});

			describe("when no virus is detected", () => {
				it("should be found in dom", () => {
					const { wrapper } = setup();

					const fileContentElement = wrapper.findComponent(FileContentElement);
					expect(fileContentElement.exists()).toBe(true);
				});

				it("should call fetchFile", async () => {
					const { fetchFile } = setup();

					await nextTick();
					await nextTick();

					expect(fetchFile).toHaveBeenCalledTimes(1);
				});

				it("should render FileContent component", async () => {
					const { wrapper } = setup();
					await nextTick();

					const fileContent = wrapper.findComponent(FileContent);

					expect(fileContent.exists()).toBe(true);
				});

				it("should pass correct fileProperties to FileContent", async () => {
					const { wrapper, expectedFileProperties } = setup();
					await nextTick();

					const fileProperties = wrapper
						.findComponent(FileContent)
						.props("fileProperties");

					expect(fileProperties).toEqual(expectedFileProperties);
				});

				it("should not render File Upload component", async () => {
					const { wrapper } = setup();
					await nextTick();

					const fileUpload = wrapper.findComponent(FileUpload);
					expect(fileUpload.exists()).toBe(false);
				});

				it("should not render slot menu component", async () => {
					const { wrapper, menu } = setup();
					await nextTick();

					expect(wrapper.html()).not.toContain(menu);
				});
			});

			describe("when a virus is detected", () => {
				it("should pass correct props to FileContent component", async () => {
					const { wrapper, expectedFileProperties } = setup({
						scanStatus: FileRecordScanStatus.BLOCKED,
						previewStatus:
							PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED,
					});
					await nextTick();

					const fileProperties = wrapper
						.findComponent(FileContent)
						.props("fileProperties");

					expectedFileProperties.isDownloadAllowed = false;
					expectedFileProperties.previewUrl = undefined;
					expect(fileProperties).toEqual(expectedFileProperties);
				});
			});
		});
	});

	describe("when component is in edit mode", () => {
		describe("when file record is not available", () => {
			describe("when upload is successful", () => {
				const setup = () => {
					const element = fileElementResponseFactory.build();
					document.body.setAttribute("data-app", "true");

					const { upload } = setupFileStorageApiMock({});

					const elementPositionProps = {
						isFirstElement: false,
						isLastElement: true,
						hasMultipleElements: false,
					};
					const { wrapper } = getWrapper({
						element,
						isEditMode: true,
					});

					return {
						wrapper,
						upload,
						element,
						elementPositionProps,
					};
				};

				it("should be found in dom", () => {
					const { wrapper } = setup();
					expect(wrapper.findComponent(FileContentElement).exists()).toBe(true);
				});

				it("should pass isOutlined prop to v-card", () => {
					const { wrapper } = setup();

					const card = wrapper.findComponent({ ref: "fileContentElement" });

					expect(card.props("variant")).toBe("outlined");
				});

				it("should not render FileContent component", async () => {
					const { wrapper } = setup();

					await nextTick();
					const fileContent = wrapper.findComponent(FileContent);

					expect(fileContent.exists()).toBe(false);
				});

				it("should render FileUpload component", async () => {
					const { wrapper } = setup();

					await nextTick();

					const fileUpload = wrapper.findComponent(FileUpload);
					expect(fileUpload.exists()).toBe(true);
				});

				it("should pass correct props to FileUpload component", async () => {
					const { wrapper, element } = setup();

					await nextTick();

					const props = wrapper.findComponent(FileUpload).props();

					expect(props.elementId).toEqual(element.id);
					expect(props.isEditMode).toBe(true);
				});

				describe("when FileUpload emits upload:file event", () => {
					it("should call upload when FileUpload emits upload:file event", async () => {
						const { wrapper, upload } = setup();

						await nextTick();

						const fileUpload = wrapper.findComponent(FileUpload);
						fileUpload.vm.$emit("upload:file", { fileName: "mysample.txt" });

						await nextTick();

						expect(upload).toHaveBeenCalledTimes(1);
					});
				});
			});

			describe("when upload returns error", () => {
				const setup = () => {
					const element = fileElementResponseFactory.build();
					document.body.setAttribute("data-app", "true");

					const uploadMock = vi.fn().mockRejectedValueOnce(new Error("test"));
					setupFileStorageApiMock({
						uploadMock,
					});

					const { wrapper } = getWrapper({
						element,
						isEditMode: true,
					});

					return {
						wrapper,
						element,
					};
				};

				it("should render FileUpload component", async () => {
					const { wrapper } = setup();

					await nextTick();

					const fileUpload = wrapper.findComponent(FileUpload);
					expect(fileUpload.exists()).toBe(true);
				});

				it("should emit delete:element on upload", async () => {
					const { wrapper } = setup();

					const fileUpload = wrapper.findComponent(FileUpload);
					fileUpload.trigger("upload:file", { fileName: "mysample.txt" });

					await nextTick();
					await nextTick();
					await nextTick();

					expect(wrapper.emitted("delete:element")).toHaveLength(1);
				});
			});
		});

		describe("when file record is available", () => {
			const setup = (props?: {
				scanStatus?: FileRecordScanStatus;
				previewStatus?: PreviewStatus;
				isUploading?: boolean;
			}) => {
				const element = fileElementResponseFactory.build();
				document.body.setAttribute("data-app", "true");

				const fileRecordResponse = fileRecordResponseFactory.build({
					securityCheckStatus:
						props?.scanStatus ?? FileRecordScanStatus.PENDING,
					previewStatus: props?.previewStatus ?? PreviewStatus.PREVIEW_POSSIBLE,
					isUploading: props?.isUploading,
				});
				const getFileRecordMock = vi.fn().mockImplementation(() => {
					return ref(fileRecordResponse);
				});
				const { fetchFile } = setupFileStorageApiMock({
					getFileRecordMock,
				});

				const expectedFileProperties: FileProperties = {
					name: fileRecordResponse.name,
					isDownloadAllowed: true,
					url: fileRecordResponse.url,
					previewUrl: convertDownloadToPreviewUrl(
						fileRecordResponse.url,
						PreviewWidth._500
					),
					size: fileRecordResponse.size,
					previewStatus: fileRecordResponse.previewStatus,
					element,
					mimeType: fileRecordResponse.mimeType,
				};

				const { wrapper, menu } = getWrapper({
					element,
					isEditMode: true,
				});

				return {
					wrapper,
					fetchFile,
					fileRecordResponse,
					element,
					expectedFileProperties,
					menu,
				};
			};

			it("should pass isOutlined prop to v-card", () => {
				const { wrapper } = setup();

				const card = wrapper.findComponent({ ref: "fileContentElement" });

				expect(card.props("variant")).toBe("outlined");
			});

			describe("when v-card emits keydown.down event", () => {
				it("should emit move-keyboard:edit event", async () => {
					const { wrapper } = setup();

					const card = wrapper.findComponent({ ref: "fileContentElement" });
					card.vm.$emit(
						"keydown",
						new KeyboardEvent("keydown", {
							key: "ArrowDown",
							keyCode: 40,
						})
					);

					await nextTick();
					await nextTick();

					expect(wrapper.emitted("move-keyboard:edit")).toHaveLength(1);
				});
			});

			describe("when v-card emits keydown.up event", () => {
				it("should emit move-keyboard:edit event", async () => {
					const { wrapper } = setup();

					const card = wrapper.findComponent({ ref: "fileContentElement" });
					card.vm.$emit(
						"keydown",
						new KeyboardEvent("keydown", {
							key: "ArrowUp",
							keyCode: 38,
						})
					);

					await nextTick();
					await nextTick();

					expect(wrapper.emitted("move-keyboard:edit")).toHaveLength(1);
				});
			});

			describe("when no virus is detected", () => {
				it("should be found in dom", () => {
					const { wrapper } = setup();

					const fileContentElement = wrapper.findComponent(FileContentElement);

					expect(fileContentElement.exists()).toBe(true);
				});

				it("should call fetchFile", async () => {
					const { fetchFile } = setup();

					await nextTick();

					expect(fetchFile).toHaveBeenCalledTimes(1);
				});

				it("should pass correct fileProperties to FileContent", async () => {
					const { wrapper, expectedFileProperties } = setup();
					await nextTick();

					const fileProperties = wrapper
						.findComponent(FileContent)
						.props("fileProperties");

					expect(fileProperties).toEqual(expectedFileProperties);
				});

				it("should call fetchFile when FileContent emits fetch:file event", async () => {
					const { wrapper, fetchFile } = setup();

					await nextTick();

					expect(fetchFile).toHaveBeenCalledTimes(1);

					const fileContent = wrapper.findComponent(FileContent);
					fileContent.vm.$emit("fetch:file");

					await nextTick();

					expect(fetchFile).toHaveBeenCalledTimes(2);
				});

				describe("when file is uploaded", () => {
					it("should render FileContent component", async () => {
						const { wrapper } = setup();

						await nextTick();

						const fileContent = wrapper.findComponent(FileContent);

						expect(fileContent.exists()).toBe(true);
					});

					it("should not render File Upload component", async () => {
						const { wrapper } = setup();
						await nextTick();

						const fileUpload = wrapper.findComponent(FileUpload);
						expect(fileUpload.exists()).toBe(false);
					});
				});

				describe("when file is uploading", () => {
					it("should render File Upload component", async () => {
						const { wrapper } = setup({ isUploading: true });
						await nextTick();

						const fileUpload = wrapper.findComponent(FileUpload);
						expect(fileUpload.exists()).toBe(true);
					});

					it("should not render FileContent component", async () => {
						const { wrapper } = setup({ isUploading: true });

						await nextTick();

						const fileContent = wrapper.findComponent(FileContent);

						expect(fileContent.exists()).toBe(false);
					});
				});
			});

			describe("when a virus is detected", () => {
				it("should pass correct props to FileContent component", async () => {
					const { wrapper, expectedFileProperties } = setup({
						scanStatus: FileRecordScanStatus.BLOCKED,
						previewStatus:
							PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED,
					});
					await nextTick();

					const fileProperties = wrapper
						.findComponent(FileContent)
						.props("fileProperties");

					expectedFileProperties.isDownloadAllowed = false;
					expectedFileProperties.previewUrl = undefined;
					expect(fileProperties).toEqual(expectedFileProperties);
				});
			});
		});
	});
});
