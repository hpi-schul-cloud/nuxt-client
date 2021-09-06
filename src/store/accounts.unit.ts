import axios from "@/plugins/axios";
import { AccountsModule } from "./accounts";

const URL = "/v1/accounts/jwtTimer";
let requestPath = "";

jest.mock("../utils/api", () => {
	const axios = {
		$post: (path: string) => {
			requestPath = path;
		},
	};

	return {
		serverAPI: {
			get: () => axios,
		},
	};
});

describe("accounts module", () => {
	afterEach(() => {
		requestPath = "";
	});

	describe("actions", () => {
		it("getTTL action should make a post request to the right path", async () => {
			const accountsModule = new AccountsModule({});

			expect(requestPath).toBe("");
			await accountsModule.getTTL();
			expect(requestPath).toBe(URL);
		});
		it("getTTL should call resetBusinessError and setStatus mutations", async () => {
			const accountsModule = new AccountsModule({});
			const spyResetError = jest.fn();
			const spySetStatus = jest.fn();

			accountsModule.resetBusinessError = spyResetError;
			accountsModule.setStatus = spySetStatus;
			expect(spyResetError).not.toBeCalled();
			expect(spySetStatus).not.toBeCalled();
			await accountsModule.getTTL();
			expect(spyResetError).toBeCalled();
			expect(spySetStatus).toBeCalled();
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
			expect(spyResetError).not.toBeCalled();
			expect(spySetStatus).not.toBeCalled();
			await accountsModule.resetJwtTimer();
			expect(spyResetError).toBeCalled();
			expect(spySetStatus).toBeCalled();
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
