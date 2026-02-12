import axios, { isAxiosError } from "axios";

vi.mock("axios");
const mockedIsAxiosError = vi.mocked(isAxiosError);
const mockedAxiosGet = vi.mocked(axios.get);

describe("handleUnauthorizedError", () => {
	beforeEach(async () => {
		vi.clearAllMocks();
	});

	describe("when 401 error occurs", () => {
		it("should call notifySessionEnded when JWT timer returns expired token", async () => {
			mockedIsAxiosError.mockReturnValue(true);
			mockedAxiosGet.mockResolvedValue({ data: { ttl: 0 } });

			expect(mockedAxiosGet).toHaveBeenCalledWith("/v1/accounts/jwtTimer");
		});

		it("should call notifySessionEnded when JWT timer request fails", async () => {
			mockedIsAxiosError.mockReturnValue(true);
			mockedAxiosGet.mockRejectedValue(new Error("Network error"));

			expect(mockedAxiosGet).toHaveBeenCalledWith("/v1/accounts/jwtTimer");
		});

		it("should NOT call notifySessionEnded when JWT timer returns valid ttl", async () => {
			mockedIsAxiosError.mockReturnValue(true);
			mockedAxiosGet.mockResolvedValue({ data: { ttl: 300 } }); // 5 minutes remaining

			expect(mockedAxiosGet).toHaveBeenCalledWith("/v1/accounts/jwtTimer");
		});
	});

	describe("when non-401 error occurs", () => {
		it("should NOT handle non-401 errors", async () => {
			mockedIsAxiosError.mockReturnValue(true);

			expect(mockedAxiosGet).not.toHaveBeenCalled();
		});
	});
});
