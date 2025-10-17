import { useFileAlerts } from "./content/alert/useFileAlerts.composable";
import FileContent from "./content/FileContent.vue";
import FileContentElement from "./FileContentElement.vue";
import { FileProperties } from "./shared/types/file-properties";
import { FileAlert } from "./shared/types/FileAlert.enum";
import FileUpload from "./upload/FileUpload.vue";
import { FileRecordScanStatus, PreviewStatus, PreviewWidth } from "@/fileStorageApi/v3";
import { FileElementResponse } from "@/serverApi/v3";
import { convertDownloadToPreviewUrl } from "@/utils/fileHelper";
import { createTestEnvStore } from "@@/tests/test-utils";
import { fileElementResponseFactory } from "@@/tests/test-utils/factory/fileElementResponseFactory";
import { fileRecordFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useBoardPermissions, useContentElementState } from "@data-board";
import * as FileStorageApi from "@data-file";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { computed, nextTick, ref } from "vue";
import { Router, useRouter } from "vue-router";
import { VCard } from "vuetify/components";

vi.mock("@data-board");
vi.mock("@feature-board");
vi.mock("./content/alert/useFileAlerts.composable");
vi.mock("vue-router");

describe("FileContentElement", () => {
	const getWrapper = (props: {
		element: FileElementResponse;
		isEditMode: boolean;
		columnIndex: number;
		rowIndex: number;
		elementIndex: number;
		isCollaboraEnabled?: boolean;
	}) => {
		const menu = "slot-menu";

		const addAlertMock = vi.fn();
		vi.mocked(useFileAlerts).mockReturnValue({
			addAlert: addAlertMock,
			alerts: computed(() => []),
		});
		setActivePinia(createTestingPinia());
		createTestEnvStore({
			FEATURE_COLUMN_BOARD_COLLABORA_ENABLED: props.isCollaboraEnabled ?? false,
		});

		const wrapper = shallowMount(FileContentElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
			slots: {
				menu,
			},
		});

		return { wrapper, menu, addAlertMock };
	};

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when component is in view mode", () => {
		describe("when file record is not available", () => {
			const setup = () => {
				const element = fileElementResponseFactory.build();

				const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);

				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

				const useBoardPermissionsMockFn = vi.mocked(useBoardPermissions); // the mocked function
				const useBoardPermissionsMockReturn = createMock<ReturnType<typeof useBoardPermissions>>({
					hasEditPermission: ref(true),
				});
				useBoardPermissionsMockFn.mockReturnValueOnce(useBoardPermissionsMockReturn);

				const useContentElementStateMock = vi.mocked(useContentElementState);
				const fileContentElement = fileElementResponseFactory.build();
				useContentElementStateMock.mockReturnValueOnce({
					modelValue: ref(fileContentElement),
					computedElement: computed(() => fileContentElement),
				});

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
				isCollaboraEnabled?: boolean;
				mimeType?: string;
				isCollaboraEditable?: boolean;
			}) => {
				const element = fileElementResponseFactory.build();
				const fileRecordResponse = fileRecordFactory.build({
					securityCheckStatus: props?.scanStatus ?? FileRecordScanStatus.PENDING,
					previewStatus: props?.previewStatus ?? PreviewStatus.PREVIEW_POSSIBLE,
					isUploading: props?.isUploading,
					mimeType: props?.mimeType ?? "application/pdf",
					isCollaboraEditable: props?.isCollaboraEditable ?? false,
				});

				const collaboraPageUrl = "/collabora/" + fileRecordResponse.id + "?editorMode=edit";
				const router = createMock<Router>();
				const useRouterMock = <Mock>useRouter;
				useRouterMock.mockReturnValue(router);
				router.resolve.mockReturnValueOnce({ href: collaboraPageUrl });

				const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);
				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([fileRecordResponse]);

				const expectedFileProperties: FileProperties = {
					name: fileRecordResponse.name,
					isDownloadAllowed: true,
					url: fileRecordResponse.url,
					previewUrl: convertDownloadToPreviewUrl(fileRecordResponse.url, PreviewWidth._500),
					size: fileRecordResponse.size,
					previewStatus: fileRecordResponse.previewStatus,
					element,
					mimeType: fileRecordResponse.mimeType,
					isCollaboraEditable: fileRecordResponse.isCollaboraEditable,
				};

				const useBoardPermissionsMockFn = vi.mocked(useBoardPermissions); // the mocked function
				const useBoardPermissionsMockReturn = createMock<ReturnType<typeof useBoardPermissions>>({
					hasEditPermission: ref(true),
				});
				useBoardPermissionsMockFn.mockReturnValueOnce(useBoardPermissionsMockReturn);

				const useContentElementStateMock = vi.mocked(useContentElementState);
				const fileContentElement = fileElementResponseFactory.build();
				useContentElementStateMock.mockReturnValueOnce({
					modelValue: ref(fileContentElement),
					computedElement: computed(() => fileContentElement),
				});

				const { wrapper, menu, addAlertMock } = getWrapper({
					element,
					isEditMode: false,
					columnIndex: 0,
					rowIndex: 1,
					elementIndex: 2,
					isCollaboraEnabled: props?.isCollaboraEnabled,
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

					const fileProperties = wrapper.findComponent(FileContent).props("fileProperties");

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
						previewStatus: PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED,
					});
					await nextTick();

					const fileProperties = wrapper.findComponent(FileContent).props("fileProperties");

					expectedFileProperties.isDownloadAllowed = false;
					expectedFileProperties.previewUrl = undefined;
					expect(fileProperties).toEqual(expectedFileProperties);
				});
			});

			describe("when collabora feature is enabled and mime typ is collabora type", () => {
				it("should add aria label to v-card", () => {
					const { wrapper } = setup({
						isCollaboraEnabled: true,
						mimeType: "application/vnd.oasis.opendocument.text",
						isCollaboraEditable: true,
					});

					const card = wrapper.findComponent(VCard);

					expect(card.attributes("aria-label")).toBe("components.cardElement.fileElement.openOfficeDocument");
				});

				describe("when card is clicked", () => {
					it("should open collabora url in new tab", () => {
						const { wrapper, fileRecordResponse } = setup({
							isCollaboraEnabled: true,
							mimeType: "application/vnd.oasis.opendocument.text",
							isCollaboraEditable: true,
						});
						const card = wrapper.findComponent(VCard);

						const windowOpenMock = vi.fn();
						const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(windowOpenMock);

						card.trigger("click");

						expect(windowOpenSpy).toHaveBeenCalledWith(`/collabora/${fileRecordResponse.id}?editorMode=edit`, "_blank");
						windowOpenSpy.mockRestore();
					});
				});

				describe("when card is focused and enter is pressed", () => {
					it("should open collabora url in new tab", async () => {
						const { wrapper, fileRecordResponse } = setup({
							isCollaboraEnabled: true,
							mimeType: "application/vnd.oasis.opendocument.text",
							isCollaboraEditable: true,
						});

						const card = wrapper.findComponent(VCard);

						const windowOpenMock = vi.fn();
						const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(windowOpenMock);

						await card.trigger("keydown.enter");

						expect(windowOpenSpy).toHaveBeenCalledWith(`/collabora/${fileRecordResponse.id}?editorMode=edit`, "_blank");

						windowOpenSpy.mockRestore();
					});
				});
			});

			describe("when collabora feature is not enabled and mime typ is collabora type", () => {
				it("should not add aria label to v-card", () => {
					const { wrapper } = setup({
						isCollaboraEnabled: false,
						mimeType: "application/vnd.oasis.opendocument.text",
						isCollaboraEditable: true,
					});

					const card = wrapper.findComponent(VCard);

					expect(card.attributes("aria-label")).toBe(undefined);
				});

				describe("when card is clicked", () => {
					it("should not open collabora url in new tab", () => {
						const { wrapper, fileRecordResponse } = setup({
							isCollaboraEnabled: false,
							mimeType: "application/vnd.oasis.opendocument.text",
							isCollaboraEditable: true,
						});
						const card = wrapper.findComponent(VCard);

						const windowOpenMock = vi.fn();
						const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(windowOpenMock);

						card.trigger("click");

						expect(windowOpenSpy).not.toHaveBeenCalledWith(`/collabora/${fileRecordResponse.id}`, "_blank");
						windowOpenSpy.mockRestore();
					});
				});

				describe("when card is focused and enter is pressed", () => {
					it("should not open collabora url in new tab", async () => {
						const { wrapper, fileRecordResponse } = setup({
							isCollaboraEnabled: false,
							mimeType: "application/vnd.oasis.opendocument.text",
							isCollaboraEditable: true,
						});

						const card = wrapper.findComponent(VCard);

						const windowOpenMock = vi.fn();
						const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(windowOpenMock);

						await card.trigger("keydown.enter");

						expect(windowOpenSpy).not.toHaveBeenCalledWith(`/collabora/${fileRecordResponse.id}`, "_blank");

						windowOpenSpy.mockRestore();
					});
				});
			});

			describe("when collabora feature is enabled and mime typ is not collabora type", () => {
				it("should not add aria label to v-card", () => {
					const { wrapper } = setup({
						isCollaboraEnabled: true,
						mimeType: "application/pdf",
						isCollaboraEditable: false,
					});

					const card = wrapper.findComponent(VCard);

					expect(card.attributes("aria-label")).toBe(undefined);
				});

				describe("when card is clicked", () => {
					it("should not open collabora url in new tab", () => {
						const { wrapper, fileRecordResponse } = setup({
							isCollaboraEnabled: true,
							mimeType: "application/pdf",
							isCollaboraEditable: false,
						});
						const card = wrapper.findComponent(VCard);

						const windowOpenMock = vi.fn();
						const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(windowOpenMock);

						card.trigger("click");

						expect(windowOpenSpy).not.toHaveBeenCalledWith(`/collabora/${fileRecordResponse.id}`, "_blank");
						windowOpenSpy.mockRestore();
					});
				});

				describe("when card is focused and enter is pressed", () => {
					it("should not open collabora url in new tab", async () => {
						const { wrapper, fileRecordResponse } = setup({
							isCollaboraEnabled: true,
							mimeType: "application/pdf",
							isCollaboraEditable: false,
						});

						const card = wrapper.findComponent(VCard);

						const windowOpenMock = vi.fn();
						const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(windowOpenMock);

						await card.trigger("keydown.enter");

						expect(windowOpenSpy).not.toHaveBeenCalledWith(`/collabora/${fileRecordResponse.id}`, "_blank");

						windowOpenSpy.mockRestore();
					});
				});
			});

			describe("when collabora feature is not enabled and mime typ is not collabora type", () => {
				it("should not add aria label to v-card", () => {
					const { wrapper } = setup({
						isCollaboraEnabled: false,
						mimeType: "application/pdf",
						isCollaboraEditable: false,
					});

					const card = wrapper.findComponent(VCard);

					expect(card.attributes("aria-label")).toBe(undefined);
				});

				describe("when card is clicked", () => {
					it("should not open collabora url in new tab", () => {
						const { wrapper, fileRecordResponse } = setup({
							isCollaboraEnabled: false,
							mimeType: "application/pdf",
							isCollaboraEditable: false,
						});
						const card = wrapper.findComponent(VCard);

						const windowOpenMock = vi.fn();
						const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(windowOpenMock);

						card.trigger("click");

						expect(windowOpenSpy).not.toHaveBeenCalledWith(`/collabora/${fileRecordResponse.id}`, "_blank");
						windowOpenSpy.mockRestore();
					});
				});

				describe("when card is focused and enter is pressed", () => {
					it("should not open collabora url in new tab", async () => {
						const { wrapper, fileRecordResponse } = setup({
							isCollaboraEnabled: false,
							mimeType: "application/pdf",
							isCollaboraEditable: false,
						});

						const card = wrapper.findComponent(VCard);

						const windowOpenMock = vi.fn();
						const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(windowOpenMock);

						await card.trigger("keydown.enter");

						expect(windowOpenSpy).not.toHaveBeenCalledWith(`/collabora/${fileRecordResponse.id}`, "_blank");

						windowOpenSpy.mockRestore();
					});
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

					const collaboraPageUrl = "/collabora/" + "123" + "?editorMode=edit";
					const router = createMock<Router>();
					const useRouterMock = <Mock>useRouter;
					useRouterMock.mockReturnValue(router);
					router.resolve.mockReturnValueOnce({ href: collaboraPageUrl });

					const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const useBoardPermissionsMockFn = vi.mocked(useBoardPermissions); // the mocked function
					const useBoardPermissionsMockReturn = createMock<ReturnType<typeof useBoardPermissions>>({
						hasEditPermission: ref(true),
					});
					useBoardPermissionsMockFn.mockReturnValueOnce(useBoardPermissionsMockReturn);

					const useContentElementStateMock = vi.mocked(useContentElementState);
					const fileContentElement = fileElementResponseFactory.build();
					useContentElementStateMock.mockReturnValueOnce({
						modelValue: ref(fileContentElement),
						computedElement: computed(() => fileContentElement),
					});

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

					const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
					vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);
					fileStorageApiMock.upload.mockRejectedValueOnce(new Error("test"));
					fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([]);

					const useBoardPermissionsMockFn = vi.mocked(useBoardPermissions); // the mocked function
					const useBoardPermissionsMockReturn = createMock<ReturnType<typeof useBoardPermissions>>({
						hasEditPermission: ref(true),
					});
					useBoardPermissionsMockFn.mockReturnValueOnce(useBoardPermissionsMockReturn);

					const useContentElementStateMock = vi.mocked(useContentElementState);
					const fileContentElement = fileElementResponseFactory.build();
					useContentElementStateMock.mockReturnValueOnce({
						modelValue: ref(fileContentElement),
						computedElement: computed(() => fileContentElement),
					});

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
				isCollaboraEnabled?: boolean;
				mimeType?: string;
				isCollaboraEditable?: boolean;
			}) => {
				const element = fileElementResponseFactory.build();
				document.body.setAttribute("data-app", "true");

				const fileRecordResponse = fileRecordFactory.build({
					securityCheckStatus: props?.scanStatus ?? FileRecordScanStatus.PENDING,
					previewStatus: props?.previewStatus ?? PreviewStatus.PREVIEW_POSSIBLE,
					isUploading: props?.isUploading,
					mimeType: props?.mimeType ?? "application/pdf",
					isCollaboraEditable: props?.isCollaboraEditable ?? false,
				});

				const collaboraPageUrl = "/collabora/" + fileRecordResponse.id + "?editorMode=edit";
				const router = createMock<Router>();
				const useRouterMock = <Mock>useRouter;

				useRouterMock.mockReturnValue(router);
				router.resolve.mockReturnValueOnce({ href: collaboraPageUrl });

				const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
				vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);
				fileStorageApiMock.getFileRecordsByParentId.mockReturnValueOnce([fileRecordResponse]);

				const expectedFileProperties: FileProperties = {
					name: fileRecordResponse.name,
					isDownloadAllowed: true,
					url: fileRecordResponse.url,
					previewUrl: convertDownloadToPreviewUrl(fileRecordResponse.url, PreviewWidth._500),
					size: fileRecordResponse.size,
					previewStatus: fileRecordResponse.previewStatus,
					element,
					mimeType: fileRecordResponse.mimeType,
					isCollaboraEditable: fileRecordResponse.isCollaboraEditable,
				};

				const useBoardPermissionsMockFn = vi.mocked(useBoardPermissions); // the mocked function
				const useBoardPermissionsMockReturn = createMock<ReturnType<typeof useBoardPermissions>>({
					hasEditPermission: ref(true),
				});
				useBoardPermissionsMockFn.mockReturnValueOnce(useBoardPermissionsMockReturn);

				const useContentElementStateMock = vi.mocked(useContentElementState);
				const fileContentElement = fileElementResponseFactory.build();
				useContentElementStateMock.mockReturnValueOnce({
					modelValue: ref(fileContentElement),
					computedElement: computed(() => fileContentElement),
				});

				const { wrapper, menu } = getWrapper({
					element,
					isEditMode: true,
					columnIndex: 0,
					rowIndex: 1,
					elementIndex: 2,
					isCollaboraEnabled: props?.isCollaboraEnabled,
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

					const fileProperties = wrapper.findComponent(FileContent).props("fileProperties");

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
						previewStatus: PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED,
					});
					await nextTick();

					const fileProperties = wrapper.findComponent(FileContent).props("fileProperties");

					expectedFileProperties.isDownloadAllowed = false;
					expectedFileProperties.previewUrl = undefined;
					expect(fileProperties).toEqual(expectedFileProperties);
				});
			});

			describe("when collabora feature is enabled and mime typ is collabora type", () => {
				it("should add aria label to v-card", () => {
					const { wrapper } = setup({
						isCollaboraEnabled: true,
						mimeType: "application/vnd.oasis.opendocument.text",
						isCollaboraEditable: true,
					});

					const card = wrapper.findComponent(VCard);

					expect(card.attributes("aria-label")).toBe("components.cardElement.fileElement.openOfficeDocument");
				});

				describe("when card is clicked", () => {
					it("should open collabora url in new tab", () => {
						const { wrapper, fileRecordResponse } = setup({
							isCollaboraEnabled: true,
							mimeType: "application/vnd.oasis.opendocument.text",
							isCollaboraEditable: true,
						});
						const card = wrapper.findComponent(VCard);

						const windowOpenMock = vi.fn();
						const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(windowOpenMock);

						card.trigger("click");

						expect(windowOpenSpy).toHaveBeenCalledWith(`/collabora/${fileRecordResponse.id}?editorMode=edit`, "_blank");
						windowOpenSpy.mockRestore();
					});
				});

				describe("when card is focused and enter is pressed", () => {
					it("should open collabora url in new tab", async () => {
						const { wrapper, fileRecordResponse } = setup({
							isCollaboraEnabled: true,
							mimeType: "application/vnd.oasis.opendocument.text",
							isCollaboraEditable: true,
						});

						const card = wrapper.findComponent(VCard);

						const windowOpenMock = vi.fn();
						const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(windowOpenMock);

						await card.trigger("keydown.enter");

						expect(windowOpenSpy).toHaveBeenCalledWith(`/collabora/${fileRecordResponse.id}?editorMode=edit`, "_blank");

						windowOpenSpy.mockRestore();
					});
				});
			});

			describe("when collabora feature is not enabled and mime typ is collabora type", () => {
				it("should not add aria label to v-card", () => {
					const { wrapper } = setup({
						isCollaboraEnabled: false,
						mimeType: "application/vnd.oasis.opendocument.text",
						isCollaboraEditable: true,
					});

					const card = wrapper.findComponent(VCard);

					expect(card.attributes("aria-label")).toBe(undefined);
				});

				describe("when card is clicked", () => {
					it("should not open collabora url in new tab", () => {
						const { wrapper, fileRecordResponse } = setup({
							isCollaboraEnabled: false,
							mimeType: "application/vnd.oasis.opendocument.text",
							isCollaboraEditable: true,
						});
						const card = wrapper.findComponent(VCard);

						const windowOpenMock = vi.fn();
						const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(windowOpenMock);

						card.trigger("click");

						expect(windowOpenSpy).not.toHaveBeenCalledWith(`/collabora/${fileRecordResponse.id}`, "_blank");
						windowOpenSpy.mockRestore();
					});
				});

				describe("when card is focused and enter is pressed", () => {
					it("should not open collabora url in new tab", async () => {
						const { wrapper, fileRecordResponse } = setup({
							isCollaboraEnabled: false,
							mimeType: "application/vnd.oasis.opendocument.text",
							isCollaboraEditable: true,
						});

						const card = wrapper.findComponent(VCard);

						const windowOpenMock = vi.fn();
						const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(windowOpenMock);

						await card.trigger("keydown.enter");

						expect(windowOpenSpy).not.toHaveBeenCalledWith(`/collabora/${fileRecordResponse.id}`, "_blank");

						windowOpenSpy.mockRestore();
					});
				});
			});

			describe("when collabora feature is enabled and mime typ is not collabora type", () => {
				it("should not add aria label to v-card", () => {
					const { wrapper } = setup({
						isCollaboraEnabled: true,
						mimeType: "application/pdf",
						isCollaboraEditable: false,
					});

					const card = wrapper.findComponent(VCard);

					expect(card.attributes("aria-label")).toBe(undefined);
				});

				describe("when card is clicked", () => {
					it("should not open collabora url in new tab", () => {
						const { wrapper, fileRecordResponse } = setup({
							isCollaboraEnabled: true,
							mimeType: "application/pdf",
							isCollaboraEditable: false,
						});
						const card = wrapper.findComponent(VCard);

						const windowOpenMock = vi.fn();
						const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(windowOpenMock);

						card.trigger("click");

						expect(windowOpenSpy).not.toHaveBeenCalledWith(`/collabora/${fileRecordResponse.id}`, "_blank");
						windowOpenSpy.mockRestore();
					});
				});

				describe("when card is focused and enter is pressed", () => {
					it("should not open collabora url in new tab", async () => {
						const { wrapper, fileRecordResponse } = setup({
							isCollaboraEnabled: true,
							mimeType: "application/pdf",
							isCollaboraEditable: false,
						});

						const card = wrapper.findComponent(VCard);

						const windowOpenMock = vi.fn();
						const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(windowOpenMock);

						await card.trigger("keydown.enter");

						expect(windowOpenSpy).not.toHaveBeenCalledWith(`/collabora/${fileRecordResponse.id}`, "_blank");

						windowOpenSpy.mockRestore();
					});
				});
			});

			describe("when collabora feature is not enabled and mime typ is not collabora type", () => {
				it("should not add aria label to v-card", () => {
					const { wrapper } = setup({
						isCollaboraEnabled: false,
						mimeType: "application/pdf",
						isCollaboraEditable: false,
					});

					const card = wrapper.findComponent(VCard);

					expect(card.attributes("aria-label")).toBe(undefined);
				});

				describe("when card is clicked", () => {
					it("should not open collabora url in new tab", () => {
						const { wrapper, fileRecordResponse } = setup({
							isCollaboraEnabled: false,
							mimeType: "application/pdf",
							isCollaboraEditable: false,
						});
						const card = wrapper.findComponent(VCard);

						const windowOpenMock = vi.fn();
						const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(windowOpenMock);

						card.trigger("click");

						expect(windowOpenSpy).not.toHaveBeenCalledWith(`/collabora/${fileRecordResponse.id}`, "_blank");
						windowOpenSpy.mockRestore();
					});
				});

				describe("when card is focused and enter is pressed", () => {
					it("should not open collabora url in new tab", async () => {
						const { wrapper, fileRecordResponse } = setup({
							isCollaboraEnabled: false,
							mimeType: "application/pdf",
							isCollaboraEditable: false,
						});

						const card = wrapper.findComponent(VCard);

						const windowOpenMock = vi.fn();
						const windowOpenSpy = vi.spyOn(window, "open").mockImplementation(windowOpenMock);

						await card.trigger("keydown.enter");

						expect(windowOpenSpy).not.toHaveBeenCalledWith(`/collabora/${fileRecordResponse.id}`, "_blank");

						windowOpenSpy.mockRestore();
					});
				});
			});
		});
	});
});
