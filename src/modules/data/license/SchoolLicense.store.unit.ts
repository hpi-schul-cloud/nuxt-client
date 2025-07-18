import { MediaSchoolLicenseListResponse } from "@/serverApi/v3";
import { mediaSchoolLicenseResponseFactory } from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createPinia, setActivePinia } from "pinia";
import { useSchoolLicenseStore } from "./SchoolLicense.store";
import { useSchoolLicenseApi } from "./schoolLicenseApi.composable";

vi.mock("./schoolLicenseApi.composable");

describe("SchoolLicenseStore", () => {
	let useSchoolLicenseApiMock: DeepMocked<
		ReturnType<typeof useSchoolLicenseApi>
	>;

	beforeEach(() => {
		setActivePinia(createPinia());

		useSchoolLicenseApiMock =
			createMock<ReturnType<typeof useSchoolLicenseApi>>();
		vi.mocked(useSchoolLicenseApi).mockReturnValue(useSchoolLicenseApiMock);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("getLicenseIdentifier", () => {
		describe("when creating an identifier", () => {
			const setup = () => {
				const mediumId = "medium1";
				const mediaSourceId = "mediaSource1";

				const store = useSchoolLicenseStore();

				return {
					store,
					mediumId,
					mediaSourceId,
				};
			};

			it("should return the correct key", () => {
				const { store, mediumId, mediaSourceId } = setup();

				const result = store.getLicenseIdentifier(mediumId, mediaSourceId);

				expect(result).toEqual(`${mediumId} ${mediaSourceId}`);
			});
		});
	});

	describe("fetchMediaSchoolLicenses", () => {
		describe("when loading all media licenses for a school", () => {
			const setup = () => {
				const mediaSchoolLicenseResponse =
					mediaSchoolLicenseResponseFactory.build();
				const mediaSchoolLicenseListResponse: MediaSchoolLicenseListResponse = {
					data: [mediaSchoolLicenseResponse],
				};

				const store = useSchoolLicenseStore();

				useSchoolLicenseApiMock.getMediaSchoolLicensesForSchool.mockResolvedValueOnce(
					mediaSchoolLicenseListResponse
				);

				return {
					store,
					mediaSchoolLicenseResponse,
				};
			};

			it("should update the mediaSchoolLicenses state", async () => {
				const { store, mediaSchoolLicenseResponse } = setup();

				await store.fetchMediaSchoolLicenses();

				expect(store.mediaSchoolLicenses).toEqual(
					new Set([
						store.getLicenseIdentifier(
							mediaSchoolLicenseResponse.mediumId,
							mediaSchoolLicenseResponse.mediaSourceId
						),
					])
				);
			});

			it("should set the loading state during the operation", async () => {
				const { store } = setup();

				expect(store.isLoading).toBe(false);

				const promise = store.fetchMediaSchoolLicenses();
				expect(store.isLoading).toBe(true);

				await promise;
				expect(store.isLoading).toBe(false);
			});
		});
	});

	describe("isLicensed", () => {
		describe("when a there is a license for a medium", () => {
			const setup = () => {
				const mediumId = "medium1";
				const mediaSourceId = "mediaSource1";

				const store = useSchoolLicenseStore();
				store.mediaSchoolLicenses.add(
					store.getLicenseIdentifier(mediumId, mediaSourceId)
				);

				return {
					store,
					mediumId,
					mediaSourceId,
				};
			};

			it("should return true", () => {
				const { store, mediumId, mediaSourceId } = setup();

				const result = store.isLicensed(mediumId, mediaSourceId);

				expect(result).toEqual(true);
			});
		});

		describe("when a there is no license for a medium", () => {
			it("should return false", () => {
				const result = useSchoolLicenseStore().isLicensed(
					"medium1",
					"mediaSource1"
				);

				expect(result).toEqual(false);
			});
		});
	});
});
