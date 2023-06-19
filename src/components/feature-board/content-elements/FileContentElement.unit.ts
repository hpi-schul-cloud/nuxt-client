import { I18N_KEY } from "@/utils/inject";
import Vue from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount } from "@vue/test-utils";
import { AnyContentElement } from "../types/ContentElement";
import { setupFileStorageApiMock } from "@@/tests/test-utils/composable-mocks/fileStorageApiMock";
import { fileElementResponse } from "@@/tests/test-utils/factory/fileElementResponseFactory";
import { fileRecordResponseFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { FileRecordScanStatus } from "@/fileStorageApi/v3";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { setupFileStorageApiMock } from "@@/tests/test-utils/composable-mocks/fileStorageApiMock";
import { setupSelectedFileMock } from "@@/tests/test-utils/composable-mocks/selectedFileMock";
import { fileElementResponse } from "@@/tests/test-utils/factory/fileElementResponseFactory";
import { fileRecordResponseFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { shallowMount } from "@vue/test-utils";
import { AnyContentElement } from "../types/ContentElement";
import FileContentElement from "./FileContentElement.vue";
import FileContentElementAlert from "./FileContentElementAlert.vue";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";
jest.mock("../shared/FileStorageApi.composable");
jest.mock("../shared/SelectedFile.composable");

describe("FileContentElement", () => {
	const i18n = {
		[I18N_KEY as symbol]: { t: (key: string) => key },
	};
	const getWrapper = (props: {
		element: AnyContentElement;
		isEditMode: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(FileContentElement as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: { ...i18n },
			propsData: props,
		});

		return { wrapper };
	};

	describe("when file needs to be uploaded", () => {
		const setup = (isEditMode: boolean) => {
			const element = fileElementResponse.build();
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

			const { wrapper } = getWrapper({ element, isEditMode });

			return { wrapper, upload, fileRecord, setSelectedFile, file };
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

	describe("when file upload is not finished onMount", () => {
		const setup = () => {
			const element = fileElementResponse.build();
			document.body.setAttribute("data-app", "true");

			setupFileStorageApiMock();
			setupSelectedFileMock();

			const { wrapper } = getWrapper({ element, isEditMode: true });

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
			const element = fileElementResponse.build();
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

			const { wrapper } = getWrapper({ element, isEditMode });

			return { wrapper, fetchFile, fileRecordResponse };
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
			});
		});
	});
});
