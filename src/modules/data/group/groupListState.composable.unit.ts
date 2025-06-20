import { GroupListResponse } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { groupResponseFactory, mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { GroupListFilter, useGroupApi, useGroupListState } from "./index";

vi.mock("@data-group/GroupApi.composable");

describe("groupListState.composable", () => {
	let useGroupApiMock: DeepMocked<ReturnType<typeof useGroupApi>>;
	const notifierModule: vi.Mocked<NotifierModule> =
		createModuleMocks(NotifierModule);

	beforeEach(() => {
		useGroupApiMock = createMock<ReturnType<typeof useGroupApi>>();

		vi.mocked(useGroupApi).mockReturnValue(useGroupApiMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
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

		describe("when data is loaded and append is false", () => {
			const setup = () => {
				const { composable } = getComposable();
				const groupList: GroupListResponse = {
					data: [groupResponseFactory.build()],
					limit: 10,
					skip: 0,
					total: 10,
				};
				const filter: Required<GroupListFilter> = {
					name: "testName",
					availableForSynchronization: true,
				};

				useGroupApiMock.getGroups.mockResolvedValueOnce(groupList);

				return {
					groupList,
					composable,
					filter,
				};
			};

			it("should call the api to get a group", async () => {
				const { composable, groupList } = setup();

				await composable.fetchGroups({
					name: "testName",
					availableForSynchronization: true,
				});

				expect(useGroupApiMock.getGroups).toHaveBeenCalledWith(
					{
						skip: groupList.skip,
						limit: groupList.limit,
					},
					{
						name: "testName",
						availableForSynchronization: true,
					}
				);
			});

			it("should set the groups in the state", async () => {
				const { composable, groupList } = setup();

				await composable.fetchGroups();

				expect(composable.groups.value).toEqual(groupList.data);
			});

			it("should set the total in the state", async () => {
				const { composable, groupList } = setup();

				await composable.fetchGroups();

				expect(composable.total.value).toEqual(groupList.total);
			});
		});

		describe("when data is loaded and append is true", () => {
			const setup = () => {
				const { composable } = getComposable();
				const groupA = groupResponseFactory.build();
				const groupB = groupResponseFactory.build();

				const options: Required<GroupListFilter> = {
					name: "testName",
					availableForSynchronization: true,
				};

				useGroupApiMock.getGroups.mockResolvedValueOnce({
					data: [groupA],
					limit: 1,
					skip: 0,
					total: 2,
				});
				useGroupApiMock.getGroups.mockResolvedValueOnce({
					data: [groupB],
					limit: 1,
					skip: 1,
					total: 2,
				});

				return {
					groupA,
					groupB,
					composable,
					options,
				};
			};

			it("should append the groups in the state", async () => {
				const { composable, groupA, groupB, options } = setup();

				await composable.fetchGroups(options, { append: true });
				await composable.fetchGroups(options, { append: true });

				expect(composable.groups.value).toEqual([groupA, groupB]);
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
