import { RoleName } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	contextExternalToolConfigurationStatusFactory,
	mountComposable,
} from "@@/tests/test-utils";
import { useContextExternalToolConfigurationStatus } from "./ContextExternalToolConfigurationStatus.composable";

jest.mock("vue-i18n", () => {
	return {
		...jest.requireActual("vue-i18n"),
		useI18n: jest.fn().mockReturnValue({ t: (key: string) => key }),
	};
});

describe("ToolConfigurationStatus.composable", () => {
	const getComposable = (userRole: string = RoleName.Teacher) => {
		const authModule = createModuleMocks(AuthModule, {
			getUserRoles: [userRole],
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
			composable,
		};
	};

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
			describe("when tool is deactivated", () => {
				const setup = () => {
					const toolConfigurationStatus =
						contextExternalToolConfigurationStatusFactory.build({
							isDeactivated: true,
						});

					const { composable } = getComposable(RoleName.Administrator);

					return {
						composable,
						toolConfigurationStatus,
					};
				};

				it("should return translation for status-role-pair", () => {
					const { composable, toolConfigurationStatus } = setup();

					const result = composable.determineMediaBoardElementStatusMessage(
						toolConfigurationStatus
					);

					expect(result).toEqual(
						"common.medium.alert.deactivated common.medium.information.admin"
					);
				});
			});

			describe("when tool is not licensed", () => {
				const setup = () => {
					const toolConfigurationStatus =
						contextExternalToolConfigurationStatusFactory.build({
							isNotLicensed: true,
						});

					const { composable } = getComposable(RoleName.Administrator);

					return {
						composable,
						toolConfigurationStatus,
					};
				};

				it("should return translation for status-role-pair", () => {
					const { composable, toolConfigurationStatus } = setup();

					const result = composable.determineMediaBoardElementStatusMessage(
						toolConfigurationStatus
					);

					expect(result).toEqual(
						"common.medium.alert.notLicensed common.medium.information.admin"
					);
				});
			});

			describe("when tool is outdated / incomplete", () => {
				const setup = () => {
					const toolConfigurationStatus =
						contextExternalToolConfigurationStatusFactory.build({
							isIncompleteOnScopeContext: true,
						});

					const { composable } = getComposable(RoleName.Administrator);

					return {
						composable,
						toolConfigurationStatus,
					};
				};

				it("should return translation for status-role-pair", () => {
					const { composable, toolConfigurationStatus } = setup();

					const result = composable.determineMediaBoardElementStatusMessage(
						toolConfigurationStatus
					);

					expect(result).toEqual(
						"common.medium.alert.incomplete common.medium.information.admin"
					);
				});
			});
		});

		describe("when user is teacher", () => {
			describe("when tool is deactivated", () => {
				const setup = () => {
					const toolConfigurationStatus =
						contextExternalToolConfigurationStatusFactory.build({
							isDeactivated: true,
						});

					const { composable } = getComposable(RoleName.Teacher);

					return {
						composable,
						toolConfigurationStatus,
					};
				};

				it("should return translation for status-role-pair", () => {
					const { composable, toolConfigurationStatus } = setup();

					const result = composable.determineMediaBoardElementStatusMessage(
						toolConfigurationStatus
					);

					expect(result).toEqual(
						"common.medium.alert.deactivated common.medium.information.teacher"
					);
				});
			});

			describe("when tool is not licensed", () => {
				const setup = () => {
					const toolConfigurationStatus =
						contextExternalToolConfigurationStatusFactory.build({
							isNotLicensed: true,
						});

					const { composable } = getComposable(RoleName.Teacher);

					return {
						composable,
						toolConfigurationStatus,
					};
				};

				it("should return translation for status-role-pair", () => {
					const { composable, toolConfigurationStatus } = setup();

					const result = composable.determineMediaBoardElementStatusMessage(
						toolConfigurationStatus
					);

					expect(result).toEqual(
						"common.medium.alert.notLicensed common.medium.information.teacher"
					);
				});
			});

			describe("when tool is outdated / incomplete", () => {
				const setup = () => {
					const toolConfigurationStatus =
						contextExternalToolConfigurationStatusFactory.build({
							isOutdatedOnScopeContext: true,
						});

					const { composable } = getComposable(RoleName.Teacher);

					return {
						composable,
						toolConfigurationStatus,
					};
				};

				it("should return translation for status-role-pair", () => {
					const { composable, toolConfigurationStatus } = setup();

					const result = composable.determineMediaBoardElementStatusMessage(
						toolConfigurationStatus
					);

					expect(result).toEqual(
						"common.medium.alert.incomplete common.medium.information.teacher"
					);
				});
			});
		});

		describe("when user is student", () => {
			describe("when tool is deactivated", () => {
				const setup = () => {
					const toolConfigurationStatus =
						contextExternalToolConfigurationStatusFactory.build({
							isDeactivated: true,
						});

					const { composable } = getComposable(RoleName.Student);

					return {
						composable,
						toolConfigurationStatus,
					};
				};

				it("should return translation for status-role-pair", () => {
					const { composable, toolConfigurationStatus } = setup();

					const result = composable.determineMediaBoardElementStatusMessage(
						toolConfigurationStatus
					);

					expect(result).toEqual(
						"common.medium.alert.deactivated common.medium.information.student"
					);
				});
			});

			describe("when tool is not licensed", () => {
				const setup = () => {
					const toolConfigurationStatus =
						contextExternalToolConfigurationStatusFactory.build({
							isNotLicensed: true,
						});

					const { composable } = getComposable(RoleName.Student);

					return {
						composable,
						toolConfigurationStatus,
					};
				};

				it("should return translation for status-role-pair", () => {
					const { composable, toolConfigurationStatus } = setup();

					const result = composable.determineMediaBoardElementStatusMessage(
						toolConfigurationStatus
					);

					expect(result).toEqual(
						"common.medium.alert.notLicensed common.medium.information.student"
					);
				});
			});

			describe("when tool is outdated / incomplete", () => {
				const setup = () => {
					const toolConfigurationStatus =
						contextExternalToolConfigurationStatusFactory.build({
							isOutdatedOnScopeSchool: true,
						});

					const { composable } = getComposable(RoleName.Student);

					return {
						composable,
						toolConfigurationStatus,
					};
				};

				it("should return translation for status-role-pair", () => {
					const { composable, toolConfigurationStatus } = setup();

					const result = composable.determineMediaBoardElementStatusMessage(
						toolConfigurationStatus
					);

					expect(result).toEqual(
						"common.medium.alert.incomplete common.medium.information.student"
					);
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
				const toolConfigurationStatus =
					contextExternalToolConfigurationStatusFactory.build();

				const { composable } = getComposable(RoleName.Student);

				return {
					composable,
					toolConfigurationStatus,
				};
			};

			it("should return true", () => {
				const { composable, toolConfigurationStatus } = setup();

				const result = composable.isOperational(toolConfigurationStatus);

				expect(result).toEqual(true);
			});
		});

		describe("when tool is not operational", () => {
			const setup = () => {
				const toolConfigurationStatus =
					contextExternalToolConfigurationStatusFactory.build({
						isOutdatedOnScopeContext: true,
					});

				const { composable } = getComposable(RoleName.Student);

				return {
					composable,
					toolConfigurationStatus,
				};
			};

			it("should return false", () => {
				const { composable, toolConfigurationStatus } = setup();

				const result = composable.isOperational(toolConfigurationStatus);

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
