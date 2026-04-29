import GeneralSettings from "./GeneralSettings.vue";
import { toBase64 } from "@/utils/fileHelper";
import { createTestEnvStore, expectNotification, schoolFactory } from "@@/tests/test-utils";
import { createTestSchoolStore } from "@@/tests/test-utils/factory/school-test.utils";
import { schoolYearResponseFactory } from "@@/tests/test-utils/factory/schoolYearResponseFactory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { LanguageType, SchoolResponse, SchoolSystemResponse } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { nextTick } from "vue";
import { VFileInput, VSelect, VTextField } from "vuetify/components";

vi.mock("@/utils/fileHelper", async () => {
	const original = await vi.importActual<typeof import("@/utils/fileHelper")>("@/utils/fileHelper");
	return {
		...original,
		toBase64: vi.fn(() => Promise.resolve("mock-base64-data")),
	};
});

describe("GeneralSettings", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore({
			I18N__AVAILABLE_LANGUAGES: [LanguageType.DE, LanguageType.EN, LanguageType.ES, LanguageType.UK],
		});
	});

	const setup = (options?: { schoolDetails?: Partial<SchoolResponse>; schoolSystems?: SchoolSystemResponse[] }) => {
		const schoolDetails = schoolFactory.build({
			currentYear: schoolYearResponseFactory.build(),
			officialSchoolNumber: undefined,
			county: undefined,
			federalState: undefined,
			logo: { dataUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA", name: "logo.png" },
			...options?.schoolDetails,
		});

		const { schoolStore } = createTestSchoolStore({ schoolDetails, schoolSystems: options?.schoolSystems });

		const wrapper = mount(GeneralSettings, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});
		return { wrapper, schoolDetails, schoolStore };
	};

	describe("displaying correct data", () => {
		describe("school name", () => {
			it("should display the school name", () => {
				const { wrapper, schoolDetails } = setup();

				const textField = wrapper.findComponent("[data-testid='school-name']");

				expect(textField.exists()).toBe(true);
				expect(textField.text()).toContain(schoolDetails.name);
			});

			it("should not be possible to edit the school name if the school is synced", () => {
				const syncedSystem: SchoolSystemResponse[] = [
					{
						id: "0000d186816abba584714c90",
						type: "ldap",
						ldapConfig: {
							provider: "iserv-idm",
						},
					},
				];
				const { wrapper } = setup({ schoolSystems: syncedSystem });

				const textField = wrapper.findComponent<typeof VTextField>("[data-testid='school-name']");
				expect(textField.props("disabled")).toBe(true);
			});

			it("should be possible to edit the school name if the school is not synced", () => {
				const unsyncedSystem: SchoolSystemResponse[] = [
					{
						id: "0000d186816abba584714c91",
						type: "moodle",
					},
				];

				const { wrapper } = setup({ schoolSystems: unsyncedSystem });

				const textField = wrapper.findComponent<typeof VTextField>("[data-testid='school-name']");
				expect(textField.props("disabled")).toBe(false);
			});

			it("should be possible to edit the school name if the school is not attached to a system", () => {
				const { wrapper } = setup({ schoolSystems: [] });

				const textField = wrapper.findComponent<typeof VTextField>("[data-testid='school-name']");
				expect(textField.props("disabled")).toBe(false);
			});
		});

		describe("school year", () => {
			it("should display current year", () => {
				const { wrapper, schoolDetails } = setup();

				const textField = wrapper.findComponent<typeof VTextField>("[data-testid='school-year']");

				expect(textField.exists()).toBe(true);
				expect(textField.props("modelValue")).toBe(schoolDetails.currentYear?.name);
			});

			it("should show current school year as readonly", () => {
				const { wrapper } = setup();

				const textField = wrapper.findComponent<typeof VTextField>("[data-testid='school-year']");

				expect(textField.exists()).toBe(true);
				expect(textField.props("readonly")).toBe(true);
			});
		});

		describe("school number", () => {
			it("school number text should be disabled if the number is set", () => {
				const { wrapper, schoolDetails } = setup({ schoolDetails: { officialSchoolNumber: "12345" } });

				const textField = wrapper.findComponent<typeof VTextField>("[data-testid='school-number']");

				expect(textField.exists()).toBe(true);
				expect(textField.props("modelValue")).toBe(schoolDetails.officialSchoolNumber);
				expect(textField.props("disabled")).toBe(true);
			});

			it("school number text should not be disabled if the number is not set", () => {
				const { wrapper } = setup();

				const textField = wrapper.findComponent<typeof VTextField>("[data-testid='school-number']");

				expect(textField.props("disabled")).toBe(false);
			});
		});

		describe("county selection", () => {
			it("should display the county selection", () => {
				const { wrapper } = setup();

				const select = wrapper.findComponent<typeof VSelect>("[data-testid='school-counties']");

				expect(select.exists()).toBe(true);
			});

			it("should render items in the county selection", () => {
				const { wrapper, schoolDetails } = setup({
					schoolDetails: {
						federalState: {
							id: "0000b186816abba584714c53",
							counties: [
								{
									id: "5fa55eb53f472a2d986c8812",
									antaresKey: "BRB",
									countyId: 12051,
									name: "Brandenburg an der Havel",
								},
								{
									id: "5fa55eb53f472a2d986c8813",
									antaresKey: "CB",
									countyId: 12052,
									name: "Cottbus",
								},
							],
							name: "Brandenburg",
							abbreviation: "BB",
							logoUrl: "https://example.com/logo.png",
						},
					},
				});

				const select = wrapper.findComponent<typeof VSelect>("[data-testid='school-counties']");

				expect(select.props("items")).toEqual(schoolDetails.federalState?.counties);
				expect(select.props("items")).toHaveLength(2);
			});

			it("should be disabled if county value is set", () => {
				const { wrapper } = setup({
					schoolDetails: {
						county: {
							id: "5fa55eb53f472a2d986c8812",
							antaresKey: "BRB",
							countyId: 12051,
							name: "Brandenburg an der Havel",
						},
					},
				});

				const select = wrapper.findComponent<typeof VSelect>("[data-testid='school-counties']");

				expect(select.props("disabled")).toBe(true);
			});

			it("should not be disabled if the value is not set", () => {
				const { wrapper } = setup({
					schoolDetails: { county: undefined },
				});

				const select = wrapper.findComponent<typeof VSelect>("[data-testid='school-counties']");

				expect(select.props("disabled")).toBe(false);
			});

			it("should display the correct county", () => {
				const { wrapper, schoolDetails } = setup({
					schoolDetails: {
						county: {
							id: "5fa55eb53f472a2d986c8812",
							antaresKey: "BRB",
							countyId: 12051,
							name: "Brandenburg an der Havel",
						},
					},
				});

				const select = wrapper.findComponent<typeof VSelect>("[data-testid='school-counties']");

				expect(select.props("modelValue")).toEqual(schoolDetails.county);
			});
		});

		describe("logo element", () => {
			it("logo element should be found", () => {
				const { wrapper } = setup();
				const logo = wrapper.find(".school-logo");

				expect(logo.exists()).toBe(true);
			});
		});

		describe("timezone input", () => {
			it("timezone input should display the correct data", () => {
				const { wrapper, schoolDetails } = setup();

				const timezoneInput = wrapper.findComponent<typeof VTextField>("[data-testid='timezone-input']");

				expect(timezoneInput.exists()).toBe(true);
				expect(timezoneInput.props("modelValue")).toBe(schoolDetails.timezone);
				expect(timezoneInput.props("disabled")).toBe(true);
				expect(timezoneInput.props().label).toStrictEqual(
					"pages.administration.school.index.generalSettings.labels.timezone"
				);
				expect(timezoneInput.props().hint).toStrictEqual(
					"pages.administration.school.index.generalSettings.timezoneHint"
				);
			});
		});
		describe("language selection", () => {
			it("should display the language selection", () => {
				const { wrapper } = setup();

				const languageSelect = wrapper.findComponent<typeof VSelect>("[data-testid='language-select']");

				expect(languageSelect.exists()).toBe(true);
			});

			it("should display select element with available languages", () => {
				const { wrapper } = setup();

				const languageSelect = wrapper.findComponent<typeof VSelect>("[data-testid='language-select']");

				expect(languageSelect.props("items")).toHaveLength(4);
				expect(languageSelect.props("items")?.[0].name).toStrictEqual("common.words.languages.de");
				expect(languageSelect.props("items")?.[0].abbreviation).toStrictEqual("de");
				expect(languageSelect.props("items")?.[1].name).toStrictEqual("common.words.languages.en");
				expect(languageSelect.props("items")?.[1].abbreviation).toStrictEqual("en");
				expect(languageSelect.props("items")?.[2].name).toStrictEqual("common.words.languages.es");
				expect(languageSelect.props("items")?.[2].abbreviation).toStrictEqual("es");
			});
		});
	});

	describe("logo handling", () => {
		it("should initialize logoFile when school has a logo", async () => {
			const { wrapper, schoolDetails } = setup();
			await nextTick();

			const fileInput = wrapper.findComponent<typeof VFileInput>('[data-testid="school-logo-input"]');
			expect(fileInput.props("modelValue")).toBeInstanceOf(File);
			const modelValue = fileInput.props("modelValue");
			const file = Array.isArray(modelValue) ? modelValue[0] : modelValue;
			expect(file?.name).toBe(schoolDetails.logo?.name);
		});

		describe("when uploading a new logo", () => {
			it("should include logo in the update payload", async () => {
				const { wrapper, schoolStore, schoolDetails } = setup();

				const file = new File(["dummy-content"], "school-logo.png", {
					type: "image/png",
				});

				const fileInput = wrapper.findComponent<typeof VFileInput>('[data-testid="school-logo-input"]');
				fileInput.setValue(file);

				const buttonElement = wrapper.findComponent("[data-testid='save-general-setting']");
				await buttonElement.trigger("click");

				expect(toBase64).toHaveBeenCalledWith(file);
				expect(schoolStore.updateSchool).toHaveBeenCalledWith(
					schoolDetails.id,
					expect.objectContaining({
						logo: {
							dataUrl: "mock-base64-data",
							name: "school-logo.png",
						},
					})
				);
			});
		});

		describe("when saving without provided logo", () => {
			it("should call setSchoolLogo with empty values", async () => {
				const { wrapper, schoolStore } = setup();

				const fileInput = wrapper.findComponent<typeof VFileInput>('[data-testid="school-logo-input"]');
				fileInput.setValue(null);

				const buttonElement = wrapper.findComponent("[data-testid='save-general-setting']");
				await buttonElement.trigger("click");

				expect(schoolStore.updateSchool).toHaveBeenCalled();
			});
		});
	});

	describe("events", () => {
		it("update button should trigger save method", async () => {
			const { wrapper, schoolStore } = setup({
				schoolDetails: {
					county: {
						id: "5fa55eb53f472a2d986c8812",
						antaresKey: "BRB",
						countyId: 12051,
						name: "Brandenburg an der Havel",
					},
				},
			});

			const buttonElement = wrapper.findComponent("[data-testid='save-general-setting']");
			await buttonElement.trigger("click");

			expect(schoolStore.updateSchool).toHaveBeenCalled();
		});

		it("update works without county", async () => {
			const { wrapper, schoolStore } = setup({ schoolDetails: { county: undefined } });

			const buttonElement = wrapper.findComponent("[data-testid='save-general-setting']");
			await buttonElement.trigger("click");

			expect(schoolStore.updateSchool).toHaveBeenCalled();
		});

		it("show success notification on save", async () => {
			const { wrapper } = setup({ schoolDetails: { county: undefined } });

			const buttonElement = wrapper.findComponent("[data-testid='save-general-setting']");
			await buttonElement.trigger("click");

			expectNotification("success");
		});
	});

	describe("when title contains < sign directly followed by a string", () => {
		it("should contain validation error", async () => {
			const { wrapper } = setup({ schoolDetails: { county: undefined } });

			const title = wrapper.find('[data-testid="school-name"]').find("input");
			await title.setValue("<abc123");

			expect(wrapper.text()).toContain("common.validation.containsOpeningTag");
		});
	});
});
