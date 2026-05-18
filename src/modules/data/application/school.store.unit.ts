import { useSchoolStore } from "./school.store";
import { maintenanceStatusFactory, mockApiResponse, schoolFactory } from "@@/tests/test-utils";
import { schoolSystemResponseFactory } from "@@/tests/test-utils/factory/schoolSystemResponseFactory";
import {
	SchoolApiFactory,
	SchoolApiInterface,
	SchoolFeature,
	SchoolResponse,
	SchoolSystemResponse,
	SchulConneXProvisioningOptionsResponse,
} from "@api-server";
import { MaintenanceStatus } from "@data-school";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { setActivePinia } from "pinia";

vi.mock("@api-server");
const mockedSchoolApi = vi.mocked(SchoolApiFactory);

describe("useSchoolStore", () => {
	let schoolApiMock: Partial<SchoolApiInterface>;
	vi.spyOn(logger, "error").mockImplementation(vi.fn());

	const mockSchoolResponse = (data: SchoolResponse) => {
		schoolApiMock.schoolControllerGetSchoolById = vi.fn().mockResolvedValue(mockApiResponse({ data }));
	};

	const mockSchoolSystemsResponse = (data: SchoolSystemResponse[]) => {
		schoolApiMock.schoolControllerGetSchoolSystems = vi.fn().mockResolvedValue(mockApiResponse({ data }));
	};

	const mockMaintenanceResponse = (data: MaintenanceStatus) => {
		schoolApiMock.schoolControllerGetMaintenanceStatus = vi.fn().mockResolvedValue(mockApiResponse({ data }));
	};

	const mockSetMaintenanceResponse = (data: MaintenanceStatus) => {
		schoolApiMock.schoolControllerSetMaintenanceStatus = vi.fn().mockResolvedValue(mockApiResponse({ data }));
	};

	const mockProvisioningOptionsResponse = (data: SchulConneXProvisioningOptionsResponse) => {
		schoolApiMock.schoolControllerGetProvisioningOptions = vi.fn().mockResolvedValue(mockApiResponse({ data }));
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));

		schoolApiMock = {
			schoolControllerGetSchoolById: vi.fn(),
			schoolControllerGetSchoolSystems: vi.fn(),
			schoolControllerRemoveSystemFromSchool: vi.fn().mockResolvedValue(mockApiResponse({})),
			schoolControllerGetProvisioningOptions: vi.fn(),
			schoolControllerSetProvisioningOptions: vi.fn(),
			schoolControllerGetMaintenanceStatus: vi.fn(),
			schoolControllerSetMaintenanceStatus: vi.fn(),
			schoolControllerUpdateSchool: vi.fn(),
		};

		mockedSchoolApi.mockReturnValue(schoolApiMock as unknown as ReturnType<typeof SchoolApiFactory>);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("fetchSchoolDetails", () => {
		it("should set schoolDetails on success", async () => {
			const school = schoolFactory.build();
			mockSchoolResponse(school);

			const store = useSchoolStore();
			store.$patch({ schoolDetails: schoolFactory.build({ id: "app-school" }) });

			await store.fetchSchoolDetails();

			expect(store.schoolDetails).toEqual(school);
		});

		it("should not set schoolDetails on failure", async () => {
			schoolApiMock.schoolControllerGetSchoolById = vi.fn().mockRejectedValue(new Error("fail"));

			const store = useSchoolStore();
			const initial = schoolFactory.build();
			store.$patch({ schoolDetails: initial });

			await store.fetchSchoolDetails();

			expect(store.schoolDetails).toEqual(initial);
		});
	});

	describe("fetchSchoolSystems", () => {
		it("should set schoolSystems on success", async () => {
			const systems = schoolSystemResponseFactory.buildList(2);
			mockSchoolSystemsResponse(systems);

			const store = useSchoolStore();
			await store.fetchSchoolSystems("school-1");

			expect(store.schoolSystems).toEqual(systems);
		});
	});

	describe("deleteSchoolSystem", () => {
		it("should refetch school details and systems after deletion", async () => {
			const school = schoolFactory.build({ id: "school-1" });
			const systems = schoolSystemResponseFactory.buildList(1);
			mockSchoolResponse(school);
			mockSchoolSystemsResponse(systems);

			const store = useSchoolStore();
			store.$patch({ schoolDetails: school });

			await store.deleteSchoolSystem("system-to-delete");

			expect(schoolApiMock.schoolControllerRemoveSystemFromSchool).toHaveBeenCalledWith("school-1", "system-to-delete");
			expect(schoolApiMock.schoolControllerGetSchoolSystems).toHaveBeenCalledWith("school-1");
		});
	});

	describe("fetchMaintenanceStatus", () => {
		it("should set schoolMaintenanceStatus on success", async () => {
			const status = maintenanceStatusFactory.build();
			mockMaintenanceResponse(status);

			const store = useSchoolStore();
			await store.fetchMaintenanceStatus("school-1");

			expect(store.schoolMaintenanceStatus).toEqual(status);
		});
	});

	describe("setMaintenanceStatus", () => {
		it("should call API with correct params", async () => {
			const status = maintenanceStatusFactory.build({ maintenance: { active: true } });
			mockSetMaintenanceResponse(status);

			const store = useSchoolStore();
			await store.setMaintenanceStatus("school-1", true);

			expect(schoolApiMock.schoolControllerSetMaintenanceStatus).toHaveBeenCalledWith("school-1", {
				maintenance: true,
			});
		});
	});

	describe("schoolFeatures", () => {
		it("should return a Set of features from schoolDetails", () => {
			const store = useSchoolStore();
			store.$patch({
				schoolDetails: schoolFactory.build({
					features: [SchoolFeature.VIDEOCONFERENCE, SchoolFeature.STUDENT_VISIBILITY],
				}),
			});

			expect(store.schoolFeatures.has(SchoolFeature.VIDEOCONFERENCE)).toBe(true);
			expect(store.schoolFeatures.has(SchoolFeature.STUDENT_VISIBILITY)).toBe(true);
		});
	});

	describe("hasFeature", () => {
		it("should return true when feature exists", () => {
			const store = useSchoolStore();
			store.$patch({
				schoolDetails: schoolFactory.build({ features: [SchoolFeature.VIDEOCONFERENCE] }),
			});

			expect(store.hasFeature(SchoolFeature.VIDEOCONFERENCE)).toBe(true);
		});

		it("should return false when feature does not exist", () => {
			const store = useSchoolStore();
			store.$patch({
				schoolDetails: schoolFactory.build({ features: [] }),
			});

			expect(store.hasFeature(SchoolFeature.VIDEOCONFERENCE)).toBe(false);
		});
	});

	describe("isSchoolSynced", () => {
		it.each(["tsp-school", "oauth"])("should return true for system type %s", (type) => {
			const store = useSchoolStore();
			store.$patch({
				schoolSystems: [schoolSystemResponseFactory.build({ type })],
			});

			expect(store.isSchoolSynced).toBe(true);
		});

		it.each(["iserv-idm", "univention", "general"])("should return true for ldap provider %s", (provider) => {
			const store = useSchoolStore();
			store.$patch({
				schoolSystems: [schoolSystemResponseFactory.build({ type: "ldap", ldapConfig: { provider } })],
			});

			expect(store.isSchoolSynced).toBe(true);
		});

		it("should return false when no matching systems exist", () => {
			const store = useSchoolStore();
			store.$patch({
				schoolSystems: [schoolSystemResponseFactory.build({ type: "email" })],
			});

			expect(store.isSchoolSynced).toBe(false);
		});
	});

	describe("fetchProvisioningOptions", () => {
		it("should call API with schoolDetails id and systemId", async () => {
			const options: SchulConneXProvisioningOptionsResponse = {
				groupProvisioningClassesEnabled: true,
				groupProvisioningCoursesEnabled: false,
				groupProvisioningOtherEnabled: false,
				schoolExternalToolProvisioningEnabled: false,
			};
			mockProvisioningOptionsResponse(options);

			const store = useSchoolStore();
			store.$patch({ schoolDetails: schoolFactory.build({ id: "school-1" }) });

			const { success } = await store.fetchProvisioningOptions("system-1");

			expect(success).toBe(true);
			expect(schoolApiMock.schoolControllerGetProvisioningOptions).toHaveBeenCalledWith("school-1", "system-1");
		});
	});

	describe("updateSchool", () => {
		it("should update schoolDetails on success", async () => {
			const updated = schoolFactory.build({ name: "Updated School" });
			schoolApiMock.schoolControllerUpdateSchool = vi.fn().mockResolvedValue(mockApiResponse({ data: updated }));

			const store = useSchoolStore();
			store.$patch({ schoolDetails: schoolFactory.build() });

			await store.updateSchool("school-1", { name: "Updated School" });

			expect(store.schoolDetails.name).toBe("Updated School");
		});
	});
});
