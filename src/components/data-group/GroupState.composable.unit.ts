import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useErrorHandler } from "../error-handling/ErrorHandler.composable";
import { Group, useGroupApi, useGroupState } from "./index";
import { groupFactory } from "@@/tests/test-utils/factory/groupFactory";

jest.mock("@data-group/GroupApi.composable");
jest.mock("@/components/error-handling/ErrorHandler.composable");

describe("GroupState.composable", () => {
	let useGroupApiMock: DeepMocked<ReturnType<typeof useGroupApi>>;
	let useErrorHandlerMock: DeepMocked<ReturnType<typeof useErrorHandler>>;

	beforeEach(() => {
		useGroupApiMock = createMock<ReturnType<typeof useGroupApi>>();
		useErrorHandlerMock = createMock<ReturnType<typeof useErrorHandler>>();

		jest.mocked(useGroupApi).mockReturnValue(useGroupApiMock);
		jest.mocked(useErrorHandler).mockReturnValue(useErrorHandlerMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("when no data is loaded", () => {
		it("should not have data", async () => {
			const { group } = useGroupState();

			expect(group.value).toBeUndefined();
		});
	});

	describe("when data is loaded", () => {
		const setup = () => {
			const groupMock: Group = groupFactory.build();

			useGroupApiMock.getGroup.mockResolvedValue(groupMock);

			return {
				groupMock,
				...useGroupState(),
			};
		};

		it("should call the api to get a group", async () => {
			const { fetchGroup } = setup();

			await fetchGroup("groupId");

			expect(useGroupApiMock.getGroup).toHaveBeenCalledWith("groupId");
		});

		it("should set the group in the state", async () => {
			const { fetchGroup, group, groupMock } = setup();

			await fetchGroup("groupId");

			expect(group.value).toEqual(groupMock);
		});
	});

	describe("when an error occurs during loading", () => {
		const setup = () => {
			const error = new Error("unable to load");

			useGroupApiMock.getGroup.mockRejectedValue(error);

			return {
				error,
				...useGroupState(),
			};
		};

		it("should handle the error", async () => {
			const { fetchGroup, error } = setup();

			await fetchGroup("groupId");

			expect(useErrorHandlerMock.handleError).toHaveBeenCalledWith(error);
		});
	});
});
