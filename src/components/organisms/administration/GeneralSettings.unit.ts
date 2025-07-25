import {
	CountyResponse,
	FederalStateResponse,
	LanguageType,
	SchoolSystemResponse,
} from "@/serverApi/v3";
import { envConfigModule, schoolsModule } from "@/store";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import SchoolsModule from "@/store/schools";
import { envsFactory, schoolFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import GeneralSettings from "./GeneralSettings.vue";
import { mount } from "@vue/test-utils";
import { VSelect, VTextField } from "vuetify/components";
import { schoolYearResponseFactory } from "@@/tests/test-utils/factory/schoolYearResponseFactory";

describe("GeneralSettings", () => {
	beforeEach(() => {
		setupStores({
			authModule: AuthModule,
			schoolsModule: SchoolsModule,
			envConfigModule: EnvConfigModule,
		});
	});

	const setup = (
		options?: Partial<{
			officialSchoolNumber: string;
			county: CountyResponse;
			federalState: FederalStateResponse;
		}>
	) => {
		const { officialSchoolNumber, county, federalState } = {
			officialSchoolNumber: undefined,
			county: undefined,
			federalState: undefined,
			...options,
		};

		const envs = envsFactory.build({
			I18N__AVAILABLE_LANGUAGES: [
				LanguageType.De,
				LanguageType.En,
				LanguageType.Es,
				LanguageType.Uk,
			],
		});
		envConfigModule.setEnvs(envs);

		const school = schoolFactory.build({
			currentYear: schoolYearResponseFactory.build(),
			officialSchoolNumber,
			county,
			federalState,
		});

		schoolsModule.setSchool(school);

		const wrapper = mount(GeneralSettings, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});
		return { wrapper, school };
	};

	it("renders correctly", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	describe("displaying correct data", () => {
		describe("school name ", () => {
			it("should display the school name", () => {
				const { wrapper, school } = setup();

				const textField = wrapper.findComponent("[data-testid='school-name']");

				expect(textField.exists()).toBe(true);
				expect(textField.text()).toContain(school.name);
			});

			it("should not be possible to edit the school name if the school is synced", async () => {
				const syncedSystem: SchoolSystemResponse[] = [
					{
						id: "0000d186816abba584714c90",
						type: "ldap",
						ldapConfig: {
							provider: "iserv-idm",
						},
					},
				];
				schoolsModule.setSystems(syncedSystem);
				const { wrapper } = setup();

				const textField = wrapper.findComponent<typeof VTextField>(
					"[data-testid='school-name']"
				);
				expect(textField.props("disabled")).toBe(true);
			});

			it("should be possible to edit the school name if the school is not synced", async () => {
				const unsyncedSystem: SchoolSystemResponse[] = [
					{
						id: "0000d186816abba584714c91",
						type: "moodle",
					},
				];

				schoolsModule.setSystems(unsyncedSystem);
				const { wrapper } = setup();

				const textField = wrapper.findComponent<typeof VTextField>(
					"[data-testid='school-name']"
				);
				expect(textField.props("disabled")).toBe(false);
			});

			it("should be possible to edit the school name if the school is not attached to a system", async () => {
				schoolsModule.setSystems([]);
				const { wrapper } = setup();

				const textField = wrapper.findComponent<typeof VTextField>(
					"[data-testid='school-name']"
				);
				expect(textField.props("disabled")).toBe(false);
			});
		});

		describe("school year", () => {
			it("should display current year", () => {
				const { wrapper, school } = setup();

				const textField = wrapper.findComponent<typeof VTextField>(
					"[data-testid='school-year']"
				);

				expect(textField.exists()).toBe(true);
				expect(textField.props("modelValue")).toBe(school.currentYear?.name);
			});

			it("should show current school year as readonly", async () => {
				const { wrapper } = setup();

				const textField = wrapper.findComponent<typeof VTextField>(
					"[data-testid='school-year']"
				);

				expect(textField.exists()).toBe(true);
				expect(textField.props("readonly")).toBe(true);
			});
		});

		describe("school number", () => {
			it("school number text should be disabled if the number is set", async () => {
				const { wrapper, school } = setup({ officialSchoolNumber: "12345" });

				const textField = wrapper.findComponent<typeof VTextField>(
					"[data-testid='school-number']"
				);

				expect(textField.exists()).toBe(true);
				expect(textField.props("modelValue")).toBe(school.officialSchoolNumber);
				expect(textField.props("disabled")).toBe(true);
			});

			it("school number text should not be disabled if the number is not set", async () => {
				const { wrapper } = setup({ officialSchoolNumber: undefined });

				const textField = wrapper.findComponent<typeof VTextField>(
					"[data-testid='school-number']"
				);

				expect(textField.props("disabled")).toBe(false);
			});
		});

		describe("county selection", () => {
			it("should display the county selection", () => {
				const { wrapper } = setup();

				const select = wrapper.findComponent<typeof VSelect>(
					"[data-testid='school-counties']"
				);

				expect(select.exists()).toBe(true);
			});

			it("should render items in the county selection", () => {
				const { wrapper, school } = setup({
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
				});

				const select = wrapper.findComponent<typeof VSelect>(
					"[data-testid='school-counties']"
				);

				expect(select.props("items")).toEqual(school.federalState?.counties);
				expect(select.props("items")).toHaveLength(2);
			});

			it("should be disabled if county value is set", () => {
				const { wrapper } = setup({
					county: {
						id: "5fa55eb53f472a2d986c8812",
						antaresKey: "BRB",
						countyId: 12051,
						name: "Brandenburg an der Havel",
					},
				});

				const select = wrapper.findComponent<typeof VSelect>(
					"[data-testid='school-counties']"
				);

				expect(select.props("disabled")).toBe(true);
			});

			it("should not be disabled if the value is not set", async () => {
				const { wrapper } = setup({
					county: undefined,
				});

				const select = wrapper.findComponent<typeof VSelect>(
					"[data-testid='school-counties']"
				);

				expect(select.props("disabled")).toBe(false);
			});

			it("should display the correct county", () => {
				const { wrapper, school } = setup({
					county: {
						id: "5fa55eb53f472a2d986c8812",
						antaresKey: "BRB",
						countyId: 12051,
						name: "Brandenburg an der Havel",
					},
				});

				const select = wrapper.findComponent<typeof VSelect>(
					"[data-testid='school-counties']"
				);

				expect(select.props("modelValue")).toEqual(school.county);
			});
		});

		describe("logo element", () => {
			it("logo element should be found", async () => {
				const { wrapper } = setup();
				const logo = wrapper.find(".school-logo");

				expect(logo.exists()).toBe(true);
			});
		});

		describe("timezone input", () => {
			it("timezone input should display the correct data", async () => {
				const { wrapper, school } = setup();

				const timezoneInput = wrapper.findComponent<typeof VTextField>(
					"[data-testid='timezone-input']"
				);

				expect(timezoneInput.exists()).toBe(true);
				expect(timezoneInput.props("modelValue")).toBe(school.timezone);
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

				const languageSelect = wrapper.findComponent<typeof VSelect>(
					"[data-testid='language-select']"
				);

				expect(languageSelect.exists()).toBe(true);
			});

			it("should display select element with available languages", async () => {
				const { wrapper } = setup();

				const languageSelect = wrapper.findComponent<typeof VSelect>(
					"[data-testid='language-select']"
				);

				expect(languageSelect.props("items")).toHaveLength(4);
				expect(languageSelect.props("items")?.[0].name).toStrictEqual(
					"common.words.languages.de"
				);
				expect(languageSelect.props("items")?.[0].abbreviation).toStrictEqual(
					"de"
				);
				expect(languageSelect.props("items")?.[1].name).toStrictEqual(
					"common.words.languages.en"
				);
				expect(languageSelect.props("items")?.[1].abbreviation).toStrictEqual(
					"en"
				);
				expect(languageSelect.props("items")?.[2].name).toStrictEqual(
					"common.words.languages.es"
				);
				expect(languageSelect.props("items")?.[2].abbreviation).toStrictEqual(
					"es"
				);
			});
		});
	});

	describe("events", () => {
		it("update button should trigger save method", async () => {
			const updateSpy = vi.spyOn(schoolsModule, "update").mockResolvedValue();
			const { wrapper } = setup({
				county: {
					id: "5fa55eb53f472a2d986c8812",
					antaresKey: "BRB",
					countyId: 12051,
					name: "Brandenburg an der Havel",
				},
			});

			const buttonElement = wrapper.findComponent(
				"[data-testid='save-general-setting']"
			);
			await buttonElement.trigger("click");

			expect(updateSpy).toHaveBeenCalled();
		});

		it("update works without county", async () => {
			const updateSpy = vi.spyOn(schoolsModule, "update").mockResolvedValue();
			const { wrapper } = setup({ county: undefined });

			const buttonElement = wrapper.findComponent(
				"[data-testid='save-general-setting']"
			);
			await buttonElement.trigger("click");

			expect(updateSpy).toHaveBeenCalled();
		});
	});

	describe("when title contains < sign directly followed by a string", () => {
		it("should contain validation error", async () => {
			const { wrapper } = setup({ county: undefined });

			const title = wrapper.find('[data-testid="school-name"]').find("input");
			await title.setValue("<abc123");

			expect(wrapper.text()).toContain("common.validation.containsOpeningTag");
		});
	});
});
