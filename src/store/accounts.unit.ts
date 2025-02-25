import { initializeAxios } from "@/utils/api";
import { AxiosInstance } from "axios";
import AccountsModule from "./accounts";

const URL = "/v1/accounts/jwtTimer";
let requestPath = "";

describe("accounts module", () => {
	afterEach(() => {
		requestPath = "";
	});

	describe("actions", () => {
		beforeEach(() => {
			initializeAxios({
				get: async (path: string) => {
					requestPath = path;
					return { data: { ttl: 100 } };
				},
				post: async (path: string) => {
					requestPath = path;
				},
			} as AxiosInstance);
		});

		it("getTTL action should make a get request to the right path", async () => {
			const accountsModule = new AccountsModule({});

			expect(requestPath).toBe("");
			await accountsModule.getTTL();
			expect(requestPath).toBe(URL);
		});
		it("getTTL action should return a number", async () => {
			const accountsModule = new AccountsModule({});

			const response = await accountsModule.getTTL();
			expect(response).toBe(100);
		});
		it("getTTL should call resetBusinessError and setStatus mutations", async () => {
			const accountsModule = new AccountsModule({});
			const spyResetError = jest.fn();
			const spySetStatus = jest.fn();

			accountsModule.resetBusinessError = spyResetError;
			accountsModule.setStatus = spySetStatus;
			expect(spyResetError).not.toHaveBeenCalled();
			expect(spySetStatus).not.toHaveBeenCalled();
			await accountsModule.getTTL();
			expect(spyResetError).toHaveBeenCalled();
			expect(spySetStatus).toHaveBeenCalled();
		});
		it("resetJwtTimer action should make a post request to the right path", async () => {
			const accountsModule = new AccountsModule({});
			expect(requestPath).toBe("");
			await accountsModule.resetJwtTimer();
			expect(requestPath).toBe(URL);
		});
		it("resetJwtTimer should call resetBusinessError and setStatus mutations", async () => {
			const accountsModule = new AccountsModule({});
			const spyResetError = jest.fn();
			const spySetStatus = jest.fn();

			accountsModule.resetBusinessError = spyResetError;
			accountsModule.setStatus = spySetStatus;
			expect(spyResetError).not.toHaveBeenCalled();
			expect(spySetStatus).not.toHaveBeenCalled();
			await accountsModule.resetJwtTimer();
			expect(spyResetError).toHaveBeenCalled();
			expect(spySetStatus).toHaveBeenCalled();
		});
	});
	describe("mutations", () => {
		it("setStatus should correctly set status value", () => {
			const accountsModule = new AccountsModule({});
			const statusMock = "completed";

			expect(accountsModule.status).toBe("");
			accountsModule.setStatus(statusMock);
			expect(accountsModule.status).toBe(statusMock);
		});
		it("resetBusinessError should reset businesError value", () => {
			const accountsModule = new AccountsModule({});
			const emptyBusinessError = {
				statusCode: "",
				message: "",
			};

			accountsModule.businessError = {
				statusCode: "not empty",
				message: "not empty",
			};
			expect(accountsModule.businessError).not.toStrictEqual(
				emptyBusinessError
			);
			accountsModule.resetBusinessError();
			expect(accountsModule.businessError).toStrictEqual(emptyBusinessError);
		});
	});
});
