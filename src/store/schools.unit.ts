import * as serverApi from "@/serverApi/v3/api";
import { SchoolFeature, SystemsApiInterface } from "@/serverApi/v3/api";
import { authModule, envConfigModule } from "@/store";
import { envsFactory, meResponseFactory } from "@@/tests/test-utils";
import { schoolResponseFactory } from "@@/tests/test-utils/factory/schoolResponseFactory";
import { schoolSystemResponseFactory } from "@@/tests/test-utils/factory/schoolSystemResponseFactory";
import { mockApiResponse } from "@@/tests/test-utils/mockApiResponse";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import setupStores from "@@/tests/test-utils/setupStores";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { AxiosError } from "axios";
import AuthModule from "./auth";
import EnvConfigModule from "./env-config";
import SchoolsModule from "./schools";

describe("schools module", () => {
	let schoolApi: DeepMocked<serverApi.SchoolApiInterface>;
	let systemsApi: DeepMocked<SystemsApiInterface>;

	beforeEach(() => {
		schoolApi = createMock<serverApi.SchoolApiInterface>();
		systemsApi = createMock<SystemsApiInterface>();

		jest.spyOn(serverApi, "SchoolApiFactory").mockReturnValue(schoolApi);
		jest.spyOn(serverApi, "SystemsApiFactory").mockReturnValue(systemsApi);

		setupStores({ authModule: AuthModule, envConfigModule: EnvConfigModule });
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("actions", () => {
		describe("fetchSchool", () => {
			it("should call mutations correctly", async () => {
				const mockMe = meResponseFactory.build();
				authModule.setMe(mockMe);
				const mockSchoolResponse = schoolResponseFactory.build();
				schoolApi.schoolControllerGetSchoolById.mockResolvedValueOnce(
					mockApiResponse({ data: mockSchoolResponse })
				);
				const schoolsModule = new SchoolsModule({});

				const setSchoolSpy = jest.spyOn(schoolsModule, "setSchool");
				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");

				await schoolsModule.fetchSchool();

				expect(setLoadingSpy).toHaveBeenCalledTimes(2);
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
				expect(setSchoolSpy).toHaveBeenCalled();
				expect(setSchoolSpy.mock.calls[0][0]).toStrictEqual(mockSchoolResponse);
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});

			it("should set school state correctly", async () => {
				const mockMe = meResponseFactory.build();
				authModule.setMe(mockMe);
				const mockSchoolResponse = schoolResponseFactory.build({
					features: [
						serverApi.SchoolFeature.RocketChat,
						serverApi.SchoolFeature.Videoconference,
					],
				});
				schoolApi.schoolControllerGetSchoolById.mockResolvedValueOnce(
					mockApiResponse({ data: mockSchoolResponse })
				);
				const schoolsModule = new SchoolsModule({});

				const expectedFeatureObject: Record<SchoolFeature, boolean> = {
					rocketChat: true,
					videoconference: true,
					studentVisibility: false,
					ldapUniventionMigrationSchool: false,
					showOutdatedUsers: false,
					enableLdapSyncDuringMigration: false,
					oauthProvisioningEnabled: false,
					nextcloud: false,
					aiTutor: false,
				};

				await schoolsModule.fetchSchool();

				const school = schoolsModule.getSchool;
				expect(school.featureObject).toStrictEqual(expectedFeatureObject);
			});

			it("should set error if api client throws error", async () => {
				schoolApi.schoolControllerGetSchoolById.mockRejectedValueOnce(
					new AxiosError()
				);

				const schoolsModule = new SchoolsModule({});
				const setErrorSpy = jest.spyOn(schoolsModule, "setError");
				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				const mockMe = meResponseFactory.build({
					school: { id: "4711" },
				});
				authModule.setMe(mockMe);

				await schoolsModule.fetchSchool();

				expect(setErrorSpy).toHaveBeenCalled();
				expect(setErrorSpy.mock.calls[0][0]).toStrictEqual(expect.any(Object));
				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});
		});

		describe("fetchSystems", () => {
			it("should call backend and sets state correctly", async () => {
				const schoolsModule = new SchoolsModule({});
				schoolsModule.setSchool({
					...mockSchool,
					systemIds: ["mockSystemId"],
				});

				const mockSchoolSystemResponse =
					schoolSystemResponseFactory.buildList(1);
				schoolApi.schoolControllerGetSchoolSystems.mockResolvedValueOnce(
					mockApiResponse({ data: mockSchoolSystemResponse })
				);

				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				const setSystemsSpy = jest.spyOn(schoolsModule, "setSystems");

				await schoolsModule.fetchSystems();

				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
				expect(setSystemsSpy).toHaveBeenCalled();
				expect(setSystemsSpy.mock.calls[0][0]).toStrictEqual(
					mockSchoolSystemResponse
				);
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});

			it("should trigger error and goes into the catch block", async () => {
				schoolApi.schoolControllerGetSchoolSystems.mockRejectedValueOnce(
					new AxiosError()
				);

				const schoolsModule = new SchoolsModule({});
				schoolsModule.setSchool({
					...mockSchool,
					systemIds: ["mockSystemId"],
				});

				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				const setErrorSpy = jest.spyOn(schoolsModule, "setError");

				await schoolsModule.fetchSystems();

				expect(setErrorSpy).toHaveBeenCalled();
				expect(setErrorSpy.mock.calls[0][0]).toStrictEqual(expect.any(Object));
				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});
		});

		describe("update", () => {
			it("should call backend and set state correctly", async () => {
				const uploadData = {
					name: "Paul Newname Gymnasium",
					features: [serverApi.SchoolFeature.RocketChat],
				};

				const mockSchoolResponse = schoolResponseFactory.build();
				schoolApi.schoolControllerUpdateSchool.mockResolvedValueOnce(
					mockApiResponse({ data: mockSchoolResponse })
				);

				const schoolsModule = new SchoolsModule({});

				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				const setSchoolSpy = jest.spyOn(schoolsModule, "setSchool");

				await schoolsModule.update({ id: "111", props: uploadData });

				expect(schoolApi.schoolControllerUpdateSchool).toHaveBeenCalledWith(
					"111",
					{
						features: ["rocketChat"],
						name: "Paul Newname Gymnasium",
					}
				);
				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
				expect(setSchoolSpy).toHaveBeenCalled();
				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});

			it("should trigger error and goes into the catch block", async () => {
				const uploadData = {
					data: "some data to be updated",
					features: [serverApi.SchoolFeature.RocketChat],
				};
				const schoolsModule = new SchoolsModule({});
				schoolApi.schoolControllerUpdateSchool.mockRejectedValueOnce(
					new AxiosError()
				);

				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				const setErrorSpy = jest.spyOn(schoolsModule, "setError");

				await schoolsModule.update({ id: "111", props: uploadData });

				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
				expect(setErrorSpy).toHaveBeenCalled();
				expect(setErrorSpy.mock.calls[0][0]).toStrictEqual(expect.any(Object));
				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});
		});

		describe("deleteSystem", () => {
			describe("when using the nest api", () => {
				it("should call backend and sets state correctly", async () => {
					const systemId = "id_1";
					const schoolsModule = new SchoolsModule({});

					const school = schoolResponseFactory.build();
					schoolsModule.setSchool(school);

					const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
					const fetchSchoolSpy = jest.spyOn(schoolsModule, "fetchSchool");
					const fetchSystemsSpy = jest.spyOn(schoolsModule, "fetchSystems");

					await schoolsModule.deleteSystem(systemId);
					expect(
						schoolApi.schoolControllerRemoveSystemFromSchool
					).toHaveBeenCalledWith(school.id, systemId);
					expect(setLoadingSpy).toHaveBeenCalled();
					expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
					expect(fetchSchoolSpy).toHaveBeenCalled();
					expect(fetchSystemsSpy).toHaveBeenCalled();
				});

				it("should trigger error and goes into the catch block", async () => {
					const systemId = "id_1";
					schoolApi.schoolControllerRemoveSystemFromSchool.mockRejectedValueOnce(
						new AxiosError()
					);
					const schoolsModule = new SchoolsModule({});

					const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
					const setErrorSpy = jest.spyOn(schoolsModule, "setError");

					await schoolsModule.deleteSystem(systemId);

					expect(setErrorSpy).toHaveBeenCalled();
					expect(setErrorSpy.mock.calls[0][0]).toStrictEqual(
						expect.any(Object)
					);
					expect(setLoadingSpy).toHaveBeenCalled();
					expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
				});
			});
		});

		describe("endMaintenance", () => {
			const setup = () => {
				const schoolsModule = new SchoolsModule({});
				const spy = jest.spyOn(serverApi, "UserImportApiFactory");
				const mockApi = {
					importUserControllerEndSchoolInMaintenance: jest.fn(() => ({})),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);
				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				const setErrorSpy = jest.spyOn(schoolsModule, "setError");
				const setSchoolSpy = jest.spyOn(schoolsModule, "setSchool");

				return {
					schoolsModule,
					spy,
					mockApi,
					setLoadingSpy,
					setErrorSpy,
					setSchoolSpy,
				};
			};

			it("should not call backend if inMaintenance is false", async () => {
				const { schoolsModule, mockApi } = setup();

				schoolsModule.setSchool({
					...mockSchool,
					inMaintenance: false,
				});
				await schoolsModule.migrationStartSync();
				expect(
					mockApi.importUserControllerEndSchoolInMaintenance
				).not.toHaveBeenCalled();
			});

			it("should call backend and set state correctly", async () => {
				const { schoolsModule, mockApi, setLoadingSpy, setSchoolSpy } = setup();

				schoolsModule.setSchool({
					...mockSchool,
					inMaintenance: true,
				});

				await schoolsModule.migrationStartSync();

				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);

				expect(
					mockApi.importUserControllerEndSchoolInMaintenance
				).toHaveBeenCalledTimes(1);
				expect(setSchoolSpy).toHaveBeenCalledTimes(2);
				expect(setSchoolSpy.mock.calls[1][0]).toStrictEqual({
					...mockSchool,
					inMaintenance: false,
				});
			});

			it("should trigger error and goes into the catch block", async () => {
				const { schoolsModule, setLoadingSpy, setErrorSpy, spy } = setup();

				const error = new AxiosError(
					JSON.stringify({ statusCode: "500", message: "foo" })
				);
				const mockApi = {
					importUserControllerEndSchoolInMaintenance: jest.fn(() =>
						Promise.reject(error)
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);
				schoolsModule.setSchool({
					...mockSchool,
					inMaintenance: true,
				});

				await schoolsModule.migrationStartSync();

				expect(
					mockApi.importUserControllerEndSchoolInMaintenance
				).toHaveBeenCalledTimes(1);

				expect(setErrorSpy).toHaveBeenCalled();
				expect(setErrorSpy.mock.calls[0][0]).toStrictEqual(expect.any(Object));
				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});
		});

		describe("Set school in user migration mode", () => {
			const setupSchoolInMigrationMode = () => {
				const schoolsModule = new SchoolsModule({});
				const spy = jest.spyOn(serverApi, "UserImportApiFactory");
				const mockApi = {
					importUserControllerStartSchoolInUserMigration: jest.fn(() => ({})),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);
				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				const setErrorSpy = jest.spyOn(schoolsModule, "setError");
				const setSchoolSpy = jest.spyOn(schoolsModule, "setSchool");

				return {
					schoolsModule,
					spy,
					mockApi,
					setLoadingSpy,
					setErrorSpy,
					setSchoolSpy,
				};
			};

			it("should not call backend if inUserMigration flag is not true", async () => {
				const { schoolsModule, mockApi } = setupSchoolInMigrationMode();

				schoolsModule.setSchool({
					...mockSchool,
					inUserMigration: false,
				});
				await schoolsModule.migrationStartSync();
				expect(
					mockApi.importUserControllerStartSchoolInUserMigration
				).not.toHaveBeenCalled();
			});

			it("should call backend and set state", async () => {
				const { schoolsModule, mockApi, setLoadingSpy, setSchoolSpy } =
					setupSchoolInMigrationMode();

				schoolsModule.setSchool({
					...mockSchool,
					inUserMigration: false,
					inMaintenance: true,
				});

				await schoolsModule.setSchoolInUserMigration();

				expect(setLoadingSpy).toHaveBeenCalledTimes(2);
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);

				expect(
					mockApi.importUserControllerStartSchoolInUserMigration
				).toHaveBeenCalledTimes(1);

				expect(setSchoolSpy).toHaveBeenCalledTimes(2);
				expect(setSchoolSpy.mock.calls[1][0]).toStrictEqual({
					...mockSchool,
					inUserMigration: true,
					inMaintenance: true,
				});
			});

			it("should handle error", async () => {
				const { schoolsModule, setLoadingSpy, setErrorSpy, spy } =
					setupSchoolInMigrationMode();
				const error = { statusCode: "500", message: "foo" };

				const mockApi = {
					importUserControllerStartSchoolInUserMigration: jest.fn(() =>
						Promise.reject({ ...error })
					),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);
				schoolsModule.setSchool({
					...mockSchool,
					inUserMigration: false,
				});

				await schoolsModule.setSchoolInUserMigration();

				expect(
					mockApi.importUserControllerStartSchoolInUserMigration
				).toHaveBeenCalledTimes(1);

				expect(setErrorSpy).toHaveBeenCalled();
				expect(setErrorSpy.mock.calls[0][0]).toStrictEqual(expect.any(Object));
				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});
		});
	});

	describe("mutations", () => {
		describe("setSchool", () => {
			it("should set the school data", () => {
				const schoolsModule = new SchoolsModule({});
				const schoolDataToBeChanged = {
					_id: "456",
					name: "Updated Gymnasium",
				};
				expect(schoolsModule.getSchool).not.toStrictEqual({
					...mockSchool,
					...schoolDataToBeChanged,
				});
				schoolsModule.setSchool({ ...mockSchool, ...schoolDataToBeChanged });
				expect(schoolsModule.getSchool).toStrictEqual({
					...mockSchool,
					...schoolDataToBeChanged,
				});
			});
		});

		describe("setSystems", () => {
			it("should set systems data", () => {
				const schoolsModule = new SchoolsModule({});
				const expectedSystemState = [schoolSystemResponseFactory.build()];
				expect(schoolsModule.getSystems).not.toStrictEqual(expectedSystemState);
				schoolsModule.setSystems(expectedSystemState);
				expect(schoolsModule.getSystems).toStrictEqual(expectedSystemState);
			});
		});

		describe("setLoading", () => {
			it("should set loading data", () => {
				const schoolsModule = new SchoolsModule({});
				const loadingValue = true;
				expect(schoolsModule.getLoading).not.toBe(loadingValue);
				schoolsModule.setLoading(loadingValue);
				expect(schoolsModule.getLoading).toBe(loadingValue);
			});
		});
	});

	describe("getters", () => {
		describe("getSchool", () => {
			it("should return school state", () => {
				const schoolsModule = new SchoolsModule({});
				const expectedValue = {
					...mockSchool,
					name: "mockName",
				};
				expect(schoolsModule.getSchool).not.toStrictEqual(expectedValue);
				schoolsModule.setSchool(expectedValue);
				expect(schoolsModule.getSchool).toStrictEqual(expectedValue);
			});
		});

		describe("getCurrentYear", () => {
			it("should return current year state", () => {
				const schoolsModule = new SchoolsModule({});
				const mockYear = mockSchool.currentYear;

				expect(schoolsModule.getCurrentYear).toStrictEqual(mockYear);
			});
		});

		describe("getFederalState", () => {
			it("shoud return federalState state", () => {
				const schoolsModule = new SchoolsModule({});
				const mockFederalState = mockSchool.federalState;

				expect(schoolsModule.getFederalState).toStrictEqual(mockFederalState);
			});
		});

		describe("getSystems", () => {
			it("should return systems state", () => {
				const schoolsModule = new SchoolsModule({});
				const systems = schoolSystemResponseFactory.buildList(1);
				expect(schoolsModule.getSystems).not.toStrictEqual(systems);
				schoolsModule.setSystems(systems);
				expect(schoolsModule.getSystems).toStrictEqual(systems);
			});
		});

		describe("getLoading", () => {
			it("should return loading state", () => {
				const schoolsModule = new SchoolsModule({});
				expect(schoolsModule.getLoading).not.toStrictEqual(true);
				schoolsModule.setLoading(true);
				expect(schoolsModule.getLoading).toStrictEqual(true);
			});
		});

		describe("getIsSynced", () => {
			it("should return correct sync status for univention schools", () => {
				const schoolsModule = new SchoolsModule({});
				const systems = [
					schoolSystemResponseFactory.build({
						id: "id_1",
						type: "ldap",
						ldapConfig: {
							provider: "univention",
						},
					}),
				];
				schoolsModule.setSystems(systems);
				expect(schoolsModule.schoolIsSynced).toStrictEqual(true);
			});
			it("should return correct sync status for TSP schools", () => {
				const schoolsModule = new SchoolsModule({});
				const systems = [
					schoolSystemResponseFactory.build({
						id: "id_1",
						type: "tsp-school",
					}),
				];
				schoolsModule.setSystems(systems);
				expect(schoolsModule.schoolIsSynced).toStrictEqual(true);
			});
			it("should return correct sync status for ldap general schools", () => {
				const schoolsModule = new SchoolsModule({});
				const systems = [
					schoolSystemResponseFactory.build({
						id: "id_1",
						type: "ldap",
						ldapConfig: {
							provider: "general",
						},
					}),
				];
				schoolsModule.setSystems(systems);
				expect(schoolsModule.schoolIsSynced).toStrictEqual(true);
			});
			it("should return correct sync status for moodle schools", () => {
				const schoolsModule = new SchoolsModule({});
				const systems = [
					schoolSystemResponseFactory.build({
						id: "id_1",
						type: "moodle",
					}),
				];
				schoolsModule.setSystems(systems);
				expect(schoolsModule.schoolIsSynced).toStrictEqual(false);
			});
			it("should return correct sync status for itslearning schools", () => {
				const schoolsModule = new SchoolsModule({});
				const systems = [
					schoolSystemResponseFactory.build({
						id: "id_1",
						type: "itslearning",
					}),
				];
				schoolsModule.setSystems(systems);
				expect(schoolsModule.schoolIsSynced).toStrictEqual(false);
			});
		});

		describe("schoolIsExternallyManaged", () => {
			describe("when theme is thr", () => {
				const setup = () => {
					const envs = envsFactory.build({
						SC_THEME: serverApi.SchulcloudTheme.Thr,
					});
					envConfigModule.setEnvs(envs);
				};

				it("should return true", () => {
					setup();
					const schoolsModule = new SchoolsModule({});

					const result = schoolsModule.schoolIsExternallyManaged;

					expect(result).toBe(true);
				});
			});

			describe("when theme is not thr", () => {
				const setupTheme = () => {
					const envs = envsFactory.build({
						SC_THEME: serverApi.SchulcloudTheme.Default,
					});
					envConfigModule.setEnvs(envs);
				};

				describe("when school is external", () => {
					const setup = () => {
						setupTheme();

						const schoolsModule = new SchoolsModule({});
						schoolsModule.setSchool({
							...mockSchool,
							isExternal: true,
						});

						return { schoolsModule };
					};

					it("should return true", () => {
						const { schoolsModule } = setup();

						const result = schoolsModule.schoolIsExternallyManaged;

						expect(result).toBe(true);
					});
				});

				describe("when school is not external", () => {
					const setup = () => {
						setupTheme();

						const schoolsModule = new SchoolsModule({});
						schoolsModule.setSchool({
							...mockSchool,
							isExternal: false,
						});

						return { schoolsModule };
					};

					it("should return false", () => {
						const { schoolsModule } = setup();

						const result = schoolsModule.schoolIsExternallyManaged;

						expect(result).toBe(false);
					});
				});
			});
		});
	});
});
