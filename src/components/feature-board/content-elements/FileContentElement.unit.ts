import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import { AnyContentElement } from "../types/ContentElement";
import { setupFileStorageApiMock } from "@@/tests/test-utils/composable-mocks/fileStorageApiMock";
import { fileRecordResponseFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { fileElementResponse } from "@@/tests/test-utils/factory/fileElementResponseFactory";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";
import FileContentElement from "./FileContentElement.vue";
jest.mock("../shared/FileStorageApi.composable");

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

	describe("when file is available", () => {
		describe("when component is not in edit mode", () => {
			const setup = () => {
				const element = fileElementResponse.build();
				document.body.setAttribute("data-app", "true");

				const fileRecordResponse = fileRecordResponseFactory.build();
				const getFileMock = jest.fn().mockReturnValueOnce(fileRecordResponse);
				setupFileStorageApiMock({ getFileMock });

				const { wrapper } = getWrapper({ element, isEditMode: false });

				return { wrapper };
			};

			it("should be found in dom", () => {
				const { wrapper } = setup();

				const fileContentElement = wrapper.findComponent(FileContentElement);
				expect(fileContentElement.exists()).toBe(true);
			});

			it("should render FileContentElementDisplay component", async () => {
				const { wrapper } = setup();

				await wrapper.vm.$nextTick();

				const fileContentElementDisplay = wrapper.findComponent(
					FileContentElementDisplay
				);
				expect(fileContentElementDisplay.exists()).toBe(true);
			});
		});

		describe("when component is in edit mode", () => {
			const setup = () => {
				const element = fileElementResponse.build();
				document.body.setAttribute("data-app", "true");

				const fileRecordResponse = fileRecordResponseFactory.build();
				const getFileMock = jest.fn().mockReturnValueOnce(fileRecordResponse);
				setupFileStorageApiMock({ getFileMock });

				const { wrapper } = getWrapper({ element, isEditMode: true });

				return { wrapper };
			};

			it("should be found in dom", () => {
				const { wrapper } = setup();
				expect(wrapper.findComponent(FileContentElement).exists()).toBe(true);
			});

			it("should render FileContentElementEdit component", async () => {
				const { wrapper } = setup();

				await wrapper.vm.$nextTick();

				const fileContentElementEdit = wrapper.findComponent(
					FileContentElementEdit
				);
				expect(fileContentElementEdit.exists()).toBe(true);
			});
		});
	});

	describe("when file is not available", () => {
		const setup = () => {
			const element = fileElementResponse.build();
			document.body.setAttribute("data-app", "true");

			setupFileStorageApiMock({});

			const { wrapper } = getWrapper({ element, isEditMode: true });

			return { wrapper };
		};

		it("should render v-progress-linear component", async () => {
			const { wrapper } = setup();
			console.log(wrapper.html());

			const progressLinear = wrapper.find("v-progress-linear-stub");
			expect(progressLinear.exists()).toBe(true);
		});
	});

	describe("when newFileForParent becomes defined", () => {
		describe("when newFileForParent equals element id", () => {
			const setup = () => {
				const element = fileElementResponse.build();
				document.body.setAttribute("data-app", "true");

				const fileRecordResponse = fileRecordResponseFactory.build();
				const getFileMock = jest
					.fn()
					.mockReturnValueOnce(undefined)
					.mockReturnValueOnce(undefined)
					.mockReturnValueOnce(fileRecordResponse);
				const { newFileForParent } = setupFileStorageApiMock({ getFileMock });

				const { wrapper } = getWrapper({ element, isEditMode: true });

				return { wrapper, newFileForParent, element, getFileMock };
			};

			it("should render FileContentElementEdit component", async () => {
				const { wrapper, newFileForParent, element, getFileMock } = setup();

				await wrapper.vm.$nextTick();

				newFileForParent.value = element.id;

				await wrapper.vm.$nextTick();

				expect(getFileMock).toHaveBeenCalledTimes(3);
				const fileContentElementEdit = wrapper.findComponent(
					FileContentElementEdit
				);
				expect(fileContentElementEdit.exists()).toBe(true);
			});
		});

		describe("when newFileForParent not equals element id", () => {
			const setup = () => {
				const element = fileElementResponse.build();
				document.body.setAttribute("data-app", "true");

				const fileRecordResponse = fileRecordResponseFactory.build();
				const getFileMock = jest
					.fn()
					.mockReturnValueOnce(undefined)
					.mockReturnValueOnce(undefined)
					.mockReturnValueOnce(fileRecordResponse);
				const { newFileForParent } = setupFileStorageApiMock({ getFileMock });

				const { wrapper } = getWrapper({ element, isEditMode: true });

				return { wrapper, newFileForParent, getFileMock };
			};

			it("should render v-progress-linear component", async () => {
				const { wrapper, newFileForParent, getFileMock } = setup();

				await wrapper.vm.$nextTick();

				newFileForParent.value = "id";

				await wrapper.vm.$nextTick();

				expect(getFileMock).toHaveBeenCalledTimes(2);
				const progressLinear = wrapper.find("v-progress-linear-stub");
				expect(progressLinear.exists()).toBe(true);
			});
		});
	});
});
