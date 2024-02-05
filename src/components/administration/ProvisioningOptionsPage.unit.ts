import { provisioningOptionsDataFactory } from "@@/tests/test-utils/factory";
import {
	ProvisioningOptions,
	useProvisioningOptionsState,
} from "@data-provisioning-options";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { flushPromises, mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import { Router, useRouter } from "vue-router";
import ProvisioningOptionsPage from "./ProvisioningOptionsPage.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import VCustomDialog from "../organisms/vCustomDialog.vue";

jest.mock("@data-provisioning-options");

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

jest.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;

const $theme = {
	name: "instance name",
};

jest
	.spyOn(window, "scrollTo")
	.mockImplementation(() => ({ top: 0, behavior: "smooth" }));

describe("ProvisioningOptionsPage", () => {
	let useProvisioningOptionsStateMock: DeepMocked<
		ReturnType<typeof useProvisioningOptionsState>
	>;
	const router = createMock<Router>();

	const getWrapper = (
		props: { systemId: string } = { systemId: "systemId" },
		provisioningOptions: ProvisioningOptions = provisioningOptionsDataFactory.build()
	) => {
		useProvisioningOptionsStateMock.isLoading = ref(false);
		useProvisioningOptionsStateMock.provisioningOptionsData =
			ref(provisioningOptions);

		useRouterMock.mockReturnValue(router);

		const wrapper = mount(ProvisioningOptionsPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$theme,
				},
			},
			props: {
				...props,
			},
		});

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

			expect(breadcrumbs[0].text()).toEqual("pages.administration.index.title");
			expect(breadcrumbs[1].text()).toEqual(
				"pages.administration.school.index.title"
			);
			expect(breadcrumbs[2].text()).toEqual(
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

				await nextTick();

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
			});

			expect(checkboxes.length).toEqual(3);
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

			it("should not call the update function", async () => {
				const { cancelButton } = setup();

				await cancelButton.trigger("click");

				expect(
					useProvisioningOptionsStateMock.updateProvisioningOptionsData
				).not.toHaveBeenCalled();
			});

			it("should return to school settings page", async () => {
				const { cancelButton, redirect } = setup();

				await cancelButton.trigger("click");

				expect(router.push).toHaveBeenCalledWith(redirect);
			});
		});

		describe("when clicking the save", () => {
			describe("when enabling options", () => {
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

					const redirect = {
						path: "/administration/school-settings",
						query: { openPanels: "authentication" },
					};

					return {
						saveButton,
						redirect,
					};
				};

				it("should call the update function", async () => {
					const { saveButton } = setup();

					await saveButton.trigger("click");

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
					await flushPromises();

					expect(router.push).toHaveBeenCalledWith(redirect);
				});
			});

			describe("when disabling options", () => {
				beforeEach(() => {
					jest.clearAllMocks();
				});
				const setup = async () => {
					const { wrapper } = getWrapper(
						{
							systemId: "systemId",
						},
						provisioningOptionsDataFactory.build({
							class: true,
						})
					);

					const saveButton = wrapper.find(
						'[data-testid="provisioning-options-save-button"]'
					);

					await flushPromises();

					const checkBoxes = wrapper.findAllComponents({ name: "v-checkbox" });

					const classCheckbox = checkBoxes[0];
					await classCheckbox.vm.$emit("update:modelValue", false);

					return {
						wrapper,
						saveButton,
					};
				};

				it("should not call the update function", async () => {
					const { saveButton } = await setup();

					await saveButton.trigger("click");

					expect(
						useProvisioningOptionsStateMock.updateProvisioningOptionsData
					).not.toHaveBeenCalled();
				});

				it("should open the warning dialog", async () => {
					const { saveButton, wrapper } = await setup();

					await saveButton.trigger("click");

					const dialog = wrapper.findComponent(VCustomDialog);

					expect(dialog.props("isOpen")).toEqual(true);
				});
			});

			describe("when an error occurs", () => {
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
					await flushPromises();

					expect(router.push).not.toHaveBeenCalled();
				});
			});
		});
	});
});
