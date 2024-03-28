import {
	ContextExternalToolConfigurationStatusFactory,
	mountComposable,
} from "@@/tests/test-utils";
import { useContextExternalToolConfigurationStatus } from "./ContextExternalToolConfigurationStatus.composable";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import AuthModule from "@/store/auth";
import { createModuleMocks } from "@/utils/mock-store-module";

describe("ToolConfigurationStatus.composable", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("determineOutdatedTranslationKey for teacher", () => {
		describe("when user is teacher and tool is outdated on scope school and context", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["teacher"],
				});

				const toolConfigurationStatus =
					ContextExternalToolConfigurationStatusFactory.build({
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
				const { determineOutdatedTranslationKey, toolConfigurationStatus } =
					setup();

				const result = determineOutdatedTranslationKey(toolConfigurationStatus);

				expect(result).toEqual(
					"common.tool.information.outdatedOnSchoolAndContext.teacher"
				);
			});
		});

		describe("when user is teacher and tool is outdated on scope school", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["teacher"],
				});

				const toolConfigurationStatus =
					ContextExternalToolConfigurationStatusFactory.build({
						isOutdatedOnScopeSchool: true,
						isOutdatedOnScopeContext: false,
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
				const { determineOutdatedTranslationKey, toolConfigurationStatus } =
					setup();

				const result = determineOutdatedTranslationKey(toolConfigurationStatus);

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
					ContextExternalToolConfigurationStatusFactory.build({
						isOutdatedOnScopeSchool: false,
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
				const { determineOutdatedTranslationKey, toolConfigurationStatus } =
					setup();

				const result = determineOutdatedTranslationKey(toolConfigurationStatus);

				expect(result).toEqual(
					"common.tool.information.outdatedOnContext.teacher"
				);
			});
		});

		describe("when user is student and tool is outdated on scope school and context", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["student"],
				});

				const toolConfigurationStatus =
					ContextExternalToolConfigurationStatusFactory.build({
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
				const { determineOutdatedTranslationKey, toolConfigurationStatus } =
					setup();

				const result = determineOutdatedTranslationKey(toolConfigurationStatus);

				expect(result).toEqual("common.tool.information.outdated.student");
			});
		});

		describe("when user is student and tool is outdated on scope school", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["student"],
				});

				const toolConfigurationStatus =
					ContextExternalToolConfigurationStatusFactory.build({
						isOutdatedOnScopeSchool: true,
						isOutdatedOnScopeContext: false,
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
				const { determineOutdatedTranslationKey, toolConfigurationStatus } =
					setup();

				const result = determineOutdatedTranslationKey(toolConfigurationStatus);

				expect(result).toEqual("common.tool.information.outdated.student");
			});
		});

		describe("when user is student and tool is outdated on scope context", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["student"],
				});

				const toolConfigurationStatus =
					ContextExternalToolConfigurationStatusFactory.build({
						isOutdatedOnScopeSchool: false,
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
				const { determineOutdatedTranslationKey, toolConfigurationStatus } =
					setup();

				const result = determineOutdatedTranslationKey(toolConfigurationStatus);

				expect(result).toEqual("common.tool.information.outdated.student");
			});
		});
	});

	describe("determineIncompleteTranslationKey", () => {
		describe("when user is teacher and tool is incomplete on scope context", () => {
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

			it("should return translationkey for incomplete tool on scope context ", () => {
				const { determineIncompleteTranslationKey } = setup();

				const result = determineIncompleteTranslationKey();

				expect(result).toEqual(
					"common.tool.information.incompleteOnContext.teacher"
				);
			});
		});

		describe("when user is student and tool is incomplete on scope context", () => {
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

			it("should return translationkey for incomplete on scope context ", () => {
				const { determineIncompleteTranslationKey } = setup();

				const result = determineIncompleteTranslationKey();

				expect(result).toEqual("common.tool.information.incomplete.student");
			});
		});
	});
});
