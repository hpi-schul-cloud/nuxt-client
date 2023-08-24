import AdminMigrationSection from "@/components/administration/AdminMigrationSection.vue";
import EnvConfigModule from "@/store/env-config";
import SchoolsModule from "@/store/schools";
import { ENV_CONFIG_MODULE_KEY, I18N_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { Wrapper, mount, shallowMount } from "@vue/test-utils";
import { i18nMock, mockSchool } from "@@/tests/test-utils";

describe("AdminMigrationSection", () => {
	let schoolsModule: jest.Mocked<SchoolsModule>;
	let envConfigModule: jest.Mocked<EnvConfigModule>;

	const setup = (
		schoolGetters: Partial<SchoolsModule> = {},
		envConfigGetters: Partial<EnvConfigModule> = {}
	) => {
		document.body.setAttribute("data-app", "true");
		schoolsModule = createModuleMocks(SchoolsModule, {
			getOauthMigration: {
				enableMigrationStart: false,
				oauthMigrationPossible: false,
				oauthMigrationMandatory: false,
				oauthMigrationFinished: "",
				oauthMigrationFinalFinish: "",
			},
			getSchool: mockSchool,
			...schoolGetters,
		}) as jest.Mocked<SchoolsModule>;

		envConfigModule = createModuleMocks(EnvConfigModule, {
			getAccessibilityReportEmail: "nbc-support@netz-21.de",
			...envConfigGetters,
		});

		const wrapper: Wrapper<any> = mount(AdminMigrationSection, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
				schoolsModule,
				[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
			},
		});

		return {
			wrapper,
			envConfigModule,
			schoolsModule,
		};
	};

	describe("basic functions", () => {
		it("should render component", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(AdminMigrationSection).exists()).toBe(true);
		});
	});

	describe("inject", () => {
		it("should throw an error when schoolsModule injection fails", () => {
			expect(() =>
				shallowMount(AdminMigrationSection, {
					provide: {
						[I18N_KEY.valueOf()]: { t: (key: string) => key },
					},
				})
			).toThrow();
		});

		it("should throw an error when i18n injection fails", () => {
			expect(() => {
				shallowMount(AdminMigrationSection, {
					provide: {
						schoolsModule,
					},
				});
			}).toThrow();
		});
	});

	describe("supportLink", () => {
		it("should return support link without schoolnumber in subject", () => {
			const { wrapper } = setup({});

			const subject = encodeURIComponent(
				"Schule mit der Nummer: ??? soll keine Migration durchführen, Schuladministrator bittet um Unterstützung!"
			);
			const expectedLink = `"mailto:${envConfigModule.getAccessibilityReportEmail}?subject=${subject}"`;

			expect(wrapper.find('[data-testid="text-description"]').text()).toEqual(
				`components.administration.adminMigrationSection.description {"supportLink":${expectedLink}}`
			);
		});

		it("should return support link with schoolnumber in subject", () => {
			const { wrapper } = setup({
				getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
			});

			const subject = encodeURIComponent(
				"Schule mit der Nummer: 12345 soll keine Migration durchführen, Schuladministrator bittet um Unterstützung!"
			);
			const expectedLink = `"mailto:${envConfigModule.getAccessibilityReportEmail}?subject=${subject}"`;

			expect(wrapper.find('[data-testid="text-description"]').text()).toEqual(
				`components.administration.adminMigrationSection.description {"supportLink":${expectedLink}}`
			);
		});
	});

	describe("Migration Control Section", () => {
		it("should render migration control section when grace period is not expired", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: false,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});
			expect(
				wrapper.find('[data-testId="migration-control-section"]').exists()
			).toEqual(true);
		});

		it("should not render migration description when grace period is expired", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: new Date(2023, 1, 1).toString(),
					oauthMigrationFinalFinish: new Date(2023, 1, 2).toString(),
				},
			});
			jest.useFakeTimers();
			jest.setSystemTime(new Date(2023, 1, 3));

			expect(
				wrapper.find('[data-testId="migration-control-section"]').exists()
			).toBe(false);
		});
	});

	describe("Info Text", () => {
		it("should display the info text for migration when it is not started", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: false,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const text: string = wrapper.findComponent({ name: "v-alert" }).text();

			expect(text).toStrictEqual(
				"components.administration.adminMigrationSection.infoText"
			);
		});

		it("should display the info text activeMigration when the admin activated the migration", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: false,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const text: string = wrapper.findComponent({ name: "v-alert" }).text();

			expect(text).toStrictEqual(
				"components.administration.adminMigrationSection.migrationActive"
			);
		});
	});

	describe("Mandatory Switch", () => {
		it("should be enabled when migration is available", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: false,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});
			const switchComponent = wrapper.findComponent({ name: "v-switch" });

			expect(switchComponent.isVisible()).toBe(true);
			expect(switchComponent.props("disabled")).toBeFalsy();
		});

		it("should be disabled when migration is not available", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: false,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const switchComponent = wrapper.findComponent({ name: "v-switch" });

			expect(switchComponent.isVisible()).toBe(true);
			expect(switchComponent.props("disabled")).toBeTruthy();
		});

		it("should set school oauth migration to mandatory, when click have been triggered", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: false,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const switchComponent = wrapper.findComponent({ name: "v-switch" });
			switchComponent.vm.$emit("change", true);

			expect(schoolsModule.setSchoolOauthMigration).toHaveBeenCalledWith({
				oauthMigrationPossible: true,
				oauthMigrationMandatory: true,
				oauthMigrationFinished: false,
			});
		});

		it("should set school oauth migration to optional, when click has been triggered again", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: false,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: true,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const switchComponent = wrapper.findComponent({ name: "v-switch" });
			switchComponent.vm.$emit("change", false);

			expect(schoolsModule.setSchoolOauthMigration).toHaveBeenCalledWith({
				oauthMigrationPossible: true,
				oauthMigrationMandatory: false,
				oauthMigrationFinished: false,
			});
		});
	});

	describe("Migration start button", () => {
		it("should be enabled when migration is enabled", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});
			const buttonComponent = wrapper.findComponent({ name: "v-btn" });

			expect(buttonComponent.exists()).toBe(true);
			expect(buttonComponent.classes("button-start")).toBeTruthy();
			expect(buttonComponent.text()).toEqual(
				"components.administration.adminMigrationSection.migrationEnableButton.label"
			);
			expect(buttonComponent.props("disabled")).toBeFalsy();
		});

		it("should be disabled when migration is not enabled", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: false,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const buttonComponent = wrapper.findComponent({ name: "v-btn" });

			expect(buttonComponent.exists()).toBe(true);
			expect(buttonComponent.classes("button-start")).toBeTruthy();
			expect(buttonComponent.text()).toEqual(
				"components.administration.adminMigrationSection.migrationEnableButton.label"
			);
			expect(buttonComponent.props("disabled")).toBeTruthy();
		});

		it("should not render migration start button when grace period is expired", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: new Date(2023, 1, 1).toString(),
					oauthMigrationFinalFinish: new Date(2023, 1, 2).toString(),
				},
			});
			jest.useFakeTimers();
			jest.setSystemTime(new Date(2023, 1, 3));

			const buttonComponent = wrapper.find(
				"[data-testId=migration-start-button]"
			);

			expect(buttonComponent.exists()).toBe(false);
		});

		it("should not render migration start button and migration mandatory switch, when click has been triggered", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			const switchComponent = wrapper.findComponent({ name: "v-switch" });
			await buttonComponent.vm.$emit("click");

			expect(buttonComponent.exists()).toBe(false);
			expect(switchComponent.isVisible()).toBe(false);
		});
	});

	describe("Migration end button", () => {
		it("should exist and be enabled when migration has started", () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const buttonComponent = wrapper.findComponent({ name: "v-btn" });

			expect(buttonComponent.exists()).toBe(true);
			expect(buttonComponent.classes("button-end")).toBeTruthy();
			expect(buttonComponent.text()).toEqual(
				"components.administration.adminMigrationSection.migrationEndButton.label"
			);
			expect(buttonComponent.props("disabled")).toBeFalsy();
		});

		it("should should not render migration end button and migration mandatory switch, when click has been triggered", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			const switchComponent = wrapper.findComponent({ name: "v-switch" });
			await buttonComponent.vm.$emit("click");

			expect(buttonComponent.exists()).toBe(false);
			expect(switchComponent.isVisible()).toBe(false);
		});
	});

	describe("Migration warning card", () => {
		describe("when migration start button is clicked", () => {
			it("should be rendered", async () => {
				const { wrapper } = setup({
					getOauthMigration: {
						enableMigrationStart: true,
						oauthMigrationPossible: false,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: "",
						oauthMigrationFinalFinish: "",
					},
				});
				const buttonComponent = wrapper.findComponent({ name: "v-btn" });
				await buttonComponent.vm.$emit("click");

				const cardComponent = wrapper.findComponent({ name: "v-card" });

				expect(cardComponent.exists()).toBe(true);
			});
		});
	});

	describe("when agree button of card is clicked", () => {
		it("should not render the card and start migration", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});
			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			await buttonComponent.vm.$emit("click");

			const cardComponent = wrapper.findComponent({ name: "v-card" });
			const cardButtonAgree = cardComponent.find("[data-testId=agree-btn]");
			await cardButtonAgree.vm.$emit("click");

			expect(cardComponent.exists()).toBe(false);
			expect(schoolsModule.setSchoolOauthMigration).toHaveBeenCalledWith({
				oauthMigrationPossible: true,
				oauthMigrationMandatory: false,
				oauthMigrationFinished: false,
			});
		});
	});

	describe("when disagree button of card is clicked", () => {
		it("should not render the card and not start migration", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});
			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			await buttonComponent.vm.$emit("click");

			const cardComponent = wrapper.findComponent({ name: "v-card" });
			const cardButtonDisagree = cardComponent.find(
				"[data-testId=disagree-btn]"
			);
			await cardButtonDisagree.vm.$emit("click");

			expect(cardComponent.exists()).toBe(false);
			expect(schoolsModule.getOauthMigration).toStrictEqual({
				oauthMigrationPossible: false,
				oauthMigrationMandatory: false,
				oauthMigrationFinished: "",
				oauthMigrationFinalFinish: "",
				enableMigrationStart: true,
			});
		});
	});

	describe("when migration end button is clicked", () => {
		it("should be rendered", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			await buttonComponent.vm.$emit("click");

			const cardComponent = wrapper.findComponent({ name: "v-card" });

			expect(cardComponent.exists()).toBe(true);
		});
	});

	describe("when agree button of card is clicked", () => {
		it("should not render the card and complete migration", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});
			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			await buttonComponent.vm.$emit("click");

			const cardComponent = wrapper.findComponent({ name: "v-card" });
			const cardButtonAgree = cardComponent.find("[data-testid=agree-btn]");
			await cardButtonAgree.vm.$emit("click");

			expect(cardComponent.exists()).toBe(false);
			expect(schoolsModule.setSchoolOauthMigration).toHaveBeenCalledWith({
				oauthMigrationPossible: false,
				oauthMigrationMandatory: false,
				oauthMigrationFinished: true,
			});
		});
	});

	describe("when disagree button of card is clicked", () => {
		it("should not render the card and not complete migration", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});
			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			await buttonComponent.vm.$emit("click");

			const cardComponent = wrapper.findComponent({ name: "v-card" });
			const cardButtonDisagree = cardComponent.find(
				"[data-testid=disagree-btn]"
			);
			await cardButtonDisagree.vm.$emit("click");

			expect(cardComponent.exists()).toBe(false);
			expect(schoolsModule.getOauthMigration).toStrictEqual({
				oauthMigrationPossible: true,
				oauthMigrationMandatory: false,
				oauthMigrationFinished: "",
				oauthMigrationFinalFinish: "",
				enableMigrationStart: true,
			});
		});
	});

	describe("when checkbox is unchecked", () => {
		it("should let agree-button be disabled", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});
			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			await buttonComponent.vm.$emit("click");

			const cardComponent = wrapper.findComponent({ name: "v-card" });
			const cardButtonAgree = cardComponent.find("[data-testid=agree-btn]");

			expect(cardButtonAgree.props("disabled")).toBeTruthy();
		});
	});

	describe("when checkbox is checked", () => {
		it("should make agree-button be enabled", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: true,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});
			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			await buttonComponent.vm.$emit("click");

			const cardComponent = wrapper.findComponent({ name: "v-card" });
			const checkBoxComponent = cardComponent.find(
				"[data-testid=migration-confirmation-checkbox]"
			);
			await checkBoxComponent.setChecked();

			const cardButtonAgree = cardComponent.find("[data-testid=agree-btn]");

			expect(cardButtonAgree.props("disabled")).toBeFalsy();
		});
	});

	describe("Date paragraph", () => {
		it("should exist when migration has been completed", async () => {
			jest.useFakeTimers();
			jest.setSystemTime(new Date(2023, 1, 2));
			const date: string = new Date(2023, 1, 1).toDateString();
			const laterDate: string = new Date(2023, 1, 3).toDateString();
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: date,
					oauthMigrationFinalFinish: laterDate,
				},
			});

			const paragraph = wrapper.find(".migration-completion-date");

			expect(paragraph.exists()).toBe(true);
			expect(paragraph.text()).toContain(
				`components.administration.adminMigrationSection.oauthMigrationFinished.text`
			);
		});

		it("should show finalFinish text when migration grace period has expired", async () => {
			jest.useFakeTimers();
			jest.setSystemTime(new Date(2023, 1, 4));
			const date: string = new Date(2023, 1, 1).toDateString();
			const laterDate: string = new Date(2023, 1, 3).toDateString();
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: date,
					oauthMigrationFinalFinish: laterDate,
				},
			});

			const paragraph = wrapper.find(".migration-completion-date");

			expect(paragraph.exists()).toBe(true);
			expect(paragraph.text()).toContain(
				`components.administration.adminMigrationSection.oauthMigrationFinished.textComplete`
			);
		});

		it("should not exist when migration has not been completed", async () => {
			const { wrapper } = setup({
				getOauthMigration: {
					enableMigrationStart: true,
					oauthMigrationPossible: false,
					oauthMigrationMandatory: false,
					oauthMigrationFinished: "",
					oauthMigrationFinalFinish: "",
				},
			});

			const paragraph = wrapper.find(".migration-completion-date");

			expect(paragraph.exists()).toBe(false);
		});
	});

	describe("FEATURE_SHOW_OUTDATED_USERS", () => {
		describe("when feature is set to false", () => {
			it("should hide switch button and description", () => {
				const { wrapper } = setup(
					{},
					{
						getShowOutdatedUsers: false,
					}
				);

				const switchComponent = wrapper.find(
					'[data-testid="show-outdated-users-switch"]'
				);
				const paragraph = wrapper.find(
					'[data-testid="show-outdated-users-description"]'
				);

				expect(switchComponent.exists()).toBe(false);
				expect(paragraph.exists()).toBe(false);
			});
		});

		describe("when feature is set to true", () => {
			it("should show switch button and description", () => {
				const { wrapper } = setup(
					{},
					{
						getShowOutdatedUsers: true,
					}
				);

				const switchComponent = wrapper.find(
					'[data-testid="show-outdated-users-switch"]'
				);
				const paragraph = wrapper.find(
					'[data-testid="show-outdated-users-description"]'
				);

				expect(switchComponent.exists()).toBe(true);
				expect(paragraph.exists()).toBe(true);
			});
		});
	});

	describe("switch button for school feature showOutdatedUsers", () => {
		describe("when clicking switch button", () => {
			it("should call update in schoolsModule", async () => {
				const { wrapper, schoolsModule } = setup(
					{},
					{
						getShowOutdatedUsers: true,
					}
				);
				const switchComponent = wrapper.find(
					'[data-testid="show-outdated-users-switch"]'
				);

				await switchComponent.setChecked();

				expect(schoolsModule.update).toHaveBeenCalledWith({
					id: mockSchool.id,
					features: { ...mockSchool.features, showOutdatedUsers: true },
				});
			});
		});
	});

	describe("switch button for school feature enableSyncDuringMigration", () => {
		describe("when user login migration is finished", () => {
			it("should hide switch button", () => {
				const date: string = new Date(2023, 1, 1).toDateString();
				const { wrapper } = setup({
					getOauthMigration: {
						enableMigrationStart: true,
						oauthMigrationPossible: false,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: date,
						oauthMigrationFinalFinish: date,
					},
				});

				const switchComponent = wrapper.find(
					'[data-testid="enable-sync-during-migration-switch"]'
				);

				expect(switchComponent.exists()).toBe(false);
			});
		});

		describe("when migration is not yet finished", () => {
			it("should show switch button and description", () => {
				const { wrapper } = setup({
					getOauthMigration: {
						enableMigrationStart: true,
						oauthMigrationPossible: false,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: "",
						oauthMigrationFinalFinish: "",
					},
				});

				const switchComponent = wrapper.find(
					'[data-testid="enable-sync-during-migration-switch"]'
				);

				expect(switchComponent.exists()).toBe(true);
			});
		});
	});

	describe("switch button for school feature enableSyncDuringMigration", () => {
		describe("when clicking switch button", () => {
			it("should call update in schoolsModule", async () => {
				const { wrapper, schoolsModule } = setup({});
				const switchComponent = wrapper.find(
					'[data-testid="enable-sync-during-migration-switch"]'
				);

				await switchComponent.setChecked();

				expect(schoolsModule.update).toHaveBeenCalledWith({
					id: mockSchool.id,
					features: { ...mockSchool.features, enableSyncDuringMigration: true },
				});
			});
		});
	});
});
