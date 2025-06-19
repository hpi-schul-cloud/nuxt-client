import * as serverApi from "@/serverApi/v3/api";
import { GroupListResponse, GroupResponse } from "@/serverApi/v3/api";
import { groupResponseFactory, mockApiResponse } from "@@/tests/test-utils";
import { Group, GroupType, GroupUserRole, useGroupApi } from "@data-group";
import { createMock, DeepMocked } from "@golevelup/ts-jest";

describe("GroupApi.composable", () => {
	let groupApi: DeepMocked<serverApi.GroupApiInterface>;

	beforeEach(() => {
		groupApi = createMock<serverApi.GroupApiInterface>();

		vi.spyOn(serverApi, "GroupApiFactory").mockReturnValue(groupApi);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("getGroup", () => {
		const setup = () => {
			const group: GroupResponse = groupResponseFactory.build();

			groupApi.groupControllerGetGroup.mockResolvedValue(
				mockApiResponse({ data: group })
			);

			return {
				group,
			};
		};

		it("should call the api for groups", async () => {
			setup();

			await useGroupApi().getGroup("groupId");

			expect(groupApi.groupControllerGetGroup).toHaveBeenCalledWith("groupId");
		});

		it("should return a group", async () => {
			const { group } = setup();

			const result: Group = await useGroupApi().getGroup("groupId");

			expect(result).toEqual<Group>({
				id: group.id,
				name: group.name,
				type: GroupType.Class,
				organizationId: group.organizationId,
				users: [
					{
						id: group.users[0].id,
						firstName: group.users[0].firstName,
						lastName: group.users[0].lastName,
						role: GroupUserRole.Student,
					},
				],
				externalSource: group.externalSource,
			});
		});
	});

	describe("getGroups", () => {
		const setup = () => {
			const groupList: GroupListResponse = {
				data: [groupResponseFactory.build()],
				total: 1,
				skip: 0,
				limit: 10,
			};

			groupApi.groupControllerGetAllGroups.mockResolvedValue(
				mockApiResponse({ data: groupList })
			);

			return {
				groupList,
			};
		};

		it("should call the api for groups", async () => {
			setup();

			await useGroupApi().getGroups(
				{
					skip: 1,
					limit: 2,
				},
				{
					name: "testName",
					availableForSynchronization: true,
				}
			);

			expect(groupApi.groupControllerGetAllGroups).toHaveBeenCalledWith(
				1,
				2,
				true,
				"testName"
			);
		});

		it("should return a group", async () => {
			const { groupList } = setup();

			const result: GroupListResponse = await useGroupApi().getGroups();

			expect(result).toEqual<GroupListResponse>(groupList);
		});
	});
});
