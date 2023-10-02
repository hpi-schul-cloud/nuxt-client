import AdminMigrationSection from "@/components/administration/AdminMigrationSection.vue";
import EnvConfigModule from "@/store/env-config";
import SchoolsModule from "@/store/schools";
import {
	ENV_CONFIG_MODULE_KEY,
	I18N_KEY,
	SCHOOLS_MODULE_KEY,
	USER_LOGIN_MIGRATION_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { Wrapper, mount } from "@vue/test-utils";
import { i18nMock, mockSchool } from "@@/tests/test-utils";
import UserLoginMigrationModule from "@/store/user-login-migrations";

describe("AdminMigrationSection", () => {
	let schoolsModule: jest.Mocked<SchoolsModule>;
	let userLoginMigrationModule: jest.Mocked<UserLoginMigrationModule>;
	let envConfigModule: jest.Mocked<EnvConfigModule>;

	const setup = (
		schoolGetters: Partial<SchoolsModule> = {},
		userLoginMigrationGetters: Partial<UserLoginMigrationModule> = {},
		envConfigGetters: Partial<EnvConfigModule> = {}
	) => {
		document.body.setAttribute("data-app", "true");

		userLoginMigrationModule = createModuleMocks(UserLoginMigrationModule, {
			getUserLoginMigration: {
				sourceSystemId: "sourceSystemId",
				targetSystemId: "targetSystemId",
				startedAt: new Date(2000, 1, 1, 0, 0),
				closedAt: undefined,
				finishedAt: undefined,
				mandatorySince: undefined,
			},
			...userLoginMigrationGetters,
		}) as jest.Mocked<UserLoginMigrationModule>;

		schoolsModule = createModuleMocks(SchoolsModule, {
			getOauthMigration: {
				enableMigrationStart: false,
				oauthMigrationPossible: false,
				oauthMigrationMandatory: false,
				oauthMigrationFinished: "",
				oauthMigrationFinalFinish: "",
			},
			getSchool: { ...mockSchool, officialSchoolNumber: undefined },
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
				[SCHOOLS_MODULE_KEY.valueOf()]: schoolsModule,
				[USER_LOGIN_MIGRATION_MODULE_KEY.valueOf()]: userLoginMigrationModule,
				[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
			},
		});

		return {
			wrapper,
			envConfigModule,
			schoolsModule,
			userLoginMigrationModule,
		};
	};

	describe("basic functions", () => {
		it("should render component", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(AdminMigrationSection).exists()).toBe(true);
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
			const { wrapper } = setup(
				{
					getOauthMigration: {
						enableMigrationStart: false,
						oauthMigrationPossible: false,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: "",
						oauthMigrationFinalFinish: "",
					},
				},
				{
					getUserLoginMigration: {
						sourceSystemId: "sourceSystemId",
						targetSystemId: "targetSystemId",
						startedAt: new Date(2023, 1, 1),
						closedAt: undefined,
						finishedAt: undefined,
						mandatorySince: undefined,
					},
				}
			);
			expect(
				wrapper.find('[data-testId="migration-control-section"]').exists()
			).toEqual(true);
		});

		it("should not render migration description when grace period is expired", () => {
			const { wrapper } = setup(
				{
					getOauthMigration: {
						enableMigrationStart: true,
						oauthMigrationPossible: false,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: new Date(2023, 1, 1).toString(),
						oauthMigrationFinalFinish: new Date(2023, 1, 2).toString(),
					},
				},
				{
					getUserLoginMigration: {
						sourceSystemId: "sourceSystemId",
						targetSystemId: "targetSystemId",
						startedAt: new Date(2023, 1, 1),
						closedAt: new Date(2023, 1, 1),
						finishedAt: new Date(2023, 1, 2),
						mandatorySince: undefined,
					},
				}
			);
			jest.useFakeTimers();
			jest.setSystemTime(new Date(2023, 1, 3));

			expect(
				wrapper.find('[data-testId="migration-control-section"]').exists()
			).toBe(false);
		});
	});

	describe("Info Text", () => {
		it("should display the info text for migration when it is not started", () => {
			const { wrapper } = setup(
				{
					getOauthMigration: {
						enableMigrationStart: false,
						oauthMigrationPossible: false,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: "",
						oauthMigrationFinalFinish: "",
					},
				},
				{
					getUserLoginMigration: undefined,
				}
			);

			const text: string = wrapper.findComponent({ name: "v-alert" }).text();

			expect(text).toStrictEqual(
				"components.administration.adminMigrationSection.infoText"
			);
		});

		it("should display the info text activeMigration when the admin activated the migration", () => {
			const { wrapper } = setup(
				{
					getOauthMigration: {
						enableMigrationStart: false,
						oauthMigrationPossible: true,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: "",
						oauthMigrationFinalFinish: "",
					},
				},
				{
					getUserLoginMigration: {
						sourceSystemId: "sourceSystemId",
						targetSystemId: "targetSystemId",
						startedAt: new Date(2023, 1, 1),
						closedAt: undefined,
						finishedAt: undefined,
						mandatorySince: undefined,
					},
				}
			);

			const text: string = wrapper.findComponent({ name: "v-alert" }).text();

			expect(text).toStrictEqual(
				"components.administration.adminMigrationSection.migrationActive"
			);
		});
	});

	describe("Mandatory Switch", () => {
		it("should be enabled when migration is available", () => {
			const { wrapper } = setup(
				{
					getOauthMigration: {
						enableMigrationStart: false,
						oauthMigrationPossible: true,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: "",
						oauthMigrationFinalFinish: "",
					},
				},
				{
					getUserLoginMigration: {
						sourceSystemId: "sourceSystemId",
						targetSystemId: "targetSystemId",
						startedAt: new Date(2023, 1, 1),
						closedAt: undefined,
						finishedAt: undefined,
						mandatorySince: undefined,
					},
				}
			);
			const switchComponent = wrapper.findComponent({ name: "v-switch" });

			expect(switchComponent.isVisible()).toBe(true);
			expect(switchComponent.props("disabled")).toBeFalsy();
		});

		it("should be disabled when migration is not available", () => {
			const { wrapper } = setup(
				{
					getOauthMigration: {
						enableMigrationStart: false,
						oauthMigrationPossible: false,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: "",
						oauthMigrationFinalFinish: "",
					},
				},
				{
					getUserLoginMigration: undefined,
				}
			);

			const switchComponent = wrapper.findComponent({ name: "v-switch" });

			expect(switchComponent.isVisible()).toBe(true);
			expect(switchComponent.props("disabled")).toBeTruthy();
		});

		it("should set school oauth migration to mandatory, when click have been triggered", () => {
			const { wrapper } = setup(
				{
					getOauthMigration: {
						enableMigrationStart: false,
						oauthMigrationPossible: true,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: "",
						oauthMigrationFinalFinish: "",
					},
				},
				{
					getUserLoginMigration: {
						sourceSystemId: "sourceSystemId",
						targetSystemId: "targetSystemId",
						startedAt: new Date(2023, 1, 1),
						closedAt: undefined,
						finishedAt: undefined,
						mandatorySince: undefined,
					},
				}
			);

			const switchComponent = wrapper.findComponent({ name: "v-switch" });
			switchComponent.vm.$emit("change", true);

			expect(
				userLoginMigrationModule.setUserLoginMigrationMandatory
			).toHaveBeenCalledWith(true);
		});

		it("should set school oauth migration to optional, when click has been triggered again", () => {
			const { wrapper } = setup(
				{
					getOauthMigration: {
						enableMigrationStart: false,
						oauthMigrationPossible: true,
						oauthMigrationMandatory: true,
						oauthMigrationFinished: "",
						oauthMigrationFinalFinish: "",
					},
				},
				{
					getUserLoginMigration: {
						sourceSystemId: "sourceSystemId",
						targetSystemId: "targetSystemId",
						startedAt: new Date(2023, 1, 1),
						closedAt: undefined,
						finishedAt: undefined,
						mandatorySince: new Date(2023, 1, 1),
					},
				}
			);

			const switchComponent = wrapper.findComponent({ name: "v-switch" });
			switchComponent.vm.$emit("change", false);

			expect(
				userLoginMigrationModule.setUserLoginMigrationMandatory
			).toHaveBeenCalledWith(false);
		});
	});

	describe("Migration start button", () => {
		it("should be enabled when migration is enabled", () => {
			const { wrapper } = setup(
				{
					getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
				},
				{
					getUserLoginMigration: undefined,
				}
			);

			const buttonComponent = wrapper.findComponent({ name: "v-btn" });

			expect(buttonComponent.exists()).toBe(true);
			expect(buttonComponent.classes("button-start")).toBeTruthy();
			expect(buttonComponent.text()).toEqual(
				"components.administration.adminMigrationSection.migrationEnableButton.label"
			);
			expect(buttonComponent.props("disabled")).toBeFalsy();
		});

		it("should be disabled when migration is not enabled", () => {
			const { wrapper } = setup(
				{
					getOauthMigration: {
						enableMigrationStart: false,
						oauthMigrationPossible: false,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: "",
						oauthMigrationFinalFinish: "",
					},
				},
				{
					getUserLoginMigration: undefined,
				}
			);

			const buttonComponent = wrapper.findComponent({ name: "v-btn" });

			expect(buttonComponent.exists()).toBe(true);
			expect(buttonComponent.classes("button-start")).toBeTruthy();
			expect(buttonComponent.text()).toEqual(
				"components.administration.adminMigrationSection.migrationEnableButton.label"
			);
			expect(buttonComponent.props("disabled")).toBeTruthy();
		});

		it("should not render migration start button when grace period is expired", () => {
			const { wrapper } = setup(
				{
					getOauthMigration: {
						enableMigrationStart: true,
						oauthMigrationPossible: false,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: new Date(2023, 1, 1).toString(),
						oauthMigrationFinalFinish: new Date(2023, 1, 2).toString(),
					},
				},
				{
					getUserLoginMigration: {
						sourceSystemId: "sourceSystemId",
						targetSystemId: "targetSystemId",
						startedAt: new Date(2023, 1, 1),
						closedAt: new Date(2023, 1, 1),
						finishedAt: new Date(2023, 1, 2),
						mandatorySince: undefined,
					},
				}
			);
			jest.useFakeTimers();
			jest.setSystemTime(new Date(2023, 1, 3));

			const buttonComponent = wrapper.find(
				"[data-testId=migration-start-button]"
			);

			expect(buttonComponent.exists()).toBe(false);
		});

		it("should not render migration start button and migration mandatory switch, when click has been triggered", async () => {
			const { wrapper } = setup(
				{
					getOauthMigration: {
						enableMigrationStart: true,
						oauthMigrationPossible: false,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: "",
						oauthMigrationFinalFinish: "",
					},
					getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
				},
				{
					getUserLoginMigration: undefined,
				}
			);

			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			const switchComponent = wrapper.findComponent({ name: "v-switch" });
			await buttonComponent.vm.$emit("click");

			expect(buttonComponent.exists()).toBe(false);
			expect(switchComponent.isVisible()).toBe(false);
		});
	});

	describe("Migration end button", () => {
		it("should exist and be enabled when migration has started", () => {
			const { wrapper } = setup(
				{
					getOauthMigration: {
						enableMigrationStart: true,
						oauthMigrationPossible: true,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: "",
						oauthMigrationFinalFinish: "",
					},
				},
				{
					getUserLoginMigration: {
						sourceSystemId: "sourceSystemId",
						targetSystemId: "targetSystemId",
						startedAt: new Date(2023, 1, 1),
						closedAt: undefined,
						finishedAt: undefined,
						mandatorySince: undefined,
					},
				}
			);

			const buttonComponent = wrapper.findComponent({ name: "v-btn" });

			expect(buttonComponent.exists()).toBe(true);
			expect(buttonComponent.classes("button-end")).toBeTruthy();
			expect(buttonComponent.text()).toEqual(
				"components.administration.adminMigrationSection.migrationEndButton.label"
			);
			expect(buttonComponent.props("disabled")).toBeFalsy();
		});

		it("should should not render migration end button and migration mandatory switch, when click has been triggered", async () => {
			const { wrapper } = setup(
				{
					getOauthMigration: {
						enableMigrationStart: true,
						oauthMigrationPossible: true,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: "",
						oauthMigrationFinalFinish: "",
					},
					getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
				},
				{
					getUserLoginMigration: {
						sourceSystemId: "sourceSystemId",
						targetSystemId: "targetSystemId",
						startedAt: new Date(2023, 1, 1),
						closedAt: undefined,
						finishedAt: undefined,
						mandatorySince: undefined,
					},
				}
			);

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
				const { wrapper } = setup(
					{
						getOauthMigration: {
							enableMigrationStart: true,
							oauthMigrationPossible: false,
							oauthMigrationMandatory: false,
							oauthMigrationFinished: "",
							oauthMigrationFinalFinish: "",
						},
						getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
					},
					{
						getUserLoginMigration: undefined,
					}
				);

				const buttonComponent = wrapper.findComponent({ name: "v-btn" });
				await buttonComponent.vm.$emit("click");

				const cardComponent = wrapper.findComponent({ name: "v-card" });

				expect(cardComponent.exists()).toBe(true);
			});

			describe("when agree button of start warning card is clicked", () => {
				it("should not render the card and start migration", async () => {
					const { wrapper } = setup(
						{
							getOauthMigration: {
								enableMigrationStart: true,
								oauthMigrationPossible: false,
								oauthMigrationMandatory: false,
								oauthMigrationFinished: "",
								oauthMigrationFinalFinish: "",
							},
							getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
						},
						{
							getUserLoginMigration: undefined,
						}
					);
					const buttonComponent = wrapper.findComponent({ name: "v-btn" });
					await buttonComponent.vm.$emit("click");

					const cardComponent = wrapper.findComponent({ name: "v-card" });
					const cardButtonAgree = cardComponent.find("[data-testId=agree-btn]");
					await cardButtonAgree.vm.$emit("click");

					expect(cardComponent.exists()).toBe(false);
					expect(
						userLoginMigrationModule.startUserLoginMigration
					).toHaveBeenCalled();
					expect(
						userLoginMigrationModule.fetchLatestUserLoginMigrationForCurrentUser
					).toHaveBeenCalled();
				});
			});
		});

		describe("when disagree button of card is clicked", () => {
			it("should not render the card and not start migration", async () => {
				const { wrapper } = setup(
					{
						getOauthMigration: {
							enableMigrationStart: true,
							oauthMigrationPossible: false,
							oauthMigrationMandatory: false,
							oauthMigrationFinished: "",
							oauthMigrationFinalFinish: "",
						},
						getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
					},
					{
						getUserLoginMigration: undefined,
					}
				);
				const buttonComponent = wrapper.findComponent({ name: "v-btn" });
				await buttonComponent.vm.$emit("click");

				const cardComponent = wrapper.findComponent({ name: "v-card" });
				const cardButtonDisagree = cardComponent.find(
					"[data-testId=disagree-btn]"
				);
				await cardButtonDisagree.vm.$emit("click");

				expect(cardComponent.exists()).toBe(false);
				expect(userLoginMigrationModule.getUserLoginMigration).toStrictEqual(
					undefined
				);
			});
		});

		describe("when migration end button is clicked", () => {
			it("should be rendered", async () => {
				const { wrapper } = setup(
					{
						getOauthMigration: {
							enableMigrationStart: true,
							oauthMigrationPossible: true,
							oauthMigrationMandatory: false,
							oauthMigrationFinished: "",
							oauthMigrationFinalFinish: "",
						},
						getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
					},
					{
						getUserLoginMigration: {
							sourceSystemId: "sourceSystemId",
							targetSystemId: "targetSystemId",
							startedAt: new Date(2023, 1, 1),
							closedAt: undefined,
							finishedAt: undefined,
							mandatorySince: undefined,
						},
					}
				);

				const buttonComponent = wrapper.findComponent({ name: "v-btn" });
				await buttonComponent.vm.$emit("click");

				const cardComponent = wrapper.findComponent({ name: "v-card" });

				expect(cardComponent.exists()).toBe(true);
			});
		});

		describe("when agree button of end warning card is clicked", () => {
			it("should not render the card and complete migration", async () => {
				const { wrapper } = setup(
					{
						getOauthMigration: {
							enableMigrationStart: true,
							oauthMigrationPossible: true,
							oauthMigrationMandatory: false,
							oauthMigrationFinished: "",
							oauthMigrationFinalFinish: "",
						},
						getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
					},
					{
						getUserLoginMigration: {
							sourceSystemId: "sourceSystemId",
							targetSystemId: "targetSystemId",
							startedAt: new Date(2023, 1, 1),
							closedAt: undefined,
							finishedAt: undefined,
							mandatorySince: undefined,
						},
					}
				);
				const buttonComponent = wrapper.findComponent({ name: "v-btn" });
				await buttonComponent.vm.$emit("click");

				const cardComponent = wrapper.findComponent({ name: "v-card" });
				const cardButtonAgree = cardComponent.find("[data-testid=agree-btn]");
				await cardButtonAgree.vm.$emit("click");

				expect(cardComponent.exists()).toBe(false);
				expect(
					userLoginMigrationModule.closeUserLoginMigration
				).toHaveBeenCalled();
				expect(
					userLoginMigrationModule.fetchLatestUserLoginMigrationForCurrentUser
				).toHaveBeenCalled();
			});
		});

		describe("when disagree button of card is clicked", () => {
			it("should not render the card and not complete migration", async () => {
				const { wrapper } = setup(
					{
						getOauthMigration: {
							enableMigrationStart: true,
							oauthMigrationPossible: true,
							oauthMigrationMandatory: false,
							oauthMigrationFinished: "",
							oauthMigrationFinalFinish: "",
						},
						getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
					},
					{
						getUserLoginMigration: {
							sourceSystemId: "sourceSystemId",
							targetSystemId: "targetSystemId",
							startedAt: new Date(2023, 1, 1),
							closedAt: undefined,
							finishedAt: undefined,
							mandatorySince: undefined,
						},
					}
				);
				const buttonComponent = wrapper.findComponent({ name: "v-btn" });
				await buttonComponent.vm.$emit("click");

				const cardComponent = wrapper.findComponent({ name: "v-card" });
				const cardButtonDisagree = cardComponent.find(
					"[data-testid=disagree-btn]"
				);
				await cardButtonDisagree.vm.$emit("click");

				expect(cardComponent.exists()).toBe(false);
				expect(userLoginMigrationModule.getUserLoginMigration).toStrictEqual({
					sourceSystemId: "sourceSystemId",
					targetSystemId: "targetSystemId",
					startedAt: new Date(2023, 1, 1),
					closedAt: undefined,
					finishedAt: undefined,
					mandatorySince: undefined,
				});
			});
		});

		describe("when checkbox is unchecked", () => {
			it("should let agree-button be disabled", async () => {
				const { wrapper } = setup(
					{
						getOauthMigration: {
							enableMigrationStart: true,
							oauthMigrationPossible: true,
							oauthMigrationMandatory: false,
							oauthMigrationFinished: "",
							oauthMigrationFinalFinish: "",
						},
						getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
					},
					{
						getUserLoginMigration: {
							sourceSystemId: "sourceSystemId",
							targetSystemId: "targetSystemId",
							startedAt: new Date(2023, 1, 1),
							closedAt: undefined,
							finishedAt: undefined,
							mandatorySince: undefined,
						},
					}
				);
				const buttonComponent = wrapper.findComponent({ name: "v-btn" });
				await buttonComponent.vm.$emit("click");

				const cardComponent = wrapper.findComponent({ name: "v-card" });
				const cardButtonAgree = cardComponent.find("[data-testid=agree-btn]");

				expect(cardButtonAgree.props("disabled")).toBeTruthy();
			});
		});

		describe("when checkbox is checked", () => {
			it("should make agree-button be enabled", async () => {
				const { wrapper } = setup(
					{
						getOauthMigration: {
							enableMigrationStart: true,
							oauthMigrationPossible: true,
							oauthMigrationMandatory: false,
							oauthMigrationFinished: "",
							oauthMigrationFinalFinish: "",
						},
						getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
					},
					{
						getUserLoginMigration: {
							sourceSystemId: "sourceSystemId",
							targetSystemId: "targetSystemId",
							startedAt: new Date(2023, 1, 1),
							closedAt: undefined,
							finishedAt: undefined,
							mandatorySince: undefined,
						},
					}
				);
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
	});

	describe("Date paragraph", () => {
		it("should exist when migration has been completed", async () => {
			jest.useFakeTimers();
			jest.setSystemTime(new Date(2023, 1, 2));
			const date: string = new Date(2023, 1, 1).toDateString();
			const laterDate: string = new Date(2023, 1, 3).toDateString();
			const { wrapper } = setup(
				{
					getOauthMigration: {
						enableMigrationStart: true,
						oauthMigrationPossible: false,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: date,
						oauthMigrationFinalFinish: laterDate,
					},
					getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
				},
				{
					getUserLoginMigration: {
						sourceSystemId: "sourceSystemId",
						targetSystemId: "targetSystemId",
						startedAt: new Date(2023, 1, 1),
						closedAt: new Date(2023, 1, 2),
						finishedAt: new Date(2023, 1, 14),
						mandatorySince: undefined,
					},
				}
			);

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
			const { wrapper } = setup(
				{
					getOauthMigration: {
						enableMigrationStart: true,
						oauthMigrationPossible: false,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: date,
						oauthMigrationFinalFinish: laterDate,
					},
					getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
				},
				{
					getUserLoginMigration: {
						sourceSystemId: "sourceSystemId",
						targetSystemId: "targetSystemId",
						startedAt: new Date(2023, 1, 1),
						closedAt: new Date(2023, 1, 1),
						finishedAt: new Date(2023, 1, 3),
						mandatorySince: undefined,
					},
				}
			);

			const paragraph = wrapper.find(".migration-completion-date");

			expect(paragraph.exists()).toBe(true);
			expect(paragraph.text()).toContain(
				`components.administration.adminMigrationSection.oauthMigrationFinished.textComplete`
			);
		});

		it("should not exist when migration has not been completed", async () => {
			const { wrapper } = setup(
				{
					getOauthMigration: {
						enableMigrationStart: true,
						oauthMigrationPossible: false,
						oauthMigrationMandatory: false,
						oauthMigrationFinished: "",
						oauthMigrationFinalFinish: "",
					},
					getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
				},
				{
					getUserLoginMigration: {
						sourceSystemId: "sourceSystemId",
						targetSystemId: "targetSystemId",
						startedAt: new Date(2023, 1, 1),
						closedAt: undefined,
						finishedAt: undefined,
						mandatorySince: undefined,
					},
				}
			);

			const paragraph = wrapper.find(".migration-completion-date");

			expect(paragraph.exists()).toBe(false);
		});
	});

	describe("switch button for school feature showOutdatedUsers", () => {
		describe("FEATURE_SHOW_OUTDATED_USERS", () => {
			describe("when feature is set to false", () => {
				it("should hide switch button and description", () => {
					const { wrapper } = setup(
						{},
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

		describe("when clicking switch button", () => {
			it("should call update in schoolsModule", async () => {
				const { wrapper, schoolsModule } = setup(
					{},
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

	describe("switch button for school feature enableLdapSyncDuringMigration", () => {
		describe("FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION", () => {
			describe("when feature is set to false", () => {
				it("should hide switch button", () => {
					const { wrapper } = setup(
						{},
						{},
						{
							getEnableLdapSyncDuringMigration: false,
						}
					);

					const switchComponent = wrapper.find(
						'[data-testid="enable-sync-during-migration-switch"]'
					);

					expect(switchComponent.exists()).toBe(false);
				});
			});

			describe("when feature is set to true", () => {
				it("should show switch button", () => {
					const { wrapper } = setup(
						{},
						{},
						{
							getEnableLdapSyncDuringMigration: true,
						}
					);

					const switchComponent = wrapper.find(
						'[data-testid="enable-sync-during-migration-switch"]'
					);

					expect(switchComponent.exists()).toBe(true);
				});
			});
		});

		describe("when user login migration is finished", () => {
			it("should hide switch button", () => {
				const { wrapper } = setup(
					{
						getOauthMigration: {
							enableMigrationStart: true,
							oauthMigrationPossible: false,
							oauthMigrationMandatory: false,
							oauthMigrationFinished: new Date(2023, 1, 1).toDateString(),
							oauthMigrationFinalFinish: new Date(2023, 1, 1).toDateString(),
						},
						getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
					},
					{
						getUserLoginMigration: {
							sourceSystemId: "sourceSystemId",
							targetSystemId: "targetSystemId",
							startedAt: new Date(2023, 1, 1),
							closedAt: new Date(2023, 1, 1),
							finishedAt: new Date(2023, 1, 2),
							mandatorySince: undefined,
						},
					},
					{
						getEnableLdapSyncDuringMigration: true,
					}
				);

				const switchComponent = wrapper.find(
					'[data-testid="enable-sync-during-migration-switch"]'
				);

				expect(switchComponent.exists()).toBe(false);
			});
		});

		describe("when migration is active", () => {
			it("should show switch button", () => {
				const { wrapper } = setup(
					{
						getOauthMigration: {
							enableMigrationStart: true,
							oauthMigrationPossible: false,
							oauthMigrationMandatory: false,
							oauthMigrationFinished: "",
							oauthMigrationFinalFinish: "",
						},
						getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
					},
					{
						getUserLoginMigration: undefined,
					},
					{
						getEnableLdapSyncDuringMigration: true,
					}
				);

				const switchComponent = wrapper.find(
					'[data-testid="enable-sync-during-migration-switch"]'
				);

				expect(switchComponent.exists()).toBe(true);
			});

			it("should enable the switch", () => {
				const { wrapper } = setup(
					{
						getOauthMigration: {
							enableMigrationStart: true,
							oauthMigrationPossible: true,
							oauthMigrationMandatory: false,
							oauthMigrationFinished: "",
							oauthMigrationFinalFinish: "",
						},
						getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
					},
					{
						getUserLoginMigration: {
							sourceSystemId: "sourceSystemId",
							targetSystemId: "targetSystemId",
							startedAt: new Date(2023, 1, 1),
							closedAt: undefined,
							finishedAt: undefined,
							mandatorySince: undefined,
						},
					},
					{
						getEnableLdapSyncDuringMigration: true,
					}
				);

				const switchComponent = wrapper.find(
					'[data-testid="enable-sync-during-migration-switch"]'
				);

				expect(switchComponent.attributes("disabled")).toEqual(undefined);
			});
		});

		describe("when migration has not yet started", () => {
			it("should disable the switch", () => {
				const { wrapper } = setup(
					{
						getOauthMigration: {
							enableMigrationStart: true,
							oauthMigrationPossible: false,
							oauthMigrationMandatory: false,
							oauthMigrationFinished: "",
							oauthMigrationFinalFinish: "",
						},
						getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
					},
					{
						getUserLoginMigration: undefined,
					},
					{
						getEnableLdapSyncDuringMigration: true,
					}
				);

				const switchComponent = wrapper.find(
					'[data-testid="enable-sync-during-migration-switch"]'
				);

				expect(switchComponent.attributes("disabled")).toEqual("disabled");
			});
		});

		describe("when migration has not yet closed", () => {
			it("should disable the switch", () => {
				const { wrapper } = setup(
					{
						getOauthMigration: {
							enableMigrationStart: true,
							oauthMigrationPossible: false,
							oauthMigrationMandatory: false,
							oauthMigrationFinished: new Date(2023, 1, 1).toDateString(),
							oauthMigrationFinalFinish: "",
						},
						getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
					},
					{
						getUserLoginMigration: {
							sourceSystemId: "sourceSystemId",
							targetSystemId: "targetSystemId",
							startedAt: new Date(2023, 1, 1),
							closedAt: new Date(2023, 1, 1),
							finishedAt: undefined,
							mandatorySince: undefined,
						},
					},
					{
						getEnableLdapSyncDuringMigration: true,
					}
				);

				const switchComponent = wrapper.find(
					'[data-testid="enable-sync-during-migration-switch"]'
				);

				expect(switchComponent.attributes("disabled")).toEqual("disabled");
			});
		});

		describe("when clicking switch button", () => {
			it("should call update in schoolsModule", async () => {
				const { wrapper, schoolsModule } = setup(
					{
						getOauthMigration: {
							enableMigrationStart: true,
							oauthMigrationPossible: true,
							oauthMigrationMandatory: false,
							oauthMigrationFinished: "",
							oauthMigrationFinalFinish: "",
						},
						getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
					},
					{
						getUserLoginMigration: {
							sourceSystemId: "sourceSystemId",
							targetSystemId: "targetSystemId",
							startedAt: new Date(2023, 1, 1),
							closedAt: undefined,
							finishedAt: undefined,
							mandatorySince: undefined,
						},
					},
					{
						getEnableLdapSyncDuringMigration: true,
					}
				);
				const switchComponent = wrapper.find(
					'[data-testid="enable-sync-during-migration-switch"]'
				);

				await switchComponent.setChecked();

				expect(schoolsModule.update).toHaveBeenCalledWith({
					id: mockSchool.id,
					features: {
						...mockSchool.features,
						enableLdapSyncDuringMigration: true,
					},
				});
			});
		});
	});
});
