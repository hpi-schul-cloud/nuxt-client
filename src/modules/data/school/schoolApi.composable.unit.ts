import { useSchoolApi } from "./schoolApi.composable";
import * as serverApi from "@/serverApi/v3/api";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";

describe("SchoolApi.composable", () => {
	let schoolApi: DeepMocked<serverApi.SchoolApiInterface>;

	beforeEach(() => {
		schoolApi = createMock<serverApi.SchoolApiInterface>();

		vi.spyOn(serverApi, "SchoolApiFactory").mockReturnValue(schoolApi);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("fetchMaintenanceStatus", () => {
		it("should call the api to fetch the maintenance status", async () => {
			await useSchoolApi().fetchMaintenanceStatus("id");

			expect(schoolApi.schoolControllerGetMaintenanceStatus).toHaveBeenCalledWith("id");
		});
	});

	describe("setMaintenance", () => {
		it("should call the api to set the maintenance", async () => {
			await useSchoolApi().setMaintenance("id", true);

			expect(schoolApi.schoolControllerSetMaintenanceStatus).toHaveBeenCalledWith("id", { maintenance: true });
		});
	});
});
