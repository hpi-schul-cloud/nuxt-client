import {
	CopyApiResponse,
	CopyApiResponseStatusEnum,
	CopyApiResponseTypeEnum,
	ShareTokenBodyParamsParentTypeEnum,
	ShareTokenInfoResponseParentTypeEnum,
} from "@/serverApi/v3";
import { roomsModule } from "@/store";
import CopyModule from "@/store/copy";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import RoomsModule from "@/store/rooms";
import { createModuleMocks } from "@/utils/mock-store-module";
import setupStores from "@@/tests/test-utils/setupStores";
import vCustomDialog from "@/components/organisms/vCustomDialog.vue";
import ImportFlow from "@/components/share/ImportFlow.vue";
import ImportModal from "@/components/share/ImportModal.vue";
import SelectCourseModal from "@/components/share/SelectCourseModal.vue";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { CopyResultItem } from "../copy-result-modal/types/CopyResultItem";
import {
	COPY_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import EnvConfigModule from "@/store/env-config";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import vueDompurifyHTMLPlugin from "vue-dompurify-html";

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
		displayColor: "#3a424b",
	};

	const setup = (attrs = {}) => {
		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getCtlToolsTabEnabled: false,
		});

		const wrapper = mount(ImportFlow, {
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					vueDompurifyHTMLPlugin,
				],
				provide: {
					[COPY_MODULE_KEY.valueOf()]: copyModuleMock,
					loadingStateModule: loadingStateModuleMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
				},
			},
			props: {
				token,
				isActive: true,
				courses: [course],
			},
			...attrs,
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
			rooms: RoomsModule,
			envConfigModule: EnvConfigModule,
		});
		jest.spyOn(roomsModule, "fetchAllElements").mockImplementation();
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
			setup({ props: { isActive: false, courses: [] } });

			expect(copyModuleMock.validateShareToken).not.toHaveBeenCalled();
		});

		describe("failure notifier", () => {
			it("is shown for invalid token", async () => {
				copyModuleMock.validateShareToken = () => Promise.reject(new Error());
				setup();
				await nextTick();

				expect(notifierModule.show).toHaveBeenCalledWith(
					expect.objectContaining({
						text: "components.molecules.import.options.failure.invalidToken",
					})
				);
			});

			it("is shown for insufficient permissions", async () => {
				copyModuleMock.validateShareToken = () =>
					Promise.reject({ response: { status: 403 } });
				setup();
				await nextTick();

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
				const validateShareTokenMock = () =>
					Promise.resolve({
						token,
						parentType: ShareTokenInfoResponseParentTypeEnum.Lessons,
						parentName: originalName,
					});

				it("should open selectCourseModal", async () => {
					copyModuleMock.validateShareToken = validateShareTokenMock;
					const { wrapper } = setup();
					await nextTick();

					const selectCourseModal = wrapper.findComponent({
						name: "select-course-modal",
					});

					expect(selectCourseModal.props("isOpen")).toBe(true);
				});

				it("should open the importModal after selecting the course and closing the modal", async () => {
					copyModuleMock.validateShareToken = validateShareTokenMock;
					const { wrapper } = setup();
					await nextTick();

					const select = wrapper.findComponent({ name: "v-select" });
					select.setValue(course);

					const selectCourseDialog = wrapper
						.findComponent(SelectCourseModal)
						.findComponent(vCustomDialog);
					selectCourseDialog.vm.$emit("next");

					await nextTick();

					const importModal = wrapper.findComponent({ name: "import-modal" });
					expect(importModal.props("isOpen")).toBe(true);
				});

				it("should call copyByShareToken when import is started", async () => {
					copyModuleMock.validateShareToken = validateShareTokenMock;
					const { wrapper } = setup();
					await nextTick();

					const select = wrapper.findComponent({ name: "v-select" });
					select.setValue(course);

					const selectCourseDialog = wrapper
						.findComponent(SelectCourseModal)
						.findComponent(vCustomDialog);
					selectCourseDialog.vm.$emit("next");

					const importModalDialog = wrapper
						.findComponent(ImportModal)
						.findComponent(vCustomDialog);
					importModalDialog.vm.$emit("dialog-confirmed");

					expect(copyModuleMock.copyByShareToken).toHaveBeenCalledWith({
						destinationCourseId: course.id,
						token,
						type: ShareTokenBodyParamsParentTypeEnum.Lessons,
						newName: originalName,
					});
				});
			});

			describe("when parent is a task", () => {
				const validateShareTokenMock = () =>
					Promise.resolve({
						token,
						parentType: ShareTokenInfoResponseParentTypeEnum.Tasks,
						parentName: originalName,
					});

				it("should open selectCourseModal", async () => {
					copyModuleMock.validateShareToken = validateShareTokenMock;
					const { wrapper } = setup();
					await nextTick();

					const selectCourseModal = wrapper.findComponent({
						name: "select-course-modal",
					});
					expect(selectCourseModal.props("isOpen")).toBe(true);
				});

				it("should open the importModal after selecting the course and closing the modal", async () => {
					copyModuleMock.validateShareToken = validateShareTokenMock;
					const { wrapper } = setup();
					await nextTick();

					const select = wrapper.findComponent({ name: "v-select" });
					select.setValue(course);

					const selectCourseDialog = wrapper
						.findComponent(SelectCourseModal)
						.findComponent(vCustomDialog);
					selectCourseDialog.vm.$emit("next");

					await nextTick();

					const importModal = wrapper.findComponent({ name: "import-modal" });
					expect(importModal.props("isOpen")).toBe(true);
				});

				it("should call copyByShareToken when import is started", async () => {
					copyModuleMock.validateShareToken = validateShareTokenMock;
					const { wrapper } = setup();
					await nextTick();

					const select = wrapper.findComponent({ name: "v-select" });
					select.setValue(course);

					const selectCourseDialog = wrapper
						.findComponent(SelectCourseModal)
						.findComponent(vCustomDialog);
					selectCourseDialog.vm.$emit("next");

					const importModalDialog = wrapper
						.findComponent(ImportModal)
						.findComponent(vCustomDialog);
					importModalDialog.vm.$emit("dialog-confirmed");

					expect(copyModuleMock.copyByShareToken).toHaveBeenCalledWith({
						destinationCourseId: course.id,
						token,
						type: ShareTokenBodyParamsParentTypeEnum.Tasks,
						newName: originalName,
					});
				});
			});

			describe("when parent is a course", () => {
				const validateShareTokenMock = () =>
					Promise.resolve({
						token,
						parentType: ShareTokenInfoResponseParentTypeEnum.Courses,
						parentName: originalName,
					});
				it("should open importModal", async () => {
					copyModuleMock.validateShareToken = validateShareTokenMock;
					const { wrapper } = setup();
					await nextTick();

					const importModal = wrapper.findComponent({ name: "import-modal" });
					expect(importModal.props("isOpen")).toBe(true);
				});

				it("should show original name in import modal", async () => {
					copyModuleMock.validateShareToken = validateShareTokenMock;
					const { wrapper } = setup();
					await nextTick();

					const importModal = wrapper.findComponent({ name: "import-modal" });
					expect(importModal.props("parentName")).toBe(originalName);
				});

				it("should call copyByShareToken when import is started", async () => {
					copyModuleMock.validateShareToken = validateShareTokenMock;
					const { wrapper } = setup();
					await nextTick();

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
					copyModuleMock.validateShareToken = validateShareTokenMock;
					copyModuleMock.copyByShareToken = () => Promise.reject(new Error());
					const { wrapper } = setup();
					await nextTick();

					const dialog = wrapper
						.findComponent(ImportModal)
						.findComponent(vCustomDialog);
					await dialog.vm.$emit("dialog-confirmed");

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
						copyModuleMock.validateShareToken = validateShareTokenMock;
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
						copyModuleMock.copyByShareToken = jest
							.fn()
							.mockResolvedValue(copyResults);

						copyResultResponse = {
							type: CopyApiResponseTypeEnum.Course,
							status: CopyApiResponseStatusEnum.Partial,
						};
					});

					it("opens copy result modal", async () => {
						const { wrapper } = setup();
						await nextTick();

						const dialog = wrapper
							.findComponent(ImportModal)
							.findComponent(vCustomDialog);
						await dialog.vm.$emit("dialog-confirmed");
						await new Promise((time) => setTimeout(time, 1000));

						expect(copyModuleMock.copyByShareToken).toHaveBeenCalled();
						expect(copyModuleMock.setResultModalOpen).toHaveBeenCalledWith(
							true
						);
					});

					it("emits success when modal is closed", async () => {
						const { wrapper } = setup();
						await nextTick();

						const dialog = wrapper
							.findComponent(ImportModal)
							.findComponent(vCustomDialog);
						await dialog.vm.$emit("dialog-confirmed");
						await new Promise((time) => setTimeout(time, 1000));

						expect(copyModuleMock.copyByShareToken).toHaveBeenCalled();
						expect(copyModuleMock.setResultModalOpen).toHaveBeenCalledWith(
							true
						);

						const copyResultModal = wrapper.findComponent({
							name: "copy-result-modal",
						});
						await copyResultModal.vm.$emit("dialog-closed");

						expect(wrapper.emitted("success")).toHaveLength(1);
					});
				});
			});
		});
	});
});
