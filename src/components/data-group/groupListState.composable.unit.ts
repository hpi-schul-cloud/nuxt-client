import { GroupEntryResponse } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	groupEntryResponseFactory,
	mountComposable,
} from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { GroupListFilter, useGroupApi, useGroupListState } from "./index";

jest.mock("@data-group/GroupApi.composable");

describe("groupListState.composable", () => {
	let useGroupApiMock: DeepMocked<ReturnType<typeof useGroupApi>>;
	const notifierModule: jest.Mocked<NotifierModule> =
		createModuleMocks(NotifierModule);

	beforeEach(() => {
		useGroupApiMock = createMock<ReturnType<typeof useGroupApi>>();

		jest.mocked(useGroupApi).mockReturnValue(useGroupApiMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const getComposable = () => {
		const composable = mountComposable(() => useGroupListState(), {
			global: {
				plugins: [createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
		});

		return {
			composable,
		};
	};

	describe("fetchGroups", () => {
		describe("when no data is loaded", () => {
			it("should not have data", async () => {
				const { composable } = getComposable();

				expect(composable.groups.value).toEqual([]);
			});
		});

		describe("when data is loaded", () => {
			const setup = () => {
				const { composable } = getComposable();
				const groupMock: GroupEntryResponse = groupEntryResponseFactory.build();
				const options: Required<GroupListFilter> = {
					name: "testName",
					availableForSynchronization: true,
				};

				useGroupApiMock.getGroups.mockResolvedValue([groupMock]);

				return {
					groupMock,
					composable,
					options,
				};
			};

			it("should call the api to get a group", async () => {
				const { composable, options } = setup();

				await composable.fetchGroups(options);

				expect(useGroupApiMock.getGroups).toHaveBeenCalledWith(options);
			});

			it("should set the group in the state", async () => {
				const { composable, groupMock, options } = setup();

				await composable.fetchGroups(options);

				expect(composable.groups.value).toEqual([groupMock]);
			});
		});

		describe("when an error occurs during loading", () => {
			const setup = () => {
				const { composable } = getComposable();
				const error = new Error("unable to load");

				useGroupApiMock.getGroups.mockRejectedValue(error);

				return {
					error,
					composable,
				};
			};

			it("should show notification", async () => {
				const { composable } = setup();

				await composable.fetchGroups();

				expect(notifierModule.show).toHaveBeenCalledWith({
					text: "error.load",
					status: "error",
				});
			});
		});
	});
});
