import * as serverApi from "../serverApi/v3/api";
import {
	MigrationLinkRequest,
	MigrationLinks,
	MigrationPageOrigin,
} from "./types/user-migration";
import UserMigrationModule from "./user-migration";

// const createAxiosResponse = <T>(data: T): AxiosResponse<T> => ({
// 	data,
// 	status: 200,
// 	statusText: "OK",
// 	headers: {},
// 	config: {},
// });

describe("UserMigrationModule", () => {
	let module: UserMigrationModule;

	beforeEach(() => {
		module = new UserMigrationModule({});
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	// const mockApi = () => {
	// 	const apiMock: jest.Mocked<UserMigrationApiInterface> = {
	// 		userMigrationControllerGetMigrationPageDetails: jest.fn(),
	// 	};

	// 	jest.spyOn(serverApi, "UserMigrationApiFactory").mockReturnValue(apiMock);

	// 	return { apiMock };
	// };

	describe("getter/setter", () => {
		describe("Loading", () => {
			it("should return the default state", () => {
				const loading: boolean = module.getLoading;

				expect(loading).toEqual(false);
			});

			it("should return the changed state", () => {
				module.setLoading(true);

				expect(module.getLoading).toEqual(true);
			});
		});

		describe("MigrationLinks", () => {
			it("should return the default state", () => {
				const migrationLinks: MigrationLinks = module.getMigrationLinks;

				expect(migrationLinks).toEqual<MigrationLinks>({
					proceedLink: "",
					cancelLink: "",
				});
			});

			it("should return the changed state", () => {
				const migrationLinks: MigrationLinks = {
					proceedLink: "proceedLink",
					cancelLink: "cancelLink",
				};

				module.setMigrationLinks(migrationLinks);

				expect(module.getMigrationLinks).toEqual(migrationLinks);
			});
		});

		describe("Error", () => {
			it("should return the default state", () => {
				const error: {} | null = module.getError;

				expect(error).toEqual(null);
			});

			it("should return the changed state", () => {
				const error: {} | null = new Error();

				module.setError(error);

				expect(module.getError).toEqual(error);
			});
		});
	});

	describe("actions", () => {
		describe("fetchMigrationLinks", () => {
			const setup = () => {
				const migrationLinkRequest: MigrationLinkRequest = {
					pageType: MigrationPageOrigin.START_FROM_SOURCE_SYSTEM,
					targetSystem: "targetSystemId",
					sourceSystem: "sourceSystemId",
				};

				const response = {
					proceedButtonUrl: "proceedLink",
					cancelButtonUrl: "cancelLink",
				};

				const mockApi = {
					userMigrationControllerGetMigrationPageDetails: jest
						.fn()
						.mockResolvedValue({
							data: response,
						}),
				};

				jest
					.spyOn(serverApi, "UserMigrationApiFactory")
					.mockReturnValue(
						mockApi as unknown as serverApi.UserMigrationApiInterface
					);

				return {
					apiMock: mockApi,
					migrationLinkRequest,
					response,
				};
			};

			it("should call the userMigrationApi.userMigrationControllerGetMigrationPageDetails", async () => {
				const { apiMock, migrationLinkRequest } = setup();

				await module.fetchMigrationLinks(migrationLinkRequest);

				expect(
					apiMock.userMigrationControllerGetMigrationPageDetails
				).toHaveBeenCalledWith(
					MigrationPageOrigin.START_FROM_SOURCE_SYSTEM,
					"sourceSystemId",
					"targetSystemId"
				);
			});

			it("should set the MigrationLinks", async () => {
				const { migrationLinkRequest, response } = setup();

				await module.fetchMigrationLinks(migrationLinkRequest);

				expect(module.getMigrationLinks).toEqual<MigrationLinks>({
					proceedLink: response.proceedButtonUrl,
					cancelLink: response.cancelButtonUrl,
				});
			});

			it("should set an error", async () => {
				const { apiMock, migrationLinkRequest } = setup();
				const error: Error = new Error();
				apiMock.userMigrationControllerGetMigrationPageDetails.mockRejectedValue(
					error
				);

				await module.fetchMigrationLinks(migrationLinkRequest);

				expect(module.getError).toEqual(error);
			});
		});
	});
});
