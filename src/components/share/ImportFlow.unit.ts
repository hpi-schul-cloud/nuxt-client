import {
	CopyApiResponse,
	CopyApiResponseStatusEnum,
	CopyApiResponseTypeEnum,
	ShareTokenInfoResponseParentTypeEnum,
} from "@/serverApi/v3";
import { roomsModule } from "@/store";
import CopyModule, { CopyParamsTypeEnum } from "@/store/copy";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import RoomsModule from "@/store/rooms";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import setupStores from "@@/tests/test-utils/setupStores";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import ImportFlow from "@components/share/ImportFlow.vue";
import ImportModal from "@components/share/ImportModal.vue";
import { provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import { CopyResultItem } from "../copy-result-modal/types/CopyResultItem";

describe("@components/share/ImportFlow", () => {
	let copyModuleMock: CopyModule;
	let loadingStateModuleMock: LoadingStateModule;
	let notifierModuleMock: NotifierModule;
	let copyResultResponse: CopyApiResponse | undefined = undefined;

	const token = "ACoolToken";
	const mountComponent = (attrs = {}) => {
		const wrapper = mount(ImportFlow, {
			...createComponentMocks({
				i18n: true,
			}),
			setup() {
				provide("i18n", { t: (key: string) => key });
				provide("copyModule", copyModuleMock);
				provide("loadingStateModule", loadingStateModuleMock);
				provide("notifierModule", notifierModuleMock);
			},
			propsData: {
				token,
				isActive: true,
				courses: [],
			},
			...attrs,
		});

		return wrapper;
	};

	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		copyModuleMock = createModuleMocks(CopyModule, {
			getIsResultModalOpen: false,
			getCopyResult: copyResultResponse,
		});
		loadingStateModuleMock = createModuleMocks(LoadingStateModule);
		notifierModuleMock = createModuleMocks(NotifierModule);
		setupStores({ rooms: RoomsModule });
		jest.spyOn(roomsModule, "fetchAllElements").mockImplementation();
	});

	describe("token is provided", () => {
		it("should render with props", () => {
			const wrapper = mountComponent();

			expect(wrapper).toBeTruthy();
		});

		it("should call validateShareToken", () => {
			mountComponent();

			expect(copyModuleMock.validateShareToken).toHaveBeenCalledWith(token);
		});
		it("shouldn't call validateShareToken if isActive is false", () => {
			mountComponent({ propsData: { isActive: false, courses: [] } });

			expect(copyModuleMock.validateShareToken).not.toHaveBeenCalled();
		});

		describe("failure notifier", () => {
			it("is shown for invalid token", async () => {
				copyModuleMock.validateShareToken = () => Promise.reject({});
				mountComponent();
				await Vue.nextTick();

				expect(notifierModuleMock.show).toHaveBeenCalledWith(
					expect.objectContaining({
						text: "components.molecules.import.options.failure.invalidToken",
					})
				);
			});

			it("is shown for insufficient permissions", async () => {
				copyModuleMock.validateShareToken = () =>
					Promise.reject({ response: { status: 403 } });
				mountComponent();
				await Vue.nextTick();

				expect(notifierModuleMock.show).toHaveBeenCalledWith(
					expect.objectContaining({
						text: "components.molecules.import.options.failure.permissionError",
					})
				);
			});
		});

		describe("valid token", () => {
			const originalName = "Nihilismus";

			const validateShareTokenMock = () =>
				Promise.resolve({
					token,
					parentType: ShareTokenInfoResponseParentTypeEnum.Courses,
					parentName: originalName,
				});

			it("should open importModal", async () => {
				copyModuleMock.validateShareToken = validateShareTokenMock;
				const wrapper = mountComponent();
				await Vue.nextTick();

				const importModal = wrapper.findComponent({ name: "import-modal" });
				expect(importModal.props("isOpen")).toBe(true);
			});

			it("should show original name in import modal", async () => {
				copyModuleMock.validateShareToken = validateShareTokenMock;
				const wrapper = mountComponent();
				await Vue.nextTick();

				const importModal = wrapper.findComponent({ name: "import-modal" });
				expect(importModal.props("parentName")).toBe(originalName);
			});

			it("should call copyByShareToken when import is started", async () => {
				copyModuleMock.validateShareToken = validateShareTokenMock;
				const wrapper = mountComponent();
				await Vue.nextTick();

				const dialog = wrapper
					.findComponent(ImportModal)
					.findComponent(vCustomDialog);
				dialog.vm.$emit("dialog-confirmed");

				expect(copyModuleMock.copyByShareToken).toHaveBeenCalledWith({
					token,
					type: CopyParamsTypeEnum.Course,
					newName: originalName,
				});
			});

			it("shows failure notifier for failed copy", async () => {
				copyModuleMock.validateShareToken = validateShareTokenMock;
				copyModuleMock.copyByShareToken = () => Promise.reject();
				const wrapper = mountComponent();
				await Vue.nextTick();

				const dialog = wrapper
					.findComponent(ImportModal)
					.findComponent(vCustomDialog);
				await dialog.vm.$emit("dialog-confirmed");

				expect(notifierModuleMock.show).toHaveBeenCalledWith(
					expect.objectContaining({ status: "error" })
				);
			});

			describe("for partial or successful copy", () => {
				beforeEach(() => {
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
					const wrapper = mountComponent();
					await Vue.nextTick();

					const dialog = wrapper
						.findComponent(ImportModal)
						.findComponent(vCustomDialog);
					await dialog.vm.$emit("dialog-confirmed");
					await new Promise((time) => setTimeout(time, 1000));

					expect(copyModuleMock.copyByShareToken).toHaveBeenCalled();
					expect(copyModuleMock.setResultModalOpen).toHaveBeenCalledWith(true);
				});

				it("emits success when modal is closed", async () => {
					const wrapper = mountComponent();
					await Vue.nextTick();

					const dialog = wrapper
						.findComponent(ImportModal)
						.findComponent(vCustomDialog);
					await dialog.vm.$emit("dialog-confirmed");
					await new Promise((time) => setTimeout(time, 1000));
					expect(copyModuleMock.copyByShareToken).toHaveBeenCalled();
					expect(copyModuleMock.setResultModalOpen).toHaveBeenCalledWith(true);

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
