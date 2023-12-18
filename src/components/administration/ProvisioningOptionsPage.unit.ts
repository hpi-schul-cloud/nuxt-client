import { createMock, DeepMocked } from "@golevelup/ts-jest";
import VueRouter, { Route } from "vue-router";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import ProvisioningOptionsPage from "./ProvisioningOptionsPage.vue";
import Vue, { ref } from "vue";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { I18N_KEY } from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";
import {
	ProvisioningOptions,
	useProvisioningOptionsState,
} from "../data-provisioning-options";
import { provisioningOptionsDataFactory } from "@@/tests/test-utils/factory/provisioningOptionsDataFactory";
import * as routerComposables from "vue-router";

jest.mock("@data-provisioning-options");

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

const $theme = {
	name: "instance name",
};

describe(ProvisioningOptionsPage.name, () => {
	let useProvisioningOptionsStateMock: DeepMocked<
		ReturnType<typeof useProvisioningOptionsState>
	>;
	let router: DeepMocked<VueRouter>;

	const getWrapper = (
		propsData: { systemId: string } = { systemId: "systemId" },
		provisioningOptions: ProvisioningOptions = provisioningOptionsDataFactory.build()
	) => {
		document.body.setAttribute("data-app", "true");

		useProvisioningOptionsStateMock.isLoading = ref(false);
		useProvisioningOptionsStateMock.provisioningOptionsData =
			ref(provisioningOptions);

		router = createMock<VueRouter>();
		jest.spyOn(routerComposables, "useRouter").mockReturnValue(router);

		const wrapper: Wrapper<Vue> = mount(
			ProvisioningOptionsPage as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				provide: { [I18N_KEY.valueOf()]: i18nMock },
				propsData: { ...propsData },
				mocks: { $theme },
			}
		);

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		useProvisioningOptionsStateMock =
			createMock<ReturnType<typeof useProvisioningOptionsState>>();

		jest
			.mocked(useProvisioningOptionsState)
			.mockReturnValue(useProvisioningOptionsStateMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("breadcrumbs", () => {
		it("should render static breadcrumbs", () => {
			const { wrapper } = getWrapper();

			const breadcrumbs = wrapper.findAll(".breadcrumbs-item");

			expect(breadcrumbs.at(0).text()).toEqual(
				"pages.administration.index.title"
			);
			expect(breadcrumbs.at(1).text()).toEqual(
				"pages.administration.school.index.title"
			);
			expect(breadcrumbs.at(2).text()).toEqual(
				"components.administration.provisioningOptions.page.title"
			);
		});
	});

	describe("title", () => {
		it("should render static title", () => {
			const { wrapper } = getWrapper();

			const title = wrapper.find("h1");

			expect(title.text()).toContain(
				"components.administration.provisioningOptions.page.title"
			);
		});
	});

	describe("onMounted", () => {
		describe("when loading the page", () => {
			it("should load provisioning options", async () => {
				getWrapper({ systemId: "systemId" });

				await Vue.nextTick();

				expect(
					useProvisioningOptionsStateMock.fetchProvisioningOptionsData
				).toHaveBeenCalledWith("systemId");
			});
		});
	});

	describe("checkboxes", () => {
		it("should render 3 checkboxes", () => {
			const provisioningOptions = provisioningOptionsDataFactory.build();
			const { wrapper } = getWrapper(
				{
					systemId: "systemId",
				},
				provisioningOptions
			);

			const checkboxes = wrapper.findAllComponents({
				name: "v-checkbox",
			}).wrappers;

			expect(checkboxes.length).toEqual(3);
			expect(checkboxes[0].find("input").attributes("aria-checked")).toEqual(
				provisioningOptions.class.toString()
			);
			expect(checkboxes[1].find("input").attributes("aria-checked")).toEqual(
				provisioningOptions.course.toString()
			);
			expect(checkboxes[2].find("input").attributes("aria-checked")).toEqual(
				provisioningOptions.others.toString()
			);
		});
	});

	describe("buttons", () => {
		describe("when clicking the cancel button", () => {
			const setup = () => {
				const { wrapper } = getWrapper(
					{
						systemId: "systemId",
					},
					provisioningOptionsDataFactory.build()
				);

				const cancelButton = wrapper.find(
					'[data-testid="provisioning-options-cancel-button"]'
				);

				const redirect = {
					path: "/administration/school-settings",
					query: { openPanels: "authentication" },
				};

				return {
					cancelButton,
					redirect,
				};
			};

			it("should not call the update function", () => {
				const { cancelButton } = setup();

				cancelButton.trigger("click");

				expect(
					useProvisioningOptionsStateMock.updateProvisioningOptionsData
				).not.toHaveBeenCalled();
			});

			it("should return to school settings page", () => {
				const { cancelButton, redirect } = setup();

				cancelButton.trigger("click");

				expect(router.push).toHaveBeenCalledWith(redirect);
			});
		});

		describe("when clicking the save button without error", () => {
			const setup = () => {
				const { wrapper } = getWrapper(
					{
						systemId: "systemId",
					},
					provisioningOptionsDataFactory.build()
				);

				const saveButton = wrapper.find(
					'[data-testid="provisioning-options-save-button"]'
				);

				const redirect: Partial<Route> = {
					path: "/administration/school-settings",
					query: { openPanels: "authentication" },
				};

				useProvisioningOptionsStateMock.updateProvisioningOptionsData.mockResolvedValue();
				useProvisioningOptionsStateMock.error.value = undefined;

				return {
					saveButton,
					redirect,
				};
			};

			it("should call the update function", () => {
				const { saveButton } = setup();

				saveButton.trigger("click");

				expect(
					useProvisioningOptionsStateMock.updateProvisioningOptionsData
				).toHaveBeenCalledWith("systemId", {
					class: true,
					course: false,
					others: false,
				});
			});

			it("should return to school settings page", async () => {
				const { saveButton, redirect } = setup();

				await saveButton.trigger("click");
				await Vue.nextTick();

				expect(router.push).toHaveBeenCalledWith(redirect);
			});
		});

		describe("when clicking the save button with errors", () => {
			const setup = () => {
				const { wrapper } = getWrapper(
					{
						systemId: "systemId",
					},
					provisioningOptionsDataFactory.build()
				);

				const saveButton = wrapper.find(
					'[data-testid="provisioning-options-save-button"]'
				);

				useProvisioningOptionsStateMock.updateProvisioningOptionsData.mockResolvedValue();
				useProvisioningOptionsStateMock.error.value = {
					error: new Error(),
					message: "mockMessage",
					statusCode: 500,
				};

				return {
					saveButton,
				};
			};

			it("should call the update function", () => {
				const { saveButton } = setup();

				saveButton.trigger("click");

				expect(
					useProvisioningOptionsStateMock.updateProvisioningOptionsData
				).toHaveBeenCalledWith("systemId", {
					class: true,
					course: false,
					others: false,
				});
			});

			it("should stay on provisioning options page", async () => {
				const { saveButton } = setup();

				await saveButton.trigger("click");
				await Vue.nextTick();

				expect(router.push).not.toHaveBeenCalled();
			});
		});
	});
});
