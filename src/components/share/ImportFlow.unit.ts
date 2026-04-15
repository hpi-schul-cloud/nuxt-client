import { CopyResultItem } from "../copy-result-modal/types/CopyResultItem";
import CopyResultModal from "@/components/copy-result-modal/CopyResultModal.vue";
import ImportFlow from "@/components/share/ImportFlow.vue";
import ImportModal from "@/components/share/ImportModal.vue";
import SelectDestinationModal from "@/components/share/SelectDestinationModal.vue";
import CopyModule from "@/store/copy";
import { COPY_MODULE_KEY } from "@/utils/inject";
import {
	apiResponseErrorFactory,
	axiosErrorFactory,
	expectNotification,
	mockedPiniaStoreTyping,
} from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import {
	BoardExternalReferenceType,
	CopyApiResponse,
	CopyApiResponseStatus,
	CopyApiResponseType,
	ShareTokenBodyParamsParentType,
	ShareTokenInfoResponseParentType,
} from "@api-server";
import { useLoadingStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";

describe("@components/share/ImportFlow", () => {
	let copyModuleMock: CopyModule;
	let copyResultResponse: CopyApiResponse | undefined = undefined;

	const token = "ACoolToken";
	const course = {
		id: "1234",
		title: "Mathe",
		shortTitle: "Ma",
		displayColor: "#54616e",
	};

	const setup = (props = {}) => {
		const wrapper = mount(ImportFlow, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
				},
			},
			props: {
				token,
				isActive: true,
				destinations: [{ id: course.id, name: course.title }],
				destinationType: BoardExternalReferenceType.COURSE,
				...props,
			},
		});

		const loadingStore = mockedPiniaStoreTyping(useLoadingStore);

		return { wrapper, loadingStore };
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia());

		copyModuleMock = createModuleMocks(CopyModule, {
			getIsResultModalOpen: false,
			getCopyResult: copyResultResponse,
		});
	});

	describe("token is provided", () => {
		it("should render with props", () => {
			const { wrapper } = setup();

			expect(wrapper.exists()).toBe(true);
		});

		it("should call validateShareToken", () => {
			setup();

			expect(copyModuleMock.validateShareToken).toHaveBeenCalledWith(token);
		});

		it("shouldn't call validateShareToken if isActive is false", () => {
			setup({ isActive: false, destinations: [] });

			expect(copyModuleMock.validateShareToken).not.toHaveBeenCalled();
		});

		describe("failure notifier", () => {
			it("is shown for invalid token", async () => {
				copyModuleMock.validateShareToken = () => Promise.reject(new Error());
				setup();
				await flushPromises();

				expectNotification("error");
			});

			it("is shown for insufficient permissions", async () => {
				copyModuleMock.validateShareToken = () =>
					Promise.reject(
						axiosErrorFactory.build({
							response: {
								data: apiResponseErrorFactory.build({
									message: "FORBIDDEN",
									code: 403,
								}),
							},
						})
					);
				setup();
				await flushPromises();

				expectNotification("error");
			});
		});

		describe("valid token", () => {
			const originalName = "Nihilismus";

			describe("when import is successfull with no failed items", () => {
				beforeEach(() => {
					copyModuleMock = createModuleMocks(CopyModule, {
						getIsResultModalOpen: false,
						getCopyResult: copyResultResponse,
						getCopyResultFailedItems: [],
					});
					copyModuleMock.validateShareToken = () =>
						Promise.resolve({
							token,
							parentType: ShareTokenInfoResponseParentType.ROOM,
							parentName: originalName,
						});
					const copyResults: CopyResultItem[] = [
						{
							elementId: "a123abc",
							title: "Great room",
							elements: [
								{
									title: "Lesson with GeoGebra",
									type: CopyApiResponseType.LESSON,
								},
							],
							type: CopyApiResponseType.ROOM,
							url: "http://abc.de",
						},
					];
					copyModuleMock.copyByShareToken = vi.fn().mockResolvedValue(copyResults);

					copyResultResponse = {
						type: CopyApiResponseType.ROOM,
						status: CopyApiResponseStatus.PARTIAL,
					};
				});

				it("should set loading state to false and emit success", async () => {
					const { wrapper, loadingStore } = setup();
					await nextTick();

					const newName = "new Name";
					const dialog = wrapper.findComponent(ImportModal);
					dialog.vm.$emit("import", newName);
					await flushPromises();

					expect(loadingStore.setLoadingState).toHaveBeenNthCalledWith(3, false);

					const successEvent = wrapper.emitted("success");
					expect(successEvent).toHaveLength(1);
					expect(successEvent?.[0]).toEqual([newName, undefined]);
					expect(copyModuleMock.reset).toHaveBeenCalled();
				});
			});

			describe("when parent is a lesson", () => {
				const setupWithValidator = async () => {
					copyModuleMock.validateShareToken = () =>
						Promise.resolve({
							token,
							parentType: ShareTokenInfoResponseParentType.LESSONS,
							parentName: originalName,
						});

					await flushPromises();

					return setup();
				};

				it("should open selectCourseModal", async () => {
					const { wrapper } = await setupWithValidator();

					const selectCourseModal = wrapper.findComponent({
						name: "SelectDestinationModal",
					});

					expect(selectCourseModal.props("isOpen")).toBe(true);
				});

				it("should open the importModal after selecting the course and closing the modal", async () => {
					const { wrapper } = await setupWithValidator();

					const selectCourseDialog = wrapper.findComponent(SelectDestinationModal);
					selectCourseDialog.vm.$emit("next");

					await nextTick();

					const importModal = wrapper.findComponent({ name: "import-modal" });
					expect(importModal.props("isOpen")).toBe(true);
				});

				it("should call copyByShareToken when import is started", async () => {
					const { wrapper } = await setupWithValidator();

					const selectCourseDialog = wrapper.findComponent(SelectDestinationModal);
					selectCourseDialog.vm.$emit("next", course.id);

					const importModalDialog = wrapper.findComponent(ImportModal);
					importModalDialog.vm.$emit("import", originalName);

					expect(copyModuleMock.copyByShareToken).toHaveBeenCalledWith({
						destinationId: course.id,
						token,
						type: ShareTokenBodyParamsParentType.LESSONS,
						newName: originalName,
					});
				});
			});

			describe("when parent is a task", () => {
				const setupWithValidator = async () => {
					copyModuleMock.validateShareToken = () =>
						Promise.resolve({
							token,
							parentType: ShareTokenInfoResponseParentType.TASKS,
							parentName: originalName,
						});
					await flushPromises();

					return setup();
				};

				it("should open selectCourseModal", async () => {
					const { wrapper } = await setupWithValidator();

					const selectCourseModal = wrapper.findComponent(SelectDestinationModal);
					expect(selectCourseModal.props("isOpen")).toBe(true);
				});

				it("should open the importModal after selecting the course and closing the modal", async () => {
					const { wrapper } = await setupWithValidator();

					const selectCourseDialog = wrapper.findComponent(SelectDestinationModal);
					selectCourseDialog.vm.$emit("next");

					await nextTick();

					const importModal = wrapper.findComponent(ImportModal);
					expect(importModal.props("isOpen")).toBe(true);
				});

				it("should call copyByShareToken when import is started", async () => {
					const { wrapper } = await setupWithValidator();

					const selectCourseDialog = wrapper.findComponent(SelectDestinationModal);
					selectCourseDialog.vm.$emit("next", course.id);

					const dialog = wrapper.findComponent(ImportModal);
					dialog.vm.$emit("import", originalName);

					expect(copyModuleMock.copyByShareToken).toHaveBeenCalledWith({
						destinationId: course.id,
						token,
						type: ShareTokenBodyParamsParentType.TASKS,
						newName: originalName,
					});
				});
			});

			describe("when parent is a course", () => {
				const setupWithValidator = async () => {
					copyModuleMock.validateShareToken = () =>
						Promise.resolve({
							token,
							parentType: ShareTokenInfoResponseParentType.COURSES,
							parentName: originalName,
						});
					await flushPromises();

					return setup();
				};

				it("should open importModal", async () => {
					const { wrapper } = await setupWithValidator();

					const importModal = wrapper.findComponent({ name: "import-modal" });
					expect(importModal.props("isOpen")).toBe(true);
				});

				it("should show original name in import modal", async () => {
					const { wrapper } = await setupWithValidator();

					const importModal = wrapper.findComponent({ name: "import-modal" });
					expect(importModal.props("parentName")).toBe(originalName);
				});

				it("should call copyByShareToken when import is started", async () => {
					const { wrapper } = await setupWithValidator();

					const dialog = wrapper.findComponent(ImportModal);
					dialog.vm.$emit("import", originalName);

					expect(copyModuleMock.copyByShareToken).toHaveBeenCalledWith({
						token,
						type: ShareTokenBodyParamsParentType.COURSES,
						newName: originalName,
					});
				});

				it("shows failure notifier for failed copy", async () => {
					copyModuleMock.copyByShareToken = () => Promise.reject(new Error());
					const { wrapper } = await setupWithValidator();

					const dialog = wrapper.findComponent(ImportModal);
					await dialog.vm.$emit("import");

					expectNotification("error");
				});

				describe("for partial or successful copy", () => {
					beforeEach(() => {
						const failedItems: CopyResultItem[] = [
							{
								title: "Thema",
								type: CopyApiResponseType.LESSON,
								elementId: "63edd9c310b658af36648a55",
								url: "abc.de",
								elements: [
									{
										type: CopyApiResponseType.LESSON_CONTENT_GROUP,
										title: "Etherpad",
									},
								],
							},
						];
						copyModuleMock = createModuleMocks(CopyModule, {
							getIsResultModalOpen: false,
							getCopyResult: copyResultResponse,
							getCopyResultFailedItems: failedItems,
						});
						copyModuleMock.validateShareToken = () =>
							Promise.resolve({
								token,
								parentType: ShareTokenInfoResponseParentType.COURSES,
								parentName: originalName,
							});
						const copyResults: CopyResultItem[] = [
							{
								elementId: "a123abc",
								title: "Great course",
								elements: [
									{
										title: "Lesson with GeoGebra",
										type: CopyApiResponseType.LESSON,
									},
								],
								type: CopyApiResponseType.COURSE,
								url: "http://abc.de",
							},
						];
						copyModuleMock.copyByShareToken = vi.fn().mockResolvedValue(copyResults);

						copyResultResponse = {
							type: CopyApiResponseType.COURSE,
							status: CopyApiResponseStatus.PARTIAL,
						};
					});

					it("opens copy result modal", async () => {
						const { wrapper } = await setupWithValidator();

						const dialog = wrapper.findComponent(ImportModal);
						dialog.vm.$emit("import");
						await flushPromises();

						expect(copyModuleMock.copyByShareToken).toHaveBeenCalled();
						expect(copyModuleMock.setResultModalOpen).toHaveBeenCalledWith(true);
					});

					it("emits success when modal is closed", async () => {
						const { wrapper } = await setupWithValidator();

						const dialog = wrapper.findComponent(ImportModal);
						dialog.vm.$emit("import");
						await flushPromises();

						expect(copyModuleMock.copyByShareToken).toHaveBeenCalled();
						expect(copyModuleMock.setResultModalOpen).toHaveBeenCalledWith(true);

						const copyResultModal = wrapper.findComponent(CopyResultModal);
						await copyResultModal.vm.$emit("copy-dialog-closed");

						expect(wrapper.emitted("success")).toHaveLength(1);
					});
				});
			});

			describe("when parent is a column board", () => {
				const setupWithValidator = async () => {
					copyModuleMock.validateShareToken = () =>
						Promise.resolve({
							token,
							parentType: ShareTokenInfoResponseParentType.COLUMN_BOARD,
							parentName: originalName,
						});
					await flushPromises();

					return setup();
				};

				it("should open selectCourseModal", async () => {
					const { wrapper } = await setupWithValidator();

					const selectCourseModal = wrapper.findComponent({
						name: "SelectDestinationModal",
					});

					expect(selectCourseModal.props("isOpen")).toBe(true);
				});

				it("should open the importModal after selecting the course and closing the modal", async () => {
					const { wrapper } = await setupWithValidator();

					const selectCourseDialog = wrapper.findComponent(SelectDestinationModal);
					selectCourseDialog.vm.$emit("next");

					await nextTick();

					const importModal = wrapper.findComponent(ImportModal);
					expect(importModal.props("isOpen")).toBe(true);
				});

				it("should call copyByShareToken when import is started", async () => {
					const { wrapper } = await setupWithValidator();

					const selectCourseDialog = wrapper.findComponent(SelectDestinationModal);
					selectCourseDialog.vm.$emit("next", course.id);

					const importModalDialog = wrapper.findComponent(ImportModal);
					importModalDialog.vm.$emit("import", originalName);

					expect(copyModuleMock.copyByShareToken).toHaveBeenCalledWith({
						destinationId: course.id,
						token,
						type: ShareTokenBodyParamsParentType.COLUMN_BOARD,
						newName: originalName,
					});
				});
			});

			describe("when parent is a room", () => {
				const setupWithValidator = async () => {
					copyModuleMock.validateShareToken = () =>
						Promise.resolve({
							token,
							parentType: ShareTokenInfoResponseParentType.ROOM,
							parentName: originalName,
						});

					await flushPromises();

					return setup();
				};

				it("should open importModal", async () => {
					const { wrapper } = await setupWithValidator();

					const importModal = wrapper.findComponent({ name: "import-modal" });
					expect(importModal.props("isOpen")).toBe(true);
				});

				it("should show original name in import modal", async () => {
					const { wrapper } = await setupWithValidator();

					const importModal = wrapper.findComponent({ name: "import-modal" });
					expect(importModal.props("parentName")).toBe(originalName);
				});

				it("should call copyByShareToken when import is started", async () => {
					const { wrapper } = await setupWithValidator();

					const dialog = wrapper.findComponent(ImportModal);
					dialog.vm.$emit("import", originalName);

					expect(copyModuleMock.copyByShareToken).toHaveBeenCalledWith({
						token,
						type: ShareTokenBodyParamsParentType.ROOM,
						newName: originalName,
					});
				});

				it("shows failure notifier for failed copy", async () => {
					copyModuleMock.copyByShareToken = () => Promise.reject(new Error());
					const { wrapper } = await setupWithValidator();

					const dialog = wrapper.findComponent(ImportModal);
					await dialog.vm.$emit("import");

					expectNotification("error");
				});

				describe("for partial or successful copy", () => {
					beforeEach(() => {
						const failedItems: CopyResultItem[] = [
							{
								title: "Thema",
								type: CopyApiResponseType.LESSON,
								elementId: "63edd9c310b658af36648a55",
								url: "abc.de",
								elements: [
									{
										type: CopyApiResponseType.LESSON_CONTENT_GROUP,
										title: "Etherpad",
									},
								],
							},
						];
						copyModuleMock = createModuleMocks(CopyModule, {
							getIsResultModalOpen: false,
							getCopyResult: copyResultResponse,
							getCopyResultFailedItems: failedItems,
						});
						copyModuleMock.validateShareToken = () =>
							Promise.resolve({
								token,
								parentType: ShareTokenInfoResponseParentType.ROOM,
								parentName: originalName,
							});
						const copyResults: CopyResultItem[] = [
							{
								elementId: "a123abc",
								title: "Great room",
								elements: [
									{
										title: "Lesson with GeoGebra",
										type: CopyApiResponseType.LESSON,
									},
								],
								type: CopyApiResponseType.ROOM,
								url: "http://abc.de",
							},
						];
						copyModuleMock.copyByShareToken = vi.fn().mockResolvedValue(copyResults);

						copyResultResponse = {
							type: CopyApiResponseType.ROOM,
							status: CopyApiResponseStatus.PARTIAL,
						};
					});

					it("opens copy result modal", async () => {
						const { wrapper } = await setupWithValidator();

						const dialog = wrapper.findComponent(ImportModal);
						dialog.vm.$emit("import");
						await flushPromises();

						expect(copyModuleMock.copyByShareToken).toHaveBeenCalled();
						expect(copyModuleMock.setResultModalOpen).toHaveBeenCalledWith(true);
					});

					it("emits success when modal is closed", async () => {
						const { wrapper } = await setupWithValidator();

						const dialog = wrapper.findComponent(ImportModal);
						dialog.vm.$emit("import");
						await flushPromises();

						expect(copyModuleMock.copyByShareToken).toHaveBeenCalled();
						expect(copyModuleMock.setResultModalOpen).toHaveBeenCalledWith(true);

						const copyResultModal = wrapper.findComponent(CopyResultModal);
						await copyResultModal.vm.$emit("copy-dialog-closed");

						expect(wrapper.emitted("success")).toHaveLength(1);
					});
				});
			});
		});
	});
});
