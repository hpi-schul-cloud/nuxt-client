import {
	FileRecordScanStatus,
	PreviewStatus,
	PreviewWidth,
} from "@/fileStorageApi/v3";
import NotifierModule from "@/store/notifier";
import { AnyContentElement } from "@/types/board/ContentElement";
import { convertDownloadToPreviewUrl } from "@/utils/fileHelper";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { setupFileStorageApiMock } from "@@/tests/test-utils/api-mocks/fileStorageApiMock";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { fileElementResponseFactory } from "@@/tests/test-utils/factory/fileElementResponseFactory";
import { fileRecordResponseFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { MountOptions, shallowMount } from "@vue/test-utils";
import Vue, { computed } from "vue";
import { useFileAlerts } from "./content/alert/useFileAlerts.composable";
import FileContent from "./content/FileContent.vue";
import FileContentElement from "./FileContentElement.vue";
import { FileProperties } from "./shared/types/file-properties";
import { FileAlert } from "./shared/types/FileAlert.enum";
import FileUpload from "./upload/FileUpload.vue";

jest.mock("@data-board", () => {
	return {
		useBoardFocusHandler: jest.fn(),
		useContentElementState: jest.fn(() => ({ modelValue: {} })),
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

		const addAlertMock = jest.fn();
		jest.mocked(useFileAlerts).mockReturnValue({
			addAlert: addAlertMock,
			alerts: computed(() => []),
		});

		const wrapper = shallowMount(FileContentElement as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
				[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
			},
			propsData: { ...props },
			slots: {
				menu,
			},
		});

		return { wrapper, menu, addAlertMock };
	};

	describe("when component is not in edit mode", () => {
		describe("when file record is not available", () => {
			const setup = () => {
				const element = fileElementResponseFactory.build();
				document.body.setAttribute("data-app", "true");

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

				expect(card.props("outlined")).toBe(false);
			});

			it("should not render FileContent component", async () => {
				const { wrapper } = setup();

				await wrapper.vm.$nextTick();
				const fileContent = wrapper.findComponent(FileContent);

				expect(fileContent.exists()).toBe(false);
			});

			it("should not render FileUpload component", async () => {
				const { wrapper } = setup();

				await wrapper.vm.$nextTick();

				const fileUpload = wrapper.findComponent(FileUpload);
				expect(fileUpload.exists()).toBe(true);
			});

			it("should not render slot menu component", async () => {
				const { wrapper, menu } = setup();

				await wrapper.vm.$nextTick();

				expect(wrapper.html()).not.toContain(menu);
			});
		});

		describe("when file record is available", () => {
			const setup = (props?: {
				scanStatus?: FileRecordScanStatus;
				previewStatus?: PreviewStatus;
			}) => {
				const element = fileElementResponseFactory.build();
				document.body.setAttribute("data-app", "true");

				const fileRecordResponse = fileRecordResponseFactory.build({
					securityCheckStatus:
						props?.scanStatus ?? FileRecordScanStatus.PENDING,
					previewStatus: props?.previewStatus ?? PreviewStatus.PREVIEW_POSSIBLE,
				});
				const fetchFileMock = jest.fn().mockImplementationOnce(() => {
					fileRecord.value = fileRecordResponse;
				});
				const { fetchFile, fileRecord } = setupFileStorageApiMock({
					fetchFileMock,
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

			it("should pass isOutlined prop to v-card", () => {
				const { wrapper } = setup();

				const card = wrapper.findComponent({ ref: "fileContentElement" });

				expect(card.props("outlined")).toBe(false);
			});

			describe("when file content emits add:alert event", () => {
				it("should add event payload to emittedAlerts", async () => {
					const { wrapper, addAlertMock } = setup();

					await wrapper.vm.$nextTick();

					const fileContent = wrapper.findComponent(FileContent);
					const alert = FileAlert.VIDEO_FORMAT_ERROR;
					fileContent.vm.$emit("add:alert", alert);

					expect(addAlertMock).toHaveBeenCalledWith(alert);
				});
			});

			describe("when file content emits fetch:file event", () => {
				it("should call fetchFile when FileContent emits fetch:file event", async () => {
					const { wrapper, fetchFile } = setup();

					await wrapper.vm.$nextTick();

					expect(fetchFile).toHaveBeenCalledTimes(1);

					const fileContent = wrapper.findComponent(FileContent);
					fileContent.vm.$emit("fetch:file");

					expect(fetchFile).toHaveBeenCalledTimes(2);
				});
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

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					expect(wrapper.emitted("move-keyboard:edit")).toBeUndefined();
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

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

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
					const { wrapper, fetchFile } = setup();

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					expect(fetchFile).toHaveBeenCalledTimes(1);
				});

				it("should render FileContent component", async () => {
					const { wrapper } = setup();
					await wrapper.vm.$nextTick();

					const fileContent = wrapper.findComponent(FileContent);

					expect(fileContent.exists()).toBe(true);
				});

				it("should pass correct fileProperties to FileContent", async () => {
					const { wrapper, expectedFileProperties } = setup();
					await wrapper.vm.$nextTick();

					const fileProperties = wrapper
						.findComponent(FileContent)
						.props("fileProperties");

					expect(fileProperties).toEqual(expectedFileProperties);
				});

				it("should not render File Upload component", async () => {
					const { wrapper } = setup();
					await wrapper.vm.$nextTick();

					const fileUpload = wrapper.findComponent(FileUpload);
					expect(fileUpload.exists()).toBe(false);
				});

				it("should not render slot menu component", async () => {
					const { wrapper, menu } = setup();
					await wrapper.vm.$nextTick();

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
					await wrapper.vm.$nextTick();

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

					expect(card.props("outlined")).toBe(true);
				});

				it("should not render FileContent component", async () => {
					const { wrapper } = setup();

					await wrapper.vm.$nextTick();
					const fileContent = wrapper.findComponent(FileContent);

					expect(fileContent.exists()).toBe(false);
				});

				it("should render FileUpload component", async () => {
					const { wrapper } = setup();

					await wrapper.vm.$nextTick();

					const fileUpload = wrapper.findComponent(FileUpload);
					expect(fileUpload.exists()).toBe(true);
				});

				it("should pass correct props to FileUpload component", async () => {
					const { wrapper, element } = setup();

					await wrapper.vm.$nextTick();

					const props = wrapper.findComponent(FileUpload).props();

					expect(props.elementId).toEqual(element.id);
					expect(props.isEditMode).toBe(true);
				});

				describe("when FileUpload emits upload:file event", () => {
					it("should call upload when FileUpload emits upload:file event", async () => {
						const { wrapper, upload } = setup();

						await wrapper.vm.$nextTick();

						const fileUpload = wrapper.findComponent(FileUpload);
						fileUpload.vm.$emit("upload:file", { fileName: "mysample.txt" });

						await wrapper.vm.$nextTick();

						expect(upload).toHaveBeenCalledTimes(1);
					});
				});
			});

			describe("when upload returns error", () => {
				const setup = () => {
					const element = fileElementResponseFactory.build();
					document.body.setAttribute("data-app", "true");

					const uploadMock = jest.fn().mockRejectedValueOnce(new Error("test"));
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

					await wrapper.vm.$nextTick();

					const fileUpload = wrapper.findComponent(FileUpload);
					expect(fileUpload.exists()).toBe(true);
				});

				it("should emit delete:element on upload", async () => {
					const { wrapper } = setup();

					const fileUpload = wrapper.findComponent(FileUpload);
					fileUpload.vm.$emit("upload:file", { fileName: "mysample.txt" });

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					expect(wrapper.emitted("delete:element")).toHaveLength(1);
				});
			});
		});

		describe("when file record is available", () => {
			const setup = (props?: {
				scanStatus?: FileRecordScanStatus;
				previewStatus?: PreviewStatus;
			}) => {
				const element = fileElementResponseFactory.build();
				document.body.setAttribute("data-app", "true");

				const fileRecordResponse = fileRecordResponseFactory.build({
					securityCheckStatus:
						props?.scanStatus ?? FileRecordScanStatus.PENDING,
					previewStatus: props?.previewStatus ?? PreviewStatus.PREVIEW_POSSIBLE,
				});
				const fetchFileMock = jest.fn().mockImplementationOnce(() => {
					fileRecord.value = fileRecordResponse;
				});
				const { fetchFile, fileRecord } = setupFileStorageApiMock({
					fetchFileMock,
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

				expect(card.props("outlined")).toBe(true);
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

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

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

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

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
					const { wrapper, fetchFile } = setup();

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					expect(fetchFile).toHaveBeenCalledTimes(1);
				});

				it("should render FileContent component", async () => {
					const { wrapper } = setup();
					await wrapper.vm.$nextTick();

					const fileContent = wrapper.findComponent(FileContent);

					expect(fileContent.exists()).toBe(true);
				});

				it("should pass correct fileProperties to FileContent", async () => {
					const { wrapper, expectedFileProperties } = setup();
					await wrapper.vm.$nextTick();

					const fileProperties = wrapper
						.findComponent(FileContent)
						.props("fileProperties");

					expect(fileProperties).toEqual(expectedFileProperties);
				});

				it("should call fetchFile when FileContent emits fetch:file event", async () => {
					const { wrapper, fetchFile } = setup();

					await wrapper.vm.$nextTick();

					expect(fetchFile).toHaveBeenCalledTimes(1);

					const fileContent = wrapper.findComponent(FileContent);
					fileContent.vm.$emit("fetch:file");

					await wrapper.vm.$nextTick();

					expect(fetchFile).toHaveBeenCalledTimes(2);
				});

				it("should not render File Upload component", async () => {
					const { wrapper } = setup();
					await wrapper.vm.$nextTick();

					const fileUpload = wrapper.findComponent(FileUpload);
					expect(fileUpload.exists()).toBe(false);
				});
			});

			describe("when a virus is detected", () => {
				it("should pass correct props to FileContent component", async () => {
					const { wrapper, expectedFileProperties } = setup({
						scanStatus: FileRecordScanStatus.BLOCKED,
						previewStatus:
							PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED,
					});
					await wrapper.vm.$nextTick();

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
