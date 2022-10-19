import {
	CopyApiResponseTypeEnum,
	ShareTokenInfoResponseParentTypeEnum,
} from "@/serverApi/v3";
import CopyModule from "@/store/copy";
import LoadingStateModule from "@/store/loading-state";
import NotifierModule from "@/store/notifier";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import vCustomDialog from "@components/organisms/vCustomDialog.vue";
import ImportFlow from "@components/share-course/ImportFlow.vue";
import { provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import { CopyResultItem } from "../copy-result-modal/types/CopyResultItem";

describe("@components/share-course/ImportFlow", () => {
	let copyModuleMock: CopyModule;
	let loadingStateModuleMock: LoadingStateModule;
	let notifierModuleMock: NotifierModule;

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
		});
		loadingStateModuleMock = createModuleMocks(LoadingStateModule);
		notifierModuleMock = createModuleMocks(NotifierModule);
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

		describe("valid token", () => {
			const originalName = "Nihilismus";

			const validateShareTokenMock = () =>
				Promise.resolve({
					token,
					parentType: ShareTokenInfoResponseParentTypeEnum.Courses,
					parentName: originalName,
				});

			it("should open importModal", () => {
				copyModuleMock.validateShareToken = validateShareTokenMock;
				const wrapper = mountComponent();

				expect(
					wrapper.findComponent({ name: "import-modal" }).isVisible()
				).toBe(true);
			});

			it("should show original name in import modal", async () => {
				copyModuleMock.validateShareToken = validateShareTokenMock;
				const wrapper = mountComponent();
				await Vue.nextTick();

				const component = wrapper.findComponent({ name: "import-modal" });
				expect(component.props().parentName).toBe(originalName);
			});

			it("should call copyByShareToken when import-button is pressed", async () => {
				copyModuleMock.validateShareToken = validateShareTokenMock;
				const wrapper = mountComponent();
				await Vue.nextTick();

				const dialog = wrapper.findComponent(vCustomDialog);
				dialog.vm.$emit("dialog-confirmed");

				expect(copyModuleMock.copyByShareToken).toHaveBeenCalledWith({
					token,
					type: "course",
					newName: originalName,
				});
			});

			describe("copyResult: success", () => {
				it("should show success notifier", async () => {
					copyModuleMock.validateShareToken = validateShareTokenMock;
					copyModuleMock.copyByShareToken = () => Promise.resolve([]);
					const wrapper = mountComponent();
					await Vue.nextTick();

					const dialog = wrapper.findComponent(vCustomDialog);
					dialog.vm.$emit("dialog-confirmed");
					await Vue.nextTick();

					expect(notifierModuleMock.show).toHaveBeenCalledWith(
						expect.objectContaining({ status: "success" })
					);
				});
			});

			describe("copyResult: failure", () => {
				it("should show failure notifier", async () => {
					copyModuleMock.validateShareToken = validateShareTokenMock;
					copyModuleMock.copyByShareToken = () => Promise.reject();
					const wrapper = mountComponent();
					await Vue.nextTick();

					const dialog = wrapper.findComponent(vCustomDialog);
					dialog.vm.$emit("dialog-confirmed");
					await Vue.nextTick();

					expect(notifierModuleMock.show).toHaveBeenCalledWith(
						expect.objectContaining({ status: "error" })
					);
				});
			});

			describe("copyResult: partial", () => {
				it("should show copy result modal", async () => {
					copyModuleMock.validateShareToken = validateShareTokenMock;
					const copyResults: CopyResultItem[] = [
						{
							elementId: "werwer",
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
					copyModuleMock.copyByShareToken = () => Promise.resolve(copyResults);
					const wrapper = mountComponent();
					await Vue.nextTick();

					const dialog = wrapper.findComponent(vCustomDialog);
					dialog.vm.$emit("dialog-confirmed");
					await Vue.nextTick();
					await new Promise((time) => setTimeout(time, 1000));

					expect(
						wrapper.findComponent({ name: "copy-result-modal" }).find("a")
					).toBe(true);
				});
			});
		});
	});
	// it("should validate the shareToken", () => {
	// 	const wrapper = getWrapper({
	// 		propsData: {
	// 			token: "ABC",
	// 			isActive: true,
	// 		},
	// 	});
	// });
});
