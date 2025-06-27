import { RoleName } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	contextExternalToolConfigurationStatusFactory,
	mountComposable,
} from "@@/tests/test-utils";
import { useContextExternalToolConfigurationStatus } from "./ContextExternalToolConfigurationStatus.composable";

vi.mock("vue-i18n", () => {
	return {
		useI18n: vi.fn().mockReturnValue({ t: (key: string) => key }),
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
		vi.clearAllMocks();
	});

	describe("determineToolStatusTranslationKey", () => {
		describe("when user is teacher and tool is outdated on scope school and context", () => {
			const setup = () => {
				const toolConfigurationStatus =
					contextExternalToolConfigurationStatusFactory.build({
						isOutdatedOnScopeSchool: true,
						isOutdatedOnScopeContext: true,
					});

				const { composable } = getComposable(RoleName.Teacher);

				return {
					toolConfigurationStatus,
					composable,
				};
			};

			it("should return translation key for outdated on scope school and context ", () => {
				const { composable, toolConfigurationStatus } = setup();

				const result = composable.determineToolStatusTranslationKey(
					toolConfigurationStatus
				);

				expect(result).toEqual(
					"common.tool.information.incomplete.outdated.schoolAndContext.teacher"
				);
			});
		});

		describe("when user is teacher and tool is outdated on scope school", () => {
			const setup = () => {
				const toolConfigurationStatus =
					contextExternalToolConfigurationStatusFactory.build({
						isOutdatedOnScopeSchool: true,
					});

				const { composable } = getComposable(RoleName.Teacher);

				return {
					toolConfigurationStatus,
					composable,
				};
			};

			it("should return translation key for outdated on scope school ", () => {
				const { composable, toolConfigurationStatus } = setup();

				const result = composable.determineToolStatusTranslationKey(
					toolConfigurationStatus
				);

				expect(result).toEqual(
					"common.tool.information.outdatedOnSchool.teacher"
				);
			});
		});

		describe("when user is teacher and tool is outdated on scope context", () => {
			const setup = () => {
				const toolConfigurationStatus =
					contextExternalToolConfigurationStatusFactory.build({
						isOutdatedOnScopeContext: true,
					});

				const { composable } = getComposable(RoleName.Teacher);

				return {
					toolConfigurationStatus,
					composable,
				};
			};

			it("should return translation key for outdated tool on scope context ", () => {
				const { composable, toolConfigurationStatus } = setup();

				const result = composable.determineToolStatusTranslationKey(
					toolConfigurationStatus
				);

				expect(result).toEqual("common.tool.information.outdated.teacher");
			});
		});

		describe("when user is teacher and tool is incomplete", () => {
			const setup = () => {
				const toolConfigurationStatus =
					contextExternalToolConfigurationStatusFactory.build({
						isIncompleteOnScopeContext: true,
					});

				const { composable } = getComposable(RoleName.Teacher);

				return {
					toolConfigurationStatus,
					composable,
				};
			};

			it("should return translation key for outdated", () => {
				const { composable, toolConfigurationStatus } = setup();

				const result = composable.determineToolStatusTranslationKey(
					toolConfigurationStatus
				);

				expect(result).toEqual("common.tool.information.outdated.teacher");
			});
		});

		describe("when user is teacher and tool is incomplete operational", () => {
			const setup = () => {
				const toolConfigurationStatus =
					contextExternalToolConfigurationStatusFactory.build({
						isIncompleteOperationalOnScopeContext: true,
					});

				const { composable } = getComposable(RoleName.Teacher);

				return {
					toolConfigurationStatus,
					composable,
				};
			};

			it("should return translation key for outdated ", () => {
				const { composable, toolConfigurationStatus } = setup();

				const result = composable.determineToolStatusTranslationKey(
					toolConfigurationStatus
				);

				expect(result).toEqual("common.tool.information.outdated.teacher");
			});
		});

		describe("when user is teacher and the tool has an unknown status", () => {
			const setup = () => {
				const toolConfigurationStatus =
					contextExternalToolConfigurationStatusFactory.build();

				const { composable } = getComposable(RoleName.Teacher);

				return {
					toolConfigurationStatus,
					composable,
				};
			};

			it("should not return a translation key", () => {
				const { composable, toolConfigurationStatus } = setup();

				const result = composable.determineToolStatusTranslationKey(
					toolConfigurationStatus
				);

				expect(result).toEqual("");
			});
		});

		describe("when user is student and tool is outdated on scope school and context", () => {
			const setup = () => {
				const toolConfigurationStatus =
					contextExternalToolConfigurationStatusFactory.build({
						isOutdatedOnScopeSchool: true,
						isOutdatedOnScopeContext: true,
					});

				const { composable } = getComposable(RoleName.Student);

				return {
					toolConfigurationStatus,
					composable,
				};
			};

			it("should return translation key for outdated", () => {
				const { composable, toolConfigurationStatus } = setup();

				const result = composable.determineToolStatusTranslationKey(
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
			it("should return translation key for deactivated tool ", () => {
				const { composable } = getComposable(RoleName.Student);

				const result = composable.determineDeactivatedTranslationKey();

				expect(result).toEqual("common.tool.information.deactivated.student");
			});
		});

		describe("when user is teacher and tool is deactivated", () => {
			it("should return translation key for deactivated tool ", () => {
				const { composable } = getComposable(RoleName.Teacher);

				const result = composable.determineDeactivatedTranslationKey();

				expect(result).toEqual("common.tool.information.deactivated.teacher");
			});
		});
	});

	describe("determineNotLicensedTranslationKey", () => {
		describe("when user is student and tool is not licensed", () => {
			it("should return translation key for not licensed tool ", () => {
				const { composable } = getComposable(RoleName.Student);

				const result = composable.determineNotLicensedTranslationKey();

				expect(result).toEqual("common.tool.information.notLicensed.student");
			});
		});

		describe("when user is teacher and tool is not licensed", () => {
			it("should return translation key for not licensed tool ", () => {
				const { composable } = getComposable(RoleName.Teacher);

				const result = composable.determineNotLicensedTranslationKey();

				expect(result).toEqual("common.tool.information.notLicensed.teacher");
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
			it("should return true ", () => {
				const { composable } = getComposable(RoleName.Teacher);

				const result = composable.isTeacher();

				expect(result).toBe(true);
			});
		});

		describe("when user is not teacher", () => {
			it("should return true ", () => {
				const { composable } = getComposable(RoleName.Student);

				const result = composable.isTeacher();

				expect(result).toBe(false);
			});
		});
	});
});
