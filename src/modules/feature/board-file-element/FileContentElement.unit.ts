import {
	FileRecordScanStatus,
	PreviewStatus,
	PreviewWidth,
} from "@/fileStorageApi/v3";
import { FileElementResponse } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import { convertDownloadToPreviewUrl } from "@/utils/fileHelper";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { fileElementResponseFactory } from "@@/tests/test-utils/factory/fileElementResponseFactory";
import { fileRecordFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import * as FileStorageApi from "@data-file";
import { createMock } from "@golevelup/ts-jest";
import { shallowMount } from "@vue/test-utils";
import { computed, nextTick } from "vue";
import FileContentElement from "./FileContentElement.vue";
import FileContent from "./content/FileContent.vue";
import { useFileAlerts } from "./content/alert/useFileAlerts.composable";
import { FileAlert } from "./shared/types/FileAlert.enum";
import { FileProperties } from "./shared/types/file-properties";
import FileUpload from "./upload/FileUpload.vue";

vi.mock("@data-board", () => {
	return {
		useBoardFocusHandler: vi.fn(),
		useContentElementState: vi.fn(() => ({ modelValue: {} })),
	};
});
vi.mock("@feature-board");
vi.mock("./content/alert/useFileAlerts.composable");

describe("FileContentElement", () => {
	const notifierModule = createModuleMocks(NotifierModule);
	const getWrapper = (props: {
		element: FileElementResponse;
		isEditMode: boolean;
		columnIndex: number;
		rowIndex: number;
		elementIndex: number;
	}) => {
		const menu = "slot-menu";

		const addAlertMock = vi.fn();
		vi.mocked(useFileAlerts).mockReturnValue({
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

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
					fileStorageApiMock
				);

				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

				const { wrapper, menu } = getWrapper({
					element,
					isEditMode: false,
					columnIndex: 0,
					rowIndex: 1,
					elementIndex: 2,
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
				const fileRecordResponse = fileRecordFactory.build({
					securityCheckStatus:
						props?.scanStatus ?? FileRecordScanStatus.PENDING,
					previewStatus: props?.previewStatus ?? PreviewStatus.PREVIEW_POSSIBLE,
					isUploading: props?.isUploading,
				});

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
					fileStorageApiMock
				);
				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
					fileRecordResponse,
				]);

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
					columnIndex: 0,
					rowIndex: 1,
					elementIndex: 2,
				});

				return {
					wrapper,
					fileRecordResponse,
					element,
					expectedFileProperties,
					menu,
					addAlertMock,
					fileStorageApiMock,
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
					const { wrapper, fileStorageApiMock } = setup();

					await nextTick();

					expect(fileStorageApiMock.fetchFiles).toHaveBeenCalledTimes(1);

					const fileContent = wrapper.findComponent(FileContent);
					fileContent.vm.$emit("fetch:file");

					expect(fileStorageApiMock.fetchFiles).toHaveBeenCalledTimes(2);
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
					const { fileStorageApiMock } = setup();

					await nextTick();
					await nextTick();

					expect(fileStorageApiMock.fetchFiles).toHaveBeenCalledTimes(1);
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

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const elementPositionProps = {
						isFirstElement: false,
						isLastElement: true,
						hasMultipleElements: false,
					};
					const { wrapper } = getWrapper({
						element,
						isEditMode: true,
						columnIndex: 0,
						rowIndex: 1,
						elementIndex: 2,
					});

					return {
						wrapper,
						fileStorageApiMock,
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
						const { wrapper, fileStorageApiMock } = setup();

						await nextTick();

						const fileUpload = wrapper.findComponent(FileUpload);
						fileUpload.vm.$emit("upload:file", { fileName: "mysample.txt" });

						await nextTick();

						expect(fileStorageApiMock.upload).toHaveBeenCalledTimes(1);
					});
				});
			});

			describe("when upload returns error", () => {
				const setup = () => {
					const element = fileElementResponseFactory.build();
					document.body.setAttribute("data-app", "true");

					const fileStorageApiMock =
						createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
						fileStorageApiMock
					);
					fileStorageApiMock.upload.mockRejectedValueOnce(new Error("test"));
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const { wrapper } = getWrapper({
						element,
						isEditMode: true,
						columnIndex: 0,
						rowIndex: 1,
						elementIndex: 2,
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

				const fileRecordResponse = fileRecordFactory.build({
					securityCheckStatus:
						props?.scanStatus ?? FileRecordScanStatus.PENDING,
					previewStatus: props?.previewStatus ?? PreviewStatus.PREVIEW_POSSIBLE,
					isUploading: props?.isUploading,
				});

				const fileStorageApiMock =
					createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(
					fileStorageApiMock
				);
				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([
					fileRecordResponse,
				]);

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
					columnIndex: 0,
					rowIndex: 1,
					elementIndex: 2,
				});

				return {
					wrapper,
					fileStorageApiMock,
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
					const { fileStorageApiMock } = setup();

					await nextTick();

					expect(fileStorageApiMock.fetchFiles).toHaveBeenCalledTimes(1);
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
					const { wrapper, fileStorageApiMock } = setup();

					await nextTick();

					expect(fileStorageApiMock.fetchFiles).toHaveBeenCalledTimes(1);

					const fileContent = wrapper.findComponent(FileContent);
					fileContent.vm.$emit("fetch:file");

					await nextTick();

					expect(fileStorageApiMock.fetchFiles).toHaveBeenCalledTimes(2);
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
