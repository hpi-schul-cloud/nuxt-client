import {
	mountComposable,
	toolConfigurationStatusFactory,
} from "@@/tests/test-utils";
import { useToolConfigurationStatus } from "./ToolConfigurationStatus.composable";
import { AUTH_MODULE_KEY } from "@/utils/inject";
import AuthModule from "@/store/auth";
import { createModuleMocks } from "@/utils/mock-store-module";

describe("ToolConfigurationStatus.composable", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("determineOutdatedTranslationKey for teacher", () => {
		describe("when user is teacher", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["teacher"],
				});

				const toolConfigurationStatus = toolConfigurationStatusFactory.build({
					isOutdatedOnScopeSchool: true,
					isOutdatedOnScopeContext: true,
				});

				const composable = mountComposable(() => useToolConfigurationStatus(), {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				});

				return {
					toolConfigurationStatus,
					...composable,
					authModule,
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

			it("should return translationkey for outdated on scope school ", () => {
				const { determineOutdatedTranslationKey, toolConfigurationStatus } =
					setup();
				toolConfigurationStatus.isOutdatedOnScopeSchool = true;
				toolConfigurationStatus.isOutdatedOnScopeContext = false;

				const result = determineOutdatedTranslationKey(toolConfigurationStatus);

				expect(result).toEqual(
					"common.tool.information.outdatedOnSchool.teacher"
				);
			});

			it("should return translationkey for outdated on context school ", () => {
				const { determineOutdatedTranslationKey, toolConfigurationStatus } =
					setup();
				toolConfigurationStatus.isOutdatedOnScopeSchool = false;
				toolConfigurationStatus.isOutdatedOnScopeContext = true;

				const result = determineOutdatedTranslationKey(toolConfigurationStatus);

				expect(result).toEqual(
					"common.tool.information.outdatedOnContext.teacher"
				);
			});
		});

		describe("when user is student", () => {
			const setup = () => {
				const authModule = createModuleMocks(AuthModule, {
					getUserRoles: ["student"],
				});

				const toolConfigurationStatus = toolConfigurationStatusFactory.build({
					isOutdatedOnScopeSchool: true,
					isOutdatedOnScopeContext: true,
				});

				const composable = mountComposable(() => useToolConfigurationStatus(), {
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				});

				return {
					toolConfigurationStatus,
					...composable,
				};
			};

			it("should return translationkey for outdated on scope school and context", () => {
				const { determineOutdatedTranslationKey, toolConfigurationStatus } =
					setup();

				const result = determineOutdatedTranslationKey(toolConfigurationStatus);

				expect(result).toEqual("common.tool.information.outdated.student");
			});

			it("should return translationkey for outdated on scope school ", () => {
				const { determineOutdatedTranslationKey, toolConfigurationStatus } =
					setup();
				toolConfigurationStatus.isOutdatedOnScopeSchool = true;
				toolConfigurationStatus.isOutdatedOnScopeContext = false;

				const result = determineOutdatedTranslationKey(toolConfigurationStatus);

				expect(result).toEqual("common.tool.information.outdated.student");
			});

			it("should return translationkey for outdated on context school ", () => {
				const { determineOutdatedTranslationKey, toolConfigurationStatus } =
					setup();
				toolConfigurationStatus.isOutdatedOnScopeSchool = false;
				toolConfigurationStatus.isOutdatedOnScopeContext = true;

				const result = determineOutdatedTranslationKey(toolConfigurationStatus);

				expect(result).toEqual("common.tool.information.outdated.student");
			});
		});
	});
});
