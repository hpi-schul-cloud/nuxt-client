import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import { AnyContentElement } from "../types/ContentElement";
import { setupFileStorageApiMock } from "@@/tests/test-utils/composable-mocks/fileStorageApiMock";
import { fileRecordResponseFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { fileElementResponse } from "@@/tests/test-utils/factory/fileElementResponseFactory";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";
import FileContentElement from "./FileContentElement.vue";
import { setupSelectedFileMock } from "@@/tests/test-utils/composable-mocks/selectedFileMock";
jest.mock("../shared/FileStorageApi.composable");
jest.mock("../shared/SelectedFile.composable");

describe("FileContentElement", () => {
	const getWrapper = (props: {
		element: AnyContentElement;
		isEditMode: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(FileContentElement, {
			...createComponentMocks({ i18n: true }),
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

			const uploadMock = jest.fn().mockResolvedValueOnce(fileRecordResponse);
			const getSelectedFileMock = jest.fn().mockReturnValueOnce(file);

			const { upload } = setupFileStorageApiMock({ uploadMock });
			const { setSelectedFile } = setupSelectedFileMock({
				getSelectedFileMock,
			});

			const { wrapper } = getWrapper({ element, isEditMode });

			return { wrapper, upload, setSelectedFile, file };
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

			setupFileStorageApiMock({});
			setupSelectedFileMock({});

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
		const setup = (isEditMode: boolean) => {
			const element = fileElementResponse.build();
			document.body.setAttribute("data-app", "true");

			const fileRecordResponse = fileRecordResponseFactory.build();
			const fetchFilesMock = jest
				.fn()
				.mockReturnValueOnce([fileRecordResponse]);
			const { fetchFiles } = setupFileStorageApiMock({
				fetchFilesMock,
			});
			setupSelectedFileMock({});

			const { wrapper } = getWrapper({ element, isEditMode });

			return { wrapper, fetchFiles };
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

				const fileContentElementDisplay = wrapper.findComponent(
					FileContentElementDisplay
				);
				expect(fileContentElementDisplay.exists()).toBe(true);
			});

			it("should call fetchFiles", async () => {
				const { wrapper, fetchFiles } = setup(false);

				await wrapper.vm.$nextTick();
				await wrapper.vm.$nextTick();

				expect(fetchFiles).toHaveBeenCalledTimes(1);
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
});
