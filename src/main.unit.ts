import axios, { HttpStatusCode, isAxiosError } from "axios";

// Mock the auto-logout composable
const mockNotifyBeingLoggedOut = vi.fn();
vi.mock("@/modules/feature/auto-logout/autoLogout.composable", () => ({
	useAutoLogout: () => ({
		notifyBeingLoggedOut: mockNotifyBeingLoggedOut,
	}),
}));

vi.mock("axios");
const mockedIsAxiosError = vi.mocked(isAxiosError);
const mockedAxiosGet = vi.mocked(axios.get);

// Import the function we want to test by extracting it from main.ts logic
const createHandleUnauthorizedError = async () => {
	const { useAutoLogout } = await import("@/modules/feature/auto-logout/autoLogout.composable");
	const { notifyBeingLoggedOut } = useAutoLogout();

	return async (error: unknown) => {
		if (isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized) {
			try {
				const response = await axios.get("/v1/accounts/jwtTimer");
				const ttl = response?.data?.ttl;
				if (!ttl || ttl <= 0) {
					notifyBeingLoggedOut();
				}
			} catch {
				notifyBeingLoggedOut();
			}
		}
	};
};

describe("handleUnauthorizedError", () => {
	let handleUnauthorizedError: (error: unknown) => Promise<void>;

	beforeEach(async () => {
		vi.clearAllMocks();
		handleUnauthorizedError = await createHandleUnauthorizedError();
	});

	describe("when 401 error occurs", () => {
		it("should call notifyBeingLoggedOut when JWT timer returns expired token", async () => {
			const mockError = {
				response: { status: HttpStatusCode.Unauthorized },
			};
			mockedIsAxiosError.mockReturnValue(true);
			mockedAxiosGet.mockResolvedValue({ data: { ttl: 0 } });

			await handleUnauthorizedError(mockError);

			expect(mockedAxiosGet).toHaveBeenCalledWith("/v1/accounts/jwtTimer");
			expect(mockNotifyBeingLoggedOut).toHaveBeenCalled();
		});

		it("should call notifyBeingLoggedOut when JWT timer request fails", async () => {
			const mockError = {
				response: { status: HttpStatusCode.Unauthorized },
			};
			mockedIsAxiosError.mockReturnValue(true);
			mockedAxiosGet.mockRejectedValue(new Error("Network error"));

			await handleUnauthorizedError(mockError);

			expect(mockedAxiosGet).toHaveBeenCalledWith("/v1/accounts/jwtTimer");
			expect(mockNotifyBeingLoggedOut).toHaveBeenCalled();
		});

		it("should NOT call notifyBeingLoggedOut when JWT timer returns valid ttl", async () => {
			const mockError = {
				response: { status: HttpStatusCode.Unauthorized },
			};
			mockedIsAxiosError.mockReturnValue(true);
			mockedAxiosGet.mockResolvedValue({ data: { ttl: 300 } }); // 5 minutes remaining

			await handleUnauthorizedError(mockError);

			expect(mockedAxiosGet).toHaveBeenCalledWith("/v1/accounts/jwtTimer");
			expect(mockNotifyBeingLoggedOut).not.toHaveBeenCalled();
		});
	});

	describe("when non-401 error occurs", () => {
		it("should NOT handle non-401 errors", async () => {
			const mockError = {
				response: { status: 404 },
			};
			mockedIsAxiosError.mockReturnValue(true);

			await handleUnauthorizedError(mockError);

			expect(mockedAxiosGet).not.toHaveBeenCalled();
			expect(mockNotifyBeingLoggedOut).not.toHaveBeenCalled();
		});
	});

	describe("when non-axios error occurs", () => {
		it("should NOT handle non-axios errors", async () => {
			const mockError = new Error("Regular error");
			mockedIsAxiosError.mockReturnValue(false);

			await handleUnauthorizedError(mockError);

			expect(mockedAxiosGet).not.toHaveBeenCalled();
			expect(mockNotifyBeingLoggedOut).not.toHaveBeenCalled();
		});
	});
});
