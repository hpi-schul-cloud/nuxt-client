import { FileRecordScanStatus } from "@/fileStorageApi/v3";
import NotifierModule from "@/store/notifier";
import { I18N_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { setupDeleteBoardNodeConfirmationMock } from "@@/tests/test-utils/composable-mocks/deleteBoardNodeConfirmationMock";
import { setupFileStorageApiMock } from "@@/tests/test-utils/composable-mocks/fileStorageApiMock";
import { setupSelectedFileMock } from "@@/tests/test-utils/composable-mocks/selectedFileMock";
import { fileElementResponseFactory } from "@@/tests/test-utils/factory/fileElementResponseFactory";
import { fileRecordResponseFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { MountOptions, shallowMount } from "@vue/test-utils";
import Vue from "vue";
import { AnyContentElement } from "../types/ContentElement";
import FileContentElement from "./FileContentElement.vue";
import FileContentElementAlert from "./FileContentElementAlert.vue";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";
jest.mock("../shared/InlineEditInteractionHandler.composable");
jest.mock("../shared/DeleteBoardNodeConfirmation.composable");
jest.mock("../shared/FileStorageApi.composable");
jest.mock("../shared/SelectedFile.composable");

describe("FileContentElement", () => {
	const notifierModule = createModuleMocks(NotifierModule);
	const getWrapper = (props: {
		element: AnyContentElement;
		isEditMode: boolean;
	}) => {
		const deleteElementMock = jest.fn();

		const wrapper = shallowMount(FileContentElement as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				[I18N_KEY as symbol]: { t: (key: string) => key },
				[NOTIFIER_MODULE_KEY as symbol]: notifierModule,
			},
			propsData: { ...props, deleteElement: deleteElementMock },
		});

		return { wrapper, deleteElementMock };
	};

	describe("when file needs to be uploaded", () => {
		describe("when upload is successful", () => {
			const setup = (isEditMode: boolean) => {
				const element = fileElementResponseFactory.build();
				document.body.setAttribute("data-app", "true");

				const fileRecordResponse = fileRecordResponseFactory.build();
				const file = new File([], "test");
				const getSelectedFileMock = jest.fn().mockReturnValueOnce(file);
				const { setSelectedFile } = setupSelectedFileMock({
					getSelectedFileMock,
				});

				const uploadMock = jest.fn().mockImplementationOnce(() => {
					fileRecord.value = fileRecordResponse;
				});
				const { upload, fileRecord } = setupFileStorageApiMock({ uploadMock });

				const askDeleteBoardNodeConfirmationMock = jest.fn();
				setupDeleteBoardNodeConfirmationMock({
					askDeleteBoardNodeConfirmationMock,
				});

				const { wrapper, deleteElementMock } = getWrapper({
					element,
					isEditMode,
				});

				return {
					wrapper,
					upload,
					fileRecord,
					setSelectedFile,
					file,
					deleteElementMock,
				};
			};

			describe("when component is not in edit mode", () => {
				it("should be found in dom", () => {
					const { wrapper } = setup(false);

					const fileContentElement = wrapper.findComponent(FileContentElement);
					expect(fileContentElement.exists()).toBe(true);
				});

				it("should render FileContentElementDisplay component", async () => {
					const { wrapper } = setup(false);

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					const fileContentElementDisplay = wrapper.findComponent(
						FileContentElementDisplay
					);
					expect(fileContentElementDisplay.exists()).toBe(true);
				});

				it("should call upload", async () => {
					const { wrapper, upload, file } = setup(false);

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					expect(upload).toHaveBeenCalledTimes(1);
					expect(upload).toHaveBeenCalledWith(file);
				});

				it("should set selected file to undefined", async () => {
					const { wrapper, setSelectedFile } = setup(false);

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					expect(setSelectedFile).toHaveBeenCalledTimes(1);
					expect(setSelectedFile).toHaveBeenCalledWith();
				});
			});

			describe("when component is in edit mode", () => {
				it("should be found in dom", () => {
					const { wrapper } = setup(true);
					expect(wrapper.findComponent(FileContentElement).exists()).toBe(true);
				});

				it("should render FileContentElementEdit component", async () => {
					const { wrapper } = setup(true);

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					const fileContentElementEdit = wrapper.findComponent(
						FileContentElementEdit
					);
					expect(fileContentElementEdit.exists()).toBe(true);
				});
			});
		});

		describe("when upload throws error", () => {
			const setup = (isEditMode: boolean) => {
				const element = fileElementResponseFactory.build();
				document.body.setAttribute("data-app", "true");

				const file = new File([], "test");
				const getSelectedFileMock = jest.fn().mockReturnValueOnce(file);
				const { setSelectedFile } = setupSelectedFileMock({
					getSelectedFileMock,
				});

				const error = new Error("test");
				const uploadMock = jest.fn().mockRejectedValueOnce(error);
				setupFileStorageApiMock({ uploadMock });

				const askDeleteBoardNodeConfirmationMock = jest.fn();
				setupDeleteBoardNodeConfirmationMock({
					askDeleteBoardNodeConfirmationMock,
				});

				const { wrapper, deleteElementMock } = getWrapper({
					element,
					isEditMode,
				});

				return {
					wrapper,
					setSelectedFile,
					deleteElementMock,
				};
			};

			it("should call deleteElement", async () => {
				const { wrapper, deleteElementMock } = setup(false);

				await wrapper.vm.$nextTick();
				await wrapper.vm.$nextTick();

				expect(deleteElementMock).toHaveBeenCalledTimes(1);
			});

			it("should call setSelectedFile", async () => {
				const { wrapper, setSelectedFile } = setup(false);

				await wrapper.vm.$nextTick();
				await wrapper.vm.$nextTick();

				expect(setSelectedFile).toHaveBeenCalledTimes(1);
				expect(setSelectedFile).toHaveBeenCalledWith();
			});
		});
	});

	describe("when file upload is not finished onMount", () => {
		const setup = () => {
			const element = fileElementResponseFactory.build();
			document.body.setAttribute("data-app", "true");

			setupFileStorageApiMock();
			setupSelectedFileMock();

			const { wrapper } = getWrapper({
				element,
				isEditMode: true,
			});

			return { wrapper };
		};

		it("should render v-progress-linear component", async () => {
			const { wrapper } = setup();

			const progressLinear = wrapper.find("v-progress-linear-stub");
			expect(progressLinear.exists()).toBe(true);
		});
	});

	describe("when file is uploaded", () => {
		const setup = (
			isEditMode: boolean,
			securityCheckStatus: FileRecordScanStatus = FileRecordScanStatus.PENDING
		) => {
			const element = fileElementResponseFactory.build();
			document.body.setAttribute("data-app", "true");

			const fileRecordResponse = fileRecordResponseFactory.build({
				securityCheckStatus,
			});
			const fetchFileMock = jest.fn().mockImplementationOnce(() => {
				fileRecord.value = fileRecordResponse;
			});
			const { fetchFile, fileRecord } = setupFileStorageApiMock({
				fetchFileMock,
			});
			setupSelectedFileMock();

			const askDeleteBoardNodeConfirmationMock = jest
				.fn()
				.mockReturnValueOnce(true);
			setupDeleteBoardNodeConfirmationMock({
				askDeleteBoardNodeConfirmationMock,
			});

			const { wrapper, deleteElementMock } = getWrapper({
				element,
				isEditMode,
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
			describe("when component is not in edit mode", () => {
				it("should be found in dom", () => {
					const { wrapper } = setup(false);

					const fileContentElement = wrapper.findComponent(FileContentElement);
					expect(fileContentElement.exists()).toBe(true);
				});

				it("should render FileContentElementDisplay component", async () => {
					const { wrapper } = setup(false);

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					const fileContentElementDisplay = wrapper.findComponent(
						FileContentElementDisplay
					);
					expect(fileContentElementDisplay.exists()).toBe(true);
				});

				it("should call fetchFile", async () => {
					const { wrapper, fetchFile } = setup(false);

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					expect(fetchFile).toHaveBeenCalledTimes(1);
				});
			});

			describe("when component is in edit mode", () => {
				it("should be found in dom", () => {
					const { wrapper } = setup(true);
					expect(wrapper.findComponent(FileContentElement).exists()).toBe(true);
				});

				it("should render FileContentElementEdit component", async () => {
					const { wrapper } = setup(true);

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					const fileContentElementEdit = wrapper.findComponent(
						FileContentElementEdit
					);
					expect(fileContentElementEdit.exists()).toBe(true);
				});

				it("should call deleteElement function when it receives delete:element event from child", async () => {
					const { wrapper, element, deleteElementMock } = setup(true);

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					const fileContentElementEdit = wrapper.findComponent(
						FileContentElementEdit
					);
					fileContentElementEdit.vm.$emit("delete:element");

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					expect(deleteElementMock).toHaveBeenCalledTimes(1);
					expect(deleteElementMock).toHaveBeenCalledWith(element.id);

					expect(fileContentElementEdit.exists()).toBe(true);
				});
			});
		});

		describe("when a virus is detected", () => {
			describe("when component is not in edit mode", () => {
				it("should hand over correct file name to FileContentElementDisplay", async () => {
					const { wrapper, fileRecordResponse } = setup(
						false,
						FileRecordScanStatus.BLOCKED
					);

					await wrapper.vm.$nextTick();

					const fileName = wrapper
						.findComponent(FileContentElementDisplay)
						.props("fileName");

					expect(fileName).toBe(fileRecordResponse.name);
				});

				it("should hand over empty url to FileContentElementDisplay", async () => {
					const { wrapper } = setup(false, FileRecordScanStatus.BLOCKED);

					await wrapper.vm.$nextTick();

					const url = wrapper
						.findComponent(FileContentElementDisplay)
						.props("url");

					expect(url).toBe("");
				});

				it("should render FileContentElementAlert component", async () => {
					const { wrapper } = setup(false, FileRecordScanStatus.BLOCKED);

					await wrapper.vm.$nextTick();

					const fileContentElementAlert = wrapper.findComponent(
						FileContentElementAlert
					);
					expect(fileContentElementAlert.exists()).toBe(true);
				});
			});

			describe("when component is in edit mode", () => {
				it("should hand over correct file name to FileContentElementEdit", async () => {
					const { wrapper, fileRecordResponse } = setup(
						true,
						FileRecordScanStatus.BLOCKED
					);

					await wrapper.vm.$nextTick();

					const fileName = wrapper
						.findComponent(FileContentElementEdit)
						.props("fileName");

					expect(fileName).toBe(fileRecordResponse.name);
				});

				it("should hand over empty url to FileContentElementEdit", async () => {
					const { wrapper } = setup(true, FileRecordScanStatus.BLOCKED);

					await wrapper.vm.$nextTick();

					const url = wrapper
						.findComponent(FileContentElementEdit)
						.props("url");

					expect(url).toBe("");
				});

				it("should render FileContentElementAlert component", async () => {
					const { wrapper } = setup(true, FileRecordScanStatus.BLOCKED);

					await wrapper.vm.$nextTick();

					const fileContentElementAlert = wrapper.findComponent(
						FileContentElementAlert
					);
					expect(fileContentElementAlert.exists()).toBe(true);
				});

				it("should call deleteElement function when it receives delete:element event from child", async () => {
					const { wrapper, element, deleteElementMock } = setup(true);

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					const fileContentElementEdit = wrapper.findComponent(
						FileContentElementEdit
					);
					fileContentElementEdit.vm.$emit("delete:element");

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					expect(deleteElementMock).toHaveBeenCalledTimes(1);
					expect(deleteElementMock).toHaveBeenCalledWith(element.id);

					expect(fileContentElementEdit.exists()).toBe(true);
				});
			});
		});
	});
});
