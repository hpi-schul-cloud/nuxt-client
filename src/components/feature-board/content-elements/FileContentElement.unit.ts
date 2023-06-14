import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import { AnyContentElement } from "../types/ContentElement";
import { setupFileStorageApiMock } from "@@/tests/test-utils/composable-mocks/fileStorageApiMock";
import { fileRecordResponseFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { fileElementResponse } from "@@/tests/test-utils/factory/fileElementResponseFactory";
import FileContentElementAlert from "./FileContentElementAlert.vue";
import FileContentElementDisplay from "./FileContentElementDisplay.vue";
import FileContentElementEdit from "./FileContentElementEdit.vue";
import FileContentElement from "./FileContentElement.vue";
import { FileRecordScanStatus } from "@/fileStorageApi/v3";
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

	describe("when file is already uploaded", () => {
		describe("when file is already loaded in state", () => {
			const setup = (isEditMode: boolean) => {
				const element = fileElementResponse.build();

				const fileRecordResponse = fileRecordResponseFactory.build();
				const getFileMock = jest.fn().mockReturnValueOnce(fileRecordResponse);
				const fetchFileRecursivelyMock = jest
					.fn()
					.mockReturnValueOnce(fileRecordResponse);
				setupFileStorageApiMock({ getFileMock, fetchFileRecursivelyMock });

				const { wrapper } = getWrapper({ element, isEditMode });

				return { wrapper };
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

					const fileContentElementDisplay = wrapper.findComponent(
						FileContentElementDisplay
					);
					expect(fileContentElementDisplay.exists()).toBe(true);
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

					const fileContentElementEdit = wrapper.findComponent(
						FileContentElementEdit
					);
					expect(fileContentElementEdit.exists()).toBe(true);
				});
			});
		});

		describe("when file needs to be loaded", () => {
			const setup = (isEditMode: boolean) => {
				const element = fileElementResponse.build();

				const fileRecordResponse = fileRecordResponseFactory.build();
				const getFileMock = jest.fn().mockReturnValueOnce(undefined);
				const fetchFileRecursivelyMock = jest
					.fn()
					.mockImplementationOnce((fileRecordModel) => {
						fileRecordModel.value = fileRecordResponse;
					});

				setupFileStorageApiMock({
					getFileMock,
					fetchFileRecursivelyMock,
				});

				const { wrapper } = getWrapper({ element, isEditMode });

				return { wrapper, getFileMock, fetchFileRecursivelyMock };
			};

			describe("when component is not in edit mode", () => {
				it("should be found in dom", () => {
					const { wrapper } = setup(false);

					const fileContentElement = wrapper.findComponent(FileContentElement);
					expect(fileContentElement.exists()).toBe(true);
				});

				it("should render FileContentElementDisplay component", async () => {
					const { wrapper, getFileMock, fetchFileRecursivelyMock } =
						setup(false);

					await wrapper.vm.$nextTick();
					await wrapper.vm.$nextTick();

					console.log(wrapper.overview());

					const fileContentElementDisplay = wrapper.findComponent(
						FileContentElementDisplay
					);
					expect(getFileMock).toHaveBeenCalledTimes(1);
					expect(fetchFileRecursivelyMock).toHaveBeenCalledTimes(1);

					expect(fileContentElementDisplay.exists()).toBe(true);
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

	describe("when file is not upload onMount", () => {
		const setup = () => {
			const element = fileElementResponse.build();

			setupFileStorageApiMock({});

			const { wrapper } = getWrapper({ element, isEditMode: true });

			return { wrapper };
		};

		it("should render v-progress-linear component", async () => {
			const { wrapper } = setup();

			const progressLinear = wrapper.find("v-progress-linear-stub");
			expect(progressLinear.exists()).toBe(true);
		});
	});

	describe("when file finished uploading and newFileForParent becomes defined", () => {
		describe("when newFileForParent equals element id", () => {
			const setup = () => {
				const element = fileElementResponse.build();

				const fileRecordResponse = fileRecordResponseFactory.build();
				const getFileMock = jest
					.fn()
					.mockReturnValueOnce(undefined)
					.mockReturnValueOnce(fileRecordResponse);
				const fetchFileRecursivelyMock = jest
					.fn()
					.mockReturnValueOnce(undefined);
				const { newFileForParent } = setupFileStorageApiMock({
					getFileMock,
					fetchFileRecursivelyMock,
				});

				const { wrapper } = getWrapper({ element, isEditMode: true });

				return {
					wrapper,
					newFileForParent,
					element,
					getFileMock,
					fetchFileRecursivelyMock,
				};
			};

			it("should render FileContentElementEdit component", async () => {
				const {
					wrapper,
					newFileForParent,
					element,
					getFileMock,
					fetchFileRecursivelyMock,
				} = setup();

				await wrapper.vm.$nextTick();

				newFileForParent.value = element.id;

				await wrapper.vm.$nextTick();

				expect(getFileMock).toHaveBeenCalledTimes(2);
				expect(fetchFileRecursivelyMock).toHaveBeenCalledTimes(1);
				const fileContentElementEdit = wrapper.findComponent(
					FileContentElementEdit
				);
				expect(fileContentElementEdit.exists()).toBe(true);
			});
		});

		describe("when newFileForParent not equals element id", () => {
			const setup = () => {
				const element = fileElementResponse.build();

				const fileRecordResponse = fileRecordResponseFactory.build();
				const getFileMock = jest
					.fn()
					.mockReturnValueOnce(undefined)
					.mockReturnValueOnce(fileRecordResponse);
				const fetchFileRecursivelyMock = jest
					.fn()
					.mockReturnValueOnce(undefined);
				const { newFileForParent } = setupFileStorageApiMock({
					getFileMock,
					fetchFileRecursivelyMock,
				});

				const { wrapper } = getWrapper({ element, isEditMode: true });

				return {
					wrapper,
					newFileForParent,
					getFileMock,
					fetchFileRecursivelyMock,
				};
			};

			it("should render v-progress-linear component", async () => {
				const {
					wrapper,
					newFileForParent,
					getFileMock,
					fetchFileRecursivelyMock,
				} = setup();

				await wrapper.vm.$nextTick();

				newFileForParent.value = "id";

				await wrapper.vm.$nextTick();

				expect(getFileMock).toHaveBeenCalledTimes(1);
				expect(fetchFileRecursivelyMock).toHaveBeenCalledTimes(1);
				const progressLinear = wrapper.find("v-progress-linear-stub");
				expect(progressLinear.exists()).toBe(true);
			});
		});
	});

	describe("when a virus is detected", () => {
		const setup = (isEditMode: boolean) => {
			const element = fileElementResponse.build();

			const fileRecordResponse = fileRecordResponseFactory.build({
				securityCheckStatus: FileRecordScanStatus.BLOCKED,
			});
			const getFileMock = jest.fn().mockReturnValueOnce(fileRecordResponse);
			const fetchFileRecursivelyMock = jest
				.fn()
				.mockReturnValueOnce(fileRecordResponse);
			setupFileStorageApiMock({ getFileMock, fetchFileRecursivelyMock });

			const { wrapper } = getWrapper({ element, isEditMode });

			return { wrapper };
		};

		describe("when component is not in edit mode", () => {
			it("should render FileContentElementAlert component", async () => {
				const { wrapper } = setup(false);

				await wrapper.vm.$nextTick();

				const fileContentElementAlert = wrapper.findComponent(
					FileContentElementAlert
				);
				expect(fileContentElementAlert.exists()).toBe(true);
			});
		});

		describe("when component is in edit mode", () => {
			it("should render FileContentElementAlert component", async () => {
				const { wrapper } = setup(true);

				await wrapper.vm.$nextTick();

				const fileContentElementAlert = wrapper.findComponent(
					FileContentElementAlert
				);
				expect(fileContentElementAlert.exists()).toBe(true);
			});
		});
	});
});
