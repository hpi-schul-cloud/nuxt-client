import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	contextExternalToolConfigurationStatusFactory,
	mountComposable,
} from "@@/tests/test-utils";
import { useI18n } from "vue-i18n";
import { useContextExternalToolConfigurationStatus } from "./ContextExternalToolConfigurationStatus.composable";

jest.mock("vue-i18n", () => {
	return {
		...jest.requireActual("vue-i18n"),
		useI18n: jest.fn().mockReturnValue({ t: (key: string) => key }),
	};
});

describe("ToolConfigurationStatus.composable", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("determineToolStatusTranslationKey for teacher", () => {
		describe("when user is teacher and tool is outdated on scope school and context", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["teacher"],
				});

				const toolConfigurationStatus =
					contextExternalToolConfigurationStatusFactory.build({
						isOutdatedOnScopeSchool: true,
						isOutdatedOnScopeContext: true,
					});

				const composable = mountComposable(
					() => useContextExternalToolConfigurationStatus(),
					{
						global: {
							provide: { [AUTH_MODULE_KEY.valueOf()]: authModule },
						},
					}
				);

				return {
					toolConfigurationStatus,
					...composable,
				};
			};

			it("should return translationkey for outdated on scope school and context ", () => {
				const { determineToolStatusTranslationKey, toolConfigurationStatus } =
					setup();

				const result = determineToolStatusTranslationKey(
					toolConfigurationStatus
				);

				expect(result).toEqual(
					"common.tool.information.incomplete.outdated.schoolAndContext.teacher"
				);
			});
		});

		describe("when user is teacher and tool is outdated on scope school", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["teacher"],
				});

				const toolConfigurationStatus =
					contextExternalToolConfigurationStatusFactory.build({
						isOutdatedOnScopeSchool: true,
					});

				const composable = mountComposable(
					() => useContextExternalToolConfigurationStatus(),
					{
						global: {
							provide: {
								[AUTH_MODULE_KEY.valueOf()]: authModule,
							},
						},
					}
				);

				return {
					toolConfigurationStatus,
					...composable,
				};
			};

			it("should return translationkey for outdated on scope school ", () => {
				const { determineToolStatusTranslationKey, toolConfigurationStatus } =
					setup();

				const result = determineToolStatusTranslationKey(
					toolConfigurationStatus
				);

				expect(result).toEqual(
					"common.tool.information.outdatedOnSchool.teacher"
				);
			});
		});

		describe("when user is teacher and tool is outdated on scope context", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["teacher"],
				});

				const toolConfigurationStatus =
					contextExternalToolConfigurationStatusFactory.build({
						isOutdatedOnScopeContext: true,
					});

				const composable = mountComposable(
					() => useContextExternalToolConfigurationStatus(),
					{
						global: {
							provide: {
								[AUTH_MODULE_KEY.valueOf()]: authModule,
							},
						},
					}
				);

				return {
					toolConfigurationStatus,
					...composable,
				};
			};

			it("should return translationkey for outdated tool on scope context ", () => {
				const { determineToolStatusTranslationKey, toolConfigurationStatus } =
					setup();

				const result = determineToolStatusTranslationKey(
					toolConfigurationStatus
				);

				expect(result).toEqual("common.tool.information.outdated.teacher");
			});
		});

		describe("when user is teacher and tool is incomplete", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["teacher"],
				});

				const toolConfigurationStatus =
					contextExternalToolConfigurationStatusFactory.build({
						isIncompleteOnScopeContext: true,
					});

				const composable = mountComposable(
					() => useContextExternalToolConfigurationStatus(),
					{
						global: {
							provide: {
								[AUTH_MODULE_KEY.valueOf()]: authModule,
							},
						},
					}
				);

				return {
					toolConfigurationStatus,
					...composable,
				};
			};

			it("should return translationkey for outdated", () => {
				const { determineToolStatusTranslationKey, toolConfigurationStatus } =
					setup();

				const result = determineToolStatusTranslationKey(
					toolConfigurationStatus
				);

				expect(result).toEqual("common.tool.information.outdated.teacher");
			});
		});

		describe("when user is teacher and tool is incomplete operational", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["teacher"],
				});

				const toolConfigurationStatus =
					contextExternalToolConfigurationStatusFactory.build({
						isIncompleteOperationalOnScopeContext: true,
					});

				const composable = mountComposable(
					() => useContextExternalToolConfigurationStatus(),
					{
						global: {
							provide: {
								[AUTH_MODULE_KEY.valueOf()]: authModule,
							},
						},
					}
				);

				return {
					toolConfigurationStatus,
					...composable,
				};
			};

			it("should return translationkey for outdated ", () => {
				const { determineToolStatusTranslationKey, toolConfigurationStatus } =
					setup();

				const result = determineToolStatusTranslationKey(
					toolConfigurationStatus
				);

				expect(result).toEqual("common.tool.information.outdated.teacher");
			});
		});

		describe("when user is student and tool is outdated on scope school and context", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["student"],
				});

				const toolConfigurationStatus =
					contextExternalToolConfigurationStatusFactory.build({
						isOutdatedOnScopeSchool: true,
						isOutdatedOnScopeContext: true,
					});

				const composable = mountComposable(
					() => useContextExternalToolConfigurationStatus(),
					{
						global: {
							provide: {
								[AUTH_MODULE_KEY.valueOf()]: authModule,
							},
						},
					}
				);

				return {
					toolConfigurationStatus,
					...composable,
				};
			};

			it("should return translationkey for outdated", () => {
				const { determineToolStatusTranslationKey, toolConfigurationStatus } =
					setup();

				const result = determineToolStatusTranslationKey(
					toolConfigurationStatus
				);

				expect(result).toEqual("common.tool.information.outdated.student");
			});
		});
	});

	describe("determineMediaBoardElementStatusMessage", () => {
		describe("when user is admin", () => {
			const setupAdmin = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["administrator"],
				});

				const composable = mountComposable(
					() => useContextExternalToolConfigurationStatus(),
					{
						global: {
							provide: {
								[AUTH_MODULE_KEY.valueOf()]: authModule,
							},
						},
					}
				);

				return {
					...composable,
				};
			};

			describe("when tool is deactivated", () => {
				const setup = () => {
					const { ...composable } = setupAdmin();
					const { t } = useI18n();

					const toolConfigurationStatus =
						contextExternalToolConfigurationStatusFactory.build({
							isDeactivated: true,
						});

					const translation =
						t("common.medium.alert.deactivated") +
						" " +
						t("common.medium.information.admin");

					return {
						...composable,
						toolConfigurationStatus,
						translation,
					};
				};

				it("should return translation for status-role-pair", () => {
					const {
						determineMediaBoardElementStatusMessage,
						toolConfigurationStatus,
						translation,
					} = setup();

					const result = determineMediaBoardElementStatusMessage(
						toolConfigurationStatus
					);

					expect(result).toEqual(translation);
				});
			});

			describe("when tool is not licensed", () => {
				const setup = () => {
					const { ...composable } = setupAdmin();
					const { t } = useI18n();

					const toolConfigurationStatus =
						contextExternalToolConfigurationStatusFactory.build({
							isNotLicensed: true,
						});

					const translation =
						t("common.medium.alert.notLicensed") +
						" " +
						t("common.medium.information.admin");

					return {
						...composable,
						toolConfigurationStatus,
						translation,
					};
				};

				it("should return translation for status-role-pair", () => {
					const {
						determineMediaBoardElementStatusMessage,
						toolConfigurationStatus,
						translation,
					} = setup();

					const result = determineMediaBoardElementStatusMessage(
						toolConfigurationStatus
					);

					expect(result).toEqual(translation);
				});
			});

			describe("when tool is outdated / incomplete", () => {
				const setup = () => {
					const { ...composable } = setupAdmin();
					const { t } = useI18n();

					const toolConfigurationStatus =
						contextExternalToolConfigurationStatusFactory.build({
							isIncompleteOnScopeContext: true,
						});

					const translation =
						t("common.medium.alert.incomplete") +
						" " +
						t("common.medium.information.admin");

					return {
						...composable,
						toolConfigurationStatus,
						translation,
					};
				};

				it("should return translation for status-role-pair", () => {
					const {
						determineMediaBoardElementStatusMessage,
						toolConfigurationStatus,
						translation,
					} = setup();

					const result = determineMediaBoardElementStatusMessage(
						toolConfigurationStatus
					);

					expect(result).toEqual(translation);
				});
			});
		});

		describe("when user is teacher", () => {
			const setupTeacher = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["teacher"],
				});

				const composable = mountComposable(
					() => useContextExternalToolConfigurationStatus(),
					{
						global: {
							provide: {
								[AUTH_MODULE_KEY.valueOf()]: authModule,
							},
						},
					}
				);

				return {
					...composable,
				};
			};

			describe("when tool is deactivated", () => {
				const setup = () => {
					const { ...composable } = setupTeacher();
					const { t } = useI18n();

					const toolConfigurationStatus =
						contextExternalToolConfigurationStatusFactory.build({
							isDeactivated: true,
						});

					const translation =
						t("common.medium.alert.deactivated") +
						" " +
						t("common.medium.information.teacher");

					return {
						...composable,
						toolConfigurationStatus,
						translation,
					};
				};

				it("should return translation for status-role-pair", () => {
					const {
						determineMediaBoardElementStatusMessage,
						toolConfigurationStatus,
						translation,
					} = setup();

					const result = determineMediaBoardElementStatusMessage(
						toolConfigurationStatus
					);

					expect(result).toEqual(translation);
				});
			});

			describe("when tool is not licensed", () => {
				const setup = () => {
					const { ...composable } = setupTeacher();
					const { t } = useI18n();

					const toolConfigurationStatus =
						contextExternalToolConfigurationStatusFactory.build({
							isNotLicensed: true,
						});

					const translation =
						t("common.medium.alert.notLicensed") +
						" " +
						t("common.medium.information.teacher");

					return {
						...composable,
						toolConfigurationStatus,
						translation,
					};
				};

				it("should return translation for status-role-pair", () => {
					const {
						determineMediaBoardElementStatusMessage,
						toolConfigurationStatus,
						translation,
					} = setup();

					const result = determineMediaBoardElementStatusMessage(
						toolConfigurationStatus
					);

					expect(result).toEqual(translation);
				});
			});

			describe("when tool is outdated / incomplete", () => {
				const setup = () => {
					const { ...composable } = setupTeacher();
					const { t } = useI18n();

					const toolConfigurationStatus =
						contextExternalToolConfigurationStatusFactory.build({
							isOutdatedOnScopeContext: true,
						});

					const translation =
						t("common.medium.alert.incomplete") +
						" " +
						t("common.medium.information.teacher");

					return {
						...composable,
						toolConfigurationStatus,
						translation,
					};
				};

				it("should return translation for status-role-pair", () => {
					const {
						determineMediaBoardElementStatusMessage,
						toolConfigurationStatus,
						translation,
					} = setup();

					const result = determineMediaBoardElementStatusMessage(
						toolConfigurationStatus
					);

					expect(result).toEqual(translation);
				});
			});
		});

		describe("when user is student", () => {
			const setupStudent = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["student"],
				});

				const composable = mountComposable(
					() => useContextExternalToolConfigurationStatus(),
					{
						global: {
							provide: {
								[AUTH_MODULE_KEY.valueOf()]: authModule,
							},
						},
					}
				);

				return {
					...composable,
				};
			};

			describe("when tool is deactivated", () => {
				const setup = () => {
					const { ...composable } = setupStudent();
					const { t } = useI18n();

					const toolConfigurationStatus =
						contextExternalToolConfigurationStatusFactory.build({
							isDeactivated: true,
						});

					const translation =
						t("common.medium.alert.deactivated") +
						" " +
						t("common.medium.information.student");

					return {
						...composable,
						toolConfigurationStatus,
						translation,
					};
				};

				it("should return translation for status-role-pair", () => {
					const {
						determineMediaBoardElementStatusMessage,
						toolConfigurationStatus,
						translation,
					} = setup();

					const result = determineMediaBoardElementStatusMessage(
						toolConfigurationStatus
					);

					expect(result).toEqual(translation);
				});
			});

			describe("when tool is not licensed", () => {
				const setup = () => {
					const { ...composable } = setupStudent();
					const { t } = useI18n();

					const toolConfigurationStatus =
						contextExternalToolConfigurationStatusFactory.build({
							isNotLicensed: true,
						});

					const translation =
						t("common.medium.alert.notLicensed") +
						" " +
						t("common.medium.information.student");

					return {
						...composable,
						toolConfigurationStatus,
						translation,
					};
				};

				it("should return translation for status-role-pair", () => {
					const {
						determineMediaBoardElementStatusMessage,
						toolConfigurationStatus,
						translation,
					} = setup();

					const result = determineMediaBoardElementStatusMessage(
						toolConfigurationStatus
					);

					expect(result).toEqual(translation);
				});
			});

			describe("when tool is outdated / incomplete", () => {
				const setup = () => {
					const { ...composable } = setupStudent();
					const { t } = useI18n();

					const toolConfigurationStatus =
						contextExternalToolConfigurationStatusFactory.build({
							isOutdatedOnScopeSchool: true,
						});

					const translation =
						t("common.medium.alert.incomplete") +
						" " +
						t("common.medium.information.student");

					return {
						...composable,
						toolConfigurationStatus,
						translation,
					};
				};

				it("should return translation for status-role-pair", () => {
					const {
						determineMediaBoardElementStatusMessage,
						toolConfigurationStatus,
						translation,
					} = setup();

					const result = determineMediaBoardElementStatusMessage(
						toolConfigurationStatus
					);

					expect(result).toEqual(translation);
				});
			});
		});
	});

	describe("determineDeactivatedTranslationKey", () => {
		describe("when user is student and tool is deactivated", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["student"],
				});

				const composable = mountComposable(
					() => useContextExternalToolConfigurationStatus(),
					{
						global: {
							provide: {
								[AUTH_MODULE_KEY.valueOf()]: authModule,
							},
						},
					}
				);

				return {
					...composable,
				};
			};

			it("should return translationkey for deactivated tool ", () => {
				const { determineDeactivatedMessage } = setup();

				const result = determineDeactivatedMessage();

				expect(result).toEqual("common.tool.information.deactivated.student");
			});
		});

		describe("when user is teacher and tool is deactivated", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["teacher"],
				});

				const composable = mountComposable(
					() => useContextExternalToolConfigurationStatus(),
					{
						global: {
							provide: {
								[AUTH_MODULE_KEY.valueOf()]: authModule,
							},
						},
					}
				);

				return {
					...composable,
				};
			};

			it("should return translationkey for deactivated tool ", () => {
				const { determineDeactivatedMessage } = setup();

				const result = determineDeactivatedMessage();

				expect(result).toEqual("common.tool.information.deactivated.teacher");
			});
		});
	});

	describe("isOperational", () => {
		describe("when tool is operational", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["student"],
				});

				const composable = mountComposable(
					() => useContextExternalToolConfigurationStatus(),
					{
						global: {
							provide: {
								[AUTH_MODULE_KEY.valueOf()]: authModule,
							},
						},
					}
				);

				const toolConfigurationStatus =
					contextExternalToolConfigurationStatusFactory.build();

				return {
					...composable,
					toolConfigurationStatus,
				};
			};

			it("should return true", () => {
				const { isOperational, toolConfigurationStatus } = setup();

				const result = isOperational(toolConfigurationStatus);

				expect(result).toEqual(true);
			});
		});

		describe("when tool is not operational", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["student"],
				});

				const composable = mountComposable(
					() => useContextExternalToolConfigurationStatus(),
					{
						global: {
							provide: {
								[AUTH_MODULE_KEY.valueOf()]: authModule,
							},
						},
					}
				);

				const toolConfigurationStatus =
					contextExternalToolConfigurationStatusFactory.build({
						isOutdatedOnScopeContext: true,
					});

				return {
					...composable,
					toolConfigurationStatus,
				};
			};

			it("should return false", () => {
				const { isOperational, toolConfigurationStatus } = setup();

				const result = isOperational(toolConfigurationStatus);

				expect(result).toEqual(false);
			});
		});
	});

	describe("isTeacher", () => {
		describe("when user is teacher", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["teacher"],
				});

				const composable = mountComposable(
					() => useContextExternalToolConfigurationStatus(),
					{
						global: {
							provide: {
								[AUTH_MODULE_KEY.valueOf()]: authModule,
							},
						},
					}
				);

				return {
					...composable,
				};
			};

			it("should return true ", () => {
				const { isTeacher } = setup();

				const result = isTeacher();

				expect(result).toBe(true);
			});
		});

		describe("when user is not teacher", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["student"],
				});

				const composable = mountComposable(
					() => useContextExternalToolConfigurationStatus(),
					{
						global: {
							provide: {
								[AUTH_MODULE_KEY.valueOf()]: authModule,
							},
						},
					}
				);

				return {
					...composable,
				};
			};

			it("should return true ", () => {
				const { isTeacher } = setup();

				const result = isTeacher();

				expect(result).toBe(false);
			});
		});
	});
});
