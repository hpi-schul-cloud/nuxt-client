import SchoolsModule from "./schools";
import ImportUsersModule from "@/store/import-users";
import { initializeAxios } from "@/utils/api";
import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { authModule } from "@/store";
import { mockSchool, mockUser } from "@@/tests/test-utils/mockObjects";
import * as serverApi from "@/serverApi/v3/api";
import setupStores from "@@/tests/test-utils/setupStores";
import AuthModule from "./auth";

let receivedRequests: any[] = [];
let getRequestReturn: any = {};

const axiosInitializer = () => {
	initializeAxios({
		$get: async (path: string) => {
			receivedRequests.push({ path });
			return getRequestReturn;
		},
		post: async (path: string) => {},
	} as NuxtAxiosInstance);
};
axiosInitializer();

describe("schools module", () => {
	describe("actions", () => {
		beforeEach(() => {
			initializeAxios({
				$get: async (path: string) => {
					receivedRequests.push({ path });
					return getRequestReturn;
				},
				post: async (path: string) => {},
			} as NuxtAxiosInstance);
			setupStores({ auth: AuthModule });
		});
		describe("fetchSchool", () => {
			beforeEach(() => {
				receivedRequests = [];
			});
			it("should call backend and sets state correctly", async () => {
				authModule.setUser({ ...mockUser, schoolId: "sampleSchoolId" });
				getRequestReturn = {
					id: "id_123",
					features: ["rocketChat", "messengerSchoolRoom"],
				};
				const schoolsModule = new SchoolsModule({});

				const setSchoolSpy = jest.spyOn(schoolsModule, "setSchool");
				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				const fetchCurrentYearSpy = jest.spyOn(
					schoolsModule,
					"fetchCurrentYear"
				);
				const fetchFederalSpy = jest.spyOn(schoolsModule, "fetchFederalState");
				const fetchSystems = jest.spyOn(schoolsModule, "fetchSystems");

				await schoolsModule.fetchSchool();

				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].path).toStrictEqual(
					"/v1/schools/sampleSchoolId "
				);

				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
				expect(setSchoolSpy).toHaveBeenCalled();
				expect(setSchoolSpy.mock.calls[0][0]).toStrictEqual({
					id: "id_123",
					features: {
						messenger: false,
						messengerSchoolRoom: true,
						messengerStudentRoomCreate: false,
						rocketChat: true,
						studentVisibility: false,
						videoconference: false,
						ldapUniventionMigrationSchool: false,
					},
				});
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});

			it("should trigger error and goes into the catch block", async () => {
				initializeAxios({
					$get: async (path: string) => {
						throw new Error("");
						return;
					},
				} as NuxtAxiosInstance);

				const schoolsModule = new SchoolsModule({});
				const setErrorSpy = jest.spyOn(schoolsModule, "setError");
				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				authModule.setUser({
					schoolId: "4711",
					_id: "",
					__v: 0,
					firstName: "",
					lastName: "",
					email: "",
					updatedAt: "",
					birthday: "",
					createdAt: "",
					preferences: {},
					roles: [],
					emailSearchValues: [],
					firstNameSearchValues: [],
					lastNameSearchValues: [],
					consent: {},
					forcePasswordChange: false,
					language: "",
					fullName: "",
					id: "",
					avatarInitials: "",
					avatarBackgroundColor: "",
					age: 0,
					displayName: "",
					permissions: [],
					accountId: "",
					schoolName: "",
					externallyManaged: false,
				});

				await schoolsModule.fetchSchool();

				expect(setErrorSpy).toHaveBeenCalled();
				expect(setErrorSpy.mock.calls[0][0]).toStrictEqual(expect.any(Object));
				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});
		});
		describe("fetchFederalState", () => {
			beforeEach(() => {
				receivedRequests = [];
			});
			it("should call backend and sets state correctly", async () => {
				getRequestReturn = { data: "dummy response" };
				const schoolsModule = new SchoolsModule({});
				schoolsModule.setSchool({
					...mockSchool,
					federalState: "federalStateId",
				});

				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				const setFederalSpy = jest.spyOn(schoolsModule, "setFederalState");

				await schoolsModule.fetchFederalState();

				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].path).toStrictEqual(
					"/v1/federalStates/federalStateId"
				);
				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
				expect(setFederalSpy).toHaveBeenCalled();
				expect(setFederalSpy.mock.calls[0][0]).toStrictEqual({
					data: "dummy response",
				});
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});
			it("should trigger error and goes into the catch block", async () => {
				initializeAxios({
					$get: async (path: string) => {
						throw new Error("");
						return;
					},
				} as NuxtAxiosInstance);

				const schoolsModule = new SchoolsModule({});
				schoolsModule.setSchool({
					...mockSchool,
					federalState: "federalStateId",
				});

				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				const setErrorSpy = jest.spyOn(schoolsModule, "setError");

				await schoolsModule.fetchFederalState();

				expect(setErrorSpy).toHaveBeenCalled();
				expect(setErrorSpy.mock.calls[0][0]).toStrictEqual(expect.any(Object));
				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});
		});

		describe("fetchCurrentYear", () => {
			beforeEach(() => {
				receivedRequests = [];
			});
			it("should trigger call backend and sets state correctly", async () => {
				axiosInitializer();
				getRequestReturn = { data: "dummy response" };
				const schoolsModule = new SchoolsModule({});
				schoolsModule.setSchool({
					...mockSchool,
					currentYear: "yearId",
				});

				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				const setCurrentYearSpy = jest.spyOn(schoolsModule, "setCurrentYear");

				await schoolsModule.fetchCurrentYear();

				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].path).toStrictEqual("/v1/years/yearId");
				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
				expect(setCurrentYearSpy).toHaveBeenCalled();
				expect(setCurrentYearSpy.mock.calls[0][0]).toStrictEqual({
					data: "dummy response",
				});
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});
			it("should trigger error and goes into the catch block", async () => {
				initializeAxios({
					$get: async (path: string) => {
						throw new Error("");
						return;
					},
				} as NuxtAxiosInstance);

				const schoolsModule = new SchoolsModule({});
				schoolsModule.setSchool({
					...mockSchool,
					currentYear: "yearId",
				});

				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				const setErrorSpy = jest.spyOn(schoolsModule, "setError");

				await schoolsModule.fetchCurrentYear();

				expect(receivedRequests).toHaveLength(0);
				expect(setErrorSpy).toHaveBeenCalled();
				expect(setErrorSpy.mock.calls[0][0]).toStrictEqual(expect.any(Object));
				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});
		});
		describe("fetchSystems", () => {
			beforeEach(() => {
				receivedRequests = [];
			});
			it("should call backend and sets state correctly", async () => {
				axiosInitializer();
				getRequestReturn = { data: "dummy response" };
				const schoolsModule = new SchoolsModule({});
				schoolsModule.setSchool({
					...mockSchool,
					systems: ["mockSystemId"],
				});

				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				const setSystemsSpy = jest.spyOn(schoolsModule, "setSystems");

				await schoolsModule.fetchSystems();

				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].path).toStrictEqual(
					"v1/systems/mockSystemId"
				);
				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
				expect(setSystemsSpy).toHaveBeenCalled();
				expect(setSystemsSpy.mock.calls[0][0]).toStrictEqual([
					{
						data: "dummy response",
					},
				]);
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});
			it("should trigger error and goes into the catch block", async () => {
				initializeAxios({
					$get: async (path: string) => {
						throw new Error("");
						return;
					},
				} as NuxtAxiosInstance);

				const schoolsModule = new SchoolsModule({});
				schoolsModule.setSchool({
					...mockSchool,
					systems: ["mockSystemId"],
				});

				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				const setErrorSpy = jest.spyOn(schoolsModule, "setError");

				await schoolsModule.fetchSystems();

				expect(receivedRequests).toHaveLength(0);
				expect(setErrorSpy).toHaveBeenCalled();
				expect(setErrorSpy.mock.calls[0][0]).toStrictEqual(expect.any(Object));
				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});
		});
		describe("update", () => {
			beforeEach(() => {
				receivedRequests = [];
			});
			it("should call backend and set state correctly", async () => {
				const uploadData = {
					id: "id_123",
					data: "some data to be updated",
					features: {
						messenger: false,
						messengerSchoolRoom: true,
						messengerStudentRoomCreate: false,
						rocketChat: true,
						studentVisibility: false,
						videoconference: false,
						ldapUniventionMigrationSchool: false,
					},
				};
				initializeAxios({
					$patch: async (path: string) => {
						receivedRequests.push({ path });
						return {
							id: "id_123",
							data: "some data to be updated",
							features: ["rocketChat", "messengerSchoolRoom"],
						};
					},
				} as NuxtAxiosInstance);
				const schoolsModule = new SchoolsModule({});

				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				const setSchoolSpy = jest.spyOn(schoolsModule, "setSchool");

				await schoolsModule.update(uploadData);

				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].path).toStrictEqual("/v1/schools/id_123");
				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
				expect(setSchoolSpy).toHaveBeenCalled();
				expect(setSchoolSpy.mock.calls[0][0]).toStrictEqual(expect.any(Object));
				expect(setSchoolSpy.mock.calls[0][0]).toStrictEqual(uploadData);
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});
			it("should trigger error and goes into the catch block", async () => {
				initializeAxios({
					$patch: async (path: string) => {
						throw new Error("");
						return;
					},
				} as NuxtAxiosInstance);

				const uploadData = {
					id: "id_123",
					data: "some data to be updated",
					features: {
						messenger: false,
						messengerSchoolRoom: true,
						messengerStudentRoomCreate: false,
						rocketChat: true,
						studentVisibility: false,
						videoconference: false,
						ldapUniventionMigrationSchool: false,
					},
				};
				const schoolsModule = new SchoolsModule({});

				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				const setErrorSpy = jest.spyOn(schoolsModule, "setError");

				await schoolsModule.update(uploadData);

				expect(receivedRequests).toHaveLength(0);
				expect(setErrorSpy).toHaveBeenCalled();
				expect(setErrorSpy.mock.calls[0][0]).toStrictEqual(expect.any(Object));
				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});
		});
		describe("deleteSystem", () => {
			beforeEach(() => {
				receivedRequests = [];
			});
			it("should call backend and sets state correctly", async () => {
				const systemId = "id_1";
				initializeAxios({
					$delete: async (path: string) => {
						receivedRequests.push({ path });
						return { data: "some data" };
					},
				} as NuxtAxiosInstance);
				const schoolsModule = new SchoolsModule({});
				const systems = [
					{ _id: "id_1", type: "itslearning" },
					{
						_id: "id_2",
						type: "moodle",
					},
					{
						_id: "id_3",
						type: "ldap",
					},
				];
				const expectedSystems = [
					{
						_id: "id_2",
						type: "moodle",
					},
					{
						_id: "id_3",
						type: "ldap",
					},
				];
				schoolsModule.setSystems(systems);

				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				const fetchSchoolSpy = jest.spyOn(schoolsModule, "fetchSchool");
				const setSystemsSpy = jest.spyOn(schoolsModule, "setSystems");

				await schoolsModule.deleteSystem(systemId);
				expect(receivedRequests.length).toBeGreaterThan(0);
				expect(receivedRequests[0].path).toStrictEqual("v1/systems/id_1");
				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[0][0]).toBe(true);
				expect(fetchSchoolSpy).toHaveBeenCalled();
				expect(setSystemsSpy.mock.calls[0][0]).toStrictEqual(expect.any(Array));
				expect(setSystemsSpy.mock.calls[0][0]).toStrictEqual(expectedSystems);
			});
			it("should trigger error and goes into the catch block", async () => {
				const systemId = "id_1";
				initializeAxios({
					$delete: async (path: string) => {
						throw new Error("");
						return "";
					},
				} as NuxtAxiosInstance);
				const schoolsModule = new SchoolsModule({});

				const setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				const setErrorSpy = jest.spyOn(schoolsModule, "setError");

				await schoolsModule.deleteSystem(systemId);

				expect(receivedRequests).toHaveLength(0);
				expect(setErrorSpy).toHaveBeenCalled();
				expect(setErrorSpy.mock.calls[0][0]).toStrictEqual(expect.any(Object));
				expect(setLoadingSpy).toHaveBeenCalled();
				expect(setLoadingSpy.mock.calls[1][0]).toBe(false);
			});
		});

		describe("endMaintenance", () => {
			let importUserModule: ImportUsersModule;
			let spy: any;
			let mockApi: any;
			let schoolsModule: SchoolsModule;
			let setLoadingSpy: jest.SpyInstance;
			let setErrorSpy: jest.SpyInstance;
			let setSchoolSpy: jest.SpyInstance;
			beforeEach(() => {
				importUserModule = new ImportUsersModule({});
				schoolsModule = new SchoolsModule({});
				spy = jest.spyOn(serverApi, "UserImportApiFactory");
				mockApi = {
					importUserControllerEndSchoolInMaintenance: jest.fn(() => {}),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);
				setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				setErrorSpy = jest.spyOn(schoolsModule, "setError");
				setSchoolSpy = jest.spyOn(schoolsModule, "setSchool");
			});
			afterEach((done) => {
				done();
				spy.mockRestore();
				setLoadingSpy.mockRestore();
				setErrorSpy.mockRestore();
				setSchoolSpy.mockRestore();
			});
			it("should not call backend if inMaintenance is false", async () => {
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
				const error = { statusCode: "500", message: "foo" };
				mockApi = {
					importUserControllerEndSchoolInMaintenance: jest.fn(() =>
						Promise.reject({ ...error })
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
			let importUserModule: ImportUsersModule;
			let spy: any;
			let mockApi: any;
			let schoolsModule: SchoolsModule;
			let setLoadingSpy: jest.SpyInstance;
			let setErrorSpy: jest.SpyInstance;
			let setSchoolSpy: jest.SpyInstance;
			beforeEach(() => {
				importUserModule = new ImportUsersModule({});
				schoolsModule = new SchoolsModule({});
				spy = jest.spyOn(serverApi, "UserImportApiFactory");
				mockApi = {
					importUserControllerStartSchoolInUserMigration: jest.fn(() => {}),
				};
				spy.mockReturnValue(
					mockApi as unknown as serverApi.UserImportApiInterface
				);
				setLoadingSpy = jest.spyOn(schoolsModule, "setLoading");
				setErrorSpy = jest.spyOn(schoolsModule, "setError");
				setSchoolSpy = jest.spyOn(schoolsModule, "setSchool");
			});
			afterEach((done) => {
				done();
				spy.mockRestore();
				setLoadingSpy.mockRestore();
				setErrorSpy.mockRestore();
				setSchoolSpy.mockRestore();
			});
			it("should not call backend if inUserMigration flag is not true", async () => {
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
				const error = { statusCode: "500", message: "foo" };
				mockApi = {
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

		describe("setFederalState", () => {
			it("should set federalState data", () => {
				const schoolsModule = new SchoolsModule({});
				const mockFederalState = {
					__v: 0,
					counties: [],
					logoUrl: "",
					_id: "mockId",
					name: "mockname",
					abbreviation: "MO",
				};
				const expectedFileStorageState = {
					_id: "0000b186816abba584714c56",
					name: "Hessen",
					abbreviation: "HE",
				};
				expect(schoolsModule.getFederalState).not.toStrictEqual({
					...mockFederalState,
					...expectedFileStorageState,
				});
				schoolsModule.setFederalState({
					...mockFederalState,
					...expectedFileStorageState,
				});
				expect(schoolsModule.getFederalState).toStrictEqual({
					...mockFederalState,
					...expectedFileStorageState,
				});
			});
		});

		describe("setSystems", () => {
			it("should set systems data", () => {
				const schoolsModule = new SchoolsModule({});
				const expectedSystemState = ["systems_id_2"];
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
				const mockYear = schoolsModule.getCurrentYear;
				expect(schoolsModule.getCurrentYear).not.toStrictEqual({
					...mockYear,
					_id: "mockId",
				});
				schoolsModule.setCurrentYear({ ...mockYear, _id: "mockId" });
				expect(schoolsModule.getCurrentYear).toStrictEqual({
					...mockYear,
					_id: "mockId",
				});
			});
		});

		describe("getFederalState", () => {
			it("shoud return federalState state", () => {
				const schoolsModule = new SchoolsModule({});
				const mockFederalState = {
					__v: 0,
					counties: [],
					logoUrl: "",
					_id: "mockId",
					name: "mockname",
					abbreviation: "MO",
				};
				expect(schoolsModule.getFederalState).not.toStrictEqual(
					mockFederalState
				);
				schoolsModule.setFederalState(mockFederalState);
				expect(schoolsModule.getFederalState).toStrictEqual(mockFederalState);
			});
		});

		describe("getSystems", () => {
			it("should return systems state", () => {
				const schoolsModule = new SchoolsModule({});
				const systems = ["system"];
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
			it("should return correct sync status for iserv-idm schools", () => {
				const schoolsModule = new SchoolsModule({});
				const systems = [
					{
						_id: "id_1",
						type: "ldap",
						ldapConfig: {
							provider: "iserv-idm",
						},
					},
				];
				schoolsModule.setSystems(systems);
				expect(schoolsModule.schoolIsSynced).toStrictEqual(true);
			});
			it("should return correct sync status for univention schools", () => {
				const schoolsModule = new SchoolsModule({});
				const systems = [
					{
						_id: "id_1",
						type: "ldap",
						ldapConfig: {
							provider: "univention",
						},
					},
				];
				schoolsModule.setSystems(systems);
				expect(schoolsModule.schoolIsSynced).toStrictEqual(true);
			});
			it("should return correct sync status for TSP schools", () => {
				const schoolsModule = new SchoolsModule({});
				const systems = [
					{
						_id: "id_1",
						type: "tsp-school",
					},
				];
				schoolsModule.setSystems(systems);
				expect(schoolsModule.schoolIsSynced).toStrictEqual(true);
			});
			it("should return correct sync status for ldap general schools", () => {
				const schoolsModule = new SchoolsModule({});
				const systems = [
					{
						_id: "id_1",
						type: "ldap",
						ldapConfig: {
							provider: "general",
						},
					},
				];
				schoolsModule.setSystems(systems);
				expect(schoolsModule.schoolIsSynced).toStrictEqual(true);
			});
			it("should return correct sync status for moodle schools", () => {
				const schoolsModule = new SchoolsModule({});
				const systems = [
					{
						_id: "id_1",
						type: "moodle",
					},
				];
				schoolsModule.setSystems(systems);
				expect(schoolsModule.schoolIsSynced).toStrictEqual(false);
			});
			it("should return correct sync status for itslearning schools", () => {
				const schoolsModule = new SchoolsModule({});
				const systems = [
					{
						_id: "id_1",
						type: "itslearning",
					},
				];
				schoolsModule.setSystems(systems);
				expect(schoolsModule.schoolIsSynced).toStrictEqual(false);
			});
		});
	});
});
