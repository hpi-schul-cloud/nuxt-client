import { RoleName } from "@/serverApi/v3";
import AuthModule from "@/store/auth";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	ContextExternalToolConfigurationStatusFactory,
	mountComposable,
} from "@@/tests/test-utils";
import { useContextExternalToolConfigurationStatus } from "./ContextExternalToolConfigurationStatus.composable";

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

	describe("composable.composable.determineToolStatusTranslationKey for teacher", () => {
		describe("when user is teacher and tool is outdated on scope school and context", () => {
			const setup = () => {
				const toolConfigurationStatus =
					ContextExternalToolConfigurationStatusFactory.build({
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
					ContextExternalToolConfigurationStatusFactory.build({
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
					ContextExternalToolConfigurationStatusFactory.build({
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
					ContextExternalToolConfigurationStatusFactory.build({
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
					ContextExternalToolConfigurationStatusFactory.build({
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
					ContextExternalToolConfigurationStatusFactory.build();

				const { composable } = getComposable(RoleName.Teacher);

				return {
					toolConfigurationStatus,
					composable,
				};
			};

			it("should return a generic translation key", () => {
				const { composable, toolConfigurationStatus } = setup();

				const result = composable.determineToolStatusTranslationKey(
					toolConfigurationStatus
				);

				expect(result).toEqual("error.generic");
			});
		});

		describe("when user is student and tool is outdated on scope school and context", () => {
			const setup = () => {
				const toolConfigurationStatus =
					ContextExternalToolConfigurationStatusFactory.build({
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

	describe("determineDeactivatedTranslationKey", () => {
		describe("when user is student and tool is deactivated", () => {
			it("should return translation key for deactivated tool ", () => {
				const { composable } = getComposable(RoleName.Student);

				const result = composable.determineDeactivatedMessage();

				expect(result).toEqual("common.tool.information.deactivated.student");
			});
		});

		describe("when user is teacher and tool is deactivated", () => {
			it("should return translation key for deactivated tool ", () => {
				const { composable } = getComposable(RoleName.Teacher);

				const result = composable.determineDeactivatedMessage();

				expect(result).toEqual("common.tool.information.deactivated.teacher");
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
