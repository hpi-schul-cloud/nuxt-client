import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import ImportFlow from "@/components/share/ImportFlow.vue";
import ImportModal from "@/components/share/ImportModal.vue";
import SelectDestinationModal from "@/components/share/SelectDestinationModal.vue";
import {
	BoardExternalReferenceType,
	CopyApiResponse,
	CopyApiResponseStatusEnum,
	CopyApiResponseTypeEnum,
	ShareTokenBodyParamsParentTypeEnum,
	ShareTokenInfoResponseParentTypeEnum,
} from "@/serverApi/v3";
import { courseRoomListModule } from "@/store";
import CopyModule from "@/store/copy";
import CourseRoomListModule from "@/store/course-room-list";
import EnvConfigModule from "@/store/env-config";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import {
	COPY_MODULE_KEY,
	LOADING_STATE_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import {
	apiResponseErrorFactory,
	axiosErrorFactory,
} from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { flushPromises, mount } from "@vue/test-utils";
import { nextTick } from "vue";
import vueDompurifyHTMLPlugin from "vue-dompurify-html";
import { CopyResultItem } from "../copy-result-modal/types/CopyResultItem";

describe("@components/share/ImportFlow", () => {
	let copyModuleMock: CopyModule;
	let loadingStateModuleMock: LoadingStateModule;
	let copyResultResponse: CopyApiResponse | undefined = undefined;
	const notifierModule = createModuleMocks(NotifierModule);

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
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					vueDompurifyHTMLPlugin,
				],
				provide: {
					[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
					[LOADING_STATE_MODULE_KEY]: loadingStateModuleMock,
					loadingStateModule: loadingStateModuleMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
			props: {
				token,
				isActive: true,
				destinations: [{ id: course.id, name: course.title }],
				destinationType: BoardExternalReferenceType.Course,
				...props,
			},
		});

		return { wrapper };
	};

	beforeEach(() => {
		copyModuleMock = createModuleMocks(CopyModule, {
			getIsResultModalOpen: false,
			getCopyResult: copyResultResponse,
		});
		loadingStateModuleMock = createModuleMocks(LoadingStateModule);
		setupStores({
			rooms: CourseRoomListModule,
			envConfigModule: EnvConfigModule,
		});
		vi.spyOn(courseRoomListModule, "fetchAllElements").mockImplementation(
			vi.fn()
		);
	});

	describe("token is provided", () => {
		it("should render with props", () => {
			const { wrapper } = setup();

			expect(wrapper).toBeTruthy();
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

				expect(notifierModule.show).toHaveBeenCalledWith(
					expect.objectContaining({
						text: "components.molecules.import.options.failure.invalidToken",
					})
				);
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

				expect(notifierModule.show).toHaveBeenCalledWith(
					expect.objectContaining({
						text: "components.molecules.import.options.failure.permissionError",
					})
				);
			});
		});

		describe("valid token", () => {
			const originalName = "Nihilismus";

			describe("when parent is a lesson", () => {
				const setupWithValidator = async () => {
					copyModuleMock.validateShareToken = () =>
						Promise.resolve({
							token,
							parentType: ShareTokenInfoResponseParentTypeEnum.Lessons,
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

					const select = wrapper.findComponent({ name: "v-select" });
					select.setValue(course);

					const selectCourseDialog = wrapper
						.findComponent(SelectDestinationModal)
						.findComponent(vCustomDialog);
					selectCourseDialog.vm.$emit("next");

					await nextTick();

					const importModal = wrapper.findComponent({ name: "import-modal" });
					expect(importModal.props("isOpen")).toBe(true);
				});

				it("should call copyByShareToken when import is started", async () => {
					const { wrapper } = await setupWithValidator();

					const select = wrapper.findComponent({ name: "v-select" });
					select.setValue(course);

					const selectCourseDialog = wrapper
						.findComponent(SelectDestinationModal)
						.findComponent(vCustomDialog);
					selectCourseDialog.vm.$emit("next");

					const importModalDialog = wrapper
						.findComponent(ImportModal)
						.findComponent(vCustomDialog);
					importModalDialog.vm.$emit("dialog-confirmed");

					expect(copyModuleMock.copyByShareToken).toHaveBeenCalledWith({
						destinationId: course.id,
						token,
						type: ShareTokenBodyParamsParentTypeEnum.Lessons,
						newName: originalName,
					});
				});
			});

			describe("when parent is a task", () => {
				const setupWithValidator = async () => {
					copyModuleMock.validateShareToken = () =>
						Promise.resolve({
							token,
							parentType: ShareTokenInfoResponseParentTypeEnum.Tasks,
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

					const select = wrapper.findComponent({ name: "v-select" });
					select.setValue(course);

					const selectCourseDialog = wrapper
						.findComponent(SelectDestinationModal)
						.findComponent(vCustomDialog);
					selectCourseDialog.vm.$emit("next");

					await nextTick();

					const importModal = wrapper.findComponent({ name: "import-modal" });
					expect(importModal.props("isOpen")).toBe(true);
				});

				it("should call copyByShareToken when import is started", async () => {
					const { wrapper } = await setupWithValidator();

					const select = wrapper.findComponent({ name: "v-select" });
					select.setValue(course);

					const selectCourseDialog = wrapper
						.findComponent(SelectDestinationModal)
						.findComponent(vCustomDialog);
					selectCourseDialog.vm.$emit("next");

					const importModalDialog = wrapper
						.findComponent(ImportModal)
						.findComponent(vCustomDialog);
					importModalDialog.vm.$emit("dialog-confirmed");

					expect(copyModuleMock.copyByShareToken).toHaveBeenCalledWith({
						destinationId: course.id,
						token,
						type: ShareTokenBodyParamsParentTypeEnum.Tasks,
						newName: originalName,
					});
				});
			});

			describe("when parent is a course", () => {
				const setupWithValidator = async () => {
					copyModuleMock.validateShareToken = () =>
						Promise.resolve({
							token,
							parentType: ShareTokenInfoResponseParentTypeEnum.Courses,
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

					const dialog = wrapper
						.findComponent(ImportModal)
						.findComponent(vCustomDialog);
					dialog.vm.$emit("dialog-confirmed");

					expect(copyModuleMock.copyByShareToken).toHaveBeenCalledWith({
						token,
						type: ShareTokenBodyParamsParentTypeEnum.Courses,
						newName: originalName,
					});
				});

				it("shows failure notifier for failed copy", async () => {
					copyModuleMock.copyByShareToken = () => Promise.reject(new Error());
					const { wrapper } = await setupWithValidator();

					const dialog = wrapper
						.findComponent(ImportModal)
						.findComponent(vCustomDialog);
					dialog.vm.$emit("dialog-confirmed");

					expect(notifierModule.show).toHaveBeenCalledWith(
						expect.objectContaining({ status: "error" })
					);
				});

				describe("for partial or successful copy", () => {
					beforeEach(() => {
						const failedItems: CopyResultItem[] = [
							{
								title: "Thema",
								type: CopyApiResponseTypeEnum.Lesson,
								elementId: "63edd9c310b658af36648a55",
								url: "abc.de",
								elements: [
									{
										type: CopyApiResponseTypeEnum.LessonContentGroup,
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
								parentType: ShareTokenInfoResponseParentTypeEnum.Courses,
								parentName: originalName,
							});
						const copyResults: CopyResultItem[] = [
							{
								elementId: "a123abc",
								title: "Great course",
								elements: [
									{
										title: "Lesson with GeoGebra",
										type: CopyApiResponseTypeEnum.Lesson,
									},
								],
								type: CopyApiResponseTypeEnum.Course,
								url: "http://abc.de",
							},
						];
						copyModuleMock.copyByShareToken = vi
							.fn()
							.mockResolvedValue(copyResults);

						copyResultResponse = {
							type: CopyApiResponseTypeEnum.Course,
							status: CopyApiResponseStatusEnum.Partial,
						};
					});

					it("opens copy result modal", async () => {
						const { wrapper } = await setupWithValidator();

						const dialog = wrapper
							.findComponent(ImportModal)
							.findComponent(vCustomDialog);
						dialog.vm.$emit("dialog-confirmed");
						await flushPromises();

						expect(copyModuleMock.copyByShareToken).toHaveBeenCalled();
						expect(copyModuleMock.setResultModalOpen).toHaveBeenCalledWith(
							true
						);
					});

					it("emits success when modal is closed", async () => {
						const { wrapper } = await setupWithValidator();

						const dialog = wrapper
							.findComponent(ImportModal)
							.findComponent(vCustomDialog);
						dialog.vm.$emit("dialog-confirmed");
						await flushPromises();

						expect(copyModuleMock.copyByShareToken).toHaveBeenCalled();
						expect(copyModuleMock.setResultModalOpen).toHaveBeenCalledWith(
							true
						);

						const copyResultModal = wrapper.findComponent({
							name: "copy-result-modal",
						});
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
							parentType: ShareTokenInfoResponseParentTypeEnum.ColumnBoard,
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

					const select = wrapper.findComponent({ name: "v-select" });
					select.setValue(course);

					const selectCourseDialog = wrapper
						.findComponent(SelectDestinationModal)
						.findComponent(vCustomDialog);
					selectCourseDialog.vm.$emit("next");

					await nextTick();

					const importModal = wrapper.findComponent({ name: "import-modal" });
					expect(importModal.props("isOpen")).toBe(true);
				});

				it("should call copyByShareToken when import is started", async () => {
					const { wrapper } = await setupWithValidator();

					const select = wrapper.findComponent({ name: "v-select" });
					select.setValue(course);

					const selectCourseDialog = wrapper
						.findComponent(SelectDestinationModal)
						.findComponent(vCustomDialog);
					selectCourseDialog.vm.$emit("next");

					const importModalDialog = wrapper
						.findComponent(ImportModal)
						.findComponent(vCustomDialog);
					importModalDialog.vm.$emit("dialog-confirmed");

					expect(copyModuleMock.copyByShareToken).toHaveBeenCalledWith({
						destinationId: course.id,
						token,
						type: ShareTokenBodyParamsParentTypeEnum.ColumnBoard,
						newName: originalName,
					});
				});
			});

			describe("when parent is a room", () => {
				const setupWithValidator = async () => {
					copyModuleMock.validateShareToken = () =>
						Promise.resolve({
							token,
							parentType: ShareTokenInfoResponseParentTypeEnum.Room,
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

					const dialog = wrapper
						.findComponent(ImportModal)
						.findComponent(vCustomDialog);
					dialog.vm.$emit("dialog-confirmed");

					expect(copyModuleMock.copyByShareToken).toHaveBeenCalledWith({
						token,
						type: ShareTokenBodyParamsParentTypeEnum.Room,
						newName: originalName,
					});
				});

				it("shows failure notifier for failed copy", async () => {
					copyModuleMock.copyByShareToken = () => Promise.reject(new Error());
					const { wrapper } = await setupWithValidator();

					const dialog = wrapper
						.findComponent(ImportModal)
						.findComponent(vCustomDialog);
					dialog.vm.$emit("dialog-confirmed");

					expect(notifierModule.show).toHaveBeenCalledWith(
						expect.objectContaining({ status: "error" })
					);
				});

				describe("for partial or successful copy", () => {
					beforeEach(() => {
						const failedItems: CopyResultItem[] = [
							{
								title: "Thema",
								type: CopyApiResponseTypeEnum.Lesson,
								elementId: "63edd9c310b658af36648a55",
								url: "abc.de",
								elements: [
									{
										type: CopyApiResponseTypeEnum.LessonContentGroup,
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
								parentType: ShareTokenInfoResponseParentTypeEnum.Room,
								parentName: originalName,
							});
						const copyResults: CopyResultItem[] = [
							{
								elementId: "a123abc",
								title: "Great room",
								elements: [
									{
										title: "Lesson with GeoGebra",
										type: CopyApiResponseTypeEnum.Lesson,
									},
								],
								type: CopyApiResponseTypeEnum.Room,
								url: "http://abc.de",
							},
						];
						copyModuleMock.copyByShareToken = vi
							.fn()
							.mockResolvedValue(copyResults);

						copyResultResponse = {
							type: CopyApiResponseTypeEnum.Room,
							status: CopyApiResponseStatusEnum.Partial,
						};
					});

					it("opens copy result modal", async () => {
						const { wrapper } = await setupWithValidator();

						const dialog = wrapper
							.findComponent(ImportModal)
							.findComponent(vCustomDialog);
						dialog.vm.$emit("dialog-confirmed");
						await flushPromises();

						expect(copyModuleMock.copyByShareToken).toHaveBeenCalled();
						expect(copyModuleMock.setResultModalOpen).toHaveBeenCalledWith(
							true
						);
					});

					it("emits success when modal is closed", async () => {
						const { wrapper } = await setupWithValidator();

						const dialog = wrapper
							.findComponent(ImportModal)
							.findComponent(vCustomDialog);
						dialog.vm.$emit("dialog-confirmed");
						await flushPromises();

						expect(copyModuleMock.copyByShareToken).toHaveBeenCalled();
						expect(copyModuleMock.setResultModalOpen).toHaveBeenCalledWith(
							true
						);

						const copyResultModal = wrapper.findComponent({
							name: "copy-result-modal",
						});
						await copyResultModal.vm.$emit("copy-dialog-closed");

						expect(wrapper.emitted("success")).toHaveLength(1);
					});
				});
			});
		});
	});
});
