import ProvisioningOptionsPage from "./ProvisioningOptionsPage.vue";
import VCustomDialog from "@/components/organisms/vCustomDialog.vue";
import { ConfigResponse } from "@/serverApi/v3";
import { THEME_KEY } from "@/utils/inject";
import { createTestEnvStore, provisioningOptionsDataFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ProvisioningOptions, useProvisioningOptionsState } from "@data-provisioning-options";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import type { Mock } from "vitest";
import { nextTick, ref } from "vue";
import { ComponentProps } from "vue-component-type-helpers";
import { Router, useRouter } from "vue-router";
import { VCheckboxBtn } from "vuetify/lib/components/index";

vi.mock("@data-provisioning-options");

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;

describe("ProvisioningOptionsPage", () => {
	vi.spyOn(window, "scrollTo").mockImplementation(() => ({
		top: 0,
		behavior: "smooth",
	}));

	let useProvisioningOptionsStateMock: DeepMocked<ReturnType<typeof useProvisioningOptionsState>>;
	const router = createMock<Router>();

	const getWrapper = (
		props: ComponentProps<typeof ProvisioningOptionsPage> = {
			systemId: "systemId",
		},
		envConfig: Partial<ConfigResponse> = {
			FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED: false,
		}
	) => {
		useRouterMock.mockReturnValue(router);

		setActivePinia(createTestingPinia());
		createTestEnvStore(envConfig);

		const wrapper = mount(ProvisioningOptionsPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[THEME_KEY.valueOf()]: {
						name: "instance name",
					},
				},
			},
			props,
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		useProvisioningOptionsStateMock = createMock<ReturnType<typeof useProvisioningOptionsState>>({
			isLoading: ref(false),
			provisioningOptionsData: ref(provisioningOptionsDataFactory.build()),
			error: ref(),
		});

		vi.mocked(useProvisioningOptionsState).mockReturnValue(useProvisioningOptionsStateMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("breadcrumbs", () => {
		it("should render static breadcrumbs", () => {
			const { wrapper } = getWrapper();

			const breadcrumbs = wrapper.findAll(".breadcrumbs-item");

			expect(breadcrumbs[0].text()).toEqual("pages.administration.school.index.title");
			expect(breadcrumbs[1].text()).toEqual("components.administration.provisioningOptions.page.title");
		});
	});

	describe("title", () => {
		it("should render static title", () => {
			const { wrapper } = getWrapper();

			const title = wrapper.find("h1");

			expect(title.text()).toContain("components.administration.provisioningOptions.page.title");
		});
	});

	describe("onMounted", () => {
		describe("when loading the page", () => {
			it("should load provisioning options", async () => {
				getWrapper({ systemId: "systemId" });

				await nextTick();

				expect(useProvisioningOptionsStateMock.fetchProvisioningOptionsData).toHaveBeenCalledWith("systemId");
			});
		});
	});

	describe("checkboxes", () => {
		describe("when the licensing is disabled", () => {
			const setup = () => {
				const provisioningOptions = provisioningOptionsDataFactory.build();

				useProvisioningOptionsStateMock.provisioningOptionsData.value = provisioningOptions;

				const { wrapper } = getWrapper(
					{ systemId: "systemId" },
					{
						FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED: false,
					}
				);

				return {
					wrapper,
				};
			};

			it("should render 3 checkboxes", () => {
				const { wrapper } = setup();

				const classCheckbox = wrapper.find("[data-testid=checkbox-option-class]");
				const courseCheckbox = wrapper.find("[data-testid=checkbox-option-course]");
				const othersCheckbox = wrapper.find("[data-testid=checkbox-option-others]");
				const schoolExternalToolCheckbox = wrapper.find("[data-testid=checkbox-option-school-external-tools]");

				expect(classCheckbox.isVisible()).toEqual(true);
				expect(courseCheckbox.isVisible()).toEqual(true);
				expect(othersCheckbox.isVisible()).toEqual(true);
				expect(schoolExternalToolCheckbox.exists()).toEqual(false);
			});
		});

		describe("when the licensing is enabled", () => {
			const setup = () => {
				const provisioningOptions = provisioningOptionsDataFactory.build();

				useProvisioningOptionsStateMock.provisioningOptionsData.value = provisioningOptions;

				const { wrapper } = getWrapper(
					{ systemId: "systemId" },
					{
						FEATURE_SCHULCONNEX_MEDIA_LICENSE_ENABLED: true,
					}
				);

				return {
					wrapper,
				};
			};

			it("should render 4 checkboxes", () => {
				const { wrapper } = setup();

				const classCheckbox = wrapper.find("[data-testid=checkbox-option-class]");
				const courseCheckbox = wrapper.find("[data-testid=checkbox-option-course]");
				const othersCheckbox = wrapper.find("[data-testid=checkbox-option-others]");
				const schoolExternalToolCheckbox = wrapper.find("[data-testid=checkbox-option-school-external-tools]");

				expect(classCheckbox.isVisible()).toEqual(true);
				expect(courseCheckbox.isVisible()).toEqual(true);
				expect(othersCheckbox.isVisible()).toEqual(true);
				expect(schoolExternalToolCheckbox.isVisible()).toEqual(true);
			});
		});
	});

	describe("buttons", () => {
		describe("when clicking the cancel button", () => {
			const setup = () => {
				useProvisioningOptionsStateMock.provisioningOptionsData.value = provisioningOptionsDataFactory.build();

				const { wrapper } = getWrapper();

				const cancelButton = wrapper.find('[data-testid="provisioning-options-cancel-button"]');

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

				expect(useProvisioningOptionsStateMock.updateProvisioningOptionsData).not.toHaveBeenCalled();
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
					useProvisioningOptionsStateMock.provisioningOptionsData.value = provisioningOptionsDataFactory.build();

					const { wrapper } = getWrapper();

					const saveButton = wrapper.find('[data-testid="provisioning-options-save-button"]');

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

					expect(useProvisioningOptionsStateMock.updateProvisioningOptionsData).toHaveBeenCalledWith<
						[string, ProvisioningOptions]
					>("systemId", {
						class: true,
						course: false,
						others: false,
						schoolExternalTools: false,
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
					vi.clearAllMocks();
				});
				const setup = async () => {
					useProvisioningOptionsStateMock.provisioningOptionsData.value = provisioningOptionsDataFactory.build({
						class: true,
					});

					const { wrapper } = getWrapper();

					const saveButton = wrapper.find('[data-testid="provisioning-options-save-button"]');

					await flushPromises();

					const checkBoxes = wrapper.findAllComponents(VCheckboxBtn);

					const classCheckbox = checkBoxes[0];
					classCheckbox.vm.$emit("update:modelValue", false);
					await nextTick();

					return {
						wrapper,
						saveButton,
					};
				};

				it("should not call the update function", async () => {
					const { saveButton } = await setup();

					await saveButton.trigger("click");

					expect(useProvisioningOptionsStateMock.updateProvisioningOptionsData).not.toHaveBeenCalled();
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
					useProvisioningOptionsStateMock.provisioningOptionsData.value = provisioningOptionsDataFactory.build();

					const { wrapper } = getWrapper();

					const saveButton = wrapper.find('[data-testid="provisioning-options-save-button"]');

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

					expect(useProvisioningOptionsStateMock.updateProvisioningOptionsData).toHaveBeenCalledWith<
						[string, ProvisioningOptions]
					>("systemId", {
						class: true,
						course: false,
						others: false,
						schoolExternalTools: false,
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
