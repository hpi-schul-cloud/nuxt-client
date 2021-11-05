import { TaskModule } from "./tasks";
import * as serverApi from "../serverApi/v3/api";

describe("task store", async () => {
	describe("getAllTasks", () => {
		it("should request a list of tasks", (done) => {
			const mockApi = {
				taskControllerFindAll: jest.fn(() => ({
					data: {
						data: [{ mockTask: "mock task value" }],
						total: 3,
						skip: 0,
						limit: 10,
					},
				})),
			};
			jest
				.spyOn(serverApi, "TaskApiFactory")
				.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);
			const taskModule = new TaskModule({});

			taskModule.getAllTasks().then(() => {
				expect(taskModule.getTasks).toStrictEqual([
					{
						mockTask: "mock task value",
					},
				]);
				expect(taskModule.getStatus).toBe("completed");
				done();
			});
			expect(taskModule.getStatus).toBe("pending");
			expect(mockApi.taskControllerFindAll).toHaveBeenCalledTimes(1);
		});
		it("should handle an error", (done) => {
			const error = { status: 418, statusText: "I'm a teapot" };
			const mockApi = {
				taskControllerFindAll: jest.fn(() => Promise.reject({ ...error })),
			};
			jest
				.spyOn(serverApi, "TaskApiFactory")
				.mockReturnValue(mockApi as unknown as serverApi.TaskApiInterface);
			const taskModule = new TaskModule({});

			taskModule.getAllTasks().then(() => {
				expect(taskModule.getTasks).toStrictEqual([]);
				expect(taskModule.getStatus).toBe("error");
				expect(taskModule.businessError).toStrictEqual(error);
				done();
			});
			expect(taskModule.getStatus).toBe("pending");
			expect(mockApi.taskControllerFindAll).toHaveBeenCalledTimes(1);
		});
	});
});
