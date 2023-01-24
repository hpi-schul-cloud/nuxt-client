import {
	PageContentResponse,
	UserMigrationApiInterface,
} from "../serverApi/v3";
import * as serverApi from "../serverApi/v3/api";
import {
	MigrationLinkRequest,
	MigrationLinks,
	MigrationPageOrigin,
} from "./types/user-migration";
import UserMigrationModule from "./user-migration";
import { AxiosResponse } from "axios";

const createAxiosResponse = <T>(data: T): AxiosResponse<T> => ({
	data,
	status: 200,
	statusText: "OK",
	headers: {},
	config: {},
});

describe("UserMigrationModule", () => {
	let module: UserMigrationModule;

	beforeEach(() => {
		module = new UserMigrationModule({});
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	const mockApi = () => {
		const apiMock: jest.Mocked<UserMigrationApiInterface> = {
			userMigrationControllerGetMigrationPageDetails: jest.fn(),
		};

		jest.spyOn(serverApi, "UserMigrationApiFactory").mockReturnValue(apiMock);

		return { apiMock };
	};

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
	});

	describe("actions", () => {
		describe("fetchMigrationLinks", () => {
			const setup = () => {
				const { apiMock } = mockApi();
				const migrationLinkRequest: MigrationLinkRequest = {
					pageType: MigrationPageOrigin.START_FROM_SOURCE_SYSTEM,
					targetSystem: "targetSystemId",
					sourceSystem: "sourceSystemId",
				};
				const response: PageContentResponse = {
					proceedButtonUrl: "proceedLink",
					cancelButtonUrl: "cancelLink",
				};

				apiMock.userMigrationControllerGetMigrationPageDetails.mockResolvedValue(
					createAxiosResponse(response)
				);

				return {
					apiMock,
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

			it("should log an error", async () => {
				const { apiMock, migrationLinkRequest } = setup();
				apiMock.userMigrationControllerGetMigrationPageDetails.mockRejectedValue(
					new Error()
				);
				jest.spyOn(console, "log");

				await module.fetchMigrationLinks(migrationLinkRequest);

				expect(console.log).toHaveBeenCalledWith(
					expect.stringContaining("error")
				);
			});
		});
	});
});
