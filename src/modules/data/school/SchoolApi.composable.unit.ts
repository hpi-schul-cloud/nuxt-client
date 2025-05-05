import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useSchoolApi } from "./SchoolApi.composable";
import { AxiosInstance } from "axios";
import { initializeAxios } from "../../../utils/api";

describe("SchoolExternalToolApi.composable", () => {
	let axiosMock: DeepMocked<AxiosInstance>;

	beforeEach(() => {
		axiosMock = createMock<AxiosInstance>();

		initializeAxios(axiosMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("fetchMaintenanceStatus", () => {
		it("should call the api to fetch the maintenance status", async () => {
			await useSchoolApi().fetchMaintenanceStatus("id");

			expect(axiosMock.get).toHaveBeenCalledWith("/v1/schools/id/maintenance");
		});
	});

	describe("setMaintenance", () => {
		it("should call the api to set the maintenance", async () => {
			await useSchoolApi().setMaintenance("id", true);

			expect(axiosMock.post).toHaveBeenCalledWith(
				"/v1/schools/id/maintenance",
				{ maintenance: true }
			);
		});
	});
});
