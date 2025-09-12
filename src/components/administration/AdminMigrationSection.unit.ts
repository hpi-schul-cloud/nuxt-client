import AdminMigrationSection from "@/components/administration/AdminMigrationSection.vue";
import * as useUserLoginMigrationMappingsComposable from "@/composables/user-login-migration-mappings.composable";
import { ConfigResponse } from "@/serverApi/v3/api";
import SchoolsModule from "@/store/schools";
import UserLoginMigrationModule from "@/store/user-login-migrations";
import {
	SCHOOLS_MODULE_KEY,
	USER_LOGIN_MIGRATION_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { businessErrorFactory, createTestEnvStore } from "@@/tests/test-utils";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import type { Mocked } from "vitest";
import { useEnvConfig } from "@data-env";

describe("AdminMigrationSection", () => {
	let schoolsModule: Mocked<SchoolsModule>;
	let userLoginMigrationModule: Mocked<UserLoginMigrationModule>;

	vi.spyOn(
		useUserLoginMigrationMappingsComposable,
		"useUserLoginMigrationMappings"
	).mockReturnValue({
		...useUserLoginMigrationMappingsComposable.useUserLoginMigrationMappings(),
		getBusinessErrorTranslationKey: () => "",
	});

	const setup = (
		schoolGetters: Partial<SchoolsModule> = {},
		userLoginMigrationGetters: Partial<UserLoginMigrationModule> = {},
		envConfig?: Partial<ConfigResponse>
	) => {
		document.body.setAttribute("data-app", "true");

		userLoginMigrationModule = createModuleMocks(UserLoginMigrationModule, {
			getUserLoginMigration: {
				sourceSystemId: "sourceSystemId",
				targetSystemId: "targetSystemId",
				startedAt: new Date(2000, 1, 1, 0, 0),
				closedAt: undefined,
				finishedAt: new Date(2000, 1, 1, 0, 0),
				mandatorySince: undefined,
			},
			getBusinessError: businessErrorFactory.build({ message: undefined }),
			...userLoginMigrationGetters,
		});

		schoolsModule = createModuleMocks(SchoolsModule, {
			getSchool: { ...mockSchool, officialSchoolNumber: undefined },
			...schoolGetters,
		});

		createTestEnvStore({
			ACCESSIBILITY_REPORT_EMAIL: "ticketsystem@niedersachsen.support",
			SC_CONTACT_EMAIL: "ticketsystem@niedersachsen.support",
			...envConfig,
		});

		const wrapper = mount(AdminMigrationSection, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[SCHOOLS_MODULE_KEY.valueOf()]: schoolsModule,
					[USER_LOGIN_MIGRATION_MODULE_KEY.valueOf()]: userLoginMigrationModule,
				},
			},
		});

		return {
			wrapper,
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

			const linkText = wrapper.vm.supportLink;

			const subject = encodeURIComponent(
				"Schule mit der Nummer: ??? soll keine Migration durchführen, Schuladministrator bittet um Unterstützung!"
			);
			const expectedLink = `"mailto:${useEnvConfig().value.ACCESSIBILITY_REPORT_EMAIL}?subject=${subject}"`;

			expect(expectedLink).toContain(linkText);
		});

		it("should return support link with schoolnumber in subject", () => {
			const { wrapper } = setup({
				getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
			});

			const linkText = wrapper.vm.supportLink;

			const subject = encodeURIComponent(
				"Schule mit der Nummer: 12345 soll keine Migration durchführen, Schuladministrator bittet um Unterstützung!"
			);
			const expectedLink = `"mailto:${useEnvConfig().value.ACCESSIBILITY_REPORT_EMAIL}?subject=${subject}"`;

			expect(expectedLink).toContain(linkText);
		});
	});

	describe("Migration Control Section", () => {
		it("should render migration control section when grace period is not expired", () => {
			vi.useFakeTimers();
			vi.setSystemTime(new Date(2023, 1, 3));
			const { wrapper } = setup(
				{},
				{
					getUserLoginMigration: {
						sourceSystemId: "sourceSystemId",
						targetSystemId: "targetSystemId",
						startedAt: new Date(2023, 1, 3),
						closedAt: undefined,
						finishedAt: new Date(2023, 2, 1),
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
				{},
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
			vi.useFakeTimers();
			vi.setSystemTime(new Date(2023, 1, 3));

			expect(
				wrapper.find('[data-testId="migration-control-section"]').exists()
			).toBe(false);
		});
	});

	describe("Info Text", () => {
		it("should display the info text for migration when it is not started", () => {
			const { wrapper } = setup(
				{},
				{
					getUserLoginMigration: undefined,
				}
			);

			const infoText = wrapper.get('[data-testId="migration-info-text"]');
			const expectedText = [
				"firstParagraph",
				"secondParagraph",
				"thirdParagraph",
				"fourthParagraph",
			]
				.map(
					(text) =>
						`components.administration.adminMigrationSection.infoText.${text}`
				)
				.join("");

			expect(infoText.text()).toEqual(expectedText);
		});

		it("should display the info text activeMigration when the admin activated the migration", () => {
			const { wrapper } = setup(
				{},
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

			const infoText = wrapper.get('[data-testId="migration-active-status"]');

			expect(infoText.text()).toStrictEqual(
				"components.administration.adminMigrationSection.migrationActive"
			);
		});
	});

	describe("Mandatory Switch", () => {
		it("should be enabled when migration is available", () => {
			const { wrapper } = setup(
				{},
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
				{},
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
				{},
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
			switchComponent.vm.$emit("update:modelValue", true);

			expect(
				userLoginMigrationModule.setUserLoginMigrationMandatory
			).toHaveBeenCalledWith(true);
		});

		it("should set school oauth migration to optional, when click has been triggered again", () => {
			const { wrapper } = setup(
				{},
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
			switchComponent.vm.$emit("update:modelValue", false);

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
				{},
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
				{},
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
			vi.useFakeTimers();
			vi.setSystemTime(new Date(2023, 1, 3));

			const buttonComponent = wrapper.find(
				"[data-testId=migration-start-button]"
			);

			expect(buttonComponent.exists()).toBe(false);
		});

		it("should not render migration start button and migration mandatory switch, when click has been triggered", async () => {
			const { wrapper } = setup(
				{
					getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
				},
				{
					getUserLoginMigration: undefined,
				}
			);

			const buttonComponent = wrapper.findComponent({ name: "v-btn" });
			const switchComponent = wrapper.findComponent({ name: "v-switch" });
			await buttonComponent.trigger("click");

			expect(buttonComponent.exists()).toBe(false);
			expect(switchComponent.isVisible()).toBe(false);
		});

		describe("when an error occurs during migration start", () => {
			it("should display an alert", () => {
				const { wrapper } = setup(
					{
						getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
					},
					{
						getUserLoginMigration: undefined,
						getBusinessError: businessErrorFactory.build({
							error: new Error(),
						}),
					}
				);

				const alert = wrapper.find("[data-testid=error-alert]");

				expect(alert.exists()).toEqual(true);
			});
		});
	});

	describe("Migration end button", () => {
		it("should exist and be enabled when migration has started", () => {
			const { wrapper } = setup(
				{},
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
			await buttonComponent.trigger("click");

			expect(buttonComponent.exists()).toBe(false);
			expect(switchComponent.isVisible()).toBe(false);
		});
	});

	describe("Migration warning card", () => {
		describe("when migration start button is clicked", () => {
			it("should be rendered", async () => {
				const { wrapper } = setup(
					{
						getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
					},
					{
						getUserLoginMigration: undefined,
					}
				);

				const buttonComponent = wrapper.findComponent({ name: "v-btn" });
				await buttonComponent.trigger("click");

				const cardComponent = wrapper.findComponent({ name: "v-card" });

				expect(cardComponent.exists()).toBe(true);
			});

			describe("when agree button of start warning card is clicked", () => {
				it("should not render the card and start migration", async () => {
					const { wrapper } = setup(
						{
							getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
						},
						{
							getUserLoginMigration: undefined,
						}
					);
					const buttonComponent = wrapper.findComponent({ name: "v-btn" });
					await buttonComponent.trigger("click");

					const cardComponent = wrapper.findComponent({ name: "v-card" });
					const cardButtonAgree = cardComponent.find("[data-testId=agree-btn]");
					await cardButtonAgree.trigger("click");

					expect(cardComponent.exists()).toBe(false);
					expect(
						userLoginMigrationModule.startUserLoginMigration
					).toHaveBeenCalled();
					expect(
						userLoginMigrationModule.fetchLatestUserLoginMigrationForSchool
					).toHaveBeenCalled();
				});
			});
		});

		describe("when disagree button of card is clicked", () => {
			it("should not render the card and not start migration", async () => {
				const { wrapper } = setup(
					{
						getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
					},
					{
						getUserLoginMigration: undefined,
					}
				);
				const buttonComponent = wrapper.findComponent({ name: "v-btn" });
				await buttonComponent.trigger("click");

				const cardComponent = wrapper.findComponent({ name: "v-card" });
				const cardButtonDisagree = cardComponent.find(
					"[data-testId=disagree-btn]"
				);
				await cardButtonDisagree.trigger("click");

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
				await buttonComponent.trigger("click");

				const cardComponent = wrapper.findComponent({ name: "v-card" });

				expect(cardComponent.exists()).toBe(true);
			});
		});

		describe("when agree button of end warning card is clicked", () => {
			it("should not render the card and complete migration", async () => {
				const { wrapper } = setup(
					{
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
				await buttonComponent.trigger("click");

				const warningCards = wrapper.findAllComponents({
					name: "migration-warning-card",
				});

				warningCards[0].vm.$emit("set");

				expect(
					userLoginMigrationModule.closeUserLoginMigration
				).toHaveBeenCalled();
				expect(
					userLoginMigrationModule.fetchLatestUserLoginMigrationForSchool
				).toHaveBeenCalled();
			});
		});

		describe("when disagree button of card is clicked", () => {
			it("should not render the card and not complete migration", async () => {
				const { wrapper } = setup(
					{
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
				await buttonComponent.trigger("click");

				const cardComponent = wrapper.findComponent({ name: "v-card" });
				const cardButtonDisagree = cardComponent.find(
					"[data-testid=disagree-btn]"
				);
				await cardButtonDisagree.trigger("click");

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
	});

	describe("Date paragraph", () => {
		it("should exist when migration has been completed", () => {
			vi.useFakeTimers();
			vi.setSystemTime(new Date(2023, 1, 2));
			const { wrapper } = setup(
				{
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

			const dateParagraph = wrapper.get(
				"[data-testid=migration-finished-timestamp]"
			);

			const expectedText = ["firstParagraph", "secondParagraph"]
				.map(
					(paragraph) =>
						`components.administration.adminMigrationSection.oauthMigrationFinished.text.${paragraph}`
				)
				.join("");

			expect(dateParagraph.text()).toBe(expectedText);
		});

		it("should show finalFinish text when migration grace period has expired", () => {
			vi.useFakeTimers();
			vi.setSystemTime(new Date(2023, 1, 4));
			const { wrapper } = setup(
				{
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

			const paragraph = wrapper.get(
				"[data-testid=migration-finished-timestamp]"
			);

			const expectedText = [
				"components.administration.adminMigrationSection.oauthMigrationFinished.text.firstParagraph",
				"components.administration.adminMigrationSection.oauthMigrationFinished.textComplete.secondParagraph",
			].join("");

			expect(paragraph.text()).toBe(expectedText);
		});

		it("should not exist when migration has not been completed", () => {
			const { wrapper } = setup(
				{
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
							FEATURE_SHOW_OUTDATED_USERS: false,
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
							FEATURE_SHOW_OUTDATED_USERS: true,
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
						FEATURE_SHOW_OUTDATED_USERS: true,
					}
				);

				const switchComponents = wrapper.findAllComponents({
					name: "v-switch",
				});

				await switchComponents[0].vm.$emit("update:modelValue", true);

				const expectedProps = { features: ["showOutdatedUsers"] };

				expect(schoolsModule.update).toHaveBeenCalledWith({
					id: mockSchool.id,
					props: {
						...expectedProps,
					},
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
							FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION: false,
						}
					);

					const switchComponent = wrapper.find(
						'[data-testid="enable-sync-during-migration-switch"]'
					);

					expect(switchComponent.exists()).toBe(false);
				});
			});

			describe("when feature is set to true", () => {
				it("should show switch button", async () => {
					const { wrapper } = setup(
						{},
						{
							getUserLoginMigration: {
								targetSystemId: "targetSystemId",
								startedAt: new Date(2023, 1, 1),
								finishedAt: undefined,
								mandatorySince: undefined,
							},
						},
						{
							FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION: true,
						}
					);

					await nextTick();

					const switchComponents = wrapper.findAllComponents({
						name: "v-switch",
					});

					const switchComponent = switchComponents[1].get(
						'[data-testid="enable-sync-during-migration-switch"]'
					);

					expect(switchComponent).toBeDefined();
				});
			});
		});

		describe("when user login migration is finished", () => {
			it("should hide switch button", () => {
				const { wrapper } = setup(
					{
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
						FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION: true,
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
						getSchool: { ...mockSchool, officialSchoolNumber: "12345" },
					},
					{
						getUserLoginMigration: undefined,
					},
					{
						FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION: true,
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
						getSchool: {
							...mockSchool,
							officialSchoolNumber: "12345",
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
					},
					{
						FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION: true,
					}
				);

				const switchComponent = wrapper.find(
					'[data-testid="enable-sync-during-migration-switch"]'
				);

				expect(switchComponent.attributes("disabled")).toEqual(undefined);
			});
		});

		describe("when migration has not yet closed", () => {
			it("should disable the switch", () => {
				const { wrapper } = setup(
					{
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
						FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION: true,
					}
				);

				const switchComponents = wrapper.findAllComponents({
					name: "v-switch",
				});

				const inputelement = switchComponents[1].find("input");

				expect(inputelement.attributes()).toHaveProperty("disabled");
			});
		});

		describe("when clicking switch button", () => {
			it("should call update in schoolsModule", () => {
				const { wrapper, schoolsModule } = setup(
					{
						getSchool: {
							...mockSchool,
							officialSchoolNumber: "12345",
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
					},
					{
						FEATURE_ENABLE_LDAP_SYNC_DURING_MIGRATION: true,
					}
				);

				const switchComponents = wrapper.findAllComponents({
					name: "v-switch",
				});

				switchComponents[1].vm.$emit("update:modelValue");

				expect(schoolsModule.update).toHaveBeenCalled();
			});
		});
	});

	describe("Migration wizard button", () => {
		describe("when the migration wizard feature is enabled", () => {
			describe("when the migration is running and the school is migrated", () => {
				it("should be enabled", () => {
					const { wrapper } = setup(
						{
							getSchool: {
								...mockSchool,
								systemIds: ["targetSystemId"],
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
						},
						{
							FEATURE_SHOW_MIGRATION_WIZARD: true,
						}
					);

					const buttons = wrapper.findAllComponents({ name: "v-btn" });
					expect(buttons[1].props("disabled")).toBeFalsy();
				});

				it("should redirect to the wizard", () => {
					const { wrapper } = setup(
						{},
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
							FEATURE_SHOW_MIGRATION_WIZARD: true,
						}
					);

					const buttons = wrapper.findAllComponents({ name: "v-btn" });
					expect(buttons[1].props("to")).toEqual({
						name: "administration-migration",
					});
				});
			});

			describe("when the migration has not been started", () => {
				it("should be disabled", () => {
					const { wrapper } = setup(
						{},
						{
							getUserLoginMigration: undefined,
						},
						{
							FEATURE_SHOW_MIGRATION_WIZARD: true,
						}
					);

					const buttons = wrapper.findAllComponents({ name: "v-btn" });
					expect(buttons[1].props("disabled")).toBeTruthy();
				});
			});

			describe("when the migration has been finished", () => {
				it("should not be visible", () => {
					const { wrapper } = setup(
						{},
						{
							getUserLoginMigration: {
								sourceSystemId: "sourceSystemId",
								targetSystemId: "targetSystemId",
								startedAt: new Date(2023, 1, 1),
								closedAt: new Date(2023, 1, 2),
								finishedAt: new Date(2023, 1, 3),
								mandatorySince: undefined,
							},
						},
						{
							FEATURE_SHOW_MIGRATION_WIZARD: true,
						}
					);

					const migrationWizardButton = wrapper.find(
						'[data-testid="migration-wizard-button]'
					);
					expect(migrationWizardButton.exists()).toBeFalsy();
				});
			});

			describe("when the school has not been migrated", () => {
				it("should be disabled", () => {
					const { wrapper } = setup(
						{
							getSchool: {
								...mockSchool,
								systemIds: [],
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
						},
						{
							FEATURE_SHOW_MIGRATION_WIZARD: true,
						}
					);

					const buttons = wrapper.findAllComponents({ name: "v-btn" });
					expect(buttons[1].props("disabled")).toBeTruthy();
				});
			});
		});

		describe("when the migration wizard feature is disabled", () => {
			it("should not exist", () => {
				const { wrapper } = setup(
					{},
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
						FEATURE_SHOW_MIGRATION_WIZARD: false,
					}
				);

				const button = wrapper.find('[data-testid="migration-wizard-button"]');
				expect(button.exists()).toBeFalsy();
			});
		});
	});
});
