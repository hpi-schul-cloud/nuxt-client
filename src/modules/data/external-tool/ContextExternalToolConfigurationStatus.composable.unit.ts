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

	describe("determineToolStatusTranslationKey for teacher", () => {
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
					ContextExternalToolConfigurationStatusFactory.build({
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
					ContextExternalToolConfigurationStatusFactory.build({
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
					ContextExternalToolConfigurationStatusFactory.build({
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

			it("should return translationkey for incomplete tool", () => {
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
					ContextExternalToolConfigurationStatusFactory.build({
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

			it("should return translationkey for tool incomplete operational ", () => {
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
				const { determineToolStatusTranslationKey, toolConfigurationStatus } =
					setup();

				const result = determineToolStatusTranslationKey(
					toolConfigurationStatus
				);

				expect(result).toEqual(
					"common.tool.information.outdatedOrIncomplete.student"
				);
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

	describe("determineChipStatusTitle", () => {
		describe("when user is student", () => {
			describe("when tool is outdated on scope school", () => {
				const setup = () => {
					const authModule = createModuleMocks(AuthModule, {
						getUserRoles: ["student"],
					});

					const toolConfigurationStatus =
						ContextExternalToolConfigurationStatusFactory.build({
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

				it("should return translationkey for outdated ", () => {
					const { determineChipStatusTitle, toolConfigurationStatus } = setup();

					const result = determineChipStatusTitle(toolConfigurationStatus);

					expect(result).toEqual("pages.rooms.tools.outdated");
				});
			});

			describe("when tool is outdated on scope context", () => {
				const setup = () => {
					const authModule = createModuleMocks(AuthModule, {
						getUserRoles: ["student"],
					});

					const toolConfigurationStatus =
						ContextExternalToolConfigurationStatusFactory.build({
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

				it("should return translationkey for outdated ", () => {
					const { determineChipStatusTitle, toolConfigurationStatus } = setup();

					const result = determineChipStatusTitle(toolConfigurationStatus);

					expect(result).toEqual("pages.rooms.tools.outdated");
				});
			});

			describe("when tool is incomplete", () => {
				const setup = () => {
					const authModule = createModuleMocks(AuthModule, {
						getUserRoles: ["student"],
					});

					const toolConfigurationStatus =
						ContextExternalToolConfigurationStatusFactory.build({
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

				it("should return translationkey for incomplete ", () => {
					const { determineChipStatusTitle, toolConfigurationStatus } = setup();

					const result = determineChipStatusTitle(toolConfigurationStatus);

					expect(result).toEqual("pages.rooms.tools.outdated");
				});
			});

			describe("when tool is incomplete operational", () => {
				const setup = () => {
					const authModule = createModuleMocks(AuthModule, {
						getUserRoles: ["student"],
					});

					const toolConfigurationStatus =
						ContextExternalToolConfigurationStatusFactory.build({
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

				it("should return translationkey for incomplete operational ", () => {
					const { determineChipStatusTitle, toolConfigurationStatus } = setup();

					const result = determineChipStatusTitle(toolConfigurationStatus);

					expect(result).toEqual(undefined);
				});
			});

			describe("when tool is deactivated", () => {
				const setup = () => {
					const authModule = createModuleMocks(AuthModule, {
						getUserRoles: ["student"],
					});

					const toolConfigurationStatus =
						ContextExternalToolConfigurationStatusFactory.build({
							isDeactivated: true,
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

				it("should return translationkey for deactivated ", () => {
					const { determineChipStatusTitle, toolConfigurationStatus } = setup();

					const result = determineChipStatusTitle(toolConfigurationStatus);

					expect(result).toEqual("pages.rooms.tools.deactivated");
				});
			});
		});

		describe("when user is teacher", () => {
			describe("when tool is outdated on scope school and context", () => {
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
					const { determineChipStatusTitle, toolConfigurationStatus } = setup();

					const result = determineChipStatusTitle(toolConfigurationStatus);

					expect(result).toEqual("pages.rooms.tools.outdated");
				});
			});

			describe("when tool is outdated on scope school", () => {
				const setup = () => {
					const authModule = createModuleMocks(AuthModule, {
						getUserRoles: ["teacher"],
					});

					const toolConfigurationStatus =
						ContextExternalToolConfigurationStatusFactory.build({
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

				it("should return translationkey for outdated ", () => {
					const { determineChipStatusTitle, toolConfigurationStatus } = setup();

					const result = determineChipStatusTitle(toolConfigurationStatus);

					expect(result).toEqual("pages.rooms.tools.outdated");
				});
			});

			describe("when tool is outdated on scope context", () => {
				const setup = () => {
					const authModule = createModuleMocks(AuthModule, {
						getUserRoles: ["teacher"],
					});

					const toolConfigurationStatus =
						ContextExternalToolConfigurationStatusFactory.build({
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

				it("should return translationkey for outdated ", () => {
					const { determineChipStatusTitle, toolConfigurationStatus } = setup();

					const result = determineChipStatusTitle(toolConfigurationStatus);

					expect(result).toEqual("pages.rooms.tools.outdated");
				});
			});

			describe("when tool is incomplete", () => {
				const setup = () => {
					const authModule = createModuleMocks(AuthModule, {
						getUserRoles: ["teacher"],
					});

					const toolConfigurationStatus =
						ContextExternalToolConfigurationStatusFactory.build({
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

				it("should return translationkey for incomplete ", () => {
					const { determineChipStatusTitle, toolConfigurationStatus } = setup();

					const result = determineChipStatusTitle(toolConfigurationStatus);

					expect(result).toEqual("pages.rooms.tools.outdated");
				});
			});

			describe("when tool is incomplete operational", () => {
				const setup = () => {
					const authModule = createModuleMocks(AuthModule, {
						getUserRoles: ["teacher"],
					});

					const toolConfigurationStatus =
						ContextExternalToolConfigurationStatusFactory.build({
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

				it("should return translationkey for imcomplete ", () => {
					const { determineChipStatusTitle, toolConfigurationStatus } = setup();

					const result = determineChipStatusTitle(toolConfigurationStatus);

					expect(result).toEqual("pages.rooms.tools.outdated");
				});
			});

			describe("when tool is deactivated", () => {
				const setup = () => {
					const authModule = createModuleMocks(AuthModule, {
						getUserRoles: ["teacher"],
					});

					const toolConfigurationStatus =
						ContextExternalToolConfigurationStatusFactory.build({
							isDeactivated: true,
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

				it("should return translationkey for deactivated ", () => {
					const { determineChipStatusTitle, toolConfigurationStatus } = setup();

					const result = determineChipStatusTitle(toolConfigurationStatus);

					expect(result).toEqual("pages.rooms.tools.deactivated");
				});
			});
		});
	});
});
